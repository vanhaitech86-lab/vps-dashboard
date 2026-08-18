/**
 * Overview Module
 */

window.OverviewModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            if (document.getElementById('view-overview').classList.contains('hidden') === false) {
                this.loadData(e.detail.period, e.detail.company);
            }
        });

        // Add listener for when view becomes active
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if(item.dataset.target === 'overview') {
                    const currentCompany = window.FilterManager.currentCompany;
                    const currentPeriod = window.FilterManager.currentPeriod;
                    this.loadData(currentPeriod, currentCompany);
                }
            });
        });
    },

    async loadData(period, company) {
        // Fetch all 3 datasets
        const [customers, revenue, inventory] = await Promise.all([
            window.DataService.getCustomersData(period, company),
            window.DataService.getRevenueData(period, company),
            window.DataService.getInventoryData(period, company)
        ]);

        this.updateUI(customers, revenue, inventory, company);
    },

    updateUI(customers, revenue, debt, company) {
        // --- 1. Customers ---
        let custLabels = ['Dịch vụ', 'Thuê máy', 'Phân phối'], custData = [];
        let tCust=0, tNew=0, tDec=0, tLost=0;
        let tService = 0, tRental = 0, tDistribution = 0;
        
        if (company === 'all') {
            tCust = customers.total;
            tNew = customers.trend.new;
            tDec = customers.trend.decreased;
            tLost = customers.trend.lost;
            for (const [compName, compData] of Object.entries(customers.byCompany)) {
                tService += compData.service;
                tRental += compData.rental;
                tDistribution += compData.distribution;
            }
            custData = [tService, tRental, tDistribution];
        } else {
            const compData = customers.byCompany[company];
            if(compData) {
                tCust = compData.service + compData.rental + compData.distribution;
                tNew = compData.new;
                tDec = compData.decreased;
                tLost = compData.lost;
                custData = [compData.service, compData.rental, compData.distribution];
            }
        }
        
        document.getElementById('ov-cust-total').textContent = tCust.toLocaleString();
        document.getElementById('ov-cust-new').textContent = "+" + tNew.toLocaleString();
        document.getElementById('ov-cust-decreased').textContent = tDec.toLocaleString();
        document.getElementById('ov-cust-lost').textContent = tLost.toLocaleString();

        window.ChartManager.createChart('overviewCustomersChart', 'doughnut', {
            labels: custLabels,
            datasets: [{
                data: custData,
                backgroundColor: ['#1B2A4A', '#2E86AB', '#FFC107']
            }]
        }, {
            plugins: {
                datalabels: {
                    color: '#fff',
                    font: { weight: 'bold', size: 10 },
                    formatter: function(value, context) {
                        return context.chart.data.labels[context.dataIndex] + '\n' + value.toLocaleString();
                    },
                    textAlign: 'center'
                }
            }
        });

        // --- 2. Revenue ---
        let revLabels = [], revActualData = [], revPlanData = [];
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(revenue.byCompany)) {
                revLabels.push(compName);
                revActualData.push(compData.actual);
                revPlanData.push(compData.plan);
            }
        } else {
            if(revenue.byCompany[company]) {
                revLabels = [company];
                revActualData = [revenue.byCompany[company].actual];
                revPlanData = [revenue.byCompany[company].plan];
            }
        }

        window.ChartManager.createChart('overviewRevenueChart', 'bar', {
            labels: revLabels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Kế hoạch',
                    data: revPlanData,
                    backgroundColor: '#1B2A4A',
                    borderRadius: 4
                },
                {
                    type: 'bar',
                    label: 'Thực tế',
                    data: revActualData,
                    backgroundColor: '#28A745',
                    borderRadius: 4
                }
            ]
        }, {
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: '#444',
                    font: { size: 9, weight: 'bold' },
                    formatter: function(value) {
                        return value + ' Tỷ';
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grace: '20%' // Add padding for top labels
                }
            }
        });

        // --- 3. Debt ---
        let debtLabels = ['Trong hạn', 'Quá hạn', 'Khó đòi'], debtData = [];
        let dTotal=0, dCurrent=0, dOverdue=0, dBad=0;
        
        if (company === 'all') {
            dTotal = debt.total;
            for (const [compName, compData] of Object.entries(debt.byCompany)) {
                dCurrent += compData.current;
                dOverdue += compData.overdue;
                dBad += compData.bad;
            }
            debtData = [dCurrent, dOverdue, dBad];
            document.getElementById('overview-debt-val').textContent = dTotal.toFixed(1) + ' Tỷ ₫';
        } else {
            if(debt.byCompany[company]) {
                const cData = debt.byCompany[company];
                debtData = [cData.current, cData.overdue, cData.bad];
                dTotal = cData.current + cData.overdue + cData.bad;
                dCurrent = cData.current;
                dOverdue = cData.overdue;
                dBad = cData.bad;
                document.getElementById('overview-debt-val').textContent = dTotal.toFixed(1) + ' Tỷ ₫';
            }
        }

        document.getElementById('ov-debt-total').textContent = dTotal.toFixed(1);
        document.getElementById('ov-debt-current').textContent = dCurrent.toFixed(1);
        document.getElementById('ov-debt-overdue').textContent = dOverdue.toFixed(1);
        document.getElementById('ov-debt-bad').textContent = dBad.toFixed(1);

        window.ChartManager.createChart('overviewDebtChart', 'doughnut', {
            labels: debtLabels,
            datasets: [{
                data: debtData,
                backgroundColor: ['#17a2b8', '#ffc107', '#fd7e14']
            }]
        }, {
            plugins: {
                datalabels: {
                    color: '#fff',
                    font: { weight: 'bold', size: 10 },
                    formatter: function(value, context) {
                        if (value === 0) return '';
                        return value.toFixed(1) + 'T';
                    }
                }
            }
        });
    }
};
