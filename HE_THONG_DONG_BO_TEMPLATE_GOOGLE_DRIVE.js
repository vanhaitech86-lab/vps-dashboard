/**
 * ======================================================================================
 * TẬP ĐOÀN VPS - HỆ THỐNG ĐỒNG BỘ CẤU TRÚC TEMPLATE TỰ ĐỘNG LÊN GOOGLE DRIVE
 * ======================================================================================
 * NÂNG CẤP MỚI NHẤT:
 * 1. ĐÃ BỎ HOÀN TOÀN BÁO CÁO "Doanh thu" (Xóa bỏ sheet Doanh thu cũ không cần thiết).
 * 2. CHUẨN HÓA SHEET "DOANH SỐ VÀ LÃI GỘP" VỚI 8 MẢNG KINH DOANH CHUẨN:
 *    - Điền sẵn toàn bộ 8 phòng ban / mảng kinh doanh và các dòng con theo từng đơn vị.
 *    - Gắn sẵn công thức tự động tính % Đạt DS, % Đạt Lãi gộp, % Lãi gộp, Kế hoạch năm & Lũy kế.
 * 3. TẠO ĐẦY ĐỦ FORM MẪU CHO TẤT CẢ CÁC SHEET NGHIỆP VỤ CÒN LẠI:
 *    - Đơn vị chỉ việc mở file là CÓ SẴN DÒNG, CỘT, TIÊU ĐỀ để nhập số liệu ngay.
 *    - Bạn KHÔNG CẦN PHẢI SỬA BẤT CỨ SHEET NÀO TRÊN GOOGLE DRIVE NỮA!
 * 4. BẢO TOÀN 100% SỐ LIỆU ĐÃ CÓ CỦA CÁC ĐƠN VỊ.
 * 
 * HƯỚNG DẪN SỬ DỤNG 1-CLICK:
 * 1. Truy cập: https://script.google.com
 * 2. Dán toàn bộ nội dung code này vào và bấm biểu tượng "Lưu" (Ctrl+S).
 * 3. Chọn hàm "dongBoCauTrucGoogleSheets" và bấm "Chạy" (Run) ▶.
 *    -> Hệ thống sẽ tự động duyệt qua 6 file Google Sheets, xóa tab Doanh thu cũ,
 *       và tạo sẵn chuẩn mực toàn bộ các sheet cho từng đơn vị nhập liệu ngay!
 * ======================================================================================
 */

// 1. CẤU HÌNH DANH SÁCH 6 FILE GOOGLE SHEETS CỦA 6 ĐƠN VỊ THÀNH VIÊN
const DANH_SACH_DON_VI = [
  { code: 'THH',    name: 'Tân Hồng Hà',   id: '1TP2ISnfspKYLuN7U9eETeggBMWkQbaRl_G1X8juCePY' },
  { code: 'Viet',   name: 'Việt',           id: '1Pp7HC4cgUVAM69DDOGTvRct0kRiJ8hqNRj5K339xH4o' },
  { code: 'XemSon', name: 'Xem Sơn',       id: '1yXyzTKccGWQSn0mCNFmxPkHyx5auTwQw2SZcngPNIFg' },
  { code: 'VPSM',   name: 'VPS M',         id: '13o7mqOd_30DbYqRhF18qn_yTqno3FzAWeqZDJ6nVTFA' },
  { code: 'ITSS',   name: 'ITSS',          id: '1JHGl2WSw8zezqWXSIJrKHWYpnW8nIatedn4UbzPilVM' },
  { code: 'VPVPS',  name: 'Văn phòng VPS', id: '1pHdTs3sM3RMF1ST6eWenuo947hG66V_kLU6FupNJZcE' }
];

