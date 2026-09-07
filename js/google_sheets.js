// ============================================================
// Google Sheets Service - Multi-File Mode
// Đọc dữ liệu từ file riêng của từng đơn vị
// ============================================================

// ============================================================
// CẤU HÌNH 5 FILE GOOGLE SHEETS (1 FILE / ĐƠN VỊ)
// ============================================================
const COMPANY_SHEETS = {
    'THH': {
        name: 'Tân Hồng Hà',
        id: '1NkEmKjlHbX7r6PqxCaHBUGCox3aRIid7KSFZDYds_rs'
    },
    'Viet': {
        name: 'Việt',
        id: '1RGXSjNekSBjnZGcKaDfyvVPVG99ZG8S1RPJOXsjEyd8'
    },
    'XemSon': {
        name: 'Xem Sơn',
        id: '17pAZh0BM9KKas3mh5kLJlZ0D5GU3eEdAGJB_77Fzg_g'
    },
    'VPSM': {
        name: 'VPS M',
        id: '1fp5oghEMbrmLZRXhgLPtfY4mmo3sVIRmGAkieIik7ng'
    },
    'ITSS': {
        name: 'ITSS',
        id: '1t1a6DstUqlNctuQPE8RkdGBeL4BxyLDVGK46YVx2JPk'
    }
};

// File MASTER DATA VPS – vẫn dùng cho Khách hàng, Nhân sự, Sản phẩm, v.v.
const MASTER_SHEET_ID = '18tWiuyHmvP_axcL_-yGmJj_rqo6Skqivf17WTuAJdwM';

