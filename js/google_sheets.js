
const SHEET_ID = '18tWiuyHmvP_axcL_-yGmJj_rqo6Skqivf17WTuAJdwM';

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
    const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
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
            let currentMonth = '';
            
            // We will parse all months into a temporary dictionary: monthsData[month][company][category]
            const monthsData = {};
            const availableMonths = new Set();

            for (let i = 3; i < custCsv.length; i++) {
                const row = custCsv[i];
                if (row[0]) {
                    // Try to extract month if it's there
                    // Because merged cells might leave month blank on subsequent rows, we keep track of it
                    const m = row[0].toString().trim();
                    // Basic regex to check if it's a month like 08/2026
                    if (m.includes('/')) {
                        currentMonth = m;
                        availableMonths.add(m);
                        currentCompany = companyIdMap[row[1]] || currentCompany;
                    } else if (companyIdMap[m]) {
                        // Sometimes column 0 is company if Month is omitted
                        currentCompany = companyIdMap[m];
                    }
                }
                
                // If the CSV structure is Month | Company | Category, 
                // and due to merges Month and Company might be in row[0] and row[1] only on the first row of a block
                let catName = row[2];
                // Handle case where Month is missing and everything shifted (if user unmerged)
                if(!catName && customerCatMap[row[1]]) {
                    catName = row[1];
                } else if(!catName && customerCatMap[row[0]]) {
                    catName = row[0];
                }

                if (!currentMonth) currentMonth = "08/2026"; // Fallback
                if (!currentCompany) continue;
                
                const catId = customerCatMap[catName];
                if(!catId) continue;

                const rowData = {
                    dau: { may: parseNumber(row[3]), kh: parseNumber(row[4]) },
                    ke_hoach: { may: parseNumber(row[5]), kh: parseNumber(row[6]) },
                    tang: { may: parseNumber(row[7]), kh: parseNumber(row[8]) },
                    giam: { may: parseNumber(row[9]), kh: parseNumber(row[10]) },
                    cuoi: { may: parseNumber(row[11]), kh: parseNumber(row[12]) }
                };
                
                if (!monthsData[currentMonth]) monthsData[currentMonth] = {};
                if (!monthsData[currentMonth][currentCompany]) monthsData[currentMonth][currentCompany] = {};
                monthsData[currentMonth][currentCompany][catId] = rowData;
            }

            // Expose the raw monthsData so the UI can filter it
            window.GoogleSheetsService.customersByMonth = monthsData;
            
            // Get the last month as default
            const sortedMonths = Array.from(availableMonths).sort();
            const defaultMonth = sortedMonths.length > 0 ? sortedMonths[sortedMonths.length - 1] : "08/2026";
            
            // Function to build standard mockData format from a specific month
            window.GoogleSheetsService.buildCustomerDataForMonth = function(month) {
                const targetData = monthsData[month] || {};
                const res = { total: 0, trend: window.mockData.customers.trend, matrix: {}, plan2026: window.mockData.customers.plan2026, byCompany: {} };
                
                Object.values(companyIdMap).forEach(cId => { res.matrix[cId] = targetData[cId] || {}; });
                res.matrix['all'] = {};

                // Aggregate 'all'
                Object.keys(res.matrix).forEach(cId => {
                    if (cId === 'all') return;
                    Object.keys(res.matrix[cId]).forEach(catId => {
                        if (!res.matrix['all'][catId]) {
                            res.matrix['all'][catId] = {
                                ke_hoach:{may:0,kh:0}, dau:{may:0,kh:0}, tang:{may:0,kh:0}, giam:{may:0,kh:0}, cuoi:{may:0,kh:0}
                            };
                        }
                        const r = res.matrix[cId][catId];
                        const a = res.matrix['all'][catId];
                        a.ke_hoach.may += r.ke_hoach?.may||0; a.ke_hoach.kh += r.ke_hoach?.kh||0;
                        a.dau.may += r.dau.may; a.dau.kh += r.dau.kh;
                        a.tang.may += r.tang.may; a.tang.kh += r.tang.kh;
                        a.giam.may += r.giam.may; a.giam.kh += r.giam.kh;
                        a.cuoi.may += r.cuoi.may; a.cuoi.kh += r.cuoi.kh;
                    });
                });

                Object.keys(res.matrix).forEach(cId => {
                    if (cId === 'all') return;
                    const m = res.matrix[cId];
                    let service = 0, rental = 0, distribution = 0;
                    if(m.thue_may) rental += m.thue_may.cuoi.kh;
                    if(m.mc) rental += m.mc.cuoi.kh;
                    if(m.dv_photo) service += m.dv_photo.cuoi.kh;
                    if(m.dv_may_in) service += m.dv_may_in.cuoi.kh;
                    if(m.dv_khac) service += m.dv_khac.cuoi.kh;
                    if(m.phan_phoi) distribution += m.phan_phoi.cuoi.kh;

                    res.byCompany[cId] = {
                        service, rental, distribution, new: 0, lost: 0, decreased: 0
                    };
                });
                
                const mAll = res.matrix['all'];
                for(let cat in mAll) {
                    res.total += mAll[cat].cuoi?.kh || 0;
                }
                return res;
            };

            // Set default month data into newData
            newData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(defaultMonth);
            
            // Populate Dropdown Options
            setTimeout(() => {
                const selectEl = document.getElementById('customers-month-filter');
                if (selectEl && sortedMonths.length > 0) {
                    selectEl.innerHTML = '';
                    sortedMonths.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m;
                        opt.textContent = "THÁNG " + m.split('/')[0];
                        if (m === defaultMonth) opt.selected = true;
                        selectEl.appendChild(opt);
                    });
                    
                    // Bind event listener
                    selectEl.addEventListener('change', (e) => {
                        const newMonth = e.target.value;
                        window.mockData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(newMonth);
                        // Re-trigger global filter to re-render UI
                        if(window.FilterManager) window.FilterManager.triggerFilterChange();
                    });
                }
            }, 1000);


            // Fallback for HR and Inventory since we haven't written parsers for them yet
            // To prevent crashes, we can pull them from mockData for now
            newData.inventory = window.mockData.inventory;
            newData.hr = window.mockData.hr;

            // Fallback to mockData if sheet is empty (so UI doesn't look blank during testing)
            if (newData.revenue.total > 0) {
                window.mockData.revenue = newData.revenue;
            }
            if (newData.debt.total > 0) {
                window.mockData.debt = newData.debt;
            }
            if (newData.customers.total > 0) {
                window.mockData.customers = newData.customers;
            }
            
            console.log("Successfully loaded data from Google Sheets:", newData);
            return window.mockData;

        } catch(e) {
            console.error("Lỗi khi load từ Google Sheets:", e);
            // Fallback to mockData
            return window.mockData;
        }
    }
};
