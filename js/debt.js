/**
 * Debt Module
 */

window.DebtModule = {
    currentData: null,
    currentFilter: 'all',

    normalizeCompKey(comp) {
        if (!comp || comp === 'all' || comp === 'Tất cả' || comp === 'ĐƠN VỊ' || comp === 'TẤT CẢ' || comp.includes('TẤT CẢ') || comp.includes('Tất cả')) return 'all';
        const s = comp.toString().trim().toLowerCase();
        if (s === 'thh' || s.includes('tân hồng hà') || s.includes('tan hong ha')) return 'THH';
        if (s === 'viet' || s.includes('việt') || s.includes('viet')) return 'Viet';
        if (s === 'xemson' || s.includes('xem') || s.includes('xesco')) return 'XemSon';
        if (s === 'vpsm' || s.includes('vps m') || s.includes('vpsm')) return 'VPSM';
        if (s === 'itss' || s.includes('itss')) return 'ITSS';
        if (s === 'vpvps' || s.includes('văn phòng') || s.includes('van phong')) return 'VPVPS';
        return comp;
    },

    getCompanyDisplayName(comp) {
        const key = this.normalizeCompKey(comp);
        const names = {
            'all': 'Tất cả đơn vị',
            'THH': 'Tân Hồng Hà',
            'Viet': 'Việt',
            'XemSon': 'Xem Sơn',
            'VPSM': 'VPS M',
            'ITSS': 'ITSS',
            'VPVPS': 'Văn phòng VPS'
        };
        return names[key] || comp;
    },

    syncDropdown(comp) {
        const localFilter = document.getElementById('bad-debt-company-filter');
        if (!localFilter) return;
        const targetKey = this.normalizeCompKey(comp);
        for (let i = 0; i < localFilter.options.length; i++) {
            const optVal = localFilter.options[i].value;
            if (this.normalizeCompKey(optVal) === targetKey) {
                localFilter.selectedIndex = i;
                return;
            }
        }
    },

    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
            const comp = canViewAll ? e.detail.company : (window.AuthService ? window.AuthService.getAllowedCompany() : e.detail.company);
            this.loadData(e.detail.period, comp);
        });
        
        const localFilter = document.getElementById('bad-debt-company-filter');
        if (localFilter) {
            const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
            if (!canViewAll) {
                const allowed = window.AuthService ? window.AuthService.getAllowedCompany() : 'Tân Hồng Hà';
                this.syncDropdown(allowed);
                localFilter.disabled = true;
            } else {
                localFilter.addEventListener('change', (e) => {
                    this.selectCompany(e.target.value, false);
                });
            }
        }

        const resetBtn = document.getElementById('bad-debt-reset-filter');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.selectCompany('all', false);
            });
        }
    },

    async loadData(period, company) {
        const data = await window.DataService.getDebtData(period, company);
        this.currentData = data;
        this.updateUI(data, company);
    },

    selectCompany(compName, scroll = true) {
        const filterKey = this.normalizeCompKey(compName);
        this.currentFilter = filterKey;
        this.syncDropdown(filterKey);
        
        if (this.currentData && this.currentData.badDebtsList) {
            this.renderTable(this.currentData.badDebtsList, filterKey);
        }

        const titleEl = document.getElementById('bad-debt-title');
        const resetBtn = document.getElementById('bad-debt-reset-filter');
        if (titleEl) {
            if (filterKey === 'all') {
                titleEl.textContent = 'Danh Sách Khách Hàng Khó Đòi';
            } else {
                titleEl.textContent = `Danh Sách Khách Hàng Khó Đòi - ${this.getCompanyDisplayName(filterKey)}`;
            }
        }
        if (resetBtn) {
            resetBtn.style.display = (filterKey === 'all') ? 'none' : 'inline-flex';
        }

        if (scroll) {
            const tableCard = titleEl ? titleEl.closest('.card') : null;
            if (tableCard) {
                tableCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                tableCard.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
                tableCard.style.boxShadow = '0 0 0 3px rgba(46, 134, 171, 0.4)';
                setTimeout(() => {
                    tableCard.style.boxShadow = '';
                }, 1200);
            }
        }
    },

    updateUI(data, company) {
        const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
        if (!canViewAll) {
            company = window.AuthService ? window.AuthService.getAllowedCompany() : company;
        }

        const filterKey = this.normalizeCompKey(company);
        
        // Chart
        let labels = [], currentData = [], overdueData = [], badData = [];
        const compOrder = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
        
        const getCompVals = (k) => {
            if (!data || !data.byCompany) return { current: 0, overdue: 0, bad: 0 };
            if (data.byCompany[k]) return data.byCompany[k];
            for (const [key, val] of Object.entries(data.byCompany)) {
                if (this.normalizeCompKey(key) === k) return val;
            }
            return { current: 0, overdue: 0, bad: 0 };
        };

        if (filterKey === 'all') {
            compOrder.forEach(compName => {
                const compData = getCompVals(compName);
                labels.push(this.getCompanyDisplayName(compName));
                currentData.push(compData.current || 0);
                overdueData.push(compData.overdue || 0);
                badData.push(compData.bad || 0);
            });
            if (data.byCompany) {
                for (const [compName, compData] of Object.entries(data.byCompany)) {
                    const normK = this.normalizeCompKey(compName);
                    if (!compOrder.includes(normK) && normK !== 'all') {
                        labels.push(this.getCompanyDisplayName(compName));
                        currentData.push(compData.current || 0);
                        overdueData.push(compData.overdue || 0);
                        badData.push(compData.bad || 0);
                    }
                }
            }
        } else {
            const compData = getCompVals(filterKey);
            labels = [this.getCompanyDisplayName(filterKey)];
            currentData = [compData.current || 0];
            overdueData = [compData.overdue || 0];
            badData = [compData.bad || 0];
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
            onClick: (event, elements, chart) => {
                if (elements && elements.length > 0) {
                    const index = elements[0].index;
                    const clickedLabel = chart.data.labels[index];
                    if (clickedLabel) {
                        this.selectCompany(clickedLabel, true);
                    }
                }
            },
            onHover: (event, elements) => {
                const canvas = event?.chart?.canvas || document.getElementById('debtChart');
                if (canvas) {
                    canvas.style.cursor = (elements && elements.length > 0) ? 'pointer' : 'default';
                }
            },
            plugins: {
                datalabels: {
                    color: '#ffffff',
                    font: { weight: 'bold', size: 11 },
                    formatter: function(value) {
                        if (!value || value === 0) return '';
                        return Number(value).toLocaleString('vi-VN', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
                    },
                    textStrokeColor: 'rgba(0,0,0,0.5)',
                    textStrokeWidth: 2
                }
            }
        });

        // Initialize Table
        this.selectCompany(filterKey, false);
    },

    renderTable(list, companyFilter) {
        const tbody = document.getElementById('bad-debt-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = '';
        
        if (!list || !Array.isArray(list)) list = [];
        const filterKey = this.normalizeCompKey(companyFilter);
        
        const filteredList = (filterKey === 'all')
            ? list 
            : list.filter(item => this.normalizeCompKey(item.company) === filterKey);
            
        if (filteredList.length === 0) {
            const compName = this.getCompanyDisplayName(filterKey);
            tbody.innerHTML = `<tr><td colspan="5" class="text-center" style="padding: 24px; color: #64748b; font-style: italic;">Không có dữ liệu nợ khó đòi cho đơn vị <strong>${compName}</strong></td></tr>`;
            return;
        }

        let totalAmount = 0;
        filteredList.forEach(item => {
            totalAmount += (Number(item.amount) || 0);
            const tr = document.createElement('tr');
            
            // Format currency
            const amountFormatted = new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.amount || 0);
            const days = item.daysOverdue ? item.daysOverdue.toString() : '';
            const daysText = days.includes('ngày') ? days : (days ? `${days} ngày` : '-');
            const compDisplay = this.getCompanyDisplayName(item.company);

            tr.innerHTML = `
                <td><strong>${item.customer || '-'}</strong></td>
                <td><span class="badge" style="background:#f1f5f9; color:#334155; padding:3px 8px; border-radius:4px; font-weight:600; font-size:0.75rem;">${compDisplay}</span></td>
                <td style="color:var(--clr-danger); font-weight:700;">${amountFormatted}</td>
                <td><span class="status-overdue" style="background:#fee2e2; color:#b91c1c; padding:2px 6px; border-radius:4px; font-size:0.75rem; font-weight:500;">${daysText}</span></td>
                <td><span style="font-size:0.85rem; color:#475569;">${item.status || '-'}</span></td>
            `;
            tbody.appendChild(tr);
        });

        // Add total row
        const totalTr = document.createElement('tr');
        totalTr.style.background = '#f8fafc';
        totalTr.style.fontWeight = 'bold';
        totalTr.innerHTML = `
            <td colspan="2" style="text-align: right; padding-right: 15px; color:#1e293b;">TỔNG CỘNG (${filteredList.length} khách hàng):</td>
            <td style="color:var(--clr-danger); font-size: 0.95rem;">${new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalAmount)}</td>
            <td colspan="2"></td>
        `;
        tbody.appendChild(totalTr);
    }
};