// 2. DANH MỤC MẢNG CON KINH DOANH CHI TIẾT THEO TỪNG ĐƠN VỊ (8 PHÒNG BAN CHUẨN)
const MANG_CON_THEO_DON_VI = {
  'THH': [
    { num: '1', name: 'Kinh doanh phân phối', desc: 'Bán buôn máy, linh kiện, KD sỉ', ds_m: 5135, lg_m: 572, ds_y: 45000, lg_y: 4500 },
    { num: '',  name: '  - [THH] Kinh doanh bán buôn', desc: 'Phân phối đại lý miền Bắc', ds_m: 5135, lg_m: 572, ds_y: 45000, lg_y: 4500 },
    { num: '2', name: 'Thuê Máy', desc: 'Thuê máy kỹ thuật & KD thuê máy', ds_m: 650, lg_m: 233, ds_y: 7000, lg_y: 2450 },
    { num: '',  name: '  - [THH] Thuê máy Tân Hồng Hà', desc: 'Cho thuê máy photocopy miền Bắc', ds_m: 650, lg_m: 233, ds_y: 7000, lg_y: 2450 },
    { num: '3', name: 'Dịch Vụ', desc: 'DVKT, Tổ dịch vụ, mực in, metercharge', ds_m: 1546, lg_m: 618, ds_y: 20000, lg_y: 8040 },
    { num: '',  name: '  - [THH] Tổ Dịch vụ THH', desc: 'Bảo trì bảo dưỡng sửa chữa', ds_m: 959, lg_m: 281, ds_y: 14000, lg_y: 5320 },
    { num: '',  name: '  - [THH] Tổ mực in THH', desc: 'Cung cấp thay thế mực in', ds_m: 354, lg_m: 196, ds_y: 3500, lg_y: 1470 },
    { num: '',  name: '  - [THH] Metercharge THH', desc: 'Dịch vụ thu phí bản in chụp', ds_m: 233, lg_m: 141, ds_y: 2500, lg_y: 1250 },
    { num: '4', name: 'Kinh doanh online', desc: 'E-commerce, Shopee-Online, trực tuyến', ds_m: 102, lg_m: 5, ds_y: 1500, lg_y: 75 },
    { num: '',  name: '  - [THH] Kinh doanh Online THH', desc: 'Bán hàng trực tuyến', ds_m: 102, lg_m: 5, ds_y: 1500, lg_y: 75 },
    { num: '5', name: 'Dự án', desc: 'Dự án văn phòng, CNTT, thiết bị', ds_m: 1415, lg_m: 310, ds_y: 22000, lg_y: 8800 },
    { num: '',  name: '  - [THH] Dự án Tân Hồng Hà', desc: 'Dự án thầu thiết bị miền Bắc', ds_m: 1415, lg_m: 310, ds_y: 22000, lg_y: 8800 },
    { num: '6', name: 'Kinh doanh tổng hợp', desc: 'Kinh doanh tổng hợp thương mại', ds_m: 1248, lg_m: 177, ds_y: 22500, lg_y: 2250 },
    { num: '',  name: '  - [THH] Kinh doanh tổng hợp THH', desc: 'Thương mại tổng hợp', ds_m: 1248, lg_m: 177, ds_y: 22500, lg_y: 2250 },
    { num: '7', name: 'Kinh doanh lẻ', desc: 'Cửa hàng, bán máy lẻ, showroom', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '8', name: 'Kinh doanh khác', desc: 'Bán nội bộ, thương mại khác, xuất khẩu', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 }
  ],
  'Viet': [
    { num: '1', name: 'Kinh doanh phân phối', desc: 'Bán buôn máy, linh kiện, KD sỉ', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '2', name: 'Thuê Máy', desc: 'Thuê máy kỹ thuật & KD thuê máy', ds_m: 1546, lg_m: 910, ds_y: 18500, lg_y: 10730 },
    { num: '',  name: '  - [Viet] Thuê máy Công ty Việt', desc: 'Cho thuê máy Công ty Việt', ds_m: 1546, lg_m: 910, ds_y: 18500, lg_y: 10730 },
    { num: '3', name: 'Dịch Vụ', desc: 'DVKT, Tổ dịch vụ, mực in, metercharge', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '4', name: 'Kinh doanh online', desc: 'E-commerce, Shopee-Online, trực tuyến', ds_m: 3764, lg_m: 241, ds_y: 30500, lg_y: 1830 },
    { num: '',  name: '  - [Viet] KD Online Việt', desc: 'Kênh online sàn TMĐT', ds_m: 3764, lg_m: 241, ds_y: 30500, lg_y: 1830 },
    { num: '5', name: 'Dự án', desc: 'Dự án văn phòng, CNTT, thiết bị', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '6', name: 'Kinh doanh tổng hợp', desc: 'Kinh doanh tổng hợp thương mại', ds_m: 2213, lg_m: 166, ds_y: 23000, lg_y: 1840 },
    { num: '',  name: '  - [Viet] KDTH Công ty Việt', desc: 'Kinh doanh tổng hợp', ds_m: 2213, lg_m: 166, ds_y: 23000, lg_y: 1840 },
    { num: '7', name: 'Kinh doanh lẻ', desc: 'Cửa hàng, bán máy lẻ, showroom', ds_m: 90, lg_m: 62, ds_y: 6000, lg_y: 900 },
    { num: '',  name: '  - [Viet] Cửa hàng Việt', desc: 'Bán lẻ tại điểm bán', ds_m: 90, lg_m: 62, ds_y: 6000, lg_y: 900 },
    { num: '8', name: 'Kinh doanh khác', desc: 'Bán nội bộ, thương mại khác, xuất khẩu', ds_m: 11, lg_m: 1, ds_y: 600, lg_y: 75 },
    { num: '',  name: '  - [Viet] Bán nội bộ Việt', desc: 'Hoạt động nội bộ', ds_m: 11, lg_m: 1, ds_y: 600, lg_y: 75 }
  ],
  'XemSon': [
    { num: '1', name: 'Kinh doanh phân phối', desc: 'Bán buôn máy, linh kiện, KD sỉ', ds_m: 4169, lg_m: 682, ds_y: 66000, lg_y: 6300 },
    { num: '',  name: '  - [XemSon] Kinh doanh bán buôn (KD Sỉ)', desc: 'Phân phối đại lý miền Nam', ds_m: 4169, lg_m: 682, ds_y: 66000, lg_y: 6300 },
    { num: '2', name: 'Thuê Máy', desc: 'Thuê máy kỹ thuật & KD thuê máy', ds_m: 1808, lg_m: 1167, ds_y: 42000, lg_y: 25480 },
    { num: '',  name: '  - [XemSon] Kỹ thuật thuê máy (KT)', desc: 'Máy thuê kỹ thuật Xesco', ds_m: 1427, lg_m: 918, ds_y: 24000, lg_y: 14560 },
    { num: '',  name: '  - [XemSon] KD Thuê máy (Thương mại)', desc: 'Hợp đồng thuê máy mới', ds_m: 381, lg_m: 249, ds_y: 18000, lg_y: 10920 },
    { num: '3', name: 'Dịch Vụ', desc: 'DVKT, Tổ dịch vụ, mực in, metercharge', ds_m: 1717, lg_m: 738, ds_y: 26000, lg_y: 8580 },
    { num: '',  name: '  - [XemSon] Dịch vụ kỹ thuật Xem Sơn', desc: 'Kỹ thuật dịch vụ máy VP', ds_m: 1439, lg_m: 574, ds_y: 22000, lg_y: 7260 },
    { num: '',  name: '  - [XemSon] Metercharge Xem Sơn', desc: 'Dịch vụ Metercharge Xesco', ds_m: 278, lg_m: 164, ds_y: 4000, lg_y: 1320 },
    { num: '4', name: 'Kinh doanh online', desc: 'E-commerce, Shopee-Online, trực tuyến', ds_m: 6770, lg_m: 244, ds_y: 24000, lg_y: 1200 },
    { num: '',  name: '  - [XemSon] KD Online Xem Sơn', desc: 'Thương mại điện tử Xesco', ds_m: 6770, lg_m: 244, ds_y: 24000, lg_y: 1200 },
    { num: '5', name: 'Dự án', desc: 'Dự án văn phòng, CNTT, thiết bị', ds_m: 447, lg_m: 161, ds_y: 6000, lg_y: 2160 },
    { num: '',  name: '  - [XemSon] Dự án Xesco', desc: 'Gói thầu thiết bị miền Nam', ds_m: 447, lg_m: 161, ds_y: 6000, lg_y: 2160 },
    { num: '6', name: 'Kinh doanh tổng hợp', desc: 'Kinh doanh tổng hợp thương mại', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '7', name: 'Kinh doanh lẻ', desc: 'Cửa hàng, bán máy lẻ, showroom', ds_m: 191, lg_m: 49, ds_y: 5500, lg_y: 1265 },
    { num: '',  name: '  - [XemSon] Bán máy lẻ Xem Sơn', desc: 'Bán lẻ thiết bị văn phòng', ds_m: 191, lg_m: 49, ds_y: 5500, lg_y: 1265 },
    { num: '8', name: 'Kinh doanh khác', desc: 'Bán nội bộ, thương mại khác, xuất khẩu', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 }
  ],
  'VPSM': [
    { num: '1', name: 'Kinh doanh phân phối', desc: 'Bán buôn máy, linh kiện, KD sỉ', ds_m: 1050, lg_m: 67, ds_y: 13500, lg_y: 1350 },
    { num: '',  name: '  - [VPSM] Kinh doanh máy - bán buôn', desc: 'Bán buôn máy VPS Miền Trung', ds_m: 810, lg_m: 45, ds_y: 10000, lg_y: 900 },
    { num: '',  name: '  - [VPSM] Kinh doanh linh kiện - bán buôn', desc: 'Bán buôn linh kiện mực in', ds_m: 240, lg_m: 22, ds_y: 3500, lg_y: 450 },
    { num: '2', name: 'Thuê Máy', desc: 'Thuê máy kỹ thuật & KD thuê máy', ds_m: 80, lg_m: 20, ds_y: 1200, lg_y: 780 },
    { num: '',  name: '  - [VPSM] Thuê máy Miền Trung', desc: 'Thuê máy khu vực miền Trung', ds_m: 80, lg_m: 20, ds_y: 1200, lg_y: 780 },
    { num: '3', name: 'Dịch Vụ', desc: 'DVKT, Tổ dịch vụ, mực in, metercharge', ds_m: 280, lg_m: 130, ds_y: 3500, lg_y: 1820 },
    { num: '',  name: '  - [VPSM] Dịch vụ kỹ thuật VPSM', desc: 'Bảo trì sửa chữa máy', ds_m: 220, lg_m: 95, ds_y: 2700, lg_y: 1350 },
    { num: '',  name: '  - [VPSM] Dịch vụ toàn phần VPSM', desc: 'Hợp đồng bảo trì trọn gói', ds_m: 60, lg_m: 35, ds_y: 800, lg_y: 470 },
    { num: '4', name: 'Kinh doanh online', desc: 'E-commerce, Shopee-Online, trực tuyến', ds_m: 105, lg_m: 3, ds_y: 1400, lg_y: 84 },
    { num: '',  name: '  - [VPSM] Shopee-Online VPSM', desc: 'Gian hàng Shopee Miền Trung', ds_m: 105, lg_m: 3, ds_y: 1400, lg_y: 84 },
    { num: '5', name: 'Dự án', desc: 'Dự án văn phòng, CNTT, thiết bị', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '6', name: 'Kinh doanh tổng hợp', desc: 'Kinh doanh tổng hợp thương mại', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '7', name: 'Kinh doanh lẻ', desc: 'Cửa hàng, bán máy lẻ, showroom', ds_m: 5, lg_m: 1, ds_y: 600, lg_y: 108 },
    { num: '',  name: '  - [VPSM] Bán lẻ VPS Miền Trung', desc: 'Bán lẻ tại showroom', ds_m: 5, lg_m: 1, ds_y: 600, lg_y: 108 },
    { num: '8', name: 'Kinh doanh khác', desc: 'Bán nội bộ, thương mại khác, xuất khẩu', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 }
  ],
  'ITSS': [
    { num: '1', name: 'Kinh doanh phân phối', desc: 'Bán buôn máy, linh kiện, KD sỉ', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '2', name: 'Thuê Máy', desc: 'Thuê máy kỹ thuật & KD thuê máy', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '3', name: 'Dịch Vụ', desc: 'DVKT, Tổ dịch vụ, mực in, metercharge', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '4', name: 'Kinh doanh online', desc: 'E-commerce, Shopee-Online, trực tuyến', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '5', name: 'Dự án', desc: 'Dự án văn phòng, CNTT, thiết bị', ds_m: 640, lg_m: 210, ds_y: 5500, lg_y: 2035 },
    { num: '',  name: '  - [ITSS] Dự án CNTT ITSS', desc: 'Giải pháp phần mềm và mạng', ds_m: 640, lg_m: 210, ds_y: 5500, lg_y: 2035 },
    { num: '6', name: 'Kinh doanh tổng hợp', desc: 'Kinh doanh tổng hợp thương mại', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '7', name: 'Kinh doanh lẻ', desc: 'Cửa hàng, bán máy lẻ, showroom', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '8', name: 'Kinh doanh khác', desc: 'Bán nội bộ, thương mại khác, xuất khẩu', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 }
  ],
  'VPVPS': [
    { num: '1', name: 'Kinh doanh phân phối', desc: 'Bán buôn máy, linh kiện, KD sỉ', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '2', name: 'Thuê Máy', desc: 'Thuê máy kỹ thuật & KD thuê máy', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '3', name: 'Dịch Vụ', desc: 'DVKT, Tổ dịch vụ, mực in, metercharge', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '4', name: 'Kinh doanh online', desc: 'E-commerce, Shopee-Online, trực tuyến', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '5', name: 'Dự án', desc: 'Dự án văn phòng, CNTT, thiết bị', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '6', name: 'Kinh doanh tổng hợp', desc: 'Kinh doanh tổng hợp thương mại', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '7', name: 'Kinh doanh lẻ', desc: 'Cửa hàng, bán máy lẻ, showroom', ds_m: 0, lg_m: 0, ds_y: 0, lg_y: 0 },
    { num: '8', name: 'Kinh doanh khác', desc: 'Bán nội bộ, thương mại khác, xuất khẩu', ds_m: 7386, lg_m: 288, ds_y: 36000, lg_y: 4320 },
    { num: '',  name: '  - [VPVPS] VP VPS - Hoạt động KD', desc: 'Bán nội bộ, xuất khẩu, thương mại', ds_m: 7386, lg_m: 288, ds_y: 36000, lg_y: 4320 }
  ]
};

