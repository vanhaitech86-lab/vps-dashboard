const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Common styles
const FONT_TITLE = { name: 'Arial', size: 13, bold: true, color: { argb: 'FFFFFFFF' } };
const FONT_HEADER = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
const FONT_DATA = { name: 'Arial', size: 10 };
const FONT_BOLD = { name: 'Arial', size: 10, bold: true };

const FILL_NAVY = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E78' } };
const FILL_BLUE = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5597' } };
const FILL_GRAY = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };

const BORDER_ALL = {
    top: { style: 'thin', color: { argb: 'FFD9D9D9' } },
    left: { style: 'thin', color: { argb: 'FFD9D9D9' } },
    bottom: { style: 'thin', color: { argb: 'FFD9D9D9' } },
    right: { style: 'thin', color: { argb: 'FFD9D9D9' } }
};

const ALIGN_CENTER = { horizontal: 'center', vertical: 'middle', wrapText: true };
const ALIGN_LEFT = { horizontal: 'left', vertical: 'middle', wrapText: true };
const ALIGN_RIGHT = { horizontal: 'right', vertical: 'middle' };

function styleHeaderRow(row, fill = FILL_BLUE, height = 28) {
    row.height = height;
    row.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = fill;
        cell.font = FONT_HEADER;
        cell.alignment = ALIGN_CENTER;
        cell.border = BORDER_ALL;
    });
}

function styleDataRow(row, isBold = false) {
    row.height = 22;
    row.eachCell({ includeEmpty: true }, (cell) => {
        cell.font = isBold ? FONT_BOLD : FONT_DATA;
        cell.border = BORDER_ALL;
        if (!cell.alignment) {
            cell.alignment = { vertical: 'middle' };
        }
    });
}

