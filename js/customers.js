/**
 * Customers Module - VPS Dashboard
 * Redesigned to exact specification:
 * - 5 Executive KPI Cards: Tổng KH, KH Mới, KH Mất (Màu đỏ), Phát sinh / KH Mất, KH Hiện có
 * - Charts: Cơ cấu KH hiện có theo mảng & Biến động KH Mới vs KH Mất (Màu đỏ)
 * - Table: Replicating exact structure of "Báo Cáo Chi Tiết Cơ Cấu Khách Hàng" from user image
 * - Recency buckets (3, 6 months) completely removed
 */

window.CustomersModule = {
    currentPeriod: 'month',
    currentCompany: 'all',
    selectedMonth: '08/2026',

    monthlyData: {
        '08/2026': null, // Uses default mockData.customers which matches user screenshot
        '07/2026': {
            thue_may: { dau: { may: 1960, kh: 602 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 18, kh: 7 }, giam: { may: 5, kh: 3 }, cuoi: { may: 1973, kh: 606 } },
            mc: { dau: { may: 386, kh: 205 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 386, kh: 205 } },
            dv_photo: { dau: { may: 3328, kh: 1107 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 3328, kh: 1107 } },
            dv_may_in: { dau: { may: 1936, kh: 283 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 3, kh: 2 }, giam: { may: 0, kh: 0 }, cuoi: { may: 1939, kh: 285 } },
            dv_khac: { dau: { may: 0, kh: 0 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 0, kh: 0 } },
            phan_phoi: { dau: { may: 0, kh: 2760 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 45 }, giam: { may: 0, kh: 2 }, cuoi: { may: 0, kh: 2803 } }
        },
        '06/2026': {
            thue_may: { dau: { may: 1945, kh: 598 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 20, kh: 8 }, giam: { may: 5, kh: 4 }, cuoi: { may: 1960, kh: 602 } },
            mc: { dau: { may: 386, kh: 205 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 386, kh: 205 } },
            dv_photo: { dau: { may: 3328, kh: 1107 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 3328, kh: 1107 } },
            dv_may_in: { dau: { may: 1930, kh: 280 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 6, kh: 3 }, giam: { may: 0, kh: 0 }, cuoi: { may: 1936, kh: 283 } },
            dv_khac: { dau: { may: 0, kh: 0 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 0, kh: 0 } },
            phan_phoi: { dau: { may: 0, kh: 2720 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 42 }, giam: { may: 0, kh: 2 }, cuoi: { may: 0, kh: 2760 } }
        }
    },

    init() {
        // Handle global filter changes
        document.addEventListener('vps_filter_changed', (e) => {
            this.currentPeriod = e.detail.period;
            this.currentCompany = e.detail.company;
            this.loadData(this.currentPeriod, this.currentCompany);
        });

        // Initialize Month Dropdown in table header
        const monthFilter = document.getElementById('customers-month-filter');
        if (monthFilter) {
            const months = ['08/2026', '07/2026', '06/2026'];
            monthFilter.innerHTML = '';
            months.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.textContent = 'THÁNG ' + m.split('/')[0] + ' / ' + m.split('/')[1];
                if (m === this.selectedMonth) opt.selected = true;
                monthFilter.appendChild(opt);
            });

            monthFilter.addEventListener('change', (e) => {
                this.selectedMonth = e.target.value;
                this.loadData(this.currentPeriod, this.currentCompany);
            });
        }

        // Initial load
        this.loadData(this.currentPeriod, this.currentCompany);
    },

    async loadData(period, company) {
        const data = await window.DataService.getCustomersData(period, company);
        this.updateUI(data, company);
    },

    updateUI(data, company) {
        if (!data || !data.matrix) return;

        // Map UI company dropdown string to matrix keys
        let matrixKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) matrixKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) matrixKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem') || company.includes('XESCO')) matrixKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M') || company.includes('Trung')) matrixKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) matrixKey = 'ITSS';
        else if (company === 'Văn phòng VPS' || company.includes('VPVPS') || company.includes('Văn phòng')) matrixKey = 'VPVPS';
        else if (company !== 'all') matrixKey = 'all';

        let cData = (this.monthlyData && this.monthlyData[this.selectedMonth] && matrixKey === 'all')
            ? this.monthlyData[this.selectedMonth]
            : (data.matrix[matrixKey] || data.matrix['all']);

        // Helper to safely get a category's values
        const getCat = (catId) => {
            const r = (cData && cData[catId]) ? cData[catId] : {};
            return {
                dau: { may: r.dau?.may || 0, kh: r.dau?.kh || 0 },
                ke_hoach: { may: r.ke_hoach?.may || 0, kh: r.ke_hoach?.kh || 0 },
                tang: { may: r.tang?.may || 0, kh: r.tang?.kh || 0 },
                giam: { may: r.giam?.may || 0, kh: r.giam?.kh || 0 },
                cuoi: { may: r.cuoi?.may || 0, kh: r.cuoi?.kh || 0 }
            };
        };

        // Service & Business rows
        const serviceRowDefs = [
            { id: 'thue_may', name: 'Thuê máy', isChild: true },
            { id: 'mc', name: 'MC', isChild: true },
            { id: 'dv_photo', name: 'Dịch vụ - Photo' },
            { id: 'dv_may_in', name: 'Dịch vụ - Máy in' },
            { id: 'dv_khac', name: 'Dịch vụ khác' },
            { id: 'phan_phoi', name: 'Phân phối (Đại lý)', isPhanPhoi: true }
        ];

        // 1. Calculate Summary for Thuê máy + MC
        const tm = getCat('thue_may');
        const mc = getCat('mc');
        const tm_mc = {
            dau: { may: tm.dau.may + mc.dau.may, kh: tm.dau.kh + mc.dau.kh },
            ke_hoach: { may: tm.ke_hoach.may + mc.ke_hoach.may, kh: tm.ke_hoach.kh + mc.ke_hoach.kh },
            tang: { may: tm.tang.may + mc.tang.may, kh: tm.tang.kh + mc.tang.kh },
            giam: { may: tm.giam.may + mc.giam.may, kh: tm.giam.kh + mc.giam.kh },
            cuoi: { may: tm.cuoi.may + mc.cuoi.may, kh: tm.cuoi.kh + mc.cuoi.kh }
        };

        // 2. Sums for Service group (Total summary)
        let serviceSums = {
            dau: { may: 0, kh: 0 },
            ke_hoach: { may: 0, kh: 0 },
            tang: { may: 0, kh: 0 },
            giam: { may: 0, kh: 0 },
            cuoi: { may: 0, kh: 0 }
        };

        serviceRowDefs.forEach(r => {
            const dataRow = getCat(r.id);
            if (!r.isPhanPhoi) {
                serviceSums.dau.may += dataRow.dau.may;
                serviceSums.ke_hoach.may += dataRow.ke_hoach.may;
                serviceSums.tang.may += dataRow.tang.may;
                serviceSums.giam.may += dataRow.giam.may;
                serviceSums.cuoi.may += dataRow.cuoi.may;
            }
            serviceSums.dau.kh += dataRow.dau.kh;
            serviceSums.ke_hoach.kh += dataRow.ke_hoach.kh;
            serviceSums.tang.kh += dataRow.tang.kh;
            serviceSums.giam.kh += dataRow.giam.kh;
            serviceSums.cuoi.kh += dataRow.cuoi.kh;
        });

        // UPDATE 5 EXECUTIVE KPI CARDS
        const totalKhEl = document.getElementById('cust-kpi-total-kh');
        if (totalKhEl) totalKhEl.textContent = serviceSums.dau.kh.toLocaleString();
        const totalMayEl = document.getElementById('cust-kpi-total-may');
        if (totalMayEl) totalMayEl.textContent = serviceSums.dau.may.toLocaleString();

        const newKhEl = document.getElementById('cust-kpi-new-kh');
        if (newKhEl) newKhEl.textContent = serviceSums.tang.kh.toLocaleString();
        const newMayEl = document.getElementById('cust-kpi-new-may');
        if (newMayEl) newMayEl.textContent = '+' + serviceSums.tang.may.toLocaleString();

        // LOST CUSTOMERS - DISPLAYED PROMINENTLY IN RED
        const lostKhEl = document.getElementById('cust-kpi-lost-kh');
        if (lostKhEl) lostKhEl.textContent = serviceSums.giam.kh.toLocaleString();
        const lostMayEl = document.getElementById('cust-kpi-lost-may');
        if (lostMayEl) lostMayEl.textContent = serviceSums.giam.may.toLocaleString();

        // RATIO PHÁT SINH / KHÁCH MẤT
        const ratioEl = document.getElementById('cust-kpi-ratio');
        if (ratioEl) {
            if (serviceSums.giam.kh > 0) {
                ratioEl.textContent = (serviceSums.tang.kh / serviceSums.giam.kh).toFixed(1);
            } else {
                ratioEl.textContent = serviceSums.tang.kh.toString();
            }
        }
        const netGrowthEl = document.getElementById('cust-kpi-net-growth');
        if (netGrowthEl) {
            const netKh = serviceSums.tang.kh - serviceSums.giam.kh;
            netGrowthEl.textContent = (netKh >= 0 ? '+' : '') + netKh.toLocaleString();
        }

        // ACTIVE CUSTOMERS (CURRENT / END OF PERIOD)
        const activeKhEl = document.getElementById('cust-kpi-active-kh');
        if (activeKhEl) activeKhEl.textContent = serviceSums.cuoi.kh.toLocaleString();
        const activeMayEl = document.getElementById('cust-kpi-active-may');
        if (activeMayEl) activeMayEl.textContent = serviceSums.cuoi.may.toLocaleString();

        // Overview / Subtext updates
        const ovVal = document.getElementById('ov-cust-total');
        if (ovVal) ovVal.textContent = serviceSums.cuoi.kh.toLocaleString();

        const newSub = document.getElementById('cust-total-new-sub');
        if (newSub) newSub.textContent = '+' + serviceSums.tang.kh.toLocaleString();
        const lostSub = document.getElementById('cust-total-lost-sub');
        if (lostSub) lostSub.textContent = '-' + serviceSums.giam.kh.toLocaleString();

        // BUILD DETAILED TABLE HTML
        let tbodyHTML = '';

        // Section I Header
        tbodyHTML += `
            <tr class="section-title-row">
                <td colspan="11" style="text-align: left;">
                    <i data-lucide="layers" style="width: 16px; height: 16px; display: inline-block; vertical-align: -2px; margin-right: 6px; color: #0284c7;"></i>
                    I. CƠ CẤU THEO MẢNG DỊCH VỤ &amp; KINH DOANH
                </td>
            </tr>
        `;

        // Row: Thuê máy, MC - Photo summary
        const tmMcGiamMayHtml = tm_mc.giam.may > 0 ? `<span class="cust-lost-highlight">${tm_mc.giam.may}</span>` : '0';
        const tmMcGiamKhHtml = tm_mc.giam.kh > 0 ? `<span class="cust-lost-badge">${tm_mc.giam.kh}</span>` : '0';

        tbodyHTML += `
            <tr class="parent-row" style="font-weight: 800; background: #ffffff;">
                <td style="text-align: left; padding-left: 14px; font-weight: 800;">Thuê máy, MC - Photo</td>
                <td style="font-weight: 800;">${tm_mc.dau.may.toLocaleString()}</td>
                <td style="font-weight: 800;">${tm_mc.dau.kh.toLocaleString()}</td>
                <td style="color: #0284c7; font-weight: 800;">${tm_mc.ke_hoach.may}</td>
                <td style="color: #0284c7; font-weight: 800;">${tm_mc.ke_hoach.kh}</td>
                <td style="font-weight: 800;">${tm_mc.tang.may}</td>
                <td style="font-weight: 800;">${tm_mc.tang.kh}</td>
                <td>${tmMcGiamMayHtml}</td>
                <td>${tmMcGiamKhHtml}</td>
                <td style="font-weight: 800;">${tm_mc.cuoi.may.toLocaleString()}</td>
                <td style="font-weight: 800;">${tm_mc.cuoi.kh.toLocaleString()}</td>
            </tr>
        `;

        // Sub-rows: Thuê máy & MC
        const tmData = getCat('thue_may');
        const tmGiamMayHtml = tmData.giam.may > 0 ? `<span class="cust-lost-highlight">${tmData.giam.may}</span>` : '0';
        const tmGiamKhHtml = tmData.giam.kh > 0 ? `<span class="cust-lost-badge">${tmData.giam.kh}</span>` : '0';
        tbodyHTML += `
            <tr class="child-row">
                <td style="text-align: left; padding-left: 32px;"><i>Thuê máy</i></td>
                <td>${tmData.dau.may.toLocaleString()}</td>
                <td>${tmData.dau.kh.toLocaleString()}</td>
                <td style="color: #0284c7; font-weight: 700;">${tmData.ke_hoach.may}</td>
                <td style="color: #0284c7; font-weight: 700;">${tmData.ke_hoach.kh}</td>
                <td>${tmData.tang.may}</td>
                <td>${tmData.tang.kh}</td>
                <td>${tmGiamMayHtml}</td>
                <td>${tmGiamKhHtml}</td>
                <td>${tmData.cuoi.may.toLocaleString()}</td>
                <td>${tmData.cuoi.kh.toLocaleString()}</td>
            </tr>
        `;

        const mcData = getCat('mc');
        const mcGiamMayHtml = mcData.giam.may > 0 ? `<span class="cust-lost-highlight">${mcData.giam.may}</span>` : '0';
        const mcGiamKhHtml = mcData.giam.kh > 0 ? `<span class="cust-lost-badge">${mcData.giam.kh}</span>` : '0';
        tbodyHTML += `
            <tr class="child-row">
                <td style="text-align: left; padding-left: 32px;"><i>MC</i></td>
                <td>${mcData.dau.may.toLocaleString()}</td>
                <td>${mcData.dau.kh.toLocaleString()}</td>
                <td style="color: #0284c7; font-weight: 700;">${mcData.ke_hoach.may}</td>
                <td style="color: #0284c7; font-weight: 700;">${mcData.ke_hoach.kh}</td>
                <td>${mcData.tang.may}</td>
                <td>${mcData.tang.kh}</td>
                <td>${mcGiamMayHtml}</td>
                <td>${mcGiamKhHtml}</td>
                <td>${mcData.cuoi.may.toLocaleString()}</td>
                <td>${mcData.cuoi.kh.toLocaleString()}</td>
            </tr>
        `;

        // Other service rows: Dịch vụ - Photo, Dịch vụ - Máy in, Dịch vụ khác, Phân phối (Đại lý)
        const otherRows = [
            { id: 'dv_photo', name: 'Dịch vụ - Photo' },
            { id: 'dv_may_in', name: 'Dịch vụ - Máy in' },
            { id: 'dv_khac', name: 'Dịch vụ khác' },
            { id: 'phan_phoi', name: 'Phân phối (Đại lý)', isPhanPhoi: true }
        ];

        otherRows.forEach(r => {
            const rowData = getCat(r.id);
            const mayDau = r.isPhanPhoi ? '-' : rowData.dau.may.toLocaleString();
            const mayKeHoach = r.isPhanPhoi ? '-' : rowData.ke_hoach.may;
            const mayTang = r.isPhanPhoi ? '-' : rowData.tang.may;
            const mayGiam = r.isPhanPhoi ? '-' : (rowData.giam.may > 0 ? `<span class="cust-lost-highlight">${rowData.giam.may}</span>` : '0');
            const mayCuoi = r.isPhanPhoi ? '-' : rowData.cuoi.may.toLocaleString();

            const khGiam = rowData.giam.kh > 0 ? `<span class="cust-lost-badge">${rowData.giam.kh}</span>` : '0';

            tbodyHTML += `
                <tr>
                    <td style="text-align: left; padding-left: 14px;">${r.name}</td>
                    <td>${mayDau}</td>
                    <td>${rowData.dau.kh.toLocaleString()}</td>
                    <td style="color: #0284c7; font-weight: 700;">${mayKeHoach}</td>
                    <td style="color: #0284c7; font-weight: 700;">${rowData.ke_hoach.kh}</td>
                    <td>${mayTang}</td>
                    <td>${rowData.tang.kh}</td>
                    <td>${mayGiam}</td>
                    <td>${khGiam}</td>
                    <td>${mayCuoi}</td>
                    <td>${rowData.cuoi.kh.toLocaleString()}</td>
                </tr>
            `;
        });

        // Summary Total Row: Cộng mảng dịch vụ & phân phối
        const totalGiamMayHtml = serviceSums.giam.may > 0 ? `<span class="cust-lost-highlight" style="font-size: 0.95rem;">${serviceSums.giam.may}</span>` : '0';
        const totalGiamKhHtml = serviceSums.giam.kh > 0 ? `<span class="cust-lost-total-badge">${serviceSums.giam.kh}</span>` : '0';

        tbodyHTML += `
            <tr class="total-row">
                <td style="text-align: left; padding-left: 14px;">Cộng mảng dịch vụ &amp; phân phối</td>
                <td>${serviceSums.dau.may.toLocaleString()}</td>
                <td>${serviceSums.dau.kh.toLocaleString()}</td>
                <td style="color: #0284c7;">${serviceSums.ke_hoach.may}</td>
                <td style="color: #0284c7;">${serviceSums.ke_hoach.kh}</td>
                <td>${serviceSums.tang.may}</td>
                <td>${serviceSums.tang.kh}</td>
                <td>${totalGiamMayHtml}</td>
                <td>${totalGiamKhHtml}</td>
                <td>${serviceSums.cuoi.may.toLocaleString()}</td>
                <td>${serviceSums.cuoi.kh.toLocaleString()}</td>
            </tr>
        `;

        const tbody = document.querySelector('#customersTable tbody');
        if (tbody) tbody.innerHTML = tbodyHTML;

        // Re-initialize Lucide Icons
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }

        // RENDER CHARTS
        // 1. Chart: Cơ Cấu Khách Hàng Hiện Có Theo Mảng Dịch Vụ (Doughnut)
        const chartLabels = ['Thuê máy', 'MC', 'Dịch vụ - Photo', 'Dịch vụ - Máy in', 'Phân phối (Đại lý)'];
        const chartValues = [
            getCat('thue_may').cuoi.kh,
            getCat('mc').cuoi.kh,
            getCat('dv_photo').cuoi.kh,
            getCat('dv_may_in').cuoi.kh,
            getCat('phan_phoi').cuoi.kh
        ];

        const ctx = document.getElementById('customersChart');
        if (ctx && window.ChartManager) {
            window.ChartManager.createChart('customersChart', 'doughnut', {
                labels: chartLabels,
                datasets: [{
                    data: chartValues,
                    backgroundColor: ['#0284c7', '#6366f1', '#f59e0b', '#ec4899', '#10b981'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            }, {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            font: { size: 12, weight: '700' }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.raw !== null) {
                                    const total = chartValues.reduce((a, b) => a + b, 0) || 1;
                                    const pct = ((context.raw / total) * 100).toFixed(1);
                                    label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' KH (' + pct + '%)';
                                }
                                return label;
                            }
                        }
                    }
                },
                cutout: '62%'
            });
        }

        // 2. Chart: Biến Động Khách Hàng: Tăng Mới vs Khách Mất Theo Từng Mảng (Bar chart)
        const growthLabels = ['Thuê máy', 'MC', 'DV Photo', 'DV Máy in', 'Phân phối'];
        const growthNew = [
            getCat('thue_may').tang.kh,
            getCat('mc').tang.kh,
            getCat('dv_photo').tang.kh,
            getCat('dv_may_in').tang.kh,
            getCat('phan_phoi').tang.kh
        ];
        const growthLost = [
            getCat('thue_may').giam.kh,
            getCat('mc').giam.kh,
            getCat('dv_photo').giam.kh,
            getCat('dv_may_in').giam.kh,
            getCat('phan_phoi').giam.kh
        ];

        const growthCtx = document.getElementById('customersGrowthChart');
        if (growthCtx && window.ChartManager) {
            window.ChartManager.createChart('customersGrowthChart', 'bar', {
                labels: growthLabels,
                datasets: [
                    {
                        label: 'Khách hàng mới (+)',
                        data: growthNew,
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                        borderSkipped: false
                    },
                    {
                        label: 'Khách hàng mất (-)',
                        data: growthLost,
                        backgroundColor: '#ef4444',
                        borderRadius: 6,
                        borderSkipped: false
                    }
                ]
            }, {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { weight: '700' } }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0 }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            font: { size: 12, weight: '700' }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + ' KH';
                            }
                        }
                    }
                }
            });
        }
    }
};
