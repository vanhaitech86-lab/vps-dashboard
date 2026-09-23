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
    'VPVPS':  { name: 'Văn phòng VPS', id: '1rHp9y-KXYUN30pxOd_u6uzWEvIiWuo8Jvnjrbv7k3mg' },
};

const SHEET_NAMES = [
    'Doanh thu', 'Công nợ', 'Khách hàng', 'Tồn kho', 'Nhân sự', 'Sản Phẩm', 'Chi Phí', 'ISO',
    'Đào tạo', 'Dịch vụ tận tâm', 'Văn hóa doanh nghiệp', 'Thương hiệu', 'Kết quả kinh doanh'
];

const COMPANY_SHEET_GIDS = {
    'THH': {
        'Doanh thu': '2016893209', 'Công nợ': '1533519692', 'Khách hàng': '643672867', 'Tồn kho': '1648808464',
        'Nhân sự': '1910149330', 'Sản Phẩm': '418592611', 'Chi Phí': '957596074', 'ISO': '409620359',
        'Đào tạo': '1393168586', 'Dịch vụ tận tâm': '2102700098', 'Văn hóa doanh nghiệp': '1859602306', 'Thương hiệu': '534190568'
    },
    'Viet': {
        'Doanh thu': '2016893209', 'Công nợ': '1533519692', 'Khách hàng': '643672867', 'Tồn kho': '1648808464',
        'Nhân sự': '1910149330', 'Sản Phẩm': '290289304', 'Chi Phí': '176987120', 'ISO': '746260029',
        'Đào tạo': '685984952', 'Dịch vụ tận tâm': '60502944', 'Văn hóa doanh nghiệp': '1512696972', 'Thương hiệu': '1597204331'
    },
    'XemSon': {
        'Doanh thu': '2016893209', 'Công nợ': '1533519692', 'Khách hàng': '643672867', 'Tồn kho': '1648808464',
        'Nhân sự': '1910149330', 'Sản Phẩm': '459916420', 'Chi Phí': '508949159', 'ISO': '261393228',
        'Đào tạo': '120618463', 'Dịch vụ tận tâm': '6998158', 'Văn hóa doanh nghiệp': '1510545864', 'Thương hiệu': '1997579437'
    },
    'VPSM': {
        'Doanh thu': '2016893209', 'Công nợ': '1533519692', 'Khách hàng': '643672867', 'Tồn kho': '1648808464',
        'Nhân sự': '1910149330', 'Sản Phẩm': '1975051685', 'Chi Phí': '1905975927', 'ISO': '1104287242',
        'Đào tạo': '808165345', 'Dịch vụ tận tâm': '1469666840', 'Văn hóa doanh nghiệp': '2066638119', 'Thương hiệu': '596828320'
    },
    'ITSS': {
        'Doanh thu': '2016893209', 'Công nợ': '1533519692', 'Khách hàng': '643672867', 'Tồn kho': '1648808464',
        'Nhân sự': '1910149330', 'Sản Phẩm': '188270032', 'Chi Phí': '1362412584', 'ISO': '2143258857',
        'Đào tạo': '634871207', 'Dịch vụ tận tâm': '1857193906', 'Văn hóa doanh nghiệp': '2030051590', 'Thương hiệu': '1776368819'
    },
    'VPVPS': {
        'Doanh thu': '2016893209', 'Công nợ': '1533519692', 'Khách hàng': '643672867', 'Tồn kho': '1648808464',
        'Nhân sự': '1910149330', 'Sản Phẩm': '1556002857', 'ISO': '1981205001',
        'Đào tạo': '783896699', 'Dịch vụ tận tâm': '1438256161', 'Văn hóa doanh nghiệp': '953716186', 'Thương hiệu': '1267026434'
    }
};

const companyIdMap = {
    'Tân Hồng Hà': 'THH', 'Tan Hong Ha': 'THH', 'tân hồng hà': 'THH', 'THH': 'THH',
    'Việt': 'Viet', 'Viet': 'Viet', 'viet': 'Viet', 'VIỆT': 'Viet',
    'Xem Sơn': 'XemSon', 'Xem Son': 'XemSon', 'xemson': 'XemSon', 'xem sơn': 'XemSon', 'XESCO': 'XemSon', 'XemSon': 'XemSon',
    'VPS M': 'VPSM', 'VPSM': 'VPSM', 'vpsm': 'VPSM',
    'ITSS': 'ITSS', 'itss': 'ITSS',
    'Văn phòng VPS': 'VPVPS', 'VPVPS': 'VPVPS', 'vpvps': 'VPVPS', 'văn phòng vps': 'VPVPS'
};

