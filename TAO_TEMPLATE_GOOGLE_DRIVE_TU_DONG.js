/**
 * =========================================================================
 * TẬP ĐOÀN VPS - TỰ ĐỘNG TẠO 5 FILE BÁO CÁO GOOGLE SHEETS CHO 5 ĐƠN VỊ
 * =========================================================================
 * 5 Đơn vị: Tân Hồng Hà, Công ty Việt, Xem Sơn, VPS Miền Trung, ITSS
 * =========================================================================
 */

// Hàm mặc định của Google Apps Script (Người dùng chỉ cần bấm nút "Chạy" ▶ là tự chạy ngay!)
function myFunction() {
  taoHeThongBieuMau5DonViVPS();
}

function taoHeThongBieuMau5DonViVPS() {
  const danhSachDonVi = [
    { code: 'THH',    name: 'Tân Hồng Hà' },
    { code: 'Viet',   name: 'Công ty Việt' },
    { code: 'XemSon', name: 'Xem Sơn' },
    { code: 'VPSM',   name: 'VPS Miền Trung' },
    { code: 'ITSS',   name: 'Công ty ITSS' },
    { code: 'VPVPS',  name: 'Văn phòng VPS' }
  ];

  const danhSachSheets = [
    {
      name: '00_Huong_Dan',
      headers: ['NỘI DUNG HƯỚNG DẪN QUY ĐỊNH NHẬP LIỆU BÁO CÁO VPS (CHUẨN HÓA 8 MẢNG)'],
      sample: [
        ['1. Vui lòng nhập số liệu trực tiếp vào sheet "DOANH SỐ VÀ LÃI GỘP" và các sheet tương ứng bên dưới.'],
        ['2. Báo cáo Doanh thu cũ đã được gỡ bỏ hoàn toàn, không cần nhập lại.'],
        ['3. Đơn vị tính: Triệu VNĐ (hoặc VNĐ tùy quy định từng Sheet).'],
        ['4. Các cột % Đạt và % Lãi gộp đã cài sẵn công thức tự động, vui lòng không xóa.'],
        ['5. Định dạng tháng: MM/YYYY (Ví dụ: 08/2026, 09/2026).']
      ]
    },
    {
      name: 'DOANH SỐ VÀ LÃI GỘP',
      headers: [
        'STT', 'PHÒNG BAN / MẢNG KINH DOANH', 'DS KH THÁNG', 'DS TH THÁNG', '% ĐẠT DS THÁNG',
        'LG KH THÁNG', 'LG TH THÁNG', '% ĐẠT LG THÁNG', '% LG THÁNG',
        'DS KH NĂM', 'DS TH NĂM (LK)', '% ĐẠT DS NĂM', 'LG KH NĂM', 'LG TH NĂM (LK)', '% ĐẠT LG NĂM', 'GHI CHÚ'
      ],
      sample: [
        ['1', 'Kinh doanh phân phối', '5000', '5200', '=IF(C3=0,"-",D3/C3)', '500', '580', '=IF(F3=0,"-",G3/F3)', '=IF(D3=0,"-",G3/D3)', '60000', '45000', '=IF(J3=0,"-",K3/J3)', '6000', '5000', '=IF(M3=0,"-",N3/M3)', 'Bán buôn máy, linh kiện, KD sỉ'],
        ['', '  - [Đơn vị] Mảng phân phối / bán buôn', '5000', '5200', '=IF(C4=0,"-",D4/C4)', '500', '580', '=IF(F4=0,"-",G4/F4)', '=IF(D4=0,"-",G4/D4)', '60000', '45000', '=IF(J4=0,"-",K4/J4)', '6000', '5000', '=IF(M4=0,"-",N4/M4)', 'Phân phối đại lý'],
        ['2', 'Thuê Máy', '1500', '1620', '=IF(C5=0,"-",D5/C5)', '600', '680', '=IF(F5=0,"-",G5/F5)', '=IF(D5=0,"-",G5/D5)', '18000', '13500', '=IF(J5=0,"-",K5/J5)', '7200', '5600', '=IF(M5=0,"-",N5/M5)', 'Thuê máy kỹ thuật & KD thuê máy'],
        ['', '  - [Đơn vị] Hợp đồng thuê máy', '1500', '1620', '=IF(C6=0,"-",D6/C6)', '600', '680', '=IF(F6=0,"-",G6/F6)', '=IF(D6=0,"-",G6/D6)', '18000', '13500', '=IF(J6=0,"-",K6/J6)', '7200', '5600', '=IF(M6=0,"-",N6/M6)', 'Thuê máy photocopy'],
        ['3', 'Dịch Vụ', '1200', '1300', '=IF(C7=0,"-",D7/C7)', '450', '510', '=IF(F7=0,"-",G7/F7)', '=IF(D7=0,"-",G7/D7)', '14000', '10500', '=IF(J7=0,"-",K7/J7)', '5200', '4100', '=IF(M7=0,"-",N7/M7)', 'DVKT, Tổ dịch vụ, mực in, metercharge'],
        ['', '  - [Đơn vị] Dịch vụ sửa chữa & mực in', '1200', '1300', '=IF(C8=0,"-",D8/C8)', '450', '510', '=IF(F8=0,"-",G8/F8)', '=IF(D8=0,"-",G8/D8)', '14000', '10500', '=IF(J8=0,"-",K8/J8)', '5200', '4100', '=IF(M8=0,"-",N8/M8)', 'Sửa chữa và mực in'],
        ['4', 'Kinh doanh online', '800', '850', '=IF(C9=0,"-",D9/C9)', '80', '95', '=IF(F9=0,"-",G9/F9)', '=IF(D9=0,"-",G9/D9)', '9600', '7200', '=IF(J9=0,"-",K9/J9)', '960', '750', '=IF(M9=0,"-",N9/M9)', 'E-commerce, Shopee-Online, trực tuyến'],
        ['', '  - [Đơn vị] Kênh bán trực tuyến / TMĐT', '800', '850', '=IF(C10=0,"-",D10/C10)', '80', '95', '=IF(F10=0,"-",G10/F10)', '=IF(D10=0,"-",G10/D10)', '9600', '7200', '=IF(J10=0,"-",K10/J10)', '960', '750', '=IF(M10=0,"-",N10/M10)', 'Bán hàng trực tuyến'],
        ['5', 'Dự án', '2000', '2100', '=IF(C11=0,"-",D11/C11)', '800', '850', '=IF(F11=0,"-",G11/F11)', '=IF(D11=0,"-",G11/D11)', '24000', '18000', '=IF(J11=0,"-",K11/J11)', '9600', '7500', '=IF(M11=0,"-",N11/M11)', 'Dự án văn phòng, CNTT, thiết bị'],
        ['', '  - [Đơn vị] Gói thầu thiết bị & dự án', '2000', '2100', '=IF(C12=0,"-",D12/C12)', '800', '850', '=IF(F12=0,"-",G12/F12)', '=IF(D12=0,"-",G12/D12)', '24000', '18000', '=IF(J12=0,"-",K12/J12)', '9600', '7500', '=IF(M12=0,"-",N12/M12)', 'Đấu thầu thiết bị'],
        ['6', 'Kinh doanh tổng hợp', '1000', '1050', '=IF(C13=0,"-",D13/C13)', '100', '110', '=IF(F13=0,"-",G13/F13)', '=IF(D13=0,"-",G13/D13)', '12000', '9000', '=IF(J13=0,"-",K13/J13)', '1200', '950', '=IF(M13=0,"-",N13/M13)', 'Kinh doanh tổng hợp thương mại'],
        ['', '  - [Đơn vị] Kinh doanh tổng hợp', '1000', '1050', '=IF(C14=0,"-",D14/C14)', '100', '110', '=IF(F14=0,"-",G14/F14)', '=IF(D14=0,"-",G14/D14)', '12000', '9000', '=IF(J14=0,"-",K14/J14)', '1200', '950', '=IF(M14=0,"-",N14/M14)', 'Thương mại tổng hợp'],
        ['7', 'Kinh doanh lẻ', '300', '320', '=IF(C15=0,"-",D15/C15)', '60', '70', '=IF(F15=0,"-",G15/F15)', '=IF(D15=0,"-",G15/D15)', '3600', '2700', '=IF(J15=0,"-",K15/J15)', '720', '580', '=IF(M15=0,"-",N15/M15)', 'Cửa hàng, bán máy lẻ, showroom'],
        ['', '  - [Đơn vị] Showroom bán lẻ', '300', '320', '=IF(C16=0,"-",D16/C16)', '60', '70', '=IF(F16=0,"-",G16/F16)', '=IF(D16=0,"-",G16/D16)', '3600', '2700', '=IF(J16=0,"-",K16/J16)', '720', '580', '=IF(M16=0,"-",N16/M16)', 'Điểm bán lẻ'],
        ['8', 'Kinh doanh khác', '200', '210', '=IF(C17=0,"-",D17/C17)', '30', '35', '=IF(F17=0,"-",G17/F17)', '=IF(D17=0,"-",G17/D17)', '2400', '1800', '=IF(J17=0,"-",K17/J17)', '360', '290', '=IF(M17=0,"-",N17/M17)', 'Bán nội bộ, thương mại khác, xuất khẩu'],
        ['', '  - [Đơn vị] Hoạt động khác', '200', '210', '=IF(C18=0,"-",D18/C18)', '30', '35', '=IF(F18=0,"-",G18/F18)', '=IF(D18=0,"-",G18/D18)', '2400', '1800', '=IF(J18=0,"-",K18/J18)', '360', '290', '=IF(M18=0,"-",N18/M18)', 'Nội bộ và xuất khẩu'],
        ['', 'TỔNG CỘNG (8 MẢNG KINH DOANH)', '=SUMIF(A3:A18,"<>",C3:C18)', '=SUMIF(A3:A18,"<>",D3:D18)', '=IF(C19=0,"-",D19/C19)', '=SUMIF(A3:A18,"<>",F3:F18)', '=SUMIF(A3:A18,"<>",G3:G18)', '=IF(F19=0,"-",G19/F19)', '=IF(D19=0,"-",G19/D19)', '=SUMIF(A3:A18,"<>",J3:J18)', '=SUMIF(A3:A18,"<>",K3:K18)', '=IF(J19=0,"-",K19/J19)', '=SUMIF(A3:A18,"<>",M3:M18)', '=SUMIF(A3:A18,"<>",N3:N18)', '=IF(M19=0,"-",N19/M19)', 'Tổng hợp 8 phòng ban']
      ]
    },
    {
      name: 'Công nợ',
      headers: ['Tháng/Năm', 'Đơn vị', 'Nợ trong hạn (VNĐ)', 'Nợ quá hạn (VNĐ)', 'Nợ khó đòi (VNĐ)', 'Tỷ lệ nợ quá hạn (%)', 'Ghi chú'],
      sample: [['09/2026', '', '12000000000', '1500000000', '100000000', '=D2/(C2+D2+E2)', 'Công nợ tháng']]
    },
    {
      name: 'Khách hàng',
      headers: ['Tháng/Năm', 'Mảng kinh doanh', 'Nhóm phân loại', 'Đầu kỳ (Máy)', 'Đầu kỳ (KH)', 'Tăng trong kỳ (Máy)', 'Tăng trong kỳ (KH)', 'Giảm trong kỳ (Máy)', 'Giảm trong kỳ (KH)', 'Cuối kỳ (Máy)', 'Cuối kỳ (KH)'],
      sample: [
        ['09/2026', 'Thuê máy', 'Thuê máy', '', '', '', '', '', '', '', ''],
        ['09/2026', 'MC', 'MC', '', '', '', '', '', '', '', ''],
        ['09/2026', 'Dịch vụ - Photo', 'Dịch vụ - Photo', '', '', '', '', '', '', '', ''],
        ['09/2026', 'Dịch vụ - Máy in', 'Dịch vụ - Máy in', '', '', '', '', '', '', '', ''],
        ['09/2026', 'Phân phối (Đại lý)', 'Phân phối (Đại lý)', '', '', '', '', '', '', '', '']
      ]
    },
    {
      name: 'Tồn kho',
      headers: ['Tháng/Năm', 'Mã vật tư/thiết bị', 'Tên sản phẩm', 'Đơn vị tính', 'Nhóm hàng', 'Số lượng tồn', 'Giá trị tồn kho (VNĐ)', 'Tình trạng'],
      sample: [['09/2026', '', '', '', '', '', '', '']]
    },
    {
      name: 'Nhân sự',
      headers: ['Tháng/Năm', 'STT', 'Phòng ban / Bộ phận', 'Định biên được giao', 'Tuyển mới trong kỳ', 'Nghỉ việc trong kỳ', 'Đang thử việc', 'Tổng nhân sự cuối kỳ'],
      sample: [
        ['09/2026', '1', 'Ban Giám đốc', '', '', '', '', ''],
        ['09/2026', '2', 'Phòng Kinh doanh', '', '', '', '', ''],
        ['09/2026', '3', 'Phòng Kỹ thuật & Dịch vụ', '', '', '', '', ''],
        ['09/2026', '4', 'Phòng Kế toán', '', '', '', '', ''],
        ['09/2026', '5', 'Phòng Hành chính Nhân sự', '', '', '', '', '']
      ]
    },
    {
      name: 'Sản Phẩm',
      headers: ['Tháng/Năm', 'Hãng / Nhóm sản phẩm', 'Doanh số Kế hoạch (VNĐ)', 'Doanh số Thực tế (VNĐ)', 'Tỷ lệ hoàn thành (%)', 'Lãi gộp (VNĐ)'],
      sample: [
        ['09/2026', 'HP', '', '', '', ''],
        ['09/2026', 'Fujifilm', '', '', '', ''],
        ['09/2026', 'Khác', '', '', '', '']
      ]
    },
    {
      name: 'Chi Phí',
      headers: ['Tháng/Năm', 'Mã chi phí', 'Tên khoản mục chi phí', 'Phân loại (Cố định/Biến đổi)', 'Kế hoạch (VNĐ)', 'Thực tế phát sinh (VNĐ)', 'Bộ phận sử dụng'],
      sample: [['09/2026', '', '', '', '', '', '']]
    },
    {
      name: 'ISO',
      headers: ['STT', 'Mã quy trình', 'Tên quy trình / Quy định', 'Phiên bản', 'Ngày ban hành', 'Phạm vi áp dụng', 'Tình trạng áp dụng'],
      sample: [['1', '', '', '', '', '', '']]
    },
    {
      name: 'Đào tạo',
      headers: ['Tháng/Năm', 'Nội dung đào tạo', 'Đối tượng tham gia', 'Kế hoạch số người', 'Thực tế hoàn thành', 'Tỷ lệ đạt (%)', 'Đánh giá kết quả'],
      sample: [['09/2026', '', '', '', '', '', '']]
    },
    {
      name: 'Dịch vụ tận tâm',
      headers: ['Tháng/Năm', 'Mã NV', 'Họ và tên Kỹ thuật viên', 'Chức danh', 'Đơn vị', 'Tổng lượt việc', 'Lượt đúng hẹn', 'Lượt bảo hành lại', 'Điểm CSAT trung bình'],
      sample: [['09/2026', '', '', '', '', '', '', '', '']]
    },
    {
      name: 'Văn hóa doanh nghiệp',
      headers: ['Tháng/Năm', 'Mã NV', 'Họ và tên', 'Phòng ban / Bộ phận', 'Đã Quy Y (Có/Chưa)', 'Nơi / Ngày Quy Y', 'Tín chỉ văn hóa (0-3)', 'Ghi chú'],
      sample: [['09/2026', '', '', '', '', '', '', '']]
    },
    {
      name: 'Thương hiệu',
      headers: ['Tháng/Năm', 'STT', 'Chỉ tiêu thương hiệu / Marketing', 'Kế hoạch', 'Thực hiện', 'Tỷ lệ hoàn thành (%)', 'Đánh giá'],
      sample: [
        ['09/2026', '1', 'Tỷ lệ thị phần khu vực (%)', '', '', '', ''],
        ['09/2026', '2', 'Doanh số đóng góp trực tiếp từ nhận diện (VNĐ)', '', '', '', ''],
        ['09/2026', '3', 'Tỷ lệ khách hàng nhận biết và hài lòng (%)', '', '', '', '']
      ]
    },
    {
      name: 'Dự án & KH Dự án',
      headers: ['Tháng/Năm', 'Tên Dự án / Gói thầu', 'Tên Khách hàng / Chi nhánh', 'Quy mô thiết bị (Máy)', 'Doanh số dự kiến (VNĐ)', 'Tiến độ thực hiện', 'Ghi chú'],
      sample: [['09/2026', '', '', '', '', '', '']]
    }
  ];

  // 1. Tạo thư mục mẹ trên Google Drive
  const rootFolderName = 'TẬP ĐOÀN VPS - BÁO CÁO 5 ĐƠN VỊ';
  let rootFolder;
  const folders = DriveApp.getFoldersByName(rootFolderName);
  if (folders.hasNext()) {
    rootFolder = folders.next();
  } else {
    rootFolder = DriveApp.createFolder(rootFolderName);
  }

  try {
    rootFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
  } catch (e) {}

  Logger.log('==================================================');
  Logger.log('📁 THƯ MỤC TỔNG TRÊN GOOGLE DRIVE: ' + rootFolder.getUrl());
  Logger.log('==================================================\n');

  // 2. Tạo 5 file Google Sheets cho 5 đơn vị
  for (let i = 0; i < danhSachDonVi.length; i++) {
    const donVi = danhSachDonVi[i];
    
    let donViFolder;
    const subFolders = rootFolder.getFoldersByName(donVi.name);
    if (subFolders.hasNext()) {
      donViFolder = subFolders.next();
    } else {
      donViFolder = rootFolder.createFolder(donVi.name);
    }

    try {
      donViFolder.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    } catch(e) {}

    const fileName = 'Báo Cáo VPS - ' + donVi.name;
    const ss = SpreadsheetApp.create(fileName);
    const ssFile = DriveApp.getFileById(ss.getId());
    
    // Di chuyển file vào thư mục đơn vị và tự động mở quyền truy cập
    ssFile.moveTo(donViFolder);
    try {
      ssFile.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.EDIT);
    } catch (e) {}

    // Xây dựng các tab theo chuẩn
    const defaultSheet = ss.getActiveSheet();

    for (let s = 0; s < danhSachSheets.length; s++) {
      const sheetInfo = danhSachSheets[s];
      let sheet;
      if (s === 0) {
        sheet = defaultSheet;
        sheet.setName(sheetInfo.name);
      } else {
        sheet = ss.insertSheet(sheetInfo.name);
      }

      // Tiêu đề cột
      sheet.getRange(1, 1, 1, sheetInfo.headers.length).setValues([sheetInfo.headers]);
      const headerRange = sheet.getRange(1, 1, 1, sheetInfo.headers.length);
      headerRange.setBackground('#1a365d'); // Xanh Navy
      headerRange.setFontColor('#ffffff');
      headerRange.setFontWeight('bold');
      headerRange.setHorizontalAlignment('center');

      // Điền dòng mẫu và gắn sẵn tên đơn vị
      if (sheetInfo.sample && sheetInfo.sample.length > 0) {
        const sampleData = JSON.parse(JSON.stringify(sheetInfo.sample));
        for (let r = 0; r < sampleData.length; r++) {
          if (sampleData[r].length > 1 && sampleData[r][1] === '') {
            sampleData[r][1] = donVi.name;
          }
        }
        sheet.getRange(2, 1, sampleData.length, sampleData[0].length).setValues(sampleData);
      }

      // Giãn độ rộng cột tự động
      for (let c = 1; c <= sheetInfo.headers.length; c++) {
        sheet.autoResizeColumn(c);
      }
    }

    Logger.log('✅ ' + (i + 1) + '. ĐƠN VỊ: ' + donVi.name);
    Logger.log('   📄 Link Sheet: ' + ss.getUrl());
    Logger.log('   📁 Thư mục:    ' + donViFolder.getUrl() + '\n');
  }

  Logger.log('==================================================');
  Logger.log('🎉 TẤT CẢ 5 ĐƠN VỊ ĐÃ ĐƯỢC TẠO HOÀN TẤT TRÊN GOOGLE DRIVE!');
  Logger.log('==================================================');
}