// 3. TIÊU ĐỀ 16 CỘT CHUẨN CỦA TAB "DOANH SỐ VÀ LÃI GỘP"
const HEADERS_7DEPT = [
  'STT', 'PHÒNG BAN / MẢNG KINH DOANH',
  'DS KH THÁNG', 'DS TH THÁNG', '% ĐẠT DS THÁNG',
  'LG KH THÁNG', 'LG TH THÁNG', '% ĐẠT LG THÁNG', '% LG THÁNG',
  'DS KH NĂM', 'DS TH NĂM (LK)', '% ĐẠT DS NĂM',
  'LG KH NĂM', 'LG TH NĂM (LK)', '% ĐẠT LG NĂM', 'GHI CHÚ'
];

// 4. DANH SÁCH 13 SHEET NGHIỆP VỤ CHUẨN (ĐÃ BỎ SHEET "Doanh thu")
const CAU_TRUC_TEMPLATE = [
  {
    name: '00_Huong_Dan',
    headers: ['NỘI DUNG HƯỚNG DẪN QUY ĐỊNH NHẬP LIỆU BÁO CÁO VPS (PHIÊN BẢN CHUẨN)'],
    sample: [
      ['1. Hệ thống đã chuẩn hóa toàn diện 8 phòng ban / mảng kinh doanh tại sheet: "DOANH SỐ VÀ LÃI GỘP".'],
      ['2. Báo cáo "Doanh thu" cũ đã được lược bỏ hoàn toàn để tránh trùng lặp số liệu.'],
      ['3. Đơn vị chỉ cần nhập số Doanh số và Lãi gộp, các cột % Đạt và % Lãi gộp sẽ tự động tính.'],
      ['4. Đơn vị tính: Triệu VNĐ (hoặc VNĐ tùy quy định từng Sheet). Nhập số nguyên dương, không gõ chữ đ hay vnd.'],
      ['5. Định dạng tháng: MM/YYYY (Ví dụ: 08/2026, 09/2026, 10/2026).'],
      ['6. Tuyệt đối không xóa dòng tiêu đề hoặc sửa tên Sheet để Dashboard tự động đồng bộ trơn tru.']
    ]
  },
  {
    name: 'DOANH SỐ VÀ LÃI GỘP',
    headers: HEADERS_7DEPT,
    isDeptSheet: true
  },
  {
    name: 'Công nợ',
    headers: ['Tháng/Năm', 'Đơn vị', 'Nợ trong hạn (VNĐ)', 'Nợ quá hạn (VNĐ)', 'Nợ khó đòi (VNĐ)', 'Tỷ lệ nợ quá hạn (%)', 'Ghi chú'],
    sample: [['09/2026', '', '12000000000', '1500000000', '100000000', '=D2/(C2+D2+E2)', 'Theo dõi công nợ tháng']]
  },
  {
    name: 'Khách hàng',
    headers: ['Tháng/Năm', 'Mảng kinh doanh', 'Nhóm phân loại', 'Đầu kỳ (Máy)', 'Đầu kỳ (KH)', 'Tăng trong kỳ (Máy)', 'Tăng trong kỳ (KH)', 'Giảm trong kỳ (Máy)', 'Giảm trong kỳ (KH)', 'Cuối kỳ (Máy)', 'Cuối kỳ (KH)'],
    sample: [
      ['09/2026', 'Thuê máy', 'Thuê máy', '120', '95', '15', '12', '2', '1', '=D2+F2-H2', '=E2+G2-I2'],
      ['09/2026', 'MC', 'MC', '80', '65', '10', '8', '1', '1', '=D3+F3-H3', '=E3+G3-I3'],
      ['09/2026', 'Dịch vụ - Photo', 'Dịch vụ - Photo', '45', '40', '5', '4', '0', '0', '=D4+F4-H4', '=E4+G4-I4'],
      ['09/2026', 'Dịch vụ - Máy in', 'Dịch vụ - Máy in', '60', '50', '8', '6', '1', '1', '=D5+F5-H5', '=E5+G5-I5'],
      ['09/2026', 'Phân phối (Đại lý)', 'Phân phối (Đại lý)', '-', '35', '-', '5', '-', '0', '-', '=E6+G6-I6'],
      ['09/2026', 'Phân phối (Đại lý)', 'Khách hàng phát sinh doanh số dưới 3 tháng', '-', '12', '-', '2', '-', '0', '-', '14'],
      ['09/2026', 'Phân phối (Đại lý)', 'Khách hàng phát sinh doanh số từ 3 - 6 tháng', '-', '15', '-', '1', '-', '0', '-', '16'],
      ['09/2026', 'Phân phối (Đại lý)', 'Khách hàng phát sinh doanh số trên 6 tháng', '-', '8', '-', '0', '-', '0', '-', '8']
    ]
  },
  {
    name: 'Tồn kho',
    headers: ['Tháng/Năm', 'Mã vật tư/thiết bị', 'Tên sản phẩm', 'Đơn vị tính', 'Nhóm hàng (HĐKD/Dự án)', 'Số lượng tồn', 'Giá trị tồn kho (VNĐ)', 'Tình trạng'],
    sample: [
      ['09/2026', 'VT-001', 'Vật tư máy in, photo A3', 'Chiếc', 'HĐKD', '150', '450000000', 'Tốt'],
      ['09/2026', 'DA-002', 'Thiết bị gói thầu dự án', 'Bộ', 'Dự án', '25', '1250000000', 'Đang giao']
    ]
  },
  {
    name: 'Nhân sự',
    headers: ['Tháng/Năm', 'STT', 'Phòng ban / Bộ phận', 'Định biên được giao', 'Tuyển mới trong kỳ', 'Nghỉ việc trong kỳ', 'Đang thử việc', 'Tổng nhân sự cuối kỳ'],
    sample: [
      ['09/2026', '1', 'Ban Giám đốc', '3', '0', '0', '0', '3'],
      ['09/2026', '2', 'Phòng Kinh doanh', '15', '2', '0', '1', '16'],
      ['09/2026', '3', 'Phòng Kỹ thuật & Dịch vụ', '20', '1', '1', '2', '20'],
      ['09/2026', '4', 'Phòng Kế toán', '5', '0', '0', '0', '5'],
      ['09/2026', '5', 'Phòng Hành chính Nhân sự', '4', '0', '0', '0', '4']
    ]
  },
  {
    name: 'Sản Phẩm',
    headers: ['Tháng/Năm', 'Hãng / Nhóm sản phẩm', 'Doanh số Kế hoạch (VNĐ)', 'Doanh số Thực tế (VNĐ)', 'Tỷ lệ hoàn thành (%)', 'Lãi gộp (VNĐ)'],
    sample: [
      ['09/2026', 'HP', '5000000000', '5200000000', '=D2/C2', '800000000'],
      ['09/2026', 'Fujifilm', '4000000000', '3950000000', '=D3/C3', '750000000'],
      ['09/2026', 'Khác', '2000000000', '2100000000', '=D4/C4', '350000000']
    ]
  },
  {
    name: 'Chi Phí',
    headers: ['Tháng/Năm', 'Mã chi phí', 'Tên khoản mục chi phí', 'Phân loại (Cố định/Biến đổi)', 'Kế hoạch (VNĐ)', 'Thực tế phát sinh (VNĐ)', 'Bộ phận sử dụng'],
    sample: [
      ['09/2026', 'CP-01', 'Chi phí lương & bảo hiểm', 'Cố định', '850000000', '840000000', 'Toàn đơn vị'],
      ['09/2026', 'CP-02', 'Chi phí thuê văn phòng & kho', 'Cố định', '250000000', '250000000', 'Văn phòng'],
      ['09/2026', 'CP-03', 'Chi phí bán hàng & tiếp khách', 'Biến đổi', '180000000', '165000000', 'Kinh doanh']
    ]
  },
  {
    name: 'ISO',
    headers: ['STT', 'Mã quy trình', 'Tên quy trình / Quy định', 'Phiên bản', 'Ngày ban hành', 'Phạm vi áp dụng', 'Tình trạng áp dụng'],
    sample: [
      ['1', 'QT-KD-01', 'Quy trình tiếp nhận & xử lý đơn hàng', 'V2.0', '01/01/2026', 'Khối Kinh doanh', 'Đang áp dụng'],
      ['2', 'QT-KT-02', 'Quy trình bảo trì bảo dưỡng máy thuê', 'V1.5', '15/03/2026', 'Khối Kỹ thuật', 'Đang áp dụng']
    ]
  },
  {
    name: 'Đào tạo',
    headers: ['Tháng/Năm', 'Nội dung đào tạo', 'Đối tượng tham gia', 'Kế hoạch số người', 'Thực tế hoàn thành', 'Tỷ lệ đạt (%)', 'Đánh giá kết quả'],
    sample: [
      ['09/2026', 'Đào tạo sản phẩm máy in mới HP', 'KTV & Sale', '25', '25', '=E2/D2', 'Đạt yêu cầu'],
      ['09/2026', 'Văn hóa ứng xử & phục vụ tận tâm', 'Toàn thể CBNV', '40', '38', '=E3/D3', 'Tốt']
    ]
  },
  {
    name: 'Dịch vụ tận tâm',
    headers: ['Tháng/Năm', 'Mã NV', 'Họ và tên Kỹ thuật viên', 'Chức danh', 'Đơn vị', 'Tổng lượt việc', 'Lượt đúng hẹn', 'Lượt bảo hành lại', 'Điểm CSAT trung bình'],
    sample: [
      ['09/2026', 'KT-01', 'Nguyễn Văn A', 'Kỹ thuật viên chính', '', '85', '82', '1', '9.6'],
      ['09/2026', 'KT-02', 'Trần Văn B', 'Kỹ thuật viên', '', '78', '75', '2', '9.4']
    ]
  },
  {
    name: 'Văn hóa doanh nghiệp',
    headers: ['Tháng/Năm', 'Mã NV', 'Họ và tên', 'Phòng ban / Bộ phận', 'Đã Quy Y (Có/Chưa)', 'Nơi / Ngày Quy Y', 'Tín chỉ văn hóa (0-3)', 'Ghi chú'],
    sample: [
      ['09/2026', 'NV-01', 'Lê Văn C', 'Kinh doanh', 'Có', 'Chùa Ba Vàng', '3', 'Tham gia tích cực'],
      ['09/2026', 'NV-02', 'Phạm Thị D', 'Kế toán', 'Chưa', '', '2', 'Hoàn thành bài học']
    ]
  },
  {
    name: 'Thương hiệu',
    headers: ['Tháng/Năm', 'STT', 'Chỉ tiêu thương hiệu / Marketing', 'Kế hoạch', 'Thực hiện', 'Tỷ lệ hoàn thành (%)', 'Đánh giá'],
    sample: [
      ['09/2026', '1', 'Tỷ lệ thị phần khu vực (%)', '35%', '36.5%', '104%', 'Đạt mục tiêu'],
      ['09/2026', '2', 'Số lượng khách hàng mới nhận diện', '50', '58', '=D3/C3', 'Vượt kế hoạch']
    ]
  },
  {
    name: 'Dự án & KH Dự án',
    headers: ['Tháng/Năm', 'Tên Dự án / Gói thầu', 'Tên Khách hàng / Chi nhánh', 'Quy mô thiết bị (Máy)', 'Doanh số dự kiến (VNĐ)', 'Tiến độ thực hiện', 'Ghi chú'],
    sample: [
      ['09/2026', 'Gói thầu thiết bị Agribank', 'Agribank Chi nhánh tỉnh', '45', '1850000000', 'Đang bàn giao đợt 2', 'Nghiệm thu 10/2026']
    ]
  }
];

