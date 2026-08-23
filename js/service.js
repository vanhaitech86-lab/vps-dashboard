// Dịch Vụ Tận Tâm Module - Dashboard & Table

window.ServiceModule = {
    name: 'Dịch Vụ Tận Tâm',
    localCompanyFilter: null,
    localMonthFilter: 'all',
    chartInstance: null,
    
    mockData: [
        { stt: 1, name: "Cổ Phước Thịnh", code: "THINHCY", dept: "ENGI", cty: "Tân Hồng Hà", tasks: 13, avgScore: 0, totalScore: 0, responseTime: 14.536, travelTo: 0.438, processingTime: 1.549, travelBack: 0.515, reportCreated: 0, reportReplaced: 0, materialRecovered: 0, month: '8' },
        { stt: 2, name: "Hồ Trung Nam", code: "NAMHT", dept: "ENGI", cty: "Việt", tasks: 57, avgScore: 0, totalScore: 0, responseTime: 21.117, travelTo: 0.248, processingTime: 0.168, travelBack: 0, reportCreated: 0, reportReplaced: 14, materialRecovered: 14, month: '8' },
        { stt: 3, name: "Phan Văn Nguyện", code: "NGUYENPV", dept: "ENGI", cty: "VPS M", tasks: 66, avgScore: 0, totalScore: 0, responseTime: 15.884, travelTo: 0.446, processingTime: 0.726, travelBack: 0.052, reportCreated: 0, reportReplaced: 23, materialRecovered: 21, month: '8' },
        { stt: 4, name: "Trương Quốc Bảo", code: "BAOTQ", dept: "ENGI", cty: "Xem Sơn", tasks: 44, avgScore: 0, totalScore: 0, responseTime: 14.863, travelTo: 0.631, processingTime: 0.416, travelBack: 0.001, reportCreated: 0, reportReplaced: 9, materialRecovered: 18, month: '8' }
    ],

    init() {
        this.render();
        window.addEventListener('filter-changed', () => {
            this.localCompanyFilter = null;
            this.render();
        });
    },

    parseData(selectedCty, selectedMonth) {
        let data = JSON.parse(JSON.stringify(this.mockData)); // copy mock data
        
        if (window.mockData && window.mockData.service_raw && window.mockData.service_raw.length > 1) {
            let csv = window.mockData.service_raw;
            let parsed = [];
            for (let i = 1; i < csv.length; i++) {
                let row = csv[i];
                if (!row || (!row[1] && !row[2])) continue; 
                
                let t = (row[15] !== undefined && row[15] !== '') ? row[15].toString().replace('Tháng', '').trim() : '8';
                
                parsed.push({
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
            if(parsed.length > 0) {
                data = parsed;
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
            <div style="height: calc(100vh - 100px); display: flex; flex-direction: column;">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                    <h2 style="font-size: 1.5rem; font-weight: bold; color: #1e293b; margin: 0;">Báo Cáo Chất Lượng Dịch Vụ</h2>
                    <div style="display: flex; align-items: center; gap: 10px;">
                        <label style="font-size: 0.9rem; font-weight: bold; color: #475569;">Chọn thời gian:</label>
                        <select id="service-month-filter" style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: white; font-weight: bold; outline: none; cursor: pointer;" onchange="window.ServiceModule.changeMonth(this.value)">
                            ${monthOptions}
                        </select>
                    </div>
                </div>

                <!-- Dashboard Section -->
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; display: flex; gap: 24px; min-height: 250px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="flex: 1; position: relative;">
                        <h3 style="text-align: center; font-weight: bold; color: #334155; margin-bottom: 10px;">Tỉ lệ công việc theo Đơn vị</h3>
                        <div style="height: 200px; display: flex; justify-content: center;">
                            <canvas id="serviceRatioChart"></canvas>
                        </div>
                        <div style="text-align: center; font-size: 0.75rem; color: #94a3b8; margin-top: 5px;">(Click vào biểu đồ để lọc dữ liệu)</div>
                    </div>
                    
                    <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 16px;">
                        <div style="background: #eef2ff; border-radius: 8px; padding: 20px; text-align: center;">
                            <div style="color: #4f46e5; font-size: 0.875rem; font-weight: bold; margin-bottom: 8px;">TỔNG NHÂN VIÊN DỊCH VỤ</div>
                            <div style="font-size: 2.5rem; font-weight: 900; color: #3730a3;" id="srv-total-emp">${data.length}</div>
                        </div>
                        <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; text-align: center;">
                            <div style="color: #16a34a; font-size: 0.875rem; font-weight: bold; margin-bottom: 8px;">TỔNG SỐ CÔNG VIỆC</div>
                            <div style="font-size: 2.5rem; font-weight: 900; color: #166534;" id="srv-total-tasks">${chartData.reduce((a,b)=>a+b, 0)}</div>
                        </div>
                    </div>
                </div>

                <!-- Table Section -->
                <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; flex-direction: column; flex: 1; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                    <div style="padding: 12px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                        <span style="font-weight: bold; color: #334155;" id="service-table-title">Chi tiết: Tất cả đơn vị</span>
                    </div>
                    <div style="overflow: auto; flex: 1;">
                        <table style="width: 100%; min-width: 1200px; text-align: center; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 0.875rem;">
                            <thead style="background-color: #E6E6FA; color: #333; position: sticky; top: 0; z-index: 10;">
                                <tr>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">STT</th>
                                    <th style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: bold;">HỌ VÀ TÊN NHÂN VIÊN</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">MÃ NV</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">BỘ PHẬN</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">SỐ CÔNG VIỆC</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">SỐ ĐIỂM TB</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TỔNG ĐIỂM</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TB THỜI GIAN ĐÁP ỨNG</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TB THỜI GIAN DI CHUYỂN ĐI</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TB THỜI GIAN XỬ LÝ</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TB THỜI GIAN DI CHUYỂN VỀ</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">SỐ BIÊN BẢN KTRA LẬP</th>
                                    <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">SỐ BIÊN BẢN KTRA THAY</th>
                                    <th style="padding: 8px 12px; border: 1px solid #cbd5e1; font-weight: bold;">SỐ LẦN ĐÃ THU HỒI VẬT TƯ CŨ</th>
                                </tr>
                            </thead>
                            <tbody id="service-table-body">
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
            if(title) title.innerHTML = `Chi tiết: <span style="color:#4f46e5; font-weight:bold;">${this.localCompanyFilter}</span> <button onclick="window.ServiceModule.clearLocalFilter()" style="margin-left:10px; font-size:0.75rem; background:#fee2e2; color:#ef4444; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">Hiển thị Tất cả</button>`;
        } else {
            if(title) title.innerHTML = `Chi tiết: Tất cả đơn vị`;
        }

        const empCount = document.getElementById('srv-total-emp');
        const taskCount = document.getElementById('srv-total-tasks');
        if(empCount) empCount.textContent = tableData.length;
        if(taskCount) taskCount.textContent = tableData.reduce((a,b)=>a+b.tasks, 0);

        tbody.innerHTML = tableData.map((d, i) => `
            <tr style="background: white; border-bottom: 1px solid #e2e8f0; transition: background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.stt || (i+1)}</td>
                <td style="padding: 8px 12px; border: 1px solid #e2e8f0; text-align: left; font-weight: 500; color: #1e293b;">${d.name}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.code}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.dept}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-weight: bold; color: #4f46e5;">${d.tasks}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; color: #16a34a;">${d.avgScore || 0}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; color: #16a34a;">${d.totalScore || 0}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.responseTime}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.travelTo}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.processingTime}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.travelBack}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.reportCreated}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.reportReplaced}</td>
                <td style="padding: 8px 12px; border: 1px solid #e2e8f0; font-weight: bold;">${d.materialRecovered}</td>
            </tr>
        `).join('');
    }
};
