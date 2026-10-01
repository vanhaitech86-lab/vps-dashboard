const ExcelJS = require('exceljs');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const OUTPUT_DIR = path.join(__dirname, 'Bo_Bieu_Mau_8_Phong_Ban_Cac_Don_Vi_VPS');
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// 8 Phòng ban / Mảng kinh doanh chuẩn hóa VPS
const DEPARTMENTS = [
    {
        num: 1,
        id: 'phan_phoi',
        name: 'Kinh doanh phân phối',
        desc: 'Bán buôn máy, linh kiện, KD sỉ',
        color: 'FF2563EB',
        bgColor: 'FFEFF6FF'
    },
    {
        num: 2,
        id: 'thue_may',
        name: 'Thuê Máy',
        desc: 'Thuê máy kỹ thuật & KD thuê máy',
        color: 'FF10B981',
        bgColor: 'FFECFDF5'
    },
    {
        num: 3,
        id: 'dich_vu',
        name: 'Dịch Vụ',
        desc: 'DVKT, Tổ dịch vụ, mực in, metercharge',
        color: 'FFF59E0B',
        bgColor: 'FFFFFBEB'
    },
    {
        num: 4,
        id: 'online',
        name: 'Kinh doanh online',
        desc: 'E-commerce, Shopee-Online, trực tuyến',
        color: 'FF8B5CF6',
        bgColor: 'FFF5F3FF'
    },
    {
        num: 5,
        id: 'du_an',
        name: 'Dự án',
        desc: 'Dự án văn phòng, CNTT, thiết bị',
        color: 'FFEC4899',
        bgColor: 'FFFDF2F8'
    },
    {
        num: 6,
        id: 'kdth',
        name: 'Kinh doanh tổng hợp',
        desc: 'Kinh doanh tổng hợp thương mại',
        color: 'FF06B6D4',
        bgColor: 'FFECFEFF'
    },
    {
        num: 7,
        id: 'ban_le',
        name: 'Kinh doanh lẻ',
        desc: 'Cửa hàng, bán máy lẻ, showroom',
        color: 'FFF97316',
        bgColor: 'FFFFF7ED'
    },
    {
        num: 8,
        id: 'khac',
        name: 'Kinh doanh khác',
        desc: 'Bán nội bộ, thương mại khác, xuất khẩu',
        color: 'FF64748B',
        bgColor: 'FFF8FAFC'
    }
];

