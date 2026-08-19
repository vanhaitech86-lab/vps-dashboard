/**
 * HR Module
 */

window.HrModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            if (!document.getElementById('view-hr').classList.contains('hidden')) {
                this.loadData(e.detail.period, e.detail.company);
            }
        });

        // Add listener for when view becomes active
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if(item.dataset.target === 'hr') {
                    const currentCompany = window.FilterManager.currentCompany;
                    const currentPeriod = window.FilterManager.currentPeriod;
                    this.loadData(currentPeriod, currentCompany);
                }
            });
        });
    },

    async loadData(period, company) {
        const data = await window.DataService.getHrData(period, company);
        this.updateUI(data, company);
    },

    updateUI(data, company) {
        let tQuota = 0, tOfficial = 0, tProbation = 0, tResigned = 0;
        let chartLabels = [], officialData = [], probationData = [], vacancyData = [], resignedData = [];

        if (company === 'all') {
            for (const [compName, compData] of Object.entries(data.byCompany)) {
                tQuota += compData.quota;
                tOfficial += compData.official;
                tProbation += compData.probation;
                tResigned += compData.resigned;
                
                chartLabels.push(compName);
                officialData.push(compData.official);
                probationData.push(compData.probation);
                resignedData.push(compData.resigned);
                const vacancy = Math.max(0, compData.quota - (compData.official + compData.probation));
                vacancyData.push(vacancy);
            }
        } else {
            const compData = data.byCompany[company];
            if (compData) {
                tQuota = compData.quota;
                tOfficial = compData.official;
                tProbation = compData.probation;
                tResigned = compData.resigned;

                chartLabels.push(company);
                officialData.push(compData.official);
                probationData.push(compData.probation);
                resignedData.push(compData.resigned);
                vacancyData.push(Math.max(0, compData.quota - (compData.official + compData.probation)));
            }
        }

        const tTotal = tOfficial + tProbation;
        const tVacancy = Math.max(0, tQuota - tTotal);
        const fulfillment = tQuota > 0 ? Math.round((tTotal / tQuota) * 100) : 0;

        document.getElementById('hr-total').textContent = tTotal.toLocaleString();
        document.getElementById('hr-quota').textContent = tQuota.toLocaleString();
        document.getElementById('hr-fulfillment').textContent = "Đạt " + fulfillment + "% định biên";
        
        document.getElementById('hr-probation').textContent = tProbation.toLocaleString();
        document.getElementById('hr-resigned').textContent = tResigned.toLocaleString();
        document.getElementById('hr-vacancy').textContent = tVacancy.toLocaleString();

        const chartData = {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Chính thức',
                    data: officialData,
                    backgroundColor: '#1B2A4A',
                },
                {
                    label: 'Thử việc',
                    data: probationData,
                    backgroundColor: '#F59E0B',
                },
                {
                    label: 'Đã nghỉ việc',
                    data: resignedData,
                    backgroundColor: '#EF4444',
                },
                {
                    label: 'Cần tuyển',
                    data: vacancyData,
                    backgroundColor: '#E2E8F0',
                }
            ]
        };

        window.ChartManager.createChart('hrStructureChart', 'bar', chartData, {
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', // Biểu đồ cột ngang
            scales: {
                x: { stacked: true },
                y: { stacked: true }
            },
            plugins: {
                legend: { position: 'top' },
                tooltip: { mode: 'index', intersect: false },
                datalabels: {
                    color: function(context) {
                        return (context.datasetIndex === 3) ? '#64748b' : '#ffffff';
                    },
                    font: { weight: 'bold' },
                    formatter: function(value) {
                        return value > 0 ? value : '';
                    }
                }
            }
        });
    }
};

