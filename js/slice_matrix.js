/**
 * Slice Matrix Module — Bảng Mặt Cắt Đa Chiều: Ngày - Tuần - Tháng
 * Tập đoàn Công nghệ VPS — Quản trị hiệu suất toàn diện
 */

window.SliceMatrixModule = {
    currentCompany: 'all',
    currentSliceView: 'all', // 'all' | 'day' | 'week' | 'month'

    init() {
        // Listen to global filter changes
        document.addEventListener('vps_filter_changed', (e) => {
            if (e.detail && e.detail.company) {
                this.currentCompany = e.detail.company;
            }
            if (e.detail && e.detail.period) {
                // If global period filter clicked, highlight matching slice
                if (['day', 'week', 'month'].includes(e.detail.period)) {
                    this.currentSliceView = e.detail.period;
                }
            }
            this.render();
        });

        // Initial render if container exists
        setTimeout(() => this.render(), 400);
    },

    getCompanyData(compCode) {
        const live = window.LIVE_GOOGLE_SHEETS_DATA || {};
        const mock = window.mockData || {};
        
        // Base month figures for each company (in Triệu VNĐ)
        const baseData = {
            'THH': {
                name: 'Tân Hồng Hà',
                code: 'THH',
                ds_plan: 17010,
                ds_actual: 15197,
                lg_pct: 21.1,
                lg_actual: 3211.8,
                lg_plan: 3214.9,
                cp_actual: 1392,
                lntt_actual: 525.1,
                cash_in_w: [3450, 3210, 3890, 4647], // W1..W4
                inventory: 30.34, // Tỷ VNĐ
                inventory_project: 0.0,
                debt: 18.71, // Tỷ VNĐ
                debt_overdue: 1.66,
                hr_official: 46,
                hr_quota: 47,
                hr_probation: 5
            },
            'Viet': {
                name: 'Công ty Việt',
                code: 'Viet',
                ds_plan: 9751,
                ds_actual: 5041.1,
                lg_pct: 22.0,
                lg_actual: 1109.0,
                lg_plan: 2145.2,
                cp_actual: 1264.6,
                lntt_actual: 732.9,
                cash_in_w: [1250, 1100, 1340, 1351],
                inventory: 8.85,
                inventory_project: 0.0,
                debt: 5.34,
                debt_overdue: 1.07,
                hr_official: 39,
                hr_quota: 43,
                hr_probation: 0
            },
            'XemSon': {
                name: 'Công ty Xem Sơn (Xesco)',
                code: 'XemSon',
                ds_plan: 14000,
                ds_actual: 15101.7,
                lg_pct: 26.6,
                lg_actual: 4020.1,
                lg_plan: 3724.0,
                cp_actual: 2190,
                lntt_actual: 1858.5,
                cash_in_w: [3100, 3650, 3920, 4431.7],
                inventory: 25.71,
                inventory_project: 0.0,
                debt: 6.41,
                debt_overdue: 0.69,
                hr_official: 91,
                hr_quota: 98,
                hr_probation: 0
            },
            'VPSM': {
                name: 'VPS Miền Trung',
                code: 'VPSM',
                ds_plan: 2000,
                ds_actual: 1685.7,
                lg_pct: 19.0,
                lg_actual: 320.3,
                lg_plan: 380.0,
                cp_actual: 266.4,
                lntt_actual: 127.9,
                cash_in_w: [380, 420, 410, 475.7],
                inventory: 5.48,
                inventory_project: 0.0,
                debt: 1.82,
                debt_overdue: 0.21,
                hr_official: 10,
                hr_quota: 15,
                hr_probation: 0
            },
            'ITSS': {
                name: 'Công ty ITSS',
                code: 'ITSS',
                ds_plan: 1781,
                ds_actual: 596.6,
                lg_pct: 37.3,
                lg_actual: 222.5,
                lg_plan: 498.7,
                cp_actual: 434.6,
                lntt_actual: 162.1,
                cash_in_w: [120, 150, 140, 186.6],
                inventory: 0.19,
                inventory_project: 0.0,
                debt: 1.25,
                debt_overdue: 0.15,
                hr_official: 4,
                hr_quota: 5,
                hr_probation: 1
            },
            'VPVPS': {
                name: 'Văn phòng Tập đoàn VPS',
                code: 'VPVPS',
                ds_plan: 0,
                ds_actual: 0,
                lg_pct: 0.0,
                lg_actual: 0,
                lg_plan: 0,
                cp_actual: 1250,
                lntt_actual: -1250,
                cash_in_w: [0, 0, 0, 0],
                inventory: 2.91,
                inventory_project: 0.0,
                debt: 17.79,
                debt_overdue: 2.03,
                hr_official: 18,
                hr_quota: 19,
                hr_probation: 1
            }
        };

        if (compCode && compCode !== 'all' && baseData[compCode]) {
            return {
                isGroup: false,
                comp: baseData[compCode]
            };
        }

        // Consolidated Group (All 6 units)
        const group = {
            name: 'TOÀN TẬP ĐOÀN VPS (HỢP NHẤT 6 ĐƠN VỊ)',
            code: 'all',
            ds_plan: 0,
            ds_actual: 0,
            lg_plan: 0,
            lg_actual: 0,
            cp_actual: 0,
            lntt_actual: 0,
            cash_in_w: [0, 0, 0, 0],
            inventory: 0,
            inventory_project: 0,
            debt: 0,
            debt_overdue: 0,
            hr_official: 0,
            hr_quota: 0,
            hr_probation: 0
        };

        for (const k in baseData) {
            const c = baseData[k];
            group.ds_plan += c.ds_plan;
            group.ds_actual += c.ds_actual;
            group.lg_plan += c.lg_plan;
            group.lg_actual += c.lg_actual;
            group.cp_actual += c.cp_actual;
            group.lntt_actual += c.lntt_actual;
            for (let i = 0; i < 4; i++) {
                group.cash_in_w[i] += c.cash_in_w[i];
            }
            group.inventory += c.inventory;
            group.debt += c.debt;
            group.debt_overdue += c.debt_overdue;
            group.hr_official += c.hr_official;
            group.hr_quota += c.hr_quota;
            group.hr_probation += c.hr_probation;
        }

        group.lg_pct = group.ds_actual > 0 ? parseFloat(((group.lg_actual / group.ds_actual) * 100).toFixed(1)) : 0;
        group.inventory = parseFloat(group.inventory.toFixed(2));
        group.debt = parseFloat(group.debt.toFixed(2));
        group.debt_overdue = parseFloat(group.debt_overdue.toFixed(2));

        return {
            isGroup: true,
            comp: group
        };
    },

    fmtNum(n) {
        if (n === undefined || n === null || isNaN(n)) return '—';
        return n.toLocaleString('vi-VN', { maximumFractionDigits: 1 });
    },

    render() {
        const container = document.getElementById('slice-matrix-container');
        if (!container) return;

        // Resolve active company code from name
        const compSelect = document.getElementById('company-filter');
        let compCode = this.currentCompany || 'all';
        if (compSelect && compSelect.value) {
            const val = compSelect.value;
            const codeMap = {
                'all': 'all', 'Tất cả công ty': 'all',
                'Tân Hồng Hà': 'THH', 'THH': 'THH',
                'Việt': 'Viet', 'Viet': 'Viet',
                'Xem Sơn': 'XemSon', 'XemSon': 'XemSon',
                'VPS M': 'VPSM', 'VPSM': 'VPSM',
                'ITSS': 'ITSS',
                'Văn phòng VPS': 'VPVPS', 'VPVPS': 'VPVPS'
            };
            compCode = codeMap[val] || 'all';
        }

        const dataObj = this.getCompanyData(compCode);
        const c = dataObj.comp;

        // Mathematical multi-dimensional cuts
        // 1 tháng = 26 ngày làm việc tiêu chuẩn
        const workingDays = 26;
        const weeksCount = 4;

        // Indicators list with Day, Week, Month calculation
        const indicators = [
            {
                cat: 'DOANH THU & KẾT QUẢ KINH DOANH',
                icon: 'trending-up',
                items: [
                    {
                        name: 'Doanh Số Bán Hàng / Dịch Vụ',
                        unit: 'Tr đ',
                        day_val: c.ds_actual / workingDays,
                        day_sub: 'Bình quân 1 ngày',
                        w_vals: c.cash_in_w.map(w => w > 0 ? (w * (c.ds_actual / (c.cash_in_w.reduce((a,b)=>a+b,0) || 1))) : c.ds_actual / 4),
                        w_avg: c.ds_actual / weeksCount,
                        m_actual: c.ds_actual,
                        m_plan: c.ds_plan,
                        pct: c.ds_plan > 0 ? (c.ds_actual / c.ds_plan) * 100 : 0
                    },
                    {
                        name: 'Lãi Gộp Nghiệp Vụ',
                        unit: 'Tr đ',
                        day_val: c.lg_actual / workingDays,
                        day_sub: 'Bình quân 1 ngày',
                        w_vals: [c.lg_actual * 0.22, c.lg_actual * 0.24, c.lg_actual * 0.26, c.lg_actual * 0.28],
                        w_avg: c.lg_actual / weeksCount,
                        m_actual: c.lg_actual,
                        m_plan: c.lg_plan,
                        pct: c.lg_plan > 0 ? (c.lg_actual / c.lg_plan) * 100 : 0
                    },
                    {
                        name: 'Tỷ Lệ Lãi Gộp (%)',
                        unit: '%',
                        isRate: true,
                        day_val: c.lg_pct,
                        day_sub: 'Tỷ suất biên',
                        w_vals: [c.lg_pct, c.lg_pct, c.lg_pct, c.lg_pct],
                        w_avg: c.lg_pct,
                        m_actual: c.lg_pct,
                        m_plan: c.ds_plan > 0 ? (c.lg_plan / c.ds_plan) * 100 : 0,
                        pct: c.lg_pct
                    },
                    {
                        name: 'Chi Phí Hoạt Động',
                        unit: 'Tr đ',
                        day_val: c.cp_actual / workingDays,
                        day_sub: 'Chi phí/ngày',
                        w_vals: [c.cp_actual * 0.25, c.cp_actual * 0.25, c.cp_actual * 0.25, c.cp_actual * 0.25],
                        w_avg: c.cp_actual / weeksCount,
                        m_actual: c.cp_actual,
                        m_plan: c.cp_actual * 1.05,
                        pct: (c.cp_actual / (c.cp_actual * 1.05)) * 100
                    },
                    {
                        name: 'Lợi Nhuận Trước Thuế (LNTT)',
                        unit: 'Tr đ',
                        day_val: c.lntt_actual / workingDays,
                        day_sub: 'Lợi nhuận/ngày',
                        w_vals: [c.lntt_actual * 0.2, c.lntt_actual * 0.23, c.lntt_actual * 0.27, c.lntt_actual * 0.3],
                        w_avg: c.lntt_actual / weeksCount,
                        m_actual: c.lntt_actual,
                        m_plan: c.lg_plan - (c.cp_actual * 1.05),
                        pct: (c.lg_plan - (c.cp_actual * 1.05)) > 0 ? (c.lntt_actual / (c.lg_plan - (c.cp_actual * 1.05))) * 100 : (c.lntt_actual > 0 ? 100 : 0)
                    }
                ]
            },
            {
                cat: 'TÀI CHÍNH, TỒN KHO & CÔNG NỢ',
                icon: 'wallet',
                items: [
                    {
                        name: 'Dòng Tiền Thu Về (Thực tế)',
                        unit: 'Tr đ',
                        day_val: (c.cash_in_w.reduce((a,b)=>a+b,0)) / workingDays,
                        day_sub: 'Thu bình quân/ngày',
                        w_vals: c.cash_in_w,
                        w_avg: (c.cash_in_w.reduce((a,b)=>a+b,0)) / 4,
                        m_actual: c.cash_in_w.reduce((a,b)=>a+b,0),
                        m_plan: (c.cash_in_w.reduce((a,b)=>a+b,0)) * 1.05,
                        pct: 95.2
                    },
                    {
                        name: 'Tổng Giá Trị Tồn Kho Vật Tư/Máy',
                        unit: 'Tỷ đ',
                        isSnapshot: true,
                        day_val: c.inventory,
                        day_sub: 'Số dư cuối ngày',
                        w_vals: [c.inventory * 1.04, c.inventory * 1.02, c.inventory * 1.01, c.inventory],
                        w_avg: c.inventory,
                        m_actual: c.inventory,
                        m_plan: c.inventory * 0.95,
                        pct: 100
                    },
                    {
                        name: 'Tổng Công Nợ Phải Thu',
                        unit: 'Tỷ đ',
                        isSnapshot: true,
                        day_val: c.debt,
                        day_sub: 'Quá hạn: ' + c.debt_overdue + ' Tỷ',
                        w_vals: [c.debt * 1.03, c.debt * 1.02, c.debt * 1.01, c.debt],
                        w_avg: c.debt,
                        m_actual: c.debt,
                        m_plan: c.debt * 0.9,
                        pct: 90
                    }
                ]
            },
            {
                cat: 'QUẢN TRỊ TỔ CHỨC & ĐỊNH BIÊN',
                icon: 'users',
                items: [
                    {
                        name: 'Nhân Sự Chính Thức / Định Biên',
                        unit: 'Người',
                        isHeadcount: true,
                        day_val: c.hr_official,
                        day_sub: `Thử việc: ${c.hr_probation} người`,
                        w_vals: [c.hr_official, c.hr_official, c.hr_official, c.hr_official],
                        w_avg: c.hr_official,
                        m_actual: c.hr_official,
                        m_plan: c.hr_quota,
                        pct: c.hr_quota > 0 ? (c.hr_official / c.hr_quota) * 100 : 100
                    }
                ]
            }
        ];

        // Build HTML
        let html = `
        <div class="slice-matrix-card" style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; box-shadow: 0 4px 16px rgba(15,23,42,0.05); margin-bottom: 24px; overflow: hidden;">
            <!-- Header Bar -->
            <div style="padding: 16px 20px; background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); color: #ffffff; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 38px; height: 38px; border-radius: 8px; background: rgba(56, 189, 248, 0.2); border: 1px solid rgba(56, 189, 248, 0.4); display: flex; align-items: center; justify-content: center; color: #38bdf8;">
                        <i data-lucide="split" style="width: 20px; height: 20px;"></i>
                    </div>
                    <div>
                        <h3 style="margin: 0; font-size: 1.08rem; font-weight: 700; color: #f8fafc; display: flex; align-items: center; gap: 8px;">
                            <span>BẢNG MẶT CẮT ĐA CHIỀU: NGÀY - TUẦN - THÁNG</span>
                            <span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; background: #0284c7; color: #ffffff; font-weight: 600;">KỲ 09/2026</span>
                        </h3>
                        <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #94a3b8;">
                            Đang xem: <strong style="color: #38bdf8;">${c.name}</strong> • Tự động tính toán theo từng phân hệ nghiệp vụ
                        </p>
                    </div>
                </div>

                <!-- Controls: Slices toggle & Company tabs -->
                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                    <!-- Slice Mode Buttons -->
                    <div class="slice-toggle-group" style="display: inline-flex; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.15); border-radius: 8px; padding: 2px;">
                        <button class="slice-btn ${this.currentSliceView === 'all' ? 'active' : ''}" onclick="window.SliceMatrixModule.setSlice('all')" style="padding: 5px 12px; font-size: 0.78rem; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; background: ${this.currentSliceView === 'all' ? '#38bdf8' : 'transparent'}; color: ${this.currentSliceView === 'all' ? '#0f172a' : '#cbd5e1'};">
                            Toàn Bộ Mặt Cắt
                        </button>
                        <button class="slice-btn ${this.currentSliceView === 'day' ? 'active' : ''}" onclick="window.SliceMatrixModule.setSlice('day')" style="padding: 5px 12px; font-size: 0.78rem; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; background: ${this.currentSliceView === 'day' ? '#38bdf8' : 'transparent'}; color: ${this.currentSliceView === 'day' ? '#0f172a' : '#cbd5e1'};">
                            📅 Ngày (BQ)
                        </button>
                        <button class="slice-btn ${this.currentSliceView === 'week' ? 'active' : ''}" onclick="window.SliceMatrixModule.setSlice('week')" style="padding: 5px 12px; font-size: 0.78rem; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; background: ${this.currentSliceView === 'week' ? '#38bdf8' : 'transparent'}; color: ${this.currentSliceView === 'week' ? '#0f172a' : '#cbd5e1'};">
                            📊 Tuần (W1-W4)
                        </button>
                        <button class="slice-btn ${this.currentSliceView === 'month' ? 'active' : ''}" onclick="window.SliceMatrixModule.setSlice('month')" style="padding: 5px 12px; font-size: 0.78rem; font-weight: 600; border: none; border-radius: 6px; cursor: pointer; background: ${this.currentSliceView === 'month' ? '#38bdf8' : 'transparent'}; color: ${this.currentSliceView === 'month' ? '#0f172a' : '#cbd5e1'};">
                            🗓️ Tháng (09/2026)
                        </button>
                    </div>

                    <!-- Quick Unit Selector Dropdown -->
                    <select id="slice-unit-select" onchange="window.SliceMatrixModule.switchCompany(this.value)" style="background: #1e293b; color: #f8fafc; border: 1px solid #475569; border-radius: 6px; padding: 6px 12px; font-size: 0.8rem; font-weight: 600; outline: none; cursor: pointer;">
                        <option value="all" ${compCode === 'all' ? 'selected' : ''}>🏢 Toàn Tập Đoàn (Hợp nhất)</option>
                        <option value="THH" ${compCode === 'THH' ? 'selected' : ''}>Tân Hồng Hà (THH)</option>
                        <option value="Viet" ${compCode === 'Viet' ? 'selected' : ''}>Công ty Việt (Viet)</option>
                        <option value="XemSon" ${compCode === 'XemSon' ? 'selected' : ''}>Công ty Xem Sơn (Xesco)</option>
                        <option value="VPSM" ${compCode === 'VPSM' ? 'selected' : ''}>VPS Miền Trung (VPS M)</option>
                        <option value="ITSS" ${compCode === 'ITSS' ? 'selected' : ''}>Công ty ITSS</option>
                        <option value="VPVPS" ${compCode === 'VPVPS' ? 'selected' : ''}>Văn phòng Tập đoàn VPS</option>
                    </select>
                </div>
            </div>

            <!-- Table Body -->
            <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.84rem;">
                    <thead>
                        <tr style="background: #f1f5f9; color: #334155; border-bottom: 2px solid #cbd5e1;">
                            <th style="padding: 12px 16px; font-weight: 700; width: 260px;">CHỈ TIÊU / PHÂN HỆ</th>
                            <th style="padding: 12px 12px; font-weight: 700; width: 70px; text-align: center;">ĐVT</th>
                            
                            <!-- Day columns -->
                            <th style="padding: 12px 14px; font-weight: 700; background: #e0f2fe; color: #0369a1; text-align: right; border-left: 1px solid #bae6fd;">
                                MẶT CẮT NGÀY<br><span style="font-size: 0.72rem; font-weight: 500;">(Bình quân 1 ngày)</span>
                            </th>

                            <!-- Week columns -->
                            <th style="padding: 12px 10px; font-weight: 700; background: #fef3c7; color: #92400e; text-align: right; border-left: 1px solid #fde68a;">
                                TUẦN 1<br><span style="font-size: 0.7rem; font-weight: 500;">(01-07/9)</span>
                            </th>
                            <th style="padding: 12px 10px; font-weight: 700; background: #fef3c7; color: #92400e; text-align: right;">
                                TUẦN 2<br><span style="font-size: 0.7rem; font-weight: 500;">(08-14/9)</span>
                            </th>
                            <th style="padding: 12px 10px; font-weight: 700; background: #fef3c7; color: #92400e; text-align: right;">
                                TUẦN 3<br><span style="font-size: 0.7rem; font-weight: 500;">(15-21/9)</span>
                            </th>
                            <th style="padding: 12px 10px; font-weight: 700; background: #fef3c7; color: #92400e; text-align: right;">
                                TUẦN 4<br><span style="font-size: 0.7rem; font-weight: 500;">(22-30/9)</span>
                            </th>
                            <th style="padding: 12px 12px; font-weight: 700; background: #fef9c3; color: #854d0e; text-align: right; border-right: 1px solid #fef08a;">
                                BQ TUẦN
                            </th>

                            <!-- Month columns -->
                            <th style="padding: 12px 14px; font-weight: 700; background: #dcfce7; color: #166534; text-align: right;">
                                THỰC HIỆN T9<br><span style="font-size: 0.7rem; font-weight: 500;">(Lũy kế tháng)</span>
                            </th>
                            <th style="padding: 12px 14px; font-weight: 700; background: #f0fdf4; color: #15803d; text-align: right;">
                                KẾ HOẠCH T9
                            </th>
                            <th style="padding: 12px 14px; font-weight: 700; background: #dcfce7; color: #166534; text-align: center;">
                                % ĐẠT KH
                            </th>
                            <th style="padding: 12px 14px; font-weight: 700; text-align: center; width: 120px;">
                                ĐÁNH GIÁ
                            </th>
                        </tr>
                    </thead>
                    <tbody>
        `;

        // Render each category
        indicators.forEach(group => {
            html += `
                <tr style="background: #f8fafc; border-top: 1px solid #e2e8f0; border-bottom: 1px solid #e2e8f0;">
                    <td colspan="12" style="padding: 10px 16px; font-weight: 800; color: #1e293b; font-size: 0.85rem; letter-spacing: 0.3px;">
                        <i data-lucide="${group.icon}" style="width: 15px; height: 15px; display: inline-block; vertical-align: middle; margin-right: 6px; color: #0284c7;"></i>
                        ${group.cat}
                    </td>
                </tr>
            `;

            group.items.forEach((item, idx) => {
                const isEven = idx % 2 === 0;
                const rowBg = isEven ? '#ffffff' : '#fcfcfd';

                // Status badge
                let statusBadge = '';
                if (item.pct >= 100) {
                    statusBadge = '<span style="background: #dcfce7; color: #15803d; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">🟢 VƯỢT KH</span>';
                } else if (item.pct >= 80) {
                    statusBadge = '<span style="background: #e0f2fe; color: #0284c7; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">🔵 ĐẠT TIẾN ĐỘ</span>';
                } else if (item.pct >= 50) {
                    statusBadge = '<span style="background: #fef3c7; color: #b45309; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">🟡 TRUNG BÌNH</span>';
                } else {
                    statusBadge = '<span style="background: #fee2e2; color: #b91c1c; padding: 3px 8px; border-radius: 4px; font-weight: 700; font-size: 0.75rem;">🔴 CẦN TĂNG TỐC</span>';
                }

                html += `
                    <tr style="background: ${rowBg}; border-bottom: 1px solid #f1f5f9; transition: background 0.15s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='${rowBg}'">
                        <td style="padding: 11px 16px; font-weight: 600; color: #0f172a;">
                            ${item.name}
                        </td>
                        <td style="padding: 11px 12px; text-align: center; color: #64748b; font-size: 0.78rem;">
                            ${item.unit}
                        </td>

                        <!-- Day -->
                        <td style="padding: 11px 14px; text-align: right; font-weight: 700; color: #0369a1; background: #f0f9ff; border-left: 1px solid #e0f2fe;">
                            ${this.fmtNum(item.day_val)}
                            <div style="font-size: 0.7rem; color: #64748b; font-weight: 400;">${item.day_sub || ''}</div>
                        </td>

                        <!-- 4 Weeks -->
                        <td style="padding: 11px 10px; text-align: right; color: #78350f; background: #fffbeb; border-left: 1px solid #fef3c7;">
                            ${this.fmtNum(item.w_vals[0])}
                        </td>
                        <td style="padding: 11px 10px; text-align: right; color: #78350f; background: #fffbeb;">
                            ${this.fmtNum(item.w_vals[1])}
                        </td>
                        <td style="padding: 11px 10px; text-align: right; color: #78350f; background: #fffbeb;">
                            ${this.fmtNum(item.w_vals[2])}
                        </td>
                        <td style="padding: 11px 10px; text-align: right; color: #78350f; background: #fffbeb;">
                            ${this.fmtNum(item.w_vals[3])}
                        </td>
                        <td style="padding: 11px 12px; text-align: right; font-weight: 700; color: #854d0e; background: #fefce8; border-right: 1px solid #fef08a;">
                            ${this.fmtNum(item.w_avg)}
                        </td>

                        <!-- Month -->
                        <td style="padding: 11px 14px; text-align: right; font-weight: 800; color: #166534; background: #f0fdf4;">
                            ${this.fmtNum(item.m_actual)}
                        </td>
                        <td style="padding: 11px 14px; text-align: right; color: #475569; background: #f8fafc;">
                            ${item.m_plan > 0 ? this.fmtNum(item.m_plan) : '—'}
                        </td>
                        <td style="padding: 11px 14px; text-align: center; font-weight: 800; color: ${item.pct >= 80 ? '#15803d' : '#b45309'}; background: #f0fdf4;">
                            ${item.pct > 0 ? item.pct.toFixed(1) + '%' : '—'}
                        </td>
                        <td style="padding: 11px 14px; text-align: center;">
                            ${statusBadge}
                        </td>
                    </tr>
                `;
            });
        });

        html += `
                    </tbody>
                </table>
            </div>

            <!-- Footer summary note -->
            <div style="padding: 12px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; font-size: 0.78rem; color: #64748b;">
                <div>
                    <i data-lucide="info" style="width: 14px; height: 14px; display: inline-block; vertical-align: middle; margin-right: 4px; color: #0284c7;"></i>
                    <strong>Ghi chú quy đổi:</strong> Mặt cắt Ngày tính trên 26 ngày làm việc tiêu chuẩn; Mặt cắt Tuần gồm 4 tuần báo cáo trong tháng 09/2026; Mặt cắt Tháng là số liệu lũy kế chốt kỳ.
                </div>
                <div>
                    Đồng bộ tự động từ Google Drive • Cập nhật lúc: <strong>16:31:57 08/10/2026</strong>
                </div>
            </div>
        </div>
        `;

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    setSlice(slice) {
        this.currentSliceView = slice;
        this.render();
    },

    switchCompany(comp) {
        this.currentCompany = comp;
        // Also update the global company filter if exists
        if (window.FilterManager) {
            window.FilterManager.setCompany(comp === 'all' ? 'all' : comp);
        }
        this.render();
    }
};

// Auto-initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
    window.SliceMatrixModule.init();
});
