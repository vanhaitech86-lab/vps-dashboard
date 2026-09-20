/**
 * Inventory Module (Chỉ Tiêu Tồn Kho - Cập Nhật Toàn Diện Theo Yêu Cầu)
 * 1. Bổ sung Hàng chậm luân chuyển: Gồm Máy và Vật tư
 * 2. Các đơn vị cập nhật hàng tuần
 * 3. Kế hoạch - Thực hiện
 * 4. Tách Tồn kho: HĐKD bình thường vs Dự án
 * 5. Tỷ lệ Tồn kho / Doanh số (theo hệ số trung bình các tháng)
 */

window.InventoryModule = {
    currentWeek: '3',
    currentCompany: 'all',

    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            if (e.detail && e.detail.company) {
                this.currentCompany = e.detail.company;
                this.renderUI(this.currentCompany, this.currentWeek);
            }
        });

        // Setup week filter event
        const weekSelect = document.getElementById('inv-week-select');
        if (weekSelect) {
            weekSelect.addEventListener('change', (e) => {
                this.currentWeek = e.target.value;
                this.renderUI(this.currentCompany, this.currentWeek);
            });
        }

        // Export button
        const btnExport = document.getElementById('btn-inv-export');
        if (btnExport) {
            btnExport.addEventListener('click', () => this.exportSummaryCSV());
        }

        this.generateData();
        const initComp = window.FilterManager ? window.FilterManager.currentCompany : (window.AuthService ? window.AuthService.getAllowedCompany() : 'all');
        this.currentCompany = initComp;
        this.renderUI(initComp, this.currentWeek);
    },

    generateData() {
        // Master & Unit level Inventory Data with comprehensive metrics
        this.invData = [
            {
                company: "THH",
                companyName: "Tân Hồng Hà",
                stt: "I",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                // Kế hoạch & Phân bổ Tồn kho
                planVal: 32000000000, // 32.0 Tỷ
                normalVal: 22841979450, // 22.84 Tỷ (75.3% HĐKD bình thường)
                projectVal: 7500000000, // 7.50 Tỷ (24.7% Tồn kho cho Dự án)
                // Hàng chậm luân chuyển: Máy & Vật tư (> 90 ngày)
                slowMachinesQty: 48,
                slowMachinesVal: 2150000000, // 2.15 Tỷ
                slowPartsQty: 385,
                slowPartsVal: 1050000000, // 1.05 Tỷ
                // Hệ số trung bình các tháng (Doanh số TB & Tồn kho TB)
                avgMonthlyRev: 25000000000, // 25.0 Tỷ / tháng
                avgMonthlyInv: 31000000000, // 31.0 Tỷ / tháng
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [16236861538, 2691167947, 145461859, 1196919790, 351112106], qtys: [406, 67, 4, 30, 8] },
                    { stt: "2", name: "Option/phần mềm", vals: [724129217, 316631629, null, null, 84155594], qtys: [207, 90, 0, 0, 24] },
                    { stt: "3", name: "Consumable", vals: [1697362872, 3893921782, 595000, null, 477185636], qtys: [1415, 3245, 1, 0, 397] },
                    { stt: "4", name: "Part", vals: [422875719, 1842798361, 1300000, 250000, 232552257], qtys: [651, 2835, 2, 1, 356] },
                    { stt: "5", name: "Khác", vals: [6907408, 250000, null, null, 15330882], qtys: [14, 1, 0, 0, 30] }
                ]
            },
            {
                company: "VIỆT",
                companyName: "Việt",
                stt: "II",
                headers: ["HP", "Fujifilm", "VCOPY", "AIN", "Khác", "Cộng"],
                planVal: 5000000000, // 5.0 Tỷ
                normalVal: 3173950346, // 3.17 Tỷ (67.9% HĐKD bình thường)
                projectVal: 1500000000, // 1.50 Tỷ (32.1% Tồn kho cho Dự án)
                slowMachinesQty: 6,
                slowMachinesVal: 280000000, // 0.28 Tỷ
                slowPartsQty: 92,
                slowPartsVal: 180000000, // 0.18 Tỷ
                avgMonthlyRev: 8830000000, // 8.83 Tỷ / tháng
                avgMonthlyInv: 4800000000, // 4.80 Tỷ / tháng
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [789169565, null, null, null, 865846304], qtys: [23, 0, 0, 0, 25] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, 3770311, null, null, null], qtys: [0, 2, 0, 0, 0] },
                    { stt: "3", name: "Consumable", vals: [671194009, 407253157, null, null, 1163183311], qtys: [560, 339, 0, 0, 969] },
                    { stt: "4", name: "Part", vals: [4151324, 154791890, null, null, 294985264], qtys: [7, 245, 0, 0, 468] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 317282276], qtys: [0, 0, 0, 0, 125] }
                ]
            },
            {
                company: "XESCO",
                companyName: "Xem Sơn",
                stt: "III",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 30000000000, // 30.0 Tỷ
                normalVal: 22240901509, // 22.24 Tỷ (74.8% HĐKD bình thường)
                projectVal: 7500000000, // 7.50 Tỷ (25.2% Tồn kho cho Dự án)
                slowMachinesQty: 32,
                slowMachinesVal: 1950000000, // 1.95 Tỷ
                slowPartsQty: 410,
                slowPartsVal: 1120000000, // 1.12 Tỷ
                avgMonthlyRev: 14000000000, // 14.0 Tỷ / tháng
                avgMonthlyInv: 29500000000, // 29.5 Tỷ / tháng
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [8045068951, 2429722467, 198937517, 1061511065, 162201573], qtys: [201, 61, 5, 27, 4] },
                    { stt: "2", name: "Option/phần mềm", vals: [5929018372, 146022831, null, null, 44239635], qtys: [1694, 41, 0, 0, 13] },
                    { stt: "3", name: "Consumable", vals: [1887432428, 6988196768, 131323207, null, 481597314], qtys: [1424, 6020, 99, 0, 364] },
                    { stt: "4", name: "Part", vals: [339925051, 1653586022, null, 10264441, 126635862], qtys: [523, 2544, 0, 16, 194] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 5238960], qtys: [0, 0, 0, 0, 12] }
                ]
            },
            {
                company: "VPSM",
                companyName: "VPS M",
                stt: "IV",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 5000000000, // 5.0 Tỷ
                normalVal: 3444458999, // 3.44 Tỷ (74.1% HĐKD bình thường)
                projectVal: 1200000000, // 1.20 Tỷ (25.9% Tồn kho cho Dự án)
                slowMachinesQty: 5,
                slowMachinesVal: 250000000, // 0.25 Tỷ
                slowPartsQty: 85,
                slowPartsVal: 190000000, // 0.19 Tỷ
                avgMonthlyRev: 3750000000, // 3.75 Tỷ / tháng
                avgMonthlyInv: 4700000000, // 4.70 Tỷ / tháng
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [691079773, 712194005, 72694670, 129401638, null], qtys: [18, 19, 2, 3, 0] },
                    { stt: "2", name: "Option/phần mềm", vals: [7499646, null, null, null, null], qtys: [3, 0, 0, 0, 0] },
                    { stt: "3", name: "Consumable vật tư", vals: [1081355202, 1479770277, null, null, null], qtys: [901, 1233, 0, 0, 0] },
                    { stt: "4", name: "Part/ Linh kiện", vals: [null, 129401638, null, null, null], qtys: [0, 199, 0, 0, 0] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 338569147], qtys: [0, 0, 0, 0, 142] }
                ]
            },
            {
                company: "VPS",
                companyName: "ITSS & VP VPS",
                stt: "V",
                headers: ["HP", "Fujifilm", "Olivetti + GL", "Bonsai", "Khác", "Cộng"],
                planVal: 4000000000, // 4.0 Tỷ
                normalVal: 2248888062, // 2.25 Tỷ (67.2% HĐKD bình thường)
                projectVal: 1100000000, // 1.10 Tỷ (32.8% Tồn kho cho Dự án)
                slowMachinesQty: 7,
                slowMachinesVal: 220000000, // 0.22 Tỷ
                slowPartsQty: 64,
                slowPartsVal: 140000000, // 0.14 Tỷ
                avgMonthlyRev: 2100000000, // 2.10 Tỷ / tháng
                avgMonthlyInv: 3400000000, // 3.40 Tỷ / tháng
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [1761370959, 242362282, 468416955, 456721, 1300471], qtys: [54, 7, 1, 0, 0] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [0, 0, 0, 0, 0] },
                    { stt: "3", name: "Consumable vật tư", vals: [null, 213306355, null, null, null], qtys: [0, 178, 0, 0, 0] },
                    { stt: "4", name: "Part/ Linh kiện", vals: [3008139, 610122393, null, null, 704976], qtys: [5, 938, 0, 0, 1] },
                    { stt: "5", name: "Khác", vals: [null, 37499514, null, null, 8574286], qtys: [0, 47, 0, 0, 11] }
                ]
            }
        ];
    },

    getTheadHtml() {
        return `
            <tr style="background: #84cc16; color: #0f172a; font-size: 0.9rem; text-align: center;">
                <th rowspan="2" style="width: 40px; vertical-align: middle; background: #84cc16; border-right: 1px solid #65a30d;">STT</th>
                <th rowspan="2" style="min-width: 140px; vertical-align: middle; background: #84cc16; border-right: 1px solid #65a30d;">ĐƠN VỊ / PHÂN LOẠI</th>
                <th colspan="2" style="background: #a3e635; border-right: 1px solid #65a30d; font-weight: 800;">HP</th>
                <th colspan="2" style="background: #84cc16; border-right: 1px solid #65a30d; font-weight: 800;">FUJIFILM</th>
                <th colspan="2" style="background: #a3e635; border-right: 1px solid #65a30d; font-weight: 800;">OLIVETTI / VCOPY</th>
                <th colspan="2" style="background: #84cc16; border-right: 1px solid #65a30d; font-weight: 800;">BONSAI / AIN</th>
                <th colspan="2" style="background: #a3e635; border-right: 1px solid #65a30d; font-weight: 800;">KHÁC</th>
                <th colspan="2" style="background: #fde047; color: #713f12; font-weight: 800; border-left: 2px solid #ca8a04;">TỔNG CỘNG</th>
            </tr>
            <tr style="background: #bef264; font-size: 0.8rem; text-align: right;">
                <!-- HP -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 105px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Fujifilm -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 105px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Olivetti / VCOPY -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 95px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Bonsai / AIN -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 95px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Khác -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 95px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Tổng cộng -->
                <th style="background: #fef08a; color: #0369a1; font-weight: 800; min-width: 85px; text-align: right; border-left: 2px solid #ca8a04; border-right: 1px solid #fde047;">TỔNG SL</th>
                <th style="background: #fef9c3; color: #b91c1c; font-weight: 800; min-width: 125px; text-align: right;">CỘNG (VNĐ)</th>
            </tr>
        `;
    },

    renderUI(companyFilter, week = '3') {
        if(!this.invData) this.generateData();

        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
        if (!canViewAll) {
            companyFilter = window.AuthService ? window.AuthService.getAllowedCompany() : companyFilter;
        }

        let compKey = 'all';
        if (companyFilter === 'Tân Hồng Hà' || (companyFilter && companyFilter.includes('T') && companyFilter.includes('H'))) compKey = 'THH';
        else if (companyFilter === 'Xem Sơn' || (companyFilter && companyFilter.includes('Xem'))) compKey = 'XESCO';
        else if (companyFilter === 'Việt' || (companyFilter && companyFilter.includes('Vi'))) compKey = 'VIỆT';
        else if (companyFilter === 'VPS M' || (companyFilter && companyFilter.includes('VPS M'))) compKey = 'VPSM';
        else if (companyFilter === 'ITSS' || companyFilter === 'Văn phòng VPS' || (companyFilter && (companyFilter.includes('ITSS') || companyFilter.includes('Văn phòng')))) compKey = 'VPS';
        else if (!canViewAll) compKey = 'THH';

        let isAll = canViewAll && (compKey === 'all');
        let activeBlocks = this.invData.filter(d => isAll || d.company === compKey);

        // 1. Calculate Aggregated Totals
        let totals = {
            actualVal: 0,
            actualQty: 0,
            planVal: 0,
            normalVal: 0,
            projectVal: 0,
            slowMachinesQty: 0,
            slowMachinesVal: 0,
            slowPartsQty: 0,
            slowPartsVal: 0,
            totalSlowVal: 0,
            avgMonthlyRev: 0,
            avgMonthlyInv: 0,
            totalBrandsVal: [0, 0, 0, 0, 0],
            totalBrandsQty: [0, 0, 0, 0, 0]
        };

        activeBlocks.forEach(b => {
            let bTotalVal = 0;
            let bTotalQty = 0;
            b.rows.forEach(r => {
                for(let i=0; i<5; i++) {
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : 0;
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : 0;
                    bTotalVal += v;
                    bTotalQty += q;
                    totals.totalBrandsVal[i] += v;
                    totals.totalBrandsQty[i] += q;
                }
            });

            totals.actualVal += bTotalVal;
            totals.actualQty += bTotalQty;
            totals.planVal += b.planVal;
            totals.normalVal += b.normalVal;
            totals.projectVal += b.projectVal;
            totals.slowMachinesQty += b.slowMachinesQty;
            totals.slowMachinesVal += b.slowMachinesVal;
            totals.slowPartsQty += b.slowPartsQty;
            totals.slowPartsVal += b.slowPartsVal;
            totals.avgMonthlyRev += b.avgMonthlyRev;
            totals.avgMonthlyInv += b.avgMonthlyInv;
        });

        totals.totalSlowVal = totals.slowMachinesVal + totals.slowPartsVal;

        // 2. Render Advanced KPI Cards
        this.renderKPIs(totals);

        // 3. Render 3 Specialized Charts
        this.renderCharts(totals, activeBlocks, isAll);

        // 4. Render Summary Report Table (Kế hoạch - Thực hiện - Dự án - Chậm luân chuyển - Tỷ lệ Tồn/DS)
        this.renderSummaryTable(activeBlocks, isAll, totals, week);

        // 5. Render Brand Breakdown Table (Bảng gốc)
        this.renderBrandTable(activeBlocks, isAll, totals);

        if (window.lucide) window.lucide.createIcons();
    },

    renderKPIs(totals) {
        // KPI 1: Kế Hoạch vs Thực Hiện Tồn Kho
        const elActual = document.getElementById('inv-kpi-actual');
        const elActualSub = document.getElementById('inv-kpi-actual-sub');
        const planBillion = (totals.planVal / 1e9).toFixed(1);
        const actualBillion = (totals.actualVal / 1e9).toFixed(2);
        const planPct = totals.planVal > 0 ? ((totals.actualVal / totals.planVal) * 100).toFixed(1) : 0;
        const diffBillion = ((totals.actualVal - totals.planVal) / 1e9).toFixed(2);

        if (elActual) elActual.textContent = actualBillion + ' Tỷ ₫';
        if (elActualSub) {
            const statusColor = planPct <= 100 ? '#16a34a' : '#dc2626';
            const statusText = planPct <= 100 ? 'Trong định mức' : 'Vượt định mức';
            elActualSub.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
                    <span>Định mức KH: <strong>${planBillion} Tỷ</strong></span>
                    <strong style="color: ${statusColor};">${planPct}% (${statusText})</strong>
                </div>
                <div class="inv-split-bar">
                    <div class="inv-split-segment" style="width: ${Math.min(100, planPct)}%; background: ${statusColor};"></div>
                </div>
            `;
        }

        // KPI 2: Tách Tồn Kho: HĐKD Bình Thường vs Dự Án
        const elNormalVal = document.getElementById('inv-kpi-purpose-val');
        const elNormalSub = document.getElementById('inv-kpi-purpose-sub');
        const normalBillion = (totals.normalVal / 1e9).toFixed(2);
        const projectBillion = (totals.projectVal / 1e9).toFixed(2);
        const normalPct = totals.actualVal > 0 ? ((totals.normalVal / totals.actualVal) * 100).toFixed(1) : 0;
        const projectPct = totals.actualVal > 0 ? ((totals.projectVal / totals.actualVal) * 100).toFixed(1) : 0;

        if (elNormalVal) elNormalVal.textContent = normalBillion + ' Tỷ ₫';
        if (elNormalSub) {
            elNormalSub.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 4px;">
                    <span>HĐKD thường: <strong>${normalPct}%</strong></span>
                    <span>Dự án: <strong style="color: #2563eb;">${projectBillion} Tỷ (${projectPct}%)</strong></span>
                </div>
                <div class="inv-split-bar">
                    <div class="inv-split-segment" style="width: ${normalPct}%; background: #10b981;" title="HĐKD thường"></div>
                    <div class="inv-split-segment" style="width: ${projectPct}%; background: #2563eb;" title="Dự án"></div>
                </div>
            `;
        }

        // KPI 3: Hàng Chậm Luân Chuyển: Gồm Máy & Vật Tư
        const elSlowVal = document.getElementById('inv-kpi-slow-val');
        const elSlowSub = document.getElementById('inv-kpi-slow-sub');
        const slowBillion = (totals.totalSlowVal / 1e9).toFixed(2);
        const slowPct = totals.actualVal > 0 ? ((totals.totalSlowVal / totals.actualVal) * 100).toFixed(1) : 0;
        const slowMachBillion = (totals.slowMachinesVal / 1e9).toFixed(2);
        const slowPartBillion = (totals.slowPartsVal / 1e9).toFixed(2);

        if (elSlowVal) elSlowVal.textContent = slowBillion + ' Tỷ ₫';
        if (elSlowSub) {
            elSlowSub.innerHTML = `
                <div style="margin-bottom: 2px;">
                    Tỷ trọng chậm: <strong style="color: #ea580c;">${slowPct}%</strong> tổng kho
                </div>
                <div style="font-size: 0.75rem; color: #475569;">
                    • <strong>Máy:</strong> ${slowMachBillion} Tỷ (${totals.slowMachinesQty.toLocaleString('vi-VN')} chiếc)<br>
                    • <strong>Vật tư:</strong> ${slowPartBillion} Tỷ (${totals.slowPartsQty.toLocaleString('vi-VN')} món)
                </div>
            `;
        }

        // KPI 4: Tỷ Lệ Tồn Kho / Doanh Số Trung Bình Các Tháng
        const elRatioVal = document.getElementById('inv-kpi-ratio-val');
        const elRatioSub = document.getElementById('inv-kpi-ratio-sub');
        const ratioPct = totals.avgMonthlyRev > 0 ? ((totals.avgMonthlyInv / totals.avgMonthlyRev) * 100).toFixed(1) : 0;
        const monthsEq = totals.avgMonthlyRev > 0 ? (totals.avgMonthlyInv / totals.avgMonthlyRev).toFixed(2) : 0;
        const avgInvBillion = (totals.avgMonthlyInv / 1e9).toFixed(1);
        const avgRevBillion = (totals.avgMonthlyRev / 1e9).toFixed(1);

        if (elRatioVal) elRatioVal.textContent = ratioPct + '%';
        if (elRatioSub) {
            const isSafe = Number(monthsEq) <= 1.5;
            elRatioSub.innerHTML = `
                <div style="margin-bottom: 2px;">
                    Tương đương: <strong style="color: ${isSafe ? '#16a34a' : '#ea580c'}; font-size: 0.85rem;">${monthsEq} tháng</strong> doanh số
                </div>
                <div style="font-size: 0.74rem; color: #64748b;">
                    Tồn kho TB: ${avgInvBillion} Tỷ / DS TB: ${avgRevBillion} Tỷ<br>
                    Mục tiêu định mức an toàn: ≤ 1.50 tháng
                </div>
            `;
        }

        // KPI 5: Tổng Giá Trị & SL (bổ trợ)
        const totalValEl = document.getElementById('inventory-total-val');
        if (totalValEl) {
            totalValEl.innerText = actualBillion + ' Tỷ VND';
        }
        const totalQtyEl = document.getElementById('inventory-total-qty');
        if (totalQtyEl) {
            totalQtyEl.innerText = totals.actualQty.toLocaleString('vi-VN') + ' SP/TB';
        }
    },

    renderCharts(totals, activeBlocks, isAll) {
        if (!window.ChartManager) return;

        // Chart 1: Kế Hoạch vs Thực Hiện Tồn Kho theo Đơn Vị (Bar)
        const labels = activeBlocks.map(b => b.companyName);
        const planVals = activeBlocks.map(b => Number((b.planVal / 1e9).toFixed(2)));
        const actualVals = activeBlocks.map(b => {
            let sum = 0;
            b.rows.forEach(r => {
                if (r.vals) r.vals.forEach(v => { if (v) sum += v; });
            });
            return Number((sum / 1e9).toFixed(2));
        });

        window.ChartManager.createChart('invPlanActualChart', 'bar', {
            labels: labels,
            datasets: [
                {
                    label: 'Định Mức Kế Hoạch (Tỷ ₫)',
                    data: planVals,
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                },
                {
                    label: 'Tồn Kho Thực Tế (Tỷ ₫)',
                    data: actualVals,
                    backgroundColor: '#10b981',
                    borderRadius: 4
                }
            ]
        }, {
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} Tỷ ₫`
                    }
                }
            },
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Tỷ VNĐ' } }
            }
        });

        // Chart 2: Phân Bổ Tồn Kho: HĐKD Bình Thường vs Dự Án (Stacked Bar)
        const normalVals = activeBlocks.map(b => Number((b.normalVal / 1e9).toFixed(2)));
        const projectVals = activeBlocks.map(b => Number((b.projectVal / 1e9).toFixed(2)));

        window.ChartManager.createChart('invPurposeChart', 'bar', {
            labels: labels,
            datasets: [
                {
                    label: 'Tồn Kho HĐKD Bình Thường (Tỷ ₫)',
                    data: normalVals,
                    backgroundColor: '#10b981',
                    borderRadius: 4,
                    stack: 'Stack 0'
                },
                {
                    label: 'Tồn Kho Cho Dự Án (Tỷ ₫)',
                    data: projectVals,
                    backgroundColor: '#6366f1',
                    borderRadius: 4,
                    stack: 'Stack 0'
                }
            ]
        }, {
            plugins: {
                legend: { position: 'top' },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} Tỷ ₫`
                    }
                }
            },
            scales: {
                x: { stacked: true },
                y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Tỷ VNĐ' } }
            }
        });

        // Chart 3: Phân Tích Hàng Chậm Luân Chuyển: Máy vs Vật Tư (Doughnut)
        const fastMoving = Math.max(0, totals.actualVal - totals.totalSlowVal);
        window.ChartManager.createChart('invSlowMovingChart', 'doughnut', {
            labels: ['Máy Chậm Luân Chuyển', 'Vật Tư Chậm Luân Chuyển', 'Hàng Luân Chuyển Tốt'],
            datasets: [{
                data: [
                    Number((totals.slowMachinesVal / 1e9).toFixed(2)),
                    Number((totals.slowPartsVal / 1e9).toFixed(2)),
                    Number((fastMoving / 1e9).toFixed(2))
                ],
                backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        }, {
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `${ctx.label}: ${ctx.raw} Tỷ ₫`
                    }
                }
            },
            cutout: '55%'
        });

        // Chart 4: Cơ Cấu Tồn Kho Theo Hãng (Giữ nguyên biểu đồ gốc)
        window.ChartManager.createChart('inventoryChart', 'doughnut', {
            labels: ['HP', 'Fujifilm', 'Olivetti / VCOPY', 'Bonsai / AIN', 'Khác'],
            datasets: [{
                data: totals.totalBrandsVal,
                backgroundColor: ['#2563eb', '#16a34a', '#ca8a04', '#0891b2', '#64748b'],
                borderWidth: 1
            }]
        }, {
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.label || '';
                            if (label) { label += ': '; }
                            if (context.raw !== null) {
                                label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' VND';
                            }
                            return label;
                        }
                    }
                }
            }
        });
    },

    renderSummaryTable(activeBlocks, isAll, totals, week) {
        const tbody = document.getElementById('inv-summary-table-tbody');
        if (!tbody) return;

        let html = '';

        // Master Row
        if (isAll) {
            const masterActual = totals.actualVal;
            const masterPlan = totals.planVal;
            const masterPct = masterPlan > 0 ? ((masterActual / masterPlan) * 100).toFixed(1) : 0;
            const masterDiff = masterActual - masterPlan;
            const masterNormal = totals.normalVal;
            const masterProject = totals.projectVal;
            const masterSlowMach = totals.slowMachinesVal;
            const masterSlowPart = totals.slowPartsVal;
            const masterAvgRev = totals.avgMonthlyRev;
            const masterAvgInv = totals.avgMonthlyInv;
            const masterRatio = masterAvgRev > 0 ? ((masterAvgInv / masterAvgRev) * 100).toFixed(1) : 0;
            const masterMonths = masterAvgRev > 0 ? (masterAvgInv / masterAvgRev).toFixed(2) : 0;

            html += `
                <tr style="background: #fde047; font-weight: 800; font-size: 0.88rem;">
                    <td style="text-align: center;">A</td>
                    <td>TỔNG TẬP ĐOÀN VPS</td>
                    <td style="text-align: right;">${(masterPlan / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #b91c1c;">${(masterActual / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: ${masterPct <= 100 ? '#15803d' : '#b91c1c'};">${masterPct}%</td>
                    <td style="text-align: right; color: #15803d;">${(masterNormal / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #1d4ed8;">${(masterProject / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #c2410c;">${(masterSlowMach / 1e9).toFixed(2)} (${totals.slowMachinesQty})</td>
                    <td style="text-align: right; color: #c2410c;">${(masterSlowPart / 1e9).toFixed(2)} (${totals.slowPartsQty})</td>
                    <td style="text-align: right;">${(masterAvgRev / 1e9).toFixed(2)}</td>
                    <td style="text-align: right;">${(masterAvgInv / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #0284c7;">${masterRatio}% (${masterMonths} th)</td>
                    <td style="text-align: center;"><span class="badge" style="background:#dcfce7; color:#15803d; font-size:0.75rem;">Đủ 5/5 đơn vị</span></td>
                </tr>
            `;
        }

        // Unit Rows
        activeBlocks.forEach((b, idx) => {
            let unitActual = 0;
            b.rows.forEach(r => {
                if (r.vals) r.vals.forEach(v => { if (v) unitActual += v; });
            });

            const plan = b.planVal;
            const pct = plan > 0 ? ((unitActual / plan) * 100).toFixed(1) : 0;
            const normal = b.normalVal;
            const project = b.projectVal;
            const slowMach = b.slowMachinesVal;
            const slowPart = b.slowPartsVal;
            const avgRev = b.avgMonthlyRev;
            const avgInv = b.avgMonthlyInv;
            const ratio = avgRev > 0 ? ((avgInv / avgRev) * 100).toFixed(1) : 0;
            const months = avgRev > 0 ? (avgInv / avgRev).toFixed(2) : 0;
            const statusText = b.weeklyStatus[week] || 'Đã cập nhật';

            html += `
                <tr>
                    <td style="text-align: center; font-weight: 600;">${b.stt}</td>
                    <td style="font-weight: 700; color: #0f172a;">${b.companyName}</td>
                    <td style="text-align: right; color: #475569;">${(plan / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; font-weight: 700; color: #0f172a;">${(unitActual / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; font-weight: 700; color: ${pct <= 100 ? '#16a34a' : '#dc2626'};">${pct}%</td>
                    <td style="text-align: right; color: #16a34a; font-weight: 600;">${(normal / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 600;">${(project / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #ea580c;">${(slowMach / 1e9).toFixed(2)} (${b.slowMachinesQty})</td>
                    <td style="text-align: right; color: #d97706;">${(slowPart / 1e9).toFixed(2)} (${b.slowPartsQty})</td>
                    <td style="text-align: right; color: #334155;">${(avgRev / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; color: #334155;">${(avgInv / 1e9).toFixed(2)}</td>
                    <td style="text-align: right; font-weight: 700; color: #0284c7;">${ratio}% <span style="font-size:0.75rem; font-weight:normal; color:#64748b;">(${months} th)</span></td>
                    <td style="text-align: center;">
                        <span class="badge" style="background:#e0f2fe; color:#0369a1; font-size:0.75rem; padding: 2px 8px; border-radius: 4px;">
                            ${statusText} (T${week})
                        </span>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    },

    renderBrandTable(activeBlocks, isAll, totals) {
        const thead = document.querySelector('#inventoryTable thead');
        if (thead) {
            thead.innerHTML = this.getTheadHtml();
        }

        const tbody = document.querySelector('#inventoryTable tbody');
        if (!tbody) return;

        let html = '';
        let totalBrandsVal = totals.totalBrandsVal;
        let totalBrandsQty = totals.totalBrandsQty;
        let masterTotalVal = totals.actualVal;
        let masterTotalQty = totals.actualQty;

        activeBlocks.forEach(block => {
            let blockSumsVal = [0, 0, 0, 0, 0];
            let blockSumsQty = [0, 0, 0, 0, 0];
            let blockTotalVal = 0;
            let blockTotalQty = 0;

            let rowsHtml = '';
            block.rows.forEach(r => {
                let rowSumVal = 0;
                let rowSumQty = 0;
                let brandCells = '';

                for(let i=0; i<5; i++) {
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : 0;
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : 0;
                    rowSumVal += v;
                    rowSumQty += q;
                    blockSumsVal[i] += v;
                    blockSumsQty[i] += q;

                    brandCells += `
                        <td style="text-align: right; color: #0369a1; font-weight: 600; background: #f0fdf4; border-left: 1px solid #e2e8f0;">${q ? q.toLocaleString('vi-VN') : '-'}</td>
                        <td style="text-align: right; background: #fff;">${v ? v.toLocaleString('vi-VN') : ''}</td>
                    `;
                }

                blockTotalVal += rowSumVal;
                blockTotalQty += rowSumQty;

                rowsHtml += `<tr>
                    <td style="text-align: center; background: #fff;">${r.stt}</td>
                    <td style="background: #fff; font-weight: 600;">${r.name}</td>
                    ${brandCells}
                    <td style="text-align: right; font-weight: 800; color: #0369a1; background: #fef08a; border-left: 2px solid #ca8a04;">${rowSumQty ? rowSumQty.toLocaleString('vi-VN') : '0'}</td>
                    <td style="text-align: right; font-weight: 800; color: #b91c1c; background: #fef9c3;">${rowSumVal ? rowSumVal.toLocaleString('vi-VN') : ''}</td>
                </tr>`;
            });

            // Company Header Row
            html += `
                <tr style="background: #a3e635; font-weight: bold; font-size: 0.9rem;">
                    <td style="text-align: center; background: #a3e635;">${block.stt}</td>
                    <td style="background: #a3e635; font-weight: 800;">${block.company}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[0]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[1]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[2]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[3]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[4]}</td>
                    <td style="text-align: right; background: #fde047; color: #0369a1; font-weight: 800; border-left: 2px solid #ca8a04;">TỔNG SL</td>
                    <td style="text-align: right; background: #fef08a; color: #b91c1c; font-weight: 800;">${block.headers[5] || 'CỘNG'}</td>
                </tr>
            `;

            html += rowsHtml;

            // Company Total Row
            let blockTotalCells = '';
            for(let i=0; i<5; i++) {
                blockTotalCells += `
                    <td style="text-align: right; font-weight: 700; color: #0369a1; background: #bfdbfe; border-left: 1px solid #93c5fd;">${blockSumsQty[i] ? blockSumsQty[i].toLocaleString('vi-VN') : '0'}</td>
                    <td style="text-align: right; font-weight: 700; color: #1e3a8a; background: #bae6fd;">${blockSumsVal[i] ? blockSumsVal[i].toLocaleString('vi-VN') : ''}</td>
                `;
            }

            html += `
                <tr style="background: #bae6fd; font-weight: bold;">
                    <td style="background: #bae6fd;"></td>
                    <td style="background: #bae6fd; font-weight: 800;">Tổng cộng</td>
                    ${blockTotalCells}
                    <td style="text-align: right; font-weight: 800; color: #0369a1; background: #93c5fd; border-left: 2px solid #60a5fa;">${blockTotalQty.toLocaleString('vi-VN')}</td>
                    <td style="text-align: right; font-weight: 800; color: #b91c1c; background: #bae6fd;">${blockTotalVal.toLocaleString('vi-VN')}</td>
                </tr>
            `;
        });

        // Master Header Row (A. TỔNG TẬP ĐOÀN)
        if (isAll) {
            let masterBrandCells = '';
            for(let i=0; i<5; i++) {
                masterBrandCells += `
                    <td style="text-align: right; background: #fef08a; color: #0369a1; font-weight: 800; border-left: 1px solid #eab308;">${totalBrandsQty[i] ? totalBrandsQty[i].toLocaleString('vi-VN') : '0'}</td>
                    <td style="text-align: right; background: #fef9c3; color: #1e3a8a; font-weight: 800;">${totalBrandsVal[i] ? totalBrandsVal[i].toLocaleString('vi-VN') : ''}</td>
                `;
            }

            let masterHeader = `
                <tr style="background: #fde047; font-weight: bold; font-size: 0.95rem;">
                    <td style="text-align: center; background: #fde047; font-weight: 800;">A</td>
                    <td style="background: #fde047; font-weight: 800;">TỔNG TẬP ĐOÀN</td>
                    ${masterBrandCells}
                    <td style="text-align: right; background: #fef08a; color: #0369a1; font-weight: 800; border-left: 2px solid #ca8a04; font-size: 1rem;">${masterTotalQty.toLocaleString('vi-VN')}</td>
                    <td style="text-align: right; background: #fef9c3; color: #b91c1c; font-weight: 800; font-size: 1rem;">${masterTotalVal.toLocaleString('vi-VN')}</td>
                </tr>
            `;
            html = masterHeader + html;
        }

        tbody.innerHTML = html;
    },

    exportSummaryCSV() {
        if (!this.invData) return;
        const headers = [
            'STT', 'Đơn Vị', 'Định Mức Kế Hoạch (Tỷ)', 'Thực Tế (Tỷ)', 'Tỷ Lệ Đạt (%)',
            'Tồn Kho HĐKD Thường (Tỷ)', 'Tồn Kho Dự Án (Tỷ)',
            'Chậm Luân Chuyển - Máy (Tỷ)', 'SL Máy Chậm',
            'Chậm Luân Chuyển - Vật Tư (Tỷ)', 'SL Vật Tư Chậm',
            'Doanh Số TB Tháng (Tỷ)', 'Tồn Kho TB Tháng (Tỷ)', 'Tỷ Lệ Tồn/Doanh Số (%)', 'Số Tháng Tồn Kho'
        ];

        const rows = this.invData.map(b => {
            let unitActual = 0;
            b.rows.forEach(r => {
                if (r.vals) r.vals.forEach(v => { if (v) unitActual += v; });
            });
            const pct = b.planVal > 0 ? ((unitActual / b.planVal) * 100).toFixed(1) : 0;
            const ratio = b.avgMonthlyRev > 0 ? ((b.avgMonthlyInv / b.avgMonthlyRev) * 100).toFixed(1) : 0;
            const months = b.avgMonthlyRev > 0 ? (b.avgMonthlyInv / b.avgMonthlyRev).toFixed(2) : 0;

            return [
                b.stt,
                `"${b.companyName}"`,
                (b.planVal / 1e9).toFixed(2),
                (unitActual / 1e9).toFixed(2),
                pct,
                (b.normalVal / 1e9).toFixed(2),
                (b.projectVal / 1e9).toFixed(2),
                (b.slowMachinesVal / 1e9).toFixed(2),
                b.slowMachinesQty,
                (b.slowPartsVal / 1e9).toFixed(2),
                b.slowPartsQty,
                (b.avgMonthlyRev / 1e9).toFixed(2),
                (b.avgMonthlyInv / 1e9).toFixed(2),
                ratio,
                months
            ];
        });

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `Bao_Cao_Chi_Tieu_Ton_Kho_VPS_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// Auto init when script loaded or DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.InventoryModule.init());
} else {
    window.InventoryModule.init();
}
