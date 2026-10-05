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

5. **Khóa Cứng & Ẩn Báo Cáo KQKD và Kế Hoạch Dòng Tiền (Chỉ CEO & ADMIN):**
   - Hai phân hệ chiến lược tối mật: `13. Kết Quả KD` và `14. Kế Hoạch Dòng Tiền` **chỉ dành riêng cho Chủ Tịch / CEO và Quản Trị Viên (ADMIN)**.
   - Khi các Giám đốc đơn vị thành viên (`THH`, `VIET`, `XEMSON`, `VPSM`, `ITSS`, `VPVPS`) đăng nhập:
     + Hai mục menu `13. Kết Quả KD` và `14. Kế Hoạch Dòng Tiền` trên thanh điều hướng bên trái (sidebar) **bị ẩn hoàn toàn**.
     + Nếu cố tình truy cập trực tiếp, hệ thống lập tức bật cảnh báo bảo mật, chặn truy cập và tự động điều hướng về màn hình Tổng Quan (Dashboard).

6. **Đăng Nhập Nhanh 1 Chạm:**
   - Trên màn hình đăng nhập web có sẵn các nút bấm đăng nhập nhanh cho CEO, ADMIN và 6 đơn vị để tiện kiểm tra và bàn giao.

---

### ⏰ 4. HỆ THỐNG THÔNG BÁO TỰ ĐỘNG & BÁO CÁO VƯỢT CẤP LÊN CHỦ TỊCH / CEO

Hệ thống đã được tích hợp tính năng **Tự Động Hóa Giám Sát Kỷ Luật Đọc Báo Cáo** cho Ban Giám Đốc các đơn vị:

1. **Cơ Chế Đặt Giờ Xem Báo Cáo:**
   - Giờ quy định mặc định: **`08:30`** sáng hàng ngày (từ Thứ 2 đến Thứ 7).
   - Thời gian cho phép trễ (Grace Period): **`30 phút`** (có thể cấu hình 15p, 30p, 60p, 120p).
   - Có thể thiết lập giờ xem riêng cho từng Giám đốc đơn vị.

2. **Kịch Bản Nhắc Nhở Giám Đốc (Reminders):**
   - Khi đến giờ hẹn (08:30): Hệ thống tự động gửi thông báo nhắc nhở đến Giám đốc đơn vị.
   - Khi Giám đốc đăng nhập vào Dashboard: Hiển thị ngay **Thanh Banner Nhắc Nhở** màu vàng nổi bật kèm nút bấm:
     👉 `[✅ XÁC NHẬN ĐÃ ĐỌC BÁO CÁO]`.
   - Giám đốc rà soát số liệu và bấm xác nhận (kèm ghi chú/chỉ đạo nếu có) -> Hệ thống lập tức lưu vết thời gian chính xác, chuyển trạng thái sang 🟢 **ĐÃ ĐỌC BÁO CÁO**.

3. **Cơ Chế Tự Động Báo Cáo Vượt Cấp Lên Chủ Tịch / CEO (Escalation Alert):**
   - Sau thời gian gia hạn (ví dụ quá 09:00 sáng) mà Giám đốc **CHƯA BẤM ĐỌC**:
   - Hệ thống tự động chuyển trạng thái đơn vị đó sang 🔴 **QUÁ HẠN (VI PHẠM)**.
   - **TỰ ĐỘNG PHÁT CẢNH BÁO LÊN CHỦ TỊCH / CEO**:
     - 🔔 Chuông thông báo đỏ nhấp nháy trên thanh tiêu đề của CEO.
     - 🚨 Hiển thị **Thanh Cảnh Báo Khẩn Màu Đỏ (CEO Escalation Banner)** ngay trên trang chủ của CEO thông báo rõ các Giám đốc đang vi phạm.
     - 📱 Tự động gửi tin nhắn báo cáo vượt cấp qua **Zalo Bot / HAITECH BOT / Telegram Bot / Webhook** trực tiếp vào điện thoại của Chủ tịch CEO.
     - 📝 Tự động ghi chép sự kiện vi phạm vào **Sổ Nhật Ký Kiểm Toán (Audit Trail)** phục vụ họp giao ban và đánh giá KPI tháng.

4. **Phân Hệ "15. Lịch & Giám Sát Báo Cáo" (Dành Riêng Cho CEO / ADMIN):**
   - **Bảng Ma Trận Thời Gian Thực (Live Monitoring Board):** Giám sát trạng thái 6 đơn vị hôm nay (Đã đọc / Đang chờ / Quá hạn).
   - **Thao Tác Khẩn Cấp:** Nút `[🔔 Nhắc nhở ngay]`, nút `[🚨 Báo CEO ngay]`, nút `[✅ Duyệt thủ công]`.
   - **Bộ Cài Đặt:** Đổi giờ xem, đổi thời gian trễ, bật/tắt âm thanh chuông, cấu hình Web Push Desktop, Token Telegram Bot, Webhook Zalo Bot.
   - **Sổ Nhật Ký Kiểm Toán:** Lưu vết mọi lịch sử gửi nhắc nhở, thời điểm đọc và các vụ cảnh báo vượt cấp.