async function build12IndicatorsWorkbook() {
    const wb = new ExcelJS.Workbook();
    wb.creator = 'VPS Group';
    wb.lastModifiedBy = 'VPS Group';
    wb.created = new Date();

    const companies = ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS', 'Văn phòng VPS'];
    const currentMonth = '08/2026';

    // =========================================================================
    // SHEET 0: HƯỚNG DẪN 12 CHỈ TIÊU
    // =========================================================================
    const ws0 = wb.addWorksheet('00_Huong_Dan', { views: [{ showGridLines: true }] });
    ws0.columns = [{ width: 8 }, { width: 34 }, { width: 80 }];
    
    ws0.mergeCells('B2:C2');
    const t0 = ws0.getCell('B2');
    t0.value = 'HƯỚNG DẪN NHẬP LIỆU 12 CHỈ TIÊU ĐIỀU HÀNH - TẬP ĐOÀN VPS';
    t0.font = { name: 'Arial', size: 14, bold: true, color: { argb: 'FF1F4E78' } };
    ws0.getRow(2).height = 32;

    const indicatorsList = [
        ['1. CCTC Nhân sự', 'Theo dõi định biên, nhân sự chính thức, tuyển mới, nghỉ việc và thử việc theo phòng ban.'],
        ['2. Doanh thu & Lãi gộp', 'Doanh số kế hoạch, thực tế, tỷ lệ lãi gộp, chi phí và lợi nhuận trước thuế.'],
        ['3. Sản phẩm', 'Doanh thu phân loại theo hãng (HP, Fujifilm, Khác) và nhóm hàng hóa (máy in, photo, mực, linh kiện).'],
        ['4. Tồn kho', 'Danh mục vật tư, thiết bị, đơn vị tính, số lượng kiểm kê và tổng giá trị tồn kho (VNĐ).'],
        ['5. Chi phí', 'Bảng phân bổ chi phí chi tiết: cố định, biến đổi, lãi vay phân bổ theo 8 bộ phận nghiệp vụ.'],
        ['6. Công nợ', 'Phân loại công nợ theo tuổi nợ: phải thu trong hạn, quá hạn và nợ khó đòi.'],
        ['7. Khách hàng', 'Biến động khách hàng theo 6 mảng kinh doanh (Thuê máy, MC, DV Photo, DV Máy in, DV khác, Đại lý).'],
        ['8. Dịch vụ tận tâm', 'Chấm điểm chất lượng dịch vụ KTV: số lượt việc, thời gian phản hồi/xử lý, biên bản và vật tư thu hồi.'],
        ['9. ISO', 'Danh mục quy trình, quy định chuẩn hóa đã ban hành và kiểm soát tuân thủ tại đơn vị.'],
        ['10. Đào tạo', 'Kế hoạch và thực tế số lượt CBNV tham gia các chương trình đào tạo nâng cao chuyên môn.'],
        ['11. Văn hóa DN', 'Đo lường các chỉ tiêu văn hóa VPS: Nhân quả, Tứ vô lượng tâm, Quy y Tam Bảo, Tín chỉ Phật pháp.'],
        ['12. Thương hiệu', 'Thị phần máy photocopy, tỷ trọng doanh số trực tiếp, độ nhận diện và phát triển khách hàng mới.']
    ];

    let r0 = 4;
    indicatorsList.forEach(([name, desc]) => {
        ws0.getCell(`B${r0}`).value = name;
        ws0.getCell(`B${r0}`).font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF2F5597' } };
        ws0.getCell(`C${r0}`).value = desc;
        ws0.getCell(`C${r0}`).font = { name: 'Arial', size: 10 };
        ws0.getCell(`C${r0}`).alignment = { wrapText: true, vertical: 'middle' };
        ws0.getRow(r0).height = 24;
        r0++;
    });

    // =========================================================================
    // 1. CCTC NHÂN SỰ
    // =========================================================================
    const wsHR = wb.addWorksheet('1. CCTC Nhân sự', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsHR.columns = [{ width: 14 }, { width: 20 }, { width: 25 }, { width: 18 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 20 }];
    wsHR.mergeCells('A1:H1');
    const tHR = wsHR.getCell('A1');
    tHR.value = 'CHỈ TIÊU 1: BÁO CÁO CƠ CẤU TỔ CHỨC & BIẾN ĐỘNG NHÂN SỰ (KỲ: ' + currentMonth + ')';
    tHR.font = FONT_TITLE; tHR.fill = FILL_NAVY; tHR.alignment = ALIGN_CENTER;
    wsHR.getRow(1).height = 32;

    const rHR2 = wsHR.getRow(2);
    rHR2.values = ['Tháng/Năm', 'Công ty', 'Phòng ban', 'Tổng NV Đầu kỳ', 'Tuyển mới', 'Nghỉ việc', 'NV Thử việc', 'Tổng NV Cuối kỳ'];
    styleHeaderRow(rHR2, FILL_BLUE, 28);

    const depts = ['Kinh doanh', 'Kỹ thuật', 'Kế toán', 'Hành chính', 'Kho/Giao vận'];
    companies.forEach(comp => {
        depts.forEach(dept => {
            const row = wsHR.addRow([currentMonth, comp, dept, 12, 1, 0, 1, 13]);
            styleDataRow(row);
            row.getCell(1).alignment = ALIGN_CENTER;
            row.getCell(2).alignment = ALIGN_LEFT;
            row.getCell(3).alignment = ALIGN_LEFT;
            for (let c = 4; c <= 8; c++) {
                row.getCell(c).alignment = ALIGN_CENTER;
                row.getCell(c).numFmt = '#,##0';
            }
        });
    });

    // =========================================================================
    // 2. DOANH SỐ LÃI GỘP
    // =========================================================================
    const wsRev = wb.addWorksheet('2. Doanh thu', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsRev.columns = [{ width: 14 }, { width: 22 }, { width: 25 }, { width: 25 }, { width: 16 }, { width: 24 }, { width: 24 }];
    wsRev.mergeCells('A1:G1');
    const tRev = wsRev.getCell('A1');
    tRev.value = 'CHỈ TIÊU 2: BÁO CÁO DOANH SỐ & LÃI GỘP (KỲ: ' + currentMonth + ')';
    tRev.font = FONT_TITLE; tRev.fill = FILL_NAVY; tRev.alignment = ALIGN_CENTER;
    wsRev.getRow(1).height = 32;

    const rRev2 = wsRev.getRow(2);
    rRev2.values = ['Tháng/Năm', 'Công ty', 'Doanh số Kế hoạch (VNĐ)', 'Doanh số Thực tế (VNĐ)', 'Tỷ lệ gộp (%)', 'Chi phí (VNĐ)', 'Lợi nhuận TT (VNĐ)'];
    styleHeaderRow(rRev2, FILL_BLUE, 28);

    const sampleRev = [
        [currentMonth, 'Tân Hồng Hà', 18500000000, 19250000000, 22.5, 3200000000, 1125000000],
        [currentMonth, 'Việt', 14000000000, 14380000000, 21.0, 2450000000, 569800000],
        [currentMonth, 'Xem Sơn', 45000000000, 46120000000, 23.0, 7800000000, 2807600000],
        [currentMonth, 'VPS M', 7500000000, 7650000000, 24.0, 1350000000, 486000000],
        [currentMonth, 'ITSS', 2200000000, 2350000000, 28.0, 480000000, 178000000],
        [currentMonth, 'Văn phòng VPS', 0, 0, 0, 1250000000, -1250000000]
    ];
    sampleRev.forEach(r => {
        const row = wsRev.addRow(r);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).numFmt = '#,##0';
        row.getCell(4).numFmt = '#,##0';
        row.getCell(5).numFmt = '0.0"%"';
        row.getCell(6).numFmt = '#,##0';
        row.getCell(7).numFmt = '#,##0';
    });

    // =========================================================================
    // 3. SẢN PHẨM
    // =========================================================================
    const wsProd = wb.addWorksheet('3. Sản phẩm', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsProd.columns = [{ width: 20 }, { width: 14 }, { width: 25 }, { width: 28 }, { width: 24 }];
    wsProd.mergeCells('A1:E1');
    const tProd = wsProd.getCell('A1');
    tProd.value = 'CHỈ TIÊU 3: BÁO CÁO DOANH SỐ THEO HÃNG & NHÓM SẢN PHẨM (KỲ: ' + currentMonth + ')';
    tProd.font = FONT_TITLE; tProd.fill = FILL_NAVY; tProd.alignment = ALIGN_CENTER;
    wsProd.getRow(1).height = 32;

    const rProd2 = wsProd.getRow(2);
    rProd2.values = ['CÔNG TY', 'THÁNG', 'HÃNG (HP/Fujifilm/Khác)', 'NHÓM SẢN PHẨM', 'DOANH THU (VNĐ)'];
    styleHeaderRow(rProd2, FILL_BLUE, 28);

    const sampleProd = [
        ['Tân Hồng Hà', '8', 'HP', 'Máy in', 4500000000],
        ['Tân Hồng Hà', '8', 'Fujifilm', 'Máy Photocopy', 8500000000],
        ['Tân Hồng Hà', '8', 'HP', 'Mực in & Linh kiện', 3200000000],
        ['Việt', '8', 'HP', 'Máy in đa chức năng', 6200000000],
        ['Việt', '8', 'Fujifilm', 'Máy Photocopy', 5800000000],
        ['Xem Sơn', '8', 'HP', 'Máy in dự án', 18500000000],
        ['Xem Sơn', '8', 'Fujifilm', 'Máy Photocopy kỹ thuật số', 21000000000],
        ['VPS M', '8', 'Fujifilm', 'Máy Photocopy', 4500000000],
        ['ITSS', '8', 'Khác', 'Phần mềm & Bản quyền', 2350000000]
    ];
    sampleProd.forEach(r => {
        const row = wsProd.addRow(r);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_LEFT;
        row.getCell(2).alignment = ALIGN_CENTER;
        row.getCell(3).alignment = ALIGN_LEFT;
        row.getCell(4).alignment = ALIGN_LEFT;
        row.getCell(5).alignment = ALIGN_RIGHT;
        row.getCell(5).numFmt = '#,##0';
    });

    // =========================================================================
    // 4. TỒN KHO
    // =========================================================================
    const wsInv = wb.addWorksheet('4. Tồn kho', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsInv.columns = [{ width: 14 }, { width: 20 }, { width: 22 }, { width: 36 }, { width: 14 }, { width: 16 }, { width: 24 }];
    wsInv.mergeCells('A1:G1');
    const tInv = wsInv.getCell('A1');
    tInv.value = 'CHỈ TIÊU 4: BÁO CÁO QUẢN LÝ TỒN KHO VẬT TƯ & THIẾT BỊ (KỲ: ' + currentMonth + ')';
    tInv.font = FONT_TITLE; tInv.fill = FILL_NAVY; tInv.alignment = ALIGN_CENTER;
    wsInv.getRow(1).height = 32;

    const rInv2 = wsInv.getRow(2);
    rInv2.values = ['Tháng/Năm', 'Công ty', 'Danh mục', 'Tên Vật tư/Thiết bị', 'Đơn vị tính', 'Số lượng', 'Tổng Giá trị (VNĐ)'];
    styleHeaderRow(rInv2, FILL_BLUE, 28);

    const sampleInv = [
        [currentMonth, 'Tân Hồng Hà', 'Máy Photocopy', 'Máy Photocopy Fujifilm Apeos 5570', 'Chiếc', 12, 1250000000],
        [currentMonth, 'Tân Hồng Hà', 'Vật tư tiêu hao', 'Mực máy in HP LaserJet Managed W9004MC', 'Hộp', 150, 480000000],
        [currentMonth, 'Việt', 'Máy in', 'Máy in đa chức năng HP LaserJet E826z', 'Chiếc', 8, 920000000],
        [currentMonth, 'Xem Sơn', 'Linh kiện thay thế', 'Cụm Trống (Drum Unit) Fuji Xerox IV', 'Cụm', 85, 360000000],
        [currentMonth, 'VPS M', 'Máy Photocopy', 'Máy Photocopy Ricoh MP 5055', 'Chiếc', 6, 420000000],
        [currentMonth, 'ITSS', 'Thiết bị mạng & Server', 'Router & Server giám sát hệ thống CRM', 'Bộ', 4, 185000000]
    ];
    sampleInv.forEach(r => {
        const row = wsInv.addRow(r);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(5).alignment = ALIGN_CENTER;
        row.getCell(6).alignment = ALIGN_RIGHT;
        row.getCell(6).numFmt = '#,##0';
        row.getCell(7).alignment = ALIGN_RIGHT;
        row.getCell(7).numFmt = '#,##0';
    });

    // =========================================================================
    // 5. CHI PHÍ
    // =========================================================================
    const wsExp = wb.addWorksheet('5. Chi phí', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsExp.columns = [
        { width: 8 }, { width: 38 }, { width: 18 }, { width: 18 }, { width: 14 },
        { width: 14 }, { width: 14 }, { width: 14 }, { width: 14 }, { width: 14 },
        { width: 14 }, { width: 14 }, { width: 14 }
    ];
    wsExp.mergeCells('A1:E1');
    wsExp.getCell('A1').value = 'CHỈ TIÊU 5: BÁO CÁO TỔNG HỢP CHI PHÍ (VNĐ)';
    wsExp.getCell('A1').font = FONT_TITLE; wsExp.getCell('A1').fill = FILL_NAVY; wsExp.getCell('A1').alignment = ALIGN_CENTER;

    wsExp.mergeCells('F1:M1');
    wsExp.getCell('F1').value = 'PHÂN BỔ CHI PHÍ THEO CÁC BỘ PHẬN (VNĐ)';
    wsExp.getCell('F1').font = FONT_TITLE; wsExp.getCell('F1').fill = FILL_BLUE; wsExp.getCell('F1').alignment = ALIGN_CENTER;
    wsExp.getRow(1).height = 32;

    const rExp2 = wsExp.getRow(2);
    rExp2.values = ['STT', 'NỘI DUNG CHI PHÍ', 'KẾ HOẠCH', 'THỰC HIỆN', 'TỶ LỆ (%)', 'DVKT', 'KD BB', 'KD BL-TH', 'KD DA', 'KD TM', 'KD Khác', 'Kế toán', 'BP Khác'];
    styleHeaderRow(rExp2, FILL_BLUE, 28);

    const expenseItems = [
        ['A', 'TỔNG CHI PHÍ', 3500000000, 3200000000, 91.4, 650000000, 480000000, 420000000, 680000000, 250000000, 180000000, 320000000, 220000000],
        ['I', 'Chi phí cố định', 2100000000, 1980000000, 94.3, 410000000, 310000000, 270000000, 410000000, 150000000, 110000000, 200000000, 120000000],
        ['1', 'Tiền lương & phụ cấp nhân sự', 1500000000, 1450000000, 96.7, 320000000, 240000000, 210000000, 310000000, 110000000, 80000000, 120000000, 60000000],
        ['2', 'Thuê văn phòng, thuê kho', 350000000, 330000000, 94.3, 50000000, 40000000, 35000000, 60000000, 25000000, 20000000, 50000000, 50000000],
        ['3', 'Khấu hao TSCĐ & phân bổ CCDC', 250000000, 200000000, 80.0, 40000000, 30000000, 25000000, 40000000, 15000000, 10000000, 30000000, 10000000],
        ['II', 'Chi phí biến đổi', 1200000000, 1070000000, 89.2, 210000000, 150000000, 130000000, 240000000, 90000000, 60000000, 110000000, 80000000],
        ['1', 'Điện, nước, internet', 60000000, 55000000, 91.7, 12000000, 8000000, 7000000, 12000000, 4000000, 3000000, 5000000, 4000000],
        ['2', 'Vận chuyển hàng & giao nhận', 180000000, 165000000, 91.7, 45000000, 25000000, 20000000, 40000000, 15000000, 10000000, 5000000, 5000000],
        ['3', 'Tiếp khách & công tác phí', 220000000, 195000000, 88.6, 20000000, 40000000, 35000000, 65000000, 20000000, 10000000, 3000000, 2000000],
        ['4', 'Vật tư bảo hành & sửa chữa', 350000000, 310000000, 88.6, 120000000, 30000000, 25000000, 50000000, 25000000, 15000000, 25000000, 20000000],
        ['III', 'Chi phí lãi vay', 200000000, 150000000, 75.0, 30000000, 20000000, 20000000, 30000000, 10000000, 10000000, 10000000, 20000000]
    ];
    expenseItems.forEach(r => {
        const row = wsExp.addRow(r);
        const isHeader = ['A', 'I', 'II', 'III'].includes(r[0]);
        styleDataRow(row, isHeader);
        if (isHeader) row.eachCell((c) => c.fill = FILL_GRAY);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).numFmt = '#,##0';
        row.getCell(4).numFmt = '#,##0';
        row.getCell(5).numFmt = '0.0"%"';
        for (let c = 6; c <= 13; c++) {
            row.getCell(c).alignment = ALIGN_RIGHT;
            row.getCell(c).numFmt = '#,##0';
        }
    });

    // =========================================================================
    // 6. CÔNG NỢ
    // =========================================================================
    const wsDebt = wb.addWorksheet('6. Công nợ', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsDebt.columns = [{ width: 14 }, { width: 22 }, { width: 26 }, { width: 26 }, { width: 26 }, { width: 26 }];
    wsDebt.mergeCells('A1:F1');
    const tDebt = wsDebt.getCell('A1');
    tDebt.value = 'CHỈ TIÊU 6: BÁO CÁO THEO DÕI CÔNG NỢ PHẢI THU (KỲ: ' + currentMonth + ')';
    tDebt.font = FONT_TITLE; tDebt.fill = FILL_NAVY; tDebt.alignment = ALIGN_CENTER;
    wsDebt.getRow(1).height = 32;

    const rDebt2 = wsDebt.getRow(2);
    rDebt2.values = ['Tháng/Năm', 'Công ty', 'Phải thu trong hạn (VNĐ)', 'Nợ quá hạn (VNĐ)', 'Nợ khó đòi (VNĐ)', 'Tổng công nợ (VNĐ)'];
    styleHeaderRow(rDebt2, FILL_BLUE, 28);

    const sampleDebt = [
        [currentMonth, 'Tân Hồng Hà', 12500000000, 1850000000, 150000000],
        [currentMonth, 'Việt', 8900000000, 1200000000, 80000000],
        [currentMonth, 'Xem Sơn', 28500000000, 3950000000, 420000000],
        [currentMonth, 'VPS M', 4800000000, 620000000, 45000000],
        [currentMonth, 'ITSS', 1100000000, 150000000, 0],
        [currentMonth, 'Văn phòng VPS', 0, 0, 0]
    ];
    sampleDebt.forEach((r, idx) => {
        const rowNum = idx + 3;
        const totalFormula = { formula: `C${rowNum}+D${rowNum}+E${rowNum}` };
        const row = wsDebt.addRow([...r, totalFormula]);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).numFmt = '#,##0';
        row.getCell(4).numFmt = '#,##0';
        row.getCell(5).numFmt = '#,##0';
        row.getCell(6).numFmt = '#,##0';
    });

    // =========================================================================
    // 7. KHÁCH HÀNG
    // =========================================================================
    const wsCust = wb.addWorksheet('7. Khách hàng', { views: [{ state: 'frozen', ySplit: 3 }] });
    for (let i = 1; i <= 13; i++) wsCust.getColumn(i).width = (i <= 3) ? 18 : 13;

    wsCust.mergeCells('A1:M1');
    const tCust = wsCust.getCell('A1');
    tCust.value = 'CHỈ TIÊU 7: BÁO CÁO CƠ CẤU & BIẾN ĐỘNG KHÁCH HÀNG (KỲ: ' + currentMonth + ')';
    tCust.font = FONT_TITLE; tCust.fill = FILL_NAVY; tCust.alignment = ALIGN_CENTER;
    wsCust.getRow(1).height = 32;

    const ch1 = ['Tháng/Năm', 'Công ty', 'Mảng kinh doanh', 'Đầu kỳ', '', 'Kế hoạch tháng', '', 'Tăng trong kỳ', '', 'Giảm trong kỳ', '', 'Cuối kỳ', ''];
    const ch2 = ['', '', '', 'Số Máy', 'Số KH', 'Số Máy', 'Số KH', 'Số Máy', 'Số KH', 'Số Máy', 'Số KH', 'Số Máy', 'Số KH'];
    const rC2 = wsCust.getRow(2); rC2.values = ch1; styleHeaderRow(rC2, FILL_BLUE, 24);
    const rC3 = wsCust.getRow(3); rC3.values = ch2; styleHeaderRow(rC3, FILL_BLUE, 24);

    wsCust.mergeCells('A2:A3'); wsCust.mergeCells('B2:B3'); wsCust.mergeCells('C2:C3');
    wsCust.mergeCells('D2:E2'); wsCust.mergeCells('F2:G2'); wsCust.mergeCells('H2:I2');
    wsCust.mergeCells('J2:K2'); wsCust.mergeCells('L2:M2');

    const customerCategories = ['Thuê máy', 'MC', 'Dịch vụ - Photo', 'Dịch vụ - Máy in', 'Dịch vụ khác', 'Phân phối (Đại lý)'];
    companies.forEach(comp => {
        customerCategories.forEach(cat => {
            const isPP = cat === 'Phân phối (Đại lý)';
            const rData = [currentMonth, comp, cat, isPP ? '-' : 120, 95, isPP ? '-' : 15, 12, isPP ? '-' : 10, 8, isPP ? '-' : 2, 1, isPP ? '-' : 128, 102];
            const row = wsCust.addRow(rData);
            styleDataRow(row);
            row.getCell(1).alignment = ALIGN_CENTER;
            row.getCell(2).alignment = ALIGN_LEFT;
            row.getCell(3).alignment = ALIGN_LEFT;
            for (let c = 4; c <= 13; c++) {
                row.getCell(c).alignment = ALIGN_CENTER;
                if (!isPP || c % 2 !== 0) row.getCell(c).numFmt = '#,##0';
            }
        });
    });

    // =========================================================================
    // 8. DỊCH VỤ TẬN TÂM
    // =========================================================================
    const wsServ = wb.addWorksheet('8. Dịch vụ tận tâm', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsServ.columns = [
        { width: 6 }, { width: 22 }, { width: 12 }, { width: 14 }, { width: 18 },
        { width: 14 }, { width: 12 }, { width: 14 }, { width: 16 }, { width: 14 },
        { width: 14 }, { width: 14 }, { width: 14 }, { width: 16 }, { width: 16 }, { width: 10 }
    ];
    wsServ.mergeCells('A1:P1');
    const tServ = wsServ.getCell('A1');
    tServ.value = 'CHỈ TIÊU 8: BÁO CÁO ĐÁNH GIÁ KỸ THUẬT & DỊCH VỤ TẬN TÂM';
    tServ.font = FONT_TITLE; tServ.fill = FILL_NAVY; tServ.alignment = ALIGN_CENTER;
    wsServ.getRow(1).height = 32;

    const rServ2 = wsServ.getRow(2);
    rServ2.values = ['STT', 'Họ và tên', 'Mã NV', 'Bộ phận', 'Công ty', 'Số lượt việc', 'Điểm TB', 'Tổng điểm', 'TG phản hồi (h)', 'TG đến (h)', 'TG xử lý (h)', 'TG về (h)', 'Biên bản lập', 'Biên bản thay thế', 'Thu hồi vật tư', 'Tháng'];
    styleHeaderRow(rServ2, FILL_BLUE, 28);

    const sampleServ = [
        [1, 'Cổ Phước Thịnh', 'THINHCY', 'Kỹ thuật', 'Tân Hồng Hà', 25, 9.8, 245, 0.45, 0.50, 1.20, 0.40, 25, 6, 6, 8],
        [2, 'Hồ Trung Nam', 'NAMHT', 'Kỹ thuật', 'Việt', 35, 9.5, 332.5, 0.35, 0.45, 0.95, 0.30, 35, 12, 12, 8],
        [3, 'Phan Văn Nguyện', 'NGUYENPV', 'Kỹ thuật', 'VPS M', 30, 9.7, 291, 0.40, 0.40, 1.10, 0.35, 30, 8, 8, 8],
        [4, 'Trương Quốc Bảo', 'BAOTQ', 'Kỹ thuật', 'Xem Sơn', 28, 9.6, 268.8, 0.50, 0.55, 1.05, 0.45, 28, 9, 9, 8]
    ];
    sampleServ.forEach(r => {
        const row = wsServ.addRow(r);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).alignment = ALIGN_CENTER;
        row.getCell(4).alignment = ALIGN_CENTER;
        row.getCell(5).alignment = ALIGN_LEFT;
        for (let c = 6; c <= 16; c++) row.getCell(c).alignment = ALIGN_CENTER;
    });

    // =========================================================================
    // 9. ISO
    // =========================================================================
    const wsIso = wb.addWorksheet('9. ISO', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsIso.columns = [{ width: 20 }, { width: 25 }, { width: 45 }, { width: 25 }];
    wsIso.mergeCells('A1:D1');
    const tIso = wsIso.getCell('A1');
    tIso.value = 'CHỈ TIÊU 9: DANH MỤC QUY TRÌNH & QUY ĐỊNH ISO DOANH NGHIỆP';
    tIso.font = FONT_TITLE; tIso.fill = FILL_NAVY; tIso.alignment = ALIGN_CENTER;
    wsIso.getRow(1).height = 32;

    const rIso2 = wsIso.getRow(2);
    rIso2.values = ['CÔNG TY', 'PHÒNG BAN', 'TÊN QUY TRÌNH / QUY ĐỊNH', 'PHÂN LOẠI (Quy trình/Quy định)'];
    styleHeaderRow(rIso2, FILL_BLUE, 28);

    const sampleIso = [
        ['Tân Hồng Hà', 'Hành chính Nhân sự', 'Quy trình tuyển dụng và hội nhập nhân sự', 'Quy trình'],
        ['Tân Hồng Hà', 'Kế toán', 'Quy định quản lý tạm ứng và thanh toán công tác phí', 'Quy định'],
        ['Việt', 'Kinh doanh', 'Quy trình tiếp nhận và xử lý đơn hàng dự án', 'Quy trình'],
        ['Xem Sơn', 'Kỹ thuật', 'Quy trình bảo hành bảo trì máy photocopy', 'Quy trình'],
        ['VPS M', 'Kho vận', 'Quy trình xuất nhập kho và kiểm kê hàng hóa', 'Quy trình'],
        ['ITSS', 'Kỹ thuật Phần mềm', 'Quy trình bảo mật thông tin và sao lưu dữ liệu CRM', 'Quy trình']
    ];
    sampleIso.forEach(r => {
        const row = wsIso.addRow(r);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_LEFT;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).alignment = ALIGN_LEFT;
        row.getCell(4).alignment = ALIGN_CENTER;
    });

    // =========================================================================
    // 10. ĐÀO TẠO
    // =========================================================================
    const wsTrain = wb.addWorksheet('10. Đào tạo', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsTrain.columns = [{ width: 8 }, { width: 45 }, { width: 25 }, { width: 18 }, { width: 18 }, { width: 16 }, { width: 30 }];
    wsTrain.mergeCells('A1:G1');
    const tTrain = wsTrain.getCell('A1');
    tTrain.value = 'CHỈ TIÊU 10: BÁO CÁO KẾT QUẢ ĐÀO TẠO NĂNG LỰC (KỲ: ' + currentMonth + ')';
    tTrain.font = FONT_TITLE; tTrain.fill = FILL_NAVY; tTrain.alignment = ALIGN_CENTER;
    wsTrain.getRow(1).height = 32;

    const rTrain2 = wsTrain.getRow(2);
    rTrain2.values = ['STT', 'Nội dung đào tạo', 'Đối tượng đào tạo', 'Kế hoạch (Lượt)', 'Thực tế (Lượt)', 'Tỷ lệ (%)', 'Ghi chú'];
    styleHeaderRow(rTrain2, FILL_BLUE, 28);

    const sampleTrain = [
        [1, 'Kỹ năng bán hàng giải pháp & thiết bị văn phòng chuyên sâu', 'Khối Kinh doanh', 30, 28, null, 'Đạt 93.3% kế hoạch'],
        [2, 'Kỹ thuật vận hành, sửa chữa & thay thế cụm sấy, trống máy photo', 'Khối Kỹ thuật', 40, 38, null, 'Hoàn thành tốt'],
        [3, 'Quy trình kiểm soát chất lượng dịch vụ & tiêu chuẩn 5S', 'Toàn thể CBNV', 50, 48, null, '100% đạt bài kiểm tra'],
        [4, 'Chính sách bảo hành và kỹ năng giao tiếp ái ngữ khách hàng', 'Kỹ thuật, Điều phối', 25, 25, null, 'Hoàn thành 100% chỉ tiêu']
    ];
    sampleTrain.forEach((r, idx) => {
        const rowNum = idx + 3;
        const pctFormula = { formula: `E${rowNum}/D${rowNum}` };
        const row = wsTrain.addRow([r[0], r[1], r[2], r[3], r[4], pctFormula, r[6]]);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).alignment = ALIGN_LEFT;
        row.getCell(4).alignment = ALIGN_CENTER;
        row.getCell(5).alignment = ALIGN_CENTER;
        row.getCell(6).alignment = ALIGN_CENTER;
        row.getCell(6).numFmt = '0.0%';
        row.getCell(7).alignment = ALIGN_LEFT;
    });

    // =========================================================================
    // 11. VĂN HÓA DOANH NGHIỆP
    // =========================================================================
    const wsCult = wb.addWorksheet('11. Văn hóa', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsCult.columns = [{ width: 8 }, { width: 65 }, { width: 18 }, { width: 18 }, { width: 35 }];
    wsCult.mergeCells('A1:E1');
    const tCult = wsCult.getCell('A1');
    tCult.value = 'CHỈ TIÊU 11: BÁO CÁO THỰC THI VĂN HÓA DOANH NGHIỆP VPS';
    tCult.font = FONT_TITLE; tCult.fill = FILL_NAVY; tCult.alignment = ALIGN_CENTER;
    wsCult.getRow(1).height = 32;

    const rCult2 = wsCult.getRow(2);
    rCult2.values = ['STT', 'NỘI DUNG CHỈ TIÊU VĂN HÓA', 'KẾ HOẠCH (%)', 'THỰC HIỆN (%)', 'GHI CHÚ'];
    styleHeaderRow(rCult2, FILL_BLUE, 28);

    const sampleCult = [
        [1, '100% CBNV chính thức hiểu và tin sâu luật "Nhân - Quả"', 1.0, 1.0, 'Đạt chỉ tiêu toàn diện'],
        [2, '100% CBNV chính thức giao tiếp ứng xử theo Tứ vô lượng tâm "Từ - Bi - Hỷ - Xả"', 1.0, 1.0, 'Thực hành văn hóa ái ngữ tốt'],
        [3, '100% CBNV chính thức được quy y Tam Bảo: Phật - Pháp - Tăng', 1.0, 0.95, 'Đang hướng dẫn các nhân sự mới'],
        [4, '100% CBNV chính thức sẽ đạt 03 Tín chỉ phật pháp trong thời gian 02 năm', 1.0, 0.90, 'Kế hoạch học kỳ tiếp theo'],
        [5, '100% CBNV cam kết trung thực, tận tâm phụng sự khách hàng', 1.0, 1.0, 'Khách hàng đánh giá rất cao']
    ];
    sampleCult.forEach(r => {
        const row = wsCult.addRow(r);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).alignment = ALIGN_CENTER;
        row.getCell(3).numFmt = '0.0%';
        row.getCell(4).alignment = ALIGN_CENTER;
        row.getCell(4).numFmt = '0.0%';
        row.getCell(5).alignment = ALIGN_LEFT;
    });

    // =========================================================================
    // 12. THƯƠNG HIỆU / MARKETING
    // =========================================================================
    const wsBrand = wb.addWorksheet('12. Thương hiệu', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsBrand.columns = [{ width: 8 }, { width: 50 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 35 }];
    wsBrand.mergeCells('A1:F1');
    const tBrand = wsBrand.getCell('A1');
    tBrand.value = 'CHỈ TIÊU 12: BÁO CÁO PHÁT TRIỂN THƯƠNG HIỆU & THỊ PHẦN';
    tBrand.font = FONT_TITLE; tBrand.fill = FILL_NAVY; tBrand.alignment = ALIGN_CENTER;
    wsBrand.getRow(1).height = 32;

    const rBrand2 = wsBrand.getRow(2);
    rBrand2.values = ['STT', 'CHỈ TIÊU THƯƠNG HIỆU', 'KẾ HOẠCH', 'THỰC HIỆN', 'ĐƠN VỊ TÍNH', 'GHI CHÚ'];
    styleHeaderRow(rBrand2, FILL_BLUE, 28);

    const sampleBrand = [
        [1, 'Tăng trưởng thị phần máy photocopy & in ấn', 20, 18, '%', 'Mục tiêu năm tăng trưởng 20%'],
        [2, 'Tỷ trọng doanh số kênh bán hàng trực tiếp', 30, 27, '%', 'Kế hoạch 30% tổng doanh số'],
        [3, 'Độ nhận diện thương hiệu & Khách hàng hài lòng', 70, 72, '%', 'Vượt chỉ tiêu cam kết'],
        [4, 'Phát triển Khách hàng lẻ mới trong kỳ', 120, 115, 'Khách hàng', 'Đạt 95.8% kế hoạch giao']
    ];
    sampleBrand.forEach(r => {
        const row = wsBrand.addRow(r);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).alignment = ALIGN_RIGHT;
        row.getCell(3).numFmt = '#,##0';
        row.getCell(4).alignment = ALIGN_RIGHT;
        row.getCell(4).numFmt = '#,##0';
        row.getCell(5).alignment = ALIGN_CENTER;
        row.getCell(6).alignment = ALIGN_LEFT;
    });

    // Save files
    const file1 = path.join(__dirname, 'Template_12_Chi_Tieu_Bao_Cao_VPS.xlsx');
    const file2 = path.join(__dirname, 'Bo_Bieu_Mau_Bao_Cao_VPS_Gui_Don_Vi', 'Template_12_Chi_Tieu_Bao_Cao_VPS.xlsx');
    await wb.xlsx.writeFile(file1);
    await wb.xlsx.writeFile(file2);
    console.log('Saved:', file1);
    console.log('Saved:', file2);

    // Refresh zip archive
    try {
        const zipFile = path.join(__dirname, 'Bo_Bieu_Mau_Bao_Cao_VPS_Gui_Don_Vi.zip');
        const folder = path.join(__dirname, 'Bo_Bieu_Mau_Bao_Cao_VPS_Gui_Don_Vi');
        const cmd = `powershell -Command "Compress-Archive -Path '${folder}\\*' -DestinationPath '${zipFile}' -Force"`;
        execSync(cmd);
        console.log('Refreshed ZIP Archive with 12 Chi Tieu:', zipFile);
    } catch(e) {
        console.error('ZIP error:', e.message);
    }
}

build12IndicatorsWorkbook().catch(console.error);
