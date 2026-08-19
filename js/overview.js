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
        const [customers, revenue, debt] = await Promise.all([
            window.DataService.getCustomersData(period, company),
            window.DataService.getRevenueData(period, company),
            window.DataService.getDebtData(period, company)
        ]);

        this.updateUI(customers, revenue, debt, company);
    },

    updateUI(customers, revenue, debt, company) {
        
        const companyNameMap = {
            'all': 'Tất cả',
            'THH': 'Tân Hồng Hà',
            'Viet': 'Việt',
            'XemSon': 'Xem Sơn',
            'VPSM': 'VPS M',
            'ITSS': 'ITSS',
            'VPVPS': 'Văn phòng VPS'
        };

        let dataKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) dataKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) dataKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem')) dataKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M')) dataKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) dataKey = 'ITSS'; 
        else if (company !== 'all') dataKey = 'VPVPS';

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
            const compData = customers.byCompany[dataKey];
            if(compData) {
                tCust = compData.service + compData.rental + compData.distribution;
                tNew = compData.new;
                tDec = compData.decreased;
                tLost = compData.lost;
                custData = [compData.service, compData.rental, compData.distribution];
            }
        }
        
        document.getElementById('ov-cust-total').textContent = tCust.toLocaleString();
        document.getElementById('overview-customers-val').textContent = tCust.toLocaleString();
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
                    color: '#ffffff',
                    font: { weight: 'bold', size: 14 },
                    formatter: function(value, context) {
                        return context.chart.data.labels[context.dataIndex] + '\n' + value.toLocaleString();
                    },
                    textAlign: 'center',
                    textStrokeColor: 'rgba(0,0,0,0.5)',
                    textStrokeWidth: 2
                }
            }
        });

        // --- 2. Revenue ---
        let revLabels = [], revActualData = [], revPlanData = [];
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(revenue.byCompany)) {
                revLabels.push(companyNameMap[compName] || compName);
                revActualData.push(compData.actual);
                revPlanData.push(compData.plan);
            }
        } else {
            if(revenue.byCompany[dataKey]) {
                revLabels = [company];
                revActualData = [revenue.byCompany[dataKey].actual];
                revPlanData = [revenue.byCompany[dataKey].plan];
            }
        }

        let totalActualRev = 0;
        let totalPlanRev = 0;
        if (company === 'all') {
            for (let a of revActualData) totalActualRev += a;
            for (let p of revPlanData) totalPlanRev += p;
        } else {
            totalActualRev = revActualData[0] || 0;
            totalPlanRev = revPlanData[0] || 0;
        }
        
        let valEl = document.getElementById('overview-revenue-val');
        if(valEl) valEl.textContent = (totalActualRev / 1000).toFixed(1) + ' Tỷ đ';
        
        window.ChartManager.createChart('overviewRevenueChart', 'bar', {
            labels: revLabels,
            datasets: [
                {
                    type: 'bar',
                    label: 'Kế hoạch',
                    data: revPlanData,
                    backgroundColor: '#2E86AB', // Blue
                    borderRadius: 4
                },
                {
                    type: 'bar',
                    label: 'Thực tế',
                    data: revActualData,
                    backgroundColor: '#DC3545', // Red
                    borderRadius: 4
                }
            ]
        }, {
            plugins: {
                datalabels: {
                    anchor: 'end',
                    align: 'top',
                    color: '#444444',
                    font: { size: 10, weight: 'bold' },
                    formatter: function(value) {
                        return value + ' Tỷ';
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grace: '25%' // Add padding for larger top labels
                }
            }
        });

        // Biểu đồ So sánh Doanh số Cùng kỳ (YoY)
        let currentYearData = [];
        let previousYearData = [];
        
        if (revenue.monthlyComparison) {
            currentYearData = revenue.monthlyComparison.currentYear;
            previousYearData = revenue.monthlyComparison.previousYear;
        }

        window.ChartManager.createChart('revenueComparisonChart', 'bar', {
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
        }, {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true, 
                    title: { display: true, text: 'Tỷ VNĐ' },
                    grace: '15%' // Add padding for top labels
                }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false },
                datalabels: {
                    color: '#000000', // Đặt màu chữ thành màu đen rõ ràng
                    font: { weight: 'bold', size: 11 },
                    anchor: 'end',
                    align: 'top', // Đưa lên trên cột để dễ đọc
                    formatter: function(value) {
                        if (value === 0) return '';
                        return value;
                    }
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
            if(debt.byCompany[dataKey]) {
                const cData = debt.byCompany[dataKey];
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
                    color: '#ffffff',
                    font: { weight: 'bold', size: 14 },
                    formatter: function(value, context) {
                        if (value === 0) return '';
                        return value.toFixed(1) + 'T';
                    },
                    textStrokeColor: 'rgba(0,0,0,0.5)',
                    textStrokeWidth: 2
                }
            }
        });
    }
};


