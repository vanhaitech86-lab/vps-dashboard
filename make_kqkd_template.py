import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

wb = openpyxl.Workbook()

# Setup sheets
ws_main = wb.active
ws_main.title = "Bao_Cao_KQKD_Thang_07"

# Color constants
DARK_BLUE = "0F172A"
MID_BLUE = "1E3A8A"
LIGHT_BLUE = "DBEAFE"
DARK_GREEN = "064E3B"
LIGHT_GREEN = "D1FAE5"
HEADER_GRAY = "F1F5F9"
BORDER_GRAY = "CBD5E1"
GOLD = "B45309"
RED_TEXT = "DC2626"

font_title = Font(name="Arial", size=14, bold=True, color="000000")
font_sub = Font(name="Arial", size=10, italic=True, color="475569")
font_header = Font(name="Arial", size=9, bold=True, color="FFFFFF")
font_bold = Font(name="Arial", size=9, bold=True, color="000000")
font_regular = Font(name="Arial", size=9, bold=False, color="000000")
font_red_bold = Font(name="Arial", size=9, bold=True, color=RED_TEXT)

fill_dark = PatternFill(start_color=DARK_BLUE, end_color=DARK_BLUE, fill_type="solid")
fill_thang = PatternFill(start_color=MID_BLUE, end_color=MID_BLUE, fill_type="solid")
fill_luyke = PatternFill(start_color=DARK_GREEN, end_color=DARK_GREEN, fill_type="solid")
fill_region = PatternFill(start_color="E0E7FF", end_color="E0E7FF", fill_type="solid")
fill_company = PatternFill(start_color="F1F5F9", end_color="F1F5F9", fill_type="solid")
fill_total = PatternFill(start_color="FEF3C7", end_color="FEF3C7", fill_type="solid")

thin_side = Side(border_style="thin", color=BORDER_GRAY)
med_side = Side(border_style="medium", color="000000")
border_cell = Border(left=thin_side, right=thin_side, top=thin_side, bottom=thin_side)
border_total = Border(left=thin_side, right=thin_side, top=med_side, bottom=med_side)

align_center = Alignment(horizontal="center", vertical="center")
align_left = Alignment(horizontal="left", vertical="center")
align_right = Alignment(horizontal="right", vertical="center")

# Title lines
ws_main.merge_cells("A1:Q1")
ws_main["A1"] = "MÁY VĂN PHÒNG HÀNG ĐẦU VIỆT NAM - TẬP ĐOÀN VPS"
ws_main["A1"].font = Font(name="Arial", size=10, bold=True, color="059669")
ws_main["A1"].alignment = align_center

ws_main.merge_cells("A2:Q2")
ws_main["A2"] = "BÁO CÁO KẾT QUẢ KINH DOANH HỢP NHẤT (P&L)"
ws_main["A2"].font = font_title
ws_main["A2"].alignment = align_center

ws_main.merge_cells("A3:Q3")
ws_main["A3"] = "TỔNG HỢP DOANH SỐ, LỢI NHUẬN TRƯỚC THUẾ • KỲ BÁO CÁO: THÁNG 07/2026 VÀ LŨY KẾ 2026"
ws_main["A3"].font = font_sub
ws_main["A3"].alignment = align_center

ws_main["Q4"] = "Đơn vị tính: Triệu đồng"
ws_main["Q4"].font = Font(name="Arial", size=9, italic=True)
ws_main["Q4"].alignment = align_right

# Table Headers - Row 5 & 6
ws_main.merge_cells("A5:A6")
ws_main["A5"] = "TT"
ws_main.merge_cells("B5:B6")
ws_main["B5"] = "NỘI DUNG"
ws_main.merge_cells("C5:C6")
ws_main["C5"] = "VỐN ĐT"

ws_main.merge_cells("D5:J5")
ws_main["D5"] = "THÁNG 07"

ws_main.merge_cells("K5:Q5")
ws_main["K5"] = "LŨY KẾ NĂM 2026"

sub_headers = [
    (4, "DS"), (5, "% LG"), (6, "LG"), (7, "HT LG"), (8, "CHI PHÍ"), (9, "TN KHÁC"), (10, "LNTT"),
    (11, "DS"), (12, "% LG"), (13, "LG"), (14, "HT LG"), (15, "CHI PHÍ"), (16, "TN KHÁC"), (17, "LNTT")
]

for col_idx, text in sub_headers:
    cell = ws_main.cell(row=6, column=col_idx, value=text)
    cell.font = font_header
    cell.alignment = align_center
    cell.fill = fill_thang if col_idx <= 10 else fill_luyke

