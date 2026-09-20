/**
 * Customers Module
 */

window.CustomersModule = {
    currentPeriod: 'month',
    currentCompany: 'all',

    init() {
        // Handle global filter changes
        document.addEventListener('vps_filter_changed', (e) => {
            this.currentPeriod = e.detail.period;
            this.currentCompany = e.detail.company;
            this.loadData(this.currentPeriod, this.currentCompany);
        });

        // Initialize Month Dropdown in table header if exists
        const monthFilter = document.getElementById('customers-month-filter');
        if (monthFilter) {
            const months = ['08/2026', '07/2026', '06/2026'];
            monthFilter.innerHTML = '';
            months.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.textContent = 'THÁNG ' + m.split('/')[0] + ' / ' + m.split('/')[1];
                monthFilter.appendChild(opt);
            });

            monthFilter.addEventListener('change', (e) => {
                const selectedMonth = e.target.value;
                if (window.GoogleSheetsService && typeof window.GoogleSheetsService.buildCustomerDataForMonth === 'function') {
                    window.mockData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(selectedMonth);
                }
                this.loadData(this.currentPeriod, this.currentCompany);
            });
        }
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

        let cData = data.matrix[matrixKey] || data.matrix['all'];

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

        // Revenue Recency rows (3 dòng mới theo yêu cầu)
        const recencyRowDefs = [
            { 
                id: 'kh_duoi_3_thang', 
                name: 'Khách hàng phát sinh doanh số dưới 3 tháng', 
                badgeText: '< 3 tháng', 
                badgeBg: '#dcfce7', 
                badgeColor: '#15803d',
                dotColor: '#10b981'
            },
            { 
                id: 'kh_3_den_6_thang', 
                name: 'Khách hàng phát sinh doanh số từ 3 - 6 tháng', 
                badgeText: '3 - 6 tháng', 
                badgeBg: '#fef3c7', 
                badgeColor: '#b45309',
                dotColor: '#f59e0b'
            },
            { 
                id: 'kh_tren_6_thang', 
                name: 'Khách hàng phát sinh doanh số trên 6 tháng', 
                badgeText: '> 6 tháng', 
                badgeBg: '#fee2e2', 
                badgeColor: '#b91c1c',
                dotColor: '#ef4444'
            }
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

        // 2. Sums for Service group
        let serviceSums = {
            dau: { may: 0, kh: 0 },
            ke_hoach: { may: 0, kh: 0 },
            tang: { may: 0, kh: 0 },
            giam: { may: 0, kh: 0 },
            cuoi: { may: 0, kh: 0 }
        };

        serviceRowDefs.forEach(r => {
            const dataRow = getCat(r.id);
            serviceSums.dau.may += dataRow.dau.may;
            serviceSums.dau.kh += dataRow.dau.kh;
            serviceSums.ke_hoach.may += dataRow.ke_hoach.may;
            serviceSums.ke_hoach.kh += dataRow.ke_hoach.kh;
            serviceSums.tang.may += dataRow.tang.may;
            serviceSums.tang.kh += dataRow.tang.kh;
            serviceSums.giam.may += dataRow.giam.may;
            serviceSums.giam.kh += dataRow.giam.kh;
            serviceSums.cuoi.may += dataRow.cuoi.may;
            serviceSums.cuoi.kh += dataRow.cuoi.kh;
        });

        // 3. Sums for Recency group
        let recencySums = {
            dau: { may: 0, kh: 0 },
            ke_hoach: { may: 0, kh: 0 },
            tang: { may: 0, kh: 0 },
            giam: { may: 0, kh: 0 },
            cuoi: { may: 0, kh: 0 }
        };

        recencyRowDefs.forEach(r => {
            const dataRow = getCat(r.id);
            recencySums.dau.may += dataRow.dau.may;
            recencySums.dau.kh += dataRow.dau.kh;
            recencySums.ke_hoach.may += dataRow.ke_hoach.may;
            recencySums.ke_hoach.kh += dataRow.ke_hoach.kh;
            recencySums.tang.may += dataRow.tang.may;
            recencySums.tang.kh += dataRow.tang.kh;
            recencySums.giam.may += dataRow.giam.may;
            recencySums.giam.kh += dataRow.giam.kh;
            recencySums.cuoi.may += dataRow.cuoi.may;
            recencySums.cuoi.kh += dataRow.cuoi.kh;
        });

        // BUILD TABLE HTML
        let tbodyHTML = '';

        // Header Section I
        tbodyHTML += `
            <tr style="background: #e2e8f0; font-weight: 700; color: #1e293b; border-top: 2px solid #94a3b8;">
                <td colspan="11" style="text-align: left; padding: 8px 12px; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    <i data-lucide="layers" style="width: 15px; height: 15px; display: inline-block; vertical-align: middle; margin-right: 6px; color: #0284c7;"></i>
                    I. Cơ Cấu Theo Mảng Dịch Vụ &amp; Kinh Doanh
                </td>
            </tr>
        `;

        // Thuê máy, MC - Photo summary row
        tbodyHTML += `
            <tr style="font-weight: bold; background: #f8fafc;">
                <td style="text-align: left;">Thuê máy, MC - Photo</td>
                <td>${tm_mc.dau.may || 0}</td><td>${tm_mc.dau.kh || 0}</td>
                <td style="color: #0369a1; font-weight: bold;">${tm_mc.ke_hoach.may || 0}</td><td style="color: #0369a1; font-weight: bold;">${tm_mc.ke_hoach.kh || 0}</td>
                <td>${tm_mc.tang.may || 0}</td><td>${tm_mc.tang.kh || 0}</td>
                <td>${tm_mc.giam.may || 0}</td><td>${tm_mc.giam.kh || 0}</td>
                <td>${tm_mc.cuoi.may || 0}</td><td>${tm_mc.cuoi.kh || 0}</td>
            </tr>
        `;

        // Sub-items for Service
        serviceRowDefs.forEach(r => {
            const rowData = getCat(r.id);
            const prefix = (r.id === 'thue_may' || r.id === 'mc') ? '&nbsp;&nbsp;&nbsp;&nbsp;<i>' : '';
            const suffix = (r.id === 'thue_may' || r.id === 'mc') ? '</i>' : '';

            // Phân phối (Đại lý) doesn't track machines
            const mayKeHoach = r.isPhanPhoi ? '-' : (rowData.ke_hoach.may || 0);
            const mayDau = r.isPhanPhoi ? '-' : (rowData.dau.may || 0);
            const mayTang = r.isPhanPhoi ? '-' : (rowData.tang.may || 0);
            const mayGiam = r.isPhanPhoi ? '-' : (rowData.giam.may || 0);
            const mayCuoi = r.isPhanPhoi ? '-' : (rowData.cuoi.may || 0);

            tbodyHTML += `
                <tr>
                    <td style="text-align: left;">${prefix}${r.name}${suffix}</td>
                    <td>${mayDau}</td><td>${rowData.dau.kh || 0}</td>
                    <td style="color: #0369a1; font-weight: bold;">${mayKeHoach}</td><td style="color: #0369a1; font-weight: bold;">${rowData.ke_hoach.kh || 0}</td>
                    <td>${mayTang}</td><td>${rowData.tang.kh || 0}</td>
                    <td>${mayGiam}</td><td>${rowData.giam.kh || 0}</td>
                    <td>${mayCuoi}</td><td>${rowData.cuoi.kh || 0}</td>
                </tr>
            `;
        });

        // Subtotal Section I
        tbodyHTML += `
            <tr style="font-weight: bold; background: #f1f5f9; color: #0369a1; border-top: 1px solid #cbd5e1; border-bottom: 2px solid #cbd5e1;">
                <td style="text-align: left; padding-left: 12px;">Cộng mảng dịch vụ &amp; phân phối</td>
                <td>${serviceSums.dau.may}</td><td>${serviceSums.dau.kh}</td>
                <td style="color: #0369a1;">${serviceSums.ke_hoach.may}</td><td style="color: #0369a1;">${serviceSums.ke_hoach.kh}</td>
                <td>${serviceSums.tang.may}</td><td>${serviceSums.tang.kh}</td>
                <td>${serviceSums.giam.may}</td><td>${serviceSums.giam.kh}</td>
                <td>${serviceSums.cuoi.may}</td><td>${serviceSums.cuoi.kh}</td>
            </tr>
        `;

        // Header Section II (3 dòng mới theo yêu cầu)
        tbodyHTML += `
            <tr style="background: #fef3c7; font-weight: 700; color: #92400e; border-top: 2px solid #f59e0b;">
                <td colspan="11" style="text-align: left; padding: 8px 12px; font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.5px;">
                    <i data-lucide="clock" style="width: 15px; height: 15px; display: inline-block; vertical-align: middle; margin-right: 6px; color: #d97706;"></i>
                    II. Phân Loại Theo Thời Gian Phát Sinh Doanh Số
                </td>
            </tr>
        `;

        // Render 3 Recency Rows
        recencyRowDefs.forEach(r => {
            const rowData = getCat(r.id);
            tbodyHTML += `
                <tr>
                    <td style="text-align: left;">
                        <span style="display: inline-flex; align-items: center; gap: 6px;">
                            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: ${r.dotColor};"></span>
                            <strong>${r.name}</strong>
                        </span>
                        <span style="background: ${r.badgeBg}; color: ${r.badgeColor}; font-size: 0.72rem; padding: 2px 6px; border-radius: 4px; font-weight: 600; margin-left: 6px;">
                            ${r.badgeText}
                        </span>
                    </td>
                    <td>${rowData.dau.may || 0}</td><td>${rowData.dau.kh || 0}</td>
                    <td style="color: #0369a1; font-weight: bold;">${rowData.ke_hoach.may || 0}</td><td style="color: #0369a1; font-weight: bold;">${rowData.ke_hoach.kh || 0}</td>
                    <td>${rowData.tang.may || 0}</td><td>${rowData.tang.kh || 0}</td>
                    <td>${rowData.giam.may || 0}</td><td>${rowData.giam.kh || 0}</td>
                    <td style="font-weight: 600;">${rowData.cuoi.may || 0}</td><td style="font-weight: 600;">${rowData.cuoi.kh || 0}</td>
                </tr>
            `;
        });

        // Subtotal Section II
        tbodyHTML += `
            <tr style="font-weight: bold; background: #fffbeb; color: #b45309; border-top: 1px solid #fde68a; border-bottom: 2px solid #fde68a;">
                <td style="text-align: left; padding-left: 12px;">Cộng theo thời gian phát sinh doanh số</td>
                <td>${recencySums.dau.may}</td><td>${recencySums.dau.kh}</td>
                <td style="color: #0369a1;">${recencySums.ke_hoach.may}</td><td style="color: #0369a1;">${recencySums.ke_hoach.kh}</td>
                <td>${recencySums.tang.may}</td><td>${recencySums.tang.kh}</td>
                <td>${recencySums.giam.may}</td><td>${recencySums.giam.kh}</td>
                <td>${recencySums.cuoi.may}</td><td>${recencySums.cuoi.kh}</td>
            </tr>
        `;

        // Grand Total Row
        tbodyHTML += `
            <tr style="font-weight: bold; background: #e2e8f0; border-top: 2px solid #64748b; color: #b91c1c; font-size: 0.95rem;">
                <td style="text-align: left; padding: 10px 12px;">Tổng cộng khách hàng quản lý</td>
                <td>${serviceSums.dau.may}</td><td>${serviceSums.dau.kh}</td>
                <td style="color: #0369a1; font-weight: bold;">${serviceSums.ke_hoach.may}</td><td style="color: #0369a1; font-weight: bold;">${serviceSums.ke_hoach.kh}</td>
                <td>${serviceSums.tang.may}</td><td>${serviceSums.tang.kh}</td>
                <td>${serviceSums.giam.may}</td><td>${serviceSums.giam.kh}</td>
                <td>${serviceSums.cuoi.may}</td><td>${serviceSums.cuoi.kh}</td>
            </tr>
        `;

        const tbody = document.querySelector('#customersTable tbody');
        if (tbody) tbody.innerHTML = tbodyHTML;

        // Re-initialize Lucide Icons
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }

        // Update Overview Mini Cards
        const totalMayEl = document.getElementById('cust-total-may');
        if (totalMayEl) totalMayEl.textContent = serviceSums.cuoi.may.toLocaleString();
        const totalKhEl = document.getElementById('cust-total-kh');
        if (totalKhEl) totalKhEl.textContent = serviceSums.cuoi.kh.toLocaleString();

        // Update Overview Top KPI Bar
        const ovVal = document.getElementById('ov-cust-total');
        if (ovVal) ovVal.textContent = serviceSums.cuoi.kh.toLocaleString();

        // Update 3 Recency Top KPI Cards
        const u3 = getCat('kh_duoi_3_thang');
        const m36 = getCat('kh_3_den_6_thang');
        const o6 = getCat('kh_tren_6_thang');
        const totalRecKh = (u3.cuoi.kh + m36.cuoi.kh + o6.cuoi.kh) || 1;

        const elU3Kh = document.getElementById('cust-recency-under3m-kh');
        if (elU3Kh) elU3Kh.textContent = u3.cuoi.kh.toLocaleString();
        const elU3May = document.getElementById('cust-recency-under3m-may');
        if (elU3May) elU3May.textContent = u3.cuoi.may.toLocaleString();
        const elU3Pct = document.getElementById('cust-recency-under3m-pct');
        if (elU3Pct) elU3Pct.textContent = ((u3.cuoi.kh / totalRecKh) * 100).toFixed(1) + '%';

        const elM36Kh = document.getElementById('cust-recency-3to6m-kh');
        if (elM36Kh) elM36Kh.textContent = m36.cuoi.kh.toLocaleString();
        const elM36May = document.getElementById('cust-recency-3to6m-may');
        if (elM36May) elM36May.textContent = m36.cuoi.may.toLocaleString();
        const elM36Pct = document.getElementById('cust-recency-3to6m-pct');
        if (elM36Pct) elM36Pct.textContent = ((m36.cuoi.kh / totalRecKh) * 100).toFixed(1) + '%';

        const elO6Kh = document.getElementById('cust-recency-over6m-kh');
        if (elO6Kh) elO6Kh.textContent = o6.cuoi.kh.toLocaleString();
        const elO6May = document.getElementById('cust-recency-over6m-may');
        if (elO6May) elO6May.textContent = o6.cuoi.may.toLocaleString();
        const elO6Pct = document.getElementById('cust-recency-over6m-pct');
        if (elO6Pct) elO6Pct.textContent = ((o6.cuoi.kh / totalRecKh) * 100).toFixed(1) + '%';

        // 1. Chart: Cơ Cấu Khách Hàng Theo Mảng Dịch Vụ (Pie chart for Cuối Tháng - KH)
        const chartLabels = ['Thuê máy', 'MC', 'Dịch vụ - Photo', 'Dịch vụ - Máy in', 'Phân phối (Đại lý)'];
        const chartValues = [
            getCat('thue_may').cuoi.kh,
            getCat('mc').cuoi.kh,
            getCat('dv_photo').cuoi.kh,
            getCat('dv_may_in').cuoi.kh,
            getCat('phan_phoi').cuoi.kh
        ];

        const chartConfig = {
            labels: chartLabels,
            datasets: [{
                data: chartValues,
                backgroundColor: ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D', '#16A34A'],
                borderWidth: 1
            }]
        };

        const ctx = document.getElementById('customersChart');
        if (ctx && window.ChartManager) {
            window.ChartManager.createChart('customersChart', 'pie', chartConfig, {
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.raw !== null) {
                                    label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' KH';
                                }
                                return label;
                            }
                        }
                    }
                }
            });
        }

        // 2. Chart: Phân Bổ Khách Hàng Theo Thời Gian Phát Sinh Doanh Số (Doughnut chart)
        const recencyCtx = document.getElementById('customersRecencyChart');
        if (recencyCtx && window.ChartManager) {
            window.ChartManager.createChart('customersRecencyChart', 'doughnut', {
                labels: ['Phát sinh DS < 3 tháng', 'Phát sinh DS từ 3 - 6 tháng', 'Phát sinh DS trên 6 tháng'],
                datasets: [{
                    data: [u3.cuoi.kh, m36.cuoi.kh, o6.cuoi.kh],
                    backgroundColor: ['#10b981', '#f59e0b', '#ef4444'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            }, {
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.raw !== null) {
                                    const pct = ((context.raw / totalRecKh) * 100).toFixed(1);
                                    label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' KH (' + pct + '%)';
                                }
                                return label;
                            }
                        }
                    }
                }
            });
        }
    }
};