// Danh mục mảng con chi tiết của từng đơn vị
const ALL_SUB_ITEMS = [
    // 1. Phân phối
    { deptId: 'phan_phoi', comp: 'THH', name: 'Kinh doanh bán buôn', note: 'Phân phối đại lý miền Bắc', m8_ds: 5135, m8_lg: 572, plan_year_ds: 45000, plan_year_lg: 4500 },
    { deptId: 'phan_phoi', comp: 'XemSon', name: 'Kinh doanh bán buôn (KD Sỉ)', note: 'Phân phối đại lý miền Nam', m8_ds: 4169, m8_lg: 682, plan_year_ds: 66000, plan_year_lg: 6300 },
    { deptId: 'phan_phoi', comp: 'VPSM', name: 'Kinh doanh máy - bán buôn', note: 'Bán buôn máy VPS Miền Trung', m8_ds: 810, m8_lg: 45, plan_year_ds: 10000, plan_year_lg: 900 },
    { deptId: 'phan_phoi', comp: 'VPSM', name: 'Kinh doanh linh kiện - bán buôn', note: 'Bán buôn linh kiện mực in', m8_ds: 240, m8_lg: 22, plan_year_ds: 3500, plan_year_lg: 450 },

    // 2. Thuê máy
    { deptId: 'thue_may', comp: 'THH', name: 'Thuê máy Tân Hồng Hà', note: 'Cho thuê máy photocopy miền Bắc', m8_ds: 650, m8_lg: 233, plan_year_ds: 7000, plan_year_lg: 2450 },
    { deptId: 'thue_may', comp: 'Viet', name: 'Thuê máy Công ty Việt', note: 'Cho thuê máy Công ty Việt', m8_ds: 1546, m8_lg: 910, plan_year_ds: 18500, plan_year_lg: 10730 },
    { deptId: 'thue_may', comp: 'XemSon', name: 'Kỹ thuật thuê máy (KT)', note: 'Máy thuê kỹ thuật Xesco', m8_ds: 1427, m8_lg: 918, plan_year_ds: 24000, plan_year_lg: 14560 },
    { deptId: 'thue_may', comp: 'XemSon', name: 'KD Thuê máy (Thương mại)', note: 'Hợp đồng thuê máy mới', m8_ds: 381, m8_lg: 249, plan_year_ds: 18000, plan_year_lg: 10920 },
    { deptId: 'thue_may', comp: 'VPSM', name: 'Thuê máy Miền Trung', note: 'Thuê máy khu vực miền Trung', m8_ds: 80, m8_lg: 20, plan_year_ds: 1200, plan_year_lg: 780 },

    // 3. Dịch vụ
    { deptId: 'dich_vu', comp: 'THH', name: 'Tổ Dịch vụ THH', note: 'Bảo trì bảo dưỡng sửa chữa', m8_ds: 959, m8_lg: 281, plan_year_ds: 14000, plan_year_lg: 5320 },
    { deptId: 'dich_vu', comp: 'THH', name: 'Tổ mực in THH', note: 'Cung cấp thay thế mực in', m8_ds: 354, m8_lg: 196, plan_year_ds: 3500, plan_year_lg: 1470 },
    { deptId: 'dich_vu', comp: 'THH', name: 'Metercharge THH', note: 'Dịch vụ thu phí bản in chụp', m8_ds: 233, m8_lg: 141, plan_year_ds: 2500, plan_year_lg: 1250 },
    { deptId: 'dich_vu', comp: 'XemSon', name: 'Dịch vụ kỹ thuật Xem Sơn', note: 'Kỹ thuật dịch vụ máy VP', m8_ds: 1439, m8_lg: 574, plan_year_ds: 22000, plan_year_lg: 7260 },
    { deptId: 'dich_vu', comp: 'XemSon', name: 'Metercharge Xem Sơn', note: 'Dịch vụ Metercharge Xesco', m8_ds: 278, m8_lg: 164, plan_year_ds: 4000, plan_year_lg: 1320 },
    { deptId: 'dich_vu', comp: 'VPSM', name: 'Dịch vụ kỹ thuật VPSM', note: 'Bảo trì sửa chữa máy', m8_ds: 220, m8_lg: 95, plan_year_ds: 2700, plan_year_lg: 1350 },
    { deptId: 'dich_vu', comp: 'VPSM', name: 'Dịch vụ toàn phần VPSM', note: 'Hợp đồng bảo trì trọn gói', m8_ds: 60, m8_lg: 35, plan_year_ds: 800, plan_year_lg: 470 },

    // 4. Online
    { deptId: 'online', comp: 'THH', name: 'Kinh doanh Online THH', note: 'Bán hàng trực tuyến', m8_ds: 102, m8_lg: 0, plan_year_ds: 1500, plan_year_lg: 75 },
    { deptId: 'online', comp: 'Viet', name: 'KD Online Việt', note: 'Kênh online sàn TMĐT', m8_ds: 3764, m8_lg: 241, plan_year_ds: 30500, plan_year_lg: 1830 },
    { deptId: 'online', comp: 'XemSon', name: 'KD Online Xem Sơn', note: 'Thương mại điện tử Xesco', m8_ds: 6770, m8_lg: 244, plan_year_ds: 24000, plan_year_lg: 1200 },
    { deptId: 'online', comp: 'VPSM', name: 'Shopee-Online VPSM', note: 'Gian hàng Shopee Miền Trung', m8_ds: 105, m8_lg: 3, plan_year_ds: 1400, plan_year_lg: 84 },

    // 5. Dự án
    { deptId: 'du_an', comp: 'THH', name: 'Dự án Tân Hồng Hà', note: 'Dự án thầu thiết bị miền Bắc', m8_ds: 1415, m8_lg: 310, plan_year_ds: 22000, plan_year_lg: 8800 },
    { deptId: 'du_an', comp: 'XemSon', name: 'Dự án Xesco', note: 'Gói thầu thiết bị miền Nam', m8_ds: 447, m8_lg: 161, plan_year_ds: 6000, plan_year_lg: 2160 },
    { deptId: 'du_an', comp: 'ITSS', name: 'Dự án CNTT ITSS', note: 'Giải pháp phần mềm và mạng', m8_ds: 640, m8_lg: 210, plan_year_ds: 5500, plan_year_lg: 2035 },

    // 6. KDTH
    { deptId: 'kdth', comp: 'THH', name: 'Kinh doanh tổng hợp THH', note: 'Thương mại tổng hợp', m8_ds: 1248, m8_lg: 177, plan_year_ds: 22500, plan_year_lg: 2250 },
    { deptId: 'kdth', comp: 'Viet', name: 'KDTH Công ty Việt', note: 'Kinh doanh tổng hợp', m8_ds: 2213, m8_lg: 166, plan_year_ds: 23000, plan_year_lg: 1840 },
    { deptId: 'kdth', comp: 'XemSon', name: 'Kinh doanh tổng hợp Xem Sơn', note: 'Thương mại tổng hợp', m8_ds: 0, m8_lg: 0, plan_year_ds: 0, plan_year_lg: 0 },

    // 7. Kinh doanh lẻ (MỤC MỚI SỐ 7)
    { deptId: 'ban_le', comp: 'Viet', name: 'Cửa hàng Việt', note: 'Bán lẻ tại điểm bán', m8_ds: 90.37, m8_lg: 61.81, plan_year_ds: 6000, plan_year_lg: 900 },
    { deptId: 'ban_le', comp: 'XemSon', name: 'Bán máy lẻ Xem Sơn', note: 'Bán lẻ thiết bị văn phòng', m8_ds: 191, m8_lg: 49, plan_year_ds: 5500, plan_year_lg: 1265 },
    { deptId: 'ban_le', comp: 'VPSM', name: 'Bán lẻ VPS Miền Trung', note: 'Bán lẻ tại showroom', m8_ds: 5, m8_lg: 1, plan_year_ds: 600, plan_year_lg: 108 },

    // 8. Kinh doanh khác (MỤC MỚI SỐ 8)
    { deptId: 'khac', comp: 'Viet', name: 'Bán nội bộ Việt', note: 'Hoạt động nội bộ', m8_ds: 11.1, m8_lg: 0.13, plan_year_ds: 600, plan_year_lg: 75 },
    { deptId: 'khac', comp: 'VPVPS', name: 'VP VPS - Hoạt động KD', note: 'Bán nội bộ, xuất khẩu, thương mại', m8_ds: 7386, m8_lg: 288, plan_year_ds: 36000, plan_year_lg: 4320 }
];

