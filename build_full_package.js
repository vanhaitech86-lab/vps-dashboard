const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, 'Bo_Bieu_Mau_Bao_Cao_VPS_Gui_Don_Vi');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Common styles
const FONT_TITLE = { name: 'Arial', size: 14, bold: true, color: { argb: 'FFFFFFFF' } };
const FONT_HEADER = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
const FONT_SUBHEADER = { name: 'Arial', size: 10, bold: true, color: { argb: 'FFFFFFFF' } };
const FONT_DATA = { name: 'Arial', size: 10 };
const FONT_BOLD = { name: 'Arial', size: 10, bold: true };

const FILL_PRIMARY = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1F4E78' } }; // VPS Navy
const FILL_SECONDARY = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF2F5597' } }; // Light Navy
const FILL_ACCENT = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0D9488' } }; // Teal
const FILL_HIGHLIGHT = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF2F2F2' } };

const BORDER_ALL = {
    top: { style: 'thin', color: { argb: 'FFD9D9D9' } },
    left: { style: 'thin', color: { argb: 'FFD9D9D9' } },
    bottom: { style: 'thin', color: { argb: 'FFD9D9D9' } },
    right: { style: 'thin', color: { argb: 'FFD9D9D9' } }
};

const ALIGN_CENTER = { horizontal: 'center', vertical: 'middle', wrapText: true };
const ALIGN_LEFT = { horizontal: 'left', vertical: 'middle', wrapText: true };
const ALIGN_RIGHT = { horizontal: 'right', vertical: 'middle' };

