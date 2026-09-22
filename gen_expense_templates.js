const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const BORDER_THIN = {
    top: { style: 'thin', color: { argb: 'FFD3D3D3' } },
    left: { style: 'thin', color: { argb: 'FFD3D3D3' } },
    bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
    right: { style: 'thin', color: { argb: 'FFD3D3D3' } }
};

const BORDER_HEADER = {
    top: { style: 'medium', color: { argb: 'FF4472C4' } },
    left: { style: 'thin', color: { argb: 'FFFFFFFF' } },
    bottom: { style: 'medium', color: { argb: 'FF4472C4' } },
    right: { style: 'thin', color: { argb: 'FFFFFFFF' } }
};

const ITEMS = [
    { stt: 'A', name: 'TỔNG CHI PHÍ', type: 'grand_total', fill: 'FFD9E1F2', bold: true },
    { stt: 'I', name: 'Chi phí cố định', type: 'fixed_total', fill: 'FFE2EFDA', bold: true },
    { stt: '1', name: 'Chi phí nhân sự cố định', type: 'sub_ns_total', fill: 'FFF2F2F2', bold: true },
    { stt: '', name: 'Tiền lương + phụ cấp ăn trưa', type: 'item' },
    { stt: '', name: 'Tiền lương kinh doanh hệ số K', type: 'item' },
    { stt: '', name: 'Thưởng bán hàng, KPI, lễ tết', type: 'item' },
    { stt: '', name: 'Bảo hiểm xã hội trích theo lương cố định', type: 'item' },
    { stt: '2', name: 'Chi phí cố định khác', type: 'sub_ck_total', fill: 'FFFCE4D6', bold: true },
    { stt: '', name: 'Thuê nhà, thuê kho', type: 'item' },
    { stt: '', name: 'Khấu hao tài sản cố định (TSCĐ)', type: 'item' },
    { stt: '', name: 'Phân bổ công cụ dụng cụ (CCDC)', type: 'item' },
    { stt: '', name: 'Thanh lý TSCĐ, CCDC', type: 'item' },
    { stt: '', name: 'Chi phí trích nộp cty mẹ VPS (trừ CF thuê nhà, thuê kho)', type: 'item' },
    { stt: 'II', name: 'Chi phí biến đổi', type: 'var_total', fill: 'FFE2EFDA', bold: true },
    { stt: '1', name: 'Điện', type: 'item' },
    { stt: '2', name: 'Điện thoại, Internet', type: 'item' },
    { stt: '3', name: 'Nước sinh hoạt, phí vệ sinh', type: 'item' },
    { stt: '4', name: 'Vận chuyển hàng, taxi', type: 'item' },
    { stt: '5', name: 'Chuyển phát nhanh', type: 'item' },
    { stt: '6', name: 'Công tác phí', type: 'item' },
    { stt: '7', name: 'Tiếp khách, biếu tặng', type: 'item' },
    { stt: '8', name: 'Xăng xe nhân viên giao nhận, xe ôm, grap', type: 'item' },
    { stt: '9', name: 'Xuất vật tư bảo hành', type: 'item' },
    { stt: '10', name: 'Xuất dán, xuất dùng', type: 'item' },
    { stt: '11', name: 'Gửi xe nhân viên', type: 'item' },
    { stt: '12', name: 'Văn phòng phẩm', type: 'item' },
    { stt: '13', name: 'Công cụ dụng cụ tiêu hao dùng ngay', type: 'item' },
    { stt: '14', name: 'Hồ sơ thầu, thủ tục XNK', type: 'item' },
    { stt: '15', name: 'Giao dịch ngân hàng', type: 'item' },
    { stt: '16', name: 'Xây dựng, sửa chữa nhỏ', type: 'item' },
    { stt: '17', name: 'Đồ lễ thắp hương, nước uống', type: 'item' },
    { stt: '18', name: 'Nghỉ mát', type: 'item' },
    { stt: '19', name: 'Bảo hiểm hàng hóa', type: 'item' },
    { stt: '20', name: 'Bảo vệ kho', type: 'item' },
    { stt: '21', name: 'Định giá tài sản', type: 'item' },
    { stt: '22', name: 'Chi phí tuyển dụng', type: 'item' },
    { stt: '23', name: 'Chi phí Dự án', type: 'item' },
    { stt: '24', name: 'Chi phí khác', type: 'item' },
    { stt: 'III', name: 'Chi phí lãi vay', type: 'interest_total', fill: 'FFFFF2CC', bold: true },
    { stt: '1', name: 'Lãi vay', type: 'item' },
    { stt: 'IV', name: 'DOANH SỐ VÀ LÃI GỘP', type: 'rev_header', fill: 'FFFFF2CC', bold: true },
    { stt: '1', name: 'Doanh số', type: 'item' },
    { stt: '2', name: 'Lãi gộp', type: 'item' },
    { stt: '3', name: 'Tỷ lệ lãi gộp (%)', type: 'item_pct' },
    { stt: '4', name: 'Tỷ lệ quy đổi', type: 'item' },
    { stt: '5', name: 'Doanh số quy đổi', type: 'item' }
];