const COMPANIES = [
    { code: "ALL", name: "Hợp nhất Tập đoàn", fullName: "HỢP NHẤT TOÀN TẬP ĐOÀN VPS", filename: "00_Bao_Cao_Doanh_So_Lai_Gop_Hop_Nhat_Tap_Doan.xlsx" },
    { code: "THH", name: "Tân Hồng Hà", fullName: "CÔNG TY TÂN HỒNG HÀ", filename: "01_Bao_Cao_Doanh_So_Lai_Gop_Tan_Hong_Ha.xlsx" },
    { code: "Viet", name: "Công ty Việt", fullName: "CÔNG TY VIỆT", filename: "02_Bao_Cao_Doanh_So_Lai_Gop_Cong_Ty_Viet.xlsx" },
    { code: "XemSon", name: "Xem Sơn", fullName: "CÔNG TY XEM SƠN (XESCO)", filename: "03_Bao_Cao_Doanh_So_Lai_Gop_Xem_Son.xlsx" },
    { code: "VPSM", name: "VPS Miền Trung", fullName: "CHI NHÁNH VPS MIỀN TRUNG", filename: "04_Bao_Cao_Doanh_So_Lai_Gop_VPS_Mien_Trung.xlsx" },
    { code: "ITSS", name: "Công ty ITSS", fullName: "CÔNG TY CÔNG NGHỆ ITSS", filename: "05_Bao_Cao_Doanh_So_Lai_Gop_ITSS.xlsx" },
    { code: "VPVPS", name: "Văn phòng VPS", fullName: "VĂN PHÒNG TẬP ĐOÀN VPS", filename: "06_Bao_Cao_Doanh_So_Lai_Gop_Van_Phong_VPS.xlsx" }
];

