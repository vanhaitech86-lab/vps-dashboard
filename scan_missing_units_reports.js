const https = require('https');
const fs = require('fs');
const path = require('path');

const COMPANY_SHEETS = {
    'THH':    { name: 'Tân Hồng Hà',   id: '1TP2ISnfspKYLuN7U9eETeggBMWkQbaRl_G1X8juCePY', deptTab: 'DOANH SỐ VÀ LÃI GỘP' },
    'Viet':   { name: 'Việt',         id: '1Pp7HC4cgUVAM69DDOGTvRct0kRiJ8hqNRj5K339xH4o', deptTab: 'Doanh Số lãi Gộp' },
    'XemSon': { name: 'Xem Sơn',       id: '1yXyzTKccGWQSn0mCNFmxPkHyx5auTwQw2SZcngPNIFg', deptTab: 'Doanh Số và Lãi Gộp' },
    'VPSM':   { name: 'VPS M',         id: '13o7mqOd_30DbYqRhF18qn_yTqno3FzAWeqZDJ6nVTFA', deptTab: 'Doanh Số và Lãi Gộp' },
    'ITSS':   { name: 'ITSS',          id: '1JHGl2WSw8zezqWXSIJrKHWYpnW8nIatedn4UbzPilVM', deptTab: 'Doanh Số lãi gộp ' },
    'VPVPS':  { name: 'Văn phòng VPS', id: '1pHdTs3sM3RMF1ST6eWenuo947hG66V_kLU6FupNJZcE', deptTab: 'Doanh số lãi gộp' }
};

const KEY_MODULES = [
    { key: 'dept', name: 'DOANH SỐ VÀ LÃI GỘP' },
    { key: 'debt', name: 'Công nợ', aliases: ['Công nợ', 'Công Nợ', '6. Công nợ'] },
    { key: 'cust', name: 'Khách hàng', aliases: ['Khách hàng', 'Khách Hàng', '7. Khách hàng'] },
    { key: 'inv',  name: 'Tồn kho', aliases: ['Tồn kho', 'Tồn Kho', '4. Tồn kho'] },
    { key: 'hr',   name: 'Nhân sự', aliases: ['Nhân sự', 'Nhân Sự', '1. CCTC Nhân sự', 'CCTC Nhân sự'] },
    { key: 'exp',  name: 'Chi Phí', aliases: ['Chi Phí', 'Chi phí', '5. Chi phí'] }
];