const companyIdMap = {
    'Tân Hồng Hà': 'THH',
    'Tan Hong Ha': 'THH',
    'Việt': 'Viet',
    'Viet': 'Viet',
    'Xem Sơn': 'XemSon',
    'Xem Son': 'XemSon',
    'VPS M': 'VPSM',
    'VPSM': 'VPSM',
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

// ============================================================
// HELPERS
// ============================================================

// Parse số từ các định dạng: "744.457.000 đ", "9,989,000,000", "1700000000", "41,45%"
function parseNumber(val) {
    if (!val || val === '-' || val === '') return 0;
    if (typeof val === 'number') return val;
    let s = val.toString().trim();
    // Bỏ đơn vị tiền
    s = s.replace(/đ/gi, '').replace(/vnd/gi, '').trim();
    // Bỏ %
    s = s.replace(/%/g, '').trim();
    // Xử lý định dạng Việt Nam: dấu chấm là phân cách ngàn, dấu phẩy là thập phân
    // VD: "744.457.000" → 744457000 | "41,45" → 41.45
    // Nhưng cũng có "9,989,000,000" (dạng US) → cần phân biệt
    const dotCount = (s.match(/\./g) || []).length;
    const commaCount = (s.match(/,/g) || []).length;
    if (dotCount > 1) {
        // Định dạng VN: 744.457.000 → remove dots
        s = s.replace(/\./g, '');
    } else if (commaCount > 1) {
        // Định dạng US: 9,989,000,000 → remove commas
        s = s.replace(/,/g, '');
    } else if (dotCount === 1 && commaCount === 1) {
        // Có cả hai: xem cái nào cuối cùng
        const lastDot = s.lastIndexOf('.');
        const lastComma = s.lastIndexOf(',');
        if (lastComma > lastDot) {
            // Dấu phẩy là thập phân: 1.234,56
            s = s.replace(/\./g, '').replace(',', '.');
        } else {
            // Dấu chấm là thập phân: 1,234.56
            s = s.replace(/,/g, '');
        }
    } else if (commaCount === 1) {
        // 41,45 → dấu phẩy là thập phân
        s = s.replace(',', '.');
    } else {
        // Chỉ có chấm: 1.5 → thập phân bình thường
    }
    return parseFloat(s) || 0;
}

// Fetch CSV từ 1 file Google Sheets (theo tên sheet hoặc sheet đầu tiên)
async function fetchCsvFromFile(sheetId, sheetName) {
    let url;
    if (sheetName) {
        url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    } else {
        url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv`;
    }
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed: ' + url);
    const text = await res.text();
    return new Promise((resolve) => {
        Papa.parse(text, {
            header: false,
            skipEmptyLines: true,
            complete: (r) => resolve(r.data)
        });
    });
}

// Fetch CSV từ MASTER DATA (dùng cho sheet không có trong file đơn vị)
async function fetchCsv(sheetName) {
    return fetchCsvFromFile(MASTER_SHEET_ID, sheetName);
}

// ============================================================
// PARSE DOANH THU TỪ 1 FILE ĐƠN VỊ
// Format CSV: Row0=header, Row1+ = data
// Col: [0]=Tháng/Năm, [1]=Công ty, [2]=KH, [3]=TH, [4]=TLG, [5]=CP, [6]=LNTT
// Xử lý cả trường hợp cột tháng bị trống (như file THH)
// ============================================================
function parseRevenueFromFile(csv, cId) {
    const results = {};
    // Lấy tháng từ header (row[0]) nếu có
    let headerMonth = '';
    if (csv.length > 0 && csv[0]) {
        const h = csv[0][0] ? csv[0][0].toString() : '';
        const mMatch = h.match(/(\d{2}\/\d{4})/);
        if (mMatch) headerMonth = mMatch[1];
    }
    
    for (let i = 1; i < csv.length; i++) {
        const row = csv[i];
        if (!row) continue;
        
        // Xác định tháng: lấy từ col[0], nếu không có thì dùng headerMonth
        let thang = row[0] ? row[0].toString().trim() : '';
        if (!thang.match(/\d{2}\/\d{4}/)) {
            thang = headerMonth || '08/2026';
        } else {
            const m = thang.match(/(\d{2}\/\d{4})/);
            thang = m ? m[1] : headerMonth || '08/2026';
        }

        const plan   = parseNumber(row[2]);
        const actual = parseNumber(row[3]);
        const lgPct  = parseNumber(row[4]);
        const cp     = parseNumber(row[5]);
        const lntt   = parseNumber(row[6]);

        // Ghi nhận nếu có ít nhất 1 giá trị > 0
        if (actual > 0 || plan > 0 || cp > 0 || lntt > 0) {
            if (!results[thang]) {
                results[thang] = { plan, actual, ttlg: 0, lg_pct: lgPct, cp_lg_pct: 0, cp, lntt };
            } else {
                // Cộng dồn nếu cùng tháng (nhiều dòng)
                results[thang].plan   += plan;
                results[thang].actual += actual;
                results[thang].cp     += cp;
                results[thang].lntt   += lntt;
            }
        }
    }
    return results;
}

// ============================================================
// MAIN SERVICE
// ============================================================
window.GoogleSheetsService = {

    async loadAllData() {
        try {
            console.log('[GS] Bat dau tai du lieu tu 5 file don vi...');

            // ── 1. Tải song song dữ liệu từ 5 file đơn vị ──
            const companyIds = Object.keys(COMPANY_SHEETS);
            const companyDataPromises = companyIds.map(cId =>
                fetchCsvFromFile(COMPANY_SHEETS[cId].id, null)
                    .catch(e => { console.warn(`[GS] Loi tai ${cId}:`, e); return []; })
            );

            // ── 2. Tải song song dữ liệu từ MASTER (Khách hàng, Nhân sự, Tồn kho, etc.) ──
            const [custCsv, hrCsv, spCsv, cpCsv, isoCsv] = await Promise.all([
                fetchCsv('Khách hàng').catch(() => []),
                fetchCsv('Nhân sự').catch(() => []),
                fetchCsv('Sản phẩm').catch(() => []),
                fetchCsv('Chi phí').catch(() => []),
                fetchCsv('ISO').catch(() => [])
            ]);

            // Chờ tất cả file đơn vị
            const allCompanyCsvs = await Promise.all(companyDataPromises);

            console.log('[GS] Da tai xong du lieu. Bat dau xu ly...');

            // ── 3. Khởi tạo cấu trúc dữ liệu ──
            const newData = {
                revenue: {
                    total: 0,
                    plan2026: window.mockData.revenue.plan2026,
                    byCompany: {},
                    byMonth: {}      // { 'THH': {'08/2026': {...}, '09/2026': {...}}, ... }
                },
                debt: { total: 0, byCompany: {} },
                customers: {
                    total: 0,
                    trend: window.mockData.customers.trend,
                    matrix: {},
                    plan2026: window.mockData.customers.plan2026,
                    byCompany: {}
                },
                inventory: window.mockData.inventory,
                hr: {
                    totalEmployees: 0, newHires: 0, resignations: 0, probation: 0,
                    byDepartment: {}, byCompany: {}
                },
                products_raw: spCsv || [],
                expense_raw: cpCsv || [],
                iso_raw: isoCsv || []
            };

            // ── 4. Parse Revenue từ từng file đơn vị ──
            const revenueByMonth = {}; // { 'THH': { '08/2026': {...} } }

            companyIds.forEach((cId, idx) => {
                const csv = allCompanyCsvs[idx];
                if (!csv || csv.length < 2) return;

                const monthlyData = parseRevenueFromFile(csv, cId);
                revenueByMonth[cId] = monthlyData;

                // Lấy tháng gần nhất để hiển thị mặc định
                const months = Object.keys(monthlyData).sort();
                const latestMonth = months[months.length - 1];

                if (latestMonth && monthlyData[latestMonth]) {
                    const d = monthlyData[latestMonth];
                    newData.revenue.byCompany[cId] = d;
                    newData.revenue.total += d.actual;
                    console.log(`[GS] ${cId} (${latestMonth}): KH=${d.plan}, TH=${d.actual}, LNTT=${d.lntt}`);
                }
            });

            // Lưu byMonth để dashboard có thể lọc theo tháng
            newData.revenue.byMonth = revenueByMonth;
            window.GoogleSheetsService.revenueByMonth = revenueByMonth;

            // Tính tổng kế hoạch
            let totalPlan = 0;
            Object.values(newData.revenue.byCompany).forEach(d => { totalPlan += d.plan || 0; });
            // Ghi vào plan2026 nếu có
            if (totalPlan > 0) {
                newData.revenue.plan2026 = totalPlan;
            }

            // ── 5. Parse HR từ MASTER ──
            let hrByCompany = {};
            companyIds.forEach(cId => {
                hrByCompany[cId] = { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} };
            });
            hrByCompany['VPVPS'] = { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} };

            let currentHrCo = '';
            for (let i = 1; i < hrCsv.length; i++) {
                const row = hrCsv[i];
                if (!row) continue;
                if (row[1] && companyIdMap[row[1]]) currentHrCo = companyIdMap[row[1]];
                if (!currentHrCo && row[0] && companyIdMap[row[0]]) currentHrCo = companyIdMap[row[0]];
                if (!currentHrCo) continue;
                const nghiviec = parseNumber(row[5]);
                const thuviec  = parseNumber(row[6]);
                const cuoiky   = parseNumber(row[7]);
                if (hrByCompany[currentHrCo]) {
                    hrByCompany[currentHrCo].probation += thuviec;
                    hrByCompany[currentHrCo].resigned  += nghiviec;
                    hrByCompany[currentHrCo].official  += Math.max(cuoiky - thuviec, 0);
                    hrByCompany[currentHrCo].quota     += cuoiky;
                }
            }
            newData.hr.byCompany = hrByCompany;

            // ── 6. Parse Customers từ MASTER ──
            const monthsData = {};
            const availableMonths = new Set();
            let currentCo = '', currentMonth = '';

            for (let i = 3; i < custCsv.length; i++) {
                const row = custCsv[i];
                if (!row) continue;
                if (row[0]) {
                    const m = row[0].toString().trim();
                    if (m.includes('/')) {
                        currentMonth = m;
                        availableMonths.add(m);
                        currentCo = companyIdMap[row[1]] || currentCo;
                    } else if (companyIdMap[m]) {
                        currentCo = companyIdMap[m];
                    }
                }
                let catName = row[2];
                if (!catName && customerCatMap[row[1]]) catName = row[1];
                else if (!catName && customerCatMap[row[0]]) catName = row[0];
                if (!currentMonth) currentMonth = '08/2026';
                if (!currentCo) continue;
                const catId = customerCatMap[catName];
                if (!catId) continue;
                const rowData = {
                    dau:      { may: parseNumber(row[3]),  kh: parseNumber(row[4]) },
                    ke_hoach: { may: parseNumber(row[5]),  kh: parseNumber(row[6]) },
                    tang:     { may: parseNumber(row[7]),  kh: parseNumber(row[8]) },
                    giam:     { may: parseNumber(row[9]),  kh: parseNumber(row[10]) },
                    cuoi:     { may: parseNumber(row[11]), kh: parseNumber(row[12]) }
                };
                if (!monthsData[currentMonth]) monthsData[currentMonth] = {};
                if (!monthsData[currentMonth][currentCo]) monthsData[currentMonth][currentCo] = {};
                monthsData[currentMonth][currentCo][catId] = rowData;
            }

            window.GoogleSheetsService.customersByMonth = monthsData;

            const sortedMonths = Array.from(availableMonths).sort();
            const defaultMonth = sortedMonths.length > 0 ? sortedMonths[sortedMonths.length - 1] : '08/2026';

            window.GoogleSheetsService.buildCustomerDataForMonth = function(month) {
                const targetData = monthsData[month] || {};
                const res = {
                    total: 0,
                    trend: window.mockData.customers.trend,
                    matrix: {},
                    plan2026: window.mockData.customers.plan2026,
                    byCompany: {}
                };
                Object.values(companyIdMap).forEach(cId => { res.matrix[cId] = targetData[cId] || {}; });
                res.matrix['all'] = {};
                Object.keys(res.matrix).forEach(cId => {
                    if (cId === 'all') return;
                    Object.keys(res.matrix[cId]).forEach(catId => {
                        if (!res.matrix['all'][catId]) {
                            res.matrix['all'][catId] = {
                                ke_hoach:{may:0,kh:0}, dau:{may:0,kh:0},
                                tang:{may:0,kh:0}, giam:{may:0,kh:0}, cuoi:{may:0,kh:0}
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
                    if (m.thue_may) rental += m.thue_may.cuoi.kh;
                    if (m.mc)       rental += m.mc.cuoi.kh;
                    if (m.dv_photo)   service += m.dv_photo.cuoi.kh;
                    if (m.dv_may_in)  service += m.dv_may_in.cuoi.kh;
                    if (m.dv_khac)    service += m.dv_khac.cuoi.kh;
                    if (m.phan_phoi)  distribution += m.phan_phoi.cuoi.kh;
                    res.byCompany[cId] = { service, rental, distribution, new: 0, lost: 0, decreased: 0 };
                });
                const mAll = res.matrix['all'];
                for (let cat in mAll) res.total += mAll[cat].cuoi?.kh || 0;
                return res;
            };

            newData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(defaultMonth);

            // Populate month filter dropdown
            setTimeout(() => {
                const selectEl = document.getElementById('customers-month-filter');
                if (selectEl && sortedMonths.length > 0) {
                    selectEl.innerHTML = '';
                    sortedMonths.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m;
                        opt.textContent = 'THÁNG ' + m.split('/')[0];
                        if (m === defaultMonth) opt.selected = true;
                        selectEl.appendChild(opt);
                    });
                    const planHeader = document.getElementById('plan-header-title');
                    if (planHeader) {
                        planHeader.textContent = 'KẾ HOẠCH TÌM KIẾM THÊM THÁNG ' + defaultMonth.split('/')[0];
                    }
                    selectEl.addEventListener('change', (e) => {
                        const nm = e.target.value;
                        if (planHeader) planHeader.textContent = 'KẾ HOẠCH TÌM KIẾM THÊM THÁNG ' + nm.split('/')[0];
                        window.mockData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(nm);
                        if (window.FilterManager) window.FilterManager.triggerFilterChange();
                    });
                }
            }, 1000);

            // ── 7. Ghi vào mockData ──
            if (newData.revenue.total > 0) window.mockData.revenue = newData.revenue;
            if (newData.debt.total > 0)    window.mockData.debt    = newData.debt;
            if (newData.customers.total > 0) window.mockData.customers = newData.customers;
            window.mockData.hr            = newData.hr;
            window.mockData.products_raw  = newData.products_raw;
            window.mockData.expense_raw   = newData.expense_raw;
            window.mockData.iso_raw       = newData.iso_raw;

            console.log('[GS] Hoan tat! Revenue total:', newData.revenue.total);
            console.log('[GS] Revenue byCompany:', JSON.stringify(newData.revenue.byCompany));

            // Trigger re-render
            if (window.FilterManager) window.FilterManager.triggerFilterChange();
            return window.mockData;

        } catch (e) {
            console.error('[GS] Loi load du lieu:', e);
            return window.mockData;
        }
    }
};
