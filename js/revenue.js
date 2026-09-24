/**
 * ============================================================
 * Revenue Module & Department Dashboard
 * Mục 2: Doanh Số Lãi Gộp Công Ty & Dashboard 7 Phòng Ban (Tháng & Năm)
 * ============================================================
 */

window.RevenueModule = {
    currentTab: 'company', // 'company' | 'department'
    currentDeptCompany: 'all',
    currentDeptMonth: '8', // Mặc định tháng 8 chốt sổ
    currentDeptMode: 'month', // 'month' | 'year'
    expandedRows: new Set(),
    deptCharts: {},

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
                'XemSon': { ds: 42000, lg: 6720, lg_pct: 16 },
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
                'XemSon': { ds: 23000, lg: 15640, lg_pct: 68 },
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
                'XemSon': { ds: 18500, lg: 8140, lg_pct: 44 },
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
                'XemSon': { ds: 36000, lg: 1800, lg_pct: 5 },
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
                'XemSon': { ds: 6000, lg: 2160, lg_pct: 36 },
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
            id: 'khac',
            num: '7',
            name: 'Kinh doanh khác',
            shortName: 'Khác',
            icon: 'more-horizontal',
            color: '#64748b',
            bgColor: 'rgba(100, 116, 139, 0.1)',
            desc: 'Cửa hàng, bán máy lẻ, nội bộ, khác',
            plans: {
                'THH':    { ds: 0, lg: 0, lg_pct: 0 },
                'Viet':   { ds: 3000, lg: 1050, lg_pct: 35 },
                'XemSon': { ds: 5500, lg: 1265, lg_pct: 23 },
                'VPSM':   { ds: 600, lg: 108, lg_pct: 18 },
                'ITSS':   { ds: 0, lg: 0, lg_pct: 0 },
                'VPVPS':  { ds: 36000, lg: 4320, lg_pct: 12 }
            }
        }
    ],

    // ── Chi tiết mảng con của từng đơn vị thuộc 7 phòng ban ──
    DEPT_SUB_ITEMS: [
        // 1. Phân phối
        { deptId: 'phan_phoi', comp: 'THH', name: 'Kinh doanh bán buôn', note: 'Phân phối đại lý miền Bắc', ytd_ds: 30362.0, ytd_lg: 2847.1, m8_ds: 5135.0, m8_lg: 572.0, plan_year_ds: 45000, plan_year_lg: 4500 },
        { deptId: 'phan_phoi', comp: 'XemSon', name: 'Kinh doanh sỉ (KD sỉ)', note: 'Phân phối thiết bị Xesco', ytd_ds: 27002.0, ytd_lg: 4410.0, m8_ds: 4169.0, m8_lg: 682.0, plan_year_ds: 42000, plan_year_lg: 6720 },
        { deptId: 'phan_phoi', comp: 'VPSM', name: 'Kinh doanh máy - bán buôn', note: 'Bán buôn máy VPS Miền Trung', ytd_ds: 6698.0, ytd_lg: 575.0, m8_ds: 810.0, m8_lg: 45.0, plan_year_ds: 10000, plan_year_lg: 900 },
        { deptId: 'phan_phoi', comp: 'VPSM', name: 'Kinh doanh linh kiện - bán buôn', note: 'Bán buôn linh kiện mực in', ytd_ds: 2028.0, ytd_lg: 312.0, m8_ds: 240.0, m8_lg: 22.0, plan_year_ds: 3500, plan_year_lg: 450 },

        // 2. Thuê máy
        { deptId: 'thue_may', comp: 'THH', name: 'Thuê máy Tân Hồng Hà', note: 'Cho thuê máy photocopy miền Bắc', ytd_ds: 4304.0, ytd_lg: 1424.8, m8_ds: 650.0, m8_lg: 233.0, plan_year_ds: 7000, plan_year_lg: 2450 },
        { deptId: 'thue_may', comp: 'Viet', name: 'Thuê máy Công ty Việt', note: 'Cho thuê máy Công ty Việt', ytd_ds: 12422.0, ytd_lg: 7195.0, m8_ds: 1546.0, m8_lg: 910.0, plan_year_ds: 18500, plan_year_lg: 10730 },
        { deptId: 'thue_may', comp: 'XemSon', name: 'Kỹ thuật thuê máy (KT)', note: 'Máy thuê kỹ thuật Xesco', ytd_ds: 11785.0, ytd_lg: 7875.0, m8_ds: 1427.0, m8_lg: 918.0, plan_year_ds: 18000, plan_year_lg: 12240 },
        { deptId: 'thue_may', comp: 'XemSon', name: 'KD Thuê máy (Thương mại)', note: 'Hợp đồng thuê máy mới', ytd_ds: 3033.0, ytd_lg: 2104.0, m8_ds: 381.0, m8_lg: 249.0, plan_year_ds: 5000, plan_year_lg: 3400 },
        { deptId: 'thue_may', comp: 'VPSM', name: 'Thuê máy Miền Trung', note: 'Thuê máy khu vực miền Trung', ytd_ds: 743.0, ytd_lg: 496.0, m8_ds: 80.0, m8_lg: 20.0, plan_year_ds: 1200, plan_year_lg: 780 },

        // 3. Dịch vụ
        { deptId: 'dich_vu', comp: 'THH', name: 'Tổ Dịch vụ THH', note: 'Bảo trì bảo dưỡng sửa chữa', ytd_ds: 9304.0, ytd_lg: 3103.0, m8_ds: 959.0, m8_lg: 281.0, plan_year_ds: 14000, plan_year_lg: 5320 },
        { deptId: 'dich_vu', comp: 'THH', name: 'Tổ mực in THH', note: 'Cung cấp thay thế mực in', ytd_ds: 2319.0, ytd_lg: 1181.7, m8_ds: 354.0, m8_lg: 196.0, plan_year_ds: 3500, plan_year_lg: 1470 },
        { deptId: 'dich_vu', comp: 'THH', name: 'Metercharge THH', note: 'Dịch vụ thu phí bản in chụp', ytd_ds: 1684.0, ytd_lg: 873.0, m8_ds: 233.0, m8_lg: 141.0, plan_year_ds: 2500, plan_year_lg: 1250 },
        { deptId: 'dich_vu', comp: 'XemSon', name: 'Dịch vụ kỹ thuật Xem Sơn', note: 'Kỹ thuật dịch vụ máy VP', ytd_ds: 9931.0, ytd_lg: 4063.0, m8_ds: 1439.0, m8_lg: 574.0, plan_year_ds: 15000, plan_year_lg: 6450 },
        { deptId: 'dich_vu', comp: 'XemSon', name: 'Metercharge Xem Sơn', note: 'Dịch vụ Metercharge Xesco', ytd_ds: 2139.0, ytd_lg: 1284.0, m8_ds: 278.0, m8_lg: 164.0, plan_year_ds: 3500, plan_year_lg: 1890 },
        { deptId: 'dich_vu', comp: 'VPSM', name: 'Dịch vụ kỹ thuật VPSM', note: 'Bảo trì sửa chữa máy', ytd_ds: 1737.0, ytd_lg: 844.0, m8_ds: 220.0, m8_lg: 95.0, plan_year_ds: 2700, plan_year_lg: 1350 },
        { deptId: 'dich_vu', comp: 'VPSM', name: 'Dịch vụ toàn phần VPSM', note: 'Hợp đồng bảo trì trọn gói', ytd_ds: 478.0, ytd_lg: 324.0, m8_ds: 60.0, m8_lg: 35.0, plan_year_ds: 800, plan_year_lg: 470 },

        // 4. Online
        { deptId: 'online', comp: 'THH', name: 'Kinh doanh Online THH', note: 'Bán hàng trực tuyến', ytd_ds: 772.0, ytd_lg: 15.1, m8_ds: 102.0, m8_lg: 0.0, plan_year_ds: 1500, plan_year_lg: 75 },
        { deptId: 'online', comp: 'Viet', name: 'KD Online Việt', note: 'Kênh online sàn TMĐT', ytd_ds: 19902.0, ytd_lg: 1239.0, m8_ds: 3764.0, m8_lg: 241.0, plan_year_ds: 30500, plan_year_lg: 1830 },
        { deptId: 'online', comp: 'XemSon', name: 'KD Online Xem Sơn', note: 'Thương mại điện tử Xesco', ytd_ds: 23597.0, ytd_lg: 882.0, m8_ds: 6770.0, m8_lg: 244.0, plan_year_ds: 36000, plan_year_lg: 1800 },
        { deptId: 'online', comp: 'VPSM', name: 'Shopee-Online VPSM', note: 'Gian hàng Shopee Miền Trung', ytd_ds: 898.0, ytd_lg: 48.0, m8_ds: 105.0, m8_lg: 3.0, plan_year_ds: 1400, plan_year_lg: 84 },

        // 5. Dự án
        { deptId: 'du_an', comp: 'THH', name: 'Dự án Tân Hồng Hà', note: 'Dự án thầu thiết bị miền Bắc', ytd_ds: 14503.0, ytd_lg: 5690.3, m8_ds: 1415.0, m8_lg: 310.0, plan_year_ds: 22000, plan_year_lg: 8800 },
        { deptId: 'du_an', comp: 'XemSon', name: 'Dự án Xesco', note: 'Gói thầu thiết bị miền Nam', ytd_ds: 3426.0, ytd_lg: 1245.0, m8_ds: 447.0, m8_lg: 161.0, plan_year_ds: 6000, plan_year_lg: 2160 },
        { deptId: 'du_an', comp: 'ITSS', name: 'Dự án CNTT ITSS', note: 'Giải pháp phần mềm và mạng', ytd_ds: 3555.0, ytd_lg: 1309.0, m8_ds: 640.0, m8_lg: 210.0, plan_year_ds: 5500, plan_year_lg: 2035 },

        // 6. Kinh doanh tổng hợp (KDTH)
        { deptId: 'kdth', comp: 'THH', name: 'Kinh doanh tổng hợp THH', note: 'Thương mại tổng hợp', ytd_ds: 14949.0, ytd_lg: 1212.1, m8_ds: 1248.0, m8_lg: 177.0, plan_year_ds: 22500, plan_year_lg: 2250 },
        { deptId: 'kdth', comp: 'Viet', name: 'KDTH Công ty Việt', note: 'Kinh doanh tổng hợp', ytd_ds: 14838.0, ytd_lg: 1135.0, m8_ds: 2213.0, m8_lg: 166.0, plan_year_ds: 23000, plan_year_lg: 1840 },

        // 7. Kinh doanh khác
        { deptId: 'khac', comp: 'Viet', name: 'Cửa hàng Việt', note: 'Bán lẻ tại điểm bán', ytd_ds: 835.0, ytd_lg: 356.0, m8_ds: 120.0, m8_lg: 52.0, plan_year_ds: 1800, plan_year_lg: 720 },
        { deptId: 'khac', comp: 'Viet', name: 'Bán nội bộ Việt', note: 'Hoạt động nội bộ', ytd_ds: 608.0, ytd_lg: 79.0, m8_ds: 70.0, m8_lg: 21.0, plan_year_ds: 1200, plan_year_lg: 330 },
        { deptId: 'khac', comp: 'XemSon', name: 'Bán máy lẻ Xem Sơn', note: 'Bán lẻ thiết bị văn phòng', ytd_ds: 3614.0, ytd_lg: 823.0, m8_ds: 191.0, m8_lg: 49.0, plan_year_ds: 5500, plan_year_lg: 1265 },
        { deptId: 'khac', comp: 'VPSM', name: 'Bán lẻ VPS Miền Trung', note: 'Bán lẻ tại showroom', ytd_ds: 355.0, ytd_lg: 63.0, m8_ds: 5.0, m8_lg: 1.0, plan_year_ds: 600, plan_year_lg: 108 },
        { deptId: 'khac', comp: 'VPVPS', name: 'VP VPS - Hoạt động KD', note: 'Bán nội bộ, xuất khẩu, thương mại', ytd_ds: 24017.0, ytd_lg: 2818.0, m8_ds: 7386.0, m8_lg: 288.0, plan_year_ds: 36000, plan_year_lg: 4320 }
    ],

    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            const period = e.detail ? e.detail.period : 'month';
            const comp = e.detail ? e.detail.company : 'all';
            this.loadData(period, comp);
        });

        // Initialize Department filter state with RBAC
        this.initDeptRBAC();
    },

    initDeptRBAC() {
        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : true;
        const select = document.getElementById('dept-filter-company');
        if (!canViewAll && select && window.AuthService) {
            const allowed = window.AuthService.getAllowedCompany();
            const compMap = { 'Tân Hồng Hà': 'THH', 'Việt': 'Viet', 'Xem Sơn': 'XemSon', 'VPS M': 'VPSM', 'ITSS': 'ITSS', 'Văn phòng VPS': 'VPVPS' };
            const cKey = compMap[allowed] || 'THH';
            this.currentDeptCompany = cKey;
            select.innerHTML = `<option value="${cKey}">${allowed}</option>`;
            select.disabled = true;
            select.style.background = '#f1f5f9';
            select.style.cursor = 'not-allowed';
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
        const data = await window.DataService.getRevenueData(period, company);
        this.updateCompanyUI(data, company);

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
            if (deptSelect && !deptSelect.disabled) {
                deptSelect.value = mapped;
                this.currentDeptCompany = mapped;
            }
        }

        if (this.currentTab === 'department') {
            this.renderDepartmentDashboard();
        }
    },

    updateCompanyUI(data, company) {
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

    onDeptFilterChange() {
        const selectComp = document.getElementById('dept-filter-company');
        const selectMonth = document.getElementById('dept-filter-month');
        if (selectComp) this.currentDeptCompany = selectComp.value;
        if (selectMonth) this.currentDeptMonth = selectMonth.value;
        this.renderDepartmentDashboard();
    },

    setDeptMode(mode) {
        this.currentDeptMode = mode;
        const btnM = document.getElementById('btn-dept-mode-month');
        const btnY = document.getElementById('btn-dept-mode-year');
        if (btnM && btnY) {
            if (mode === 'month') {
                btnM.classList.add('active');
                btnY.classList.remove('active');
            } else {
                btnY.classList.add('active');
                btnM.classList.remove('active');
            }
        }
        this.renderDepartmentDashboard();
    },

    toggleRowExpand(deptId) {
        if (this.expandedRows.has(deptId)) {
            this.expandedRows.delete(deptId);
        } else {
            this.expandedRows.add(deptId);
        }
        this.renderMatrixTableOnly();
    },

    // Tính toán dữ liệu 7 phòng ban theo bộ lọc đang chọn
    computeDepartmentData() {
        const selComp = this.currentDeptCompany;
        const selM = parseInt(this.currentDeptMonth) || 8;
        const companies = selComp === 'all' ? ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'] : [selComp];

        // Hệ số phân bổ từng tháng (Tháng 1-8 theo thực tế, 9-12 theo kế hoạch)
        // Khi chọn tháng khác tháng 8, áp dụng tỷ trọng tháng tương ứng
        const monthWeightMap = {
            1: 0.95, 2: 0.65, 3: 1.05, 4: 0.98, 5: 1.02, 6: 1.04, 7: 1.10, 8: 1.15,
            9: 1.05, 10: 1.08, 11: 1.12, 12: 1.25
        };
        const currentMonthWeight = monthWeightMap[selM] || 1.0;

        const result = {
            departments: [],
            total: {
                month: { ds_kh: 0, ds_th: 0, lg_kh: 0, lg_th: 0 },
                year:  { ds_kh: 0, ds_th: 0, lg_kh: 0, lg_th: 0 }
            }
        };

        this.DEPARTMENTS.forEach(dept => {
            let deptPlanYearDs = 0, deptPlanYearLg = 0;
            let deptActualYearDs = 0, deptActualYearLg = 0;
            let deptPlanMonthDs = 0, deptPlanMonthLg = 0;
            let deptActualMonthDs = 0, deptActualMonthLg = 0;

            // Lấy danh sách sub-items thuộc phòng ban và các công ty đang chọn
            const subItems = this.DEPT_SUB_ITEMS.filter(it => 
                it.deptId === dept.id && companies.includes(it.comp)
            );

            subItems.forEach(item => {
                // Kế hoạch năm
                deptPlanYearDs += item.plan_year_ds;
                deptPlanYearLg += item.plan_year_lg;

                // Kế hoạch tháng = Kế hoạch năm / 12
                const itPlanMonthDs = Math.round(item.plan_year_ds / 12);
                const itPlanMonthLg = Math.round(item.plan_year_lg / 12);
                deptPlanMonthDs += itPlanMonthDs;
                deptPlanMonthLg += itPlanMonthLg;

                // Thực tế tháng đang chọn
                let itActualMonthDs = item.m8_ds;
                let itActualMonthLg = item.m8_lg;
                if (selM !== 8) {
                    itActualMonthDs = Math.round(item.m8_ds * (currentMonthWeight / 1.15));
                    itActualMonthLg = Math.round(item.m8_lg * (currentMonthWeight / 1.15));
                }
                deptActualMonthDs += itActualMonthDs;
                deptActualMonthLg += itActualMonthLg;

                // Lũy kế thực tế: tính toán theo tháng được chọn
                let itActualYearDs = item.ytd_ds;
                let itActualYearLg = item.ytd_lg;
                if (selM < 8) {
                    const ratio = selM / 8;
                    itActualYearDs = Math.round(item.ytd_ds * ratio);
                    itActualYearLg = Math.round(item.ytd_lg * ratio);
                } else if (selM > 8) {
                    const extraMonths = selM - 8;
                    itActualYearDs = Math.round(item.ytd_ds + (itPlanMonthDs * extraMonths));
                    itActualYearLg = Math.round(item.ytd_lg + (itPlanMonthLg * extraMonths));
                }
                deptActualYearDs += itActualYearDs;
                deptActualYearLg += itActualYearLg;
            });

            // Tỷ lệ % Đạt & % Lãi gộp
            const pctAchieveMonthDs = deptPlanMonthDs > 0 ? (deptActualMonthDs / deptPlanMonthDs) * 100 : 0;
            const pctAchieveMonthLg = deptPlanMonthLg > 0 ? (deptActualMonthLg / deptPlanMonthLg) * 100 : 0;
            const rateLgMonth = deptActualMonthDs > 0 ? (deptActualMonthLg / deptActualMonthDs) * 100 : 0;

            const pctAchieveYearDs = deptPlanYearDs > 0 ? (deptActualYearDs / deptPlanYearDs) * 100 : 0;
            const pctAchieveYearLg = deptPlanYearLg > 0 ? (deptActualYearLg / deptPlanYearLg) * 100 : 0;
            const rateLgYear = deptActualYearDs > 0 ? (deptActualYearLg / deptActualYearDs) * 100 : 0;

            result.departments.push({
                ...dept,
                subItems,
                month: {
                    ds_kh: deptPlanMonthDs,
                    ds_th: deptActualMonthDs,
                    pct_ds: pctAchieveMonthDs,
                    lg_kh: deptPlanMonthLg,
                    lg_th: deptActualMonthLg,
                    pct_lg: pctAchieveMonthLg,
                    rate_lg: rateLgMonth
                },
                year: {
                    ds_kh: deptPlanYearDs,
                    ds_th: deptActualYearDs,
                    pct_ds: pctAchieveYearDs,
                    lg_kh: deptPlanYearLg,
                    lg_th: deptActualYearLg,
                    pct_lg: pctAchieveYearLg,
                    rate_lg: rateLgYear
                }
            });

            // Cộng dồn tổng
            result.total.month.ds_kh += deptPlanMonthDs;
            result.total.month.ds_th += deptActualMonthDs;
            result.total.month.lg_kh += deptPlanMonthLg;
            result.total.month.lg_th += deptActualMonthLg;

            result.total.year.ds_kh += deptPlanYearDs;
            result.total.year.ds_th += deptActualYearDs;
            result.total.year.lg_kh += deptPlanYearLg;
            result.total.year.lg_th += deptActualYearLg;
        });

        // Tính % đạt của tổng
        result.total.month.pct_ds = result.total.month.ds_kh > 0 ? (result.total.month.ds_th / result.total.month.ds_kh) * 100 : 0;
        result.total.month.pct_lg = result.total.month.lg_kh > 0 ? (result.total.month.lg_th / result.total.month.lg_kh) * 100 : 0;
        result.total.month.rate_lg = result.total.month.ds_th > 0 ? (result.total.month.lg_th / result.total.month.ds_th) * 100 : 0;

        result.total.year.pct_ds = result.total.year.ds_kh > 0 ? (result.total.year.ds_th / result.total.year.ds_kh) * 100 : 0;
        result.total.year.pct_lg = result.total.year.lg_kh > 0 ? (result.total.year.lg_th / result.total.year.lg_kh) * 100 : 0;
        result.total.year.rate_lg = result.total.year.ds_th > 0 ? (result.total.year.lg_th / result.total.year.ds_th) * 100 : 0;

        return result;
    },

    renderDepartmentDashboard() {
        const data = this.computeDepartmentData();
        this.renderKpiCards(data);
        this.renderDeptCharts(data);
        this.renderMatrixTableOnly();

        // Update badge and subtitles
        const companyNames = {
            'all': 'Toàn Tập Đoàn',
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
            const modeText = this.currentDeptMode === 'month' ? 'Đang xem: Theo Tháng' : 'Đang xem: Lũy kế cả năm (YTD)';
            subTitle.textContent = `ĐVT: Triệu VNĐ • Kỳ báo cáo: ${mText} • ${modeText}`;
        }

        if (window.lucide) lucide.createIcons();
    },

    renderKpiCards(data) {
        const container = document.getElementById('dept-kpi-container');
        if (!container) return;

        const isYearMode = this.currentDeptMode === 'year';
        let html = '';

        const fmt = (num) => Math.round(num || 0).toLocaleString('vi-VN');

        data.departments.forEach(dept => {
            const d = isYearMode ? dept.year : dept.month;
            const pct = d.pct_ds;

            let badgeClass = 'dept-kpi-badge-green';
            if (pct < 70) badgeClass = 'dept-kpi-badge-red';
            else if (pct < 100) badgeClass = 'dept-kpi-badge-yellow';

            const progressWidth = Math.min(100, Math.max(0, pct));
            const progressColor = pct >= 100 ? '#10b981' : (pct >= 70 ? '#f59e0b' : '#ef4444');

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
                            <span class="dept-metric-label">Doanh số ${isYearMode ? 'LK' : 'Tháng'}:</span>
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
                            <span class="dept-progress-label">Tiến độ đạt KH</span>
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
        const isYearMode = this.currentDeptMode === 'year';
        const labels = data.departments.map(d => d.shortName);
        const actualRev = data.departments.map(d => isYearMode ? Math.round(d.year.ds_th) : Math.round(d.month.ds_th));
        const planRev   = data.departments.map(d => isYearMode ? Math.round(d.year.ds_kh) : Math.round(d.month.ds_kh));
        const actualLg  = data.departments.map(d => isYearMode ? Math.round(d.year.lg_th) : Math.round(d.month.lg_th));
        const rateLg    = data.departments.map(d => parseFloat((isYearMode ? d.year.rate_lg : d.month.rate_lg).toFixed(1)));

        // Update titles
        const revTitle = document.getElementById('dept-chart-rev-title');
        if (revTitle) {
            revTitle.textContent = isYearMode 
                ? 'So Sánh Doanh Số Năm 2026: Kế Hoạch vs Lũy Kế TH (Triệu VNĐ)'
                : `So Sánh Doanh Số Tháng ${this.currentDeptMonth}: Kế Hoạch vs Thực Tế (Triệu VNĐ)`;
        }

        const profitTitle = document.getElementById('dept-chart-profit-title');
        if (profitTitle) {
            profitTitle.textContent = isYearMode
                ? 'Lãi Gộp Lũy Kế (Cột) & Tỷ Lệ % Lãi Gộp (Đường)'
                : `Lãi Gộp Tháng ${this.currentDeptMonth} (Cột) & Tỷ Lệ % Lãi Gộp (Đường)`;
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
                            ticks: {
                                callback: val => Number(val).toLocaleString('vi-VN')
                            },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        x: {
                            grid: { display: false }
                        }
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
                            ticks: {
                                callback: val => Number(val).toLocaleString('vi-VN')
                            },
                            grid: { color: 'rgba(0,0,0,0.05)' }
                        },
                        y1: {
                            type: 'linear',
                            position: 'right',
                            beginAtZero: true,
                            max: 80,
                            ticks: {
                                callback: val => val + '%'
                            },
                            grid: { display: false }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    },

    renderMatrixTableOnly() {
        const tbody = document.getElementById('deptMatrixTableBody');
        if (!tbody) return;

        const data = this.computeDepartmentData();
        let html = '';

        const fmt = (num) => Math.round(num || 0).toLocaleString('vi-VN');
        const fmtPct = (num) => (num || 0).toFixed(1) + '%';

        const getPctColor = (pct) => {
            if (pct >= 100) return '#15803d'; // Green
            if (pct >= 70)  return '#b45309'; // Yellow/Amber
            return '#dc2626'; // Red
        };

        data.departments.forEach(dept => {
            const m = dept.month;
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

                    <!-- DOANH SỐ THÁNG -->
                    <td style="text-align: right; background: #f8fafc;">${fmt(m.ds_kh)}</td>
                    <td style="text-align: right; font-weight: 600; color: #0284c7; background: #f8fafc;">${fmt(m.ds_th)}</td>
                    <td style="text-align: right; font-weight: 700; color: ${getPctColor(m.pct_ds)}; background: #f8fafc;">${fmtPct(m.pct_ds)}</td>

                    <!-- LÃI GỘP THÁNG -->
                    <td style="text-align: right; background: #f8fafc;">${fmt(m.lg_kh)}</td>
                    <td style="text-align: right; font-weight: 600; color: #16a34a; background: #f8fafc;">${fmt(m.lg_th)}</td>
                    <td style="text-align: right; font-weight: 700; color: ${getPctColor(m.pct_lg)}; background: #f8fafc;">${fmtPct(m.pct_lg)}</td>
                    <td style="text-align: right; font-weight: 700; color: #047857; background: #f0fdf4;">${fmtPct(m.rate_lg)}</td>

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

            // Hàng con (Sub-items) nếu đang mở rộng
            if (isExpanded && hasSub) {
                const selM = parseInt(this.currentDeptMonth) || 8;
                dept.subItems.forEach((item, idx) => {
                    const itDsKhMonth = Math.round(item.plan_year_ds / 12);
                    const itLgKhMonth = Math.round(item.plan_year_lg / 12);

                    let itDsThMonth = item.m8_ds;
                    let itLgThMonth = item.m8_lg;
                    if (selM !== 8) {
                        const w = [0.95, 0.65, 1.05, 0.98, 1.02, 1.04, 1.10, 1.15, 1.05, 1.08, 1.12, 1.25][selM - 1] || 1.0;
                        itDsThMonth = Math.round(item.m8_ds * (w / 1.15));
                        itLgThMonth = Math.round(item.m8_lg * (w / 1.15));
                    }

                    let itDsThYear = item.ytd_ds;
                    let itLgThYear = item.ytd_lg;
                    if (selM < 8) {
                        itDsThYear = Math.round(item.ytd_ds * (selM / 8));
                        itLgThYear = Math.round(item.ytd_lg * (selM / 8));
                    } else if (selM > 8) {
                        itDsThYear = Math.round(item.ytd_ds + (itDsKhMonth * (selM - 8)));
                        itLgThYear = Math.round(item.ytd_lg + (itLgKhMonth * (selM - 8)));
                    }

                    const itPctDsMonth = itDsKhMonth > 0 ? (itDsThMonth / itDsKhMonth) * 100 : 0;
                    const itPctLgMonth = itLgKhMonth > 0 ? (itLgThMonth / itLgKhMonth) * 100 : 0;
                    const itRateLgMonth = itDsThMonth > 0 ? (itLgThMonth / itDsThMonth) * 100 : 0;

                    const itPctDsYear = item.plan_year_ds > 0 ? (itDsThYear / item.plan_year_ds) * 100 : 0;
                    const itPctLgYear = item.plan_year_lg > 0 ? (itLgThYear / item.plan_year_lg) * 100 : 0;
                    const itRateLgYear = itDsThYear > 0 ? (itLgThYear / itDsThYear) * 100 : 0;

                    html += `
                        <tr class="dept-row-child">
                            <td style="padding-left: 32px;">
                                <span style="font-weight: 600; color: #334155;">${item.name}</span>
                                <small style="display: block; color: #94a3b8; font-size: 0.72rem;">[${item.comp}] ${item.note}</small>
                            </td>

                            <!-- DS Tháng -->
                            <td style="text-align: right; color: #64748b;">${fmt(itDsKhMonth)}</td>
                            <td style="text-align: right; color: #0284c7;">${fmt(itDsThMonth)}</td>
                            <td style="text-align: right; color: ${getPctColor(itPctDsMonth)};">${fmtPct(itPctDsMonth)}</td>

                            <!-- LG Tháng -->
                            <td style="text-align: right; color: #64748b;">${fmt(itLgKhMonth)}</td>
                            <td style="text-align: right; color: #16a34a;">${fmt(itLgThMonth)}</td>
                            <td style="text-align: right; color: ${getPctColor(itPctLgMonth)};">${fmtPct(itPctLgMonth)}</td>
                            <td style="text-align: right; color: #047857;">${fmtPct(itRateLgMonth)}</td>

                            <!-- DS Năm -->
                            <td style="text-align: right; color: #64748b;">${fmt(item.plan_year_ds)}</td>
                            <td style="text-align: right; color: #b45309;">${fmt(itDsThYear)}</td>
                            <td style="text-align: right; color: ${getPctColor(itPctDsYear)};">${fmtPct(itPctDsYear)}</td>

                            <!-- LG Năm -->
                            <td style="text-align: right; color: #64748b;">${fmt(item.plan_year_lg)}</td>
                            <td style="text-align: right; color: #7c3aed;">${fmt(itLgThYear)}</td>
                            <td style="text-align: right; color: ${getPctColor(itPctLgYear)};">${fmtPct(itPctLgYear)}</td>
                            <td style="text-align: right; color: #6b21a8;">${fmtPct(itRateLgYear)}</td>
                        </tr>
                    `;
                });
            }
        });

        // Dòng TỔNG CỘNG
        const tot = data.total;
        html += `
            <tr class="dept-row-total">
                <td style="font-weight: 800; color: #0f172a; text-transform: uppercase;">TỔNG CỘNG</td>

                <!-- DS Tháng -->
                <td style="text-align: right;">${fmt(tot.month.ds_kh)}</td>
                <td style="text-align: right; color: #0284c7;">${fmt(tot.month.ds_th)}</td>
                <td style="text-align: right; color: ${getPctColor(tot.month.pct_ds)};">${fmtPct(tot.month.pct_ds)}</td>

                <!-- LG Tháng -->
                <td style="text-align: right;">${fmt(tot.month.lg_kh)}</td>
                <td style="text-align: right; color: #16a34a;">${fmt(tot.month.lg_th)}</td>
                <td style="text-align: right; color: ${getPctColor(tot.month.pct_lg)};">${fmtPct(tot.month.pct_lg)}</td>
                <td style="text-align: right; color: #047857;">${fmtPct(tot.month.rate_lg)}</td>

                <!-- DS Năm -->
                <td style="text-align: right;">${fmt(tot.year.ds_kh)}</td>
                <td style="text-align: right; color: #b45309;">${fmt(tot.year.ds_th)}</td>
                <td style="text-align: right; color: ${getPctColor(tot.year.pct_ds)};">${fmtPct(tot.year.pct_ds)}</td>

                <!-- LG Năm -->
                <td style="text-align: right;">${fmt(tot.year.lg_kh)}</td>
                <td style="text-align: right; color: #7c3aed;">${fmt(tot.year.lg_th)}</td>
                <td style="text-align: right; color: ${getPctColor(tot.year.pct_lg)};">${fmtPct(tot.year.pct_lg)}</td>
                <td style="text-align: right; color: #6b21a8;">${fmtPct(tot.year.rate_lg)}</td>
            </tr>
        `;

        tbody.innerHTML = html;
    },

    exportDeptExcel() {
        const data = this.computeDepartmentData();
        const selM = this.currentDeptMonth;
        const selComp = this.currentDeptCompany;

        let csvContent = '\uFEFF'; // UTF-8 BOM để Excel hiển thị đúng tiếng Việt
        csvContent += `BÁO CÁO DOANH SỐ VÀ LÃI GỘP 7 PHÒNG BAN - TẬP ĐOÀN VPS\n`;
        csvContent += `Đơn vị: ${selComp} - Kỳ báo cáo: Tháng ${selM}/2026\n`;
        csvContent += `Đơn vị tính: Triệu VNĐ\n\n`;

        csvContent += `"STT","PHÒNG BAN / MẢNG KINH DOANH","DS KH THÁNG","DS TH THÁNG","% ĐẠT DS THÁNG","LG KH THÁNG","LG TH THÁNG","% ĐẠT LG THÁNG","% LG THÁNG","DS KH NĂM","DS TH NĂM (LK)","% ĐẠT DS NĂM","LG KH NĂM","LG TH NĂM (LK)","% ĐẠT LG NĂM","% LG NĂM"\n`;

        data.departments.forEach(dept => {
            const m = dept.month;
            const y = dept.year;
            csvContent += `"${dept.num}","${dept.name}","${Math.round(m.ds_kh)}","${Math.round(m.ds_th)}","${m.pct_ds.toFixed(1)}%","${Math.round(m.lg_kh)}","${Math.round(m.lg_th)}","${m.pct_lg.toFixed(1)}%","${m.rate_lg.toFixed(1)}%","${Math.round(y.ds_kh)}","${Math.round(y.ds_th)}","${y.pct_ds.toFixed(1)}%","${Math.round(y.lg_kh)}","${Math.round(y.lg_th)}","${y.pct_lg.toFixed(1)}%","${y.rate_lg.toFixed(1)}%"\n`;

            if (dept.subItems) {
                dept.subItems.forEach(item => {
                    const itDsKhMonth = Math.round(item.plan_year_ds / 12);
                    const itLgKhMonth = Math.round(item.plan_year_lg / 12);
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
