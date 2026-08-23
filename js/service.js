// Dịch Vụ Tận Tâm Module - Dashboard & Table

window.ServiceModule = {
    name: 'Dịch Vụ Tận Tâm',
    localCompanyFilter: null,
    localMonthFilter: 'all',
    chartInstance: null,
    
    init() {
        this.render();
        window.addEventListener('filter-changed', () => {
            this.localCompanyFilter = null;
            this.render();
        });
    },

    parseData(selectedCty, selectedMonth) {
        let data = [];
        
        if (window.mockData && window.mockData.service_raw && window.mockData.service_raw.length > 1) {
            let csv = window.mockData.service_raw;
            for (let i = 1; i < csv.length; i++) {
                let row = csv[i];
                if (!row || (!row[1] && !row[2])) continue; 
                
                let t = (row[15] !== undefined && row[15] !== '') ? row[15].toString().replace('Tháng', '').trim() : '8';
                
                data.push({
                    stt: row[0] || i,
                    name: row[1] || '',
                    code: row[2] || '',
                    dept: row[3] || '',
                    cty: row[4] ? row[4].toString().trim() : '',
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
                    month: t
                });
            }
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
        
        if (selectedMonth && selectedMonth !== 'all') {
            data = data.filter(d => d.month == selectedMonth);
        }
        
        return data;
    },

    getUniqueMonths(rawCsv) {
        let months = new Set();
        if (rawCsv && rawCsv.length > 1) {
            for (let i = 1; i < rawCsv.length; i++) {
                if(rawCsv[i] && rawCsv[i][15]) {
                    let m = rawCsv[i][15].toString().replace('Tháng', '').trim();
                    if(m) months.add(m);
                }
            }
        }
        if(months.size === 0) months.add('8');
        return Array.from(months).sort((a,b) => parseInt(a) - parseInt(b));
    },

    render() {
        const container = document.getElementById('view-service');
        if (!container) return;
        
        let cty = 'all';
        if(window.FilterManager && window.FilterManager.currentCompany) {
            cty = window.FilterManager.currentCompany;
        }

        const data = this.parseData(cty, this.localMonthFilter);
        const allMonths = this.getUniqueMonths(window.mockData ? window.mockData.service_raw : null);

        let companyStats = {};
        data.forEach(d => {
            let cName = d.cty || 'Khác';
            if(!companyStats[cName]) companyStats[cName] = 0;
            companyStats[cName] += d.tasks;
        });

        const labels = Object.keys(companyStats);
        const chartData = Object.values(companyStats);
        
        let monthOptions = `<option value="all">Tất cả các tháng</option>`;
        allMonths.forEach(m => {
            monthOptions += `<option value="${m}" ${this.localMonthFilter == m ? 'selected' : ''}>Tháng ${m}</option>`;
        });

        let html = `
            <div class="animate-fade-in" style="height: calc(100vh - 100px); display: flex; flex-direction: column;">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">Báo Cáo Chất Lượng Dịch Vụ</h2>
                    <div class="flex items-center gap-2">
                        <label class="text-sm font-bold text-gray-600">Chọn thời gian:</label>
                        <select id="service-month-filter" class="border border-gray-300 rounded px-3 py-1 bg-white shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500" onchange="window.ServiceModule.changeMonth(this.value)">
                            ${monthOptions}
                        </select>
                    </div>
                </div>

                <!-- Dashboard Section -->
                <div class="bg-white shadow-sm border border-gray-200 rounded-lg p-4 mb-4 flex gap-6" style="min-height: 250px;">
                    <div style="flex: 1; position: relative;">
                        <h3 class="text-center font-bold text-gray-700 mb-2">Tỉ lệ công việc theo Đơn vị</h3>
                        <div style="height: 200px; display: flex; justify-content: center;">
                            <canvas id="serviceRatioChart"></canvas>
                        </div>
                    </div>
                    
                    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 1rem;">
                        <div class="bg-indigo-50 rounded-lg p-4 text-center">
                            <div class="text-indigo-600 text-sm font-bold">TỔNG NHÂN VIÊN DỊCH VỤ</div>
                            <div class="text-3xl font-black text-indigo-800" id="srv-total-emp">${data.length}</div>
                        </div>
                        <div class="bg-green-50 rounded-lg p-4 text-center">
                            <div class="text-green-600 text-sm font-bold">TỔNG SỐ CÔNG VIỆC</div>
                            <div class="text-3xl font-black text-green-800" id="srv-total-tasks">${chartData.reduce((a,b)=>a+b, 0)}</div>
                        </div>
                    </div>
                </div>

                <!-- Table Section -->
                <div class="bg-white shadow-sm border border-gray-200 overflow-hidden" style="flex: 1; border-radius: 4px; display: flex; flex-direction: column;">
                    <div class="p-2 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
                        <span class="font-bold text-gray-700" id="service-table-title">Chi tiết: Tất cả đơn vị</span>
                    </div>
                    <div class="overflow-auto" style="flex: 1;">
                        <table class="min-w-full text-sm text-center whitespace-nowrap border-collapse" style="font-family: Arial, sans-serif;">
                            <thead style="background-color: #E6E6FA; color: #333; position: sticky; top: 0; z-index: 10;">
                                <tr>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">STT</th>
                                    <th class="px-3 py-2 border border-gray-300 font-bold">HỌ VÀ TÊN NHÂN VIÊN</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">MÃ NV</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">BỘ PHẬN</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">SỐ CÔNG VIỆC</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">SỐ ĐIỂM TB</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">TỔNG ĐIỂM</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">TB THỜI GIAN ĐÁP ỨNG</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">TB THỜI GIAN DI CHUYỂN ĐI</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">TB THỜI GIAN XỬ LÝ</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">TB THỜI GIAN DI CHUYỂN VỀ</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">SỐ BIÊN BẢN KTRA LẬP</th>
                                    <th class="px-2 py-2 border border-gray-300 font-bold">SỐ BIÊN BẢN KTRA THAY</th>
                                    <th class="px-3 py-2 border border-gray-300 font-bold">SỐ LẦN ĐÃ THU HỒI VẬT TƯ CŨ</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-gray-200" id="service-table-body">
                                <!-- Table rows will be injected here -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        this.renderChart(labels, chartData);
        this.renderTableData(data);
    },

    changeMonth(month) {
        this.localMonthFilter = month;
        this.render();
    },

    clearLocalFilter() {
        this.localCompanyFilter = null;
        let cty = 'all';
        if(window.FilterManager && window.FilterManager.currentCompany) {
            cty = window.FilterManager.currentCompany;
        }
        const data = this.parseData(cty, this.localMonthFilter);
        this.renderTableData(data);
    },

    renderChart(labels, chartData) {
        if (this.chartInstance) {
            this.chartInstance.destroy();
        }

        const ctx = document.getElementById('serviceRatioChart');
        if (!ctx) return;

        this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: chartData,
                    backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'],
                    borderWidth: 2,
                    hoverOffset: 10
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed !== null) {
                                    label += context.parsed + ' công việc';
                                }
                                return label;
                            }
                        }
                    }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const idx = elements[0].index;
                        const clickedCompany = labels[idx];
                        this.localCompanyFilter = clickedCompany;
                        
                        let cty = 'all';
                        if(window.FilterManager && window.FilterManager.currentCompany) {
                            cty = window.FilterManager.currentCompany;
                        }
                        const fullData = this.parseData(cty, this.localMonthFilter);
                        this.renderTableData(fullData);
                    } else {
                        this.clearLocalFilter();
                    }
                },
                onHover: (event, chartElement) => {
                    event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
                }
            }
        });
    },

    renderTableData(data) {
        const tbody = document.getElementById('service-table-body');
        const title = document.getElementById('service-table-title');
        if (!tbody) return;

        let tableData = data;
        if (this.localCompanyFilter) {
            tableData = data.filter(d => d.cty === this.localCompanyFilter);
            if(title) title.innerHTML = `Chi tiết: <span class="text-indigo-600 font-bold">${this.localCompanyFilter}</span> <button onclick="window.ServiceModule.clearLocalFilter()" class="ml-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded cursor-pointer hover:bg-red-200">Hiển thị Tất cả</button>`;
        } else {
            if(title) title.innerHTML = `Chi tiết: Tất cả đơn vị`;
        }

        const empCount = document.getElementById('srv-total-emp');
        const taskCount = document.getElementById('srv-total-tasks');
        if(empCount) empCount.textContent = tableData.length;
        if(taskCount) taskCount.textContent = tableData.reduce((a,b)=>a+b.tasks, 0);

        tbody.innerHTML = tableData.map((d, i) => `
            <tr class="hover:bg-gray-50 bg-white transition-colors">
                <td class="px-2 py-2 border border-gray-200">${d.stt || (i+1)}</td>
                <td class="px-3 py-2 border border-gray-200 text-left font-medium text-gray-800">${d.name}</td>
                <td class="px-2 py-2 border border-gray-200">${d.code}</td>
                <td class="px-2 py-2 border border-gray-200">${d.dept}</td>
                <td class="px-2 py-2 border border-gray-200 font-bold text-indigo-600">${d.tasks}</td>
                <td class="px-2 py-2 border border-gray-200" style="color: #16a34a;">${d.avgScore || 0}</td>
                <td class="px-2 py-2 border border-gray-200" style="color: #16a34a;">${d.totalScore || 0}</td>
                <td class="px-2 py-2 border border-gray-200">${d.responseTime}</td>
                <td class="px-2 py-2 border border-gray-200">${d.travelTo}</td>
                <td class="px-2 py-2 border border-gray-200">${d.processingTime}</td>
                <td class="px-2 py-2 border border-gray-200">${d.travelBack}</td>
                <td class="px-2 py-2 border border-gray-200">${d.reportCreated}</td>
                <td class="px-2 py-2 border border-gray-200">${d.reportReplaced}</td>
                <td class="px-3 py-2 border border-gray-200 font-bold">${d.materialRecovered}</td>
            </tr>
        `).join('');
    }
};
