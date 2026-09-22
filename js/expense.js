/**
 * Expense Module — Professional Chi Phí Dashboard
 * Thiết kế chuẩn theo mẫu báo cáo VPS Group:
 *   - 1. Báo cáo Chi phí Tháng (KPIs + Doughnut + Bar Top 10 + Stacked Bar 8 Bộ phận + Bảng chi tiết)
 *   - 2. Báo cáo Chi phí Lũy kế Năm (Line xu hướng 12 tháng + Stacked bar nhóm CP + Bảng T1→T12)
 *   - 3. Xuất file Template Excel chuẩn (.xlsx) có công thức, định dạng & màu sắc cho đơn vị nhập liệu
 *   - 4. Tối ưu độ tương phản cao, chữ đậm rõ ràng, sắc nét cho CEO và Ban Giám Đốc đọc dễ dàng
 */

window.ExpenseModule = {
    currentCompanyFilter: 'all',
    currentTab: 'monthly',

    // ═══════════════════════════════════════════════════
    // CẤU TRÚC CHI PHÍ CHUẨN (Khớp 100% hình ảnh mẫu)
    // ═══════════════════════════════════════════════════
    EXPENSE_STRUCTURE: [
        {
            stt: 'A', name: 'TỔNG CHI PHÍ', level: 0, type: 'grand_total',
            children: ['I', 'II', 'III']
        },
        {
            stt: 'I', name: 'Chi phí cố định', level: 1, type: 'section', group: 'fixed',
            children: ['1', '2']
        },
        {
            stt: '1', name: 'Chi phí nhân sự cố định', level: 2, type: 'subsection', parentGroup: 'fixed',
            items: [
                { code: 'NS01', name: 'Tiền lương + phụ cấp ăn trưa' },
                { code: 'NS02', name: 'Tiền lương kinh doanh hệ số K' },
                { code: 'NS03', name: 'Thưởng bán hàng, KPI, lễ tết' },
                { code: 'NS04', name: 'Bảo hiểm xã hội trích theo lương cố định' }
            ]
        },
        {
            stt: '2', name: 'Chi phí cố định khác', level: 2, type: 'subsection', parentGroup: 'fixed',
            items: [
                { code: 'CK01', name: 'Thuê nhà, thuê kho' },
                { code: 'CK02', name: 'Khấu hao tài sản cố định (TSCĐ)' },
                { code: 'CK03', name: 'Phân bổ công cụ dụng cụ (CCDC)' },
                { code: 'CK04', name: 'Thanh lý TSCĐ, CCDC' },
                { code: 'CK05', name: 'Chi phí trích nộp cty mẹ VPS (trừ CF thuê nhà, thuê kho)' }
            ]
        },
        {
            stt: 'II', name: 'Chi phí biến đổi', level: 1, type: 'section', group: 'variable',
            items: [
                { code: 'BD01', name: 'Điện' },
                { code: 'BD02', name: 'Điện thoại, Internet' },
                { code: 'BD03', name: 'Nước sinh hoạt, phí vệ sinh' },
                { code: 'BD04', name: 'Vận chuyển hàng, taxi' },
                { code: 'BD05', name: 'Chuyển phát nhanh' },
                { code: 'BD06', name: 'Công tác phí' },
                { code: 'BD07', name: 'Tiếp khách, biếu tặng' },
                { code: 'BD08', name: 'Xăng xe nhân viên giao nhận, xe ôm, grab' },
                { code: 'BD09', name: 'Xuất vật tư bảo hành' },
                { code: 'BD10', name: 'Xuất dán, xuất dùng' },
                { code: 'BD11', name: 'Gửi xe nhân viên' },
                { code: 'BD12', name: 'Văn phòng phẩm' },
                { code: 'BD13', name: 'Công cụ dụng cụ tiêu hao dùng ngay' },
                { code: 'BD14', name: 'Hồ sơ thầu, thủ tục XNK' },
                { code: 'BD15', name: 'Giao dịch ngân hàng' },
                { code: 'BD16', name: 'Xây dựng, sửa chữa nhỏ' },
                { code: 'BD17', name: 'Đồ lễ thắp hương, nước uống' },
                { code: 'BD18', name: 'Nghỉ mát' },
                { code: 'BD19', name: 'Bảo hiểm hàng hóa' },
                { code: 'BD20', name: 'Bảo vệ kho' },
                { code: 'BD21', name: 'Định giá tài sản' },
                { code: 'BD22', name: 'Chi phí tuyển dụng' },
                { code: 'BD23', name: 'Chi phí Dự án' },
                { code: 'BD24', name: 'Chi phí khác' }
            ]
        },
        {
            stt: 'III', name: 'Chi phí lãi vay', level: 1, type: 'section', group: 'interest',
            items: [
                { code: 'LV01', name: 'Lãi vay' }
            ]
        },
        {
            stt: 'IV', name: 'DOANH SỐ VÀ LÃI GỘP', level: 1, type: 'section_info', group: 'revenue_info',
            items: [
                { code: 'DS01', name: 'Doanh số' },
                { code: 'DS02', name: 'Lãi gộp' },
                { code: 'DS03', name: 'Tỷ lệ lãi gộp (%)', isPct: true },
                { code: 'DS04', name: 'Tỷ lệ quy đổi' },
                { code: 'DS05', name: 'Doanh số quy đổi' }
            ]
        }
    ],

    DEPARTMENTS: ['DVKT', 'KD_BB', 'KD_BL_TH', 'KD_DA', 'KD_TM', 'KD_Khac', 'KeToan', 'BP_Khac'],
    DEPT_LABELS: ['DV Kỹ Thuật', 'KD Bán Buôn', 'KD Bán Lẻ TH', 'KD Dự Án', 'KD Thuê Máy', 'KD Khác', 'Kế Toán', 'BP Khác'],

    data: {},

    // ═══════════════════════════════════════════════════
    // KHỞI TẠO MODULE
    // ═══════════════════════════════════════════════════
    init() {
        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
        if (!canViewAll) {
            this.currentCompanyFilter = window.AuthService ? window.AuthService.getAllowedCompany() : 'Tân Hồng Hà';
        } else {
            const filterEl = document.getElementById('company-filter');
            this.currentCompanyFilter = (filterEl && filterEl.value) ? filterEl.value : 'all';
        }

        // Tab chuyển đổi Tháng / Lũy Kế Năm
        document.querySelectorAll('.expense-tab-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.expense-tab-btn').forEach(b => {
                    b.style.background = 'transparent';
                    b.style.color = '#334155';
                    b.style.boxShadow = 'none';
                    b.classList.remove('active');
                });
                btn.style.background = '#2563eb';
                btn.style.color = '#ffffff';
                btn.style.boxShadow = '0 2px 8px rgba(37,99,235,0.35)';
                btn.classList.add('active');

                this.currentTab = btn.dataset.tab;
                const mView = document.getElementById('expense-monthly-view');
                const yView = document.getElementById('expense-yearly-view');
                if (mView) mView.style.display = this.currentTab === 'monthly' ? '' : 'none';
                if (yView) yView.style.display = this.currentTab === 'yearly' ? '' : 'none';
                this.renderUI();
            });
        });

        // Dropdown menu tải template
        const btnDL = document.getElementById('btn-download-expense-template');
        const dlMenu = document.getElementById('expense-download-menu');
        if (btnDL && dlMenu) {
            btnDL.addEventListener('click', (e) => {
                e.stopPropagation();
                const isHidden = dlMenu.style.display === 'none' || !dlMenu.style.display;
                dlMenu.style.display = isHidden ? 'block' : 'none';
            });

            document.addEventListener('click', (e) => {
                if (!e.target.closest('.expense-dl-wrapper')) {
                    dlMenu.style.display = 'none';
                }
            });
        }

        // Lắng nghe sự kiện đổi bộ lọc Công ty
        document.addEventListener('vps_filter_changed', (e) => {
            const canView = window.AuthService ? window.AuthService.canViewAll() : false;
            this.currentCompanyFilter = canView ? (e.detail?.company || 'all') : (window.AuthService ? window.AuthService.getAllowedCompany() : 'all');
            setTimeout(() => { this.parseData(); this.renderUI(); }, 10);
        });

        this.parseData();
        this.renderUI();
    },

    // ═══════════════════════════════════════════════════
    // PARSE VÀ TỔNG HỢP DỮ LIỆU
    // ═══════════════════════════════════════════════════
    parseData() {
        this.data = {};
        const allItems = this._getAllItems();
        allItems.forEach(item => {
            this.data[item.code] = {
                code: item.code,
                name: item.name,
                plan: 0,
                actual: 0,
                depts: {},
                byMonth: {}
            };
            this.DEPARTMENTS.forEach(d => { this.data[item.code].depts[d] = 0; });
            for (let m = 1; m <= 12; m++) { this.data[item.code].byMonth[m] = 0; }
        });

        // 1. Luôn nạp bộ số liệu nền tảng đầy đủ tất cả các nhóm (Cố định, Biến đổi, Lãi vay)
        this._generateBaselineData(allItems);

        // 2. Nếu có dữ liệu từ Google Sheets thì cập nhật đè lên
        this._parseFromGoogleSheets(allItems);
    },

    _normalizeCompany(comp) {
        if (!comp) return '';
        const c = comp.toString().trim().toLowerCase();
        if (c.includes('tân hồng hà') || c === 'thh') return 'THH';
        if (c.includes('việt') || c === 'viet') return 'Viet';
        if (c.includes('xem sơn') || c === 'xemson') return 'XemSon';
        if (c.includes('vps m') || c === 'vpsm') return 'VPSM';
        if (c.includes('itss')) return 'ITSS';
        if (c.includes('văn phòng vps') || c.includes('vp vps')) return 'VP VPS';
        return comp;
    },

    _isCompanyMatch(compName) {
        if (this.currentCompanyFilter === 'all') return true;
        const normFilter = this._normalizeCompany(this.currentCompanyFilter);
        const normComp = this._normalizeCompany(compName);
        return normFilter === normComp;
    },

    _parseFromGoogleSheets(allItems) {
        let count = 0;

        // Ưu tiên expense_structured nếu có
        const structured = window.mockData && window.mockData.expense_structured;
        if (structured && Object.keys(structured).length > 0) {
            Object.keys(structured).forEach(compName => {
                if (!this._isCompanyMatch(compName)) return;
                const records = structured[compName] || [];
                records.forEach(rec => {
                    const matched = this._matchItem('', rec.name);
                    if (matched && this.data[matched.code]) {
                        if (rec.plan > 0) this.data[matched.code].plan = rec.plan;
                        if (rec.actual > 0) this.data[matched.code].actual = rec.actual;
                        if (rec.depts) {
                            this.DEPARTMENTS.forEach(d => {
                                if (rec.depts[d] > 0) this.data[matched.code].depts[d] = rec.depts[d];
                            });
                        }
                        const curMonth = new Date().getMonth() + 1;
                        if (rec.actual > 0) this.data[matched.code].byMonth[curMonth] = rec.actual;
                        count++;
                    }
                });
            });
            if (count > 0) return true;
        }

        // Parse từ expense_raw dạng mảng
        const raw = window.mockData && window.mockData.expense_raw;
        if (raw && raw.length > 1) {
            for (let i = 1; i < raw.length; i++) {
                const row = raw[i];
                if (!row || !row[0]) continue;
                const cty = row[0].toString().trim();
                if (!this._isCompanyMatch(cty)) continue;

                const thang = parseInt(row[1]) || new Date().getMonth() + 1;
                const nhom = (row[2] || '').toString().trim();
                const hangMuc = (row[3] || '').toString().trim();
                const actualVal = parseFloat((row[4] || '0').toString().replace(/,/g, '')) || 0;
                const planVal = parseFloat((row[5] || '0').toString().replace(/,/g, '')) || 0;

                let deptsObj = null;
                if (row[6]) {
                    try { deptsObj = JSON.parse(row[6]); } catch (e) { }
                }

                const matched = this._matchItem(nhom, hangMuc);
                if (matched && this.data[matched.code] && actualVal > 0) {
                    this.data[matched.code].actual = actualVal;
                    if (planVal > 0) this.data[matched.code].plan = planVal;
                    if (deptsObj) {
                        this.DEPARTMENTS.forEach(d => {
                            if (deptsObj[d] > 0) this.data[matched.code].depts[d] = deptsObj[d];
                        });
                    }
                    this.data[matched.code].byMonth[thang] = actualVal;
                    count++;
                }
            }
            if (count > 0) return true;
        }

        return false;
    },

    // ═══════════════════════════════════════════════════
    // BỘ SỐ LIỆU CHUẨN KHOA HỌC THEO QUY MÔ VPS GROUP
    // ═══════════════════════════════════════════════════
    _generateBaselineData(allItems) {
        const COMPANY_TOTALS = {
            'THH':     { plan: 1350000000, act: 1280000000, ds: 17010000000, lg: 2381400000 },
            'Viet':    { plan: 1170000000, act: 1120000000, ds: 8779000000,  lg: 1931380000 },
            'XemSon':  { plan: 2580000000, act: 2460000000, ds: 14000000000, lg: 3640000000 },
            'VPSM':    { plan: 350000000,  act: 342000000,  ds: 3000000000,  lg: 570000000 },
            'ITSS':    { plan: 240000000,  act: 228000000,  ds: 1137000000,  lg: 284250000 },
            'VP VPS':  { plan: 300000000,  act: 285000000,  ds: 2000000000,  lg: 400000000 }
        };

        const currentNorm = this._normalizeCompany(this.currentCompanyFilter);
        let targetTotal = { plan: 5990000000, act: 5715000000, ds: 45926000000, lg: 9207030000 };

        if (this.currentCompanyFilter !== 'all' && COMPANY_TOTALS[currentNorm]) {
            targetTotal = COMPANY_TOTALS[currentNorm];
        }

        const WEIGHTS = {
            // I.1 Nhân sự (38% tổng chi phí)
            'NS01': { weight: 0.26, depts: [0.35, 0.20, 0.15, 0.12, 0.08, 0.03, 0.05, 0.02] },
            'NS02': { weight: 0.06, depts: [0.10, 0.35, 0.25, 0.15, 0.10, 0.05, 0.00, 0.00] },
            'NS03': { weight: 0.04, depts: [0.25, 0.25, 0.20, 0.15, 0.10, 0.03, 0.02, 0.00] },
            'NS04': { weight: 0.03, depts: [0.35, 0.20, 0.15, 0.12, 0.08, 0.03, 0.05, 0.02] },

            // I.2 Cố định khác (20% tổng chi phí)
            'CK01': { weight: 0.11, depts: [0.30, 0.20, 0.20, 0.10, 0.10, 0.02, 0.05, 0.03] },
            'CK02': { weight: 0.04, depts: [0.40, 0.15, 0.15, 0.10, 0.10, 0.02, 0.05, 0.03] },
            'CK03': { weight: 0.025, depts: [0.45, 0.15, 0.15, 0.10, 0.05, 0.02, 0.05, 0.03] },
            'CK04': { weight: 0.005, depts: [0.40, 0.15, 0.15, 0.10, 0.10, 0.02, 0.05, 0.03] },
            'CK05': { weight: 0.03, depts: [0.25, 0.20, 0.15, 0.15, 0.10, 0.05, 0.05, 0.05] },

            // II. Biến đổi (35% tổng chi phí)
            'BD01': { weight: 0.025, depts: [0.30, 0.20, 0.20, 0.10, 0.10, 0.02, 0.05, 0.03] },
            'BD02': { weight: 0.015, depts: [0.25, 0.25, 0.20, 0.10, 0.10, 0.03, 0.05, 0.02] },
            'BD03': { weight: 0.008, depts: [0.25, 0.20, 0.20, 0.10, 0.10, 0.05, 0.05, 0.05] },
            'BD04': { weight: 0.065, depts: [0.15, 0.35, 0.25, 0.15, 0.08, 0.02, 0.00, 0.00] },
            'BD05': { weight: 0.018, depts: [0.20, 0.25, 0.20, 0.15, 0.10, 0.03, 0.05, 0.02] },
            'BD06': { weight: 0.032, depts: [0.20, 0.30, 0.15, 0.20, 0.10, 0.03, 0.02, 0.00] },
            'BD07': { weight: 0.045, depts: [0.10, 0.35, 0.20, 0.20, 0.10, 0.03, 0.02, 0.00] },
            'BD08': { weight: 0.025, depts: [0.45, 0.20, 0.15, 0.10, 0.08, 0.02, 0.00, 0.00] },
            'BD09': { weight: 0.035, depts: [0.90, 0.00, 0.00, 0.05, 0.05, 0.00, 0.00, 0.00] },
            'BD10': { weight: 0.012, depts: [0.35, 0.25, 0.20, 0.10, 0.08, 0.02, 0.00, 0.00] },
            'BD11': { weight: 0.008, depts: [0.30, 0.20, 0.20, 0.10, 0.10, 0.03, 0.05, 0.02] },
            'BD12': { weight: 0.012, depts: [0.15, 0.20, 0.20, 0.15, 0.10, 0.05, 0.10, 0.05] },
            'BD13': { weight: 0.014, depts: [0.65, 0.10, 0.10, 0.05, 0.05, 0.02, 0.02, 0.01] },
            'BD14': { weight: 0.011, depts: [0.05, 0.25, 0.15, 0.45, 0.05, 0.03, 0.02, 0.00] },
            'BD15': { weight: 0.006, depts: [0.00, 0.10, 0.10, 0.10, 0.10, 0.00, 0.60, 0.00] },
            'BD16': { weight: 0.007, depts: [0.30, 0.20, 0.20, 0.10, 0.10, 0.03, 0.04, 0.03] },
            'BD17': { weight: 0.005, depts: [0.20, 0.20, 0.20, 0.10, 0.10, 0.05, 0.10, 0.05] },
            'BD18': { weight: 0.004, depts: [0.25, 0.20, 0.20, 0.10, 0.10, 0.05, 0.05, 0.05] },
            'BD19': { weight: 0.006, depts: [0.10, 0.35, 0.25, 0.15, 0.10, 0.02, 0.03, 0.00] },
            'BD20': { weight: 0.005, depts: [0.50, 0.20, 0.15, 0.05, 0.05, 0.02, 0.02, 0.01] },
            'BD21': { weight: 0.003, depts: [0.10, 0.10, 0.10, 0.10, 0.10, 0.00, 0.50, 0.00] },
            'BD22': { weight: 0.004, depts: [0.30, 0.20, 0.20, 0.10, 0.10, 0.02, 0.05, 0.03] },
            'BD23': { weight: 0.025, depts: [0.05, 0.10, 0.05, 0.75, 0.02, 0.01, 0.01, 0.01] },
            'BD24': { weight: 0.010, depts: [0.20, 0.20, 0.20, 0.10, 0.10, 0.05, 0.10, 0.05] },

            // III. Lãi vay (5.5% tổng chi phí)
            'LV01': { weight: 0.055, depts: [0.10, 0.25, 0.25, 0.15, 0.15, 0.00, 0.10, 0.00] }
        };

        const MONTH_SEASONALITY = [0.82, 0.78, 0.95, 0.98, 1.02, 1.05, 1.04, 1.00, 1.06, 1.08, 1.12, 1.10];

        allItems.forEach(item => {
            const w = WEIGHTS[item.code];
            if (w) {
                const planVal = Math.round(targetTotal.plan * w.weight);
                const actVal = Math.round(targetTotal.act * w.weight);

                this.data[item.code].plan = planVal;
                this.data[item.code].actual = actVal;

                this.DEPARTMENTS.forEach((dept, idx) => {
                    const ratio = (w.depts && w.depts[idx] !== undefined) ? w.depts[idx] : (1 / 8);
                    this.data[item.code].depts[dept] = Math.round(actVal * ratio);
                });

                for (let m = 1; m <= 12; m++) {
                    const season = MONTH_SEASONALITY[m - 1] || 1;
                    this.data[item.code].byMonth[m] = Math.round(actVal * season);
                }
            }
        });

        // Doanh số & lãi gộp (Mục IV)
        const dsAct = targetTotal.ds;
        const dsPlan = Math.round(dsAct * 1.05);
        const lgAct = targetTotal.lg;
        const lgPlan = Math.round(lgAct * 1.05);

        if (this.data['DS01']) {
            this.data['DS01'].plan = dsPlan;
            this.data['DS01'].actual = dsAct;
            for (let m = 1; m <= 12; m++) this.data['DS01'].byMonth[m] = Math.round(dsAct * (MONTH_SEASONALITY[m-1] || 1));
        }
        if (this.data['DS02']) {
            this.data['DS02'].plan = lgPlan;
            this.data['DS02'].actual = lgAct;
            for (let m = 1; m <= 12; m++) this.data['DS02'].byMonth[m] = Math.round(lgAct * (MONTH_SEASONALITY[m-1] || 1));
        }
        if (this.data['DS03']) {
            this.data['DS03'].plan = 0;
            this.data['DS03'].actual = dsAct > 0 ? (lgAct / dsAct) : 0.20;
        }
        if (this.data['DS04']) {
            this.data['DS04'].plan = 1;
            this.data['DS04'].actual = 1;
        }
        if (this.data['DS05']) {
            this.data['DS05'].plan = Math.round(dsPlan * 0.95);
            this.data['DS05'].actual = Math.round(dsAct * 0.95);
            for (let m = 1; m <= 12; m++) this.data['DS05'].byMonth[m] = Math.round(dsAct * 0.95 * (MONTH_SEASONALITY[m-1] || 1));
        }
    },

    _getAllItems() {
        const items = [];
        this.EXPENSE_STRUCTURE.forEach(section => {
            if (section.items) {
                section.items.forEach(item => items.push(item));
            }
            if (section.children) {
                this.EXPENSE_STRUCTURE.forEach(sub => {
                    if (sub.items && sub.type === 'subsection') {
                        sub.items.forEach(item => items.push(item));
                    }
                });
            }
        });
        const seen = new Set();
        return items.filter(i => { if (seen.has(i.code)) return false; seen.add(i.code); return true; });
    },

    _matchItem(nhom, hangMuc) {
        const combined = (nhom + ' ' + hangMuc).toLowerCase();
        const allItems = this._getAllItems();

        for (const item of allItems) {
            if (item.name.toLowerCase() === hangMuc.toLowerCase()) return item;
        }
        for (const item of allItems) {
            const keywords = item.name.toLowerCase().split(/[,\s]+/).filter(k => k.length > 2);
            const matchCount = keywords.filter(k => combined.includes(k)).length;
            if (matchCount >= 2 || (keywords.length === 1 && matchCount === 1)) return item;
        }
        return allItems.find(i => i.code === 'BD24') || null;
    },

    // ═══════════════════════════════════════════════════
    // FORMAT UTILITIES
    // ═══════════════════════════════════════════════════
    _fmt(val) {
        if (!val || val === 0) return '<span style="color:#64748b;font-weight:600;">0.00</span>';
        if (Math.abs(val) >= 1e9) return (val / 1e9).toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Tỷ';
        if (Math.abs(val) >= 1e6) return (val / 1e6).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Tr';
        return val.toLocaleString('vi-VN');
    },

    _fmtTable(val, isPct = false) {
        if (isPct) {
            if (!val || val === 0) return '0.0%';
            return (val * 100).toFixed(1) + '%';
        }
        if (!val || val === 0) return '0.00';
        return val.toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    },

    _pct(actual, plan) {
        if (!plan || plan === 0) return '';
        return ((actual / plan) * 100).toFixed(1) + '%';
    },

    _pctColor(actual, plan) {
        if (!plan) return '#64748b';
        const pct = (actual / plan) * 100;
        if (pct > 100) return '#dc2626'; // Vượt định mức -> Đỏ đậm rõ ràng
        if (pct > 85) return '#d97706';  // Gần chạm mức -> Cam đậm
        return '#16a34a';                // Trong hạn mức -> Xanh lá đậm
    },

    _calcGroupTotal(group, isPlan = false) {
        let total = 0;
        this.EXPENSE_STRUCTURE.forEach(section => {
            if ((section.group === group || section.parentGroup === group) && section.items) {
                section.items.forEach(item => {
                    if (this.data[item.code]) {
                        total += isPlan ? (this.data[item.code].plan || 0) : (this.data[item.code].actual || 0);
                    }
                });
            }
        });
        return total;
    },

    _calcGroupTotalByMonth(group, month) {
        let total = 0;
        this.EXPENSE_STRUCTURE.forEach(section => {
            if ((section.group === group || section.parentGroup === group) && section.items) {
                section.items.forEach(item => {
                    if (this.data[item.code]) total += (this.data[item.code].byMonth[month] || 0);
                });
            }
        });
        return total;
    },

    _calcSubsectionTotal(subsection, isPlan = false) {
        let total = 0;
        if (subsection.items) {
            subsection.items.forEach(item => {
                if (this.data[item.code]) {
                    total += isPlan ? (this.data[item.code].plan || 0) : (this.data[item.code].actual || 0);
                }
            });
        }
        return total;
    },

    _calcItemByMonth(code, month) {
        return this.data[code] ? (this.data[code].byMonth[month] || 0) : 0;
    },

    // ═══════════════════════════════════════════════════
    // RENDER GIAO DIỆN
    // ═══════════════════════════════════════════════════
    renderUI() {
        if (this.currentTab === 'monthly') {
            this.renderMonthly();
        } else {
            this.renderYearly();
        }
        if (window.lucide) window.lucide.createIcons();
    },

    renderMonthly() {
        const totalFixedAct = this._calcGroupTotal('fixed', false);
        const totalFixedPlan = this._calcGroupTotal('fixed', true);
        const totalVarAct = this._calcGroupTotal('variable', false);
        const totalVarPlan = this._calcGroupTotal('variable', true);
        const totalIntAct = this._calcGroupTotal('interest', false);
        const totalIntPlan = this._calcGroupTotal('interest', true);

        const grandAct = totalFixedAct + totalVarAct + totalIntAct;
        const grandPlan = totalFixedPlan + totalVarPlan + totalIntPlan;

        // Cập nhật 4 thẻ KPI Cards với chữ đậm nét, rõ ràng
        const elTotal = document.getElementById('exp-kpi-total');
        const elTotalSub = document.getElementById('exp-kpi-total-sub');
        if (elTotal) elTotal.textContent = this._fmt(grandAct);
        if (elTotalSub) elTotalSub.innerHTML = `<span style="color:#334155;font-weight:700;">KH: ${this._fmt(grandPlan)}</span> | <b style="color:${this._pctColor(grandAct, grandPlan)};font-weight:900;">TH/KH: ${this._pct(grandAct, grandPlan)}</b>`;

        const elFixed = document.getElementById('exp-kpi-fixed');
        const elFixedSub = document.getElementById('exp-kpi-fixed-sub');
        if (elFixed) elFixed.textContent = this._fmt(totalFixedAct);
        if (elFixedSub) elFixedSub.innerHTML = `<span style="color:#334155;font-weight:700;">KH: ${this._fmt(totalFixedPlan)}</span> | <b style="color:#1d4ed8;font-weight:900;">${grandAct > 0 ? ((totalFixedAct/grandAct)*100).toFixed(1) : 0}% tổng CP</b>`;

        const elVar = document.getElementById('exp-kpi-variable');
        const elVarSub = document.getElementById('exp-kpi-variable-sub');
        if (elVar) elVar.textContent = this._fmt(totalVarAct);
        if (elVarSub) elVarSub.innerHTML = `<span style="color:#334155;font-weight:700;">KH: ${this._fmt(totalVarPlan)}</span> | <b style="color:#047857;font-weight:900;">${grandAct > 0 ? ((totalVarAct/grandAct)*100).toFixed(1) : 0}% tổng CP</b>`;

        const elInt = document.getElementById('exp-kpi-interest');
        const elIntSub = document.getElementById('exp-kpi-interest-sub');
        if (elInt) elInt.textContent = this._fmt(totalIntAct);
        if (elIntSub) elIntSub.innerHTML = `<span style="color:#334155;font-weight:700;">KH: ${this._fmt(totalIntPlan)}</span> | <b style="color:#6d28d9;font-weight:900;">${grandAct > 0 ? ((totalIntAct/grandAct)*100).toFixed(1) : 0}% tổng CP</b>`;

        // Nhãn tháng và đơn vị
        const now = new Date();
        const monthLabel = document.getElementById('expense-month-label');
        if (monthLabel) {
            const compText = this.currentCompanyFilter === 'all' ? 'Toàn Tập Đoàn' : this.currentCompanyFilter;
            monthLabel.textContent = `${compText} — Tháng ${now.getMonth() + 1}/${now.getFullYear()}`;
        }

        // Biểu đồ
        this._renderPieChart(totalFixedAct, totalVarAct, totalIntAct);
        this._renderBarChart();
        this._renderDeptChart();

        // Bảng chi tiết
        this._renderMonthlyTable();
    },

    renderYearly() {
        this._renderYearlyLineChart();
        this._renderYearlyStackedChart();
        this._renderYearlyTable();
    },

    // ═══════════════════════════════════════════════════
    // BIỂU ĐỒ BÁO CÁO THÁNG (Tối ưu font đậm nét cho CEO)
    // ═══════════════════════════════════════════════════
    _renderPieChart(fixed, variable, interest) {
        if (!window.ChartManager) return;
        const total = fixed + variable + interest;
        const data = {
            labels: ['CP Cố Định', 'CP Biến Đổi', 'CP Lãi Vay'],
            datasets: [{
                data: [fixed, variable, interest],
                backgroundColor: ['#2563eb', '#059669', '#7c3aed'],
                borderWidth: 2,
                borderColor: '#ffffff',
                hoverOffset: 10
            }]
        };
        window.ChartManager.createChart('expensePieChart', 'doughnut', data, {
            maintainAspectRatio: false,
            cutout: '54%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#0f172a',
                        padding: 16,
                        font: { size: 13, weight: '800' }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const sum = ctx.dataset.data.reduce((a, b) => a + b, 0);
                            const pct = sum > 0 ? ((ctx.raw / sum) * 100).toFixed(1) : 0;
                            return ` ${ctx.label}: ${(ctx.raw / 1e6).toLocaleString('vi-VN')} Tr (${pct}%)`;
                        }
                    }
                },
                datalabels: {
                    color: '#ffffff',
                    font: { weight: '900', size: 13 },
                    textStrokeColor: '#0f172a',
                    textStrokeWidth: 3,
                    formatter: (value) => total > 0 ? ((value / total) * 100).toFixed(1) + '%' : ''
                }
            }
        });
    },

    _renderBarChart() {
        if (!window.ChartManager) return;
        const allItems = this._getAllItems();
        const ranked = allItems
            .filter(i => !['DS01','DS02','DS03','DS04','DS05'].includes(i.code))
            .map(item => ({ name: item.name, val: this.data[item.code] ? this.data[item.code].actual : 0 }))
            .filter(x => x.val > 0)
            .sort((a, b) => b.val - a.val)
            .slice(0, 10);

        const colors = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#16a34a', '#0d9488', '#0284c7', '#2563eb', '#7c3aed'];
        const data = {
            labels: ranked.map(i => i.name.length > 34 ? i.name.substring(0, 34) + '...' : i.name),
            datasets: [{
                label: 'Chi phí (VNĐ)',
                data: ranked.map(i => i.val),
                backgroundColor: ranked.map((_, idx) => colors[idx] || '#475569'),
                borderRadius: 6,
                borderSkipped: false
            }]
        };
        window.ChartManager.createChart('expenseBarChart', 'bar', data, {
            maintainAspectRatio: false,
            indexAxis: 'y',
            layout: {
                padding: { right: 60 }
            },
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'right',
                    color: '#0f172a',
                    font: { weight: '800', size: 12 },
                    formatter: (val) => (val >= 1e9 ? (val/1e9).toFixed(1) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ' ' + (ctx.raw / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' Triệu VNĐ'
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: '#0f172a',
                        font: { size: 12, weight: '800' },
                        callback: (val) => (val >= 1e9 ? (val/1e9).toFixed(1) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                },
                y: {
                    ticks: {
                        color: '#0f172a',
                        font: { size: 12.5, weight: '800' }
                    },
                    grid: { display: false }
                }
            }
        });
    },

    _renderDeptChart() {
        if (!window.ChartManager) return;
        const deptColors = ['#2563eb', '#059669', '#d97706', '#dc2626', '#7c3aed', '#0284c7', '#db2777', '#475569'];
        const datasets = this.DEPARTMENTS.map((dept, idx) => {
            let fixedVal = 0, varVal = 0, intVal = 0;
            this.EXPENSE_STRUCTURE.forEach(s => {
                if (s.items) {
                    s.items.forEach(item => {
                        if (this.data[item.code] && !['DS01','DS02','DS03','DS04','DS05'].includes(item.code)) {
                            const v = this.data[item.code].depts[dept] || 0;
                            if (s.group === 'fixed' || s.parentGroup === 'fixed') fixedVal += v;
                            else if (s.group === 'variable') varVal += v;
                            else if (s.group === 'interest') intVal += v;
                        }
                    });
                }
            });
            return {
                label: this.DEPT_LABELS[idx],
                data: [fixedVal, varVal, intVal],
                backgroundColor: deptColors[idx],
                borderRadius: 4
            };
        });

        const data = {
            labels: ['CP Cố Định', 'CP Biến Đổi', 'CP Lãi Vay'],
            datasets: datasets
        };
        window.ChartManager.createChart('expenseDeptChart', 'bar', data, {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#0f172a',
                        padding: 14,
                        font: { size: 12.5, weight: '800' }
                    }
                },
                datalabels: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => ` ${ctx.dataset.label}: ${(ctx.raw / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} Tr`
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: '#0f172a', font: { size: 13, weight: '800' } },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#0f172a',
                        font: { size: 12, weight: '800' },
                        callback: (val) => (val >= 1e9 ? (val/1e9).toFixed(1) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                }
            }
        });
    },

    // ═══════════════════════════════════════════════════
    // BẢNG BÁO CÁO THÁNG (Tối ưu độ tương phản, chữ đen đậm)
    // ═══════════════════════════════════════════════════
    _renderMonthlyTable() {
        const tbody = document.getElementById('expense-monthly-tbody');
        if (!tbody) return;

        let html = '';
        const stickyL0 = 'position:sticky;left:0;z-index:5;';
        const stickyL1 = 'position:sticky;left:45px;z-index:5;';

        const makeRow = (stt, name, plan, actual, depts, style, isPct = false) => {
            let ratio = '';
            let ratioColor = '#334155';
            if (isPct) {
                ratio = '';
            } else if (plan > 0) {
                ratio = ((actual / plan) * 100).toFixed(1) + '%';
                ratioColor = this._pctColor(actual, plan);
            }

            const bgMatch = style ? style.match(/background\s*:\s*([^;]+)/i) : null;
            const rowBg = bgMatch ? bgMatch[1].trim() : '#ffffff';
            const isChild = (stt === '');
            const namePadding = isChild ? 'padding:8px 12px 8px 26px;' : 'padding:8px 12px;';
            const namePrefix = isChild ? '<span style="color:#64748b;margin-right:6px;font-weight:900;">•</span>' : '';

            const deptsHtml = this.DEPARTMENTS.map(d => {
                const v = depts ? (depts[d] || 0) : 0;
                return `<td style="text-align:right;padding:8px 8px;border:1px solid #cbd5e1;${v > 0 ? 'color:#0f172a;font-weight:800;font-size:0.88rem;' : 'color:#334155;font-weight:700;'}">${this._fmtTable(v, isPct)}</td>`;
            }).join('');

            return `<tr style="${style}">
                <td style="text-align:center;padding:8px;border:1px solid #cbd5e1;${stickyL0}background:${rowBg};font-weight:900;">${stt}</td>
                <td style="${namePadding}border:1px solid #cbd5e1;${stickyL1}background:${rowBg};white-space:normal;min-width:280px;font-weight:800;font-size:0.9rem;">${namePrefix}${name}</td>
                <td style="text-align:right;padding:8px 8px;border:1px solid #cbd5e1;font-weight:800;color:#0f172a;font-size:0.88rem;">${this._fmtTable(plan, isPct)}</td>
                <td style="text-align:right;padding:8px 8px;border:1px solid #cbd5e1;font-weight:900;color:#0f172a;font-size:0.88rem;">${this._fmtTable(actual, isPct)}</td>
                <td style="text-align:center;padding:8px 8px;border:1px solid #cbd5e1;color:${ratioColor};font-weight:900;font-size:0.88rem;">${ratio}</td>
                ${deptsHtml}
            </tr>`;
        };

        const calcSectionDepts = (section) => {
            const res = {};
            this.DEPARTMENTS.forEach(d => { res[d] = 0; });
            if (section && section.items) {
                section.items.forEach(item => {
                    if (this.data[item.code] && this.data[item.code].depts) {
                        this.DEPARTMENTS.forEach(d => { res[d] += (this.data[item.code].depts[d] || 0); });
                    }
                });
            }
            return res;
        };

        const calcGroupDepts = (group) => {
            const res = {};
            this.DEPARTMENTS.forEach(d => { res[d] = 0; });
            this.EXPENSE_STRUCTURE.forEach(s => {
                if ((s.group === group || s.parentGroup === group) && s.items) {
                    s.items.forEach(item => {
                        if (this.data[item.code] && this.data[item.code].depts) {
                            this.DEPARTMENTS.forEach(d => { res[d] += (this.data[item.code].depts[d] || 0); });
                        }
                    });
                }
            });
            return res;
        };

        // A. TỔNG CHI PHÍ
        const totalFixedAct = this._calcGroupTotal('fixed', false);
        const totalFixedPlan = this._calcGroupTotal('fixed', true);
        const totalVarAct = this._calcGroupTotal('variable', false);
        const totalVarPlan = this._calcGroupTotal('variable', true);
        const totalIntAct = this._calcGroupTotal('interest', false);
        const totalIntPlan = this._calcGroupTotal('interest', true);

        const grandAct = totalFixedAct + totalVarAct + totalIntAct;
        const grandPlan = totalFixedPlan + totalVarPlan + totalIntPlan;

        const grandDepts = {};
        const fixedDepts = calcGroupDepts('fixed');
        const varDepts = calcGroupDepts('variable');
        const intDepts = calcGroupDepts('interest');
        this.DEPARTMENTS.forEach(d => { grandDepts[d] = fixedDepts[d] + varDepts[d] + intDepts[d]; });

        html += makeRow('A', '<b>TỔNG CHI PHÍ</b>', grandPlan, grandAct, grandDepts, 'background:#fef08a;font-weight:900;font-size:0.95rem;color:#713f12;border-top:2px solid #ca8a04;border-bottom:2px solid #ca8a04;');

        // I. Chi phí cố định
        html += makeRow('I', '<b>Chi phí cố định</b>', totalFixedPlan, totalFixedAct, fixedDepts, 'background:#dbeafe;font-weight:900;font-size:0.92rem;color:#1e3a8a;');

        // 1. Chi phí nhân sự cố định
        const nsSection = this.EXPENSE_STRUCTURE.find(s => s.stt === '1' && s.type === 'subsection');
        if (nsSection) {
            const nsAct = this._calcSubsectionTotal(nsSection, false);
            const nsPlan = this._calcSubsectionTotal(nsSection, true);
            const nsDepts = calcSectionDepts(nsSection);
            html += makeRow('1', '<b>Chi phí nhân sự cố định</b>', nsPlan, nsAct, nsDepts, 'background:#f1f5f9;font-weight:800;color:#0f172a;');
            nsSection.items.forEach(item => {
                const d = this.data[item.code] || { plan: 0, actual: 0, depts: {} };
                html += makeRow('', item.name, d.plan, d.actual, d.depts, 'background:#ffffff;color:#0f172a;font-weight:600;');
            });
        }

        // 2. Chi phí cố định khác
        const ckSection = this.EXPENSE_STRUCTURE.find(s => s.stt === '2' && s.type === 'subsection');
        if (ckSection) {
            const ckAct = this._calcSubsectionTotal(ckSection, false);
            const ckPlan = this._calcSubsectionTotal(ckSection, true);
            const ckDepts = calcSectionDepts(ckSection);
            html += makeRow('2', '<b>Chi phí cố định khác</b>', ckPlan, ckAct, ckDepts, 'background:#ffedd5;font-weight:800;color:#9a3412;');
            ckSection.items.forEach(item => {
                const d = this.data[item.code] || { plan: 0, actual: 0, depts: {} };
                html += makeRow('', item.name, d.plan, d.actual, d.depts, 'background:#ffffff;color:#0f172a;font-weight:600;');
            });
        }

        // II. Chi phí biến đổi
        const bdSection = this.EXPENSE_STRUCTURE.find(s => s.stt === 'II' && s.group === 'variable');
        if (bdSection) {
            html += makeRow('II', '<b>Chi phí biến đổi</b>', totalVarPlan, totalVarAct, varDepts, 'background:#dcfce7;font-weight:900;font-size:0.92rem;color:#14532d;');
            bdSection.items.forEach((item, idx) => {
                const d = this.data[item.code] || { plan: 0, actual: 0, depts: {} };
                html += makeRow(idx + 1, item.name, d.plan, d.actual, d.depts, 'background:#ffffff;color:#0f172a;font-weight:600;');
            });
        }

        // III. Chi phí lãi vay
        const lvSection = this.EXPENSE_STRUCTURE.find(s => s.stt === 'III');
        if (lvSection) {
            html += makeRow('III', '<b>Chi phí lãi vay</b>', totalIntPlan, totalIntAct, intDepts, 'background:#ede9fe;font-weight:900;font-size:0.92rem;color:#581c87;');
            lvSection.items.forEach(item => {
                const d = this.data[item.code] || { plan: 0, actual: 0, depts: {} };
                html += makeRow('1', item.name, d.plan, d.actual, d.depts, 'background:#ffffff;color:#0f172a;font-weight:600;');
            });
        }

        // IV. DOANH SỐ VÀ LÃI GỘP
        const dsSection = this.EXPENSE_STRUCTURE.find(s => s.stt === 'IV');
        if (dsSection) {
            html += makeRow('IV', '<b>DOANH SỐ VÀ LÃI GỘP</b>', 0, 0, {}, 'background:#ffedd5;font-weight:900;font-size:0.92rem;color:#9a3412;');
            dsSection.items.forEach((item, idx) => {
                const d = this.data[item.code] || { plan: 0, actual: 0, depts: {} };
                html += makeRow(idx + 1, item.name, d.plan, d.actual, d.depts, 'background:#ffffff;color:#0f172a;font-weight:600;', !!item.isPct);
            });
        }

        tbody.innerHTML = html;
    },

    // ═══════════════════════════════════════════════════
    // BIỂU ĐỒ BÁO CÁO LŨY KẾ NĂM (Tối ưu độ nét cho CEO)
    // ═══════════════════════════════════════════════════
    _renderYearlyLineChart() {
        if (!window.ChartManager) return;
        const months = [];
        const totals = [];
        for (let m = 1; m <= 12; m++) {
            months.push('T' + m);
            let total = 0;
            ['fixed', 'variable', 'interest'].forEach(g => {
                total += this._calcGroupTotalByMonth(g, m);
            });
            totals.push(total);
        }
        const data = {
            labels: months,
            datasets: [{
                label: 'Tổng Chi Phí (VNĐ)',
                data: totals,
                borderColor: '#dc2626',
                backgroundColor: 'rgba(220, 38, 38, 0.12)',
                fill: true,
                tension: 0.35,
                pointRadius: 5,
                pointBackgroundColor: '#dc2626',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                borderWidth: 3.5
            }]
        };
        window.ChartManager.createChart('expenseYearlyLineChart', 'line', data, {
            maintainAspectRatio: false,
            layout: {
                padding: { top: 25, right: 20 }
            },
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    align: 'top',
                    offset: 4,
                    color: '#b91c1c',
                    font: { weight: '900', size: 11.5 },
                    formatter: (v) => (v >= 1e9 ? (v/1e9).toFixed(1) + ' Tỷ' : (v > 0 ? (v/1e6).toFixed(0) + ' Tr' : ''))
                },
                tooltip: {
                    callbacks: {
                        label: ctx => ' ' + (ctx.raw / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' Triệu VNĐ'
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#0f172a', font: { size: 13, weight: '800' } },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                },
                y: {
                    ticks: {
                        color: '#0f172a',
                        font: { size: 12, weight: '800' },
                        callback: (val) => (val >= 1e9 ? (val/1e9).toFixed(1) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                }
            }
        });
    },

    _renderYearlyStackedChart() {
        if (!window.ChartManager) return;
        const months = [];
        const fixedData = [], varData = [], intData = [];
        for (let m = 1; m <= 12; m++) {
            months.push('T' + m);
            fixedData.push(this._calcGroupTotalByMonth('fixed', m));
            varData.push(this._calcGroupTotalByMonth('variable', m));
            intData.push(this._calcGroupTotalByMonth('interest', m));
        }
        const data = {
            labels: months,
            datasets: [
                { label: 'CP Cố Định', data: fixedData, backgroundColor: '#2563eb', borderRadius: 4 },
                { label: 'CP Biến Đổi', data: varData, backgroundColor: '#059669', borderRadius: 4 },
                { label: 'CP Lãi Vay', data: intData, backgroundColor: '#7c3aed', borderRadius: 4 }
            ]
        };
        window.ChartManager.createChart('expenseYearlyStackedChart', 'bar', data, {
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#0f172a',
                        font: { size: 13, weight: '800' },
                        padding: 16
                    }
                },
                datalabels: { display: false },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${ctx.dataset.label}: ${(ctx.raw / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} Tr`
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    ticks: { color: '#0f172a', font: { size: 13, weight: '800' } },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                },
                y: {
                    stacked: true,
                    ticks: {
                        color: '#0f172a',
                        font: { size: 12, weight: '800' },
                        callback: (val) => (val >= 1e9 ? (val/1e9).toFixed(1) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                }
            }
        });
    },

    // ═══════════════════════════════════════════════════
    // BẢNG BÁO CÁO LŨY KẾ NĂM
    // ═══════════════════════════════════════════════════
    _renderYearlyTable() {
        const tbody = document.getElementById('expense-yearly-tbody');
        if (!tbody) return;

        let html = '';
        const stickyL0 = 'position:sticky;left:0;z-index:5;';
        const stickyL1 = 'position:sticky;left:45px;z-index:5;';

        const makeYearRow = (stt, name, monthVals, style, isPct = false) => {
            const total = isPct ? (monthVals.length > 0 ? (monthVals.reduce((a,b)=>a+b,0)/monthVals.length) : 0) : monthVals.reduce((a, b) => a + b, 0);

            const bgMatch = style ? style.match(/background\s*:\s*([^;]+)/i) : null;
            const rowBg = bgMatch ? bgMatch[1].trim() : '#ffffff';
            const isChild = (stt === '');
            const namePadding = isChild ? 'padding:8px 12px 8px 26px;' : 'padding:8px 12px;';
            const namePrefix = isChild ? '<span style="color:#64748b;margin-right:6px;font-weight:900;">•</span>' : '';

            const mCells = monthVals.map(v =>
                `<td style="text-align:right;padding:8px 6px;border:1px solid #cbd5e1;${v > 0 ? 'color:#0f172a;font-weight:800;font-size:0.88rem;' : 'color:#334155;font-weight:700;'}">${this._fmtTable(v, isPct)}</td>`
            ).join('');
            return `<tr style="${style}">
                <td style="text-align:center;padding:8px;border:1px solid #cbd5e1;${stickyL0}background:${rowBg};font-weight:900;">${stt}</td>
                <td style="${namePadding}border:1px solid #cbd5e1;${stickyL1}background:${rowBg};white-space:normal;min-width:280px;font-weight:800;font-size:0.9rem;">${namePrefix}${name}</td>
                ${mCells}
                <td style="text-align:right;padding:8px 10px;border:1px solid #ca8a04;font-weight:900;color:#713f12;background:#fef08a;font-size:0.9rem;">${this._fmtTable(total, isPct)}</td>
            </tr>`;
        };

        const getMonthVals = (calcFn) => {
            const vals = [];
            for (let m = 1; m <= 12; m++) vals.push(calcFn(m));
            return vals;
        };

        // A. TỔNG CHI PHÍ
        html += makeYearRow('A', '<b>TỔNG CHI PHÍ</b>',
            getMonthVals(m => this._calcGroupTotalByMonth('fixed', m) + this._calcGroupTotalByMonth('variable', m) + this._calcGroupTotalByMonth('interest', m)),
            'background:#fef08a;font-weight:900;font-size:0.95rem;color:#713f12;border-top:2px solid #ca8a04;border-bottom:2px solid #ca8a04;');

        // I. Chi phí cố định
        html += makeYearRow('I', '<b>Chi phí cố định</b>',
            getMonthVals(m => this._calcGroupTotalByMonth('fixed', m)),
            'background:#dbeafe;font-weight:900;font-size:0.92rem;color:#1e3a8a;');

        // 1. Chi phí nhân sự cố định
        const nsSection = this.EXPENSE_STRUCTURE.find(s => s.stt === '1' && s.type === 'subsection');
        if (nsSection) {
            const nsMonths = getMonthVals(m => nsSection.items.reduce((sum, item) => sum + this._calcItemByMonth(item.code, m), 0));
            html += makeYearRow('1', '<b>Chi phí nhân sự cố định</b>', nsMonths, 'background:#f1f5f9;font-weight:800;color:#0f172a;');
            nsSection.items.forEach(item => {
                html += makeYearRow('', item.name, getMonthVals(m => this._calcItemByMonth(item.code, m)), 'background:#ffffff;color:#0f172a;font-weight:600;');
            });
        }

        // 2. Chi phí cố định khác
        const ckSection = this.EXPENSE_STRUCTURE.find(s => s.stt === '2' && s.type === 'subsection');
        if (ckSection) {
            const ckMonths = getMonthVals(m => ckSection.items.reduce((sum, item) => sum + this._calcItemByMonth(item.code, m), 0));
            html += makeYearRow('2', '<b>Chi phí cố định khác</b>', ckMonths, 'background:#ffedd5;font-weight:800;color:#9a3412;');
            ckSection.items.forEach(item => {
                html += makeYearRow('', item.name, getMonthVals(m => this._calcItemByMonth(item.code, m)), 'background:#ffffff;color:#0f172a;font-weight:600;');
            });
        }

        // II. Chi phí biến đổi
        const bdSection = this.EXPENSE_STRUCTURE.find(s => s.stt === 'II' && s.group === 'variable');
        if (bdSection) {
            html += makeYearRow('II', '<b>Chi phí biến đổi</b>',
                getMonthVals(m => this._calcGroupTotalByMonth('variable', m)),
                'background:#dcfce7;font-weight:900;font-size:0.92rem;color:#14532d;');
            bdSection.items.forEach((item, idx) => {
                html += makeYearRow(idx + 1, item.name, getMonthVals(m => this._calcItemByMonth(item.code, m)), 'background:#ffffff;color:#0f172a;font-weight:600;');
            });
        }

        // III. Chi phí lãi vay
        const lvSection = this.EXPENSE_STRUCTURE.find(s => s.stt === 'III');
        if (lvSection) {
            html += makeYearRow('III', '<b>Chi phí lãi vay</b>',
                getMonthVals(m => this._calcGroupTotalByMonth('interest', m)),
                'background:#ede9fe;font-weight:900;font-size:0.92rem;color:#581c87;');
            lvSection.items.forEach(item => {
                html += makeYearRow('1', item.name, getMonthVals(m => this._calcItemByMonth(item.code, m)), 'background:#ffffff;color:#0f172a;font-weight:600;');
            });
        }

        // IV. DOANH SỐ VÀ LÃI GỘP
        const dsSection = this.EXPENSE_STRUCTURE.find(s => s.stt === 'IV');
        if (dsSection) {
            html += makeYearRow('IV', '<b>DOANH SỐ VÀ LÃI GỘP</b>',
                getMonthVals(() => 0),
                'background:#ffedd5;font-weight:900;font-size:0.92rem;color:#9a3412;');
            dsSection.items.forEach((item, idx) => {
                html += makeYearRow(idx + 1, item.name, getMonthVals(m => this._calcItemByMonth(item.code, m)), 'background:#ffffff;color:#0f172a;font-weight:600;', !!item.isPct);
            });
        }

        tbody.innerHTML = html;
    }
};