async function createMonthlySheet(workbook) {
    const ws = workbook.addWorksheet('Báo Cáo Chi Phí Tháng', {
        views: [{ showGridLines: true, state: 'frozen', xSplit: 2, ySplit: 2 }]
    });

    // Set column definitions
    ws.columns = [
        { key: 'stt', width: 8 },
        { key: 'name', width: 42 },
        { key: 'plan', width: 16 },
        { key: 'actual', width: 16 },
        { key: 'ratio', width: 14 },
        { key: 'dvkt', width: 16 },
        { key: 'kd_bb', width: 16 },
        { key: 'kd_bl_th', width: 16 },
        { key: 'kd_da', width: 16 },
        { key: 'kd_tm', width: 16 },
        { key: 'kd_khac', width: 15 },
        { key: 'ketoan', width: 15 },
        { key: 'bp_khac', width: 16 }
    ];

    // Row 1 & 2 Header
    ws.mergeCells('A1:A2');
    ws.mergeCells('B1:B2');
    ws.mergeCells('C1:C2');
    ws.mergeCells('D1:D2');
    ws.mergeCells('E1:E2');
    ws.mergeCells('F1:M1');

    ws.getCell('A1').value = 'STT';
    ws.getCell('B1').value = 'NỘI DUNG';
    ws.getCell('C1').value = 'KẾ HOẠCH';
    ws.getCell('D1').value = 'THỰC HIỆN';
    ws.getCell('E1').value = 'TỶ LỆ\n(TH/KH)';
    ws.getCell('F1').value = 'TRONG ĐÓ';

    ws.getCell('F2').value = 'DỊCH VỤ\nKỸ THUẬT';
    ws.getCell('G2').value = 'KD BÁN\nBUÔN';
    ws.getCell('H2').value = 'KD BÁN LẺ\nTỔNG HỢP';
    ws.getCell('I2').value = 'KD DỰ ÁN';
    ws.getCell('J2').value = 'KD THUÊ\nMÁY';
    ws.getCell('K2').value = 'KD KHÁC';
    ws.getCell('L2').value = 'KẾ TOÁN';
    ws.getCell('M2').value = 'BỘ PHẬN\nKHÁC';

    // Style Headers
    const headerCells = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'F2', 'G2', 'H2', 'I2', 'J2', 'K2', 'L2', 'M2'];
    headerCells.forEach(ref => {
        const cell = ws.getCell(ref);
        cell.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5597' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        cell.border = BORDER_HEADER;
    });
    // Set F1 background slightly lighter for section banner
    ws.getCell('F1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F3864' } };

    ws.getRow(1).height = 24;
    ws.getRow(2).height = 28;

    // Mapping rows for formulas
    const rowMap = {};
    let curRow = 3;

    ITEMS.forEach((item) => {
        rowMap[item.type] = curRow;
        item.rowIdx = curRow;
        curRow++;
    });

    // Populate data rows
    ITEMS.forEach((item) => {
        const r = item.rowIdx;
        const row = ws.getRow(r);
        row.height = 20;

        ws.getCell(`A${r}`).value = item.stt;
        ws.getCell(`A${r}`).alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell(`B${r}`).value = item.name;
        ws.getCell(`B${r}`).alignment = { vertical: 'middle', horizontal: 'left', indent: item.type === 'item' ? 1 : 0 };

        // Font
        const font = {
            name: 'Arial',
            size: item.bold ? 10 : 9.5,
            bold: !!item.bold,
            color: { argb: 'FF000000' }
        };
        ws.getCell(`A${r}`).font = font;
        ws.getCell(`B${r}`).font = font;

        // Fill background
        if (item.fill) {
            for (let c = 1; c <= 13; c++) {
                const cell = row.getCell(c);
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.fill } };
            }
        }

        // Borders
        for (let c = 1; c <= 13; c++) {
            row.getCell(c).border = BORDER_THIN;
        }

        // Setup numbers and formulas
        const colLetters = ['C', 'D', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'];

        if (item.type === 'grand_total') {
            // A = I + II + III
            const rI = rowMap['fixed_total'];
            const rII = rowMap['var_total'];
            const rIII = rowMap['interest_total'];
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `${col}${rI}+${col}${rII}+${col}${rIII}` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
            ws.getCell(`E${r}`).value = { formula: `IF(C${r}>0, D${r}/C${r}, 0)` };
            ws.getCell(`E${r}`).numFmt = '0.0%';
        } else if (item.type === 'fixed_total') {
            // I = 1 + 2
            const r1 = rowMap['sub_ns_total'];
            const r2 = rowMap['sub_ck_total'];
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `${col}${r1}+${col}${r2}` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
            ws.getCell(`E${r}`).value = { formula: `IF(C${r}>0, D${r}/C${r}, 0)` };
            ws.getCell(`E${r}`).numFmt = '0.0%';
        } else if (item.type === 'sub_ns_total') {
            // 1 = sum rows 6 to 9 (start: r+1, end: r+4)
            const start = r + 1;
            const end = r + 4;
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `SUM(${col}${start}:${col}${end})` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
            ws.getCell(`E${r}`).value = { formula: `IF(C${r}>0, D${r}/C${r}, 0)` };
            ws.getCell(`E${r}`).numFmt = '0.0%';
        } else if (item.type === 'sub_ck_total') {
            // 2 = sum rows 11 to 15 (start: r+1, end: r+5)
            const start = r + 1;
            const end = r + 5;
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `SUM(${col}${start}:${col}${end})` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
            ws.getCell(`E${r}`).value = { formula: `IF(C${r}>0, D${r}/C${r}, 0)` };
            ws.getCell(`E${r}`).numFmt = '0.0%';
        } else if (item.type === 'var_total') {
            // II = sum 24 items (start: r+1, end: r+24)
            const start = r + 1;
            const end = r + 24;
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `SUM(${col}${start}:${col}${end})` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
            ws.getCell(`E${r}`).value = { formula: `IF(C${r}>0, D${r}/C${r}, 0)` };
            ws.getCell(`E${r}`).numFmt = '0.0%';
        } else if (item.type === 'interest_total') {
            // III = row r+1 (Lãi vay)
            const childR = r + 1;
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `${col}${childR}` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
            ws.getCell(`E${r}`).value = { formula: `IF(C${r}>0, D${r}/C${r}, 0)` };
            ws.getCell(`E${r}`).numFmt = '0.0%';
        } else if (item.type === 'rev_header') {
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = 0;
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
            ws.getCell(`E${r}`).value = '';
        } else if (item.type === 'item_pct') {
            // Tỷ lệ lãi gộp (%) = Lãi gộp / Doanh số
            const rDS = r - 2;
            const rLG = r - 1;
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `IF(${col}${rDS}>0, ${col}${rLG}/${col}${rDS}, 0)` };
                ws.getCell(`${col}${r}`).numFmt = '0.0%';
            });
            ws.getCell(`E${r}`).value = '';
        } else {
            // Normal item
            colLetters.forEach(col => {
                ws.getCell(`${col}${r}`).value = 0;
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
            ws.getCell(`E${r}`).value = { formula: `IF(C${r}>0, D${r}/C${r}, 0)` };
            ws.getCell(`E${r}`).numFmt = '0.0%';
        }

        // Align numbers right
        colLetters.forEach(col => {
            ws.getCell(`${col}${r}`).alignment = { vertical: 'middle', horizontal: 'right' };
            ws.getCell(`${col}${r}`).font = font;
        });
        ws.getCell(`E${r}`).alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell(`E${r}`).font = font;
    });
}