// Styles
const STYLES = {
    fontTitle: { name: 'Calibri', size: 14, bold: true, color: { argb: 'FF1E3A8A' } },
    fontSub: { name: 'Calibri', size: 10, italic: true, color: { argb: 'FF475569' } },
    fontHeader: { name: 'Calibri', size: 10, bold: true, color: { argb: 'FFFFFFFF' } },
    fontParent: { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF0F172A' } },
    fontChild: { name: 'Calibri', size: 10, color: { argb: 'FF1E293B' } },
    fontChildSub: { name: 'Calibri', size: 9, italic: true, color: { argb: 'FF64748B' } },
    fontTotal: { name: 'Calibri', size: 11, bold: true, color: { argb: 'FF0F172A' } },
    fillHeader: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E3A8A' } }, // Navy
    fillParent: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFE2E8F0' } }, // Light Gray Slate
    fillTotal: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFEF3C7' } },  // Light Amber
    borderCell: {
        top: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        bottom: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
    },
    borderTotal: {
        top: { style: 'medium', color: { argb: 'FF0F172A' } },
        left: { style: 'thin', color: { argb: 'FFCBD5E1' } },
        bottom: { style: 'double', color: { argb: 'FF0F172A' } },
        right: { style: 'thin', color: { argb: 'FFCBD5E1' } }
    }
};

const HEADERS = [
    { title: "STT", width: 6, align: 'center' },
    { title: "PHÒNG BAN / MẢNG KINH DOANH", width: 42, align: 'left' },
    { title: "DS KH THÁNG", width: 16, align: 'right' },
    { title: "DS TH THÁNG", width: 16, align: 'right' },
    { title: "% ĐẠT DS THÁNG", width: 16, align: 'right' },
    { title: "LG KH THÁNG", width: 16, align: 'right' },
    { title: "LG TH THÁNG", width: 16, align: 'right' },
    { title: "% ĐẠT LG THÁNG", width: 16, align: 'right' },
    { title: "% TỶ LỆ LG", width: 14, align: 'right' },
    { title: "DS KH NĂM", width: 16, align: 'right' },
    { title: "DS TH NĂM LK", width: 16, align: 'right' },
    { title: "% ĐẠT DS NĂM", width: 16, align: 'right' },
    { title: "LG KH NĂM", width: 16, align: 'right' },
    { title: "LG TH NĂM LK", width: 16, align: 'right' },
    { title: "% ĐẠT LG NĂM", width: 16, align: 'right' },
    { title: "% LG NĂM LK", width: 14, align: 'right' },
    { title: "GHI CHÚ / GIẢI TRÌNH", width: 32, align: 'left' }
];

function buildReportSheet(ws, compInfo) {
    ws.views = [{ showGridLines: true }];

    // Tiêu đề
    ws.mergeCells('A1:Q1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `BÁO CÁO DOANH SỐ VÀ LÃI GỘP 8 PHÒNG BAN / MẢNG KINH DOANH - TẬP ĐOÀN VPS`;
    titleCell.font = STYLES.fontTitle;
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(1).height = 30;

    ws.mergeCells('A2:Q2');
    const subCell1 = ws.getCell('A2');
    subCell1.value = `Đơn vị: ${compInfo.fullName} (${compInfo.code})  |  Kỳ báo cáo: Tháng 8/2026 (Chốt sổ) & Kế hoạch năm 2026`;
    subCell1.font = STYLES.fontSub;
    subCell1.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(2).height = 20;

    ws.mergeCells('A3:Q3');
    const subCell2 = ws.getCell('A3');
    subCell2.value = `Đơn vị tính: Triệu VNĐ  |  Quy tắc: Nhập số liệu vào các dòng mảng con, dòng tổng phòng ban tự động tính công thức`;
    subCell2.font = STYLES.fontSub;
    subCell2.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(3).height = 18;

    // Header Table Row 5
    const headerRowNum = 5;
    const headerRow = ws.getRow(headerRowNum);
    headerRow.height = 32;

    HEADERS.forEach((h, idx) => {
        const colNum = idx + 1;
        const cell = headerRow.getCell(colNum);
        cell.value = h.title;
        cell.font = STYLES.fontHeader;
        cell.fill = STYLES.fillHeader;
        cell.alignment = { horizontal: 'center', vertical: 'middle', wrapText: true };
        cell.border = STYLES.borderCell;
        ws.getColumn(colNum).width = h.width;
    });

    let currentRow = 6;
    const parentRows = [];

    DEPARTMENTS.forEach(dept => {
        const parentRowNum = currentRow;
        parentRows.push(parentRowNum);

        // Lọc mảng con
        let subItems = [];
        if (compInfo.code === 'ALL') {
            subItems = ALL_SUB_ITEMS.filter(it => it.deptId === dept.id);
        } else {
            subItems = ALL_SUB_ITEMS.filter(it => it.deptId === dept.id && it.comp === compInfo.code);
        }

        const startChildRow = currentRow + 1;
        const numChildren = subItems.length > 0 ? subItems.length : 1;
        const endChildRow = currentRow + numChildren;

        // Điền hàng cha (Parent Row)
        const pRow = ws.getRow(parentRowNum);
        pRow.height = 26;

        pRow.getCell(1).value = dept.num;
        pRow.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };

        pRow.getCell(2).value = `${dept.name.toUpperCase()}`;
        pRow.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };

        // Formulas
        pRow.getCell(3).value = { formula: `SUM(C${startChildRow}:C${endChildRow})` };
        pRow.getCell(4).value = { formula: `SUM(D${startChildRow}:D${endChildRow})` };
        pRow.getCell(5).value = { formula: `IF(C${parentRowNum}=0, 0, D${parentRowNum}/C${parentRowNum})` };
        pRow.getCell(6).value = { formula: `SUM(F${startChildRow}:F${endChildRow})` };
        pRow.getCell(7).value = { formula: `SUM(G${startChildRow}:G${endChildRow})` };
        pRow.getCell(8).value = { formula: `IF(F${parentRowNum}=0, 0, G${parentRowNum}/F${parentRowNum})` };
        pRow.getCell(9).value = { formula: `IF(D${parentRowNum}=0, 0, G${parentRowNum}/D${parentRowNum})` };
        pRow.getCell(10).value = { formula: `SUM(J${startChildRow}:J${endChildRow})` };
        pRow.getCell(11).value = { formula: `SUM(K${startChildRow}:K${endChildRow})` };
        pRow.getCell(12).value = { formula: `IF(J${parentRowNum}=0, 0, K${parentRowNum}/J${parentRowNum})` };
        pRow.getCell(13).value = { formula: `SUM(M${startChildRow}:M${endChildRow})` };
        pRow.getCell(14).value = { formula: `SUM(N${startChildRow}:N${endChildRow})` };
        pRow.getCell(15).value = { formula: `IF(M${parentRowNum}=0, 0, N${parentRowNum}/M${parentRowNum})` };
        pRow.getCell(16).value = { formula: `IF(K${parentRowNum}=0, 0, N${parentRowNum}/K${parentRowNum})` };
        pRow.getCell(17).value = dept.desc;

        for (let c = 1; c <= 17; c++) {
            const cell = pRow.getCell(c);
            cell.font = STYLES.fontParent;
            cell.fill = STYLES.fillParent;
            cell.border = STYLES.borderCell;

            if ([3, 4, 6, 7, 10, 11, 13, 14].includes(c)) {
                cell.numFmt = '#,##0';
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
            } else if ([5, 8, 9, 12, 15, 16].includes(c)) {
                cell.numFmt = '0.0%';
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
            }
        }

        currentRow++;

        // Điền các mảng con
        if (subItems.length > 0) {
            subItems.forEach(item => {
                const cRow = ws.getRow(currentRow);
                cRow.height = 22;

                cRow.getCell(1).value = "";
                const prefix = compInfo.code === 'ALL' ? `[${item.comp}] ` : "";
                cRow.getCell(2).value = `    • ${prefix}${item.name}`;
                cRow.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };

                const planMds = Math.round(item.plan_year_ds / 12);
                const planMlg = Math.round(item.plan_year_lg / 12);
                const actMds = item.m8_ds;
                const actMlg = item.m8_lg;

                // Lũy kế 8 tháng ước tính theo dữ liệu thực tế
                const actYtdDs = Math.round(item.plan_year_ds * 0.65);
                const actYtdLg = Math.round(item.plan_year_lg * 0.62);

                cRow.getCell(3).value = planMds;
                cRow.getCell(4).value = actMds;
                cRow.getCell(5).value = { formula: `IF(C${currentRow}=0, 0, D${currentRow}/C${currentRow})` };
                cRow.getCell(6).value = planMlg;
                cRow.getCell(7).value = actMlg;
                cRow.getCell(8).value = { formula: `IF(F${currentRow}=0, 0, G${currentRow}/F${currentRow})` };
                cRow.getCell(9).value = { formula: `IF(D${currentRow}=0, 0, G${currentRow}/D${currentRow})` };

                cRow.getCell(10).value = item.plan_year_ds;
                cRow.getCell(11).value = actYtdDs;
                cRow.getCell(12).value = { formula: `IF(J${currentRow}=0, 0, K${currentRow}/J${currentRow})` };
                cRow.getCell(13).value = item.plan_year_lg;
                cRow.getCell(14).value = actYtdLg;
                cRow.getCell(15).value = { formula: `IF(M${currentRow}=0, 0, N${currentRow}/M${currentRow})` };
                cRow.getCell(16).value = { formula: `IF(K${currentRow}=0, 0, N${currentRow}/K${currentRow})` };
                cRow.getCell(17).value = item.note || "";

                for (let c = 1; c <= 17; c++) {
                    const cell = cRow.getCell(c);
                    cell.font = STYLES.fontChild;
                    cell.border = STYLES.borderCell;

                    if ([3, 4, 6, 7, 10, 11, 13, 14].includes(c)) {
                        cell.numFmt = '#,##0';
                        cell.alignment = { horizontal: 'right', vertical: 'middle' };
                    } else if ([5, 8, 9, 12, 15, 16].includes(c)) {
                        cell.numFmt = '0.0%';
                        cell.alignment = { horizontal: 'right', vertical: 'middle' };
                    }
                }

                currentRow++;
            });
        } else {
            // Dòng dự phòng cho đơn vị chưa có mảng con
            const cRow = ws.getRow(currentRow);
            cRow.height = 22;

            cRow.getCell(1).value = "";
            cRow.getCell(2).value = `    • [${compInfo.code}] (Điền thêm mảng kinh doanh nếu có phát sinh...)`;
            cRow.getCell(2).font = STYLES.fontChildSub;
            cRow.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };

            cRow.getCell(3).value = 0;
            cRow.getCell(4).value = 0;
            cRow.getCell(5).value = { formula: `IF(C${currentRow}=0, 0, D${currentRow}/C${currentRow})` };
            cRow.getCell(6).value = 0;
            cRow.getCell(7).value = 0;
            cRow.getCell(8).value = { formula: `IF(F${currentRow}=0, 0, G${currentRow}/F${currentRow})` };
            cRow.getCell(9).value = { formula: `IF(D${currentRow}=0, 0, G${currentRow}/D${currentRow})` };

            cRow.getCell(10).value = 0;
            cRow.getCell(11).value = 0;
            cRow.getCell(12).value = { formula: `IF(J${currentRow}=0, 0, K${currentRow}/J${currentRow})` };
            cRow.getCell(13).value = 0;
            cRow.getCell(14).value = 0;
            cRow.getCell(15).value = { formula: `IF(M${currentRow}=0, 0, N${currentRow}/M${currentRow})` };
            cRow.getCell(16).value = { formula: `IF(K${currentRow}=0, 0, N${currentRow}/K${currentRow})` };
            cRow.getCell(17).value = "";

            for (let c = 1; c <= 17; c++) {
                const cell = cRow.getCell(c);
                if (c !== 2) cell.font = STYLES.fontChild;
                cell.border = STYLES.borderCell;

                if ([3, 4, 6, 7, 10, 11, 13, 14].includes(c)) {
                    cell.numFmt = '#,##0';
                    cell.alignment = { horizontal: 'right', vertical: 'middle' };
                } else if ([5, 8, 9, 12, 15, 16].includes(c)) {
                    cell.numFmt = '0.0%';
                    cell.alignment = { horizontal: 'right', vertical: 'middle' };
                }
            }

            currentRow++;
        }
    });

    // Dòng TỔNG CỘNG
    const totRowNum = currentRow;
    const totRow = ws.getRow(totRowNum);
    totRow.height = 30;

    totRow.getCell(1).value = "";
    totRow.getCell(2).value = "TỔNG CỘNG TOÀN BỘ CÁC MẢNG";
    totRow.getCell(2).font = STYLES.fontTotal;
    totRow.getCell(2).alignment = { horizontal: 'left', vertical: 'middle' };

    const sumParentsFormula = (colLetter) => {
        return parentRows.map(r => `${colLetter}${r}`).join('+');
    };

    totRow.getCell(3).value = { formula: sumParentsFormula('C') };
    totRow.getCell(4).value = { formula: sumParentsFormula('D') };
    totRow.getCell(5).value = { formula: `IF(C${totRowNum}=0, 0, D${totRowNum}/C${totRowNum})` };
    totRow.getCell(6).value = { formula: sumParentsFormula('F') };
    totRow.getCell(7).value = { formula: sumParentsFormula('G') };
    totRow.getCell(8).value = { formula: `IF(F${totRowNum}=0, 0, G${totRowNum}/F${totRowNum})` };
    totRow.getCell(9).value = { formula: `IF(D${totRowNum}=0, 0, G${totRowNum}/D${totRowNum})` };

    totRow.getCell(10).value = { formula: sumParentsFormula('J') };
    totRow.getCell(11).value = { formula: sumParentsFormula('K') };
    totRow.getCell(12).value = { formula: `IF(J${totRowNum}=0, 0, K${totRowNum}/J${totRowNum})` };
    totRow.getCell(13).value = { formula: sumParentsFormula('M') };
    totRow.getCell(14).value = { formula: sumParentsFormula('N') };
    totRow.getCell(15).value = { formula: `IF(M${totRowNum}=0, 0, N${totRowNum}/M${totRowNum})` };
    totRow.getCell(16).value = { formula: `IF(K${totRowNum}=0, 0, N${totRowNum}/K${totRowNum})` };
    totRow.getCell(17).value = "";

    for (let c = 1; c <= 17; c++) {
        const cell = totRow.getCell(c);
        cell.font = STYLES.fontTotal;
        cell.fill = STYLES.fillTotal;
        cell.border = STYLES.borderTotal;

        if ([3, 4, 6, 7, 10, 11, 13, 14].includes(c)) {
            cell.numFmt = '#,##0';
            cell.alignment = { horizontal: 'right', vertical: 'middle' };
        } else if ([5, 8, 9, 12, 15, 16].includes(c)) {
            cell.numFmt = '0.0%';
            cell.alignment = { horizontal: 'right', vertical: 'middle' };
        }
    }
}

