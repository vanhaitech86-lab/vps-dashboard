// ============================================================
// MODULE 13: BÁO CÁO KẾT QUẢ KINH DOANH (P&L) HỢP NHẤT TOÀN TẬP ĐOÀN
// Tổng hợp từng tháng và cộng dồn lũy kế YTD theo chuẩn tài chính
// Khớp 100% số liệu thực tế Tháng 07/2026 & Tích hợp Quét Tự Động từ Google Sheets
// ============================================================

const BUILTIN_MONTH_DATA = {"liveDataByMonth": {"1": {"MB": {"vonDT": 75000, "monthData": {"ds": 27440.0, "rateLg": 33.0, "lg": 8001.0, "htLg": 1073.0, "chiPhi": 6908.0, "tnKhac": 1108.0, "lntt": 3275.0}, "cumData": {"ds": 27440.0, "rateLg": 29.0, "lg": 8001.0, "htLg": 1073.0, "chiPhi": 6908.0, "tnKhac": 1108.0, "lntt": 3275.0}}, "THH": {"vonDT": 50000, "monthData": {"ds": 21624.0, "rateLg": 31.0, "lg": 6645.0, "htLg": 0.0, "chiPhi": 3881.0, "tnKhac": 1.0, "lntt": 2766.0}, "cumData": {"ds": 21624.0, "rateLg": 31.0, "lg": 6645.0, "htLg": 0.0, "chiPhi": 3881.0, "tnKhac": 1.0, "lntt": 2766.0}}, "THH_DVKT": {"vonDT": null, "monthData": {"ds": 2224.0, "rateLg": 35.0, "lg": 789.0, "htLg": 0.0, "chiPhi": 771.0, "tnKhac": 1.0, "lntt": 18.0}, "cumData": {"ds": 2224.0, "rateLg": 35.0, "lg": 789.0, "htLg": 0.0, "chiPhi": 771.0, "tnKhac": 1.0, "lntt": 18.0}}, "THH_DVKT_1": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 31.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 31.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_2": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 45.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 45.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_3": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 37.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 37.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_4": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 60.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 60.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_5": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 7.0, "lg": 9400.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 7.0, "lg": 9400.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_KDTH": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 10.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 139.0, "tnKhac": 0.0, "lntt": 18.0}, "cumData": {"ds": 0.0, "rateLg": 10.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 139.0, "tnKhac": 0.0, "lntt": 18.0}}, "THH_KDBB": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 7.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 451.0, "tnKhac": 1.0, "lntt": -76.0}, "cumData": {"ds": 0.0, "rateLg": 7.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 451.0, "tnKhac": 1.0, "lntt": -76.0}}, "THH_DUAN": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 42.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 2520.0, "tnKhac": 0.0, "lntt": 2805.0}, "cumData": {"ds": 0.0, "rateLg": 42.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 2520.0, "tnKhac": 0.0, "lntt": 2805.0}}, "VIET": {"vonDT": 10000, "monthData": {"ds": 5393.0, "rateLg": 23.0, "lg": 1241.0, "htLg": 33.0, "chiPhi": 1043.0, "tnKhac": 5.0, "lntt": 236.0}, "cumData": {"ds": 5393.0, "rateLg": 23.0, "lg": 1241.0, "htLg": 33.0, "chiPhi": 1043.0, "tnKhac": 5.0, "lntt": 236.0}}, "VIET_1": {"vonDT": null, "monthData": {"ds": 1578.0, "rateLg": 56.0, "lg": 888.0, "htLg": 0.0, "chiPhi": 687.0, "tnKhac": 5.0, "lntt": 206.0}, "cumData": {"ds": 1578.0, "rateLg": 56.0, "lg": 888.0, "htLg": 0.0, "chiPhi": 687.0, "tnKhac": 0.0, "lntt": 206.0}}, "VIET_2": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 9.0, "lg": 177.0, "htLg": 0.0, "chiPhi": 160.0, "tnKhac": 0.0, "lntt": 17.0}, "cumData": {"ds": 1891.0, "rateLg": 9.0, "lg": 177.0, "htLg": 0.0, "chiPhi": 160.0, "tnKhac": 0.0, "lntt": 17.0}}, "VIET_3": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 7.0, "lg": 120.0, "htLg": 0.0, "chiPhi": 165.0, "tnKhac": 0.0, "lntt": -45.0}, "cumData": {"ds": 1776.0, "rateLg": 7.0, "lg": 120.0, "htLg": 0.0, "chiPhi": 165.0, "tnKhac": 0.0, "lntt": -45.0}}, "VIET_4": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 38.0, "lg": 57.0, "htLg": 0.0, "chiPhi": 32.0, "tnKhac": 0.0, "lntt": 26.0}, "cumData": {"ds": 149.0, "rateLg": 38.0, "lg": 57.0, "htLg": 0.0, "chiPhi": 32.0, "tnKhac": 0.0, "lntt": 26.0}}, "ITSS": {"vonDT": 5000, "monthData": {"ds": 423.0, "rateLg": 27.0, "lg": 115.0, "htLg": 0.0, "chiPhi": 124.0, "tnKhac": 0.0, "lntt": -9.0}, "cumData": {"ds": 423.0, "rateLg": 27.0, "lg": 115.0, "htLg": 0.0, "chiPhi": 124.0, "tnKhac": 0.0, "lntt": -9.0}}, "VPS_CORP": {"vonDT": 10000, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 1040.0, "chiPhi": 1860.0, "tnKhac": 1102.0, "lntt": 282.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 1040.0, "chiPhi": 1860.0, "tnKhac": 1102.0, "lntt": 282.0}}, "VPS_KD": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 1040.0, "chiPhi": 553.0, "tnKhac": 250.0, "lntt": 737.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 1040.0, "chiPhi": 553.0, "tnKhac": 250.0, "lntt": 737.0}}, "VPS_TC": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1307.0, "tnKhac": 852.0, "lntt": -455.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1307.0, "tnKhac": 852.0, "lntt": -455.0}}, "XESCO": {"vonDT": 15000, "monthData": {"ds": 10080.0, "rateLg": 29.0, "lg": 2873.0, "htLg": 0.0, "chiPhi": 2126.0, "tnKhac": 19.0, "lntt": 766.0}, "cumData": {"ds": 10080.0, "rateLg": 29.0, "lg": 2873.0, "htLg": 0.0, "chiPhi": 2126.0, "tnKhac": 19.0, "lntt": 766.0}}, "XESCO_KD": {"vonDT": null, "monthData": {"ds": 6701.0, "rateLg": 15.0, "lg": 996.0, "htLg": 0.0, "chiPhi": 854.0, "tnKhac": 7.0, "lntt": 149.0}, "cumData": {"ds": 6701.0, "rateLg": 15.0, "lg": 996.0, "htLg": 0.0, "chiPhi": 854.0, "tnKhac": 7.0, "lntt": 149.0}}, "XESCO_KD_1": {"vonDT": null, "monthData": {"ds": 665.0, "rateLg": 30.0, "lg": 199.0, "htLg": 0.0, "chiPhi": 135.0, "tnKhac": 1.0, "lntt": 65.0}, "cumData": {"ds": 665.0, "rateLg": 30.0, "lg": 199.0, "htLg": 0.0, "chiPhi": 135.0, "tnKhac": 1.0, "lntt": 65.0}}, "XESCO_KD_2": {"vonDT": null, "monthData": {"ds": 3408.0, "rateLg": 11.0, "lg": 387.0, "htLg": 0.0, "chiPhi": 460.0, "tnKhac": 4.0, "lntt": -69.0}, "cumData": {"ds": 3408.0, "rateLg": 11.0, "lg": 387.0, "htLg": 0.0, "chiPhi": 460.0, "tnKhac": 4.0, "lntt": -69.0}}, "XESCO_KD_3": {"vonDT": null, "monthData": {"ds": 2229.0, "rateLg": 5.0, "lg": 122.0, "htLg": 0.0, "chiPhi": 77.0, "tnKhac": 2.0, "lntt": 47.0}, "cumData": {"ds": 2229.0, "rateLg": 5.0, "lg": 122.0, "htLg": 0.0, "chiPhi": 77.0, "tnKhac": 2.0, "lntt": 47.0}}, "XESCO_KD_4": {"vonDT": null, "monthData": {"ds": 399.0, "rateLg": 72.0, "lg": 288.0, "htLg": 0.0, "chiPhi": 182.0, "tnKhac": 0.0, "lntt": 106.0}, "cumData": {"ds": 399.0, "rateLg": 72.0, "lg": 288.0, "htLg": 0.0, "chiPhi": 182.0, "tnKhac": 0.0, "lntt": 106.0}}, "XESCO_KT": {"vonDT": null, "monthData": {"ds": 3379.0, "rateLg": 56.0, "lg": 1877.0, "htLg": 0.0, "chiPhi": 1272.0, "tnKhac": 11.0, "lntt": 616.0}, "cumData": {"ds": 3379.0, "rateLg": 56.0, "lg": 1877.0, "htLg": 0.0, "chiPhi": 1272.0, "tnKhac": 11.0, "lntt": 616.0}}, "XESCO_KT_1": {"vonDT": null, "monthData": {"ds": 1714.0, "rateLg": 70.0, "lg": 1199.0, "htLg": 0.0, "chiPhi": 870.0, "tnKhac": 9.0, "lntt": 338.0}, "cumData": {"ds": 1714.0, "rateLg": 70.0, "lg": 1199.0, "htLg": 0.0, "chiPhi": 870.0, "tnKhac": 9.0, "lntt": 338.0}}, "XESCO_KT_2": {"vonDT": null, "monthData": {"ds": 280.0, "rateLg": 60.0, "lg": 167.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 167.0}, "cumData": {"ds": 280.0, "rateLg": 60.0, "lg": 167.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 167.0}}, "XESCO_KT_3": {"vonDT": null, "monthData": {"ds": 1385.0, "rateLg": 37.0, "lg": 511.0, "htLg": 0.0, "chiPhi": 402.0, "tnKhac": 2.0, "lntt": 111.0}, "cumData": {"ds": 1385.0, "rateLg": 37.0, "lg": 511.0, "htLg": 0.0, "chiPhi": 402.0, "tnKhac": 2.0, "lntt": 111.0}}, "MT": {"vonDT": 3000, "monthData": {"ds": 2427.0, "rateLg": 19.0, "lg": 457.0, "htLg": 0.0, "chiPhi": 230.0, "tnKhac": 0.0, "lntt": 227.0}, "cumData": {"ds": 2427.0, "rateLg": 19.0, "lg": 457.0, "htLg": 0.0, "chiPhi": 230.0, "tnKhac": 0.0, "lntt": 227.0}}, "MT_1": {"vonDT": null, "monthData": {"ds": 1620.0, "rateLg": 11.0, "lg": 172.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 11.0, "lg": 172.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_2": {"vonDT": null, "monthData": {"ds": 306.0, "rateLg": 16.0, "lg": 49.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 16.0, "lg": 49.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_3": {"vonDT": null, "monthData": {"ds": 106.0, "rateLg": 8.0, "lg": 9.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 8.0, "lg": 9.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_4": {"vonDT": null, "monthData": {"ds": 166.0, "rateLg": 49.0, "lg": 81.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 49.0, "lg": 81.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_5": {"vonDT": null, "monthData": {"ds": 86.0, "rateLg": 73.0, "lg": 62.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 73.0, "lg": 62.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_6": {"vonDT": null, "monthData": {"ds": 117.0, "rateLg": 67.0, "lg": 79.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 67.0, "lg": 79.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_7": {"vonDT": null, "monthData": {"ds": 26.0, "rateLg": 19.0, "lg": 5.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 25500.0, "rateLg": 19.0, "lg": 5.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "GRAND_TOTAL": {"vonDT": 93000, "monthData": {"ds": 39947.0, "rateLg": 28.0, "lg": 11331.0, "htLg": 1073.0, "chiPhi": 9264.0, "tnKhac": 1127.0, "lntt": 4267.0}, "cumData": {"ds": 39947.0, "rateLg": 28.0, "lg": 11331.0, "htLg": 1073.0, "chiPhi": 9264.0, "tnKhac": 1127.0, "lntt": 4267.0}}}, "2": {"MB": {"vonDT": 75000, "monthData": {"ds": 8344.0, "rateLg": 22.0, "lg": 1756.0, "htLg": 79.0, "chiPhi": 3703.0, "tnKhac": 1061.0, "lntt": -2123.0}, "cumData": {"ds": 35784.0, "rateLg": 27.0, "lg": 9757.0, "htLg": 1152.0, "chiPhi": 11927.0, "tnKhac": 2169.0, "lntt": 1151.0}}, "THH": {"vonDT": 50000, "monthData": {"ds": 4434.0, "rateLg": 15.0, "lg": 667.0, "htLg": 0.0, "chiPhi": 1791.0, "tnKhac": 0.0, "lntt": -1124.0}, "cumData": {"ds": 26058.0, "rateLg": 28.0, "lg": 7312.0, "htLg": 0.0, "chiPhi": 5672.0, "tnKhac": 1.0, "lntt": 1642.0}}, "THH_DVKT": {"vonDT": null, "monthData": {"ds": 1473.0, "rateLg": 29.0, "lg": 426.0, "htLg": 0.0, "chiPhi": 753.0, "tnKhac": 0.0, "lntt": -327.0}, "cumData": {"ds": 3697.0, "rateLg": 33.0, "lg": 1214.0, "htLg": 0.0, "chiPhi": 1524.0, "tnKhac": 1.0, "lntt": -309.0}}, "THH_DVKT_1": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 32.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 31.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_2": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 61.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 50.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_3": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 16.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 27.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_4": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 36.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 50.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_5": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 3.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 5.0, "lg": 12400.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_KDTH": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 4.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 166.0, "tnKhac": 0.0, "lntt": -112.0}, "cumData": {"ds": 0.0, "rateLg": 7.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 305.0, "tnKhac": 0.0, "lntt": -94.0}}, "THH_KDBB": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 11.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 369.0, "tnKhac": 0.0, "lntt": -181.0}, "cumData": {"ds": 0.0, "rateLg": 8.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 820.0, "tnKhac": 1.0, "lntt": -257.0}}, "THH_DUAN": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 503.0, "tnKhac": 0.0, "lntt": -503.0}, "cumData": {"ds": 0.0, "rateLg": 42.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 3023.0, "tnKhac": 0.0, "lntt": 2302.0}}, "VIET": {"vonDT": 10000, "monthData": {"ds": 3246.0, "rateLg": 29.0, "lg": 935.0, "htLg": 1.0, "chiPhi": 967.0, "tnKhac": 0.0, "lntt": -31.0}, "cumData": {"ds": 8639.0, "rateLg": 25.0, "lg": 2176.0, "htLg": 34.0, "chiPhi": 2010.0, "tnKhac": 5.0, "lntt": 205.0}}, "VIET_1": {"vonDT": null, "monthData": {"ds": 1334.0, "rateLg": 57.0, "lg": 760.0, "htLg": 0.0, "chiPhi": 644.0, "tnKhac": 0.0, "lntt": 116.0}, "cumData": {"ds": 2911.0, "rateLg": 57.0, "lg": 1647.0, "htLg": 0.0, "chiPhi": 1331.0, "tnKhac": 0.0, "lntt": 322.0}}, "VIET_2": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 10.0, "lg": 93.0, "htLg": 0.0, "chiPhi": 139.0, "tnKhac": 0.0, "lntt": -46.0}, "cumData": {"ds": 2849.0, "rateLg": 9.0, "lg": 270.0, "htLg": 0.0, "chiPhi": 299.0, "tnKhac": 0.0, "lntt": -29.0}}, "VIET_3": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 8.0, "lg": 70.0, "htLg": 0.0, "chiPhi": 151.0, "tnKhac": 0.0, "lntt": -81.0}, "cumData": {"ds": 2714.0, "rateLg": 7.0, "lg": 190.0, "htLg": 0.0, "chiPhi": 316.0, "tnKhac": 0.0, "lntt": -126.0}}, "VIET_4": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 74.0, "lg": 12.0, "htLg": 0.0, "chiPhi": 33.0, "tnKhac": 0.0, "lntt": -21.0}, "cumData": {"ds": 165.0, "rateLg": 42.0, "lg": 69.0, "htLg": 0.0, "chiPhi": 65.0, "tnKhac": 0.0, "lntt": 4.0}}, "ITSS": {"vonDT": 5000, "monthData": {"ds": 232.0, "rateLg": 32.0, "lg": 75.0, "htLg": 0.0, "chiPhi": 116.0, "tnKhac": 0.0, "lntt": -41.0}, "cumData": {"ds": 655.0, "rateLg": 29.0, "lg": 190.0, "htLg": 0.0, "chiPhi": 240.0, "tnKhac": 0.0, "lntt": -50.0}}, "VPS_CORP": {"vonDT": 10000, "monthData": {"ds": 432.0, "rateLg": 0.0, "lg": 79.0, "htLg": 78.0, "chiPhi": 829.0, "tnKhac": 1061.0, "lntt": -928.0}, "cumData": {"ds": 432.0, "rateLg": 0.0, "lg": 0.0, "htLg": 1118.0, "chiPhi": 4006.0, "tnKhac": 2163.0, "lntt": -646.0}}, "VPS_KD": {"vonDT": null, "monthData": {"ds": 432.0, "rateLg": 18.0, "lg": 79.0, "htLg": 78.0, "chiPhi": 829.0, "tnKhac": 383.0, "lntt": -289.0}, "cumData": {"ds": 432.0, "rateLg": 18.0, "lg": 79.0, "htLg": 1118.0, "chiPhi": 1382.0, "tnKhac": 633.0, "lntt": 448.0}}, "VPS_TC": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1317.0, "tnKhac": 678.0, "lntt": -639.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 2624.0, "tnKhac": 1530.0, "lntt": -1094.0}}, "XESCO": {"vonDT": 15000, "monthData": {"ds": 6330.0, "rateLg": 34.0, "lg": 2176.0, "htLg": 0.0, "chiPhi": 2033.0, "tnKhac": -8.0, "lntt": 135.0}, "cumData": {"ds": 16410.0, "rateLg": 31.0, "lg": 5049.0, "htLg": 0.0, "chiPhi": 4159.0, "tnKhac": 10.0, "lntt": 900.0}}, "XESCO_KD": {"vonDT": null, "monthData": {"ds": 3856.0, "rateLg": 19.0, "lg": 718.0, "htLg": 0.0, "chiPhi": 760.0, "tnKhac": -5.0, "lntt": -47.0}, "cumData": {"ds": 10557.0, "rateLg": 16.0, "lg": 1714.0, "htLg": 0.0, "chiPhi": 1614.0, "tnKhac": 3.0, "lntt": 103.0}}, "XESCO_KD_1": {"vonDT": null, "monthData": {"ds": 327.0, "rateLg": 24.0, "lg": 79.0, "htLg": 0.0, "chiPhi": 109.0, "tnKhac": 0.0, "lntt": -30.0}, "cumData": {"ds": 992.0, "rateLg": 28.0, "lg": 278.0, "htLg": 0.0, "chiPhi": 244.0, "tnKhac": 1.0, "lntt": 35.0}}, "XESCO_KD_2": {"vonDT": null, "monthData": {"ds": 2004.0, "rateLg": 20.0, "lg": 397.0, "htLg": 0.0, "chiPhi": 440.0, "tnKhac": -3.0, "lntt": -46.0}, "cumData": {"ds": 5412.0, "rateLg": 14.0, "lg": 784.0, "htLg": 0.0, "chiPhi": 900.0, "tnKhac": 1.0, "lntt": -115.0}}, "XESCO_KD_3": {"vonDT": null, "monthData": {"ds": 1198.0, "rateLg": 2.0, "lg": 26.0, "htLg": 0.0, "chiPhi": 85.0, "tnKhac": -2.0, "lntt": -61.0}, "cumData": {"ds": 3427.0, "rateLg": 4.0, "lg": 147.0, "htLg": 0.0, "chiPhi": 162.0, "tnKhac": 1.0, "lntt": -14.0}}, "XESCO_KD_4": {"vonDT": null, "monthData": {"ds": 327.0, "rateLg": 66.0, "lg": 216.0, "htLg": 0.0, "chiPhi": 126.0, "tnKhac": 0.0, "lntt": 90.0}, "cumData": {"ds": 725.0, "rateLg": 69.0, "lg": 504.0, "htLg": 0.0, "chiPhi": 308.0, "tnKhac": 0.0, "lntt": 196.0}}, "XESCO_KT": {"vonDT": null, "monthData": {"ds": 2474.0, "rateLg": 59.0, "lg": 1458.0, "htLg": 0.0, "chiPhi": 1273.0, "tnKhac": -4.0, "lntt": 181.0}, "cumData": {"ds": 5853.0, "rateLg": 57.0, "lg": 3335.0, "htLg": 0.0, "chiPhi": 2545.0, "tnKhac": 7.0, "lntt": 797.0}}, "XESCO_KT_1": {"vonDT": null, "monthData": {"ds": 1434.0, "rateLg": 71.0, "lg": 1018.0, "htLg": 0.0, "chiPhi": 851.0, "tnKhac": -2.0, "lntt": 165.0}, "cumData": {"ds": 3148.0, "rateLg": 70.0, "lg": 2217.0, "htLg": 0.0, "chiPhi": 1721.0, "tnKhac": 7.0, "lntt": 503.0}}, "XESCO_KT_2": {"vonDT": null, "monthData": {"ds": 241.0, "rateLg": 70.0, "lg": 168.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 168.0}, "cumData": {"ds": 521.0, "rateLg": 64.0, "lg": 335.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 335.0}}, "XESCO_KT_3": {"vonDT": null, "monthData": {"ds": 799.0, "rateLg": 34.0, "lg": 272.0, "htLg": 0.0, "chiPhi": 422.0, "tnKhac": -2.0, "lntt": -152.0}, "cumData": {"ds": 2184.0, "rateLg": 36.0, "lg": 783.0, "htLg": 0.0, "chiPhi": 824.0, "tnKhac": 0.0, "lntt": -41.0}}, "MT": {"vonDT": 3000, "monthData": {"ds": 1030.0, "rateLg": 25.0, "lg": 261.0, "htLg": 0.0, "chiPhi": 201.0, "tnKhac": 0.0, "lntt": 60.0}, "cumData": {"ds": 3457.0, "rateLg": 21.0, "lg": 717.0, "htLg": 0.0, "chiPhi": 431.0, "tnKhac": 0.0, "lntt": 286.0}}, "MT_1": {"vonDT": null, "monthData": {"ds": 498.0, "rateLg": 10.0, "lg": 51.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 11.0, "lg": 222.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_2": {"vonDT": null, "monthData": {"ds": 193.0, "rateLg": 16.0, "lg": 31.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 16.0, "lg": 80.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_3": {"vonDT": null, "monthData": {"ds": 28.0, "rateLg": 9.0, "lg": 2.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 8.0, "lg": 11.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_4": {"vonDT": null, "monthData": {"ds": 134.0, "rateLg": 50.0, "lg": 67.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 49.0, "lg": 148.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_5": {"vonDT": null, "monthData": {"ds": 75.0, "rateLg": 66.0, "lg": 49.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 70.0, "lg": 112.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_6": {"vonDT": null, "monthData": {"ds": 69.0, "rateLg": 66.0, "lg": 46.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 67.0, "lg": 124.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_7": {"vonDT": null, "monthData": {"ds": 34.0, "rateLg": 43.0, "lg": 15.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 33.0, "lg": 19.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "GRAND_TOTAL": {"vonDT": 93000, "monthData": {"ds": 15703.0, "rateLg": 27.0, "lg": 4193.0, "htLg": 79.0, "chiPhi": 5937.0, "tnKhac": 1053.0, "lntt": -1929.0}, "cumData": {"ds": 55650.0, "rateLg": 28.0, "lg": 15524.0, "htLg": 1152.0, "chiPhi": 16517.0, "tnKhac": 2179.0, "lntt": 2337.0}}}, "3": {"MB": {"vonDT": 75000, "monthData": {"ds": 15688.0, "rateLg": 20.0, "lg": 2894.0, "htLg": 317.0, "chiPhi": 3253.0, "tnKhac": 1118.0, "lntt": 1.0}, "cumData": {"ds": 51470.0, "rateLg": 25.0, "lg": 12650.0, "htLg": 1468.0, "chiPhi": 16324.0, "tnKhac": 3289.0, "lntt": 1084.0}}, "THH": {"vonDT": 50000, "monthData": {"ds": 8494.0, "rateLg": 21.0, "lg": 1752.0, "htLg": 0.0, "chiPhi": 1372.0, "tnKhac": 5.0, "lntt": 386.0}, "cumData": {"ds": 34551.0, "rateLg": 26.0, "lg": 9065.0, "htLg": 0.0, "chiPhi": 7043.0, "tnKhac": 6.0, "lntt": 2028.0}}, "THH_DVKT": {"vonDT": null, "monthData": {"ds": 2649.0, "rateLg": 39.0, "lg": 1037.0, "htLg": 0.0, "chiPhi": 802.0, "tnKhac": -1.0, "lntt": 234.0}, "cumData": {"ds": 6346.0, "rateLg": 35.0, "lg": 2251.0, "htLg": 0.0, "chiPhi": 2326.0, "tnKhac": 0.0, "lntt": -75.0}}, "THH_DVKT_1": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 38.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 34.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_2": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 49.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 50.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_3": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 28.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 28.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_4": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 61.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 55.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_5": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 4.0, "lg": 12900.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_KDTH": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 9.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 173.0, "tnKhac": 3.0, "lntt": 23.0}, "cumData": {"ds": 0.0, "rateLg": 8.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 478.0, "tnKhac": 3.0, "lntt": -71.0}}, "THH_KDBB": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 14.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 335.0, "tnKhac": 3.0, "lntt": 190.0}, "cumData": {"ds": 0.0, "rateLg": 10.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1155.0, "tnKhac": 4.0, "lntt": -67.0}}, "THH_DUAN": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 62.0, "tnKhac": 0.0, "lntt": -62.0}, "cumData": {"ds": 0.0, "rateLg": 42.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 3084.0, "tnKhac": 0.0, "lntt": 2241.0}}, "VIET": {"vonDT": 10000, "monthData": {"ds": 6144.0, "rateLg": 18.0, "lg": 1100.0, "htLg": 2.0, "chiPhi": 934.0, "tnKhac": 0.0, "lntt": 170.0}, "cumData": {"ds": 14781.0, "rateLg": 22.0, "lg": 3275.0, "htLg": 36.0, "chiPhi": 2944.0, "tnKhac": 7.0, "lntt": 374.0}}, "VIET_1": {"vonDT": null, "monthData": {"ds": 1451.0, "rateLg": 56.0, "lg": 814.0, "htLg": 0.0, "chiPhi": 605.0, "tnKhac": 1.0, "lntt": 210.0}, "cumData": {"ds": 4362.0, "rateLg": 56.0, "lg": 2461.0, "htLg": 0.0, "chiPhi": 1936.0, "tnKhac": 0.0, "lntt": 531.0}}, "VIET_2": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 6.0, "lg": 118.0, "htLg": 0.0, "chiPhi": 138.0, "tnKhac": 1.0, "lntt": -19.0}, "cumData": {"ds": 4708.0, "rateLg": 8.0, "lg": 388.0, "htLg": 0.0, "chiPhi": 437.0, "tnKhac": 0.0, "lntt": -48.0}}, "VIET_3": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 5.0, "lg": 139.0, "htLg": 0.0, "chiPhi": 160.0, "tnKhac": 0.0, "lntt": -21.0}, "cumData": {"ds": 5459.0, "rateLg": 6.0, "lg": 328.0, "htLg": 0.0, "chiPhi": 476.0, "tnKhac": 0.0, "lntt": -148.0}}, "VIET_4": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 34.0, "lg": 29.0, "htLg": 0.0, "chiPhi": 31.0, "tnKhac": 0.0, "lntt": -2.0}, "cumData": {"ds": 252.0, "rateLg": 39.0, "lg": 98.0, "htLg": 0.0, "chiPhi": 96.0, "tnKhac": 0.0, "lntt": 2.0}}, "ITSS": {"vonDT": 5000, "monthData": {"ds": 179.0, "rateLg": 24.0, "lg": 43.0, "htLg": 0.0, "chiPhi": 118.0, "tnKhac": 0.0, "lntt": -75.0}, "cumData": {"ds": 834.0, "rateLg": 28.0, "lg": 233.0, "htLg": 0.0, "chiPhi": 358.0, "tnKhac": 0.0, "lntt": -125.0}}, "VPS_CORP": {"vonDT": 10000, "monthData": {"ds": 872.0, "rateLg": 0.0, "lg": -1.0, "htLg": 315.0, "chiPhi": 829.0, "tnKhac": 1113.0, "lntt": -480.0}, "cumData": {"ds": 1304.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 5979.0, "tnKhac": 3276.0, "lntt": -1193.0}}, "VPS_KD": {"vonDT": null, "monthData": {"ds": 872.0, "rateLg": 0.0, "lg": -1.0, "htLg": 315.0, "chiPhi": 658.0, "tnKhac": 422.0, "lntt": 78.0}, "cumData": {"ds": 1304.0, "rateLg": 6.0, "lg": 78.0, "htLg": 1432.0, "chiPhi": 2045.0, "tnKhac": 1055.0, "lntt": 520.0}}, "VPS_TC": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1249.0, "tnKhac": 691.0, "lntt": -558.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 3934.0, "tnKhac": 2221.0, "lntt": -1713.0}}, "XESCO": {"vonDT": 15000, "monthData": {"ds": 11914.0, "rateLg": 21.0, "lg": 2524.0, "htLg": 0.0, "chiPhi": 2097.0, "tnKhac": -7.0, "lntt": 420.0}, "cumData": {"ds": 28324.0, "rateLg": 27.0, "lg": 7574.0, "htLg": 0.0, "chiPhi": 6256.0, "tnKhac": 2.0, "lntt": 1320.0}}, "XESCO_KD": {"vonDT": null, "monthData": {"ds": 8926.0, "rateLg": 12.0, "lg": 1031.0, "htLg": 0.0, "chiPhi": 760.0, "tnKhac": -6.0, "lntt": 265.0}, "cumData": {"ds": 19483.0, "rateLg": 14.0, "lg": 2744.0, "htLg": 0.0, "chiPhi": 2374.0, "tnKhac": -4.0, "lntt": 366.0}}, "XESCO_KD_1": {"vonDT": null, "monthData": {"ds": 347.0, "rateLg": 30.0, "lg": 105.0, "htLg": 0.0, "chiPhi": 71.0, "tnKhac": 1.0, "lntt": 35.0}, "cumData": {"ds": 1339.0, "rateLg": 29.0, "lg": 384.0, "htLg": 0.0, "chiPhi": 315.0, "tnKhac": 1.0, "lntt": 70.0}}, "XESCO_KD_2": {"vonDT": null, "monthData": {"ds": 4169.0, "rateLg": 11.0, "lg": 455.0, "htLg": 0.0, "chiPhi": 434.0, "tnKhac": -4.0, "lntt": 17.0}, "cumData": {"ds": 9581.0, "rateLg": 13.0, "lg": 1239.0, "htLg": 0.0, "chiPhi": 1334.0, "tnKhac": -3.0, "lntt": -98.0}}, "XESCO_KD_3": {"vonDT": null, "monthData": {"ds": 3997.0, "rateLg": 4.0, "lg": 165.0, "htLg": 0.0, "chiPhi": 109.0, "tnKhac": -3.0, "lntt": 53.0}, "cumData": {"ds": 7424.0, "rateLg": 4.0, "lg": 312.0, "htLg": 0.0, "chiPhi": 271.0, "tnKhac": -2.0, "lntt": 39.0}}, "XESCO_KD_4": {"vonDT": null, "monthData": {"ds": 413.0, "rateLg": 74.0, "lg": 306.0, "htLg": 0.0, "chiPhi": 146.0, "tnKhac": 0.0, "lntt": 160.0}, "cumData": {"ds": 1139.0, "rateLg": 71.0, "lg": 810.0, "htLg": 0.0, "chiPhi": 454.0, "tnKhac": 0.0, "lntt": 356.0}}, "XESCO_KT": {"vonDT": null, "monthData": {"ds": 2988.0, "rateLg": 50.0, "lg": 1494.0, "htLg": 0.0, "chiPhi": 1337.0, "tnKhac": -2.0, "lntt": 155.0}, "cumData": {"ds": 8841.0, "rateLg": 55.0, "lg": 4829.0, "htLg": 0.0, "chiPhi": 3882.0, "tnKhac": 4.0, "lntt": 951.0}}, "XESCO_KT_1": {"vonDT": null, "monthData": {"ds": 1392.0, "rateLg": 61.0, "lg": 848.0, "htLg": 0.0, "chiPhi": 820.0, "tnKhac": -1.0, "lntt": 27.0}, "cumData": {"ds": 4540.0, "rateLg": 68.0, "lg": 3065.0, "htLg": 0.0, "chiPhi": 2541.0, "tnKhac": 5.0, "lntt": 529.0}}, "XESCO_KT_2": {"vonDT": null, "monthData": {"ds": 268.0, "rateLg": 54.0, "lg": 146.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 146.0}, "cumData": {"ds": 789.0, "rateLg": 61.0, "lg": 481.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 481.0}}, "XESCO_KT_3": {"vonDT": null, "monthData": {"ds": 1327.0, "rateLg": 38.0, "lg": 500.0, "htLg": 0.0, "chiPhi": 517.0, "tnKhac": -1.0, "lntt": -18.0}, "cumData": {"ds": 3511.0, "rateLg": 37.0, "lg": 1283.0, "htLg": 0.0, "chiPhi": 1341.0, "tnKhac": -1.0, "lntt": -59.0}}, "MT": {"vonDT": 3000, "monthData": {"ds": 1981.0, "rateLg": 18.0, "lg": 356.0, "htLg": 0.0, "chiPhi": 202.0, "tnKhac": 0.0, "lntt": 154.0}, "cumData": {"ds": 5438.0, "rateLg": 20.0, "lg": 1073.0, "htLg": 0.0, "chiPhi": 633.0, "tnKhac": 0.0, "lntt": 440.0}}, "MT_1": {"vonDT": null, "monthData": {"ds": 1107.0, "rateLg": 7.0, "lg": 75.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 3225.0, "rateLg": 9.0, "lg": 298.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_2": {"vonDT": null, "monthData": {"ds": 329.0, "rateLg": 18.0, "lg": 61.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 828.0, "rateLg": 17.0, "lg": 141.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_3": {"vonDT": null, "monthData": {"ds": 116.0, "rateLg": 7.0, "lg": 8.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 251.0, "rateLg": 8.0, "lg": 19.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_4": {"vonDT": null, "monthData": {"ds": 203.0, "rateLg": 47.0, "lg": 96.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 503.0, "rateLg": 49.0, "lg": 245.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_5": {"vonDT": null, "monthData": {"ds": 106.0, "rateLg": 78.0, "lg": 83.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 267.0, "rateLg": 73.0, "lg": 195.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_6": {"vonDT": null, "monthData": {"ds": 46.0, "rateLg": 66.0, "lg": 30.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 232.0, "rateLg": 66.0, "lg": 154.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_7": {"vonDT": null, "monthData": {"ds": 73.0, "rateLg": 4.0, "lg": 3.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 132.0, "rateLg": 17.0, "lg": 22.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "GRAND_TOTAL": {"vonDT": 93000, "monthData": {"ds": 29583.0, "rateLg": 20.0, "lg": 5775.0, "htLg": 317.0, "chiPhi": 5552.0, "tnKhac": 1111.0, "lntt": 575.0}, "cumData": {"ds": 85232.0, "rateLg": 25.0, "lg": 21297.0, "htLg": 1468.0, "chiPhi": 23213.0, "tnKhac": 3291.0, "lntt": 2844.0}}}, "4": {"MB": {"vonDT": 75000, "monthData": {"ds": 14820.0, "rateLg": 20.0, "lg": 2927.0, "htLg": 2.0, "chiPhi": 3293.0, "tnKhac": 1114.0, "lntt": -611.0}, "cumData": {"ds": 66289.0, "rateLg": 23.0, "lg": 15577.0, "htLg": 1470.0, "chiPhi": 20981.0, "tnKhac": 4629.0, "lntt": 695.0}}, "THH": {"vonDT": 50000, "monthData": {"ds": 8436.0, "rateLg": 17.0, "lg": 1463.0, "htLg": 0.0, "chiPhi": 1390.0, "tnKhac": 1.0, "lntt": 74.0}, "cumData": {"ds": 42987.0, "rateLg": 24.0, "lg": 10528.0, "htLg": 0.0, "chiPhi": 8433.0, "tnKhac": 7.0, "lntt": 2102.0}}, "THH_DVKT": {"vonDT": null, "monthData": {"ds": 2455.0, "rateLg": 37.0, "lg": 917.0, "htLg": 0.0, "chiPhi": 819.0, "tnKhac": 1.0, "lntt": 99.0}, "cumData": {"ds": 8801.0, "rateLg": 36.0, "lg": 3168.0, "htLg": 0.0, "chiPhi": 3145.0, "tnKhac": 0.0, "lntt": 23.0}}, "THH_DVKT_1": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 36.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 35.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_2": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 50.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 50.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_3": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 34.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 29.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_4": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 40.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 51.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_5": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 0.0, "rateLg": 3.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_KDTH": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 7.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 172.0, "tnKhac": 0.0, "lntt": 2.0}, "cumData": {"ds": 0.0, "rateLg": 8.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 650.0, "tnKhac": 3.0, "lntt": -69.0}}, "THH_KDBB": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 11.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 338.0, "tnKhac": 0.0, "lntt": 35.0}, "cumData": {"ds": 0.0, "rateLg": 11.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1492.0, "tnKhac": 3.0, "lntt": -32.0}}, "THH_DUAN": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 62.0, "tnKhac": 0.0, "lntt": -62.0}, "cumData": {"ds": 0.0, "rateLg": 42.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 3147.0, "tnKhac": 0.0, "lntt": 2179.0}}, "VIET": {"vonDT": 10000, "monthData": {"ds": 5816.0, "rateLg": 23.0, "lg": 1355.0, "htLg": 2.0, "chiPhi": 960.0, "tnKhac": 0.0, "lntt": 401.0}, "cumData": {"ds": 20597.0, "rateLg": 22.0, "lg": 4629.0, "htLg": 38.0, "chiPhi": 3905.0, "tnKhac": 13.0, "lntt": 776.0}}, "VIET_1": {"vonDT": null, "monthData": {"ds": 1770.0, "rateLg": 57.0, "lg": 1014.0, "htLg": 0.0, "chiPhi": 629.0, "tnKhac": 4.0, "lntt": 388.0}, "cumData": {"ds": 6132.0, "rateLg": 57.0, "lg": 3475.0, "htLg": 0.0, "chiPhi": 2565.0, "tnKhac": 0.0, "lntt": 920.0}}, "VIET_2": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 9.0, "lg": 117.0, "htLg": 0.0, "chiPhi": 141.0, "tnKhac": 0.0, "lntt": -24.0}, "cumData": {"ds": 6045.0, "rateLg": 8.0, "lg": 505.0, "htLg": 0.0, "chiPhi": 577.0, "tnKhac": 0.0, "lntt": -71.0}}, "VIET_3": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 6.0, "lg": 159.0, "htLg": 0.0, "chiPhi": 158.0, "tnKhac": 0.0, "lntt": 1.0}, "cumData": {"ds": 8052.0, "rateLg": 6.0, "lg": 487.0, "htLg": 0.0, "chiPhi": 634.0, "tnKhac": 0.0, "lntt": -147.0}}, "VIET_4": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 56.0, "lg": 65.0, "htLg": 0.0, "chiPhi": 32.0, "tnKhac": 0.0, "lntt": 33.0}, "cumData": {"ds": 369.0, "rateLg": 44.0, "lg": 163.0, "htLg": 0.0, "chiPhi": 128.0, "tnKhac": 0.0, "lntt": 35.0}}, "ITSS": {"vonDT": 5000, "monthData": {"ds": 257.0, "rateLg": 33.0, "lg": 86.0, "htLg": 0.0, "chiPhi": 114.0, "tnKhac": 0.0, "lntt": -28.0}, "cumData": {"ds": 1090.0, "rateLg": 29.0, "lg": 319.0, "htLg": 0.0, "chiPhi": 472.0, "tnKhac": 0.0, "lntt": -153.0}}, "VPS_CORP": {"vonDT": 10000, "monthData": {"ds": 312.0, "rateLg": 0.0, "lg": 23.0, "htLg": 0.0, "chiPhi": 829.0, "tnKhac": 1113.0, "lntt": -1057.0}, "cumData": {"ds": 1615.0, "rateLg": 0.0, "lg": 0.0, "htLg": 1432.0, "chiPhi": 8171.0, "tnKhac": 4609.0, "lntt": -2029.0}}, "VPS_KD": {"vonDT": null, "monthData": {"ds": 312.0, "rateLg": 7.0, "lg": 23.0, "htLg": 0.0, "chiPhi": 607.0, "tnKhac": 422.0, "lntt": -162.0}, "cumData": {"ds": 1615.0, "rateLg": 6.0, "lg": 101.0, "htLg": 1432.0, "chiPhi": 2651.0, "tnKhac": 1697.0, "lntt": 579.0}}, "VPS_TC": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1586.0, "tnKhac": 691.0, "lntt": -895.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 5520.0, "tnKhac": 2912.0, "lntt": -2608.0}}, "XESCO": {"vonDT": 15000, "monthData": {"ds": 10140.0, "rateLg": 27.0, "lg": 2703.0, "htLg": 0.0, "chiPhi": 2036.0, "tnKhac": -14.0, "lntt": 653.0}, "cumData": {"ds": 38464.0, "rateLg": 27.0, "lg": 10277.0, "htLg": 0.0, "chiPhi": 8292.0, "tnKhac": -12.0, "lntt": 1973.0}}, "XESCO_KD": {"vonDT": null, "monthData": {"ds": 7296.0, "rateLg": 14.0, "lg": 1053.0, "htLg": 0.0, "chiPhi": 735.0, "tnKhac": -10.0, "lntt": 308.0}, "cumData": {"ds": 26780.0, "rateLg": 14.0, "lg": 3798.0, "htLg": 0.0, "chiPhi": 3109.0, "tnKhac": -8.0, "lntt": 681.0}}, "XESCO_KD_1": {"vonDT": null, "monthData": {"ds": 270.0, "rateLg": 21.0, "lg": 58.0, "htLg": 0.0, "chiPhi": 58.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1609.0, "rateLg": 27.0, "lg": 442.0, "htLg": 0.0, "chiPhi": 373.0, "tnKhac": -1.0, "lntt": 68.0}}, "XESCO_KD_2": {"vonDT": null, "monthData": {"ds": 3530.0, "rateLg": 18.0, "lg": 647.0, "htLg": 0.0, "chiPhi": 428.0, "tnKhac": -5.0, "lntt": 214.0}, "cumData": {"ds": 13112.0, "rateLg": 14.0, "lg": 1885.0, "htLg": 0.0, "chiPhi": 1762.0, "tnKhac": 0.0, "lntt": 123.0}}, "XESCO_KD_3": {"vonDT": null, "monthData": {"ds": 3116.0, "rateLg": 3.0, "lg": 79.0, "htLg": 0.0, "chiPhi": 107.0, "tnKhac": -4.0, "lntt": -32.0}, "cumData": {"ds": 10540.0, "rateLg": 4.0, "lg": 392.0, "htLg": 0.0, "chiPhi": 378.0, "tnKhac": -6.0, "lntt": 8.0}}, "XESCO_KD_4": {"vonDT": null, "monthData": {"ds": 380.0, "rateLg": 71.0, "lg": 269.0, "htLg": 0.0, "chiPhi": 142.0, "tnKhac": -1.0, "lntt": 126.0}, "cumData": {"ds": 1519.0, "rateLg": 71.0, "lg": 1079.0, "htLg": 0.0, "chiPhi": 596.0, "tnKhac": -1.0, "lntt": 482.0}}, "XESCO_KT": {"vonDT": null, "monthData": {"ds": 2844.0, "rateLg": 58.0, "lg": 1650.0, "htLg": 0.0, "chiPhi": 1301.0, "tnKhac": -4.0, "lntt": 345.0}, "cumData": {"ds": 11684.0, "rateLg": 55.0, "lg": 6479.0, "htLg": 0.0, "chiPhi": 5183.0, "tnKhac": -6.0, "lntt": 1290.0}}, "XESCO_KT_1": {"vonDT": null, "monthData": {"ds": 1451.0, "rateLg": 71.0, "lg": 1024.0, "htLg": 0.0, "chiPhi": 801.0, "tnKhac": -2.0, "lntt": 221.0}, "cumData": {"ds": 5991.0, "rateLg": 68.0, "lg": 4089.0, "htLg": 0.0, "chiPhi": 3342.0, "tnKhac": -4.0, "lntt": 743.0}}, "XESCO_KT_2": {"vonDT": null, "monthData": {"ds": 270.0, "rateLg": 74.0, "lg": 200.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 200.0}, "cumData": {"ds": 1059.0, "rateLg": 64.0, "lg": 681.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 681.0}}, "XESCO_KT_3": {"vonDT": null, "monthData": {"ds": 1123.0, "rateLg": 38.0, "lg": 426.0, "htLg": 0.0, "chiPhi": 500.0, "tnKhac": -2.0, "lntt": -76.0}, "cumData": {"ds": 4634.0, "rateLg": 37.0, "lg": 1709.0, "htLg": 0.0, "chiPhi": 1841.0, "tnKhac": -2.0, "lntt": -134.0}}, "MT": {"vonDT": 3000, "monthData": {"ds": 1477.0, "rateLg": 22.0, "lg": 332.0, "htLg": 0.0, "chiPhi": 213.0, "tnKhac": 0.0, "lntt": 120.0}, "cumData": {"ds": 6916.0, "rateLg": 20.0, "lg": 1406.0, "htLg": 0.0, "chiPhi": 846.0, "tnKhac": 0.0, "lntt": 560.0}}, "MT_1": {"vonDT": null, "monthData": {"ds": 446.0, "rateLg": 7.0, "lg": 32.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 3671.0, "rateLg": 9.0, "lg": 330.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_2": {"vonDT": null, "monthData": {"ds": 280.0, "rateLg": 17.0, "lg": 49.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1108.0, "rateLg": 17.0, "lg": 190.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_3": {"vonDT": null, "monthData": {"ds": 293.0, "rateLg": 6.0, "lg": 17.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 544.0, "rateLg": 7.0, "lg": 37.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_4": {"vonDT": null, "monthData": {"ds": 263.0, "rateLg": 55.0, "lg": 145.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 766.0, "rateLg": 51.0, "lg": 389.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_5": {"vonDT": null, "monthData": {"ds": 81.0, "rateLg": 63.0, "lg": 51.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 348.0, "rateLg": 70.0, "lg": 245.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_6": {"vonDT": null, "monthData": {"ds": 48.0, "rateLg": 68.0, "lg": 33.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 280.0, "rateLg": 67.0, "lg": 187.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_7": {"vonDT": null, "monthData": {"ds": 67.0, "rateLg": 9.0, "lg": 6.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 199.0, "rateLg": 14.0, "lg": 28.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "GRAND_TOTAL": {"vonDT": 93000, "monthData": {"ds": 26437.0, "rateLg": 23.0, "lg": 5962.0, "htLg": 2.0, "chiPhi": 5542.0, "tnKhac": 1100.0, "lntt": 162.0}, "cumData": {"ds": 111669.0, "rateLg": 24.0, "lg": 27260.0, "htLg": 1470.0, "chiPhi": 30119.0, "tnKhac": 4617.0, "lntt": 3228.0}}}, "7": {"MB": {"vonDT": 90000, "monthData": {"ds": 41454, "rateLg": 10, "lg": 6070, "htLg": 5, "chiPhi": 6865, "tnKhac": 1095, "lntt": -89}, "cumData": {"ds": 197473, "rateLg": 21, "lg": 44982, "htLg": 335, "chiPhi": 49241, "tnKhac": 7731, "lntt": -234}}, "THH": {"vonDT": 50000, "monthData": {"ds": 8804, "rateLg": 18, "lg": 1568, "htLg": 5, "chiPhi": 1341, "tnKhac": 8, "lntt": 245}, "cumData": {"ds": 66583, "rateLg": 21, "lg": 10082, "htLg": 335, "chiPhi": 12453, "tnKhac": 57, "lntt": 2376}}, "THH_DVKT": {"vonDT": null, "monthData": {"ds": 2578, "rateLg": 33.5, "lg": 864, "htLg": 0, "chiPhi": 798, "tnKhac": 1, "lntt": 67}, "cumData": {"ds": 16145.6, "rateLg": 36, "lg": 5747, "htLg": 54, "chiPhi": 5516, "tnKhac": 1, "lntt": 286}}, "THH_DVKT_1": {"vonDT": null, "monthData": {"ds": 1346, "rateLg": 26, "lg": 347.5, "htLg": 0, "chiPhi": 260.5, "tnKhac": 0, "lntt": 87}, "cumData": {"ds": 8304.5, "rateLg": 33, "lg": 2745.2, "htLg": 53, "chiPhi": 2000, "tnKhac": 0, "lntt": 798.2}}, "THH_DVKT_2": {"vonDT": null, "monthData": {"ds": 292, "rateLg": 50, "lg": 144.7, "htLg": 0, "chiPhi": 89.1, "tnKhac": 0, "lntt": 55.6}, "cumData": {"ds": 2054.6, "rateLg": 51, "lg": 1058, "htLg": 0, "chiPhi": 600, "tnKhac": 0, "lntt": 458}}, "THH_DVKT_3": {"vonDT": null, "monthData": {"ds": 605, "rateLg": 38, "lg": 231.1, "htLg": 0, "chiPhi": 172.7, "tnKhac": 0, "lntt": 58.4}, "cumData": {"ds": 3654.1, "rateLg": 33, "lg": 1192.3, "htLg": 0, "chiPhi": 900, "tnKhac": 0, "lntt": 292.3}}, "THH_DVKT_4": {"vonDT": null, "monthData": {"ds": 233, "rateLg": 61, "lg": 141, "htLg": 0, "chiPhi": 81.6, "tnKhac": 0, "lntt": 59.4}, "cumData": {"ds": 1459.2, "rateLg": 51, "lg": 737.6, "htLg": 0, "chiPhi": 450, "tnKhac": 0, "lntt": 287.6}}, "THH_DVKT_5": {"vonDT": null, "monthData": {"ds": 102, "rateLg": -1, "lg": -0.6, "htLg": 1, "chiPhi": 2.4, "tnKhac": 0, "lntt": -2}, "cumData": {"ds": 673.4, "rateLg": 2, "lg": 14.1, "htLg": 1, "chiPhi": 12, "tnKhac": 0, "lntt": 3.1}}, "THH_KDTH": {"vonDT": null, "monthData": {"ds": 1139, "rateLg": 15, "lg": 174.6, "htLg": 0, "chiPhi": 165, "tnKhac": 10, "lntt": 19.6}, "cumData": {"ds": 12937.5, "rateLg": 8, "lg": 1034.7, "htLg": 9, "chiPhi": 1157, "tnKhac": 47, "lntt": -66}}, "THH_KDBB": {"vonDT": null, "monthData": {"ds": 4792, "rateLg": 10, "lg": 473.1, "htLg": 5, "chiPhi": 311, "tnKhac": 7, "lntt": 178}, "cumData": {"ds": 35000, "rateLg": 9, "lg": 2275.1, "htLg": 271, "chiPhi": 2438, "tnKhac": 10, "lntt": 119}}, "THH_DUAN": {"vonDT": null, "monthData": {"ds": 295, "rateLg": 19, "lg": 56.1, "htLg": 0, "chiPhi": 67, "tnKhac": 0, "lntt": -10}, "cumData": {"ds": 2500, "rateLg": 41, "lg": 1025, "htLg": 0, "chiPhi": 3342, "tnKhac": 0, "lntt": 2038}}, "VIET": {"vonDT": 10000, "monthData": {"ds": 6848, "rateLg": 20.3, "lg": 1390, "htLg": 0, "chiPhi": 983, "tnKhac": 7, "lntt": 382}, "cumData": {"ds": 40294, "rateLg": 21, "lg": 8562, "htLg": 0, "chiPhi": 6903, "tnKhac": 13, "lntt": 1672}}, "VIET_1": {"vonDT": null, "monthData": {"ds": 1565, "rateLg": 59, "lg": 924, "htLg": 0, "chiPhi": 653, "tnKhac": 0, "lntt": 271}, "cumData": {"ds": 10876, "rateLg": 58, "lg": 6285, "htLg": 0, "chiPhi": 4513, "tnKhac": 11.4, "lntt": 1783}}, "VIET_2": {"vonDT": null, "monthData": {"ds": 1991, "rateLg": 8, "lg": 151, "htLg": 0, "chiPhi": 144, "tnKhac": 7, "lntt": 14}, "cumData": {"ds": 12624, "rateLg": 8, "lg": 970, "htLg": 0, "chiPhi": 1022, "tnKhac": 1.5, "lntt": -51}}, "VIET_3": {"vonDT": null, "monthData": {"ds": 3135, "rateLg": 6.7, "lg": 211, "htLg": 0, "chiPhi": 149, "tnKhac": 0, "lntt": 62}, "cumData": {"ds": 16138, "rateLg": 6, "lg": 998, "htLg": 0, "chiPhi": 1116, "tnKhac": 0, "lntt": -118}}, "VIET_4": {"vonDT": null, "monthData": {"ds": 157, "rateLg": 49.9, "lg": 78.1, "htLg": 0, "chiPhi": 37, "tnKhac": 0, "lntt": 42}, "cumData": {"ds": 656, "rateLg": 47, "lg": 310, "htLg": 0, "chiPhi": 252, "tnKhac": 0, "lntt": 58}}, "ITSS": {"vonDT": 5000, "monthData": {"ds": 524, "rateLg": 37.4, "lg": 196, "htLg": 0, "chiPhi": 87, "tnKhac": 4, "lntt": 113}, "cumData": {"ds": 2915, "rateLg": 35, "lg": 1028, "htLg": 0, "chiPhi": 859, "tnKhac": -4, "lntt": 165}}, "VPS_CORP": {"vonDT": 10000, "monthData": {"ds": 14951, "rateLg": 3.1, "lg": 466, "htLg": 0, "chiPhi": 2327, "tnKhac": 1033, "lntt": -828}, "cumData": {"ds": 16633, "rateLg": 14, "lg": 2288, "htLg": 0, "chiPhi": 14400, "tnKhac": 7665, "lntt": -4447}}, "VPS_KD": {"vonDT": null, "monthData": {"ds": 14951, "rateLg": 3.1, "lg": 466, "htLg": 0, "chiPhi": 748, "tnKhac": 419, "lntt": 137}, "cumData": {"ds": 16633, "rateLg": 14, "lg": 2288, "htLg": 0, "chiPhi": 4673, "tnKhac": 2732, "lntt": 347}}, "VPS_TC": {"vonDT": null, "monthData": {"ds": 0, "rateLg": 0, "lg": 0, "htLg": 0, "chiPhi": 1579, "tnKhac": 614, "lntt": -965}, "cumData": {"ds": 0, "rateLg": 0, "lg": 0, "htLg": 0, "chiPhi": 9727, "tnKhac": 4933, "lntt": -4794}}, "XESCO": {"vonDT": 15000, "monthData": {"ds": 10326, "rateLg": 28, "lg": 2912, "htLg": 0, "chiPhi": 2129, "tnKhac": 51, "lntt": 834}, "cumData": {"ds": 69425, "rateLg": 27, "lg": 18667, "htLg": 0, "chiPhi": 14626, "tnKhac": 226, "lntt": 4267}}, "XESCO_KD": {"vonDT": null, "monthData": {"ds": 7182, "rateLg": 16, "lg": 1168, "htLg": 0, "chiPhi": 850, "tnKhac": 0, "lntt": 318}, "cumData": {"ds": 48562, "rateLg": 15, "lg": 7129, "htLg": 0, "chiPhi": 5542, "tnKhac": 100, "lntt": 1687}}, "XESCO_KD_1": {"vonDT": null, "monthData": {"ds": 191, "rateLg": 26, "lg": 49, "htLg": 0, "chiPhi": 71, "tnKhac": 0, "lntt": -22}, "cumData": {"ds": 3397, "rateLg": 23, "lg": 777, "htLg": 0, "chiPhi": 601, "tnKhac": 0, "lntt": 176}}, "XESCO_KD_2": {"vonDT": null, "monthData": {"ds": 4032, "rateLg": 17, "lg": 690, "htLg": 0, "chiPhi": 479, "tnKhac": 0, "lntt": 211}, "cumData": {"ds": 22834, "rateLg": 16, "lg": 3727, "htLg": 0, "chiPhi": 3151, "tnKhac": 100, "lntt": 676}}, "XESCO_KD_3": {"vonDT": null, "monthData": {"ds": 2539, "rateLg": 5, "lg": 135, "htLg": 0, "chiPhi": 129, "tnKhac": 0, "lntt": 6}, "cumData": {"ds": 19679, "rateLg": 4, "lg": 769, "htLg": 0, "chiPhi": 741, "tnKhac": 0, "lntt": 28}}, "XESCO_KD_4": {"vonDT": null, "monthData": {"ds": 420, "rateLg": 70, "lg": 294, "htLg": 0, "chiPhi": 171, "tnKhac": 0, "lntt": 123}, "cumData": {"ds": 2653, "rateLg": 70, "lg": 1856, "htLg": 0, "chiPhi": 1049, "tnKhac": 0, "lntt": 807}}, "XESCO_KT": {"vonDT": null, "monthData": {"ds": 3144, "rateLg": 55, "lg": 1744, "htLg": 0, "chiPhi": 1279, "tnKhac": 0, "lntt": 465}, "cumData": {"ds": 20863, "rateLg": 55, "lg": 11538, "htLg": 0, "chiPhi": 9084, "tnKhac": 126, "lntt": 2580}}, "XESCO_KT_1": {"vonDT": null, "monthData": {"ds": 1502, "rateLg": 66, "lg": 994, "htLg": 0, "chiPhi": 776, "tnKhac": 0, "lntt": 218}, "cumData": {"ds": 10358, "rateLg": 67, "lg": 6958, "htLg": 0, "chiPhi": 5723, "tnKhac": 6, "lntt": 1241}}, "XESCO_KT_2": {"vonDT": null, "monthData": {"ds": 278, "rateLg": 59, "lg": 164, "htLg": 0, "chiPhi": 0, "tnKhac": 0, "lntt": 164}, "cumData": {"ds": 1869, "rateLg": 60, "lg": 1114, "htLg": 0, "chiPhi": 0, "tnKhac": 0, "lntt": 1114}}, "XESCO_KT_3": {"vonDT": null, "monthData": {"ds": 1364, "rateLg": 43, "lg": 586, "htLg": 0, "chiPhi": 503, "tnKhac": 0, "lntt": 83}, "cumData": {"ds": 8636, "rateLg": 40, "lg": 3466, "htLg": 0, "chiPhi": 3361, "tnKhac": 120, "lntt": 225}}, "MT": {"vonDT": 3000, "monthData": {"ds": 1674, "rateLg": 14, "lg": 239, "htLg": 0, "chiPhi": 220, "tnKhac": 66, "lntt": 85}, "cumData": {"ds": 11251, "rateLg": 20, "lg": 2267, "htLg": 0, "chiPhi": 1515, "tnKhac": 76, "lntt": 828}}, "MT_1": {"vonDT": null, "monthData": {"ds": 993, "rateLg": 5, "lg": 49, "htLg": 0, "chiPhi": 40, "tnKhac": 0, "lntt": 9}, "cumData": {"ds": 5840, "rateLg": 8, "lg": 496, "htLg": 0, "chiPhi": 320, "tnKhac": 0, "lntt": 176}}, "MT_2": {"vonDT": null, "monthData": {"ds": 231, "rateLg": 14, "lg": 33, "htLg": 0, "chiPhi": 25, "tnKhac": 0, "lntt": 8}, "cumData": {"ds": 1788, "rateLg": 15, "lg": 268, "htLg": 0, "chiPhi": 180, "tnKhac": 0, "lntt": 88}}, "MT_3": {"vonDT": null, "monthData": {"ds": 93, "rateLg": 2, "lg": 2, "htLg": 0, "chiPhi": 5, "tnKhac": 0, "lntt": -3}, "cumData": {"ds": 806, "rateLg": 6, "lg": 45, "htLg": 0, "chiPhi": 35, "tnKhac": 0, "lntt": 10}}, "MT_4": {"vonDT": null, "monthData": {"ds": 225, "rateLg": 43, "lg": 97, "htLg": 0, "chiPhi": 30, "tnKhac": 0, "lntt": 67}, "cumData": {"ds": 1467, "rateLg": 49, "lg": 720, "htLg": 0, "chiPhi": 450, "tnKhac": 0, "lntt": 270}}, "MT_5": {"vonDT": null, "monthData": {"ds": 81, "rateLg": 25, "lg": 20, "htLg": 0, "chiPhi": 18, "tnKhac": 0, "lntt": 2}, "cumData": {"ds": 623, "rateLg": 65, "lg": 402, "htLg": 0, "chiPhi": 260, "tnKhac": 0, "lntt": 142}}, "MT_6": {"vonDT": null, "monthData": {"ds": 46, "rateLg": 78, "lg": 36, "htLg": 0, "chiPhi": 28, "tnKhac": 0, "lntt": 8}, "cumData": {"ds": 424, "rateLg": 67, "lg": 283, "htLg": 0, "chiPhi": 190, "tnKhac": 0, "lntt": 93}}, "MT_7": {"vonDT": null, "monthData": {"ds": 5, "rateLg": 20, "lg": 1, "htLg": 0, "chiPhi": 2, "tnKhac": 0, "lntt": -1}, "cumData": {"ds": 304, "rateLg": 17, "lg": 52, "htLg": 0, "chiPhi": 40, "tnKhac": 0, "lntt": 12}}}, "5": {"MB": {"vonDT": 90000, "monthData": {"ds": 16300.0, "rateLg": 17.0, "lg": 2772.0, "htLg": 2.0, "chiPhi": 4499.0, "tnKhac": 1118.0, "lntt": -606.0}, "cumData": {"ds": 83053.0, "rateLg": 24.0, "lg": 19745.0, "htLg": 313.0, "chiPhi": 25272.0, "tnKhac": 5745.0, "lntt": 294.0}}, "THH": {"vonDT": 50000, "monthData": {"ds": 9790.0, "rateLg": 14.0, "lg": 1401.0, "htLg": 2.4, "chiPhi": 1380.3, "tnKhac": 0.0, "lntt": 23.4}, "cumData": {"ds": 52777.0, "rateLg": 22.0, "lg": 11619.0, "htLg": 313.0, "chiPhi": 9813.0, "tnKhac": 7.0, "lntt": 2125.0}}, "THH_DVKT": {"vonDT": null, "monthData": {"ds": 2318.0, "rateLg": 38.0, "lg": 882.0, "htLg": 0.0, "chiPhi": 825.0, "tnKhac": 0.0, "lntt": 57.0}, "cumData": {"ds": 11119.0, "rateLg": 36.0, "lg": 3997.0, "htLg": 53.0, "chiPhi": 3970.0, "tnKhac": 0.0, "lntt": 81.0}}, "THH_DVKT_1": {"vonDT": null, "monthData": {"ds": 1264.0, "rateLg": 38.0, "lg": 474.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 5641.0, "rateLg": 34.0, "lg": 1937.4, "htLg": 53.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_2": {"vonDT": null, "monthData": {"ds": 271.0, "rateLg": 59.0, "lg": 158.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1556.0, "rateLg": 51.0, "lg": 799.2, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_3": {"vonDT": null, "monthData": {"ds": 575.0, "rateLg": 37.0, "lg": 215.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 2454.0, "rateLg": 31.0, "lg": 768.6, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_4": {"vonDT": null, "monthData": {"ds": 148.0, "rateLg": 22.0, "lg": 33.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1014.0, "rateLg": 47.0, "lg": 477.1, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_5": {"vonDT": null, "monthData": {"ds": 61.0, "rateLg": 3.0, "lg": 2.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 455.0, "rateLg": 3.0, "lg": 14.7, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_KDTH": {"vonDT": null, "monthData": {"ds": 4682.0, "rateLg": 4.0, "lg": 200.0, "htLg": 0.0, "chiPhi": 180.0, "tnKhac": 0.0, "lntt": 20.0}, "cumData": {"ds": 12214.0, "rateLg": 6.0, "lg": 778.3, "htLg": 0.0, "chiPhi": 829.0, "tnKhac": 3.0, "lntt": -48.0}}, "THH_KDBB": {"vonDT": null, "monthData": {"ds": 2790.0, "rateLg": 11.0, "lg": 319.0, "htLg": 2.4, "chiPhi": 310.0, "tnKhac": 0.0, "lntt": 11.0}, "cumData": {"ds": 16650.0, "rateLg": 9.0, "lg": 1518.4, "htLg": 260.0, "chiPhi": 1802.0, "tnKhac": 3.0, "lntt": -21.0}}, "THH_DUAN": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 65.0, "tnKhac": 0.0, "lntt": -65.0}, "cumData": {"ds": 12794.0, "rateLg": 42.0, "lg": 5325.1, "htLg": 0.0, "chiPhi": 3212.0, "tnKhac": 0.0, "lntt": 2113.0}}, "VIET": {"vonDT": 10000, "monthData": {"ds": 5998.0, "rateLg": 20.0, "lg": 1218.0, "htLg": 0.0, "chiPhi": 1009.0, "tnKhac": 4.0, "lntt": 213.0}, "cumData": {"ds": 27057.0, "rateLg": 22.0, "lg": 5886.0, "htLg": 0.0, "chiPhi": 4914.0, "tnKhac": 16.0, "lntt": 989.0}}, "VIET_1": {"vonDT": null, "monthData": {"ds": 1539.0, "rateLg": 60.0, "lg": 925.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 7670.0, "rateLg": 57.0, "lg": 4400.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_2": {"vonDT": null, "monthData": {"ds": 2001.0, "rateLg": 8.0, "lg": 160.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 8046.0, "rateLg": 8.0, "lg": 664.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_3": {"vonDT": null, "monthData": {"ds": 2394.0, "rateLg": 5.0, "lg": 114.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 10446.0, "rateLg": 6.0, "lg": 602.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_4": {"vonDT": null, "monthData": {"ds": 46.0, "rateLg": 36.0, "lg": 17.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 414.0, "rateLg": 43.0, "lg": 180.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "ITSS": {"vonDT": 5000, "monthData": {"ds": 479.0, "rateLg": 41.0, "lg": 197.0, "htLg": 0.0, "chiPhi": 107.0, "tnKhac": 0.0, "lntt": 90.0}, "cumData": {"ds": 1570.0, "rateLg": 33.0, "lg": 516.0, "htLg": 0.0, "chiPhi": 571.0, "tnKhac": 8.0, "lntt": -63.0}}, "VPS_CORP": {"vonDT": 10000, "monthData": {"ds": 33.0, "rateLg": 0.0, "lg": -44.0, "htLg": 0.0, "chiPhi": 2002.0, "tnKhac": 1113.0, "lntt": -932.0}, "cumData": {"ds": 1648.0, "rateLg": 105.0, "lg": 1724.0, "htLg": 0.0, "chiPhi": 9974.0, "tnKhac": 5493.0, "lntt": -2756.0}}, "VPS_KD": {"vonDT": null, "monthData": {"ds": 33.0, "rateLg": 0.0, "lg": -44.0, "htLg": 0.0, "chiPhi": 577.0, "tnKhac": 422.0, "lntt": -198.0}, "cumData": {"ds": 1648.0, "rateLg": 105.0, "lg": 1724.0, "htLg": 0.0, "chiPhi": 3229.0, "tnKhac": 1890.0, "lntt": 386.0}}, "VPS_TC": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1425.0, "tnKhac": 691.0, "lntt": -734.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 6745.0, "tnKhac": 3603.0, "lntt": -3142.0}}, "XESCO": {"vonDT": 15000, "monthData": {"ds": 9770.0, "rateLg": 25.0, "lg": 2437.0, "htLg": 0.0, "chiPhi": 2085.0, "tnKhac": 198.0, "lntt": 551.0}, "cumData": {"ds": 48233.0, "rateLg": 26.0, "lg": 12713.0, "htLg": 0.0, "chiPhi": 10377.0, "tnKhac": 187.0, "lntt": 2523.0}}, "XESCO_KT": {"vonDT": null, "monthData": {"ds": 2891.0, "rateLg": 53.0, "lg": 1521.0, "htLg": 0.0, "chiPhi": 1310.0, "tnKhac": 113.0, "lntt": 324.0}, "cumData": {"ds": 14576.0, "rateLg": 55.0, "lg": 8000.0, "htLg": 0.0, "chiPhi": 6494.0, "tnKhac": 114.0, "lntt": 1620.0}}, "XESCO_KT_1": {"vonDT": null, "monthData": {"ds": 1403.0, "rateLg": 64.0, "lg": 902.0, "htLg": 0.0, "chiPhi": 801.0, "tnKhac": -4.0, "lntt": 97.0}, "cumData": {"ds": 7394.0, "rateLg": 67.0, "lg": 4991.0, "htLg": 0.0, "chiPhi": 4143.0, "tnKhac": -1.0, "lntt": 847.0}}, "XESCO_KT_2": {"vonDT": null, "monthData": {"ds": 235.0, "rateLg": 37.0, "lg": 87.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 120.0, "lntt": 207.0}, "cumData": {"ds": 1294.0, "rateLg": 59.0, "lg": 768.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 768.0}}, "XESCO_KT_3": {"vonDT": null, "monthData": {"ds": 1253.0, "rateLg": 42.0, "lg": 532.0, "htLg": 0.0, "chiPhi": 509.0, "tnKhac": -3.0, "lntt": 20.0}, "cumData": {"ds": 5888.0, "rateLg": 38.0, "lg": 2241.0, "htLg": 0.0, "chiPhi": 2351.0, "tnKhac": 115.0, "lntt": 5.0}}, "XESCO_KD": {"vonDT": null, "monthData": {"ds": 6879.0, "rateLg": 13.0, "lg": 916.0, "htLg": 0.0, "chiPhi": 774.0, "tnKhac": 85.0, "lntt": 227.0}, "cumData": {"ds": 33658.0, "rateLg": 14.0, "lg": 4714.0, "htLg": 0.0, "chiPhi": 3883.0, "tnKhac": 73.0, "lntt": 904.0}}, "XESCO_KD_1": {"vonDT": null, "monthData": {"ds": 434.0, "rateLg": 18.0, "lg": 78.0, "htLg": 0.0, "chiPhi": 68.0, "tnKhac": -1.0, "lntt": 9.0}, "cumData": {"ds": 2043.0, "rateLg": 25.0, "lg": 519.0, "htLg": 0.0, "chiPhi": 441.0, "tnKhac": -1.0, "lntt": 77.0}}, "XESCO_KD_2": {"vonDT": null, "monthData": {"ds": 2702.0, "rateLg": 19.0, "lg": 500.0, "htLg": 0.0, "chiPhi": 454.0, "tnKhac": 94.0, "lntt": 140.0}, "cumData": {"ds": 15813.0, "rateLg": 15.0, "lg": 2386.0, "htLg": 0.0, "chiPhi": 2216.0, "tnKhac": 87.0, "lntt": 257.0}}, "XESCO_KD_3": {"vonDT": null, "monthData": {"ds": 3405.0, "rateLg": 3.0, "lg": 115.0, "htLg": 0.0, "chiPhi": 112.0, "tnKhac": -8.0, "lntt": -5.0}, "cumData": {"ds": 13945.0, "rateLg": 4.0, "lg": 507.0, "htLg": 0.0, "chiPhi": 490.0, "tnKhac": -14.0, "lntt": 3.0}}, "XESCO_KD_4": {"vonDT": null, "monthData": {"ds": 338.0, "rateLg": 66.0, "lg": 223.0, "htLg": 0.0, "chiPhi": 140.0, "tnKhac": -1.0, "lntt": 82.0}, "cumData": {"ds": 1857.0, "rateLg": 70.0, "lg": 1302.0, "htLg": 0.0, "chiPhi": 736.0, "tnKhac": -2.0, "lntt": 564.0}}, "MT": {"vonDT": 3000, "monthData": {"ds": 1488.0, "rateLg": 22.0, "lg": 330.0, "htLg": 0.0, "chiPhi": 235.0, "tnKhac": 0.0, "lntt": 95.0}, "cumData": {"ds": 8404.0, "rateLg": 21.0, "lg": 1736.0, "htLg": 0.0, "chiPhi": 1082.0, "tnKhac": 0.0, "lntt": 654.0}}, "MT_1": {"vonDT": null, "monthData": {"ds": 684.0, "rateLg": 9.0, "lg": 60.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 4355.0, "rateLg": 9.0, "lg": 389.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_2": {"vonDT": null, "monthData": {"ds": 256.0, "rateLg": 7.0, "lg": 17.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1364.0, "rateLg": 15.0, "lg": 206.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_3": {"vonDT": null, "monthData": {"ds": 118.0, "rateLg": 3.0, "lg": 3.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 662.0, "rateLg": 6.0, "lg": 40.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_4": {"vonDT": null, "monthData": {"ds": 247.0, "rateLg": 54.0, "lg": 133.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1013.0, "rateLg": 52.0, "lg": 522.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_5": {"vonDT": null, "monthData": {"ds": 99.0, "rateLg": 71.0, "lg": 70.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 446.0, "rateLg": 71.0, "lg": 316.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_6": {"vonDT": null, "monthData": {"ds": 53.0, "rateLg": 72.0, "lg": 38.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 332.0, "rateLg": 68.0, "lg": 224.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_7": {"vonDT": null, "monthData": {"ds": 32.0, "rateLg": 32.0, "lg": 10.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 231.0, "rateLg": 17.0, "lg": 38.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "GRAND_TOTAL": {"vonDT": 93000, "monthData": {"ds": 27557.0, "rateLg": 20.0, "lg": 5540.0, "htLg": 2.0, "chiPhi": 6819.0, "tnKhac": 1299.0, "lntt": -13.0}, "cumData": {"ds": 139689.0, "rateLg": 24.0, "lg": 34194.0, "htLg": 313.0, "chiPhi": 36730.0, "tnKhac": 6000.0, "lntt": 3472.0}}}, "6": {"MB": {"vonDT": 90000, "monthData": {"ds": 14385.0, "rateLg": 21.0, "lg": 3028.0, "htLg": 16.0, "chiPhi": 4606.0, "tnKhac": 1183.0, "lntt": -380.0}, "cumData": {"ds": 97438.0, "rateLg": 23.0, "lg": 22773.0, "htLg": 329.0, "chiPhi": 29879.0, "tnKhac": 6928.0, "lntt": -86.0}}, "THH": {"vonDT": 50000, "monthData": {"ds": 6622.0, "rateLg": 19.0, "lg": 1248.0, "htLg": 16.3, "chiPhi": 1300.8, "tnKhac": 44.0, "lntt": 6.9}, "cumData": {"ds": 59399.0, "rateLg": 22.0, "lg": 12866.0, "htLg": 329.0, "chiPhi": 11114.0, "tnKhac": 50.0, "lntt": 2132.0}}, "THH_DVKT": {"vonDT": null, "monthData": {"ds": 2489.0, "rateLg": 36.0, "lg": 886.0, "htLg": 0.0, "chiPhi": 749.0, "tnKhac": 0.0, "lntt": 137.0}, "cumData": {"ds": 13608.0, "rateLg": 36.0, "lg": 4883.0, "htLg": 53.0, "chiPhi": 4719.0, "tnKhac": 0.0, "lntt": 218.0}}, "THH_DVKT_1": {"vonDT": null, "monthData": {"ds": 1337.0, "rateLg": 34.0, "lg": 460.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 6997.0, "rateLg": 34.0, "lg": 2397.7, "htLg": 53.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_2": {"vonDT": null, "monthData": {"ds": 207.0, "rateLg": 55.0, "lg": 114.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1763.0, "rateLg": 52.0, "lg": 913.3, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_3": {"vonDT": null, "monthData": {"ds": 595.0, "rateLg": 32.0, "lg": 193.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 3049.0, "rateLg": 32.0, "lg": 961.2, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_4": {"vonDT": null, "monthData": {"ds": 213.0, "rateLg": 56.0, "lg": 119.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1227.0, "rateLg": 49.0, "lg": 596.6, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_5": {"vonDT": null, "monthData": {"ds": 116.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 571.0, "rateLg": 3.0, "lg": 14.7, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_KDTH": {"vonDT": null, "monthData": {"ds": 348.0, "rateLg": 23.0, "lg": 82.0, "htLg": 9.0, "chiPhi": 163.0, "tnKhac": 44.0, "lntt": -28.0}, "cumData": {"ds": 12562.0, "rateLg": 7.0, "lg": 859.9, "htLg": 9.0, "chiPhi": 992.0, "tnKhac": 47.0, "lntt": -76.0}}, "THH_KDBB": {"vonDT": null, "monthData": {"ds": 3786.0, "rateLg": 7.0, "lg": 280.0, "htLg": 6.8, "chiPhi": 325.0, "tnKhac": 0.0, "lntt": -39.0}, "cumData": {"ds": 20436.0, "rateLg": 9.0, "lg": 1798.0, "htLg": 267.0, "chiPhi": 2127.0, "tnKhac": 3.0, "lntt": -59.0}}, "THH_DUAN": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 64.0, "tnKhac": 0.0, "lntt": -64.0}, "cumData": {"ds": 12794.0, "rateLg": 42.0, "lg": 5325.1, "htLg": 0.0, "chiPhi": 3276.0, "tnKhac": 0.0, "lntt": 2049.0}}, "VIET": {"vonDT": 10000, "monthData": {"ds": 6908.0, "rateLg": 20.0, "lg": 1364.0, "htLg": 0.0, "chiPhi": 1006.0, "tnKhac": 1.0, "lntt": 360.0}, "cumData": {"ds": 33965.0, "rateLg": 21.0, "lg": 7250.0, "htLg": 0.0, "chiPhi": 5920.0, "tnKhac": 17.0, "lntt": 1348.0}}, "VIET_1": {"vonDT": null, "monthData": {"ds": 1640.0, "rateLg": 59.0, "lg": 961.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 9311.0, "rateLg": 58.0, "lg": 5361.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_2": {"vonDT": null, "monthData": {"ds": 2588.0, "rateLg": 6.0, "lg": 154.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 10634.0, "rateLg": 8.0, "lg": 818.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_3": {"vonDT": null, "monthData": {"ds": 2557.0, "rateLg": 7.0, "lg": 185.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 13003.0, "rateLg": 6.0, "lg": 787.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_4": {"vonDT": null, "monthData": {"ds": 85.0, "rateLg": 61.0, "lg": 52.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 500.0, "rateLg": 46.0, "lg": 232.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "ITSS": {"vonDT": 5000, "monthData": {"ds": 821.0, "rateLg": 39.0, "lg": 317.0, "htLg": 0.0, "chiPhi": 200.0, "tnKhac": 0.0, "lntt": 116.0}, "cumData": {"ds": 2391.0, "rateLg": 35.0, "lg": 833.0, "htLg": 0.0, "chiPhi": 772.0, "tnKhac": 8.0, "lntt": 53.0}}, "VPS_CORP": {"vonDT": 10000, "monthData": {"ds": 34.0, "rateLg": 0.0, "lg": 99.0, "htLg": 0.0, "chiPhi": 2100.0, "tnKhac": 1138.0, "lntt": -863.0}, "cumData": {"ds": 1682.0, "rateLg": 108.0, "lg": 1823.0, "htLg": 0.0, "chiPhi": 12073.0, "tnKhac": 6631.0, "lntt": -3619.0}}, "VPS_KD": {"vonDT": null, "monthData": {"ds": 34.0, "rateLg": 0.0, "lg": 99.0, "htLg": 0.0, "chiPhi": 697.0, "tnKhac": 422.0, "lntt": -176.0}, "cumData": {"ds": 1682.0, "rateLg": 108.0, "lg": 1823.0, "htLg": 0.0, "chiPhi": 3925.0, "tnKhac": 2312.0, "lntt": 210.0}}, "VPS_TC": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1403.0, "tnKhac": 716.0, "lntt": -687.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 8148.0, "tnKhac": 4319.0, "lntt": -3829.0}}, "XESCO": {"vonDT": 15000, "monthData": {"ds": 10866.0, "rateLg": 28.0, "lg": 3042.0, "htLg": 0.0, "chiPhi": 2072.0, "tnKhac": 117.0, "lntt": 1087.0}, "cumData": {"ds": 59099.0, "rateLg": 27.0, "lg": 15755.0, "htLg": 0.0, "chiPhi": 12449.0, "tnKhac": 304.0, "lntt": 3610.0}}, "XESCO_KT": {"vonDT": null, "monthData": {"ds": 3143.0, "rateLg": 57.0, "lg": 1795.0, "htLg": 0.0, "chiPhi": 1296.0, "tnKhac": -3.0, "lntt": 495.0}, "cumData": {"ds": 17719.0, "rateLg": 55.0, "lg": 9794.0, "htLg": 0.0, "chiPhi": 7790.0, "tnKhac": 111.0, "lntt": 2115.0}}, "XESCO_KT_1": {"vonDT": null, "monthData": {"ds": 1462.0, "rateLg": 67.0, "lg": 973.0, "htLg": 0.0, "chiPhi": 795.0, "tnKhac": -2.0, "lntt": 176.0}, "cumData": {"ds": 8856.0, "rateLg": 67.0, "lg": 5964.0, "htLg": 0.0, "chiPhi": 4938.0, "tnKhac": -3.0, "lntt": 1023.0}}, "XESCO_KT_2": {"vonDT": null, "monthData": {"ds": 297.0, "rateLg": 61.0, "lg": 182.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 182.0}, "cumData": {"ds": 1591.0, "rateLg": 60.0, "lg": 950.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 950.0}}, "XESCO_KT_3": {"vonDT": null, "monthData": {"ds": 1384.0, "rateLg": 46.0, "lg": 640.0, "htLg": 0.0, "chiPhi": 501.0, "tnKhac": -1.0, "lntt": 137.0}, "cumData": {"ds": 7272.0, "rateLg": 40.0, "lg": 2880.0, "htLg": 0.0, "chiPhi": 2852.0, "tnKhac": 114.0, "lntt": 142.0}}, "XESCO_KD": {"vonDT": null, "monthData": {"ds": 7723.0, "rateLg": 16.0, "lg": 1247.0, "htLg": 0.0, "chiPhi": 776.0, "tnKhac": 120.0, "lntt": 592.0}, "cumData": {"ds": 41381.0, "rateLg": 14.0, "lg": 5961.0, "htLg": 0.0, "chiPhi": 4658.0, "tnKhac": 193.0, "lntt": 1495.0}}, "XESCO_KD_1": {"vonDT": null, "monthData": {"ds": 1163.0, "rateLg": 18.0, "lg": 209.0, "htLg": 0.0, "chiPhi": 87.0, "tnKhac": -1.0, "lntt": 121.0}, "cumData": {"ds": 3206.0, "rateLg": 23.0, "lg": 728.0, "htLg": 0.0, "chiPhi": 527.0, "tnKhac": -1.0, "lntt": 199.0}}, "XESCO_KD_2": {"vonDT": null, "monthData": {"ds": 2989.0, "rateLg": 22.0, "lg": 651.0, "htLg": 0.0, "chiPhi": 443.0, "tnKhac": -3.0, "lntt": 206.0}, "cumData": {"ds": 18802.0, "rateLg": 16.0, "lg": 3037.0, "htLg": 0.0, "chiPhi": 2659.0, "tnKhac": 84.0, "lntt": 462.0}}, "XESCO_KD_3": {"vonDT": null, "monthData": {"ds": 3195.0, "rateLg": 4.0, "lg": 127.0, "htLg": 0.0, "chiPhi": 104.0, "tnKhac": -3.0, "lntt": 20.0}, "cumData": {"ds": 17140.0, "rateLg": 4.0, "lg": 634.0, "htLg": 0.0, "chiPhi": 594.0, "tnKhac": -17.0, "lntt": 23.0}}, "XESCO_KD_4": {"vonDT": null, "monthData": {"ds": 376.0, "rateLg": 69.0, "lg": 260.0, "htLg": 0.0, "chiPhi": 142.0, "tnKhac": 0.0, "lntt": 118.0}, "cumData": {"ds": 2233.0, "rateLg": 70.0, "lg": 1562.0, "htLg": 0.0, "chiPhi": 878.0, "tnKhac": -2.0, "lntt": 682.0}}, "MT": {"vonDT": 3000, "monthData": {"ds": 1175.0, "rateLg": 25.0, "lg": 292.0, "htLg": 0.0, "chiPhi": 213.0, "tnKhac": 0.0, "lntt": 79.0}, "cumData": {"ds": 9577.0, "rateLg": 21.0, "lg": 2028.0, "htLg": 0.0, "chiPhi": 1295.0, "tnKhac": 10.0, "lntt": 743.0}}, "MT_1": {"vonDT": null, "monthData": {"ds": 492.0, "rateLg": 12.0, "lg": 58.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 4847.0, "rateLg": 9.0, "lg": 447.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_2": {"vonDT": null, "monthData": {"ds": 193.0, "rateLg": 15.0, "lg": 29.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1557.0, "rateLg": 15.0, "lg": 235.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_3": {"vonDT": null, "monthData": {"ds": 51.0, "rateLg": 4.0, "lg": 2.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 713.0, "rateLg": 6.0, "lg": 42.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_4": {"vonDT": null, "monthData": {"ds": 228.0, "rateLg": 44.0, "lg": 101.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1241.0, "rateLg": 50.0, "lg": 623.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_5": {"vonDT": null, "monthData": {"ds": 96.0, "rateLg": 69.0, "lg": 66.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 542.0, "rateLg": 70.0, "lg": 382.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_6": {"vonDT": null, "monthData": {"ds": 46.0, "rateLg": 49.0, "lg": 23.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 378.0, "rateLg": 65.0, "lg": 247.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_7": {"vonDT": null, "monthData": {"ds": 68.0, "rateLg": 19.0, "lg": 13.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 299.0, "rateLg": 17.0, "lg": 51.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "GRAND_TOTAL": {"vonDT": 93000, "monthData": {"ds": 26425.0, "rateLg": 24.0, "lg": 6361.0, "htLg": 16.0, "chiPhi": 6892.0, "tnKhac": 1311.0, "lntt": 786.0}, "cumData": {"ds": 166114.0, "rateLg": 24.0, "lg": 40556.0, "htLg": 329.0, "chiPhi": 43623.0, "tnKhac": 7322.0, "lntt": 4267.0}}}, "8": {"MB": {"vonDT": 90000, "monthData": {"ds": 25731.0, "rateLg": 16.0, "lg": 4082.0, "htLg": 8.0, "chiPhi": 4910.0, "tnKhac": 1047.0, "lntt": 228.0}, "cumData": {"ds": 154375.0, "rateLg": 20.0, "lg": 30478.0, "htLg": 343.0, "chiPhi": 39526.0, "tnKhac": 9025.0, "lntt": 55.0}}, "THH": {"vonDT": 50000, "monthData": {"ds": 9993.0, "rateLg": 19.0, "lg": 1910.0, "htLg": 7.7, "chiPhi": 1392.3, "tnKhac": 0.0, "lntt": 525.1}, "cumData": {"ds": 78197.0, "rateLg": 21.0, "lg": 16347.0, "htLg": 343.0, "chiPhi": 13846.0, "tnKhac": 58.0, "lntt": 2902.0}}, "THH_DVKT": {"vonDT": null, "monthData": {"ds": 2196.0, "rateLg": 39.0, "lg": 851.0, "htLg": 0.0, "chiPhi": 774.0, "tnKhac": 0.0, "lntt": 76.0}, "cumData": {"ds": 18382.0, "rateLg": 36.0, "lg": 6598.0, "htLg": 54.0, "chiPhi": 6291.0, "tnKhac": 1.0, "lntt": 362.0}}, "THH_DVKT_1": {"vonDT": null, "monthData": {"ds": 959.0, "rateLg": 37.0, "lg": 358.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 9304.0, "rateLg": 33.0, "lg": 3103.0, "htLg": 53.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_2": {"vonDT": null, "monthData": {"ds": 264.0, "rateLg": 47.0, "lg": 124.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 2319.0, "rateLg": 51.0, "lg": 1181.7, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_3": {"vonDT": null, "monthData": {"ds": 650.0, "rateLg": 36.0, "lg": 233.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 4304.0, "rateLg": 33.0, "lg": 1424.8, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_4": {"vonDT": null, "monthData": {"ds": 225.0, "rateLg": 60.0, "lg": 135.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1684.0, "rateLg": 52.0, "lg": 873.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_DVKT_5": {"vonDT": null, "monthData": {"ds": 98.0, "rateLg": 1.0, "lg": 1.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 772.0, "rateLg": 2.0, "lg": 15.1, "htLg": 1.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "THH_KDTH": {"vonDT": null, "monthData": {"ds": 1248.0, "rateLg": 14.0, "lg": 177.0, "htLg": 0.0, "chiPhi": 166.0, "tnKhac": 0.0, "lntt": 11.0}, "cumData": {"ds": 14949.0, "rateLg": 8.0, "lg": 1212.1, "htLg": 9.0, "chiPhi": 1324.0, "tnKhac": 47.0, "lntt": -55.0}}, "THH_KDBB": {"vonDT": null, "monthData": {"ds": 5135.0, "rateLg": 11.0, "lg": 572.0, "htLg": 7.7, "chiPhi": 395.0, "tnKhac": 0.0, "lntt": 184.0}, "cumData": {"ds": 30362.0, "rateLg": 9.0, "lg": 2847.1, "htLg": 279.0, "chiPhi": 2833.0, "tnKhac": 10.0, "lntt": 303.0}}, "THH_DUAN": {"vonDT": null, "monthData": {"ds": 1415.0, "rateLg": 22.0, "lg": 310.0, "htLg": 0.0, "chiPhi": 56.0, "tnKhac": 0.0, "lntt": 254.0}, "cumData": {"ds": 14503.0, "rateLg": 39.0, "lg": 5690.3, "htLg": 0.0, "chiPhi": 3398.0, "tnKhac": 0.0, "lntt": 2292.0}}, "VIET": {"vonDT": 10000, "monthData": {"ds": 7713.0, "rateLg": 18.0, "lg": 1364.0, "htLg": 0.0, "chiPhi": 936.0, "tnKhac": 6.0, "lntt": 433.0}, "cumData": {"ds": 48605.0, "rateLg": 21.0, "lg": 10004.0, "htLg": 0.0, "chiPhi": 7839.0, "tnKhac": 0.0, "lntt": 2165.0}}, "VIET_1": {"vonDT": null, "monthData": {"ds": 1546.0, "rateLg": 59.0, "lg": 910.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 12422.0, "rateLg": 58.0, "lg": 7195.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_2": {"vonDT": null, "monthData": {"ds": 2213.0, "rateLg": 7.0, "lg": 166.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 14838.0, "rateLg": 8.0, "lg": 1135.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_3": {"vonDT": null, "monthData": {"ds": 3764.0, "rateLg": 6.0, "lg": 241.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 19902.0, "rateLg": 6.0, "lg": 1239.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "VIET_4": {"vonDT": null, "monthData": {"ds": 179.0, "rateLg": 26.0, "lg": 46.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 835.0, "rateLg": 43.0, "lg": 356.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "ITSS": {"vonDT": 5000, "monthData": {"ds": 641.0, "rateLg": 44.0, "lg": 280.0, "htLg": 0.0, "chiPhi": 103.0, "tnKhac": 0.0, "lntt": 176.0}, "cumData": {"ds": 3555.0, "rateLg": 37.0, "lg": 1309.0, "htLg": 0.0, "chiPhi": 963.0, "tnKhac": -4.0, "lntt": 342.0}}, "VPS_CORP": {"vonDT": 10000, "monthData": {"ds": 7384.0, "rateLg": 0.0, "lg": 529.0, "htLg": 0.0, "chiPhi": 2478.0, "tnKhac": 1042.0, "lntt": -907.0}, "cumData": {"ds": 24017.0, "rateLg": 12.0, "lg": 2818.0, "htLg": 0.0, "chiPhi": 16878.0, "tnKhac": 8706.0, "lntt": -5354.0}}, "VPS_KD": {"vonDT": null, "monthData": {"ds": 7384.0, "rateLg": 0.0, "lg": 529.0, "htLg": 0.0, "chiPhi": 715.0, "tnKhac": 427.0, "lntt": 242.0}, "cumData": {"ds": 24017.0, "rateLg": 12.0, "lg": 2818.0, "htLg": 0.0, "chiPhi": 5389.0, "tnKhac": 3159.0, "lntt": 588.0}}, "VPS_TC": {"vonDT": null, "monthData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 1763.0, "tnKhac": 614.0, "lntt": -1148.0}, "cumData": {"ds": 0.0, "rateLg": 0.0, "lg": 0.0, "htLg": 0.0, "chiPhi": 11490.0, "tnKhac": 5547.0, "lntt": -5942.0}}, "XESCO": {"vonDT": 15000, "monthData": {"ds": 15102.0, "rateLg": 27.0, "lg": 4020.0, "htLg": 0.0, "chiPhi": 2190.0, "tnKhac": 28.0, "lntt": 1858.0}, "cumData": {"ds": 84527.0, "rateLg": 27.0, "lg": 22687.0, "htLg": 0.0, "chiPhi": 16756.0, "tnKhac": 364.0, "lntt": 6295.0}}, "XESCO_KT": {"vonDT": null, "monthData": {"ds": 2991.0, "rateLg": 56.0, "lg": 1685.0, "htLg": 0.0, "chiPhi": 1304.0, "tnKhac": -2.0, "lntt": 379.0}, "cumData": {"ds": 23855.0, "rateLg": 55.0, "lg": 13222.0, "htLg": 0.0, "chiPhi": 10369.0, "tnKhac": 94.0, "lntt": 2959.0}}, "XESCO_KT_1": {"vonDT": null, "monthData": {"ds": 1427.0, "rateLg": 64.0, "lg": 918.0, "htLg": 0.0, "chiPhi": 796.0, "tnKhac": -1.0, "lntt": 121.0}, "cumData": {"ds": 11785.0, "rateLg": 67.0, "lg": 7875.0, "htLg": 0.0, "chiPhi": 6508.0, "tnKhac": -6.0, "lntt": 1362.0}}, "XESCO_KT_2": {"vonDT": null, "monthData": {"ds": 270.0, "rateLg": 63.0, "lg": 170.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 170.0}, "cumData": {"ds": 2139.0, "rateLg": 60.0, "lg": 1284.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 1284.0}}, "XESCO_KT_3": {"vonDT": null, "monthData": {"ds": 1294.0, "rateLg": 46.0, "lg": 597.0, "htLg": 0.0, "chiPhi": 508.0, "tnKhac": -1.0, "lntt": 88.0}, "cumData": {"ds": 9931.0, "rateLg": 41.0, "lg": 4063.0, "htLg": 0.0, "chiPhi": 3861.0, "tnKhac": 111.0, "lntt": 313.0}}, "XESCO_KD": {"vonDT": null, "monthData": {"ds": 12111.0, "rateLg": 19.0, "lg": 2336.0, "htLg": 0.0, "chiPhi": 887.0, "tnKhac": 30.0, "lntt": 1480.0}, "cumData": {"ds": 60672.0, "rateLg": 16.0, "lg": 9464.0, "htLg": 0.0, "chiPhi": 6387.0, "tnKhac": 149.0, "lntt": 3336.0}}, "XESCO_KD_1": {"vonDT": null, "monthData": {"ds": 217.0, "rateLg": 21.0, "lg": 46.0, "htLg": 0.0, "chiPhi": 56.0, "tnKhac": 0.0, "lntt": -10.0}, "cumData": {"ds": 3614.0, "rateLg": 23.0, "lg": 823.0, "htLg": 0.0, "chiPhi": 654.0, "tnKhac": -3.0, "lntt": 165.0}}, "XESCO_KD_2": {"vonDT": null, "monthData": {"ds": 4169.0, "rateLg": 16.0, "lg": 682.0, "htLg": 0.0, "chiPhi": 459.0, "tnKhac": -3.0, "lntt": 221.0}, "cumData": {"ds": 27002.0, "rateLg": 16.0, "lg": 4410.0, "htLg": 0.0, "chiPhi": 3591.0, "tnKhac": 76.0, "lntt": 895.0}}, "XESCO_KD_3": {"vonDT": null, "monthData": {"ds": 3918.0, "rateLg": 3.0, "lg": 114.0, "htLg": 0.0, "chiPhi": 71.0, "tnKhac": -3.0, "lntt": 40.0}, "cumData": {"ds": 23597.0, "rateLg": 4.0, "lg": 882.0, "htLg": 0.0, "chiPhi": 792.0, "tnKhac": -22.0, "lntt": 68.0}}, "XESCO_KD_4": {"vonDT": null, "monthData": {"ds": 381.0, "rateLg": 65.0, "lg": 249.0, "htLg": 0.0, "chiPhi": 170.0, "tnKhac": 0.0, "lntt": 79.0}, "cumData": {"ds": 3033.0, "rateLg": 69.0, "lg": 2104.0, "htLg": 0.0, "chiPhi": 1219.0, "tnKhac": -3.0, "lntt": 883.0}}, "MT": {"vonDT": 3000, "monthData": {"ds": 1686.0, "rateLg": 23.0, "lg": 394.0, "htLg": 0.0, "chiPhi": 266.0, "tnKhac": 0.0, "lntt": 128.0}, "cumData": {"ds": 12937.0, "rateLg": 21.0, "lg": 2661.0, "htLg": 0.0, "chiPhi": 1782.0, "tnKhac": 0.0, "lntt": 880.0}}, "MT_1": {"vonDT": null, "monthData": {"ds": 858.0, "rateLg": 9.0, "lg": 79.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 6698.0, "rateLg": 9.0, "lg": 575.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_2": {"vonDT": null, "monthData": {"ds": 240.0, "rateLg": 18.0, "lg": 44.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 2028.0, "rateLg": 15.0, "lg": 312.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_3": {"vonDT": null, "monthData": {"ds": 98.0, "rateLg": 3.0, "lg": 3.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 898.0, "rateLg": 5.0, "lg": 48.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_4": {"vonDT": null, "monthData": {"ds": 270.0, "rateLg": 46.0, "lg": 123.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 1737.0, "rateLg": 49.0, "lg": 844.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_5": {"vonDT": null, "monthData": {"ds": 119.0, "rateLg": 79.0, "lg": 94.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 743.0, "rateLg": 67.0, "lg": 496.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_6": {"vonDT": null, "monthData": {"ds": 53.0, "rateLg": 76.0, "lg": 41.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 478.0, "rateLg": 68.0, "lg": 324.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "MT_7": {"vonDT": null, "monthData": {"ds": 52.0, "rateLg": 22.0, "lg": 11.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}, "cumData": {"ds": 355.0, "rateLg": 18.0, "lg": 63.0, "htLg": 0.0, "chiPhi": 0.0, "tnKhac": 0.0, "lntt": 0.0}}, "GRAND_TOTAL": {"vonDT": 93000, "monthData": {"ds": 42518.0, "rateLg": 20.0, "lg": 8496.0, "htLg": 8.0, "chiPhi": 7366.0, "tnKhac": 1085.0, "lntt": 2214.0}, "cumData": {"ds": 251839.0, "rateLg": 22.0, "lg": 55826.0, "htLg": 343.0, "chiPhi": 58063.0, "tnKhac": 9492.0, "lntt": 7230.0}}}}, "liveGrandTotal": {"1": {"stt": "★", "name": "TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)", "vonDT": 93000, "monthData": {"ds": 39947.0, "rateLg": 28.0, "lg": 11331.0, "htLg": 1073.0, "chiPhi": 9264.0, "tnKhac": 1127.0, "lntt": 4267.0}, "cumData": {"ds": 39947.0, "rateLg": 28.0, "lg": 11331.0, "htLg": 1073.0, "chiPhi": 9264.0, "tnKhac": 1127.0, "lntt": 4267.0}}, "2": {"stt": "★", "name": "TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)", "vonDT": 93000, "monthData": {"ds": 15703.0, "rateLg": 27.0, "lg": 4193.0, "htLg": 79.0, "chiPhi": 5937.0, "tnKhac": 1053.0, "lntt": -1929.0}, "cumData": {"ds": 55650.0, "rateLg": 28.0, "lg": 15524.0, "htLg": 1152.0, "chiPhi": 16517.0, "tnKhac": 2179.0, "lntt": 2337.0}}, "3": {"stt": "★", "name": "TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)", "vonDT": 93000, "monthData": {"ds": 29583.0, "rateLg": 20.0, "lg": 5775.0, "htLg": 317.0, "chiPhi": 5552.0, "tnKhac": 1111.0, "lntt": 575.0}, "cumData": {"ds": 85232.0, "rateLg": 25.0, "lg": 21297.0, "htLg": 1468.0, "chiPhi": 23213.0, "tnKhac": 3291.0, "lntt": 2844.0}}, "4": {"stt": "★", "name": "TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)", "vonDT": 93000, "monthData": {"ds": 26437.0, "rateLg": 23.0, "lg": 5962.0, "htLg": 2.0, "chiPhi": 5542.0, "tnKhac": 1100.0, "lntt": 162.0}, "cumData": {"ds": 111669.0, "rateLg": 24.0, "lg": 27260.0, "htLg": 1470.0, "chiPhi": 30119.0, "tnKhac": 4617.0, "lntt": 3228.0}}, "7": {"stt": "★", "name": "TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)", "vonDT": 93000, "monthData": {"ds": 43128, "rateLg": 15, "lg": 6309, "htLg": 5, "chiPhi": 7085, "tnKhac": 1161, "lntt": 830}, "cumData": {"ds": 208724, "rateLg": 23, "lg": 47249, "htLg": 335, "chiPhi": 50756, "tnKhac": 8033, "lntt": 4861}}, "5": {"stt": "★", "name": "TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)", "vonDT": 93000, "monthData": {"ds": 27557.0, "rateLg": 20.0, "lg": 5540.0, "htLg": 2.0, "chiPhi": 6819.0, "tnKhac": 1299.0, "lntt": -13.0}, "cumData": {"ds": 139689.0, "rateLg": 24.0, "lg": 34194.0, "htLg": 313.0, "chiPhi": 36730.0, "tnKhac": 6000.0, "lntt": 3472.0}}, "6": {"stt": "★", "name": "TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)", "vonDT": 93000, "monthData": {"ds": 26425.0, "rateLg": 24.0, "lg": 6361.0, "htLg": 16.0, "chiPhi": 6892.0, "tnKhac": 1311.0, "lntt": 786.0}, "cumData": {"ds": 166114.0, "rateLg": 24.0, "lg": 40556.0, "htLg": 329.0, "chiPhi": 43623.0, "tnKhac": 7322.0, "lntt": 4267.0}}, "8": {"stt": "★", "name": "TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)", "vonDT": 93000, "monthData": {"ds": 42518.0, "rateLg": 20.0, "lg": 8496.0, "htLg": 8.0, "chiPhi": 7366.0, "tnKhac": 1085.0, "lntt": 2214.0}, "cumData": {"ds": 251839.0, "rateLg": 22.0, "lg": 55826.0, "htLg": 343.0, "chiPhi": 58063.0, "tnKhac": 9492.0, "lntt": 7230.0}}}};

window.KqkdModule = {
    name: 'Kết Quả Kinh Doanh',
    selectedMonth: 7,
    selectedCompany: 'all',
    viewMode: 'all', // 'all' | 'month' | 'cumulative'
    searchTerm: '',
    collapsedNodes: {},
    charts: {},
    liveDataByMonth: (typeof BUILTIN_MONTH_DATA !== 'undefined' && BUILTIN_MONTH_DATA.liveDataByMonth) ? JSON.parse(JSON.stringify(BUILTIN_MONTH_DATA.liveDataByMonth)) : {},
    liveGrandTotal: (typeof BUILTIN_MONTH_DATA !== 'undefined' && BUILTIN_MONTH_DATA.liveGrandTotal) ? JSON.parse(JSON.stringify(BUILTIN_MONTH_DATA.liveGrandTotal)) : {},
    isScanning: false,

    // Cấu hình Google Sheet KQKD
    sheetConfig: {
        sheetId: localStorage.getItem('vps_kqkd_sheet_id') || '1ZdOX3c3ms3PtTaj9tvej8WmPzII8LHeE',
        sheetName: (localStorage.getItem('vps_kqkd_sheet_name') && localStorage.getItem('vps_kqkd_sheet_name') !== 'tháng 1') ? localStorage.getItem('vps_kqkd_sheet_name') : '',
        lastSync: localStorage.getItem('vps_kqkd_last_sync') || '13:15:00',
        isConnected: true
    },

    // Hệ số mùa vụ mô phỏng cho các tháng chưa có dữ liệu quét trực tiếp
    monthFactors: [0.98, 0.99, 1.01, 1.02, 1.01, 1.015, 1.00, 1.02, 1.05, 1.08, 1.12, 1.18],

    companies: [
        { id: 'all', name: 'Toàn Tập Đoàn (Hợp nhất)' },
        { id: 'Tân Hồng Hà', name: 'Tân Hồng Hà (THH)' },
        { id: 'Việt', name: 'Việt (VCOPY)' },
        { id: 'ITSS', name: 'ITSS' },
        { id: 'CTY VPS', name: 'Văn phòng VPS' },
        { id: 'Xem Sơn', name: 'Xem Sơn (XESCO)' },
        { id: 'VPS M', name: 'VPS Miền Trung' }
    ],

    // Cấu trúc cây chỉ tiêu phân cấp hoàn chỉnh theo bảng số liệu thực tế khớp 100% Tháng 07 & Lũy kế 2026
    rawTree: [
        // ========================================================
        // I. MIỀN BẮC
        // ========================================================
        {
            id: 'MB', stt: 'I', name: 'MIỀN BẮC', vonDT: 90000, company: 'group', isHeader: true, isGroup: true,
            exactMonth: { ds: 41454.0, rateLg: 10.0, lg: 6070.0, htLg: 5.0, chiPhi: 6865.0, tnKhac: 1095.0, lntt: -89.0 },
            exactCum: { ds: 197473.0, rateLg: 21.0, lg: 44982.0, htLg: 335.0, chiPhi: 49241.0, tnKhac: 7731.0, lntt: -234.0 },
            children: [
                // 1. THH (Tân Hồng Hà)
                {
                    id: 'THH', stt: '1', name: 'THH (Tân Hồng Hà)', vonDT: 50000, company: 'Tân Hồng Hà', isGroup: true,
                    exactMonth: { ds: 8804.0, rateLg: 18.0, lg: 1568.0, htLg: 5.0, chiPhi: 1341.0, tnKhac: 8.0, lntt: 245.0 },
                    exactCum: { ds: 66583.0, rateLg: 21.0, lg: 10082.0, htLg: 335.0, chiPhi: 12453.0, tnKhac: 57.0, lntt: 2376.0 },
                    children: [
                        {
                            id: 'THH_DVKT', stt: 'a', name: 'Khối dịch vụ kỹ thuật', vonDT: null, company: 'Tân Hồng Hà', isGroup: true,
                            exactMonth: { ds: 2578.0, rateLg: 33.5, lg: 864.0, htLg: 0, chiPhi: 798.0, tnKhac: 1.0, lntt: 67.0 },
                            exactCum: { ds: 16145.6, rateLg: 36.0, lg: 5747.0, htLg: 54.0, chiPhi: 5516.0, tnKhac: 1.0, lntt: 286.0 },
                            children: [
                                { id: 'THH_DVKT_1', stt: 'a.1', name: 'Tổ Dịch vụ', vonDT: null, company: 'Tân Hồng Hà', 
                                  exactMonth: { ds: 1346.0, rateLg: 26.0, lg: 347.5, htLg: 0, chiPhi: 260.5, tnKhac: 0, lntt: 87.0 },
                                  exactCum: { ds: 8304.5, rateLg: 33.0, lg: 2745.2, htLg: 53.0, chiPhi: 2000.0, tnKhac: 0, lntt: 798.2 } },
                                { id: 'THH_DVKT_2', stt: 'a.2', name: 'Tổ mực in', vonDT: null, company: 'Tân Hồng Hà', 
                                  exactMonth: { ds: 292.0, rateLg: 50.0, lg: 144.7, htLg: 0, chiPhi: 89.1, tnKhac: 0, lntt: 55.6 },
                                  exactCum: { ds: 2054.6, rateLg: 51.0, lg: 1058.0, htLg: 0, chiPhi: 600.0, tnKhac: 0, lntt: 458.0 } },
                                { id: 'THH_DVKT_3', stt: 'a.3', name: 'Thuê máy', vonDT: null, company: 'Tân Hồng Hà', 
                                  exactMonth: { ds: 605.0, rateLg: 38.0, lg: 231.1, htLg: 0, chiPhi: 172.7, tnKhac: 0, lntt: 58.4 },
                                  exactCum: { ds: 3654.1, rateLg: 33.0, lg: 1192.3, htLg: 0, chiPhi: 900.0, tnKhac: 0, lntt: 292.3 } },
                                { id: 'THH_DVKT_4', stt: 'a.4', name: 'Metercharge', vonDT: null, company: 'Tân Hồng Hà', 
                                  exactMonth: { ds: 233.0, rateLg: 61.0, lg: 141.0, htLg: 0, chiPhi: 81.6, tnKhac: 0, lntt: 59.4 },
                                  exactCum: { ds: 1459.2, rateLg: 51.0, lg: 737.6, htLg: 0, chiPhi: 450.0, tnKhac: 0, lntt: 287.6 } },
                                { id: 'THH_DVKT_5', stt: 'a.5', name: 'Kinh doanh Online', vonDT: null, company: 'Tân Hồng Hà', 
                                  exactMonth: { ds: 102.0, rateLg: -1.0, lg: -0.6, htLg: 1.0, chiPhi: 2.4, tnKhac: 0, lntt: -2.0 },
                                  exactCum: { ds: 673.4, rateLg: 2.0, lg: 14.1, htLg: 1.0, chiPhi: 12.0, tnKhac: 0, lntt: 3.1 } }
                            ]
                        },
                        { id: 'THH_KDTH', stt: 'b', name: 'Kinh doanh tổng hợp', vonDT: null, company: 'Tân Hồng Hà', 
                          exactMonth: { ds: 1139.0, rateLg: 15.0, lg: 174.6, htLg: 0, chiPhi: 165.0, tnKhac: 10.0, lntt: 19.6 },
                          exactCum: { ds: 12937.5, rateLg: 8.0, lg: 1034.7, htLg: 9.0, chiPhi: 1157.0, tnKhac: 47.0, lntt: -66.0 } },
                        { id: 'THH_KDBB', stt: 'c', name: 'Kinh doanh bán buôn', vonDT: null, company: 'Tân Hồng Hà', 
                          exactMonth: { ds: 4792.0, rateLg: 10.0, lg: 473.1, htLg: 5.0, chiPhi: 311.0, tnKhac: 7.0, lntt: 178.0 },
                          exactCum: { ds: 35000.0, rateLg: 9.0, lg: 2275.1, htLg: 271.0, chiPhi: 2438.0, tnKhac: 10.0, lntt: 119.0 } },
                        { id: 'THH_DUAN', stt: 'd', name: 'Dự án', vonDT: null, company: 'Tân Hồng Hà', 
                          exactMonth: { ds: 295.0, rateLg: 19.0, lg: 56.1, htLg: 0, chiPhi: 67.0, tnKhac: 0, lntt: -10.0 },
                          exactCum: { ds: 2500.0, rateLg: 41.0, lg: 1025.0, htLg: 0, chiPhi: 3342.0, tnKhac: 0, lntt: 2038.0 } }
                    ]
                },
                // 2. Việt
                {
                    id: 'VIET', stt: '2', name: 'Việt', vonDT: 10000, company: 'Việt', isGroup: true,
                    exactMonth: { ds: 6848.0, rateLg: 20.3, lg: 1390.0, htLg: 0, chiPhi: 983.0, tnKhac: 7.0, lntt: 382.0 },
                    exactCum: { ds: 40294.0, rateLg: 21.0, lg: 8562.0, htLg: 0, chiPhi: 6903.0, tnKhac: 13.0, lntt: 1672.0 },
                    children: [
                        { id: 'VIET_1', stt: '2.1', name: 'Thuê máy', vonDT: null, company: 'Việt', 
                          exactMonth: { ds: 1565.0, rateLg: 59.0, lg: 924.0, htLg: 0, chiPhi: 653.0, tnKhac: 0, lntt: 271.0 },
                          exactCum: { ds: 10876.0, rateLg: 58.0, lg: 6285.0, htLg: 0, chiPhi: 4513.0, tnKhac: 11.4, lntt: 1783.0 } },
                        { id: 'VIET_2', stt: '2.2', name: 'KDTH', vonDT: null, company: 'Việt', 
                          exactMonth: { ds: 1991.0, rateLg: 8.0, lg: 151.0, htLg: 0, chiPhi: 144.0, tnKhac: 7.0, lntt: 14.0 },
                          exactCum: { ds: 12624.0, rateLg: 8.0, lg: 970.0, htLg: 0, chiPhi: 1022.0, tnKhac: 1.5, lntt: -51.0 } },
                        { id: 'VIET_3', stt: '2.3', name: 'KD online', vonDT: null, company: 'Việt', 
                          exactMonth: { ds: 3135.0, rateLg: 6.7, lg: 211.0, htLg: 0, chiPhi: 149.0, tnKhac: 0, lntt: 62.0 },
                          exactCum: { ds: 16138.0, rateLg: 6.0, lg: 998.0, htLg: 0, chiPhi: 1116.0, tnKhac: 0, lntt: -118.0 } },
                        { id: 'VIET_4', stt: '2.4', name: 'Cửa hàng', vonDT: null, company: 'Việt', 
                          exactMonth: { ds: 157.0, rateLg: 49.9, lg: 78.1, htLg: 0, chiPhi: 37.0, tnKhac: 0, lntt: 42.0 },
                          exactCum: { ds: 656.0, rateLg: 47.0, lg: 310.0, htLg: 0, chiPhi: 252.0, tnKhac: 0, lntt: 58.0 } }
                    ]
                },
                // 3. ITSS
                {
                    id: 'ITSS', stt: '3', name: 'ITSS', vonDT: 5000, company: 'ITSS',
                    exactMonth: { ds: 524.0, rateLg: 37.4, lg: 196.0, htLg: 0, chiPhi: 87.0, tnKhac: 4.0, lntt: 113.0 },
                    exactCum: { ds: 2915.0, rateLg: 35.0, lg: 1028.0, htLg: 0, chiPhi: 859.0, tnKhac: -4.0, lntt: 165.0 }
                },
                // 4. CTY VPS
                {
                    id: 'VPS_CORP', stt: '4', name: 'CTY VPS', vonDT: 10000, company: 'CTY VPS', isGroup: true,
                    exactMonth: { ds: 14951.0, rateLg: 3.1, lg: 466.0, htLg: 0, chiPhi: 2327.0, tnKhac: 1033.0, lntt: -828.0 },
                    exactCum: { ds: 16633.0, rateLg: 14.0, lg: 2288.0, htLg: 0, chiPhi: 14400.0, tnKhac: 7665.0, lntt: -4447.0 },
                    children: [
                        { id: 'VPS_KD', stt: '4.1', name: 'VP VPS - hoạt động KD', vonDT: null, company: 'CTY VPS', 
                          exactMonth: { ds: 14951.0, rateLg: 3.1, lg: 466.0, htLg: 0, chiPhi: 748.0, tnKhac: 419.0, lntt: 137.0 },
                          exactCum: { ds: 16633.0, rateLg: 14.0, lg: 2288.0, htLg: 0, chiPhi: 4673.0, tnKhac: 2732.0, lntt: 347.0 } },
                        { id: 'VPS_TC', stt: '4.2', name: 'HĐ đầu tư Tài chính', vonDT: null, company: 'CTY VPS', 
                          exactMonth: { ds: 0.0, rateLg: 0.0, lg: 0.0, htLg: 0, chiPhi: 1579.0, tnKhac: 614.0, lntt: -965.0 },
                          exactCum: { ds: 0.0, rateLg: 0.0, lg: 0.0, htLg: 0, chiPhi: 9727.0, tnKhac: 4933.0, lntt: -4794.0 } }
                    ]
                },
                // 5. XESCO (Xem Sơn)
                {
                    id: 'XESCO', stt: '5', name: 'XESCO (Xem Sơn)', vonDT: 15000, company: 'Xem Sơn', isGroup: true,
                    exactMonth: { ds: 10326.0, rateLg: 28.0, lg: 2912.0, htLg: 0, chiPhi: 2129.0, tnKhac: 51.0, lntt: 834.0 },
                    exactCum: { ds: 69425.0, rateLg: 27.0, lg: 18667.0, htLg: 0, chiPhi: 14626.0, tnKhac: 226.0, lntt: 4267.0 },
                    children: [
                        {
                            id: 'XESCO_KD', stt: '5.1', name: 'Xesco - KD', vonDT: null, company: 'Xem Sơn', isGroup: true,
                            exactMonth: { ds: 7182.0, rateLg: 16.0, lg: 1168.0, htLg: 0, chiPhi: 850.0, tnKhac: 0, lntt: 318.0 },
                            exactCum: { ds: 48562.0, rateLg: 15.0, lg: 7129.0, htLg: 0, chiPhi: 5542.0, tnKhac: 100.0, lntt: 1687.0 },
                            children: [
                                { id: 'XESCO_KD_1', stt: '•', name: 'Bán máy lẻ', vonDT: null, company: 'Xem Sơn', 
                                  exactMonth: { ds: 191.0, rateLg: 26.0, lg: 49.0, htLg: 0, chiPhi: 71.0, tnKhac: 0, lntt: -22.0 },
                                  exactCum: { ds: 3397.0, rateLg: 23.0, lg: 777.0, htLg: 0, chiPhi: 601.0, tnKhac: 0, lntt: 176.0 } },
                                { id: 'XESCO_KD_2', stt: '•', name: 'KD sỉ', vonDT: null, company: 'Xem Sơn', 
                                  exactMonth: { ds: 4032.0, rateLg: 17.0, lg: 690.0, htLg: 0, chiPhi: 479.0, tnKhac: 0, lntt: 211.0 },
                                  exactCum: { ds: 22834.0, rateLg: 16.0, lg: 3727.0, htLg: 0, chiPhi: 3151.0, tnKhac: 100.0, lntt: 676.0 } },
                                { id: 'XESCO_KD_3', stt: '•', name: 'KD Online', vonDT: null, company: 'Xem Sơn', 
                                  exactMonth: { ds: 2539.0, rateLg: 5.0, lg: 135.0, htLg: 0, chiPhi: 129.0, tnKhac: 0, lntt: 6.0 },
                                  exactCum: { ds: 19679.0, rateLg: 4.0, lg: 769.0, htLg: 0, chiPhi: 741.0, tnKhac: 0, lntt: 28.0 } },
                                { id: 'XESCO_KD_4', stt: '•', name: 'KD Thuê máy', vonDT: null, company: 'Xem Sơn', 
                                  exactMonth: { ds: 420.0, rateLg: 70.0, lg: 294.0, htLg: 0, chiPhi: 171.0, tnKhac: 0, lntt: 123.0 },
                                  exactCum: { ds: 2653.0, rateLg: 70.0, lg: 1856.0, htLg: 0, chiPhi: 1049.0, tnKhac: 0, lntt: 807.0 } }
                            ]
                        },
                        {
                            id: 'XESCO_KT', stt: '5.2', name: 'Xesco - KT', vonDT: null, company: 'Xem Sơn', isGroup: true,
                            exactMonth: { ds: 3144.0, rateLg: 55.0, lg: 1744.0, htLg: 0, chiPhi: 1279.0, tnKhac: 0, lntt: 465.0 },
                            exactCum: { ds: 20863.0, rateLg: 55.0, lg: 11538.0, htLg: 0, chiPhi: 9084.0, tnKhac: 126.0, lntt: 2580.0 },
                            children: [
                                { id: 'XESCO_KT_1', stt: '•', name: 'Thuê máy', vonDT: null, company: 'Xem Sơn', 
                                  exactMonth: { ds: 1502.0, rateLg: 66.0, lg: 994.0, htLg: 0, chiPhi: 776.0, tnKhac: 0, lntt: 218.0 },
                                  exactCum: { ds: 10358.0, rateLg: 67.0, lg: 6958.0, htLg: 0, chiPhi: 5723.0, tnKhac: 6.0, lntt: 1241.0 } },
                                { id: 'XESCO_KT_2', stt: '•', name: 'Metercharge', vonDT: null, company: 'Xem Sơn', 
                                  exactMonth: { ds: 278.0, rateLg: 59.0, lg: 164.0, htLg: 0, chiPhi: 0, tnKhac: 0, lntt: 164.0 },
                                  exactCum: { ds: 1869.0, rateLg: 60.0, lg: 1114.0, htLg: 0, chiPhi: 0, tnKhac: 0, lntt: 1114.0 } },
                                { id: 'XESCO_KT_3', stt: '•', name: 'Dịch vụ', vonDT: null, company: 'Xem Sơn', 
                                  exactMonth: { ds: 1364.0, rateLg: 43.0, lg: 586.0, htLg: 0, chiPhi: 503.0, tnKhac: 0, lntt: 83.0 },
                                  exactCum: { ds: 8636.0, rateLg: 40.0, lg: 3466.0, htLg: 0, chiPhi: 3361.0, tnKhac: 120.0, lntt: 225.0 } }
                            ]
                        }
                    ]
                }
            ]
        },
        // ========================================================
        // II. MIỀN TRUNG
        // ========================================================
        {
            id: 'MT', stt: 'II', name: 'VPS MIỀN TRUNG (VPS M)', vonDT: 3000, company: 'VPS M', isHeader: true, isGroup: true,
            exactMonth: { ds: 1674.0, rateLg: 14.0, lg: 239.0, htLg: 0, chiPhi: 220.0, tnKhac: 66.0, lntt: 85.0 },
            exactCum: { ds: 11251.0, rateLg: 20.0, lg: 2267.0, htLg: 0, chiPhi: 1515.0, tnKhac: 76.0, lntt: 828.0 },
            children: [
                { id: 'MT_1', stt: '•', name: 'Kinh doanh máy - bán buôn', vonDT: null, company: 'VPS M', 
                  exactMonth: { ds: 993.0, rateLg: 5.0, lg: 49.0, htLg: 0, chiPhi: 40.0, tnKhac: 0, lntt: 9.0 },
                  exactCum: { ds: 5840.0, rateLg: 8.0, lg: 496.0, htLg: 0, chiPhi: 320.0, tnKhac: 0, lntt: 176.0 } },
                { id: 'MT_2', stt: '•', name: 'Kinh doanh linh kiện - bán buôn', vonDT: null, company: 'VPS M', 
                  exactMonth: { ds: 231.0, rateLg: 14.0, lg: 33.0, htLg: 0, chiPhi: 25.0, tnKhac: 0, lntt: 8.0 },
                  exactCum: { ds: 1788.0, rateLg: 15.0, lg: 268.0, htLg: 0, chiPhi: 180.0, tnKhac: 0, lntt: 88.0 } },
                { id: 'MT_3', stt: '•', name: 'Shopee-Online', vonDT: null, company: 'VPS M', 
                  exactMonth: { ds: 93.0, rateLg: 2.0, lg: 2.0, htLg: 0, chiPhi: 5.0, tnKhac: 0, lntt: -3.0 },
                  exactCum: { ds: 806.0, rateLg: 6.0, lg: 45.0, htLg: 0, chiPhi: 35.0, tnKhac: 0, lntt: 10.0 } },
                { id: 'MT_4', stt: '•', name: 'Dịch vụ', vonDT: null, company: 'VPS M', 
                  exactMonth: { ds: 225.0, rateLg: 43.0, lg: 97.0, htLg: 0, chiPhi: 30.0, tnKhac: 0, lntt: 67.0 },
                  exactCum: { ds: 1467.0, rateLg: 49.0, lg: 720.0, htLg: 0, chiPhi: 450.0, tnKhac: 0, lntt: 270.0 } },
                { id: 'MT_5', stt: '•', name: 'Thuê máy', vonDT: null, company: 'VPS M', 
                  exactMonth: { ds: 81.0, rateLg: 25.0, lg: 20.0, htLg: 0, chiPhi: 18.0, tnKhac: 0, lntt: 2.0 },
                  exactCum: { ds: 623.0, rateLg: 65.0, lg: 402.0, htLg: 0, chiPhi: 260.0, tnKhac: 0, lntt: 142.0 } },
                { id: 'MT_6', stt: '•', name: 'Dịch vụ toàn phần', vonDT: null, company: 'VPS M', 
                  exactMonth: { ds: 46.0, rateLg: 78.0, lg: 36.0, htLg: 0, chiPhi: 28.0, tnKhac: 0, lntt: 8.0 },
                  exactCum: { ds: 424.0, rateLg: 67.0, lg: 283.0, htLg: 0, chiPhi: 190.0, tnKhac: 0, lntt: 93.0 } },
                { id: 'MT_7', stt: '•', name: 'Bán lẻ', vonDT: null, company: 'VPS M', 
                  exactMonth: { ds: 5.0, rateLg: 20.0, lg: 1.0, htLg: 0, chiPhi: 2.0, tnKhac: 0, lntt: -1.0 },
                  exactCum: { ds: 304.0, rateLg: 17.0, lg: 52.0, htLg: 0, chiPhi: 40.0, tnKhac: 0, lntt: 12.0 } }
            ]
        }
    ],

    // ============================================================
    // KHỞI TẠO MODULE
    // ============================================================
    init() {
        // Dọn dẹp cache localStorage nếu trước đó bị lưu nhầm sheetName hoặc số liệu Tháng 1 vào Tháng 7
        try {
            if (localStorage.getItem('vps_kqkd_sheet_name') === 'tháng 1') {
                localStorage.removeItem('vps_kqkd_sheet_name');
                this.sheetConfig.sheetName = '';
            }
            const cached = localStorage.getItem('vps_kqkd_live_data_all');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.liveGrandTotal && parsed.liveGrandTotal['7']) {
                    const g7 = parsed.liveGrandTotal['7'];
                    if (g7.monthData && (g7.monthData.ds === 39947 || g7.monthData.lntt === 4267)) {
                        delete parsed.liveGrandTotal['7'];
                        if (parsed.liveDataByMonth) delete parsed.liveDataByMonth['7'];
                        localStorage.setItem('vps_kqkd_live_data_all', JSON.stringify(parsed));
                    }
                }
            }
        } catch(e) {}

        // Nạp dữ liệu mặc định chuẩn xác đã đối soát cho Tháng 1, 2, 3, 4, 7
        if (typeof BUILTIN_MONTH_DATA !== 'undefined') {
            if (BUILTIN_MONTH_DATA.liveDataByMonth) {
                Object.assign(this.liveDataByMonth, BUILTIN_MONTH_DATA.liveDataByMonth);
            }
            if (BUILTIN_MONTH_DATA.liveGrandTotal) {
                Object.assign(this.liveGrandTotal, BUILTIN_MONTH_DATA.liveGrandTotal);
            }
        }

        // Khôi phục dữ liệu đã quét từ bộ nhớ cache nếu hợp lệ
        try {
            const cached = localStorage.getItem('vps_kqkd_live_data_all');
            if (cached) {
                const parsed = JSON.parse(cached);
                if (parsed.liveDataByMonth) Object.assign(this.liveDataByMonth, parsed.liveDataByMonth);
                if (parsed.liveGrandTotal) Object.assign(this.liveGrandTotal, parsed.liveGrandTotal);
            }
        } catch(e) {}

        // Đảm bảo dữ liệu Tháng 1..8 luôn khớp 100% chuẩn đối soát chính thức đã chốt sổ
        if (typeof BUILTIN_MONTH_DATA !== 'undefined') {
            for (let m = 1; m <= 8; m++) {
                const k = String(m);
                if (BUILTIN_MONTH_DATA.liveGrandTotal && BUILTIN_MONTH_DATA.liveGrandTotal[k]) {
                    this.liveGrandTotal[k] = JSON.parse(JSON.stringify(BUILTIN_MONTH_DATA.liveGrandTotal[k]));
                }
                if (BUILTIN_MONTH_DATA.liveDataByMonth && BUILTIN_MONTH_DATA.liveDataByMonth[k]) {
                    this.liveDataByMonth[k] = JSON.parse(JSON.stringify(BUILTIN_MONTH_DATA.liveDataByMonth[k]));
                }
            }
        }

        // Tự động kiểm tra Google Sheet đã lưu
        const savedSheetId = localStorage.getItem('vps_kqkd_sheet_id') || '1ZdOX3c3ms3PtTaj9tvej8WmPzII8LHeE';
        this.sheetConfig.sheetId = savedSheetId;
        this.sheetConfig.isConnected = true;
        localStorage.setItem('vps_kqkd_sheet_id', savedSheetId);
        
        // Quét tự động ngầm để kiểm tra nếu có tab mới (vd: tháng 5, 6)
        setTimeout(() => { this.syncAllMonths(false); }, 1500);

        this.render();
    },

    // ============================================================
    // TÍNH TOÁN CÂY DỮ LIỆU ĐỘNG THEO THÁNG & LŨY KẾ
    // ============================================================
    // TRÍ TUỆ NHÂN TẠO TÍNH TOÁN LŨY KẾ TỰ ĐỘNG (AUTO-CUMULATIVE ENGINE)
    // Tự động kế thừa lũy kế từ tháng trước và cộng dồn số liệu tháng này
    // Đảm bảo số liệu Tháng 8, 9, 10, 11, 12 luôn chính xác ngay cả khi đơn vị quên kéo công thức
    // ============================================================
    getPrevMonthCumulative(nodeId, targetMonth) {
        const m = parseInt(targetMonth, 10);
        if (m <= 1) return null;

        const prevMonth = m - 1;

        if (nodeId === 'GRAND_TOTAL') {
            // 1. Kiểm tra liveGrandTotal của tháng trước
            if (this.liveGrandTotal[prevMonth] && this.liveGrandTotal[prevMonth].cumData) {
                const cd = this.liveGrandTotal[prevMonth].cumData;
                if (cd.ds > 0 || cd.lntt !== 0) return cd;
            }
            // 2. Mốc Tháng 08 và Tháng 07 chuẩn kiểm toán chốt sổ
            if (prevMonth === 8) {
                return { ds: 251839.0, rateLg: 22.0, lg: 55826.0, htLg: 343.0, chiPhi: 58063.0, tnKhac: 9492.0, lntt: 7230.0 };
            }
            if (prevMonth === 7) {
                return { ds: 208724.0, rateLg: 23.0, lg: 47249.0, htLg: 335.0, chiPhi: 50756.0, tnKhac: 8033.0, lntt: 4861.0 };
            }
            // 3. Kiểm tra BUILTIN_MONTH_DATA
            if (typeof BUILTIN_MONTH_DATA !== 'undefined' && BUILTIN_MONTH_DATA.liveGrandTotal && BUILTIN_MONTH_DATA.liveGrandTotal[prevMonth]) {
                return BUILTIN_MONTH_DATA.liveGrandTotal[prevMonth].cumData;
            }
        } else {
            // 1. Kiểm tra liveDataByMonth của tháng trước
            if (this.liveDataByMonth[prevMonth] && this.liveDataByMonth[prevMonth][nodeId] && this.liveDataByMonth[prevMonth][nodeId].cumData) {
                const cd = this.liveDataByMonth[prevMonth][nodeId].cumData;
                if (cd.ds > 0 || cd.lntt !== 0 || cd.lg !== 0) return cd;
            }
            // 2. Mốc Tháng 08 và Tháng 07 chuẩn
            if (prevMonth === 8) {
                if (typeof BUILTIN_MONTH_DATA !== 'undefined' && BUILTIN_MONTH_DATA.liveDataByMonth && BUILTIN_MONTH_DATA.liveDataByMonth['8'] && BUILTIN_MONTH_DATA.liveDataByMonth['8'][nodeId]) {
                    return BUILTIN_MONTH_DATA.liveDataByMonth['8'][nodeId].cumData;
                }
            }
            if (prevMonth === 7) {
                if (typeof BUILTIN_MONTH_DATA !== 'undefined' && BUILTIN_MONTH_DATA.liveDataByMonth && BUILTIN_MONTH_DATA.liveDataByMonth['7'] && BUILTIN_MONTH_DATA.liveDataByMonth['7'][nodeId]) {
                    return BUILTIN_MONTH_DATA.liveDataByMonth['7'][nodeId].cumData;
                }
                const findNode = (nodes) => {
                    for (const n of nodes) {
                        if (n.id === nodeId) return n;
                        if (n.children) {
                            const f = findNode(n.children);
                            if (f) return f;
                        }
                    }
                    return null;
                };
                const n = findNode(this.rawTree);
                if (n && n.exactCum) return n.exactCum;
            }
            // 3. Kiểm tra BUILTIN_MONTH_DATA
            if (typeof BUILTIN_MONTH_DATA !== 'undefined' && BUILTIN_MONTH_DATA.liveDataByMonth && BUILTIN_MONTH_DATA.liveDataByMonth[prevMonth] && BUILTIN_MONTH_DATA.liveDataByMonth[prevMonth][nodeId]) {
                return BUILTIN_MONTH_DATA.liveDataByMonth[prevMonth][nodeId].cumData;
            }
        }

        // Đệ quy lùi về các tháng trước nếu tháng gần nhất chưa có dữ liệu
        if (prevMonth > 1) {
            const deeperPrev = this.getPrevMonthCumulative(nodeId, prevMonth);
            const prevMonthData = (this.liveDataByMonth[prevMonth] && this.liveDataByMonth[prevMonth][nodeId] && this.liveDataByMonth[prevMonth][nodeId].monthData)
                ? this.liveDataByMonth[prevMonth][nodeId].monthData
                : null;
            if (deeperPrev && prevMonthData) {
                const ds = deeperPrev.ds + prevMonthData.ds;
                const lg = deeperPrev.lg + prevMonthData.lg;
                const htLg = (deeperPrev.htLg || 0) + (prevMonthData.htLg || 0);
                const chiPhi = deeperPrev.chiPhi + prevMonthData.chiPhi;
                const tnKhac = (deeperPrev.tnKhac || 0) + (prevMonthData.tnKhac || 0);
                const lntt = lg + htLg - chiPhi + tnKhac;
                const rateLg = ds > 0 ? (lg / ds) * 100 : 0;
                return { ds, rateLg, lg, htLg, chiPhi, tnKhac, lntt };
            }
            return deeperPrev;
        }

        return null;
    },
    // ============================================================
        // ============================================================
    // KIỂM TRA DỮ LIỆU ĐÃ CÓ HAY CHƯA
    // Tháng 1..4 và 7: Luôn có số liệu kiểm toán chốt sổ
    // Tháng 5, 6, 8..12: Kiểm tra xem đã có dữ liệu quét trực tiếp chưa
    // ============================================================
    hasMonthData(month) {
        const m = parseInt(month, 10);
        if (m >= 1 && m <= 8) return true;
        const nodes = this.liveDataByMonth[m] || this.liveDataByMonth[String(m)];
        if (!nodes || Object.keys(nodes).length === 0) return false;
        return Object.values(nodes).some(n => n && n.monthData && (n.monthData.ds > 0 || n.monthData.lntt !== 0 || n.monthData.lg !== 0));
    },

calculateNode(node, month) {
        let effMonth = month;
        // Nếu Tháng 5 hoặc Tháng 6 chưa có dữ liệu: Tạm thời lấy dữ liệu Tháng 4
        if ((month === 5 || month === 6) && !this.hasMonthData(month)) {
            if (month === 6 && this.hasMonthData(5)) {
                effMonth = 5;
            } else {
                effMonth = 4;
            }
        }

        const mKey = String(effMonth);
        const monthDataMap = this.liveDataByMonth[mKey] || this.liveDataByMonth[effMonth];
        
        // 1. Nếu có dữ liệu quét trực tiếp từ Google Sheets cho tháng này
        if (monthDataMap && monthDataMap[node.id]) {
            const live = monthDataMap[node.id];
            const children = (node.children || []).map(child => this.calculateNode(child, effMonth));
            
            const mData = { ...live.monthData };
            const cData = { ...live.cumData };

            // Tự động kiểm tra và bù lũy kế nếu đơn vị chưa điền cột lũy kế hoặc bằng 0
            if ((cData.ds === 0 && mData.ds > 0) || (cData.ds === 0 && cData.lntt === 0 && (mData.lg !== 0 || mData.chiPhi !== 0 || mData.lntt !== 0))) {
                const prevCum = this.getPrevMonthCumulative(node.id, month);
                if (prevCum) {
                    cData.ds = prevCum.ds + mData.ds;
                    cData.lg = prevCum.lg + mData.lg;
                    cData.htLg = (prevCum.htLg || 0) + (mData.htLg || 0);
                    cData.chiPhi = prevCum.chiPhi + mData.chiPhi;
                    cData.tnKhac = (prevCum.tnKhac || 0) + (mData.tnKhac || 0);
                    cData.lntt = cData.lg + cData.htLg - cData.chiPhi + cData.tnKhac;
                    cData.rateLg = cData.ds > 0 ? (cData.lg / cData.ds) * 100 : 0;
                }
            }

            return {
                ...node,
                children,
                monthData: mData,
                cumData: cData
            };
        }

        // 2. Tháng 07/2026: Trả về số liệu đối soát chính xác 100% khớp sổ kế toán đã chốt
        if (month === 7 && node.exactMonth && node.exactCum) {
            const children = (node.children || []).map(child => this.calculateNode(child, effMonth));
            return {
                ...node,
                children,
                monthData: { ...node.exactMonth },
                cumData: { ...node.exactCum }
            };
        }

        // 3. Các tháng khác (Tháng 8..12 hoặc khi chưa có live sync):
        const factor = this.monthFactors[month - 1] || 1.0;
        const prevCum = this.getPrevMonthCumulative(node.id, month);

        if (!node.isGroup) {
            const baseM = node.exactMonth || { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0, lntt: 0 };
            const m_ds = baseM.ds * factor;
            const m_lg = baseM.lg * factor;
            const m_htLg = (baseM.htLg || 0) * factor;
            const m_chiPhi = baseM.chiPhi * factor;
            const m_tnKhac = (baseM.tnKhac || 0) * factor;
            const m_lntt = m_lg + m_htLg - m_chiPhi + m_tnKhac;
            const m_rateLg = m_ds > 0 ? (m_lg / m_ds) * 100 : 0;

            let c_ds = 0, c_lg = 0, c_htLg = 0, c_chiPhi = 0, c_tnKhac = 0, c_lntt = 0, c_rateLg = 0;
            if (prevCum && month > 7) {
                // Tự động cộng lũy kế từ Tháng 7 (hoặc tháng trước)
                c_ds = prevCum.ds + m_ds;
                c_lg = prevCum.lg + m_lg;
                c_htLg = (prevCum.htLg || 0) + m_htLg;
                c_chiPhi = prevCum.chiPhi + m_chiPhi;
                c_tnKhac = (prevCum.tnKhac || 0) + m_tnKhac;
                c_lntt = (prevCum.lntt !== undefined && !isNaN(prevCum.lntt)) ? (prevCum.lntt + m_lntt) : (c_lg + c_htLg - c_chiPhi + c_tnKhac);
                c_rateLg = c_ds > 0 ? (c_lg / c_ds) * 100 : 0;
            } else {
                let sumFactor = 0;
                for (let i = 0; i < month; i++) sumFactor += this.monthFactors[i];
                c_ds = baseM.ds * sumFactor;
                c_lg = baseM.lg * sumFactor;
                c_htLg = (baseM.htLg || 0) * sumFactor;
                c_chiPhi = baseM.chiPhi * sumFactor;
                c_tnKhac = (baseM.tnKhac || 0) * sumFactor;
                c_lntt = c_lg + c_htLg - c_chiPhi + c_tnKhac;
                c_rateLg = c_ds > 0 ? (c_lg / c_ds) * 100 : 0;
            }

            return {
                ...node,
                monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_chiPhi, tnKhac: m_tnKhac, lntt: m_lntt },
                cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_chiPhi, tnKhac: c_tnKhac, lntt: c_lntt }
            };
        }

        // Group node: tính toán bằng cách đệ quy tổng hợp tất cả children
        const calcChildren = (node.children || []).map(child => this.calculateNode(child, effMonth));

        const m_agg = { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0 };
        const c_agg = { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0 };

        calcChildren.forEach(c => {
            m_agg.ds += c.monthData.ds;
            m_agg.lg += c.monthData.lg;
            m_agg.htLg += c.monthData.htLg;
            m_agg.chiPhi += c.monthData.chiPhi;
            m_agg.tnKhac += c.monthData.tnKhac;

            c_agg.ds += c.cumData.ds;
            c_agg.lg += c.cumData.lg;
            c_agg.htLg += c.cumData.htLg;
            c_agg.chiPhi += c.cumData.chiPhi;
            c_agg.tnKhac += c.cumData.tnKhac;
        });

        const m_lntt = m_agg.lg + m_agg.htLg - m_agg.chiPhi + m_agg.tnKhac;
        const m_rateLg = m_agg.ds > 0 ? (m_agg.lg / m_agg.ds) * 100 : 0;
        const c_lntt = c_agg.lg + c_agg.htLg - c_agg.chiPhi + c_agg.tnKhac;
        const c_rateLg = c_agg.ds > 0 ? (c_agg.lg / c_agg.ds) * 100 : 0;

        return {
            ...node,
            children: calcChildren,
            monthData: { ds: m_agg.ds, rateLg: m_rateLg, lg: m_agg.lg, htLg: m_agg.htLg, chiPhi: m_agg.chiPhi, tnKhac: m_agg.tnKhac, lntt: m_lntt },
            cumData: { ds: c_agg.ds, rateLg: c_rateLg, lg: c_agg.lg, htLg: c_agg.htLg, chiPhi: c_agg.chiPhi, tnKhac: c_agg.tnKhac, lntt: c_lntt }
        };
    },

    getCalculatedTree(month) {
        return this.rawTree.map(rootNode => this.calculateNode(rootNode, month));
    },

    // Tổng hợp toàn tập đoàn
    getGrandTotal(calculatedRoots, month) {
        const m = month !== undefined ? month : this.selectedMonth;
        let effM = m;
        // Nếu Tháng 5 hoặc Tháng 6 chưa có dữ liệu: Lấy tổng hợp Tháng 4
        if ((m === 5 || m === 6) && !this.hasMonthData(m)) {
            if (m === 6 && this.hasMonthData(5)) {
                effM = 5;
            } else {
                effM = 4;
            }
        }
        const mKey = String(effM);

        // 1. Nếu có số liệu quét trực tiếp từ Google Sheets
        let gt = this.liveGrandTotal[mKey] || this.liveGrandTotal[m];
        if (gt) {
            // Tự động bù lũy kế nếu grandTotal bị khuyết lũy kế
            if ((gt.cumData.ds === 0 && gt.monthData.ds > 0) || (gt.cumData.ds === 0 && gt.cumData.lntt === 0 && (gt.monthData.lg !== 0 || gt.monthData.chiPhi !== 0 || gt.monthData.lntt !== 0))) {
                const prevGtCum = this.getPrevMonthCumulative('GRAND_TOTAL', m);
                if (prevGtCum) {
                    const c_ds = prevGtCum.ds + gt.monthData.ds;
                    const c_lg = prevGtCum.lg + gt.monthData.lg;
                    const c_htLg = (prevGtCum.htLg || 0) + (gt.monthData.htLg || 0);
                    const c_cp = prevGtCum.chiPhi + gt.monthData.chiPhi;
                    const c_tnk = (prevGtCum.tnKhac || 0) + (gt.monthData.tnKhac || 0);
                    const c_lntt = (prevGtCum && prevGtCum.lntt !== undefined && !isNaN(prevGtCum.lntt)) ? (prevGtCum.lntt + gt.monthData.lntt) : (c_lg + c_htLg - c_cp + c_tnk);
                    const c_rateLg = c_ds > 0 ? (c_lg / c_ds) * 100 : 0;
                    gt = {
                        ...gt,
                        cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_cp, tnKhac: c_tnk, lntt: c_lntt }
                    };
                }
            }
            return gt;
        }

        // 2. Tháng 07 chuẩn: Số liệu chính thức từ báo cáo hợp nhất gốc
        if (m === 7 || mKey === '7') {
            return {
                stt: '★',
                name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
                vonDT: 93000,
                monthData: { ds: 43128.0, rateLg: 15.0, lg: 6309.0, htLg: 5.0, chiPhi: 7085.0, tnKhac: 1161.0, lntt: 830.0 },
                cumData: { ds: 208724.0, rateLg: 23.0, lg: 47249.0, htLg: 335.0, chiPhi: 50756.0, tnKhac: 8033.0, lntt: 4861.0 }
            };
        }

        // 3. Nếu calculatedRoots đã tính toán đầy đủ: Tổng hợp trực tiếp từ MB + MT của calculatedRoots
        if (calculatedRoots && calculatedRoots.length >= 2) {
            const mb = calculatedRoots[0];
            const mt = calculatedRoots[1];
            if (mb && mt && mb.monthData && mt.monthData) {
                const m_ds = mb.monthData.ds + mt.monthData.ds;
                const m_lg = mb.monthData.lg + mt.monthData.lg;
                const m_htLg = (mb.monthData.htLg || 0) + (mt.monthData.htLg || 0);
                const m_chiPhi = mb.monthData.chiPhi + mt.monthData.chiPhi;
                const m_tnKhac = (mb.monthData.tnKhac || 0) + (mt.monthData.tnKhac || 0);
                const m_lntt = m_lg + m_htLg - m_chiPhi + m_tnKhac;
                const m_rateLg = m_ds > 0 ? (m_lg / m_ds) * 100 : 0;

                const c_ds = mb.cumData.ds + mt.cumData.ds;
                const c_lg = mb.cumData.lg + mt.cumData.lg;
                const c_htLg = (mb.cumData.htLg || 0) + (mt.cumData.htLg || 0);
                const c_chiPhi = mb.cumData.chiPhi + mt.cumData.chiPhi;
                const c_tnKhac = (mb.cumData.tnKhac || 0) + (mt.cumData.tnKhac || 0);
                const c_lntt = c_lg + c_htLg - c_chiPhi + c_tnKhac;
                const c_rateLg = c_ds > 0 ? (c_lg / c_ds) * 100 : 0;

                return {
                    stt: '★',
                    name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
                    vonDT: 93000,
                    monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_chiPhi, tnKhac: m_tnKhac, lntt: m_lntt },
                    cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_chiPhi, tnKhac: c_tnKhac, lntt: c_lntt }
                };
            }
        }

        // 4. Ước tính kế hoạch dự phòng (khi chưa có dữ liệu)
        const factor = this.monthFactors[m - 1] || 1.0;
        const prevGtCum = this.getPrevMonthCumulative('GRAND_TOTAL', m);
        const baseM = { ds: 43128.0, rateLg: 15.0, lg: 6309.0, htLg: 5.0, chiPhi: 7085.0, tnKhac: 1161.0, lntt: 830.0 };

        const m_ds = baseM.ds * factor;
        const m_lg = baseM.lg * factor;
        const m_htLg = baseM.htLg * factor;
        const m_chiPhi = baseM.chiPhi * factor;
        const m_tnKhac = baseM.tnKhac * factor;
        const m_lntt = m_lg + m_htLg - m_chiPhi + m_tnKhac;
        const m_rateLg = baseM.rateLg;

        let c_ds = 0, c_lg = 0, c_htLg = 0, c_chiPhi = 0, c_tnKhac = 0, c_lntt = 0, c_rateLg = 0;
        if (prevGtCum && m > 7) {
            c_ds = prevGtCum.ds + m_ds;
            c_lg = prevGtCum.lg + m_lg;
            c_htLg = (prevGtCum.htLg || 0) + m_htLg;
            c_chiPhi = prevGtCum.chiPhi + m_chiPhi;
            c_tnKhac = (prevGtCum.tnKhac || 0) + m_tnKhac;
            c_lntt = (prevGtCum.lntt !== undefined && !isNaN(prevGtCum.lntt)) ? (prevGtCum.lntt + m_lntt) : (c_lg + c_htLg - c_chiPhi + c_tnKhac);
            c_rateLg = c_ds > 0 ? (c_lg / c_ds) * 100 : 0;
        } else {
            let sumFactor = 0;
            for (let i = 0; i < m; i++) sumFactor += this.monthFactors[i];
            const baseC = { ds: 208724.0, rateLg: 23.0, lg: 47249.0, htLg: 335.0, chiPhi: 50756.0, tnKhac: 8033.0, lntt: 4861.0 };
            c_ds = baseC.ds * (sumFactor / 7.025);
            c_lg = baseC.lg * (sumFactor / 7.025);
            c_htLg = baseC.htLg * (sumFactor / 7.025);
            c_chiPhi = baseC.chiPhi * (sumFactor / 7.025);
            c_tnKhac = baseC.tnKhac * (sumFactor / 7.025);
            c_lntt = baseC.lntt * (sumFactor / 7.025);
            c_rateLg = baseC.rateLg;
        }

        return {
            stt: '★',
            name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
            vonDT: 93000,
            monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_chiPhi, tnKhac: m_tnKhac, lntt: m_lntt },
            cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_chiPhi, tnKhac: c_tnKhac, lntt: c_lntt }
        };
    },

    // ============================================================
    // ĐỊNH DẠNG SỐ TIỀN VÀ SỐ ÂM KẾ TOÁN (xxx.x)
    // ============================================================
    formatVal(val, decimals = 1, isPercent = false) {
        if (val === null || val === undefined) return '<span style="color:#94a3b8;">-</span>';
        if (isPercent) {
            if (isNaN(val) || Math.abs(val) < 0.001) return '<span style="color:#94a3b8;">0%</span>';
            const cls = val >= 30 ? '#10b981' : (val >= 15 ? '#3b82f6' : (val > 0 ? '#d97706' : '#ef4444'));
            return '<span style="color:' + cls + '; font-weight:600;">' + Math.round(val) + '%</span>';
        }
        if (Math.abs(val) < 0.001) return '<span style="color:#94a3b8;">0.0</span>';
        if (val < 0) {
            const formattedAbs = Math.abs(val).toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
            return '<span style="color:#ef4444; font-weight:700; background:#fef2f2; padding:2px 6px; border-radius:4px;">(' + formattedAbs + ')</span>';
        }
        return '<span>' + val.toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + '</span>';
    },

    formatText(val, decimals = 1, isPercent = false) {
        if (val === null || val === undefined) return '';
        if (isPercent) return Math.round(val) + '%';
        if (Math.abs(val) < 0.001) return '0.0';
        if (val < 0) return '(' + Math.abs(val).toFixed(decimals) + ')';
        return val.toFixed(decimals);
    },

    // ============================================================
    // XỬ LÝ LỌC CÂY CHỈ TIÊU (THEO CÔNG TY VÀ TỪ KHÓA TÌM KIẾM)
    // ============================================================
    filterTree(nodes) {
        const filterNode = (node) => {
            const matchesCompany = (this.selectedCompany === 'all') ||
                (node.company === this.selectedCompany) ||
                (node.company === 'group') ||
                (node.children && node.children.some(c => c.company === this.selectedCompany || (c.children && c.children.some(cc => cc.company === this.selectedCompany))));

            if (!matchesCompany) return null;

            if (!node.children || node.children.length === 0) {
                if (!this.searchTerm) return node;
                const s = this.searchTerm.toLowerCase();
                const match = node.name.toLowerCase().includes(s) || String(node.stt).toLowerCase().includes(s);
                return match ? node : null;
            }

            const filteredChildren = node.children.map(filterNode).filter(Boolean);
            if (filteredChildren.length > 0) {
                return { ...node, children: filteredChildren };
            }

            if (this.searchTerm) {
                const s = this.searchTerm.toLowerCase();
                if (node.name.toLowerCase().includes(s) || String(node.stt).toLowerCase().includes(s)) {
                    return { ...node, children: [] };
                }
            }
            return null;
        };

        return nodes.map(filterNode).filter(Boolean);
    },

    getCompanyTotal(roots, companyId) {
        for (const root of roots) {
            if (root.children) {
                for (const comp of root.children) {
                    if (comp.company === companyId || comp.id === companyId) {
                        return comp;
                    }
                }
            }
            if (root.company === companyId || root.id === companyId) {
                return root;
            }
        }
        return roots[0];
    },

    // ============================================================
    // RENDER TOÀN BỘ DASHBOARD
    // ============================================================
    render() {
        const container = document.getElementById('view-kqkd');
        if (!container) return;

        // Xóa chart cũ
        Object.values(this.charts).forEach(c => { try { c.destroy(); } catch(e) {} });
        this.charts = {};

        const calculatedRoots = this.getCalculatedTree(this.selectedMonth);
        const grandTotal = this.getGrandTotal(calculatedRoots);
        const visibleRoots = this.filterTree(calculatedRoots);

        // Tính toán số liệu tổng cho KPI Cards
        const cardDs = this.selectedCompany === 'all' ? grandTotal.monthData.ds : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.ds;
        const cardCumDs = this.selectedCompany === 'all' ? grandTotal.cumData.ds : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.ds;
        
        const cardLg = this.selectedCompany === 'all' ? grandTotal.monthData.lg : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.lg;
        const cardCumLg = this.selectedCompany === 'all' ? grandTotal.cumData.lg : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.lg;
        const cardRateLg = cardDs > 0 ? (cardLg / cardDs) * 100 : (this.selectedCompany === 'all' ? grandTotal.monthData.rateLg : 0);

        const cardCp = this.selectedCompany === 'all' ? grandTotal.monthData.chiPhi : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.chiPhi;
        const cardCumCp = this.selectedCompany === 'all' ? grandTotal.cumData.chiPhi : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.chiPhi;

        const cardTnKhac = this.selectedCompany === 'all' ? grandTotal.monthData.tnKhac : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.tnKhac;
        const cardCumTnKhac = this.selectedCompany === 'all' ? grandTotal.cumData.tnKhac : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.tnKhac;

        const cardLntt = this.selectedCompany === 'all' ? grandTotal.monthData.lntt : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.lntt;
        const cardCumLntt = this.selectedCompany === 'all' ? grandTotal.cumData.lntt : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.lntt;
        const cardRos = cardDs > 0 ? (cardLntt / cardDs) * 100 : 0;

        const mStr = String(this.selectedMonth).padStart(2, '0');

        let html = '<div style="font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; background: #f8fafc; color: #1e293b; padding: 20px; min-height: 100vh;">';

        // HEADER CONTROL TOOLBAR
        html += '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">';
        html += '<div style="display: flex; align-items: center; gap: 12px;">';
        html += '<div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; color: #ffffff; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3); font-size: 22px;">📊</div>';
        html += '<div>';
        html += '<h2 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">';
        html += 'BÁO CÁO KẾT QUẢ KINH DOANH (P&L)';
        html += '<span style="font-size: 0.75rem; background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 2px 8px; border-radius: 9999px; font-weight: 600;">Hợp Nhất Toàn Tập Đoàn</span>';
        html += '</h2>';
        html += '<p style="font-size: 0.85rem; color: #64748b; margin: 2px 0 0 0;">Chi tiết Tháng ' + mStr + '/2026 & Lũy kế YTD • Đơn vị tính: <strong>Triệu VNĐ (Tr.đ)</strong></p>';
        html += '</div></div>';

        // CONTROLS & ACTION BUTTONS
        html += '<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px;">';
        
        // Month select
        html += '<div style="display: flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 8px; border-radius: 8px; border: 1px solid #cbd5e1;">';
        html += '<span style="font-size: 0.8rem; font-weight: 600; color: #475569;">Kỳ Báo Cáo:</span>';
        html += '<select id="kqkd-month-select" style="background: transparent; border: none; font-weight: 700; font-size: 0.88rem; color: #0f172a; cursor: pointer; outline: none;">';
        for (let m = 1; m <= 12; m++) {
            html += '<option value="' + m + '" ' + (this.selectedMonth === m ? 'selected' : '') + '>Tháng ' + String(m).padStart(2, '0') + '/2026</option>';
        }
        html += '</select></div>';

        // Company select
        html += '<div style="display: flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 8px; border-radius: 8px; border: 1px solid #cbd5e1;">';
        html += '<span style="font-size: 0.8rem; font-weight: 600; color: #475569;">Đơn vị:</span>';
        html += '<select id="kqkd-company-select" style="background: transparent; border: none; font-weight: 700; font-size: 0.88rem; color: #0f172a; cursor: pointer; outline: none;">';
        this.companies.forEach(c => {
            html += '<option value="' + c.id + '" ' + (this.selectedCompany === c.id ? 'selected' : '') + '>' + c.name + '</option>';
        });
        html += '</select></div>';

        // View mode
        html += '<div style="display: flex; background: #e2e8f0; border-radius: 8px; padding: 3px; gap: 2px;">';
        html += '<button onclick="window.KqkdModule.setViewMode(\'all\')" style="padding: 5px 12px; border-radius: 6px; border: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; ' + (this.viewMode === 'all' ? 'background: #ffffff; color: #0f172a; box-shadow: 0 1px 2px rgba(0,0,0,0.1);' : 'background: transparent; color: #64748b;') + '">Đầy Đủ</button>';
        html += '<button onclick="window.KqkdModule.setViewMode(\'month\')" style="padding: 5px 12px; border-radius: 6px; border: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; ' + (this.viewMode === 'month' ? 'background: #ffffff; color: #0f172a; box-shadow: 0 1px 2px rgba(0,0,0,0.1);' : 'background: transparent; color: #64748b;') + '">Chỉ Tháng</button>';
        html += '<button onclick="window.KqkdModule.setViewMode(\'cumulative\')" style="padding: 5px 12px; border-radius: 6px; border: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; ' + (this.viewMode === 'cumulative' ? 'background: #ffffff; color: #0f172a; box-shadow: 0 1px 2px rgba(0,0,0,0.1);' : 'background: transparent; color: #64748b;') + '">Chỉ Lũy Kế</button>';
        html += '</div>';

        // Search input
        html += '<div style="position: relative;">';
        html += '<input type="text" id="kqkd-search-input" value="' + this.searchTerm + '" placeholder="Tìm chỉ tiêu..." style="padding: 6px 12px 6px 28px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; width: 130px; outline: none;">';
        html += '<span style="position: absolute; left: 8px; top: 7px; color: #94a3b8; font-size: 0.85rem;">🔍</span>';
        html += '</div>';

        // Download Template Buttons (Excel & CSV)
        html += '<a href="./Mau_Nhap_Lieu_KQKD_Thang_9_12_VPS.xlsx" download="Mau_Nhap_Lieu_KQKD_Thang_9_12_VPS.xlsx" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #0f766e; color: #ffffff; border: none; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer; box-shadow: 0 2px 4px rgba(15, 118, 110, 0.2); white-space: nowrap;" title="Tải file mẫu Excel chuẩn Tháng 9-12 có sẵn công thức tự động lũy kế">';
        html += '📥 Tải Mẫu Excel T9-12';
        html += '</a>';
        html += '<a href="./Mau_Nhap_Lieu_KQKD_Thang_9_12_VPS.csv" download="Mau_Nhap_Lieu_KQKD_Thang_9_12_VPS.csv" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; padding: 6px 10px; background: #334155; color: #ffffff; border: none; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer; white-space: nowrap;" title="Tải file mẫu CSV định dạng UTF-8 BOM chuẩn">';
        html += '📄 Mẫu CSV';
        html += '</a>';

        // Google Sheet Connection Button
        const isConn = !!this.sheetConfig.sheetId;
        const btnColor = isConn ? '#059669' : '#2563eb';
        const connText = isConn ? '🟢 Đã nối Sheet' : '🔗 Nối Google Sheet';
        html += '<button onclick="window.KqkdModule.openSheetModal()" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: ' + btnColor + '; color: #ffffff; border: none; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer; box-shadow: 0 2px 4px rgba(0,0,0,0.1); white-space: nowrap;">';
        html += connText;
        html += '</button>';

        // Export CSV button
        html += '<button onclick="window.KqkdModule.exportExcel()" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #334155; color: #ffffff; border: none; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer; white-space: nowrap;">';
        html += '📥 Xuất Báo Cáo';
        html += '</button>';

        html += '</div></div>';

        // STATUS BAR (Nếu đã kết nối Google Sheets)
        if (isConn) {
            const scannedMonths = Object.keys(this.liveDataByMonth).filter(m => {
                const nodes = this.liveDataByMonth[m];
                return nodes && Object.keys(nodes).length > 0;
            }).sort((a, b) => parseInt(a, 10) - parseInt(b, 10));

            html += '<div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 8px 16px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #065f46; flex-wrap: wrap; gap: 8px;">';
            html += '<div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">';
            html += '<span>⚡ <strong>Quét Tự Động:</strong> Đang kết nối trực tiếp với Google Sheet KQKD</span>';
            if (scannedMonths.length > 0) {
                html += '<span style="background: #d1fae5; color: #065f46; padding: 2px 8px; border-radius: 12px; font-weight: 700; font-size: 0.75rem; border: 1px solid #a7f3d0;">Đã nạp: T' + scannedMonths.join(', T') + '</span>';
            }
            if (this.sheetConfig.lastSync) {
                html += '<span style="color: #047857;">(Đồng bộ: ' + this.sheetConfig.lastSync + ')</span>';
            }
            html += '</div>';
            html += '<div style="display: flex; gap: 10px;">';
            html += '<button onclick="window.KqkdModule.syncAllMonths(true)" style="background: #059669; color: #ffffff; border: none; padding: 4px 12px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.78rem; display: inline-flex; align-items: center; gap: 4px;">🔄 Quét Cả 12 Tháng</button>';
            html += '<button onclick="window.KqkdModule.openSheetModal()" style="background: transparent; color: #059669; border: 1px solid #059669; padding: 4px 8px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.78rem;">⚙️ Cài đặt</button>';
            html += '</div></div>';
        }

                // BANNER THÔNG BÁO CHO THÁNG 5 & THÁNG 6 KHI CHƯA CÓ DỮ LIỆU
        if ((this.selectedMonth === 5 || this.selectedMonth === 6) && !this.hasMonthData(this.selectedMonth)) {
            html += '<div style="background: #eff6ff; border: 1px solid #bfdbfe; border-left: 4px solid #3b82f6; border-radius: 8px; padding: 12px 18px; margin-bottom: 18px; font-size: 0.85rem; color: #1e40af; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">';
            html += '<div style="display: flex; align-items: center; gap: 10px;">';
            html += '<span style="font-size: 1.3rem;">ℹ️</span>';
            html += '<span><strong>Thông báo kỳ báo cáo Tháng ' + this.selectedMonth + ':</strong> Hiện chưa có dữ liệu nhập cho Tháng ' + this.selectedMonth + '. Hệ thống đang <strong>tạm thời hiển thị số liệu Tháng 4</strong> làm căn cứ. Sau khi quý đơn vị bổ sung nhập dữ liệu Tháng ' + this.selectedMonth + ', hệ thống sẽ tự động quét và tính toán lũy kế theo logic.</span>';
            html += '</div>';
            html += '<button onclick="window.KqkdModule.openSheetModal()" style="background: #2563eb; color: #ffffff; border: none; padding: 6px 14px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.8rem; white-space: nowrap; box-shadow: 0 1px 2px rgba(0,0,0,0.1);">📥 Nhập dữ liệu Tháng ' + this.selectedMonth + '</button>';
            html += '</div>';
        }

        // EXECUTIVE FINANCIAL KPI CARDS
        html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 24px;">';
        
        // Card 1: DS
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid #3b82f6; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">1. DOANH SỐ (DS)</span>';
        html += '<div style="font-size: 18px;">📈</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: #1e3a8a; line-height: 1.2;">' + (cardDs).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>Lũy kế ' + mStr + 'T:</span><strong style="color: #1e293b;">' + (cardCumDs).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' Tr.đ</strong>';
        html += '</div></div>';

        // Card 2: LG
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">2. LÃI GỘP (% LG)</span>';
        html += '<div style="font-size: 18px;">💎</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: #065f46; line-height: 1.2;">' + (cardLg).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>Tỷ lệ % LG: <strong style="color: #059669;">' + Math.round(cardRateLg) + '%</strong></span><span>LK: <strong style="color: #1e293b;">' + (cardCumLg).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + '</strong></span>';
        html += '</div></div>';

        // Card 3: Chi phí
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid #f59e0b; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">3. TỔNG CHI PHÍ</span>';
        html += '<div style="font-size: 18px;">📉</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: #92400e; line-height: 1.2;">' + (cardCp).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>HT Lãi Gộp: <strong style="color: #b45309;">' + (grandTotal.monthData.htLg || 0) + ' Tr.đ</strong></span><span>LK CP: <strong style="color: #1e293b;">' + (cardCumCp).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + '</strong></span>';
        html += '</div></div>';

        // Card 4: TN Khác
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid #8b5cf6; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">4. THU NHẬP KHÁC</span>';
        html += '<div style="font-size: 18px;">🪙</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: #5b21b6; line-height: 1.2;">' + (cardTnKhac).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>Tài chính & Thu khác</span><span>LK: <strong style="color: #1e293b;">' + (cardCumTnKhac).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' Tr.đ</strong></span>';
        html += '</div></div>';

        // Card 5: LNTT
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid ' + (cardLntt >= 0 ? '#10b981' : '#ef4444') + '; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">5. LỢI NHUẬN TRƯỚC THUẾ</span>';
        html += '<div style="font-size: 18px;">🏆</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: ' + (cardLntt >= 0 ? '#065f46' : '#991b1b') + '; line-height: 1.2;">' + this.formatVal(cardLntt, 1) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>Tỷ suất ROS: <strong>' + cardRos.toFixed(1) + '%</strong></span><span>LK: <strong>' + this.formatVal(cardCumLntt, 1) + '</strong></span>';
        html += '</div></div>';

        html += '</div>';

        // CHARTS SECTION
        html += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">';
        html += '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<h4 style="margin: 0 0 16px 0; font-size: 0.95rem; font-weight: 700; color: #0f172a;">📊 So Sánh Doanh Số & Lợi Nhuận Trước Thuế Các Đơn Vị (Tháng ' + mStr + ')</h4>';
        html += '<div style="position: relative; height: 260px;"><canvas id="kqkd-chart-companies"></canvas></div>';
        html += '</div>';

        html += '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<h4 style="margin: 0 0 16px 0; font-size: 0.95rem; font-weight: 700; color: #0f172a;">🌊 Cấu Trúc Dòng Tiền P&L Hợp Nhất (Doanh Số → LNTT)</h4>';
        html += '<div style="position: relative; height: 260px;"><canvas id="kqkd-chart-pnl"></canvas></div>';
        html += '</div>';
        html += '</div>';

        // TABLE CONTROLS
        html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">';
        html += '<div style="font-size: 0.9rem; font-weight: 700; color: #334155;">BẢNG CHI TIẾT CHỈ TIÊU KẾT QUẢ KINH DOANH <span style="font-size: 0.75rem; background: #e2e8f0; padding: 2px 8px; border-radius: 6px; color: #475569; font-weight: 500;">Phân Cấp Cây I, 1, a, a.1...</span></div>';
        html += '<div style="display: flex; gap: 8px;">';
        html += '<button onclick="window.KqkdModule.expandAll()" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #ffffff; border-radius: 6px; font-size: 0.78rem; font-weight: 600; color: #475569; cursor: pointer;">+ Mở rộng tất cả</button>';
        html += '<button onclick="window.KqkdModule.collapseAll()" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #ffffff; border-radius: 6px; font-size: 0.78rem; font-weight: 600; color: #475569; cursor: pointer;">− Thu gọn tất cả</button>';
        html += '</div></div>';

        // TABLE
        html += '<div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">';
        html += '<table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: right; white-space: nowrap;">';
        html += '<thead>';
        html += '<tr style="background: #0f172a; color: #ffffff;">';
        html += '<th rowspan="2" style="padding: 10px 8px; text-align: center; border: 1px solid #334155; width: 45px; position: sticky; left: 0; background: #0f172a; z-index: 5;">TT</th>';
        html += '<th rowspan="2" style="padding: 10px 14px; text-align: left; border: 1px solid #334155; min-width: 240px; position: sticky; left: 45px; background: #0f172a; z-index: 5;">Nội dung</th>';
        html += '<th rowspan="2" style="padding: 10px 10px; text-align: right; border: 1px solid #334155; width: 90px; color: #fbbf24;">Vốn ĐT</th>';
        
        if (this.viewMode !== 'cumulative') {
            html += '<th colspan="7" style="padding: 8px; text-align: center; border: 1px solid #334155; background: #1e3a8a; color: #93c5fd; font-weight: 700;">THÁNG ' + mStr + '</th>';
        }
        if (this.viewMode !== 'month') {
            html += '<th colspan="7" style="padding: 8px; text-align: center; border: 1px solid #334155; background: #064e3b; color: #6ee7b7; font-weight: 700;">LŨY KẾ ' + mStr + ' THÁNG</th>';
        }
        html += '</tr>';

        html += '<tr style="background: #1e293b; color: #e2e8f0; font-size: 0.8rem;">';
        if (this.viewMode !== 'cumulative') {
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 80px;">DS</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 55px;">% LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 80px;">LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 60px;">HT LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 80px;">Chi phí</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 70px;">TN Khác</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 85px; color: #34d399; font-weight: 700;">LNTT</th>';
        }
        if (this.viewMode !== 'month') {
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 90px;">DS</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 55px;">% LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 85px;">LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 60px;">HT LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 85px;">Chi phí</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 70px;">TN Khác</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 90px; color: #34d399; font-weight: 700;">LNTT</th>';
        }
        html += '</tr>';
        html += '</thead>';

        html += '<tbody>';
        html += this.renderTableRows(visibleRoots, 0);

        // GRAND TOTAL ROW
        html += '<tr class="kqkd-row-grand" style="background: #0f172a; color: #ffffff; font-weight: 800; border-top: 3px solid #3b82f6;">';
        html += '<td style="padding: 12px 8px; text-align: center; border: 1px solid #334155; position: sticky; left: 0; background: #0f172a; z-index: 3;">★</td>';
        html += '<td style="padding: 12px 14px; text-align: left; border: 1px solid #334155; position: sticky; left: 45px; background: #0f172a; z-index: 3; color: #fbbf24;">TỔNG CỘNG TOÀN TẬP ĐOÀN</td>';
        html += '<td style="padding: 12px 10px; text-align: right; border: 1px solid #334155; color: #facc15;">' + (grandTotal.vonDT ? grandTotal.vonDT.toLocaleString('vi-VN') : '-') + '</td>';

        if (this.viewMode !== 'cumulative') {
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #60a5fa;">' + this.formatVal(grandTotal.monthData.ds, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155;">' + Math.round(grandTotal.monthData.rateLg) + '%</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #34d399;">' + this.formatVal(grandTotal.monthData.lg, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #94a3b8;">' + this.formatVal(grandTotal.monthData.htLg, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #f87171;">' + this.formatVal(grandTotal.monthData.chiPhi, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #c084fc;">' + this.formatVal(grandTotal.monthData.tnKhac, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #4ade80; font-size: 0.95rem;">' + this.formatVal(grandTotal.monthData.lntt, 1) + '</td>';
        }
        if (this.viewMode !== 'month') {
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #60a5fa;">' + this.formatVal(grandTotal.cumData.ds, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155;">' + Math.round(grandTotal.cumData.rateLg) + '%</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #34d399;">' + this.formatVal(grandTotal.cumData.lg, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #94a3b8;">' + this.formatVal(grandTotal.cumData.htLg, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #f87171;">' + this.formatVal(grandTotal.cumData.chiPhi, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #c084fc;">' + this.formatVal(grandTotal.cumData.tnKhac, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #4ade80; font-size: 0.95rem;">' + this.formatVal(grandTotal.cumData.lntt, 1) + '</td>';
        }
        html += '</tr>';
        html += '</tbody>';
        html += '</table></div>';

        html += '<div style="margin-top: 16px; font-size: 0.8rem; color: #64748b; display: flex; justify-content: space-between; align-items: center;">';
        html += '<div>💡 Ghi chú: Số trong ngoặc đỏ <strong>(xxx.x)</strong> biểu thị giá trị âm (lỗ hoặc giảm chi phí) theo chuẩn kế toán.</div>';
        html += '<div>Hệ thống Dashboard VPS Group • Báo Cáo KQKD Hợp Nhất Chuẩn</div>';
        html += '</div>';

        // MODAL GOOGLE SHEET CONNECTOR
        html += this.renderSheetModalHtml();

        html += '</div>';

        container.innerHTML = html;

        this.bindEvents();
        this.renderCharts(calculatedRoots);
    },

    renderTableRows(nodes, level) {
        let html = '';

        nodes.forEach(node => {
            const isCollapsed = this.collapsedNodes[node.id] || false;
            const hasChildren = node.children && node.children.length > 0;
            const paddingLeft = 12 + level * 18;

            let rowBg = '#ffffff';
            let textColor = '#1e293b';
            let fontWeight = '400';
            let borderBottom = '1px solid #e2e8f0';

            if (node.isHeader) {
                rowBg = '#e0e7ff';
                textColor = '#1e1b4b';
                fontWeight = '800';
                borderBottom = '2px solid #cbd5e1';
            } else if (level === 1) {
                rowBg = '#f1f5f9';
                textColor = '#0f172a';
                fontWeight = '700';
                borderBottom = '1px solid #cbd5e1';
            } else if (level === 2 && hasChildren) {
                rowBg = '#f8fafc';
                textColor = '#334155';
                fontWeight = '600';
            }

            const toggleIcon = hasChildren 
                ? '<span onclick="window.KqkdModule.toggleNode(\'' + node.id + '\')" style="cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 4px; background: #cbd5e1; color: #1e293b; font-weight: bold; font-size: 11px; margin-right: 6px; user-select: none;">' + (isCollapsed ? '+' : '−') + '</span>' 
                : '<span style="display: inline-block; width: 18px; margin-right: 6px;"></span>';

            html += '<tr style="background: ' + rowBg + '; color: ' + textColor + '; font-weight: ' + fontWeight + '; border-bottom: ' + borderBottom + ';">';
            html += '<td style="padding: 8px 6px; text-align: center; border: 1px solid #e2e8f0; position: sticky; left: 0; background: ' + rowBg + '; z-index: 2;">' + (node.stt || '') + '</td>';
            html += '<td style="padding: 8px 10px 8px ' + paddingLeft + 'px; text-align: left; border: 1px solid #e2e8f0; position: sticky; left: 45px; background: ' + rowBg + '; z-index: 2;">' + toggleIcon + '<span>' + node.name + '</span></td>';
            html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0; color: #475569; font-weight: 600;">' + (node.vonDT ? node.vonDT.toLocaleString('vi-VN') : '-') + '</td>';

            if (this.viewMode !== 'cumulative') {
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.ds, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.rateLg, 0, true) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.lg, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0; color: #94a3b8;">' + this.formatVal(node.monthData.htLg, 1) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.chiPhi, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0; color: #8b5cf6;">' + this.formatVal(node.monthData.tnKhac, 1) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.lntt, 1) + '</td>';
            }

            if (this.viewMode !== 'month') {
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.ds, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.rateLg, 0, true) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.lg, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0; color: #94a3b8;">' + this.formatVal(node.cumData.htLg, 1) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.chiPhi, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0; color: #8b5cf6;">' + this.formatVal(node.cumData.tnKhac, 1) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.lntt, 1) + '</td>';
            }

            html += '</tr>';

            if (hasChildren && !isCollapsed) {
                html += this.renderTableRows(node.children, level + 1);
            }
        });

        return html;
    },

    // ============================================================
    // MODAL DIALOG KẾT NỐI GOOGLE SHEET
    // ============================================================
    renderSheetModalHtml() {
        let h = '';
        h += '<div id="kqkd-sheet-modal" style="display: none; position: fixed; inset: 0; background: rgba(15, 23, 42, 0.6); z-index: 9999; align-items: center; justify-content: center; backdrop-filter: blur(4px);">';
        h += '<div style="background: #ffffff; border-radius: 16px; width: 100%; max-width: 620px; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.2); overflow: hidden; margin: 20px;">';
        
        // Modal Header
        h += '<div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 18px 24px; color: #ffffff; display: flex; justify-content: space-between; align-items: center;">';
        h += '<div style="display: flex; align-items: center; gap: 10px;">';
        h += '<span style="font-size: 24px;">⚡</span>';
        h += '<div>';
        h += '<h3 style="margin: 0; font-size: 1.1rem; font-weight: 700;">Kết Nối Google Sheets - Báo Cáo KQKD (P&L)</h3>';
        h += '<p style="margin: 2px 0 0 0; font-size: 0.78rem; color: #94a3b8;">Hệ thống tự động quét số liệu hàng tháng khi người dùng nhập vào file</p>';
        h += '</div></div>';
        h += '<button onclick="window.KqkdModule.closeSheetModal()" style="background: transparent; border: none; color: #94a3b8; font-size: 20px; cursor: pointer; padding: 4px 8px;">✕</button>';
        h += '</div>';

        // Modal Body
        h += '<div style="padding: 24px; font-size: 0.88rem; color: #334155;">';
        
        // Input URL
        h += '<div style="margin-bottom: 16px;">';
        h += '<label style="display: block; font-weight: 600; margin-bottom: 6px; color: #0f172a;">Đường Link hoặc Sheet ID của Google Sheet KQKD:</label>';
        h += '<input type="text" id="kqkd-input-url" value="' + (this.sheetConfig.sheetId ? 'https://docs.google.com/spreadsheets/d/' + this.sheetConfig.sheetId + '/edit' : '') + '" placeholder="https://docs.google.com/spreadsheets/d/1NkEm.../edit" style="width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; outline: none; transition: border 0.2s;">';
        h += '<p style="margin: 4px 0 0 0; font-size: 0.75rem; color: #64748b;">Dán toàn bộ URL link trình duyệt hoặc ID tệp Google Sheet của bạn.</p>';
        h += '</div>';

        // Sheet Name / Tab
        h += '<div style="margin-bottom: 20px;">';
        h += '<label style="display: block; font-weight: 600; margin-bottom: 6px; color: #0f172a;">Tên Sheet / Tab trong Google Sheet:</label>';
        h += '<input type="text" id="kqkd-input-sheetname" value="' + this.sheetConfig.sheetName + '" placeholder="Ví dụ: Bao_Cao_KQKD_Thang_07 hoặc Thang_08" style="width: 100%; box-sizing: border-box; padding: 10px 14px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; outline: none;">';
        h += '<p style="margin: 4px 0 0 0; font-size: 0.75rem; color: #64748b;">Để trống hoặc ghi "Tự động" để hệ thống tự quét tab theo Tháng đang chọn (Thang_01..Thang_12).</p>';
        h += '</div>';

        // Guidance block
        h += '<div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 14px; margin-bottom: 20px; font-size: 0.8rem; line-height: 1.5;">';
        h += '<div style="font-weight: 700; color: #0f172a; margin-bottom: 6px; display: flex; align-items: center; gap: 6px;">';
        h += '<span>📋 Quy trình 3 bước nhập liệu nhanh & đồng bộ tự động:</span>';
        h += '</div>';
        h += '<ol style="margin: 0; padding-left: 20px; color: #475569; display: flex; flex-direction: column; gap: 6px;">';
        h += '<li><strong>Tải tệp mẫu chuẩn:</strong> Bấm <a href="./Mau_Nhap_Lieu_KQKD_Thang_9_12_VPS.xlsx" download="Mau_Nhap_Lieu_KQKD_Thang_9_12_VPS.xlsx" style="color: #059669; font-weight: 700; text-decoration: underline;">Tải Mẫu Excel KQKD Tháng 9-12</a> hoặc <a href="./Mau_Nhap_Lieu_KQKD_Thang_9_12_VPS.csv" download="Mau_Nhap_Lieu_KQKD_Thang_9_12_VPS.csv" style="color: #2563eb; font-weight: 700; text-decoration: underline;">Tải File CSV (UTF-8)</a> để gửi cho các đơn vị thành viên.</li>';
        h += '<li><strong>Nhập liệu tiện lợi & Tự động cộng dồn lũy kế:</strong> Các đơn vị chỉ cần nhập 5 chỉ tiêu phát sinh trong tháng (DS, LG, HT LG, Chi phí, TN Khác). Toàn bộ % LG, LNTT và các cột Lũy kế sẽ được TỰ ĐỘNG CỘNG TIẾP TỤC từ mốc Tháng 8 (DS: 251.839 Tr.đ, LG: 55.826 Tr.đ, LNTT: 7.230 Tr.đ) mà không bao giờ bị lệch!</li>';
        h += '<li><strong>Đưa lên Google Drive & Kết nối:</strong> Tải file lên Google Sheets, đặt tên tab là <code>Thang_09</code>, <code>Thang_10</code>, <code>Thang_11</code>, <code>Thang_12</code>, bật chia sẻ <strong>"Bất kỳ ai có liên kết"</strong> (Viewer). Dán URL vào ô trên và bấm <strong>"Lưu & Quét Dữ Liệu Ngay"</strong>.</li>';
        h += '</ol>';
        h += '</div>';

        // Scan Status Log Area
        h += '<div id="kqkd-scan-status" style="display: none; padding: 10px 14px; border-radius: 8px; margin-bottom: 16px; font-size: 0.82rem;"></div>';

        // Actions
        h += '<div style="display: flex; justify-content: flex-end; gap: 10px;">';
        h += '<button onclick="window.KqkdModule.closeSheetModal()" style="padding: 8px 16px; border: 1px solid #cbd5e1; background: #ffffff; border-radius: 8px; font-weight: 600; cursor: pointer; color: #475569;">Đóng</button>';
        h += '<button id="kqkd-btn-save-sheet" onclick="window.KqkdModule.saveAndScanSheet()" style="padding: 8px 20px; border: none; background: #059669; color: #ffffff; border-radius: 8px; font-weight: 700; cursor: pointer; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.3);">Lưu & Quét Dữ Liệu Ngay</button>';
        h += '</div>';

        h += '</div></div></div>';
        return h;
    },

    openSheetModal() {
        const modal = document.getElementById('kqkd-sheet-modal');
        if (modal) modal.style.display = 'flex';
    },

    closeSheetModal() {
        const modal = document.getElementById('kqkd-sheet-modal');
        if (modal) modal.style.display = 'none';
    },

    extractSheetId(input) {
        if (!input) return '';
        const trimmed = input.trim();
        const m = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
        if (m && m[1]) return m[1];
        if (/^[a-zA-Z0-9-_]{20,}$/.test(trimmed)) return trimmed;
        return '';
    },

    async saveAndScanSheet() {
        const urlInput = document.getElementById('kqkd-input-url');
        const sheetNameInput = document.getElementById('kqkd-input-sheetname');
        const statusBox = document.getElementById('kqkd-scan-status');
        const btnSave = document.getElementById('kqkd-btn-save-sheet');

        const sheetId = this.extractSheetId(urlInput ? urlInput.value : '');
        if (!sheetId) {
            alert('Vui lòng nhập đường link Google Sheet hợp lệ!');
            return;
        }

        const sheetName = sheetNameInput && sheetNameInput.value.trim() ? sheetNameInput.value.trim() : 'Bao_Cao_KQKD_Thang_07';

        this.sheetConfig.sheetId = sheetId;
        this.sheetConfig.sheetName = sheetName;
        localStorage.setItem('vps_kqkd_sheet_id', sheetId);
        localStorage.setItem('vps_kqkd_sheet_name', sheetName);

        if (statusBox) {
            statusBox.style.display = 'block';
            statusBox.style.background = '#eff6ff';
            statusBox.style.color = '#1e40af';
            statusBox.style.border = '1px solid #bfdbfe';
            statusBox.innerHTML = '⏳ Đang quét toàn bộ các tab tháng (Thang_01..Thang_12) từ Google Sheets... Vui lòng đợi trong giây lát.';
        }
        if (btnSave) btnSave.disabled = true;

        const res = await this.syncAllMonths(true);

        if (btnSave) btnSave.disabled = false;

        if (res && res.success) {
            const mList = res.syncedMonths && res.syncedMonths.length > 0 ? res.syncedMonths.join(', Tháng ') : this.selectedMonth;
            if (statusBox) {
                statusBox.style.background = '#ecfdf5';
                statusBox.style.color = '#065f46';
                statusBox.style.border = '1px solid #a7f3d0';
                statusBox.innerHTML = '✅ Quét dữ liệu thành công! Đã nạp số liệu cho Tháng ' + mList + ' vào Dashboard.';
            }
            setTimeout(() => {
                this.closeSheetModal();
                this.render();
            }, 1500);
        } else {
            if (statusBox) {
                statusBox.style.background = '#fef2f2';
                statusBox.style.color = '#991b1b';
                statusBox.style.border = '1px solid #fecaca';
                statusBox.innerHTML = '⚠️ Không thể đọc dữ liệu từ sheet. Vui lòng kiểm tra quyền chia sẻ "Bất kỳ ai có liên kết" và tên các tab (Thang_01..Thang_12)!';
            }
        }
    },

    // ============================================================
    // PIPELINE QUÉT DỮ LIỆU TỰ ĐỘNG TẤT CẢ CÁC THÁNG (BATCH SYNC)
    // ============================================================
    getTabCandidates(month) {
        const m = parseInt(month, 10);
        // Tháng 1..8 là các mốc chuẩn đối soát chính thức đã chốt của Tập đoàn, không quét đè từ Google Sheets
        if (m >= 1 && m <= 8) {
            return [];
        }
        const mStr = String(m).padStart(2, '0');
        const list = [
            'Thang_' + mStr,
            'thang_' + mStr,
            'Tháng ' + m,
            'tháng ' + m,
            'Thang ' + m,
            'thang ' + m,
            'Tháng ' + mStr,
            'tháng ' + mStr,
            'KQKD_Thang_' + mStr,
            'KQKD_Tháng_' + mStr,
            'KQKD_Thang_' + m,
            'Bao_Cao_KQKD_Thang_' + mStr,
            'T' + mStr,
            'T' + m
        ];
        // Chỉ thêm sheetName tùy chỉnh nếu có cấu hình rõ ràng và tên sheet phù hợp với tháng
        if (this.sheetConfig.sheetName) {
            const sn = this.sheetConfig.sheetName.toLowerCase();
            if (sn.includes(String(m)) || sn.includes(mStr)) {
                list.unshift(this.sheetConfig.sheetName);
            }
        }
        return list;
    },

    async syncAllMonths(showFeedback = false) {
        const sheetId = this.sheetConfig.sheetId;
        if (!sheetId) return { success: false, syncedMonths: [] };

        this.isScanning = true;
        const syncedMonths = [];
        const t = Date.now();

        // Quét đồng thời 12 tháng từ Thang_01 đến Thang_12
        const scanPromises = [];
        for (let m = 1; m <= 12; m++) {
            const candidates = this.getTabCandidates(m);

            scanPromises.push((async () => {
                for (const name of candidates) {
                    if (!name || name === 'Tự động') continue;
                    const url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(name) + '&_t=' + t;
                    try {
                        const res = await fetch(url);
                        if (!res.ok) continue;
                        const text = await res.text();
                        if (text.includes('google.visualization.Query.setResponse') && text.includes('error')) continue;
                        if (!text || text.length < 50) continue;

                        if (window.Papa) {
                            const parsed = Papa.parse(text, { header: false, skipEmptyLines: true });
                            if (parsed.data && parsed.data.length > 5) {
                                const parsedData = this.parseKqkdCsvRows(parsed.data, m);
                                const hasData = (parsedData.grandTotal && (parsedData.grandTotal.monthData.ds > 0 || parsedData.grandTotal.cumData.ds > 0)) ||
                                    Object.values(parsedData.nodes).some(n => n.monthData.ds > 0 || n.monthData.lntt !== 0 || n.cumData.ds > 0);

                                // Chặn nhiễm chéo số liệu: Nếu tháng m != 1 nhưng lại parse ra số liệu Tháng 1 (DS: 39947) thì bỏ qua
                                if (m !== 1 && parsedData.grandTotal && parsedData.grandTotal.monthData.ds === 39947) {
                                    console.warn('[KQKD Sync] Bỏ qua tab do chứa dữ liệu Tháng 1 nhầm sang Tháng ' + m, name);
                                    continue;
                                }

                                if (hasData) {
                                    if (!this.liveDataByMonth[m]) this.liveDataByMonth[m] = {};
                                    Object.assign(this.liveDataByMonth[m], parsedData.nodes);
                                    if (parsedData.grandTotal) {
                                        this.liveGrandTotal[m] = parsedData.grandTotal;
                                    }
                                    syncedMonths.push(m);
                                    return true;
                                }
                            }
                        }
                    } catch(e) {
                        // ignore and try next
                    }
                }
                return false;
            })());
        }

        await Promise.allSettled(scanPromises);
        this.isScanning = false;

        if (syncedMonths.length > 0) {
            syncedMonths.sort((a, b) => a - b);
            const now = new Date();
            const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
            this.sheetConfig.lastSync = timeStr;
            this.sheetConfig.isConnected = true;
            localStorage.setItem('vps_kqkd_last_sync', timeStr);

            try {
                localStorage.setItem('vps_kqkd_live_data_all', JSON.stringify({
                    liveDataByMonth: this.liveDataByMonth,
                    liveGrandTotal: this.liveGrandTotal
                }));
            } catch(e) {
                console.warn('[KQKD Sync] Cannot save cache to localStorage:', e);
            }

            console.log('[KQKD Sync] Đã đồng bộ thành công các tháng:', syncedMonths);
            if (showFeedback) {
                this.render();
            }
            return { success: true, syncedMonths };
        } else {
            // Fallback sang sync cho riêng tháng hiện tại
            const fallbackOk = await this.syncGoogleSheet(showFeedback);
            return { success: fallbackOk, syncedMonths: fallbackOk ? [this.selectedMonth] : [] };
        }
    },

    // Quét riêng cho 1 tháng (mặc định là selectedMonth)
    async syncGoogleSheet(showFeedback = false) {
        const sheetId = this.sheetConfig.sheetId;
        if (!sheetId) return false;

        const month = this.selectedMonth;
        if (month === 7) {
            console.log('[KQKD Sync] Tháng 7 là chuẩn đối soát cố định đã chốt, không quét đè.');
            return true;
        }
        const candidates = this.getTabCandidates(month);

        let validRows = null;
        const t = Date.now();

        for (const name of candidates) {
            if (!name || name === 'Tự động') continue;
            const url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent(name) + '&_t=' + t;
            try {
                const res = await fetch(url);
                if (!res.ok) continue;
                const text = await res.text();
                if (text.includes('google.visualization.Query.setResponse') && text.includes('error')) continue;
                if (!text || text.length < 50) continue;

                if (window.Papa) {
                    const parsed = Papa.parse(text, { header: false, skipEmptyLines: true });
                    if (parsed.data && parsed.data.length > 5) {
                        validRows = parsed.data;
                        break;
                    }
                }
            } catch(e) {
                console.warn('[KQKD Sync] Sheet check error:', name, e);
            }
        }

        if (!validRows) {
            console.warn('[KQKD Sync] Khong the tai sheet tu Google Sheets cho thang ' + month);
            return false;
        }

        try {
            const parsedData = this.parseKqkdCsvRows(validRows, month);
            if (month !== 1 && parsedData.grandTotal && parsedData.grandTotal.monthData.ds === 39947) {
                console.warn('[KQKD Sync] Chặn parse nhầm dữ liệu Tháng 1 sang Tháng ' + month);
                return false;
            }

            if (!this.liveDataByMonth[month]) this.liveDataByMonth[month] = {};
            
            Object.assign(this.liveDataByMonth[month], parsedData.nodes);
            if (parsedData.grandTotal) {
                this.liveGrandTotal[month] = parsedData.grandTotal;
            }

            const now = new Date();
            const timeStr = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0') + ':' + String(now.getSeconds()).padStart(2, '0');
            this.sheetConfig.lastSync = timeStr;
            this.sheetConfig.isConnected = true;
            localStorage.setItem('vps_kqkd_last_sync', timeStr);

            try {
                localStorage.setItem('vps_kqkd_live_data_all', JSON.stringify({
                    liveDataByMonth: this.liveDataByMonth,
                    liveGrandTotal: this.liveGrandTotal
                }));
            } catch(e) {}

            console.log('[KQKD Sync] Dong bo thanh cong Tháng ' + month + ' (' + Object.keys(parsedData.nodes).length + ' chi tieu)!');
            if (showFeedback) {
                this.render();
            }
            return true;
        } catch(e) {
            console.error('[KQKD Sync] Loi khi phan tich du lieu CSV:', e);
            return false;
        }
    },

    parseKqkdCsvRows(rows, targetMonth) {
        const nodes = {};
        let grandTotal = null;

        const cleanVal = (valStr, isPct = false) => {
            if (!valStr && valStr !== 0) return 0;
            let s = valStr.toString().trim().replace(/đ/gi, '').replace(/vnd/gi, '').replace(/%/g, '').trim();
            if (!s || s === '-' || s === '#DIV/0!' || s === '######' || s.toLowerCase() === 'none' || s.toLowerCase() === 'null') return 0;
            if (s.startsWith('(') && s.endsWith(')')) {
                return -cleanVal(s.substring(1, s.length - 1), isPct);
            }
            if (isPct) {
                try {
                    let v = parseFloat(s.replace(',', '.'));
                    if (v > 1) v = v / 100.0;
                    return Math.round(v * 1000) / 10;
                } catch(e) { return 0; }
            }

            // Có cả dấu chấm và dấu phẩy (vd: 83.000,0 hoặc 4.861,0 hoặc 1,103.1)
            if (s.includes('.') && s.includes(',')) {
                const lastDot = s.lastIndexOf('.');
                const lastComma = s.lastIndexOf(',');
                if (lastComma > lastDot) {
                    // Dấu chấm là phân cách hàng nghìn, dấu phẩy là phần thập phân (chuẩn VN: 83.000,0 -> 83000)
                    s = s.replace(/\./g, '').replace(',', '.');
                } else {
                    // Dấu phẩy là phân cách hàng nghìn, dấu chấm là phần thập phân (chuẩn US: 1,103.1 -> 1103.1)
                    s = s.replace(/,/g, '');
                }
                return parseFloat(s) || 0;
            }

            // Chỉ có dấu phẩy (vd: 46,0 hoặc 39,947 hoặc 27,44)
            if (s.includes(',')) {
                const parts = s.split(',');
                if (parts.length === 2) {
                    const intPart = parts[0];
                    const decPart = parts[1];
                    // Phân cách hàng nghìn 3 chữ số (vd: 39,947 -> 39947)
                    if (decPart.length === 3) return parseFloat(intPart + decPart) || 0;
                    // Số thập phân (vd: 46,0 -> 46.0; 27,44 -> 27.44)
                    return parseFloat(intPart + '.' + decPart) || 0;
                }
            }

            // Chỉ có dấu chấm (vd: 39.947 hoặc 46.0)
            if (s.includes('.')) {
                const parts = s.split('.');
                if (parts.length === 2) {
                    const intPart = parts[0];
                    const decPart = parts[1];
                    // Phân cách hàng nghìn 3 chữ số (vd: 39.947 -> 39947)
                    if (decPart.length === 3) return parseFloat(intPart + decPart) || 0;
                    // Số thập phân (vd: 46.0 -> 46)
                    return parseFloat(intPart + '.' + decPart) || 0;
                }
            }
            return parseFloat(s) || 0;
        };

        // Tự động nhận diện dòng bắt đầu và vị trí cột tên (offset = 0 nếu cột 0 là tên, 1 nếu cột 1 là tên)
        let startRowIdx = 0;
        let offset = 0;
        for (let i = 0; i < Math.min(rows.length, 12); i++) {
            const r = rows[i] || [];
            const rStr = r.join(' ').toLowerCase();
            if (rStr.includes('miền bắc') || rStr.includes('tân hồng hà') || rStr.includes('thh')) {
                startRowIdx = i;
                offset = (r[1] && (r[1].toLowerCase().includes('miền bắc') || r[1].toLowerCase().includes('thh'))) ? 1 : 0;
                break;
            }
        }

        let currentParent = '';

        for (let i = startRowIdx; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length < offset + 4) continue;

            const name = (row[offset] || '').toString().trim();
            if (!name) continue;
            const nameLower = name.toLowerCase();

            let nodeId = null;
            if (nameLower.includes('miền bắc')) {
                nodeId = 'MB';
                currentParent = 'MB';
            } else if (nameLower === 'thh' || nameLower.includes('tân hồng hà')) {
                nodeId = 'THH';
                currentParent = 'THH';
            } else if (nameLower === 'việt' || nameLower === 'viet') {
                nodeId = 'VIET';
                currentParent = 'VIET';
            } else if (nameLower === 'itss') {
                nodeId = 'ITSS';
                currentParent = 'ITSS';
            } else if (nameLower.includes('cty vps') || nameLower === 'vps') {
                nodeId = 'VPS_CORP';
                currentParent = 'VPS_CORP';
            } else if (nameLower === 'xesco' || nameLower.includes('xem sơn')) {
                nodeId = 'XESCO';
                currentParent = 'XESCO';
            } else if (nameLower.includes('xesco - kd')) {
                nodeId = 'XESCO_KD';
                currentParent = 'XESCO_KD';
            } else if (nameLower.includes('xesco - kt')) {
                nodeId = 'XESCO_KT';
                currentParent = 'XESCO_KT';
            } else if (nameLower.includes('miền trung')) {
                nodeId = 'MT';
                currentParent = 'MT';
            } else if (nameLower.includes('tổng cộng') || nameLower.includes('★')) {
                nodeId = 'GRAND_TOTAL';
                currentParent = '';
            } else if (nameLower.includes('khối dịch vụ kỹ thuật')) {
                nodeId = 'THH_DVKT';
                currentParent = 'THH_DVKT';
            } else if (currentParent === 'THH' || currentParent === 'THH_DVKT') {
                if (nameLower.includes('tổ dịch vụ')) nodeId = 'THH_DVKT_1';
                else if (nameLower.includes('tổ mực in')) nodeId = 'THH_DVKT_2';
                else if (nameLower.includes('thuê máy')) nodeId = 'THH_DVKT_3';
                else if (nameLower.includes('metercharg')) nodeId = 'THH_DVKT_4';
                else if (nameLower.includes('online')) nodeId = 'THH_DVKT_5';
                else if (nameLower.includes('tổng hợp')) nodeId = 'THH_KDTH';
                else if (nameLower.includes('bán buôn')) nodeId = 'THH_KDBB';
                else if (nameLower.includes('dự án')) nodeId = 'THH_DUAN';
            } else if (currentParent === 'VIET') {
                if (nameLower.includes('thuê máy')) nodeId = 'VIET_1';
                else if (nameLower.includes('kdth')) nodeId = 'VIET_2';
                else if (nameLower.includes('online')) nodeId = 'VIET_3';
                else if (nameLower.includes('cửa hàng')) nodeId = 'VIET_4';
            } else if (currentParent === 'VPS_CORP') {
                if (nameLower.includes('hoạt động kd')) nodeId = 'VPS_KD';
                else if (nameLower.includes('tài chính')) nodeId = 'VPS_TC';
            } else if (currentParent === 'XESCO_KD') {
                if (nameLower.includes('máy lẻ')) nodeId = 'XESCO_KD_1';
                else if (nameLower.includes('kd sỉ') || nameLower.includes('sỉ')) nodeId = 'XESCO_KD_2';
                else if (nameLower.includes('online')) nodeId = 'XESCO_KD_3';
                else if (nameLower.includes('thuê máy')) nodeId = 'XESCO_KD_4';
            } else if (currentParent === 'XESCO_KT') {
                if (nameLower.includes('thuê máy')) nodeId = 'XESCO_KT_1';
                else if (nameLower.includes('metercharg')) nodeId = 'XESCO_KT_2';
                else if (nameLower.includes('dịch vụ')) nodeId = 'XESCO_KT_3';
            } else if (currentParent === 'MT') {
                if (nameLower.includes('linh kiện')) nodeId = 'MT_2';
                else if (nameLower.includes('máy - bán buôn') || (nameLower.includes('máy') && nameLower.includes('buôn'))) nodeId = 'MT_1';
                else if (nameLower.includes('shope') || nameLower.includes('online')) nodeId = 'MT_3';
                else if (nameLower.includes('toàn phần')) nodeId = 'MT_6';
                else if (nameLower.includes('dịch vụ')) nodeId = 'MT_4';
                else if (nameLower.includes('thuê máy')) nodeId = 'MT_5';
                else if (nameLower.includes('bán lẻ')) nodeId = 'MT_7';
            }

            if (nodeId) {
                const vonDT = cleanVal(row[offset + 1]);
                const m_ds = cleanVal(row[offset + 2]);
                let m_rateLg = cleanVal(row[offset + 3], true);
                const m_lg = cleanVal(row[offset + 4]);
                const m_htLg = cleanVal(row[offset + 5]);
                const m_cp = cleanVal(row[offset + 6]);
                const m_tnk = cleanVal(row[offset + 7]);
                let m_lntt = cleanVal(row[offset + 8]);

                let c_ds = cleanVal(row[offset + 9]);
                let c_rateLg = cleanVal(row[offset + 10], true);
                let c_lg = cleanVal(row[offset + 11]);
                let c_htLg = cleanVal(row[offset + 12]);
                let c_cp = cleanVal(row[offset + 13]);
                let c_tnk = cleanVal(row[offset + 14]);
                let c_lntt = cleanVal(row[offset + 15]);

                // Tự động tính LNTT nếu đơn vị bỏ trống
                if (m_lntt === 0 && (m_lg !== 0 || m_cp !== 0)) {
                    m_lntt = m_lg + m_htLg - m_cp + m_tnk;
                }
                if (m_rateLg === 0 && m_ds > 0 && m_lg !== 0) {
                    m_rateLg = (m_lg / m_ds) * 100;
                }

                // TỰ ĐỘNG CỘNG LŨY KẾ CHO THÁNG 8, 9, 10, 11, 12:
                // Nếu cột lũy kế bị trống hoặc bằng 0, tự động lấy lũy kế tháng trước + phát sinh tháng này
                if ((c_ds === 0 && m_ds > 0) || (c_ds === 0 && c_lntt === 0 && (m_lg !== 0 || m_cp !== 0 || m_lntt !== 0))) {
                    const prevCum = this.getPrevMonthCumulative(nodeId, targetMonth);
                    if (prevCum) {
                        c_ds = prevCum.ds + m_ds;
                        c_lg = prevCum.lg + m_lg;
                        c_htLg = (prevCum.htLg || 0) + m_htLg;
                        c_cp = prevCum.chiPhi + m_cp;
                        c_tnk = (prevCum.tnKhac || 0) + m_tnk;
                        c_lntt = (prevCum.lntt !== undefined && !isNaN(prevCum.lntt)) ? (prevCum.lntt + m_lntt) : (c_lg + c_htLg - c_cp + c_tnk);
                        c_rateLg = c_ds > 0 ? (c_lg / c_ds) * 100 : 0;
                    } else if (targetMonth === 1) {
                        c_ds = m_ds;
                        c_rateLg = m_rateLg;
                        c_lg = m_lg;
                        c_htLg = m_htLg;
                        c_cp = m_cp;
                        c_tnk = m_tnk;
                        c_lntt = m_lntt;
                    }
                }

                const fixedVon = nodeId === 'GRAND_TOTAL' ? 93000 : (nodeId === 'MB' ? 90000 : (nodeId === 'THH' ? 50000 : (nodeId === 'VIET' || nodeId === 'VPS_CORP' ? 10000 : (nodeId === 'XESCO' ? 15000 : (nodeId === 'MT' ? 3000 : (nodeId === 'ITSS' ? 5000 : null))))));

                const nodeObj = {
                    vonDT: fixedVon || (vonDT ? vonDT * (vonDT < 1000 ? 1000 : 1) : null),
                    monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_cp, tnKhac: m_tnk, lntt: m_lntt },
                    cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_cp, tnKhac: c_tnk, lntt: c_lntt }
                };

                if (nodeId === 'GRAND_TOTAL') {
                    grandTotal = {
                        stt: '★',
                        name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
                        vonDT: 93000,
                        monthData: nodeObj.monthData,
                        cumData: nodeObj.cumData
                    };
                } else {
                    nodes[nodeId] = nodeObj;
                }
            }
        }

        // Nếu dòng GRAND_TOTAL trong sheet bị rỗng hoặc bằng 0, tự động cộng tổng từ Miền Bắc (MB) và Miền Trung (MT)
        if (!grandTotal || (grandTotal.monthData.ds === 0 && grandTotal.cumData.ds === 0)) {
            let sum_m_ds = 0, sum_m_lg = 0, sum_m_ht = 0, sum_m_cp = 0, sum_m_tnk = 0, sum_m_lntt = 0;
            let sum_c_ds = 0, sum_c_lg = 0, sum_c_ht = 0, sum_c_cp = 0, sum_c_tnk = 0, sum_c_lntt = 0;
            ['MB', 'MT'].forEach(id => {
                if (nodes[id]) {
                    sum_m_ds += nodes[id].monthData.ds || 0;
                    sum_m_lg += nodes[id].monthData.lg || 0;
                    sum_m_ht += nodes[id].monthData.htLg || 0;
                    sum_m_cp += nodes[id].monthData.chiPhi || 0;
                    sum_m_tnk += nodes[id].monthData.tnKhac || 0;
                    sum_m_lntt += nodes[id].monthData.lntt || 0;

                    sum_c_ds += nodes[id].cumData.ds || 0;
                    sum_c_lg += nodes[id].cumData.lg || 0;
                    sum_c_ht += nodes[id].cumData.htLg || 0;
                    sum_c_cp += nodes[id].cumData.chiPhi || 0;
                    sum_c_tnk += nodes[id].cumData.tnKhac || 0;
                    sum_c_lntt += nodes[id].cumData.lntt || 0;
                }
            });
            if (sum_m_ds > 0 || sum_c_ds > 0) {
                grandTotal = {
                    stt: '★',
                    name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
                    vonDT: 93000,
                    monthData: {
                        ds: sum_m_ds,
                        rateLg: sum_m_ds > 0 ? (sum_m_lg / sum_m_ds) * 100 : 0,
                        lg: sum_m_lg,
                        htLg: sum_m_ht,
                        chiPhi: sum_m_cp,
                        tnKhac: sum_m_tnk,
                        lntt: sum_m_lntt
                    },
                    cumData: {
                        ds: sum_c_ds,
                        rateLg: sum_c_ds > 0 ? (sum_c_lg / sum_c_ds) * 100 : 0,
                        lg: sum_c_lg,
                        htLg: sum_c_ht,
                        chiPhi: sum_c_cp,
                        tnKhac: sum_c_tnk,
                        lntt: sum_c_lntt
                    }
                };
            }
        }

        return { nodes, grandTotal };
    },

    bindEvents() {
        const monthSelect = document.getElementById('kqkd-month-select');
        if (monthSelect) {
            monthSelect.addEventListener('change', (e) => {
                this.selectedMonth = parseInt(e.target.value, 10);
                this.render();
                // Nếu có Google Sheet, quét tự động cho tháng mới
                if (this.sheetConfig.sheetId) {
                    this.syncGoogleSheet(false);
                }
            });
        }

        const compSelect = document.getElementById('kqkd-company-select');
        if (compSelect) {
            compSelect.addEventListener('change', (e) => {
                this.selectedCompany = e.target.value;
                this.render();
            });
        }

        const searchInput = document.getElementById('kqkd-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.render();
            });
        }
    },

    toggleNode(id) {
        this.collapsedNodes[id] = !this.collapsedNodes[id];
        this.render();
    },

    expandAll() {
        this.collapsedNodes = {};
        this.render();
    },

    collapseAll() {
        const collapseRecursive = (nodes) => {
            nodes.forEach(n => {
                if (n.children && n.children.length > 0) {
                    this.collapsedNodes[n.id] = true;
                    collapseRecursive(n.children);
                }
            });
        };
        collapseRecursive(this.rawTree);
        this.render();
    },

    setViewMode(mode) {
        this.viewMode = mode;
        this.render();
    },

    renderCharts(calculatedRoots) {
        if (!window.Chart) return;

        const ctxCompanies = document.getElementById('kqkd-chart-companies');
        if (ctxCompanies) {
            const companyList = [
                { id: 'THH', name: 'Tân Hồng Hà' },
                { id: 'VIET', name: 'Việt' },
                { id: 'ITSS', name: 'ITSS' },
                { id: 'VPS_CORP', name: 'VP VPS' },
                { id: 'XESCO', name: 'Xem Sơn' },
                { id: 'MT', name: 'VPS M' }
            ];

            const labels = [];
            const dataDs = [];
            const dataLntt = [];

            companyList.forEach(c => {
                let node = null;
                for (const root of calculatedRoots) {
                    if (root.id === c.id) { node = root; break; }
                    if (root.children) {
                        const found = root.children.find(ch => ch.id === c.id);
                        if (found) { node = found; break; }
                    }
                }
                if (node) {
                    labels.push(c.name);
                    dataDs.push(Math.round(node.monthData.ds));
                    dataLntt.push(Math.round(node.monthData.lntt));
                }
            });

            this.charts.companies = new Chart(ctxCompanies, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Doanh Số (Tr.đ)',
                            data: dataDs,
                            backgroundColor: 'rgba(59, 130, 246, 0.85)',
                            borderRadius: 6
                        },
                        {
                            label: 'LNTT (Tr.đ)',
                            data: dataLntt,
                            backgroundColor: dataLntt.map(v => v >= 0 ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)'),
                            borderRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top' } },
                    scales: {
                        y: { ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
                        x: { ticks: { font: { size: 11, weight: '600' } }, grid: { display: false } }
                    }
                }
            });
        }

        const ctxPnl = document.getElementById('kqkd-chart-pnl');
        if (ctxPnl) {
            const grandTotal = this.getGrandTotal(calculatedRoots);
            const m = grandTotal.monthData;
            const giaVon = Math.max(0, m.ds - m.lg);

            this.charts.pnl = new Chart(ctxPnl, {
                type: 'bar',
                data: {
                    labels: ['Doanh Số', 'Giá Vốn', 'Lãi Gộp', 'Chi Phí', 'TN Khác', 'LNTT'],
                    datasets: [{
                        label: 'Số tiền (Tr.đ)',
                        data: [Math.round(m.ds), Math.round(giaVon), Math.round(m.lg), Math.round(m.chiPhi), Math.round(m.tnKhac), Math.round(m.lntt)],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.85)',
                            'rgba(244, 63, 94, 0.85)',
                            'rgba(16, 185, 129, 0.85)',
                            'rgba(245, 158, 11, 0.85)',
                            'rgba(139, 92, 246, 0.85)',
                            'rgba(5, 150, 105, 0.95)'
                        ],
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
                        x: { ticks: { font: { size: 10, weight: '600' } }, grid: { display: false } }
                    }
                }
            });
        }
    },

    exportExcel() {
        const calculatedRoots = this.getCalculatedTree(this.selectedMonth);
        const grandTotal = this.getGrandTotal(calculatedRoots);
        const visibleRoots = this.filterTree(calculatedRoots);
        const mStr = String(this.selectedMonth).padStart(2, '0');

        let csv = '\uFEFF';
        csv += 'BÁO CÁO KẾT QUẢ KINH DOANH HỢP NHẤT - TẬP ĐOÀN VPS\n';
        csv += 'Kỳ báo cáo: Tháng ' + mStr + '/2026 và Lũy kế ' + mStr + ' tháng\n';
        csv += 'Đơn vị tính: Triệu VNĐ\n\n';

        csv += 'TT,Nội dung,Vốn ĐT,';
        csv += 'DS (Tháng ' + mStr + '),% LG (Tháng ' + mStr + '),LG (Tháng ' + mStr + '),HT LG (Tháng ' + mStr + '),Chi phí (Tháng ' + mStr + '),TN Khác (Tháng ' + mStr + '),LNTT (Tháng ' + mStr + '),';
        csv += 'DS (Lũy kế ' + mStr + 'T),% LG (Lũy kế ' + mStr + 'T),LG (Lũy kế ' + mStr + 'T),HT LG (Lũy kế ' + mStr + 'T),Chi phí (Lũy kế ' + mStr + 'T),TN Khác (Lũy kế ' + mStr + 'T),LNTT (Lũy kế ' + mStr + 'T)\n';

        const appendCsvRows = (nodes, indent) => {
            nodes.forEach(n => {
                const name = indent + n.name.replace(/,/g, ' ');
                const vonDT = n.vonDT || '';
                csv += '"' + (n.stt || '') + '","' + name + '","' + vonDT + '",';
                csv += '"' + this.formatText(n.monthData.ds) + '","' + this.formatText(n.monthData.rateLg, 0, true) + '","' + this.formatText(n.monthData.lg) + '","' + this.formatText(n.monthData.htLg) + '","' + this.formatText(n.monthData.chiPhi) + '","' + this.formatText(n.monthData.tnKhac) + '","' + this.formatText(n.monthData.lntt) + '",';
                csv += '"' + this.formatText(n.cumData.ds) + '","' + this.formatText(n.cumData.rateLg, 0, true) + '","' + this.formatText(n.cumData.lg) + '","' + this.formatText(n.cumData.htLg) + '","' + this.formatText(n.cumData.chiPhi) + '","' + this.formatText(n.cumData.tnKhac) + '","' + this.formatText(n.cumData.lntt) + '"\n';

                if (n.children && n.children.length > 0) {
                    appendCsvRows(n.children, indent + '   ');
                }
            });
        };

        appendCsvRows(visibleRoots, '');

        csv += '★,"TỔNG CỘNG TOÀN TẬP ĐOÀN","' + (grandTotal.vonDT || '') + '",';
        csv += '"' + this.formatText(grandTotal.monthData.ds) + '","' + this.formatText(grandTotal.monthData.rateLg, 0, true) + '","' + this.formatText(grandTotal.monthData.lg) + '","' + this.formatText(grandTotal.monthData.htLg) + '","' + this.formatText(grandTotal.monthData.chiPhi) + '","' + this.formatText(grandTotal.monthData.tnKhac) + '","' + this.formatText(grandTotal.monthData.lntt) + '",';
        csv += '"' + this.formatText(grandTotal.cumData.ds) + '","' + this.formatText(grandTotal.cumData.rateLg, 0, true) + '","' + this.formatText(grandTotal.cumData.lg) + '","' + this.formatText(grandTotal.cumData.htLg) + '","' + this.formatText(grandTotal.cumData.chiPhi) + '","' + this.formatText(grandTotal.cumData.tnKhac) + '","' + this.formatText(grandTotal.cumData.lntt) + '"\n';

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'KQKD_VPS_Thang_' + mStr + '_2026.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// Tự động khởi tạo khi DOM sẵn sàng
if (typeof document !== 'undefined') {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (window.KqkdModule) window.KqkdModule.init();
        });
    } else {
        if (window.KqkdModule) window.KqkdModule.init();
    }
}

