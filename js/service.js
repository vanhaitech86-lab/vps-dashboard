// Dịch Vụ Tận Tâm & Khiếu Nại Module - Combined

window.ServiceModule = {
    name: 'Dịch Vụ Tận Tâm',
    localCompanyFilter: null,
    localMonthFilter: 'all',
    chartInstance: null,
    
    complaintCompanyFilter: null,
    complaintMonthFilter: 'all',
    complaintChartInstance: null,
    
    serviceMockData: [
        { stt: 1, name: "Cổ Phước Thịnh", code: "THINHCY", dept: "ENGI", cty: "Tân Hồng Hà", tasks: 13, avgScore: 0, totalScore: 0, responseTime: 14.536, travelTo: 0.438, processingTime: 1.549, travelBack: 0.515, reportCreated: 0, reportReplaced: 0, materialRecovered: 0, month: '8' },
        { stt: 2, name: "Hồ Trung Nam", code: "NAMHT", dept: "ENGI", cty: "Việt", tasks: 57, avgScore: 0, totalScore: 0, responseTime: 21.117, travelTo: 0.248, processingTime: 0.168, travelBack: 0, reportCreated: 0, reportReplaced: 14, materialRecovered: 14, month: '8' },
        { stt: 3, name: "Phan Văn Nguyện", code: "NGUYENPV", dept: "ENGI", cty: "VPS M", tasks: 66, avgScore: 0, totalScore: 0, responseTime: 15.884, travelTo: 0.446, processingTime: 0.726, travelBack: 0.052, reportCreated: 0, reportReplaced: 23, materialRecovered: 21, month: '8' }
    ],

    complaintMockData: [
        { customerName: "CÔNG TY TNHH KHÁCH SẠN GRAND", customerCode: "KH5425", device: "FFC2060-330195", contract: "XMK-KH5425-002", date: "2026-08-03", content: "KẸT GIẤY - GỌI DỨT ĐIỂM", complainer: "PHÁT", staff: "Lê Chí Công", processContent: "", result: "Hướng dẫn KH in khổ giấy nhỏ", cty: "Tân Hồng Hà", month: '8' },
        { customerName: "CÔNG TY CP TM DV XNK D", customerCode: "KH017910", device: "AP5570-130210", contract: "XMK-KH017910-001", date: "2026-08-11", content: "SCAN BỊ MÉO", complainer: "A TÙNG", staff: "Lê Chí Công", processContent: "", result: "Chỉnh cân đối lại", cty: "Việt", month: '8' }
    ],

    init() {
        this.render();
        window.addEventListener('filter-changed', () => {
            this.localCompanyFilter = null;
            this.complaintCompanyFilter = null;
            this.render();
        });
    },

    // ==========================================
    // SERVICE METHODS
    // ==========================================
    parseServiceData(selectedCty, selectedMonth) {
        let data = JSON.parse(JSON.stringify(this.serviceMockData));
        if (window.mockData && window.mockData.service_raw && window.mockData.service_raw.length > 1) {
            let csv = window.mockData.service_raw;
            let parsed = [];
            for (let i = 1; i < csv.length; i++) {
                let row = csv[i];
                if (!row || (!row[1] && !row[2])) continue; 
                let t = (row[15] !== undefined && row[15] !== '') ? row[15].toString().replace('Tháng', '').trim() : '8';
                parsed.push({
                    stt: row[0] || i, name: row[1] || '', code: row[2] || '', dept: row[3] || '',
                    cty: row[4] ? row[4].toString().trim() : '',
                    tasks: parseFloat(row[5]) || 0, avgScore: parseFloat(row[6]) || 0, totalScore: parseFloat(row[7]) || 0,
                    responseTime: parseFloat(row[8]) || 0, travelTo: parseFloat(row[9]) || 0, processingTime: parseFloat(row[10]) || 0,
                    travelBack: parseFloat(row[11]) || 0, reportCreated: parseFloat(row[12]) || 0, reportReplaced: parseFloat(row[13]) || 0,
                    materialRecovered: parseFloat(row[14]) || 0, month: t
                });
            }
            if(parsed.length > 0) data = parsed;
        }
        return this.filterData(data, selectedCty, selectedMonth);
    },

    // ==========================================
    // COMPLAINTS METHODS
    // ==========================================
    parseComplaintsData(selectedCty, selectedMonth) {
        let data = JSON.parse(JSON.stringify(this.complaintMockData));
        if (window.mockData && window.mockData.complaints_raw && window.mockData.complaints_raw.length > 1) {
            let csv = window.mockData.complaints_raw;
            let parsed = [];
            for (let i = 1; i < csv.length; i++) {
                let row = csv[i];
                if (!row || !row[0]) continue; 
                
                // Parse Month from Date (row[4])
                let dateStr = row[4] ? row[4].toString().trim() : '';
                let m = '8';
                if(dateStr.includes('-')) {
                    let parts = dateStr.split('-');
                    if(parts.length >= 2) m = parseInt(parts[1]).toString();
                } else if(dateStr.includes('/')) {
                    let parts = dateStr.split('/');
                    if(parts.length >= 2) m = parseInt(parts[1]).toString(); // dd/mm/yyyy
                }

                parsed.push({
                    customerName: row[0] || '',
                    customerCode: row[1] || '',
                    device: row[2] || '',
                    contract: row[3] || '',
                    date: dateStr,
                    content: row[5] || '',
                    complainer: row[6] || '',
                    staff: row[7] || '',
                    processContent: row[8] || '',
                    result: row[9] || '',
                    cty: row[10] ? row[10].toString().trim() : 'Tân Hồng Hà', // Default fallback
                    month: m
                });
            }
            if(parsed.length > 0) data = parsed;
        }
        return this.filterData(data, selectedCty, selectedMonth);
    },

    // ==========================================
    // UTILS
    // ==========================================
    filterData(data, selectedCty, selectedMonth) {
        if (selectedCty && selectedCty !== 'all') {
            data = data.filter(d => {
                let cUpper = (d.cty || '').toUpperCase();
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

    getUniqueMonths(rawCsv, colIndex) {
        let months = new Set();
        if (rawCsv && rawCsv.length > 1) {
            for (let i = 1; i < rawCsv.length; i++) {
                if(rawCsv[i] && rawCsv[i][colIndex]) {
                    let dateStr = rawCsv[i][colIndex].toString().trim();
                    let m = '';
                    if(dateStr.includes('Tháng')) {
                        m = dateStr.replace('Tháng', '').trim();
                    } else if (dateStr.includes('-')) {
                        m = parseInt(dateStr.split('-')[1]).toString();
                    } else if (dateStr.includes('/')) {
                        m = parseInt(dateStr.split('/')[1]).toString();
                    }
                    if(m) months.add(m);
                }
            }
        }
        if(months.size === 0) months.add('8');
        return Array.from(months).sort((a,b) => parseInt(a) - parseInt(b));
    },

    // ==========================================
    // RENDER
    // ==========================================
    render() {
        const container = document.getElementById('view-service');
        if (!container) return;
        
        let cty = 'all';
        if(window.FilterManager && window.FilterManager.currentCompany) {
            cty = window.FilterManager.currentCompany;
        }

        // --- SERVICE DATA ---
        const svcData = this.parseServiceData(cty, this.localMonthFilter);
        const svcMonths = this.getUniqueMonths(window.mockData ? window.mockData.service_raw : null, 15);
        let svcCompanyStats = {};
        svcData.forEach(d => {
            let cName = d.cty || 'Khác';
            if(!svcCompanyStats[cName]) svcCompanyStats[cName] = 0;
            svcCompanyStats[cName] += d.tasks;
        });
        const svcLabels = Object.keys(svcCompanyStats);
        const svcChartData = Object.values(svcCompanyStats);
        
        let svcMonthOpts = `<option value="all">Tất cả các tháng</option>`;
        svcMonths.forEach(m => { svcMonthOpts += `<option value="${m}" ${this.localMonthFilter == m ? 'selected' : ''}>Tháng ${m}</option>`; });


        // --- COMPLAINTS DATA ---
        const cmpData = this.parseComplaintsData(cty, this.complaintMonthFilter);
        const cmpMonths = this.getUniqueMonths(window.mockData ? window.mockData.complaints_raw : null, 4); // Date is Col E (index 4)
        let cmpCompanyStats = {};
        cmpData.forEach(d => {
            let cName = d.cty || 'Khác';
            if(!cmpCompanyStats[cName]) cmpCompanyStats[cName] = 0;
            cmpCompanyStats[cName] += 1; // 1 complaint per row
        });
        const cmpLabels = Object.keys(cmpCompanyStats);
        const cmpChartData = Object.values(cmpCompanyStats);
        
        let cmpMonthOpts = `<option value="all">Tất cả các tháng</option>`;
        cmpMonths.forEach(m => { cmpMonthOpts += `<option value="${m}" ${this.complaintMonthFilter == m ? 'selected' : ''}>Tháng ${m}</option>`; });


        // --- RENDER HTML ---
        let html = `
            <div style="display: flex; flex-direction: column; gap: 40px; padding-bottom: 40px;">
                
                <!-- ============================== -->
                <!-- 1. BÁO CÁO CHẤT LƯỢNG DỊCH VỤ -->
                <!-- ============================== -->
                <div style="display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1e293b; margin: 0; border-left: 5px solid #4f46e5; padding-left: 10px;">BÁO CÁO CHẤT LƯỢNG DỊCH VỤ</h2>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <label style="font-size: 0.9rem; font-weight: bold; color: #475569;">Chọn thời gian:</label>
                            <select style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: white; font-weight: bold; outline: none; cursor: pointer;" onchange="window.ServiceModule.changeMonth('service', this.value)">
                                ${svcMonthOpts}
                            </select>
                        </div>
                    </div>

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
                                <div style="font-size: 2.5rem; font-weight: 900; color: #3730a3;" id="srv-total-emp">${svcData.length}</div>
                            </div>
                            <div style="background: #f0fdf4; border-radius: 8px; padding: 20px; text-align: center;">
                                <div style="color: #16a34a; font-size: 0.875rem; font-weight: bold; margin-bottom: 8px;">TỔNG SỐ CÔNG VIỆC</div>
                                <div style="font-size: 2.5rem; font-weight: 900; color: #166534;" id="srv-total-tasks">${svcChartData.reduce((a,b)=>a+b, 0)}</div>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="padding: 12px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: bold; color: #334155;" id="service-table-title">Chi tiết: Tất cả đơn vị</span>
                        </div>
                        <div style="overflow: auto; max-height: 400px;">
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
                                <tbody id="service-table-body"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- ============================== -->
                <!-- 2. BÁO CÁO KHIẾU NẠI KHÁCH HÀNG -->
                <!-- ============================== -->
                <div style="display: flex; flex-direction: column;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                        <h2 style="font-size: 1.5rem; font-weight: bold; color: #1e293b; margin: 0; border-left: 5px solid #ef4444; padding-left: 10px;">BÁO CÁO KHIẾU NẠI KHÁCH HÀNG</h2>
                        <div style="display: flex; align-items: center; gap: 10px;">
                            <label style="font-size: 0.9rem; font-weight: bold; color: #475569;">Chọn thời gian:</label>
                            <select style="border: 1px solid #cbd5e1; border-radius: 4px; padding: 6px 12px; background: white; font-weight: bold; outline: none; cursor: pointer;" onchange="window.ServiceModule.changeMonth('complaint', this.value)">
                                ${cmpMonthOpts}
                            </select>
                        </div>
                    </div>

                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 20px; display: flex; gap: 24px; min-height: 250px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="flex: 1; position: relative;">
                            <h3 style="text-align: center; font-weight: bold; color: #334155; margin-bottom: 10px;">Tỉ lệ khiếu nại theo Đơn vị</h3>
                            <div style="height: 200px; display: flex; justify-content: center;">
                                <canvas id="complaintRatioChart"></canvas>
                            </div>
                            <div style="text-align: center; font-size: 0.75rem; color: #94a3b8; margin-top: 5px;">(Click vào biểu đồ để lọc dữ liệu)</div>
                        </div>
                        
                        <div style="flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 16px;">
                            <div style="background: #fef2f2; border-radius: 8px; padding: 20px; text-align: center;">
                                <div style="color: #ef4444; font-size: 0.875rem; font-weight: bold; margin-bottom: 8px;">TỔNG SỐ VỤ KHIẾU NẠI</div>
                                <div style="font-size: 2.5rem; font-weight: 900; color: #b91c1c;" id="cmp-total">${cmpChartData.reduce((a,b)=>a+b, 0)}</div>
                            </div>
                        </div>
                    </div>

                    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; display: flex; flex-direction: column; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                        <div style="padding: 12px 16px; background: #f8fafc; border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
                            <span style="font-weight: bold; color: #334155;" id="complaint-table-title">Chi tiết: Tất cả đơn vị</span>
                        </div>
                        <div style="overflow: auto; max-height: 400px;">
                            <table style="width: 100%; min-width: 1200px; text-align: center; border-collapse: collapse; font-family: Arial, sans-serif; font-size: 0.875rem;">
                                <thead style="background-color: #fee2e2; color: #333; position: sticky; top: 0; z-index: 10;">
                                    <tr>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">STT</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TÊN KHÁCH HÀNG</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">MÃ KH</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">TÊN THIẾT BỊ</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">MÃ/ SỐ HĐ</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">NGÀY KHIẾU NẠI</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">NỘI DUNG KHIẾU NẠI</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">NGƯỜI KHIẾU NẠI</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">NV XỬ LÝ</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">NỘI DUNG XL</th>
                                        <th style="padding: 8px; border: 1px solid #cbd5e1; font-weight: bold;">KẾT QUẢ XỬ LÝ</th>
                                    </tr>
                                </thead>
                                <tbody id="complaint-table-body"></tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        `;
        
        container.innerHTML = html;
        this.renderServiceChart(svcLabels, svcChartData, svcData);
        this.renderServiceTable(svcData);
        
        this.renderComplaintChart(cmpLabels, cmpChartData, cmpData);
        this.renderComplaintTable(cmpData);
    },

    changeMonth(type, month) {
        if(type === 'service') {
            this.localMonthFilter = month;
        } else {
            this.complaintMonthFilter = month;
        }
        this.render();
    },

    clearFilter(type) {
        if(type === 'service') this.localCompanyFilter = null;
        else this.complaintCompanyFilter = null;
        
        let cty = 'all';
        if(window.FilterManager && window.FilterManager.currentCompany) {
            cty = window.FilterManager.currentCompany;
        }
        
        if (type === 'service') {
            this.renderServiceTable(this.parseServiceData(cty, this.localMonthFilter));
        } else {
            this.renderComplaintTable(this.parseComplaintsData(cty, this.complaintMonthFilter));
        }
    },

    // ==========================================
    // SUB-RENDERS
    // ==========================================
    renderServiceChart(labels, chartData, data) {
        if (this.chartInstance) this.chartInstance.destroy();
        const ctx = document.getElementById('serviceRatioChart');
        if (!ctx) return;

        this.chartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: chartData,
                    backgroundColor: ['#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899', '#14B8A6'],
                    borderWidth: 2, hoverOffset: 10
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        this.localCompanyFilter = labels[elements[0].index];
                        let cty = (window.FilterManager && window.FilterManager.currentCompany) || 'all';
                        this.renderServiceTable(this.parseServiceData(cty, this.localMonthFilter));
                    } else {
                        this.clearFilter('service');
                    }
                },
                onHover: (e, el) => e.native.target.style.cursor = el[0] ? 'pointer' : 'default'
            }
        });
    },

    renderComplaintChart(labels, chartData, data) {
        if (this.complaintChartInstance) this.complaintChartInstance.destroy();
        const ctx = document.getElementById('complaintRatioChart');
        if (!ctx) return;

        this.complaintChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: chartData,
                    backgroundColor: ['#EF4444', '#F59E0B', '#10B981', '#4F46E5', '#8B5CF6', '#EC4899', '#14B8A6'],
                    borderWidth: 2, hoverOffset: 10
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { position: 'right' } },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        this.complaintCompanyFilter = labels[elements[0].index];
                        let cty = (window.FilterManager && window.FilterManager.currentCompany) || 'all';
                        this.renderComplaintTable(this.parseComplaintsData(cty, this.complaintMonthFilter));
                    } else {
                        this.clearFilter('complaint');
                    }
                },
                onHover: (e, el) => e.native.target.style.cursor = el[0] ? 'pointer' : 'default'
            }
        });
    },

    renderServiceTable(data) {
        const tbody = document.getElementById('service-table-body');
        const title = document.getElementById('service-table-title');
        if (!tbody) return;

        let tableData = data;
        if (this.localCompanyFilter) {
            tableData = data.filter(d => d.cty === this.localCompanyFilter);
            if(title) title.innerHTML = `Chi tiết: <span style="color:#4f46e5; font-weight:bold;">${this.localCompanyFilter}</span> <button onclick="window.ServiceModule.clearFilter('service')" style="margin-left:10px; font-size:0.75rem; background:#fee2e2; color:#ef4444; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">Hiển thị Tất cả</button>`;
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
    },

    renderComplaintTable(data) {
        const tbody = document.getElementById('complaint-table-body');
        const title = document.getElementById('complaint-table-title');
        if (!tbody) return;

        let tableData = data;
        if (this.complaintCompanyFilter) {
            tableData = data.filter(d => d.cty === this.complaintCompanyFilter);
            if(title) title.innerHTML = `Chi tiết: <span style="color:#ef4444; font-weight:bold;">${this.complaintCompanyFilter}</span> <button onclick="window.ServiceModule.clearFilter('complaint')" style="margin-left:10px; font-size:0.75rem; background:#fee2e2; color:#ef4444; border:none; padding:4px 8px; border-radius:4px; cursor:pointer;">Hiển thị Tất cả</button>`;
        } else {
            if(title) title.innerHTML = `Chi tiết: Tất cả đơn vị`;
        }

        const cmpTotal = document.getElementById('cmp-total');
        if(cmpTotal) cmpTotal.textContent = tableData.length; // 1 complaint per row

        tbody.innerHTML = tableData.map((d, i) => `
            <tr style="background: white; border-bottom: 1px solid #e2e8f0; transition: background 0.2s;" onmouseover="this.style.background='#fef2f2'" onmouseout="this.style.background='white'">
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${i+1}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: left; font-weight: 500; color: #1e293b;">${d.customerName}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.customerCode}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-size: 0.8rem;">${d.device}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; font-size: 0.8rem;">${d.contract}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; color: #475569;">${d.date}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: left; color: #ef4444; font-weight: bold;">${d.content}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0;">${d.complainer}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; color: #4f46e5; font-weight: 500;">${d.staff}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: left;">${d.processContent}</td>
                <td style="padding: 8px; border: 1px solid #e2e8f0; text-align: left; color: #16a34a;">${d.result}</td>
            </tr>
        `).join('');
    }
};