for col_idx in [1, 2, 3]:
    cell = ws_main.cell(row=5, column=col_idx)
    cell.font = font_header
    cell.alignment = align_center
    cell.fill = fill_dark

ws_main["D5"].font = font_header
ws_main["D5"].alignment = align_center
ws_main["D5"].fill = fill_thang

ws_main["K5"].font = font_header
ws_main["K5"].alignment = align_center
ws_main["K5"].fill = fill_luyke

# Data rows (stt, name, vonDT, m_ds, m_lgPct, m_lg, m_htLg, m_cp, m_tnk, m_lntt, c_ds, c_lgPct, c_lg, c_htLg, c_cp, c_tnk, c_lntt, type)
# type: 'header', 'company', 'sub', 'item', 'total'
rows_data = [
    # I. MIỀN BẮC
    ("I", "MIỀN BẮC", 80000, "", 0.10, "", 5, "", "", -89, "", 0.21, "", 335, "", 7731, -234, "header"),
    ("1", "THH (Tân Hồng Hà)", 50000, "", 0.18, "", 5, "", 8, 245, "", 0.21, "", 335, "", 57, 2376, "company"),
    ("a", "Khối dịch vụ kỹ thuật", "", "", 0.335, 864, "", 798, 1, 67, "", 0.36, 5747, 54, 5516, 1, 286, "sub"),
    ("a.1", "Tổ Dịch vụ", "", 1346, 0.26, 347.5, "", "", "", "", 8304.5, 0.33, 2745.2, 53, "", "", "", "item"),
    ("a.2", "Tổ mực in", "", 292, 0.50, 144.7, "", "", "", "", 2054.6, 0.51, 1058.0, "", "", "", "", "item"),
    ("a.3", "Thuê máy", "", 605, 0.38, 231.1, "", "", "", "", 3654.1, 0.33, 1192.3, "", "", "", "", "item"),
    ("a.4", "Metercharge", "", 233, 0.61, 141.0, "", "", "", "", 1459.2, 0.51, 737.6, "", "", "", "", "item"),
    ("a.5", "Kinh doanh Online", "", 102, -0.01, -0.6, 1, "", "", "", 673.4, 0.02, 14.1, 1, "", "", "", "item"),
    ("b", "Kinh doanh tổng hợp", "", 1139, 0.15, 174.6, "", 165, 10, 10, "", 0.08, 1034.7, 9, 1157, 47, -66, "sub"),
    ("c", "Kinh doanh bán buôn", "", 4792, 0.10, 473.1, 5, 311, 7, 178, "", 0.09, 2275.1, 271, 2438, 10, 119, "sub"),
    ("d", "Dự án", "", 295, 0.19, 56.1, "", 67, "", -10, "", 0.41, "", "", 3342, "", 2038, "sub"),
    
    # 2. Việt
    ("2", "Việt", "", "", 0.203, 1390, 0, 983, "", 382, "", 0.21, 8562, "", 6903, 13, 1672, "company"),
    ("2.1", "Thuê máy", "", 1565, 0.59, 924, "", 653, "", 271, 10876, 0.58, 6285, "", 4513, 11.4, 1783, "item"),
    ("2.2", "KDTH", "", 1991, 0.08, 151, "", 144, 7, 14, 12624, 0.08, 970, "", 1022, 1.5, -51, "item"),
    ("2.3", "KD online", "", 3135, 0.067, 211, "", 149, "", 62, 16138, 0.06, 998, "", 1116, 0, -118, "item"),
    ("2.4", "Cửa hàng", "", 157, 0.499, 78.1, "", 37, "", 42, 656, 0.47, 310, "", 252, "", 58, "item"),

    # 3. ITSS
    ("3", "ITSS", 5000, 524, 0.374, 196, "", 87, 4, 113, 2915, 0.35, 1028, "", 859, -4, 165, "company"),

    # 4. CTY VPS
    ("4", "CTY VPS", 10000, "", 0.00, "", "", "", "", -828, "", "", "", "", "", 7665, -4447, "company"),
    ("4.1", "VP VPS - hoạt động KD", "", 14951, 0.031, 466, "", 748, 419, 137, 16633, 0.14, 2288, "", 4673, 2732, 347, "item"),
    ("4.2", "HĐ đầu tư Tài chính", "", 0, 0.00, 0, "", 1579, 614, -965, 0, 0.00, 0, "", 9727, 4933, -4794, "item"),

    # 5. XESCO
    ("5", "XESCO (Xem Sơn)", 15000, "", 0.28, 2912, "", 2129, 51, 834, "", 0.27, 18667, "", 14626, 226, 4267, "company"),
    ("5.1", "Xesco - KD", "", 7182, 0.16, 1168, "", 850, "", 318, 48562, 0.15, 7129, "", 5542, 100, 1687, "sub"),
    ("", "Bán máy lẻ", "", 191, 0.26, 49, "", 71, "", -22, 3397, 0.23, 777, "", 601, "", 176, "item"),
    ("", "KD sỉ", "", 4032, 0.17, 690, "", 479, "", 211, 22834, 0.16, 3727, "", 3151, 100, 676, "item"),
    ("", "KD Online", "", 2539, 0.05, 135, "", 129, "", 6, 19679, 0.04, 769, "", 741, "", 28, "item"),
    ("", "KD Thuê máy", "", 420, 0.70, 294, "", 171, "", 123, 2653, 0.70, 1856, "", 1049, "", 807, "item"),
    ("5.2", "Xesco - KT", "", 3144, 0.55, 1744, "", 1279, "", 465, 20863, 0.55, 11538, "", 9084, 126, 2580, "sub"),
    ("", "Thuê máy", "", 1502, 0.66, 994, "", 776, "", 218, 10358, 0.67, 6958, "", 5723, 6, 1241, "item"),
    ("", "Metercharge", "", 278, 0.59, 164, "", "", "", 164, 1869, 0.60, 1114, "", "", "", 1114, "item"),
    ("", "Dịch vụ", "", 1364, 0.43, 586, "", 503, "", 83, 8636, 0.40, 3466, "", 3361, 120, 225, "item"),

    # II. MIỀN TRUNG
    ("II", "VPS MIỀN TRUNG", 3000, 1674, 0.14, 239, "", 220, 66, 85, 11251, 0.20, 2267, "", 1515, 76, 828, "header"),
    ("", "Kinh doanh máy - bán buôn", "", 993, 0.05, 49, "", "", "", "", 5840, 0.08, 496, "", "", "", "", "item"),
    ("", "Kinh doanh linh kiện - bán buôn", "", 231, 0.14, 33, "", "", "", "", 1788, 0.15, 268, "", "", "", "", "item"),
    ("", "Shopee-Online", "", 93, 0.02, 2, "", "", "", "", 806, 0.06, 45, "", "", "", "", "item"),
    ("", "Dịch vụ", "", 225, 0.43, 97, "", "", "", "", 1467, 0.49, 720, "", "", "", "", "item"),
    ("", "Thuê máy", "", 81, 0.25, 20, "", "", "", "", 623, 0.65, 402, "", "", "", "", "item"),
    ("", "Dịch vụ toàn phần", "", 46, 0.78, 36, "", "", "", "", 424, 0.67, 283, "", "", "", "", "item"),
    ("", "Bán lẻ", "", 5, 0.20, 1, "", "", "", "", 304, 0.17, 52, "", "", "", "", "item"),

    # TỔNG CỘNG
    ("★", "TỔNG CỘNG TOÀN TẬP ĐOÀN", 83000, "", 0.15, "", 5, "", 1161, 830, "", 0.23, "", 335, "", 8033, 4861, "total")
]

