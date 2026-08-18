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
        let custLabels = [], custData = [];
        let tCust=0, tNew=0, tDec=0, tLost=0;
        
        if (company === 'all') {
            tCust = customers.total;
            tNew = customers.trend.new;
            tDec = customers.trend.decreased;
            tLost = customers.trend.lost;
            for (const [compName, compData] of Object.entries(customers.byCompany)) {
                custLabels.push(compName);
                custData.push(compData.service + compData.rental + compData.distribution);
            }
        } else {
            const compData = customers.byCompany[company];
            if(compData) {
                tCust = compData.service + compData.rental + compData.distribution;
                tNew = compData.new;
                tDec = compData.decreased;
                tLost = compData.lost;
                custLabels = ['Dịch vụ', 'Thuê máy', 'Phân phối'];
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
                backgroundColor: ['#1B2A4A', '#2E86AB', '#FFC107', '#28A745', '#DC3545']
            }]
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
                    type: 'line',
                    label: 'Kế hoạch',
                    data: revPlanData,
                    borderColor: '#1B2A4A',
                    backgroundColor: '#1B2A4A',
                    borderWidth: 2,
                    fill: false,
                    tension: 0.1
                },
                {
                    type: 'bar',
                    label: 'Thực tế',
                    data: revActualData,
                    backgroundColor: '#28A745',
                    borderRadius: 4
                }
            ]
        });

        // --- 3. Debt ---
        let debtLabels = [], debtData = [];
        let dTotal=0, dCurrent=0, dOverdue=0, dBad=0;
        
        if (company === 'all') {
            dTotal = debt.total;
            for (const [compName, compData] of Object.entries(debt.byCompany)) {
                debtLabels.push(compName);
                let compTotal = compData.current + compData.overdue + compData.bad;
                debtData.push(compTotal);
                dCurrent += compData.current;
                dOverdue += compData.overdue;
                dBad += compData.bad;
            }
            document.getElementById('overview-debt-val').textContent = dTotal.toFixed(1) + ' Tỷ ₫';
        } else {
            if(debt.byCompany[company]) {
                const cData = debt.byCompany[company];
                debtLabels = ['Trong hạn', 'Quá hạn', 'Khó đòi'];
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
                backgroundColor: ['#6c757d', '#17a2b8', '#ffc107', '#fd7e14', '#20c997']
            }]
        });
    }
};
