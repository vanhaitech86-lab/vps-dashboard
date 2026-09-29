/**
 * Products Module
 */

window.FujifilmModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.loadData(e.detail.period, e.detail.company);
        });
        
        // Populate Dropdown Options
        const selectEl = document.getElementById('fujifilm-month-filter');
        if (selectEl) {
            const months = ['08/2026', '07/2026', '06/2026'];
            selectEl.innerHTML = '';
            months.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.textContent = 'THÁNG ' + m.split('/')[0];
                selectEl.appendChild(opt);
            });
            
            selectEl.addEventListener('change', (e) => {
                const companyFilter = document.getElementById('company-filter');
                this.renderUI(companyFilter ? companyFilter.value : 'all');
            });
        }
        
        this.generateMockData();
        
        // Parse from Google Sheets live data
        const rawProducts = (window.mockData && window.mockData.products_raw) 
            || (window.LIVE_GOOGLE_SHEETS_DATA && window.LIVE_GOOGLE_SHEETS_DATA.products_raw);

        if (rawProducts && rawProducts.length > 1) {
            let csv = rawProducts;
            let valMap = {};
            for (let i = 1; i < csv.length; i++) {
                let row = csv[i];
                if (!row || !row[0]) continue;
                
                let cty = row[0].toString().trim().toUpperCase();
                let hang = (row[2] || '').toString().trim().toUpperCase();
                let nhom = (row[3] || '').toString().trim().toUpperCase();
                let valStr = (row[4] || 0).toString().replace(/,/g, '');
                let val = parseFloat(valStr) || 0;
                
                // Only process matching Hang (FUJIFILM)
                if (hang !== 'FUJIFILM') continue;
                
                let cid = 'thh';
                if (cty.includes('VIỆT') || cty === 'VIET') cid = 'viet';
                else if (cty.includes('SƠN') || cty.includes('SON') || cty.includes('XESCO')) cid = 'xesco';
                else if (cty.includes('ITSS')) cid = 'itss';
                else if (cty.includes('VPS M') || cty === 'VPSM' || cty.includes('MIỀN TRUNG')) cid = 'vpsm';
                else if (cty.includes('HÀ') || cty.includes('THH')) cid = 'thh';
                
                let targetId = 'fuji_den';
                if (nhom.includes('MÀU')) targetId = 'fuji_mau';
                else if (nhom.includes('DÒNG NHỎ') || nhom.includes('NHỎ')) targetId = 'fuji_nho';
                else if (nhom.includes('DÒNG TRUNG') || nhom.includes('LỚN')) targetId = 'fuji_lon';
                else if (nhom.includes('MÁY IN')) targetId = 'fuji_in';
                else if (nhom.includes('VẬT TƯ') || nhom.includes('LINH KIỆN')) targetId = 'fuji_vat_tu';
                else if (nhom.includes('PHOTOCOPY') || nhom.includes('PHOTO') || nhom.includes('KỸ THUẬT SỐ')) targetId = 'fuji_den';
                
                let key = targetId + '|' + cid;
                valMap[key] = (valMap[key] || 0) + val;
            }
            
            // Map values to rows
            this.mockRows.forEach(row => {
                if (row.isSum || row.id === 'fujifilm' || !row.id) return;
                
                ['thh', 'viet', 'xesco', 'itss', 'vpsm'].forEach(cid => {
                    let key = row.id + '|' + cid;
                    if (valMap[key]) {
                        row.data[cid].th_ds = valMap[key];
                    }
                    let d = row.data[cid];
                    d.pct = d.kh_ds > 0 ? (d.th_ds / d.kh_ds * 100).toFixed(1) : (d.th_ds > 0 ? '100.0' : '0.0');
                });
            });
            
            // Recalculate 'all' column
            this.mockRows.forEach(row => {
                let d = row.data['all'];
                d.th_ds = 0; d.kh_ds = 0; d.th_sl = 0; d.kh_sl = 0;
                ['thh', 'viet', 'xesco', 'itss', 'vpsm'].forEach(cid => {
                    d.th_ds += row.data[cid].th_ds;
                    d.kh_ds += row.data[cid].kh_ds;
                    d.th_sl += row.data[cid].th_sl || 0;
                    if (typeof d.kh_sl !== 'string') d.kh_sl += (row.data[cid].kh_sl || 0);
                });
                d.pct = d.kh_ds > 0 ? (d.th_ds / d.kh_ds * 100).toFixed(1) : (d.th_ds > 0 ? '100.0' : '0.0');
            });
            
            // Recalculate 'tong' row
            let tongRow = this.mockRows.find(r => r.id === 'tong');
            if (tongRow) {
                ['thh', 'viet', 'xesco', 'itss', 'vpsm', 'all'].forEach(cid => {
                    tongRow.data[cid].th_ds = 0;
                    tongRow.data[cid].kh_ds = 0;
                    this.mockRows.forEach(r => {
                        if (r.id !== 'tong' && r.id !== 'fujifilm' && !r.name.includes('&nbsp;')) {
                            tongRow.data[cid].th_ds += r.data[cid].th_ds;
                            tongRow.data[cid].kh_ds += r.data[cid].kh_ds;
                        }
                    });
                    let d = tongRow.data[cid];
                    d.pct = d.kh_ds > 0 ? (d.th_ds / d.kh_ds * 100).toFixed(1) : (d.th_ds > 0 ? '100.0' : '0.0');
                });
            }
        }

        this.renderUI('all');
    },

    async loadData(period, company) {
        this.renderUI(company);
    },
    
    generateMockData() {
        const rows = [
            { id: 'tong', stt: '', name: 'TỔNG DOANH SỐ', style: 'background: #fef08a; font-weight: bold;', isSum: true },
            { id: 'fujifilm', stt: 'II', name: 'SẢN PHẨM CHUYÊN TRÁCH A3 FUJIFILM', style: 'background: #fdba74; font-weight: bold;' },
            { id: 'fuji_lon', stt: 'II.1', name: 'MÁY A3 DÒNG TRUNG, LỚN' },
            { id: 'fuji_den', stt: '1', name: 'MÁY PHOTOCOPY TRẮNG ĐEN - LỚN' },
            { id: 'fuji_mau', stt: '2', name: 'MÁY PHOTOCOPY MÀU' },
            { id: 'fuji_nho', stt: 'II.2', name: 'MÁY DÒNG NHỎ' },
            { id: 'fuji_in', stt: 'II.3', name: 'MÁY IN' },
            { id: 'fuji_vat_tu', stt: 'II.4', name: 'VẬT TƯ, LINH KIỆN' }
        ];

        this.mockRows = [];
        const companies = ['thh', 'xesco', 'viet', 'vpsm', 'itss', 'all'];

        rows.forEach(r => {
            let rowData = { ...r, data: {} };
            companies.forEach(c => {
                let kh_sl = 0;
                let kh_ds = 0;
                let th_sl = 0;
                let th_ds = 0;
                if (r.name.includes('VẬT TƯ')) kh_sl = '-';
                
                rowData.data[c] = {
                    kh_sl, kh_ds, th_sl, th_ds,
                    pct: '0.0'
                };
            });
            this.mockRows.push(rowData);
        });
    },

    renderUI(company) {
        if (!this.mockRows) this.generateMockData();
        
        let compKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) compKey = 'thh';
        else if (company === 'Xem Sơn' || company.includes('Xem')) compKey = 'xesco';
        else if (company === 'Việt' || company.includes('Vi')) compKey = 'viet';
        else if (company === 'VPS M' || company.includes('VPS')) compKey = 'vpsm';
        else if (company === 'ITSS' || company.includes('ITSS')) compKey = 'itss'; 
        else compKey = 'all';

        this.renderTable(compKey);
        this.renderCharts(compKey);
    },

    renderTable(compKey) {
        const cols = ['thh', 'xesco', 'viet', 'vpsm', 'itss'];
        cols.forEach(c => {
            const elements = document.querySelectorAll('.col-' + c);
            if (compKey === 'all' || compKey === c) {
                elements.forEach(el => el.style.display = '');
            } else {
                elements.forEach(el => el.style.display = 'none');
            }
        });

        const tbody = document.querySelector('#fujifilmTable tbody');
        if (!tbody) return;

        let tbodyHTML = '';
        this.mockRows.forEach(r => {
            let trStyle = r.style || '';
            let bgStt = r.style ? r.style.match(/background: [^;]+;/) : '';
            let bgStyle = bgStt ? bgStt[0] : 'background: #fff;';
            let html = `<tr style="${trStyle}">
                <td style="text-align: center; position: sticky; left: 0; ${bgStyle} z-index: 1;">${r.stt}</td>
                <td style="text-align: left; position: sticky; left: 40px; ${bgStyle} z-index: 1;">${r.name}</td>`;
            
            ['thh', 'xesco', 'viet', 'vpsm', 'itss', 'all'].forEach(c => {
                let display = (compKey !== 'all' && compKey !== c && c !== 'all') ? 'none' : '';
                let isBold = r.isSum || r.stt === 'I' || r.stt === 'II';
                let fw = isBold ? 'font-weight: bold;' : '';
                
                let d = r.data[c];
                html += `
                    <td class="col-${c}" style="display: ${display}; ${fw}">${typeof d.kh_sl === 'string' ? d.kh_sl : d.kh_sl.toLocaleString('vi-VN')}</td>
                    <td class="col-${c}" style="display: ${display}; ${fw}">${d.kh_ds.toLocaleString('vi-VN')}</td>
                    <td class="col-${c}" style="display: ${display}; ${fw}">${d.th_sl.toLocaleString('vi-VN')}</td>
                    <td class="col-${c}" style="display: ${display}; ${fw}">${d.th_ds.toLocaleString('vi-VN')}</td>
                    <td class="col-${c}" style="display: ${display}; ${fw} color: ${parseFloat(d.pct) > 90 ? 'green' : 'red'};">${d.pct}%</td>
                `;
            });
            html += '</tr>';
            tbodyHTML += html;
        });

        tbody.innerHTML = tbodyHTML;
    },
    
    renderCharts(compKey) {
        if (!window.ChartManager) return;
        
        // 1. Bar Chart: Kế Hoạch vs Thực Hiện (Doanh Số) for Companies
        const barLabels = ['THH', 'XESCO', 'VIỆT', 'VPSM', 'ITSS'];
        const tongRow = this.mockRows.find(r => r.id === 'tong');
        
        const keys = ['thh', 'xesco', 'viet', 'vpsm', 'itss'];
        let planData = [];
        let actualData = [];
        
        keys.forEach(k => {
            planData.push(tongRow.data[k].kh_ds);
            actualData.push(tongRow.data[k].th_ds);
        });

        const barConfig = {
            labels: barLabels,
            datasets: [
                {
                    label: 'Kế Hoạch',
                    data: planData,
                    backgroundColor: '#94a3b8'
                },
                {
                    label: 'Thực Hiện',
                    data: actualData,
                    backgroundColor: '#0ea5e9'
                }
            ]
        };
        
        window.ChartManager.createChart('fujifilmBarChart', 'bar', barConfig, {
            maintainAspectRatio: false,
            plugins: {
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + new Intl.NumberFormat('vi-VN').format(context.raw) + ' VNĐ';
                        }
                    }
                }
            }
        });
        
        // 2. Pie Chart: Doanh số thực hiện theo từng dòng sản phẩm
        const productRows = this.mockRows.filter(r => r.id !== 'tong' && r.id !== 'fujifilm' && !r.name.includes('&nbsp;'));
        
        const pieLabels = productRows.map(r => r.name);
        const pieData = productRows.map(r => r.data[compKey].th_ds);
        
        const pieConfig = {
            labels: pieLabels,
            datasets: [{
                data: pieData,
                backgroundColor: ['#f87171', '#fb923c', '#fbbf24', '#a3e635', '#34d399', '#22d3ee', '#818cf8', '#c084fc', '#f472b6', '#94a3b8'],
                borderWidth: 1
            }]
        };
        
        window.ChartManager.createChart('fujifilmPieChart', 'pie', pieConfig, {
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom' },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + new Intl.NumberFormat('vi-VN').format(context.raw) + ' VNĐ';
                        }
                    }
                }
            }
        });
    }
};