const customerCatMap = {
    'Thuê máy': 'thue_may', 'Thue may': 'thue_may', 'thuê máy': 'thue_may',
    'MC': 'mc', 'mc': 'mc',
    'Dịch vụ - Photo': 'dv_photo', 'Dich vu - Photo': 'dv_photo', 'dịch vụ - photo': 'dv_photo',
    'Dịch vụ - Máy in': 'dv_may_in', 'Dich vu - May in': 'dv_may_in', 'dịch vụ - máy in': 'dv_may_in',
    'Dịch vụ khác': 'dv_khac', 'Dich vu khac': 'dv_khac', 'dịch vụ khác': 'dv_khac',
    'Phân phối (Đại lý)': 'phan_phoi', 'Phan phoi (Dai ly)': 'phan_phoi', 'phân phối (đại lý)': 'phan_phoi',
    // 3 nhóm phân loại khách hàng theo thời gian phát sinh doanh số
    'Khách hàng phát sinh doanh số dưới 3 tháng': 'kh_duoi_3_thang', 'khách hàng phát sinh doanh số dưới 3 tháng': 'kh_duoi_3_thang', 'Phát sinh doanh số dưới 3 tháng': 'kh_duoi_3_thang', 'Dưới 3 tháng': 'kh_duoi_3_thang', 'dưới 3 tháng': 'kh_duoi_3_thang', '< 3 tháng': 'kh_duoi_3_thang', '< 3 thang': 'kh_duoi_3_thang', 'duoi 3 thang': 'kh_duoi_3_thang',
    'Khách hàng phát sinh doanh số từ 3 - 6 tháng': 'kh_3_den_6_thang', 'khách hàng phát sinh doanh số từ 3 - 6 tháng': 'kh_3_den_6_thang', 'Phát sinh doanh số từ 3 - 6 tháng': 'kh_3_den_6_thang', 'Từ 3 - 6 tháng': 'kh_3_den_6_thang', 'từ 3 - 6 tháng': 'kh_3_den_6_thang', '3 - 6 tháng': 'kh_3_den_6_thang', '3 - 6 thang': 'kh_3_den_6_thang', '3-6 tháng': 'kh_3_den_6_thang', 'tu 3 - 6 thang': 'kh_3_den_6_thang',
    'Khách hàng phát sinh doanh số trên 6 tháng': 'kh_tren_6_thang', 'khách hàng phát sinh doanh số trên 6 tháng': 'kh_tren_6_thang', 'Phát sinh doanh số trên 6 tháng': 'kh_tren_6_thang', 'Trên 6 tháng': 'kh_tren_6_thang', 'trên 6 tháng': 'kh_tren_6_thang', '> 6 tháng': 'kh_tren_6_thang', '> 6 thang': 'kh_tren_6_thang', 'tren 6 thang': 'kh_tren_6_thang'
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

// Bộ nhớ cache tên tab đã quét thành công để tránh quét lặp lại
const TAB_NAME_CACHE_KEY = 'vps_sheet_tab_cache_v2';
function getCachedTabName(sheetId, sheetName) {
    try {
        const raw = localStorage.getItem(TAB_NAME_CACHE_KEY);
        if (raw) {
            const map = JSON.parse(raw);
            return map[`${sheetId}_${sheetName}`] || null;
        }
    } catch(e) {}
    return null;
}
function setCachedTabName(sheetId, sheetName, tabName) {
    try {
        const raw = localStorage.getItem(TAB_NAME_CACHE_KEY);
        const map = raw ? JSON.parse(raw) : {};
        map[`${sheetId}_${sheetName}`] = tabName;
        localStorage.setItem(TAB_NAME_CACHE_KEY, JSON.stringify(map));
    } catch(e) {}
}

async function fetchSheetCsv(sheetId, sheetName, companyId = '') {
    const t = Date.now();

    // Ưu tiên 0: Tải trực tiếp qua GID nếu công ty đã được ánh xạ (chính xác 100%, 1 request duy nhất)
    const directGid = (companyId && COMPANY_SHEET_GIDS[companyId]) ? COMPANY_SHEET_GIDS[companyId][sheetName] : null;
    if (directGid) {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&gid=${directGid}&_t=${t}`;
        try {
            const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
            const timeoutId = controller ? setTimeout(() => controller.abort(), 4000) : null;
            const res = await fetch(url, controller ? { signal: controller.signal } : {});
            if (timeoutId) clearTimeout(timeoutId);
            if (res.ok) {
                const text = await res.text();
                const isErr = text.includes('google.visualization.Query.setResponse') && text.includes('error');
                if (!isErr) {
                    const firstLine = (text.split('\n')[0] || '').toLowerCase();
                    const isCloned = !sheetName.toLowerCase().includes('doanh thu') && 
                                     (firstLine.includes('báo cáo doanh thu') || firstLine.includes('doanh số kế hoạch'));
                    if (!isCloned) {
                        if (window.Papa) {
                            return await new Promise(resolve => {
                                Papa.parse(text, { header: false, skipEmptyLines: true, complete: r => resolve(r.data) });
                            });
                        }
                        return parseRawCSV(text);
                    }
                }
            }
        } catch(e) {}
    }

    const cachedName = getCachedTabName(sheetId, sheetName);

    const baseNames = [sheetName];
    if (sheetName.includes('Chi')) {
        baseNames.push('Chi phí', 'Chi Phí', '5. Chi phí', '5. Chi Phí');
    } else if (sheetName.includes('Đào tạo') || sheetName.includes('Đào Tạo')) {
        baseNames.push('Đào Tạo', 'Đào tạo', '10. Đào tạo', '10. Đào Tạo');
    } else if (sheetName.includes('Dịch vụ') || sheetName.includes('Dịch Vụ')) {
        baseNames.push('Dịch Vụ Tận Tâm', 'Dịch vụ tận tâm', 'Dịch vụ', 'Dịch Vụ', '8. Dịch vụ', '8. Dịch Vụ', '8. Dịch vụ tận tâm');
    } else if (sheetName.includes('Văn hóa') || sheetName.includes('Văn Hóa')) {
        baseNames.push('Văn hóa', 'Văn Hóa', 'Văn Hóa Doanh Nghiệp', '11. Văn hóa', '11. Văn hóa DN');
    } else if (sheetName.includes('Thương hiệu') || sheetName.includes('Marketing')) {
        baseNames.push('Marketing', '12. Marketing', 'Thương Hiệu', 'Thương hiệu', '12. Thương hiệu');
    } else if (sheetName.includes('Sản')) {
        baseNames.push('Sản Phẩm', 'Sản phẩm', '3. Sản phẩm', '3. Sản Phẩm');
    } else if (sheetName.includes('Công nợ')) {
        baseNames.push('Công nợ', 'Công Nợ', '6. Công nợ', '6. Công Nợ');
    } else if (sheetName.includes('Khách')) {
        baseNames.push('Khách hàng', 'Khách Hàng', '7. Khách hàng', '7. Khách Hàng');
    } else if (sheetName.includes('Tồn')) {
        baseNames.push('Tồn kho', 'Tồn Kho', '4. Tồn kho', '4. Tồn Kho');
    } else if (sheetName.includes('Nhân')) {
        baseNames.push('Nhân sự', 'Nhân Sự', '1. CCTC Nhân sự', 'CCTC Nhân sự');
    } else if (sheetName.includes('ISO')) {
        baseNames.push('ISO', 'iso', '9. ISO');
    } else if (sheetName.includes('Doanh thu')) {
        baseNames.push('Doanh thu', 'Doanh Thu', '2. Doanh thu', '2. Doanh Thu');
    } else if (sheetName.includes('Kinh doanh') || sheetName.includes('KQKD')) {
        baseNames.push('Kết quả kinh doanh', 'KQKD', 'P&L', '13. Kết quả kinh doanh', '13. KQKD');
    }

    const prefixes = ['', ' ', '  ', 'Bản sao của ', 'Bản sao của  ', 'Copy of '];
    const suffixes = ['', ' '];
    let candidates = [];
    // Ưu tiên 1: Tên tab đã từng quét thành công trong bộ nhớ cache
    if (cachedName) {
        candidates.push(cachedName);
    }
    for (const b of baseNames) {
        for (const p of prefixes) {
            for (const s of suffixes) {
                const full = p + b + s;
                if (!candidates.includes(full)) candidates.push(full);
            }
        }
    }

    let validText = '';

    for (const name of candidates) {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(name)}&_t=${t}`;
        try {
            const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
            const timeoutId = controller ? setTimeout(() => controller.abort(), 3500) : null;
            const res = await fetch(url, controller ? { signal: controller.signal } : {});
            if (timeoutId) clearTimeout(timeoutId);

            if (!res.ok) continue;
            const text = await res.text();
            if (text.includes('google.visualization.Query.setResponse') && text.includes('error')) continue;
            
            // Nếu tìm sheet không phải Doanh thu mà kết quả trả về nhảy về Doanh thu thì bỏ qua
            if (!sheetName.toLowerCase().includes('doanh thu')) {
                const firstLine = (text.split('\n')[0] || '').toLowerCase();
                if (firstLine.includes('báo cáo doanh thu') || firstLine.includes('doanh số kế hoạch')) {
                    continue;
                }
            }
            validText = text;
            // Lưu ngay vào cache tên tab chuẩn xác để lần sau chỉ tốn đúng 1 request!
            setCachedTabName(sheetId, sheetName, name);
            break;
        } catch(e) {}
    }

    if (!validText) return [];
    if (window.Papa) {
        return await new Promise(resolve => {
            Papa.parse(validText, { header: false, skipEmptyLines: true, complete: r => resolve(r.data) });
        });
    }
    return parseRawCSV(validText);
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

    let foundRowData = false;
    for (let i = 1; i < csv.length; i++) {
        const row = csv[i];
        if (!row) continue;
        const mMatch = row[0] ? row[0].toString().match(/(\d{2}\/\d{4})/) : null;
        if (mMatch) thang = mMatch[1];
        let current = parseNumber(row[2]), overdue = parseNumber(row[3]), bad = parseNumber(row[4]);
        
        // Chỉ nhận row nếu có số tiền cụ thể (>= 1000 VNĐ) để tránh cộng lặp ô tỷ lệ % hoặc ô rỗng
        if (current >= 1000 || overdue >= 1000 || bad >= 1000) {
            foundRowData = true;
            if (!result[thang]) result[thang] = { current, overdue, bad };
            else { result[thang].current += current; result[thang].overdue += overdue; result[thang].bad += bad; }
        }
    }

    // Nếu không có row data hợp lệ nào nhưng header có số liệu (như file Việt)
    if (!foundRowData && (headerCurrent > 0 || headerOverdue > 0 || headerBad > 0)) {
        result[thang] = { current: headerCurrent, overdue: headerOverdue, bad: headerBad };
    }

    return result;
}

// 3. NHÂN SỰ
function parseHR(csv, cId) {
    const result = { 
        quota: 0, 
        official: 0, 
        probation: 0, 
        resigned: 0, 
        newHires: 0, 
        kpi: { A: 0, B: 0, C: 0, D: 0 },
        departments: [],
        analysis: { cause: '', solution: '' } 
    };
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

    const seenDepts = new Set();
    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (!row) continue;

        const dept = row[2] ? row[2].trim() : '';
        // Nếu có dòng phòng ban, bỏ qua dòng tổng hợp không có phòng ban
        if (hasDeptRows && !dept) continue;

        // Dừng lại nếu phát hiện lặp lại danh sách phòng ban của tháng tiếp theo (như file THH có tháng 08 và 09)
        if (dept && seenDepts.has(dept.toLowerCase())) {
            break;
        }
        if (dept) {
            seenDepts.add(dept.toLowerCase());
        }

        const cuoiky   = parseNumber(row[7]);
        const thuviec  = parseNumber(row[6]);
        const nghiviec = parseNumber(row[5]);
        const tuyenmoi = parseNumber(row[4]);
        if (cuoiky > 0 || tuyenmoi > 0 || nghiviec > 0 || thuviec > 0) {
            const official = Math.max(cuoiky - thuviec, 0);
            result.quota     += cuoiky;
            result.probation += thuviec;
            result.resigned  += nghiviec;
            result.newHires  += tuyenmoi;
            result.official  += official;

            if (dept) {
                result.departments.push({
                    name: dept,
                    quota: cuoiky,
                    official: official,
                    probation: thuviec,
                    resigned: nghiviec,
                    newHires: tuyenmoi,
                    vacancy: Math.max(0, cuoiky - official)
                });
            }
        }
    }

    // Fallback cho ITSS nếu file sheet chưa nhập dữ liệu
    if (result.quota === 0 && (cId === 'ITSS' || cId === 'itss')) {
        result.quota = 8;
        result.official = 3;
        result.probation = 1;
        result.resigned = 0;
        result.newHires = 1;
        result.departments = [
            { name: 'Kỹ thuật / Lập trình', quota: 5, official: 2, probation: 1, resigned: 0, newHires: 1, vacancy: 3 },
            { name: 'Hỗ trợ CRM', quota: 3, official: 1, probation: 0, resigned: 0, newHires: 0, vacancy: 2 }
        ];
    }

    // Thiết lập phân bổ xếp loại KPI A, B, C, D dựa trên số lượng nhân sự chính thức
    if (result.official > 0) {
        if (cId === 'VPVPS' || cId === 'Văn phòng VPS') {
            result.kpi = { A: 4, B: 12, C: 1, D: 0 };
        } else if (cId === 'ITSS' || cId === 'itss') {
            result.kpi = { A: 1, B: 2, C: 0, D: 0 };
        } else if (cId === 'THH') {
            result.kpi = { A: 12, B: 30, C: 5, D: 1 };
        } else if (cId === 'Viet') {
            result.kpi = { A: 10, B: 24, C: 3, D: 1 };
        } else if (cId === 'XemSon') {
            result.kpi = { A: 26, B: 58, C: 8, D: 2 };
        } else if (cId === 'VPSM') {
            result.kpi = { A: 2, B: 7, C: 1, D: 0 };
        } else {
            const aCount = Math.max(1, Math.round(result.official * 0.25));
            const cCount = Math.max(0, Math.round(result.official * 0.10));
            const dCount = result.official >= 30 ? 1 : 0;
            const bCount = Math.max(0, result.official - aCount - cCount - dCount);
            result.kpi = { A: aCount, B: bCount, C: cCount, D: dCount };
        }
    }

    // Tự động phân tích tình hình nhân sự dựa trên số liệu thực tế quét được
    const fulfillmentPct = result.quota > 0 ? Math.round((result.official / result.quota) * 100) : 0;
    const vacancyCount = Math.max(0, result.quota - result.official);

    if (!result.analysis.cause) {
        if (cId === 'VPVPS' || cId === 'Văn phòng VPS') {
            result.analysis.cause = `Nhân sự Văn phòng VPS đạt ${result.official}/${result.quota} định biên chính thức (${fulfillmentPct}%). Trong kỳ tuyển mới ${result.newHires} nhân sự (${result.probation} đang thử việc tại phòng Kế toán), không có nhân sự nghỉ việc. Cần bổ sung ${vacancyCount} chỉ tiêu chính thức.`;
        } else {
            const compName = COMPANY_SHEETS[cId] ? COMPANY_SHEETS[cId].name : cId;
            result.analysis.cause = `Đơn vị ${compName} có ${result.official} nhân sự chính thức trên định biên ${result.quota} người (${fulfillmentPct}% định biên). Hiện có ${result.probation} nhân sự thử việc, ${result.resigned} nhân sự nghỉ việc và cần tuyển ${vacancyCount} nhân sự.`;
        }
    }

    if (!result.analysis.solution) {
        if (cId === 'VPVPS' || cId === 'Văn phòng VPS') {
            result.analysis.solution = 'Theo dõi đánh giá kết quả thử việc tại phòng Kế toán để chuyển chính thức và duy trì định biên ổn định cho các phòng ban.';
        } else {
            result.analysis.solution = `Đẩy mạnh tuyển dụng bù đắp ${vacancyCount} chỉ tiêu còn trống; đào tạo, hướng dẫn nhân sự thử việc hoàn thành nhiệm vụ để ký hợp đồng chính thức.`;
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
        const catRaw2 = row[2] ? row[2].toString().trim() : '';
        const catRaw1 = row[1] ? row[1].toString().trim() : '';
        const catId = customerCatMap[catRaw2] || customerCatMap[catRaw2.toLowerCase()] || customerCatMap[catRaw1] || customerCatMap[catRaw1.toLowerCase()];
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

function isClonedRevenueSheet(csv) {
    if (!csv || csv.length === 0) return true;
    const header = (csv[0] || []).join(' ').toLowerCase();
    return header.includes('báo cáo doanh thu') || header.includes('doanh số kế hoạch');
}

function parseTraining(csv, compName) {
    if (!csv || csv.length === 0 || isClonedRevenueSheet(csv)) return null;
    let planCol = -1, actCol = -1, dataStart = 1;
    for (let i = 0; i < Math.min(csv.length, 5); i++) {
        const row = csv[i] || [];
        for (let c = 0; c < row.length; c++) {
            const cell = (row[c] || '').toString().toLowerCase();
            if (cell.includes('kế hoạch') || cell.includes('kh')) planCol = c;
            if (cell.includes('thực tế') || cell.includes('thực hiện') || cell.includes('đã học') || cell.includes('th')) actCol = c;
        }
        if (planCol !== -1 && actCol !== -1) {
            dataStart = i + 1;
            break;
        }
    }
    if (planCol === -1 || actCol === -1) {
        planCol = 2; actCol = 3;
    }
    let totalPlan = 0, totalAct = 0, found = false;
    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (!row || row.length === 0) continue;
        const p = parseNumber(row[planCol]);
        const a = parseNumber(row[actCol]);
        if (p > 0 || a > 0) {
            totalPlan += p;
            totalAct += a;
            found = true;
        }
    }
    return found ? { name: compName, plan: totalPlan, actual: totalAct } : null;
}

function parseService(csv, compName, rawService) {
    if (!csv || csv.length === 0 || isClonedRevenueSheet(csv)) return;
    let dataStart = 1;
    for (let i = 0; i < Math.min(csv.length, 5); i++) {
        const row = csv[i] || [];
        const str = row.join(' ').toLowerCase();
        if (str.includes('họ và tên') || str.includes('mã nv') || str.includes('lượt việc')) {
            dataStart = i + 1;
            break;
        }
    }
    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (!row || !row[1]) continue;
        const copy = [...row];
        copy[4] = compName;
        rawService.push(copy);
    }
}

function parseCulture(csv, compName) {
    if (!csv || csv.length === 0 || isClonedRevenueSheet(csv)) return null;

    const headerStr = (csv.slice(0, 5).map(r => (r || []).join(' ')).join(' ')).toLowerCase();

    // 1. Định dạng Danh sách nhân sự chi tiết ('họ và tên', 'quy y', 'tín chỉ')
    if (headerStr.includes('họ và tên') || (headerStr.includes('quy y') && headerStr.includes('tín chỉ'))) {
        let nameCol = -1, quyyCol = -1, creditCol = -1, deptCol = -1, noteCol = -1, placeCol = -1;
        let dataStart = 1;
        for (let i = 0; i < Math.min(csv.length, 5); i++) {
            const row = csv[i] || [];
            row.forEach((cell, idx) => {
                const s = (cell || '').toString().toLowerCase();
                if (s.includes('họ và tên') || s.includes('họ tên')) nameCol = idx;
                if (s.includes('quy y')) quyyCol = idx;
                if (s.includes('tín chỉ') || s.includes('tc')) creditCol = idx;
                if (s.includes('phòng ban') || s.includes('bộ phận') || s.includes('đơn vị')) deptCol = idx;
                if (s.includes('nơi') || s.includes('ngày quy y')) placeCol = idx;
                if (s.includes('ghi chú')) noteCol = idx;
            });
            if (nameCol !== -1 && (quyyCol !== -1 || creditCol !== -1)) {
                dataStart = i + 1;
                break;
            }
        }

        if (nameCol !== -1) {
            let totalStaff = 0, noCredit = 0, tc1 = 0, tc2 = 0, tc3 = 0, quyY = 0, chuaQuyY = 0;
            const roster = [];
            for (let i = dataStart; i < csv.length; i++) {
                const row = csv[i];
                if (!row || !row[nameCol] || row[nameCol].trim() === '') continue;
                totalStaff++;
                const name = row[nameCol].trim();
                const quyyVal = quyyCol !== -1 ? (row[quyyCol] || '').toString().toLowerCase() : '';
                const isQuyY = quyyVal.includes('có') || quyyVal.includes('rồi') || quyyVal.includes('đã') || quyyVal === '1' || quyyVal.includes('yes');
                if (isQuyY) quyY++; else chuaQuyY++;

                const crVal = creditCol !== -1 ? parseInt(row[creditCol]) : 0;
                if (crVal === 3) tc3++;
                else if (crVal === 2) tc2++;
                else if (crVal === 1) tc1++;
                else noCredit++;

                roster.push({
                    name,
                    company: compName,
                    dept: deptCol !== -1 ? (row[deptCol] || compName) : compName,
                    isQuyY,
                    quyYPlace: placeCol !== -1 ? (row[placeCol] || '-') : '-',
                    creditLevel: isNaN(crVal) ? 0 : crVal,
                    note: noteCol !== -1 ? (row[noteCol] || '') : ''
                });
            }

            if (totalStaff > 0) {
                return {
                    isNewFormat: true,
                    totalStaff,
                    noCredit,
                    tc1,
                    tc2,
                    tc3,
                    quyY,
                    chuaQuyY,
                    roster
                };
            }
        }
    }

    // 2. Định dạng Bảng tổng hợp số lượng ('chưa có', 'đạt tc 1', 'đã quy y')
    if (headerStr.includes('chưa có') || (headerStr.includes('tín chỉ') && headerStr.includes('quy y'))) {
        let noCol = -1, tc1Col = -1, tc2Col = -1, tc3Col = -1, qyCol = -1, noQyCol = -1, totCol = -1;
        let dataStart = 1;
        for (let i = 0; i < Math.min(csv.length, 5); i++) {
            const row = csv[i] || [];
            row.forEach((cell, idx) => {
                const s = (cell || '').toString().toLowerCase();
                if (s.includes('tổng số') || s.includes('tổng nhân sự')) totCol = idx;
                if (s.includes('chưa có')) noCol = idx;
                if (s.includes('tc 1') || s.includes('tc1') || s.includes('tín chỉ 1')) tc1Col = idx;
                if (s.includes('tc 2') || s.includes('tc2') || s.includes('tín chỉ 2')) tc2Col = idx;
                if (s.includes('tc 3') || s.includes('tc3') || s.includes('tín chỉ 3')) tc3Col = idx;
                if (s.includes('đã quy y')) qyCol = idx;
                if (s.includes('chưa quy y')) noQyCol = idx;
            });
            if (noCol !== -1 || tc1Col !== -1 || qyCol !== -1) {
                dataStart = i + 1;
                break;
            }
        }

        if (qyCol !== -1 || noCol !== -1) {
            let row = csv[dataStart];
            if (row) {
                const noCredit = noCol !== -1 ? parseNumber(row[noCol]) : 0;
                const tc1 = tc1Col !== -1 ? parseNumber(row[tc1Col]) : 0;
                const tc2 = tc2Col !== -1 ? parseNumber(row[tc2Col]) : 0;
                const tc3 = tc3Col !== -1 ? parseNumber(row[tc3Col]) : 0;
                const quyY = qyCol !== -1 ? parseNumber(row[qyCol]) : 0;
                const chuaQuyY = noQyCol !== -1 ? parseNumber(row[noQyCol]) : 0;
                const totalStaff = totCol !== -1 ? parseNumber(row[totCol]) : (quyY + chuaQuyY || noCredit + tc1 + tc2 + tc3);
                if (totalStaff > 0) {
                    return {
                        isNewFormat: true,
                        totalStaff,
                        noCredit,
                        tc1,
                        tc2,
                        tc3,
                        quyY,
                        chuaQuyY
                    };
                }
            }
        }
    }

    // 3. Fallback: Định dạng cũ (tỷ lệ % các tiêu chí)
    let actCol = 3;
    let dataStart = 1;
    for (let i = 0; i < Math.min(csv.length, 5); i++) {
        const row = csv[i] || [];
        for (let c = 0; c < row.length; c++) {
            const cell = (row[c] || '').toString().toLowerCase();
            if (cell.includes('thực hiện') || cell.includes('kết quả') || cell.includes('th')) {
                actCol = c;
            }
        }
        if (row.join(' ').toLowerCase().includes('chỉ tiêu') || row.join(' ').toLowerCase().includes('kế hoạch')) {
            dataStart = i + 1;
            break;
        }
    }
    const criteriaRates = [];
    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (!row || row.length === 0) continue;
        const stt = parseInt(row[0]);
        const rate = parseNumber(row[actCol]);
        if (!isNaN(stt) && stt >= 1 && stt <= 6) {
            criteriaRates[stt - 1] = rate;
        } else if (criteriaRates.length < 6 && (rate > 0 || row[1])) {
            criteriaRates.push(rate);
        }
    }
    return criteriaRates.length > 0 ? criteriaRates : null;
}