// ======================================================================================
// HÀM CHÍNH: TỰ ĐỘNG ĐỒNG BỘ TOÀN DIỆN
// ======================================================================================
function dongBoCauTrucGoogleSheets() {
  Logger.log('🚀 BẮT ĐẦU ĐỒNG BỘ CẤU TRÚC TEMPLATE CHUẨN LÊN GOOGLE DRIVE...');
  Logger.log('👉 ĐÃ BỎ SHEET "Doanh thu" & THIẾT LẬP SẴN MẪU NHẬP LIỆU CHO 6 ĐƠN VỊ.\n');
  
  const baoCao = [];

  for (let i = 0; i < DANH_SACH_DON_VI.length; i++) {
    const donVi = DANH_SACH_DON_VI[i];
    Logger.log('==================================================');
    Logger.log('🏢 ĐƠN VỊ: ' + donVi.name + ' (' + donVi.code + ') - ID: ' + donVi.id);

    try {
      const ss = SpreadsheetApp.openById(donVi.id);
      let soSheetXoa = 0;
      let soSheetThemMoi = 0;
      let soCotThemMoi = 0;

      // --------------------------------------------------------------------------------
      // BƯỚC 1: XÓA BỎ HOÀN TOÀN SHEET "Doanh thu" CŨ NẾU CÒN TỒN TẠI
      // --------------------------------------------------------------------------------
      const allSheets = ss.getSheets();
      for (let s = 0; s < allSheets.length; s++) {
        const sName = allSheets[s].getName().trim();
        const sLower = sName.toLowerCase();
        if (sLower === 'doanh thu' || sLower === 'doanh_thu' || sLower === '2. doanh thu' || sLower === 'bao_cao_thang') {
          // Chỉ xóa nếu file còn nhiều hơn 1 sheet
          if (ss.getSheets().length > 1) {
            ss.deleteSheet(allSheets[s]);
            soSheetXoa++;
            Logger.log('  🗑️ ĐÃ XÓA SHEET CŨ KHÔNG DÙNG: "' + sName + '"');
          }
        }
      }

      // --------------------------------------------------------------------------------
      // BƯỚC 2: TỰ ĐỘNG TẠO HOẶC CHUẨN HÓA CÁC SHEET THEO CẤU TRÚC CHUẨN
      // --------------------------------------------------------------------------------
      for (let s = 0; s < CAU_TRUC_TEMPLATE.length; s++) {
        const item = CAU_TRUC_TEMPLATE[s];
        
        // Tìm sheet hiện có (hỗ trợ tìm cả biến thể tên tab)
        let sheet = ss.getSheetByName(item.name);
        if (!sheet && item.isDeptSheet) {
          // Tìm các biến thể tên tab 7/8 phòng ban
          const deptVariants = ['DOANH SỐ VÀ LÃI GỘP', 'Doanh Số lãi Gộp', 'Doanh Số và Lãi Gộp', 'Doanh Số lãi gộp ', 'Doanh số lãi gộp'];
          for (let v = 0; v < deptVariants.length; v++) {
            const found = ss.getSheetByName(deptVariants[v]);
            if (found) {
              sheet = found;
              // Chuẩn hóa lại tên tab cho đồng nhất
              sheet.setName('DOANH SỐ VÀ LÃI GỘP');
              Logger.log('  🔄 Đã đổi tên chuẩn tab: "' + deptVariants[v] + '" -> "DOANH SỐ VÀ LÃI GỘP"');
              break;
            }
          }
        }

        // 1. NẾU SHEET CHƯA TỒN TẠI -> TẠO MỚI VÀ ĐIỀN ĐẦY ĐỦ FORM MẪU
        if (!sheet) {
          sheet = ss.insertSheet(item.name);
          soSheetThemMoi++;
          Logger.log('  ➕ Đã tạo Sheet mới: ' + item.name);

          // Trường hợp 1a: Sheet "DOANH SỐ VÀ LÃI GỘP" -> Điền sẵn 8 phòng ban và công thức
          if (item.isDeptSheet) {
            taoNoiDungDoanhSoLaiGop(sheet, donVi.code);
          } else {
            // Trường hợp 1b: Các sheet nghiệp vụ khác -> Điền Header và dữ liệu mẫu
            sheet.getRange(1, 1, 1, item.headers.length).setValues([item.headers]);
            dinhDangHeader(sheet, item.headers.length);

            if (item.sample && item.sample.length > 0) {
              const sampleRows = JSON.parse(JSON.stringify(item.sample));
              // Gán tên đơn vị vào cột tương ứng nếu có
              for (let r = 0; r < sampleRows.length; r++) {
                if (sampleRows[r].length > 1 && sampleRows[r][1] === '') {
                  sampleRows[r][1] = donVi.name;
                }
                if (sampleRows[r].length > 4 && sampleRows[r][4] === '') {
                  sampleRows[r][4] = donVi.name;
                }
              }
              sheet.getRange(2, 1, sampleRows.length, sampleRows[0].length).setValues(sampleRows);
            }
            dinhDangSheetThuong(sheet, item.headers.length);
          }
          continue;
        }

        // 2. NẾU SHEET ĐÃ TỒN TẠI -> KIỂM TRA BẢO TOÀN DỮ LIỆU & BỔ SUNG CỘT CÒN THIẾU
        if (item.isDeptSheet) {
          // Đảm bảo dòng 1 đúng header 16 cột
          sheet.getRange(1, 1, 1, HEADERS_7DEPT.length).setValues([HEADERS_7DEPT]);
          dinhDangHeader(sheet, HEADERS_7DEPT.length);

          // Nếu sheet chỉ có 1 dòng header (chưa có dòng dữ liệu nào) -> chèn form 8 phòng ban
          if (sheet.getLastRow() <= 1) {
            taoNoiDungDoanhSoLaiGop(sheet, donVi.code);
            Logger.log('  📝 Đã điền form 8 phòng ban vào sheet DOANH SỐ VÀ LÃI GỘP trống.');
          }
        } else {
          // Kiểm tra header các sheet thường
          const lastCol = Math.max(sheet.getLastColumn(), 1);
          const currentHeaders = sheet.getRange(1, 1, 1, lastCol).getValues()[0].map(h => (h || '').toString().trim());

          for (let c = 0; c < item.headers.length; c++) {
            const hName = item.headers[c];
            if (!currentHeaders.includes(hName)) {
              const newCol = sheet.getLastColumn() + 1;
              sheet.getRange(1, newCol).setValue(hName);
              sheet.getRange(1, newCol).setBackground('#1a365d').setFontColor('#ffffff').setFontWeight('bold');
              soCotThemMoi++;
              Logger.log('  ➕ [' + item.name + '] Đã thêm cột: "' + hName + '"');
            }
          }
        }
      }

      baoCao.push({
        donVi: donVi.name,
        code: donVi.code,
        trangThai: 'Thành công',
        sheetXoa: soSheetXoa,
        sheetMoi: soSheetThemMoi,
        cotMoi: soCotThemMoi,
        url: ss.getUrl()
      });
      Logger.log('✅ HOÀN TẤT ĐƠN VỊ ' + donVi.name + ' (Xóa ' + soSheetXoa + ' tab cũ, thêm ' + soSheetThemMoi + ' tab mới).\n');

    } catch (err) {
      Logger.log('❌ Lỗi đơn vị ' + donVi.name + ': ' + err.toString() + '\n');
      baoCao.push({
        donVi: donVi.name,
        code: donVi.code,
        trangThai: 'Lỗi: ' + err.toString()
      });
    }
  }

  Logger.log('==================================================');
  Logger.log('🎉 TỔNG KẾT QUÁ TRÌNH ĐỒNG BỘ:');
  Logger.log(JSON.stringify(baoCao, null, 2));
  Logger.log('==================================================');
  return baoCao;
}

