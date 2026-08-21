window.CultureModule = {
    chart: null,

    init() {
        this.renderChart();
    },

    renderChart() {
        const canvas = document.getElementById('culturePieChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Destroy existing chart if any
        if (this.chart) {
            this.chart.destroy();
        }

        const data = [16.67, 16.67, 16.67, 16.67, 16.67, 16.65];
        const labels = ['Tân Hồng Hà', 'Việt', 'Xemson', 'VPS M', 'ITSS', 'VP VPS'];
        
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
                                return ' ' + context.label + ': ' + context.raw + '%';
                            }
                        }
                    }
                }
            }
        });
    }
};
