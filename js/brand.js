// ============================================================
// BRAND MODULE - Báo Cáo Thương Hiệu
// 4 Chỉ tiêu: Thị Phần, Doanh Số, Thương Hiệu, Khách Hàng
// ============================================================

window.BrandModule = {
    name: 'Thương Hiệu',
    currentTab: 'dashboard',  // 'dashboard' | 'detail'
    selectedCompany: 'all',
    charts: {},

    // ============================================================
    // CÁC ĐƠN VỊ
    // ============================================================
    companies: ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS'],
    companyColors: {
        'Tân Hồng Hà': '#4F46E5',
        'Việt': '#10B981',
        'Xem Sơn': '#F59E0B',
        'VPS M': '#EF4444',
        'ITSS': '#8B5CF6',
    },

    // ============================================================
    // DỮ LIỆU MẪU - Kế Hoạch vs Thực Hiện theo từng đơn vị
    // ============================================================
    brandData: {
        'Tân Hồng Hà': {
            // I. Tăng trưởng thị phần (% máy photocopy, KH: 20%)
            marketSharePlan: 20,
            marketShareActual: 16,

            // II. Tăng trưởng doanh số (% đóng góp từ kênh TT, KH: 30%)
            revenueContribPlan: 30,
            revenueContribActual: 22,

            // III. Thương hiệu - % khách hàng hài lòng & biết VPS (KH: 70%)
            brandAwarenessPlan: 70,
            brandAwarenessActual: 63,

            // IV. Khách hàng mới - Khách lẻ (KH: 578 toàn tập đoàn → theo đơn vị)
            newRetailPlan: 120,
            newRetailActual: 98,
            // Khách đại lý (KH: 258 toàn tập đoàn → theo đơn vị)
            newAgencyPlan: 55,
            newAgencyActual: 40,
            // Khách hàng trọng đô (6.415 tổng)
            premiumPlan: 1350,
            premiumActual: 1210,
        },
        'Việt': {
            marketSharePlan: 20,
            marketShareActual: 18,
            revenueContribPlan: 30,
            revenueContribActual: 27,
            brandAwarenessPlan: 70,
            brandAwarenessActual: 71,
            newRetailPlan: 115,
            newRetailActual: 120,
            newAgencyPlan: 50,
            newAgencyActual: 52,
            premiumPlan: 1300,
            premiumActual: 1350,
        },
        'Xem Sơn': {
            marketSharePlan: 20,
            marketShareActual: 14,
            revenueContribPlan: 30,
            revenueContribActual: 19,
            brandAwarenessPlan: 70,
            brandAwarenessActual: 58,
            newRetailPlan: 110,
            newRetailActual: 85,
            newAgencyPlan: 48,
            newAgencyActual: 35,
            premiumPlan: 1250,
            premiumActual: 1050,
        },
        'VPS M': {
            marketSharePlan: 20,
            marketShareActual: 19,
            revenueContribPlan: 30,
            revenueContribActual: 28,
            brandAwarenessPlan: 70,
            brandAwarenessActual: 68,
            newRetailPlan: 118,
            newRetailActual: 112,
            newAgencyPlan: 52,
            newAgencyActual: 50,
            premiumPlan: 1280,
            premiumActual: 1260,
        },
        'ITSS': {
            marketSharePlan: 20,
            marketShareActual: 12,
            revenueContribPlan: 30,
            revenueContribActual: 15,
            brandAwarenessPlan: 70,
            brandAwarenessActual: 55,
            newRetailPlan: 115,
            newRetailActual: 76,
            newAgencyPlan: 53,
            newAgencyActual: 32,
            premiumPlan: 1235,
            premiumActual: 980,
        },
    },

    // ============================================================
    // INIT
    // ============================================================
    init() {
        this.render();
        document.addEventListener('vps_filter_changed', (e) => {
            if (e.detail && e.detail.company) {
                const mapCty = {
                    'THH': 'Tân Hồng Hà',
                    'Viet': 'Việt',
                    'XemSon': 'Xem Sơn',
                    'VPSM': 'VPS M',
                    'ITSS': 'ITSS',
                    'all': 'all'
                };
                this.selectedCompany = mapCty[e.detail.company] || e.detail.company;
            }
            this.render();
        });
    },

    switchTab(tab) {
        this.currentTab = tab;
        this.render();
    },

    setCompany(cty) {
        this.selectedCompany = cty;
        this.render();
    },

    getCompanyBrandData(c) {
        let d = { ...(this.brandData[c] || {}) };
        if (window.mockData && window.mockData.brand_data) {
            const live = window.mockData.brand_data[c];
            if (live) {
                d = { ...d, ...live };
            }
        }
        return d;
    },

    // ============================================================
    // COMPUTE HELPERS
    // ============================================================
    getRate(actual, plan) {
        if (!plan) return 0;
        return Math.min(Math.round((actual / plan) * 100), 999);
    },

    getAggData() {
        // Tổng hợp toàn bộ 5 đơn vị
        const agg = {
            marketSharePlan: 0, marketShareActual: 0,
            revenueContribPlan: 0, revenueContribActual: 0,
            brandAwarenessPlan: 0, brandAwarenessActual: 0,
            newRetailPlan: 0, newRetailActual: 0,
            newAgencyPlan: 0, newAgencyActual: 0,
            premiumPlan: 0, premiumActual: 0,
        };
        let n = this.companies.length;
        for (const c of this.companies) {
            const d = this.getCompanyBrandData(c);
            agg.marketSharePlan += d.marketSharePlan;
            agg.marketShareActual += d.marketShareActual;
            agg.revenueContribPlan += d.revenueContribPlan;
            agg.revenueContribActual += d.revenueContribActual;
            agg.brandAwarenessPlan += d.brandAwarenessPlan;
            agg.brandAwarenessActual += d.brandAwarenessActual;
            agg.newRetailPlan += d.newRetailPlan;
            agg.newRetailActual += d.newRetailActual;
            agg.newAgencyPlan += d.newAgencyPlan;
            agg.newAgencyActual += d.newAgencyActual;
            agg.premiumPlan += d.premiumPlan;
            agg.premiumActual += d.premiumActual;
        }
        // Average for % indicators
        agg.marketSharePlan = Math.round(agg.marketSharePlan / n);
        agg.marketShareActual = Math.round((agg.marketShareActual / n) * 10) / 10;
        agg.revenueContribPlan = Math.round(agg.revenueContribPlan / n);
        agg.revenueContribActual = Math.round((agg.revenueContribActual / n) * 10) / 10;
        agg.brandAwarenessPlan = Math.round(agg.brandAwarenessPlan / n);
        agg.brandAwarenessActual = Math.round((agg.brandAwarenessActual / n) * 10) / 10;
        return agg;
    },

    getStatusBadge(rate) {
        if (rate >= 100) return { cls: 'status-green', text: '✓ Đạt', color: '#10B981' };
        if (rate >= 80) return { cls: 'status-yellow', text: '⚡ Gần đạt', color: '#F59E0B' };
        return { cls: 'status-red', text: '✗ Chưa đạt', color: '#EF4444' };
    },

    // ============================================================
    // MAIN RENDER
    // ============================================================
    render() {
        const container = document.getElementById('view-brand');
        if (!container) return;

        // Destroy old charts
        Object.values(this.charts).forEach(c => { try { c.destroy(); } catch(e) {} });
        this.charts = {};

        const d = this.selectedCompany === 'all'
            ? this.getAggData()
            : this.getCompanyBrandData(this.selectedCompany);

        const mktRate = this.getRate(d.marketShareActual, d.marketSharePlan);
        const revRate = this.getRate(d.revenueContribActual, d.revenueContribPlan);
        const brandRate = this.getRate(d.brandAwarenessActual, d.brandAwarenessPlan);
        const retailRate = this.getRate(d.newRetailActual, d.newRetailPlan);
        const agencyRate = this.getRate(d.newAgencyActual, d.newAgencyPlan);
        const premiumRate = this.getRate(d.premiumActual, d.premiumPlan);

        const mktBadge = this.getStatusBadge(mktRate);
        const revBadge = this.getStatusBadge(revRate);
        const brandBadge = this.getStatusBadge(brandRate);
        const retailBadge = this.getStatusBadge(retailRate);
        const agencyBadge = this.getStatusBadge(agencyRate);
        const premiumBadge = this.getStatusBadge(premiumRate);

        // Company filter options
        let compOpts = `<option value="all" ${this.selectedCompany === 'all' ? 'selected' : ''}>Tất cả đơn vị</option>`;
        this.companies.forEach(c => {
            compOpts += `<option value="${c}" ${this.selectedCompany === c ? 'selected' : ''}>${c}</option>`;
        });

        const tabStyle = (tab) => `
            padding: 8px 20px; border: none; background: none; cursor: pointer; font-weight: 700;
            font-size: 0.88rem; border-bottom: 3px solid ${this.currentTab === tab ? '#4f46e5' : 'transparent'};
            color: ${this.currentTab === tab ? '#4f46e5' : '#64748b'}; outline: none; transition: all 0.2s;`;

        container.innerHTML = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; padding: 0; position: relative;">

            <!-- TAB BAR -->
            <div style="display:flex; align-items:center; border-bottom: 2px solid #e2e8f0; background:#fff; padding: 0 16px; position: sticky; top:0; z-index:10; gap:4px;">
                <button onclick="window.BrandModule.switchTab('dashboard')" style="${tabStyle('dashboard')}">
                    📊 TỔNG QUAN THƯƠNG HIỆU
                </button>
                <button onclick="window.BrandModule.switchTab('detail')" style="${tabStyle('detail')}">
                    📋 CHI TIẾT THEO ĐƠN VỊ
                </button>
                <div style="flex:1;"></div>
                <select onchange="window.BrandModule.setCompany(this.value)"
                    style="border:1px solid #d1d5db; border-radius:6px; padding:5px 10px; font-size:0.85rem; color:#374151; background:#f9fafb; cursor:pointer;">
                    ${compOpts}
                </select>
            </div>

            <!-- CONTENT -->
            <div style="padding: 16px;">
                ${this.currentTab === 'dashboard' ? this.renderDashboard(d, mktRate, revRate, brandRate, retailRate, agencyRate, premiumRate, mktBadge, revBadge, brandBadge, retailBadge, agencyBadge, premiumBadge) : this.renderDetail()}
            </div>
        </div>`;

        // Init charts after DOM is ready
        setTimeout(() => {
            if (this.currentTab === 'dashboard') {
                this.initDashboardCharts(d);
            } else {
                this.initDetailCharts();
            }
            if (window.lucide) lucide.createIcons();
        }, 100);
    },

    // ============================================================
    // DASHBOARD TAB
    // ============================================================
    renderDashboard(d, mktRate, revRate, brandRate, retailRate, agencyRate, premiumRate, mktBadge, revBadge, brandBadge, retailBadge, agencyBadge, premiumBadge) {
        const isAll = this.selectedCompany === 'all';
        const title = isAll ? 'Tất cả đơn vị' : this.selectedCompany;

        const kpiCard = (icon, label, plan, actual, unit, rate, badge, id) => `
        <div style="background:#fff; border-radius:12px; box-shadow:0 1px 6px rgba(0,0,0,0.08); padding:16px; border-left: 4px solid ${badge.color};">
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:12px;">
                <span style="font-size:1.5rem;">${icon}</span>
                <div>
                    <div style="font-weight:700; color:#1e293b; font-size:0.9rem;">${label}</div>
                    <div style="font-size:0.75rem; color:#64748b;">Kế hoạch: ${plan}${unit}</div>
                </div>
                <span style="margin-left:auto; background:${badge.color}20; color:${badge.color}; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">${badge.text}</span>
            </div>
            <div style="display:flex; align-items:flex-end; gap:6px; margin-bottom:8px;">
                <span style="font-size:1.8rem; font-weight:800; color:${badge.color};">${actual}${unit}</span>
                <span style="font-size:0.8rem; color:#64748b; margin-bottom:6px;">/ ${plan}${unit}</span>
            </div>
            <div style="background:#f1f5f9; border-radius:8px; height:8px; overflow:hidden;">
                <div style="height:100%; width:${Math.min(rate,100)}%; background:${badge.color}; border-radius:8px; transition:width 0.8s ease;"></div>
            </div>
            <div style="text-align:right; font-size:0.75rem; color:${badge.color}; margin-top:4px; font-weight:700;">${rate}%</div>
        </div>`;

        return `
        <!-- HEADER -->
        <div style="display:flex; align-items:center; margin-bottom:16px; gap:12px;">
            <div style="width:4px; height:32px; background:linear-gradient(180deg,#4f46e5,#7c3aed); border-radius:2px;"></div>
            <div>
                <h2 style="margin:0; font-size:1.1rem; font-weight:800; color:#1e293b;">BÁO CÁO THƯƠNG HIỆU</h2>
                <p style="margin:0; font-size:0.8rem; color:#64748b;">${title} · Năm 2026</p>
            </div>
        </div>

        <!-- 4 KPI CARDS -->
        <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:12px; margin-bottom:16px;">
            ${kpiCard('📈', 'I. Tăng Trưởng Thị Phần', d.marketSharePlan, d.marketShareActual, '%', mktRate, mktBadge, 'mkt')}
            ${kpiCard('💰', 'II. Tăng Trưởng Doanh Số', d.revenueContribPlan, d.revenueContribActual, '%', revRate, revBadge, 'rev')}
            ${kpiCard('🏆', 'III. Thương Hiệu & Hài Lòng', d.brandAwarenessPlan, d.brandAwarenessActual, '%', brandRate, brandBadge, 'brand')}
            ${kpiCard('👥', 'IV. Khách Hàng Mới (Lẻ)', d.newRetailPlan, d.newRetailActual, ' KH', retailRate, retailBadge, 'retail')}
        </div>

        <!-- ROW 2: CHARTS -->
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; margin-bottom:16px;">

            <!-- Biểu đồ so sánh tổng thể -->
            <div style="background:#fff; border-radius:12px; box-shadow:0 1px 6px rgba(0,0,0,0.08); padding:16px;">
                <h3 style="margin:0 0 12px; font-size:0.9rem; color:#1e293b; font-weight:700;">📊 Tỉ Lệ Hoàn Thành Các Chỉ Tiêu</h3>
                <div style="height:220px; position:relative;">
                    <canvas id="brandRadarChart"></canvas>
                </div>
            </div>

            <!-- Biểu đồ so sánh đơn vị -->
            <div style="background:#fff; border-radius:12px; box-shadow:0 1px 6px rgba(0,0,0,0.08); padding:16px;">
                <h3 style="margin:0 0 12px; font-size:0.9rem; color:#1e293b; font-weight:700;">🏢 Tỉ Lệ Hoàn Thành Theo Đơn Vị</h3>
                <div style="height:220px; position:relative;">
                    <canvas id="brandBarChart"></canvas>
                </div>
            </div>
        </div>

        <!-- ROW 3: Khách hàng chi tiết + Premium -->
        <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:12px; margin-bottom:16px;">
            ${kpiCard('🛒', 'Khách Lẻ Mới', d.newRetailPlan, d.newRetailActual, ' KH', retailRate, retailBadge, 'retail2')}
            ${kpiCard('🏪', 'Khách Đại Lý Mới', d.newAgencyPlan, d.newAgencyActual, ' KH', agencyRate, agencyBadge, 'agency')}
            ${kpiCard('⭐', 'Khách Hàng Trọng Đô', d.premiumPlan, d.premiumActual, ' KH', premiumRate, premiumBadge, 'premium')}
        </div>

        <!-- BẢNG TÓM TẮT -->
        <div style="background:#fff; border-radius:12px; box-shadow:0 1px 6px rgba(0,0,0,0.08); overflow:hidden;">
            <div style="padding:12px 16px; background:linear-gradient(135deg,#4f46e5,#7c3aed); color:#fff;">
                <h3 style="margin:0; font-size:0.9rem; font-weight:700;">📋 Bảng Tổng Hợp Chỉ Tiêu Thương Hiệu - 5 Đơn Vị</h3>
            </div>
            <div style="overflow-x:auto;">
                <table style="width:100%; border-collapse:collapse; font-size:0.82rem;">
                    <thead>
                        <tr style="background:#f8fafc; border-bottom: 2px solid #e2e8f0;">
                            <th style="padding:10px 12px; text-align:left; color:#475569; font-weight:700;">Đơn Vị</th>
                            <th style="padding:10px 12px; text-align:center; color:#475569;">Thị Phần<br/><small>(KH: 20%)</small></th>
                            <th style="padding:10px 12px; text-align:center; color:#475569;">D.Số TT<br/><small>(KH: 30%)</small></th>
                            <th style="padding:10px 12px; text-align:center; color:#475569;">Thương Hiệu<br/><small>(KH: 70%)</small></th>
                            <th style="padding:10px 12px; text-align:center; color:#475569;">KH Lẻ Mới</th>
                            <th style="padding:10px 12px; text-align:center; color:#475569;">KH Đại Lý</th>
                            <th style="padding:10px 12px; text-align:center; color:#475569;">KH Trọng Đô</th>
                            <th style="padding:10px 12px; text-align:center; color:#475569;">Đánh Giá</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.renderSummaryRows()}
                    </tbody>
                </table>
            </div>
        </div>`;
    },

    renderSummaryRows() {
        return this.companies.map((c, idx) => {
            const d = this.brandData[c];
            const mktR = this.getRate(d.marketShareActual, d.marketSharePlan);
            const revR = this.getRate(d.revenueContribActual, d.revenueContribPlan);
            const brandR = this.getRate(d.brandAwarenessActual, d.brandAwarenessPlan);
            const retailR = this.getRate(d.newRetailActual, d.newRetailPlan);
            const agencyR = this.getRate(d.newAgencyActual, d.newAgencyPlan);
            const premiumR = this.getRate(d.premiumActual, d.premiumPlan);
            const avgR = Math.round((mktR + revR + brandR + retailR + agencyR + premiumR) / 6);
            const badge = this.getStatusBadge(avgR);
            const color = this.companyColors[c];

            const cell = (actual, plan, unit, rate) => {
                const b = this.getStatusBadge(rate);
                return `<td style="padding:8px 12px; text-align:center; border-bottom:1px solid #f1f5f9;">
                    <div style="font-weight:700; color:${b.color};">${actual}${unit}</div>
                    <div style="font-size:0.7rem; color:#94a3b8;">/${plan}${unit} (${rate}%)</div>
                </td>`;
            };

            return `<tr style="background:${idx % 2 === 0 ? '#fff' : '#fafbfc'}; cursor:pointer;" onclick="window.BrandModule.setCompany('${c}')">
                <td style="padding:8px 12px; border-bottom:1px solid #f1f5f9; border-left:3px solid ${color};">
                    <div style="font-weight:700; color:#1e293b;">${c}</div>
                </td>
                ${cell(d.marketShareActual, d.marketSharePlan, '%', mktR)}
                ${cell(d.revenueContribActual, d.revenueContribPlan, '%', revR)}
                ${cell(d.brandAwarenessActual, d.brandAwarenessPlan, '%', brandR)}
                ${cell(d.newRetailActual, d.newRetailPlan, ' KH', retailR)}
                ${cell(d.newAgencyActual, d.newAgencyPlan, ' KH', agencyR)}
                ${cell(d.premiumActual, d.premiumPlan, ' KH', premiumR)}
                <td style="padding:8px 12px; text-align:center; border-bottom:1px solid #f1f5f9;">
                    <span style="background:${badge.color}20; color:${badge.color}; padding:3px 10px; border-radius:20px; font-size:0.75rem; font-weight:700;">${badge.text} (${avgR}%)</span>
                </td>
            </tr>`;
        }).join('');
    },

    // ============================================================
    // DETAIL TAB - Tất cả đơn vị chi tiết
    // ============================================================
    renderDetail() {
        const metrics = [
            { key: 'mkt',     label: 'Thị Phần Máy Photocopy', planKey: 'marketSharePlan', actualKey: 'marketShareActual', unit: '%', icon: '📈', target: 'Đạt 20% thị phần' },
            { key: 'rev',     label: 'Đóng Góp Doanh Số Kênh TT', planKey: 'revenueContribPlan', actualKey: 'revenueContribActual', unit: '%', icon: '💰', target: '30% từ kênh truyền thông/sự kiện' },
            { key: 'brand',   label: 'Nhận Biết & Hài Lòng TH VPS', planKey: 'brandAwarenessPlan', actualKey: 'brandAwarenessActual', unit: '%', icon: '🏆', target: '70% KH khảo sát hài lòng & biết VPS' },
            { key: 'retail',  label: 'Khách Hàng Lẻ Mới', planKey: 'newRetailPlan', actualKey: 'newRetailActual', unit: ' KH', icon: '🛒', target: 'Tăng 15% KH lẻ' },
            { key: 'agency',  label: 'Khách Đại Lý Mới', planKey: 'newAgencyPlan', actualKey: 'newAgencyActual', unit: ' KH', icon: '🏪', target: 'Tăng 15% KH đại lý' },
            { key: 'premium', label: 'Khách Hàng Trọng Đô', planKey: 'premiumPlan', actualKey: 'premiumActual', unit: ' KH', icon: '⭐', target: 'Duy trì 6.415 KH trọng đô' },
        ];

        return `
        <div style="margin-bottom:16px; display:flex; align-items:center; gap:12px;">
            <div style="width:4px; height:32px; background:linear-gradient(180deg,#4f46e5,#7c3aed); border-radius:2px;"></div>
            <div>
                <h2 style="margin:0; font-size:1.1rem; font-weight:800; color:#1e293b;">CHI TIẾT CÁC CHỈ TIÊU THEO ĐƠN VỊ</h2>
                <p style="margin:0; font-size:0.8rem; color:#64748b;">So sánh Kế Hoạch vs Thực Hiện · Năm 2026</p>
            </div>
        </div>

        ${metrics.map(m => this.renderMetricBlock(m)).join('')}`;
    },

    renderMetricBlock(m) {
        const rows = this.companies.map(c => {
            const d = this.getCompanyBrandData(c);
            const plan = d[m.planKey];
            const actual = d[m.actualKey];
            const rate = this.getRate(actual, plan);
            const badge = this.getStatusBadge(rate);
            const color = this.companyColors[c];
            return { c, plan, actual, rate, badge, color };
        });

        const canvasId = `detailChart_${m.key}`;
        return `
        <div style="background:#fff; border-radius:12px; box-shadow:0 1px 6px rgba(0,0,0,0.08); margin-bottom:12px; overflow:hidden;">
            <div style="padding:10px 16px; background:#f8fafc; border-bottom:1px solid #e2e8f0; display:flex; align-items:center; gap:8px;">
                <span style="font-size:1.2rem;">${m.icon}</span>
                <div>
                    <span style="font-weight:700; color:#1e293b; font-size:0.9rem;">${m.label}</span>
                    <span style="margin-left:10px; font-size:0.75rem; color:#64748b;">📌 ${m.target}</span>
                </div>
            </div>
            <div style="display:grid; grid-template-columns:2fr 1fr; gap:0;">
                <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse; font-size:0.82rem;">
                        <thead>
                            <tr style="background:#f1f5f9;">
                                <th style="padding:8px 12px; text-align:left; color:#475569;">Đơn Vị</th>
                                <th style="padding:8px 12px; text-align:center; color:#475569;">Kế Hoạch</th>
                                <th style="padding:8px 12px; text-align:center; color:#475569;">Thực Hiện</th>
                                <th style="padding:8px 12px; text-align:center; color:#475569;">Tiến Độ</th>
                                <th style="padding:8px 12px; text-align:center; color:#475569;">Kết Quả</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${rows.map((r, idx) => `
                            <tr style="background:${idx%2===0?'#fff':'#fafbfc'}; border-bottom:1px solid #f1f5f9;">
                                <td style="padding:8px 12px; border-left:3px solid ${r.color}; font-weight:700; color:#1e293b;">${r.c}</td>
                                <td style="padding:8px 12px; text-align:center; color:#64748b;">${r.plan}${m.unit}</td>
                                <td style="padding:8px 12px; text-align:center; font-weight:700; color:${r.badge.color};">${r.actual}${m.unit}</td>
                                <td style="padding:8px 12px; min-width:100px;">
                                    <div style="background:#f1f5f9; border-radius:6px; height:8px; overflow:hidden;">
                                        <div style="height:100%; width:${Math.min(r.rate,100)}%; background:${r.badge.color}; border-radius:6px;"></div>
                                    </div>
                                    <div style="text-align:right; font-size:0.7rem; color:${r.badge.color}; margin-top:2px;">${r.rate}%</div>
                                </td>
                                <td style="padding:8px 12px; text-align:center;">
                                    <span style="background:${r.badge.color}20; color:${r.badge.color}; padding:2px 8px; border-radius:20px; font-size:0.72rem; font-weight:700;">${r.badge.text}</span>
                                </td>
                            </tr>`).join('')}
                        </tbody>
                    </table>
                </div>
                <div style="padding:12px; border-left:1px solid #f1f5f9; display:flex; align-items:center; justify-content:center;">
                    <div style="width:100%; height:160px; position:relative;">
                        <canvas id="${canvasId}"></canvas>
                    </div>
                </div>
            </div>
        </div>`;
    },

    // ============================================================
    // CHARTS
    // ============================================================
    initDashboardCharts(d) {
        this.initRadarChart(d);
        this.initBarChart();
    },

    initRadarChart(d) {
        const ctx = document.getElementById('brandRadarChart');
        if (!ctx) return;
        const mktR = this.getRate(d.marketShareActual, d.marketSharePlan);
        const revR = this.getRate(d.revenueContribActual, d.revenueContribPlan);
        const brandR = this.getRate(d.brandAwarenessActual, d.brandAwarenessPlan);
        const retailR = this.getRate(d.newRetailActual, d.newRetailPlan);
        const agencyR = this.getRate(d.newAgencyActual, d.newAgencyPlan);
        const premiumR = this.getRate(d.premiumActual, d.premiumPlan);

        this.charts['radar'] = new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Thị Phần', 'D.Số TT', 'Thương Hiệu', 'KH Lẻ', 'KH Đại Lý', 'KH Trọng Đô'],
                datasets: [
                    {
                        label: 'Kế Hoạch (100%)',
                        data: [100, 100, 100, 100, 100, 100],
                        borderColor: '#CBD5E1',
                        backgroundColor: 'rgba(203,213,225,0.15)',
                        borderDash: [5,5],
                        pointRadius: 2,
                    },
                    {
                        label: 'Thực Hiện',
                        data: [mktR, revR, brandR, retailR, agencyR, premiumR],
                        borderColor: '#4f46e5',
                        backgroundColor: 'rgba(79,70,229,0.15)',
                        pointBackgroundColor: '#4f46e5',
                        pointRadius: 4,
                    }
                ]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: { r: { min: 0, max: 120, ticks: { font: { size: 9 }, stepSize: 30 }, pointLabels: { font: { size: 10 } } } },
                plugins: { legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12 } } }
            }
        });
    },

    initBarChart() {
        const ctx = document.getElementById('brandBarChart');
        if (!ctx) return;

        const labels = this.companies;
        const datasets = [
            {
                label: 'Thị Phần (%)',
                data: this.companies.map(c => this.getRate(this.getCompanyBrandData(c).marketShareActual, this.getCompanyBrandData(c).marketSharePlan)),
                backgroundColor: '#4f46e5',
                borderRadius: 4,
            },
            {
                label: 'D.Số TT (%)',
                data: this.companies.map(c => this.getRate(this.getCompanyBrandData(c).revenueContribActual, this.getCompanyBrandData(c).revenueContribPlan)),
                backgroundColor: '#10B981',
                borderRadius: 4,
            },
            {
                label: 'Thương Hiệu (%)',
                data: this.companies.map(c => this.getRate(this.getCompanyBrandData(c).brandAwarenessActual, this.getCompanyBrandData(c).brandAwarenessPlan)),
                backgroundColor: '#F59E0B',
                borderRadius: 4,
            },
        ];

        this.charts['bar'] = new Chart(ctx, {
            type: 'bar',
            data: { labels, datasets },
            options: {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    y: { min: 0, max: 120, ticks: { font: { size: 10 } },
                        title: { display: true, text: '% Hoàn thành', font: { size: 10 } } },
                    x: { ticks: { font: { size: 10 } } }
                },
                plugins: {
                    legend: { position: 'bottom', labels: { font: { size: 10 }, boxWidth: 12 } },
                    annotation: {},
                }
            }
        });
    },

    initDetailCharts() {
        const metrics = [
            { key: 'mkt',     planKey: 'marketSharePlan',    actualKey: 'marketShareActual' },
            { key: 'rev',     planKey: 'revenueContribPlan', actualKey: 'revenueContribActual' },
            { key: 'brand',   planKey: 'brandAwarenessPlan', actualKey: 'brandAwarenessActual' },
            { key: 'retail',  planKey: 'newRetailPlan',      actualKey: 'newRetailActual' },
            { key: 'agency',  planKey: 'newAgencyPlan',      actualKey: 'newAgencyActual' },
            { key: 'premium', planKey: 'premiumPlan',        actualKey: 'premiumActual' },
        ];

        metrics.forEach(m => {
            const ctx = document.getElementById(`detailChart_${m.key}`);
            if (!ctx) return;
            const plans = this.companies.map(c => this.getCompanyBrandData(c)[m.planKey]);
            const actuals = this.companies.map(c => this.getCompanyBrandData(c)[m.actualKey]);
            this.charts[m.key] = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.companies.map(c => c.length > 8 ? c.substring(0,8) + '…' : c),
                    datasets: [
                        { label: 'KH', data: plans, backgroundColor: 'rgba(203,213,225,0.5)', borderRadius: 4 },
                        { label: 'TH', data: actuals,
                          backgroundColor: this.companies.map(c => this.companyColors[c] + 'cc'), borderRadius: 4 }
                    ]
                },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { ticks: { font: { size: 9 } } },
                        x: { ticks: { font: { size: 8 } } }
                    }
                }
            });
        });
    }
};