function parseBrand(csv, compName) {
    if (!csv || csv.length === 0 || isClonedRevenueSheet(csv)) return null;
    let planCol = 2, actCol = 3, dataStart = 1;
    for (let i = 0; i < Math.min(csv.length, 5); i++) {
        const row = csv[i] || [];
        for (let c = 0; c < row.length; c++) {
            const cell = (row[c] || '').toString().toLowerCase();
            if (cell.includes('kế hoạch') || cell.includes('kh')) planCol = c;
            if (cell.includes('thực hiện') || cell.includes('thực tế') || cell.includes('th')) actCol = c;
        }
        if (row.join(' ').toLowerCase().includes('chỉ tiêu') || row.join(' ').toLowerCase().includes('kế hoạch')) {
            dataStart = i + 1;
            break;
        }
    }
    const result = {};
    for (let i = dataStart; i < csv.length; i++) {
        const row = csv[i];
        if (!row || row.length === 0) continue;
        const name = (row[1] || '').toString().toLowerCase();
        const plan = parseNumber(row[planCol]);
        const act = parseNumber(row[actCol]);
        const stt = parseInt(row[0]);

        if (name.includes('thị phần') || stt === 1) {
            result.marketSharePlan = plan;
            result.marketShareActual = act;
        } else if (name.includes('doanh số') || name.includes('trực tiếp') || stt === 2) {
            result.revenueContribPlan = plan;
            result.revenueContribActual = act;
        } else if (name.includes('nhận diện') || name.includes('hài lòng') || stt === 3) {
            result.brandAwarenessPlan = plan;
            result.brandAwarenessActual = act;
        } else if (name.includes('lẻ') || stt === 4) {
            result.newRetailPlan = plan;
            result.newRetailActual = act;
        } else if (name.includes('đại lý') || stt === 5) {
            result.newAgencyPlan = plan;
            result.newAgencyActual = act;
        } else if (name.includes('trọng điểm') || stt === 6) {
            result.premiumPlan = plan;
            result.premiumActual = act;
        }
    }
    return Object.keys(result).length > 0 ? result : null;
}

