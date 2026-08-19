
const SHEET_ID = '1b97QfQLP5yRp-55Fj9-Ot0neIJiB_QCZUzDyft3D_NE';

const companyIdMap = {
    'Tân Hồng Hà': 'THH',
    'Việt': 'Viet',
    'Xem Sơn': 'XemSon',
    'VPS M': 'VPSM',
    'ITSS': 'ITSS',
    'Văn phòng VPS': 'VPVPS'
};

const customerCatMap = {
    'Thuê máy': 'thue_may',
    'MC': 'mc',
    'Dịch vụ - Photo': 'dv_photo',
    'Dịch vụ - Máy in': 'dv_may_in',
    'Dịch vụ khác': 'dv_khac',
    'Phân phối (Đại lý)': 'phan_phoi'
};

async function fetchCsv(sheetName) {
    const url = https://docs.google.com/spreadsheets/d//gviz/tq?tqx=out:csv&sheet=;
    const res = await fetch(url);
    if(!res.ok) throw new Error("Failed to fetch sheet: " + sheetName);
    const text = await res.text();
    return new Promise((resolve) => {
        Papa.parse(text, {
            header: false,
            skipEmptyLines: true,
            complete: (results) => resolve(results.data)
        });
    });
}

function parseNumber(val) {
    if (!val || val === '-') return 0;
    if (typeof val === 'number') return val;
    return parseFloat(val.toString().replace(/,/g, '')) || 0;
}

window.GoogleSheetsService = {
    async loadAllData() {
        try {
            const [revCsv, debtCsv, custCsv] = await Promise.all([
                fetchCsv('Doanh thu'),
                fetchCsv('Công nợ'),
                fetchCsv('Khách hàng')
            ]);
            
            const newData = {
                revenue: { total: 0, plan2026: window.mockData.revenue.plan2026, byCompany: {} },
                debt: { total: 0, byCompany: {} },
                customers: { total: 0, trend: window.mockData.customers.trend, matrix: {}, plan2026: window.mockData.customers.plan2026, byCompany: {} },
                inventory: { totalItems: 0, totalValue: 0, categories: [], byCompany: {} },
                hr: { totalEmployees: 0, newHires: 0, resignations: 0, probation: 0, byDepartment: {}, byCompany: {} }
            };

            // Parse Revenue (Rows 2 to 7)
            for (let i = 2; i < revCsv.length; i++) {
                const row = revCsv[i];
                if(!row[0]) continue;
                const cId = companyIdMap[row[0]];
                if(cId) {
                    newData.revenue.byCompany[cId] = {
                        plan: parseNumber(row[2]),
                        actual: parseNumber(row[3]),
                        ttlg: 0,
                        lg_pct: parseNumber(row[4]),
                        cp_lg_pct: 0,
                        cp: parseNumber(row[5]),
                        lntt: parseNumber(row[6])
                    };
                    newData.revenue.total += parseNumber(row[3]);
                }
            }

            // Parse Debt
            for (let i = 2; i < debtCsv.length; i++) {
                const row = debtCsv[i];
                if(!row[0]) continue;
                const cId = companyIdMap[row[0]];
                if(cId) {
                    newData.debt.byCompany[cId] = {
                        current: parseNumber(row[2]),
                        overdue: parseNumber(row[3]),
                        bad: parseNumber(row[4])
                    };
                    newData.debt.total += (parseNumber(row[2]) + parseNumber(row[3]) + parseNumber(row[4]));
                }
            }

            // Parse Customers
            let currentCompany = '';
            Object.values(companyIdMap).forEach(cId => { newData.customers.matrix[cId] = {}; });
            newData.customers.matrix['all'] = {};

            for (let i = 3; i < custCsv.length; i++) {
                const row = custCsv[i];
                if (row[0]) currentCompany = companyIdMap[row[0]];
                if (!currentCompany) continue;
                
                const catName = row[1];
                const catId = customerCatMap[catName];
                if(!catId) continue;

                const rowData = {
                    ke_hoach: { may: parseNumber(row[3]), kh: parseNumber(row[4]) },
                    dau: { may: parseNumber(row[5]), kh: parseNumber(row[6]) },
                    tang: { may: parseNumber(row[7]), kh: parseNumber(row[8]) },
                    giam: { may: parseNumber(row[9]), kh: parseNumber(row[10]) },
                    cuoi: { may: parseNumber(row[11]), kh: parseNumber(row[12]) }
                };
                
                newData.customers.matrix[currentCompany][catId] = rowData;
                
                if (!newData.customers.matrix['all'][catId]) {
                    newData.customers.matrix['all'][catId] = {dau:{may:0,kh:0}, tang:{may:0,kh:0}, giam:{may:0,kh:0}, cuoi:{may:0,kh:0}};
                }
                const allCat = newData.customers.matrix['all'][catId];
                allCat.dau.may += rowData.dau.may; allCat.dau.kh += rowData.dau.kh;
                allCat.tang.may += rowData.tang.may; allCat.tang.kh += rowData.tang.kh;
                allCat.giam.may += rowData.giam.may; allCat.giam.kh += rowData.giam.kh;
                allCat.cuoi.may += rowData.cuoi.may; allCat.cuoi.kh += rowData.cuoi.kh;
            }

            Object.keys(newData.customers.matrix).forEach(cId => {
                if (cId === 'all') return;
                const m = newData.customers.matrix[cId];
                let service = 0, rental = 0, distribution = 0;
                if(m.thue_may) rental += m.thue_may.cuoi.kh;
                if(m.mc) rental += m.mc.cuoi.kh;
                if(m.dv_photo) service += m.dv_photo.cuoi.kh;
                if(m.dv_may_in) service += m.dv_may_in.cuoi.kh;
                if(m.dv_khac) service += m.dv_khac.cuoi.kh;
                if(m.phan_phoi) distribution += m.phan_phoi.cuoi.kh;

                newData.customers.byCompany[cId] = {
                    service, rental, distribution, new: 0, lost: 0, decreased: 0
                };
            });
            
            const mAll = newData.customers.matrix['all'];
            for(let cat in mAll) {
                newData.customers.total += mAll[cat].cuoi.kh;
            }

            // Fallback for HR and Inventory since we haven't written parsers for them yet
            // To prevent crashes, we can pull them from mockData for now
            newData.inventory = window.mockData.inventory;
            newData.hr = window.mockData.hr;

            // Merge parsed data into mockData as a global override
            window.mockData.revenue = newData.revenue;
            window.mockData.debt = newData.debt;
            window.mockData.customers = newData.customers;
            
            console.log("Successfully loaded data from Google Sheets:", newData);
            return window.mockData;

        } catch(e) {
            console.error("Lỗi khi load từ Google Sheets:", e);
            // Fallback to mockData
            return window.mockData;
        }
    }
};
