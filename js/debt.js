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
            const compData = data.byCompany[company];
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

        filteredList.forEach(item => {
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
    }
};
