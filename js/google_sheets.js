// ============================================================
// Google Sheets Service - Multi-File / Multi-Sheet Live Pipeline
// Tải và tổng hợp toàn bộ 8 sheet từ 5 file Google Sheets riêng của từng đơn vị
// ============================================================

const COMPANY_SHEETS = {
    'THH':    { name: 'Tân Hồng Hà', id: '1NkEmKjlHbX7r6PqxCaHBUGCox3aRIid7KSFZDYds_rs' },
    'Viet':   { name: 'Việt',         id: '1RGXSjNekSBjnZGcKaDfyvVPVG99ZG8S1RPJOXsjEyd8' },
    'XemSon': { name: 'Xem Sơn',     id: '17pAZh0BM9KKas3mh5kLJlZ0D5GU3eEdAGJB_77Fzg_g' },
    'VPSM':   { name: 'VPS M',       id: '1fp5oghEMbrmLZRXhgLPtfY4mmo3sVIRmGAkieIik7ng' },
    'ITSS':   { name: 'ITSS',        id: '1t1a6DstUqlNctuQPE8RkdGBeL4BxyLDVGK46YVx2JPk' },
};

const SHEET_NAMES = ['Doanh thu', 'Công nợ', 'Khách hàng', 'Tồn kho', 'Nhân sự', 'Sản Phẩm', 'Chi Phí', 'ISO'];

const companyIdMap = {
    'Tân Hồng Hà': 'THH', 'Tan Hong Ha': 'THH', 'tân hồng hà': 'THH', 'THH': 'THH',
    'Việt': 'Viet', 'Viet': 'Viet', 'viet': 'Viet', 'VIỆT': 'Viet',
    'Xem Sơn': 'XemSon', 'Xem Son': 'XemSon', 'xemson': 'XemSon', 'xem sơn': 'XemSon', 'XESCO': 'XemSon', 'XemSon': 'XemSon',
    'VPS M': 'VPSM', 'VPSM': 'VPSM', 'vpsm': 'VPSM',
    'ITSS': 'ITSS', 'itss': 'ITSS',
    'Văn phòng VPS': 'VPVPS', 'VPVPS': 'VPVPS'
};

const customerCatMap = {
    'Thuê máy': 'thue_may', 'Thue may': 'thue_may', 'thuê máy': 'thue_may',
    'MC': 'mc', 'mc': 'mc',
    'Dịch vụ - Photo': 'dv_photo', 'Dich vu - Photo': 'dv_photo', 'dịch vụ - photo': 'dv_photo',
    'Dịch vụ - Máy in': 'dv_may_in', 'Dich vu - May in': 'dv_may_in', 'dịch vụ - máy in': 'dv_may_in',
    'Dịch vụ khác': 'dv_khac', 'Dich vu khac': 'dv_khac', 'dịch vụ khác': 'dv_khac',
    'Phân phối (Đại lý)': 'phan_phoi', 'Phan phoi (Dai ly)': 'phan_phoi', 'phân phối (đại lý)': 'phan_phoi'
};

// ============================================================
// HELPERS
// ============================================================
function parseNumber(val) {
    if (!val || val === '-' || val === '') return 0;
    if (typeof val === 'number') return val;
    let s = val.toString().trim()
        .replace(/đ/gi, '').replace(/vnd/gi, '')
        .replace(/%/g, '').trim();

    // Nếu chuỗi là các nhóm 3 chữ số cách nhau bởi dấu chấm hoặc phẩy (VD: "8,779,000.000" hoặc "14.000.000.000")
    // thì tất cả đều là dấu phân cách ngàn
    if (/^\d{1,3}(?:[.,]\d{3})+$/.test(s)) {
        return parseFloat(s.replace(/[.,]/g, '')) || 0;
    }

    const dotCount  = (s.match(/\./g)  || []).length;
    const commaCount= (s.match(/,/g)   || []).length;
    if (dotCount > 1)        s = s.replace(/\./g, '');
    else if (commaCount > 1) s = s.replace(/,/g, '');
    else if (dotCount === 1 && commaCount === 1) {
        const lastDot = s.lastIndexOf('.');
        const lastComma = s.lastIndexOf(',');
        s = lastComma > lastDot
            ? s.replace(/\./g, '').replace(',', '.')
            : s.replace(/,/g, '');
    } else if (commaCount === 1) s = s.replace(',', '.');
    return parseFloat(s) || 0;
}

