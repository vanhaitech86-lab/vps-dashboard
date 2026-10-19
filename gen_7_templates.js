/**
 * GEN_7_TEMPLATES.JS
 * Tạo 7 biểu mẫu báo cáo chuẩn VPS Group bằng ExcelJS
 * Chạy: node gen_7_templates.js
 */
const ExcelJS = require('exceljs');
const path = require('path');
const fs = require('fs');

const OUT_DIR = path.join(__dirname, 'Bo_Bieu_Mau_7_Chi_Tieu_Chuan');
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

const COMPANY = 'VPS GROUP';
const VERSION = 'v2025';

// ── Màu thương hiệu ──────────────────────────────────────────────────────────
const C = {
  darkBg:    '0F172A',
  headerBg:  '1E3A5F',
  subBg:     '1E293B',
  accentBlue:'3B82F6',
  accentGreen:'10B981',
  accentYellow:'F59E0B',
  accentRed: 'EF4444',
  accentPurple:'8B5CF6',
  accentTeal: '14B8A6',
  accentOrange:'F97316',
  white:     'FFFFFF',
  lightGray: 'CBD5E1',
  midGray:   '64748B',
  border:    '334155',
  inputBg:   'F8FAFC',
  required:  'FEF3C7',
  formula:   'EFF6FF',
};

// ── Helper ────────────────────────────────────────────────────────────────────
function styleHeader(ws, row, bgColor, fgColor = C.white, bold = true, size = 12) {
  row.eachCell({ includeEmpty: true }, cell => {
    cell.fill   = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + bgColor } };
    cell.font   = { bold, color: { argb: 'FF' + fgColor }, name: 'Calibri', size };
    cell.border = {
      top:    { style: 'thin', color: { argb: 'FF' + C.border } },
      bottom: { style: 'thin', color: { argb: 'FF' + C.border } },
      left:   { style: 'thin', color: { argb: 'FF' + C.border } },
      right:  { style: 'thin', color: { argb: 'FF' + C.border } },
    };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  });
}

function styleData(ws, row, bgColor = null, fgColor = '1E293B', center = false) {
  row.eachCell({ includeEmpty: true }, cell => {
    if (bgColor) {
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + bgColor } };
    }
    cell.font   = { color: { argb: 'FF' + fgColor }, name: 'Calibri', size: 11 };
    cell.border = {
      top:    { style: 'hair', color: { argb: 'FFE2E8F0' } },
      bottom: { style: 'hair', color: { argb: 'FFE2E8F0' } },
      left:   { style: 'thin', color: { argb: 'FF' + C.border } },
      right:  { style: 'thin', color: { argb: 'FF' + C.border } },
    };
    cell.alignment = { vertical: 'middle', horizontal: center ? 'center' : 'left', wrapText: true };
  });
}

function addTitleBlock(ws, title, subtitle, accentColor, mergeEnd = 'K') {
  // Each worksheet starts fresh, compute current last row
  const startRow = ws.lastRow ? ws.lastRow.number + 1 : 1;
  const r1n = startRow, r2n = startRow+1, r3n = startRow+2, r4n = startRow+3, r5n = startRow+4, r6n = startRow+5;

  // Row 1: Company name
  ws.addRow([]);
  ws.mergeCells(`A${r1n}:${mergeEnd}${r1n}`);
  const c1 = ws.getCell(`A${r1n}`);
  c1.value = `🏢 ${COMPANY} — HỆ THỐNG DASHBOARD ĐIỀU HÀNH`;
  c1.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + C.darkBg } };
  c1.font  = { bold: true, color: { argb: 'FF' + accentColor }, name: 'Calibri', size: 13 };
  c1.alignment = { vertical: 'middle', horizontal: 'center' };
  ws.getRow(r1n).height = 28;

  // Row 2: Report title
  ws.addRow([]);
  ws.mergeCells(`A${r2n}:${mergeEnd}${r2n}`);
  const c2 = ws.getCell(`A${r2n}`);
  c2.value = title;
  c2.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + accentColor } };
  c2.font  = { bold: true, color: { argb: 'FFFFFFFF' }, name: 'Calibri', size: 15 };
  c2.alignment = { vertical: 'middle', horizontal: 'center' };
  ws.getRow(r2n).height = 36;

  // Row 3: Subtitle
  ws.addRow([]);
  ws.mergeCells(`A${r3n}:${mergeEnd}${r3n}`);
  const c3 = ws.getCell(`A${r3n}`);
  c3.value = subtitle;
  c3.fill  = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF' + C.subBg } };
  c3.font  = { italic: true, color: { argb: 'FF' + C.lightGray }, name: 'Calibri', size: 10 };
  c3.alignment = { vertical: 'middle', horizontal: 'center' };
  ws.getRow(r3n).height = 20;

  // Row 4: Info field labels - only merge up to available columns
  const colCount = mergeEnd.charCodeAt(0) - 'A'.charCodeAt(0) + 1; // number of columns
  const r4 = ws.addRow(['Đơn vị:', '', 'Kỳ báo cáo:', '', 'Người lập:', '', 'Ngày lập:', '', 'Phê duyệt (GĐ):', '', '']);
  ws.mergeCells(`A${r4n}:B${r4n}`);
  ws.mergeCells(`C${r4n}:D${r4n}`);
  ws.mergeCells(`E${r4n}:F${r4n}`);
  ws.mergeCells(`G${r4n}:H${r4n}`);
  if (colCount > 8) { ws.mergeCells(`I${r4n}:${mergeEnd}${r4n}`); }
  r4.eachCell({ includeEmpty: true }, cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF0F172A' } };
    cell.font = { bold: true, color: { argb: 'FF' + C.accentBlue }, name: 'Calibri', size: 10 };
    cell.border = { top:{style:'thin',color:{argb:'FF334155'}}, bottom:{style:'thin',color:{argb:'FF334155'}}, left:{style:'thin',color:{argb:'FF334155'}}, right:{style:'thin',color:{argb:'FF334155'}} };
    cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
  });
  ws.getRow(r4n).height = 22;

  // Row 5: Input cells
  const r5 = ws.addRow(['[Tên đơn vị]', '', '[Tháng/Năm]', '', '[Tên người lập]', '', '[dd/mm/yyyy]', '', '[Ký tên & đóng dấu]', '', '']);
  ws.mergeCells(`A${r5n}:B${r5n}`);
  ws.mergeCells(`C${r5n}:D${r5n}`);
  ws.mergeCells(`E${r5n}:F${r5n}`);
  ws.mergeCells(`G${r5n}:H${r5n}`);
  if (colCount > 8) { ws.mergeCells(`I${r5n}:${mergeEnd}${r5n}`); }
  r5.eachCell({ includeEmpty: true }, cell => {
    cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } };
    cell.font = { color: { argb: 'FF1E293B' }, name: 'Calibri', size: 11 };
    cell.border = { top:{style:'thin',color:{argb:'FF334155'}}, bottom:{style:'double',color:{argb:'FF'+accentColor}}, left:{style:'thin',color:{argb:'FF334155'}}, right:{style:'thin',color:{argb:'FF334155'}} };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
  });
  ws.getRow(r5n).height = 24;

  // Row 6: spacer
  ws.addRow([]);
  ws.getRow(r6n).height = 6;
}

