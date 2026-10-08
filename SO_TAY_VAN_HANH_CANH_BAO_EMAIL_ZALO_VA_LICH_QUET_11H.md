# SỔ TAY VẬN HÀNH HỆ THỐNG GIÁM SÁT, QUÉT BÁO CÁO 11H THỨ 2 VÀ TÍCH HỢP THÔNG BÁO EMAIL & ZALO

**Tập đoàn Công nghệ VPS**  
*Tài liệu chuẩn dành cho: Chủ Tịch / Tổng Giám Đốc (CEO) & Quản Trị Viên Hệ Thống (Admin)*  
*Cập nhật: Tháng 10/2026 | Phiên bản: 2.5 Multi-Channel Alert*

---

## MỤC LỤC
1. [Tổng Quan Cơ Chế Hoạt Động](#1-tổng-quan-cơ-chế-hoạt-động)
2. [Hướng Dẫn Cấu Hình Email Nhận Báo Cáo (3 Bước)](#2-hướng-dẫn-cấu-hình-email-nhận-báo-cáo-3-bước)
3. [Hướng Dẫn Kết Nối Zalo Nhận Tin Nhắn Cảnh Báo](#3-hướng-dẫn-kết-nối-zalo-nhận-tin-nhắn-cảnh-báo)
4. [Lịch Quét Tự Động 11h Thứ 2 & Thao Tác Quét Thủ Công Tức Thời](#4-lịch-quét-tự-động-11h-thứ-2--thao-tác-quét-thủ-công-tức-thời)
5. [Quy Định Phân Quyền Bảo Mật RBAC (Khóa KQKD & Dòng Tiền)](#5-quy-định-phân-quyền-bảo-mật-rbac-khóa-kqkd--dòng-tiền)
6. [Cấu Trúc Tệp Tin & Lưu Trữ Dữ Liệu](#6-cấu-trúc-tệp-tin--lưu-trữ-dữ-liệu)
7. [Xử Lý Sự Cố Thường Gặp (Troubleshooting)](#7-xử-lý-sự-cố-thường-gặp-troubleshooting)

---

## 1. TỔNG QUAN CƠ CHẾ HOẠT ĐỘNG

Hệ thống hoạt động theo mô hình giám sát chủ động 24/7 với 2 luồng cảnh báo chính:

```
                  ┌────────────────────────────────────────────────────────┐
                  │                 HỆ THỐNG GIÁM SÁT VPS                  │
                  └────────────────────────────────────────────────────────┘
                                    │
          ┌─────────────────────────┴────────────────────────┐
          ▼                                                  ▼
┌──────────────────────────────┐              ┌──────────────────────────────┐
│  ⏰ 11:00 THỨ 2 HÀNG TUẦN    │              │ ⏰ 08:30 HÀNG NGÀY           │
│  Tự động quét 6 Google Sheet │              │ Nhắc nhở duyệt số liệu       │
│  của 6 đơn vị thành viên     │              │ Quá hạn 30p: Báo cáo vượt cấp│
└──────────────┬───────────────┘              └──────────────┬───────────────┘
               │                                             │
               └──────────────────────┬──────────────────────┘
                                      ▼
                      ┌──────────────────────────────┐
                      │    BỘ ĐIỀU PHỐI ĐA KÊNH      │
                      │  (notification_service.js)   │
                      └──────────────┬───────────────┘
                                     │
                 ┌───────────────────┴───────────────────┐
                 ▼                                       ▼
    ┌───────────────────────────┐           ┌───────────────────────────┐
    │ 📧 KÊNH EMAIL (HTML VIP)  │           │ 💬 KÊNH ZALO (TIN NHẮN)   │
    │ - Tỷ lệ hoàn thành 6/6    │           │ - Thông báo rung chuông   │
    │ - Đơn vị thiếu bảng nào   │           │ - Danh sách vi phạm       │
    │ - Link mở từng Sheet      │           │ - Link mở Dashboard       │
    └───────────────────────────┘           └───────────────────────────┘
```

---

## 2. HƯỚNG DẪN CẤU HÌNH EMAIL NHẬN BÁO CÁO (3 BƯỚC)

Hệ thống sử dụng thư viện **Nodemailer** chuẩn doanh nghiệp, cho phép gửi email tự động với giao diện HTML thiết kế riêng cho Ban Lãnh Đạo.

### Bước 2.1: Tạo "Mật Khẩu Ứng Dụng" (Google App Password) cho Gmail
> **Tại sao cần bước này?** Google bảo mật 2 lớp không cho phép ứng dụng bên ngoài dùng mật khẩu đăng nhập Gmail thông thường. Bạn chỉ cần tạo mật khẩu ứng dụng gồm 16 ký tự dùng riêng cho hệ thống VPS.

1. Đăng nhập vào tài khoản Google của bạn (hoặc tài khoản Gmail dùng để phát thông báo, ví dụ: `alert.vpsgroup@gmail.com`).
2. Truy cập trực tiếp đường link quản lý bảo mật của Google:  
   👉 **https://myaccount.google.com/apppasswords**
3. Tại ô **"Tên ứng dụng"**, nhập: `VPS Dashboard Alert` -> Bấm nút **Tạo (Create)**.
4. Google sẽ hiển thị một mã gồm **16 ký tự chữ cái** (ví dụ: `abcd efgh ijkl mnop`).  
   *Hãy sao chép (copy) 16 ký tự này.*

### Bước 2.2: Điền Cấu Hình Trên Dashboard VPS
1. Mở trình duyệt và truy cập: **http://localhost:3000/#report-monitor** (Menu **15. Lịch & Giám Sát Báo Cáo**).
2. Cuộn xuống phần: **CẤU HÌNH TÍCH HỢP EMAIL & ZALO NHẬN BÁO CÁO (CHỦ TỊCH / CEO)**.
3. Tại cột bên trái (**KÊNH THÔNG BÁO EMAIL**), điền các mục sau:
   * **Kích hoạt:** Đánh dấu tích `[✓]`.
   * **Email Nhận Thông Báo:** Nhập email của bạn (mặc định: `baocaoquantri.vps@gmail.com`). *Có thể nhập nhiều email cách nhau bằng dấu phẩy nếu muốn gửi cho nhiều lãnh đạo cùng lúc.*
   * **Loại SMTP:** Chọn `Gmail (Khuyên Dùng)`.
   * **Tên Người Gửi:** `Hệ Thống Báo Cáo VPS`.
   * **Email Tài Khoản Gửi:** Nhập địa chỉ Gmail gửi tin (mặc định: `baocaoquantri.vps@gmail.com`).
   * **Mật Khẩu Ứng Dụng (App Pass):** Dán 16 ký tự Google vừa cấp ở Bước 2.1 vào đây.
   * **Tùy chọn:** Bật tích `Nhận Báo Cáo Quét Google Sheets 11h Thứ 2` và `Nhận Cảnh Báo Vi Phạm Quá Hạn`.
4. Bấm nút **"Lưu Cấu Hình Email & Zalo"** (màu xanh dương).

### Bước 2.3: Bấm Gửi Email Thử Nghiệm Ngay
1. Bấm nút: **"✉️ Gửi Email Thử Nghiệm Ngay"**.
2. Hệ thống sẽ kết nối qua SMTP và gửi 1 email kiểm tra vào hòm thư nhận của bạn.
3. Mở hòm thư `baocaoquantri.vps@gmail.com` để kiểm tra. Đồng thời, bảng **Nhật Ký Chuyển Phát** phía dưới sẽ cập nhật trạng thái `● ĐÃ GỬI THÀNH CÔNG`.

---

## 3. HƯỚNG DẪN KẾT NỐI ZALO NHẬN TIN NHẮN CẢNH BÁO

Hệ thống hỗ trợ đẩy thông báo ngay lập tức về số điện thoại Zalo cá nhân của bạn để kịp thời chỉ đạo điều hành.

### Bước 3.1: Cấu hình Zalo trên Dashboard
1. Truy cập mục **15. Lịch & Giám Sát Báo Cáo** (`http://localhost:3000/#report-monitor` hoặc trên Vercel).
2. Tại cột bên phải (**KÊNH THÔNG BÁO ZALO**), điền:
   * **Kích hoạt:** Đánh dấu tích `[✓]`.
   * **Số Điện Thoại Zalo Của Bạn:** Số điện thoại nhận tin (mặc định: `0913301459`).
   * **Phương Thức Kết Nối:** Chọn `Webhook Bot / HAITECH BOT`.
   * **Webhook Gateway URL:** Giữ mặc định `http://localhost:5000/api/zalo-webhook` (hoặc đường dẫn Webhook Gateway của đơn vị nếu dùng Cloud Gateway/n8n).
3. Bấm **"Lưu Cấu Hình Email & Zalo"**.

### Bước 3.2: Kiểm tra tin nhắn Zalo
* Bấm nút: **"💬 Gửi Tin Nhắn Zalo Thử Nghiệm"**.
* Hệ thống sẽ đóng gói bản tin Zalo với tiêu đề và nội dung chào mừng, chuyển qua hàng đợi gửi tới số điện thoại của bạn.

---

## 4. LỊCH QUÉT TỰ ĐỘNG 11H THỨ 2 & THAO TÁC QUÉT THỦ CÔNG TỨC THỜI

### 4.1. Cơ chế quét tự động 11:00 sáng Thứ 2 hàng tuần
* **Thời gian kích hoạt:** Đúng **11:00 Thứ 2 hàng tuần**.
* **Phạm vi kiểm tra:** Tự động kết nối tới cả 6 file Google Sheets của 6 đơn vị thành viên:
  1. **THH** (Tân Hồng Hà) - `1TP2ISnfspKYLuN7U9eETeggBMWkQbaRl_G1X8juCePY`
  2. **Việt** - `1Pp7HC4cgUVAM69DDOGTvRct0kRiJ8hqNRj5K339xH4o`
  3. **Xem Sơn** - `1yXyzTKccGWQSn0mCNFmxPkHyx5auTwQw2SZcngPNIFg`
  4. **VPS M** (Miền Trung) - `13o7mqOd_30DbYqRhF18qn_yTqno3FzAWeqZDJ6nVTFA`
  5. **ITSS** - `1JHGl2WSw8zezqWXSIJrKHWYpnW8nIatedn4UbzPilVM`
  6. **Văn phòng VPS** - `1pHdTs3sM3RMF1ST6eWenuo947hG66V_kLU6FupNJZcE`
* **Tiêu chí đánh giá đầy đủ:** Kiểm tra dữ liệu thực tế tại 6 phân hệ cốt lõi:
  * `DOANH SỐ VÀ LÃI GỘP` (Đủ 8 phòng ban kinh doanh chuẩn)
  * `Công nợ`
  * `Khách hàng`
  * `Tồn kho`
  * `Nhân sự`
  * `Chi Phí`

### 4.2. Xử lý kết quả quét
* **Nếu có đơn vị chưa hoàn tất:**
  * Hệ thống lập danh sách cụ thể: *Tên đơn vị + Phân hệ còn thiếu*.
  * Tự động gửi Email cảnh báo tiêu đề đỏ: `🚨 CẢNH BÁO 11H THỨ 2: [Tên đơn vị] Chưa Hoàn Thành Nhập Google Sheets`.
  * Tự động bắn tin Zalo khẩn cấp tới số điện thoại của CEO.
  * Kèm link mở trực tiếp từng Google Sheet của đơn vị để bấm vào xem ngay.
* **Nếu tất cả 6/6 đơn vị đều đã nhập đủ:**
  * Gửi Email báo cáo tích xanh: `✅ 6/6 Đơn Vị Đã Hoàn Thành Báo Cáo Tuần`.

### 4.3. Cách quét kiểm tra thủ công tức thời (Bất kỳ lúc nào)
Bạn không cần phải đợi tới 11:00 Thứ 2 mới quét được. Bạn có thể chủ động kiểm tra bằng 2 cách:
* **Cách 1 (Ngay trên Web):** Truy cập mục 15 -> Bấm nút xanh lá nổi bật: **"🚀 Quét Ngay 6 Google Sheets & Gửi Thử Email/Zalo"**.
* **Cách 2 (Qua dòng lệnh PowerShell):**
  ```powershell
  cd "e:\DASBOAD VPS"
  node scan_missing_units_reports.js
  ```

---

## 5. QUY ĐỊNH PHÂN QUYỀN BẢO MẬT RBAC (KHÓA KQKD & DÒNG TIỀN)

Để đảm bảo an toàn tuyệt đối dữ liệu tài chính chiến lược của Tập đoàn:

| Vai trò người dùng | Tài khoản | Xem Báo Cáo Thường (1-12) | Xem KQKD (13) | Xem Dòng Tiền (14) | Quản Trị Cảnh Báo (15) |
| :--- | :--- | :---: | :---: | :---: | :---: |
| **Chủ Tịch / CEO** | `ceo` / `ceo@vps2025` | ✅ Đầy đủ 6 đơn vị | ✅ **Toàn quyền** | ✅ **Toàn quyền** | ✅ Toàn quyền |
| **Quản Trị Viên (Admin)** | `admin` / `vps@2025` | ✅ Đầy đủ 6 đơn vị | ✅ **Toàn quyền** | ✅ **Toàn quyền** | ✅ Toàn quyền |
| **Giám Đốc Tân Hồng Hà** | `thh` / `thh@2025` | ⚠️ Chỉ xem THH | ❌ **BỊ CHẶN** | ❌ **BỊ CHẶN** | ⚠️ Chỉ xác nhận đọc |
| **Giám Đốc Việt** | `viet` / `viet@2025` | ⚠️ Chỉ xem Việt | ❌ **BỊ CHẶN** | ❌ **BỊ CHẶN** | ⚠️ Chỉ xác nhận đọc |
| **Giám Đốc Xem Sơn** | `xemson` / `xemson@2025` | ⚠️ Chỉ xem Xem Sơn | ❌ **BỊ CHẶN** | ❌ **BỊ CHẶN** | ⚠️ Chỉ xác nhận đọc |
| **Giám Đốc VPS M** | `vpsm` / `vpsm@2025` | ⚠️ Chỉ xem VPS M | ❌ **BỊ CHẶN** | ❌ **BỊ CHẶN** | ⚠️ Chỉ xác nhận đọc |
| **Giám Đốc ITSS** | `itss` / `itss@2025` | ⚠️ Chỉ xem ITSS | ❌ **BỊ CHẶN** | ❌ **BỊ CHẶN** | ⚠️ Chỉ xác nhận đọc |
| **Giám Đốc VP VPS** | `vpvps` / `vpvps@2025` | ⚠️ Chỉ xem VP VPS | ❌ **BỊ CHẶN** | ❌ **BỊ CHẶN** | ⚠️ Chỉ xác nhận đọc |

> **Cơ Chế Bảo Vệ 2 Lớp:**  
> 1. Trên thanh Menu bên trái: Menu 13 và 14 bị **ẩn hoàn toàn** đối với tài khoản đơn vị.  
> 2. Lớp bảo vệ Router Guard: Nếu đơn vị gõ trực tiếp URL `#financials` hoặc `#cashflow`, hệ thống lập tức chặn lại, hiển thị cảnh báo từ chối truy cập và tự động đẩy về trang Tổng quan.

---

## 6. CẤU TRÚC TỆP TIN & LƯU TRỮ DỮ LIỆU

Hệ thống được tổ chức khoa học, tách biệt hoàn toàn giữa lõi backend, giao diện và dữ liệu cấu hình:

| Tệp tin / Thư mục | Chức năng |
| :--- | :--- |
| [server.js](file:///e:/DASBOAD%20VPS/server.js) | Máy chủ HTTP Server, REST API Router và Vòng lặp tự động chạy ngầm. |
| [notification_service.js](file:///e:/DASBOAD%20VPS/notification_service.js) | Module tích hợp Email Nodemailer, Zalo Webhook, tạo HTML email chuẩn VIP. |
| [scan_missing_units_reports.js](file:///e:/DASBOAD%20VPS/scan_missing_units_reports.js) | Lõi quét độc lập 6 file Google Sheets, kiểm tra các sheet nghiệp vụ. |
| [data/notification_schedules.json](file:///e:/DASBOAD%20VPS/data/notification_schedules.json) | Lưu cấu hình Email, mật khẩu ứng dụng mã hóa, SĐT Zalo và giờ quét. |
| [data/notification_delivery_logs.json](file:///e:/DASBOAD%20VPS/data/notification_delivery_logs.json) | Lưu lịch sử các lần chuyển phát Email & Zalo (Hiển thị tại Card 4). |
| [data/weekly_scan_result.json](file:///e:/DASBOAD%20VPS/data/weekly_scan_result.json) | Kết quả đợt quét Google Sheets mới nhất. |
| [index.html](file:///e:/DASBOAD%20VPS/index.html) | Giao diện Dashboard và Trung tâm cấu hình mục 15. |
| [js/notifications.js](file:///e:/DASBOAD%20VPS/js/notifications.js) | Bộ điều khiển giao diện Frontend (gọi API, test kênh, render bảng lịch sử). |

---

## 7. XỬ LÝ SỰ CỐ THƯỜNG GẶP (TROUBLESHOOTING)

### ❓ 1. Đã bấm test Email nhưng hòm thư chưa nhận được?
* **Kiểm tra 1:** Kiểm tra thư mục **Spam (Thư rác)** hoặc mục **Quảng cáo/Cập nhật** của Gmail.
* **Kiểm tra 2:** Kiểm tra ô **Mật khẩu ứng dụng**. Bạn phải dùng **Mật khẩu ứng dụng 16 ký tự** của Google tạo từ trang `myaccount.google.com/apppasswords`, không được dùng mật khẩu đăng nhập Gmail thông thường.
* **Kiểm tra 3:** Nhìn vào bảng **Nhật Ký Chuyển Phát** ở mục 15 trên Dashboard:
  * Nếu ghi `● SẴN SÀNG TRONG HÀNG ĐỢI`: Do chưa điền Mật khẩu ứng dụng nên hệ thống mới đóng gói nội dung sẵn sàng chứ chưa đẩy ra internet.
  * Nếu ghi `● ĐÃ GỬI THÀNH CÔNG`: Thư đã chuyển thành công tới nhà cung cấp mạng.

### ❓ 2. Muốn đổi email người nhận hoặc thêm email Phó Giám Đốc/Thư ký?
* Rất đơn giản: Vào Dashboard mục 15 -> Tại ô **Email Nhận Thông Báo**, điền các email cách nhau bằng dấu phẩy:  
  `ceo@vpsgroup.vn, phogiamdoc@vpsgroup.vn, thuky@vpsgroup.vn`  
  -> Bấm **"Lưu Cấu Hình Email & Zalo"**.

### ❓ 3. Muốn đổi số điện thoại Zalo nhận tin nhắn?
* Vào Dashboard mục 15 -> Tại ô **Số Điện Thoại Zalo Của Bạn**, sửa thành số điện thoại mới -> Bấm **"Lưu Cấu Hình Email & Zalo"**.

### ❓ 4. Làm sao biết máy chủ Dashboard có đang chạy hay không?
* Mở trình duyệt truy cập: **http://localhost:3000/**. Nếu Dashboard mở bình thường thì máy chủ và vòng lặp tự động 11h Thứ 2 đang chạy ngầm 100%.

---
*(Tài liệu này được lưu trực tiếp trong thư mục dự án tại [SO_TAY_VAN_HANH_CANH_BAO_EMAIL_ZALO_VA_LICH_QUET_11H.md](file:///e:/DASBOAD%20VPS/SO_TAY_VAN_HANH_CANH_BAO_EMAIL_ZALO_VA_LICH_QUET_11H.md))*
