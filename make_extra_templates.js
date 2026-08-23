const XLSX = require('xlsx');

// 1. Sản phẩm (Doanh số sản phẩm)
const sanPhamData = [
    ["CÔNG TY", "THÁNG", "HÃNG (HP/Fujifilm/Khác)", "NHÓM SẢN PHẨM", "DOANH THU (VNĐ)"],
    ["Tân Hồng Hà", "8", "HP", "Máy in", 150000000],
    ["Tân Hồng Hà", "8", "Fujifilm", "Máy Photocopy", 200000000],
    ["Việt", "8", "HP", "Mực in", 50000000],
    ["Xem Sơn", "8", "Khác", "Linh kiện", 30000000]
];

// 2. Chi phí
const chiPhiData = [
    ["CÔNG TY", "THÁNG", "NHÓM CHI PHÍ (I,II,III,IV,V)", "HẠNG MỤC CHI PHÍ", "GIÁ TRỊ (VNĐ)"],
    ["Tân Hồng Hà", "8", "I. Chi phí Biến đổi", "Chi phí bán hàng", 10000000],
    ["Tân Hồng Hà", "8", "II. Chi phí Cố định", "Thuê văn phòng", 50000000],
    ["Việt", "8", "III. Chi phí Lương", "Lương nhân viên", 120000000],
    ["VPS M", "8", "IV. Chi phí Phân bổ", "Khấu hao", 5000000]
];

// 3. ISO
const isoData = [
    ["CÔNG TY", "PHÒNG BAN", "TÊN QUY TRÌNH / QUY ĐỊNH", "PHÂN LOẠI (Quy trình/Quy định)"],
    ["Tân Hồng Hà", "Hành chính Nhân sự", "Quy trình tuyển dụng", "Quy trình"],
    ["Tân Hồng Hà", "Kế toán", "Quy định thanh toán", "Quy định"],
    ["Việt", "Kinh doanh", "Quy trình bán hàng", "Quy trình"],
    ["ITSS", "Kỹ thuật", "Quy trình bảo hành", "Quy trình"]
];

const wb = XLSX.utils.book_new();

const wsSanPham = XLSX.utils.aoa_to_sheet(sanPhamData);
const wsChiPhi = XLSX.utils.aoa_to_sheet(chiPhiData);
const wsIso = XLSX.utils.aoa_to_sheet(isoData);

// Styling headers (basic column widths)
wsSanPham['!cols'] = [{wch: 15}, {wch: 10}, {wch: 25}, {wch: 30}, {wch: 20}];
wsChiPhi['!cols'] = [{wch: 15}, {wch: 10}, {wch: 30}, {wch: 30}, {wch: 20}];
wsIso['!cols'] = [{wch: 15}, {wch: 25}, {wch: 40}, {wch: 25}];

XLSX.utils.book_append_sheet(wb, wsSanPham, "Sản phẩm");
XLSX.utils.book_append_sheet(wb, wsChiPhi, "Chi phí");
XLSX.utils.book_append_sheet(wb, wsIso, "ISO");

XLSX.writeFile(wb, "Template_Bo_Sung_VPS.xlsx");
console.log("Created Template_Bo_Sung_VPS.xlsx");