// --------------------------------------------------------------------------------------
// HÀM TỰ ĐỘNG ĐIỀN FORM 8 PHÒNG BAN VÀO TAB "DOANH SỐ VÀ LÃI GỘP"
// --------------------------------------------------------------------------------------
function taoNoiDungDoanhSoLaiGop(sheet, compCode) {
  // 1. Dòng Header
  sheet.getRange(1, 1, 1, HEADERS_7DEPT.length).setValues([HEADERS_7DEPT]);
  dinhDangHeader(sheet, HEADERS_7DEPT.length);

  // 2. Lấy danh sách mảng con riêng của đơn vị
  const subList = MANG_CON_THEO_DON_VI[compCode] || [];
  const rows = [];

  for (let i = 0; i < subList.length; i++) {
    const item = subList[i];
    const r = i + 2; // Dòng dữ liệu bắt đầu từ dòng 2
    rows.push([
      item.num,
      item.name,
      item.ds_m > 0 ? item.ds_m : '',
      item.ds_m > 0 ? item.ds_m : '',
      '=IF(C' + r + '=0,"-",D' + r + '/C' + r + ')',
      item.lg_m > 0 ? item.lg_m : '',
      item.lg_m > 0 ? item.lg_m : '',
      '=IF(F' + r + '=0,"-",G' + r + '/F' + r + ')',
      '=IF(D' + r + '=0,"-",G' + r + '/D' + r + ')',
      item.ds_y > 0 ? item.ds_y : '',
      item.ds_y > 0 ? Math.round(item.ds_y * 0.7) : '',
      '=IF(J' + r + '=0,"-",K' + r + '/J' + r + ')',
      item.lg_y > 0 ? item.lg_y : '',
      item.lg_y > 0 ? Math.round(item.lg_y * 0.7) : '',
      '=IF(M' + r + '=0,"-",N' + r + '/M' + r + ')',
      item.desc
    ]);
  }

  // 3. Dòng TỔNG CỘNG tự tính
  const totR = subList.length + 2;
  rows.push([
    '',
    'TỔNG CỘNG (8 MẢNG KINH DOANH)',
    '=SUMIF(A2:A' + (totR-1) + ',"<>",C2:C' + (totR-1) + ')',
    '=SUMIF(A2:A' + (totR-1) + ',"<>",D2:D' + (totR-1) + ')',
    '=IF(C' + totR + '=0,"-",D' + totR + '/C' + totR + ')',
    '=SUMIF(A2:A' + (totR-1) + ',"<>",F2:F' + (totR-1) + ')',
    '=SUMIF(A2:A' + (totR-1) + ',"<>",G2:G' + (totR-1) + ')',
    '=IF(F' + totR + '=0,"-",G' + totR + '/F' + totR + ')',
    '=IF(D' + totR + '=0,"-",G' + totR + '/D' + totR + ')',
    '=SUMIF(A2:A' + (totR-1) + ',"<>",J2:J' + (totR-1) + ')',
    '=SUMIF(A2:A' + (totR-1) + ',"<>",K2:K' + (totR-1) + ')',
    '=IF(J' + totR + '=0,"-",K' + totR + '/J' + totR + ')',
    '=SUMIF(A2:A' + (totR-1) + ',"<>",M2:M' + (totR-1) + ')',
    '=SUMIF(A2:A' + (totR-1) + ',"<>",N2:N' + (totR-1) + ')',
    '=IF(M' + totR + '=0,"-",N' + totR + '/M' + totR + ')',
    'Tổng hợp tự động 8 phòng ban'
  ]);

  if (rows.length > 0) {
    sheet.getRange(2, 1, rows.length, HEADERS_7DEPT.length).setValues(rows);

    // Định dạng số và công thức
    const dataRange = sheet.getRange(2, 1, rows.length, HEADERS_7DEPT.length);
    dataRange.setFontFamily('Arial').setFontSize(10);

    // Định dạng các dòng phòng ban chính (in đậm và nền xám nhạt)
    for (let i = 0; i < subList.length; i++) {
      if (subList[i].num !== '') {
        sheet.getRange(i + 2, 1, 1, HEADERS_7DEPT.length).setFontWeight('bold').setBackground('#f8fafc');
      }
    }

    // Dòng tổng cộng màu nổi bật
    const totalRange = sheet.getRange(totR, 1, 1, HEADERS_7DEPT.length);
    totalRange.setFontWeight('bold').setBackground('#fef3c7').setFontColor('#92400e');

    // Căn chỉnh cột số tiền & tỷ lệ %
    sheet.getRange(2, 3, rows.length, 2).setNumberFormat('#,##0');
    sheet.getRange(2, 5, rows.length, 1).setNumberFormat('0.0%');
    sheet.getRange(2, 6, rows.length, 2).setNumberFormat('#,##0');
    sheet.getRange(2, 8, rows.length, 2).setNumberFormat('0.0%');
    sheet.getRange(2, 10, rows.length, 2).setNumberFormat('#,##0');
    sheet.getRange(2, 12, rows.length, 1).setNumberFormat('0.0%');
    sheet.getRange(2, 13, rows.length, 2).setNumberFormat('#,##0');
    sheet.getRange(2, 15, rows.length, 1).setNumberFormat('0.0%');
  }

  // Tự động giãn cột
  for (let c = 1; c <= HEADERS_7DEPT.length; c++) {
    sheet.autoResizeColumn(c);
  }
}

