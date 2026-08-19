// GAS Script Generator
const fs = require('fs');

const gasCode = 
// =========================================================================
// ROBOT TỰ ĐỘNG ĐỌC BÁO CÁO TỪ EMAIL VÀ CẬP NHẬT GOOGLE SHEETS
// =========================================================================

// ID của file Google Sheets Tổng (Bạn cần thay bằng ID thật của file Sheet của bạn)
const MASTER_SHEET_ID = 'THAY_BANG_ID_CUA_FILE_GOOGLE_SHEETS_TONG';

function processBaoCaoEmails() {
  // Tìm các email chưa đọc có tiêu đề chứa chữ "Báo cáo VPS" và có file đính kèm
  var threads = GmailApp.search('subject:"Báo cáo VPS" has:attachment is:unread');
  
  if (threads.length === 0) {
    Logger.log('Không có báo cáo mới.');
    return;
  }
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      
      if (message.isUnread()) {
        var attachments = message.getAttachments();
        
        for (var k = 0; k < attachments.length; k++) {
          var attachment = attachments[k];
          
          // Chỉ xử lý file Excel
          if (attachment.getName().indexOf('.xlsx') !== -1) {
            Logger.log('Đang xử lý file: ' + attachment.getName());
            
            try {
              // 1. Chuyển đổi Excel thành Google Sheet tạm thời để đọc dữ liệu
              var blob = attachment.copyBlob();
              var fileMetadata = {
                title: attachment.getName(),
                mimeType: MimeType.GOOGLE_SHEETS
              };
              // YÊU CẦU: Phải bật "Drive API" trong phần Services của Apps Script
              var convertedFile = Drive.Files.insert(fileMetadata, blob, {convert: true});
              var tempSheetId = convertedFile.id;
              
              // 2. Đọc dữ liệu từ file tạm
              var tempSpreadsheet = SpreadsheetApp.openById(tempSheetId);
              
              // Ở đây ta có thể bóc tách dữ liệu từng Sheet (Doanh thu, Công nợ, Khách hàng, v.v.)
              // Để hệ thống chạy trơn tru, ta sẽ sao chép toàn bộ dữ liệu này vào Sheet Tổng.
              updateMasterSheet(tempSpreadsheet);
              
              // 3. Xóa file tạm đi cho đỡ rác
              Drive.Files.trash(tempSheetId);
              
              // 4. Phản hồi Email thành công
              message.reply('Hệ thống Robot VPS đã nhận được báo cáo: ' + attachment.getName() + '\\n\\nDữ liệu của bạn đã được cập nhật tự động lên Dashboard thành công! Cảm ơn bạn.');
              
            } catch (error) {
              Logger.log('Lỗi khi xử lý file: ' + error.toString());
              message.reply('Hệ thống Robot VPS gặp lỗi khi đọc file của bạn: ' + attachment.getName() + '\\n\\nVui lòng đảm bảo bạn sử dụng đúng Template chuẩn và thử gửi lại.');
            }
          }
        }
        // Đánh dấu đã đọc để lần sau không xử lý lại
        message.markRead();
      }
    }
  }
}

function updateMasterSheet(tempSpreadsheet) {
  var masterSpreadsheet = SpreadsheetApp.openById(MASTER_SHEET_ID);
  
  // Danh sách các Sheet cần đồng bộ
  var sheetNames = ['Doanh thu', 'Công nợ', 'Khách hàng', 'Tồn kho', 'Nhân sự'];
  
  for (var i = 0; i < sheetNames.length; i++) {
    var sheetName = sheetNames[i];
    var tempSheet = tempSpreadsheet.getSheetByName(sheetName);
    var masterSheet = masterSpreadsheet.getSheetByName(sheetName);
    
    if (tempSheet && masterSheet) {
      // Lấy toàn bộ dữ liệu từ file của Đơn vị
      var data = tempSheet.getDataRange().getValues();
      
      // Xóa dữ liệu cũ trên Master Sheet và đắp dữ liệu mới vào
      // (Trong thực tế, ta có thể viết logic gộp dữ liệu các công ty với nhau tại đây)
      // Hiện tại ta sẽ ghi đè để demo luồng
      masterSheet.clearContents();
      masterSheet.getRange(1, 1, data.length, data[0].length).setValues(data);
    }
  }
}
;

fs.writeFileSync('C:/Users/Hp/.gemini/antigravity/brain/c2c07afe-a201-42e1-b52e-07538b848a35/GoogleAppsScript_Robot.md', 
  '# Mã Code Robot Google Apps Script\n\n`javascript\n' + gasCode + '\n`');
console.log('Artifact created');