function buildGuideSheet(ws) {
    ws.views = [{ showGridLines: true }];
    ws.getColumn(1).width = 110;

    const lines = [
        { text: "TẬP ĐOÀN VPS - HƯỚNG DẪN VÀ QUY ĐỊNH NHẬP LIỆU BÁO CÁO 8 MẢNG KINH DOANH", font: STYLES.fontTitle },
        { text: "Hệ thống quản trị tài chính & điều hành doanh số - lãi gộp chuẩn hóa", font: STYLES.fontSub },
        { text: "", font: STYLES.fontSub },
        { text: "1. DANH MỤC 8 PHÒNG BAN / MẢNG KINH DOANH CHUẨN HÓA:", font: STYLES.fontParent },
        { text: "   1. Kinh doanh phân phối: Bán buôn máy móc, thiết bị, vật tư, linh kiện, đại lý sỉ toàn quốc.", font: STYLES.fontChild },
        { text: "   2. Thuê máy: Dịch vụ cho thuê máy photocopy, máy in kỹ thuật & kinh doanh hợp đồng thuê máy.", font: STYLES.fontChild },
        { text: "   3. Dịch vụ: Tổ dịch vụ kỹ thuật sửa chữa, nạp mực in, hợp đồng bảo trì trọn gói, Metercharge.", font: STYLES.fontChild },
        { text: "   4. Kinh doanh online: Kênh thương mại điện tử (Shopee, Lazada, TikTok Shop), website trực tuyến.", font: STYLES.fontChild },
        { text: "   5. Dự án: Dự án đấu thầu cung cấp thiết bị văn phòng, giải pháp CNTT, hệ thống mạng.", font: STYLES.fontChild },
        { text: "   6. Kinh doanh tổng hợp (KDTH): Hoạt động thương mại kinh doanh tổng hợp của các đơn vị.", font: STYLES.fontChild },
        { text: "   7. Kinh doanh lẻ (MỤC MỚI): Bán máy lẻ, bán hàng trực tiếp tại showroom, cửa hàng bán lẻ điểm bán.", font: STYLES.fontChild },
        { text: "   8. Kinh doanh khác (MỤC MỚI): Hoạt động bán nội bộ tập đoàn, xuất khẩu, thương mại khác.", font: STYLES.fontChild },
        { text: "", font: STYLES.fontSub },
        { text: "2. NGUYÊN TẮC NHẬP LIỆU & ĐƠN VỊ TÍNH:", font: STYLES.fontParent },
        { text: "   - Đơn vị tính: Triệu VNĐ (Ví dụ: 2 tỷ 500 triệu đồng -> Nhập số nguyên hoặc thập phân: 2500).", font: STYLES.fontChild },
        { text: "   - Không nhập chữ 'đ', 'triệu', 'vnd' vào ô tính để tránh làm hỏng công thức Excel.", font: STYLES.fontChild },
        { text: "   - Các dòng TÊN PHÒNG BAN (Màu xám) và dòng TỔNG CỘNG (Màu vàng) ĐÃ CÀI SẴN CÔNG THỨC SUM TỰ ĐỘNG.", font: STYLES.fontChild },
        { text: "   - Các đơn vị chỉ nhập liệu vào các CỘT THỰC TẾ (DS TH Tháng, LG TH Tháng, DS TH Năm LK, LG TH Năm LK) ở các DÒNG MẢNG CON.", font: STYLES.fontChild },
        { text: "   - Tỷ lệ % Đạt doanh số, % Đạt lãi gộp, % Tỷ lệ lãi gộp (LG/DS) sẽ TỰ ĐỘNG TÍNH TOÁN THEO CÔNG THỨC.", font: STYLES.fontChild },
        { text: "", font: STYLES.fontSub },
        { text: "3. TÍCH HỢP & ĐỒNG BỘ LÊN DASHBOARD ĐIỀU HÀNH VPS:", font: STYLES.fontParent },
        { text: "   - Tải file Excel này lên thư mục Google Drive của đơn vị thành viên.", font: STYLES.fontChild },
        { text: "   - Mở dưới dạng Google Trang Tính (Google Sheets) và chọn Chia sẻ ở chế độ: 'Bất kỳ ai có liên kết đều có thể xem'.", font: STYLES.fontChild },
        { text: "   - Gửi ID trang tính cho Quản trị viên Tập đoàn để liên kết dữ liệu tự động theo thời gian thực (Real-time Sync).", font: STYLES.fontChild },
        { text: "", font: STYLES.fontSub },
        { text: "BAN CÔNG NGHỆ & TỔNG GIÁM ĐỐC ĐIỀU HÀNH - TẬP ĐOÀN VPS GROUP", font: { name: 'Calibri', size: 10, bold: true, color: { argb: 'FF1E3A8A' } } }
    ];

    lines.forEach((l, idx) => {
        const row = ws.getRow(idx + 1);
        row.height = 20;
        const cell = row.getCell(1);
        cell.value = l.text;
        cell.font = l.font;
        cell.alignment = { vertical: 'middle' };
    });
}

