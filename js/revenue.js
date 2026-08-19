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
        let labels = [], actualData = [], planData = [];
        
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(data.byCompany)) {
                labels.push(compName);
                actualData.push(compData.actual);
                planData.push(compData.plan);
            }
        } else {
            const compData = data.byCompany[company];
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
            const renderRow = (name, p) => `
                                                <tr ${name === 'TẬP ĐOÀN VPS' || name === 'all' ? 'style="font-weight: bold; background: #e2e8f0;"' : ''}>
                    <td>${name === 'all' ? 'TẬP ĐOÀN VPS' : name}</td>
                    
                    <!-- DOANH SO -->
                    <td style="text-align: right; background: rgba(0,0,0,0.02);">${p.ds ? p.ds.toLocaleString() : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">${p.actual ? p.actual.toLocaleString() : '-'}</td>
                    <td style="text-align: right; font-weight: bold; background: rgba(0,0,0,0.02); color: ${p.actual && p.ds && (p.actual/p.ds) >= 1 ? '#16a34a' : (p.actual && p.ds && (p.actual/p.ds) >= 0.5 ? '#ca8a04' : '#dc2626')};">${p.actual && p.ds ? ((p.actual/p.ds)*100).toFixed(1) + '%' : '0%'}</td>
                    
                    <!-- TT LAI GOP -->
                    <td style="text-align: right;">${p.ttlg ? p.ttlg.toLocaleString() : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500;">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626;">0%</td>
                    
                    <!-- % LAI GOP -->
                    <td style="text-align: right; background: rgba(0,0,0,0.02);">${p.lg_pct ? p.lg_pct + '%' : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626; background: rgba(0,0,0,0.02);">0%</td>
                    
                    <!-- % CP/LG -->
                    <td style="text-align: right;">${p.cp_lg_pct ? p.cp_lg_pct + '%' : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500;">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626;">0%</td>
                    
                    <!-- CHI PHI -->
                    <td style="text-align: right; background: rgba(0,0,0,0.02);">${p.cp ? p.cp.toLocaleString() : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626; background: rgba(0,0,0,0.02);">0%</td>
                    
                    <!-- LNTT -->
                    <td style="text-align: right;">${p.lntt ? p.lntt.toLocaleString() : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500;">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626;">0%</td>
                </tr>
            `;

            if (company === 'all') {
                html += renderRow('TẬP ĐOÀN VPS', data.plan2026['all']);
                for (const [compName, p] of Object.entries(data.plan2026)) {
                    if (compName !== 'all' && compName !== 'Văn phòng VPS') {
                        html += renderRow(compName, p);
                    }
                }
            } else {
                const p = data.plan2026[company];
                if (p) {
                    html += renderRow(company, p);
                }
            }
            tbody.innerHTML = html;
        }
    }
};

