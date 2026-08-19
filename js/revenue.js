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
    }
};