function build12MonthsSheet(ws, compCode) {
    ws.views = [{ showGridLines: true }];
    ws.mergeCells('A1:P1');
    const titleCell = ws.getCell('A1');
    titleCell.value = `BẢNG KẾ HOẠCH & THEO DÕI THỰC TẾ 12 THÁNG NĂM 2026 - 8 MẢNG KINH DOANH`;
    titleCell.font = STYLES.fontTitle;
    titleCell.alignment = { horizontal: 'center', vertical: 'middle' };
    ws.getRow(1).height = 28;

    const mHeaders = ["STT", "PHÒNG BAN / MẢNG KD", "CHỈ TIÊU"];
    for (let m = 1; m <= 12; m++) mHeaders.push(`Tháng ${m}`);
    mHeaders.push("CẢ NĂM 2026");

    const hRow = ws.getRow(3);
    hRow.height = 28;
    mHeaders.forEach((h, idx) => {
        const colNum = idx + 1;
        const cell = hRow.getCell(colNum);
        cell.value = h;
        cell.font = STYLES.fontHeader;
        cell.fill = STYLES.fillHeader;
        cell.alignment = { horizontal: 'center', vertical: 'middle' };
        cell.border = STYLES.borderCell;
        ws.getColumn(colNum).width = idx === 1 ? 36 : (idx === 2 ? 18 : (idx > 2 ? 14 : 8));
    });

    let r = 4;
    let items = ALL_SUB_ITEMS;
    if (compCode !== 'ALL') {
        items = ALL_SUB_ITEMS.filter(it => it.comp === compCode);
    }

    if (items.length === 0) {
        items = [{ name: 'Mảng kinh doanh tổng hợp', comp: compCode, plan_year_ds: 12000, plan_year_lg: 2400, m8_ds: 1000, m8_lg: 200 }];
    }

    let stt = 1;
    items.forEach(it => {
        const prefix = compCode === 'ALL' ? `[${it.comp}] ` : "";
        const mPlanDs = Math.round(it.plan_year_ds / 12);
        const mPlanLg = Math.round(it.plan_year_lg / 12);

        // Hàng 1: DS Kế hoạch
        const r1 = ws.getRow(r);
        r1.height = 20;
        r1.getCell(1).value = stt;
        r1.getCell(1).alignment = { horizontal: 'center', vertical: 'middle' };
        r1.getCell(2).value = `${prefix}${it.name}`;
        r1.getCell(2).font = STYLES.fontParent;
        r1.getCell(3).value = "DS Kế hoạch";
        r1.getCell(3).font = STYLES.fontChild;
        for (let m = 1; m <= 12; m++) {
            const cell = r1.getCell(3 + m);
            cell.value = mPlanDs;
            cell.numFmt = '#,##0';
            cell.alignment = { horizontal: 'right', vertical: 'middle' };
        }
        const cellYearDs = r1.getCell(16);
        cellYearDs.value = { formula: `SUM(D${r}:O${r})` };
        cellYearDs.numFmt = '#,##0';
        cellYearDs.alignment = { horizontal: 'right', vertical: 'middle' };
        for (let c = 1; c <= 16; c++) r1.getCell(c).border = STYLES.borderCell;
        r++;

        // Hàng 2: DS Thực tế
        const r2 = ws.getRow(r);
        r2.height = 20;
        r2.getCell(1).value = "";
        r2.getCell(2).value = "";
        r2.getCell(3).value = "DS Thực tế";
        r2.getCell(3).font = STYLES.fontChild;
        for (let m = 1; m <= 12; m++) {
            const cell = r2.getCell(3 + m);
            cell.value = m === 8 ? it.m8_ds : (m < 8 ? mPlanDs : 0);
            cell.numFmt = '#,##0';
            cell.alignment = { horizontal: 'right', vertical: 'middle' };
        }
        const cellActDs = r2.getCell(16);
        cellActDs.value = { formula: `SUM(D${r}:O${r})` };
        cellActDs.numFmt = '#,##0';
        cellActDs.alignment = { horizontal: 'right', vertical: 'middle' };
        for (let c = 1; c <= 16; c++) r2.getCell(c).border = STYLES.borderCell;
        r++;

        // Hàng 3: Lãi gộp Thực tế
        const r3 = ws.getRow(r);
        r3.height = 20;
        r3.getCell(1).value = "";
        r3.getCell(2).value = "";
        r3.getCell(3).value = "Lãi gộp Thực tế";
        r3.getCell(3).font = STYLES.fontChild;
        for (let m = 1; m <= 12; m++) {
            const cell = r3.getCell(3 + m);
            cell.value = m === 8 ? it.m8_lg : (m < 8 ? mPlanLg : 0);
            cell.numFmt = '#,##0';
            cell.alignment = { horizontal: 'right', vertical: 'middle' };
        }
        const cellActLg = r3.getCell(16);
        cellActLg.value = { formula: `SUM(D${r}:O${r})` };
        cellActLg.numFmt = '#,##0';
        cellActLg.alignment = { horizontal: 'right', vertical: 'middle' };
        for (let c = 1; c <= 16; c++) r3.getCell(c).border = STYLES.borderCell;
        r++;

        stt++;
    });
}

