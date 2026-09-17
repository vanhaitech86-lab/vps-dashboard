/**
 * Inventory Module
 */

window.InventoryModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.renderUI(e.detail.company);
        });
        
        // Setup initial table structure with 2-tier headers: SL and Giá Trị for each brand
        const thead = document.querySelector('#inventoryTable thead');
        if (thead) {
            thead.innerHTML = this.getTheadHtml();
        }
        
        this.generateData();
        const initComp = window.FilterManager ? window.FilterManager.currentCompany : (window.AuthService ? window.AuthService.getAllowedCompany() : 'all');
        this.renderUI(initComp);
    },

    getTheadHtml() {
        return `
            <tr style="background: #84cc16; color: #0f172a; font-size: 0.9rem; text-align: center;">
                <th rowspan="2" style="width: 40px; vertical-align: middle; background: #84cc16; border-right: 1px solid #65a30d;">STT</th>
                <th rowspan="2" style="min-width: 140px; vertical-align: middle; background: #84cc16; border-right: 1px solid #65a30d;">ĐƠN VỊ / PHÂN LOẠI</th>
                <th colspan="2" style="background: #a3e635; border-right: 1px solid #65a30d; font-weight: 800;">HP</th>
                <th colspan="2" style="background: #84cc16; border-right: 1px solid #65a30d; font-weight: 800;">FUJIFILM</th>
                <th colspan="2" style="background: #a3e635; border-right: 1px solid #65a30d; font-weight: 800;">OLIVETTI / VCOPY</th>
                <th colspan="2" style="background: #84cc16; border-right: 1px solid #65a30d; font-weight: 800;">BONSAI / AIN</th>
                <th colspan="2" style="background: #a3e635; border-right: 1px solid #65a30d; font-weight: 800;">KHÁC</th>
                <th colspan="2" style="background: #fde047; color: #713f12; font-weight: 800; border-left: 2px solid #ca8a04;">TỔNG CỘNG</th>
            </tr>
            <tr style="background: #bef264; font-size: 0.8rem; text-align: right;">
                <!-- HP -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 105px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Fujifilm -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 105px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Olivetti / VCOPY -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 95px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Bonsai / AIN -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 95px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Khác -->
                <th style="background: #ecfccb; color: #0369a1; font-weight: 700; width: 60px; text-align: right; border-right: 1px solid #d9f99d;">SL</th>
                <th style="background: #f7fee7; color: #334155; font-weight: 700; min-width: 95px; text-align: right; border-right: 1px solid #65a30d;">Giá trị</th>
                <!-- Tổng cộng -->
                <th style="background: #fef08a; color: #0369a1; font-weight: 800; min-width: 85px; text-align: right; border-left: 2px solid #ca8a04; border-right: 1px solid #fde047;">TỔNG SL</th>
                <th style="background: #fef9c3; color: #b91c1c; font-weight: 800; min-width: 125px; text-align: right;">CỘNG (VNĐ)</th>
            </tr>
        `;
    },
    
    generateData() {
        this.invData = [
            {
                company: "THH",
                stt: "I",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [16236861538, 2691167947, 145461859, 1196919790, 351112106], qtys: [406, 67, 4, 30, 8] },
                    { stt: "2", name: "Option/phần mềm", vals: [724129217, 316631629, null, null, 84155594], qtys: [207, 90, 0, 0, 24] },
                    { stt: "3", name: "Consumable", vals: [1697362872, 3893921782, 595000, null, 477185636], qtys: [1415, 3245, 1, 0, 397] },
                    { stt: "4", name: "Part", vals: [422875719, 1842798361, 1300000, 250000, 232552257], qtys: [651, 2835, 2, 1, 356] },
                    { stt: "5", name: "Khác", vals: [6907408, 250000, null, null, 15330882], qtys: [14, 1, 0, 0, 30] }
                ]
            },
            {
                company: "VIỆT",
                stt: "II",
                headers: ["HP", "Fujifilm", "VCOPY", "AIN", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [789169565, null, null, null, 865846304], qtys: [23, 0, 0, 0, 25] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, 3770311, null, null, null], qtys: [0, 2, 0, 0, 0] },
                    { stt: "3", name: "Consumable", vals: [671194009, 407253157, null, null, 1163183311], qtys: [560, 339, 0, 0, 969] },
                    { stt: "4", name: "Part", vals: [4151324, 154791890, null, null, 294985264], qtys: [7, 245, 0, 0, 468] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 317282276], qtys: [0, 0, 0, 0, 125] }
                ]
            },
            {
                company: "XESCO",
                stt: "III",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [8045068951, 2429722467, 198937517, 1061511065, 162201573], qtys: [201, 61, 5, 27, 4] },
                    { stt: "2", name: "Option/phần mềm", vals: [5929018372, 146022831, null, null, 44239635], qtys: [1694, 41, 0, 0, 13] },
                    { stt: "3", name: "Consumable", vals: [1887432428, 6988196768, 131323207, null, 481597314], qtys: [1424, 6020, 99, 0, 364] },
                    { stt: "4", name: "Part", vals: [339925051, 1653586022, null, 10264441, 126635862], qtys: [523, 2544, 0, 16, 194] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 5238960], qtys: [0, 0, 0, 0, 12] }
                ]
            },
            {
                company: "VPSM",
                stt: "IV",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [691079773, 712194005, 72694670, 129401638, null], qtys: [18, 19, 2, 3, 0] },
                    { stt: "2", name: "Option/phần mềm", vals: [7499646, null, null, null, null], qtys: [3, 0, 0, 0, 0] },
                    { stt: "3", name: "Consumable vật tư", vals: [1081355202, 1479770277, null, null, null], qtys: [901, 1233, 0, 0, 0] },
                    { stt: "4", name: "Part/ Linh kiện", vals: [null, 129401638, null, null, null], qtys: [0, 199, 0, 0, 0] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 338569147], qtys: [0, 0, 0, 0, 142] }
                ]
            },
            {
                company: "VPS",
                stt: "V",
                headers: ["HP", "Fujifilm", "Olivetti + GL", "Bonsai", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [1761370959, 242362282, 468416955, 456721, 1300471], qtys: [54, 7, 1, 0, 0] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null], qtys: [0, 0, 0, 0, 0] },
                    { stt: "3", name: "Consumable vật tư", vals: [null, 213306355, null, null, null], qtys: [0, 178, 0, 0, 0] },
                    { stt: "4", name: "Part/ Linh kiện", vals: [3008139, 610122393, null, null, 704976], qtys: [5, 938, 0, 0, 1] },
                    { stt: "5", name: "Khác", vals: [null, 37499514, null, null, 8574286], qtys: [0, 47, 0, 0, 11] }
                ]
            }
        ];
    },

    renderUI(companyFilter) {
        if(!this.invData) this.generateData();

        // RBAC: Non-admin/non-CEO can ONLY view their assigned company
        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
        if (!canViewAll) {
            companyFilter = window.AuthService ? window.AuthService.getAllowedCompany() : companyFilter;
        }

        let compKey = 'all';
        if (companyFilter === 'Tân Hồng Hà' || (companyFilter && companyFilter.includes('T') && companyFilter.includes('H'))) compKey = 'THH';
        else if (companyFilter === 'Xem Sơn' || (companyFilter && companyFilter.includes('Xem'))) compKey = 'XESCO';
        else if (companyFilter === 'Việt' || (companyFilter && companyFilter.includes('Vi'))) compKey = 'VIỆT';
        else if (companyFilter === 'VPS M' || (companyFilter && companyFilter.includes('VPS M'))) compKey = 'VPSM';
        else if (companyFilter === 'ITSS' || (companyFilter && companyFilter.includes('ITSS'))) compKey = 'VPS';
        else if (!canViewAll) compKey = 'THH';
        
        let totalBrandsVal = [0, 0, 0, 0, 0];
        let totalBrandsQty = [0, 0, 0, 0, 0];
        let masterTotalVal = 0;
        let masterTotalQty = 0;
        
        const thead = document.querySelector('#inventoryTable thead');
        if (thead) {
            thead.innerHTML = this.getTheadHtml();
        }

        const tbody = document.querySelector('#inventoryTable tbody');
        if (!tbody) return;
        
        let html = '';
        // Only Admin & CEO can view all companies + Master A
        let isAll = canViewAll && (compKey === 'all');
        let activeBlocks = this.invData.filter(d => isAll || d.company === compKey);
        
        activeBlocks.forEach(block => {
            let blockSumsVal = [0, 0, 0, 0, 0];
            let blockSumsQty = [0, 0, 0, 0, 0];
            let blockTotalVal = 0;
            let blockTotalQty = 0;
            
            let rowsHtml = '';
            block.rows.forEach(r => {
                let rowSumVal = 0;
                let rowSumQty = 0;
                let brandCells = '';
                
                for(let i=0; i<5; i++) {
                    const q = (r.qtys && r.qtys[i] != null) ? r.qtys[i] : 0;
                    const v = (r.vals && r.vals[i] != null) ? r.vals[i] : 0;
                    rowSumVal += v;
                    rowSumQty += q;
                    blockSumsVal[i] += v;
                    blockSumsQty[i] += q;
                    
                    brandCells += `
                        <td style="text-align: right; color: #0369a1; font-weight: 600; background: #f0fdf4; border-left: 1px solid #e2e8f0;">${q ? q.toLocaleString('vi-VN') : '-'}</td>
                        <td style="text-align: right; background: #fff;">${v ? v.toLocaleString('vi-VN') : ''}</td>
                    `;
                }
                
                blockTotalVal += rowSumVal;
                blockTotalQty += rowSumQty;
                
                rowsHtml += `<tr>
                    <td style="text-align: center; background: #fff;">${r.stt}</td>
                    <td style="background: #fff; font-weight: 600;">${r.name}</td>
                    ${brandCells}
                    <td style="text-align: right; font-weight: 800; color: #0369a1; background: #fef08a; border-left: 2px solid #ca8a04;">${rowSumQty ? rowSumQty.toLocaleString('vi-VN') : '0'}</td>
                    <td style="text-align: right; font-weight: 800; color: #b91c1c; background: #fef9c3;">${rowSumVal ? rowSumVal.toLocaleString('vi-VN') : ''}</td>
                </tr>`;
            });
            
            for(let i=0; i<5; i++) {
                totalBrandsVal[i] += blockSumsVal[i];
                totalBrandsQty[i] += blockSumsQty[i];
            }
            masterTotalVal += blockTotalVal;
            masterTotalQty += blockTotalQty;
            
            // Company Header Row
            html += `
                <tr style="background: #a3e635; font-weight: bold; font-size: 0.9rem;">
                    <td style="text-align: center; background: #a3e635;">${block.stt}</td>
                    <td style="background: #a3e635; font-weight: 800;">${block.company}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[0]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[1]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[2]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[3]}</td>
                    <td style="text-align: center; background: #bef264; color: #0369a1; font-size: 0.75rem; border-left: 1px solid #84cc16;">SL</td>
                    <td style="text-align: right; background: #a3e635;">${block.headers[4]}</td>
                    <td style="text-align: right; background: #fde047; color: #0369a1; font-weight: 800; border-left: 2px solid #ca8a04;">TỔNG SL</td>
                    <td style="text-align: right; background: #fef08a; color: #b91c1c; font-weight: 800;">${block.headers[5] || 'CỘNG'}</td>
                </tr>
            `;
            
            html += rowsHtml;
            
            // Company Total Row
            let blockTotalCells = '';
            for(let i=0; i<5; i++) {
                blockTotalCells += `
                    <td style="text-align: right; font-weight: 700; color: #0369a1; background: #bfdbfe; border-left: 1px solid #93c5fd;">${blockSumsQty[i] ? blockSumsQty[i].toLocaleString('vi-VN') : '0'}</td>
                    <td style="text-align: right; font-weight: 700; color: #1e3a8a; background: #bae6fd;">${blockSumsVal[i] ? blockSumsVal[i].toLocaleString('vi-VN') : ''}</td>
                `;
            }
            
            html += `
                <tr style="background: #bae6fd; font-weight: bold;">
                    <td style="background: #bae6fd;"></td>
                    <td style="background: #bae6fd; font-weight: 800;">Tổng cộng</td>
                    ${blockTotalCells}
                    <td style="text-align: right; font-weight: 800; color: #0369a1; background: #93c5fd; border-left: 2px solid #60a5fa;">${blockTotalQty.toLocaleString('vi-VN')}</td>
                    <td style="text-align: right; font-weight: 800; color: #b91c1c; background: #bae6fd;">${blockTotalVal.toLocaleString('vi-VN')}</td>
                </tr>
            `;
        });
        
        // Master Header Row (A. TỔNG TẬP ĐOÀN)
        if (isAll) {
            let masterBrandCells = '';
            for(let i=0; i<5; i++) {
                masterBrandCells += `
                    <td style="text-align: right; background: #fef08a; color: #0369a1; font-weight: 800; border-left: 1px solid #eab308;">${totalBrandsQty[i] ? totalBrandsQty[i].toLocaleString('vi-VN') : '0'}</td>
                    <td style="text-align: right; background: #fef9c3; color: #1e3a8a; font-weight: 800;">${totalBrandsVal[i] ? totalBrandsVal[i].toLocaleString('vi-VN') : ''}</td>
                `;
            }
            
            let masterHeader = `
                <tr style="background: #fde047; font-weight: bold; font-size: 0.95rem;">
                    <td style="text-align: center; background: #fde047; font-weight: 800;">A</td>
                    <td style="background: #fde047; font-weight: 800;">TỔNG TẬP ĐOÀN</td>
                    ${masterBrandCells}
                    <td style="text-align: right; background: #fef08a; color: #0369a1; font-weight: 800; border-left: 2px solid #ca8a04; font-size: 1rem;">${masterTotalQty.toLocaleString('vi-VN')}</td>
                    <td style="text-align: right; background: #fef9c3; color: #b91c1c; font-weight: 800; font-size: 1rem;">${masterTotalVal.toLocaleString('vi-VN')}</td>
                </tr>
            `;
            html = masterHeader + html;
        }
        
        const totalValEl = document.getElementById('inventory-total-val');
        if (totalValEl) {
            totalValEl.innerText = (masterTotalVal / 1000000000).toLocaleString('vi-VN', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' Tỷ VND';
        }
        const totalQtyEl = document.getElementById('inventory-total-qty');
        if (totalQtyEl) {
            totalQtyEl.innerText = masterTotalQty.toLocaleString('vi-VN') + ' SP/TB';
        }
        
        tbody.innerHTML = html;
        
        if (window.ChartManager) {
            const chartData = {
                labels: ['HP', 'Fujifilm', 'Olivetti / VCOPY', 'Bonsai / AIN', 'Khác'],
                datasets: [{
                    data: totalBrandsVal,
                    backgroundColor: ['#2563eb', '#16a34a', '#ca8a04', '#0891b2', '#64748b'],
                    borderWidth: 1
                }]
            };

            window.ChartManager.createChart('inventoryChart', 'doughnut', chartData, {
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.raw !== null) {
                                    label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' VND';
                                }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        color: '#fff',
                        font: { weight: 'bold' },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => { sum += data; });
                            if(sum === 0) return '0%';
                            let percentage = (value * 100 / sum).toFixed(1) + "%";
                            return percentage;
                        }
                    }
                }
            });
        }
    }
};
