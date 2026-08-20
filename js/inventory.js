/**
 * Inventory Module
 */

window.InventoryModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.renderUI(e.detail.company);
        });
        
        // Setup initial table structure
        const thead = document.querySelector('#inventoryTable thead');
        if (thead) {
            thead.innerHTML = `
                <tr style="background: #a3e635; font-size: 0.95rem;">
                    <th style="width: 50px; text-align: center; position: sticky; left: 0; z-index: 2; background: #a3e635;">STT</th>
                    <th style="min-width: 200px; position: sticky; left: 50px; z-index: 2; background: #a3e635;">ĐƠN VỊ / PHÂN LOẠI</th>
                    <th style="text-align: right;">HP</th>
                    <th style="text-align: right;">Fujifilm</th>
                    <th style="text-align: right;">Olivetti / VCOPY</th>
                    <th style="text-align: right;">Bonsai / AIN</th>
                    <th style="text-align: right;">Khác</th>
                    <th style="text-align: right; background: rgba(0,0,0,0.05);">Cộng</th>
                </tr>
            `;
        }
        
        this.generateData();
        this.renderUI('all');
    },
    
    generateData() {
        this.invData = [
            {
                company: "THH",
                stt: "I",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [16236861538, 2691167947, 145461859, 1196919790, 351112106] },
                    { stt: "2", name: "Option/phần mềm", vals: [724129217, 316631629, null, null, 84155594] },
                    { stt: "3", name: "Consumable", vals: [1697362872, 3893921782, 595000, null, 477185636] },
                    { stt: "4", name: "Part", vals: [422875719, 1842798361, 1300000, 250000, 232552257] },
                    { stt: "5", name: "Khác", vals: [6907408, 250000, null, null, 15330882] }
                ]
            },
            {
                company: "VIỆT",
                stt: "II",
                headers: ["HP", "Fujifilm", "VCOPY", "AIN", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [789169565, null, null, null, 865846304] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, 3770311, null, null, null] },
                    { stt: "3", name: "Consumable", vals: [671194009, 407253157, null, null, 1163183311] },
                    { stt: "4", name: "Part", vals: [4151324, 154791890, null, null, 294985264] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 317282276] }
                ]
            },
            {
                company: "XESCO",
                stt: "III",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [8045068951, 2429722467, 198937517, 1061511065, 162201573] },
                    { stt: "2", name: "Option/phần mềm", vals: [5929018372, 146022831, null, null, 44239635] },
                    { stt: "3", name: "Consumable", vals: [1887432428, 6988196768, 131323207, null, 481597314] },
                    { stt: "4", name: "Part", vals: [339925051, 1653586022, null, 10264441, 126635862] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 5238960] }
                ]
            },
            {
                company: "VPSM",
                stt: "IV",
                headers: ["HP", "Fujifilm", "Olivetti", "Bonsai", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [691079773, 712194005, 72694670, 129401638, null] },
                    { stt: "2", name: "Option/phần mềm", vals: [7499646, null, null, null, null] },
                    { stt: "3", name: "Consumable vật tư", vals: [1081355202, 1479770277, null, null, null] },
                    { stt: "4", name: "Part/ Linh kiện", vals: [null, 129401638, null, null, null] },
                    { stt: "5", name: "Khác", vals: [null, null, null, null, 338569147] }
                ]
            },
            {
                company: "VPS",
                stt: "V",
                headers: ["HP", "Fujifilm", "Olivetti + GL", "Bonsai", "Khác", "Cộng"],
                rows: [
                    { stt: "1", name: "Máy", vals: [1761370959, 242362282, 468416955, 456721, 1300471] },
                    { stt: "2", name: "Option/phần mềm", vals: [null, null, null, null, null] },
                    { stt: "3", name: "Consumable vật tư", vals: [null, 213306355, null, null, null] },
                    { stt: "4", name: "Part/ Linh kiện", vals: [3008139, 610122393, null, null, 704976] },
                    { stt: "5", name: "Khác", vals: [null, 37499514, null, null, 8574286] }
                ]
            }
        ];
    },

    renderUI(companyFilter) {
        if(!this.invData) this.generateData();
        let compKey = 'all';
        if (companyFilter === 'Tân Hồng Hà' || (companyFilter.includes('T') && companyFilter.includes('H'))) compKey = 'THH';
        else if (companyFilter === 'Xem Sơn' || companyFilter.includes('Xem')) compKey = 'XESCO';
        else if (companyFilter === 'Việt' || companyFilter.includes('Vi')) compKey = 'VIỆT';
        else if (companyFilter === 'VPS M' || companyFilter.includes('VPS M')) compKey = 'VPSM';
        else if (companyFilter === 'ITSS' || companyFilter.includes('ITSS')) compKey = 'VPS'; 
        
        let totalBrands = [0, 0, 0, 0, 0, 0];
        
        const tbody = document.querySelector('#inventoryTable tbody');
        if (!tbody) return;
        
        let html = '';
        
        let isAll = compKey === 'all';
        
        let activeBlocks = this.invData.filter(d => isAll || d.company === compKey);
        
        activeBlocks.forEach(block => {
            let blockSums = [0, 0, 0, 0, 0, 0];
            
            let rowsHtml = '';
            block.rows.forEach(r => {
                let rowSum = 0;
                r.vals.forEach(v => rowSum += (v || 0));
                
                for(let i=0; i<5; i++) blockSums[i] += (r.vals[i] || 0);
                blockSums[5] += rowSum;
                
                rowsHtml += `<tr>
                    <td style="text-align: center; position: sticky; left: 0; z-index: 1; background: #fff;">${r.stt}</td>
                    <td style="position: sticky; left: 50px; z-index: 1; background: #fff;">${r.name}</td>
                    <td style="text-align: right;">${r.vals[0] ? r.vals[0].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right;">${r.vals[1] ? r.vals[1].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right;">${r.vals[2] ? r.vals[2].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right;">${r.vals[3] ? r.vals[3].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right;">${r.vals[4] ? r.vals[4].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right; background: rgba(0,0,0,0.02); font-weight: bold;">${rowSum ? rowSum.toLocaleString('vi-VN') : ''}</td>
                </tr>`;
            });
            
            for(let i=0; i<6; i++) totalBrands[i] += blockSums[i];
            
            html += `
                <tr style="background: #a3e635; font-weight: bold;">
                    <td style="text-align: center; position: sticky; left: 0; z-index: 1; background: #a3e635;">${block.stt}</td>
                    <td style="position: sticky; left: 50px; z-index: 1; background: #a3e635;">${block.company}</td>
                    <td style="text-align: right;">${block.headers[0]}</td>
                    <td style="text-align: right;">${block.headers[1]}</td>
                    <td style="text-align: right;">${block.headers[2]}</td>
                    <td style="text-align: right;">${block.headers[3]}</td>
                    <td style="text-align: right;">${block.headers[4]}</td>
                    <td style="text-align: right;">${block.headers[5]}</td>
                </tr>
            `;
            
            html += rowsHtml;
            
            html += `
                <tr style="background: #bae6fd; font-weight: bold;">
                    <td style="position: sticky; left: 0; z-index: 1; background: #bae6fd;"></td>
                    <td style="position: sticky; left: 50px; z-index: 1; background: #bae6fd;">Tổng cộng</td>
                    <td style="text-align: right;">${blockSums[0] ? blockSums[0].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right;">${blockSums[1] ? blockSums[1].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right;">${blockSums[2] ? blockSums[2].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right;">${blockSums[3] ? blockSums[3].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right;">${blockSums[4] ? blockSums[4].toLocaleString('vi-VN') : ''}</td>
                    <td style="text-align: right; color: #b91c1c;">${blockSums[5] ? blockSums[5].toLocaleString('vi-VN') : ''}</td>
                </tr>
            `;
        });
        
        if (isAll) {
            let masterHeader = `
                <tr style="background: #fde047; font-weight: bold; font-size: 1.1rem;">
                    <td style="text-align: center; position: sticky; left: 0; z-index: 2; background: #fde047;">A</td>
                    <td style="position: sticky; left: 50px; z-index: 2; background: #fde047;">TỔNG TẬP ĐOÀN</td>
                    <td style="text-align: right;">${totalBrands[0].toLocaleString('vi-VN')}</td>
                    <td style="text-align: right;">${totalBrands[1].toLocaleString('vi-VN')}</td>
                    <td style="text-align: right;">${totalBrands[2].toLocaleString('vi-VN')}</td>
                    <td style="text-align: right;">${totalBrands[3].toLocaleString('vi-VN')}</td>
                    <td style="text-align: right;">${totalBrands[4].toLocaleString('vi-VN')}</td>
                    <td style="text-align: right; color: #b91c1c;">${totalBrands[5].toLocaleString('vi-VN')}</td>
                </tr>
            `;
            html = masterHeader + html;
        }
        
        document.getElementById('inventory-total-val').innerText = (totalBrands[5] / 1000000000).toLocaleString('vi-VN', {minimumFractionDigits: 1, maximumFractionDigits: 1}) + ' Tỷ VND';
        
        tbody.innerHTML = html;
        
        if (window.ChartManager) {
            const chartData = {
                labels: ['HP', 'Fujifilm', 'Olivetti / VCOPY', 'Bonsai / AIN', 'Khác'],
                datasets: [{
                    data: totalBrands.slice(0, 5),
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
