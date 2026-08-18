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

    updateUI(customers, revenue, inventory, company) {
        // --- 1. Customers ---
        let custLabels = [], custData = [];
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(customers.byCompany)) {
                custLabels.push(compName);
                custData.push(compData.service + compData.rental + compData.distribution);
            }
        } else {
            const compData = customers.byCompany[company];
            if(compData) {
                custLabels = ['Dịch vụ', 'Thuê máy', 'Phân phối'];
                custData = [compData.service, compData.rental, compData.distribution];
            }
        }

        window.ChartManager.createChart('overviewCustomersChart', 'doughnut', {
            labels: custLabels,
            datasets: [{
                data: custData,
                backgroundColor: ['#1B2A4A', '#2E86AB', '#FFC107', '#28A745', '#DC3545']
            }]
        });

        // --- 2. Revenue ---
        let revLabels = [], revData = [];
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(revenue.byCompany)) {
                revLabels.push(compName);
                revData.push(compData.actual);
            }
        } else {
            if(revenue.byCompany[company]) {
                revLabels = [company];
                revData = [revenue.byCompany[company].actual];
            }
        }

        window.ChartManager.createChart('overviewRevenueChart', 'bar', {
            labels: revLabels,
            datasets: [{
                label: 'Doanh số',
                data: revData,
                backgroundColor: '#28A745'
            }]
        });

        // --- 3. Inventory ---
        let invLabels = [], invData = [];
        let totalInv = 0;
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(inventory.byCompany)) {
                invLabels.push(compName);
                invData.push(compData.value);
                totalInv += compData.value;
            }
            document.getElementById('overview-inventory-val').textContent = totalInv.toFixed(1) + ' Tỷ ₫';
        } else {
            if(inventory.byCompany[company]) {
                invLabels = [company];
                invData = [inventory.byCompany[company].value];
                document.getElementById('overview-inventory-val').textContent = inventory.byCompany[company].value.toFixed(1) + ' Tỷ ₫';
            }
        }

        window.ChartManager.createChart('overviewInventoryChart', 'pie', {
            labels: invLabels,
            datasets: [{
                data: invData,
                backgroundColor: ['#6c757d', '#17a2b8', '#ffc107', '#fd7e14', '#20c997']
            }]
        });
    }
};