current_row = 7
for item in rows_data:
    stt, name, vonDT, m_ds, m_lgPct, m_lg, m_htLg, m_cp, m_tnk, m_lntt, c_ds, c_lgPct, c_lg, c_htLg, c_cp, c_tnk, c_lntt, rtype = item
    
    ws_main.cell(row=current_row, column=1, value=stt).alignment = align_center
    
    # Indentation for name
    indent = ""
    if rtype == "item": indent = "    "
    elif rtype == "sub": indent = "  "
    ws_main.cell(row=current_row, column=2, value=indent + name).alignment = align_left
    
    ws_main.cell(row=current_row, column=3, value=vonDT).alignment = align_right
    ws_main.cell(row=current_row, column=4, value=m_ds).alignment = align_right
    ws_main.cell(row=current_row, column=5, value=m_lgPct).alignment = align_right
    ws_main.cell(row=current_row, column=6, value=m_lg).alignment = align_right
    ws_main.cell(row=current_row, column=7, value=m_htLg).alignment = align_right
    ws_main.cell(row=current_row, column=8, value=m_cp).alignment = align_right
    ws_main.cell(row=current_row, column=9, value=m_tnk).alignment = align_right
    ws_main.cell(row=current_row, column=10, value=m_lntt).alignment = align_right
    
    ws_main.cell(row=current_row, column=11, value=c_ds).alignment = align_right
    ws_main.cell(row=current_row, column=12, value=c_lgPct).alignment = align_right
    ws_main.cell(row=current_row, column=13, value=c_lg).alignment = align_right
    ws_main.cell(row=current_row, column=14, value=c_htLg).alignment = align_right
    ws_main.cell(row=current_row, column=15, value=c_cp).alignment = align_right
    ws_main.cell(row=current_row, column=16, value=c_tnk).alignment = align_right
    ws_main.cell(row=current_row, column=17, value=c_lntt).alignment = align_right

    # Format numbers & styles
    row_fill = None
    row_font = font_regular
    
    if rtype == "header":
        row_fill = fill_region
        row_font = font_bold
    elif rtype == "company":
        row_fill = fill_company
        row_font = font_bold
    elif rtype == "sub":
        row_font = font_bold
    elif rtype == "total":
        row_fill = fill_total
        row_font = font_bold

    for col in range(1, 18):
        c = ws_main.cell(row=current_row, column=col)
        c.border = border_total if rtype == "total" else border_cell
        if row_fill: c.fill = row_fill
        c.font = row_font
        
        # Number formats
        if col in [5, 12] and isinstance(c.value, (int, float)):
            c.number_format = "0.0%"
        elif col in [3, 4, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17] and isinstance(c.value, (int, float)):
            if c.value < 0:
                c.number_format = '#,##0.0;(#,##0.0);"-"'
                c.font = font_red_bold
            else:
                c.number_format = '#,##0.0;(#,##0.0);"-"'

    current_row += 1