function addLegend(ws, _unused, mergeEnd = 'K') {
  ws.addRow([]);
  const lr = ws.addRow(['📌 GHI CHÚ BIỂU MẪU: Ô màu vàng = cột nhập liệu bắt buộc | Ô màu xanh nhạt = công thức tự động | (*) = chỉ tiêu bắt buộc | Gửi file về: bao-cao@vpsgroup.vn trước ngày 05 hàng tháng']);
  ws.mergeCells(`A${lr.number}:${mergeEnd}${lr.number}`);
  const lc = ws.getCell(`A${lr.number}`);
  lc.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF1E293B' } };
  lc.font = { italic: true, color: { argb: 'FF94A3B8' }, name: 'Calibri', size: 9 };
  lc.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
  ws.getRow(lr.number).height = 20;
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 1: NHÂN SỰ
// ─────────────────────────────────────────────────────────────────────────────
async function createTemplate1_NhanSu() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'VPS Group Dashboard';
  wb.created = new Date();

  // ── Sheet 1: Định Biên & Biến Động ───────────────────────────────────────
  const ws1 = wb.addWorksheet('1. Định Biên & Biến Động', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FFE74C3C' } }
  });
  ws1.columns = [
    { key:'stt',    width: 5  },
    { key:'phong',  width: 22 },
    { key:'chucvu', width: 20 },
    { key:'kh',     width: 10 },
    { key:'ht',     width: 10 },
    { key:'chenh',  width: 10 },
    { key:'tl',     width: 10 },
    { key:'td',     width: 10 },
    { key:'nghi',   width: 10 },
    { key:'bien',   width: 14 },
    { key:'ghichu', width: 22 },
  ];
  addTitleBlock(ws1, '📋 BÁO CÁO NHÂN SỰ — ĐỊNH BIÊN & BIẾN ĐỘNG', 'Theo dõi cơ cấu nhân sự, tuyển dụng, nghỉ việc theo từng phòng ban', C.accentRed);
  // Header row 7
  const h7 = ws1.addRow(['STT', 'Phòng Ban / Bộ Phận (*)', 'Chức Vụ (*)', 'KH Định\nBiên (*)', 'Thực\nTế (*)', 'Chênh\nLệch', 'Tuyển\nMới (*)', 'Thôi\nViệc (*)', 'Nghỉ\nPhép', 'Biến Động\nRòng', 'Ghi Chú']);
  styleHeader(ws1, h7, C.accentRed, C.white, true, 11);
  ws1.getRow(7).height = 40;
  // Data rows
  const depts = ['Ban Giám Đốc','Phòng Kinh Doanh','Phòng Kế Toán','Phòng Kỹ Thuật','Phòng Nhân Sự','Phòng Hành Chính','Kho','Khác'];
  depts.forEach((dept, i) => {
    const rn = 8 + i;
    const row = ws1.addRow([i+1, dept, '', '', '', `=E${rn}-D${rn}`, '', '', '', `=G${rn}-H${rn}`, '']);
    styleData(ws1, row, i % 2 === 0 ? 'F8FAFC' : null);
    // Highlight input cells
    ['D','E','G','H'].forEach(col => {
      const cell = ws1.getCell(`${col}${rn}`);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } };
    });
    // Formula cells
    ['F','J'].forEach(col => {
      const cell = ws1.getCell(`${col}${rn}`);
      cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
      cell.font = { color: { argb: 'FF1D4ED8' }, name: 'Calibri', size: 11 };
    });
    ws1.getRow(rn).height = 22;
  });
  // Total row
  const tr = ws1.addRow(['', 'TỔNG CỘNG', '', `=SUM(D8:D${7+depts.length})`, `=SUM(E8:E${7+depts.length})`, `=SUM(F8:F${7+depts.length})`, `=SUM(G8:G${7+depts.length})`, `=SUM(H8:H${7+depts.length})`, `=SUM(I8:I${7+depts.length})`, `=SUM(J8:J${7+depts.length})`, '']);
  styleHeader(ws1, tr, C.headerBg, C.white, true, 11);
  addLegend(ws1);

  // ── Sheet 2: Lương & Thu Nhập ─────────────────────────────────────────────
  const ws2 = wb.addWorksheet('2. Lương & Thu Nhập', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FFEF4444' } }
  });
  ws2.columns = [
    { key:'stt',    width: 5  }, { key:'phong',  width: 22 }, { key:'sl',     width: 10 },
    { key:'luongCB',width: 14 }, { key:'phucap', width: 14 }, { key:'thuong', width: 14 },
    { key:'tong',   width: 14 }, { key:'bhxh',   width: 12 }, { key:'thucchi',width: 14 }, { key:'ghichu', width: 22 },
  ];
  addTitleBlock(ws2, '📋 BÁO CÁO NHÂN SỰ — QUỸ LƯƠNG & THU NHẬP', 'Tổng hợp quỹ lương, phụ cấp, thưởng và chi phí nhân sự thực tế', C.accentRed, 'J');
  const h7b = ws2.addRow(['STT', 'Phòng Ban (*)', 'Số\nLượng (*)', 'Lương\nCơ Bản (*)', 'Phụ\nCấp (*)', 'Thưởng\n(*)', 'Tổng Thu\nNhập', 'BHXH +\nThuế', 'Thực\nChi', 'Ghi Chú']);
  styleHeader(ws2, h7b, C.accentRed, C.white, true, 11);
  ws2.getRow(7).height = 40;
  depts.forEach((dept, i) => {
    const rn = 8 + i;
    const row = ws2.addRow([i+1, dept, '', '', '', '', `=D${rn}+E${rn}+F${rn}`, `=G${rn}*0.215`, `=G${rn}+H${rn}`, '']);
    styleData(ws2, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['C','D','E','F'].forEach(col => { ws2.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ['G','H','I'].forEach(col => { ws2.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } }; ws2.getCell(`${col}${rn}`).numFmt = '#,##0'; });
    ws2.getRow(rn).height = 22;
  });
  const tot = 7 + depts.length;
  const tr2 = ws2.addRow(['', 'TỔNG', `=SUM(C8:C${tot})`, `=SUM(D8:D${tot})`, `=SUM(E8:E${tot})`, `=SUM(F8:F${tot})`, `=SUM(G8:G${tot})`, `=SUM(H8:H${tot})`, `=SUM(I8:I${tot})`, '']);
  styleHeader(ws2, tr2, C.headerBg, C.white, true, 11);
  ['D','E','F','G','H','I'].forEach(col => { tr2.getCell(col).numFmt = '#,##0'; });
  addLegend(ws2, null, 'J');

  await wb.xlsx.writeFile(path.join(OUT_DIR, '01_Bieu_Mau_Nhan_Su_VPS.xlsx'));
  console.log('✅ Template 1: Nhân Sự — DONE');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 2: DOANH SỐ / LÃI GỘP
// ─────────────────────────────────────────────────────────────────────────────
async function createTemplate2_DoanhSo() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'VPS Group Dashboard';

  const ws1 = wb.addWorksheet('1. Doanh Số Tháng', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FF2ECC71' } }
  });
  ws1.columns = [
    { key:'stt',    width: 5  }, { key:'nhom',   width: 25 }, { key:'sp',     width: 30 },
    { key:'dvt',    width: 8  }, { key:'sl',     width: 10 }, { key:'gg',     width: 14 },
    { key:'dt',     width: 16 }, { key:'gv',     width: 16 }, { key:'lg',     width: 16 },
    { key:'tlLG',   width: 10 }, { key:'ghichu', width: 20 },
  ];
  addTitleBlock(ws1, '📊 BÁO CÁO DOANH SỐ & LÃI GỘP THÁNG', 'Theo dõi doanh thu, giá vốn, lãi gộp từng nhóm sản phẩm/dịch vụ', C.accentGreen);
  const h7 = ws1.addRow(['STT', 'Nhóm Hàng (*)', 'Sản Phẩm / Dịch Vụ (*)', 'ĐVT', 'Số\nLượng (*)', 'Giá\nBán (*)', 'Doanh Thu', 'Giá\nVốn (*)', 'Lãi\nGộp', 'Tỷ Lệ\nLG (%)', 'Ghi Chú']);
  styleHeader(ws1, h7, C.accentGreen, C.white, true, 11);
  ws1.getRow(7).height = 40;
  const nhoms = [
    ['Kinh Doanh','Máy chiếu'],['Kinh Doanh','Màn chiếu'],['Kinh Doanh','Thiết bị hội trường'],
    ['Kinh Doanh','Camera CCTV'],['Dịch Vụ','Bảo trì hàng năm'],['Dịch Vụ','Lắp đặt & thi công'],
    ['Dự Án','Dự án giáo dục'],['Dự Án','Dự án cơ quan nhà nước'],
  ];
  nhoms.forEach(([nhom, sp], i) => {
    const rn = 8 + i;
    const row = ws1.addRow([i+1, nhom, sp, 'Cái', '', '', `=E${rn}*F${rn}`, '', `=G${rn}-H${rn}`, `=IFERROR(I${rn}/G${rn}*100,0)`, '']);
    styleData(ws1, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['E','F','H'].forEach(col => { ws1.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ['G','H','I'].forEach(col => { ws1.getCell(`${col}${rn}`).numFmt = '#,##0'; });
    ws1.getCell(`J${rn}`).numFmt = '0.00"%"'; ws1.getCell(`J${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getCell(`G${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getCell(`I${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getRow(rn).height = 22;
  });
  const tot = 7 + nhoms.length;
  const tr = ws1.addRow(['', 'TỔNG CỘNG', '', '', `=SUM(E8:E${tot})`, '', `=SUM(G8:G${tot})`, `=SUM(H8:H${tot})`, `=SUM(I8:I${tot})`, `=IFERROR(I${tot+1}/G${tot+1}*100,0)`, '']);
  styleHeader(ws1, tr, C.headerBg, C.white, true, 11);
  ['G','H','I'].forEach(col => { tr.getCell(col).numFmt = '#,##0'; });
  tr.getCell('J').numFmt = '0.00"%"';
  addLegend(ws1);

  // Sheet 2: Kế hoạch vs Thực tế
  const ws2 = wb.addWorksheet('2. KH vs Thực Tế', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FF27AE60' } }
  });
  ws2.columns = [
    { key:'stt', width:5 }, { key:'chi', width:28 }, { key:'khdt', width:14 }, { key:'kh', width:14 },
    { key:'tt', width:14 }, { key:'tl', width:12 }, { key:'chenh', width:14 }, { key:'ghichu', width:24 },
  ];
  addTitleBlock(ws2, '📊 KẾ HOẠCH vs THỰC TẾ DOANH SỐ & LÃI GỘP', 'So sánh kết quả thực hiện so với kế hoạch đầu năm và kế hoạch tháng', C.accentGreen, 'H');
  const h7b = ws2.addRow(['STT', 'Chỉ Tiêu (*)', 'KH Đầu\nNăm (*)', 'KH\nTháng (*)', 'Thực\nTế (*)', 'Tỷ Lệ\nHT (%)', 'Chênh\nLệch', 'Ghi Chú']);
  styleHeader(ws2, h7b, C.accentGreen, C.white, true, 11);
  ws2.getRow(7).height = 40;
  const chis = ['Doanh Thu (VNĐ)','Lãi Gộp (VNĐ)','Tỷ Lệ LG (%)','Số Hợp Đồng Mới','Giá Trị HĐ Trung Bình','Doanh Thu Dịch Vụ','Doanh Thu Dự Án'];
  chis.forEach((chi, i) => {
    const rn = 8 + i;
    const row = ws2.addRow([i+1, chi, '', '', '', `=IFERROR(E${rn}/D${rn}*100,0)`, `=E${rn}-D${rn}`, '']);
    styleData(ws2, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['C','D','E'].forEach(col => { ws2.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    if (i !== 2) { ['C','D','E','G'].forEach(col => { ws2.getCell(`${col}${rn}`).numFmt = '#,##0'; }); }
    ws2.getCell(`F${rn}`).numFmt = '0.00"%"'; ws2.getCell(`F${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws2.getCell(`G${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws2.getRow(rn).height = 22;
  });
  addLegend(ws2, null, 'H');

  await wb.xlsx.writeFile(path.join(OUT_DIR, '02_Bieu_Mau_Doanh_So_Lai_Gop_VPS.xlsx'));
  console.log('✅ Template 2: Doanh Số / Lãi Gộp — DONE');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 3: SẢN PHẨM
// ─────────────────────────────────────────────────────────────────────────────
async function createTemplate3_SanPham() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'VPS Group Dashboard';

  const ws1 = wb.addWorksheet('1. Hiệu Quả Sản Phẩm', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FF9B59B6' } }
  });
  ws1.columns = [
    { key:'stt',width:5 }, { key:'nhom',width:18 }, { key:'sp',width:28 }, { key:'ma',width:12 },
    { key:'dvt',width:8 }, { key:'sl',width:10 }, { key:'dt',width:14 }, { key:'lg',width:14 },
    { key:'tlLG',width:10 }, { key:'xepHang',width:10 }, { key:'ghichu',width:20 },
  ];
  addTitleBlock(ws1, '📦 BÁO CÁO HIỆU QUẢ SẢN PHẨM', 'Phân tích doanh thu, lãi gộp, xếp hạng từng sản phẩm / dòng hàng', C.accentPurple);
  const h7 = ws1.addRow(['STT', 'Nhóm Hàng (*)', 'Tên Sản Phẩm (*)', 'Mã SP (*)', 'ĐVT', 'SL\nBán (*)', 'Doanh\nThu (*)', 'Lãi\nGộp (*)', 'Tỷ Lệ\nLG (%)', 'Xếp\nHạng', 'Ghi Chú']);
  styleHeader(ws1, h7, C.accentPurple, C.white, true, 11);
  ws1.getRow(7).height = 40;
  const sps = ['Máy chiếu Epson','Máy chiếu BenQ','Màn chiếu điện','Màn chiếu cố định','Thiết bị hội trường','Camera IP','Camera Analog','Switch mạng','Server','Phụ kiện & vật tư'];
  sps.forEach((sp, i) => {
    const rn = 8 + i;
    const row = ws1.addRow([i+1, '', sp, '', '', '', '', '', `=IFERROR(H${rn}/G${rn}*100,0)`, '', '']);
    styleData(ws1, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['B','C','D','F','G','H'].forEach(col => { ws1.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ['G','H'].forEach(col => { ws1.getCell(`${col}${rn}`).numFmt = '#,##0'; });
    ws1.getCell(`I${rn}`).numFmt = '0.00"%"'; ws1.getCell(`I${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getRow(rn).height = 22;
  });
  const tot = 7 + sps.length;
  const tr = ws1.addRow(['','TỔNG','','','',`=SUM(F8:F${tot})`,`=SUM(G8:G${tot})`,`=SUM(H8:H${tot})`,`=IFERROR(H${tot+1}/G${tot+1}*100,0)`,'','']);
  styleHeader(ws1, tr, C.headerBg, C.white, true, 11);
  ['G','H'].forEach(col => { tr.getCell(col).numFmt = '#,##0'; });
  tr.getCell('I').numFmt = '0.00"%"';
  addLegend(ws1);

  // Sheet 2: Tồn kho sản phẩm
  const ws2 = wb.addWorksheet('2. Sản Phẩm ABC & Phân Tích', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FF8B5CF6' } }
  });
  ws2.columns = [
    { key:'stt',width:5 }, { key:'sp',width:30 }, { key:'dtNam',width:14 }, { key:'tl',width:10 },
    { key:'cumTL',width:12 }, { key:'nhom',width:8 }, { key:'slLuot',width:12 }, { key:'ghichu',width:24 },
  ];
  addTitleBlock(ws2, '📦 PHÂN TÍCH SẢN PHẨM THEO PHÂN LOẠI ABC', 'Nhóm A: Đóng góp 70% DT | Nhóm B: 20% DT | Nhóm C: 10% DT còn lại', C.accentPurple, 'H');
  const h7b = ws2.addRow(['STT', 'Tên Sản Phẩm (*)', 'Doanh Thu\nNăm (*)', 'Tỷ Lệ\n(%)', 'Tỷ Lệ\nTích Lũy', 'Nhóm\nABC', 'Lượt\nGiao Dịch', 'Ghi Chú']);
  styleHeader(ws2, h7b, C.accentPurple, C.white, true, 11);
  ws2.getRow(7).height = 40;
  sps.forEach((sp, i) => {
    const rn = 8 + i;
    const row = ws2.addRow([i+1, sp, '', `=IFERROR(C${rn}/SUM(C8:C${7+sps.length})*100,0)`, '', '=IF(E'+rn+'<=70,"A",IF(E'+rn+'<=90,"B","C"))', '', '']);
    styleData(ws2, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['B','C','G'].forEach(col => { ws2.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ws2.getCell(`C${rn}`).numFmt = '#,##0';
    ['D','E'].forEach(col => { ws2.getCell(`${col}${rn}`).numFmt = '0.00"%"'; ws2.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } }; });
    ws2.getCell(`F${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } }; ws2.getCell(`F${rn}`).alignment = { horizontal: 'center' };
    ws2.getRow(rn).height = 22;
  });
  addLegend(ws2, null, 'H');

  await wb.xlsx.writeFile(path.join(OUT_DIR, '03_Bieu_Mau_San_Pham_VPS.xlsx'));
  console.log('✅ Template 3: Sản Phẩm — DONE');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 4: TỒN KHO
// ─────────────────────────────────────────────────────────────────────────────
async function createTemplate4_TonKho() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'VPS Group Dashboard';

  const ws1 = wb.addWorksheet('1. Tồn Kho Chi Tiết', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FFF1C40F' } }
  });
  ws1.columns = [
    { key:'stt',width:5 }, { key:'nhom',width:18 }, { key:'sp',width:28 }, { key:'ma',width:12 },
    { key:'dvt',width:8 }, { key:'tonDau',width:10 }, { key:'nhap',width:10 }, { key:'xuat',width:10 },
    { key:'tonCuoi',width:10 }, { key:'giaNhap',width:14 }, { key:'gtTon',width:14 }, { key:'ghichu',width:20 },
  ];
  addTitleBlock(ws1, '📦 BÁO CÁO TỒN KHO CHI TIẾT', 'Theo dõi số lượng tồn, nhập xuất từng mã hàng, giá trị tồn kho thực tế', C.accentYellow, 'L');
  const h7 = ws1.addRow(['STT', 'Nhóm Hàng (*)', 'Tên Sản Phẩm (*)', 'Mã SP (*)', 'ĐVT', 'Tồn\nĐầu Kỳ (*)', 'Nhập\nKỳ (*)', 'Xuất\nKỳ (*)', 'Tồn\nCuối Kỳ', 'Giá Nhập\nBình Quân (*)', 'Giá Trị\nTồn Kho', 'Ghi Chú']);
  styleHeader(ws1, h7, C.accentYellow, C.darkBg, true, 11);
  ws1.getRow(7).height = 40;
  const items = ['Máy chiếu Epson EB-X51','Máy chiếu BenQ MX731','Màn chiếu điện 100"','Màn chiếu cố định 120"','Camera IP 4MP Hikvision','Camera Analog 2MP','Switch 24 port','Cáp HDMI 10m','Remote presenter','Bóng đèn thay thế'];
  items.forEach((item, i) => {
    const rn = 8 + i;
    const row = ws1.addRow([i+1, '', item, '', 'Cái', '', '', '', `=F${rn}+G${rn}-H${rn}`, '', `=I${rn}*J${rn}`, '']);
    styleData(ws1, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['B','C','D','F','G','H','J'].forEach(col => { ws1.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ['J','K'].forEach(col => { ws1.getCell(`${col}${rn}`).numFmt = '#,##0'; });
    ws1.getCell(`I${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getCell(`K${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getRow(rn).height = 22;
  });
  const tot = 7 + items.length;
  const tr = ws1.addRow(['','TỔNG','','','',`=SUM(F8:F${tot})`,`=SUM(G8:G${tot})`,`=SUM(H8:H${tot})`,`=SUM(I8:I${tot})`,'',`=SUM(K8:K${tot})`,'']);
  styleHeader(ws1, tr, C.headerBg, C.white, true, 11);
  ['K'].forEach(col => { tr.getCell(col).numFmt = '#,##0'; });
  addLegend(ws1, null, 'L');

  // Sheet 2: Cảnh báo hàng chậm
  const ws2 = wb.addWorksheet('2. Cảnh Báo Tồn Kho', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FFF59E0B' } }
  });
  ws2.columns = [
    { key:'stt',width:5 }, { key:'sp',width:30 }, { key:'ma',width:12 }, { key:'ton',width:10 },
    { key:'ngayTon',width:12 }, { key:'gtTon',width:14 }, { key:'trangThai',width:16 }, { key:'ghichu',width:24 },
  ];
  addTitleBlock(ws2, '⚠️ CẢNH BÁO HÀNG TỒN KHO CHẬM LUÂN CHUYỂN', 'Hàng tồn > 90 ngày cần xử lý — Kiểm tra và lập kế hoạch giải phóng tồn kho', C.accentYellow, 'H');
  const h7b = ws2.addRow(['STT', 'Tên Sản Phẩm (*)', 'Mã SP (*)', 'SL Tồn\nHiện Tại (*)', 'Số Ngày\nTồn Kho (*)', 'Giá Trị\nTồn (*)', 'Trạng Thái', 'Ghi Chú / Đề Xuất Xử Lý']);
  styleHeader(ws2, h7b, C.accentYellow, C.darkBg, true, 11);
  ws2.getRow(7).height = 40;
  for (let i = 0; i < 15; i++) {
    const rn = 8 + i;
    const row = ws2.addRow([i+1, '', '', '', '', '', `=IF(E${rn}>180,"🔴 Rất chậm",IF(E${rn}>90,"🟡 Chậm","🟢 Bình thường"))`, '']);
    styleData(ws2, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['B','C','D','E','F'].forEach(col => { ws2.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ws2.getCell(`F${rn}`).numFmt = '#,##0';
    ws2.getCell(`G${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } }; ws2.getCell(`G${rn}`).alignment = { horizontal: 'center' };
    ws2.getRow(rn).height = 22;
  }
  addLegend(ws2, null, 'H');

  await wb.xlsx.writeFile(path.join(OUT_DIR, '04_Bieu_Mau_Ton_Kho_VPS.xlsx'));
  console.log('✅ Template 4: Tồn Kho — DONE');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 5: CHI PHÍ
// ─────────────────────────────────────────────────────────────────────────────
async function createTemplate5_ChiPhi() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'VPS Group Dashboard';

  const ws1 = wb.addWorksheet('1. Chi Phí Tổng Hợp', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FFE67E22' } }
  });
  ws1.columns = [
    { key:'stt',width:5 }, { key:'nhom',width:20 }, { key:'khoan',width:28 }, { key:'kh',width:14 },
    { key:'tt',width:14 }, { key:'chenh',width:14 }, { key:'tl',width:10 }, { key:'ghichu',width:24 },
  ];
  addTitleBlock(ws1, '💰 BÁO CÁO CHI PHÍ TỔNG HỢP', 'Theo dõi chi phí thực tế so với kế hoạch từng khoản mục và phòng ban', C.accentOrange, 'H');
  const h7 = ws1.addRow(['STT', 'Nhóm Chi Phí (*)', 'Khoản Mục Chi Phí (*)', 'KH\nTháng (*)', 'Thực\nTế (*)', 'Chênh\nLệch', 'Tỷ Lệ\nHTH (%)', 'Ghi Chú / Diễn Giải']);
  styleHeader(ws1, h7, C.accentOrange, C.white, true, 11);
  ws1.getRow(7).height = 40;
  const expenses = [
    ['CP Nhân Sự','Lương & phụ cấp'],['CP Nhân Sự','Thưởng KPI'],['CP Nhân Sự','BHXH / BHYT / BHTN'],
    ['CP Bán Hàng','Hoa hồng & chiết khấu'],['CP Bán Hàng','Chi phí marketing'],['CP Bán Hàng','Chi phí vận chuyển & giao hàng'],
    ['CP Quản Lý','Thuê văn phòng & mặt bằng'],['CP Quản Lý','Điện – Nước – Viễn thông'],['CP Quản Lý','Văn phòng phẩm & công cụ'],['CP Quản Lý','Chi phí đào tạo'],
    ['CP Tài Chính','Lãi vay ngân hàng'],['CP Tài Chính','Phí ngân hàng & bảo hiểm'],
    ['CP Khấu Hao','TSCĐ & thiết bị văn phòng'],
    ['CP Khác','Chi phí tiếp khách'],['CP Khác','Chi phí phát sinh khác'],
  ];
  expenses.forEach(([nhom, khoan], i) => {
    const rn = 8 + i;
    const row = ws1.addRow([i+1, nhom, khoan, '', '', `=E${rn}-D${rn}`, `=IFERROR(E${rn}/D${rn}*100,0)`, '']);
    styleData(ws1, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['D','E'].forEach(col => { ws1.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ['D','E','F'].forEach(col => { ws1.getCell(`${col}${rn}`).numFmt = '#,##0'; });
    ws1.getCell(`F${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getCell(`G${rn}`).numFmt = '0.00"%"'; ws1.getCell(`G${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getRow(rn).height = 22;
  });
  const tot = 7 + expenses.length;
  const tr = ws1.addRow(['','TỔNG CHI PHÍ','',`=SUM(D8:D${tot})`,`=SUM(E8:E${tot})`,`=SUM(F8:F${tot})`,`=IFERROR(E${tot+1}/D${tot+1}*100,0)`,'']);
  styleHeader(ws1, tr, C.accentOrange, C.white, true, 11);
  ['D','E','F'].forEach(col => { tr.getCell(col).numFmt = '#,##0'; }); tr.getCell('G').numFmt = '0.00"%"';
  addLegend(ws1, null, 'H');

  await wb.xlsx.writeFile(path.join(OUT_DIR, '05_Bieu_Mau_Chi_Phi_VPS.xlsx'));
  console.log('✅ Template 5: Chi Phí — DONE');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 6: CÔNG NỢ
// ─────────────────────────────────────────────────────────────────────────────
async function createTemplate6_CongNo() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'VPS Group Dashboard';

  const ws1 = wb.addWorksheet('1. Công Nợ Phải Thu', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FF1ABC9C' } }
  });
  ws1.columns = [
    { key:'stt',width:5 }, { key:'kh',width:28 }, { key:'mskh',width:12 }, { key:'nv',width:16 },
    { key:'tonDau',width:14 }, { key:'phaTau',width:14 }, { key:'thuVe',width:14 }, { key:'tonCuoi',width:14 },
    { key:'qua30',width:12 }, { key:'qua60',width:12 }, { key:'qua90',width:12 }, { key:'ghichu',width:22 },
  ];
  addTitleBlock(ws1, '💳 BÁO CÁO CÔNG NỢ PHẢI THU', 'Theo dõi số dư công nợ khách hàng, phân loại theo tuổi nợ (30/60/90 ngày)', C.accentTeal, 'L');
  const h7 = ws1.addRow(['STT', 'Tên Khách Hàng (*)', 'Mã KH', 'NV Phụ Trách (*)', 'Tồn\nĐầu Kỳ (*)', 'Phát Sinh\nThêm (*)', 'Thu\nVề (*)', 'Tồn\nCuối Kỳ', 'Nợ Quá\n30 Ngày', 'Nợ Quá\n60 Ngày', 'Nợ Quá\n90 Ngày', 'Ghi Chú / Tình Trạng']);
  styleHeader(ws1, h7, C.accentTeal, C.white, true, 11);
  ws1.getRow(7).height = 40;
  for (let i = 0; i < 20; i++) {
    const rn = 8 + i;
    const row = ws1.addRow([i+1, '', '', '', '', '', '', `=E${rn}+F${rn}-G${rn}`, '', '', '', '']);
    styleData(ws1, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['B','C','D','E','F','G','I','J','K'].forEach(col => { ws1.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ['E','F','G','H','I','J','K'].forEach(col => { ws1.getCell(`${col}${rn}`).numFmt = '#,##0'; });
    ws1.getCell(`H${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws1.getRow(rn).height = 22;
  }
  const tot = 7 + 20;
  const tr = ws1.addRow(['','TỔNG','','',`=SUM(E8:E${tot})`,`=SUM(F8:F${tot})`,`=SUM(G8:G${tot})`,`=SUM(H8:H${tot})`,`=SUM(I8:I${tot})`,`=SUM(J8:J${tot})`,`=SUM(K8:K${tot})`,'']);
  styleHeader(ws1, tr, C.headerBg, C.white, true, 11);
  ['E','F','G','H','I','J','K'].forEach(col => { tr.getCell(col).numFmt = '#,##0'; });
  addLegend(ws1, null, 'L');

  // Sheet 2: Công nợ phải trả
  const ws2 = wb.addWorksheet('2. Công Nợ Phải Trả', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FF0D9488' } }
  });
  ws2.columns = [
    { key:'stt',width:5 }, { key:'ncc',width:28 }, { key:'ms',width:12 }, { key:'tonDau',width:14 },
    { key:'muaThem',width:14 }, { key:'daTra',width:14 }, { key:'tonCuoi',width:14 }, { key:'hanTT',width:12 }, { key:'ghichu',width:24 },
  ];
  addTitleBlock(ws2, '💳 BÁO CÁO CÔNG NỢ PHẢI TRẢ (NHÀ CUNG CẤP)', 'Theo dõi số dư nợ nhà cung cấp, hạn thanh toán và kế hoạch trả nợ', C.accentTeal, 'I');
  const h7b = ws2.addRow(['STT', 'Nhà Cung Cấp (*)', 'Mã NCC', 'Tồn\nĐầu Kỳ (*)', 'Mua\nThêm (*)', 'Đã\nTrả (*)', 'Tồn\nCuối Kỳ', 'Hạn TT\nGần Nhất', 'Ghi Chú / Ưu Tiên TT']);
  styleHeader(ws2, h7b, C.accentTeal, C.white, true, 11);
  ws2.getRow(7).height = 40;
  for (let i = 0; i < 15; i++) {
    const rn = 8 + i;
    const row = ws2.addRow([i+1, '', '', '', '', '', `=D${rn}+E${rn}-F${rn}`, '', '']);
    styleData(ws2, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['B','C','D','E','F','H'].forEach(col => { ws2.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ['D','E','F','G'].forEach(col => { ws2.getCell(`${col}${rn}`).numFmt = '#,##0'; });
    ws2.getCell(`G${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    ws2.getRow(rn).height = 22;
  }
  const tot2 = 7 + 15;
  const tr2 = ws2.addRow(['','TỔNG','',`=SUM(D8:D${tot2})`,`=SUM(E8:E${tot2})`,`=SUM(F8:F${tot2})`,`=SUM(G8:G${tot2})`,'','']);
  styleHeader(ws2, tr2, C.headerBg, C.white, true, 11);
  ['D','E','F','G'].forEach(col => { tr2.getCell(col).numFmt = '#,##0'; });
  addLegend(ws2, null, 'I');

  await wb.xlsx.writeFile(path.join(OUT_DIR, '06_Bieu_Mau_Cong_No_VPS.xlsx'));
  console.log('✅ Template 6: Công Nợ — DONE');
}

// ─────────────────────────────────────────────────────────────────────────────
// TEMPLATE 7: KHÁCH HÀNG
// ─────────────────────────────────────────────────────────────────────────────
async function createTemplate7_KhachHang() {
  const wb = new ExcelJS.Workbook();
  wb.creator = 'VPS Group Dashboard';

  const ws1 = wb.addWorksheet('1. Danh Sách Khách Hàng', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FF34495E' } }
  });
  ws1.columns = [
    { key:'stt',width:5 }, { key:'ten',width:30 }, { key:'ms',width:12 }, { key:'loai',width:14 },
    { key:'nv',width:16 }, { key:'dt',width:14 }, { key:'lg',width:14 }, { key:'hangKH',width:10 },
    { key:'ngayGD',width:12 }, { key:'trangThai',width:14 }, { key:'ghichu',width:22 },
  ];
  addTitleBlock(ws1, '👥 BÁO CÁO KHÁCH HÀNG — DOANH SỐ & PHÂN LOẠI', 'Theo dõi danh sách, doanh số, phân hạng và trạng thái khách hàng tháng này', C.accentBlue);
  const h7 = ws1.addRow(['STT', 'Tên Khách Hàng (*)', 'Mã KH', 'Loại\nKH (*)', 'NV Phụ\nTrách (*)', 'Doanh\nThu (*)', 'Lãi\nGộp (*)', 'Hạng\nKH', 'Ngày GD\nGần Nhất', 'Trạng Thái', 'Ghi Chú']);
  styleHeader(ws1, h7, '1E3A8A', C.white, true, 11);
  ws1.getRow(7).height = 40;
  const types = ['Đại lý cấp 1','Đại lý cấp 2','Dự án','Trực tiếp','Dự án','Đại lý cấp 1','Trực tiếp','Dự án','Đại lý cấp 2','Trực tiếp'];
  for (let i = 0; i < 20; i++) {
    const rn = 8 + i;
    const row = ws1.addRow([i+1, '', '', types[i % 10] || 'Khác', '', '', '', `=IF(F${rn}>=500000000,"VÀNG",IF(F${rn}>=200000000,"BẠC","ĐỒNG"))`, '', '🟢 Hoạt Động', '']);
    styleData(ws1, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['B','C','E','F','G','I'].forEach(col => { ws1.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ['F','G'].forEach(col => { ws1.getCell(`${col}${rn}`).numFmt = '#,##0'; });
    ['H','J'].forEach(col => { ws1.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } }; ws1.getCell(`${col}${rn}`).alignment = { horizontal: 'center' }; });
    ws1.getRow(rn).height = 22;
  }
  const tot = 7 + 20;
  const tr = ws1.addRow(['','TỔNG','','','',`=SUM(F8:F${tot})`,`=SUM(G8:G${tot})`,'','','','']);
  styleHeader(ws1, tr, C.headerBg, C.white, true, 11);
  ['F','G'].forEach(col => { tr.getCell(col).numFmt = '#,##0'; });
  addLegend(ws1);

  // Sheet 2: Khách hàng mới & churn
  const ws2 = wb.addWorksheet('2. Khách Hàng Mới & Churn', {
    views: [{ state: 'frozen', ySplit: 8 }],
    properties: { tabColor: { argb: 'FF2563EB' } }
  });
  ws2.columns = [
    { key:'stt',width:5 }, { key:'chi',width:28 }, { key:'thang_1',width:11 }, { key:'thang_2',width:11 },
    { key:'thang_3',width:11 }, { key:'thang_4',width:11 }, { key:'thang_5',width:11 }, { key:'thang_6',width:11 },
    { key:'total',width:12 }, { key:'ghichu',width:22 },
  ];
  addTitleBlock(ws2, '👥 BÁO CÁO PHÁT TRIỂN & MẤT KHÁCH HÀNG', 'Tổng hợp khách hàng mới, khách hàng mất, tỷ lệ churn 6 tháng liên tiếp', C.accentBlue, 'J');
  const h7b = ws2.addRow(['STT', 'Chỉ Tiêu (*)', 'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tổng / TB', 'Ghi Chú']);
  styleHeader(ws2, h7b, '1E3A8A', C.white, true, 11);
  ws2.getRow(7).height = 40;
  const khChis = ['Tổng KH Đầu Kỳ','KH Mới Phát Sinh','KH Mất Đi (Churn)','KH Cuối Kỳ','Tỷ Lệ Churn (%)','Tỷ Lệ Tăng Trưởng (%)','KH Mua Lần Đầu','KH Mua Lại (Repeat)','Doanh Thu KH Mới','Doanh Thu KH Cũ'];
  khChis.forEach((chi, i) => {
    const rn = 8 + i;
    const row = ws2.addRow([i+1, chi, '', '', '', '', '', '', `=SUM(C${rn}:H${rn})`, '']);
    styleData(ws2, row, i % 2 === 0 ? 'F8FAFC' : null);
    ['C','D','E','F','G','H'].forEach(col => { ws2.getCell(`${col}${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFFFF8E1' } }; });
    ws2.getCell(`I${rn}`).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFEFF6FF' } };
    if (i >= 8) { ['C','D','E','F','G','H','I'].forEach(col => { ws2.getCell(`${col}${rn}`).numFmt = '#,##0'; }); }
    else if (i === 4 || i === 5) { ['C','D','E','F','G','H','I'].forEach(col => { ws2.getCell(`${col}${rn}`).numFmt = '0.00"%"'; }); }
    ws2.getRow(rn).height = 22;
  });
  addLegend(ws2, null, 'J');

  await wb.xlsx.writeFile(path.join(OUT_DIR, '07_Bieu_Mau_Khach_Hang_VPS.xlsx'));
  console.log('✅ Template 7: Khách Hàng — DONE');
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN: Run all generators
// ─────────────────────────────────────────────────────────────────────────────
async function main() {
  console.log('\n🚀 Bắt đầu tạo 7 biểu mẫu báo cáo chuẩn VPS Group...\n');
  await createTemplate1_NhanSu();
  await createTemplate2_DoanhSo();
  await createTemplate3_SanPham();
  await createTemplate4_TonKho();
  await createTemplate5_ChiPhi();
  await createTemplate6_CongNo();
  await createTemplate7_KhachHang();
  console.log('\n🎉 Hoàn tất! Tất cả 7 biểu mẫu đã được tạo trong thư mục:');
  console.log(`   📁 ${OUT_DIR}\n`);
  const files = require('fs').readdirSync(OUT_DIR).filter(f => f.endsWith('.xlsx'));
  files.forEach((f, i) => console.log(`   ${i+1}. ${f}`));
}

main().catch(err => { console.error('❌ Lỗi:', err); process.exit(1); });
