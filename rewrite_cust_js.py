const fs = require('fs');

let js = `/**
 * Customers Module
 */

window.CustomersModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.loadData(e.detail.period, e.detail.company);
        });
    },

    async loadData(period, company) {
        const data = await window.DataService.getCustomersData(period, company);
        this.updateUI(data, company);
    },

    updateUI(data, company) {
        if (!data || !data.matrix) return;

        // Map UI company dropdown string to matrix keys
        let matrixKey = 'all';
        if (company === 'Tân Hồng Hà' || company.includes('T') && company.includes('H')) matrixKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) matrixKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem')) matrixKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M')) matrixKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) matrixKey = 'all'; // No ITSS data in image, fallback to all or empty
        else if (company !== 'all') matrixKey = 'all';

        let cData = data.matrix[matrixKey];
        if (!cData) cData = data.matrix['all'];

        // Categories mapping
        const rows = [
            { id: 'thue_may', name: 'Thuê máy' },
            { id: 'mc', name: 'MC' },
            { id: 'dv_photo', name: 'Dịch vụ - Photo' },
            { id: 'dv_may_in', name: 'Dịch vụ - Máy in' },
            { id: 'dv_khac', name: 'Dịch vụ khác' }
        ];

        let tbodyHTML = '';
        let sums = {
            dau: { may: 0, kh: 0 },
            tang: { may: 0, kh: 0 },
            giam: { may: 0, kh: 0 },
            cuoi: { may: 0, kh: 0 }
        };

        // Render Thuê máy, MC - Photo summary row (Thue may + MC)
        let tm_mc_dau_may = cData['thue_may'].dau.may + cData['mc'].dau.may;
        let tm_mc_dau_kh = cData['thue_may'].dau.kh + cData['mc'].dau.kh;
        let tm_mc_tang_may = cData['thue_may'].tang.may + cData['mc'].tang.may;
        let tm_mc_tang_kh = cData['thue_may'].tang.kh + cData['mc'].tang.kh;
        let tm_mc_giam_may = cData['thue_may'].giam.may + cData['mc'].giam.may;
        let tm_mc_giam_kh = cData['thue_may'].giam.kh + cData['mc'].giam.kh;
        let tm_mc_cuoi_may = cData['thue_may'].cuoi.may + cData['mc'].cuoi.may;
        let tm_mc_cuoi_kh = cData['thue_may'].cuoi.kh + cData['mc'].cuoi.kh;

        tbodyHTML += \`
            <tr style="font-weight: bold; background: #f8fafc;">
                <td style="text-align: left;">Thuê máy, MC - Photo</td>
                <td>\${tm_mc_dau_may || 0}</td><td>\${tm_mc_dau_kh || 0}</td>
                <td>\${tm_mc_tang_may || 0}</td><td>\${tm_mc_tang_kh || 0}</td>
                <td>\${tm_mc_giam_may || 0}</td><td>\${tm_mc_giam_kh || 0}</td>
                <td>\${tm_mc_cuoi_may || 0}</td><td>\${tm_mc_cuoi_kh || 0}</td>
            </tr>
        \`;

        // Render sub-items and calculate sums
        rows.forEach(r => {
            let rowData = cData[r.id];
            
            // accumulate to sums
            sums.dau.may += rowData.dau.may; sums.dau.kh += rowData.dau.kh;
            sums.tang.may += rowData.tang.may; sums.tang.kh += rowData.tang.kh;
            sums.giam.may += rowData.giam.may; sums.giam.kh += rowData.giam.kh;
            sums.cuoi.may += rowData.cuoi.may; sums.cuoi.kh += rowData.cuoi.kh;

            let prefix = (r.id === 'thue_may' || r.id === 'mc') ? '&nbsp;&nbsp;&nbsp;&nbsp;<i>' : '';
            let suffix = (r.id === 'thue_may' || r.id === 'mc') ? '</i>' : '';

            tbodyHTML += \`
                <tr>
                    <td style="text-align: left;">\${prefix}\${r.name}\${suffix}</td>
                    <td>\${rowData.dau.may || 0}</td><td>\${rowData.dau.kh || 0}</td>
                    <td>\${rowData.tang.may || 0}</td><td>\${rowData.tang.kh || 0}</td>
                    <td>\${rowData.giam.may || 0}</td><td>\${rowData.giam.kh || 0}</td>
                    <td>\${rowData.cuoi.may || 0}</td><td>\${rowData.cuoi.kh || 0}</td>
                </tr>
            \`;
        });

        // Add Tổng cộng row
        tbodyHTML += \`
            <tr style="font-weight: bold; background: #e2e8f0; border-top: 2px solid #cbd5e1; color: #b91c1c;">
                <td style="text-align: left;">Tổng cộng</td>
                <td>\${sums.dau.may}</td><td>\${sums.dau.kh}</td>
                <td>\${sums.tang.may}</td><td>\${sums.tang.kh}</td>
                <td>\${sums.giam.may}</td><td>\${sums.giam.kh}</td>
                <td>\${sums.cuoi.may}</td><td>\${sums.cuoi.kh}</td>
            </tr>
        \`;

        const tbody = document.querySelector('#customersTable tbody');
        if (tbody) tbody.innerHTML = tbodyHTML;

        // Update Overview mini cards if needed
        document.getElementById('cust-total-may').innerText = sums.cuoi.may.toLocaleString();
        document.getElementById('cust-total-kh').innerText = sums.cuoi.kh.toLocaleString();

        // Update Overview KPI top bar if on Overview view, actually the events will re-trigger overview
        const ovVal = document.getElementById('ov-cust-total');
        if(ovVal) ovVal.innerText = sums.cuoi.kh.toLocaleString();

        // Prepare chart data (Pie chart for Cuối Tháng - MÁY)
        const chartLabels = ['Thuê máy', 'MC', 'Dịch vụ - Photo', 'Dịch vụ - Máy in'];
        const chartValues = [
            cData['thue_may'].cuoi.may,
            cData['mc'].cuoi.may,
            cData['dv_photo'].cuoi.may,
            cData['dv_may_in'].cuoi.may
        ];

        const chartConfig = {
            labels: chartLabels,
            datasets: [{
                data: chartValues,
                backgroundColor: ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D'],
                borderWidth: 1
            }]
        };

        const ctx = document.getElementById('customersChart');
        if (ctx) {
            window.ChartManager.renderChart(ctx, 'pie', chartConfig, {
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.raw !== null) {
                                    label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' Máy';
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
`;

fs.writeFileSync('js/customers.js', js, 'utf8');
console.log("customers.js completely rewritten!");
