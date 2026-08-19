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

        let tKpi = { A: 0, B: 0, C: 0, D: 0 };
        let currentAnalysis = { cause: '', solution: '' };

        if (company === 'all') {
            for (const [compName, compData] of Object.entries(data.byCompany)) {
                tQuota += compData.quota;
                tOfficial += compData.official;
                tProbation += compData.probation;
                tResigned += compData.resigned;
                
                tKpi.A += compData.kpi.A;
                tKpi.B += compData.kpi.B;
                tKpi.C += compData.kpi.C;
                tKpi.D += compData.kpi.D;

                chartLabels.push(compName);
                officialData.push(compData.official);
                probationData.push(compData.probation);
                resignedData.push(compData.resigned);
                const vacancy = Math.max(0, compData.quota - (compData.official + compData.probation));
                vacancyData.push(vacancy);
            }
            currentAnalysis.cause = "Tổng hợp toàn bộ các đơn vị. Xem chi tiết bằng cách chọn từng công ty.";
            currentAnalysis.solution = "Điều chỉnh chiến lược nhân sự tổng thể Tập đoàn.";
        } else {
            const compData = data.byCompany[company];
            if (compData) {
                tQuota = compData.quota;
                tOfficial = compData.official;
                tProbation = compData.probation;
                tResigned = compData.resigned;

                tKpi = { ...compData.kpi };
                currentAnalysis = { ...compData.analysis };

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

        // Re-render Lucide icons if any
        if(window.lucide) window.lucide.createIcons();

        const totalKpi = tKpi.A + tKpi.B + tKpi.C + tKpi.D;
        const pA = totalKpi ? Math.round(tKpi.A / totalKpi * 100) : 0;
        const pB = totalKpi ? Math.round(tKpi.B / totalKpi * 100) : 0;
        const pC = totalKpi ? Math.round(tKpi.C / totalKpi * 100) : 0;
        const pD = totalKpi ? Math.round(tKpi.D / totalKpi * 100) : 0;

        document.getElementById('hr-analysis-grades').innerHTML = `
            <strong>Loại A (Xuất sắc):</strong> ${tKpi.A} người (${pA}%)<br>
            <strong>Loại B (Khá):</strong> ${tKpi.B} người (${pB}%)<br>
            <strong>Loại C (Trung bình):</strong> ${tKpi.C} người (${pC}%)<br>
            <strong>Loại D (Yếu):</strong> ${tKpi.D} người (${pD}%)
        `;
        document.getElementById('hr-analysis-cause').textContent = currentAnalysis.cause;
        document.getElementById('hr-analysis-solution').textContent = currentAnalysis.solution;

        const kpiChartData = {
            labels: ['Loại A', 'Loại B', 'Loại C', 'Loại D'],
            datasets: [{
                data: [tKpi.A, tKpi.B, tKpi.C, tKpi.D],
                backgroundColor: ['#10B981', '#3B82F6', '#F59E0B', '#EF4444']
            }]
        };

        window.ChartManager.createChart('hrKpiChart', 'doughnut', kpiChartData, {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'right' },
                datalabels: {
                    color: '#fff',
                    formatter: (value, context) => {
                        return value > 0 ? value : '';
                    }
                }
            }
        });
    }
};


