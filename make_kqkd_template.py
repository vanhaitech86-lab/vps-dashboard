import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.utils import get_column_letter

def build_template():
    wb = openpyxl.Workbook()
    # Remove default sheet
    wb.remove(wb.active)

    # Colors
    DARK_BLUE = "0F172A"
    MID_BLUE = "1E3A8A"
    LIGHT_BLUE = "DBEAFE"
    DARK_GREEN = "064E3B"
    LIGHT_GREEN = "D1FAE5"
    HEADER_GRAY = "F1F5F9"
    BORDER_GRAY = "CBD5E1"
    RED_TEXT = "DC2626"

    font_title = Font(name="Arial", size=13, bold=True, color="000000")
    font_sub = Font(name="Arial", size=9.5, italic=True, color="475569")
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

    # Master definition of 38 rows: (stt, name, vonDT, type, t7_data)
    # t7_data: (m_ds, m_lgPct, m_lg, m_htLg, m_cp, m_tnk, m_lntt, c_ds, c_lgPct, c_lg, c_htLg, c_cp, c_tnk, c_lntt)
    rows_def = [
        # I. MIỀN BẮC
        ("I", "MIỀN BẮC", 90000, "header", (41454, 0.10, 6070, 5, 6865, 1095, -89, 197473, 0.21, 44982, 335, 49241, 7731, -234)),
        ("1", "THH (Tân Hồng Hà)", 50000, "company", (8804, 0.18, 1568, 5, 1341, 8, 245, 66583, 0.21, 10082, 335, 12453, 57, 2376)),
        ("a", "Khối dịch vụ kỹ thuật", "", "sub", (2578, 0.335, 864, "", 798, 1, 67, 16146, 0.36, 5747, 54, 5516, 1, 286)),
        ("a.1", "Tổ Dịch vụ", "", "item", (1346, 0.26, 347.5, "", "", "", "", 8304.5, 0.33, 2745.2, 53, "", "", "")),
        ("a.2", "Tổ mực in", "", "item", (292, 0.50, 144.7, "", "", "", "", 2054.6, 0.51, 1058.0, "", "", "", "")),
        ("a.3", "Thuê máy", "", "item", (605, 0.38, 231.1, "", "", "", "", 3654.1, 0.33, 1192.3, "", "", "", "")),
        ("a.4", "Metercharge", "", "item", (233, 0.61, 141.0, "", "", "", "", 1459.2, 0.51, 737.6, "", "", "", "")),
        ("a.5", "Kinh doanh Online", "", "item", (102, -0.01, -0.6, 1, "", "", "", 673.4, 0.02, 14.1, 1, "", "", "")),
        ("b", "Kinh doanh tổng hợp", "", "sub", (1139, 0.15, 174.6, "", 165, 10, 10, 12938, 0.08, 1034.7, 9, 1157, 47, -66)),
        ("c", "Kinh doanh bán buôn", "", "sub", (4792, 0.10, 473.1, 5, 311, 7, 178, 35000, 0.09, 2275.1, 271, 2438, 10, 119)),
        ("d", "Dự án", "", "sub", (295, 0.19, 56.1, "", 67, "", -10, 2500, 0.41, 1025, "", 3342, "", 2038)),
        
        # 2. Việt
        ("2", "Việt", 10000, "company", (6848, 0.203, 1390, 0, 983, 7, 382, 40294, 0.21, 8562, "", 6903, 13, 1672)),
        ("2.1", "Thuê máy", "", "item", (1565, 0.59, 924, "", 653, "", 271, 10876, 0.58, 6285, "", 4513, 11.4, 1783)),
        ("2.2", "KDTH", "", "item", (1991, 0.08, 151, "", 144, 7, 14, 12624, 0.08, 970, "", 1022, 1.5, -51)),
        ("2.3", "KD online", "", "item", (3135, 0.067, 211, "", 149, "", 62, 16138, 0.06, 998, "", 1116, 0, -118)),
        ("2.4", "Cửa hàng", "", "item", (157, 0.499, 78.1, "", 37, "", 42, 656, 0.47, 310, "", 252, "", 58)),

        # 3. ITSS
        ("3", "ITSS", 5000, "company", (524, 0.374, 196, "", 87, 4, 113, 2915, 0.35, 1028, "", 859, -4, 165)),

        # 4. CTY VPS
        ("4", "CTY VPS", 10000, "company", (14951, 0.00, "", "", 2327, 1033, -828, 16633, "", 2288, "", 14400, 7665, -4447)),
        ("4.1", "VP VPS - hoạt động KD", "", "item", (14951, 0.031, 466, "", 748, 419, 137, 16633, 0.14, 2288, "", 4673, 2732, 347)),
        ("4.2", "HĐ đầu tư Tài chính", "", "item", (0, 0.00, 0, "", 1579, 614, -965, 0, 0.00, 0, "", 9727, 4933, -4794)),

        # 5. XESCO
        ("5", "XESCO (Xem Sơn)", 15000, "company", (10326, 0.28, 2912, "", 2129, 51, 834, 69425, 0.27, 18667, "", 14626, 226, 4267)),
        ("5.1", "Xesco - KD", "", "sub", (7182, 0.16, 1168, "", 850, "", 318, 48562, 0.15, 7129, "", 5542, 100, 1687)),
        ("•", "Bán máy lẻ", "", "item", (191, 0.26, 49, "", 71, "", -22, 3397, 0.23, 777, "", 601, "", 176)),
        ("•", "KD sỉ", "", "item", (4032, 0.17, 690, "", 479, "", 211, 22834, 0.16, 3727, "", 3151, 100, 676)),
        ("•", "KD Online", "", "item", (2539, 0.05, 135, "", 129, "", 6, 19679, 0.04, 769, "", 741, "", 28)),
        ("•", "KD Thuê máy", "", "item", (420, 0.70, 294, "", 171, "", 123, 2653, 0.70, 1856, "", 1049, "", 807)),
        ("5.2", "Xesco - KT", "", "sub", (3144, 0.55, 1744, "", 1279, "", 465, 20863, 0.55, 11538, "", 9084, 126, 2580)),
        ("•", "Thuê máy", "", "item", (1502, 0.66, 994, "", 776, "", 218, 10358, 0.67, 6958, "", 5723, 6, 1241)),
        ("•", "Metercharge", "", "item", (278, 0.59, 164, "", "", "", 164, 1869, 0.60, 1114, "", "", "", 1114)),
        ("•", "Dịch vụ", "", "item", (1364, 0.43, 586, "", 503, "", 83, 8636, 0.40, 3466, "", 3361, 120, 225)),

        # II. MIỀN TRUNG
        ("II", "VPS MIỀN TRUNG", 3000, "header", (1674, 0.14, 239, "", 220, 66, 85, 11251, 0.20, 2267, "", 1515, 76, 828)),
        ("•", "Kinh doanh máy - bán buôn", "", "item", (993, 0.05, 49, "", "", "", "", 5840, 0.08, 496, "", "", "", "")),
        ("•", "Kinh doanh linh kiện - bán buôn", "", "item", (231, 0.14, 33, "", "", "", "", 1788, 0.15, 268, "", "", "", "")),
        ("•", "Shopee-Online", "", "item", (93, 0.02, 2, "", "", "", "", 806, 0.06, 45, "", "", "", "")),
        ("•", "Dịch vụ", "", "item", (225, 0.43, 97, "", "", "", "", 1467, 0.49, 720, "", "", "", "")),
        ("•", "Thuê máy", "", "item", (81, 0.25, 20, "", "", "", "", 623, 0.65, 402, "", "", "", "")),
        ("•", "Dịch vụ toàn phần", "", "item", (46, 0.78, 36, "", "", "", "", 424, 0.67, 283, "", "", "", "")),
        ("•", "Bán lẻ", "", "item", (5, 0.20, 1, "", "", "", "", 304, 0.17, 52, "", "", "", "")),

        # TỔNG CỘNG
        ("★", "TỔNG CỘNG TOÀN TẬP ĐOÀN", 93000, "total", (43128, 0.15, 6309, 5, 7085, 1161, 830, 208724, 0.23, 47249, 335, 50756, 8033, 4861))
    ]

    # 1. TAB HƯỚNG DẪN SỬ DỤNG
    ws_guide = wb.create_sheet(title="00_Huong_Dan_Su_Dung")
    ws_guide.column_dimensions["A"].width = 4
    ws_guide.column_dimensions["B"].width = 30
    ws_guide.column_dimensions["C"].width = 78

    ws_guide.merge_cells("B2:C2")
    ws_guide["B2"] = "HƯỚNG DẪN NHẬP LIỆU & QUÉT DỮ LIỆU TỰ ĐỘNG - DASHBOARD TẬP ĐOÀN VPS"
    ws_guide["B2"].font = font_title
    ws_guide["B2"].alignment = align_left

    guide_steps = [
        ("1. Cấu trúc chuẩn hóa 12 tháng:", "File Excel này được chia sẵn thành 12 tab tương ứng từ 'Thang_01' đến 'Thang_12'. Cấu trúc 38 dòng chỉ tiêu và thứ tự cột số liệu hoàn toàn đồng nhất 100% giữa tất cả các tháng."),
        ("2. Vốn đầu tư đã điền sẵn:", "Cột Vốn ĐT (Cột C) đã được thiết lập sẵn chuẩn xác: THH (50.000), Việt (10.000), ITSS (5.000), VP VPS (10.000), Xem Sơn (15.000), Miền Trung (3.000). Toàn tập đoàn: 93.000 Tr.đ. Bạn không cần nhập lại cột này."),
        ("3. Cách nhập liệu siêu nhanh (Copy-Paste):", "Mở tab tháng cần nhập (VD: Thang_01, Thang_02,... Thang_06). Từ bảng tính báo cáo nội bộ của bạn, bôi đen và COPY nguyên khối 14 cột số liệu (Doanh số, Lãi gộp, Chi phí, LNTT...) rồi DÁN (Ctrl+V) thẳng vào dải cột từ D đến Q. Chỉ mất đúng 10 giây cho mỗi tháng!"),
        ("4. Số liệu tham khảo Tháng 07:", "Tab 'Thang_07' và 'Bao_Cao_KQKD_Thang_07' đã được điền sẵn 100% số liệu thực tế đã qua đối soát kiểm toán chính xác của Tập đoàn VPS làm mẫu chuẩn."),
        ("5. Tải lên Google Drive:", "Sau khi điền xong số liệu Tháng 1 đến Tháng 6 (hoặc các tháng có sẵn), lưu file và tải lên Google Drive của bạn hoặc của Tập đoàn."),
        ("6. Mở bằng Google Trang Tính (Google Sheets):", "Nhấp chuột phải vào file trên Google Drive -> Chọn 'Mở bằng Google Trang tính' (Open with Google Sheets)."),
        ("7. Chia sẻ quyền xem:", "Ở góc trên cùng bên phải Google Sheets, nhấn nút 'Chia sẻ' (Share) -> Tại mục Quyền truy cập chung, chọn 'Bất kỳ ai có đường liên kết' (Anyone with the link) với quyền 'Người xem' (Viewer) -> Nhấn 'Sao chép đường liên kết'."),
        ("8. Kết nối & Quét tự động vào Dashboard:", "Mở Dashboard Tập đoàn VPS -> Chọn mục '13. Kết Quả KD' -> Nhấn nút 'Kết nối Google Sheet' -> Dán link vừa sao chép vào -> Nhấn 'Lưu & Quét Dữ Liệu'. Hệ thống sẽ tự động quét và nạp trọn bộ tất cả các tháng cùng lúc!")
    ]

    for idx, (title, desc) in enumerate(guide_steps, start=4):
        ws_guide.cell(row=idx, column=2, value=title).font = font_bold
        c_desc = ws_guide.cell(row=idx, column=3, value=desc)
        c_desc.font = font_regular
        c_desc.alignment = Alignment(wrap_text=True, vertical="center")
        ws_guide.row_dimensions[idx].height = 28

    # Sub-headers tuple
    sub_headers = [
        (4, "DS"), (5, "% LG"), (6, "LG"), (7, "HT LG"), (8, "CHI PHÍ"), (9, "TN KHÁC"), (10, "LNTT"),
        (11, "DS"), (12, "% LG"), (13, "LG"), (14, "HT LG"), (15, "CHI PHÍ"), (16, "TN KHÁC"), (17, "LNTT")
    ]

    # Helper to generate a monthly sheet
    def create_month_sheet(title, month_num, is_actual_t7=False):
        ws = wb.create_sheet(title=title)
        m_str = f"{month_num:02d}"

        # Header Titles
        ws.merge_cells("A1:Q1")
        ws["A1"] = "MÁY VĂN PHÒNG HÀNG ĐẦU VIỆT NAM - TẬP ĐOÀN VPS"
        ws["A1"].font = Font(name="Arial", size=10, bold=True, color="059669")
        ws["A1"].alignment = align_center

        ws.merge_cells("A2:Q2")
        ws["A2"] = "BÁO CÁO KẾT QUẢ KINH DOANH HỢP NHẤT (P&L)"
        ws["A2"].font = font_title
        ws["A2"].alignment = align_center

        ws.merge_cells("A3:Q3")
        ws["A3"] = f"TỔNG HỢP DOANH SỐ, LỢI NHUẬN TRƯỚC THUẾ • KỲ BÁO CÁO: THÁNG {m_str}/2026 VÀ LŨY KẾ {month_num} THÁNG 2026"
        ws["A3"].font = font_sub
        ws["A3"].alignment = align_center

        ws["Q4"] = "Đơn vị tính: Triệu đồng"
        ws["Q4"].font = Font(name="Arial", size=8.5, italic=True)
        ws["Q4"].alignment = align_right

        # Table Column Headers
        ws.merge_cells("A5:A6")
        ws["A5"] = "TT"
        ws.merge_cells("B5:B6")
        ws["B5"] = "NỘI DUNG"
        ws.merge_cells("C5:C6")
        ws["C5"] = "VỐN ĐT"

        ws.merge_cells("D5:J5")
        ws["D5"] = f"THÁNG {m_str}"

        ws.merge_cells("K5:Q5")
        ws["K5"] = f"LŨY KẾ {month_num} THÁNG 2026"

        for col_idx in [1, 2, 3]:
            c = ws.cell(row=5, column=col_idx)
            c.font = font_header
            c.alignment = align_center
            c.fill = fill_dark

        ws["D5"].font = font_header
        ws["D5"].alignment = align_center
        ws["D5"].fill = fill_thang

        ws["K5"].font = font_header
        ws["K5"].alignment = align_center
        ws["K5"].fill = fill_luyke

        for col_idx, text in sub_headers:
            c = ws.cell(row=6, column=col_idx, value=text)
            c.font = font_header
            c.alignment = align_center
            c.fill = fill_thang if col_idx <= 10 else fill_luyke

        # Populate rows
        curr_row = 7
        for item in rows_def:
            stt, name, vonDT, rtype, t7_vals = item
            
            # STT
            ws.cell(row=curr_row, column=1, value=stt).alignment = align_center
            
            # Indent name
            indent = ""
            if rtype == "item": indent = "    "
            elif rtype == "sub": indent = "  "
            ws.cell(row=curr_row, column=2, value=indent + name).alignment = align_left
            
            # Vốn ĐT
            ws.cell(row=curr_row, column=3, value=vonDT).alignment = align_right

            # Data columns D:Q
            if is_actual_t7:
                m_ds, m_lgPct, m_lg, m_htLg, m_cp, m_tnk, m_lntt, c_ds, c_lgPct, c_lg, c_htLg, c_cp, c_tnk, c_lntt = t7_vals
                data_vals = [m_ds, m_lgPct, m_lg, m_htLg, m_cp, m_tnk, m_lntt, c_ds, c_lgPct, c_lg, c_htLg, c_cp, c_tnk, c_lntt]
            else:
                data_vals = [""] * 14

            for offset, val in enumerate(data_vals):
                col_num = 4 + offset
                c = ws.cell(row=curr_row, column=col_num, value=val)
                c.alignment = align_right

            # Row styles & formatting
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
                c = ws.cell(row=curr_row, column=col)
                c.border = border_total if rtype == "total" else border_cell
                if row_fill: c.fill = row_fill
                c.font = row_font

                # Number format
                if col in [5, 12]:
                    c.number_format = "0.0%"
                elif col in [3, 4, 6, 7, 8, 9, 10, 11, 13, 14, 15, 16, 17]:
                    c.number_format = '#,##0.0;(#,##0.0);"-"'
                    if isinstance(c.value, (int, float)) and c.value < 0:
                        c.font = font_red_bold

            curr_row += 1

        # Column widths
        ws.column_dimensions["A"].width = 6
        ws.column_dimensions["B"].width = 34
        ws.column_dimensions["C"].width = 12
        for cl in ["D", "F", "G", "H", "I", "J", "K", "M", "N", "O", "P", "Q"]:
            ws.column_dimensions[cl].width = 12
        ws.column_dimensions["E"].width = 9
        ws.column_dimensions["L"].width = 9

        ws.freeze_panes = "D7"

    # Create sheets for months 1 to 12
    for m in range(1, 13):
        title = f"Thang_{m:02d}"
        create_month_sheet(title, m, is_actual_t7=(m == 7))

    # Also keep alias sheet Bao_Cao_KQKD_Thang_07 for backward compatibility
    create_month_sheet("Bao_Cao_KQKD_Thang_07", 7, is_actual_t7=True)

    out_file = "Template_Bao_Cao_KQKD_Hop_Nhat_VPS.xlsx"
    wb.save(out_file)
    print(f"Successfully generated {out_file} with sheets: {wb.sheetnames}")

if __name__ == "__main__":
    build_template()