function resolveCompany(val) {
    if (!val) return '';
    const v = val.toString().trim();
    return companyIdMap[v] || companyIdMap[v.toLowerCase()] || '';
}

function extractMonthFromHeader(row0) {
    if (!row0) return '';
    const h = Array.isArray(row0) ? row0.join(' ') : row0.toString();
    const m = h.match(/(\d{2}\/\d{4})/);
    return m ? m[1] : '';
}

// Fallback CSV Parser thuần JS không phụ thuộc thư viện
function parseRawCSV(text) {
    const lines = [];
    let row = [];
    let cell = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        if (c === '"') {
            if (inQuotes && text[i+1] === '"') { cell += '"'; i++; }
            else { inQuotes = !inQuotes; }
        } else if (c === ',' && !inQuotes) {
            row.push(cell.trim());
            cell = '';
        } else if ((c === '\r' || c === '\n') && !inQuotes) {
            if (c === '\r' && text[i+1] === '\n') i++;
            row.push(cell.trim());
            if (row.some(x => x !== '')) lines.push(row);
            row = [];
            cell = '';
        } else {
            cell += c;
        }
    }
    if (cell || row.length > 0) {
        row.push(cell.trim());
        if (row.some(x => x !== '')) lines.push(row);
    }
    return lines;
}

