window.IsoModule = {
    chart: null,
    
    summaryData: [
        { name: 'TÂN HỒNG HÀ', qt: 23, qd: 20, total: 43 },
        { name: 'VIỆT', qt: 25, qd: 21, total: 46 },
        { name: 'VPS', qt: 24, qd: 41, total: 65 },
        { name: 'ITSS', qt: 7, qd: 16, total: 23 },
        { name: 'VPSM', qt: 23, qd: 20, total: 43 },
        { name: 'XESCO', qt: 22, qd: 26, total: 48 }
    ],

    detailData: {
        'TÂN HỒNG HÀ': [
            { dept: 'KINH DOANH LẺ, THUÊ MÁY, DỰ ÁN', qt: 3, qtList: ['QT bán hàng', 'QT chăm sóc khách hàng', 'QT thầu'], qd: 1, qdList: ['QĐ về chỉ tiêu khách hàng và chăm sóc khách hàng của khối KD trên phần mềm CRM'] },
            { dept: 'KINH DOANH BÁN BUÔN', qt: 4, qtList: ['QT bán hàng', 'QT chăm sóc khách hàng', 'QT thầu', 'QT bảo hành tại KH'], qd: 2, qdList: ['- QĐ về chỉ tiêu khách hàng và chăm sóc khách hàng của khối KD trên phần mềm CRM', '- QĐ triển khai thị trường tỉnh'] },
            { dept: 'KỸ THUẬT', qt: 10, qtList: ['QT thực hiện lắp đặt máy', 'QT sửa chữa/ thay thế vật tư', 'QT bảo hành', 'QT bảo trì tại khách hàng', 'QT báo giá và kiểm soát báo giá', 'QT chăm sóc khách hàng', 'QT báo cáo', 'QT thu hồi vật tư', 'QT xuất hàng ra khỏi kho vật tư cũ', 'QT Kiểm soát vật tư thay thế cho KH'], qd: 3, qdList: ['QĐ về định nghĩa khách hàng và chăm sóc khách hàng', 'QĐ về dụng cụ đồ nghề tối thiểu KTV', 'Quy định quản lý kho hàng hoá kho vật tư cũ'] },
            { dept: 'KẾ TOÁN', qt: 5, qtList: ['- Quy trình thu công nợ khách hàng: Bán buôn, bán lẻ, dịch vụ kỹ thuật', '- Quy trình thu công nợ khách hàng KD thuê máy', '- Quy trình thu tiền', '- Quy trình chi tiền', '- QT BCTC'], qd: 14, qdList: ['- QĐ thanh toán thưởng', '- QĐ nhập hàng tại kho', '- QĐ thanh toán tiền hàng', '- QĐ thanh toán chi phí, công tác phí', '- QĐ tạm ứng', '- QĐ viết hóa đơn', '- QĐ thu hồi công nợ', '- QĐ kiểm kê hàng hóa tại kho', '- QĐ xuất hàng tại kho', '- QĐ duyệt giá bán hàng', '- QĐ kiểm soát tiền chiết khấu', '- QĐ kiểm tra thông tin hợp đồng', '- QĐ chế độ báo cáo của Kế toán', '- QĐ ký duyệt chứng từ'] },
            { dept: 'THẦU', qt: 1, qtList: ['QT thầu'], qd: 0, qdList: [] }
        ],
        'VIỆT': [
            { dept: 'KINH DOANH TH, KD THUÊ MÁY', qt: 3, qtList: ['QT bán hàng', 'QT chăm sóc khách hàng', 'QT thầu'], qd: 1, qdList: ['QĐ về chỉ tiêu khách hàng và chăm sóc khách hàng của khối KD trên phần mềm CRM'] },
            { dept: 'KINH DOANH ONLINE', qt: 10, qtList: ['ON-QT-01 Quy trình nhập hàng vào kho', 'ON-QT-02 Quy trình xuất hàng online', 'ON-QT-03 Quy trình đăng sản phẩm', 'ON-QT-04 Quy trình kiểm kê', 'ON-QT-05 Quy trình chăm sóc khách hàng của phòng online', 'ON-QT-06 Quy trình chi tiền của phòng online', 'ON-QT-07 Quy trình thu tiền của phòng online', 'ON-QT-08 QT làm việc BP giao nhận - kinh doanh online', 'ON-QT-09 QT đăng ký chương trình khuyến mại', 'ON-QT-10 Bảo hành tại TT'], qd: 4, qdList: ['- ON-QĐ-01 Quy định đăng sản phẩm lên sàn', '- ON-QĐ-02 Quy định xuất hàng ngoài giờ', '- ON-QĐ-03 QĐ về chỉ tiêu khách hàng và CSKH - Khối KD Online', 'ON-QĐ-04 Quy định chính sách vận chuyển, lắp đặt, sửa chữa, bảo hành'] },
            { dept: 'CỬA HÀNG', qt: 0, qtList: [], qd: 0, qdList: [] },
            { dept: 'KỸ THUẬT', qt: 7, qtList: ['QT thực hiện lắp đặt máy', 'QT sửa chữa/thay thế vật tư', 'QT bảo hành', 'QT bảo trì tại khách hàng', 'QT báo giá và kiểm soát báo giá', 'QT chăm sóc khách hàng', 'QT báo cáo'], qd: 2, qdList: ['QĐ về định nghĩa khách hàng và chăm sóc khách hàng', 'QĐ về dụng cụ đồ nghề tối thiểu KTV'] },
            { dept: 'KẾ TOÁN', qt: 5, qtList: ['- Quy trình thu công nợ khách hàng: Bán buôn, bán lẻ, dịch vụ kỹ thuật', '- Quy trình thu công nợ khách hàng KD thuê máy', '- Quy trình thu tiền', '- Quy trình chi tiền', '- Quy Trình BCTC'], qd: 14, qdList: ['- QĐ thanh toán thưởng', '- QĐ nhập hàng tại kho', '- QĐ thanh toán tiền hàng', '- QĐ thanh toán chi phí, công tác phí', '- QĐ tạm ứng', '- QĐ viết hóa đơn', '- QĐ thu hồi công nợ', '- QĐ kiểm kê hàng hóa tại kho', '- QĐ xuất hàng tại kho', '- QĐ duyệt giá bán hàng', '- QĐ kiểm soát tiền chiết khấu', '- QĐ kiểm tra thông tin hợp đồng', '- QĐ chế độ báo cáo của Kế toán', '- QĐ ký duyệt chứng từ'] }
        ],
        'VPS': [
            { dept: 'MARKETING', qt: 0, qtList: [], qd: 1, qdList: ['- QĐ về marketing'] },
            { dept: 'TÀI CHÍNH - KẾ TOÁN', qt: 5, qtList: ['1. Quy trình thu công nợ khách hàng: Bán buôn, bán lẻ, dịch vụ kỹ thuật', '2. Quy trình thu công nợ khách hàng KD thuê máy', '3. Quy trình thu tiền', '4. Quy trình chi tiền', '5. QT BCTC'], qd: 16, qdList: ['1. QĐ thanh toán thưởng', '2. QĐ nhập hàng tại kho', '3. QĐ thanh toán tiền hàng', '4. QĐ thanh toán chi phí, công tác phí', '5. QĐ tạm ứng', '6. QĐ viết hóa đơn', '7. QĐ thu hồi công nợ', '8. QĐ kiểm kê hàng hóa tại kho', '9. QĐ xuất hàng tại kho', '10. QĐ duyệt giá bán hàng', '11. QĐ kiểm soát tiền chiết khấu', '12. QĐ kiểm tra thông tin hợp đồng', '13. QĐ chế độ báo cáo của Kế toán', '14. QĐ quản lý quỹ tiền mặt', '15. QĐ kiểm soát nội bộ', '16. QĐ ký duyệt chứng từ'] },
            { dept: 'KẾ HOẠCH', qt: 5, qtList: ['1. QT nhập hàng vào kho, nhập lại: bán/thuê/demo', '2. QT nhập mua hàng ngoài', '3. QT nhập mua hàng chuyên trách', '4. QT xuất hàng ra khỏi kho', '5. QT kiểm kê hàng hóa'], qd: 11, qdList: ['1. QĐ về thời gian cung cấp giấy tờ', '2. QĐ về mua hàng', '3. QĐ hàng hóa nhập kho', '4. QĐ hàng hóa xuất kho', '5. QĐ kiểm kê hàng hóa', '6. QĐ nguyên tắc quản lý kho', '7. QĐ test máy', '8. QĐ quản lý và dán tem', '9. QĐ chính sách bảo hành với nhà cung cấp', '10. QĐ báo cáo SP HP', '11. QĐ đánh giá nhà cung cấp'] },
            { dept: 'HÀNH CHÍNH', qt: 0, qtList: [], qd: 9, qdList: ['1. QĐ về văn thư, lưu trữ', '2. QĐ về quản lý và sử dụng xe ô tô', '3. QĐ quản lý tài sản, trang thiết bị', '4. QĐ hành chính', '5. QĐ đối với nhân viên bảo vệ', '6. QĐ quản lý tài sản trang thiết bị', '7. QĐ phụ cấp ăn trưa, gửi xe', '8. QĐ thẩm quyền ký duyệt văn bản', '9. QĐ đối với nhân viên tạp vụ'] },
            { dept: 'NHÂN SỰ', qt: 9, qtList: ['1. QT đánh giá KPI', '2. QT tuyển dụng', '3. QT thử việc', '4. QT Đào tạo', '5. QT xử lý vi phạm kỷ luật', '6. QT giải quyết nghỉ việc', '7. QT xét duyệt nâng lương', '8. QT bổ nhiệm CBKC', '9. QT quản trị mục tiêu'], qd: 1, qdList: ['1. QĐ tiêu chuẩn hồ sơ nhân viên'] },
            { dept: 'PHÒNG KT-CN', qt: 5, qtList: ['1. QT bảo hành', '2. QT test máy', '3. QT lắp máy', '4. QT sửa mạch điện tử', '5. QT IT'], qd: 3, qdList: ['1. QĐ về dụng cụ đồ nghề', '2. QĐ về điều kiện bảo hành', '3. QĐ sửa mảng điện tử'] }
        ],
        'ITSS': [
            { dept: 'TÀI CHÍNH - KẾ TOÁN', qt: 4, qtList: ['1. Quy trình thu công nợ khách hàng: Bán buôn, bán lẻ, dịch vụ kỹ thuật', '2. Quy trình thu tiền', '3. Quy trình chi tiền', '4. QT BCTC'], qd: 16, qdList: ['1. QĐ thanh toán thưởng', '2. QĐ nhập hàng tại kho', '3. QĐ thanh toán tiền hàng', '4. QĐ thanh toán chi phí, công tác phí', '5. QĐ tạm ứng', '6. QĐ viết hóa đơn', '7. QĐ thu hồi công nợ', '8. QĐ kiểm kê hàng hóa tại kho', '9. QĐ xuất hàng tại kho', '10. QĐ duyệt giá bán hàng', '11. QĐ kiểm soát tiền chiết khấu', '12. QĐ kiểm tra thông tin hợp đồng', '13. QĐ chế độ báo cáo của Kế toán', '14. QĐ quản lý quỹ tiền mặt', '15. QĐ kiểm soát nội bộ', '16. QĐ ký duyệt chứng từ'] },
            { dept: 'Kinh doanh', qt: 3, qtList: ['1. QT bán hàng', '2. QT chăm sóc khách hàng', '3. QT thầu'], qd: 0, qdList: [] }
        ],
        'VPSM': [
            { dept: 'KINH DOANH', qt: 8, qtList: ['Các quy trình kinh doanh, chăm sóc KH'], qd: 3, qdList: ['Các quy định về bán hàng'] },
            { dept: 'KỸ THUẬT', qt: 10, qtList: ['Các quy trình kỹ thuật, sửa chữa, bảo hành'], qd: 3, qdList: ['Quy định dụng cụ, trang thiết bị'] },
            { dept: 'KẾ TOÁN', qt: 5, qtList: ['Quy trình thu, chi, BCTC'], qd: 14, qdList: ['Các quy định tài chính kế toán'] }
        ],
        'XESCO': [
            { dept: 'KINH DOANH', qt: 10, qtList: ['Các quy trình kinh doanh, thầu, dự án'], qd: 8, qdList: ['Các quy định hỗ trợ kinh doanh'] },
            { dept: 'KỸ THUẬT', qt: 7, qtList: ['Các quy trình lắp đặt, sửa chữa'], qd: 4, qdList: ['Quy định kỹ thuật'] },
            { dept: 'KẾ TOÁN', qt: 5, qtList: ['Quy trình thu, chi, BCTC'], qd: 14, qdList: ['Các quy định tài chính kế toán'] }
        ]
    },

    init() {
        this.renderSummaryTable();
        this.renderChart();
    },

    renderSummaryTable() {
        const tbody = document.getElementById('iso-summary-tbody');
        if (!tbody) return;
        
        let html = '';
        this.summaryData.forEach((row, idx) => {
            html += `
                <tr style="cursor:pointer;" onclick="window.IsoModule.showDetail('${row.name}')" title="Nhấn để xem chi tiết">
                    <td style="text-align: center;">${idx + 1}</td>
                    <td style="color: var(--clr-primary); font-weight: 500;">${row.name}</td>
                    <td style="text-align: center;">${row.qt}</td>
                    <td style="text-align: center;">${row.qd}</td>
                    <td style="text-align: center; font-weight: bold;">${row.total}</td>
                </tr>
            `;
        });
        tbody.innerHTML = html;
    },

    renderChart() {
        const canvas = document.getElementById('isoSummaryChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        if (this.chart) this.chart.destroy();

        const labels = this.summaryData.map(d => d.name);
        const qtData = this.summaryData.map(d => d.qt);
        const qdData = this.summaryData.map(d => d.qd);

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Quy trình',
                        data: qtData,
                        backgroundColor: '#3498db'
                    },
                    {
                        label: 'Quy định',
                        data: qdData,
                        backgroundColor: '#2ecc71'
                    }
                ]
            },
            plugins: [ChartDataLabels],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, beginAtZero: true }
                },
                plugins: {
                    datalabels: {
                        color: 'rgba(0,0,0,0.6)',
                        font: { weight: '500', size: 14 },
                        anchor: 'center',
                        align: 'center',
                        formatter: function(value) {
                            return value > 0 ? value : '';
                        }
                    },
                    legend: {
                        position: 'top'
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
        const detailCard = document.getElementById('iso-detail-card');
        const detailTitle = document.getElementById('iso-detail-title');
        const detailTbody = document.getElementById('iso-detail-tbody');
        
        if (!detailCard || !detailTitle || !detailTbody) return;
        
        detailTitle.textContent = 'Chi Tiết Quy Trình, Quy Định - ' + company;
        
        const data = this.detailData[company] || [];
        let html = '';
        let totalQt = 0, totalQd = 0, totalAll = 0;

        data.forEach((row, idx) => {
            const qtListHtml = row.qtList.map(item => `<div>${item}</div>`).join('');
            const qdListHtml = row.qdList.map(item => `<div>${item}</div>`).join('');
            const rowTotal = row.qt + row.qd;
            
            totalQt += row.qt;
            totalQd += row.qd;
            totalAll += rowTotal;

            html += `
                <tr>
                    <td style="text-align: center;">${idx + 1}</td>
                    <td style="font-weight: 500;">${row.dept}</td>
                    <td style="text-align: center; font-weight: bold; color: #3498db;">${row.qt}</td>
                    <td style="font-size: 0.85rem;">${qtListHtml}</td>
                    <td style="text-align: center; font-weight: bold; color: #2ecc71;">${row.qd}</td>
                    <td style="font-size: 0.85rem;">${qdListHtml}</td>
                    <td style="text-align: center; font-weight: bold;">${rowTotal}</td>
                </tr>
            `;
        });
        
        if (data.length > 0) {
            html += `
                <tr style="background: #f8f9fa; font-weight: bold;">
                    <td colspan="2" style="text-align: right;">TỔNG CỘNG:</td>
                    <td style="text-align: center; color: #3498db;">${totalQt}</td>
                    <td></td>
                    <td style="text-align: center; color: #2ecc71;">${totalQd}</td>
                    <td></td>
                    <td style="text-align: center; color: var(--clr-primary);">${totalAll}</td>
                </tr>
            `;
        } else {
            html = `<tr><td colspan="7" style="text-align: center;">Chưa có dữ liệu chi tiết cho đơn vị này.</td></tr>`;
        }

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
