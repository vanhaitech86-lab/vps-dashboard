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

        // Biểu đồ So sánh Doanh số (Năm Nay vs Năm Ngoái)
        let currentYearData = [];
        let previousYearData = [];
        
        if (data.monthlyComparison) {
            currentYearData = data.monthlyComparison.currentYear;
            previousYearData = data.monthlyComparison.previousYear;
        }

        const comparisonChartData = {
            labels: ['Th 1', 'Th 2', 'Th 3', 'Th 4', 'Th 5', 'Th 6', 'Th 7', 'Th 8', 'Th 9', 'Th 10', 'Th 11', 'Th 12'],
            datasets: [
                {
                    label: 'Năm Nay (2026)',
                    data: currentYearData,
                    backgroundColor: '#007BFF',
                    borderRadius: 4
                },
                {
                    label: 'Năm Ngoái (2025)',
                    data: previousYearData,
                    backgroundColor: '#6C757D',
                    borderRadius: 4
                }
            ]
        };

        window.ChartManager.createChart('revenueComparisonChart', 'bar', comparisonChartData, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { beginAtZero: true, title: { display: true, text: 'Tỷ VNĐ' } }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false }
            }
        });
    }
};