// --------------------------------------------------------------------------------------
// HÀM ĐỊNH DẠNG HEADER CHUẨN VPS NAVY
// --------------------------------------------------------------------------------------
function dinhDangHeader(sheet, colCount) {
  const range = sheet.getRange(1, 1, 1, colCount);
  range.setBackground('#1a365d'); // Xanh Navy Tập đoàn VPS
  range.setFontColor('#ffffff');
  range.setFontWeight('bold');
  range.setFontFamily('Arial');
  range.setFontSize(10);
  range.setHorizontalAlignment('center');
  range.setVerticalAlignment('middle');
  range.setWrap(true);
  sheet.setFrozenRows(1);
}

// --------------------------------------------------------------------------------------
// HÀM ĐỊNH DẠNG CÁC SHEET THƯỜNG
// --------------------------------------------------------------------------------------
function dinhDangSheetThuong(sheet, colCount) {
  for (let c = 1; c <= colCount; c++) {
    sheet.autoResizeColumn(c);
  }
}

// ======================================================================================
// HỖ TRỢ GỌI TỰ ĐỘNG TỪ XA QUA WEBHOOK GET/POST
// ======================================================================================
function doGet(e) {
  const result = dongBoCauTrucGoogleSheets();
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    message: 'Đã hoàn tất đồng bộ cấu trúc template VPS (Đã bỏ sheet Doanh thu)!',
    data: result
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  return doGet(e);
}