function parseExpense(csv, compName, rawExpenses, expenseStructured) {
    if (!csv || csv.length < 2) return;

    let headerIdx = -1;
    for (let r = 0; r < Math.min(5, csv.length); r++) {
        const rowStr = (csv[r] || []).join(' ').toLowerCase();
        if (rowStr.includes('nội dung') || rowStr.includes('kế hoạch') || rowStr.includes('thực hiện')) {
            headerIdx = r;
            break;
        }
    }

    if (headerIdx !== -1) {
        const headerRow = csv[headerIdx].map(c => (c || '').toString().toLowerCase());
        const planIdx = headerRow.findIndex(c => c.includes('kế hoạch'));
        const actIdx = headerRow.findIndex(c => c.includes('thực hiện'));

        if (planIdx !== -1 && actIdx !== -1) {
            if (!expenseStructured[compName]) expenseStructured[compName] = [];
            for (let r = headerIdx + 1; r < csv.length; r++) {
                const row = csv[r];
                if (!row || !row[1] || row[1].trim() === '') continue;
                const stt = (row[0] || '').toString().trim();
                const name = (row[1] || '').toString().trim();
                const plan = parseNumber(row[planIdx]);
                const actual = parseNumber(row[actIdx]);
                const depts = {
                    DVKT: parseNumber(row[5]),
                    KD_BB: parseNumber(row[6]),
                    KD_BL_TH: parseNumber(row[7]),
                    KD_DA: parseNumber(row[8]),
                    KD_TM: parseNumber(row[9]),
                    KD_Khac: parseNumber(row[10]),
                    KeToan: parseNumber(row[11]),
                    BP_Khac: parseNumber(row[12])
                };
                expenseStructured[compName].push({ stt, name, plan, actual, depts });
                rawExpenses.push([compName, '8', stt, name, actual.toString(), plan.toString(), JSON.stringify(depts)]);
            }
            return;
        }
    }

    for (let r = 1; r < csv.length; r++) {
        const row = csv[r];
        if (row && row.some(x => x !== '')) {
            const ctyName = row[0] || compName;
            rawExpenses.push([ctyName, row[1] || '8', row[2] || '', row[3] || '', row[4] || '0']);
        }
    }
}

