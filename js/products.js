/**
 * Products Module
 */

window.ProductsModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.loadData(e.detail.period, e.detail.company);
        });
        
        // Populate Dropdown Options
        const selectEl = document.getElementById('products-month-filter');
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
                this.renderTable(companyFilter ? companyFilter.value : 'all');
            });
        }
        
        // Initial load
        this.renderTable('all');
    },

    async loadData(period, company) {
        // Here we would normally fetch from DataService. 
        // For now, we just update the UI visibility based on company filter.
        this.renderTable(company);
    },

    renderTable(company) {
        // Map UI company dropdown string to matrix keys
        let compKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) compKey = 'thh';
        else if (company === 'Xem Sơn' || company.includes('Xem')) compKey = 'xesco';
        else if (company === 'Việt' || company.includes('Vi')) compKey = 'viet';
        else if (company === 'VPS M' || company.includes('VPS')) compKey = 'vpsm';
        else if (company === 'ITSS' || company.includes('ITSS')) compKey = 'itss'; 
        else compKey = 'all';

        // Manage Column Visibility
        const cols = ['thh', 'xesco', 'viet', 'vpsm', 'itss'];
        
        cols.forEach(c => {
            const elements = document.querySelectorAll(`.col-${c}`);
            if (compKey === 'all' || compKey === c) {
                elements.forEach(el => el.style.display = '');
            } else {
                elements.forEach(el => el.style.display = 'none');
            }
        });

        const tbody = document.querySelector('#productsTable tbody');
        if (!tbody) return;

        // Rows definition based on image
        const rows = [
            { stt: '', name: 'TỔNG DOANH SỐ', style: 'background: #fef08a; font-weight: bold;', isSum: true },
            { stt: 'I', name: 'SẢN PHẨM CHUYÊN TRÁCH A3 HP', style: 'background: #fdba74; font-weight: bold;' },
            { stt: '1.1', name: 'MÁY ĐÓNG TRUNG, LỚN' },
            { stt: '1', name: 'MÁY PHOTOCOPY TRẮNG ĐEN - LỚN' },
            { stt: '2', name: 'MÁY PHOTOCOPY MÀU' },
            { stt: '1.2', name: 'MÁY ĐÓNG NHỎ' },
            { stt: '1.3', name: 'VẬT TƯ, LINH KIỆN' },
            { stt: '1.4', name: 'MÁY IN A4' },
            { stt: '', name: '&nbsp;&nbsp;&nbsp;&nbsp;HP 108W' },
            { stt: '', name: '&nbsp;&nbsp;&nbsp;&nbsp;MÁY IN HP KHÁC' },
            { stt: '1.5', name: 'MÁY SCAN' },
            { stt: '1.6', name: 'MÁY TÍNH (LAPTOP & DESKTOP)' },
            { stt: '1.7', name: 'POLY' }
        ];

        // Generate Mock Data for now to show the user how it looks
        // In reality, this would come from Google Sheets
        let tbodyHTML = '';
        rows.forEach(r => {
            let trStyle = r.style || '';
            let bgStt = r.style ? r.style.match(/background: [^;]+;/) : '';
            let bgStyle = bgStt ? bgStt[0] : 'background: #fff;';
            let html = `<tr style="${trStyle}">
                <td style="text-align: center; position: sticky; left: 0; ${bgStyle} z-index: 1;">${r.stt}</td>
                <td style="text-align: left; position: sticky; left: 40px; ${bgStyle} z-index: 1;">${r.name}</td>`;
            
            // Loop through each company and generate mock columns
            ['thh', 'xesco', 'viet', 'vpsm', 'itss', 'all'].forEach(c => {
                let display = (compKey !== 'all' && compKey !== c && c !== 'all') ? 'none' : '';
                
                // Mock numbers based on row
                let isBold = r.isSum || r.stt === 'I';
                let fw = isBold ? 'font-weight: bold;' : '';
                
                let kh_sl = Math.floor(Math.random() * 5000);
                let kh_ds = Math.floor(Math.random() * 200000);
                let th_sl = Math.floor(kh_sl * (Math.random() * 0.5 + 0.5));
                let th_ds = Math.floor(kh_ds * (Math.random() * 0.5 + 0.5));
                let pct = (th_ds / (kh_ds || 1) * 100).toFixed(1) + '%';
                
                if (r.name.includes('VẬT TƯ')) kh_sl = '-';

                html += `
                    <td class="col-${c}" style="display: ${display}; ${fw}">${typeof kh_sl === 'string' ? kh_sl : kh_sl.toLocaleString('vi-VN')}</td>
                    <td class="col-${c}" style="display: ${display}; ${fw}">${kh_ds.toLocaleString('vi-VN')}</td>
                    <td class="col-${c}" style="display: ${display}; ${fw}">${th_sl.toLocaleString('vi-VN')}</td>
                    <td class="col-${c}" style="display: ${display}; ${fw}">${th_ds.toLocaleString('vi-VN')}</td>
                    <td class="col-${c}" style="display: ${display}; ${fw} color: ${parseFloat(pct) > 90 ? 'green' : 'red'};">${pct}</td>
                `;
            });
            html += `</tr>`;
            tbodyHTML += html;
        });

        tbody.innerHTML = tbodyHTML;
    }
};