function fetchCsv(sheetId, tabName) {
    return new Promise((resolve) => {
        const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}&_t=${Date.now()}`;
        https.get(url, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                if (data.includes('google.visualization.Query.setResponse') && data.includes('error')) {
                    resolve(null);
                } else {
                    const lines = data.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
                    resolve(lines);
                }
            });
        }).on('error', () => resolve(null));
    });
}

async function scanUnit(code, info) {
    const report = {
        code,
        name: info.name,
        sheetId: info.id,
        status: 'OK', // 'OK' | 'PARTIAL' | 'MISSING'
        modules: {},
        missingModules: [],
        enteredModules: [],
        summary: ''
    };

    // 1. Quét sheet Doanh số và Lãi gộp
    const deptLines = await fetchCsv(info.id, info.deptTab) || await fetchCsv(info.id, 'DOANH SỐ VÀ LÃI GỘP');
    if (!deptLines || deptLines.length <= 1) {
        report.modules['DOANH SỐ VÀ LÃI GỘP'] = { status: 'MISSING', rows: 0 };
        report.missingModules.push('DOANH SỐ VÀ LÃI GỘP');
    } else {
        // Kiểm tra xem có dòng dữ liệu thực tế không
        let hasActual = false;
        for (let i = 1; i < deptLines.length; i++) {
            const line = deptLines[i];
            // Nếu có số liệu phát sinh (khác rỗng, khác '-')
            if (line.match(/\b\d{2,}\b/)) {
                hasActual = true;
                break;
            }
        }
        if (hasActual) {
            report.modules['DOANH SỐ VÀ LÃI GỘP'] = { status: 'ENTERED', rows: deptLines.length };
            report.enteredModules.push('DOANH SỐ VÀ LÃI GỘP');
        } else {
            report.modules['DOANH SỐ VÀ LÃI GỘP'] = { status: 'EMPTY_DATA', rows: deptLines.length };
            report.missingModules.push('DOANH SỐ VÀ LÃI GỘP (Chưa điền số)');
        }
    }

    // 2. Quét các module quan trọng khác
    for (let m = 1; m < KEY_MODULES.length; m++) {
        const mod = KEY_MODULES[m];
        let foundLines = null;
        for (const alias of mod.aliases) {
            foundLines = await fetchCsv(info.id, alias);
            if (foundLines && foundLines.length > 0) break;
        }

        if (!foundLines || foundLines.length <= 1) {
            report.modules[mod.name] = { status: 'MISSING', rows: 0 };
            report.missingModules.push(mod.name);
        } else {
            report.modules[mod.name] = { status: 'ENTERED', rows: foundLines.length };
            report.enteredModules.push(mod.name);
        }
    }

    if (report.missingModules.length === 0) {
        report.status = 'COMPLETED';
        report.summary = 'Đã nhập đầy đủ các phân hệ chính';
    } else if (report.enteredModules.length === 0) {
        report.status = 'NOT_ENTERED';
        report.summary = 'Chưa nhập bất kỳ phân hệ nào';
    } else {
        report.status = 'PARTIAL';
        report.summary = `Đã nhập ${report.enteredModules.length}/${KEY_MODULES.length} phân hệ (Thiếu: ${report.missingModules.join(', ')})`;
    }

    return report;
}

async function runWeeklyScan() {
    console.log(`[QUÉT BÁO CÁO] Bắt đầu quét Google Sheets 6 đơn vị (${new Date().toLocaleString('vi-VN')})...`);
    const results = {};
    const missingUnits = [];
    const completedUnits = [];
    const partialUnits = [];

    for (const [code, info] of Object.entries(COMPANY_SHEETS)) {
        const uReport = await scanUnit(code, info);
        results[code] = uReport;
        if (uReport.status === 'COMPLETED') completedUnits.push(uReport);
        else if (uReport.status === 'NOT_ENTERED') missingUnits.push(uReport);
        else partialUnits.push(uReport);
    }

    const scanSummary = {
        scannedAt: new Date().toISOString(),
        formattedTime: new Date().toLocaleString('vi-VN'),
        totalUnits: 6,
        completedCount: completedUnits.length,
        partialCount: partialUnits.length,
        missingCount: missingUnits.length,
        completedUnits: completedUnits.map(u => u.name),
        partialUnits: partialUnits.map(u => ({ name: u.name, missing: u.missingModules })),
        missingUnits: missingUnits.map(u => u.name),
        details: results
    };

    // Lưu vào file data/weekly_scan_result.json
    const dataDir = path.join(__dirname, 'data');
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
    fs.writeFileSync(path.join(dataDir, 'weekly_scan_result.json'), JSON.stringify(scanSummary, null, 2), 'utf8');

    return scanSummary;
}

if (require.main === module) {
    runWeeklyScan().then(summary => {
        console.log('\n======================================================');
        console.log(`📊 KẾT QUẢ QUÉT BÁO CÁO TOÀN TẬP ĐOÀN VPS (${summary.formattedTime})`);
        console.log('======================================================');
        console.log(`✅ Đã nhập đủ:   ${summary.completedCount} đơn vị (${summary.completedUnits.join(', ') || 'Chưa có'})`);
        console.log(`⚠️ Thiếu một phần: ${summary.partialCount} đơn vị`);
        summary.partialUnits.forEach(u => console.log(`   - ${u.name}: Thiếu [${u.missing.join(', ')}]`));
        console.log(`🔴 CHƯA NHẬP:     ${summary.missingCount} đơn vị (${summary.missingUnits.join(', ') || 'Không có'})`);
        console.log('======================================================\n');
    });
}

module.exports = { runWeeklyScan, scanUnit, COMPANY_SHEETS };