// -------------------------------------------------------------
// 1. TẠO MASTER WORKBOOK CHỨA TOÀN BỘ CÁC SHEET TẬP ĐOÀN & CÁC ĐƠN VỊ
// -------------------------------------------------------------
async function createMasterTemplate() {
    const wb = new ExcelJS.Workbook();
    wb.creator = "Tập đoàn VPS";
    wb.lastModifiedBy = "VPS Dashboard System";
    wb.created = new Date();
    wb.modified = new Date();

    // Sheet 1: Hướng dẫn
    const wsGuide = wb.addWorksheet("00_Huong_Dan");
    buildGuideSheet(wsGuide);

    // Sheet 2: Hợp nhất toàn Tập đoàn
    const wsAll = wb.addWorksheet("Hop_Nhat_Tap_Doan");
    buildReportSheet(wsAll, COMPANIES[0]);

    // Sheet 3-8: Từng đơn vị thành viên
    const unitSheetNames = {
        'THH': 'Tan_Hong_Ha',
        'Viet': 'Cong_Ty_Viet',
        'XemSon': 'Xem_Son',
        'VPSM': 'VPS_Mien_Trung',
        'ITSS': 'ITSS',
        'VPVPS': 'Van_Phong_VPS'
    };

    for (let i = 1; i < COMPANIES.length; i++) {
        const comp = COMPANIES[i];
        const sName = unitSheetNames[comp.code] || comp.code;
        const wsUnit = wb.addWorksheet(sName);
        buildReportSheet(wsUnit, comp);
    }

    // Sheet 9: Theo dõi 12 tháng
    const ws12m = wb.addWorksheet("Theo_Doi_12_Thang");
    build12MonthsSheet(ws12m, 'ALL');

    const masterPath = path.join(__dirname, 'Template_Bao_Cao_Doanh_So_Lai_Gop_8_Phong_Ban_VPS.xlsx');
    await wb.xlsx.writeFile(masterPath);
    console.log(`[OK] Master Template Created: ${masterPath}`);
}