function styleHeaderRow(row, fill = FILL_PRIMARY, height = 28) {
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

async function createMasterTemplate() {
    const wb = new ExcelJS.Workbook();
    wb.creator = 'VPS Group';
    wb.lastModifiedBy = 'VPS Group';
    wb.created = new Date();

    const companies = ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS', 'Văn phòng VPS'];
    const currentMonth = '08/2026';

    // -------------------------------------------------------------------------
    // SHEET 0: HƯỚNG DẪN NHẬP LIỆU
    // -------------------------------------------------------------------------
    const wsGuide = wb.addWorksheet('00_Huong_Dan', { views: [{ showGridLines: true }] });
    wsGuide.columns = [{ width: 6 }, { width: 32 }, { width: 85 }];
    
    wsGuide.mergeCells('B2:C2');
    const tCell = wsGuide.getCell('B2');
    tCell.value = 'HƯỚNG DẪN NHẬP LIỆU BÁO CÁO CÁC ĐƠN VỊ - TẬP ĐOÀN VPS';
    tCell.font = { name: 'Arial', size: 14, bold: true, color: { argb: 'FF1F4E78' } };
    wsGuide.getRow(2).height = 30;

    const guideLines = [
        ['1. Mục đích', 'File Excel mẫu này được chuẩn hóa đồng bộ phục vụ cho việc nhập liệu báo cáo định kỳ hàng tháng của các Đơn vị thành viên trong Tập đoàn VPS.'],
        ['2. Tên đơn vị chuẩn', 'Vui lòng chọn hoặc điền đúng tên đơn vị theo danh sách quy chuẩn: "Tân Hồng Hà", "Việt", "Xem Sơn", "VPS M", "ITSS", "Văn phòng VPS".'],
        ['3. Định dạng thời gian', 'Cột Tháng/Năm vui lòng nhập theo định dạng chuẩn: MM/YYYY (Ví dụ: 08/2026, 09/2026, 10/2026).'],
        ['4. Định dạng số tiền', 'Các cột số tiền nhập số nguyên dương (đơn vị: VNĐ). Không gõ thêm ký tự chữ như "đ", "vnđ", "triệu". Hệ thống tự động định dạng hiển thị.'],
        ['5. Giữ nguyên cấu trúc', 'TUYỆT ĐỐI KHÔNG xóa cột, đổi tên sheet hoặc thay đổi thứ tự các cột tiêu đề để tránh lỗi khi đồng bộ tự động lên Dashboard của Ban Lãnh đạo.'],
        ['6. Cập nhật Google Sheets', 'Các Đơn vị được phân quyền file Google Sheets riêng có thể sao chép trực tiếp các sheet tương ứng này vào Google Sheets của đơn vị mình.'],
        ['7. Danh sách các Sheet', 'Gồm 13 Sheet nghiệp vụ: DOANH SỐ VÀ LÃI GỘP (8 phòng ban), Công nợ, Khách hàng, Tồn kho, Nhân sự, Sản Phẩm, Chi Phí, ISO, Đào tạo, Dịch vụ tận tâm, Văn hóa DN, Thương hiệu, Dự án.'],
        ['8. Đầu mối hỗ trợ', 'Mọi thắc mắc kỹ thuật vui lòng liên hệ Ban Điều Hành VPS / IT Support để được giải đáp và hỗ trợ nhanh chóng.']
    ];

    let gRow = 4;
    guideLines.forEach(([sec, desc]) => {
        wsGuide.getCell(`B${gRow}`).value = sec;
        wsGuide.getCell(`B${gRow}`).font = { name: 'Arial', size: 11, bold: true, color: { argb: 'FF2F5597' } };
        wsGuide.getCell(`C${gRow}`).value = desc;
        wsGuide.getCell(`C${gRow}`).font = { name: 'Arial', size: 10 };
        wsGuide.getCell(`C${gRow}`).alignment = { wrapText: true, vertical: 'middle' };
        wsGuide.getRow(gRow).height = 26;
        gRow++;
    });

    // -------------------------------------------------------------------------
    // SHEET 1: DOANH SỐ VÀ LÃI GỘP (8 PHÒNG BAN CHUẨN)
    // -------------------------------------------------------------------------
    const wsRev = wb.addWorksheet('DOANH SỐ VÀ LÃI GỘP', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsRev.columns = [
        { key: 'stt', width: 8 },
        { key: 'dept', width: 36 },
        { key: 'ds_kh_m', width: 16 },
        { key: 'ds_th_m', width: 16 },
        { key: 'pct_ds_m', width: 15 },
        { key: 'lg_kh_m', width: 16 },
        { key: 'lg_th_m', width: 16 },
        { key: 'pct_lg_m', width: 15 },
        { key: 'pct_lg_ds_m', width: 14 },
        { key: 'ds_kh_y', width: 16 },
        { key: 'ds_th_y', width: 16 },
        { key: 'pct_ds_y', width: 15 },
        { key: 'lg_kh_y', width: 16 },
        { key: 'lg_th_y', width: 16 },
        { key: 'pct_lg_y', width: 15 },
        { key: 'note', width: 32 }
    ];

    wsRev.mergeCells('A1:P1');
    const revTitle = wsRev.getCell('A1');
    revTitle.value = 'BÁO CÁO DOANH SỐ VÀ LÃI GỘP 8 PHÒNG BAN / MẢNG KINH DOANH - TẬP ĐOÀN VPS (KỲ: ' + currentMonth + ')';
    revTitle.font = FONT_TITLE;
    revTitle.fill = FILL_PRIMARY;
    revTitle.alignment = ALIGN_CENTER;
    wsRev.getRow(1).height = 32;

    const revHeaders = [
        'STT', 'PHÒNG BAN / MẢNG KINH DOANH',
        'DS KH THÁNG', 'DS TH THÁNG', '% ĐẠT DS THÁNG',
        'LG KH THÁNG', 'LG TH THÁNG', '% ĐẠT LG THÁNG', '% LG THÁNG',
        'DS KH NĂM', 'DS TH NĂM (LK)', '% ĐẠT DS NĂM',
        'LG KH NĂM', 'LG TH NĂM (LK)', '% ĐẠT LG NĂM', 'GHI CHÚ'
    ];
    const rRow2 = wsRev.getRow(2);
    rRow2.values = revHeaders;
    styleHeaderRow(rRow2, FILL_SECONDARY, 28);

    const deptList8 = [
        { num: '1', name: 'Kinh doanh phân phối', desc: 'Bán buôn máy, linh kiện, KD sỉ', ds_kh_m: 5000, ds_th_m: 5200, lg_kh_m: 500, lg_th_m: 580, ds_kh_y: 60000, ds_th_y: 45000, lg_kh_y: 6000, lg_th_y: 5000 },
        { num: '', name: '  - [Đơn vị] Mảng phân phối / bán buôn', desc: 'Kênh đại lý, bán sỉ', ds_kh_m: 5000, ds_th_m: 5200, lg_kh_m: 500, lg_th_m: 580, ds_kh_y: 60000, ds_th_y: 45000, lg_kh_y: 6000, lg_th_y: 5000 },
        { num: '2', name: 'Thuê Máy', desc: 'Thuê máy kỹ thuật & KD thuê máy', ds_kh_m: 1500, ds_th_m: 1620, lg_kh_m: 600, lg_th_m: 680, ds_kh_y: 18000, ds_th_y: 13500, lg_kh_y: 7200, lg_th_y: 5600 },
        { num: '', name: '  - [Đơn vị] Hợp đồng thuê máy', desc: 'Hợp đồng thuê máy photo', ds_kh_m: 1500, ds_th_m: 1620, lg_kh_m: 600, lg_th_m: 680, ds_kh_y: 18000, ds_th_y: 13500, lg_kh_y: 7200, lg_th_y: 5600 },
        { num: '3', name: 'Dịch Vụ', desc: 'DVKT, Tổ dịch vụ, mực in, metercharge', ds_kh_m: 1200, ds_th_m: 1300, lg_kh_m: 450, lg_th_m: 510, ds_kh_y: 14000, ds_th_y: 10500, lg_kh_y: 5200, lg_th_y: 4100 },
        { num: '', name: '  - [Đơn vị] Dịch vụ sửa chữa & mực in', desc: 'Bảo trì sửa chữa, metercharge', ds_kh_m: 1200, ds_th_m: 1300, lg_kh_m: 450, lg_th_m: 510, ds_kh_y: 14000, ds_th_y: 10500, lg_kh_y: 5200, lg_th_y: 4100 },
        { num: '4', name: 'Kinh doanh online', desc: 'E-commerce, Shopee-Online, trực tuyến', ds_kh_m: 800, ds_th_m: 850, lg_kh_m: 80, lg_th_m: 95, ds_kh_y: 9600, ds_th_y: 7200, lg_kh_y: 960, lg_th_y: 750 },
        { num: '', name: '  - [Đơn vị] Kênh bán lẻ trực tuyến / TMĐT', desc: 'Sàn TMĐT, website', ds_kh_m: 800, ds_th_m: 850, lg_kh_m: 80, lg_th_m: 95, ds_kh_y: 9600, ds_th_y: 7200, lg_kh_y: 960, lg_th_y: 750 },
        { num: '5', name: 'Dự án', desc: 'Dự án văn phòng, CNTT, thiết bị', ds_kh_m: 2000, ds_th_m: 2100, lg_kh_m: 800, lg_th_m: 850, ds_kh_y: 24000, ds_th_y: 18000, lg_kh_y: 9600, lg_th_y: 7500 },
        { num: '', name: '  - [Đơn vị] Gói thầu thiết bị & dự án', desc: 'Đấu thầu, cung cấp văn phòng', ds_kh_m: 2000, ds_th_m: 2100, lg_kh_m: 800, lg_th_m: 850, ds_kh_y: 24000, ds_th_y: 18000, lg_kh_y: 9600, lg_th_y: 7500 },
        { num: '6', name: 'Kinh doanh tổng hợp', desc: 'Kinh doanh tổng hợp thương mại', ds_kh_m: 1000, ds_th_m: 1050, lg_kh_m: 100, lg_th_m: 110, ds_kh_y: 12000, ds_th_y: 9000, lg_kh_y: 1200, lg_th_y: 950 },
        { num: '', name: '  - [Đơn vị] Kinh doanh tổng hợp', desc: 'Thương mại hàng hóa tổng hợp', ds_kh_m: 1000, ds_th_m: 1050, lg_kh_m: 100, lg_th_m: 110, ds_kh_y: 12000, ds_th_y: 9000, lg_kh_y: 1200, lg_th_y: 950 },
        { num: '7', name: 'Kinh doanh lẻ', desc: 'Cửa hàng, bán máy lẻ, showroom', ds_kh_m: 300, ds_th_m: 320, lg_kh_m: 60, lg_th_m: 70, ds_kh_y: 3600, ds_th_y: 2700, lg_kh_y: 720, lg_th_y: 580 },
        { num: '', name: '  - [Đơn vị] Showroom / Cửa hàng bán lẻ', desc: 'Điểm bán trực tiếp', ds_kh_m: 300, ds_th_m: 320, lg_kh_m: 60, lg_th_m: 70, ds_kh_y: 3600, ds_th_y: 2700, lg_kh_y: 720, lg_th_y: 580 },
        { num: '8', name: 'Kinh doanh khác', desc: 'Bán nội bộ, thương mại khác, xuất khẩu', ds_kh_m: 200, ds_th_m: 210, lg_kh_m: 30, lg_th_m: 35, ds_kh_y: 2400, ds_th_y: 1800, lg_kh_y: 360, lg_th_y: 290 },
        { num: '', name: '  - [Đơn vị] Doanh thu nội bộ / khác', desc: 'Các nguồn thu khác', ds_kh_m: 200, ds_th_m: 210, lg_kh_m: 30, lg_th_m: 35, ds_kh_y: 2400, ds_th_y: 1800, lg_kh_y: 360, lg_th_y: 290 }
    ];

    let currRowIndex = 3;
    deptList8.forEach(d => {
        const isHeader = !!d.num;
        const r = currRowIndex;
        const rowVals = [
            d.num,
            d.name,
            d.ds_kh_m,
            d.ds_th_m,
            { formula: `IF(C${r}=0,"-",D${r}/C${r})` },
            d.lg_kh_m,
            d.lg_th_m,
            { formula: `IF(F${r}=0,"-",G${r}/F${r})` },
            { formula: `IF(D${r}=0,"-",G${r}/D${r})` },
            d.ds_kh_y,
            d.ds_th_y,
            { formula: `IF(J${r}=0,"-",K${r}/J${r})` },
            d.lg_kh_y,
            d.lg_th_y,
            { formula: `IF(M${r}=0,"-",N${r}/M${r})` },
            d.desc
        ];
        const row = wsRev.addRow(rowVals);
        styleDataRow(row, isHeader);
        if (isHeader) {
            row.eachCell({ includeEmpty: true }, (cell) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF1F5F9' } };
            });
        }
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        [3, 4, 6, 7, 10, 11, 13, 14].forEach(colIdx => {
            row.getCell(colIdx).numFmt = '#,##0';
        });
        [5, 8, 9, 12, 15].forEach(colIdx => {
            row.getCell(colIdx).numFmt = '0.0%';
        });
        currRowIndex++;
    });

    // Dòng TỔNG CỘNG
    const totR = currRowIndex;
    const totalRowVals = [
        '',
        'TỔNG CỘNG (8 MẢNG KINH DOANH)',
        { formula: `SUMIF(A3:A${totR-1},"<>",C3:C${totR-1})` },
        { formula: `SUMIF(A3:A${totR-1},"<>",D3:D${totR-1})` },
        { formula: `IF(C${totR}=0,"-",D${totR}/C${totR})` },
        { formula: `SUMIF(A3:A${totR-1},"<>",F3:F${totR-1})` },
        { formula: `SUMIF(A3:A${totR-1},"<>",G3:G${totR-1})` },
        { formula: `IF(F${totR}=0,"-",G${totR}/F${totR})` },
        { formula: `IF(D${totR}=0,"-",G${totR}/D${totR})` },
        { formula: `SUMIF(A3:A${totR-1},"<>",J3:J${totR-1})` },
        { formula: `SUMIF(A3:A${totR-1},"<>",K3:K${totR-1})` },
        { formula: `IF(J${totR}=0,"-",K${totR}/J${totR})` },
        { formula: `SUMIF(A3:A${totR-1},"<>",M3:M${totR-1})` },
        { formula: `SUMIF(A3:A${totR-1},"<>",N3:N${totR-1})` },
        { formula: `IF(M${totR}=0,"-",N${totR}/M${totR})` },
        'Tổng hợp 8 mảng'
    ];
    const totalRow = wsRev.addRow(totalRowVals);
    styleDataRow(totalRow, true);
    totalRow.height = 26;
    totalRow.eachCell({ includeEmpty: true }, (cell) => {
        cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } };
        cell.font = { name: 'Arial', size: 10, bold: true, color: { argb: 'FF92400E' } };
    });
    totalRow.getCell(2).alignment = ALIGN_LEFT;
    [3, 4, 6, 7, 10, 11, 13, 14].forEach(colIdx => {
        totalRow.getCell(colIdx).numFmt = '#,##0';
    });
    [5, 8, 9, 12, 15].forEach(colIdx => {
        totalRow.getCell(colIdx).numFmt = '0.0%';
    });

    // -------------------------------------------------------------------------
    // SHEET 2: CÔNG NỢ
    // -------------------------------------------------------------------------
    const wsDebt = wb.addWorksheet('Công nợ', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsDebt.columns = [
        { width: 14 }, { width: 22 }, { width: 26 }, { width: 26 }, { width: 26 }, { width: 26 }
    ];
    wsDebt.mergeCells('A1:F1');
    const debtTitle = wsDebt.getCell('A1');
    debtTitle.value = 'BÁO CÁO THEO DÕI CÔNG NỢ PHẢI THU (KỲ: ' + currentMonth + ')';
    debtTitle.font = FONT_TITLE;
    debtTitle.fill = FILL_PRIMARY;
    debtTitle.alignment = ALIGN_CENTER;
    wsDebt.getRow(1).height = 32;

    const dRow2 = wsDebt.getRow(2);
    dRow2.values = ['Tháng/Năm', 'Công ty', 'Phải thu trong hạn (VNĐ)', 'Nợ quá hạn (VNĐ)', 'Nợ khó đòi (VNĐ)', 'Tổng công nợ (VNĐ)'];
    styleHeaderRow(dRow2, FILL_SECONDARY, 28);

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

    // -------------------------------------------------------------------------
    // SHEET 3: KHÁCH HÀNG
    // -------------------------------------------------------------------------
    const wsCust = wb.addWorksheet('Khách hàng', { views: [{ state: 'frozen', ySplit: 3 }] });
    for (let i = 1; i <= 13; i++) wsCust.getColumn(i).width = (i <= 3) ? 18 : 13;
    
    wsCust.mergeCells('A1:M1');
    const custTitle = wsCust.getCell('A1');
    custTitle.value = 'BÁO CÁO CƠ CẤU & BIẾN ĐỘNG KHÁCH HÀNG (KỲ: ' + currentMonth + ')';
    custTitle.font = FONT_TITLE;
    custTitle.fill = FILL_PRIMARY;
    custTitle.alignment = ALIGN_CENTER;
    wsCust.getRow(1).height = 32;

    const ch1 = ['Tháng/Năm', 'Công ty', 'Mảng kinh doanh', 'Đầu kỳ', '', 'Kế hoạch tháng', '', 'Tăng trong kỳ', '', 'Giảm trong kỳ', '', 'Cuối kỳ', ''];
    const ch2 = ['', '', '', 'Số Máy', 'Số KH', 'Số Máy', 'Số KH', 'Số Máy', 'Số KH', 'Số Máy', 'Số KH', 'Số Máy', 'Số KH'];
    const crow2 = wsCust.getRow(2);
    crow2.values = ch1;
    styleHeaderRow(crow2, FILL_SECONDARY, 24);

    const crow3 = wsCust.getRow(3);
    crow3.values = ch2;
    styleHeaderRow(crow3, FILL_SECONDARY, 24);

    wsCust.mergeCells('A2:A3');
    wsCust.mergeCells('B2:B3');
    wsCust.mergeCells('C2:C3');
    wsCust.mergeCells('D2:E2');
    wsCust.mergeCells('F2:G2');
    wsCust.mergeCells('H2:I2');
    wsCust.mergeCells('J2:K2');
    wsCust.mergeCells('L2:M2');

    const customerCategories = [
        'Thuê máy',
        'MC',
        'Dịch vụ - Photo',
        'Dịch vụ - Máy in',
        'Dịch vụ khác',
        'Phân phối (Đại lý)'
    ];

    companies.forEach(comp => {
        customerCategories.forEach(cat => {
            const isPP = cat === 'Phân phối (Đại lý)';
            const rData = [
                currentMonth,
                comp,
                cat,
                isPP ? '-' : 120, 95,
                isPP ? '-' : 15, 12,
                isPP ? '-' : 10, 8,
                isPP ? '-' : 2, 1,
                isPP ? '-' : 128, 102
            ];
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

    // -------------------------------------------------------------------------
    // SHEET 4: TỒN KHO
    // -------------------------------------------------------------------------
    const wsInv = wb.addWorksheet('Tồn kho', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsInv.columns = [
        { width: 14 }, { width: 20 }, { width: 22 }, { width: 36 }, { width: 14 }, { width: 16 }, { width: 24 }
    ];
    wsInv.mergeCells('A1:G1');
    const invTitle = wsInv.getCell('A1');
    invTitle.value = 'BÁO CÁO QUẢN LÝ TỒN KHO VẬT TƯ & THIẾT BỊ (KỲ: ' + currentMonth + ')';
    invTitle.font = FONT_TITLE;
    invTitle.fill = FILL_PRIMARY;
    invTitle.alignment = ALIGN_CENTER;
    wsInv.getRow(1).height = 32;

    const iRow2 = wsInv.getRow(2);
    iRow2.values = ['Tháng/Năm', 'Công ty', 'Danh mục', 'Tên Vật tư/Thiết bị', 'Đơn vị tính', 'Số lượng', 'Tổng Giá trị (VNĐ)'];
    styleHeaderRow(iRow2, FILL_SECONDARY, 28);

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

    // -------------------------------------------------------------------------
    // SHEET 5: NHÂN SỰ
    // -------------------------------------------------------------------------
    const wsHR = wb.addWorksheet('Nhân sự', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsHR.columns = [
        { width: 14 }, { width: 20 }, { width: 26 }, { width: 18 }, { width: 16 }, { width: 16 }, { width: 16 }, { width: 20 }
    ];
    wsHR.mergeCells('A1:H1');
    const hrTitle = wsHR.getCell('A1');
    hrTitle.value = 'BÁO CÁO CƠ CẤU TỔ CHỨC & BIẾN ĐỘNG NHÂN SỰ (KỲ: ' + currentMonth + ')';
    hrTitle.font = FONT_TITLE;
    hrTitle.fill = FILL_PRIMARY;
    hrTitle.alignment = ALIGN_CENTER;
    wsHR.getRow(1).height = 32;

    const hrRow2 = wsHR.getRow(2);
    hrRow2.values = ['Tháng/Năm', 'Công ty', 'Phòng ban', 'Tổng NV Đầu kỳ', 'Tuyển mới', 'Nghỉ việc', 'NV Thử việc', 'Tổng NV Cuối kỳ'];
    styleHeaderRow(hrRow2, FILL_SECONDARY, 28);

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

    // -------------------------------------------------------------------------
    // SHEET 6: SẢN PHẨM
    // -------------------------------------------------------------------------
    const wsProd = wb.addWorksheet('Sản Phẩm', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsProd.columns = [
        { width: 20 }, { width: 14 }, { width: 25 }, { width: 28 }, { width: 24 }
    ];
    wsProd.mergeCells('A1:E1');
    const prodTitle = wsProd.getCell('A1');
    prodTitle.value = 'BÁO CÁO DOANH THU THEO HÃNG VÀ NHÓM SẢN PHẨM (KỲ: ' + currentMonth + ')';
    prodTitle.font = FONT_TITLE;
    prodTitle.fill = FILL_PRIMARY;
    prodTitle.alignment = ALIGN_CENTER;
    wsProd.getRow(1).height = 32;

    const prRow2 = wsProd.getRow(2);
    prRow2.values = ['CÔNG TY', 'THÁNG', 'HÃNG (HP/Fujifilm/Khác)', 'NHÓM SẢN PHẨM', 'DOANH THU (VNĐ)'];
    styleHeaderRow(prRow2, FILL_SECONDARY, 28);

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

    // -------------------------------------------------------------------------
    // SHEET 7: CHI PHÍ
    // -------------------------------------------------------------------------
    const wsExp = wb.addWorksheet('Chi Phí', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsExp.columns = [
        { width: 8 }, { width: 38 }, { width: 18 }, { width: 18 }, { width: 14 },
        { width: 14 }, { width: 14 }, { width: 14 }, { width: 14 }, { width: 14 },
        { width: 14 }, { width: 14 }, { width: 14 }
    ];
    wsExp.mergeCells('A1:E1');
    wsExp.getCell('A1').value = 'BÁO CÁO TỔNG HỢP CHI PHÍ THÁNG (VNĐ)';
    wsExp.getCell('A1').font = FONT_TITLE;
    wsExp.getCell('A1').fill = FILL_PRIMARY;
    wsExp.getCell('A1').alignment = ALIGN_CENTER;

    wsExp.mergeCells('F1:M1');
    wsExp.getCell('F1').value = 'PHÂN BỔ CHI PHÍ THEO CÁC BỘ PHẬN (VNĐ)';
    wsExp.getCell('F1').font = FONT_TITLE;
    wsExp.getCell('F1').fill = FILL_SECONDARY;
    wsExp.getCell('F1').alignment = ALIGN_CENTER;
    wsExp.getRow(1).height = 32;

    const expHeaders = [
        'STT', 'NỘI DUNG CHI PHÍ', 'KẾ HOẠCH', 'THỰC HIỆN', 'TỶ LỆ (%)',
        'DVKT', 'KD BB', 'KD BL-TH', 'KD DA', 'KD TM', 'KD Khác', 'Kế toán', 'BP Khác'
    ];
    const eRow2 = wsExp.getRow(2);
    eRow2.values = expHeaders;
    styleHeaderRow(eRow2, FILL_SECONDARY, 28);

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
        if (isHeader) {
            row.eachCell((cell) => cell.fill = FILL_HIGHLIGHT);
        }
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

    // -------------------------------------------------------------------------
    // SHEET 8: ISO
    // -------------------------------------------------------------------------
    const wsIso = wb.addWorksheet('ISO', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsIso.columns = [
        { width: 20 }, { width: 25 }, { width: 45 }, { width: 25 }
    ];
    wsIso.mergeCells('A1:D1');
    const isoTitle = wsIso.getCell('A1');
    isoTitle.value = 'DANH MỤC QUY TRÌNH & QUY ĐỊNH ISO DOANH NGHIỆP';
    isoTitle.font = FONT_TITLE;
    isoTitle.fill = FILL_PRIMARY;
    isoTitle.alignment = ALIGN_CENTER;
    wsIso.getRow(1).height = 32;

    const isRow2 = wsIso.getRow(2);
    isRow2.values = ['CÔNG TY', 'PHÒNG BAN', 'TÊN QUY TRÌNH / QUY ĐỊNH', 'PHÂN LOẠI (Quy trình/Quy định)'];
    styleHeaderRow(isRow2, FILL_SECONDARY, 28);

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

    // -------------------------------------------------------------------------
    // SHEET 9: ĐÀO TẠO
    // -------------------------------------------------------------------------
    const wsTrain = wb.addWorksheet('Đào tạo', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsTrain.columns = [
        { width: 8 }, { width: 45 }, { width: 25 }, { width: 18 }, { width: 18 }, { width: 16 }, { width: 30 }
    ];
    wsTrain.mergeCells('A1:G1');
    const trTitle = wsTrain.getCell('A1');
    trTitle.value = 'BÁO CÁO KẾT QUẢ ĐÀO TẠO NÂNG CAO NĂNG LỰC (KỲ: ' + currentMonth + ')';
    trTitle.font = FONT_TITLE;
    trTitle.fill = FILL_PRIMARY;
    trTitle.alignment = ALIGN_CENTER;
    wsTrain.getRow(1).height = 32;

    const trRow2 = wsTrain.getRow(2);
    trRow2.values = ['STT', 'Nội dung đào tạo', 'Đối tượng đào tạo', 'Kế hoạch (Lượt)', 'Thực tế (Lượt)', 'Tỷ lệ (%)', 'Ghi chú'];
    styleHeaderRow(trRow2, FILL_SECONDARY, 28);

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

    // -------------------------------------------------------------------------
    // SHEET 10: DỊCH VỤ TẬN TÂM
    // -------------------------------------------------------------------------
    const wsServ = wb.addWorksheet('Dịch vụ tận tâm', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsServ.columns = [
        { width: 6 }, { width: 22 }, { width: 12 }, { width: 14 }, { width: 18 },
        { width: 14 }, { width: 12 }, { width: 14 }, { width: 16 }, { width: 14 },
        { width: 14 }, { width: 14 }, { width: 14 }, { width: 16 }, { width: 16 }, { width: 10 }
    ];
    wsServ.mergeCells('A1:P1');
    const servTitle = wsServ.getCell('A1');
    servTitle.value = 'BÁO CÁO ĐÁNH GIÁ CHẤT LƯỢNG KỸ THUẬT & DỊCH VỤ TẬN TÂM';
    servTitle.font = FONT_TITLE;
    servTitle.fill = FILL_PRIMARY;
    servTitle.alignment = ALIGN_CENTER;
    wsServ.getRow(1).height = 32;

    const sRow2 = wsServ.getRow(2);
    sRow2.values = [
        'STT', 'Họ và tên', 'Mã NV', 'Bộ phận', 'Công ty',
        'Số lượt việc', 'Điểm TB', 'Tổng điểm', 'TG phản hồi (h)', 'TG đến (h)',
        'TG xử lý (h)', 'TG về (h)', 'Biên bản lập', 'Biên bản thay thế', 'Thu hồi vật tư', 'Tháng'
    ];
    styleHeaderRow(sRow2, FILL_SECONDARY, 28);

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
        for (let c = 6; c <= 16; c++) {
            row.getCell(c).alignment = ALIGN_CENTER;
        }
    });

    // -------------------------------------------------------------------------
    // SHEET 11: VĂN HÓA DOANH NGHIỆP
    // -------------------------------------------------------------------------
    const wsCult = wb.addWorksheet('Văn hóa doanh nghiệp', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsCult.columns = [
        { width: 8 }, { width: 65 }, { width: 18 }, { width: 18 }, { width: 35 }
    ];
    wsCult.mergeCells('A1:E1');
    const cultTitle = wsCult.getCell('A1');
    cultTitle.value = 'BÁO CÁO THỰC THI CHỈ TIÊU VĂN HÓA DOANH NGHIỆP VPS';
    cultTitle.font = FONT_TITLE;
    cultTitle.fill = FILL_PRIMARY;
    cultTitle.alignment = ALIGN_CENTER;
    wsCult.getRow(1).height = 32;

    const cRow2 = wsCult.getRow(2);
    cRow2.values = ['STT', 'NỘI DUNG CHỈ TIÊU VĂN HÓA', 'KẾ HOẠCH (%)', 'THỰC HIỆN (%)', 'GHI CHÚ'];
    styleHeaderRow(cRow2, FILL_SECONDARY, 28);

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

    // -------------------------------------------------------------------------
    // SHEET 12: THƯƠNG HIỆU
    // -------------------------------------------------------------------------
    const wsBrand = wb.addWorksheet('Thương hiệu', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsBrand.columns = [
        { width: 8 }, { width: 50 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 35 }
    ];
    wsBrand.mergeCells('A1:F1');
    const brandTitle = wsBrand.getCell('A1');
    brandTitle.value = 'BÁO CÁO PHÁT TRIỂN THƯƠNG HIỆU & THỊ PHẦN';
    brandTitle.font = FONT_TITLE;
    brandTitle.fill = FILL_PRIMARY;
    brandTitle.alignment = ALIGN_CENTER;
    wsBrand.getRow(1).height = 32;

    const bRow2 = wsBrand.getRow(2);
    bRow2.values = ['STT', 'CHỈ TIÊU THƯƠNG HIỆU', 'KẾ HOẠCH', 'THỰC HIỆN', 'ĐƠN VỊ TÍNH', 'GHI CHÚ'];
    styleHeaderRow(bRow2, FILL_SECONDARY, 28);

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

    // -------------------------------------------------------------------------
    // SHEET 13: DỰ ÁN & KH DỰ ÁN
    // -------------------------------------------------------------------------
    const wsProj = wb.addWorksheet('Dự án & KH Dự án', { views: [{ state: 'frozen', ySplit: 2 }] });
    wsProj.columns = [
        { width: 6 }, { width: 22 }, { width: 20 }, { width: 25 }, { width: 20 },
        { width: 20 }, { width: 22 }, { width: 30 }, { width: 20 }, { width: 18 },
        { width: 18 }, { width: 24 }
    ];
    wsProj.mergeCells('A1:L1');
    const projTitle = wsProj.getCell('A1');
    projTitle.value = 'BÁO CÁO THEO DÕI KHÁCH HÀNG & DOANH SỐ DỰ ÁN (KỲ: ' + currentMonth + ')';
    projTitle.font = FONT_TITLE;
    projTitle.fill = FILL_PRIMARY;
    projTitle.alignment = ALIGN_CENTER;
    wsProj.getRow(1).height = 32;

    const prjRow2 = wsProj.getRow(2);
    prjRow2.values = [
        'STT', 'TÊN DỰ ÁN', 'ĐƠN VỊ QUẢN LÝ', 'TÊN ĐƠN VỊ / CHI NHÁNH',
        'MÁY HP E826z (SL)', 'MÁY HP E731z (SL)', 'TÊN - SĐT LIÊN HỆ',
        'ĐỊA CHỈ', 'ĐẠI LÝ LẮP ĐẶT', 'SL TRỐNG, MỰC BÁN', 'LKIỆN KHÁC (SL)', 'DOANH SỐ THÁNG (VNĐ)'
    ];
    styleHeaderRow(prjRow2, FILL_SECONDARY, 28);

    const sampleProj = [
        [1, 'AGRIBANK', 'Tân Hồng Hà', 'Lai Châu (H. Phong Thổ)', 0, 2, 'c Hoàn-KTNQ - 0945138228', 'Thị Trấn Phong Thổ, Lai Châu', 'Công ty Tiến Lộc', 8, 2, 65000000],
        [2, 'MOBIPHONE', 'Xem Sơn', 'Chi nhánh Hà Nội', 0, 1, 'a Tuấn-CNTT - 0904123456', 'Quận Cầu Giấy, Hà Nội', 'Công ty Đại Phát', 4, 1, 35000000],
        [3, 'VIETINBANK', 'Việt', 'Chi nhánh Đà Nẵng', 1, 1, 'c Lan-P.Hành chính', 'Quận Hải Châu, Đà Nẵng', 'Công ty Miền Trung', 6, 2, 58000000]
    ];
    sampleProj.forEach(r => {
        const row = wsProj.addRow(r);
        styleDataRow(row);
        row.getCell(1).alignment = ALIGN_CENTER;
        row.getCell(2).alignment = ALIGN_LEFT;
        row.getCell(3).alignment = ALIGN_LEFT;
        row.getCell(4).alignment = ALIGN_LEFT;
        row.getCell(5).alignment = ALIGN_CENTER;
        row.getCell(6).alignment = ALIGN_CENTER;
        row.getCell(7).alignment = ALIGN_LEFT;
        row.getCell(8).alignment = ALIGN_LEFT;
        row.getCell(9).alignment = ALIGN_LEFT;
        row.getCell(10).alignment = ALIGN_CENTER;
        row.getCell(11).alignment = ALIGN_CENTER;
        row.getCell(12).alignment = ALIGN_RIGHT;
        row.getCell(12).numFmt = '#,##0';
    });

    const masterFile = path.join(OUTPUT_DIR, '01_Template_Tong_Hop_Bao_Cao_Don_Vi_VPS_Full.xlsx');
    await wb.xlsx.writeFile(masterFile);
    console.log('Created Master File:', masterFile);

    // Also copy to root for quick access
    const rootCopy = path.join(__dirname, 'Template_Tong_Hop_Bao_Cao_Don_Vi_VPS_Full.xlsx');
    fs.copyFileSync(masterFile, rootCopy);
}

// Copy specialized files to OUTPUT_DIR with organized numbering
function copySpecializedFiles() {
    const mappings = [
        {
            src: 'Template_Bao_Cao_KQKD_Cac_Don_Vi_VPS.xlsx',
            dst: '02_Mau_Bao_Cao_KQKD_P&L_12_Thang_VPS.xlsx',
            desc: 'Báo cáo P&L 12 tháng'
        },
        {
            src: 'templates/Mau_Bao_Cao_Chi_Phi_Tong_Hop_VPS.xlsx',
            dst: '03_Mau_Bao_Cao_Chi_Phi_Tong_Hop_VPS.xlsx',
            desc: 'Báo cáo chi phí tháng & lũy kế'
        },
        {
            src: 'templates/Mau_Bao_Cao_Cong_No_VPS.xlsx',
            dst: '04_Mau_Bao_Cao_Cong_No_Chi_Tiet_VPS.xlsx',
            desc: 'Báo cáo tổng hợp và chi tiết công nợ'
        },
        {
            src: 'templates/Mau_Bao_Cao_Khach_Hang_Doanh_So_Du_An_VPS.xlsx',
            dst: '05_Mau_Bao_Cao_Khach_Hang_Doanh_So_Du_An_VPS.xlsx',
            desc: 'Báo cáo dự án và khách hàng dự án'
        },
        {
            src: 'Mau_Ket_Qua_Danh_Gia_Dao_Tao_VPS.xlsx',
            dst: '06_Mau_Bao_Cao_Nhan_Su_Dao_Tao_Van_Hoa_VPS.xlsx',
            desc: 'Báo cáo đánh giá đào tạo và văn hóa'
        },
        {
            src: 'Template_4_Sheet_Moi_VPS.xlsx',
            dst: '07_Mau_Bao_Cao_Dich_Vu_Tan_Tam_Ky_Thuat_VPS.xlsx',
            desc: 'Mẫu 4 mảng: Đào tạo, Dịch vụ tận tâm, Văn hóa, Thương hiệu'
        }
    ];

    mappings.forEach(m => {
        const fullSrc = path.join(__dirname, m.src);
        const fullDst = path.join(OUTPUT_DIR, m.dst);
        if (fs.existsSync(fullSrc)) {
            fs.copyFileSync(fullSrc, fullDst);
            console.log(`Copied ${m.src} -> ${m.dst}`);
        } else {
            console.warn(`Source file not found: ${fullSrc}`);
        }
    });
}

function createTextGuide() {
    const guideContent = `================================================================================
TẬP ĐOÀN VPS - BỘ BIỂU MẪU BÁO CÁO CHUẨN GỬI CÁC ĐƠN VỊ THÀNH VIÊN
================================================================================

Danh sách các đơn vị áp dụng:
  1. Tân Hồng Hà
  2. Việt
  3. Xem Sơn
  4. VPS M
  5. ITSS
  6. Văn phòng VPS

--------------------------------------------------------------------------------
I. DANH MỤC CÁC FILE BIỂU MẪU ĐÍNH KÈM:
--------------------------------------------------------------------------------
1. 01_Template_Tong_Hop_Bao_Cao_Don_Vi_VPS_Full.xlsx
   => (KHUYẾN NGHỊ SỬ DỤNG): File tổng hợp toàn diện All-in-one gồm đầy đủ 14 sheet:
      - 00_Huong_Dan: Hướng dẫn quy định nhập liệu chung.
      - DOANH SỐ VÀ LÃI GỘP: Chi tiết 8 phòng ban / mảng kinh doanh, KH & TH tháng, năm, tỷ lệ đạt, % lãi gộp tự động.
      - Công nợ: Phải thu trong hạn, quá hạn, nợ khó đòi.
      - Khách hàng: Cơ cấu khách hàng 6 mảng (Thuê máy, MC, DV Photo, In, Đại lý).
      - Tồn kho: Danh mục vật tư, thiết bị, đơn vị tính, số lượng, giá trị (HĐKD & Dự án).
      - Nhân sự: Định biên, tuyển mới, nghỉ việc, thử việc từng phòng ban.
      - Sản Phẩm: Theo hãng (HP, Fujifilm, Khác) và nhóm sản phẩm.
      - Chi Phí: Bảng phân bổ chi phí cố định, biến đổi theo các bộ phận.
      - ISO: Danh mục quy trình, quy định ban hành và áp dụng.
      - Đào tạo: Nội dung đào tạo, đối tượng, kế hoạch & thực tế lượt học.
      - Dịch vụ tận tâm: Chấm điểm kỹ thuật viên, lượt việc, thời gian phục vụ.
      - Văn hóa DN: Chỉ tiêu văn hóa VPS (Nhân quả, Tứ vô lượng tâm, Quy y, Tín chỉ).
      - Thương hiệu: Chỉ tiêu thị phần, độ nhận diện, phát triển khách hàng mới.
      - Dự án & KH Dự án: Chi tiết máy móc, gói thầu các dự án lớn (Agribank, Mobifone...).

2. 02_Mau_Bao_Cao_KQKD_P&L_12_Thang_VPS.xlsx
   => Dành cho Ban Giám đốc & Phòng Kế toán đơn vị lập Báo cáo Kết quả Kinh doanh (P&L) 12 tháng.

3. 03_Mau_Bao_Cao_Chi_Phi_Tong_Hop_VPS.xlsx
   => Dành cho Phòng Kế toán theo dõi chi tiết các khoản chi phí cố định, biến đổi và phân bổ.

4. 04_Mau_Bao_Cao_Cong_No_Chi_Tiet_VPS.xlsx
   => Dành cho Kế toán công nợ theo dõi tuổi nợ và danh sách khách hàng nợ chi tiết.

5. 05_Mau_Bao_Cao_Khach_Hang_Doanh_So_Du_An_VPS.xlsx
   => Dành cho Khối Kinh doanh Dự án theo dõi doanh số máy móc, vật tư tại các chi nhánh dự án.

6. 06_Mau_Bao_Cao_Nhan_Su_Dao_Tao_Van_Hoa_VPS.xlsx
   => Dành cho Phòng Hành chính Nhân sự báo cáo định biên, kết quả đào tạo và tín chỉ văn hóa.

7. 07_Mau_Bao_Cao_Dich_Vu_Tan_Tam_Ky_Thuat_VPS.xlsx
   => Dành cho Phòng Dịch vụ Kỹ thuật đánh giá chất lượng sửa chữa, bảo dưỡng và lượt việc KTV.

--------------------------------------------------------------------------------
II. QUY ĐỊNH NHẬP LIỆU QUAN TRỌNG:
--------------------------------------------------------------------------------
1. Tên Đơn vị: Nhập chính xác tên đơn vị theo đúng quy chuẩn:
   - "Tân Hồng Hà"
   - "Việt"
   - "Xem Sơn"
   - "VPS M"
   - "ITSS"
   - "Văn phòng VPS"
2. Định dạng ngày tháng: Nhập theo mẫu MM/YYYY (Ví dụ: 08/2026, 09/2026...).
3. Định dạng số tiền: Nhập số nguyên dương (đơn vị: VNĐ). Không gõ ký tự chữ "đ", "vnd".
4. Không xóa hoặc chèn thay đổi thứ tự các cột tiêu đề để đảm bảo hệ thống Dashboard tự động đồng bộ số liệu chính xác.

--------------------------------------------------------------------------------
Bộ phận Kỹ thuật & Quản trị Hệ thống Dashboard - Tập đoàn VPS
`;

    fs.writeFileSync(path.join(OUTPUT_DIR, 'HUONG_DAN_SU_DUNG_BIEU_MAU.txt'), guideContent, 'utf-8');
    fs.writeFileSync(path.join(OUTPUT_DIR, 'README.txt'), guideContent, 'utf-8');
    console.log('Created Guide TXT');
}

function createZipArchive() {
    try {
        const zipFile = path.join(__dirname, 'Bo_Bieu_Mau_Bao_Cao_VPS_Gui_Don_Vi.zip');
        if (fs.existsSync(zipFile)) fs.unlinkSync(zipFile);
        
        // Use PowerShell Compress-Archive
        const cmd = `powershell -Command "Compress-Archive -Path '${OUTPUT_DIR}\\*' -DestinationPath '${zipFile}' -Force"`;
        execSync(cmd);
        console.log('Created ZIP Archive:', zipFile);
    } catch (e) {
        console.error('Error creating ZIP archive:', e.message);
    }
}

async function main() {
    console.log('--- BẮT ĐẦU XUẤT BỘ BIỂU MẪU BÁO CÁO VPS ---');
    await createMasterTemplate();
    copySpecializedFiles();
    createTextGuide();
    createZipArchive();
    console.log('--- HOÀN THÀNH XUẤT BỘ BIỂU MẪU BÁO CÁO VPS ---');
}

main().catch(console.error);
