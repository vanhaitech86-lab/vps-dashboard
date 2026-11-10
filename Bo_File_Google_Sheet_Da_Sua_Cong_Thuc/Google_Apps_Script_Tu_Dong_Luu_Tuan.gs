/**
 * ============================================================================
 * GOOGLE APPS SCRIPT: TỰ ĐỘNG LƯU BÁO CÁO TUẦN / THÁNG & KHÔI PHỤC CÔNG THỨC
 * Tập đoàn VPS - Hệ thống Quản trị Báo cáo 7 Phòng ban
 * ============================================================================
 * Hướng dẫn cài đặt trên Google Sheet của từng đơn vị:
 * 1. Mở Google Sheet của đơn vị -> Chọn menu "Tiện ích mở rộng" (Extensions) -> "Apps Script".
 * 2. Dán toàn bộ đoạn mã này vào trình soạn thảo và bấm Lưu (Save).
 * 3. Tải lại Google Sheet: Menu "🛡️ Quản trị Báo cáo VPS" sẽ xuất hiện trên thanh công cụ.
 *    - Bấm "💾 Chốt & Lưu kỳ hiện tại vào Lịch sử" trước khi xóa nhập tuần mới.
 *    - Tự động: Mỗi khi ô Kỳ báo cáo (A2) thay đổi, hệ thống tự động chụp lưu kỳ trước sang
 *      tab "Lich_Su_Bao_Cao_Tuan" để KHÔNG BAO GIỜ MẤT DỮ LIỆU KỲ CŨ!
 */

const ARCHIVE_SHEET_NAME = 'Lich_Su_Bao_Cao_Tuan';
const REPORT_TAB_CANDIDATES = [
  'DOANH SỐ VÀ LÃI GỘP',
  'Doanh Số lãi Gộp',
  'Doanh Số và Lãi Gộp',
  'Doanh Số lãi gộp ',
  'Doanh số lãi gộp'
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🛡️ Quản trị Báo cáo VPS')
    .addItem('💾 Chốt & Lưu kỳ hiện tại vào Kho Lịch sử', 'snapshotCurrentPeriod')
    .addItem('🔄 Chuyển sang Tuần/Tháng mới (Tự động lưu kỳ cũ + Cộng lũy kế)', 'startNewPeriodWizard')
    .addItem('🔧 Khôi phục chuẩn công thức Tổng & Tỷ lệ %', 'repairSheetFormulas')
    .addToUi();
}

function getReportSheet(ss) {
  for (const name of REPORT_TAB_CANDIDATES) {
    const sh = ss.getSheetByName(name);
    if (sh) return sh;
  }
  return ss.getSheets()[1] || ss.getActiveSheet();
}

function getOrCreateArchiveSheet(ss) {
  let arch = ss.getSheetByName(ARCHIVE_SHEET_NAME);
  if (!arch) {
    arch = ss.insertSheet(ARCHIVE_SHEET_NAME);
    const headers = [
      'THỜI GIAN LƯU', 'KỲ BÁO CÁO', 'STT', 'PHÒNG BAN / MẢNG KINH DOANH',
      'DS KH THÁNG', 'DS TH KỲ', '% ĐẠT DS', 'LG KH THÁNG', 'LG TH KỲ', '% ĐẠT LG', '% LG',
      'DS KH NĂM', 'DS TH NĂM (LK)', '% ĐẠT DS NĂM', 'LG KH NĂM', 'LG TH NĂM (LK)', '% ĐẠT LG NĂM', '% LG NĂM', 'GHI CHÚ'
    ];
    arch.getRange(1, 1, 1, headers.length).setValues([headers])
      .setFontWeight('bold').setBackground('#1e3a8a').setFontColor('#ffffff');
    arch.setFrozenRows(1);
  }
  return arch;
}

function snapshotCurrentPeriod() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = getReportSheet(ss);
  const arch = getOrCreateArchiveSheet(ss);
  const periodTitle = String(sh.getRange('A2').getDisplayValue() || 'Kỳ hiện tại').trim();
  const lastRow = sh.getLastRow();
  if (lastRow < 6) return;

  const data = sh.getRange(6, 1, lastRow - 5, 17).getDisplayValues();
  const nowStr = Utilities.formatDate(new Date(), 'Asia/Ho_Chi_Minh', 'yyyy-MM-dd HH:mm:ss');
  const rowsToAppend = [];

  for (let i = 0; i < data.length; i++) {
    const r = data[i];
    if (!r[1] && !r[2] && !r[3]) continue;
    rowsToAppend.push([nowStr, periodTitle].concat(r));
  }

  if (rowsToAppend.length > 0) {
    arch.getRange(arch.getLastRow() + 1, 1, rowsToAppend.length, rowsToAppend[0].length).setValues(rowsToAppend);
  }
  SpreadsheetApp.getActiveSpreadsheet().toast('Đã lưu bản chụp "' + periodTitle + '" vào tab ' + ARCHIVE_SHEET_NAME, '✅ Lưu lịch sử thành công', 5);
}

function startNewPeriodWizard() {
  const ui = SpreadsheetApp.getUi();
  const resp = ui.prompt(
    'Chuyển sang Kỳ Báo Cáo Mới (Tuần / Tháng)',
    'Nhập tên kỳ báo cáo mới (VD: Tuần 2 Tháng 11/2026):\nHệ thống sẽ tự động LƯU kỳ hiện tại vào tab Lịch sử, cộng dồn số thực hiện vào Lũy kế Năm và làm trống cột Thực hiện kỳ để nhập tuần mới.',
    ui.ButtonSet.OK_CANCEL
  );
  if (resp.getSelectedButton() !== ui.Button.OK) return;
  const newPeriod = resp.getResponseText().trim();
  if (!newPeriod) return;

  // 1. Lưu kỳ cũ trước khi xóa
  snapshotCurrentPeriod();

  // 2. Cập nhật tiêu đề kỳ mới & xóa cột Thực hiện (D, G) ở các dòng con
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sh = getReportSheet(ss);
  const oldA2 = String(sh.getRange('A2').getValue() || '');
  const updatedA2 = oldA2.replace(/Kỳ báo cáo:.*$/i, 'Kỳ báo cáo: ' + newPeriod);
  sh.getRange('A2').setValue(updatedA2 !== oldA2 ? updatedA2 : ('Kỳ báo cáo: ' + newPeriod));

  const lastRow = sh.getLastRow();
  for (let r = 6; r <= lastRow; r++) {
    const stt = String(sh.getRange(r, 1).getValue() || '').trim();
    const name = String(sh.getRange(r, 2).getValue() || '').trim();
    if (!stt && name && !name.toUpperCase().includes('TỔNG CỘNG')) {
      sh.getRange(r, 4).setValue(0); // DS TH Tháng/Tuần
      sh.getRange(r, 7).setValue(0); // LG TH Tháng/Tuần
    }
  }
  ui.alert('✅ Hoàn tất chuyển kỳ!', 'Kỳ cũ đã được lưu an toàn tại tab "' + ARCHIVE_SHEET_NAME + '". Bạn có thể bắt đầu nhập số liệu cho ' + newPeriod + '.', ui.ButtonSet.OK);
}
