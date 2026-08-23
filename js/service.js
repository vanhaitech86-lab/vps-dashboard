// Dịch Vụ Tận Tâm Module

window.ServiceModule = {
    name: 'Dịch Vụ Tận Tâm',
    chartInstances: {},
    
    mockData: [
        { stt: 1, name: "Cổ Phước Thịnh", code: "THINHCY", dept: "ENGI", tasks: 13, avgScore: 0, totalScore: 0, responseTime: 14.536, travelTo: 0.438, processingTime: 1.549, travelBack: 0.515, reportCreated: 0, reportReplaced: 0, materialRecovered: 0, cty: "Tân Hồng Hà", month: 8 },
        { stt: 2, name: "Hồ Trung Nam", code: "NAMHT", dept: "ENGI", tasks: 57, avgScore: 0, totalScore: 0, responseTime: 21.117, travelTo: 0.248, processingTime: 0.168, travelBack: 0, reportCreated: 0, reportReplaced: 14, materialRecovered: 14, cty: "Tân Hồng Hà", month: 8 },
        { stt: 3, name: "Phan Văn Nguyện", code: "NGUYENPV", dept: "ENGI", tasks: 66, avgScore: 0, totalScore: 0, responseTime: 15.884, travelTo: 0.446, processingTime: 0.726, travelBack: 0.052, reportCreated: 0, reportReplaced: 23, materialRecovered: 21, cty: "Việt", month: 8 },
        { stt: 4, name: "Trương Quốc Bảo", code: "BAOTQ", dept: "ENGI", tasks: 44, avgScore: 0, totalScore: 0, responseTime: 14.863, travelTo: 0.631, processingTime: 0.416, travelBack: 0.001, reportCreated: 0, reportReplaced: 9, materialRecovered: 18, cty: "Xem Sơn", month: 8 },
        { stt: 5, name: "Hồ Lộc Minh", code: "MINHHL", dept: "ENGI", tasks: 55, avgScore: 0, totalScore: 0, responseTime: 11.887, travelTo: 0.679, processingTime: 0.817, travelBack: 0, reportCreated: 7, reportReplaced: 5, materialRecovered: 11, cty: "ITSS", month: 8 },
        { stt: 6, name: "Trần Nguyễn Quốc Thắng", code: "THANGTNQ", dept: "ENGI", tasks: 64, avgScore: 0, totalScore: 0, responseTime: 21.661, travelTo: 0, processingTime: 0.171, travelBack: 0, reportCreated: 2, reportReplaced: 14, materialRecovered: 14, cty: "VPS M", month: 8 },
    ],

    init() {
        this.render();
        window.addEventListener('filter-changed', () => this.render());
    },

    parseData(selectedCty) {
        let data = this.mockData;
        
        if (window.mockData && window.mockData.service_raw && window.mockData.service_raw.length > 1) {
            let csv = window.mockData.service_raw;
            let parsed = [];
            for (let i = 1; i < csv.length; i++) {
                let row = csv[i];
                if (!row || !row[0]) continue;
                parsed.push({
                    cty: row[0].toString().trim(),
                    month: row[1] || 8,
                    name: row[2] || '',
                    code: row[3] || '',
                    dept: row[4] || '',
                    tasks: parseFloat(row[5]) || 0,
                    avgScore: parseFloat(row[6]) || 0,
                    totalScore: parseFloat(row[7]) || 0,
                    responseTime: parseFloat(row[8]) || 0,
                    travelTo: parseFloat(row[9]) || 0,
                    processingTime: parseFloat(row[10]) || 0,
                    travelBack: parseFloat(row[11]) || 0,
                    reportCreated: parseFloat(row[12]) || 0,
                    reportReplaced: parseFloat(row[13]) || 0,
                    materialRecovered: parseFloat(row[14]) || 0,
                });
            }
            if (parsed.length > 0) data = parsed;
        }

        if (selectedCty && selectedCty !== 'all') {
            data = data.filter(d => {
                let cUpper = d.cty.toUpperCase();
                if (selectedCty === 'thh' && cUpper.includes('HỒNG HÀ')) return true;
                if (selectedCty === 'viet' && (cUpper.includes('VIỆT') || cUpper === 'VIET')) return true;
                if (selectedCty === 'xesco' && (cUpper.includes('SƠN') || cUpper.includes('SON'))) return true;
                if (selectedCty === 'vpsm' && (cUpper.includes('VPS M') || cUpper === 'VPSM')) return true;
                if (selectedCty === 'itss' && cUpper.includes('ITSS')) return true;
                return false;
            });
        }
        return data;
    },

    render() {
        const container = document.getElementById('view-service');
        if (!container) return;
        
        let cty = 'all';
        if(window.DashboardManager && window.DashboardManager.currentCompany) {
            cty = window.DashboardManager.currentCompany;
        }

        const data = this.parseData(cty);

        let totalTasks = 0;
        let avgProcess = 0;
        let totalMatRecov = 0;
        let totalReplaced = 0;

        data.forEach(d => {
            totalTasks += d.tasks;
            avgProcess += d.processingTime;
            totalMatRecov += d.materialRecovered;
            totalReplaced += d.reportReplaced;
        });
        if(data.length > 0) avgProcess = (avgProcess / data.length).toFixed(2);
        else avgProcess = "0.00";
        
        let recovRate = totalReplaced > 0 ? ((totalMatRecov / totalReplaced) * 100).toFixed(1) : 0;

        let html = `
            <div class="animate-fade-in">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="text-2xl font-bold text-gray-800">Báo Cáo Chất Lượng Dịch Vụ</h2>
                </div>

                <!-- KPIs -->
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div class="text-gray-500 text-sm mb-1">Nhân Viên Dịch Vụ</div>
                        <div class="text-3xl font-bold text-blue-600">${data.length}</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div class="text-gray-500 text-sm mb-1">Tổng Số Công Việc</div>
                        <div class="text-3xl font-bold text-indigo-600">${totalTasks}</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div class="text-gray-500 text-sm mb-1">TB TG Xử Lý (giờ)</div>
                        <div class="text-3xl font-bold text-orange-500">${avgProcess}</div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <div class="text-gray-500 text-sm mb-1">Tỉ Lệ Thu Hồi Vật Tư</div>
                        <div class="text-3xl font-bold text-green-500">${recovRate}%</div>
                    </div>
                </div>

                <!-- Charts -->
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Số Công Việc / NV (Top 5)</h3>
                        <div style="height: 250px"><canvas id="serviceTasksChart"></canvas></div>
                    </div>
                    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                        <h3 class="text-lg font-bold text-gray-800 mb-4">Thời Gian Xử Lý & Di Chuyển</h3>
                        <div style="height: 250px"><canvas id="serviceTimeChart"></canvas></div>
                    </div>
                </div>

                <!-- Table -->
                <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                    <div class="p-4 border-b border-gray-100 bg-gray-50 flex justify-between items-center">
                        <h3 class="text-lg font-bold text-gray-800">Chi Tiết Chất Lượng Dịch Vụ</h3>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="min-w-full text-sm text-left whitespace-nowrap">
                            <thead class="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                                <tr>
                                    <th class="px-4 py-3">STT</th>
                                    <th class="px-4 py-3">Tên Nhân Viên</th>
                                    <th class="px-4 py-3">Công Ty</th>
                                    <th class="px-4 py-3 text-right">Số Việc</th>
                                    <th class="px-4 py-3 text-right">TG Đáp Ứng</th>
                                    <th class="px-4 py-3 text-right">TG Xử Lý</th>
                                    <th class="px-4 py-3 text-right">KTra Thay</th>
                                    <th class="px-4 py-3 text-right">Thu Hồi VT</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-100">
                                ${data.map((d, i) => `
                                    <tr class="hover:bg-gray-50">
                                        <td class="px-4 py-3">${i+1}</td>
                                        <td class="px-4 py-3 font-medium text-gray-800">${d.name}<div class="text-xs text-gray-400">${d.code} - ${d.dept}</div></td>
                                        <td class="px-4 py-3 text-gray-500">${d.cty}</td>
                                        <td class="px-4 py-3 text-right font-medium">${d.tasks}</td>
                                        <td class="px-4 py-3 text-right">${d.responseTime}</td>
                                        <td class="px-4 py-3 text-right">${d.processingTime}</td>
                                        <td class="px-4 py-3 text-right">${d.reportReplaced}</td>
                                        <td class="px-4 py-3 text-right text-indigo-600 font-medium">${d.materialRecovered}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        this.renderCharts(data);
    },

    renderCharts(data) {
        if (this.chartInstances.tasks) this.chartInstances.tasks.destroy();
        if (this.chartInstances.time) this.chartInstances.time.destroy();

        let topTasks = [...data].sort((a,b) => b.tasks - a.tasks).slice(0, 5);

        const ctxTasks = document.getElementById('serviceTasksChart');
        if (ctxTasks) {
            this.chartInstances.tasks = new Chart(ctxTasks, {
                type: 'bar',
                data: {
                    labels: topTasks.map(d => { let p = d.name.split(' '); return p[p.length-1]; }),
                    datasets: [{
                        label: 'Số công việc',
                        data: topTasks.map(d => d.tasks),
                        backgroundColor: '#4F46E5',
                        borderRadius: 4
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } }
                }
            });
        }

        let topTime = [...data].sort((a,b) => b.processingTime - a.processingTime).slice(0, 5);
        const ctxTime = document.getElementById('serviceTimeChart');
        if (ctxTime) {
            this.chartInstances.time = new Chart(ctxTime, {
                type: 'bar',
                data: {
                    labels: topTime.map(d => { let p = d.name.split(' '); return p[p.length-1]; }),
                    datasets: [
                        {
                            label: 'TG Xử lý',
                            data: topTime.map(d => d.processingTime),
                            backgroundColor: '#F97316',
                            stack: 'Stack 0',
                        },
                        {
                            label: 'TG Di chuyển',
                            data: topTime.map(d => d.travelTo + d.travelBack),
                            backgroundColor: '#93C5FD',
                            stack: 'Stack 0',
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true }
                    }
                }
            });
        }
    }
};
