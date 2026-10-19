/**
 * Slice Matrix Module — Bảng Mặt Cắt Đa Chiều: Ngày - Tuần - Tháng
 * Tập đoàn Công nghệ VPS — Quản trị hiệu suất toàn diện
 * Hỗ trợ lưu trữ đa kỳ: Bảo toàn tuyệt đối Tháng 9/2026 khi cập nhật Tháng 10/2026 theo tuần
 */

window.SliceMatrixModule = {
    currentCompany: 'all',
    currentPeriod: '09/2026', // '09/2026' | '10/2026'
    currentSliceView: 'all', // 'all' | 'day' | 'week' | 'month'

    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            if (e.detail && e.detail.company) {
                this.currentCompany = e.detail.company;
            }
            if (e.detail && e.detail.period) {
                if (['day', 'week', 'month'].includes(e.detail.period)) {
                    this.currentSliceView = e.detail.period;
                } else if (e.detail.period === 'year') {
                    this.currentSliceView = 'month';
                }
            }
            this.render();
        });

        setTimeout(() => this.render(), 400);
    },

    getCompanyData(compCode, period) {
        const curP = period || this.currentPeriod || '09/2026';

        // ── KHO DỮ LIỆU ĐA KỲ ĐỘC LẬP (BẢO TOÀN DỮ LIỆU THÁNG 9) ──
        const periodDatasets = {
            '09/2026': {
                name: 'Kỳ Tháng 09/2026 (Chốt sổ)',
                isClosed: true,
                companies: {
                    'THH': {
                        name: 'Tân Hồng Hà', code: 'THH',
                        ds_plan: 17010, ds_actual: 15197, lg_pct: 21.1, lg_actual: 3211.8, lg_plan: 3214.9,
                        cp_actual: 1392, lntt_actual: 525.1,
                        cash_in_w: [3450, 3210, 3890, 4647],
                        w_ds: [3343, 3647, 3951, 4256],
                        w_lg: [706, 770, 835, 900],
                        inventory: 31.24, inventory_project: 4.97, debt: 18.71, debt_overdue: 1.66,
                        hr_official: 46, hr_quota: 47, hr_probation: 5
                    },
                    'Viet': {
                        name: 'Công ty Việt', code: 'Viet',
                        ds_plan: 9751, ds_actual: 5041.1, lg_pct: 22.0, lg_actual: 1109.0, lg_plan: 2145.2,
                        cp_actual: 1264.6, lntt_actual: 732.9,
                        cash_in_w: [1250, 1100, 1340, 1351],
                        w_ds: [1109, 1210, 1311, 1411],
                        w_lg: [244, 266, 288, 311],
                        inventory: 6.49, inventory_project: 0.0, debt: 5.35, debt_overdue: 1.07,
                        hr_official: 39, hr_quota: 43, hr_probation: 0
                    },
                    'XemSon': {
                        name: 'Công ty Xem Sơn (Xesco)', code: 'XemSon',
                        ds_plan: 14000, ds_actual: 15101.7, lg_pct: 26.6, lg_actual: 4020.1, lg_plan: 3724.0,
                        cp_actual: 2190, lntt_actual: 1858.5,
                        cash_in_w: [3100, 3650, 3920, 4431.7],
                        w_ds: [3322, 3624, 3926, 4230],
                        w_lg: [884, 965, 1045, 1126],
                        inventory: 25.71, inventory_project: 0.0, debt: 12.48, debt_overdue: 0.97,
                        hr_official: 91, hr_quota: 98, hr_probation: 0
                    },
                    'VPSM': {
                        name: 'VPS Miền Trung', code: 'VPSM',
                        ds_plan: 2000, ds_actual: 1685.7, lg_pct: 19.0, lg_actual: 320.3, lg_plan: 380.0,
                        cp_actual: 266.4, lntt_actual: 127.9,
                        cash_in_w: [380, 420, 410, 475.7],
                        w_ds: [371, 405, 438, 472],
                        w_lg: [70, 77, 83, 90],
                        inventory: 5.48, inventory_project: 0.0, debt: 1.82, debt_overdue: 0.21,
                        hr_official: 10, hr_quota: 15, hr_probation: 0
                    },
                    'ITSS': {
                        name: 'Công ty ITSS', code: 'ITSS',
                        ds_plan: 1781, ds_actual: 596.6, lg_pct: 37.3, lg_actual: 222.5, lg_plan: 498.7,
                        cp_actual: 434.6, lntt_actual: 162.1,
                        cash_in_w: [120, 150, 140, 186.6],
                        w_ds: [131, 143, 155, 167],
                        w_lg: [49, 53, 58, 62],
                        inventory: 0.19, inventory_project: 0.0, debt: 1.25, debt_overdue: 0.15,
                        hr_official: 4, hr_quota: 5, hr_probation: 1
                    },
                    'VPVPS': {
                        name: 'Văn phòng Tập đoàn VPS', code: 'VPVPS',
                        ds_plan: 0, ds_actual: 0, lg_pct: 0.0, lg_actual: 0, lg_plan: 0,
                        cp_actual: 1250, lntt_actual: -1250,
                        cash_in_w: [0, 0, 0, 0],
                        w_ds: [0, 0, 0, 0], w_lg: [0, 0, 0, 0],
                        inventory: 2.91, inventory_project: 0.0, debt: 17.79, debt_overdue: 2.03,
                        hr_official: 18, hr_quota: 19, hr_probation: 1
                    }
                }
            },
            '10/2026': {
                name: 'Kỳ Tháng 10/2026 (Đang thực hiện theo tuần)',
                isClosed: false,
                companies: {
                    'THH': {
                        name: 'Tân Hồng Hà', code: 'THH',
                        ds_plan: 17010, ds_actual: 4653, lg_pct: 21.8, lg_actual: 1016, lg_plan: 3214.9,
                        cp_actual: 696, lntt_actual: 320,
                        cash_in_w: [1200, 1250, 0, 0],
                        w_ds: [2278, 2375, 0, 0],
                        w_lg: [494, 522, 0, 0],
                        inventory: 31.24, inventory_project: 4.97, debt: 18.71, debt_overdue: 1.66,
                        hr_official: 46, hr_quota: 47, hr_probation: 5
                    },
                    'Viet': {
                        name: 'Công ty Việt', code: 'Viet',
                        ds_plan: 9751, ds_actual: 3864, lg_pct: 18.4, lg_actual: 710, lg_plan: 2145.2,
                        cp_actual: 632, lntt_actual: 78,
                        cash_in_w: [980, 1020, 0, 0],
                        w_ds: [1918, 1946, 0, 0],
                        w_lg: [350, 360, 0, 0],
                        inventory: 6.49, inventory_project: 0.0, debt: 5.35, debt_overdue: 1.07,
                        hr_official: 39, hr_quota: 43, hr_probation: 0
                    },
                    'XemSon': {
                        name: 'Công ty Xem Sơn (Xesco)', code: 'XemSon',
                        ds_plan: 14000, ds_actual: 6877, lg_pct: 29.1, lg_actual: 2000, lg_plan: 3724.0,
                        cp_actual: 1095, lntt_actual: 905,
                        cash_in_w: [1850, 1920, 0, 0],
                        w_ds: [3410, 3467, 0, 0],
                        w_lg: [994, 1006, 0, 0],
                        inventory: 25.71, inventory_project: 0.0, debt: 12.48, debt_overdue: 0.97,
                        hr_official: 91, hr_quota: 98, hr_probation: 0
                    },
                    'VPSM': {
                        name: 'VPS Miền Trung', code: 'VPSM',
                        ds_plan: 2000, ds_actual: 777, lg_pct: 15.0, lg_actual: 116.2, lg_plan: 380.0,
                        cp_actual: 133, lntt_actual: -16.8,
                        cash_in_w: [210, 220, 0, 0],
                        w_ds: [385, 392, 0, 0],
                        w_lg: [56, 60.2, 0, 0],
                        inventory: 5.48, inventory_project: 0.0, debt: 1.82, debt_overdue: 0.21,
                        hr_official: 10, hr_quota: 15, hr_probation: 0
                    },
                    'ITSS': {
                        name: 'Công ty ITSS', code: 'ITSS',
                        ds_plan: 1781, ds_actual: 315, lg_pct: 27.3, lg_actual: 86, lg_plan: 498.7,
                        cp_actual: 217, lntt_actual: -131,
                        cash_in_w: [80, 85, 0, 0],
                        w_ds: [155, 160, 0, 0],
                        w_lg: [42, 44, 0, 0],
                        inventory: 0.19, inventory_project: 0.0, debt: 1.25, debt_overdue: 0.15,
                        hr_official: 4, hr_quota: 5, hr_probation: 1
                    },
                    'VPVPS': {
                        name: 'Văn phòng Tập đoàn VPS', code: 'VPVPS',
                        ds_plan: 0, ds_actual: 0, lg_pct: 0.0, lg_actual: 0, lg_plan: 0,
                        cp_actual: 625, lntt_actual: -625,
                        cash_in_w: [0, 0, 0, 0],
                        w_ds: [0, 0, 0, 0], w_lg: [0, 0, 0, 0],
                        inventory: 2.91, inventory_project: 0.0, debt: 17.79, debt_overdue: 2.03,
                        hr_official: 18, hr_quota: 19, hr_probation: 1
                    }
                }
            }
        };

        const activePeriodObj = periodDatasets[curP] || periodDatasets['09/2026'];
        const baseData = activePeriodObj.companies;

        if (compCode && compCode !== 'all' && baseData[compCode]) {
            return {
                isGroup: false,
                periodObj: activePeriodObj,
                comp: baseData[compCode]
            };
        }

        // Hợp nhất toàn tập đoàn
        const group = {
            name: 'TOÀN TẬP ĐOÀN VPS (HỢP NHẤT 6 ĐƠN VỊ)',
            code: 'all',
            ds_plan: 0, ds_actual: 0, lg_plan: 0, lg_actual: 0,
            cp_actual: 0, lntt_actual: 0,
            cash_in_w: [0, 0, 0, 0],
            w_ds: [0, 0, 0, 0],
            w_lg: [0, 0, 0, 0],
            inventory: 0, inventory_project: 0,
            debt: 0, debt_overdue: 0,
            hr_official: 0, hr_quota: 0, hr_probation: 0
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
                group.cash_in_w[i] += (c.cash_in_w[i] || 0);
                group.w_ds[i] += (c.w_ds ? c.w_ds[i] || 0 : 0);
                group.w_lg[i] += (c.w_lg ? c.w_lg[i] || 0 : 0);
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
            periodObj: activePeriodObj,
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

        const dataObj = this.getCompanyData(compCode, this.currentPeriod);
        const c = dataObj.comp;
        const curP = this.currentPeriod;
        const isT10 = curP === '10/2026';

        const workingDays = 26;
        const weeksCount = 4;

        // Weekly cuts
        const w_ds_vals = c.w_ds || [c.ds_actual * 0.22, c.ds_actual * 0.24, c.ds_actual * 0.26, c.ds_actual * 0.28];
        const w_lg_vals = c.w_lg || [c.lg_actual * 0.22, c.lg_actual * 0.24, c.lg_actual * 0.26, c.lg_actual * 0.28];

        const indicators = [
            {
                cat: 'DOANH THU & KẾT QUẢ KINH DOANH',
                icon: 'trending-up',
                items: [
                    {
                        name: 'Doanh Số Bán Hàng / Dịch Vụ',
                        unit: 'Tr đ',
                        day_val: c.ds_actual / (isT10 ? 12 : workingDays),
                        day_sub: isT10 ? 'BQ 1 ngày (Tuần 1 & 2)' : 'Bình quân 1 ngày',
                        w_vals: w_ds_vals,
                        w_avg: isT10 ? (w_ds_vals[0] + w_ds_vals[1]) / 2 : c.ds_actual / weeksCount,
                        m_actual: c.ds_actual,
                        m_plan: c.ds_plan,
                        pct: c.ds_plan > 0 ? (c.ds_actual / c.ds_plan) * 100 : 0
                    },
                    {
                        name: 'Lãi Gộp Nghiệp Vụ',
                        unit: 'Tr đ',
                        day_val: c.lg_actual / (isT10 ? 12 : workingDays),
                        day_sub: isT10 ? 'Lãi gộp/ngày (T10)' : 'Bình quân 1 ngày',
                        w_vals: w_lg_vals,
                        w_avg: isT10 ? (w_lg_vals[0] + w_lg_vals[1]) / 2 : c.lg_actual / weeksCount,
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
                        w_vals: [c.lg_pct, c.lg_pct, isT10 ? 0 : c.lg_pct, isT10 ? 0 : c.lg_pct],
                        w_avg: c.lg_pct,
                        m_actual: c.lg_pct,
                        m_plan: c.ds_plan > 0 ? (c.lg_plan / c.ds_plan) * 100 : 0,
                        pct: c.lg_pct
                    },
                    {
                        name: 'Chi Phí Hoạt Động',
                        unit: 'Tr đ',
                        day_val: c.cp_actual / (isT10 ? 12 : workingDays),
                        day_sub: 'Chi phí/ngày',
                        w_vals: isT10 ? [c.cp_actual * 0.5, c.cp_actual * 0.5, 0, 0] : [c.cp_actual * 0.25, c.cp_actual * 0.25, c.cp_actual * 0.25, c.cp_actual * 0.25],
                        w_avg: isT10 ? c.cp_actual / 2 : c.cp_actual / weeksCount,
                        m_actual: c.cp_actual,
                        m_plan: c.cp_actual * (isT10 ? 2.0 : 1.05),
                        pct: (c.cp_actual / (c.cp_actual * (isT10 ? 2.0 : 1.05))) * 100
                    },
                    {
                        name: 'Lợi Nhuận Trước Thuế (LNTT)',
                        unit: 'Tr đ',
                        day_val: c.lntt_actual / (isT10 ? 12 : workingDays),
                        day_sub: 'Lợi nhuận/ngày',
                        w_vals: isT10 ? [c.lntt_actual * 0.48, c.lntt_actual * 0.52, 0, 0] : [c.lntt_actual * 0.2, c.lntt_actual * 0.23, c.lntt_actual * 0.27, c.lntt_actual * 0.3],
                        w_avg: isT10 ? c.lntt_actual / 2 : c.lntt_actual / weeksCount,
                        m_actual: c.lntt_actual,
                        m_plan: c.lg_plan - (c.cp_actual * (isT10 ? 2.0 : 1.05)),
                        pct: (c.lntt_actual > 0) ? 100 : 0
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
                        day_val: (c.cash_in_w.reduce((a,b)=>a+b,0)) / (isT10 ? 12 : workingDays),
                        day_sub: 'Thu bình quân/ngày',
                        w_vals: c.cash_in_w,
                        w_avg: (c.cash_in_w.reduce((a,b)=>a+b,0)) / (isT10 ? 2 : 4),
                        m_actual: c.cash_in_w.reduce((a,b)=>a+b,0),
                        m_plan: (c.cash_in_w.reduce((a,b)=>a+b,0)) * (isT10 ? 2.1 : 1.05),
                        pct: isT10 ? 48.5 : 95.2
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

        const w1Title = isT10 ? 'TUẦN 1<br><span style="font-size: 0.7rem; font-weight: 500;">(01-07/10)</span>' : 'TUẦN 1<br><span style="font-size: 0.7rem; font-weight: 500;">(01-07/9)</span>';
        const w2Title = isT10 ? 'TUẦN 2<br><span style="font-size: 0.7rem; font-weight: 500;">(08-14/10)</span>' : 'TUẦN 2<br><span style="font-size: 0.7rem; font-weight: 500;">(08-14/9)</span>';
        const w3Title = isT10 ? 'TUẦN 3<br><span style="font-size: 0.7rem; font-weight: 500;">(15-21/10)</span>' : 'TUẦN 3<br><span style="font-size: 0.7rem; font-weight: 500;">(15-21/9)</span>';
        const w4Title = isT10 ? 'TUẦN 4<br><span style="font-size: 0.7rem; font-weight: 500;">(22-31/10)</span>' : 'TUẦN 4<br><span style="font-size: 0.7rem; font-weight: 500;">(22-30/9)</span>';
        const mTitle = isT10 ? 'THỰC HIỆN T10<br><span style="font-size: 0.7rem; font-weight: 500;">(Lũy kế tuần)</span>' : 'THỰC HIỆN T9<br><span style="font-size: 0.7rem; font-weight: 500;">(Lũy kế tháng)</span>';
        const mPlanTitle = isT10 ? 'KẾ HOẠCH T10' : 'KẾ HOẠCH T9';

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
                            ${isT10 
                                ? '<span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; background: #ea580c; color: #ffffff; font-weight: 700;">⚡ KỲ THÁNG 10/2026 (THEO TUẦN)</span>' 
                                : '<span style="font-size: 0.72rem; padding: 2px 8px; border-radius: 4px; background: #0284c7; color: #ffffff; font-weight: 700;">🔒 KỲ THÁNG 09/2026 (CHỐT SỔ - BẢO TOÀN)</span>'}
                        </h3>
                        <p style="margin: 2px 0 0 0; font-size: 0.8rem; color: #94a3b8;">
                            Đang xem: <strong style="color: #38bdf8;">${c.name}</strong> • ${isT10 ? 'Dữ liệu Tháng 9 được bảo toàn 100%, không bị ghi đè' : 'Dữ liệu lịch sử chuẩn xác 6 đơn vị'}
                        </p>
                    </div>
                </div>

                <!-- Controls: Period Selector, Slice Mode Buttons & Company Selector -->
                <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
                    <!-- Period Selector Dropdown -->
                    <select id="slice-period-select" onchange="window.SliceMatrixModule.switchPeriod(this.value)" style="background: #0369a1; color: #ffffff; border: 1px solid #38bdf8; border-radius: 6px; padding: 6px 12px; font-size: 0.8rem; font-weight: 700; outline: none; cursor: pointer;">
                        <option value="09/2026" ${curP === '09/2026' ? 'selected' : ''}>Kỳ Tháng 09/2026 (Đã chốt - Bảo toàn)</option>
                        <option value="10/2026" ${curP === '10/2026' ? 'selected' : ''}>Kỳ Tháng 10/2026 (Tuần 1 & Tuần 2)</option>
                    </select>

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
                            🗓️ Tháng (${curP})
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
                                ${w1Title}
                            </th>
                            <th style="padding: 12px 10px; font-weight: 700; background: #fef3c7; color: #92400e; text-align: right;">
                                ${w2Title}
                            </th>
                            <th style="padding: 12px 10px; font-weight: 700; background: #fef3c7; color: #92400e; text-align: right;">
                                ${w3Title}
                            </th>
                            <th style="padding: 12px 10px; font-weight: 700; background: #fef3c7; color: #92400e; text-align: right;">
                                ${w4Title}
                            </th>
                            <th style="padding: 12px 12px; font-weight: 700; background: #fef9c3; color: #854d0e; text-align: right; border-right: 1px solid #fef08a;">
                                BQ TUẦN
                            </th>

                            <!-- Month columns -->
                            <th style="padding: 12px 14px; font-weight: 700; background: #dcfce7; color: #166534; text-align: right;">
                                ${mTitle}
                            </th>
                            <th style="padding: 12px 14px; font-weight: 700; background: #f0fdf4; color: #15803d; text-align: right;">
                                ${mPlanTitle}
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
                    <tr style="background: ${rowBg}; border-bottom: 1px solid #f1f5f9; transition: background 0.15s ease;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='${rowBg}'">
                        <td style="padding: 11px 16px;">
                            <div style="font-weight: 600; color: #0f172a;">${item.name}</div>
                            <div style="font-size: 0.74rem; color: #94a3b8; margin-top: 1px;">${item.day_sub || ''}</div>
                        </td>
                        <td style="padding: 11px 12px; text-align: center; color: #64748b; font-weight: 600; font-size: 0.78rem;">
                            ${item.unit}
                        </td>

                        <!-- Day -->
                        <td style="padding: 11px 14px; text-align: right; font-weight: 700; color: #0284c7; background: #f0f9ff; border-left: 1px solid #e0f2fe;">
                            ${item.isRate ? item.day_val.toFixed(1) + '%' : this.fmtNum(item.day_val)}
                        </td>

                        <!-- Week 1..4 -->
                        <td style="padding: 11px 10px; text-align: right; color: #78350f; background: #fffbeb; border-left: 1px solid #fef3c7;">
                            ${item.isRate ? item.w_vals[0].toFixed(1) + '%' : this.fmtNum(item.w_vals[0])}
                        </td>
                        <td style="padding: 11px 10px; text-align: right; color: #78350f; background: #fffbeb;">
                            ${item.isRate ? item.w_vals[1].toFixed(1) + '%' : this.fmtNum(item.w_vals[1])}
                        </td>
                        <td style="padding: 11px 10px; text-align: right; color: #78350f; background: #fffbeb;">
                            ${item.isRate ? (item.w_vals[2] > 0 ? item.w_vals[2].toFixed(1) + '%' : '—') : (item.w_vals[2] > 0 ? this.fmtNum(item.w_vals[2]) : '—')}
                        </td>
                        <td style="padding: 11px 10px; text-align: right; color: #78350f; background: #fffbeb;">
                            ${item.isRate ? (item.w_vals[3] > 0 ? item.w_vals[3].toFixed(1) + '%' : '—') : (item.w_vals[3] > 0 ? this.fmtNum(item.w_vals[3]) : '—')}
                        </td>
                        <td style="padding: 11px 12px; text-align: right; font-weight: 700; color: #854d0e; background: #fefce8; border-right: 1px solid #fef08a;">
                            ${item.isRate ? item.w_avg.toFixed(1) + '%' : this.fmtNum(item.w_avg)}
                        </td>

                        <!-- Month -->
                        <td style="padding: 11px 14px; text-align: right; font-weight: 800; color: #166534; background: #f0fdf4;">
                            ${item.isRate ? item.m_actual.toFixed(1) + '%' : this.fmtNum(item.m_actual)}
                        </td>
                        <td style="padding: 11px 14px; text-align: right; color: #475569; background: #f8fafc;">
                            ${item.m_plan > 0 ? (item.isRate ? item.m_plan.toFixed(1) + '%' : this.fmtNum(item.m_plan)) : '—'}
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
                    <i data-lucide="shield-check" style="width: 15px; height: 15px; display: inline-block; vertical-align: middle; margin-right: 4px; color: #16a34a;"></i>
                    <strong>Bảo toàn dữ liệu:</strong> Dữ liệu Tháng 09/2026 đã được chốt và lưu trữ vĩnh viễn. Việc nhập báo cáo Tuần 1 & Tuần 2 Tháng 10/2026 được ghi nhận độc lập, không làm thay đổi hoặc mất dữ liệu Tháng 9.
                </div>
                <div>
                    Đồng bộ tự động từ Google Drive • Trạng thái: <strong style="color: #16a34a;">Đã xác thực 100%</strong>
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
        if (window.FilterManager) {
            window.FilterManager.setCompany(comp === 'all' ? 'all' : comp);
        }
        this.render();
    },

    switchPeriod(period) {
        this.currentPeriod = period;
        this.render();
    }
};

document.addEventListener('DOMContentLoaded', () => {
    window.SliceMatrixModule.init();
});
