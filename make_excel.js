const XLSX = require('xlsx');

// Tạo Workbook mới
const wb = XLSX.utils.book_new();

// Sheet 1: Khách Hàng
const ws_customers = XLSX.utils.aoa_to_sheet([
    ['BÁO CÁO DỮ LIỆU KHÁCH HÀNG'],
    ['Kỳ báo cáo:', 'Tháng 8/2026', 'Đơn vị:', 'Tân Hồng Hà (Vui lòng chọn hoặc ghi tên đơn vị)'],
    [],
    ['Mảng Khách Hàng', 'Số Lượng Hiện Tại', 'Tăng Mới (Trong kỳ)', 'Giảm (Trong kỳ)'],
    ['Dịch vụ', 1200, 150, 5],
    ['Thuê máy', 800, 20, 2],
    ['Phân phối', 2500, 0, 0],
    ['Dự án', 0, 0, 0]
]);
ws_customers['!cols'] = [{wch: 25}, {wch: 20}, {wch: 20}, {wch: 20}];
XLSX.utils.book_append_sheet(wb, ws_customers, '1. Khách Hàng');

// Sheet 2: Doanh Số & Chi Phí
const ws_revenue = XLSX.utils.aoa_to_sheet([
    ['BÁO CÁO DOANH SỐ VÀ CHI PHÍ (ĐVT: Triệu VNĐ)'],
    ['Kỳ báo cáo:', 'Tháng 8/2026', 'Đơn vị:', 'Tân Hồng Hà'],
    [],
    ['Chỉ Tiêu', 'Giá Trị (Triệu VNĐ)', 'Ghi Chú'],
    ['Doanh số Dịch vụ', 500, ''],
    ['Doanh số Thuê máy', 1200, ''],
    ['Doanh số Phân phối', 8000, ''],
    ['Doanh số Dự án', 3000, ''],
    ['Tổng Lãi Gộp', 2500, 'Lợi nhuận gộp'],
    ['Chi phí Vận hành (OPEX)', 800, 'Các chi phí liên quan đến vận hành'],
    ['Chi phí Khác', 200, '']
]);
ws_revenue['!cols'] = [{wch: 30}, {wch: 20}, {wch: 40}];
XLSX.utils.book_append_sheet(wb, ws_revenue, '2. Doanh Số - Chi Phí');

// Sheet 3: Công Nợ & Tồn Kho
const ws_debt = XLSX.utils.aoa_to_sheet([
    ['BÁO CÁO CÔNG NỢ VÀ TỒN KHO (ĐVT: Triệu VNĐ)'],
    ['Kỳ báo cáo:', 'Tháng 8/2026', 'Đơn vị:', 'Tân Hồng Hà'],
    [],
    ['Chỉ Tiêu', 'Giá Trị (Triệu VNĐ)', 'Ghi Chú'],
    ['Tổng Công Nợ Phải Thu', 4500, ''],
    ['Nợ Quá Hạn', 500, ''],
    ['Tổng Giá Trị Tồn Kho', 12000, ''],
    ['Tồn Kho Chậm Luân Chuyển', 1500, 'Hàng hóa nằm kho trên 6 tháng']
]);
ws_debt['!cols'] = [{wch: 30}, {wch: 20}, {wch: 40}];
XLSX.utils.book_append_sheet(wb, ws_debt, '3. Nợ - Tồn Kho');

// Sheet 4: Nhân Sự & KPI
const ws_hr = XLSX.utils.aoa_to_sheet([
    ['BÁO CÁO NHÂN SỰ VÀ KPI'],
    ['Kỳ báo cáo:', 'Tháng 8/2026', 'Đơn vị:', 'Tân Hồng Hà'],
    [],
    ['I. Số Lượng Nhân Sự', 'Giá Trị', 'Ghi chú'],
    ['Định biên nhân sự (Chỉ tiêu)', 150, 'Số lượng cần có theo kế hoạch'],
    ['Nhân sự Chính thức', 120, 'Số lượng hiện tại'],
    ['Nhân sự Thử việc', 15, ''],
    ['Nhân sự Đã nghỉ việc', 3, 'Trong kỳ báo cáo'],
    [],
    ['II. Đánh Giá Chất Lượng (KPI)', 'Số lượng người', 'Tỷ lệ % (Tự động)'],
    ['Loại A (Xuất sắc)', 40, ''],
    ['Loại B (Khá)', 50, ''],
    ['Loại C (Trung bình)', 25, ''],
    ['Loại D (Yếu kém)', 5, ''],
    [],
    ['III. Phân Tích & Đề Xuất', 'Nội Dung', ''],
    ['Nguyên nhân / Vấn đề tồn tại', 'Biến động nhân sự sale khu vực miền Nam, năng suất chưa đạt kỳ vọng.', ''],
    ['Giải pháp / Đề xuất', 'Đào tạo lại kỹ năng sale, tăng cường giám sát KPIs.', '']
]);
ws_hr['!cols'] = [{wch: 35}, {wch: 20}, {wch: 40}];
XLSX.utils.book_append_sheet(wb, ws_hr, '4. Nhân Sự - KPI');

// Write to file
XLSX.writeFile(wb, 'Bieu_Mau_Bao_Cao_VPS.xlsx');
console.log('Done');