# Auto column widths
ws_main.column_dimensions["A"].width = 6
ws_main.column_dimensions["B"].width = 34
ws_main.column_dimensions["C"].width = 12
for col_letter in ["D", "F", "G", "H", "I", "J", "K", "M", "N", "O", "P", "Q"]:
    ws_main.column_dimensions[col_letter].width = 12
ws_main.column_dimensions["E"].width = 9
ws_main.column_dimensions["L"].width = 9

# Sheet 2: Hướng Dẫn Sử Dụng
ws_guide = wb.create_sheet(title="Huong_Dan_Su_Dung")
ws_guide.column_dimensions["A"].width = 5
ws_guide.column_dimensions["B"].width = 30
ws_guide.column_dimensions["C"].width = 65

guide_steps = [
    ("HƯỚNG DẪN NHẬP LIỆU VÀ KẾT NỐI TỰ ĐỘNG VÀO DASHBOARD TẬP ĐOÀN VPS", ""),
    ("1. Nguyên tắc cấu trúc:", "Mỗi dòng chỉ tiêu có mã STT và Tên nội dung tương ứng để hệ thống nhận diện."),
    ("2. Nhập số liệu các tháng tiếp theo:", "Bạn có thể nhập trực tiếp vào sheet này khi đến kỳ báo cáo mới (VD: Tháng 8, Tháng 9...) hoặc nhân bản (Duplicate) sheet này thành các tab: Thang_08, Thang_09..."),
    ("3. Tải file lên Google Drive:", "Sau khi điền số liệu, tải file này lên Google Drive cá nhân hoặc Google Drive của tập đoàn."),
    ("4. Mở bằng Google Sheets:", "Nhấp chuột phải vào file trên Drive -> Chọn 'Mở bằng Google Trang tính' (Open with Google Sheets)."),
    ("5. Chia sẻ quyền xem:", "Nhấn nút 'Chia sẻ' ở góc phải trên -> Chọn 'Bất kỳ ai có đường liên kết' -> Quyền 'Người xem'."),
    ("6. Kết nối vào Dashboard:", "Sao chép đường link Google Sheets -> Vào mục '13. Kết Quả KD' trên Dashboard -> Nhấn 'Kết nối Google Sheet' -> Dán link và nhấn Lưu. Hệ thống sẽ tự động quét số liệu ngay lập tức!")
]

ws_guide["B2"] = guide_steps[0][0]
ws_guide["B2"].font = font_title
for idx, (title, desc) in enumerate(guide_steps[1:], start=4):
    ws_guide.cell(row=idx, column=2, value=title).font = font_bold
    ws_guide.cell(row=idx, column=3, value=desc).font = font_regular

wb.save("Template_Bao_Cao_KQKD_Hop_Nhat_VPS.xlsx")
print("Saved Template_Bao_Cao_KQKD_Hop_Nhat_VPS.xlsx successfully!")
