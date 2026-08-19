/**
 * Debt Module
 */

window.DebtModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.loadData(e.detail.period, e.detail.company);
        });
        
        const localFilter = document.getElementById('bad-debt-company-filter');
        if (localFilter) {
            localFilter.addEventListener('change', (e) => {
                if (this.currentData) {
                    this.renderTable(this.currentData.badDebtsList, e.target.value);
                }
            });
        }
    },

    async loadData(period, company) {
        const data = await window.DataService.getDebtData(period, company);
        this.currentData = data;
        this.updateUI(data, company);
    },

    updateUI(data, company) {
        
        const companyNameMap = {
            'all': 'Tất cả',
            'THH': 'Tân Hồng Hà',
            'Viet': 'Việt',
            'XemSon': 'Xem Sơn',
            'VPSM': 'VPS M',
            'ITSS': 'ITSS',
            'VPVPS': 'Văn phòng VPS'
        };

        let dataKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) dataKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) dataKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem')) dataKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M')) dataKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) dataKey = 'ITSS'; 
        else if (company !== 'all') dataKey = 'VPVPS';

        // Chart
        let labels = [], currentData = [], overdueData = [], badData = [];
        
        if (company === 'all') {
            for (const [compName, compData] of Object.entries(data.byCompany)) {
                labels.push(compName);
                currentData.push(compData.current);
                overdueData.push(compData.overdue);
                badData.push(compData.bad);
            }
        } else {
            const compData = data.byCompany[dataKey];
            if(compData) {
                labels = [company];
                currentData = [compData.current];
                overdueData = [compData.overdue];
                badData = [compData.bad];
            }
        }

        const chartData = {
            labels: labels,
            datasets: [
                {
                    label: 'Trong hạn',
                    data: currentData,
                    backgroundColor: '#2E86AB',
                },
                {
                    label: 'Quá hạn',
                    data: overdueData,
                    backgroundColor: '#FFC107',
                },
                {
                    label: 'Khó đòi',
                    data: badData,
                    backgroundColor: '#DC3545',
                }
            ]
        };

        window.ChartManager.createChart('debtChart', 'bar', chartData, {
             scales: {
                x: { stacked: true },
                y: { stacked: true }
            },
            plugins: {
                datalabels: {
                    color: '#ffffff',
                    font: { weight: 'bold', size: 12 },
                    formatter: function(value) {
                        if (value === 0) return '';
                        return value;
                    },
                    textStrokeColor: 'rgba(0,0,0,0.3)',
                    textStrokeWidth: 2
                }
            }
        });

        // Table
        this.renderTable(data.badDebtsList, company);
    },

    renderTable(list, companyFilter) {
        const tbody = document.getElementById('bad-debt-table-body');
        if(!tbody) return;
        
        tbody.innerHTML = '';
        
        const filteredList = companyFilter === 'all' 
            ? list 
            : list.filter(item => item.company === companyFilter);
            
        if (filteredList.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="text-center">Không có dữ liệu</td></tr>`;
            return;
        }

        let totalAmount = 0;
        filteredList.forEach(item => {
            totalAmount += item.amount;
            const tr = document.createElement('tr');
            
            // Format currency
            const amountFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.amount);
            
            tr.innerHTML = `
                <td><strong>${item.customer}</strong></td>
                <td><span class="badge" style="background:#eee; color:#333; padding:2px 6px; border-radius:4px;">${item.company}</span></td>
                <td style="color:var(--clr-danger); font-weight:600;">${amountFormatted}</td>
                <td><span class="status-overdue">${item.daysOverdue} ngày</span></td>
                <td>${item.status}</td>
            `;
            tbody.appendChild(tr);
        });

        // Add total row
        const totalTr = document.createElement('tr');
        totalTr.style.background = '#f8f9fa';
        totalTr.style.fontWeight = 'bold';
        totalTr.innerHTML = `
            <td colspan="2" style="text-align: right;">TỔNG CỘNG:</td>
            <td style="color:var(--clr-danger);">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</td>
            <td colspan="2"></td>
        `;
        tbody.appendChild(totalTr);
    }
};