async function createYearlySheet(workbook) {
    const ws = workbook.addWorksheet('Báo Cáo Chi Phí Lũy Kế Năm', {
        views: [{ showGridLines: true, state: 'frozen', xSplit: 2, ySplit: 2 }]
    });

    ws.columns = [
        { key: 'stt', width: 8 },
        { key: 'name', width: 42 },
        { key: 'm1', width: 13 },
        { key: 'm2', width: 13 },
        { key: 'm3', width: 13 },
        { key: 'm4', width: 13 },
        { key: 'm5', width: 13 },
        { key: 'm6', width: 13 },
        { key: 'm7', width: 13 },
        { key: 'm8', width: 13 },
        { key: 'm9', width: 13 },
        { key: 'm10', width: 13 },
        { key: 'm11', width: 13 },
        { key: 'm12', width: 13 },
        { key: 'total', width: 16 }
    ];

    // Header Rows
    ws.mergeCells('A1:A2');
    ws.mergeCells('B1:B2');
    ws.mergeCells('C1:N1');
    ws.mergeCells('O1:O2');

    ws.getCell('A1').value = 'STT';
    ws.getCell('B1').value = 'NỘI DUNG';
    ws.getCell('C1').value = 'CÁC THÁNG TRONG NĂM';
    ws.getCell('O1').value = 'TỔNG';

    const monthCols = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
    monthCols.forEach((col, idx) => {
        ws.getCell(`${col}2`).value = `T${idx + 1}`;
    });

    const headerRefs = ['A1', 'B1', 'C1', 'O1', ...monthCols.map(c => `${c}2`)];
    headerRefs.forEach(ref => {
        const cell = ws.getCell(ref);
        cell.font = { name: 'Arial', size: 9.5, bold: true, color: { argb: 'FFFFFFFF' } };
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E79' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center' };
        cell.border = BORDER_HEADER;
    });
    ws.getCell('O1').fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0D233A' } };

    ws.getRow(1).height = 24;
    ws.getRow(2).height = 24;

    const rowMap = {};
    let curRow = 3;
    ITEMS.forEach(item => {
        rowMap[item.type] = curRow;
        item.rowIdx = curRow;
        curRow++;
    });

    ITEMS.forEach((item) => {
        const r = item.rowIdx;
        const row = ws.getRow(r);
        row.height = 20;

        ws.getCell(`A${r}`).value = item.stt;
        ws.getCell(`A${r}`).alignment = { vertical: 'middle', horizontal: 'center' };
        ws.getCell(`B${r}`).value = item.name;
        ws.getCell(`B${r}`).alignment = { vertical: 'middle', horizontal: 'left', indent: item.type === 'item' ? 1 : 0 };

        const font = {
            name: 'Arial',
            size: item.bold ? 10 : 9.5,
            bold: !!item.bold,
            color: { argb: 'FF000000' }
        };
        ws.getCell(`A${r}`).font = font;
        ws.getCell(`B${r}`).font = font;

        if (item.fill) {
            for (let c = 1; c <= 15; c++) {
                row.getCell(c).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: item.fill } };
            }
        }
        for (let c = 1; c <= 15; c++) {
            row.getCell(c).border = BORDER_THIN;
        }

        if (item.type === 'grand_total') {
            const rI = rowMap['fixed_total'];
            const rII = rowMap['var_total'];
            const rIII = rowMap['interest_total'];
            monthCols.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `${col}${rI}+${col}${rII}+${col}${rIII}` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
        } else if (item.type === 'fixed_total') {
            const r1 = rowMap['sub_ns_total'];
            const r2 = rowMap['sub_ck_total'];
            monthCols.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `${col}${r1}+${col}${r2}` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
        } else if (item.type === 'sub_ns_total') {
            const start = r + 1, end = r + 4;
            monthCols.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `SUM(${col}${start}:${col}${end})` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
        } else if (item.type === 'sub_ck_total') {
            const start = r + 1, end = r + 5;
            monthCols.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `SUM(${col}${start}:${col}${end})` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
        } else if (item.type === 'var_total') {
            const start = r + 1, end = r + 24;
            monthCols.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `SUM(${col}${start}:${col}${end})` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
        } else if (item.type === 'interest_total') {
            const childR = r + 1;
            monthCols.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `${col}${childR}` };
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
        } else if (item.type === 'item_pct') {
            const rDS = r - 2, rLG = r - 1;
            monthCols.forEach(col => {
                ws.getCell(`${col}${r}`).value = { formula: `IF(${col}${rDS}>0, ${col}${rLG}/${col}${rDS}, 0)` };
                ws.getCell(`${col}${r}`).numFmt = '0.0%';
            });
        } else {
            monthCols.forEach(col => {
                ws.getCell(`${col}${r}`).value = 0;
                ws.getCell(`${col}${r}`).numFmt = '#,##0.00';
            });
        }

        // Column O (TỔNG)
        if (item.type === 'item_pct') {
            const rDS = r - 2, rLG = r - 1;
            ws.getCell(`O${r}`).value = { formula: `IF(O${rDS}>0, O${rLG}/O${rDS}, 0)` };
            ws.getCell(`O${r}`).numFmt = '0.0%';
        } else if (item.type === 'rev_header') {
            ws.getCell(`O${r}`).value = 0;
            ws.getCell(`O${r}`).numFmt = '#,##0.00';
        } else {
            ws.getCell(`O${r}`).value = { formula: `SUM(C${r}:N${r})` };
            ws.getCell(`O${r}`).numFmt = '#,##0.00';
        }

        // Alignments and fonts
        [...monthCols, 'O'].forEach(col => {
            const c = ws.getCell(`${col}${r}`);
            c.alignment = { vertical: 'middle', horizontal: 'right' };
            c.font = font;
        });
        ws.getCell(`O${r}`).font = { ...font, bold: true };
    });
}