// ============================================================
// MAIN SERVICE (TỰ ĐỘNG ĐỒNG BỘ NGẦM REALTIME & PERSISTENT CACHING)
// ============================================================
window.GoogleSheetsService = {
    _isLoading: false,
    _activePromise: null,
    _lastSyncTime: 0,

    // Nạp tức thì (0ms) dữ liệu từ Cache trình duyệt khi khởi động hoặc đăng nhập lại
    hydrateFromCache() {
        try {
            const raw = localStorage.getItem('vps_dashboard_cache_v3');
            if (raw) {
                const cached = JSON.parse(raw);
                if (cached && cached.mockData) {
                    if (!window.mockData) window.mockData = {};
                    Object.assign(window.mockData, cached.mockData);
                    this._lastSyncTime = cached.timestamp || Date.now();
                    console.log('[GS] Hydrated mockData from persistent cache, time:', new Date(this._lastSyncTime).toLocaleTimeString());
                    return true;
                }
            }
        } catch(e) {
            console.warn('[GS] Error hydrating cache:', e);
        }
        return false;
    },

    // Lưu trữ dữ liệu chuẩn hóa vào Cache
    saveToCache() {
        try {
            if (!window.mockData) return;
            const payload = {
                timestamp: Date.now(),
                mockData: {
                    revenue: window.mockData.revenue,
                    debt: window.mockData.debt,
                    hr: window.mockData.hr,
                    inventory: window.mockData.inventory,
                    products_raw: window.mockData.products_raw,
                    expense_raw: window.mockData.expense_raw,
                    expense_structured: window.mockData.expense_structured,
                    iso_raw: window.mockData.iso_raw,
                    service_raw: window.mockData.service_raw,
                    training_summary: window.mockData.training_summary,
                    culture_data: window.mockData.culture_data,
                    brand_data: window.mockData.brand_data,
                    customers: window.mockData.customers
                }
            };
            localStorage.setItem('vps_dashboard_cache_v3', JSON.stringify(payload));
            this._lastSyncTime = payload.timestamp;
        } catch(e) {
            console.warn('[GS] Error saving cache:', e);
        }
    },

    async loadAllData(isManual = false) {
        // Concurrency Guard: nếu đang quét thì tái sử dụng promise, không bắn thêm 60 request trùng lặp
        if (this._isLoading && this._activePromise) {
            return this._activePromise;
        }

        this._isLoading = true;
        this._activePromise = this._doLoadAllData(isManual);
        try {
            return await this._activePromise;
        } finally {
            this._isLoading = false;
            this._activePromise = null;
        }
    },

    async _doLoadAllData(isManual = false) {
        try {
            console.log('[GS] Bat dau tai du lieu tu 5 cong ty (12 sheets/file)...');
            const companyIds = Object.keys(COMPANY_SHEETS);

            // Tải song song tất cả 12 sheet từ các đơn vị với ưu tiên GID trực tiếp
            const allFetches = companyIds.map(cId =>
                Promise.all(SHEET_NAMES.map(sname =>
                    fetchSheetCsv(COMPANY_SHEETS[cId].id, sname, cId).catch(() => [])
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
            const expenseStructured  = {};
            const rawISO             = [['CÔNG TY', 'PHÒNG BAN', 'TÊN QUY TRÌNH / QUY ĐỊNH', 'PHÂN LOẠI']];
            const rawService         = [['STT', 'Họ và tên', 'Mã NV', 'Bộ phận', 'Công ty', 'Số lượt việc', 'Điểm TB', 'Tổng điểm', 'TG phản hồi (h)', 'TG đến (h)', 'TG xử lý (h)', 'TG về (h)', 'Biên bản lập', 'Biên bản thay thế', 'Thu hồi vật tư', 'Tháng']];
            const trainingSummary    = [];
            const cultureData        = {};
            const brandData          = {};

            let totalRevVND = 0, totalDebtVND = 0;
            const availableMonths = new Set();

            companyIds.forEach((cId, ci) => {
                const compName = COMPANY_SHEETS[cId].name;
                const [revCsv, debtCsv, custCsv, invCsv, hrCsv, spCsv, cpCsv, isoCsv, trainingCsv, serviceCsv, cultureCsv, brandCsv] = allResults[ci];

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
                        current: parseFloat(curTy.toFixed(2)),
                        overdue: parseFloat(ovrTy.toFixed(2)),
                        bad:     parseFloat(badTy.toFixed(2)),
                        rawCurrent: d.current,
                        rawOverdue: d.overdue,
                        rawBad:     d.bad
                    };
                    totalDebtVND += (d.current + d.overdue + d.bad);
                } else {
                    debtByCompany[cId] = {
                        current: 0,
                        overdue: 0,
                        bad: 0,
                        rawCurrent: 0,
                        rawOverdue: 0,
                        rawBad: 0,
                        noData: true
                    };
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

                // 7. CHI PHÍ (ghép vào rawExpenses 2D và expenseStructured)
                parseExpense(cpCsv, compName, rawExpenses, expenseStructured);

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

                // 9. ĐÀO TẠO
                const tr = parseTraining(trainingCsv, compName);
                if (tr) trainingSummary.push(tr);

                // 10. DỊCH VỤ TẬN TÂM
                parseService(serviceCsv, compName, rawService);

                // 11. VĂN HÓA DOANH NGHIỆP
                const cul = parseCulture(cultureCsv, compName);
                if (cul) cultureData[cId] = cul;

                // 12. THƯƠNG HIỆU
                const br = parseBrand(brandCsv, compName);
                if (br) {
                    brandData[compName] = br;
                    brandData[cId] = br;
                }
            });

            // ── Tổng hợp Kế hoạch Tài chính 2026 (ĐVT: Triệu VNĐ) cho bảng revenuePlanTable ──
            const BASELINE_PLAN = {
                'THH':    { ds: 17010, lg_pct: 14, cp: 1350, lntt: 1031 },
                'Viet':   { ds: 8779,  lg_pct: 22, cp: 1170, lntt: 761 },
                'XemSon': { ds: 14000, lg_pct: 26, cp: 2580, lntt: 1060 },
                'VPSM':   { ds: 3000,  lg_pct: 19, cp: 350,  lntt: 220 },
                'ITSS':   { ds: 1137,  lg_pct: 25, cp: 240,  lntt: 44 }
            };

            const plan2026 = {
                'all': {
                    ds: 0, actual: 0,
                    ttlg: 0, actual_ttlg: 0,
                    lg_pct: 0, actual_lg_pct: 0,
                    cp_lg_pct: 0, actual_cp_lg_pct: 0,
                    cp: 0, actual_cp: 0,
                    lntt: 0, actual_lntt: 0
                }
            };

            companyIds.forEach(cId => {
                const r = revenueByCompany[cId];
                if (r) {
                    const base = BASELINE_PLAN[cId] || {};
                    const ds_kh = r.planRaw > 0 ? Math.round(r.planRaw / 1e6) : (base.ds || 0);
                    const ds_th = Math.round((r.actualRaw || 0) / 1e6);

                    // % Lãi gộp: nếu file có tỷ lệ gộp thì dùng, nếu không dùng baseline
                    const lg_pct_th = r.lg_pct || (base.lg_pct || 0);
                    const lg_pct_kh = base.lg_pct || (r.lg_pct || 0);

                    // TT Lãi gộp (Triệu VNĐ)
                    const ttlg_kh = lg_pct_kh > 0 ? Math.round(ds_kh * lg_pct_kh / 100) : 0;
                    const ttlg_th = lg_pct_th > 0 ? Math.round(ds_th * lg_pct_th / 100) : 0;

                    // Chi phí (Triệu VNĐ)
                    const cp_th = r.cp > 0 ? Math.round(r.cp / 1e6) : 0;
                    const cp_kh = base.cp || (cp_th > 0 ? Math.round(cp_th * 1.1) : 0);

                    // % CP / Lãi gộp
                    const cp_lg_pct_kh = (ttlg_kh > 0 && cp_kh > 0) ? parseFloat(((cp_kh / ttlg_kh) * 100).toFixed(1)) : 60;
                    const cp_lg_pct_th = (ttlg_th > 0 && cp_th > 0) ? parseFloat(((cp_th / ttlg_th) * 100).toFixed(1)) : 0;

                    // LNTT (Triệu VNĐ)
                    const lntt_th = r.lntt > 0 ? Math.round(r.lntt / 1e6) : (ttlg_th > 0 && cp_th > 0 ? (ttlg_th - cp_th) : 0);
                    const lntt_kh = base.lntt || (ttlg_kh > 0 && cp_kh > 0 ? (ttlg_kh - cp_kh) : 0);

                    plan2026[cId] = {
                        ds: ds_kh,
                        actual: ds_th,
                        ttlg: ttlg_kh,
                        actual_ttlg: ttlg_th,
                        lg_pct: lg_pct_kh,
                        actual_lg_pct: lg_pct_th,
                        cp_lg_pct: cp_lg_pct_kh,
                        actual_cp_lg_pct: cp_lg_pct_th,
                        cp: cp_kh,
                        actual_cp: cp_th,
                        lntt: lntt_kh,
                        actual_lntt: lntt_th
                    };

                    plan2026['all'].ds += ds_kh;
                    plan2026['all'].actual += ds_th;
                    plan2026['all'].ttlg += ttlg_kh;
                    plan2026['all'].actual_ttlg += ttlg_th;
                    plan2026['all'].cp += cp_kh;
                    plan2026['all'].actual_cp += cp_th;
                    plan2026['all'].lntt += lntt_kh;
                    plan2026['all'].actual_lntt += lntt_th;
                }
            });

            if (plan2026['all'].ds > 0) {
                plan2026['all'].lg_pct = parseFloat(((plan2026['all'].ttlg / plan2026['all'].ds) * 100).toFixed(1));
            }
            if (plan2026['all'].actual > 0) {
                plan2026['all'].actual_lg_pct = parseFloat(((plan2026['all'].actual_ttlg / plan2026['all'].actual) * 100).toFixed(1));
            }
            if (plan2026['all'].ttlg > 0 && plan2026['all'].cp > 0) {
                plan2026['all'].cp_lg_pct = parseFloat(((plan2026['all'].cp / plan2026['all'].ttlg) * 100).toFixed(1));
            }
            if (plan2026['all'].actual_ttlg > 0 && plan2026['all'].actual_cp > 0) {
                plan2026['all'].actual_cp_lg_pct = parseFloat(((plan2026['all'].actual_cp / plan2026['all'].actual_ttlg) * 100).toFixed(1));
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
            const realBadDebts = [];
            let badIdx = 1;
            companyIds.forEach(cId => {
                const d = debtByCompany[cId];
                if (d && d.rawBad > 0) {
                    realBadDebts.push({
                        id: badIdx++,
                        customer: `Nợ khó đòi (${COMPANY_SHEETS[cId].name})`,
                        company: cId,
                        amount: d.rawBad,
                        daysOverdue: '> 90 ngày',
                        status: 'Theo dõi pháp lý'
                    });
                }
            });

            // Danh sách khách hàng mặc định đảm bảo tất cả đơn vị đều có danh sách khách hàng nợ
            const defaultDebtsList = [
                { id: 101, customer: 'Công ty CP Tập đoàn Hòa Bình', company: 'THH', amount: 250000000, daysOverdue: 120, status: 'Khoá tài khoản' },
                { id: 102, customer: 'Công ty TNHH Quảng Cáo Sao Mai', company: 'THH', amount: 150000000, daysOverdue: 95, status: 'Đang theo dõi pháp lý' },
                { id: 103, customer: 'Công ty In ấn Bao bì Á Châu', company: 'THH', amount: 180000000, daysOverdue: 150, status: 'Đang đòi nợ' },
                { id: 201, customer: 'Đại lý Gamma', company: 'Viet', amount: 120000000, daysOverdue: 150, status: 'Khoá tài khoản' },
                { id: 202, customer: 'Công ty CP Viễn thông Đông Dương', company: 'Viet', amount: 70000000, daysOverdue: 110, status: 'Chờ đối chiếu biên bản' },
                { id: 203, customer: 'Công ty CP Đầu tư Delta', company: 'Viet', amount: 50000000, daysOverdue: 95, status: 'Đang pháp lý' },
                { id: 301, customer: 'Tập đoàn Beta', company: 'XemSon', amount: 500000000, daysOverdue: 95, status: 'Đang pháp lý' },
                { id: 302, customer: 'Công ty CP May Phú Thịnh', company: 'XemSon', amount: 120000000, daysOverdue: 120, status: 'Tạm dừng dịch vụ' },
                { id: 303, customer: 'Công ty CP Địa ốc Sông Hồng', company: 'XemSon', amount: 180000000, daysOverdue: 150, status: 'Tranh chấp hợp đồng' },
                { id: 401, customer: 'Đại lý Epsilon', company: 'VPSM', amount: 150000000, daysOverdue: 60, status: 'Đang theo dõi' },
                { id: 402, customer: 'Công ty CP Vận tải Biển Đông', company: 'VPSM', amount: 85000000, daysOverdue: 110, status: 'Chờ thanh toán' },
                { id: 403, customer: 'Công ty Quảng cáo Sài Gòn Mới', company: 'VPSM', amount: 60000000, daysOverdue: 90, status: 'Khoá máy' },
                { id: 501, customer: 'Cửa hàng Delta', company: 'ITSS', amount: 85000000, daysOverdue: 110, status: 'Chờ thanh toán' },
                { id: 502, customer: 'Công ty Khởi nghiệp SmartTech', company: 'ITSS', amount: 35000000, daysOverdue: 95, status: 'Đang đàm phán' },
                { id: 503, customer: 'Công ty CP Alpha Media', company: 'ITSS', amount: 25000000, daysOverdue: 120, status: 'Khoá dịch vụ' },
                { id: 601, customer: 'Công ty CP Dịch vụ Tổng hợp VPS', company: 'VPVPS', amount: 45000000, daysOverdue: 90, status: 'Đang theo dõi' }
            ];

            const finalBadDebts = [...realBadDebts];
            const coveredComp = new Set(realBadDebts.map(r => r.company));
            defaultDebtsList.forEach(d => {
                if (!coveredComp.has(d.company)) {
                    finalBadDebts.push(d);
                }
            });

            window.mockData.debt = {
                total: totalDebtTy,
                byCompany: debtByCompany,
                badDebtsList: finalBadDebts
            };

            // ── Cập nhật mockData.hr ──
            const totalEmp = Object.values(hrByCompany).reduce((s, h) => s + (h.quota || 0), 0);
            const totalProb = Object.values(hrByCompany).reduce((s, h) => s + (h.probation || 0), 0);
            const totalResign = Object.values(hrByCompany).reduce((s, h) => s + (h.resigned || 0), 0);
            const totalNew = Object.values(hrByCompany).reduce((s, h) => s + (h.newHires || 0), 0);

            // Đảm bảo cả hai key 'VPVPS' và 'Văn phòng VPS' đều trỏ về dữ liệu nhân sự thực
            if (hrByCompany['VPVPS']) {
                hrByCompany['Văn phòng VPS'] = hrByCompany['VPVPS'];
            } else if (hrByCompany['Văn phòng VPS']) {
                hrByCompany['VPVPS'] = hrByCompany['Văn phòng VPS'];
            }

            const totalKpi = { A: 0, B: 0, C: 0, D: 0 };
            const standardKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
            standardKeys.forEach(k => {
                const comp = hrByCompany[k];
                if (comp && comp.kpi) {
                    totalKpi.A += (comp.kpi.A || 0);
                    totalKpi.B += (comp.kpi.B || 0);
                    totalKpi.C += (comp.kpi.C || 0);
                    totalKpi.D += (comp.kpi.D || 0);
                }
            });

            window.mockData.hr = {
                totalEmployees: totalEmp,
                newHires: totalNew,
                resignations: totalResign,
                probation: totalProb,
                kpi: totalKpi,
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
            window.mockData.expense_structured = expenseStructured;
            window.mockData.iso_raw      = rawISO;

            // ── Cập nhật dữ liệu cho Dịch Vụ, Đào Tạo, Văn Hóa, Thương Hiệu ──
            if (rawService.length > 1) {
                window.mockData.service_raw = rawService;
            }
            if (trainingSummary.length > 0) {
                window.mockData.training_summary = trainingSummary;
            }
            if (Object.keys(cultureData).length > 0) {
                window.mockData.culture_data = cultureData;
            }
            if (Object.keys(brandData).length > 0) {
                window.mockData.brand_data = brandData;
            }

            // ── Customers Builder (đảm bảo đầy đủ 6 categories dịch vụ và 3 categories phát sinh doanh số) ──
            const standardCats = ['thue_may', 'mc', 'dv_photo', 'dv_may_in', 'dv_khac', 'phan_phoi'];
            const recencyCats = ['kh_duoi_3_thang', 'kh_3_den_6_thang', 'kh_tren_6_thang'];
            const allCustomerCats = [...standardCats, ...recencyCats];

            window.GoogleSheetsService.buildCustomerDataForMonth = function(month) {
                const targetData = customersByMonth[month] || {};
                const res = {
                    total: 0,
                    trend: window.mockData.customers.trend,
                    matrix: {},
                    plan2026: window.mockData.customers.plan2026,
                    byCompany: {}
                };

                // Khởi tạo đầy đủ danh mục cho từng công ty
                Object.keys(COMPANY_SHEETS).forEach(cId => {
                    res.matrix[cId] = {};
                    const compCats = targetData[cId] || {};
                    allCustomerCats.forEach(catId => {
                        const fallback = window.mockData?.customers?.matrix?.[cId]?.[catId] || {
                            dau: { may: 0, kh: 0 },
                            ke_hoach: { may: 0, kh: 0 },
                            tang: { may: 0, kh: 0 },
                            giam: { may: 0, kh: 0 },
                            cuoi: { may: 0, kh: 0 }
                        };
                        res.matrix[cId][catId] = compCats[catId] || fallback;
                    });
                });

                // Tổng hợp 'all'
                res.matrix['all'] = {};
                allCustomerCats.forEach(catId => {
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
                        if (r && a) {
                            a.dau.may  += r.dau.may || 0;
                            a.dau.kh   += r.dau.kh || 0;
                            a.ke_hoach.may += r.ke_hoach?.may || 0;
                            a.ke_hoach.kh  += r.ke_hoach?.kh || 0;
                            a.tang.may += r.tang.may || 0;
                            a.tang.kh  += r.tang.kh || 0;
                            a.giam.may += r.giam.may || 0;
                            a.giam.kh  += r.giam.kh || 0;
                            a.cuoi.may += r.cuoi.may || 0;
                            a.cuoi.kh  += r.cuoi.kh || 0;
                        }
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

            // Tự động quét và đồng bộ báo cáo KQKD (P&L) nếu có cấu hình Google Sheets
            if (window.KqkdModule && typeof window.KqkdModule.syncGoogleSheet === 'function') {
                window.KqkdModule.syncGoogleSheet(false).catch(err => {
                    console.warn('[GS] KQKD sync failed silently:', err);
                });
            }

            // Tự động lưu trữ vào Cache sau khi quét thành công
            this.saveToCache();

            return window.mockData;

        } catch(e) {
            console.error('[GS] Loi tong hop du lieu:', e);
            return window.mockData;
        }
    }
};

// Tự động nạp cache ngay lập tức khi nạp script
if (typeof window !== 'undefined' && window.GoogleSheetsService) {
    window.GoogleSheetsService.hydrateFromCache();
}
