/**
 * ============================================================
 * Revenue Module & Department Dashboard
 * Mục 2: Doanh Số Lãi Gộp Công Ty & Dashboard 8 Phòng Ban / Mảng Kinh Doanh (Tháng & Năm)
 * ============================================================
 */

window.RevenueModule = {
    currentTab: 'company', // 'company' | 'department'
    currentDeptCompany: 'all',
    currentDeptMonth: '9', // Mặc định tháng 9/2026
    currentDeptWeek: 'all', // 'all' | '1' | '2' | '3' | '4' | '5'
    currentDeptMode: 'month', // 'month' | 'week' | 'year'
    expandedRows: new Set(),
    deptCharts: {},

    // ── KHO LƯU TRỮ DỮ LIỆU ĐA KỲ & CÁC TUẦN (BẢO TOÀN DỮ LIỆU LỊCH SỬ THÁNG 9) ──
    PERIOD_STORE: {
        '8': {
            name: 'Tháng 08/2026 (Chốt sổ)',
            isClosed: true
        },
        '9': {
            name: 'Tháng 09/2026 (Chốt sổ)',
            isClosed: true,
            // Số liệu thực tế tháng 9 chuẩn xác từ các đơn vị đã quét
            actualsByCompDept: {
                'XemSon': {
                    'phan_phoi': { ds: 3279, lg: 612 },
                    'thue_may':  { ds: 2166, lg: 1365 },
                    'dich_vu':   { ds: 1161, lg: 508 },
                    'online':    { ds: 3918, lg: 113 },
                    'du_an':     { ds: 3426, lg: 1245 },
                    'ban_le':    { ds: 191, lg: 49 },
                    'khac':      { ds: 0, lg: 0 }
                },
                'THH': {
                    'phan_phoi': { ds: 3616, lg: 479 },
                    'thue_may':  { ds: 685, lg: 343 },
                    'dich_vu':   { ds: 1894, lg: 566 },
                    'online':    { ds: 102, lg: 12 },
                    'du_an':     { ds: 1415, lg: 310 },
                    'kdth':      { ds: 1248, lg: 177 }
                },
                'Viet': {
                    'thue_may':  { ds: 1546, lg: 910 },
                    'online':    { ds: 3764, lg: 241 },
                    'kdth':      { ds: 2213, lg: 166 },
                    'ban_le':    { ds: 90.37, lg: 61.81 },
                    'khac':      { ds: 11.1, lg: 0.13 }
                },
                'VPSM': {
                    'phan_phoi': { ds: 1050, lg: 67 },
                    'thue_may':  { ds: 80, lg: 20 },
                    'dich_vu':   { ds: 280, lg: 130 },
                    'online':    { ds: 105, lg: 3 },
                    'ban_le':    { ds: 5, lg: 1 }
                },
                'ITSS': {
                    'du_an':     { ds: 597, lg: 162 }
                },
                'VPVPS': {
                    'khac':      { ds: 7386, lg: 288 }
                }
            },
            weekWeights: { '1': 0.22, '2': 0.24, '3': 0.26, '4': 0.28, '5': 0.0 }
        },
        '10': {
            name: 'Tháng 10/2026 (Kỳ hiện tại)',
            isClosed: false,
            // Số liệu từng tuần độc lập của Tháng 10
            weeks: {
                '1': {
                    label: 'Tuần 1 (01/10 - 07/10)',
                    byCompDept: {
                        'XemSon': {
                            'phan_phoi': { ds: 825, lg: 155 },
                            'thue_may':  { ds: 545, lg: 342 },
                            'dich_vu':   { ds: 295, lg: 128 },
                            'online':    { ds: 980, lg: 29 },
                            'du_an':     { ds: 860, lg: 310 },
                            'ban_le':    { ds: 50, lg: 13 }
                        },
                        'THH': {
                            'phan_phoi': { ds: 920, lg: 122 },
                            'thue_may':  { ds: 175, lg: 89 },
                            'dich_vu':   { ds: 490, lg: 145 },
                            'online':    { ds: 28, lg: 3 },
                            'du_an':     { ds: 360, lg: 80 },
                            'kdth':      { ds: 315, lg: 45 }
                        },
                        'Viet': {
                            'thue_may':  { ds: 390, lg: 230 },
                            'online':    { ds: 945, lg: 62 },
                            'kdth':      { ds: 555, lg: 42 },
                            'ban_le':    { ds: 25, lg: 16 },
                            'khac':      { ds: 3, lg: 0.1 }
                        },
                        'VPSM': {
                            'phan_phoi': { ds: 265, lg: 17 },
                            'thue_may':  { ds: 21, lg: 5 },
                            'dich_vu':   { ds: 72, lg: 33 },
                            'online':    { ds: 27, lg: 1 }
                        },
                        'ITSS': {
                            'du_an':     { ds: 155, lg: 42 }
                        },
                        'VPVPS': {
                            'khac':      { ds: 780, lg: 94 }
                        }
                    }
                },
                '2': {
                    label: 'Tuần 2 (08/10 - 14/10)',
                    byCompDept: {
                        'XemSon': {
                            'phan_phoi': { ds: 840, lg: 158 },
                            'thue_may':  { ds: 550, lg: 345 },
                            'dich_vu':   { ds: 302, lg: 131 },
                            'online':    { ds: 995, lg: 31 },
                            'du_an':     { ds: 880, lg: 318 },
                            'ban_le':    { ds: 52, lg: 14 }
                        },
                        'THH': {
                            'phan_phoi': { ds: 950, lg: 128 },
                            'thue_may':  { ds: 180, lg: 92 },
                            'dich_vu':   { ds: 510, lg: 152 },
                            'online':    { ds: 30, lg: 4 },
                            'du_an':     { ds: 375, lg: 84 },
                            'kdth':      { ds: 330, lg: 48 }
                        },
                        'Viet': {
                            'thue_may':  { ds: 395, lg: 235 },
                            'online':    { ds: 960, lg: 64 },
                            'kdth':      { ds: 565, lg: 44 },
                            'ban_le':    { ds: 26, lg: 17 }
                        },
                        'VPSM': {
                            'phan_phoi': { ds: 270, lg: 18 },
                            'thue_may':  { ds: 22, lg: 6 },
                            'dich_vu':   { ds: 75, lg: 35 },
                            'online':    { ds: 28, lg: 1.2 }
                        },
                        'ITSS': {
                            'du_an':     { ds: 160, lg: 44 }
                        },
                        'VPVPS': {
                            'khac':      { ds: 795, lg: 96 }
                        }
                    }
                },
                '3': { label: 'Tuần 3 (15/10 - 21/10)', byCompDept: {} },
                '4': { label: 'Tuần 4 (22/10 - 28/10)', byCompDept: {} },
                '5': { label: 'Tuần 5 (29/10 - 31/10)', byCompDept: {} }
            }
        }
    },

    // ── 7 Phòng ban chuẩn hóa toàn Tập Đoàn VPS ──
    DEPARTMENTS: [
        {
            id: 'phan_phoi',
            num: '1',
            name: 'Kinh doanh phân phối',
            shortName: 'Phân phối',
            icon: 'truck',
            color: '#2563eb',
            bgColor: 'rgba(37, 99, 235, 0.1)',
            desc: 'Bán buôn máy, linh kiện, KD sỉ',
            // Phân bổ tỷ trọng kế hoạch năm (Triệu VNĐ)
            plans: {
                'THH':    { ds: 45000, lg: 4500, lg_pct: 10 },
                'Viet':   { ds: 0, lg: 0, lg_pct: 0 },
                'XemSon': { ds: 66000, lg: 6300, lg_pct: 10 },
                'VPSM':   { ds: 13500, lg: 1350, lg_pct: 10 },
                'ITSS':   { ds: 0, lg: 0, lg_pct: 0 },
                'VPVPS':  { ds: 0, lg: 0, lg_pct: 0 }
            }
        },
        {
            id: 'thue_may',
            num: '2',
            name: 'Thuê Máy',
            shortName: 'Thuê máy',
            icon: 'printer',
            color: '#10b981',
            bgColor: 'rgba(16, 185, 129, 0.1)',
            desc: 'Thuê máy kỹ thuật & KD thuê máy',
            plans: {
                'THH':    { ds: 7000, lg: 2450, lg_pct: 35 },
                'Viet':   { ds: 18500, lg: 10730, lg_pct: 58 },
                'XemSon': { ds: 42000, lg: 25480, lg_pct: 61 },
                'VPSM':   { ds: 1200, lg: 780, lg_pct: 65 },
                'ITSS':   { ds: 0, lg: 0, lg_pct: 0 },
                'VPVPS':  { ds: 0, lg: 0, lg_pct: 0 }
            }
        },
        {
            id: 'dich_vu',
            num: '3',
            name: 'Dịch Vụ',
            shortName: 'Dịch vụ',
            icon: 'wrench',
            color: '#f59e0b',
            bgColor: 'rgba(245, 158, 11, 0.1)',
            desc: 'DVKT, Tổ dịch vụ, mực in, metercharge',
            plans: {
                'THH':    { ds: 20000, lg: 7600, lg_pct: 38 },
                'Viet':   { ds: 0, lg: 0, lg_pct: 0 },
                'XemSon': { ds: 26000, lg: 8580, lg_pct: 33 },
                'VPSM':   { ds: 3500, lg: 1820, lg_pct: 52 },
                'ITSS':   { ds: 0, lg: 0, lg_pct: 0 },
                'VPVPS':  { ds: 0, lg: 0, lg_pct: 0 }
            }
        },
        {
            id: 'online',
            num: '4',
            name: 'Kinh doanh online',
            shortName: 'Online',
            icon: 'globe',
            color: '#8b5cf6',
            bgColor: 'rgba(139, 92, 246, 0.1)',
            desc: 'E-commerce, Shopee-Online, trực tuyến',
            plans: {
                'THH':    { ds: 1500, lg: 75, lg_pct: 5 },
                'Viet':   { ds: 30500, lg: 1830, lg_pct: 6 },
                'XemSon': { ds: 24000, lg: 1200, lg_pct: 5 },
                'VPSM':   { ds: 1400, lg: 84, lg_pct: 6 },
                'ITSS':   { ds: 0, lg: 0, lg_pct: 0 },
                'VPVPS':  { ds: 0, lg: 0, lg_pct: 0 }
            }
        },
        {
            id: 'du_an',
            num: '5',
            name: 'Dự án',
            shortName: 'Dự án',
            icon: 'briefcase',
            color: '#ec4899',
            bgColor: 'rgba(236, 72, 153, 0.1)',
            desc: 'Dự án văn phòng, CNTT, thiết bị',
            plans: {
                'THH':    { ds: 22000, lg: 8800, lg_pct: 40 },
                'Viet':   { ds: 0, lg: 0, lg_pct: 0 },
                'XemSon': { ds: 0, lg: 0, lg_pct: 0 },
                'VPSM':   { ds: 0, lg: 0, lg_pct: 0 },
                'ITSS':   { ds: 5500, lg: 2035, lg_pct: 37 },
                'VPVPS':  { ds: 0, lg: 0, lg_pct: 0 }
            }
        },
        {
            id: 'kdth',
            num: '6',
            name: 'Kinh doanh tổng hợp',
            shortName: 'KDTH',
            icon: 'layers',
            color: '#06b6d4',
            bgColor: 'rgba(6, 182, 212, 0.1)',
            desc: 'Kinh doanh tổng hợp thương mại',
            plans: {
                'THH':    { ds: 22500, lg: 2250, lg_pct: 10 },
                'Viet':   { ds: 23000, lg: 1840, lg_pct: 8 },
                'XemSon': { ds: 0, lg: 0, lg_pct: 0 },
                'VPSM':   { ds: 0, lg: 0, lg_pct: 0 },
                'ITSS':   { ds: 0, lg: 0, lg_pct: 0 },
                'VPVPS':  { ds: 0, lg: 0, lg_pct: 0 }
            }
        },
        {
            id: 'ban_le',
            num: '7',
            name: 'Kinh doanh lẻ',
            shortName: 'Bán lẻ',
            icon: 'shopping-bag',
            color: '#f97316',
            bgColor: 'rgba(249, 115, 22, 0.1)',
            desc: 'Cửa hàng, bán máy lẻ, showroom',
            plans: {
                'THH':    { ds: 0, lg: 0, lg_pct: 0 },
                'Viet':   { ds: 6000, lg: 900, lg_pct: 15 },
                'XemSon': { ds: 5500, lg: 1265, lg_pct: 23 },
                'VPSM':   { ds: 600, lg: 108, lg_pct: 18 },
                'ITSS':   { ds: 0, lg: 0, lg_pct: 0 },
                'VPVPS':  { ds: 0, lg: 0, lg_pct: 0 }
            }
        },
        {
            id: 'khac',
            num: '8',
            name: 'Kinh doanh khác',
            shortName: 'Khác',
            icon: 'more-horizontal',
            color: '#64748b',
            bgColor: 'rgba(100, 116, 139, 0.1)',
            desc: 'Bán nội bộ, thương mại khác, xuất khẩu',
            plans: {
                'THH':    { ds: 0, lg: 0, lg_pct: 0 },
                'Viet':   { ds: 600, lg: 75, lg_pct: 12.5 },
                'XemSon': { ds: 0, lg: 0, lg_pct: 0 },
                'VPSM':   { ds: 0, lg: 0, lg_pct: 0 },
                'ITSS':   { ds: 0, lg: 0, lg_pct: 0 },
                'VPVPS':  { ds: 36000, lg: 4320, lg_pct: 12 }
            }
        }
    ],

    // ── Chi tiết mảng con của từng đơn vị thuộc 7 phòng ban (Đồng bộ trực tiếp từ Google Sheets) ──
    DEPT_SUB_ITEMS: (typeof window !== 'undefined' && window.LIVE_GOOGLE_SHEETS_DATA && window.LIVE_GOOGLE_SHEETS_DATA.dept_7_sub_items && window.LIVE_GOOGLE_SHEETS_DATA.dept_7_sub_items.length > 0)
        ? window.LIVE_GOOGLE_SHEETS_DATA.dept_7_sub_items
        : [
        // 1. Phân phối
        { deptId: 'phan_phoi', comp: 'THH', name: 'Kinh doanh bán buôn', note: 'Phân phối đại lý miền Bắc', ytd_ds: 30362.0, ytd_lg: 2847.1, m8_ds: 5135.0, m8_lg: 572.0, plan_year_ds: 45000, plan_year_lg: 4500 },
        { deptId: 'phan_phoi', comp: 'XemSon', name: 'Kinh doanh bán buôn', note: 'Phân phối đại lý miền Nam', ytd_ds: 27002.0, ytd_lg: 4410.0, m8_ds: 4168.0, m8_lg: 682.0, plan_m_ds: 5500, plan_m_lg: 525, plan_year_ds: 66000, plan_year_lg: 6300 },
        { deptId: 'phan_phoi', comp: 'VPSM', name: 'Kinh doanh máy - bán buôn', note: 'Bán buôn máy VPS Miền Trung', ytd_ds: 6698.0, ytd_lg: 575.0, m8_ds: 810.0, m8_lg: 45.0, plan_year_ds: 10000, plan_year_lg: 900 },
        { deptId: 'phan_phoi', comp: 'VPSM', name: 'Kinh doanh linh kiện - bán buôn', note: 'Bán buôn linh kiện mực in', ytd_ds: 2028.0, ytd_lg: 312.0, m8_ds: 240.0, m8_lg: 22.0, plan_year_ds: 3500, plan_year_lg: 450 },

        // 2. Thuê máy
        { deptId: 'thue_may', comp: 'THH', name: 'Thuê máy Tân Hồng Hà', note: 'Cho thuê máy photocopy miền Bắc', ytd_ds: 4304.0, ytd_lg: 1424.8, m8_ds: 650.0, m8_lg: 233.0, plan_year_ds: 7000, plan_year_lg: 2450 },
        { deptId: 'thue_may', comp: 'Viet', name: 'Thuê máy Công ty Việt', note: 'Cho thuê máy Công ty Việt', ytd_ds: 12422.0, ytd_lg: 7195.0, m8_ds: 1546.0, m8_lg: 910.0, plan_year_ds: 18500, plan_year_lg: 10730 },
        { deptId: 'thue_may', comp: 'XemSon', name: 'Thuê máy Xem Sơn', note: 'Cho thuê máy photocopy miền Nam', ytd_ds: 16958.0, ytd_lg: 11264.0, m8_ds: 2078.0, m8_lg: 1337.0, plan_m_ds: 3500, plan_m_lg: 2123, plan_year_ds: 42000, plan_year_lg: 25480 },
        { deptId: 'thue_may', comp: 'VPSM', name: 'Thuê máy Miền Trung', note: 'Thuê máy khu vực miền Trung', ytd_ds: 743.0, ytd_lg: 496.0, m8_ds: 80.0, m8_lg: 20.0, plan_year_ds: 1200, plan_year_lg: 780 },

        // 3. Dịch vụ
        { deptId: 'dich_vu', comp: 'THH', name: 'Tổ Dịch vụ THH', note: 'Bảo trì bảo dưỡng sửa chữa', ytd_ds: 9304.0, ytd_lg: 3103.0, m8_ds: 959.0, m8_lg: 281.0, plan_year_ds: 14000, plan_year_lg: 5320 },
        { deptId: 'dich_vu', comp: 'THH', name: 'Tổ mực in THH', note: 'Cung cấp thay thế mực in', ytd_ds: 2319.0, ytd_lg: 1181.7, m8_ds: 354.0, m8_lg: 196.0, plan_year_ds: 3500, plan_year_lg: 1470 },
        { deptId: 'dich_vu', comp: 'THH', name: 'Metercharge THH', note: 'Dịch vụ thu phí bản in chụp', ytd_ds: 1684.0, ytd_lg: 873.0, m8_ds: 233.0, m8_lg: 141.0, plan_year_ds: 2500, plan_year_lg: 1250 },
        { deptId: 'dich_vu', comp: 'XemSon', name: 'Tổ Dịch vụ Xem Sơn', note: 'Kỹ thuật dịch vụ máy VP', ytd_ds: 9931.0, ytd_lg: 4063.0, m8_ds: 1295.0, m8_lg: 597.0, plan_m_ds: 2137, plan_m_lg: 715, plan_year_ds: 26000, plan_year_lg: 8580 },
        { deptId: 'dich_vu', comp: 'XemSon', name: 'Tổ mực In', note: 'Cung cấp thay thế mực in', ytd_ds: 0, ytd_lg: 0, m8_ds: 0, m8_lg: 0, plan_m_ds: 0, plan_m_lg: 0, plan_year_ds: 0, plan_year_lg: 0 },
        { deptId: 'dich_vu', comp: 'XemSon', name: 'Metercharge', note: 'Dịch vụ thu phí bản in chụp', ytd_ds: 0, ytd_lg: 0, m8_ds: 0, m8_lg: 0, plan_m_ds: 0, plan_m_lg: 0, plan_year_ds: 0, plan_year_lg: 0 },
        { deptId: 'dich_vu', comp: 'VPSM', name: 'Dịch vụ kỹ thuật VPSM', note: 'Bảo trì sửa chữa máy', ytd_ds: 1737.0, ytd_lg: 844.0, m8_ds: 220.0, m8_lg: 95.0, plan_year_ds: 2700, plan_year_lg: 1350 },
        { deptId: 'dich_vu', comp: 'VPSM', name: 'Dịch vụ toàn phần VPSM', note: 'Hợp đồng bảo trì trọn gói', ytd_ds: 478.0, ytd_lg: 324.0, m8_ds: 60.0, m8_lg: 35.0, plan_year_ds: 800, plan_year_lg: 470 },

        // 4. Online
        { deptId: 'online', comp: 'THH', name: 'Kinh doanh Online THH', note: 'Bán hàng trực tuyến', ytd_ds: 772.0, ytd_lg: 15.1, m8_ds: 102.0, m8_lg: 0.0, plan_year_ds: 1500, plan_year_lg: 75 },
        { deptId: 'online', comp: 'Viet', name: 'KD Online Việt', note: 'Kênh online sàn TMĐT', ytd_ds: 19902.0, ytd_lg: 1239.0, m8_ds: 3764.0, m8_lg: 241.0, plan_year_ds: 30500, plan_year_lg: 1830 },
        { deptId: 'online', comp: 'XemSon', name: 'Kinh doanh Online', note: 'Bán hàng trực tuyến', ytd_ds: 23597.0, ytd_lg: 882.0, m8_ds: 3918.0, m8_lg: 113.0, plan_m_ds: 2000, plan_m_lg: 100, plan_year_ds: 24000, plan_year_lg: 1200 },
        { deptId: 'online', comp: 'VPSM', name: 'Shopee-Online VPSM', note: 'Gian hàng Shopee Miền Trung', ytd_ds: 898.0, ytd_lg: 48.0, m8_ds: 105.0, m8_lg: 3.0, plan_year_ds: 1400, plan_year_lg: 84 },

        // 5. Dự án
        { deptId: 'du_an', comp: 'THH', name: 'Dự án Tân Hồng Hà', note: 'Dự án thầu thiết bị miền Bắc', ytd_ds: 14503.0, ytd_lg: 5690.3, m8_ds: 1415.0, m8_lg: 310.0, plan_year_ds: 22000, plan_year_lg: 8800 },
        { deptId: 'du_an', comp: 'XemSon', name: 'Dự án Xem Sơn', note: 'Dự án thầu thiết bị miền Nam', ytd_ds: 4182.0, ytd_lg: 1351.0, m8_ds: 3426.0, m8_lg: 1245.0, plan_m_ds: 0, plan_m_lg: 0, plan_year_ds: 0, plan_year_lg: 0 },
        { deptId: 'du_an', comp: 'ITSS', name: 'Dự án CNTT ITSS', note: 'Giải pháp phần mềm và mạng', ytd_ds: 3555.0, ytd_lg: 1309.0, m8_ds: 640.0, m8_lg: 210.0, plan_year_ds: 5500, plan_year_lg: 2035 },

        // 6. Kinh doanh tổng hợp (KDTH)
        { deptId: 'kdth', comp: 'THH', name: 'Kinh doanh tổng hợp THH', note: 'Thương mại tổng hợp', ytd_ds: 14949.0, ytd_lg: 1212.1, m8_ds: 1248.0, m8_lg: 177.0, plan_year_ds: 22500, plan_year_lg: 2250 },
        { deptId: 'kdth', comp: 'Viet', name: 'KDTH Công ty Việt', note: 'Kinh doanh tổng hợp', ytd_ds: 14838.0, ytd_lg: 1135.0, m8_ds: 2213.0, m8_lg: 166.0, plan_year_ds: 23000, plan_year_lg: 1840 },
        { deptId: 'kdth', comp: 'XemSon', name: 'Kinh doanh tổng hợp', note: 'Thương mại tổng hợp', ytd_ds: 0, ytd_lg: 0, m8_ds: 0, m8_lg: 0, plan_m_ds: 0, plan_m_lg: 0, plan_year_ds: 0, plan_year_lg: 0 },

        // 7. Kinh doanh lẻ
        { deptId: 'ban_le', comp: 'Viet', name: 'Cửa hàng Việt', note: 'Bán lẻ tại điểm bán', ytd_ds: 835.27, ytd_lg: 355.78, m8_ds: 90.37, m8_lg: 61.81, plan_m_ds: 550, plan_m_lg: 82.5, plan_year_ds: 6000, plan_year_lg: 900 },
        { deptId: 'ban_le', comp: 'XemSon', name: 'Bán máy lẻ Xem Sơn', note: 'Bán lẻ thiết bị văn phòng', ytd_ds: 3667.0, ytd_lg: 843.0, m8_ds: 191.0, m8_lg: 49.0, plan_m_ds: 458, plan_m_lg: 105, plan_year_ds: 5500, plan_year_lg: 1265 },
        { deptId: 'ban_le', comp: 'VPSM', name: 'Bán lẻ VPS Miền Trung', note: 'Bán lẻ tại showroom', ytd_ds: 400.0, ytd_lg: 72.0, m8_ds: 5.0, m8_lg: 1.0, plan_m_ds: 103, plan_m_lg: 9, plan_year_ds: 600, plan_year_lg: 108 },

        // 8. Kinh doanh khác
        { deptId: 'khac', comp: 'Viet', name: 'Bán nội bộ Việt', note: 'Hoạt động nội bộ', ytd_ds: 607.91, ytd_lg: 78.97, m8_ds: 11.1, m8_lg: 0.13, plan_m_ds: 10, plan_m_lg: 1, plan_year_ds: 600, plan_year_lg: 75 },
        { deptId: 'khac', comp: 'VPVPS', name: 'VP VPS - Hoạt động KD', note: 'Bán nội bộ, xuất khẩu, thương mại', ytd_ds: 24000.0, ytd_lg: 2880.0, m8_ds: 7386.0, m8_lg: 288.0, plan_m_ds: 3000, plan_m_lg: 360, plan_year_ds: 36000, plan_year_lg: 4320 }
    ],

    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.initDeptRBAC();
            const period = e.detail ? e.detail.period : 'month';
            const comp = e.detail ? e.detail.company : 'all';
            this.setDeptMode(period, false);
            this.loadData(period, comp);
        });

        // Initialize Department filter state with RBAC
        this.initDeptRBAC();
    },

    initDeptRBAC() {
        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : true;
        const select = document.getElementById('dept-filter-company');
        if (!select) return;
        if (!canViewAll && window.AuthService) {
            const allowed = window.AuthService.getAllowedCompany();
            const compMap = { 'Tân Hồng Hà': 'THH', 'Việt': 'Viet', 'Xem Sơn': 'XemSon', 'VPS M': 'VPSM', 'ITSS': 'ITSS', 'Văn phòng VPS': 'VPVPS' };
            const cKey = compMap[allowed] || 'THH';
            this.currentDeptCompany = cKey;
            select.innerHTML = `<option value="${cKey}">${allowed}</option>`;
            select.value = cKey;
            select.disabled = true;
            select.style.background = '#f1f5f9';
            select.style.cursor = 'not-allowed';
        } else {
            select.disabled = false;
            select.style.background = '#ffffff';
            select.style.cursor = 'pointer';
            const curVal = select.value || this.currentDeptCompany || 'all';
            if (select.options.length <= 1) {
                select.innerHTML = `
                    <option value="all">Toàn bộ 6 Công ty</option>
                    <option value="THH">Tân Hồng Hà (Miền Bắc)</option>
                    <option value="Viet">Công ty Việt (Miền Bắc)</option>
                    <option value="XemSon">Xem Sơn (Miền Nam)</option>
                    <option value="VPSM">VPS Miền Trung</option>
                    <option value="ITSS">ITSS (CNTT & Giải pháp)</option>
                    <option value="VPVPS">Văn phòng VPS</option>
                `;
            }
            if (curVal) select.value = curVal;
        }
    },

    switchTab(tabId) {
        this.currentTab = tabId;
        const btnCompany = document.getElementById('btn-rev-tab-company');
        const btnDept = document.getElementById('btn-rev-tab-dept');
        const subviewCompany = document.getElementById('rev-subview-company');
        const subviewDept = document.getElementById('rev-subview-dept');

        if (tabId === 'department') {
            if (btnCompany) btnCompany.classList.remove('active');
            if (btnDept) btnDept.classList.add('active');
            if (subviewCompany) subviewCompany.classList.add('hidden');
            if (subviewDept) subviewDept.classList.remove('hidden');
            this.renderDepartmentDashboard();
        } else {
            if (btnCompany) btnCompany.classList.add('active');
            if (btnDept) btnDept.classList.remove('active');
            if (subviewCompany) subviewCompany.classList.remove('hidden');
            if (subviewDept) subviewDept.classList.add('hidden');
        }

        if (window.lucide) lucide.createIcons();
    },

    async loadData(period, company) {
        const curPeriod = period || (window.FilterManager ? window.FilterManager.currentPeriod : 'month');
        const data = await window.DataService.getRevenueData(curPeriod, company);
        this.updateCompanyUI(data, company, curPeriod);

        // Sync department filter if company filter changed globally
        if (company) {
            const compKeyMap = {
                'all': 'all',
                'Tân Hồng Hà': 'THH',
                'Việt': 'Viet',
                'Xem Sơn': 'XemSon',
                'VPS M': 'VPSM',
                'ITSS': 'ITSS',
                'Văn phòng VPS': 'VPVPS'
            };
            const mapped = compKeyMap[company] || 'all';
            const deptSelect = document.getElementById('dept-filter-company');
            if (deptSelect) {
                if (!deptSelect.disabled) {
                    deptSelect.value = mapped;
                }
                this.currentDeptCompany = mapped;
            }
        }

        this.renderDepartmentDashboard();
    },

    updateCompanyUI(data, company, period = 'month') {
        // Cập nhật tiêu đề card biểu đồ và bảng kế hoạch theo chu kỳ
        const pTitles = {
            'day': { chart: 'Doanh Số Các Công Ty - Bình Quân 1 Ngày (Triệu VNĐ)', plan: 'KẾ HOẠCH TÀI CHÍNH (BÌNH QUÂN 1 NGÀY) (ĐVT: Triệu VNĐ)' },
            'week': { chart: 'Doanh Số Các Công Ty - Theo Tuần (Triệu VNĐ)', plan: 'KẾ HOẠCH TÀI CHÍNH THEO TUẦN (ĐVT: Triệu VNĐ)' },
            'month': { chart: 'Doanh Số Các Công Ty (Tỷ VNĐ)', plan: 'KẾ HOẠCH TÀI CHÍNH NĂM 2026 (ĐVT: Triệu VNĐ)' },
            'year': { chart: 'Doanh Số Các Công Ty - Cả Năm 2026 (Tỷ VNĐ)', plan: 'KẾ HOẠCH TÀI CHÍNH NĂM 2026 (CẢ NĂM) (ĐVT: Triệu VNĐ)' }
        };
        const curConfig = pTitles[period] || pTitles['month'];
        const chartH = document.querySelector('#rev-subview-company .card:first-child .card-header h3');
        if (chartH) chartH.textContent = curConfig.chart;
        const planH = document.querySelector('#rev-subview-company .card.mt-20 .card-header h3');
        if (planH) planH.textContent = curConfig.plan;

        let dataKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) dataKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) dataKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem')) dataKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M')) dataKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) dataKey = 'ITSS'; 
        else if (company !== 'all') dataKey = 'VPVPS';

        let labels = [], actualData = [], planData = [];
        
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(data.byCompany)) {
                labels.push(compName);
                actualData.push(compData.actual);
                planData.push(compData.plan);
            }
        } else {
            const compData = data.byCompany[dataKey];
            if(compData) {
                labels = [company];
                actualData = [compData.actual];
                planData = [compData.plan];
            }
        }

        const chartData = {
            labels: labels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Doanh số Thực tế',
                    data: actualData,
                    backgroundColor: '#28A745',
                    borderRadius: 4
                },
                {
                    type: 'line',
                    label: 'Kế hoạch',
                    data: planData,
                    borderColor: '#1B2A4A',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                }
            ]
        };

        window.ChartManager.createChart('revenueChart', 'bar', chartData);

        // Update Plan Table
        const tbody = document.querySelector('#revenuePlanTable tbody');
        if (tbody && data.plan2026) {
            let html = '';

            const fmtVal = (val, isPercent = false) => {
                if (val === null || val === undefined || val === '' || val === 0) return '-';
                return isPercent ? val + '%' : Number(val).toLocaleString('vi-VN');
            };

            const calcPct = (th, kh, isExpense = false) => {
                if (!kh || kh <= 0) return { text: '-', color: '#666' };
                if (th === null || th === undefined || th === '' || th === 0) return { text: '-', color: '#666' };
                const pct = (th / kh) * 100;
                const text = pct.toFixed(1) + '%';
                if (isExpense) {
                    return { text, color: pct <= 100 ? '#16a34a' : (pct <= 115 ? '#ca8a04' : '#dc2626') };
                }
                return { text, color: pct >= 100 ? '#16a34a' : (pct >= 50 ? '#ca8a04' : '#dc2626') };
            };

            const renderRow = (name, p) => {
                const ds_pct = calcPct(p.actual, p.ds);
                const ttlg_pct = calcPct(p.actual_ttlg, p.ttlg);
                const lg_pct = calcPct(p.actual_lg_pct, p.lg_pct);
                const cp_lg_pct = calcPct(p.actual_cp_lg_pct, p.cp_lg_pct, true);
                const cp_pct = calcPct(p.actual_cp, p.cp, true);
                const lntt_pct = calcPct(p.actual_lntt, p.lntt);

                return `
                    <tr ${name === 'TẬP ĐOÀN VPS' || name === 'all' ? 'style="font-weight: bold; background: #e2e8f0;"' : ''}>
                        <td>${name === 'all' ? 'TẬP ĐOÀN VPS' : name}</td>
                        <td style="text-align: right; background: rgba(0,0,0,0.02);">${fmtVal(p.ds)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">${fmtVal(p.actual)}</td>
                        <td style="text-align: right; font-weight: bold; background: rgba(0,0,0,0.02); color: ${ds_pct.color};">${ds_pct.text}</td>
                        <td style="text-align: right;">${fmtVal(p.ttlg)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500;">${fmtVal(p.actual_ttlg)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${ttlg_pct.color};">${ttlg_pct.text}</td>
                        <td style="text-align: right; background: rgba(0,0,0,0.02);">${fmtVal(p.lg_pct, true)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">${fmtVal(p.actual_lg_pct, true)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${lg_pct.color}; background: rgba(0,0,0,0.02);">${lg_pct.text}</td>
                        <td style="text-align: right;">${fmtVal(p.cp_lg_pct, true)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500;">${fmtVal(p.actual_cp_lg_pct, true)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${cp_lg_pct.color};">${cp_lg_pct.text}</td>
                        <td style="text-align: right; background: rgba(0,0,0,0.02);">${fmtVal(p.cp)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">${fmtVal(p.actual_cp)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${cp_pct.color}; background: rgba(0,0,0,0.02);">${cp_pct.text}</td>
                        <td style="text-align: right;">${fmtVal(p.lntt)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500;">${fmtVal(p.actual_lntt)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${lntt_pct.color};">${lntt_pct.text}</td>
                    </tr>
                `;
            };

            if (company === 'all') {
                html += renderRow('TẬP ĐOÀN VPS', data.plan2026['all']);
                for (const [compName, p] of Object.entries(data.plan2026)) {
                    if (compName !== 'all' && compName !== 'Văn phòng VPS') {
                        html += renderRow(compName, p);
                    }
                }
            } else {
                const p = data.plan2026[dataKey];
                if (p) html += renderRow(company, p);
            }
            tbody.innerHTML = html;
        }
    },

    // ============================================================
    // DEPARTMENT DASHBOARD ENGINE
    // ============================================================

    selectMonth(month) {
        this.currentDeptMonth = String(month);
        const selM = document.getElementById('dept-filter-month');
        if (selM) selM.value = String(month);
        const quickM = document.getElementById('dept-table-quick-month');
        if (quickM) quickM.value = String(month);

        // Cập nhật trạng thái active cho các nút pills tháng
        document.querySelectorAll('.dept-month-pill').forEach(btn => {
            const m = btn.getAttribute('data-month');
            btn.classList.toggle('active', m === String(month));
        });

        // Khi chuyển về Tháng 9 hoặc Tháng 8 (chốt sổ), mặc định xem cả tháng
        if (String(month) === '9' || String(month) === '8') {
            const selW = document.getElementById('dept-filter-week');
            if (selW) selW.value = 'all';
            this.currentDeptWeek = 'all';
            document.querySelectorAll('.dept-week-pill').forEach(btn => {
                btn.classList.toggle('active', btn.getAttribute('data-week') === 'all');
            });
            this.currentDeptMode = 'month';
            const btnD = document.getElementById('btn-dept-mode-day');
            const btnM = document.getElementById('btn-dept-mode-month');
            const btnW = document.getElementById('btn-dept-mode-week');
            const btnY = document.getElementById('btn-dept-mode-year');
            if (btnD) btnD.classList.remove('active');
            if (btnM) btnM.classList.add('active');
            if (btnW) btnW.classList.remove('active');
            if (btnY) btnY.classList.remove('active');
        }

        this.renderDepartmentDashboard();
    },

    selectWeek(week) {
        this.currentDeptWeek = String(week);
        const selW = document.getElementById('dept-filter-week');
        if (selW) selW.value = String(week);

        // Cập nhật trạng thái active cho các nút pills tuần
        document.querySelectorAll('.dept-week-pill').forEach(btn => {
            const w = btn.getAttribute('data-week');
            btn.classList.toggle('active', w === String(week));
        });

        if (week !== 'all') {
            this.currentDeptMode = 'week';
        } else {
            this.currentDeptMode = 'month';
        }

        const btnD = document.getElementById('btn-dept-mode-day');
        const btnM = document.getElementById('btn-dept-mode-month');
        const btnW = document.getElementById('btn-dept-mode-week');
        const btnY = document.getElementById('btn-dept-mode-year');
        if (btnD) btnD.classList.toggle('active', this.currentDeptMode === 'day');
        if (btnM) btnM.classList.toggle('active', this.currentDeptMode === 'month');
        if (btnW) btnW.classList.toggle('active', this.currentDeptMode === 'week');
        if (btnY) btnY.classList.toggle('active', this.currentDeptMode === 'year');

        this.renderDepartmentDashboard();
    },

    onDeptFilterChange() {
        const selectComp = document.getElementById('dept-filter-company');
        const selectMonth = document.getElementById('dept-filter-month');
        const selectWeek = document.getElementById('dept-filter-week');
        const quickM = document.getElementById('dept-table-quick-month');
        if (selectComp) this.currentDeptCompany = selectComp.value;
        if (selectMonth) {
            this.currentDeptMonth = selectMonth.value;
            if (quickM) quickM.value = selectMonth.value;
        }
        if (selectWeek) {
            this.currentDeptWeek = selectWeek.value;
            if (this.currentDeptWeek !== 'all' && this.currentDeptMode === 'year') {
                this.setDeptMode('week');
                return;
            }
        }

        // Đồng bộ các nút pill
        document.querySelectorAll('.dept-month-pill').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-month') === String(this.currentDeptMonth));
        });
        document.querySelectorAll('.dept-week-pill').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-week') === String(this.currentDeptWeek));
        });

        this.renderDepartmentDashboard();
    },

    setDeptMode(mode, triggerRender = true) {
        this.currentDeptMode = mode || 'month';
        const btnD = document.getElementById('btn-dept-mode-day');
        const btnM = document.getElementById('btn-dept-mode-month');
        const btnW = document.getElementById('btn-dept-mode-week');
        const btnY = document.getElementById('btn-dept-mode-year');
        if (btnD) btnD.classList.toggle('active', mode === 'day');
        if (btnM) btnM.classList.toggle('active', mode === 'month');
        if (btnW) btnW.classList.toggle('active', mode === 'week');
        if (btnY) btnY.classList.toggle('active', mode === 'year');

        const selectWeek = document.getElementById('dept-filter-week');
        if (mode === 'week') {
            if (this.currentDeptWeek === 'all') {
                this.currentDeptWeek = '1';
                if (selectWeek) selectWeek.value = '1';
            }
        }
        document.querySelectorAll('.dept-week-pill').forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-week') === String(this.currentDeptWeek));
        });

        // Đồng bộ ngược lại bộ lọc chung FilterManager nếu người dùng bấm từ toggle nội bộ phòng ban
        if (window.FilterManager && window.FilterManager.currentPeriod !== mode && ['day', 'week', 'month', 'year'].includes(mode)) {
            window.FilterManager.currentPeriod = mode;
            document.querySelectorAll('.time-filter .filter-btn').forEach(b => {
                b.classList.toggle('active', b.dataset.period === mode);
            });
        }

        if (triggerRender) {
            this.renderDepartmentDashboard();
        }
    },

    toggleRowExpand(deptId) {
        if (this.expandedRows.has(deptId)) {
            this.expandedRows.delete(deptId);
        } else {
            this.expandedRows.add(deptId);
        }
        this.renderMatrixTableOnly();
    },

    // Tính toán dữ liệu 8 phòng ban theo bộ lọc: Công ty, Tháng, Tuần
    // Đảm bảo bảo toàn tuyệt đối dữ liệu lịch sử Tháng 9 khi nhập/xem Tháng 10
    computeDepartmentData() {
        if (this.DEPT_SUB_ITEMS) {
            this.DEPT_SUB_ITEMS.forEach(it => {
                if (it.deptId === 'khac') {
                    const n = (it.name || '').toLowerCase();
                    const note = (it.note || '').toLowerCase();
                    if (n.includes('lẻ') || n.includes('cửa hàng') || note.includes('bán lẻ')) {
                        it.deptId = 'ban_le';
                    }
                }
            });
        }

        const selComp = this.currentDeptCompany;
        const selM = this.currentDeptMonth || '9';
        const selW = this.currentDeptWeek || 'all';
        const companies = selComp === 'all' ? ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'] : [selComp];

        const result = {
            departments: [],
            total: {
                day:   { ds_kh: 0, ds_th: 0, lg_kh: 0, lg_th: 0, pct_ds: 0, pct_lg: 0, rate_lg: 0 },
                month: { ds_kh: 0, ds_th: 0, lg_kh: 0, lg_th: 0, pct_ds: 0, pct_lg: 0, rate_lg: 0 },
                week:  { ds_kh: 0, ds_th: 0, lg_kh: 0, lg_th: 0, pct_ds: 0, pct_lg: 0, rate_lg: 0 },
                year:  { ds_kh: 0, ds_th: 0, lg_kh: 0, lg_th: 0, pct_ds: 0, pct_lg: 0, rate_lg: 0 }
            }
        };

        this.DEPARTMENTS.forEach(dept => {
            let deptPlanYearDs = 0, deptPlanYearLg = 0;
            let deptPlanMonthDs = 0, deptPlanMonthLg = 0;
            let deptPlanWeekDs = 0, deptPlanWeekLg = 0;

            let deptActualMonthDs = 0, deptActualMonthLg = 0;
            let deptActualWeekDs = 0, deptActualWeekLg = 0;
            let deptActualYearDs = 0, deptActualYearLg = 0;

            // Sub-items thuộc phòng ban và các công ty đang chọn
            const subItems = this.DEPT_SUB_ITEMS.filter(it => 
                it.deptId === dept.id && companies.includes(it.comp)
            );

            // Gom sub-items theo công ty để phân bổ tỷ lệ chính xác
            const subItemsByComp = {};
            subItems.forEach(it => {
                if (!subItemsByComp[it.comp]) subItemsByComp[it.comp] = [];
                subItemsByComp[it.comp].push(it);
            });

            // Tính toán từng công ty
            companies.forEach(comp => {
                const compSubItems = subItemsByComp[comp] || [];
                const compPlanYearDs = compSubItems.reduce((s, it) => s + (it.plan_year_ds || 0), 0);
                const compPlanYearLg = compSubItems.reduce((s, it) => s + (it.plan_year_lg || 0), 0);
                const compPlanMonthDs = Math.round(compPlanYearDs / 12);
                const compPlanMonthLg = Math.round(compPlanYearLg / 12);
                const compPlanWeekDs = Math.round(compPlanMonthDs / 4);
                const compPlanWeekLg = Math.round(compPlanMonthLg / 4);

                deptPlanYearDs += compPlanYearDs;
                deptPlanYearLg += compPlanYearLg;
                deptPlanMonthDs += compPlanMonthDs;
                deptPlanMonthLg += compPlanMonthLg;
                deptPlanWeekDs += compPlanWeekDs;
                deptPlanWeekLg += compPlanWeekLg;

                // Xác định Actual theo kỳ tháng & tuần
                let compActualMonthDs = 0, compActualMonthLg = 0;
                let compActualWeekDs = 0, compActualWeekLg = 0;

                if (selM === '9') {
                    // KHO LƯU TRỮ THÁNG 9: Đã chốt sổ, bảo toàn độc lập tuyệt đối
                    const t9Actual = this.PERIOD_STORE['9']?.actualsByCompDept?.[comp]?.[dept.id] || { ds: 0, lg: 0 };
                    compActualMonthDs = t9Actual.ds;
                    compActualMonthLg = t9Actual.lg;

                    if (selW === 'all') {
                        compActualWeekDs = Math.round(compActualMonthDs / 4);
                        compActualWeekLg = Math.round(compActualMonthLg / 4);
                    } else {
                        const wWeight = this.PERIOD_STORE['9']?.weekWeights?.[selW] || 0.25;
                        compActualWeekDs = Math.round(compActualMonthDs * wWeight);
                        compActualWeekLg = Math.round(compActualMonthLg * wWeight);
                    }
                } else if (selM === '10') {
                    // KỲ THÁNG 10: Từng tuần độc lập, không ghi đè Tháng 9
                    const weeksObj = this.PERIOD_STORE['10']?.weeks || {};
                    if (selW === 'all') {
                        // Cả tháng 10: Lũy kế các tuần đã nhập (Tuần 1 + Tuần 2)
                        for (const wKey of ['1', '2', '3', '4', '5']) {
                            const wEntry = weeksObj[wKey]?.byCompDept?.[comp]?.[dept.id];
                            if (wEntry) {
                                compActualMonthDs += wEntry.ds || 0;
                                compActualMonthLg += wEntry.lg || 0;
                            }
                        }
                        compActualWeekDs = Math.round(compActualMonthDs / 2); // BQ các tuần đã qua
                        compActualWeekLg = Math.round(compActualMonthLg / 2);
                    } else {
                        // Xem riêng từng tuần được chọn của Tháng 10
                        const wEntry = weeksObj[selW]?.byCompDept?.[comp]?.[dept.id] || { ds: 0, lg: 0 };
                        compActualWeekDs = wEntry.ds || 0;
                        compActualWeekLg = wEntry.lg || 0;
                        
                        // Tháng 10 lũy kế đến hiện tại
                        for (const wKey of ['1', '2', '3', '4', '5']) {
                            const e = weeksObj[wKey]?.byCompDept?.[comp]?.[dept.id];
                            if (e) {
                                compActualMonthDs += e.ds || 0;
                                compActualMonthLg += e.lg || 0;
                            }
                        }
                    }
                } else {
                    // Tháng 8 hoặc tháng khác
                    compActualMonthDs = compSubItems.reduce((s, it) => s + (it.m8_ds || 0), 0);
                    compActualMonthLg = compSubItems.reduce((s, it) => s + (it.m8_lg || 0), 0);
                    compActualWeekDs = Math.round(compActualMonthDs / 4);
                    compActualWeekLg = Math.round(compActualMonthLg / 4);
                }

                deptActualMonthDs += compActualMonthDs;
                deptActualMonthLg += compActualMonthLg;
                deptActualWeekDs += compActualWeekDs;
                deptActualWeekLg += compActualWeekLg;

                // Lũy kế năm (YTD) = T8 (gốc) + T9 (thực tế chốt) + T10 (lũy kế tuần)
                const compYtdT8Ds = compSubItems.reduce((s, it) => s + (it.ytd_ds || 0), 0);
                const compYtdT8Lg = compSubItems.reduce((s, it) => s + (it.ytd_lg || 0), 0);
                const t9CompDs = this.PERIOD_STORE['9']?.actualsByCompDept?.[comp]?.[dept.id]?.ds || 0;
                const t9CompLg = this.PERIOD_STORE['9']?.actualsByCompDept?.[comp]?.[dept.id]?.lg || 0;

                let compActualYearDs = compYtdT8Ds;
                let compActualYearLg = compYtdT8Lg;

                if (selM === '8') {
                    compActualYearDs = compYtdT8Ds;
                    compActualYearLg = compYtdT8Lg;
                } else if (selM === '9') {
                    compActualYearDs = compYtdT8Ds + t9CompDs;
                    compActualYearLg = compYtdT8Lg + t9CompLg;
                } else if (selM === '10') {
                    compActualYearDs = compYtdT8Ds + t9CompDs + compActualMonthDs;
                    compActualYearLg = compYtdT8Lg + t9CompLg + compActualMonthLg;
                } else {
                    compActualYearDs = Math.round(compYtdT8Ds * (parseInt(selM) / 8));
                    compActualYearLg = Math.round(compYtdT8Lg * (parseInt(selM) / 8));
                }

                deptActualYearDs += compActualYearDs;
                deptActualYearLg += compActualYearLg;

                // Phân bổ xuống từng subItem của công ty này
                const sumM8Ds = compSubItems.reduce((s, it) => s + (it.m8_ds || 0), 0) || 1;
                const sumM8Lg = compSubItems.reduce((s, it) => s + (it.m8_lg || 0), 0) || 1;

                compSubItems.forEach(item => {
                    const rDs = compSubItems.length === 1 ? 1 : (item.m8_ds || 0) / sumM8Ds;
                    const rLg = compSubItems.length === 1 ? 1 : (item.m8_lg || 0) / sumM8Lg;

                    const itDsKhMonth = Math.round((item.plan_year_ds || 0) / 12);
                    const itLgKhMonth = Math.round((item.plan_year_lg || 0) / 12);
                    const itDsKhWeek  = Math.round(itDsKhMonth / 4);
                    const itLgKhWeek  = Math.round(itLgKhMonth / 4);
                    const itDsKhDay   = Math.round(itDsKhMonth / 26);
                    const itLgKhDay   = Math.round(itLgKhMonth / 26);

                    const itDsThMonth = Math.round(compActualMonthDs * rDs);
                    const itLgThMonth = Math.round(compActualMonthLg * rLg);
                    const itDsThWeek  = Math.round(compActualWeekDs * rDs);
                    const itLgThWeek  = Math.round(compActualWeekLg * rLg);
                    const itDsThDay   = Math.round(itDsThMonth / 26);
                    const itLgThDay   = Math.round(itLgThMonth / 26);

                    let itDsThYear = item.ytd_ds || 0;
                    let itLgThYear = item.ytd_lg || 0;
                    if (selM === '9') {
                        itDsThYear += itDsThMonth;
                        itLgThYear += itLgThMonth;
                    } else if (selM === '10') {
                        const itT9Ds = Math.round(t9CompDs * rDs);
                        const itT9Lg = Math.round(t9CompLg * rLg);
                        itDsThYear += (itT9Ds + itDsThMonth);
                        itLgThYear += (itT9Lg + itLgThMonth);
                    }

                    item.calculated = {
                        day: {
                            ds_kh: itDsKhDay, ds_th: itDsThDay,
                            pct_ds: itDsKhDay > 0 ? (itDsThDay / itDsKhDay) * 100 : 0,
                            lg_kh: itLgKhDay, lg_th: itLgThDay,
                            pct_lg: itLgKhDay > 0 ? (itLgThDay / itLgKhDay) * 100 : 0,
                            rate_lg: itDsThDay > 0 ? (itLgThDay / itDsThDay) * 100 : 0
                        },
                        month: {
                            ds_kh: itDsKhMonth, ds_th: itDsThMonth,
                            pct_ds: itDsKhMonth > 0 ? (itDsThMonth / itDsKhMonth) * 100 : 0,
                            lg_kh: itLgKhMonth, lg_th: itLgThMonth,
                            pct_lg: itLgKhMonth > 0 ? (itLgThMonth / itLgKhMonth) * 100 : 0,
                            rate_lg: itDsThMonth > 0 ? (itLgThMonth / itDsThMonth) * 100 : 0
                        },
                        week: {
                            ds_kh: itDsKhWeek, ds_th: itDsThWeek,
                            pct_ds: itDsKhWeek > 0 ? (itDsThWeek / itDsKhWeek) * 100 : 0,
                            lg_kh: itLgKhWeek, lg_th: itLgThWeek,
                            pct_lg: itLgKhWeek > 0 ? (itLgThWeek / itLgKhWeek) * 100 : 0,
                            rate_lg: itDsThWeek > 0 ? (itLgThWeek / itDsThWeek) * 100 : 0
                        },
                        year: {
                            ds_kh: item.plan_year_ds || 0, ds_th: itDsThYear,
                            pct_ds: (item.plan_year_ds || 0) > 0 ? (itDsThYear / item.plan_year_ds) * 100 : 0,
                            lg_kh: item.plan_year_lg || 0, lg_th: itLgThYear,
                            pct_lg: (item.plan_year_lg || 0) > 0 ? (itLgThYear / item.plan_year_lg) * 100 : 0,
                            rate_lg: itDsThYear > 0 ? (itLgThYear / itDsThYear) * 100 : 0
                        }
                    };
                });
            });

            // Tỷ lệ phòng ban
            const deptPlanDayDs = Math.round(deptPlanMonthDs / 26);
            const deptPlanDayLg = Math.round(deptPlanMonthLg / 26);
            const deptActualDayDs = Math.round(deptActualMonthDs / 26);
            const deptActualDayLg = Math.round(deptActualMonthLg / 26);

            const pctAchieveDayDs = deptPlanDayDs > 0 ? (deptActualDayDs / deptPlanDayDs) * 100 : 0;
            const pctAchieveDayLg = deptPlanDayLg > 0 ? (deptActualDayLg / deptPlanDayLg) * 100 : 0;
            const rateLgDay = deptActualDayDs > 0 ? (deptActualDayLg / deptActualDayDs) * 100 : 0;

            const pctAchieveMonthDs = deptPlanMonthDs > 0 ? (deptActualMonthDs / deptPlanMonthDs) * 100 : 0;
            const pctAchieveMonthLg = deptPlanMonthLg > 0 ? (deptActualMonthLg / deptPlanMonthLg) * 100 : 0;
            const rateLgMonth = deptActualMonthDs > 0 ? (deptActualMonthLg / deptActualMonthDs) * 100 : 0;

            const pctAchieveWeekDs = deptPlanWeekDs > 0 ? (deptActualWeekDs / deptPlanWeekDs) * 100 : 0;
            const pctAchieveWeekLg = deptPlanWeekLg > 0 ? (deptActualWeekLg / deptPlanWeekLg) * 100 : 0;
            const rateLgWeek = deptActualWeekDs > 0 ? (deptActualWeekLg / deptActualWeekDs) * 100 : 0;

            const pctAchieveYearDs = deptPlanYearDs > 0 ? (deptActualYearDs / deptPlanYearDs) * 100 : 0;
            const pctAchieveYearLg = deptPlanYearLg > 0 ? (deptActualYearLg / deptPlanYearLg) * 100 : 0;
            const rateLgYear = deptActualYearDs > 0 ? (deptActualYearLg / deptActualYearDs) * 100 : 0;

            result.departments.push({
                ...dept,
                subItems,
                day: {
                    ds_kh: deptPlanDayDs, ds_th: deptActualDayDs, pct_ds: pctAchieveDayDs,
                    lg_kh: deptPlanDayLg, lg_th: deptActualDayLg, pct_lg: pctAchieveDayLg,
                    rate_lg: rateLgDay
                },
                month: {
                    ds_kh: deptPlanMonthDs, ds_th: deptActualMonthDs, pct_ds: pctAchieveMonthDs,
                    lg_kh: deptPlanMonthLg, lg_th: deptActualMonthLg, pct_lg: pctAchieveMonthLg,
                    rate_lg: rateLgMonth
                },
                week: {
                    ds_kh: deptPlanWeekDs, ds_th: deptActualWeekDs, pct_ds: pctAchieveWeekDs,
                    lg_kh: deptPlanWeekLg, lg_th: deptActualWeekLg, pct_lg: pctAchieveWeekLg,
                    rate_lg: rateLgWeek
                },
                year: {
                    ds_kh: deptPlanYearDs, ds_th: deptActualYearDs, pct_ds: pctAchieveYearDs,
                    lg_kh: deptPlanYearLg, lg_th: deptActualYearLg, pct_lg: pctAchieveYearLg,
                    rate_lg: rateLgYear
                }
            });

            // Cộng tổng
            result.total.day.ds_kh += deptPlanDayDs;
            result.total.day.ds_th += deptActualDayDs;
            result.total.day.lg_kh += deptPlanDayLg;
            result.total.day.lg_th += deptActualDayLg;

            result.total.month.ds_kh += deptPlanMonthDs;
            result.total.month.ds_th += deptActualMonthDs;
            result.total.month.lg_kh += deptPlanMonthLg;
            result.total.month.lg_th += deptActualMonthLg;

            result.total.week.ds_kh += deptPlanWeekDs;
            result.total.week.ds_th += deptActualWeekDs;
            result.total.week.lg_kh += deptPlanWeekLg;
            result.total.week.lg_th += deptActualWeekLg;

            result.total.year.ds_kh += deptPlanYearDs;
            result.total.year.ds_th += deptActualYearDs;
            result.total.year.lg_kh += deptPlanYearLg;
            result.total.year.lg_th += deptActualYearLg;
        });

        // Tính % Tổng cộng
        result.total.day.pct_ds = result.total.day.ds_kh > 0 ? (result.total.day.ds_th / result.total.day.ds_kh) * 100 : 0;
        result.total.day.pct_lg = result.total.day.lg_kh > 0 ? (result.total.day.lg_th / result.total.day.lg_kh) * 100 : 0;
        result.total.day.rate_lg = result.total.day.ds_th > 0 ? (result.total.day.lg_th / result.total.day.ds_th) * 100 : 0;

        result.total.month.pct_ds = result.total.month.ds_kh > 0 ? (result.total.month.ds_th / result.total.month.ds_kh) * 100 : 0;
        result.total.month.pct_lg = result.total.month.lg_kh > 0 ? (result.total.month.lg_th / result.total.month.lg_kh) * 100 : 0;
        result.total.month.rate_lg = result.total.month.ds_th > 0 ? (result.total.month.lg_th / result.total.month.ds_th) * 100 : 0;

        result.total.week.pct_ds = result.total.week.ds_kh > 0 ? (result.total.week.ds_th / result.total.week.ds_kh) * 100 : 0;
        result.total.week.pct_lg = result.total.week.lg_kh > 0 ? (result.total.week.lg_th / result.total.week.lg_kh) * 100 : 0;
        result.total.week.rate_lg = result.total.week.ds_th > 0 ? (result.total.week.lg_th / result.total.week.ds_th) * 100 : 0;

        result.total.year.pct_ds = result.total.year.ds_kh > 0 ? (result.total.year.ds_th / result.total.year.ds_kh) * 100 : 0;
        result.total.year.pct_lg = result.total.year.lg_kh > 0 ? (result.total.year.lg_th / result.total.year.lg_kh) * 100 : 0;
        result.total.year.rate_lg = result.total.year.ds_th > 0 ? (result.total.year.lg_th / result.total.year.ds_th) * 100 : 0;

        return result;
    },

    renderDepartmentDashboard() {
        const selectComp = document.getElementById('dept-filter-company');
        const selectMonth = document.getElementById('dept-filter-month');
        const selectWeek = document.getElementById('dept-filter-week');
        if (selectComp && selectComp.value) this.currentDeptCompany = selectComp.value;
        if (selectMonth && selectMonth.value) this.currentDeptMonth = selectMonth.value;
        if (selectWeek && selectWeek.value) this.currentDeptWeek = selectWeek.value;

        const data = this.computeDepartmentData();
        this.renderKpiCards(data);
        this.renderDeptCharts(data);
        this.renderMatrixTableOnly();

        // Cập nhật tiêu đề cột bảng theo ngày / tuần / tháng
        const isDayMode = this.currentDeptMode === 'day';
        const isWeekMode = this.currentDeptMode === 'week' || this.currentDeptWeek !== 'all';
        const thDs = document.getElementById('th-dept-ds-period');
        const thLg = document.getElementById('th-dept-lg-period');
        const wTitle = this.currentDeptWeek !== 'all' ? `TUẦN ${this.currentDeptWeek}` : 'TUẦN';

        if (thDs) {
            if (isDayMode) {
                thDs.innerHTML = `DOANH SỐ BQ NGÀY (T${this.currentDeptMonth}) <small style="display:block;font-size:0.7rem;font-weight:400;color:#e0f2fe;">(Triệu VNĐ/Ngày)</small>`;
            } else if (isWeekMode) {
                thDs.innerHTML = `DOANH SỐ ${wTitle} (T${this.currentDeptMonth}) <small style="display:block;font-size:0.7rem;font-weight:400;color:#e0f2fe;">(Triệu VNĐ)</small>`;
            } else {
                thDs.innerHTML = `DOANH SỐ THÁNG ${this.currentDeptMonth}/2026 <small style="display:block;font-size:0.7rem;font-weight:400;color:#e0f2fe;">(Triệu VNĐ)</small>`;
            }
        }
        if (thLg) {
            if (isDayMode) {
                thLg.innerHTML = `LÃI GỘP BQ NGÀY (T${this.currentDeptMonth}) <small style="display:block;font-size:0.7rem;font-weight:400;color:#e0f2fe;">(Triệu VNĐ/Ngày)</small>`;
            } else if (isWeekMode) {
                thLg.innerHTML = `LÃI GỘP ${wTitle} (T${this.currentDeptMonth}) <small style="display:block;font-size:0.7rem;font-weight:400;color:#e0f2fe;">(Triệu VNĐ)</small>`;
            } else {
                thLg.innerHTML = `LÃI GỘP THÁNG ${this.currentDeptMonth}/2026 <small style="display:block;font-size:0.7rem;font-weight:400;color:#e0f2fe;">(Triệu VNĐ)</small>`;
            }
        }

        // Cập nhật badge & phụ đề
        const companyNames = {
            'all': 'Toàn Tập Đoàn (6 Công ty)',
            'THH': 'Tân Hồng Hà',
            'Viet': 'Việt',
            'XemSon': 'Xem Sơn',
            'VPSM': 'VPS Miền Trung',
            'ITSS': 'ITSS',
            'VPVPS': 'Văn phòng VPS'
        };
        const badge = document.getElementById('dept-table-badge');
        if (badge) badge.textContent = companyNames[this.currentDeptCompany] || 'Toàn Tập Đoàn';

        const subTitle = document.getElementById('dept-table-subtitle');
        if (subTitle) {
            const mText = `Tháng ${this.currentDeptMonth.padStart(2, '0')}/2026`;
            const wText = this.currentDeptWeek !== 'all' ? ` • Tuần ${this.currentDeptWeek}` : ' • Cả Tháng';
            let modeText = 'Đang xem: Theo Tháng';
            if (this.currentDeptMode === 'day') modeText = 'Đang xem: Bình quân Ngày (26 ngày/tháng)';
            else if (this.currentDeptMode === 'week') modeText = `Đang xem: Theo Tuần (${wTitle})`;
            else if (this.currentDeptMode === 'year') modeText = 'Đang xem: Lũy kế cả năm (YTD)';
            
            const safeBadge = this.currentDeptMonth === '9' 
                ? '🔒 Dữ liệu Tháng 9 đã chốt sổ (bảo toàn 100%)' 
                : (this.currentDeptMonth === '10' ? '⚡ Tháng 10 đang cập nhật theo tuần (T9 giữ nguyên)' : '');

            subTitle.textContent = `ĐVT: Triệu VNĐ • Kỳ báo cáo: ${mText}${wText} • ${modeText} ${safeBadge ? '• ' + safeBadge : ''}`;
        }

        // Đồng bộ dropdown chọn nhanh trên bảng và các nút pills
        const quickM = document.getElementById('dept-table-quick-month');
        if (quickM) quickM.value = String(this.currentDeptMonth);
        const selM = document.getElementById('dept-filter-month');
        if (selM) selM.value = String(this.currentDeptMonth);
        const selW = document.getElementById('dept-filter-week');
        if (selW) selW.value = String(this.currentDeptWeek);

        document.querySelectorAll('.dept-month-pill').forEach(btn => {
            const m = btn.getAttribute('data-month');
            btn.classList.toggle('active', m === String(this.currentDeptMonth));
        });
        document.querySelectorAll('.dept-week-pill').forEach(btn => {
            const w = btn.getAttribute('data-week');
            btn.classList.toggle('active', w === String(this.currentDeptWeek));
        });

        if (window.lucide) lucide.createIcons();
        if (window.SliceMatrixModule && typeof window.SliceMatrixModule.render === 'function') {
            window.SliceMatrixModule.render();
        }
    },

    renderKpiCards(data) {
        const container = document.getElementById('dept-kpi-container');
        if (!container) return;

        const isDayMode = this.currentDeptMode === 'day';
        const isYearMode = this.currentDeptMode === 'year';
        const isWeekMode = this.currentDeptMode === 'week' || this.currentDeptWeek !== 'all';
        let html = '';

        const fmt = (num) => Math.round(num || 0).toLocaleString('vi-VN');

        data.departments.forEach(dept => {
            const d = isDayMode ? dept.day : (isYearMode ? dept.year : (isWeekMode ? dept.week : dept.month));
            const pct = d.pct_ds;

            let badgeClass = 'dept-kpi-badge-green';
            if (pct < 70) badgeClass = 'dept-kpi-badge-red';
            else if (pct < 100) badgeClass = 'dept-kpi-badge-yellow';

            const progressWidth = Math.min(100, Math.max(0, pct));
            const progressColor = pct >= 100 ? '#10b981' : (pct >= 70 ? '#f59e0b' : '#ef4444');

            const periodLabel = isDayMode ? 'BQ Ngày' : (isYearMode ? 'LK Năm' : (isWeekMode ? `Tuần ${this.currentDeptWeek !== 'all' ? this.currentDeptWeek : ''}` : 'Tháng'));

            html += `
                <div class="dept-kpi-card" style="border-top: 4px solid ${dept.color};">
                    <div class="dept-kpi-card-header">
                        <div class="dept-kpi-title-wrap">
                            <div class="dept-kpi-icon" style="background: ${dept.bgColor}; color: ${dept.color};">
                                <i data-lucide="${dept.icon}" style="width: 20px; height: 20px;"></i>
                            </div>
                            <div>
                                <div class="dept-kpi-name">${dept.num}. ${dept.name}</div>
                                <div class="dept-kpi-subname">${dept.desc}</div>
                            </div>
                        </div>
                        <span class="dept-kpi-badge ${badgeClass}">${pct.toFixed(1)}%</span>
                    </div>

                    <div class="dept-kpi-body">
                        <!-- Hàng Doanh Số -->
                        <div class="dept-kpi-metric-row">
                            <span class="dept-metric-label">Doanh số ${periodLabel}:</span>
                            <div class="dept-metric-value-group">
                                <span class="dept-metric-actual">${fmt(d.ds_th)}</span>
                                <span class="dept-metric-plan">/ ${fmt(d.ds_kh)} tr</span>
                            </div>
                        </div>
                        <!-- Hàng Lãi Gộp -->
                        <div class="dept-kpi-metric-row">
                            <span class="dept-metric-label">Lãi gộp (% LG):</span>
                            <div class="dept-metric-value-group">
                                <span class="dept-metric-actual" style="color: ${dept.color};">${fmt(d.lg_th)}</span>
                                <span class="dept-metric-plan">(${d.rate_lg.toFixed(1)}%)</span>
                            </div>
                        </div>
                    </div>

                    <div class="dept-kpi-footer">
                        <div class="dept-progress-info">
                            <span class="dept-progress-label">Tiến độ KH ${periodLabel}</span>
                            <span class="dept-progress-pct" style="color: ${progressColor};">${pct.toFixed(1)}%</span>
                        </div>
                        <div class="dept-progress-bar-bg">
                            <div class="dept-progress-bar-fill" style="width: ${progressWidth}%; background: ${progressColor};"></div>
                        </div>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    },

    renderDeptCharts(data) {
        const isDayMode = this.currentDeptMode === 'day';
        const isYearMode = this.currentDeptMode === 'year';
        const isWeekMode = this.currentDeptMode === 'week' || this.currentDeptWeek !== 'all';

        const labels = data.departments.map(d => d.shortName);
        const actualRev = data.departments.map(d => isDayMode ? Math.round(d.day.ds_th) : (isYearMode ? Math.round(d.year.ds_th) : (isWeekMode ? Math.round(d.week.ds_th) : Math.round(d.month.ds_th))));
        const planRev   = data.departments.map(d => isDayMode ? Math.round(d.day.ds_kh) : (isYearMode ? Math.round(d.year.ds_kh) : (isWeekMode ? Math.round(d.week.ds_kh) : Math.round(d.month.ds_kh))));
        const actualLg  = data.departments.map(d => isDayMode ? Math.round(d.day.lg_th) : (isYearMode ? Math.round(d.year.lg_th) : (isWeekMode ? Math.round(d.week.lg_th) : Math.round(d.month.lg_th))));
        const rateLg    = data.departments.map(d => {
            const val = isDayMode ? d.day.rate_lg : (isYearMode ? d.year.rate_lg : (isWeekMode ? d.week.rate_lg : d.month.rate_lg));
            return parseFloat((val || 0).toFixed(1));
        });

        // Update titles
        const revTitle = document.getElementById('dept-chart-rev-title');
        if (revTitle) {
            if (isDayMode) {
                revTitle.textContent = `Doanh Số Bình Quân 1 Ngày (T${this.currentDeptMonth}): Kế Hoạch vs Thực Hiện (Triệu VNĐ)`;
            } else if (isYearMode) {
                revTitle.textContent = 'So Sánh Doanh Số Năm 2026: Kế Hoạch vs Lũy Kế TH (Triệu VNĐ)';
            } else if (isWeekMode) {
                const wT = this.currentDeptWeek !== 'all' ? `Tuần ${this.currentDeptWeek} ` : '';
                revTitle.textContent = `So Sánh Doanh Số ${wT}Tháng ${this.currentDeptMonth}: Kế Hoạch vs Thực Tế (Triệu VNĐ)`;
            } else {
                revTitle.textContent = `So Sánh Doanh Số Tháng ${this.currentDeptMonth}: Kế Hoạch vs Thực Tế (Triệu VNĐ)`;
            }
        }

        const profitTitle = document.getElementById('dept-chart-profit-title');
        if (profitTitle) {
            if (isDayMode) {
                profitTitle.textContent = `Lãi Gộp BQ 1 Ngày (Cột) & Tỷ Lệ % Lãi Gộp (Đường)`;
            } else if (isYearMode) {
                profitTitle.textContent = 'Lãi Gộp Lũy Kế (Cột) & Tỷ Lệ % Lãi Gộp (Đường)';
            } else if (isWeekMode) {
                const wT = this.currentDeptWeek !== 'all' ? `Tuần ${this.currentDeptWeek} ` : '';
                profitTitle.textContent = `Lãi Gộp ${wT}Tháng ${this.currentDeptMonth} (Cột) & Tỷ Lệ % Lãi Gộp (Đường)`;
            } else {
                profitTitle.textContent = `Lãi Gộp Tháng ${this.currentDeptMonth} (Cột) & Tỷ Lệ % Lãi Gộp (Đường)`;
            }
        }

        // 1. Chart Doanh Số (Kế hoạch vs Thực tế)
        const ctxRev = document.getElementById('deptRevenueChart');
        if (ctxRev) {
            if (this.deptCharts.rev) this.deptCharts.rev.destroy();

            this.deptCharts.rev = new Chart(ctxRev, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Kế hoạch (KH)',
                            data: planRev,
                            backgroundColor: '#94a3b8',
                            borderRadius: 6,
                            barPercentage: 0.7,
                            categoryPercentage: 0.8
                        },
                        {
                            label: 'Thực tế (TH)',
                            data: actualRev,
                            backgroundColor: '#10b981',
                            borderRadius: 6,
                            barPercentage: 0.7,
                            categoryPercentage: 0.8
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { boxWidth: 12, font: { family: 'Inter', weight: '600' } } },
                        tooltip: {
                            callbacks: {
                                label: ctx => `${ctx.dataset.label}: ${Number(ctx.raw).toLocaleString('vi-VN')} Triệu VNĐ`
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            ticks: { callback: val => Number(val).toLocaleString('vi-VN') },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        // 2. Chart Lãi Gộp & % Lãi Gộp (Combo Bar + Line)
        const ctxProfit = document.getElementById('deptProfitChart');
        if (ctxProfit) {
            if (this.deptCharts.profit) this.deptCharts.profit.destroy();

            this.deptCharts.profit = new Chart(ctxProfit, {
                data: {
                    labels: labels,
                    datasets: [
                        {
                            type: 'bar',
                            label: 'Lãi gộp (Triệu VNĐ)',
                            data: actualLg,
                            backgroundColor: '#3b82f6',
                            borderRadius: 6,
                            yAxisID: 'y'
                        },
                        {
                            type: 'line',
                            label: '% Lãi gộp (% LG)',
                            data: rateLg,
                            borderColor: '#f59e0b',
                            backgroundColor: '#f59e0b',
                            borderWidth: 3,
                            pointRadius: 4,
                            pointHoverRadius: 6,
                            tension: 0.2,
                            yAxisID: 'y1'
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { boxWidth: 12, font: { family: 'Inter', weight: '600' } } },
                        tooltip: {
                            callbacks: {
                                label: ctx => ctx.datasetIndex === 0
                                    ? `Lãi gộp: ${Number(ctx.raw).toLocaleString('vi-VN')} Triệu VNĐ`
                                    : `% Lãi gộp: ${ctx.raw}%`
                            }
                        }
                    },
                    scales: {
                        y: {
                            type: 'linear',
                            position: 'left',
                            beginAtZero: true,
                            ticks: { callback: val => Number(val).toLocaleString('vi-VN') },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        y1: {
                            type: 'linear',
                            position: 'right',
                            beginAtZero: true,
                            max: 80,
                            ticks: { callback: val => val + '%' },
                            grid: { display: false }
                        },
                        x: { grid: { display: false } }
                    }
                }
            });
        }
    },

    renderMatrixTableOnly() {
        const tbody = document.getElementById('deptMatrixTableBody');
        if (!tbody) return;

        const data = this.computeDepartmentData();
        const isDayMode = this.currentDeptMode === 'day';
        const isWeekMode = this.currentDeptMode === 'week' || this.currentDeptWeek !== 'all';
        let html = '';

        const fmt = (num) => Math.round(num || 0).toLocaleString('vi-VN');
        const fmtPct = (num) => (num || 0).toFixed(1) + '%';

        const getPctColor = (pct) => {
            if (pct >= 100) return '#15803d'; // Green
            if (pct >= 70)  return '#b45309'; // Yellow/Amber
            return '#dc2626'; // Red
        };

        data.departments.forEach(dept => {
            // Cột chu kỳ hiển thị: ngày, tuần hoặc tháng
            const curP = isDayMode ? dept.day : (isWeekMode ? dept.week : dept.month);
            const y = dept.year;
            const isExpanded = this.expandedRows.has(dept.id);
            const hasSub = dept.subItems && dept.subItems.length > 0;

            const arrow = hasSub ? `<span class="dept-expand-icon">${isExpanded ? '▼' : '▶'}</span>` : '';

            // Hàng cha (Phòng ban)
            html += `
                <tr class="dept-row-parent ${isExpanded ? 'expanded' : ''}" onclick="window.RevenueModule.toggleRowExpand('${dept.id}')" title="Nhấn để xem chi tiết các mảng kinh doanh">
                    <td style="font-weight: 700; color: #0f172a; padding-left: 12px;">
                        ${arrow}
                        <span style="color: ${dept.color}; margin-right: 4px;">${dept.num}.</span>
                        ${dept.name}
                        ${hasSub ? `<small style="color: #64748b; font-weight: 400; margin-left: 6px;">(${dept.subItems.length} mảng)</small>` : ''}
                    </td>

                    <!-- DOANH SỐ KỲ (TUẦN / THÁNG) -->
                    <td style="text-align: right; background: #f8fafc;">${fmt(curP.ds_kh)}</td>
                    <td style="text-align: right; font-weight: 600; color: #0284c7; background: #f8fafc;">${fmt(curP.ds_th)}</td>
                    <td style="text-align: right; font-weight: 700; color: ${getPctColor(curP.pct_ds)}; background: #f8fafc;">${fmtPct(curP.pct_ds)}</td>

                    <!-- LÃI GỘP KỲ (TUẦN / THÁNG) -->
                    <td style="text-align: right; background: #f8fafc;">${fmt(curP.lg_kh)}</td>
                    <td style="text-align: right; font-weight: 600; color: #16a34a; background: #f8fafc;">${fmt(curP.lg_th)}</td>
                    <td style="text-align: right; font-weight: 700; color: ${getPctColor(curP.pct_lg)}; background: #f8fafc;">${fmtPct(curP.pct_lg)}</td>
                    <td style="text-align: right; font-weight: 700; color: #047857; background: #f0fdf4;">${fmtPct(curP.rate_lg)}</td>

                    <!-- DOANH SỐ NĂM -->
                    <td style="text-align: right; background: #f8fafc;">${fmt(y.ds_kh)}</td>
                    <td style="text-align: right; font-weight: 600; color: #b45309; background: #f8fafc;">${fmt(y.ds_th)}</td>
                    <td style="text-align: right; font-weight: 700; color: ${getPctColor(y.pct_ds)}; background: #f8fafc;">${fmtPct(y.pct_ds)}</td>

                    <!-- LÃI GỘP NĂM -->
                    <td style="text-align: right; background: #f8fafc;">${fmt(y.lg_kh)}</td>
                    <td style="text-align: right; font-weight: 600; color: #7c3aed; background: #f8fafc;">${fmt(y.lg_th)}</td>
                    <td style="text-align: right; font-weight: 700; color: ${getPctColor(y.pct_lg)}; background: #f8fafc;">${fmtPct(y.pct_lg)}</td>
                    <td style="text-align: right; font-weight: 700; color: #6b21a8; background: #faf5ff;">${fmtPct(y.rate_lg)}</td>
                </tr>
            `;

            // Hàng con (Sub-items)
            if (isExpanded && hasSub) {
                dept.subItems.forEach((item) => {
                    const c = item.calculated || {
                        day:   { ds_kh: 0, ds_th: 0, pct_ds: 0, lg_kh: 0, lg_th: 0, pct_lg: 0, rate_lg: 0 },
                        month: { ds_kh: 0, ds_th: 0, pct_ds: 0, lg_kh: 0, lg_th: 0, pct_lg: 0, rate_lg: 0 },
                        week:  { ds_kh: 0, ds_th: 0, pct_ds: 0, lg_kh: 0, lg_th: 0, pct_lg: 0, rate_lg: 0 },
                        year:  { ds_kh: 0, ds_th: 0, pct_ds: 0, lg_kh: 0, lg_th: 0, pct_lg: 0, rate_lg: 0 }
                    };
                    const itP = isDayMode ? c.day : (isWeekMode ? c.week : c.month);
                    const itY = c.year;

                    html += `
                        <tr class="dept-row-child">
                            <td style="padding-left: 32px;">
                                <span style="font-weight: 600; color: #334155;">${item.name}</span>
                                <small style="display: block; color: #94a3b8; font-size: 0.72rem;">[${item.comp}] ${item.note}</small>
                            </td>

                            <!-- DS Kỳ -->
                            <td style="text-align: right; color: #64748b;">${fmt(itP.ds_kh)}</td>
                            <td style="text-align: right; color: #0284c7;">${fmt(itP.ds_th)}</td>
                            <td style="text-align: right; color: ${getPctColor(itP.pct_ds)};">${fmtPct(itP.pct_ds)}</td>

                            <!-- LG Kỳ -->
                            <td style="text-align: right; color: #64748b;">${fmt(itP.lg_kh)}</td>
                            <td style="text-align: right; color: #16a34a;">${fmt(itP.lg_th)}</td>
                            <td style="text-align: right; color: ${getPctColor(itP.pct_lg)};">${fmtPct(itP.pct_lg)}</td>
                            <td style="text-align: right; color: #047857;">${fmtPct(itP.rate_lg)}</td>

                            <!-- DS Năm -->
                            <td style="text-align: right; color: #64748b;">${fmt(itY.ds_kh)}</td>
                            <td style="text-align: right; color: #b45309;">${fmt(itY.ds_th)}</td>
                            <td style="text-align: right; color: ${getPctColor(itY.pct_ds)};">${fmtPct(itY.pct_ds)}</td>

                            <!-- LG Năm -->
                            <td style="text-align: right; color: #64748b;">${fmt(itY.lg_kh)}</td>
                            <td style="text-align: right; color: #7c3aed;">${fmt(itY.lg_th)}</td>
                            <td style="text-align: right; color: ${getPctColor(itY.pct_lg)};">${fmtPct(itY.pct_lg)}</td>
                            <td style="text-align: right; color: #6b21a8;">${fmtPct(itY.rate_lg)}</td>
                        </tr>
                    `;
                });
            }
        });

        // Dòng TỔNG CỘNG
        const tot = data.total;
        const totP = isDayMode ? tot.day : (isWeekMode ? tot.week : tot.month);
        const totY = tot.year;

        html += `
            <tr class="dept-row-total">
                <td style="font-weight: 800; color: #0f172a; text-transform: uppercase;">TỔNG CỘNG</td>

                <!-- DS Kỳ -->
                <td style="text-align: right;">${fmt(totP.ds_kh)}</td>
                <td style="text-align: right; color: #0284c7;">${fmt(totP.ds_th)}</td>
                <td style="text-align: right; color: ${getPctColor(totP.pct_ds)};">${fmtPct(totP.pct_ds)}</td>

                <!-- LG Kỳ -->
                <td style="text-align: right;">${fmt(totP.lg_kh)}</td>
                <td style="text-align: right; color: #16a34a;">${fmt(totP.lg_th)}</td>
                <td style="text-align: right; color: ${getPctColor(totP.pct_lg)};">${fmtPct(totP.pct_lg)}</td>
                <td style="text-align: right; color: #047857;">${fmtPct(totP.rate_lg)}</td>

                <!-- DS Năm -->
                <td style="text-align: right;">${fmt(totY.ds_kh)}</td>
                <td style="text-align: right; color: #b45309;">${fmt(totY.ds_th)}</td>
                <td style="text-align: right; color: ${getPctColor(totY.pct_ds)};">${fmtPct(totY.pct_ds)}</td>

                <!-- LG Năm -->
                <td style="text-align: right;">${fmt(totY.lg_kh)}</td>
                <td style="text-align: right; color: #7c3aed;">${fmt(totY.lg_th)}</td>
                <td style="text-align: right; color: ${getPctColor(totY.pct_lg)};">${fmtPct(totY.pct_lg)}</td>
                <td style="text-align: right; color: #6b21a8;">${fmtPct(totY.rate_lg)}</td>
            </tr>
        `;

        tbody.innerHTML = html;
    },

    exportDeptExcel() {
        const data = this.computeDepartmentData();
        const selM = this.currentDeptMonth;
        const selComp = this.currentDeptCompany;

        let csvContent = '\uFEFF'; // UTF-8 BOM để Excel hiển thị đúng tiếng Việt
        csvContent += `BÁO CÁO DOANH SỐ VÀ LÃI GỘP CÁC PHÒNG BAN - TẬP ĐOÀN VPS\n`;
        csvContent += `Đơn vị: ${selComp} - Kỳ báo cáo: Tháng ${selM}/2026\n`;
        csvContent += `Đơn vị tính: Triệu VNĐ\n\n`;

        csvContent += `"STT","PHÒNG BAN / MẢNG KINH DOANH","DS KH THÁNG","DS TH THÁNG","% ĐẠT DS THÁNG","LG KH THÁNG","LG TH THÁNG","% ĐẠT LG THÁNG","% LG THÁNG","DS KH NĂM","DS TH NĂM (LK)","% ĐẠT DS NĂM","LG KH NĂM","LG TH NĂM (LK)","% ĐẠT LG NĂM","% LG NĂM"\n`;

        data.departments.forEach(dept => {
            const m = dept.month;
            const y = dept.year;
            csvContent += `"${dept.num}","${dept.name}","${Math.round(m.ds_kh)}","${Math.round(m.ds_th)}","${m.pct_ds.toFixed(1)}%","${Math.round(m.lg_kh)}","${Math.round(m.lg_th)}","${m.pct_lg.toFixed(1)}%","${m.rate_lg.toFixed(1)}%","${Math.round(y.ds_kh)}","${Math.round(y.ds_th)}","${y.pct_ds.toFixed(1)}%","${Math.round(y.lg_kh)}","${Math.round(y.lg_th)}","${y.pct_lg.toFixed(1)}%","${y.rate_lg.toFixed(1)}%"\n`;

            if (dept.subItems) {
                dept.subItems.forEach(item => {
                    const itDsKhMonth = (item.plan_m_ds !== undefined && selM === 8) ? item.plan_m_ds : Math.round(item.plan_year_ds / 12);
                    const itLgKhMonth = (item.plan_m_lg !== undefined && selM === 8) ? item.plan_m_lg : Math.round(item.plan_year_lg / 12);
                    csvContent += `"","  - [${item.comp}] ${item.name}","${itDsKhMonth}","${item.m8_ds}","-","${itLgKhMonth}","${item.m8_lg}","-","-","${item.plan_year_ds}","${item.ytd_ds}","-","${item.plan_year_lg}","${item.ytd_lg}","-","-"\n`;
                });
            }
        });

        // Tổng cộng
        const tot = data.total;
        csvContent += `"","TỔNG CỘNG","${Math.round(tot.month.ds_kh)}","${Math.round(tot.month.ds_th)}","${tot.month.pct_ds.toFixed(1)}%","${Math.round(tot.month.lg_kh)}","${Math.round(tot.month.lg_th)}","${tot.month.pct_lg.toFixed(1)}%","${tot.month.rate_lg.toFixed(1)}%","${Math.round(tot.year.ds_kh)}","${Math.round(tot.year.ds_th)}","${tot.year.pct_ds.toFixed(1)}%","${Math.round(tot.year.lg_kh)}","${Math.round(tot.year.lg_th)}","${tot.year.pct_lg.toFixed(1)}%","${tot.year.rate_lg.toFixed(1)}%"\n`;

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `Bao_Cao_Doanh_So_Lai_Gop_Phong_Ban_${selComp}_T${selM}_2026.csv`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }
};