// -------------------------------------------------------------
// 2. TẠO CÁC FILE EXCEL ĐỘC LẬP CHO TỪNG ĐƠN VỊ & FILE NÉN ZIP
// -------------------------------------------------------------
async function createIndividualUnitTemplates() {
    for (const comp of COMPANIES) {
        const wb = new ExcelJS.Workbook();
        wb.creator = "Tập đoàn VPS";

        // Sheet Hướng dẫn
        const wsGuide = wb.addWorksheet("00_Huong_Dan");
        buildGuideSheet(wsGuide);

        // Sheet Báo Cáo Tháng
        const wsReport = wb.addWorksheet("Bao_Cao_Thang");
        buildReportSheet(wsReport, comp);

        // Sheet 12 Tháng
        const ws12m = wb.addWorksheet("12_Thang_Chi_Tiet");
        build12MonthsSheet(ws12m, comp.code);

        const filePath = path.join(OUTPUT_DIR, comp.filename);
        await wb.xlsx.writeFile(filePath);
        console.log(`[OK] Unit File Created: ${comp.filename}`);
    }

    // Tạo file zip cho cả thư mục
    const zipPath = path.join(__dirname, 'Bo_Bieu_Mau_8_Phong_Ban_Cac_Don_Vi_VPS.zip');
    try {
        const pwshCmd = `Compress-Archive -Path "${OUTPUT_DIR}\\*" -DestinationPath "${zipPath}" -Force`;
        execSync(`powershell -NoProfile -Command "${pwshCmd}"`);
        console.log(`[OK] ZIP Package Created: ${zipPath}`);
    } catch (err) {
        console.error("ZIP creation error:", err.message);
    }
}

async function run() {
    console.log("=== BẮT ĐẦU TẠO BỘ BIỂU MẪU EXCEL 8 PHÒNG BAN / MẢNG KINH DOANH ===");
    await createMasterTemplate();
    await createIndividualUnitTemplates();
    console.log("=== HOÀN TẤT TOÀN BỘ QUÁ TRÌNH TẠO TEMPLATE ===");
}

run().catch(console.error);
