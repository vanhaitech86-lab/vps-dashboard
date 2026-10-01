const ExcelJS = require('exceljs');
const fs = require('fs');

async function createInventoryTemplate() {
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'TẬP ĐOÀN VPS - BAN TÀI CHÍNH KẾ HOẠCH';
    workbook.lastModifiedBy = 'VPS Dashboard System';
    workbook.created = new Date();
    workbook.modified = new Date();

    // Data definition with exact figures scanned from units' Google Sheets
    const units = [
        {
            code: 'ALL',
            sheetName: 'TỔNG HỢP TẬP ĐOÀN',
            title: 'BÁO CÁO TỔNG HỢP TỒN KHO HĐKD & DỰ ÁN - TOÀN TẬP ĐOÀN VPS',
            data: [
                { no: 1, name: 'Máy', hp_sl: 442, hp_val: 18407112712, fuji_sl: 85, fuji_val: 3470887775, oli_sl: 47, oli_val: 496543522, bon_sl: 70, bon_val: 1318102207, oth_sl: 26719, oth_val: 21342923908, isProj: false },
                { no: 2, name: 'Option/phần mềm', hp_sl: 207, hp_val: 724129217, fuji_sl: 90, fuji_val: 316631629, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 24, oth_val: 84155594, isProj: false },
                { no: 3, name: 'Consumable', hp_sl: 1415, hp_val: 1697362872, fuji_sl: 3245, fuji_val: 4653936376, oli_sl: 1, oli_val: 595000, bon_sl: 0, bon_val: 0, oth_sl: 22758, oth_val: 13299519950, isProj: false },
                { no: 4, name: 'Part', hp_sl: 651, hp_val: 422875719, fuji_sl: 2835, fuji_val: 2318249062, oli_sl: 2, oli_val: 1300000, bon_sl: 1, bon_val: 250000, oth_sl: 356, oth_val: 2310839658, isProj: false },
                { no: 5, name: 'Dự án (Tồn kho phục vụ các hợp đồng/gói thầu)', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: true },
                { no: 6, name: 'Khác', hp_sl: 14, hp_val: 6907408, fuji_sl: 1, fuji_val: 250000, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 30, oth_val: 3248792524, isProj: false }
            ]
        },
        {
            code: 'THH',
            sheetName: '1. CTY TÂN HỒNG HÀ',
            title: 'BÁO CÁO CHỈ TIÊU TỒN KHO HĐKD & DỰ ÁN - CÔNG TY TÂN HỒNG HÀ',
            data: [
                { no: 1, name: 'Máy', hp_sl: 406, hp_val: 16236861538, fuji_sl: 67, fuji_val: 2691167947, oli_sl: 4, oli_val: 145461859, bon_sl: 30, bon_val: 1196919790, oth_sl: 8, oth_val: 351112106, isProj: false },
                { no: 2, name: 'Option/phần mềm', hp_sl: 207, hp_val: 724129217, fuji_sl: 90, fuji_val: 316631629, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 24, oth_val: 84155594, isProj: false },
                { no: 3, name: 'Consumable', hp_sl: 1415, hp_val: 1697362872, fuji_sl: 3245, fuji_val: 3893921782, oli_sl: 1, oli_val: 595000, bon_sl: 0, bon_val: 0, oth_sl: 397, oth_val: 477185636, isProj: false },
                { no: 4, name: 'Part', hp_sl: 651, hp_val: 422875719, fuji_sl: 2835, fuji_val: 1842798361, oli_sl: 2, oli_val: 1300000, bon_sl: 1, bon_val: 250000, oth_sl: 356, oth_val: 232552257, isProj: false },
                { no: 5, name: 'Dự án (Tồn kho phục vụ các hợp đồng/gói thầu)', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: true },
                { no: 6, name: 'Khác', hp_sl: 14, hp_val: 6907408, fuji_sl: 1, fuji_val: 250000, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 30, oth_val: 15330882, isProj: false }
            ]
        },
        {
            code: 'VIET',
            sheetName: '2. CTY VIỆT',
            title: 'BÁO CÁO CHỈ TIÊU TỒN KHO HĐKD & DỰ ÁN - CÔNG TY VIỆT',
            data: [
                { no: 1, name: 'Máy', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 26707, oth_val: 4578274809, isProj: false },
                { no: 2, name: 'Option/phần mềm', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 3, name: 'Consumable', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 22361, oth_val: 4269334314, isProj: false },
                { no: 4, name: 'Part', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 5, name: 'Dự án (Tồn kho phục vụ các hợp đồng/gói thầu)', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: true },
                { no: 6, name: 'Khác', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false }
            ]
        },
        {
            code: 'XESCO',
            sheetName: '3. CTY XEM SƠN',
            title: 'BÁO CÁO CHỈ TIÊU TỒN KHO HĐKD & DỰ ÁN - CÔNG TY XEM SƠN (XESCO)',
            data: [
                { no: 1, name: 'Máy', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 15746000000, isProj: false },
                { no: 2, name: 'Option/phần mềm', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 3, name: 'Consumable', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 8553000000, isProj: false },
                { no: 4, name: 'Part', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 2066000000, isProj: false },
                { no: 5, name: 'Dự án (Tồn kho phục vụ các hợp đồng/gói thầu)', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: true },
                { no: 6, name: 'Khác', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false }
            ]
        },
        {
            code: 'VPSM',
            sheetName: '4. VPS MIỀN TRUNG',
            title: 'BÁO CÁO CHỈ TIÊU TỒN KHO HĐKD & DỰ ÁN - VPS MIỀN TRUNG',
            data: [
                { no: 1, name: 'Máy', hp_sl: 36, hp_val: 1246704934, fuji_sl: 18, fuji_val: 523806373, oli_sl: 43, oli_val: 351081663, bon_sl: 40, bon_val: 121182417, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 2, name: 'Option/phần mềm', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 3, name: 'Consumable', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 4, name: 'Part', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 5, name: 'Dự án (Tồn kho phục vụ các hợp đồng/gói thầu)', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: true },
                { no: 6, name: 'Khác', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 3233461642, isProj: false }
            ]
        },
        {
            code: 'VPS',
            sheetName: '5. VP TỔNG CÔNG TY',
            title: 'BÁO CÁO CHỈ TIÊU TỒN KHO HĐKD & DỰ ÁN - VĂN PHÒNG TỔNG CÔNG TY VPS',
            data: [
                { no: 1, name: 'Máy', hp_sl: 0, hp_val: 923546240, fuji_sl: 0, fuji_val: 255913455, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 481538793, isProj: false },
                { no: 2, name: 'Option/phần mềm', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 3, name: 'Consumable', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 760014594, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 4, name: 'Part', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 475450701, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 12287401, isProj: false },
                { no: 5, name: 'Dự án (Tồn kho phục vụ các hợp đồng/gói thầu)', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: true },
                { no: 6, name: 'Khác', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false }
            ]
        },
        {
            code: 'ITSS',
            sheetName: '6. CTY ITSS',
            title: 'BÁO CÁO CHỈ TIÊU TỒN KHO HĐKD & DỰ ÁN - CÔNG TY ITSS',
            data: [
                { no: 1, name: 'Máy (Thiết bị mạng & Server CRM)', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 4, oth_val: 185000000, isProj: false },
                { no: 2, name: 'Option/phần mềm', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 3, name: 'Consumable', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 4, name: 'Part', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false },
                { no: 5, name: 'Dự án (Tồn kho phục vụ các hợp đồng/gói thầu)', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: true },
                { no: 6, name: 'Khác', hp_sl: 0, hp_val: 0, fuji_sl: 0, fuji_val: 0, oli_sl: 0, oli_val: 0, bon_sl: 0, bon_val: 0, oth_sl: 0, oth_val: 0, isProj: false }
            ]
        }
    ];

    // Colors matching user's Image 1 & 2
    const COLOR_HEADER_BG = 'A3E635';
    const COLOR_HEADER_TXT = '0F172A';
    const COLOR_PROJECT_BG = 'EFF6FF';
    const COLOR_BORDER = 'E2E8F0';
    const COLOR_TOTAL_HDKD = 'ECFDF5';
    const COLOR_TOTAL_PROJ = 'DBEAFE';
    const COLOR_GRAND_TOTAL = 'FEF3C7';

    // Standard number format displaying "-" for 0
    const NUM_FMT_QTY = '#,##0;-#,##0;"-"';
    const NUM_FMT_VAL = '#,##0;-#,##0;"-"';

    for (const unit of units) {
        const ws = workbook.addWorksheet(unit.sheetName, {
            views: [{ showGridLines: true }]
        });

        // Column widths
        ws.columns = [
            { width: 8 },  // A: STT
            { width: 34 }, // B: THH (Tên hàng hóa)
            { width: 10 }, // C: SL HP
            { width: 18 }, // D: Giá trị HP
            { width: 10 }, // E: SL Fuji
            { width: 18 }, // F: Giá trị Fuji
            { width: 10 }, // G: SL Olivetti
            { width: 18 }, // H: Giá trị Olivetti
            { width: 10 }, // I: SL Bonsai
            { width: 18 }, // J: Giá trị Bonsai
            { width: 10 }, // K: SL Khác
            { width: 18 }, // L: Giá trị Khác
            { width: 12 }, // M: TỔNG SL
            { width: 22 }  // N: TỔNG GIÁ TRỊ
        ];

        // Row 1: Company Title
        ws.mergeCells('A1:N1');
        const titleCell = ws.getCell('A1');
        titleCell.value = unit.title.toUpperCase();
        titleCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: '1E3A8A' } };
        titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
        ws.getRow(1).height = 32;

        // Row 2: Subtitle & Note
        ws.mergeCells('A2:N2');
        const subCell = ws.getCell('A2');
        subCell.value = 'Số liệu quét chính xác 100% từ Google Sheet đơn vị. Mục 5 (Dự án) và các ô chưa phát sinh để trống hiển thị "-".';
        subCell.font = { name: 'Arial', size: 10, italic: true, color: { argb: '475569' } };
        subCell.alignment = { horizontal: 'center', vertical: 'middle' };
        ws.getRow(2).height = 20;

        // Row 3: Blank
        ws.getRow(3).height = 8;

        // Row 4 & 5: Table Header
        ws.mergeCells('A4:A5');
        ws.getCell('A4').value = 'I';
        ws.mergeCells('B4:B5');
        ws.getCell('B4').value = 'THH';

        const brands = [
            { name: 'HP', colSL: 'C', colVal: 'D' },
            { name: 'Fujifilm', colSL: 'E', colVal: 'F' },
            { name: 'Olivetti / Vcopy', colSL: 'G', colVal: 'H' },
            { name: 'Bonsai / AIN', colSL: 'I', colVal: 'J' },
            { name: 'Khác', colSL: 'K', colVal: 'L' },
            { name: 'TỔNG CỘNG', colSL: 'M', colVal: 'N' }
        ];

        brands.forEach(b => {
            ws.mergeCells(`${b.colSL}4:${b.colVal}4`);
            const hCell = ws.getCell(`${b.colSL}4`);
            hCell.value = b.name;
            hCell.font = { name: 'Arial', size: 10, bold: true, color: { argb: COLOR_HEADER_TXT } };
            hCell.alignment = { horizontal: 'center', vertical: 'middle' };

            const slCell = ws.getCell(`${b.colSL}5`);
            slCell.value = 'SL';
            slCell.font = { name: 'Arial', size: 9, bold: true, color: { argb: '047857' } };
            slCell.alignment = { horizontal: 'center', vertical: 'middle' };

            const valCell = ws.getCell(`${b.colVal}5`);
            valCell.value = 'Giá trị (VNĐ)';
            valCell.font = { name: 'Arial', size: 9, bold: true, color: { argb: '0F172A' } };
            valCell.alignment = { horizontal: 'center', vertical: 'middle' };
        });

        ws.getRow(4).height = 24;
        ws.getRow(5).height = 22;

        // Style header cells (A4:N5)
        for (let r = 4; r <= 5; r++) {
            for (let c = 1; c <= 14; c++) {
                const cell = ws.getRow(r).getCell(c);
                cell.fill = {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: COLOR_HEADER_BG }
                };
                cell.border = {
                    top: { style: 'thin', color: { argb: '65A30D' } },
                    bottom: { style: 'thin', color: { argb: '65A30D' } },
                    left: { style: 'thin', color: { argb: '65A30D' } },
                    right: { style: 'thin', color: { argb: '65A30D' } }
                };
                if (!cell.font) {
                    cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: COLOR_HEADER_TXT } };
                }
                if (!cell.alignment) {
                    cell.alignment = { horizontal: 'center', vertical: 'middle' };
                }
            }
        }

        // Data rows: Rows 6 to 11 (Categories 1 to 6)
        let currentRow = 6;
        unit.data.forEach(item => {
            const row = ws.getRow(currentRow);
            row.height = 24;

            row.getCell(1).value = item.no;
            row.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };

            row.getCell(2).value = item.name;
            row.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };

            // HP
            row.getCell(3).value = item.hp_sl || 0;
            row.getCell(4).value = item.hp_val || 0;

            // Fujifilm
            row.getCell(5).value = item.fuji_sl || 0;
            row.getCell(6).value = item.fuji_val || 0;

            // Olivetti
            row.getCell(7).value = item.oli_sl || 0;
            row.getCell(8).value = item.oli_val || 0;

            // Bonsai
            row.getCell(9).value = item.bon_sl || 0;
            row.getCell(10).value = item.bon_val || 0;

            // Other
            row.getCell(11).value = item.oth_sl || 0;
            row.getCell(12).value = item.oth_val || 0;

            // Total SL (Formula: =C6+E6+G6+I6+K6)
            row.getCell(13).value = { formula: `C${currentRow}+E${currentRow}+G${currentRow}+I${currentRow}+K${currentRow}` };

            // Total Val (Formula: =D6+F6+H6+J6+L6)
            row.getCell(14).value = { formula: `D${currentRow}+F${currentRow}+H${currentRow}+J${currentRow}+L${currentRow}` };

            // Apply formats and styles
            for (let c = 1; c <= 14; c++) {
                const cell = row.getCell(c);
                cell.border = {
                    top: { style: 'thin', color: { argb: COLOR_BORDER } },
                    bottom: { style: 'thin', color: { argb: COLOR_BORDER } },
                    left: { style: 'thin', color: { argb: COLOR_BORDER } },
                    right: { style: 'thin', color: { argb: COLOR_BORDER } }
                };

                // Number formatting
                if ([3, 5, 7, 9, 11, 13].includes(c)) {
                    cell.numFmt = NUM_FMT_QTY;
                    cell.alignment = { horizontal: 'right', vertical: 'middle' };
                    cell.font = { name: 'Arial', size: 9.5, bold: item.isProj, color: { argb: item.isProj ? '2563EB' : '0284C7' } };
                } else if ([4, 6, 8, 10, 12, 14].includes(c)) {
                    cell.numFmt = NUM_FMT_VAL;
                    cell.alignment = { horizontal: 'right', vertical: 'middle' };
                    cell.font = { name: 'Arial', size: 9.5, bold: item.isProj, color: { argb: item.isProj ? '1E40AF' : '0F172A' } };
                }

                // Distinct highlight for Item 5: Dự án
                if (item.isProj) {
                    cell.fill = {
                        type: 'pattern',
                        pattern: 'solid',
                        fgColor: { argb: COLOR_PROJECT_BG }
                    };
                }
            }

            if (item.isProj) {
                row.getCell(2).font = { name: 'Arial', size: 10, bold: true, color: { argb: '1D4ED8' } };
                row.getCell(1).font = { name: 'Arial', size: 10, bold: true, color: { argb: '1D4ED8' } };
            } else {
                row.getCell(2).font = { name: 'Arial', size: 10, bold: true, color: { argb: '1E293B' } };
                row.getCell(1).font = { name: 'Arial', size: 10, bold: true, color: { argb: '64748B' } };
            }

            currentRow++;
        });

        // Row 12: SUB-TOTAL 1 - TỒN KHO HĐKD THƯỜNG (Mục 1 + 2 + 3 + 4 + 6)
        const rowHDKD = ws.getRow(currentRow);
        rowHDKD.height = 26;
        ws.mergeCells(`A${currentRow}:B${currentRow}`);
        rowHDKD.getCell(1).value = '🔹 CỘNG TỒN KHO HĐKD THƯỜNG (Mục 1, 2, 3, 4, 6)';
        rowHDKD.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };
        rowHDKD.getCell(1).font = { name: 'Arial', size: 10, bold: true, color: { argb: '065F46' } };

        const colLetters = ['C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N'];
        colLetters.forEach((col, idx) => {
            const colNum = idx + 3;
            rowHDKD.getCell(colNum).value = {
                formula: `${col}6+${col}7+${col}8+${col}9+${col}11`
            };
        });

        for (let c = 1; c <= 14; c++) {
            const cell = rowHDKD.getCell(c);
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: COLOR_TOTAL_HDKD }
            };
            cell.border = {
                top: { style: 'thin', color: { argb: '10B981' } },
                bottom: { style: 'thin', color: { argb: '10B981' } },
                left: { style: 'thin', color: { argb: 'E2E8F0' } },
                right: { style: 'thin', color: { argb: 'E2E8F0' } }
            };
            if ([3, 5, 7, 9, 11, 13].includes(c)) {
                cell.numFmt = NUM_FMT_QTY;
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
                cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: '047857' } };
            } else if ([4, 6, 8, 10, 12, 14].includes(c)) {
                cell.numFmt = NUM_FMT_VAL;
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
                cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: '065F46' } };
            }
        }
        currentRow++;

        // Row 13: SUB-TOTAL 2 - TỒN KHO HÀNG DỰ ÁN (Mục 5)
        const rowProj = ws.getRow(currentRow);
        rowProj.height = 26;
        ws.mergeCells(`A${currentRow}:B${currentRow}`);
        rowProj.getCell(1).value = '🔹 CỘNG TỒN KHO HÀNG DỰ ÁN (Mục 5)';
        rowProj.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };
        rowProj.getCell(1).font = { name: 'Arial', size: 10, bold: true, color: { argb: '1E40AF' } };

        colLetters.forEach((col, idx) => {
            const colNum = idx + 3;
            rowProj.getCell(colNum).value = {
                formula: `${col}10`
            };
        });

        for (let c = 1; c <= 14; c++) {
            const cell = rowProj.getCell(c);
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: COLOR_TOTAL_PROJ }
            };
            cell.border = {
                top: { style: 'thin', color: { argb: '3B82F6' } },
                bottom: { style: 'thin', color: { argb: '3B82F6' } },
                left: { style: 'thin', color: { argb: 'E2E8F0' } },
                right: { style: 'thin', color: { argb: 'E2E8F0' } }
            };
            if ([3, 5, 7, 9, 11, 13].includes(c)) {
                cell.numFmt = NUM_FMT_QTY;
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
                cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: '1D4ED8' } };
            } else if ([4, 6, 8, 10, 12, 14].includes(c)) {
                cell.numFmt = NUM_FMT_VAL;
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
                cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: '1E3A8A' } };
            }
        }
        currentRow++;

        // Row 14: GRAND TOTAL
        const rowGrand = ws.getRow(currentRow);
        rowGrand.height = 30;
        ws.mergeCells(`A${currentRow}:B${currentRow}`);
        rowGrand.getCell(1).value = '⭐ TỔNG CỘNG TỒN KHO TOÀN ĐƠN VỊ';
        rowGrand.getCell(1).alignment = { horizontal: 'left', vertical: 'middle' };
        rowGrand.getCell(1).font = { name: 'Arial', size: 11, bold: true, color: { argb: '92400E' } };

        colLetters.forEach((col, idx) => {
            const colNum = idx + 3;
            rowGrand.getCell(colNum).value = {
                formula: `${col}12+${col}13`
            };
        });

        for (let c = 1; c <= 14; c++) {
            const cell = rowGrand.getCell(c);
            cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: COLOR_GRAND_TOTAL }
            };
            cell.border = {
                top: { style: 'medium', color: { argb: 'D97706' } },
                bottom: { style: 'double', color: { argb: 'D97706' } },
                left: { style: 'thin', color: { argb: 'D97706' } },
                right: { style: 'thin', color: { argb: 'D97706' } }
            };
            if ([3, 5, 7, 9, 11, 13].includes(c)) {
                cell.numFmt = NUM_FMT_QTY;
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
                cell.font = { name: 'Arial', size: 10.5, bold: true, color: { argb: 'B45309' } };
            } else if ([4, 6, 8, 10, 12, 14].includes(c)) {
                cell.numFmt = NUM_FMT_VAL;
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
                cell.font = { name: 'Arial', size: 10.5, bold: true, color: { argb: '92400E' } };
            }
        }
        currentRow++;

        // KPI Summary in Excel
        currentRow += 1;
        ws.mergeCells(`B${currentRow}:N${currentRow}`);
        const cardHeader = ws.getCell(`B${currentRow}`);
        cardHeader.value = '📊 THỐNG KÊ NHANH TỶ TRỌNG TỒN KHO HĐKD THƯỜNG VS DỰ ÁN (SỐ LIỆU CHÍNH XÁC)';
        cardHeader.font = { name: 'Arial', size: 10, bold: true, color: { argb: '1E3A8A' } };
        cardHeader.alignment = { horizontal: 'left', vertical: 'middle' };
        currentRow++;

        const kpiRow = ws.getRow(currentRow);
        kpiRow.height = 24;
        ws.mergeCells(`B${currentRow}:D${currentRow}`);
        ws.getCell(`B${currentRow}`).value = '1. Tồn kho HĐKD Thường:';
        ws.getCell(`B${currentRow}`).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: '065F46' } };

        ws.mergeCells(`E${currentRow}:G${currentRow}`);
        ws.getCell(`E${currentRow}`).value = { formula: `N12` };
        ws.getCell(`E${currentRow}`).numFmt = '#,##0 "₫"';
        ws.getCell(`E${currentRow}`).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: '065F46' } };

        ws.mergeCells(`H${currentRow}:J${currentRow}`);
        ws.getCell(`H${currentRow}`).value = 'Tỷ trọng HĐKD:';
        ws.getCell(`H${currentRow}`).font = { name: 'Arial', size: 9.5, color: { argb: '475569' } };

        ws.mergeCells(`K${currentRow}:L${currentRow}`);
        ws.getCell(`K${currentRow}`).value = { formula: `IF(N14>0, N12/N14, 0)` };
        ws.getCell(`K${currentRow}`).numFmt = '0.0%';
        ws.getCell(`K${currentRow}`).font = { name: 'Arial', size: 10, bold: true, color: { argb: '047857' } };
        currentRow++;

        const kpiRow2 = ws.getRow(currentRow);
        kpiRow2.height = 24;
        ws.mergeCells(`B${currentRow}:D${currentRow}`);
        ws.getCell(`B${currentRow}`).value = '2. Tồn kho Hàng Dự Án:';
        ws.getCell(`B${currentRow}`).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: '1E40AF' } };

        ws.mergeCells(`E${currentRow}:G${currentRow}`);
        ws.getCell(`E${currentRow}`).value = { formula: `N13` };
        ws.getCell(`E${currentRow}`).numFmt = '#,##0 "₫"';
        ws.getCell(`E${currentRow}`).font = { name: 'Arial', size: 9.5, bold: true, color: { argb: '1E40AF' } };

        ws.mergeCells(`H${currentRow}:J${currentRow}`);
        ws.getCell(`H${currentRow}`).value = 'Tỷ trọng Dự án:';
        ws.getCell(`H${currentRow}`).font = { name: 'Arial', size: 9.5, color: { argb: '475569' } };

        ws.mergeCells(`K${currentRow}:L${currentRow}`);
        ws.getCell(`K${currentRow}`).value = { formula: `IF(N14>0, N13/N14, 0)` };
        ws.getCell(`K${currentRow}`).numFmt = '0.0%';
        ws.getCell(`K${currentRow}`).font = { name: 'Arial', size: 10, bold: true, color: { argb: '2563EB' } };
        currentRow++;

        const kpiRow3 = ws.getRow(currentRow);
        kpiRow3.height = 24;
        ws.mergeCells(`B${currentRow}:D${currentRow}`);
        ws.getCell(`B${currentRow}`).value = '⭐ TỔNG CỘNG TỒN KHO:';
        ws.getCell(`B${currentRow}`).font = { name: 'Arial', size: 10, bold: true, color: { argb: '92400E' } };

        ws.mergeCells(`E${currentRow}:G${currentRow}`);
        ws.getCell(`E${currentRow}`).value = { formula: `N14` };
        ws.getCell(`E${currentRow}`).numFmt = '#,##0 "₫"';
        ws.getCell(`E${currentRow}`).font = { name: 'Arial', size: 10, bold: true, color: { argb: '92400E' } };

        ws.mergeCells(`H${currentRow}:J${currentRow}`);
        ws.getCell(`H${currentRow}`).value = 'Tổng tỷ lệ:';
        ws.getCell(`H${currentRow}`).font = { name: 'Arial', size: 9.5, color: { argb: '475569' } };

        ws.mergeCells(`K${currentRow}:L${currentRow}`);
        ws.getCell(`K${currentRow}`).value = 1;
        ws.getCell(`K${currentRow}`).numFmt = '100.0%';
        ws.getCell(`K${currentRow}`).font = { name: 'Arial', size: 10, bold: true, color: { argb: '92400E' } };
    }

    // Guide sheet
    const guideWs = workbook.addWorksheet('QUY_DINH_HUONG_DAN', { views: [{ showGridLines: true }] });
    guideWs.columns = [
        { width: 6 },
        { width: 28 },
        { width: 60 },
        { width: 35 }
    ];

    guideWs.mergeCells('A1:D1');
    const gTitle = guideWs.getCell('A1');
    gTitle.value = 'QUY ĐỊNH PHÂN LOẠI & NHẬP LIỆU CHỈ TIÊU TỒN KHO TẬP ĐOÀN VPS';
    gTitle.font = { name: 'Arial', size: 14, bold: true, color: { argb: '1E3A8A' } };
    gTitle.alignment = { horizontal: 'center', vertical: 'middle' };
    guideWs.getRow(1).height = 32;

    const guideRows = [
        ['STT', 'MỤC DANH MỤC', 'ĐỊNH NGHĨA & TIÊU CHÍ PHÂN LOẠI', 'PHÂN NHÓM QUẢN TRỊ'],
        ['1', '1. Máy', 'Bao gồm toàn bộ máy in, máy photocopy, máy quét đa chức năng các hãng HP, Fujifilm, Olivetti, Bonsai...', 'HĐKD THƯỜNG'],
        ['2', '2. Option/phần mềm', 'Các khay giấy phụ, bộ đảo mặt, dập ghim, card mạng, bản quyền phần mềm giải pháp số...', 'HĐKD THƯỜNG'],
        ['3', '3. Consumable', 'Mực in (Toner), mực màu, Trống từ (Drum), Hộp thu mực thải, Bột từ (Developer)...', 'HĐKD THƯỜNG'],
        ['4', '4. Part', 'Linh kiện thay thế, bo mạch, bánh xe lấy giấy, sấy, cụm transfer belt, motor...', 'HĐKD THƯỜNG'],
        ['5', '5. Dự án', 'Hàng hóa (Máy, Option, Vật tư) nhập về dành riêng cho các Gói thầu, Hợp đồng dự án đang triển khai hoặc chờ nghiệm thu bàn giao.', 'TỒN KHO DỰ ÁN (THEO DÕI ĐỘC LẬP)'],
        ['6', '6. Khác', 'Bao bì, vật dụng đóng gói, phụ kiện chuyên dụng, thiết bị phụ trợ không thuộc 5 nhóm trên.', 'HĐKD THƯỜNG']
    ];

    guideRows.forEach((r, idx) => {
        const row = guideWs.getRow(idx + 3);
        row.height = 26;
        r.forEach((val, cIdx) => {
            const cell = row.getCell(cIdx + 1);
            cell.value = val;
            cell.border = {
                top: { style: 'thin', color: { argb: '94A3B8' } },
                bottom: { style: 'thin', color: { argb: '94A3B8' } },
                left: { style: 'thin', color: { argb: '94A3B8' } },
                right: { style: 'thin', color: { argb: '94A3B8' } }
            };
            if (idx === 0) {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '1E3A8A' } };
                cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFF' } };
                cell.alignment = { horizontal: 'center', vertical: 'middle' };
            } else {
                cell.alignment = { vertical: 'middle', horizontal: cIdx === 0 ? 'center' : 'left' };
                if (r[1].startsWith('5.')) {
                    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'DBEAFE' } };
                    cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: '1E40AF' } };
                } else {
                    cell.font = { name: 'Arial', size: 10, color: { argb: '1E293B' } };
                }
            }
        });
    });

    const outputPath = 'Template_Bao_Cao_Ton_Kho_HDKD_Va_Du_An_VPS.xlsx';
    await workbook.xlsx.writeFile(outputPath);
    console.log(`[OK] Re-generated inventory template with exact scanned figures: ${outputPath}`);
}

createInventoryTemplate().catch(err => {
    console.error('Error generating template:', err);
    process.exit(1);
});
