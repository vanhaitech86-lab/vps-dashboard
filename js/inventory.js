/**
 * Inventory Module
 */

window.InventoryModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.loadData(e.detail.period, e.detail.company);
        });
    },

    async loadData(period, company) {
        const invData = await window.DataService.getInventoryData(period, company);
        this.updateUI(invData, company);
    },

    updateUI(invData, company) {
        if(!invData || !invData.byCompany) return;
        
        let compData = invData.byCompany[company];
        if(!compData) {
            compData = {
                brands: { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0 },
                categories: {
                    'Máy': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Option/phần mềm': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Consumable': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Part': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Khác': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Tổng cộng': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 }
                }
            };
        }

        const totalNum = compData.categories['Tổng cộng']['Cộng'];
        document.getElementById('inventory-total-val').innerText = (totalNum / 1000000000).toLocaleString(undefined, {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' Tỷ VNĐ';

        const brands = Object.keys(compData.brands);
        const brandValues = Object.values(compData.brands);
        
        const chartData = {
            labels: brands,
            datasets: [{
                data: brandValues,
                backgroundColor: ['#2563eb', '#16a34a', '#ca8a04', '#0891b2', '#64748b'],
                borderWidth: 1
            }]
        };

        const ctx = document.getElementById('inventoryChart');
        if (ctx) {
            window.ChartManager.renderChart(ctx, 'doughnut', chartData, {
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.raw !== null) {
                                    label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' VNĐ';
                                }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: { weight: 'bold' },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => { sum += data; });
                            if(sum === 0) return '0%';
                            let percentage = (value * 100 / sum).toFixed(1) + "%";
                            return percentage;
                        }
                    }
                }
            });
        }

        const tbody = document.querySelector('#inventoryTable tbody');
        if (tbody) {
            let html = '';
            for(const cat of ['Máy', 'Option/phần mềm', 'Consumable', 'Part', 'Khác']) {
                const cData = compData.categories[cat];
                html += `<tr>
                    <td>${cat}</td>
                    <td style="text-align: right;">${cData['HP'] ? cData['HP'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">${cData['Fujifilm'] ? cData['Fujifilm'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">${cData['Olivetti'] ? cData['Olivetti'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">${cData['Bonsai'] ? cData['Bonsai'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">${cData['Khác'] ? cData['Khác'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; background: rgba(0,0,0,0.02); font-weight: bold;">${cData['Cộng'] ? cData['Cộng'].toLocaleString('vi-VN') : '-'}</td>
                </tr>`;
            }
            
            const tData = compData.categories['Tổng cộng'];
            html += `<tr style="font-weight: bold; background: #e2e8f0; border-top: 2px solid #cbd5e1;">
                <td>TỔNG CỘNG</td>
                <td style="text-align: right;">${tData['HP'] ? tData['HP'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right;">${tData['Fujifilm'] ? tData['Fujifilm'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right;">${tData['Olivetti'] ? tData['Olivetti'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right;">${tData['Bonsai'] ? tData['Bonsai'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right;">${tData['Khác'] ? tData['Khác'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right; color: #b91c1c;">${tData['Cộng'] ? tData['Cộng'].toLocaleString('vi-VN') : '-'}</td>
            </tr>`;
            
            tbody.innerHTML = html;
        }
    }
};
