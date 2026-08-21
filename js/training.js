window.TrainingModule = {
    chart: null,
    
    summaryData: [
        { name: 'TÂN HỒNG HÀ', plan: 120, actual: 108 },
        { name: 'VIỆT', plan: 95, actual: 95 },
        { name: 'VPS', plan: 150, actual: 120 },
        { name: 'ITSS', plan: 50, actual: 45 },
        { name: 'VPSM', plan: 80, actual: 76 },
        { name: 'XESCO', plan: 75, actual: 70 }
    ],

    // Generate mock matrix data for each company
    getMatrixData(company) {
        // Base rows exactly matching the image
        const rows = [
            { stt: 'A', name: 'CÁN BỘ PHỤ TRÁCH', isHeader: true, checks: [] },
            { stt: 'B', name: 'ĐỐI TƯỢNG ĐÀO TẠO', isHeader: true, checks: [] },
            { stt: 'I', name: 'Cấp quản lý', isHeader: true, checks: [] },
            { stt: '1', name: 'Giám đốc/Phó GĐ', indent: true, checks: [] },
            { stt: '2', name: 'Cán bộ (cấp phòng, tổ)', indent: true, checks: [] }, // Changed 1 to 2 for logical flow
            { stt: 'II', name: 'Cấp nhân viên', isHeader: true, checks: [] },
            { stt: '1', name: 'NV kinh doanh', indent: true, checks: [] },
            { stt: '2', name: 'NV kỹ thuật', indent: true, checks: [] },
            { stt: '3', name: 'NV điều phối', indent: true, checks: [] },
            { stt: '4', name: 'NV kế toán', indent: true, checks: [] },
            { stt: '5', name: 'Phòng ban khác', indent: true, checks: [] }
        ];

        // Randomize checkmarks based on company to make it look real
        // The array has 11 boolean values corresponding to the 11 columns
        const seed = company.length; // Simple seed
        
        rows.forEach((row, i) => {
            if (!row.isHeader) {
                let checkCount = 0;
                for (let j = 0; j < 11; j++) {
                    // Random logic that generates a realistic looking matrix
                    const isChecked = (i * j + seed) % 3 !== 0; 
                    row.checks.push(isChecked);
                    if (isChecked) checkCount++;
                }
                row.total = checkCount;
            } else {
                for (let j = 0; j < 11; j++) row.checks.push(false);
                row.total = 0;
            }
        });

        return rows;
    },

    init() {
        this.renderSummaryTable();
        this.renderChart();
    },

    renderSummaryTable() {
        const tbody = document.getElementById('training-summary-tbody');
        if (!tbody) return;
        
        let html = '';
        let totalPlan = 0;
        let totalActual = 0;

        this.summaryData.forEach((row, idx) => {
            totalPlan += row.plan;
            totalActual += row.actual;
            const percent = ((row.actual / row.plan) * 100).toFixed(1);
            let color = '#2ecc71';
            if (percent < 90) color = '#e67e22';
            if (percent < 80) color = '#e74c3c';

            html += `
                <tr style="cursor:pointer;" onclick="window.TrainingModule.showDetail('${row.name}')" title="Nhấn để xem chi tiết ma trận">
                    <td style="text-align: center;">${idx + 1}</td>
                    <td style="color: var(--clr-primary); font-weight: 500;">${row.name}</td>
                    <td style="text-align: center;">${row.plan}</td>
                    <td style="text-align: center; font-weight: bold; color: #3498db;">${row.actual}</td>
                    <td style="text-align: center; font-weight: bold; color: ${color};">${percent}%</td>
                </tr>
            `;
        });

        const totalPercent = ((totalActual / totalPlan) * 100).toFixed(1);
        html += `
            <tr style="background: #f8f9fa; font-weight: bold; font-size: 1rem;">
                <td colspan="2" style="text-align: right;">TỔNG CỘNG:</td>
                <td style="text-align: center;">${totalPlan}</td>
                <td style="text-align: center; color: #3498db;">${totalActual}</td>
                <td style="text-align: center; color: var(--clr-primary);">${totalPercent}%</td>
            </tr>
        `;

        tbody.innerHTML = html;
    },

    renderChart() {
        const canvas = document.getElementById('trainingSummaryChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (this.chart) this.chart.destroy();

        const labels = this.summaryData.map(d => d.name);
        const planData = this.summaryData.map(d => d.plan);
        const actualData = this.summaryData.map(d => d.actual);

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Kế hoạch (Lượt)',
                        data: planData,
                        backgroundColor: '#cbd5e1'
                    },
                    {
                        label: 'Thực hiện (Lượt)',
                        data: actualData,
                        backgroundColor: '#3b82f6'
                    }
                ]
            },
            plugins: [ChartDataLabels],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    datalabels: {
                        color: '#444',
                        font: { weight: 'bold', size: 12 },
                        anchor: 'end',
                        align: 'top',
                        formatter: function(value) {
                            return value;
                        }
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: { color: '#f1f5f9' },
                        suggestedMax: 180
                    },
                    x: {
                        grid: { display: false }
                    }
                },
                onClick: (event, elements) => {
                    if (elements.length > 0) {
                        const idx = elements[0].index;
                        const company = labels[idx];
                        this.showDetail(company);
                    }
                }
            }
        });
    },

    showDetail(company) {
        const detailCard = document.getElementById('training-detail-card');
        const detailTitle = document.getElementById('training-detail-title');
        const detailTbody = document.getElementById('training-detail-tbody');
        
        if (!detailCard || !detailTitle || !detailTbody) return;
        
        detailTitle.textContent = 'Ma Trận Chương Trình Đào Tạo - ' + company;
        
        const data = this.getMatrixData(company);
        let html = '';

        data.forEach((row) => {
            const trStyle = row.isHeader ? 'font-weight: bold; background: #f8fafc;' : '';
            const tdStyle = row.indent ? 'padding-left: 1.5rem;' : '';
            
            let checksHtml = '';
            row.checks.forEach(checked => {
                checksHtml += `<td style="border: 1px solid #ccc; text-align: center; color: #16a34a; font-weight: bold; font-size: 1.2rem;">${checked ? '✓' : ''}</td>`;
            });

            const totalHtml = row.isHeader ? '' : row.total;

            html += `
                <tr style="${trStyle}">
                    <td style="border: 1px solid #ccc; text-align: center;">${row.stt}</td>
                    <td style="border: 1px solid #ccc; ${tdStyle}">${row.name}</td>
                    ${checksHtml}
                    <td style="border: 1px solid #ccc; text-align: center; font-weight: bold; color: #3b82f6;">${totalHtml}</td>
                </tr>
            `;
        });
        
        detailTbody.innerHTML = html;
        detailCard.classList.remove('hidden');
        
        // Scroll to detail smoothly
        setTimeout(() => {
            document.querySelector('.dashboard-views').scrollTo({
                top: detailCard.offsetTop - 20,
                behavior: 'smooth'
            });
        }, 100);
    }
};