async function main() {
    const outDir = path.resolve(__dirname, 'templates');
    if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir, { recursive: true });
    }

    console.log('[1/3] Generating Mau_Bao_Cao_Chi_Phi_Thang_VPS.xlsx...');
    const wb1 = new ExcelJS.Workbook();
    wb1.creator = 'VPS Group';
    await createMonthlySheet(wb1);
    const p1 = path.join(outDir, 'Mau_Bao_Cao_Chi_Phi_Thang_VPS.xlsx');
    await wb1.xlsx.writeFile(p1);
    console.log('Saved:', p1);

    console.log('[2/3] Generating Mau_Bao_Cao_Chi_Phi_Luy_Ke_Nam_VPS.xlsx...');
    const wb2 = new ExcelJS.Workbook();
    wb2.creator = 'VPS Group';
    await createYearlySheet(wb2);
    const p2 = path.join(outDir, 'Mau_Bao_Cao_Chi_Phi_Luy_Ke_Nam_VPS.xlsx');
    await wb2.xlsx.writeFile(p2);
    console.log('Saved:', p2);

    console.log('[3/3] Generating Mau_Bao_Cao_Chi_Phi_Tong_Hop_VPS.xlsx...');
    const wb3 = new ExcelJS.Workbook();
    wb3.creator = 'VPS Group';
    await createMonthlySheet(wb3);
    await createYearlySheet(wb3);
    const p3 = path.join(outDir, 'Mau_Bao_Cao_Chi_Phi_Tong_Hop_VPS.xlsx');
    await wb3.xlsx.writeFile(p3);
    console.log('Saved:', p3);

    console.log('All Excel templates generated successfully!');
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});
