// Dịch Vụ Tận Tâm Module - Table Only Version

window.ServiceModule = {
    name: 'Dịch Vụ Tận Tâm',
    
    mockData: [
        { stt: 1, name: "Cổ Phước Thịnh", code: "THINHCY", dept: "ENGI", cty: "Tân Hồng Hà", tasks: 13, avgScore: 0, totalScore: 0, responseTime: 14.536, travelTo: 0.438, processingTime: 1.549, travelBack: 0.515, reportCreated: 0, reportReplaced: 0, materialRecovered: 0 },
        { stt: 2, name: "Hồ Trung Nam", code: "NAMHT", dept: "ENGI", cty: "Việt", tasks: 57, avgScore: 0, totalScore: 0, responseTime: 21.117, travelTo: 0.248, processingTime: 0.168, travelBack: 0, reportCreated: 0, reportReplaced: 14, materialRecovered: 14 },
        { stt: 3, name: "Phan Văn Nguyện", code: "NGUYENPV", dept: "ENGI", cty: "VPS M", tasks: 66, avgScore: 0, totalScore: 0, responseTime: 15.884, travelTo: 0.446, processingTime: 0.726, travelBack: 0.052, reportCreated: 0, reportReplaced: 23, materialRecovered: 21 },
        { stt: 4, name: "Trương Quốc Bảo", code: "BAOTQ", dept: "ENGI", cty: "Xem Sơn", tasks: 44, avgScore: 0, totalScore: 0, responseTime: 14.863, travelTo: 0.631, processingTime: 0.416, travelBack: 0.001, reportCreated: 0, reportReplaced: 9, materialRecovered: 18 }
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
                if (!row || !row[1]) continue; // check if Name exists
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

        let html = `
            <div class="animate-fade-in" style="height: calc(100vh - 150px); display: flex; flex-direction: column;">
                <div class="flex justify-between items-center mb-4">
                    <h2 class="text-2xl font-bold text-gray-800">Báo Cáo Chất Lượng Dịch Vụ</h2>
                    <div class="text-sm text-gray-500">Dữ liệu hiển thị chi tiết theo định dạng báo cáo Excel</div>
                </div>

                <div class="bg-white shadow-sm border border-gray-200 overflow-auto" style="flex: 1; border-radius: 4px;">
                    <table class="min-w-full text-sm text-center whitespace-nowrap border-collapse" style="font-family: Arial, sans-serif;">
                        <thead style="background-color: #E6E6FA; color: #333; position: sticky; top: 0; z-index: 10;">
                            <tr>
                                <th class="px-2 py-3 border border-gray-300 font-bold">STT</th>
                                <th class="px-3 py-3 border border-gray-300 font-bold">HỌ VÀ TÊN NHÂN VIÊN</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">MÃ NV</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">BỘ PHẬN</th>
                                <th class="px-3 py-3 border border-gray-300 font-bold">CÔNG TY</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">SỐ CÔNG VIỆC</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">SỐ ĐIỂM TB</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">TỔNG ĐIỂM</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">TB THỜI GIAN ĐÁP ỨNG</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">TB THỜI GIAN DI CHUYỂN ĐI</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">TB THỜI GIAN XỬ LÝ</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">TB THỜI GIAN DI CHUYỂN VỀ</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">SỐ BIÊN BẢN KTRA LẬP</th>
                                <th class="px-2 py-3 border border-gray-300 font-bold">SỐ BIÊN BẢN KTRA THAY</th>
                                <th class="px-3 py-3 border border-gray-300 font-bold">SỐ LẦN ĐÃ THU HỒI VẬT TƯ CŨ</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-gray-200">
                            ${data.map((d, i) => `
                                <tr class="hover:bg-gray-50 bg-white">
                                    <td class="px-2 py-2 border border-gray-200">${d.stt || (i+1)}</td>
                                    <td class="px-3 py-2 border border-gray-200 text-left font-medium">${d.name}</td>
                                    <td class="px-2 py-2 border border-gray-200">${d.code}</td>
                                    <td class="px-2 py-2 border border-gray-200">${d.dept}</td>
                                    <td class="px-3 py-2 border border-gray-200">${d.cty}</td>
                                    <td class="px-2 py-2 border border-gray-200 font-bold">${d.tasks}</td>
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
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
    }
};
