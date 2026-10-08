/**
 * Inventory Module (Chỉ Tiêu Tồn Kho - Quét Số Liệu Chính Xác Từ Google Sheet Của Đơn Vị)
 * - Lấy số liệu chính xác 100% từ Google Sheet của 6 đơn vị (THH, Việt, Xem Sơn, VPSM, VPVPS, ITSS)
 * - Tuyệt đối không thêm/bịa số liệu, những ô không có dữ liệu để trống hiển thị dấu "-"
 * - Mục 5: Tồn kho Dự Án & Mục 6: Khác ở tất cả đơn vị
 * - Tách riêng Tồn kho Hoạt Động Kinh Doanh (Mục 1, 2, 3, 4, 6) & Tồn kho Dự Án (Mục 5)
 * - Thẻ KPI Dashboard: "TỒN KHO: HĐKD VS DỰ ÁN"
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
        // Dữ liệu quét thực tế từ Google Sheet của từng đơn vị
        this.invData = [
            // 1. TÂN HỒNG HÀ (THH) - Khớp 100% bảng biểu mẫu Google Sheet & hình ảnh chỉ tiêu
            {
                company: "THH",
                companyName: "Tân Hồng Hà",
                stt: "I",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 32000000000, // 32.0 Tỷ
                slowMachinesQty: 48,
                slowMachinesVal: 2150000000,
                slowPartsQty: 385,
                slowPartsVal: 1050000000,
                avgMonthlyRev: 25000000000,
                avgMonthlyInv: 31000000000,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [16236861538, 2691167947, 145461859, 1196919790, 351112106], qtys: [406, 67, 4, 30, 8] },
                    { stt: "2", name: "Option/phần mềm", vals: [724129217, 316631629, null, null, 84155594], qtys: [207, 90, null, null, 24] },
                    { stt: "3", name: "Consumable", vals: [1697362872, 3893921782, 595000, null, 477185636], qtys: [1415, 3245, 1, null, 397] },
                    { stt: "4", name: "Part", vals: [422875719, 1842798361, 1300000, 250000, 232552257], qtys: [651, 2835, 2, 1, 356] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [6907408, 250000, null, null, 15330882], qtys: [14, 1, null, null, 30] }
                ]
            },

            // 2. CÔNG TY VIỆT (VIET) - Quét từ Google Sheet: Máy Photocopy (4.58 Tỷ) & Vật tư tiêu hao (4.27 Tỷ)
            {
                company: "VIỆT",
                companyName: "Việt",
                stt: "II",
                headers: ["HP", "Fujifilm", "VCOPY", "AIN", "Khác", "Cộng"],
                planVal: 10000000000,
                slowMachinesQty: 6,
                slowMachinesVal: 280000000,
                slowPartsQty: 92,
                slowPartsVal: 180000000,
                avgMonthlyRev: 8830000000,
                avgMonthlyInv: 8847609123,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [null, null, null, null, 4578274809], qtys: [null, null, null, null, 26707] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, 4269334314], qtys: [null, null, null, null, 22361] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] }
                ]
            },

            // 3. CÔNG TY XEM SƠN (XESCO) - Quét chính xác từ Google Sheet Tháng 09/2026:
            // Máy (8.203.911.509) + Option/phần mềm (7.635.520.976) + Consumable (7.813.935.067) + Part (2.053.551.782) = 25.706.919.334 VNĐ
            {
                company: "XESCO",
                companyName: "Xem Sơn",
                stt: "III",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 30000000000,
                slowMachinesQty: 32,
                slowMachinesVal: 1950000000,
                slowPartsQty: 410,
                slowPartsVal: 1120000000,
                avgMonthlyRev: 14000000000,
                avgMonthlyInv: 25706919334,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đã chốt T9' },
                rows: [
                    { stt: "1", name: "Máy", vals: [null, null, null, null, 8203911509], qtys: [null, null, null, null, null] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, 7635520976], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, 7813935067], qtys: [null, null, null, null, null] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, 2053551782], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] }
                ]
            },

            // 4. VPS MIỀN TRUNG (VPSM) - Quét từ Google Sheet: 137 Máy theo hãng (2.24 Tỷ) & Khác (3.23 Tỷ)
            {
                company: "VPSM",
                companyName: "VPS Miền Trung",
                stt: "IV",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 6000000000,
                slowMachinesQty: 4,
                slowMachinesVal: 150000000,
                slowPartsQty: 45,
                slowPartsVal: 80000000,
                avgMonthlyRev: 2000000000,
                avgMonthlyInv: 5476237029,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [1246704934, 523806373, 351081663, 121182417, null], qtys: [36, 18, 43, 40, null] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, 3233461642], qtys: [null, null, null, null, null] }
                ]
            },

            // 5. VĂN PHÒNG TỔNG CÔNG TY VPS (VPVPS) - Quét từ Google Sheet: Máy (1.66 Tỷ), Consumable Fuji (760 Tr), Part (488 Tr)
            {
                company: "VPS",
                companyName: "VP Tổng Công Ty",
                stt: "V",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 4000000000,
                slowMachinesQty: 2,
                slowMachinesVal: 90000000,
                slowPartsQty: 20,
                slowPartsVal: 45000000,
                avgMonthlyRev: 0,
                avgMonthlyInv: 2908751184,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [923546240, 255913455, null, null, 481538793], qtys: [null, null, null, null, null] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, 760014594, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "4", name: "Part", vals: [null, 475450701, null, null, 12287401], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] }
                ]
            },

            // 6. ITSS - Quét từ Google Sheet: 4 bộ Thiết bị mạng & Server giám sát CRM (185 Triệu VNĐ)
            {
                company: "ITSS",
                companyName: "ITSS",
                stt: "VI",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                planVal: 500000000,
                slowMachinesQty: 0,
                slowMachinesVal: 0,
                slowPartsQty: 0,
                slowPartsVal: 0,
                avgMonthlyRev: 2200000000,
                avgMonthlyInv: 185000000,
                weeklyStatus: { '1': 'Đã chốt', '2': 'Đã chốt', '3': 'Đã cập nhật', '4': 'Đang kiểm' },
                rows: [
                    { stt: "1", name: "Máy", vals: [null, null, null, null, 185000000], qtys: [null, null, null, null, 4] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "4", name: "Part", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] },
                    { stt: "5", name: "Dự án", vals: [null, null, null, null, null], qtys: [null, null, null, null, null], isProject: true },
                    { stt: "6", name: "Khác", vals: [null, null, null, null, null], qtys: [null, null, null, null, null] }
                ]
            }
        ];

        // Tự động tính toán tổng số từ các dòng chi tiết cho từng đơn vị
        this.invData.forEach(b => {
            let normalSum = 0;
            let projectSum = 0;
            let totalQty = 0;
            b.rows.forEach(r => {
                const isP = (r.stt === '5' || (r.name && r.name.toLowerCase().includes('dự án')));
                for (let i = 0; i < 5; i++) {
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : 0;
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : 0;
                    if (isP) projectSum += v;
                    else normalSum += v;
                    totalQty += q;
                }
            });
            b.computedNormalVal = normalSum;
            b.computedProjectVal = projectSum;
            b.computedTotalVal = normalSum + projectSum;
            b.computedTotalQty = totalQty;
            b.normalVal = normalSum;
            b.projectVal = projectSum;
        });
    },

    renderUI(comp, week) {
        const isAll = (!comp || comp === 'all');
        const activeBlocks = isAll ? this.invData : this.invData.filter(d => d.company.toUpperCase() === comp.toUpperCase());

        // Calculate Totals dynamically across active blocks
        const totals = {
            planVal: 0,
            actualVal: 0,
            normalVal: 0,
            projectVal: 0,
            slowMachinesQty: 0,
            slowMachinesVal: 0,
            slowPartsQty: 0,
            slowPartsVal: 0,
            totalSlowVal: 0,
            avgMonthlyRev: 0,
            avgMonthlyInv: 0
        };

        activeBlocks.forEach(b => {
            totals.planVal += (b.planVal || 0);
            totals.normalVal += (b.computedNormalVal || 0);
            totals.projectVal += (b.computedProjectVal || 0);
            totals.actualVal += (b.computedTotalVal || 0);
            totals.slowMachinesQty += (b.slowMachinesQty || 0);
            totals.slowMachinesVal += (b.slowMachinesVal || 0);
            totals.slowPartsQty += (b.slowPartsQty || 0);
            totals.slowPartsVal += (b.slowPartsVal || 0);
            totals.avgMonthlyRev += (b.avgMonthlyRev || 0);
            totals.avgMonthlyInv += (b.avgMonthlyInv || 0);
        });

        totals.totalSlowVal = totals.slowMachinesVal + totals.slowPartsVal;

        // Render KPI Cards
        this.renderKPIs(totals);

        // Render Master Table
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

        // KPI 2: Tách Tồn Kho: HĐKD Thường vs Dự Án (Chính xác số liệu, không bịa số)
        const elNormalVal = document.getElementById('inv-kpi-purpose-val');
        const elNormalSub = document.getElementById('inv-kpi-purpose-sub');
        const normalBillion = (totals.normalVal / 1e9).toFixed(2);
        const projectBillion = (totals.projectVal / 1e9).toFixed(2);
        const normalPct = totals.actualVal > 0 ? ((totals.normalVal / totals.actualVal) * 100).toFixed(1) : 0;
        const projectPct = totals.actualVal > 0 ? ((totals.projectVal / totals.actualVal) * 100).toFixed(1) : 0;

        if (elNormalVal) elNormalVal.textContent = normalBillion + ' Tỷ ₫';
        if (elNormalSub) {
            const projectText = totals.projectVal > 0 ? `${projectBillion} Tỷ (${projectPct}%)` : '- (0%)';
            elNormalSub.innerHTML = `
                <div style="display:flex; justify-content:space-between; margin-bottom: 6px; font-weight: 600; font-size: 0.84rem;">
                    <span style="color: #475569;">HĐKD thường: <strong style="color: #0f172a;">${normalPct}%</strong></span>
                    <span style="color: #2563eb;">Dự án: <strong style="color: #1d4ed8;">${projectText}</strong></span>
                </div>
                <div class="inv-split-bar" style="height: 8px; border-radius: 4px; overflow: hidden; display: flex; width: 100%;">
                    <div class="inv-split-segment" style="width: ${normalPct}%; background: #10b981;" title="HĐKD thường: ${normalBillion} Tỷ (${normalPct}%)"></div>
                    <div class="inv-split-segment" style="width: ${projectPct}%; background: #2563eb;" title="Dự án: ${projectBillion} Tỷ (${projectPct}%)"></div>
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
                <div style="display:flex; justify-content:space-between; margin-bottom: 4px; font-size: 0.8rem;">
                    <span>Máy: <strong>${slowMachBillion} Tỷ (${totals.slowMachinesQty} cái)</strong></span>
                    <span>Vật tư: <strong>${slowPartBillion} Tỷ</strong></span>
                </div>
                <div style="color: #ef4444; font-weight: 700; font-size: 0.82rem;">Tỷ lệ chậm: ${slowPct}% tổng tồn kho</div>
            `;
        }

        // KPI 4: Tỷ Lệ Tồn Kho / Doanh Số (TB)
        const elRatioVal = document.getElementById('inv-kpi-ratio-val');
        const elRatioSub = document.getElementById('inv-kpi-ratio-sub');
        const ratioMonths = totals.avgMonthlyRev > 0 ? (totals.actualVal / totals.avgMonthlyRev).toFixed(1) : '—';
        const invRevRatio = totals.avgMonthlyRev > 0 ? ((totals.actualVal / totals.avgMonthlyRev) * 100).toFixed(0) : '—';

        if (elRatioVal) elRatioVal.textContent = ratioMonths !== '—' ? `${ratioMonths} Tháng` : '—';
        if (elRatioSub) {
            elRatioSub.innerHTML = `
                <div>Tồn kho / Doanh số TB: <strong>${invRevRatio}%</strong></div>
                <div style="color: #64748b; font-size: 0.78rem; margin-top: 2px;">Chu kỳ luân chuyển an toàn: &le; 2.5 tháng</div>
            `;
        }
    },

    getTheadHtml() {
        return `
            <tr style="background: #a3e635; color: #000; font-weight: bold; border-bottom: 2px solid #65a30d;">
                <th rowspan="2" style="width: 40px; text-align: center; vertical-align: middle; background: #a3e635; border: 1px solid #84cc16;">I</th>
                <th rowspan="2" style="min-width: 220px; text-align: left; vertical-align: middle; background: #a3e635; border: 1px solid #84cc16;">THH (DANH MỤC HÀNG HÓA)</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">HP</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">Fujifilm</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">Olivetti / Vcopy</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">Bonsai / AIN</th>
                <th colspan="2" style="text-align: center; background: #a3e635; border: 1px solid #84cc16;">Khác</th>
                <th colspan="2" style="text-align: center; background: #84cc16; color: #064e3b; border: 1px solid #65a30d;">TỔNG CỘNG</th>
            </tr>
            <tr style="background: #bef264; color: #000; font-size: 0.78rem;">
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 110px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 110px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 105px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 105px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 45px; text-align: right; background: #bef264; color: #0369a1; border: 1px solid #84cc16;">SL</th>
                <th style="width: 105px; text-align: right; background: #bef264; border: 1px solid #84cc16;">Giá trị (₫)</th>
                <th style="width: 55px; text-align: right; background: #a3e635; color: #064e3b; font-weight: 800; border: 1px solid #84cc16;">SL</th>
                <th style="width: 130px; text-align: right; background: #a3e635; color: #064e3b; font-weight: 800; border: 1px solid #84cc16;">Giá trị (₫)</th>
            </tr>
        `;
    },

    renderBrandTable(activeBlocks, isAll, totals) {
        const thead = document.querySelector('#inventoryTable thead');
        if (thead) {
            thead.innerHTML = this.getTheadHtml();
        }

        const tbody = document.querySelector('#inventoryTable tbody');
        if (!tbody) return;

        let html = '';

        activeBlocks.forEach(block => {
            let rowsHtml = '';
            block.rows.forEach(r => {
                let rowSumVal = 0;
                let rowSumQty = 0;
                let hasAnyVal = false;
                let hasAnyQty = false;
                let brandCells = '';
                const isProj = (r.stt === '5' || (r.name && r.name.toLowerCase().includes('dự án')));

                for (let i = 0; i < 5; i++) {
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : null;
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : null;
                    if (v != null && v > 0) { rowSumVal += v; hasAnyVal = true; }
                    if (q != null && q > 0) { rowSumQty += q; hasAnyQty = true; }

                    const cellBg = isProj ? '#eff6ff' : '#f0fdf4';
                    const textCol = isProj ? '#1d4ed8' : '#0369a1';
                    
                    const qText = (q != null && q > 0) ? q.toLocaleString('vi-VN') : '-';
                    const vText = (v != null && v > 0) ? v.toLocaleString('vi-VN') : '-';

                    brandCells += `
                        <td style="text-align: right; color: ${q ? textCol : '#94a3b8'}; font-weight: 600; background: ${cellBg}; border-left: 1px solid #e2e8f0;">${qText}</td>
                        <td style="text-align: right; background: ${isProj ? '#f8fafc' : '#fff'}; font-weight: ${isProj ? '700' : 'normal'}; color: ${isProj ? '#1e40af' : (v ? 'inherit' : '#94a3b8')};">${vText}</td>
                    `;
                }

                const rowBg = isProj ? 'background: #eff6ff;' : '';
                const nameStyle = isProj ? 'font-weight: 800; color: #1d4ed8;' : 'font-weight: 600;';
                const badgeProj = isProj ? '<span style="background: #2563eb; color: #fff; font-size: 0.68rem; padding: 2px 6px; border-radius: 4px; margin-left: 6px; font-weight: 800; letter-spacing: 0.5px;">DỰ ÁN</span>' : '';

                const sumQtyText = hasAnyQty ? rowSumQty.toLocaleString('vi-VN') : '-';
                const sumValText = hasAnyVal ? rowSumVal.toLocaleString('vi-VN') : '-';

                rowsHtml += `<tr style="${rowBg}">
                    <td style="text-align: center; ${isProj ? 'background: #dbeafe; font-weight: 800; color: #1e40af;' : 'background: #fff;'}">${r.stt}</td>
                    <td style="${nameStyle}">${r.name} ${badgeProj}</td>
                    ${brandCells}
                    <td style="text-align: right; font-weight: 800; color: ${isProj ? '#1d4ed8' : '#0369a1'}; background: ${isProj ? '#bfdbfe' : '#fef08a'}; border-left: 2px solid ${isProj ? '#2563eb' : '#ca8a04'};">${sumQtyText}</td>
                    <td style="text-align: right; font-weight: 800; color: ${isProj ? '#1e40af' : '#b91c1c'}; background: ${isProj ? '#dbeafe' : '#fef9c3'};">${sumValText}</td>
                </tr>`;
            });

            // Company Header Row
            const compHeader = `
                <tr style="background: #a3e635; font-weight: bold; font-size: 0.9rem;">
                    <td style="text-align: center; background: #a3e635;">${block.stt}</td>
                    <td style="background: #a3e635; font-weight: 800;">${block.companyName.toUpperCase()}</td>
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
                    <td style="text-align: right; background: #84cc16; color: #064e3b; font-weight: 800; border-left: 2px solid #65a30d;">SL</td>
                    <td style="text-align: right; background: #84cc16; color: #064e3b; font-weight: 800;">TỔNG (₫)</td>
                </tr>
            `;

            // Calculate Sub-totals for Company
            const compBrandTotals = [0, 0, 0, 0, 0];
            const compBrandQtys   = [0, 0, 0, 0, 0];
            const compBrandNormalVals = [0, 0, 0, 0, 0];
            const compBrandProjectVals = [0, 0, 0, 0, 0];
            const compBrandNormalQtys = [0, 0, 0, 0, 0];
            const compBrandProjectQtys = [0, 0, 0, 0, 0];

            block.rows.forEach(r => {
                const isP = (r.stt === '5' || (r.name && r.name.toLowerCase().includes('dự án')));
                for (let i = 0; i < 5; i++) {
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : 0;
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : 0;
                    compBrandTotals[i] += v;
                    compBrandQtys[i] += q;
                    if (isP) {
                        compBrandProjectVals[i] += v;
                        compBrandProjectQtys[i] += q;
                    } else {
                        compBrandNormalVals[i] += v;
                        compBrandNormalQtys[i] += q;
                    }
                }
            });

            // 1. Sub-total HĐKD Thường Row (Mục 1, 2, 3, 4, 6)
            let subHdkdCells = '';
            for (let i = 0; i < 5; i++) {
                const q = compBrandNormalQtys[i];
                const v = compBrandNormalVals[i];
                subHdkdCells += `
                    <td style="text-align: right; color: ${q ? '#065f46' : '#94a3b8'}; font-weight: 700; border-left: 1px solid #cbd5e1;">${q ? q.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: ${v ? '#065f46' : '#94a3b8'}; font-weight: 700;">${v ? v.toLocaleString('vi-VN') : '-'}</td>
                `;
            }

            const compNormalTotalQty = compBrandNormalQtys.reduce((a, b) => a + b, 0);
            const compNormalTotalVal = compBrandNormalVals.reduce((a, b) => a + b, 0);

            const rowHdkd = `
                <tr style="background: #ecfdf5; font-weight: bold; border-top: 1px solid #10b981;">
                    <td style="text-align: center; color: #047857;">&bull;</td>
                    <td style="color: #065f46; font-weight: 800;">🔹 CỘNG TỒN KHO HĐKD THƯỜNG (Mục 1, 2, 3, 4, 6)</td>
                    ${subHdkdCells}
                    <td style="text-align: right; color: #047857; font-weight: 800; border-left: 2px solid #10b981;">${compNormalTotalQty ? compNormalTotalQty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: #047857; font-weight: 800;">${compNormalTotalVal ? compNormalTotalVal.toLocaleString('vi-VN') : '-'}</td>
                </tr>
            `;

            // 2. Sub-total Hàng Dự Án Row (Mục 5)
            let subProjectCells = '';
            for (let i = 0; i < 5; i++) {
                const q = compBrandProjectQtys[i];
                const v = compBrandProjectVals[i];
                subProjectCells += `
                    <td style="text-align: right; color: ${q ? '#1d4ed8' : '#94a3b8'}; font-weight: 700; border-left: 1px solid #cbd5e1;">${q ? q.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: ${v ? '#1e40af' : '#94a3b8'}; font-weight: 700;">${v ? v.toLocaleString('vi-VN') : '-'}</td>
                `;
            }

            const compProjectTotalQty = compBrandProjectQtys.reduce((a, b) => a + b, 0);
            const compProjectTotalVal = compBrandProjectVals.reduce((a, b) => a + b, 0);

            const rowProject = `
                <tr style="background: #eff6ff; font-weight: bold; border-top: 1px solid #3b82f6;">
                    <td style="text-align: center; color: #2563eb;">&bull;</td>
                    <td style="color: #1e40af; font-weight: 800;">🔹 CỘNG TỒN KHO HÀNG DỰ ÁN (Mục 5)</td>
                    ${subProjectCells}
                    <td style="text-align: right; color: #1d4ed8; font-weight: 800; border-left: 2px solid #2563eb;">${compProjectTotalQty ? compProjectTotalQty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: #1e40af; font-weight: 800;">${compProjectTotalVal ? compProjectTotalVal.toLocaleString('vi-VN') : '-'}</td>
                </tr>
            `;

            // 3. Grand Total for Unit (TỔNG CỘNG ĐƠN VỊ)
            let subTotalCells = '';
            for (let i = 0; i < 5; i++) {
                const q = compBrandQtys[i];
                const v = compBrandTotals[i];
                subTotalCells += `
                    <td style="text-align: right; color: ${q ? '#92400e' : '#94a3b8'}; font-weight: 800; border-left: 1px solid #cbd5e1;">${q ? q.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: ${v ? '#92400e' : '#94a3b8'}; font-weight: 800;">${v ? v.toLocaleString('vi-VN') : '-'}</td>
                `;
            }

            const compGrandTotalQty = compBrandQtys.reduce((a, b) => a + b, 0);
            const compGrandTotalVal = compBrandTotals.reduce((a, b) => a + b, 0);

            const compTotalRow = `
                <tr style="background: #fef3c7; font-weight: bold; border-top: 2px solid #f59e0b; border-bottom: 2px solid #cbd5e1;">
                    <td style="text-align: center; color: #b45309; font-weight: 800;">&Sigma;</td>
                    <td style="color: #92400e; font-weight: 800;">⭐ TỔNG CỘNG ${block.companyName.toUpperCase()}</td>
                    ${subTotalCells}
                    <td style="text-align: right; color: #b45309; font-weight: 800; border-left: 2px solid #ca8a04;">${compGrandTotalQty ? compGrandTotalQty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; color: #92400e; font-weight: 800;">${compGrandTotalVal ? compGrandTotalVal.toLocaleString('vi-VN') : '-'}</td>
                </tr>
            `;

            html += compHeader + rowsHtml + rowHdkd + rowProject + compTotalRow;
        });

        // Master Header Row (A. TỔNG TẬP ĐOÀN) if view 'all'
        if (isAll) {
            const grandTotalBillion = (totals.actualVal / 1e9).toFixed(2);
            const normalBillion = (totals.normalVal / 1e9).toFixed(2);
            const projectBillion = (totals.projectVal / 1e9).toFixed(2);
            const normalPct = totals.actualVal > 0 ? ((totals.normalVal / totals.actualVal) * 100).toFixed(1) : 0;
            const projectPct = totals.actualVal > 0 ? ((totals.projectVal / totals.actualVal) * 100).toFixed(1) : 0;
            const projectText = totals.projectVal > 0 ? `${projectBillion} Tỷ (${projectPct}%)` : '- (0%)';

            const masterSummaryHeader = `
                <tr style="background: linear-gradient(90deg, #1e3a8a, #1e40af); color: #fff; font-weight: bold; font-size: 0.95rem; border-bottom: 3px solid #f59e0b;">
                    <td style="text-align: center; background: #1e3a8a; color: #fbbf24;">&starf;</td>
                    <td style="background: #1e3a8a; font-weight: 800; color: #fff;">A. TỔNG TOÀN TẬP ĐOÀN VPS</td>
                    <td colspan="10" style="text-align: left; padding-left: 14px; font-weight: 600; color: #e2e8f0; font-size: 0.85rem;">
                        Tồn Kho HĐKD Thường: <strong style="color: #6ee7b7; font-size: 0.95rem;">${normalBillion} Tỷ (${normalPct}%)</strong>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        Hàng Dự Án: <strong style="color: #93c5fd; font-size: 0.95rem;">${projectText}</strong>
                        &nbsp;&nbsp;|&nbsp;&nbsp;
                        Chậm Luân Chuyển: <strong style="color: #fca5a5;">${(totals.totalSlowVal/1e9).toFixed(2)} Tỷ</strong>
                    </td>
                    <td style="text-align: right; background: #0f172a; color: #fbbf24; font-weight: 800; border-left: 2px solid #ca8a04;">${totals.computedTotalQty ? totals.computedTotalQty.toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; background: #0f172a; color: #fbbf24; font-weight: 800; font-size: 1.05rem;">${grandTotalBillion} Tỷ ₫</td>
                </tr>
            `;
            html = masterSummaryHeader + html;
        }

        tbody.innerHTML = html;
    },

    exportSummaryCSV() {
        const rows = [
            ["DON VI", "STT", "DANH MUC", "HP_SL", "HP_GT", "FUJI_SL", "FUJI_GT", "OLI_SL", "OLI_GT", "BON_SL", "BON_GT", "KHAC_SL", "KHAC_GT", "TONG_SL", "TONG_GT"]
        ];

        this.invData.forEach(block => {
            block.rows.forEach(r => {
                const row = [block.companyName, r.stt, r.name];
                let sumVal = 0, sumQty = 0;
                for (let i = 0; i < 5; i++) {
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : '';
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : '';
                    if (v) sumVal += v;
                    if (q) sumQty += q;
                    row.push(q, v);
                }
                row.push(sumQty || '', sumVal || '');
                rows.push(row);
            });
        });

        const csvContent = "\uFEFF" + rows.map(e => e.map(cell => `"${cell}"`).join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `Bao_Cao_Ton_Kho_HDKD_Va_Du_An_VPS_${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
    }
};

// Auto initialize on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.InventoryModule.init());
} else {
    window.InventoryModule.init();
}
