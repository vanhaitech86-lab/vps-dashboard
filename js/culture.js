window.CultureModule = {
    chart: null,

    init() {
        this.renderChart();
        this.renderTable();
        document.addEventListener('vps_filter_changed', () => {
            this.renderChart();
            this.renderTable();
        });
    },

    getCompanyRates() {
        const defaultRates = {
            'THH':    [100, 100, 100, 100, 100, 100],
            'Viet':   [100, 100, 100, 100, 100, 100],
            'XemSon': [100, 100, 100, 100, 100, 100],
            'VPSM':   [100, 100, 100, 100, 100, 100],
            'ITSS':   [100, 100, 100, 100, 100, 100],
            'VPVPS':  [100, 100, 100, 100, 100, 100]
        };
        if (window.mockData && window.mockData.culture_data) {
            Object.keys(window.mockData.culture_data).forEach(k => {
                if (window.mockData.culture_data[k] && window.mockData.culture_data[k].length > 0) {
                    defaultRates[k] = window.mockData.culture_data[k];
                }
            });
        }
        return defaultRates;
    },

    renderTable() {
        const rates = this.getCompanyRates();
        const rows = document.querySelectorAll('#view-culture table.data-table tbody tr');
        if (!rows || rows.length === 0) return;

        const order = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        for (let r = 0; r < Math.min(rows.length, 6); r++) {
            const tr = rows[r];
            order.forEach((cId, colOffset) => {
                const td = tr.children[3 + colOffset];
                if (td) {
                    const val = rates[cId] && rates[cId][r] !== undefined ? rates[cId][r] : 100;
                    td.textContent = val + '%';
                    td.style.color = val >= 100 ? '#27ae60' : (val >= 80 ? '#f39c12' : '#e74c3c');
                }
            });
        }
    },

    renderChart() {
        const canvas = document.getElementById('culturePieChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (this.chart) {
            this.chart.destroy();
        }

        const rates = this.getCompanyRates();
        const order = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        const labels = ['Tân Hồng Hà', 'Việt', 'Xemson', 'VPS M', 'ITSS', 'VP VPS'];
        
        // Calculate average score for each unit
        const avgScores = order.map(cId => {
            const arr = rates[cId] || [100, 100, 100, 100, 100, 100];
            const sum = arr.reduce((s, v) => s + (parseFloat(v) || 0), 0);
            return parseFloat((sum / (arr.length || 6)).toFixed(1));
        });

        const totalScore = avgScores.reduce((s, v) => s + v, 0) || 600;
        const data = avgScores.map(s => parseFloat(((s / totalScore) * 100).toFixed(2)));

        const colors = [
            '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#34495e'
        ];

        this.chart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors,
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            font: { size: 12 },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const idx = context.dataIndex;
                                return ' ' + context.label + ': ' + avgScores[idx] + '% đạt (' + context.raw + '% tỷ trọng)';
                            }
                        }
                    }
                }
            }
        });
    }
};
