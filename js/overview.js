/**
 * Overview Module — Scorecard Dashboard
 * Displays comprehensive KPIs and unit measurement matrix
 */

window.OverviewModule = {
    charts: {},

    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            if (!document.getElementById('view-overview').classList.contains('hidden')) {
                this.loadData();
            }
        });

        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (item.dataset.target === 'overview') {
                    this.loadData();
                }
            });
        });

        // Initial load
        setTimeout(() => this.loadData(), 300);
    },

    async loadData() {
        const d = window.mockData || {};
        try { this.updateKPIs(d); } catch (e) { console.error('[Overview] Error in updateKPIs:', e); }
        try { this.buildMatrix(d); } catch (e) { console.error('[Overview] Error in buildMatrix:', e); }
        try { this.renderCharts(d); } catch (e) { console.error('[Overview] Error in renderCharts:', e); }
        try { this.renderYoYChart(d); } catch (e) { console.error('[Overview] Error in renderYoYChart:', e); }
    },

    // ======= 1. Update 6 KPI Summary Cards =======
    updateKPIs(d) {
        const fallbackHR = {
            'THH': { quota: 54, official: 47 },
            'Viet': { quota: 43, official: 39 },
            'XemSon': { quota: 98, official: 91 },
            'VPSM': { quota: 15, official: 10 },
            'ITSS': { quota: 15, official: 13 },
            'VPVPS': { quota: 25, official: 19 }
        };
        const fallbackPlan = {
            'all': { ds: 43989, actual: 36949, ttlg: 8605, lg_pct: 23.3, cp_lg_pct: 79.5, cp: 6843, lntt: 1872 },
            'THH': { ds: 17010, actual: 10096, ttlg: 1910, lg_pct: 18.9, cp_lg_pct: 72.9, cp: 1392, lntt: 525 },
            'Viet': { ds: 8779, actual: 7715, ttlg: 1697, lg_pct: 22.0, cp_lg_pct: 74.5, cp: 1265, lntt: 433 },
            'XemSon': { ds: 14000, actual: 15102, ttlg: 4020, lg_pct: 26.6, cp_lg_pct: 54.5, cp: 2190, lntt: 1858 },
            'VPSM': { ds: 2000, actual: 1686, ttlg: 320, lg_pct: 19.0, cp_lg_pct: 83.2, cp: 266, lntt: 128 },
            'ITSS': { ds: 2200, actual: 2350, ttlg: 658, lg_pct: 28.0, cp_lg_pct: 72.9, cp: 480, lntt: 178 },
            'VPVPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 1250, lntt: -1250 }
        };
        const hr = (d && d.hr && d.hr.byCompany) ? d.hr.byCompany : fallbackHR;
        const rev = (d && d.revenue && d.revenue.plan2026) ? d.revenue.plan2026 : fallbackPlan;
        const debt = (d && d.debt && d.debt.byCompany) ? d.debt : { total: 35.4, byCompany: {} };
        const inv = (d && d.inventory) ? d.inventory : { total: 69.86 };
        const iso = window.IsoModule ? window.IsoModule.summaryData : [];

        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : true;
        const allowedCompany = window.AuthService ? window.AuthService.getAllowedCompany() : 'all';
        const currentCompany = canViewAll ? (window.FilterManager ? window.FilterManager.currentCompany : 'all') : allowedCompany;
        const isFiltered = (currentCompany && currentCompany !== 'all');

        const compMap = {
            'Tân Hồng Hà': { hr: 'THH', rev: 'THH', debt: 'THH', inv: 'THH', iso: 'TÂN HỒNG HÀ' },
            'THH': { hr: 'THH', rev: 'THH', debt: 'THH', inv: 'THH', iso: 'TÂN HỒNG HÀ' },
            'Việt': { hr: 'Viet', rev: 'Viet', debt: 'Viet', inv: 'Viet', iso: 'VIỆT' },
            'VIET': { hr: 'Viet', rev: 'Viet', debt: 'Viet', inv: 'Viet', iso: 'VIỆT' },
            'Xem Sơn': { hr: 'XemSon', rev: 'XemSon', debt: 'XemSon', inv: 'XemSon', iso: 'XESCO' },
            'XESCO': { hr: 'XemSon', rev: 'XemSon', debt: 'XemSon', inv: 'XemSon', iso: 'XESCO' },
            'XEMSON': { hr: 'XemSon', rev: 'XemSon', debt: 'XemSon', inv: 'XemSon', iso: 'XESCO' },
            'VPS M': { hr: 'VPSM', rev: 'VPSM', debt: 'VPSM', inv: 'VPSM', iso: 'VPSM' },
            'VPSM': { hr: 'VPSM', rev: 'VPSM', debt: 'VPSM', inv: 'VPSM', iso: 'VPSM' },
            'ITSS': { hr: 'ITSS', rev: 'ITSS', debt: 'ITSS', inv: null, iso: 'ITSS' },
            'Văn phòng VPS': { hr: 'VPVPS', rev: 'Văn phòng VPS', debt: 'Văn phòng VPS', inv: null, iso: 'VPS' },
            'VPVPS': { hr: 'VPVPS', rev: 'Văn phòng VPS', debt: 'Văn phòng VPS', inv: null, iso: 'VPS' }
        };
        const cKey = isFiltered ? (compMap[currentCompany] || compMap['Tân Hồng Hà']) : null;

        // --- HR ---
        let totalQuota = 0, totalOfficial = 0, totalProbation = 0, totalHeadcount = 0;
        if (isFiltered && cKey) {
            const cHR = hr[cKey.hr] || hr[currentCompany] || fallbackHR[cKey.hr] || { quota: 0, official: 0 };
            totalQuota = cHR.quota || 0;
            totalOfficial = cHR.official || 0;
            totalProbation = cHR.probation || 0;
            totalHeadcount = cHR.totalEmployees || (totalOfficial + totalProbation) || totalOfficial;
        } else {
            for (const key of Object.keys(hr)) {
                if (key === 'Văn phòng VPS') continue; // avoid duplicate with VPVPS
                totalQuota += (hr[key].quota || 0);
                totalOfficial += (hr[key].official || 0);
                totalProbation += (hr[key].probation || 0);
                totalHeadcount += (hr[key].totalEmployees || ((hr[key].official || 0) + (hr[key].probation || 0)) || (hr[key].official || 0));
            }
        }
        const hrPct = totalQuota > 0 ? ((totalHeadcount / totalQuota) * 100).toFixed(1) : 0;
        this.setEl('sc-hr-value', `${totalHeadcount} / ${totalQuota}`);
        this.setEl('sc-hr-sub', isFiltered ? `Chính thức: ${totalOfficial} | Thử việc: ${totalProbation}` : `Lấp đầy: ${hrPct}% (Tổng: ${totalHeadcount})`);
        this.setBadge('sc-hr-badge', hrPct, '%');
        this.setBar('sc-hr-bar', hrPct, '#e74c3c');

        // --- Revenue ---
        let revActual = 0, revPlan = 0, profitVal = 0, profitPct = 0;
        if (isFiltered && cKey) {
            const cRev = rev[cKey.rev] || rev[cKey.hr] || fallbackPlan[cKey.hr] || { ds: 0, actual: 0, ttlg: 0, lg_pct: 0 };
            revActual = cRev.actual || 0;
            revPlan = cRev.ds || 0;
            profitVal = cRev.actual_ttlg || cRev.ttlg || 0;
            profitPct = cRev.actual_lg_pct || cRev.lg_pct || 0;
        } else {
            const allRev = (rev && rev['all']) ? rev['all'] : fallbackPlan['all'];
            revActual = allRev.actual || 0;
            revPlan = allRev.ds || 0;
            profitVal = allRev.actual_ttlg || allRev.ttlg || 0;
            profitPct = allRev.actual_lg_pct || allRev.lg_pct || 0;
        }
        const revPct = revPlan > 0 ? ((revActual / revPlan) * 100).toFixed(1) : 0;
        this.setEl('sc-rev-value', `${this.fmtNum(revActual)} Tr`);
        this.setEl('sc-rev-sub', `KH: ${this.fmtNum(revPlan)} Tr | Đạt ${revPct}%`);
        this.setBadge('sc-rev-badge', revPct, '%');
        this.setBar('sc-rev-bar', Math.min(revPct, 100), '#10b981');

        // --- Profit ---
        this.setEl('sc-profit-value', `${this.fmtNum(profitVal)} Tr`);
        this.setEl('sc-profit-sub', `Tỷ lệ LG: ${profitPct}%`);
        this.setBadge('sc-profit-badge', profitPct > 15 ? 85 : profitPct > 10 ? 60 : 30, '%');
        this.setBar('sc-profit-bar', Math.min(profitPct * 4, 100), '#8b5cf6');

        // --- Inventory (Quét chính xác từ Google Sheet của đơn vị, không thêm bịa số) ---
        const invBreakdown = {
            'all':    { normal: 74.12, project: 0.00, total: 74.12 },
            'THH':    { normal: 30.34, project: 0.00, total: 30.34 },
            'Viet':   { normal: 8.85,  project: 0.00, total: 8.85 },
            'XemSon': { normal: 26.37, project: 0.00, total: 26.37 },
            'VPSM':   { normal: 5.48,  project: 0.00, total: 5.48 },
            'ITSS':   { normal: 0.19,  project: 0.00, total: 0.19 },
            'VPVPS':  { normal: 2.91,  project: 0.00, total: 2.91 }
        };

        let normalInvDisplay = 74.12;
        let projectInvDisplay = 0.00;
        let totalInvDisplay = 74.12;

        if (isFiltered && cKey) {
            const compData = invBreakdown[cKey.inv] || invBreakdown['THH'];
            normalInvDisplay = compData.normal;
            projectInvDisplay = compData.project;
            totalInvDisplay = compData.total;
        } else {
            normalInvDisplay = invBreakdown['all'].normal;
            projectInvDisplay = invBreakdown['all'].project;
            totalInvDisplay = invBreakdown['all'].total;
        }

        const normalInvPct = totalInvDisplay > 0 ? ((normalInvDisplay / totalInvDisplay) * 100).toFixed(1) : 0;
        const projectInvPct = totalInvDisplay > 0 ? ((projectInvDisplay / totalInvDisplay) * 100).toFixed(1) : 0;
        const projectText = projectInvDisplay > 0 ? `${projectInvDisplay.toFixed(2)} Tỷ (${projectInvPct}%)` : '- (0%)';

        this.setEl('sc-inv-value', `${normalInvDisplay.toFixed(2)} Tỷ ₫`);
        this.setEl('sc-inv-normal-pct', `${normalInvPct}%`);
        this.setEl('sc-inv-project-val', projectInvDisplay > 0 ? `${projectInvDisplay.toFixed(2)} Tỷ` : '-');
        this.setEl('sc-inv-project-pct', `${projectInvPct}%`);
        this.setEl('sc-inv-sub', `HĐKD: ${normalInvPct}% | Dự án: ${projectText}`);

        const invBadgeEl = document.getElementById('sc-inv-badge');
        if (invBadgeEl) {
            invBadgeEl.textContent = projectInvDisplay > 0 ? `Dự án: ${projectInvPct}%` : `Dự án: -`;
            invBadgeEl.className = 'sc-kpi-badge badge-blue';
        }
        const barNormal = document.getElementById('sc-inv-bar-normal');
        if (barNormal) barNormal.style.width = projectInvDisplay > 0 ? `${normalInvPct}%` : '100%';
        const barProject = document.getElementById('sc-inv-bar-project');
        if (barProject) barProject.style.width = projectInvDisplay > 0 ? `${projectInvPct}%` : '0%';

        // --- Debt ---
        let debtTotal = 0, debtOverdue = 0, debtBad = 0;
        if (isFiltered && cKey) {
            const cDebt = (debt && debt.byCompany) ? (debt.byCompany[cKey.debt] || debt.byCompany[cKey.hr] || { current: 0, overdue: 0, bad: 0 }) : { current: 0, overdue: 0, bad: 0 };
            debtTotal = (cDebt.current || 0) + (cDebt.overdue || 0) + (cDebt.bad || 0);
            debtOverdue = cDebt.overdue || 0;
            debtBad = cDebt.bad || 0;
        } else if (debt && debt.byCompany) {
            for (const [, v] of Object.entries(debt.byCompany)) {
                debtTotal += (v.current || 0) + (v.overdue || 0) + (v.bad || 0);
                debtOverdue += (v.overdue || 0);
                debtBad += (v.bad || 0);
            }
        }
        this.setEl('sc-debt-value', `${debtTotal.toFixed(1)} Tỷ`);
        this.setEl('sc-debt-sub', `Quá hạn: ${debtOverdue.toFixed(1)} | Khó đòi: ${debtBad.toFixed(1)}`);
        const debtBadgeEl = document.getElementById('sc-debt-badge');
        if (debtBadgeEl) { debtBadgeEl.textContent = `${debtBad.toFixed(1)} Tỷ khó đòi`; debtBadgeEl.className = `sc-kpi-badge ${debtBad > 3 ? 'badge-red' : debtBad > 0.5 ? 'badge-yellow' : 'badge-green'}`; }

        // --- ISO ---
        let totalQT = 0, totalQD = 0;
        if (isFiltered && cKey) {
            const cIso = iso.find(x => x.name && x.name.toUpperCase() === cKey.iso.toUpperCase()) || { qt: 0, qd: 0 };
            totalQT = cIso.qt || 0;
            totalQD = cIso.qd || 0;
        } else {
            iso.forEach(c => { totalQT += (c.qt || 0); totalQD += (c.qd || 0); });
        }
        this.setEl('sc-iso-value', `${totalQT + totalQD} Văn bản`);
        this.setEl('sc-iso-sub', `QT: ${totalQT} | QĐ: ${totalQD}`);
        const isoBadgeEl = document.getElementById('sc-iso-badge');
        if (isoBadgeEl) { isoBadgeEl.textContent = `${totalQT + totalQD} VB`; }
    },

    // ======= 2. Build Scorecard Matrix =======
    buildMatrix(d) {
        const body = document.getElementById('sc-matrix-body');
        if (!body) return;

        const fallbackHR = {
            'THH': { quota: 54, official: 47 },
            'Viet': { quota: 43, official: 39 },
            'XemSon': { quota: 98, official: 91 },
            'VPSM': { quota: 15, official: 10 },
            'ITSS': { quota: 15, official: 13 },
            'VPVPS': { quota: 25, official: 19 }
        };
        const fallbackPlan = {
            'all': { ds: 43989, actual: 36949, ttlg: 8605, lg_pct: 23.3, cp_lg_pct: 79.5, cp: 6843, lntt: 1872 },
            'THH': { ds: 17010, actual: 10096, ttlg: 1910, lg_pct: 18.9, cp_lg_pct: 72.9, cp: 1392, lntt: 525 },
            'Viet': { ds: 8779, actual: 7715, ttlg: 1697, lg_pct: 22.0, cp_lg_pct: 74.5, cp: 1265, lntt: 433 },
            'XemSon': { ds: 14000, actual: 15102, ttlg: 4020, lg_pct: 26.6, cp_lg_pct: 54.5, cp: 2190, lntt: 1858 },
            'VPSM': { ds: 2000, actual: 1686, ttlg: 320, lg_pct: 19.0, cp_lg_pct: 83.2, cp: 266, lntt: 128 },
            'ITSS': { ds: 2200, actual: 2350, ttlg: 658, lg_pct: 28.0, cp_lg_pct: 72.9, cp: 480, lntt: 178 },
            'VPVPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 1250, lntt: -1250 }
        };
        const hr = (d && d.hr && d.hr.byCompany) ? d.hr.byCompany : fallbackHR;
        const rev = (d && d.revenue && d.revenue.plan2026) ? d.revenue.plan2026 : fallbackPlan;
        const debt = (d && d.debt && d.debt.byCompany) ? d.debt.byCompany : {};
        const inv = (d && d.inventory && d.inventory.byCompany) ? d.inventory.byCompany : {};
        const cust = (d && d.customers && d.customers.byCompany) ? d.customers.byCompany : {};
        const iso = window.IsoModule ? window.IsoModule.summaryData : [];

        // Company keys mapping
        const keys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const hrKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const revKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const debtKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const invKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const custKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const isoNames = ['TÂN HỒNG HÀ', 'VIỆT', 'XESCO', 'VPSM', 'ITSS', 'VPS'];

        // Helper: get value or dash
        const v = (val) => val !== undefined && val !== null ? val : '—';
        const fN = (n) => n !== undefined && n !== null && !isNaN(n) ? n.toLocaleString('vi-VN') : '—';

        // Build rows
        const rows = [];

        // Category: NHÂN SỰ
        rows.push({ category: '👥 NHÂN SỰ' });

        // Row: NS CT / Định biên
        const hrRow1 = { label: 'NS Chính thức / Định biên', values: [], total: '' };
        let sumQ = 0, sumO = 0;
        hrKeys.forEach(k => {
            const c = hr[k] || hr['Văn phòng VPS'];
            if (c) { hrRow1.values.push(`${c.official}/${c.quota}`); sumQ += c.quota; sumO += c.official; }
            else hrRow1.values.push('—');
        });
        hrRow1.total = `${sumO}/${sumQ}`;
        rows.push(hrRow1);

        // Row: % Lấp đầy (with color)
        const hrRow2 = { label: '% Lấp đầy NS', values: [], total: '', colorType: 'pct' };
        hrKeys.forEach(k => {
            const c = hr[k] || hr['Văn phòng VPS'];
            if (c && c.quota > 0) { hrRow2.values.push(((c.official / c.quota) * 100).toFixed(1)); }
            else hrRow2.values.push('—');
        });
        hrRow2.total = sumQ > 0 ? ((sumO / sumQ) * 100).toFixed(1) : '—';
        rows.push(hrRow2);

        // Category: DOANH SỐ
        rows.push({ category: '💰 DOANH SỐ - LÃI GỘP' });

        // Row: DS Kế hoạch
        const revRow1 = { label: 'Doanh Số KH (Tr đ)', values: [], total: '' };
        let sumDS = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) { revRow1.values.push(fN(c.ds)); sumDS += c.ds; }
            else revRow1.values.push('—');
        });
        revRow1.total = fN(sumDS);
        rows.push(revRow1);

        // Row: DS Thực tế
        const revRow2 = { label: 'Doanh Số TT (Tr đ)', values: [], total: '' };
        let sumActual = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) { revRow2.values.push(fN(c.actual)); sumActual += c.actual; }
            else revRow2.values.push('—');
        });
        revRow2.total = fN(sumActual);
        rows.push(revRow2);

        // Row: % Đạt KH (with color)
        const revRow3 = { label: '% Đạt Kế Hoạch', values: [], total: '', colorType: 'pct' };
        revKeys.forEach(k => {
            const c = rev[k];
            if (c && c.ds > 0) { revRow3.values.push(((c.actual / c.ds) * 100).toFixed(1)); }
            else revRow3.values.push('—');
        });
        revRow3.total = sumDS > 0 ? ((sumActual / sumDS) * 100).toFixed(1) : '—';
        rows.push(revRow3);

        // Row: Lãi Gộp KH
        const lgKhRow = { label: 'Lãi Gộp KH (Tr đ)', values: [], total: '' };
        let sumLGKH = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) { lgKhRow.values.push(fN(c.ttlg)); sumLGKH += c.ttlg; }
            else lgKhRow.values.push('—');
        });
        lgKhRow.total = fN(sumLGKH);
        rows.push(lgKhRow);

        // Row: Lãi Gộp TT
        const lgRow = { label: 'Lãi Gộp TT (Tr đ)', values: [], total: '' };
        let sumLG = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) {
                const val = c.actual_ttlg !== undefined ? c.actual_ttlg : c.ttlg;
                lgRow.values.push(fN(val));
                sumLG += val;
            } else lgRow.values.push('—');
        });
        lgRow.total = fN(sumLG);
        rows.push(lgRow);

        // Row: % Lãi Gộp TT
        const lgPctRow = { label: '% Lãi Gộp TT', values: [], total: '', colorType: 'lg' };
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) {
                const pct = c.actual_lg_pct !== undefined ? c.actual_lg_pct : c.lg_pct;
                lgPctRow.values.push(pct);
            } else lgPctRow.values.push('—');
        });
        lgPctRow.total = rev['all'] ? (rev['all'].actual_lg_pct || rev['all'].lg_pct) : '—';
        rows.push(lgPctRow);

        // Row: Chi phí
        const cpRow = { label: 'Chi Phí (Tr đ)', values: [], total: '' };
        let sumCP = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) {
                const val = c.actual_cp !== undefined ? c.actual_cp : c.cp;
                cpRow.values.push(fN(val));
                sumCP += val;
            } else cpRow.values.push('—');
        });
        cpRow.total = fN(sumCP);
        rows.push(cpRow);

        // Row: Lợi nhuận TT
        const lnRow = { label: 'Lợi Nhuận TT (Tr đ)', values: [], total: '' };
        let sumLN = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) {
                const val = c.actual_lntt !== undefined ? c.actual_lntt : c.lntt;
                lnRow.values.push(fN(val));
                sumLN += val;
            } else lnRow.values.push('—');
        });
        lnRow.total = fN(sumLN);
        rows.push(lnRow);

        // Category: TỒN KHO & CÔNG NỢ
        rows.push({ category: '📦 TỒN KHO & CÔNG NỢ' });

        const invBreakdown = {
            'all':    { normal: 74.12, project: 0.00, total: 74.12 },
            'THH':    { normal: 30.34, project: 0.00, total: 30.34 },
            'Viet':   { normal: 8.85,  project: 0.00, total: 8.85 },
            'XemSon': { normal: 26.37, project: 0.00, total: 26.37 },
            'VPSM':   { normal: 5.48,  project: 0.00, total: 5.48 },
            'ITSS':   { normal: 0.19,  project: 0.00, total: 0.19 },
            'VPVPS':  { normal: 2.91,  project: 0.00, total: 2.91 }
        };

        // Row 1: Tồn kho HĐKD Thường
        const invNormalRow = { label: 'Tồn Kho HĐKD Thường (Tỷ đ)', values: [], total: '' };
        let sumInvNormal = 0;
        invKeys.forEach(k => {
            const c = invBreakdown[k] || { normal: 0 };
            invNormalRow.values.push(c.normal > 0 ? c.normal.toFixed(2) : '-');
            sumInvNormal += c.normal;
        });
        invNormalRow.total = sumInvNormal > 0 ? sumInvNormal.toFixed(2) : '-';
        rows.push(invNormalRow);

        // Row 2: Tồn kho Dự Án
        const invProjectRow = { label: 'Tồn Kho Dự Án (Tỷ đ)', values: [], total: '', colorType: 'pct' };
        let sumInvProject = 0;
        invKeys.forEach(k => {
            const c = invBreakdown[k] || { project: 0 };
            invProjectRow.values.push(c.project > 0 ? c.project.toFixed(2) : '-');
            sumInvProject += c.project;
        });
        invProjectRow.total = sumInvProject > 0 ? sumInvProject.toFixed(2) : '-';
        rows.push(invProjectRow);

        // Row 3: Tổng Tồn Kho
        const invRow = { label: 'Tổng Tồn Kho (Tỷ đ)', values: [], total: '', bold: true };
        let sumInv = 0;
        invKeys.forEach(k => {
            const c = invBreakdown[k] || { total: 0 };
            invRow.values.push(c.total > 0 ? c.total.toFixed(2) : '-');
            sumInv += c.total;
        });
        invRow.total = sumInv > 0 ? sumInv.toFixed(2) : '-';
        rows.push(invRow);

        // Row: Công nợ Quá hạn
        const debtRow1 = { label: 'CN Quá hạn (Tỷ đ)', values: [], total: '', colorType: 'debt' };
        let sumOverdue = 0;
        debtKeys.forEach(k => {
            const c = debt[k] || (debt.byCompany && debt.byCompany[k]) || (k === 'VPVPS' ? debt['Văn phòng VPS'] : null);
            if (c && typeof c.overdue === 'number') { debtRow1.values.push(c.overdue.toFixed(2)); sumOverdue += c.overdue; }
            else debtRow1.values.push('—');
        });
        debtRow1.total = sumOverdue.toFixed(2);
        rows.push(debtRow1);

        // Row: Công nợ Khó đòi
        const debtRow2 = { label: 'CN Khó đòi (Tỷ đ)', values: [], total: '', colorType: 'debt' };
        let sumBad = 0;
        debtKeys.forEach(k => {
            const c = debt[k] || (debt.byCompany && debt.byCompany[k]) || (k === 'VPVPS' ? debt['Văn phòng VPS'] : null);
            if (c && typeof c.bad === 'number') { debtRow2.values.push(c.bad.toFixed(2)); sumBad += c.bad; }
            else debtRow2.values.push('—');
        });
        debtRow2.total = sumBad.toFixed(2);
        rows.push(debtRow2);

        // Category: KHÁCH HÀNG & ISO
        rows.push({ category: '📋 KHÁCH HÀNG & ISO' });

        // Row: KH Hiện có
        const custRow = { label: 'Khách Hàng Hiện Có', values: [], total: '' };
        let sumCust = 0;
        custKeys.forEach(k => {
            const c = cust[k];
            if (c) {
                const total = c.service + c.rental + c.distribution;
                custRow.values.push(fN(total));
                sumCust += total;
            } else custRow.values.push('—');
        });
        custRow.total = fN(sumCust);
        rows.push(custRow);

        // Row: ISO
        const isoRow = { label: 'ISO (QT / QĐ)', values: [], total: '' };
        let sumIsoQT = 0, sumIsoQD = 0;
        isoNames.forEach(name => {
            const c = iso.find(x => x.name === name);
            if (c) { isoRow.values.push(`${c.qt}/${c.qd}`); sumIsoQT += c.qt; sumIsoQD += c.qd; }
            else isoRow.values.push('—');
        });
        isoRow.total = `${sumIsoQT}/${sumIsoQD}`;
        rows.push(isoRow);

        // Render HTML
        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : true;
        const allowedComp = window.AuthService ? window.AuthService.getAllowedCompany() : 'all';
        const isUnitOnly = !canViewAll;

        const table = document.getElementById('sc-matrix-table');
        const thead = table ? table.querySelector('thead') : null;

        if (isUnitOnly) {
            // Find unit index in keys array ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS']
            let unitIndex = 0;
            if (allowedComp.includes('Việt') || allowedComp === 'VIET') unitIndex = 1;
            else if (allowedComp.includes('Xem') || allowedComp === 'XESCO' || allowedComp === 'XEMSON') unitIndex = 2;
            else if (allowedComp.includes('VPS M') || allowedComp === 'VPSM') unitIndex = 3;
            else if (allowedComp.includes('ITSS')) unitIndex = 4;
            else if (allowedComp.includes('Văn phòng') || allowedComp === 'VPVPS') unitIndex = 5;

            if (thead) {
                thead.innerHTML = `
                    <tr>
                        <th style="width: 42%; text-align: left;">Chỉ Tiêu Đo Lường</th>
                        <th style="width: 28%; text-align: center;">${allowedComp}</th>
                        <th style="width: 30%; text-align: center;">Tình Trạng</th>
                    </tr>
                `;
            }

            let html = '';
            rows.forEach(row => {
                if (row.category) {
                    html += `<tr class="sc-row-category"><td colspan="3">${row.category}</td></tr>`;
                    return;
                }
                const val = row.values[unitIndex];
                const cls = this.getCellClass(val, row.colorType);
                const displayVal = (row.colorType === 'pct' || row.colorType === 'lg') ? (val !== '—' ? val + '%' : '—') : val;

                let statusBadge = '—';
                const n = parseFloat(val);
                if (!isNaN(n)) {
                    if (row.colorType === 'pct') {
                        statusBadge = n >= 80 ? '<span class="sc-legend-dot green"></span> Đạt tốt' : (n >= 50 ? '<span class="sc-legend-dot yellow"></span> Trung bình' : '<span class="sc-legend-dot red"></span> Cần cải thiện');
                    } else if (row.colorType === 'lg') {
                        statusBadge = n >= 20 ? '<span class="sc-legend-dot green"></span> Tốt' : (n >= 15 ? '<span class="sc-legend-dot yellow"></span> Trung bình' : '<span class="sc-legend-dot red"></span> Thấp');
                    } else if (row.colorType === 'debt') {
                        statusBadge = n <= 0.5 ? '<span class="sc-legend-dot green"></span> An toàn' : (n <= 2 ? '<span class="sc-legend-dot yellow"></span> Cần đôn đốc' : '<span class="sc-legend-dot red"></span> Rủi ro');
                    } else {
                        statusBadge = '<span style="color:#0284c7;font-weight:600;">Bình thường</span>';
                    }
                }

                html += '<tr>';
                html += `<td style="font-weight:600;">${row.label}</td>`;
                html += `<td class="${cls}" style="text-align:center; font-weight:700; font-size:0.95rem;">${displayVal}</td>`;
                html += `<td style="text-align:center; font-size:0.85rem;">${statusBadge}</td>`;
                html += '</tr>';
            });
            body.innerHTML = html;
        } else {
            // Admin & CEO: full matrix
            if (thead) {
                thead.innerHTML = `
                    <tr>
                        <th>Chỉ Tiêu</th>
                        <th>Tân Hồng Hà</th>
                        <th>Việt</th>
                        <th>Xem Sơn</th>
                        <th>VPSM</th>
                        <th>ITSS</th>
                        <th>VP VPS</th>
                        <th>TỔNG</th>
                    </tr>
                `;
            }

            let html = '';
            rows.forEach(row => {
                if (row.category) {
                    html += `<tr class="sc-row-category"><td colspan="8">${row.category}</td></tr>`;
                    return;
                }
                html += '<tr>';
                html += `<td>${row.label}</td>`;
                row.values.forEach(val => {
                    const cls = this.getCellClass(val, row.colorType);
                    const displayVal = row.colorType === 'pct' || row.colorType === 'lg' ? (val !== '—' ? val + '%' : '—') : val;
                    html += `<td class="${cls}">${displayVal}</td>`;
                });
                const totalCls = this.getCellClass(row.total, row.colorType);
                const totalDisplay = (row.colorType === 'pct' || row.colorType === 'lg') && row.total !== '—' ? row.total + '%' : row.total;
                html += `<td class="${totalCls}" style="font-weight:800;">${totalDisplay}</td>`;
                html += '</tr>';
            });

            body.innerHTML = html;
        }
    },

    getCellClass(val, type) {
        if (!type || val === '—' || val === undefined) return '';
        const n = parseFloat(val);
        if (isNaN(n)) return '';

        if (type === 'pct') {
            if (n >= 80) return 'sc-cell-green';
            if (n >= 50) return 'sc-cell-yellow';
            return 'sc-cell-red';
        }
        if (type === 'lg') {
            if (n >= 20) return 'sc-cell-green';
            if (n >= 15) return 'sc-cell-yellow';
            return 'sc-cell-red';
        }
        if (type === 'debt') {
            if (n <= 0.5) return 'sc-cell-green';
            if (n <= 2) return 'sc-cell-yellow';
            return 'sc-cell-red';
        }
        return '';
    },

    // ======= 3. Render 3 Comparison Charts =======
    renderCharts(d) {
        if (typeof Chart === 'undefined') {
            console.warn('[Overview] Chart.js not loaded yet');
            return;
        }

        const fallbackHR = {
            'THH': { quota: 54, official: 47 },
            'Viet': { quota: 43, official: 39 },
            'XemSon': { quota: 98, official: 91 },
            'VPSM': { quota: 15, official: 10 },
            'ITSS': { quota: 15, official: 13 },
            'VPVPS': { quota: 25, official: 19 },
            'Văn phòng VPS': { quota: 25, official: 19 }
        };

        const fallbackPlan = {
            'THH': { ds: 17010, actual: 10096, ttlg: 1910, cp: 1392 },
            'Viet': { ds: 8779, actual: 7715, ttlg: 1697, cp: 1265 },
            'XemSon': { ds: 14000, actual: 15102, ttlg: 4020, cp: 2190 },
            'VPSM': { ds: 2000, actual: 1686, ttlg: 320, cp: 266 },
            'ITSS': { ds: 2200, actual: 2350, ttlg: 658, cp: 480 },
            'VPVPS': { ds: 0, actual: 0, ttlg: 0, cp: 1250 },
            'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, cp: 1250 }
        };

        const hr = (d && d.hr && d.hr.byCompany) ? d.hr.byCompany : fallbackHR;
        const rev = (d && d.revenue && d.revenue.plan2026) ? d.revenue.plan2026 : fallbackPlan;

        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : true;
        const allowedComp = window.AuthService ? window.AuthService.getAllowedCompany() : 'all';
        const isUnitOnly = !canViewAll;

        const compKeyMap = {
            'Tân Hồng Hà': { key: 'THH', label: 'Tân Hồng Hà' },
            'THH': { key: 'THH', label: 'Tân Hồng Hà' },
            'Việt': { key: 'Viet', label: 'Việt' },
            'VIET': { key: 'Viet', label: 'Việt' },
            'Xem Sơn': { key: 'XemSon', label: 'Xem Sơn' },
            'XESCO': { key: 'XemSon', label: 'Xem Sơn' },
            'XEMSON': { key: 'XemSon', label: 'Xem Sơn' },
            'VPS M': { key: 'VPSM', label: 'VPS M' },
            'VPSM': { key: 'VPSM', label: 'VPS M' },
            'ITSS': { key: 'ITSS', label: 'ITSS' },
            'Văn phòng VPS': { key: 'VPVPS', label: 'VP VPS' },
            'VPVPS': { key: 'VPVPS', label: 'VP VPS' }
        };

        const activeInfo = compKeyMap[allowedComp] || { key: 'THH', label: allowedComp };

        const labels = isUnitOnly ? [activeInfo.label] : ['THH', 'Việt', 'Xem Sơn', 'VPSM', 'ITSS', 'VP VPS'];
        const hrKeys = isUnitOnly ? [activeInfo.key] : ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const revKeys = isUnitOnly ? [activeInfo.key] : ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];

        const hrTitle = document.querySelector('#view-overview .sc-chart-card:nth-child(1) h3');
        const revTitle = document.querySelector('#view-overview .sc-chart-card:nth-child(2) h3');
        const profitTitle = document.querySelector('#view-overview .sc-chart-card:nth-child(3) h3');
        if (isUnitOnly) {
            if (hrTitle) hrTitle.innerHTML = `<i data-lucide="users" style="width:16px;height:16px;margin-right:6px;color:#e74c3c;"></i> Nhân Sự - ${activeInfo.label}`;
            if (revTitle) revTitle.innerHTML = `<i data-lucide="bar-chart-2" style="width:16px;height:16px;margin-right:6px;color:#10b981;"></i> Doanh Số KH vs Thực Tế - ${activeInfo.label}`;
            if (profitTitle) profitTitle.innerHTML = `<i data-lucide="trending-up" style="width:16px;height:16px;margin-right:6px;color:#8b5cf6;"></i> Lãi Gộp & Chi Phí - ${activeInfo.label}`;
        } else {
            if (hrTitle) hrTitle.innerHTML = `<i data-lucide="users" style="width:16px;height:16px;margin-right:6px;color:#e74c3c;"></i> Nhân Sự theo Đơn Vị`;
            if (revTitle) revTitle.innerHTML = `<i data-lucide="bar-chart-2" style="width:16px;height:16px;margin-right:6px;color:#10b981;"></i> Doanh Số KH vs Thực Tế`;
            if (profitTitle) profitTitle.innerHTML = `<i data-lucide="trending-up" style="width:16px;height:16px;margin-right:6px;color:#8b5cf6;"></i> Lãi Gộp & Chi Phí`;
        }
        if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();

        // Chart 1: HR — Stacked bar (Chính thức vs Thiếu hụt)
        try {
            const hrOfficial = [], hrVacancy = [];
            hrKeys.forEach(k => {
                const c = hr[k] || hr['Văn phòng VPS'] || fallbackHR[k];
                if (c) {
                    const off = Number(c.official) || 0;
                    const quo = Number(c.quota) || 0;
                    hrOfficial.push(off);
                    hrVacancy.push(Math.max(0, quo - off));
                } else {
                    hrOfficial.push(0); hrVacancy.push(0);
                }
            });
            this.createChart('scChartHR', 'bar', {
                labels,
                datasets: [
                    { label: 'Chính thức', data: hrOfficial, backgroundColor: '#2E86AB', borderRadius: 4 },
                    { label: 'Thiếu hụt', data: hrVacancy, backgroundColor: '#fca5a5', borderRadius: 4 }
                ]
            }, {
                responsive: true, maintainAspectRatio: false,
                scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Người' } } },
                plugins: {
                    legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, weight: 'bold' } } },
                    datalabels: { display: false }
                }
            });
        } catch (e1) {
            console.error('[Overview] Error creating scChartHR:', e1);
        }

        // Chart 2: Revenue — Grouped bar (KH vs TT)
        try {
            const revPlan = [], revActual = [];
            revKeys.forEach(k => {
                const c = rev[k] || (k === 'VPVPS' ? rev['Văn phòng VPS'] : null) || fallbackPlan[k];
                if (c) {
                    revPlan.push(Number(c.ds) || 0);
                    revActual.push(Number(c.actual) || 0);
                } else {
                    revPlan.push(0); revActual.push(0);
                }
            });
            this.createChart('scChartRevenue', 'bar', {
                labels,
                datasets: [
                    { label: 'Kế Hoạch', data: revPlan, backgroundColor: '#94a3b8', borderRadius: 4 },
                    { label: 'Thực Tế', data: revActual, backgroundColor: '#10b981', borderRadius: 4 }
                ]
            }, {
                responsive: true, maintainAspectRatio: false,
                scales: { y: { beginAtZero: true, grace: '15%', title: { display: true, text: 'Tr đ' } } },
                plugins: {
                    legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, weight: 'bold' } } },
                    datalabels: {
                        anchor: 'end', align: 'top', color: '#1e293b', font: { size: 9, weight: 'bold' },
                        formatter: (val) => val > 0 ? (val / 1000).toFixed(0) + 'T' : ''
                    }
                }
            });
        } catch (e2) {
            console.error('[Overview] Error creating scChartRevenue:', e2);
        }

        // Chart 3: Profit — Horizontal bar (Lãi Gộp vs Chi Phí)
        try {
            const profitLG = [], profitCP = [];
            revKeys.forEach(k => {
                const c = rev[k] || (k === 'VPVPS' ? rev['Văn phòng VPS'] : null) || fallbackPlan[k];
                if (c) {
                    profitLG.push(Number(c.ttlg) || 0);
                    profitCP.push(Number(c.cp) || 0);
                } else {
                    profitLG.push(0); profitCP.push(0);
                }
            });
            this.createChart('scChartProfit', 'bar', {
                labels,
                datasets: [
                    { label: 'Lãi Gộp', data: profitLG, backgroundColor: '#8b5cf6', borderRadius: 4 },
                    { label: 'Chi Phí', data: profitCP, backgroundColor: '#f97316', borderRadius: 4 }
                ]
            }, {
                indexAxis: 'y',
                responsive: true, maintainAspectRatio: false,
                scales: { x: { beginAtZero: true, title: { display: true, text: 'Tr đ' } } },
                plugins: {
                    legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11, weight: 'bold' } } },
                    datalabels: {
                        anchor: 'end', align: 'end', color: '#1e293b', font: { size: 9, weight: 'bold' },
                        formatter: (val) => val > 0 ? (val / 1000).toFixed(0) + 'T' : ''
                    }
                }
            });
        } catch (e3) {
            console.error('[Overview] Error creating scChartProfit:', e3);
        }
    },

    // ======= 4. Render YoY Chart (kept from original) =======
    renderYoYChart(d) {
        if (typeof Chart === 'undefined') return;

        try {
            const defaultMonthly = {
                currentYear: [30, 45, 42, 50, 48, 55, 60, 65, 58, 62, 70, 75],
                previousYear: [25, 40, 38, 48, 45, 52, 58, 62, 55, 65, 70, 80]
            };
            const revenue = d && d.revenue ? d.revenue : {};
            const mc = revenue.monthlyComparison || defaultMonthly;
            const currentYearData = (mc.currentYear && mc.currentYear.some(v => v > 0)) ? mc.currentYear : defaultMonthly.currentYear;
            const previousYearData = (mc.previousYear && mc.previousYear.some(v => v > 0)) ? mc.previousYear : defaultMonthly.previousYear;

            this.createChart('revenueComparisonChart', 'bar', {
                labels: ['Th 1', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'Th 8', 'Th 9', 'Th 10', 'Th 11', 'Th 12'],
                datasets: [
                    { label: 'Năm Nay (2026)', data: currentYearData, backgroundColor: '#007BFF', borderRadius: 4 },
                    { label: 'Năm Ngoái (2025)', data: previousYearData, backgroundColor: '#6C757D', borderRadius: 4 }
                ]
            }, {
                responsive: true, maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true, title: { display: true, text: 'Tỷ VNĐ' }, grace: '15%' }
                },
                plugins: {
                    legend: { position: 'top', labels: { font: { weight: 'bold' } } },
                    tooltip: { mode: 'index', intersect: false },
                    datalabels: {
                        color: '#000000', font: { weight: 'bold', size: 10 },
                        anchor: 'end', align: 'top',
                        formatter: (value) => value === 0 ? '' : value
                    }
                }
            });
        } catch (e4) {
            console.error('[Overview] Error creating revenueComparisonChart:', e4);
        }
    },

    // ======= Helpers =======
    createChart(canvasId, type, data, options) {
        // Destroy existing chart if any
        if (this.charts[canvasId]) {
            try { this.charts[canvasId].destroy(); } catch (e) {}
        }
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        // Safely resolve ChartDataLabels plugin
        const plugins = [];
        try {
            const dl = (typeof ChartDataLabels !== 'undefined' ? ChartDataLabels : (typeof window !== 'undefined' && window.ChartDataLabels ? window.ChartDataLabels : null));
            if (dl) plugins.push(dl);
        } catch (e) {}

        try {
            this.charts[canvasId] = new Chart(canvas, { type, data, options, plugins });
        } catch (err) {
            console.warn('[Overview] Error creating chart with datalabels, retrying without plugin:', canvasId, err);
            try {
                this.charts[canvasId] = new Chart(canvas, { type, data, options, plugins: [] });
            } catch (err2) {
                console.error('[Overview] Fatal error creating chart:', canvasId, err2);
            }
        }
    },

    setEl(id, text) {
        const el = document.getElementById(id);
        if (el) el.textContent = text;
    },

    setBadge(id, pct, suffix) {
        const el = document.getElementById(id);
        if (!el) return;
        const n = parseFloat(pct);
        el.textContent = n.toFixed(1) + (suffix || '');
        if (n >= 80) el.className = 'sc-kpi-badge badge-green';
        else if (n >= 50) el.className = 'sc-kpi-badge badge-yellow';
        else el.className = 'sc-kpi-badge badge-red';
    },

    setBar(id, pct, color) {
        const el = document.getElementById(id);
        if (el) {
            el.style.width = Math.min(pct, 100) + '%';
            el.style.background = color;
        }
    },

    fmtNum(n) {
        if (n === undefined || n === null) return '—';
        return n.toLocaleString('vi-VN');
    },

    fmtBillion(n) {
        // n is in Tr (millions) or just a number
        // inventory.total = 69183.27 (Ty VND) — already in Ty
        return n >= 1000 ? (n / 1000).toFixed(1) : n.toFixed(1);
    }
};
