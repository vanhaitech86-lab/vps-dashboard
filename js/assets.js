/**
 * ============================================================
 * MODULE 15: XÁC ĐỊNH GIÁ TRỊ TÀI SẢN & ĐỊNH GIÁ TẬP ĐOÀN VPS
 * TẬP ĐOÀN CÔNG NGHỆ VPS - BAN TÀI CHÍNH CHIẾN LƯỢC
 * Chuẩn hóa 100% theo hồ sơ xác định giá trị tài sản của Chủ tịch / CEO
 * ============================================================
 */

(function() {
    'use strict';

    // Dữ liệu chuẩn xác 100% từ hồ sơ ảnh của Sếp (Tháng 01 -> Tháng 08 năm 2026)
    const ASSET_DATA = {
        months: ['Tháng 01', 'Tháng 02', 'Tháng 03', 'Tháng 04', 'Tháng 05', 'Tháng 06', 'Tháng 07', 'Tháng 08'],
        monthShorts: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8'],

        // I. Giá trị thuần Tài sản Các Công ty
        netCompanyAssets: [-19068434063, -23905899429, -23610310080, -23336534004, -23284674488, -21746811677, -21666227875, -19791366359],
        totalAssets: [390442277177, 370038670892, 360393644247, 360843804083, 359640102466, 367033607299, 360491290692, 380515737395],
        totalLiabilities: [409510711240, 393944570321, 384003954327, 384180338087, 382924776954, 388780418976, 382157518567, 400307103754],

        // III. Bổ sung giá trị còn được tăng tài sản do chênh lệch phải trả và phải thu trên sổ sách của sếp
        ownerAdjustment: [40029671929, 39677881245, 39380198449, 37808980977, 37646587995, 37822506743, 37474069758, 37353997808],
        payableToOwner: [55700266148, 55700266148, 55700266148, 55700266148, 55700266148, 55700266148, 55700266148, 55700266148],
        receivablePrivateHouse: [15670594219, 16022384903, 16320067699, 17891285171, 18053678153, 17877759405, 18226196390, 18346268340],

        // IV. Giá trị khi chi thanh toán tiền mua nhà mua đất được lấy từ Công ty Cổ phần tập đoàn đầu tư VPS
        totalBdsPayments: [87000100597, 87470939883, 87950404443, 88445711177, 88932865512, 89438472837, 89888641397, 90322197257],
        
        // 1. Đất Sài Gòn
        datSaiGon: {
            cost: 34601375000,
            otherCost: 8882595600,
            interestEst: [17963799933, 18277658212, 18593870428, 18910082644, 19226294860, 19549620058, 19865832274, 20182044490],
            total: [61447770533, 61761628812, 62077841028, 62394053244, 62710265460, 63033590658, 63349802874, 63666015090]
        },

        // 2. Biệt thự liền kề Cổ Loa
        lienKeCoLoa: {
            cost: 20690435059,
            interestOther: [1341067250, 1478952679, 1620917527, 1778724549, 1928379172, 2089588089, 2202471223, 2298741657],
            total: [22031502309, 22169387738, 22311352586, 22469159608, 22618814231, 22780023148, 22892906282, 22989176716]
        },

        // 3. Căn hộ chung cư 2N DA Vin Cổ Loa
        chungCuCoLoa: {
            cost: 2600087568,
            interestOther: [165740187, 184835765, 206123261, 227410757, 248698253, 269771463, 290844673, 311917883],
            total: [2765827755, 2784923333, 2806210829, 2827498325, 2848785821, 2869859031, 2890932241, 2912005451]
        },

        // 4. Ngân hàng TMCP An Bình
        anBinhBank: 755000000,

        // V. Giá trị Tài sản được đánh giá lại
        revaluedAssetsTotal: 278400000000,
        revaluedItems: [
            { id: 1, name: 'Nhà Ciputra chú Minh', value: 154800000000, share: 55.60, note: 'Đánh giá lại so với giá thị trường', type: 'Biệt thự Đẳng cấp', icon: 'home' },
            { id: 2, name: 'Nhà Xem Sơn thửa 1338', value: 44000000000, share: 15.80, note: 'Tài sản BĐS Xem Sơn (Lô 1338)', type: 'Bất động sản', icon: 'building' },
            { id: 3, name: 'Nhà Xem Sơn thửa 1347', value: 44000000000, share: 15.80, note: 'Tài sản BĐS Xem Sơn (Lô 1347)', type: 'Bất động sản', icon: 'building' },
            { id: 4, name: 'Nhà liền kề Vinhome Cổ Loa', value: 27000000000, share: 9.70, note: 'Đánh giá lại so với giá thị trường', type: 'Biệt thự Liền kề', icon: 'map-pin' },
            { id: 5, name: 'Nhà Ngô Sỹ Liên chú Minh', value: 6000000000, share: 2.16, note: 'BĐS nhà phố trung tâm', type: 'Nhà phố', icon: 'home' },
            { id: 6, name: 'Nhà chung cư Vinhome Cổ Loa (Dự tính)', value: 2600000000, share: 0.93, note: 'Căn hộ 2N Vin Cổ Loa', type: 'Căn hộ chung cư', icon: 'layers' }
        ],

        // VI. Giá trị Tài sản dự kiến theo đánh giá lại
        finalRevaluedNetAssets: [212361137269, 206701041933, 206219483926, 204426735796, 203829047995, 205037222229, 204319200486, 205640434192],

        // BCTC 5 Đơn vị thành viên (Từ Image 4 - Tháng 6/2026 và so sánh T5)
        companiesBctc: [
            { id: 1, name: 'Công ty CP tập đoàn VPS', code: 'VPS', share: '100%', assets: 185767566421, debts: 190968424000, equity: -5200857579, equityByShare: -5200857579, equityT5: -5200857579, diff: 0, note: 'Số liệu giống y tháng 5' },
            { id: 2, name: 'Công ty Tân Hồng Hà', code: 'THH', share: '100%', assets: 64467330739, debts: 122566276858, equity: -58098946119, equityByShare: -58098946119, equityT5: -58105919759, diff: 6973640, note: 'Tăng VCSH' },
            { id: 3, name: 'Công ty CP Việt', code: 'VIET', share: '92%', assets: 22914595339, debts: 12231577397, equity: 10683017942, equityByShare: 9828376507, equityT5: 10323497749, diff: 359520193, note: 'Tăng VCSH' },
            { id: 4, name: 'Công ty Xemson', code: 'XESCO', share: '87%', assets: 85933838469, debts: 60175228246, equity: 25758610223, equityByShare: 22409990894, equityT5: 24671597754, diff: 1087012469, note: 'Tăng mạnh (+1.08 tỷ)' },
            { id: 5, name: 'Công ty VPS M (Miền Trung)', code: 'VPSM', share: '100%', assets: 7950276331, debts: 2838912475, equity: 5111363856, equityByShare: 5111363856, equityT5: 5027007347, diff: 84356509, note: 'Tăng VCSH' }
        ]
    };

    // Helper formatting numbers
    function formatNumber(num) {
        if (num === null || num === undefined || isNaN(num)) return '—';
        if (num === 0) return '-';
        if (num < 0) {
            return `(${Math.abs(num).toLocaleString('vi-VN')})`;
        }
        return num.toLocaleString('vi-VN');
    }

    function formatBillion(num, decimals = 2) {
        if (num === null || num === undefined || isNaN(num)) return '—';
        const bil = num / 1000000000;
        if (bil < 0) {
            return `(${Math.abs(bil).toFixed(decimals)} Tỷ)`;
        }
        return `${bil.toFixed(decimals)} Tỷ`;
    }

    const AssetsValuationModule = {
        activeMonthIdx: 7, // Mặc định Tháng 08 (mới nhất)
        activeTab: 'matrix', // 'matrix', 'portfolio', 'bctc', 'analysis'
        charts: {},

        init() {
            // Check if view container exists
            const container = document.getElementById('view-assets');
            if (!container) return;
        },

        render() {
            const container = document.getElementById('view-assets');
            if (!container) return;

            container.innerHTML = this.buildFullHtml();
            if (window.lucide) window.lucide.createIcons();

            this.initCharts();
        },

        setMonth(idx) {
            this.activeMonthIdx = idx;
            this.render();
        },

        setTab(tab) {
            this.activeTab = tab;
            this.render();
        },

        buildFullHtml() {
            const mIdx = this.activeMonthIdx;
            const currentMonthName = ASSET_DATA.months[mIdx];
            
            // Calculate Current Month Figures
            const finalVal = ASSET_DATA.finalRevaluedNetAssets[mIdx];
            const prevFinalVal = mIdx > 0 ? ASSET_DATA.finalRevaluedNetAssets[mIdx - 1] : finalVal;
            const diffVal = finalVal - prevFinalVal;

            const netBookVal = ASSET_DATA.netCompanyAssets[mIdx];
            const ownerAdj = ASSET_DATA.ownerAdjustment[mIdx];
            const bdsPayment = ASSET_DATA.totalBdsPayments[mIdx];
            const revalTotal = ASSET_DATA.revaluedAssetsTotal;

            return `
            <div class="assets-container">
                <!-- 1. Header Banner -->
                <div class="assets-header-banner">
                    <div class="assets-title-group">
                        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
                            <span class="assets-security-badge"><i data-lucide="shield-alert" style="width: 14px; height: 14px;"></i> CHỈ DÀNH CHO CEO & ADMIN</span>
                            <span style="font-size: 0.75rem; color: #eab308; font-weight: 700;">HỒ SƠ TÀI CHÍNH TỐI MẬT</span>
                        </div>
                        <h2>
                            <i data-lucide="landmark" style="width: 30px; height: 30px; color: #eab308;"></i>
                            <span>15. BẢNG XÁC ĐỊNH GIÁ TRỊ TÀI SẢN TẬP ĐOÀN VPS</span>
                        </h2>
                        <p>Định giá tài sản toàn diện theo thời gian thực: Cân đối giữa Giá trị sổ sách BCTC và Giá trị Thị trường sau Đánh giá lại.</p>
                    </div>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <button class="assets-btn-export" onclick="window.AssetsValuationModule.exportExcel()">
                            <i data-lucide="download" style="width: 16px; height: 16px;"></i>
                            <span>Xuất Excel Đầy Đủ</span>
                        </button>
                    </div>
                </div>

                <!-- 2. Month Selector Navigation -->
                <div class="assets-month-nav">
                    <div class="assets-month-label">
                        <i data-lucide="calendar" style="width: 16px; height: 16px;"></i>
                        <span>Kỳ Báo Cáo:</span>
                    </div>
                    ${ASSET_DATA.months.map((m, idx) => `
                        <button class="month-pill ${idx === mIdx ? 'active' : ''}" onclick="window.AssetsValuationModule.setMonth(${idx})">
                            ${m} ${idx === 7 ? '(Mới nhất)' : ''}
                        </button>
                    `).join('')}
                </div>

                <!-- 3. Top 4 Golden Metric Cards -->
                <div class="assets-kpi-grid">
                    <!-- Card 1: Giá trị tài sản thực tế -->
                    <div class="assets-kpi-card card-highlight">
                        <div class="assets-kpi-header">
                            <span class="assets-kpi-label">GIÁ TRỊ TÀI SẢN THỰC TẾ (ĐÁNH GIÁ LẠI)</span>
                            <div class="assets-kpi-icon" style="background: rgba(234, 179, 8, 0.2); color: #facc15;">
                                <i data-lucide="gem" style="width: 20px; height: 20px;"></i>
                            </div>
                        </div>
                        <div class="assets-kpi-value" style="color: #facc15;">
                            ${formatNumber(finalVal)} <span style="font-size: 1rem; font-weight: 700; color: #fde047;">đ</span>
                        </div>
                        <div class="assets-kpi-sub">
                            <span>Quy đổi: <strong>${formatBillion(finalVal)}</strong></span>
                            ${diffVal !== 0 ? `
                                <span class="${diffVal > 0 ? 'badge-trend-up' : 'badge-trend-down'}" style="margin-left: auto;">
                                    ${diffVal > 0 ? '▲ +' : '▼ -'}${Math.abs(diffVal / 1000000000).toFixed(2)} tỷ vs tháng trước
                                </span>
                            ` : ''}
                        </div>
                    </div>

                    <!-- Card 2: Bất Động Sản Đánh Giá Lại -->
                    <div class="assets-kpi-card">
                        <div class="assets-kpi-header">
                            <span class="assets-kpi-label">BẤT ĐỘNG SẢN ĐÁNH GIÁ LẠI (THỊ TRƯỜNG)</span>
                            <div class="assets-kpi-icon" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">
                                <i data-lucide="home" style="width: 20px; height: 20px;"></i>
                            </div>
                        </div>
                        <div class="assets-kpi-value" style="color: #38bdf8;">
                            ${formatNumber(revalTotal)} <span style="font-size: 1rem; font-weight: 700;">đ</span>
                        </div>
                        <div class="assets-kpi-sub">
                            <span>6 Bất động sản trọng điểm: <strong>${formatBillion(revalTotal)}</strong></span>
                            <span style="margin-left: auto; color: #34d399; font-weight: 700;">Ciputra chiếm 55.6%</span>
                        </div>
                    </div>

                    <!-- Card 3: Chi Tiền Mua BĐS & Lãi Vay -->
                    <div class="assets-kpi-card">
                        <div class="assets-kpi-header">
                            <span class="assets-kpi-label">VỐN CHI MUA BĐS & LÃI VAY LŨY KẾ</span>
                            <div class="assets-kpi-icon" style="background: rgba(245, 158, 11, 0.15); color: #f59e0b;">
                                <i data-lucide="credit-card" style="width: 20px; height: 20px;"></i>
                            </div>
                        </div>
                        <div class="assets-kpi-value" style="color: #fbbf24;">
                            ${formatNumber(bdsPayment)} <span style="font-size: 1rem; font-weight: 700;">đ</span>
                        </div>
                        <div class="assets-kpi-sub">
                            <span>Đất SG: <strong>${formatBillion(ASSET_DATA.datSaiGon.total[mIdx])}</strong> | Cổ Loa: <strong>${formatBillion(ASSET_DATA.lienKeCoLoa.total[mIdx])}</strong></span>
                        </div>
                    </div>

                    <!-- Card 4: Giá trị thuần BCTC -->
                    <div class="assets-kpi-card">
                        <div class="assets-kpi-header">
                            <span class="assets-kpi-label">GIÁ TRỊ THUẦN SỔ SÁCH BCTC (TỔNG TS - NỢ)</span>
                            <div class="assets-kpi-icon" style="background: rgba(239, 68, 68, 0.15); color: #f87171;">
                                <i data-lucide="book-open" style="width: 20px; height: 20px;"></i>
                            </div>
                        </div>
                        <div class="assets-kpi-value num-neg">
                            ${formatNumber(netBookVal)} <span style="font-size: 1rem; font-weight: 700;">đ</span>
                        </div>
                        <div class="assets-kpi-sub">
                            <span>Tổng TS: ${formatBillion(ASSET_DATA.totalAssets[mIdx], 1)} — Nợ: ${formatBillion(ASSET_DATA.totalLiabilities[mIdx], 1)}</span>
                        </div>
                    </div>
                </div>

                <!-- 4. Valuation Bridge Formula Bar -->
                <div class="assets-bridge-bar">
                    <div class="bridge-step">
                        <span class="bridge-step-title">I. Giá Trị Thuần BCTC</span>
                        <span class="bridge-step-val num-neg">${formatBillion(netBookVal)}</span>
                    </div>
                    <div class="bridge-operator">+</div>
                    <div class="bridge-step">
                        <span class="bridge-step-title">III. Chênh Lệch Sổ Sếp</span>
                        <span class="bridge-step-val num-pos">+${formatBillion(ownerAdj)}</span>
                    </div>
                    <div class="bridge-operator">-</div>
                    <div class="bridge-step">
                        <span class="bridge-step-title">IV. Vốn Chi BĐS Từ VPS</span>
                        <span class="bridge-step-val" style="color: #fbbf24;">${formatBillion(bdsPayment)}</span>
                    </div>
                    <div class="bridge-operator">+</div>
                    <div class="bridge-step">
                        <span class="bridge-step-title">V. BĐS Đánh Giá Lại</span>
                        <span class="bridge-step-val" style="color: #38bdf8;">+${formatBillion(revalTotal)}</span>
                    </div>
                    <div class="bridge-operator">=</div>
                    <div class="bridge-step" style="background: rgba(234, 179, 8, 0.15); padding: 8px 14px; border-radius: 8px; border: 1px solid rgba(234, 179, 8, 0.3);">
                        <span class="bridge-step-title" style="color: #facc15;">VI. TỔNG TÀI SẢN THỰC TẾ</span>
                        <span class="bridge-step-val" style="color: #fde047; font-size: 1.25rem;">${formatBillion(finalVal)}</span>
                    </div>
                </div>

                <!-- 5. Interactive Charts Grid -->
                <div class="assets-chart-grid">
                    <!-- Chart 1: Xu hướng định giá 8 tháng -->
                    <div class="assets-card" style="margin-bottom: 0;">
                        <div class="assets-card-header">
                            <div class="assets-card-title">
                                <div style="background: rgba(234, 179, 8, 0.15); color: #eab308; padding: 6px; border-radius: 6px;">
                                    <i data-lucide="trending-up" style="width: 18px; height: 18px;"></i>
                                </div>
                                <div>
                                    <h3>DIỄN BIẾN GIÁ TRỊ TÀI SẢN THỰC TẾ 8 THÁNG (2026)</h3>
                                    <p>So sánh Giá trị thực tế sau đánh giá lại vs Giá trị thuần sổ sách BCTC</p>
                                </div>
                            </div>
                        </div>
                        <div class="assets-chart-body">
                            <canvas id="chart-asset-trend"></canvas>
                        </div>
                    </div>

                    <!-- Chart 2: Cơ cấu danh mục BĐS -->
                    <div class="assets-card" style="margin-bottom: 0;">
                        <div class="assets-card-header">
                            <div class="assets-card-title">
                                <div style="background: rgba(56, 189, 248, 0.15); color: #38bdf8; padding: 6px; border-radius: 6px;">
                                    <i data-lucide="pie-chart" style="width: 18px; height: 18px;"></i>
                                </div>
                                <div>
                                    <h3>CƠ CẤU DANH MỤC BĐS (278.4 TỶ)</h3>
                                    <p>Tỷ trọng 6 tài sản chiến lược</p>
                                </div>
                            </div>
                        </div>
                        <div class="assets-chart-body">
                            <canvas id="chart-realestate-pie"></canvas>
                        </div>
                    </div>
                </div>

                <!-- 6. Detailed Interactive Tabs System -->
                <div class="assets-card" style="margin-top: 24px;">
                    <div class="assets-tabs">
                        <button class="assets-tab-btn ${this.activeTab === 'matrix' ? 'active' : ''}" onclick="window.AssetsValuationModule.setTab('matrix')">
                            <i data-lucide="table" style="width: 16px; height: 16px;"></i>
                            <span>1. Ma Trận Giá Trị Tài Sản 8 Tháng (Bản Excel Sếp)</span>
                        </button>
                        <button class="assets-tab-btn ${this.activeTab === 'portfolio' ? 'active' : ''}" onclick="window.AssetsValuationModule.setTab('portfolio')">
                            <i data-lucide="building-2" style="width: 16px; height: 16px;"></i>
                            <span>2. Danh Mục 6 Bất Động Sản (278.4 Tỷ)</span>
                        </button>
                        <button class="assets-tab-btn ${this.activeTab === 'bctc' ? 'active' : ''}" onclick="window.AssetsValuationModule.setTab('bctc')">
                            <i data-lucide="file-spreadsheet" style="width: 16px; height: 16px;"></i>
                            <span>3. BCTC 5 Đơn Vị Thành Viên (Tháng 6 & T5)</span>
                        </button>
                        <button class="assets-tab-btn ${this.activeTab === 'analysis' ? 'active' : ''}" onclick="window.AssetsValuationModule.setTab('analysis')">
                            <i data-lucide="lightbulb" style="width: 16px; height: 16px;"></i>
                            <span>4. Phân Tích Tài Chính & Khuyến Nghị CEO</span>
                        </button>
                    </div>

                    <div style="padding: 0;">
                        ${this.renderActiveTabContent()}
                    </div>
                </div>
            </div>
            `;
        },

        renderActiveTabContent() {
            if (this.activeTab === 'matrix') {
                return this.renderMatrixTab();
            } else if (this.activeTab === 'portfolio') {
                return this.renderPortfolioTab();
            } else if (this.activeTab === 'bctc') {
                return this.renderBctcTab();
            } else if (this.activeTab === 'analysis') {
                return this.renderAnalysisTab();
            }
            return '';
        },

        // TAB 1: BẢNG MA TRẬN 8 THÁNG NGUYÊN BẢN
        renderMatrixTab() {
            const mIdx = this.activeMonthIdx;
            const d = ASSET_DATA;

            return `
            <div class="assets-table-wrap">
                <table class="assets-table">
                    <thead>
                        <tr>
                            <th style="width: 45px;">TT</th>
                            <th style="min-width: 320px;">NỘI DUNG CHỈ TIÊU</th>
                            ${d.months.map((m, idx) => `
                                <th class="${idx === mIdx ? 'active-month-col' : ''}" style="min-width: 130px;">
                                    ${m.toUpperCase()}
                                </th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        <!-- MỤC I -->
                        <tr class="row-group-header">
                            <td>I</td>
                            <td>Giá trị thuần Tài sản Các Công ty</td>
                            ${d.netCompanyAssets.map((v, idx) => `
                                <td class="num-neg ${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Tổng Tài sản</td>
                            ${d.totalAssets.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Tổng nợ phải trả</td>
                            ${d.totalLiabilities.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>

                        <!-- MỤC III -->
                        <tr class="row-group-header">
                            <td>III</td>
                            <td>Bổ sung giá trị còn được tăng tài sản do chênh lệch phải trả và phải thu trên sổ sách của sếp</td>
                            ${d.ownerAdjustment.map((v, idx) => `
                                <td class="num-pos ${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Phải trả sếp Minh</td>
                            ${d.payableToOwner.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Phải thu nhà riêng</td>
                            ${d.receivablePrivateHouse.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>

                        <!-- MỤC IV -->
                        <tr class="row-group-header">
                            <td>IV</td>
                            <td>Giá trị khi chi thanh toán tiền mua nhà mua đất được lấy từ Công ty Cổ phần tập đoàn đầu tư VPS</td>
                            ${d.totalBdsPayments.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}" style="color: #fbbf24;">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                        <!-- 1. Đất SG -->
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Chi phí mua đất Sài Gòn</td>
                            ${d.months.map((_, idx) => `<td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(d.datSaiGon.cost)}</td>`).join('')}
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Các khoản chi tiền khác của Đất Sài Gòn</td>
                            ${d.months.map((_, idx) => `<td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(d.datSaiGon.otherCost)}</td>`).join('')}
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Chi phí lãi vay tạm tính đất Sài Gòn</td>
                            ${d.datSaiGon.interestEst.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                        <tr class="row-total">
                            <td></td>
                            <td style="padding-left: 36px;">Tổng tiền mua đất SG</td>
                            ${d.datSaiGon.total.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>

                        <!-- 2. Liền kề Cổ Loa -->
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Chi phí mua biệt thự liền kề Cổ Loa</td>
                            ${d.months.map((_, idx) => `<td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(d.lienKeCoLoa.cost)}</td>`).join('')}
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Chi phí lãi vay + chi phí khác biệt thự liền kề Cổ Loa</td>
                            ${d.lienKeCoLoa.interestOther.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                        <tr class="row-total">
                            <td></td>
                            <td style="padding-left: 36px;">Tổng tiền mua liền kề cổ loa</td>
                            ${d.lienKeCoLoa.total.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>

                        <!-- 3. Chung cư Vin Cổ Loa -->
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Chi phí mua căn hộ chung cư 2N DA Vin Cổ Loa</td>
                            ${d.months.map((_, idx) => `<td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(d.chungCuCoLoa.cost)}</td>`).join('')}
                        </tr>
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Chi phí lãi vay + chi phí khác đầu tư chung cư 2N DA Vin cổ loa</td>
                            ${d.chungCuCoLoa.interestOther.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                        <tr class="row-total">
                            <td></td>
                            <td style="padding-left: 36px;">Tổng tiền mua chung cư Cổ Loa</td>
                            ${d.chungCuCoLoa.total.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>

                        <!-- 4. Ngân hàng An Bình -->
                        <tr>
                            <td></td>
                            <td style="padding-left: 24px;">Ngân hàng TMCP AN BÌNH</td>
                            ${d.months.map((_, idx) => `<td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(d.anBinhBank)}</td>`).join('')}
                        </tr>

                        <!-- MỤC V -->
                        <tr class="row-group-header">
                            <td>V</td>
                            <td>Giá trị Tài sản được đánh giá lại 31/01/2026</td>
                            ${d.months.map((_, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}" style="color: #38bdf8;">${formatNumber(d.revaluedAssetsTotal)}</td>
                            `).join('')}
                        </tr>
                        ${d.revaluedItems.map(item => `
                            <tr>
                                <td></td>
                                <td style="padding-left: 24px;">${item.id}. ${item.name}</td>
                                ${d.months.map((_, idx) => `
                                    <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(item.value)}</td>
                                `).join('')}
                            </tr>
                        `).join('')}

                        <!-- MỤC VI: FINAL -->
                        <tr class="row-final">
                            <td>VI</td>
                            <td>Giá trị Tài sản dự kiến theo đánh giá lại</td>
                            ${d.finalRevaluedNetAssets.map((v, idx) => `
                                <td class="${idx === mIdx ? 'active-month-col' : ''}">${formatNumber(v)}</td>
                            `).join('')}
                        </tr>
                    </tbody>
                </table>
            </div>
            `;
        },

        // TAB 2: DANH MỤC 6 BẤT ĐỘNG SẢN
        renderPortfolioTab() {
            const items = ASSET_DATA.revaluedItems;
            const total = ASSET_DATA.revaluedAssetsTotal;

            return `
            <div style="padding: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px; flex-wrap: wrap; gap: 12px;">
                    <div>
                        <h3 style="margin: 0; color: #f8fafc; font-size: 1.15rem; font-weight: 800;">DANH MỤC 6 TÀI SẢN BẤT ĐỘNG SẢN ĐÁNH GIÁ LẠI</h3>
                        <p style="margin: 4px 0 0 0; color: #94a3b8; font-size: 0.85rem;">Tổng giá trị thị trường thẩm định: <strong>${formatBillion(total)} (${formatNumber(total)} đ)</strong></p>
                    </div>
                </div>

                <div class="portfolio-grid" style="padding: 0;">
                    ${items.map(item => `
                        <div class="portfolio-card">
                            <div class="portfolio-header">
                                <span class="portfolio-type">${item.type}</span>
                                <span style="font-size: 0.8rem; font-weight: 800; color: #34d399;">${item.share}% Danh mục</span>
                            </div>
                            <h4 style="margin: 0; color: #f8fafc; font-size: 1.05rem; font-weight: 800;">${item.name}</h4>
                            <div class="portfolio-val">${formatNumber(item.value)} <span style="font-size: 0.8rem; color: #94a3b8;">đ</span></div>
                            <div class="portfolio-share-bar">
                                <div class="portfolio-share-fill" style="width: ${item.share}%;"></div>
                            </div>
                            <div style="font-size: 0.78rem; color: #94a3b8; display: flex; align-items: center; gap: 6px; margin-top: 4px;">
                                <i data-lucide="info" style="width: 14px; height: 14px; color: #eab308;"></i>
                                <span>${item.note}</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            `;
        },

        // TAB 3: BCTC 5 ĐƠN VỊ THÀNH VIÊN
        renderBctcTab() {
            const list = ASSET_DATA.companiesBctc;
            const totalAssets = list.reduce((s, c) => s + c.assets, 0);
            const totalDebts = list.reduce((s, c) => s + c.debts, 0);
            const totalEquity = list.reduce((s, c) => s + c.equity, 0);
            const totalEquityShare = list.reduce((s, c) => s + c.equityByShare, 0);
            const totalEquityT5 = list.reduce((s, c) => s + c.equityT5, 0);
            const totalDiff = list.reduce((s, c) => s + c.diff, 0);

            return `
            <div style="padding: 24px;">
                <div style="margin-bottom: 24px;">
                    <h3 style="color: #f8fafc; font-size: 1.1rem; font-weight: 800; margin: 0 0 6px 0;">
                        1. BẢNG TỔNG HỢP TÀI SẢN THEO BÁO CÁO TÀI CHÍNH - TẬP ĐOÀN VPS (THÁNG 6 NĂM 2026)
                    </h3>
                    <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Đối chiếu Vốn chủ sở hữu theo BCTC và theo tỷ lệ sở hữu vốn góp của Tập đoàn</p>
                </div>

                <div class="assets-table-wrap" style="margin-bottom: 28px;">
                    <table class="assets-table">
                        <thead>
                            <tr>
                                <th style="width: 45px; text-align: center;">STT</th>
                                <th style="text-align: left;">ĐƠN VỊ THÀNH VIÊN</th>
                                <th style="text-align: center;">% GÓP VỐN</th>
                                <th>TÀI SẢN CÓ</th>
                                <th>CÁC KHOẢN NỢ</th>
                                <th>VỐN CSH = TÀI SẢN CÒN LẠI</th>
                                <th>VỐN CSH THEO TỶ LỆ GÓP VỐN</th>
                                <th style="text-align: left;">GHI CHÚ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${list.map(c => `
                                <tr>
                                    <td>${c.id}</td>
                                    <td><strong>${c.name}</strong></td>
                                    <td style="text-align: center; color: #38bdf8; font-weight: 700;">${c.share}</td>
                                    <td>${formatNumber(c.assets)}</td>
                                    <td>${formatNumber(c.debts)}</td>
                                    <td class="${c.equity < 0 ? 'num-neg' : 'num-pos'}">${formatNumber(c.equity)}</td>
                                    <td class="${c.equityByShare < 0 ? 'num-neg' : 'num-pos'}">${formatNumber(c.equityByShare)}</td>
                                    <td style="text-align: left; color: #fbbf24; font-size: 0.78rem;">${c.note}</td>
                                </tr>
                            `).join('')}
                            <tr class="row-total">
                                <td></td>
                                <td><strong>TỔNG CỘNG</strong></td>
                                <td></td>
                                <td>${formatNumber(totalAssets)}</td>
                                <td>${formatNumber(totalDebts)}</td>
                                <td class="num-neg">${formatNumber(totalEquity)}</td>
                                <td class="num-neg">${formatNumber(totalEquityShare)}</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style="margin-bottom: 20px;">
                    <h3 style="color: #f8fafc; font-size: 1.1rem; font-weight: 800; margin: 0 0 6px 0;">
                        2. SO SÁNH TÀI SẢN THÁNG 06/2026 SO VỚI THÁNG 05/2026 - THEO BCTC
                    </h3>
                    <p style="color: #94a3b8; font-size: 0.85rem; margin: 0;">Theo dõi mức độ cải thiện Vốn chủ sở hữu theo tháng của từng đơn vị</p>
                </div>

                <div class="assets-table-wrap">
                    <table class="assets-table">
                        <thead>
                            <tr>
                                <th style="width: 45px; text-align: center;">STT</th>
                                <th style="text-align: left;">ĐƠN VỊ THÀNH VIÊN</th>
                                <th style="text-align: center;">% GÓP VỐN</th>
                                <th>VỐN CSH THÁNG 6/2026</th>
                                <th>VỐN CSH THÁNG 5/2026</th>
                                <th>CHÊNH LỆCH TĂNG / GIẢM</th>
                                <th style="text-align: left;">ĐÁNH GIÁ</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${list.map(c => `
                                <tr>
                                    <td>${c.id}</td>
                                    <td><strong>${c.name}</strong></td>
                                    <td style="text-align: center; color: #38bdf8;">${c.share}</td>
                                    <td class="${c.equity < 0 ? 'num-neg' : 'num-pos'}">${formatNumber(c.equity)}</td>
                                    <td class="${c.equityT5 < 0 ? 'num-neg' : 'num-pos'}">${formatNumber(c.equityT5)}</td>
                                    <td class="${c.diff > 0 ? 'num-pos' : ''}">
                                        ${c.diff > 0 ? '+' : ''}${formatNumber(c.diff)}
                                    </td>
                                    <td style="text-align: left; font-size: 0.78rem;">
                                        ${c.diff > 0 ? '<span style="color: #34d399;">▲ Cải thiện Vốn CSH</span>' : '<span style="color: #94a3b8;">— Không đổi</span>'}
                                    </td>
                                </tr>
                            `).join('')}
                            <tr class="row-total">
                                <td></td>
                                <td><strong>TỔNG CỘNG</strong></td>
                                <td></td>
                                <td class="num-neg">${formatNumber(totalEquity)}</td>
                                <td class="num-neg">${formatNumber(totalEquityT5)}</td>
                                <td class="num-pos">+${formatNumber(totalDiff)}</td>
                                <td style="text-align: left; color: #34d399; font-weight: 700;">Cải thiện +1.54 Tỷ</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            `;
        },

        // TAB 4: PHÂN TÍCH TÀI CHÍNH & KHUYẾN NGHỊ CHO CEO
        renderAnalysisTab() {
            const mIdx = this.activeMonthIdx;
            const finalVal = ASSET_DATA.finalRevaluedNetAssets[mIdx];
            const interestSG = ASSET_DATA.datSaiGon.interestEst[mIdx];
            const interestCoLoa = ASSET_DATA.lienKeCoLoa.interestOther[mIdx];
            const interestChungCu = ASSET_DATA.chungCuCoLoa.interestOther[mIdx];
            const totalInterest = interestSG + interestCoLoa + interestChungCu;

            return `
            <div style="padding: 24px;">
                <h3 style="color: #f8fafc; font-size: 1.15rem; font-weight: 800; margin: 0 0 16px 0;">
                    BÁO CÁO PHÂN TÍCH TÀI CHÍNH CHIẾN LƯỢC DÀNH CHO CHỦ TỊCH / CEO
                </h3>

                <div class="recommend-card" style="border-left-color: #eab308;">
                    <h4><i data-lucide="check-circle" style="width: 18px; height: 18px; color: #eab308;"></i> 1. ĐỊNH GIÁ THỰC TẾ VƯỢT TRỘI SO VỚI SỔ SÁCH KẾ TOÁN</h4>
                    <p>
                        Nếu chỉ nhìn vào Báo cáo tài chính kế toán, Vốn chủ sở hữu toàn Tập đoàn đang âm <strong>${formatBillion(ASSET_DATA.netCompanyAssets[mIdx])}</strong> do chi phí lãi vay và chi phí mua bất động sản được ghi nhận là nợ phải trả. Tuy nhiên, sau khi cộng gộp <strong>6 Bất động sản vàng được đánh giá lại đạt 278.4 TỶ ĐỒNG</strong> và bù trừ chênh lệch sổ sách của Sếp (+37.35 tỷ), <strong>Giá trị tài sản thực tế của Tập đoàn đạt ${formatBillion(finalVal)}</strong>. Đây là nền tảng tài sản vững chắc bảo chứng cho sức mạnh tài chính của VPS.
                    </p>
                </div>

                <div class="recommend-card" style="border-left-color: #f59e0b;">
                    <h4><i data-lucide="alert-triangle" style="width: 18px; height: 18px; color: #f59e0b;"></i> 2. ÁP LỰC CHI PHÍ LÃI VAY BẤT ĐỘNG SẢN TÍCH LŨY</h4>
                    <p>
                        Chi phí lãi vay tạm tính và chi phí phát sinh của các dự án BĐS đã lũy kế lên tới <strong>${formatBillion(totalInterest)} (${formatNumber(totalInterest)} đ)</strong> trong đó:
                        <br>• Đất Sài Gòn chịu lãi vay: <strong>${formatBillion(interestSG)}</strong> (đang tăng đều ~316 triệu/tháng).
                        <br>• Biệt thự liền kề Cổ Loa: <strong>${formatBillion(interestCoLoa)}</strong>.
                        <br>• Căn hộ chung cư Vin Cổ Loa: <strong>${formatNumber(interestChungCu)} đ</strong>.
                        <br><em>Khuyến nghị CEO:</em> Cần có kế hoạch khai thác dòng tiền từ các tài sản này hoặc cơ cấu lại các gói vay lãi suất ưu đãi để giảm bào mòn lợi nhuận hàng tháng.
                    </p>
                </div>

                <div class="recommend-card" style="border-left-color: #10b981;">
                    <h4><i data-lucide="trending-up" style="width: 18px; height: 18px; color: #10b981;"></i> 3. PHÂN HÓA NĂNG LỰC TÀI CHÍNH GIỮA CÁC ĐƠN VỊ THÀNH VIÊN</h4>
                    <p>
                        • <strong>Đơn vị đóng góp Vốn CSH dương:</strong> Công ty Xem Sơn (+25.76 tỷ), Công ty CP Việt (+10.68 tỷ), VPS Miền Trung (+5.11 tỷ) đều đang có sự tăng trưởng Vốn CSH rất tích cực qua các tháng.
                        <br>• <strong>Đơn vị chịu thâm hụt:</strong> Tân Hồng Hà đang âm Vốn CSH (-58.10 tỷ) và Công ty mẹ VPS (-5.20 tỷ) do gánh nhiều khoản công nợ nội bộ và vốn đầu tư dự án.
                        <br><em>Khuyến nghị CEO:</em> Tiến hành cấn trừ công nợ nội bộ giữa Tân Hồng Hà và các công ty thành viên có thặng dư để làm đẹp BCTC trước các đối tác và ngân hàng.
                    </p>
                </div>
            </div>
            `;
        },

        initCharts() {
            // Chart 1: Asset Trend
            const trendCtx = document.getElementById('chart-asset-trend');
            if (trendCtx && window.Chart) {
                if (this.charts.trend) this.charts.trend.destroy();
                this.charts.trend = new Chart(trendCtx, {
                    type: 'bar',
                    data: {
                        labels: ASSET_DATA.monthShorts,
                        datasets: [
                            {
                                type: 'line',
                                label: 'Giá Trị Thực Tế (Tỷ VNĐ)',
                                data: ASSET_DATA.finalRevaluedNetAssets.map(v => (v / 1000000000).toFixed(2)),
                                borderColor: '#eab308',
                                backgroundColor: 'rgba(234, 179, 8, 0.1)',
                                borderWidth: 3,
                                pointBackgroundColor: '#fde047',
                                pointRadius: 5,
                                yAxisID: 'y'
                            },
                            {
                                type: 'bar',
                                label: 'Vốn CSH BCTC (Tỷ VNĐ)',
                                data: ASSET_DATA.netCompanyAssets.map(v => (v / 1000000000).toFixed(2)),
                                backgroundColor: 'rgba(239, 68, 68, 0.4)',
                                borderColor: '#ef4444',
                                borderWidth: 1,
                                yAxisID: 'y'
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                labels: { color: '#cbd5e1', font: { weight: 'bold' } }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(ctx) {
                                        return `${ctx.dataset.label}: ${ctx.raw} Tỷ VNĐ`;
                                    }
                                }
                            }
                        },
                        scales: {
                            x: {
                                grid: { color: 'rgba(255,255,255,0.06)' },
                                ticks: { color: '#94a3b8', font: { weight: 'bold' } }
                            },
                            y: {
                                grid: { color: 'rgba(255,255,255,0.06)' },
                                ticks: {
                                    color: '#94a3b8',
                                    callback: v => `${v} Tỷ`
                                }
                            }
                        }
                    }
                });
            }

            // Chart 2: Real Estate Pie
            const pieCtx = document.getElementById('chart-realestate-pie');
            if (pieCtx && window.Chart) {
                if (this.charts.pie) this.charts.pie.destroy();
                this.charts.pie = new Chart(pieCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ASSET_DATA.revaluedItems.map(i => i.name),
                        datasets: [{
                            data: ASSET_DATA.revaluedItems.map(i => (i.value / 1000000000).toFixed(1)),
                            backgroundColor: [
                                '#3b82f6', // Ciputra
                                '#10b981', // Xem Sơn 1338
                                '#06b6d4', // Xem Sơn 1347
                                '#f59e0b', // Cổ Loa
                                '#8b5cf6', // Ngô Sỹ Liên
                                '#ec4899'  // Chung cư
                            ],
                            borderWidth: 2,
                            borderColor: '#111827'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'bottom',
                                labels: { color: '#cbd5e1', boxWidth: 12, font: { size: 11 } }
                            },
                            tooltip: {
                                callbacks: {
                                    label: function(ctx) {
                                        const item = ASSET_DATA.revaluedItems[ctx.dataIndex];
                                        return `${item.name}: ${ctx.raw} Tỷ (${item.share}%)`;
                                    }
                                }
                            }
                        }
                    }
                });
            }
        },

        // Xuất toàn bộ bảng ra file Excel chuẩn
        exportExcel() {
            if (typeof XLSX === 'undefined') {
                alert('Đang nạp thư viện Excel, vui lòng thử lại sau giây lát!');
                return;
            }

            const wb = XLSX.utils.book_new();

            // Sheet 1: XÁC ĐỊNH GIÁ TRỊ TÀI SẢN 8 THÁNG
            const d = ASSET_DATA;
            const matrixRows = [
                ['GIẢI PHÁP VĂN PHÒNG THÔNG MINH - TẬP ĐOÀN VPS'],
                ['BẢNG XÁC ĐỊNH GIÁ TRỊ TÀI SẢN NĂM 2026'],
                [],
                ['TT', 'NỘI DUNG', ...d.months],
                ['I', 'Giá trị thuần Tài sản Các Công ty', ...d.netCompanyAssets],
                ['', 'Tổng Tài sản', ...d.totalAssets],
                ['', 'Tổng nợ phải trả', ...d.totalLiabilities],
                ['III', 'Bổ sung giá trị còn được tăng tài sản do chênh lệch phải trả và phải thu trên sổ sách của sếp', ...d.ownerAdjustment],
                ['', 'Phải trả sếp Minh', ...d.payableToOwner],
                ['', 'Phải thu nhà riêng', ...d.receivablePrivateHouse],
                ['IV', 'Giá trị khi chi thanh toán tiền mua nhà mua đất được lấy từ Công ty Cổ phần tập đoàn đầu tư VPS', ...d.totalBdsPayments],
                ['', 'Chi phí mua đất Sài Gòn', ...d.months.map(() => d.datSaiGon.cost)],
                ['', 'Các khoản chi tiền khác của Đất Sài Gòn', ...d.months.map(() => d.datSaiGon.otherCost)],
                ['', 'Chi phí lãi vay tạm tính đất Sài Gòn', ...d.datSaiGon.interestEst],
                ['', 'Tổng tiền mua đất SG', ...d.datSaiGon.total],
                ['', 'Chi phí mua biệt thự liền kề Cổ Loa', ...d.months.map(() => d.lienKeCoLoa.cost)],
                ['', 'Chi phí lãi vay + chi phí khác biệt thự liền kề Cổ Loa', ...d.lienKeCoLoa.interestOther],
                ['', 'Tổng tiền mua liền kề cổ loa', ...d.lienKeCoLoa.total],
                ['', 'Chi phí mua căn hộ chung cư 2N DA Vin Cổ Loa', ...d.months.map(() => d.chungCuCoLoa.cost)],
                ['', 'Chi phí lãi vay + chi phí khác đầu tư chung cư 2N DA Vin cổ loa', ...d.chungCuCoLoa.interestOther],
                ['', 'Tổng tiền mua chung cư Cổ Loa', ...d.chungCuCoLoa.total],
                ['', 'Ngân hàng TMCP AN BÌNH', ...d.months.map(() => d.anBinhBank)],
                ['V', 'Giá trị Tài sản được đánh giá lại 31/01/2026', ...d.months.map(() => d.revaluedAssetsTotal)],
                ...d.revaluedItems.map(item => ['', `${item.id}. ${item.name}`, ...d.months.map(() => item.value)]),
                ['VI', 'Giá trị Tài sản dự kiến theo đánh giá lại', ...d.finalRevaluedNetAssets]
            ];

            const ws1 = XLSX.utils.aoa_to_sheet(matrixRows);
            XLSX.utils.book_append_sheet(wb, ws1, 'Xác Định Giá Trị Tài Sản');

            // Sheet 2: BCTC CÁC CÔNG TY THÁNG 6
            const bctcRows = [
                ['BẢNG TỔNG HỢP TÀI SẢN THEO BÁO CÁO TÀI CHÍNH - TẬP ĐOÀN VPS (THÁNG 6/2026)'],
                [],
                ['STT', 'ĐƠN VỊ THÀNH VIÊN', '% GÓP VỐN', 'TÀI SẢN CÓ', 'CÁC KHOẢN NỢ', 'VỐN CSH', 'VỐN CSH THEO TỶ LỆ GÓP VỐN', 'GHI CHÚ'],
                ...d.companiesBctc.map(c => [c.id, c.name, c.share, c.assets, c.debts, c.equity, c.equityByShare, c.note]),
                [],
                ['SO SÁNH TÀI SẢN THÁNG 06/2026 SO VỚI THÁNG 05/2026 - THEO BCTC'],
                ['STT', 'ĐƠN VỊ THÀNH VIÊN', '% GÓP VỐN', 'VỐN CSH THÁNG 6/2026', 'VỐN CSH THÁNG 5/2026', 'CHÊNH LỆCH'],
                ...d.companiesBctc.map(c => [c.id, c.name, c.share, c.equity, c.equityT5, c.diff])
            ];
            const ws2 = XLSX.utils.aoa_to_sheet(bctcRows);
            XLSX.utils.book_append_sheet(wb, ws2, 'BCTC 5 Đơn Vị');

            XLSX.writeFile(wb, 'Xac_Dinh_Gia_Tri_Tai_San_Tap_Doan_VPS.xlsx');
        }
    };

    window.AssetsValuationModule = AssetsValuationModule;
})();
