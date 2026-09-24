/**
 * Debt Module - Quản trị & Báo cáo Công Nợ VPS
 * Redesigned to exact specification:
 * - Tập trung vào Tình Hình Công Nợ (Tỷ VNĐ) chuẩn xác theo hình ảnh
 * - 4 Thẻ KPI Điều Hành: Tổng công nợ, Nợ trong hạn, Nợ quá hạn, Nợ khó đòi
 * - Biểu đồ cột chồng (Stacked Bar Chart) đúng 6 đơn vị và đúng từng phân đoạn
 * - Datalabels hiển thị số liệu trực tiếp trên từng cột (12,3 | 0,9 | 2,85 | 1,25 | 0,01 | 5,79 | 2 | 1,5 | 0,3)
 * - Tương tác: Nhấn vào cột đơn vị trên biểu đồ hoặc xem bảng tổng hợp để xem chi tiết khách hàng
 * - Loại bỏ toàn bộ giao diện rườm rà, sub-tab mẫu kế toán phức tạp
 */

(function () {
    'use strict';

    // Dữ liệu công nợ chuẩn xác theo hình ảnh người dùng cung cấp (Đơn vị: Tỷ VNĐ)
    const DEBT_UNITS_DATA = [
        {
            key: 'THH',
            name: 'Tân Hồng Hà',
            current: 12.3,
            overdue: 0.9,
            bad: 0.0,
            statusBadge: { text: 'An toàn', class: 'badge-green' },
            note: 'Quản lý công nợ tốt, tỷ lệ thu hồi cao',
            customers: [
                { id: 1, name: 'Công ty Cổ phần Tập đoàn Hòa Bình', current: 8500000000, overdue: 0, bad: 0, total: 8500000000, days: 0, status: 'Trong hạn (Hợp đồng thuê dài hạn)' },
                { id: 2, name: 'Bệnh viện Đa Khoa Hồng Ngọc', current: 2000000000, overdue: 400000000, bad: 0, total: 2400000000, days: 35, status: 'Chờ quyết toán chi phí quý 3' },
                { id: 3, name: 'Trường Quốc tế Wellspring', current: 1800000000, overdue: 500000000, bad: 0, total: 2300000000, days: 45, status: 'Đang làm thủ tục đối chiếu biên bản' }
            ]
        },
        {
            key: 'Viet',
            name: 'Việt',
            current: 2.85,
            overdue: 1.25,
            bad: 0.01,
            statusBadge: { text: 'Cần đôn đốc', class: 'badge-amber' },
            note: 'Theo dõi nợ quá hạn và xử lý 10 Triệu nợ khó đòi',
            customers: [
                { id: 4, name: 'Đại lý Gamma', current: 1800000000, overdue: 700000000, bad: 0, total: 2500000000, days: 60, status: 'Cam kết thanh toán tuần tới' },
                { id: 5, name: 'Công ty CP Viễn thông Đông Dương', current: 1050000000, overdue: 550000000, bad: 0, total: 1600000000, days: 75, status: 'Đang gửi công văn đôn đốc thu hồi' },
                { id: 6, name: 'Công ty CP Đầu tư Delta', current: 0, overdue: 0, bad: 10000000, total: 10000000, days: 180, status: 'Khoá tài khoản - Chuyển bộ phận pháp lý' }
            ]
        },
        {
            key: 'XemSon',
            name: 'Xem Sơn',
            current: 5.79,
            overdue: 2.0,
            bad: 0.0,
            statusBadge: { text: 'Quá hạn 2 Tỷ', class: 'badge-amber' },
            note: 'Tập trung thu hồi 2.0 Tỷ nợ quá hạn từ các dự án',
            customers: [
                { id: 7, name: 'Tập đoàn Beta', current: 3500000000, overdue: 1200000000, bad: 0, total: 4700000000, days: 55, status: 'Chờ nghiệm thu đợt 2' },
                { id: 8, name: 'Công ty CP May Phú Thịnh', current: 1500000000, overdue: 500000000, bad: 0, total: 2000000000, days: 45, status: 'Kế toán hẹn thanh toán cuối tháng' },
                { id: 9, name: 'Công ty CP Địa ốc Sông Hồng', current: 790000000, overdue: 300000000, bad: 0, total: 1090000000, days: 40, status: 'Đối chiếu chứng từ thanh toán' }
            ]
        },
        {
            key: 'VPSM',
            name: 'VPS M',
            current: 1.5,
            overdue: 0.3,
            bad: 0.0,
            statusBadge: { text: 'An toàn', class: 'badge-green' },
            note: 'Tỷ lệ nợ quá hạn thấp (16.7%), dòng tiền tốt',
            customers: [
                { id: 10, name: 'Đại lý Epsilon', current: 1000000000, overdue: 200000000, bad: 0, total: 1200000000, days: 35, status: 'Đại lý thanh toán định kỳ' },
                { id: 11, name: 'Công ty CP Vận tải Biển Đông', current: 500000000, overdue: 100000000, bad: 0, total: 600000000, days: 30, status: 'Chờ thanh toán hóa đơn mới' }
            ]
        },
        {
            key: 'ITSS',
            name: 'ITSS',
            current: 0.0,
            overdue: 0.0,
            bad: 0.0,
            statusBadge: { text: 'Tốt', class: 'badge-blue' },
            note: 'Không có số dư công nợ trong kỳ',
            customers: []
        },
        {
            key: 'VPVPS',
            name: 'Văn phòng VPS',
            current: 0.0,
            overdue: 0.0,
            bad: 0.0,
            statusBadge: { text: 'Tốt', class: 'badge-blue' },
            note: 'Không có số dư công nợ trong kỳ',
            customers: []
        }
    ];

    window.DebtModule = {
        currentPeriod: 'month',
        currentCompany: 'all',

        init() {
            // Lắng nghe sự kiện filter toàn cục
            document.addEventListener('vps_filter_changed', (e) => {
                this.currentPeriod = e.detail.period;
                this.currentCompany = e.detail.company;
                this.loadData();
            });

            // Tải và hiển thị dữ liệu
            this.loadData();
        },

        async loadData() {
            this.updateUI();
        },

        updateUI() {
            // 1. Tính toán tổng hợp KPI
            let totalCurrent = 0;
            let totalOverdue = 0;
            let totalBad = 0;

            DEBT_UNITS_DATA.forEach(u => {
                totalCurrent += u.current;
                totalOverdue += u.overdue;
                totalBad += u.bad;
            });

            const grandTotal = totalCurrent + totalOverdue + totalBad;
            const currentPct = grandTotal > 0 ? ((totalCurrent / grandTotal) * 100).toFixed(1) : '0';
            const overduePct = grandTotal > 0 ? ((totalOverdue / grandTotal) * 100).toFixed(1) : '0';

            // 2. Cập nhật 4 Thẻ KPI Điều Hành
            const elTotal = document.getElementById('debt-summary-total');
            if (elTotal) elTotal.textContent = grandTotal.toFixed(2);

            const elNormal = document.getElementById('debt-summary-normal');
            if (elNormal) elNormal.textContent = totalCurrent.toFixed(2);
            const elNormalRate = document.getElementById('debt-summary-normal-rate');
            if (elNormalRate) elNormalRate.textContent = currentPct + '%';

            const elOverdue = document.getElementById('debt-summary-overdue');
            if (elOverdue) elOverdue.textContent = totalOverdue.toFixed(2);
            const elOverdueRate = document.getElementById('debt-summary-overdue-rate');
            if (elOverdueRate) elOverdueRate.textContent = overduePct + '%';

            const elBad = document.getElementById('debt-summary-bad');
            if (elBad) elBad.textContent = totalBad.toFixed(2);

            // 3. Vẽ Biểu Đồ Cột Chồng "Tình Hình Công Nợ (Tỷ VNĐ)"
            this.renderDebtChart();

            // 4. Vẽ Bảng Tổng Hợp Theo Đơn Vị Thành Viên
            this.renderSummaryTable(grandTotal);

            // 5. Khởi tạo lại Lucide Icons
            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
        },

        renderDebtChart() {
            const ctx = document.getElementById('debtChart');
            if (!ctx || !window.ChartManager) return;

            const labels = DEBT_UNITS_DATA.map(u => u.name);
            const currentData = DEBT_UNITS_DATA.map(u => u.current);
            const overdueData = DEBT_UNITS_DATA.map(u => u.overdue);
            const badData = DEBT_UNITS_DATA.map(u => u.bad);

            const chartConfig = {
                labels: labels,
                datasets: [
                    {
                        label: 'Trong hạn',
                        data: currentData,
                        backgroundColor: '#2b7a9e',
                        borderWidth: 0,
                        barPercentage: 0.65,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Quá hạn',
                        data: overdueData,
                        backgroundColor: '#f59e0b',
                        borderWidth: 0,
                        barPercentage: 0.65,
                        categoryPercentage: 0.8
                    },
                    {
                        label: 'Khó đòi',
                        data: badData,
                        backgroundColor: '#dc2626',
                        borderWidth: 0,
                        barPercentage: 0.65,
                        categoryPercentage: 0.8
                    }
                ]
            };

            const chartOptions = {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        stacked: true,
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 12,
                                weight: '700'
                            },
                            color: '#1e293b'
                        }
                    },
                    y: {
                        stacked: true,
                        min: 0,
                        max: 14,
                        ticks: {
                            stepSize: 2,
                            font: {
                                size: 12,
                                weight: '600'
                            },
                            color: '#64748b'
                        },
                        grid: {
                            color: '#f1f5f9'
                        }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        align: 'center',
                        labels: {
                            boxWidth: 20,
                            boxHeight: 12,
                            padding: 20,
                            font: {
                                size: 12,
                                weight: '700'
                            },
                            color: '#1e293b'
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                let label = context.dataset.label || '';
                                if (label) label += ': ';
                                if (context.raw !== null) {
                                    label += Number(context.raw).toLocaleString('vi-VN') + ' Tỷ VNĐ';
                                }
                                return label;
                            }
                        }
                    },
                    datalabels: {
                        color: '#ffffff',
                        font: {
                            weight: 'bold',
                            size: 11
                        },
                        formatter: function (value) {
                            if (!value || value === 0) return '';
                            // Định dạng theo kiểu Việt Nam: 12,3 | 0,9 | 2,85 | 0,01
                            return Number(value).toLocaleString('vi-VN', {
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 2
                            });
                        },
                        textStrokeColor: 'rgba(0, 0, 0, 0.45)',
                        textStrokeWidth: 2
                    }
                },
                onClick: (event, elements) => {
                    if (elements && elements.length > 0) {
                        const index = elements[0].index;
                        const unit = DEBT_UNITS_DATA[index];
                        if (unit) {
                            this.openCompanyModal(unit.name);
                        }
                    }
                },
                onHover: (event, elements) => {
                    const canvas = event?.chart?.canvas || document.getElementById('debtChart');
                    if (canvas) {
                        canvas.style.cursor = (elements && elements.length > 0) ? 'pointer' : 'default';
                    }
                }
            };

            window.ChartManager.createChart('debtChart', 'bar', chartConfig, chartOptions);
        },

        renderSummaryTable(grandTotal) {
            const tbody = document.getElementById('debt-unit-summary-tbody');
            if (!tbody) return;

            let html = '';
            let sumCurrent = 0, sumOverdue = 0, sumBad = 0;

            DEBT_UNITS_DATA.forEach((unit, idx) => {
                const unitTotal = unit.current + unit.overdue + unit.bad;
                const unitPct = grandTotal > 0 ? ((unitTotal / grandTotal) * 100).toFixed(1) : '0';

                sumCurrent += unit.current;
                sumOverdue += unit.overdue;
                sumBad += unit.bad;

                const curFormatted = unit.current.toFixed(2);
                const overFormatted = unit.overdue.toFixed(2);
                const badFormatted = unit.bad.toFixed(2);
                const totalFormatted = unitTotal.toFixed(2);

                const hasCust = unit.customers && unit.customers.length > 0;

                html += `
                    <tr>
                        <td style="text-align: left; font-weight: 700; color: #0f172a; padding: 11px 14px;">
                            <span style="display: inline-flex; align-items: center; gap: 8px;">
                                <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #0284c7;"></span>
                                ${unit.name}
                            </span>
                        </td>
                        <td style="color: #0284c7; font-weight: 700;">${curFormatted}</td>
                        <td style="color: #d97706; font-weight: 700;">${overFormatted}</td>
                        <td style="color: ${unit.bad > 0 ? '#dc2626' : '#64748b'}; font-weight: 700;">
                            ${unit.bad > 0 ? `<span class="badge badge-red" style="font-size:0.8rem; font-weight:800;">${badFormatted}</span>` : badFormatted}
                        </td>
                        <td style="font-weight: 800; color: #0f172a; font-size: 0.92rem;">${totalFormatted}</td>
                        <td style="text-align: center;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 6px;">
                                <div style="width: 60px; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden;">
                                    <div style="width: ${Math.min(parseFloat(unitPct) * 1.5, 100)}%; height: 100%; background: #0284c7; border-radius: 3px;"></div>
                                </div>
                                <span style="font-size: 0.78rem; font-weight: 700; color: #475569;">${unitPct}%</span>
                            </div>
                        </td>
                        <td style="text-align: center;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <span class="debt-badge ${unit.statusBadge.class}">${unit.statusBadge.text}</span>
                                ${hasCust ? `
                                    <button type="button" onclick="window.DebtModule.openCompanyModal('${unit.name}')" title="Xem chi tiết khách hàng" style="background: #e0f2fe; color: #0284c7; border: 1px solid #bae6fd; border-radius: 6px; padding: 3px 8px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 3px;">
                                        <i data-lucide="eye" style="width: 12px; height: 12px;"></i> Chi tiết
                                    </button>
                                ` : `
                                    <span style="font-size: 0.75rem; color: #94a3b8;">Không có nợ</span>
                                `}
                            </div>
                        </td>
                    </tr>
                `;
            });

            // Hàng Tổng Cộng Toàn Tập Đoàn
            const sumTotal = sumCurrent + sumOverdue + sumBad;
            html += `
                <tr class="total-row">
                    <td style="text-align: left; padding: 12px 14px;">TỔNG CỘNG TẬP ĐOÀN</td>
                    <td>${sumCurrent.toFixed(2)}</td>
                    <td>${sumOverdue.toFixed(2)}</td>
                    <td style="color: ${sumBad > 0 ? '#dc2626' : '#0369a1'};">${sumBad.toFixed(2)}</td>
                    <td style="font-size: 1rem; color: #0f172a;">${sumTotal.toFixed(2)} Tỷ</td>
                    <td style="text-align: center;">100.0%</td>
                    <td style="text-align: center;">
                        <span class="debt-badge badge-blue">Tỷ lệ trong hạn ${((sumCurrent / sumTotal) * 100).toFixed(1)}%</span>
                    </td>
                </tr>
            `;

            tbody.innerHTML = html;
        },

        openCompanyModal(compName) {
            const unit = DEBT_UNITS_DATA.find(u => u.name === compName || u.key === compName);
            if (!unit) return;

            const modal = document.getElementById('debt-company-modal');
            const titleEl = document.getElementById('debt-modal-comp-name');
            const summaryEl = document.getElementById('debt-modal-comp-summary');
            const tbody = document.getElementById('debt-company-customers-tbody');

            if (!modal || !titleEl || !summaryEl || !tbody) return;

            const unitTotal = (unit.current + unit.overdue + unit.bad).toFixed(2);
            titleEl.textContent = `Chi Tiết Khách Hàng - ${unit.name}`;
            summaryEl.innerHTML = `Tổng dư nợ: <strong style="color: #0f172a;">${unitTotal} Tỷ VNĐ</strong> (Trong hạn: <strong style="color: #0284c7;">${unit.current.toFixed(2)} Tỷ</strong> • Quá hạn: <strong style="color: #d97706;">${unit.overdue.toFixed(2)} Tỷ</strong> • Khó đòi: <strong style="color: #dc2626;">${unit.bad.toFixed(2)} Tỷ</strong>)`;

            if (!unit.customers || unit.customers.length === 0) {
                tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 24px; color: #64748b;">Đơn vị không có khách hàng nợ trong kỳ báo cáo.</td></tr>`;
            } else {
                tbody.innerHTML = unit.customers.map((c, index) => {
                    const formatVnd = (num) => (num || 0).toLocaleString('vi-VN') + ' ₫';
                    const isBad = c.bad > 0;
                    const isOver = c.overdue > 0;

                    return `
                        <tr style="border-bottom: 1px solid #e2e8f0; ${isBad ? 'background: #fff1f2;' : ''}">
                            <td style="text-align: center; font-weight: 700; color: #64748b;">${index + 1}</td>
                            <td style="font-weight: 700; color: #0f172a;">${c.name}</td>
                            <td style="text-align: right; color: #0284c7; font-weight: 600;">${formatVnd(c.current)}</td>
                            <td style="text-align: right; color: #d97706; font-weight: 600;">${formatVnd(c.overdue)}</td>
                            <td style="text-align: right; color: #dc2626; font-weight: 700;">${formatVnd(c.bad)}</td>
                            <td style="text-align: right; color: #0f172a; font-weight: 800;">${formatVnd(c.total)}</td>
                            <td style="text-align: center; font-weight: 600; color: ${isOver ? '#b45309' : '#16a34a'};">
                                ${c.days > 0 ? c.days + ' ngày' : '—'}
                            </td>
                            <td style="text-align: center;">
                                <span style="font-size: 0.75rem; padding: 3px 8px; border-radius: 4px; font-weight: 700; display: inline-block; ${isBad ? 'background:#fee2e2; color:#dc2626; border:1px solid #fecaca;' : isOver ? 'background:#fef3c7; color:#b45309; border:1px solid #fde68a;' : 'background:#dcfce7; color:#15803d; border:1px solid #bbf7d0;'}">
                                    ${c.status}
                                </span>
                            </td>
                        </tr>
                    `;
                }).join('');
            }

            modal.classList.add('active');
            modal.style.display = 'flex';
            modal.style.opacity = '1';
            modal.style.pointerEvents = 'auto';

            // Đóng khi click ngoài backdrop
            modal.onclick = (e) => {
                if (e.target === modal) {
                    this.closeCompanyModal();
                }
            };

            if (window.lucide && typeof window.lucide.createIcons === 'function') {
                window.lucide.createIcons();
            }
        },

        closeCompanyModal() {
            const modal = document.getElementById('debt-company-modal');
            if (modal) {
                modal.classList.remove('active');
                modal.style.display = 'none';
                modal.style.opacity = '0';
                modal.style.pointerEvents = 'none';
            }
        }
    };

    // Khởi tạo tự động khi tài liệu sẵn sàng
    document.addEventListener('DOMContentLoaded', () => {
        if (window.DebtModule) {
            window.DebtModule.init();
        }
    });

})();
