
/**
 * Expense Module
 */
window.ExpenseModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            this.renderUI(e.detail.company);
        });
        
        this.generateData();
        this.renderUI('all');
    },
    
    generateData() {
        this.categories = [
            {
                stt: "I",
                name: "Chi phí Biến đổi",
                code: "",
                items: [
                    { code: "CP.BD.XH.001", name: "Bảo hiểm xã hội" },
                    { code: "CP.BD.CP.010", name: "Chuyển phát nhanh" },
                    { code: "CP.BD.CT.012", name: "Công tác phí" },
                    { code: "CP.BD.PP.011", name: "Văn phòng phẩm" },
                    { code: "CP.BD.DT.004", name: "Điện thoại" },
                    { code: "CP.BD.IN.005", name: "Internet" }
                ]
            },
            {
                stt: "",
                name: "Chi phí biến đổi khác",
                code: "",
                items: [
                    { code: "CP.BD.BH.036", name: "Chi phí du lịch, hội nghị, quà tặng bán hàng" },
                    { code: "CP.BD.BH.040", name: "Chi phí bán hàng, phi sàn, marketing" },
                    { code: "CP.BD.BX.019", name: "Bốc xếp" },
                    { code: "CP.BD.DC.039", name: "Chi phí phần mềm IRP- quản trị doanh nghiệp" },
                    { code: "CP.BD.GN.013", name: "Xăng xe, đầu xe ô tô công ty(XX nhân viên giao nhận, xe ôm...)" },
                    { code: "CP.BD.NH.017", name: "Giao dịch ngân hàng" },
                    { code: "CP.BD.NM.020", name: "Nghỉ mát, liên hoan, quà tết nhân viên, thưởng" },
                    { code: "CP.BD.PK.033", name: "Chi phi khác" },
                    { code: "CP.BD.PT.025", name: "Chi phi thuê" },
                    { code: "CP.BD.SC.018", name: "Xây dựng, sửa chữa nhỏ" },
                    { code: "CP.BD.TH.016", name: "Hồ sơ thầu, thủ tục XNK" },
                    { code: "CP.BD.TK.026", name: "Tiếp khách, biếu tặng" },
                    { code: "CP.BD.VC.007", name: "Chi phí thuê xe oto Vận chuyển hàng, vận chuyển khác" },
                    { code: "CP.BD.VC.008", name: "Chi phi vận chuyển mua hàng" },
                    { code: "CP.BD.XE.002", name: "Chi phí gửi xe CB, NV" },
                    { code: "CP.BD.XE.003", name: "Chi phí taxi , thuê xe khách" }
                ]
            },
            {
                stt: "II",
                name: "Cố định",
                code: "",
                items: [
                    { code: "CP.CD.KO.002", name: "Chi phi thuê kho" },
                    { code: "CP.CD.TL.004", name: "Chi phi thanh lý" },
                    { code: "CP.CD.TN.001", name: "Chi phí thuê nhà" }
                ]
            },
            {
                stt: "III",
                name: "Lương",
                code: "",
                items: [
                    { code: "CP.LT.DS.003", name: "Chi phi lương doanh số( hệ số K)" },
                    { code: "CP.LT.LU.001", name: "Chi phi lương ngày công" },
                    { code: "CP.LT.TA.007", name: "Chi phi tiền ăn" }
                ]
            },
            {
                stt: "IV",
                name: "CP chuyển VPS",
                code: "",
                items: [
                    { code: "CP.LT.LU.010", name: "Chi phí lương ban điều hành VPS" }
                ]
            }
        ];
    },

    renderUI(companyFilter) {
        const tbody = document.querySelector('#expenseTable tbody');
        if (!tbody) return;
        
        let html = '';
        let totalPlan = 0;
        let totalActual = 0;
        
        // Random multiplier based on company to make numbers look different
        let multiplier = 1;
        if (companyFilter === 'Tân Hồng Hà') multiplier = 0.5;
        else if (companyFilter === 'Xem Sơn') multiplier = 0.3;
        
        let grandTotalPlan = 0;
        let grandTotalActual = 0;
        
        let chartDataByCat = [0, 0, 0, 0]; // Biến đổi, Cố định, Lương, Khác
        
        this.categories.forEach((cat, index) => {
            let catPlan = 0;
            let catActual = 0;
            
            let rowsHtml = '';
            
            cat.items.forEach((item, i) => {
                // Generate deterministic fake data based on item string length
                let basePlan = (item.name.length * 1500000) * multiplier;
                let baseActual = basePlan * (0.8 + (i % 4) * 0.1); 
                
                catPlan += basePlan;
                catActual += baseActual;
                
                let percent = basePlan > 0 ? (baseActual / basePlan * 100).toFixed(1) : 0;
                let color = percent > 100 ? '#ef4444' : (percent > 80 ? '#f59e0b' : '#10b981');
                
                rowsHtml += `<tr>
                    <td style="text-align: center; position: sticky; left: 0; z-index: 1; background: #fff;"></td>
                    <td style="position: sticky; left: 40px; z-index: 1; background: #fff;">${item.code}</td>
                    <td style="position: sticky; left: 160px; z-index: 1; background: #fff; white-space: normal; min-width: 250px;">${item.name}</td>
                    <td style="text-align: right;">${basePlan.toLocaleString('vi-VN')}</td>
                    <td style="text-align: right;">${baseActual.toLocaleString('vi-VN')}</td>
                    <td style="text-align: center; color: ${color}; font-weight: 500;">${percent}%</td>
                </tr>`;
            });
            
            grandTotalPlan += catPlan;
            grandTotalActual += catActual;
            
            if(index === 0 || index === 1) chartDataByCat[0] += catActual;
            else if(index === 2) chartDataByCat[1] += catActual;
            else if(index === 3) chartDataByCat[2] += catActual;
            else chartDataByCat[3] += catActual;
            
            let catPercent = catPlan > 0 ? (catActual / catPlan * 100).toFixed(1) : 0;
            
            html += `
                <tr style="background: #f1f5f9; font-weight: bold;">
                    <td style="text-align: center; position: sticky; left: 0; z-index: 1; background: #e2e8f0;">${cat.stt}</td>
                    <td style="position: sticky; left: 40px; z-index: 1; background: #e2e8f0;"></td>
                    <td style="position: sticky; left: 160px; z-index: 1; background: #e2e8f0; color: #1e40af; white-space: normal; min-width: 250px;">${cat.name}</td>
                    <td style="text-align: right;">${catPlan.toLocaleString('vi-VN')}</td>
                    <td style="text-align: right; color: #b91c1c;">${catActual.toLocaleString('vi-VN')}</td>
                    <td style="text-align: center;">${catPercent}%</td>
                </tr>
            `;
            
            html += rowsHtml;
        });
        
        let grandPercent = grandTotalPlan > 0 ? (grandTotalActual / grandTotalPlan * 100).toFixed(1) : 0;
        
        let topHeader = `
            <tr style="background: #fde047; font-weight: bold; font-size: 1.1rem;">
                <td style="text-align: center; position: sticky; left: 0; z-index: 2; background: #fde047;"></td>
                <td style="position: sticky; left: 40px; z-index: 2; background: #fde047;"></td>
                <td style="position: sticky; left: 160px; z-index: 2; background: #fde047;">Tổng cộng</td>
                <td style="text-align: right;">${grandTotalPlan.toLocaleString('vi-VN')}</td>
                <td style="text-align: right; color: #b91c1c;">${grandTotalActual.toLocaleString('vi-VN')}</td>
                <td style="text-align: center;">${grandPercent}%</td>
            </tr>
        `;
        
        tbody.innerHTML = topHeader + html;
        
        document.getElementById('expense-total-val').innerText = (grandTotalActual / 1000000000).toLocaleString('vi-VN', {minimumFractionDigits: 2, maximumFractionDigits: 2}) + ' Tỷ VND';
        
        // Update Chart
        if (window.ChartManager) {
            const pieData = {
                labels: ['Biến đổi', 'Cố định', 'Lương', 'Chuyển VPS'],
                datasets: [{
                    data: chartDataByCat,
                    backgroundColor: ['#f59e0b', '#3b82f6', '#10b981', '#6366f1'],
                    borderWidth: 1
                }]
            };

            window.ChartManager.createChart('expensePieChart', 'doughnut', pieData, {
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom' },
                    datalabels: {
                        color: '#fff',
                        font: { weight: 'bold' },
                        formatter: (value, ctx) => {
                            let sum = 0;
                            let dataArr = ctx.chart.data.datasets[0].data;
                            dataArr.map(data => { sum += data; });
                            if(sum === 0) return '0%';
                            return (value * 100 / sum).toFixed(1) + "%";
                        }
                    }
                }
            });
            
            // Bar chart for top items
            let allItems = [];
            this.categories.forEach(c => {
                c.items.forEach(i => {
                    let a = (i.name.length * 1500000) * multiplier * 0.85; // rough actual
                    allItems.push({name: i.name, val: a});
                });
            });
            allItems.sort((a,b) => b.val - a.val);
            let top5 = allItems.slice(0, 5);
            
            const barData = {
                labels: top5.map(i => i.name.length > 45 ? i.name.substring(0, 45) + '...' : i.name),
                datasets: [{
                    label: 'Chi phí (VND)',
                    data: top5.map(i => i.val),
                    backgroundColor: '#ef4444'
                }]
            };
            
            window.ChartManager.createChart('expenseBarChart', 'bar', barData, {
                maintainAspectRatio: false,
                indexAxis: 'y',
                plugins: {
                    legend: { display: false }
                }
            });
        }
    }
};
