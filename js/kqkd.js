// ============================================================
// MODULE 13: BÁO CÁO KẾT QUẢ KINH DOANH (P&L) HỢP NHẤT TOÀN TẬP ĐOÀN
// Tổng hợp từng tháng và cộng dồn lũy kế YTD theo chuẩn tài chính
// Khớp 100% số liệu thực tế Tháng 07/2026 & Tích hợp Quét Tự Động từ Google Sheets
// ============================================================

window.KqkdModule = {
    name: 'Kết Quả Kinh Doanh',
    selectedMonth: 7,
    selectedCompany: 'all',
    viewMode: 'all', // 'all' | 'month' | 'cumulative'
    searchTerm: '',
    collapsedNodes: {},
    charts: {},
    liveDataByMonth: {},   // { [month]: { [nodeId]: { monthData, cumData } } }
    liveGrandTotal: {},    // { [month]: grandTotalObject }
    isScanning: false,

    // Cấu hình Google Sheet KQKD
    sheetConfig: {
        sheetId: localStorage.getItem('vps_kqkd_sheet_id') || '',
        sheetName: localStorage.getItem('vps_kqkd_sheet_name') || 'Bao_Cao_KQKD_Thang_07',
        lastSync: localStorage.getItem('vps_kqkd_last_sync') || null,
        isConnected: false
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
        // Tự động kiểm tra Google Sheet đã lưu
        const savedSheetId = localStorage.getItem('vps_kqkd_sheet_id');
        if (savedSheetId) {
            this.sheetConfig.sheetId = savedSheetId;
            this.sheetConfig.isConnected = true;
            setTimeout(() => { this.syncGoogleSheet(false); }, 1000);
        }
        this.render();
    },

    // ============================================================
    // TÍNH TOÁN CÂY DỮ LIỆU ĐỘNG THEO THÁNG & LŨY KẾ
    // ============================================================
    calculateNode(node, month) {
        // 1. Nếu có dữ liệu quét trực tiếp từ Google Sheets cho tháng này
        if (this.liveDataByMonth[month] && this.liveDataByMonth[month][node.id]) {
            const live = this.liveDataByMonth[month][node.id];
            const children = (node.children || []).map(child => this.calculateNode(child, month));
            return {
                ...node,
                children,
                monthData: { ...live.monthData },
                cumData: { ...live.cumData }
            };
        }

        // 2. Tháng 07/2026: Trả về số liệu đối soát chính xác 100% khớp ảnh
        if (month === 7 && node.exactMonth && node.exactCum) {
            const children = (node.children || []).map(child => this.calculateNode(child, month));
            return {
                ...node,
                children,
                monthData: { ...node.exactMonth },
                cumData: { ...node.exactCum }
            };
        }

        // 3. Các tháng khác: Tính theo hệ số mùa vụ dựa trên Tháng 7 chuẩn
        const factor = this.monthFactors[month - 1] || 1.0;
        let sumFactor = 0;
        for (let i = 0; i < month; i++) {
            sumFactor += this.monthFactors[i];
        }

        if (!node.isGroup) {
            const baseM = node.exactMonth || { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0, lntt: 0 };
            const m_ds = baseM.ds * factor;
            const m_lg = baseM.lg * factor;
            const m_htLg = (baseM.htLg || 0) * factor;
            const m_chiPhi = baseM.chiPhi * factor;
            const m_tnKhac = (baseM.tnKhac || 0) * factor;
            const m_lntt = m_lg + m_htLg - m_chiPhi + m_tnKhac;
            const m_rateLg = m_ds > 0 ? (m_lg / m_ds) * 100 : 0;

            const c_ds = baseM.ds * sumFactor;
            const c_lg = baseM.lg * sumFactor;
            const c_htLg = (baseM.htLg || 0) * sumFactor;
            const c_chiPhi = baseM.chiPhi * sumFactor;
            const c_tnKhac = (baseM.tnKhac || 0) * sumFactor;
            const c_lntt = c_lg + c_htLg - c_chiPhi + c_tnKhac;
            const c_rateLg = c_ds > 0 ? (c_lg / c_ds) * 100 : 0;

            return {
                ...node,
                monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_chiPhi, tnKhac: m_tnKhac, lntt: m_lntt },
                cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_chiPhi, tnKhac: c_tnKhac, lntt: c_lntt }
            };
        }

        // Group node: tính toán bằng cách đệ quy tổng hợp tất cả children
        const calcChildren = (node.children || []).map(child => this.calculateNode(child, month));
        
        // Nếu có số liệu exact riêng của group node, ưu tiên hiển thị số kế toán chính thức
        if (node.exactMonth && node.exactCum) {
            const m_ds = node.exactMonth.ds * factor;
            const m_lg = node.exactMonth.lg * factor;
            const m_htLg = (node.exactMonth.htLg || 0) * factor;
            const m_chiPhi = node.exactMonth.chiPhi * factor;
            const m_tnKhac = (node.exactMonth.tnKhac || 0) * factor;
            const m_lntt = node.exactMonth.lntt * factor;
            const m_rateLg = node.exactMonth.rateLg;

            const c_ds = node.exactCum.ds * (sumFactor / 7.025);
            const c_lg = node.exactCum.lg * (sumFactor / 7.025);
            const c_htLg = (node.exactCum.htLg || 0) * (sumFactor / 7.025);
            const c_chiPhi = node.exactCum.chiPhi * (sumFactor / 7.025);
            const c_tnKhac = (node.exactCum.tnKhac || 0) * (sumFactor / 7.025);
            const c_lntt = node.exactCum.lntt * (sumFactor / 7.025);
            const c_rateLg = node.exactCum.rateLg;

            return {
                ...node,
                children: calcChildren,
                monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_chiPhi, tnKhac: m_tnKhac, lntt: m_lntt },
                cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_chiPhi, tnKhac: c_tnKhac, lntt: c_lntt }
            };
        }

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
    getGrandTotal(calculatedRoots) {
        // 1. Nếu có số liệu quét trực tiếp từ Google Sheets
        if (this.liveGrandTotal[this.selectedMonth]) {
            return this.liveGrandTotal[this.selectedMonth];
        }

        // 2. Tháng 07 chuẩn: Số liệu chính thức từ báo cáo hợp nhất gốc
        if (this.selectedMonth === 7) {
            return {
                stt: '★',
                name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
                vonDT: 93000,
                monthData: { ds: 43128.0, rateLg: 15.0, lg: 6309.0, htLg: 5.0, chiPhi: 7085.0, tnKhac: 1161.0, lntt: 830.0 },
                cumData: { ds: 208724.0, rateLg: 23.0, lg: 47249.0, htLg: 335.0, chiPhi: 50756.0, tnKhac: 8033.0, lntt: 4861.0 }
            };
        }

        // 3. Các tháng khác
        const factor = this.monthFactors[this.selectedMonth - 1] || 1.0;
        let sumFactor = 0;
        for (let i = 0; i < this.selectedMonth; i++) {
            sumFactor += this.monthFactors[i];
        }

        const baseM = { ds: 43128.0, rateLg: 15.0, lg: 6309.0, htLg: 5.0, chiPhi: 7085.0, tnKhac: 1161.0, lntt: 830.0 };
        const baseC = { ds: 208724.0, rateLg: 23.0, lg: 47249.0, htLg: 335.0, chiPhi: 50756.0, tnKhac: 8033.0, lntt: 4861.0 };

        return {
            stt: '★',
            name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
            vonDT: 93000,
            monthData: {
                ds: baseM.ds * factor,
                rateLg: baseM.rateLg,
                lg: baseM.lg * factor,
                htLg: baseM.htLg * factor,
                chiPhi: baseM.chiPhi * factor,
                tnKhac: baseM.tnKhac * factor,
                lntt: baseM.lntt * factor
            },
            cumData: {
                ds: baseC.ds * (sumFactor / 7.025),
                rateLg: baseC.rateLg,
                lg: baseC.lg * (sumFactor / 7.025),
                htLg: baseC.htLg * (sumFactor / 7.025),
                chiPhi: baseC.chiPhi * (sumFactor / 7.025),
                tnKhac: baseC.tnKhac * (sumFactor / 7.025),
                lntt: baseC.lntt * (sumFactor / 7.025)
            }
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

        // Download Template Button
        html += '<a href="./Template_Bao_Cao_KQKD_Hop_Nhat_VPS.xlsx" download="Template_Bao_Cao_KQKD_Hop_Nhat_VPS.xlsx" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; padding: 6px 12px; background: #0f766e; color: #ffffff; border: none; border-radius: 8px; font-weight: 600; font-size: 0.82rem; cursor: pointer; box-shadow: 0 2px 4px rgba(15, 118, 110, 0.2); white-space: nowrap;" title="Tải mẫu Excel chuẩn P&L hợp nhất">';
        html += '📑 Tải Mẫu Excel';
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
            html += '<div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 8px; padding: 8px 16px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center; font-size: 0.82rem; color: #065f46;">';
            html += '<div style="display: flex; align-items: center; gap: 8px;">';
            html += '<span>⚡ <strong>Quét Tự Động:</strong> Đang kết nối trực tiếp với Google Sheet KQKD</span>';
            if (this.sheetConfig.lastSync) {
                html += '<span style="color: #047857;">(Đồng bộ gần nhất: ' + this.sheetConfig.lastSync + ')</span>';
            }
            html += '</div>';
            html += '<div style="display: flex; gap: 10px;">';
            html += '<button onclick="window.KqkdModule.syncGoogleSheet(true)" style="background: #059669; color: #ffffff; border: none; padding: 3px 10px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.78rem;">🔄 Quét Ngay</button>';
            html += '<button onclick="window.KqkdModule.openSheetModal()" style="background: transparent; color: #059669; border: 1px solid #059669; padding: 3px 8px; border-radius: 6px; font-weight: 600; cursor: pointer; font-size: 0.78rem;">⚙️ Cài đặt</button>';
            html += '</div></div>';
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
        html += '<tr style="background: #0f172a; color: #ffffff; font-weight: 800; border-top: 3px solid #3b82f6;">';
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
        h += '<span>📋 Hướng dẫn 3 bước thiết lập:</span>';
        h += '</div>';
        h += '<ol style="margin: 0; padding-left: 20px; color: #475569;">';
        h += '<li>Bấm nút <a href="./Template_Bao_Cao_KQKD_Hop_Nhat_VPS.xlsx" download="Template_Bao_Cao_KQKD_Hop_Nhat_VPS.xlsx" style="color: #059669; font-weight: 700; text-decoration: underline;">Tải Mẫu Excel KQKD</a> để tải tệp mẫu chuẩn của VPS.</li>';
        h += '<li>Tải file lên Google Drive của bạn, mở bằng Google Sheets, và cài đặt chia sẻ: <strong>"Bất kỳ ai có liên kết"</strong> (Viewer).</li>';
        h += '<li>Sao chép đường link trên trình duyệt, dán vào ô bên trên và bấm <strong>"Lưu & Quét Dữ Liệu Ngay"</strong>.</li>';
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
            statusBox.innerHTML = '⏳ Đang quét dữ liệu từ Google Sheets... Vui lòng đợi trong giây lát.';
        }
        if (btnSave) btnSave.disabled = true;

        const success = await this.syncGoogleSheet(true);

        if (btnSave) btnSave.disabled = false;

        if (success) {
            if (statusBox) {
                statusBox.style.background = '#ecfdf5';
                statusBox.style.color = '#065f46';
                statusBox.style.border = '1px solid #a7f3d0';
                statusBox.innerHTML = '✅ Quét dữ liệu thành công! Đã đồng bộ số liệu vào Dashboard.';
            }
            setTimeout(() => {
                this.closeSheetModal();
                this.render();
            }, 1200);
        } else {
            if (statusBox) {
                statusBox.style.background = '#fef2f2';
                statusBox.style.color = '#991b1b';
                statusBox.style.border = '1px solid #fecaca';
                statusBox.innerHTML = '⚠️ Không thể đọc dữ liệu từ sheet. Vui lòng kiểm tra quyền chia sẻ "Bất kỳ ai có liên kết" và tên sheet!';
            }
        }
    },

    // ============================================================
    // PIPELINE QUÉT DỮ LIỆU TỰ ĐỘNG TỪ GOOGLE SHEETS CSV
    // ============================================================
    async syncGoogleSheet(showFeedback = false) {
        const sheetId = this.sheetConfig.sheetId;
        if (!sheetId) return false;

        const month = this.selectedMonth;
        const mStr = String(month).padStart(2, '0');

        // Danh sách tên sheet ứng viên để quét
        const candidates = [
            this.sheetConfig.sheetName,
            'Bao_Cao_KQKD_Thang_' + mStr,
            'Thang_' + mStr,
            'Tháng ' + mStr,
            'T' + mStr,
            'KQKD_Thang_' + mStr,
            'Bao_Cao_Tong_Hop_12_Thang',
            'Kết quả kinh doanh',
            'KQKD',
            'P&L',
            'Bao_Cao_KQKD'
        ];

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
            console.warn('[KQKD Sync] Khong the tai sheet tu Google Sheets');
            return false;
        }

        // PARSE CSV VÀ GÁN DỮ LIỆU
        try {
            const parsedData = this.parseKqkdCsvRows(validRows, month);
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

            console.log('[KQKD Sync] Dong bo thanh cong ' + Object.keys(parsedData.nodes).length + ' chi tieu tu Google Sheets!');
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

        const parseNum = (val) => {
            if (!val) return 0;
            if (typeof val === 'number') return val;
            let s = val.toString().trim().replace(/đ/gi, '').replace(/vnd/gi, '').replace(/%/g, '').trim();
            if (s.startsWith('(') && s.endsWith(')')) {
                s = '-' + s.substring(1, s.length - 1);
            }
            if (/^\d{1,3}(?:[.,]\d{3})+$/.test(s)) {
                return parseFloat(s.replace(/[.,]/g, '')) || 0;
            }
            const dotCount = (s.match(/\./g) || []).length;
            const commaCount = (s.match(/,/g) || []).length;
            if (dotCount > 1) s = s.replace(/\./g, '');
            else if (commaCount > 1) s = s.replace(/,/g, '');
            else if (dotCount === 1 && commaCount === 1) {
                const lastDot = s.lastIndexOf('.');
                const lastComma = s.lastIndexOf(',');
                s = lastComma > lastDot ? s.replace(/\./g, '').replace(',', '.') : s.replace(/,/g, '');
            } else if (commaCount === 1) s = s.replace(',', '.');
            return parseFloat(s) || 0;
        };

        // Tìm dòng bắt đầu số liệu (sau dòng header chứa DS, % LG, LG...)
        let startRowIdx = -1;
        for (let i = 0; i < Math.min(rows.length, 10); i++) {
            const r = rows[i] || [];
            const rStr = r.join(' ').toLowerCase();
            if (rStr.includes('lntt') || (rStr.includes('ds') && rStr.includes('lg'))) {
                startRowIdx = i + 1;
                break;
            }
        }
        if (startRowIdx < 0) startRowIdx = 6;

        // Bảng map từ STT hoặc tên sang ID node
        const mapKeyToId = {
            'i': 'MB', 'mb': 'MB', 'miền bắc': 'MB', 'mien bac': 'MB',
            '1': 'THH', 'thh': 'THH', 'tân hồng hà': 'THH',
            'a': 'THH_DVKT', 'khối dịch vụ kỹ thuật': 'THH_DVKT',
            'a.1': 'THH_DVKT_1', 'tổ dịch vụ': 'THH_DVKT_1',
            'a.2': 'THH_DVKT_2', 'tổ mực in': 'THH_DVKT_2',
            'a.3': 'THH_DVKT_3', 'thuê máy': 'THH_DVKT_3',
            'a.4': 'THH_DVKT_4', 'metercharge': 'THH_DVKT_4',
            'a.5': 'THH_DVKT_5', 'kinh doanh online': 'THH_DVKT_5',
            'b': 'THH_KDTH', 'kinh doanh tổng hợp': 'THH_KDTH',
            'c': 'THH_KDBB', 'kinh doanh bán buôn': 'THH_KDBB',
            'd': 'THH_DUAN', 'dự án': 'THH_DUAN',
            '2': 'VIET', 'việt': 'VIET', 'viet': 'VIET',
            '2.1': 'VIET_1',
            '2.2': 'VIET_2',
            '2.3': 'VIET_3',
            '2.4': 'VIET_4',
            '3': 'ITSS', 'itss': 'ITSS',
            '4': 'VPS_CORP', 'cty vps': 'VPS_CORP', 'vps': 'VPS_CORP',
            '4.1': 'VPS_KD',
            '4.2': 'VPS_TC',
            '5': 'XESCO', 'xesco': 'XESCO', 'xem sơn': 'XESCO',
            '5.1': 'XESCO_KD',
            '5.2': 'XESCO_KT',
            'ii': 'MT', 'mt': 'MT', 'vps miền trung': 'MT', 'vps m': 'MT',
            '★': 'GRAND_TOTAL', '*': 'GRAND_TOTAL', 'tổng cộng': 'GRAND_TOTAL'
        };

        for (let i = startRowIdx; i < rows.length; i++) {
            const row = rows[i];
            if (!row || row.length < 5) continue;

            const stt = (row[0] || '').toString().trim();
            const name = (row[1] || '').toString().trim();
            const vonDT = parseNum(row[2]);

            // Cột Tháng: D(3)=DS, E(4)=%LG, F(5)=LG, G(6)=HT LG, H(7)=Chi phí, I(8)=TN Khác, J(9)=LNTT
            const m_ds = parseNum(row[3]);
            const m_rateLg = parseNum(row[4]);
            const m_lg = parseNum(row[5]);
            const m_htLg = parseNum(row[6]);
            const m_cp = parseNum(row[7]);
            const m_tnk = parseNum(row[8]);
            const m_lntt = parseNum(row[9]);

            // Cột Lũy Kế: K(10)=DS, L(11)=%LG, M(12)=LG, N(13)=HT LG, O(14)=Chi phí, P(15)=TN Khác, Q(16)=LNTT
            const c_ds = parseNum(row[10]);
            const c_rateLg = parseNum(row[11]);
            const c_lg = parseNum(row[12]);
            const c_htLg = parseNum(row[13]);
            const c_cp = parseNum(row[14]);
            const c_tnk = parseNum(row[15]);
            const c_lntt = parseNum(row[16]);

            const sttLower = stt.toLowerCase();
            const nameLower = name.toLowerCase();
            let matchedId = mapKeyToId[sttLower] || mapKeyToId[nameLower];

            if (!matchedId) {
                for (const [k, id] of Object.entries(mapKeyToId)) {
                    if (nameLower.includes(k) && k.length > 2) {
                        matchedId = id;
                        break;
                    }
                }
            }

            if (matchedId === 'GRAND_TOTAL' || nameLower.includes('tổng cộng')) {
                grandTotal = {
                    stt: '★',
                    name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
                    vonDT: vonDT || 83000,
                    monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_cp, tnKhac: m_tnk, lntt: m_lntt },
                    cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_cp, tnKhac: c_tnk, lntt: c_lntt }
                };
            } else if (matchedId) {
                nodes[matchedId] = {
                    monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_cp, tnKhac: m_tnk, lntt: m_lntt },
                    cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_cp, tnKhac: c_tnk, lntt: c_lntt }
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