async function fetchSheetCsv(sheetId, sheetName) {
    const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(sheetName)}`;
    try {
        const res = await fetch(url);
        if (!res.ok) return [];
        const text = await res.text();
        if (window.Papa) {
            return await new Promise(resolve => {
                Papa.parse(text, { header: false, skipEmptyLines: true, complete: r => resolve(r.data) });
            });
        }
        return parseRawCSV(text);
    } catch(e) { return []; }
}

// ============================================================
// PARSERS
// ============================================================

// 1. DOANH THU
function parseRevenue(csv, cId) {
    const headerMonth = csv.length > 0 ? extractMonthFromHeader(csv[0]) : '';
    const result = {};
    for (let i = 1; i < csv.length; i++) {
        const row = csv[i];
        if (!row) continue;
        let thang = row[0] ? row[0].toString().trim() : '';
        const m = thang.match(/(\d{2}\/\d{4})/);
        thang = m ? m[1] : (headerMonth || '08/2026');
        const plan = parseNumber(row[2]), actual = parseNumber(row[3]);
        const lgPct = parseNumber(row[4]), cp = parseNumber(row[5]), lntt = parseNumber(row[6]);
        if (actual > 0 || plan > 0 || cp > 0 || lntt > 0) {
            if (!result[thang]) result[thang] = { plan, actual, ttlg: 0, lg_pct: lgPct, cp_lg_pct: 0, cp, lntt };
            else {
                result[thang].plan += plan;
                result[thang].actual += actual;
                if (lgPct > 0) result[thang].lg_pct = lgPct;
                result[thang].cp += cp;
                result[thang].lntt += lntt;
            }
        }
    }
    return result;
}

// 2. CÔNG NỢ
function parseDebt(csv, cId) {
    const headerMonth = csv.length > 0 ? extractMonthFromHeader(csv[0]) : '';
    let thang = headerMonth || '08/2026';
    const result = {};

    // Kiểm tra nếu row 0 (header) có chứa số liệu (như trường hợp file Việt)
    let headerCurrent = 0, headerOverdue = 0, headerBad = 0;
    if (csv.length > 0 && csv[0]) {
        const r0 = csv[0];
        if (r0[2]) {
            const m = r0[2].match(/[\d.,]{7,}/g);
            if (m && m.length > 0) headerCurrent = parseNumber(m[0]);
        }
        if (r0[3]) {
            const m = r0[3].match(/[\d.,]{7,}/g);
            if (m && m.length > 0) headerOverdue = parseNumber(m[0]);
        }
        if (r0[4]) {
            const m = r0[4].match(/[\d.,]{7,}/g);
            if (m && m.length > 0) headerBad = parseNumber(m[0]);
        }
    }

    for (let i = 1; i < csv.length; i++) {
        const row = csv[i];
        if (!row) continue;
        const mMatch = row[0] ? row[0].toString().match(/(\d{2}\/\d{4})/) : null;
        if (mMatch) thang = mMatch[1];
        let current = parseNumber(row[2]), overdue = parseNumber(row[3]), bad = parseNumber(row[4]);
        
        // Nếu row 1 có số quá nhỏ hoặc % mà header có số tiền lớn
        if (current < 1000 && headerCurrent > 0) current = headerCurrent;
        if (overdue < 1000 && headerOverdue > 0) overdue = headerOverdue;
        if (bad < 1000 && headerBad > 0) bad = headerBad;

        if (current > 0 || overdue > 0 || bad > 0) {
            if (!result[thang]) result[thang] = { current, overdue, bad };
            else { result[thang].current += current; result[thang].overdue += overdue; result[thang].bad += bad; }
        }
    }

    // Nếu vẫn chưa có kết quả nhưng header có số
    if (Object.keys(result).length === 0 && (headerCurrent > 0 || headerOverdue > 0)) {
        result[thang] = { current: headerCurrent, overdue: headerOverdue, bad: headerBad };
    }

    return result;
}

// 3. NHÂN SỰ
function parseHR(csv, cId) {
    const result = { quota: 0, official: 0, probation: 0, resigned: 0, newHires: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'',solution:''} };
    let dataStart = 1;
    for (let i = 0; i < Math.min(csv.length, 5); i++) {
        const row = csv[i];
        if (row && row.join('').match(/Tháng|Thang|Phòng|Phong/i)) { dataStart = i + 1; break; }
    }

    let hasDeptRows = false;
    // Kiểm tra xem có các dòng phòng ban cụ thể không
    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (row && row[2] && row[2].trim() !== '') {
            hasDeptRows = true;
            break;
        }
    }

    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (!row) continue;
        const dept = row[2] ? row[2].trim() : '';
        // Nếu có dòng phòng ban, bỏ qua dòng tổng hợp không có phòng ban
        if (hasDeptRows && !dept) continue;

        const cuoiky   = parseNumber(row[7]);
        const thuviec  = parseNumber(row[6]);
        const nghiviec = parseNumber(row[5]);
        const tuyenmoi = parseNumber(row[4]);
        if (cuoiky > 0 || tuyenmoi > 0 || nghiviec > 0 || thuviec > 0) {
            result.quota     += cuoiky;
            result.probation += thuviec;
            result.resigned  += nghiviec;
            result.newHires  += tuyenmoi;
            result.official  += Math.max(cuoiky - thuviec, 0);
        }
    }
    return result;
}

// 4. KHÁCH HÀNG
function parseCustomers(csv, cId) {
    const headerMonth = csv.length > 0 ? extractMonthFromHeader(csv[0]) : '';
    let thang = headerMonth || '08/2026';
    const result = {}; 
    let dataStart = 1;
    for (let i = 0; i < Math.min(csv.length, 5); i++) {
        const row = csv[i];
        if (row && row.join('').match(/Mảng|Mang|Tháng|Thang/i)) { dataStart = i + 1; break; }
    }
    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (!row) continue;
        const mMatch = row[0] ? row[0].toString().match(/(\d{2}\/\d{4})/) : null;
        if (mMatch) thang = mMatch[1];
        const catRaw = row[2] ? row[2].toString().trim() : '';
        const catId = customerCatMap[catRaw] || customerCatMap[catRaw.toLowerCase()];
        if (!catId) continue;
        const dau_may  = parseNumber(row[3]), dau_kh  = parseNumber(row[4]);
        const tang_may = parseNumber(row[5]), tang_kh = parseNumber(row[6]);
        const giam_may = parseNumber(row[7]), giam_kh = parseNumber(row[8]);
        const cuoi_may = parseNumber(row[9]), cuoi_kh = parseNumber(row[10]);
        if (!result[thang]) result[thang] = {};
        result[thang][catId] = {
            dau:      { may: dau_may,  kh: dau_kh  },
            ke_hoach: { may: 0, kh: 0 },
            tang:     { may: tang_may, kh: tang_kh },
            giam:     { may: giam_may, kh: giam_kh },
            cuoi:     { may: cuoi_may || (dau_may + tang_may - giam_may), kh: cuoi_kh || (dau_kh + tang_kh - giam_kh) }
        };
    }
    return result;
}

// 5. TỒN KHO
function parseInventory(csv, cId) {
    const headerMonth = csv.length > 0 ? extractMonthFromHeader(csv[0]) : '';
    let thang = headerMonth || '08/2026';
    let totalValue = 0, totalItems = 0;
    let dataStart = 1;
    for (let i = 0; i < Math.min(csv.length, 5); i++) {
        const row = csv[i];
        if (row && row.join('').match(/Danh mục|Danh muc|Tháng|Thang/i)) { dataStart = i + 1; break; }
    }
    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (!row) continue;
        const mMatch = row[0] ? row[0].toString().match(/(\d{2}\/\d{4})/) : null;
        if (mMatch) thang = mMatch[1];
        // Giá trị thường ở col[6]
        let gtri = parseNumber(row[6]);
        // Kiểm tra xem có cột nào khác chứa số tiền lớn không
        if (gtri === 0) {
            for (let c = 1; c < row.length; c++) {
                const val = parseNumber(row[c]);
                if (val > 1000000) { gtri = val; break; }
            }
        }
        const sl = parseNumber(row[5]);
        if (gtri > 0) { totalValue += gtri; totalItems += (sl || 1); }
    }
    return { totalValue, totalItems, thang };
}

// ============================================================
// MAIN SERVICE
// ============================================================
window.GoogleSheetsService = {

    async loadAllData() {
        try {
            console.log('[GS] Bat dau tai du lieu tu 5 cong ty (8 sheets/file)...');
            const companyIds = Object.keys(COMPANY_SHEETS);

            // Tải song song tất cả 8 sheet từ 5 file = 40 requests
            const allFetches = companyIds.map(cId =>
                Promise.all(SHEET_NAMES.map(sname =>
                    fetchSheetCsv(COMPANY_SHEETS[cId].id, sname).catch(() => [])
                ))
            );
            const allResults = await Promise.all(allFetches);

            const revenueByCompany   = {};
            const revenueByMonth     = {};
            const debtByCompany      = {};
            const hrByCompany        = {};
            const customersByMonth   = {};
            const inventoryByCompany = {};
            const rawProducts        = [['CÔNG TY', 'THÁNG', 'HÃNG', 'NHÓM', 'DOANH THU']];
            const rawExpenses        = [['CÔNG TY', 'THÁNG', 'NHÓM', 'HẠNG MỤC', 'GIÁ TRỊ']];
            const rawISO             = [['CÔNG TY', 'PHÒNG BAN', 'TÊN QUY TRÌNH / QUY ĐỊNH', 'PHÂN LOẠI']];

            let totalRevVND = 0, totalDebtVND = 0;
            const availableMonths = new Set();

            companyIds.forEach((cId, ci) => {
                const compName = COMPANY_SHEETS[cId].name;
                const [revCsv, debtCsv, custCsv, invCsv, hrCsv, spCsv, cpCsv, isoCsv] = allResults[ci];

                // 1. DOANH THU
                const revByM = parseRevenue(revCsv, cId);
                revenueByMonth[cId] = revByM;
                const months = Object.keys(revByM).sort();
                const latestM = months[months.length - 1];
                if (latestM && revByM[latestM]) {
                    const r = revByM[latestM];
                    // Chuyển đổi sang TỶ VNĐ cho charts
                    const actualTy = r.actual > 1e6 ? r.actual / 1e9 : r.actual;
                    const planTy   = r.plan > 1e6 ? r.plan / 1e9 : r.plan;
                    revenueByCompany[cId] = {
                        actual: parseFloat(actualTy.toFixed(3)),
                        plan:   parseFloat(planTy.toFixed(3)),
                        actualRaw: r.actual,
                        planRaw:   r.plan,
                        lg_pct:    r.lg_pct,
                        cp:        r.cp,
                        lntt:      r.lntt
                    };
                    totalRevVND += r.actual;
                    months.forEach(m => availableMonths.add(m));
                }

                // 2. CÔNG NỢ
                const debtByM = parseDebt(debtCsv, cId);
                const debtMonths = Object.keys(debtByM).sort();
                const latestDM = debtMonths[debtMonths.length - 1];
                if (latestDM && debtByM[latestDM]) {
                    const d = debtByM[latestDM];
                    const curTy = d.current > 1e6 ? d.current / 1e9 : d.current;
                    const ovrTy = d.overdue > 1e6 ? d.overdue / 1e9 : d.overdue;
                    const badTy = d.bad > 1e6 ? d.bad / 1e9 : d.bad;
                    debtByCompany[cId] = {
                        current: parseFloat(curTy.toFixed(3)),
                        overdue: parseFloat(ovrTy.toFixed(3)),
                        bad:     parseFloat(badTy.toFixed(3)),
                        rawCurrent: d.current,
                        rawOverdue: d.overdue,
                        rawBad:     d.bad
                    };
                    totalDebtVND += (d.current + d.overdue + d.bad);
                }

                // 3. NHÂN SỰ
                hrByCompany[cId] = parseHR(hrCsv, cId);

                // 4. KHÁCH HÀNG
                const custByM = parseCustomers(custCsv, cId);
                Object.entries(custByM).forEach(([month, catData]) => {
                    availableMonths.add(month);
                    if (!customersByMonth[month]) customersByMonth[month] = {};
                    customersByMonth[month][cId] = catData;
                });

                // 5. TỒN KHO
                inventoryByCompany[cId] = parseInventory(invCsv, cId);

                // 6. SẢN PHẨM (ghép vào rawProducts 2D)
                if (spCsv && spCsv.length > 1) {
                    for (let r = 1; r < spCsv.length; r++) {
                        const row = spCsv[r];
                        if (row && row.some(x => x !== '')) {
                            const ctyName = row[0] || compName;
                            rawProducts.push([ctyName, row[1] || '8', row[2] || '', row[3] || '', row[4] || '0']);
                        }
                    }
                }

                // 7. CHI PHÍ (ghép vào rawExpenses 2D)
                if (cpCsv && cpCsv.length > 1) {
                    for (let r = 1; r < cpCsv.length; r++) {
                        const row = cpCsv[r];
                        if (row && row.some(x => x !== '')) {
                            const ctyName = row[0] || compName;
                            rawExpenses.push([ctyName, row[1] || '8', row[2] || '', row[3] || '', row[4] || '0']);
                        }
                    }
                }

                // 8. ISO (ghép vào rawISO 2D)
                if (isoCsv && isoCsv.length > 1) {
                    for (let r = 1; r < isoCsv.length; r++) {
                        const row = isoCsv[r];
                        if (row && row.some(x => x !== '')) {
                            const ctyName = row[0] || compName;
                            rawISO.push([ctyName, row[1] || '', row[2] || '', row[3] || '']);
                        }
                    }
                }
            });

            // ── Tổng hợp Kế hoạch Tài chính 2026 (ĐVT: Triệu VNĐ) cho bảng revenuePlanTable ──
            const plan2026 = {
                'all': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
            };
            companyIds.forEach(cId => {
                const r = revenueByCompany[cId];
                if (r) {
                    const dsTr   = Math.round((r.planRaw || 0) / 1e6);
                    const actTr  = Math.round((r.actualRaw || 0) / 1e6);
                    const cpTr   = Math.round((r.cp || 0) / 1e6);
                    const lnttTr = Math.round((r.lntt || 0) / 1e6);
                    plan2026[cId] = {
                        ds: dsTr,
                        actual: actTr,
                        ttlg: 0,
                        lg_pct: r.lg_pct || 0,
                        cp_lg_pct: 0,
                        cp: cpTr,
                        lntt: lnttTr
                    };
                    plan2026['all'].ds     += dsTr;
                    plan2026['all'].actual += actTr;
                    plan2026['all'].cp     += cpTr;
                    plan2026['all'].lntt   += lnttTr;
                }
            });
            if (plan2026['all'].actual > 0 && plan2026['all'].ds > 0) {
                plan2026['all'].lg_pct = parseFloat(((plan2026['all'].actual / plan2026['all'].ds) * 100).toFixed(1));
            }

            // ── Cập nhật mockData.revenue ──
            if (!window.mockData) window.mockData = {};
            if (!window.mockData.inventory) window.mockData.inventory = {};
            if (!window.mockData.customers) window.mockData.customers = {};
            const totalRevTy = parseFloat((totalRevVND / 1e9).toFixed(3));
            window.mockData.revenue = {
                total: totalRevTy,
                plan2026: plan2026,
                byCompany: revenueByCompany,
                byMonth: revenueByMonth
            };

            // ── Cập nhật mockData.debt ──
            const totalDebtTy = parseFloat((totalDebtVND / 1e9).toFixed(3));
            window.mockData.debt = {
                total: totalDebtTy,
                byCompany: debtByCompany,
                badDebtsList: window.mockData.debt?.badDebtsList || [
                    { id: 1, customer: 'Công ty Cổ phần Alpha', company: 'THH', amount: 250000000, daysOverdue: 120, status: 'Khoá tài khoản' },
                    { id: 2, customer: 'Tập đoàn Beta', company: 'XemSon', amount: 500000000, daysOverdue: 95, status: 'Đang pháp lý' },
                    { id: 3, customer: 'Đại lý Gamma', company: 'Viet', amount: 120000000, daysOverdue: 150, status: 'Khoá tài khoản' },
                    { id: 4, customer: 'Cửa hàng Delta', company: 'ITSS', amount: 85000000, daysOverdue: 110, status: 'Chờ thanh toán' },
                    { id: 5, customer: 'Đại lý Epsilon', company: 'VPSM', amount: 150000000, daysOverdue: 60, status: 'Đang theo dõi' }
                ]
            };

            // ── Cập nhật mockData.hr ──
            const totalEmp = Object.values(hrByCompany).reduce((s, h) => s + (h.quota || 0), 0);
            const totalProb = Object.values(hrByCompany).reduce((s, h) => s + (h.probation || 0), 0);
            const totalResign = Object.values(hrByCompany).reduce((s, h) => s + (h.resigned || 0), 0);
            const totalNew = Object.values(hrByCompany).reduce((s, h) => s + (h.newHires || 0), 0);
            window.mockData.hr = {
                totalEmployees: totalEmp,
                newHires: totalNew,
                resignations: totalResign,
                probation: totalProb,
                byDepartment: {},
                byCompany: hrByCompany
            };

            // ── Cập nhật Tồn kho ──
            let invTotalVND = 0;
            Object.values(inventoryByCompany).forEach(iv => { invTotalVND += (iv.totalValue || 0); });
            window.mockData.inventory = {
                ...window.mockData.inventory,
                total: parseFloat((invTotalVND / 1e9).toFixed(2)),
                totalValue: invTotalVND,
                byCompany: inventoryByCompany
            };

            // ── Cập nhật raw data cho Sản Phẩm, Chi Phí, ISO ──
            window.mockData.products_raw = rawProducts;
            window.mockData.expense_raw  = rawExpenses;
            window.mockData.iso_raw      = rawISO;

            // ── Customers Builder (đảm bảo không bao giờ undefined 6 categories) ──
            const standardCats = ['thue_may', 'mc', 'dv_photo', 'dv_may_in', 'dv_khac', 'phan_phoi'];

            window.GoogleSheetsService.buildCustomerDataForMonth = function(month) {
                const targetData = customersByMonth[month] || {};
                const res = {
                    total: 0,
                    trend: window.mockData.customers.trend,
                    matrix: {},
                    plan2026: window.mockData.customers.plan2026,
                    byCompany: {}
                };

                // Khởi tạo đầy đủ 6 danh mục cho từng công ty
                Object.keys(COMPANY_SHEETS).forEach(cId => {
                    res.matrix[cId] = {};
                    const compCats = targetData[cId] || {};
                    standardCats.forEach(catId => {
                        res.matrix[cId][catId] = compCats[catId] || {
                            dau: { may: 0, kh: 0 },
                            ke_hoach: { may: 0, kh: 0 },
                            tang: { may: 0, kh: 0 },
                            giam: { may: 0, kh: 0 },
                            cuoi: { may: 0, kh: 0 }
                        };
                    });
                });

                // Tổng hợp 'all'
                res.matrix['all'] = {};
                standardCats.forEach(catId => {
                    res.matrix['all'][catId] = {
                        dau: { may: 0, kh: 0 },
                        ke_hoach: { may: 0, kh: 0 },
                        tang: { may: 0, kh: 0 },
                        giam: { may: 0, kh: 0 },
                        cuoi: { may: 0, kh: 0 }
                    };
                    Object.keys(COMPANY_SHEETS).forEach(cId => {
                        const r = res.matrix[cId][catId];
                        const a = res.matrix['all'][catId];
                        a.dau.may  += r.dau.may;
                        a.dau.kh   += r.dau.kh;
                        a.tang.may += r.tang.may;
                        a.tang.kh  += r.tang.kh;
                        a.giam.may += r.giam.may;
                        a.giam.kh  += r.giam.kh;
                        a.cuoi.may += r.cuoi.may;
                        a.cuoi.kh  += r.cuoi.kh;
                    });
                });

                // byCompany summary
                Object.keys(COMPANY_SHEETS).forEach(cId => {
                    const m = res.matrix[cId];
                    const rental = (m.thue_may?.cuoi?.kh || 0) + (m.mc?.cuoi?.kh || 0);
                    const service = (m.dv_photo?.cuoi?.kh || 0) + (m.dv_may_in?.cuoi?.kh || 0) + (m.dv_khac?.cuoi?.kh || 0);
                    const distribution = m.phan_phoi?.cuoi?.kh || 0;
                    res.byCompany[cId] = { service, rental, distribution, new: 0, lost: 0, decreased: 0 };
                });

                // Total customers
                let tot = 0;
                standardCats.forEach(catId => {
                    tot += res.matrix['all'][catId].cuoi.kh;
                });
                res.total = tot || 2227;
                return res;
            };

            const sortedMonths = Array.from(availableMonths).sort();
            const defaultMonth = sortedMonths.length > 0 ? sortedMonths[sortedMonths.length - 1] : '08/2026';
            window.mockData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(defaultMonth);

            console.log('[GS] DONG BO THANH CONG!', {
                revenueTotalTy: totalRevTy,
                debtTotalTy: totalDebtTy,
                totalEmployees: totalEmp,
                inventoryTotalTy: (invTotalVND / 1e9).toFixed(2),
                customersTotal: window.mockData.customers.total
            });

            // Kích hoạt re-render UI
            if (window.FilterManager) window.FilterManager.triggerFilterChange();
            return window.mockData;

        } catch(e) {
            console.error('[GS] Loi tong hop du lieu:', e);
            return window.mockData;
        }
    }
};
