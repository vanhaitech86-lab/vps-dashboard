/**
 * Customers Module
 */

window.CustomersModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.loadData(e.detail.period, e.detail.company);
        });
    },

    async loadData(period, company) {
        const data = await window.DataService.getCustomersData(period, company);
        this.updateUI(data, company);
    },

    updateUI(data, company) {
        // Here we'd aggregate data if 'all' is selected, or use specific company data
        // For demo, using hardcoded extraction based on mock data structure
        
        let serviceTotal = 0, rentalTotal = 0, distTotal = 0;
        let labels = [], serviceData = [], rentalData = [], distData = [];
        
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(data.byCompany)) {
                labels.push(compName);
                serviceData.push(compData.service);
                rentalData.push(compData.rental);
                distData.push(compData.distribution);
                
                serviceTotal += compData.service;
                rentalTotal += compData.rental;
                distTotal += compData.distribution;
            }
        } else {
            const compData = data.byCompany[company];
            if(compData) {
                labels = [company];
                serviceData = [compData.service];
                rentalData = [compData.rental];
                distData = [compData.distribution];
                
                serviceTotal = compData.service;
                rentalTotal = compData.rental;
                distTotal = compData.distribution;
            }
        }

        // Update Overview Cards
        const viewCustomers = document.getElementById('view-customers');
        if (viewCustomers) {
            const values = viewCustomers.querySelectorAll('.kpi-value');
            if (values.length >= 3) {
                values[0].textContent = serviceTotal.toLocaleString();
                values[1].textContent = rentalTotal.toLocaleString();
                values[2].textContent = distTotal.toLocaleString();
            }
        }

        // Update Chart
        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Dịch vụ',
                    data: serviceData,
                    backgroundColor: '#1B2A4A',
                },
                {
                    label: 'Thuê máy',
                    data: rentalData,
                    backgroundColor: '#2E86AB',
                },
                {
                    label: 'Phân phối',
                    data: distData,
                    backgroundColor: '#FFC107',
                }
            ]
        };

        window.ChartManager.createChart('customersByCompanyChart', 'bar', chartData, {
            scales: {
                x: { stacked: true },
                y: { stacked: true }
            }
        });
    }
};
