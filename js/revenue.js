/**
 * Revenue Module
 */

window.RevenueModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.loadData(e.detail.period, e.detail.company);
        });
    },

    async loadData(period, company) {
        const data = await window.DataService.getRevenueData(period, company);
        this.updateUI(data, company);
    },

    updateUI(data, company) {
        
        const companyNameMap = {
            'all': 'Tất cả',
            'THH': 'Tân Hồng Hà',
            'Viet': 'Việt',
            'XemSon': 'Xem Sơn',
            'VPSM': 'VPS M',
            'ITSS': 'ITSS',
            'VPVPS': 'Văn phòng VPS'
        };

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
                return isPercent ? val + '%' : Number(val).toLocaleString();
            };

            const calcPct = (th, kh, isExpense = false) => {
                if (!kh || kh <= 0) {
                    return { text: '-', color: '#666' };
                }
                if (!th || th <= 0) {
                    return { text: '0%', color: '#dc2626' };
                }
                const pct = (th / kh) * 100;
                const text = pct.toFixed(1) + '%';
                if (isExpense) {
                    // Chi phí thấp hơn kế hoạch là tốt
                    return {
                        text,
                        color: pct <= 100 ? '#16a34a' : (pct <= 115 ? '#ca8a04' : '#dc2626')
                    };
                }
                return {
                    text,
                    color: pct >= 100 ? '#16a34a' : (pct >= 50 ? '#ca8a04' : '#dc2626')
                };
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
                        
                        <!-- DOANH SO -->
                        <td style="text-align: right; background: rgba(0,0,0,0.02);">${fmtVal(p.ds)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">${fmtVal(p.actual)}</td>
                        <td style="text-align: right; font-weight: bold; background: rgba(0,0,0,0.02); color: ${ds_pct.color};">${ds_pct.text}</td>
                        
                        <!-- TT LAI GOP -->
                        <td style="text-align: right;">${fmtVal(p.ttlg)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500;">${fmtVal(p.actual_ttlg)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${ttlg_pct.color};">${ttlg_pct.text}</td>
                        
                        <!-- % LAI GOP -->
                        <td style="text-align: right; background: rgba(0,0,0,0.02);">${fmtVal(p.lg_pct, true)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">${fmtVal(p.actual_lg_pct, true)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${lg_pct.color}; background: rgba(0,0,0,0.02);">${lg_pct.text}</td>
                        
                        <!-- % CP/LG -->
                        <td style="text-align: right;">${fmtVal(p.cp_lg_pct, true)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500;">${fmtVal(p.actual_cp_lg_pct, true)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${cp_lg_pct.color};">${cp_lg_pct.text}</td>
                        
                        <!-- CHI PHI -->
                        <td style="text-align: right; background: rgba(0,0,0,0.02);">${fmtVal(p.cp)}</td>
                        <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">${fmtVal(p.actual_cp)}</td>
                        <td style="text-align: right; font-weight: bold; color: ${cp_pct.color}; background: rgba(0,0,0,0.02);">${cp_pct.text}</td>
                        
                        <!-- LNTT -->
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
                if (p) {
                    html += renderRow(company, p);
                }
            }
            tbody.innerHTML = html;
        }
    }
};

