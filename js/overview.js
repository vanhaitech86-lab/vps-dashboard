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
            'THH': { quota: 54, official: 48 },
            'Viet': { quota: 43, official: 38 },
            'XemSon': { quota: 98, official: 94 },
            'VPSM': { quota: 15, official: 10 },
            'ITSS': { quota: 12, official: 8 },
            'VPVPS': { quota: 25, official: 23 }
        };
        const fallbackPlan = {
            'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
            'THH': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
            'Viet': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
            'XemSon': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
            'VPSM': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
            'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
            'VPVPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
        };
        const hr = (d && d.hr && d.hr.byCompany) ? d.hr.byCompany : fallbackHR;
        const rev = (d && d.revenue && d.revenue.plan2026) ? d.revenue.plan2026 : fallbackPlan;
        const debt = (d && d.debt && d.debt.byCompany) ? d.debt : { total: 45.2, byCompany: {} };
        const inv = (d && d.inventory) ? d.inventory : { total: 69.2 };
        const iso = window.IsoModule ? window.IsoModule.summaryData : [];

        // --- HR ---
        let totalQuota = 0, totalOfficial = 0;
        for (const key of Object.keys(hr)) {
            if (key === 'Văn phòng VPS') continue; // avoid duplicate with VPVPS
            totalQuota += (hr[key].quota || 0);
            totalOfficial += (hr[key].official || 0);
        }
        const hrPct = totalQuota > 0 ? ((totalOfficial / totalQuota) * 100).toFixed(1) : 0;
        this.setEl('sc-hr-value', `${totalOfficial} / ${totalQuota}`);
        this.setEl('sc-hr-sub', `Lấp đầy: ${hrPct}%`);
        this.setBadge('sc-hr-badge', hrPct, '%');
        this.setBar('sc-hr-bar', hrPct, '#e74c3c');

        // --- Revenue ---
        const allRev = (rev && rev['all']) ? rev['all'] : fallbackPlan['all'];
        const revActual = ((allRev.actual || 0) / 1000).toFixed(1);
        const revPlan = ((allRev.ds || 0) / 1000).toFixed(1);
        const revPct = allRev.ds > 0 ? (((allRev.actual || 0) / allRev.ds) * 100).toFixed(1) : 0;
        this.setEl('sc-rev-value', `${this.fmtNum(allRev.actual || 0)} Tr`);
        this.setEl('sc-rev-sub', `KH: ${this.fmtNum(allRev.ds || 0)} Tr | Đạt ${revPct}%`);
        this.setBadge('sc-rev-badge', revPct, '%');
        this.setBar('sc-rev-bar', Math.min(revPct, 100), '#10b981');

        // --- Profit ---
        const profitVal = allRev.ttlg || 0;
        const profitPct = allRev.lg_pct || 0;
        this.setEl('sc-profit-value', `${this.fmtNum(profitVal)} Tr`);
        this.setEl('sc-profit-sub', `Tỷ lệ LG: ${profitPct}%`);
        this.setBadge('sc-profit-badge', profitPct > 15 ? 85 : profitPct > 10 ? 60 : 30, '%');
        this.setBar('sc-profit-bar', Math.min(profitPct * 4, 100), '#8b5cf6');

        // --- Inventory ---
        const invTotal = (inv.total || 69183.27).toFixed(1);
        this.setEl('sc-inv-value', `${this.fmtBillion(inv.total || 69183.27)} Tỷ`);
        this.setEl('sc-inv-sub', `Tổng giá trị tồn kho`);
        const invBadgeEl = document.getElementById('sc-inv-badge');
        if (invBadgeEl) { invBadgeEl.textContent = `${this.fmtBillion(inv.total || 69183.27)} Tỷ`; invBadgeEl.className = 'sc-kpi-badge badge-yellow'; }

        // --- Debt ---
        let debtTotal = 0, debtOverdue = 0, debtBad = 0;
        if (debt && debt.byCompany) {
            for (const [, v] of Object.entries(debt.byCompany)) {
                debtTotal += (v.current || 0) + (v.overdue || 0) + (v.bad || 0);
                debtOverdue += (v.overdue || 0);
                debtBad += (v.bad || 0);
            }
        }
        this.setEl('sc-debt-value', `${debtTotal.toFixed(1)} Tỷ`);
        this.setEl('sc-debt-sub', `Quá hạn: ${debtOverdue.toFixed(1)} | Khó đòi: ${debtBad.toFixed(1)}`);
        const debtBadgeEl = document.getElementById('sc-debt-badge');
        if (debtBadgeEl) { debtBadgeEl.textContent = `${debtBad.toFixed(1)} Tỷ khó đòi`; debtBadgeEl.className = `sc-kpi-badge ${debtBad > 3 ? 'badge-red' : debtBad > 1 ? 'badge-yellow' : 'badge-green'}`; }

        // --- ISO ---
        let totalQT = 0, totalQD = 0;
        iso.forEach(c => { totalQT += (c.qt || 0); totalQD += (c.qd || 0); });
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
            'THH': { quota: 54, official: 48 },
            'Viet': { quota: 43, official: 38 },
            'XemSon': { quota: 98, official: 94 },
            'VPSM': { quota: 15, official: 10 },
            'ITSS': { quota: 12, official: 8 },
            'VPVPS': { quota: 25, official: 23 }
        };
        const fallbackPlan = {
            'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
            'THH': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
            'Viet': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
            'XemSon': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
            'VPSM': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
            'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
            'VPVPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
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
        const revKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'Văn phòng VPS'];
        const debtKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'Văn phòng VPS'];
        const invKeys = ['THH', 'Viet', 'XemSon', 'VPSM', null, null];
        const custKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'Văn phòng VPS'];
        const isoNames = ['TÂN HỒNG HÀ', 'VIỆT', 'VPS', 'VPSM', 'ITSS', 'XESCO'];

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

        // Row: Lãi Gộp
        const lgRow = { label: 'Lãi Gộp (Tr đ)', values: [], total: '' };
        let sumLG = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) { lgRow.values.push(fN(c.ttlg)); sumLG += c.ttlg; }
            else lgRow.values.push('—');
        });
        lgRow.total = fN(sumLG);
        rows.push(lgRow);

        // Row: % Lãi Gộp
        const lgPctRow = { label: '% Lãi Gộp', values: [], total: '', colorType: 'lg' };
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) { lgPctRow.values.push(c.lg_pct); }
            else lgPctRow.values.push('—');
        });
        lgPctRow.total = rev['all'] ? rev['all'].lg_pct : '—';
        rows.push(lgPctRow);

        // Row: Chi phí
        const cpRow = { label: 'Chi Phí (Tr đ)', values: [], total: '' };
        let sumCP = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) { cpRow.values.push(fN(c.cp)); sumCP += c.cp; }
            else cpRow.values.push('—');
        });
        cpRow.total = fN(sumCP);
        rows.push(cpRow);

        // Row: Lợi nhuận TT
        const lnRow = { label: 'Lợi Nhuận TT (Tr đ)', values: [], total: '' };
        let sumLN = 0;
        revKeys.forEach(k => {
            const c = rev[k];
            if (c) { lnRow.values.push(fN(c.lntt)); sumLN += c.lntt; }
            else lnRow.values.push('—');
        });
        lnRow.total = fN(sumLN);
        rows.push(lnRow);

        // Category: TỒN KHO & CÔNG NỢ
        rows.push({ category: '📦 TỒN KHO & CÔNG NỢ' });

        // Row: Tồn kho
        const invRow = { label: 'Tồn Kho (Tỷ đ)', values: [], total: '' };
        let sumInv = 0;
        invKeys.forEach(k => {
            if (k && inv[k]) {
                const val = inv[k].categories.Tong.Cong / 1e9;
                invRow.values.push(val.toFixed(1));
                sumInv += val;
            } else {
                invRow.values.push('—');
            }
        });
        invRow.total = sumInv > 0 ? sumInv.toFixed(1) : (d.inventory.total / 1e3).toFixed(1);
        rows.push(invRow);

        // Row: Công nợ Quá hạn
        const debtRow1 = { label: 'CN Quá hạn (Tỷ đ)', values: [], total: '', colorType: 'debt' };
        let sumOverdue = 0;
        debtKeys.forEach(k => {
            const c = debt[k];
            if (c) { debtRow1.values.push(c.overdue.toFixed(1)); sumOverdue += c.overdue; }
            else debtRow1.values.push('—');
        });
        debtRow1.total = sumOverdue.toFixed(1);
        rows.push(debtRow1);

        // Row: Công nợ Khó đòi
        const debtRow2 = { label: 'CN Khó đòi (Tỷ đ)', values: [], total: '', colorType: 'debt' };
        let sumBad = 0;
        debtKeys.forEach(k => {
            const c = debt[k];
            if (c) { debtRow2.values.push(c.bad.toFixed(1)); sumBad += c.bad; }
            else debtRow2.values.push('—');
        });
        debtRow2.total = sumBad.toFixed(1);
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
            'THH': { quota: 54, official: 48 },
            'Viet': { quota: 43, official: 38 },
            'XemSon': { quota: 98, official: 94 },
            'VPSM': { quota: 15, official: 10 },
            'ITSS': { quota: 12, official: 8 },
            'VPVPS': { quota: 25, official: 23 },
            'Văn phòng VPS': { quota: 25, official: 23 }
        };

        const fallbackPlan = {
            'THH': { ds: 300000, actual: 68204, ttlg: 43080, cp: 24705 },
            'Viet': { ds: 106000, actual: 40891, ttlg: 22940, cp: 13932 },
            'XemSon': { ds: 168000, actual: 69426, ttlg: 43060, cp: 30618 },
            'VPSM': { ds: 45000, actual: 11251, ttlg: 8469, cp: 5390 },
            'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, cp: 2900 },
            'VPVPS': { ds: 10000, actual: 5000, ttlg: 2000, cp: 1500 },
            'Văn phòng VPS': { ds: 10000, actual: 5000, ttlg: 2000, cp: 1500 }
        };

        const hr = (d && d.hr && d.hr.byCompany) ? d.hr.byCompany : fallbackHR;
        const rev = (d && d.revenue && d.revenue.plan2026) ? d.revenue.plan2026 : fallbackPlan;
        const labels = ['THH', 'Việt', 'Xem Sơn', 'VPSM', 'ITSS', 'VP VPS'];
        const hrKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const revKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];

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
