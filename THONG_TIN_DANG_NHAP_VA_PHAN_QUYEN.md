# 📊 HỆ THỐNG QUẢN TRỊ & BÁO CÁO TẬP ĐOÀN VPS
## BẢNG PHÂN QUYỀN TRUY CẬP (RBAC) & LINK ĐĂNG NHẬP

---

### 🌐 1. ĐỊA CHỈ TRUY CẬP WEB (LINK DASHBOARD)

* **Truy cập trực tiếp trên máy tính chủ:**
  👉 [http://localhost:3000](http://localhost:3000)

* **Truy cập từ các thiết bị khác trong cùng mạng nội bộ (LAN / Wi-Fi):**
  👉 [http://192.168.168.168:3000](http://192.168.168.168:3000)

---

### 🔑 2. DANH SÁCH TÀI KHOẢN & PHÂN QUYỀN TRUY CẬP

| STT | Cấp Bậc / Vai Trò | Tên Đăng Nhập | Mật Khẩu | Quyền Hạn Dữ Liệu | Đơn Vị Được Phép Xem |
| :---: | :--- | :---: | :---: | :--- | :--- |
| **1** | **👑 Quản Trị Viên Tập Đoàn** | `ADMIN` | `Admin123a@` *(hoặc `123a@`)* | **Toàn quyền hệ thống**, xem toàn bộ tập đoàn và chuyển đổi lọc xem từng công ty | Tất cả 6 đơn vị + Tổng |
| **2** | **👑 Chủ Tịch / Tổng Giám Đốc** | `CEO` | `123a@` | **Toàn quyền điều hành**, xem số liệu hợp nhất và chi tiết từng công ty | Tất cả 6 đơn vị + Tổng |
| **3** | **🏢 Giám Đốc Tân Hồng Hà** | `THH` | `123a@` | **Chỉ xem dữ liệu nội bộ**, không nhìn thấy số liệu của đơn vị khác | **Tân Hồng Hà** |
| **4** | **🏢 Giám Đốc Công Ty Việt** | `VIET` | `123a@` | **Chỉ xem dữ liệu nội bộ**, không nhìn thấy số liệu của đơn vị khác | **Công ty Việt** |
| **5** | **🏢 Giám Đốc Xem Sơn** | `XESCO` *(hoặc `XEMSON`)* | `123a@` | **Chỉ xem dữ liệu nội bộ**, không nhìn thấy số liệu của đơn vị khác | **Xem Sơn** |
| **6** | **🏢 Giám Đốc VPS Miền Trung** | `VPSM` | `123a@` | **Chỉ xem dữ liệu nội bộ**, không nhìn thấy số liệu của đơn vị khác | **VPS Miền Trung** |
| **7** | **🏢 Giám Đốc ITSS** | `ITSS` | `123a@` | **Chỉ xem dữ liệu nội bộ**, không nhìn thấy số liệu của đơn vị khác | **Công ty ITSS** |
| **8** | **🏢 Giám Đốc Văn Phòng VPS** | `VPVPS` | `123a@` | **Chỉ xem dữ liệu nội bộ**, không nhìn thấy số liệu của đơn vị khác | **Văn phòng VPS** |

---

### 🛡️ 3. NGUYÊN TẮC CÁCH LY BẢO MẬT ĐÃ TRIỂN KHAI

1. **Khóa Cứng Bộ Lọc Công Ty:**
   - Khi tài khoản đơn vị đăng nhập, bộ lọc trên thanh tiêu đề bị khóa và hiển thị nhãn: `🔒 Đơn vị: [Tên đơn vị]`.
   - Người dùng đơn vị không thể chọn công ty khác.

2. **Cách Ly 6 Thẻ KPI Tổng Quan (Overview):**
   - Tài khoản `CEO`/`ADMIN`: Thẻ tính toán tổng hợp toàn bộ tập đoàn.
   - Tài khoản Đơn vị: Thẻ chỉ tính toán doanh số, lãi gộp, định biên nhân sự, tồn kho, công nợ của **chính đơn vị đó**.

3. **Cách Ly Ma Trận Hiệu Suất (Scorecard Matrix):**
   - Tài khoản `CEO`/`ADMIN`: Bảng hiển thị 8 cột so sánh đầy đủ 6 đơn vị và tổng.
   - Tài khoản Đơn vị: Ẩn hoàn toàn cột của các công ty khác. Chỉ hiển thị đúng 3 cột: `Chỉ Tiêu Đo Lường | [Tên Đơn Vị] | Tình Trạng`.

4. **Cách Ly Các Phân Hệ Chuyên Sâu:**
   - **Doanh Số & Lãi Gộp 7 Mảng:** Tự động chọn và khóa cứng vào nghiệp vụ của đơn vị đăng nhập.
   - **Công Nợ:** Chỉ hiển thị biểu đồ và danh sách khách hàng nợ của đơn vị được cấp phép.
   - **Tồn Kho, Nhân Sự, Khách Hàng, Chi Phí:** Chỉ trích xuất số liệu của đơn vị tương ứng.

5. **Đăng Nhập Nhanh 1 Chạm:**
   - Trên màn hình đăng nhập web có sẵn các nút bấm đăng nhập nhanh cho CEO, ADMIN và 6 đơn vị để tiện kiểm tra và bàn giao.
