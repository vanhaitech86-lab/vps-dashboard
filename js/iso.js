/**
 * VPS Group - ISO Management & Standardization Dashboard Module
 * Comprehensive Quality & Process Control Dashboard
 */
window.IsoModule = {
    barChart: null,
    pieChart: null,
    currentCompany: 'ALL',
    currentCluster: 'ALL',
    currentType: 'ALL',
    searchKeyword: '',
    isDetailsCollapsed: false,

    // Cluster metadata mapping
    clusterMap: {
        'KD': { name: 'Khối Kinh Doanh & Khách Hàng', class: 'cluster-kd', color: '#3b82f6' },
        'KT': { name: 'Khối Kỹ Thuật & Công Nghệ', class: 'cluster-kt', color: '#6366f1' },
        'TC': { name: 'Khối Tài Chính - Kế Toán', class: 'cluster-tc', color: '#f59e0b' },
        'VH': { name: 'Khối Vận Hành - Kho Vận', class: 'cluster-vh', color: '#10b981' },
        'NS': { name: 'Khối Quản Trị - Nhân Sự', class: 'cluster-ns', color: '#8b5cf6' }
    },

    // 10 Core Departments from Image (Master Group Level)
    masterGroupData: [
        {
            dept: 'KINH DOANH LẺ, THUÊ MÁY, DỰ ÁN',
            cluster: 'KD',
            qt: 3,
            qtList: [
                'QT bán hàng',
                'QT chăm sóc khách hàng',
                'QT thầu'
            ],
            qd: 1,
            qdList: [
                'QĐ về chỉ tiêu khách hàng và chăm sóc khách hàng của khối KD trên phần mềm CRM'
            ]
        },
        {
            dept: 'KINH DOANH BÁN BUÔN',
            cluster: 'KD',
            qt: 4,
            qtList: [
                'QT bán hàng',
                'QT chăm sóc khách hàng',
                'QT thầu',
                'QT bảo hành tại KH'
            ],
            qd: 2,
            qdList: [
                'QĐ về chỉ tiêu khách hàng và chăm sóc khách hàng của khối KD trên phần mềm CRM',
                'QĐ triển khai thị trường tỉnh'
            ]
        },
        {
            dept: 'KINH DOANH ONLINE (CÔNG TY VIỆT)',
            cluster: 'KD',
            qt: 10,
            qtList: [
                'ON-QT-01 Quy trình nhập hàng vào kho',
                'ON-QT-02 Quy trình xuất hàng online',
                'ON-QT-03 Quy trình đăng sản phẩm',
                'ON-QT-04 Quy trình kiểm kê',
                'ON-QT-05 Quy trình chăm sóc khách hàng của phòng online',
                'ON-QT-06 Quy trình chi tiền của phòng online',
                'ON-QT-07 Quy trình thu tiền của phòng online',
                'ON-QT-08 QT làm việc BP giao nhận - kinh doanh online',
                'ON-QT-09 QT đăng ký chương trình khuyến mại',
                'ON-QT-10 Bảo hành tại TT'
            ],
            qd: 4,
            qdList: [
                'ON-QĐ-01 Quy định đăng sản phẩm lên sàn',
                'ON-QĐ-02 Quy định xuất hàng ngoài giờ',
                'ON-QĐ-03 QĐ về chỉ tiêu khách hàng và CSKH - Khối KD Online',
                'ON-QĐ-04 Quy định chính sách vận chuyển, lắp đặt, sửa chữa, bảo hành'
            ]
        },
        {
            dept: 'KỸ THUẬT',
            cluster: 'KT',
            qt: 10,
            qtList: [
                'QT thực hiện lắp đặt máy',
                'QT sửa chữa/ thay thế vật tư',
                'QT bảo hành',
                'QT bảo trì tại khách hàng',
                'QT báo giá và kiểm soát báo giá',
                'QT chăm sóc khách hàng',
                'QT báo cáo',
                'QT thu hồi vật tư',
                'QT xuất hàng ra khỏi kho vật tư cũ',
                'QT Kiểm soát vật tư thay thế cho KH'
            ],
            qd: 3,
            qdList: [
                'QĐ về định nghĩa khách hàng và chăm sóc khách hàng',
                'QĐ về dụng cụ đồ nghề tối thiểu KTV',
                'Quy định quản lý kho hàng hoá kho vật tư cũ'
            ]
        },
        {
            dept: 'KẾ TOÁN',
            cluster: 'TC',
            qt: 5,
            qtList: [
                '1. Quy trình thu công nợ khách hàng: Bán buôn, bán lẻ, dịch vụ kỹ thuật',
                '2. Quy trình thu công nợ khách hàng KD thuê máy',
                '3. Quy trình thu tiền',
                '4. Quy trình chi tiền',
                '5. QT BCTC'
            ],
            qd: 14,
            qdList: [
                '1. QĐ thanh toán thưởng',
                '2. QĐ nhập hàng tại kho',
                '3. QĐ thanh toán tiền hàng',
                '4. QĐ thanh toán chi phí, công tác phí',
                '5. QĐ tạm ứng',
                '6. QĐ viết hóa đơn',
                '7. QĐ thu hồi công nợ',
                '8. QĐ kiểm kê hàng hóa tại kho',
                '9. QĐ xuất hàng tại kho',
                '10. QĐ duyệt giá bán hàng',
                '11. QĐ kiểm soát tiền chiết khấu',
                '12. QĐ kiểm tra thông tin hợp đồng',
                '13. QĐ chế độ báo cáo của Kế toán',
                '14. QĐ ký duyệt chứng từ'
            ]
        },
        {
            dept: 'MARKETING',
            cluster: 'KD',
            qt: 0,
            qtList: [],
            qd: 1,
            qdList: [
                '1. QĐ về marketing'
            ]
        },
        {
            dept: 'KẾ HOẠCH',
            cluster: 'VH',
            qt: 5,
            qtList: [
                '1. QT nhập hàng vào kho, nhập lại: bán/thuê/demo',
                '2. QT nhập mua hàng ngoài',
                '3. QT nhập mua hàng chuyên trách',
                '4. QT xuất hàng ra khỏi kho',
                '5. QT kiểm kê hàng hóa'
            ],
            qd: 11,
            qdList: [
                '1. QĐ về thời gian cung cấp giấy tờ',
                '2. QĐ về mua hàng',
                '3. QĐ hàng hóa nhập kho',
                '4. QĐ hàng hóa xuất kho',
                '5. QĐ kiểm kê hàng hóa',
                '6. QĐ nguyên tắc quản lý kho',
                '7. QĐ test máy',
                '8. QĐ quản lý và dán tem',
                '9. QĐ chính sách bảo hành với nhà cung cấp',
                '10. QĐ báo cáo SP HP',
                '11. QĐ đánh giá nhà cung cấp'
            ]
        },
        {
            dept: 'HÀNH CHÍNH',
            cluster: 'NS',
            qt: 0,
            qtList: [],
            qd: 9,
            qdList: [
                '1. QĐ về văn thư, lưu trữ',
                '2. QĐ về quản lý và sử dụng xe ô tô',
                '3. QĐ quản lý tài sản, trang thiết bị',
                '4. QĐ hành chính',
                '5. QĐ đối với nhân viên bảo vệ',
                '6. QĐ quản lý tài sản trang thiết bị',
                '7. QĐ phụ cấp ăn trưa, gửi xe',
                '8. QĐ thẩm quyền ký duyệt văn bản',
                '9. QĐ đối với nhân viên tạp vụ'
            ]
        },
        {
            dept: 'NHÂN SỰ',
            cluster: 'NS',
            qt: 9,
            qtList: [
                '1. QT đánh giá KPI',
                '2. QT tuyển dụng',
                '3. QT thử việc',
                '4. QT Đào tạo',
                '5. QT xử lý vi phạm kỷ luật',
                '6. QT giải quyết nghỉ việc',
                '7. QT xét duyệt nâng lương',
                '8. QT bổ nhiệm CBKC',
                '9. QT quản trị mục tiêu'
            ],
            qd: 1,
            qdList: [
                '1. QĐ tiêu chuẩn hồ sơ nhân viên'
            ]
        },
        {
            dept: 'PHÒNG KT-CN',
            cluster: 'KT',
            qt: 5,
            qtList: [
                '1. QT bảo hành',
                '2. QT test máy',
                '3. QT lắp máy',
                '4. QT sửa mạch điện tử',
                '5. QT IT'
            ],
            qd: 3,
            qdList: [
                '1. QĐ về dụng cụ đồ nghề',
                '2. QĐ về điều kiện bảo hành',
                '3. QĐ sửa mảng điện tử'
            ]
        }
    ],

    // Summary data across subsidiary companies (compatible with overview.js)
    summaryData: [
        { name: 'TÂN HỒNG HÀ', qt: 23, qd: 20, total: 43 },
        { name: 'VIỆT', qt: 25, qd: 21, total: 46 },
        { name: 'VPS', qt: 24, qd: 41, total: 65 },
        { name: 'ITSS', qt: 7, qd: 16, total: 23 },
        { name: 'VPSM', qt: 23, qd: 20, total: 43 },
        { name: 'XESCO', qt: 22, qd: 26, total: 48 }
    ],

    // Company specific details
    detailData: {
        'TÂN HỒNG HÀ': [
            { dept: 'KINH DOANH LẺ, THUÊ MÁY, DỰ ÁN', cluster: 'KD', qt: 3, qtList: ['QT bán hàng', 'QT chăm sóc khách hàng', 'QT thầu'], qd: 1, qdList: ['QĐ về chỉ tiêu khách hàng và chăm sóc khách hàng của khối KD trên phần mềm CRM'] },
            { dept: 'KINH DOANH BÁN BUÔN', cluster: 'KD', qt: 4, qtList: ['QT bán hàng', 'QT chăm sóc khách hàng', 'QT thầu', 'QT bảo hành tại KH'], qd: 2, qdList: ['QĐ về chỉ tiêu khách hàng và chăm sóc khách hàng của khối KD trên phần mềm CRM', 'QĐ triển khai thị trường tỉnh'] },
            { dept: 'KỸ THUẬT', cluster: 'KT', qt: 10, qtList: ['QT thực hiện lắp đặt máy', 'QT sửa chữa/ thay thế vật tư', 'QT bảo hành', 'QT bảo trì tại khách hàng', 'QT báo giá và kiểm soát báo giá', 'QT chăm sóc khách hàng', 'QT báo cáo', 'QT thu hồi vật tư', 'QT xuất hàng ra khỏi kho vật tư cũ', 'QT Kiểm soát vật tư thay thế cho KH'], qd: 3, qdList: ['QĐ về định nghĩa khách hàng và chăm sóc khách hàng', 'QĐ về dụng cụ đồ nghề tối thiểu KTV', 'Quy định quản lý kho hàng hoá kho vật tư cũ'] },
            { dept: 'KẾ TOÁN', cluster: 'TC', qt: 5, qtList: ['Quy trình thu công nợ khách hàng: Bán buôn, bán lẻ, kỹ thuật', 'Quy trình thu công nợ khách hàng KD thuê máy', 'Quy trình thu tiền', 'Quy trình chi tiền', 'QT BCTC'], qd: 14, qdList: ['QĐ thanh toán thưởng', 'QĐ nhập hàng tại kho', 'QĐ thanh toán tiền hàng', 'QĐ thanh toán chi phí, công tác phí', 'QĐ tạm ứng', 'QĐ viết hóa đơn', 'QĐ thu hồi công nợ', 'QĐ kiểm kê hàng hóa tại kho', 'QĐ xuất hàng tại kho', 'QĐ duyệt giá bán hàng', 'QĐ kiểm soát tiền chiết khấu', 'QĐ kiểm tra thông tin hợp đồng', 'QĐ chế độ báo cáo của Kế toán', 'QĐ ký duyệt chứng từ'] },
            { dept: 'THẦU', cluster: 'KD', qt: 1, qtList: ['QT thầu'], qd: 0, qdList: [] }
        ],
        'VIỆT': [
            { dept: 'KINH DOANH TH, KD THUÊ MÁY', cluster: 'KD', qt: 3, qtList: ['QT bán hàng', 'QT chăm sóc khách hàng', 'QT thầu'], qd: 1, qdList: ['QĐ về chỉ tiêu khách hàng và chăm sóc khách hàng của khối KD trên phần mềm CRM'] },
            { dept: 'KINH DOANH ONLINE', cluster: 'KD', qt: 10, qtList: ['ON-QT-01 Quy trình nhập hàng vào kho', 'ON-QT-02 Quy trình xuất hàng online', 'ON-QT-03 Quy trình đăng sản phẩm', 'ON-QT-04 Quy trình kiểm kê', 'ON-QT-05 Quy trình chăm sóc khách hàng của phòng online', 'ON-QT-06 Quy trình chi tiền của phòng online', 'ON-QT-07 Quy trình thu tiền của phòng online', 'ON-QT-08 QT làm việc BP giao nhận - kinh doanh online', 'ON-QT-09 QT đăng ký chương trình khuyến mại', 'ON-QT-10 Bảo hành tại TT'], qd: 4, qdList: ['ON-QĐ-01 Quy định đăng sản phẩm lên sàn', 'ON-QĐ-02 Quy định xuất hàng ngoài giờ', 'ON-QĐ-03 QĐ về chỉ tiêu khách hàng và CSKH - Khối KD Online', 'ON-QĐ-04 Quy định chính sách vận chuyển, lắp đặt, sửa chữa, bảo hành'] },
            { dept: 'KỸ THUẬT', cluster: 'KT', qt: 7, qtList: ['QT thực hiện lắp đặt máy', 'QT sửa chữa/thay thế vật tư', 'QT bảo hành', 'QT bảo trì tại khách hàng', 'QT báo giá và kiểm soát báo giá', 'QT chăm sóc khách hàng', 'QT báo cáo'], qd: 2, qdList: ['QĐ về định nghĩa khách hàng và chăm sóc khách hàng', 'QĐ về dụng cụ đồ nghề tối thiểu KTV'] },
            { dept: 'KẾ TOÁN', cluster: 'TC', qt: 5, qtList: ['Quy trình thu công nợ khách hàng: Bán buôn, bán lẻ, kỹ thuật', 'Quy trình thu công nợ khách hàng KD thuê máy', 'Quy trình thu tiền', 'Quy trình chi tiền', 'Quy Trình BCTC'], qd: 14, qdList: ['QĐ thanh toán thưởng', 'QĐ nhập hàng tại kho', 'QĐ thanh toán tiền hàng', 'QĐ thanh toán chi phí, công tác phí', 'QĐ tạm ứng', 'QĐ viết hóa đơn', 'QĐ thu hồi công nợ', 'QĐ kiểm kê hàng hóa tại kho', 'QĐ xuất hàng tại kho', 'QĐ duyệt giá bán hàng', 'QĐ kiểm soát tiền chiết khấu', 'QĐ kiểm tra thông tin hợp đồng', 'QĐ chế độ báo cáo của Kế toán', 'QĐ ký duyệt chứng từ'] }
        ],
        'VPS': [
            { dept: 'MARKETING', cluster: 'KD', qt: 0, qtList: [], qd: 1, qdList: ['QĐ về marketing'] },
            { dept: 'TÀI CHÍNH - KẾ TOÁN', cluster: 'TC', qt: 5, qtList: ['1. Quy trình thu công nợ khách hàng: Bán buôn, bán lẻ, kỹ thuật', '2. Quy trình thu công nợ khách hàng KD thuê máy', '3. Quy trình thu tiền', '4. Quy trình chi tiền', '5. QT BCTC'], qd: 16, qdList: ['1. QĐ thanh toán thưởng', '2. QĐ nhập hàng tại kho', '3. QĐ thanh toán tiền hàng', '4. QĐ thanh toán chi phí, công tác phí', '5. QĐ tạm ứng', '6. QĐ viết hóa đơn', '7. QĐ thu hồi công nợ', '8. QĐ kiểm kê hàng hóa tại kho', '9. QĐ xuất hàng tại kho', '10. QĐ duyệt giá bán hàng', '11. QĐ kiểm soát tiền chiết khấu', '12. QĐ kiểm tra thông tin hợp đồng', '13. QĐ chế độ báo cáo của Kế toán', '14. QĐ quản lý quỹ tiền mặt', '15. QĐ kiểm soát nội bộ', '16. QĐ ký duyệt chứng từ'] },
            { dept: 'KẾ HOẠCH', cluster: 'VH', qt: 5, qtList: ['1. QT nhập hàng vào kho, nhập lại: bán/thuê/demo', '2. QT nhập mua hàng ngoài', '3. QT nhập mua hàng chuyên trách', '4. QT xuất hàng ra khỏi kho', '5. QT kiểm kê hàng hóa'], qd: 11, qdList: ['1. QĐ về thời gian cung cấp giấy tờ', '2. QĐ về mua hàng', '3. QĐ hàng hóa nhập kho', '4. QĐ hàng hóa xuất kho', '5. QĐ kiểm kê hàng hóa', '6. QĐ nguyên tắc quản lý kho', '7. QĐ test máy', '8. QĐ quản lý và dán tem', '9. QĐ chính sách bảo hành với nhà cung cấp', '10. QĐ báo cáo SP HP', '11. QĐ đánh giá nhà cung cấp'] },
            { dept: 'HÀNH CHÍNH', cluster: 'NS', qt: 0, qtList: [], qd: 9, qdList: ['1. QĐ về văn thư, lưu trữ', '2. QĐ về quản lý và sử dụng xe ô tô', '3. QĐ quản lý tài sản, trang thiết bị', '4. QĐ hành chính', '5. QĐ đối với nhân viên bảo vệ', '6. QĐ quản lý tài sản trang thiết bị', '7. QĐ phụ cấp ăn trưa, gửi xe', '8. QĐ thẩm quyền ký duyệt văn bản', '9. QĐ đối với nhân viên tạp vụ'] },
            { dept: 'NHÂN SỰ', cluster: 'NS', qt: 9, qtList: ['1. QT đánh giá KPI', '2. QT tuyển dụng', '3. QT thử việc', '4. QT Đào tạo', '5. QT xử lý vi phạm kỷ luật', '6. QT giải quyết nghỉ việc', '7. QT xét duyệt nâng lương', '8. QT bổ nhiệm CBKC', '9. QT quản trị mục tiêu'], qd: 1, qdList: ['1. QĐ tiêu chuẩn hồ sơ nhân viên'] },
            { dept: 'PHÒNG KT-CN', cluster: 'KT', qt: 5, qtList: ['1. QT bảo hành', '2. QT test máy', '3. QT lắp máy', '4. QT sửa mạch điện tử', '5. QT IT'], qd: 3, qdList: ['1. QĐ về dụng cụ đồ nghề', '2. QĐ về điều kiện bảo hành', '3. QĐ sửa mảng điện tử'] }
        ],
        'ITSS': [
            { dept: 'TÀI CHÍNH - KẾ TOÁN', cluster: 'TC', qt: 4, qtList: ['1. Quy trình thu công nợ khách hàng', '2. Quy trình thu tiền', '3. Quy trình chi tiền', '4. QT BCTC'], qd: 16, qdList: ['1. QĐ thanh toán thưởng', '2. QĐ nhập hàng tại kho', '3. QĐ thanh toán tiền hàng', '4. QĐ thanh toán chi phí', '5. QĐ tạm ứng', '6. QĐ viết hóa đơn', '7. QĐ thu hồi công nợ', '8. QĐ kiểm kê kho', '9. QĐ xuất kho', '10. QĐ duyệt giá', '11. QĐ kiểm soát chiết khấu', '12. QĐ kiểm tra hợp đồng', '13. QĐ chế độ báo cáo', '14. QĐ quản lý quỹ', '15. QĐ kiểm soát nội bộ', '16. QĐ ký duyệt'] },
            { dept: 'KINH DOANH', cluster: 'KD', qt: 3, qtList: ['1. QT bán hàng', '2. QT chăm sóc khách hàng', '3. QT thầu'], qd: 0, qdList: [] }
        ],
        'VPSM': [
            { dept: 'KINH DOANH', cluster: 'KD', qt: 8, qtList: ['1. QT bán hàng', '2. QT chăm sóc khách hàng', '3. QT thầu dự án', '4. QT chào giá', '5. QT ký hợp đồng', '6. QT quản lý dữ liệu CRM', '7. QT giao hàng', '8. QT kiểm tra công nợ'], qd: 3, qdList: ['1. QĐ chỉ tiêu kinh doanh', '2. QĐ giá bán tối thiểu', '3. QĐ chiết khấu bán lẻ'] },
            { dept: 'KỸ THUẬT', cluster: 'KT', qt: 10, qtList: ['1. QT lắp đặt máy', '2. QT sửa chữa', '3. QT thay thế linh kiện', '4. QT bảo dưỡng định kỳ', '5. QT bảo hành thiết bị', '6. QT test kỹ thuật', '7. QT thu hồi máy', '8. QT nhập kho xác', '9. QT kiểm tra an toàn điện', '10. QT báo cáo sự cố'], qd: 3, qdList: ['1. QĐ định mức vật tư sửa chữa', '2. QĐ thời gian xử lý sự cố', '3. QĐ bàn giao máy'] },
            { dept: 'KẾ TOÁN', cluster: 'TC', qt: 5, qtList: ['1. QT thu tiền', '2. QT chi tiền', '3. QT đối soát công nợ', '4. QT kiểm kê kho', '5. QT lập BCTC'], qd: 14, qdList: ['1. QĐ tạm ứng', '2. QĐ thanh toán chi phí', '3. QĐ xuất hóa đơn', '4. QĐ chế độ báo cáo', '5. QĐ duyệt chi', '6. QĐ lưu trữ chứng từ', '7. QĐ kiểm kê định kỳ', '8. QĐ trích lập dự phòng', '9. QĐ định mức công tác phí', '10. QĐ thu nợ khó đòi', '11. QĐ thưởng doanh số', '12. QĐ quản lý quỹ', '13. QĐ kiểm toán nội bộ', '14. QĐ thẩm quyền ký duyệt'] }
        ],
        'XESCO': [
            { dept: 'KINH DOANH', cluster: 'KD', qt: 10, qtList: ['1. QT bán hàng đại lý', '2. QT bán hàng dự án', '3. QT chăm sóc đại lý', '4. QT mở mã khách hàng', '5. QT báo giá & hợp đồng', '6. QT xử lý khiếu nại', '7. QT hỗ trợ thị trường', '8. QT triển khai khuyến mại', '9. QT bàn giao nghiệm thu', '10. QT thanh lý hợp đồng'], qd: 8, qdList: ['1. QĐ chính sách bán hàng', '2. QĐ hạn mức công nợ', '3. QĐ thưởng đại lý', '4. QĐ giá niêm yết', '5. QĐ bảo vệ vùng bán hàng', '6. QĐ thu hồi công nợ', '7. QĐ hoa hồng môi giới', '8. QĐ tiếp khách & công tác'] },
            { dept: 'KỸ THUẬT', cluster: 'KT', qt: 7, qtList: ['1. QT lắp đặt thiết bị', '2. QT sửa chữa bảo hành', '3. QT hướng dẫn vận hành', '4. QT kiểm tra định kỳ', '5. QT đổi trả hàng lỗi', '6. QT đề xuất thay thế phụ tùng', '7. QT nghiệm thu kỹ thuật'], qd: 4, qdList: ['1. QĐ bảo hành chính hãng', '2. QĐ trách nhiệm kỹ thuật viên', '3. QĐ an toàn lao động', '4. QĐ cấp phát dụng cụ'] },
            { dept: 'KẾ TOÁN', cluster: 'TC', qt: 5, qtList: ['1. QT thu tiền', '2. QT chi tiền', '3. QT thu công nợ', '4. QT kiểm kê kho hàng', '5. QT lập báo cáo tài chính'], qd: 14, qdList: ['1. QĐ thanh toán thưởng', '2. QĐ nhập kho', '3. QĐ xuất kho', '4. QĐ tạm ứng công tác', '5. QĐ thanh toán hóa đơn', '6. QĐ quản lý quỹ tiền', '7. QĐ kiểm kê tài sản', '8. QĐ phân quyền tài chính', '9. QĐ định mức chi phí', '10. QĐ chiết khấu thanh toán', '11. QĐ đối chiếu ngân hàng', '12. QĐ lập dự toán', '13. QĐ kiểm soát hợp đồng', '14. QĐ duyệt chi'] }
        ]
    },

    /**
     * Initialize Module
     */
    init() {
        // Sync with Google Sheets data if present
        if (window.mockData && window.mockData.iso_raw && window.mockData.iso_raw.length > 1) {
            this.parseGoogleSheetsData(window.mockData.iso_raw);
        }

        // Listen for global company filter change
        document.addEventListener('vps_filter_changed', (e) => {
            if (e.detail && e.detail.company) {
                const comp = e.detail.company;
                if (comp === 'all') {
                    this.setCompanyFilter('ALL', false);
                } else {
                    const matched = Object.keys(this.detailData).find(k => k.toLowerCase() === comp.toLowerCase());
                    if (matched) {
                        this.setCompanyFilter(matched, false);
                    }
                }
            }
        });

        // Initial Render
        this.renderAll();
    },

    /**
     * Parse raw Google Sheets CSV data
     */
    parseGoogleSheetsData(csv) {
        let sumData = {};
        let detData = {};

        for (let i = 1; i < csv.length; i++) {
            let row = csv[i];
            if (!row || !row[0]) continue;

            let c = row[0].toString().trim().toUpperCase();
            let p = (row[1] || 'Khác').toString().trim().toUpperCase();
            let t = (row[2] || '').toString().trim();
            let loai = (row[3] || '').toString().trim().toLowerCase();

            let cid = 'TÂN HỒNG HÀ';
            if (c.includes('VIỆT') || c === 'VIET') cid = 'VIỆT';
            else if (c.includes('ITSS')) cid = 'ITSS';
            else if (c.includes('VPSM') || c.includes('VPS M')) cid = 'VPSM';
            else if (c.includes('XESCO')) cid = 'XESCO';
            else if (c === 'VPS' || c.includes('VĂN PHÒNG')) cid = 'VPS';
            else cid = c;

            if (!sumData[cid]) sumData[cid] = { name: cid, qt: 0, qd: 0, total: 0 };
            if (!detData[cid]) detData[cid] = {};
            if (!detData[cid][p]) {
                let cluster = 'KD';
                if (p.includes('TOÁN') || p.includes('TÀI CHÍNH')) cluster = 'TC';
                else if (p.includes('THUẬT') || p.includes('CN') || p.includes('IT')) cluster = 'KT';
                else if (p.includes('KHO') || p.includes('HOẠCH')) cluster = 'VH';
                else if (p.includes('SỰ') || p.includes('CHÍNH') || p.includes('VĂN PHÒNG')) cluster = 'NS';

                detData[cid][p] = { dept: p, cluster: cluster, qt: 0, qtList: [], qd: 0, qdList: [] };
            }

            let isQt = loai.includes('trình') || loai.includes('qt');
            if (isQt) {
                sumData[cid].qt++;
                detData[cid][p].qt++;
                detData[cid][p].qtList.push(t);
            } else {
                sumData[cid].qd++;
                detData[cid][p].qd++;
                detData[cid][p].qdList.push(t);
            }
            sumData[cid].total++;
        }

        if (Object.keys(sumData).length > 0) {
            this.summaryData = Object.values(sumData);
        }
        for (let c in detData) {
            this.detailData[c] = Object.values(detData[c]);
        }
    },

    /**
     * Get Current Active Dataset based on company filter
     */
    getCurrentDataset() {
        if (this.currentCompany === 'ALL') {
            return this.masterGroupData;
        }
        return this.detailData[this.currentCompany] || [];
    },

    /**
     * Filter Dataset by Cluster and Search Keyword
     */
    getFilteredDataset() {
        let dataset = this.getCurrentDataset();

        // 1. Filter by cluster
        if (this.currentCluster !== 'ALL') {
            dataset = dataset.filter(item => item.cluster === this.currentCluster);
        }

        // 2. Filter by search keyword
        if (this.searchKeyword.trim() !== '') {
            const kw = this.searchKeyword.trim().toLowerCase();
            dataset = dataset.filter(item => {
                const matchDept = item.dept.toLowerCase().includes(kw);
                const matchQt = item.qtList.some(doc => doc.toLowerCase().includes(kw));
                const matchQd = item.qdList.some(doc => doc.toLowerCase().includes(kw));
                return matchDept || matchQt || matchQd;
            });
        }

        return dataset;
    },

    /**
     * Master Render
     */
    renderAll() {
        this.renderKPIs();
        this.renderCharts();
        this.renderMasterTable();

        if (window.lucide) {
            window.lucide.createIcons();
        }
    },

    /**
     * Render 5 Executive KPI Cards
     */
    renderKPIs() {
        const dataset = this.getCurrentDataset();
        let totalQt = 0, totalQd = 0;
        let maxDept = null, maxCount = -1;

        dataset.forEach(item => {
            totalQt += item.qt;
            totalQd += item.qd;
            const sum = item.qt + item.qd;
            if (sum > maxCount) {
                maxCount = sum;
                maxDept = item;
            }
        });

        const totalAll = totalQt + totalQd;
        const qtPct = totalAll > 0 ? ((totalQt / totalAll) * 100).toFixed(1) : 0;
        const qdPct = totalAll > 0 ? ((totalQd / totalAll) * 100).toFixed(1) : 0;
        const ratio = totalQd > 0 ? (totalQt / totalQd).toFixed(2) : totalQt;

        // Elements
        const elTotal = document.getElementById('iso-kpi-total');
        const elTotalSub = document.getElementById('iso-kpi-total-sub');
        const elQt = document.getElementById('iso-kpi-qt');
        const elQtSub = document.getElementById('iso-kpi-qt-sub');
        const elQd = document.getElementById('iso-kpi-qd');
        const elQdSub = document.getElementById('iso-kpi-qd-sub');
        const elRatio = document.getElementById('iso-kpi-ratio');
        const elLead = document.getElementById('iso-kpi-lead');
        const elLeadSub = document.getElementById('iso-kpi-lead-sub');

        if (elTotal) elTotal.textContent = totalAll;
        if (elTotalSub) {
            elTotalSub.textContent = this.currentCompany === 'ALL' 
                ? '10 phòng ban cốt lõi' 
                : `${dataset.length} phòng ban ${this.currentCompany}`;
        }
        if (elQt) elQt.textContent = totalQt;
        if (elQtSub) elQtSub.textContent = `${qtPct}% Cơ cấu ISO`;
        if (elQd) elQd.textContent = totalQd;
        if (elQdSub) elQdSub.textContent = `${qdPct}% Cơ cấu ISO`;
        if (elRatio) elRatio.textContent = `${ratio} : 1`;

        if (elLead && maxDept) {
            elLead.textContent = `${maxDept.dept.split(',')[0]} (${maxCount} VB)`;
            elLead.title = `${maxDept.dept} (${maxCount} văn bản)`;
        }
        if (elLeadSub) {
            // Find second lead
            let secondDept = null, secondCount = -1;
            dataset.forEach(item => {
                const s = item.qt + item.qd;
                if (item !== maxDept && s > secondCount) {
                    secondCount = s;
                    secondDept = item;
                }
            });
            if (secondDept) {
                elLeadSub.textContent = `Thứ 2: ${secondDept.dept.split(',')[0]} (${secondCount} VB)`;
            } else {
                elLeadSub.textContent = 'Trọng điểm kiểm soát';
            }
        }
    },

    /**
     * Render Analytics Charts
     */
    renderCharts() {
        this.renderBarChart();
        this.renderPieChart();
    },

    renderBarChart() {
        const canvas = document.getElementById('isoDeptBarChart');
        if (!canvas) return;

        const dataset = [...this.getCurrentDataset()].sort((a, b) => (b.qt + b.qd) - (a.qt + a.qd));
        const labels = dataset.map(d => {
            const short = d.dept.length > 20 ? d.dept.substring(0, 18) + '...' : d.dept;
            return short;
        });
        const qtData = dataset.map(d => d.qt);
        const qdData = dataset.map(d => d.qd);

        if (this.barChart) {
            this.barChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        this.barChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Quy trình (QT)',
                        data: qtData,
                        backgroundColor: '#3b82f6',
                        borderRadius: 4
                    },
                    {
                        label: 'Quy định (QĐ)',
                        data: qdData,
                        backgroundColor: '#10b981',
                        borderRadius: 4
                    }
                ]
            },
            plugins: [ChartDataLabels],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                indexAxis: 'y', // Horizontal bars for clear department comparison
                scales: {
                    x: {
                        stacked: true,
                        grid: { color: '#f1f5f9' },
                        ticks: { font: { size: 11, weight: '600' } }
                    },
                    y: {
                        stacked: true,
                        grid: { display: false },
                        ticks: { font: { size: 10, weight: '600' }, color: '#1e293b' }
                    }
                },
                plugins: {
                    legend: { display: false },
                    datalabels: {
                        color: '#ffffff',
                        font: { weight: 'bold', size: 11 },
                        formatter: (val) => val > 0 ? val : ''
                    },
                    tooltip: {
                        backgroundColor: '#0f172a',
                        titleFont: { size: 12, weight: 'bold' },
                        bodyFont: { size: 12 },
                        padding: 10,
                        callbacks: {
                            afterTitle: (items) => {
                                const idx = items[0].dataIndex;
                                return dataset[idx].dept;
                            },
                            footer: (items) => {
                                const idx = items[0].dataIndex;
                                return `Tổng cộng: ${dataset[idx].qt + dataset[idx].qd} văn bản`;
                            }
                        }
                    }
                },
                onClick: (e, elements) => {
                    if (elements && elements.length > 0) {
                        const idx = elements[0].index;
                        const targetDept = dataset[idx].dept;
                        this.highlightTableRow(targetDept);
                    }
                }
            }
        });
    },

    renderPieChart() {
        const canvas = document.getElementById('isoClusterPieChart');
        if (!canvas) return;

        const dataset = this.getCurrentDataset();
        const clusterSums = {
            'KD': 0, 'KT': 0, 'TC': 0, 'VH': 0, 'NS': 0
        };

        dataset.forEach(item => {
            const cl = item.cluster || 'KD';
            if (clusterSums[cl] !== undefined) {
                clusterSums[cl] += (item.qt + item.qd);
            }
        });

        const labels = [];
        const data = [];
        const bgColors = [];

        Object.keys(clusterSums).forEach(k => {
            if (clusterSums[k] > 0) {
                labels.push(this.clusterMap[k].name.replace('Khối ', ''));
                data.push(clusterSums[k]);
                bgColors.push(this.clusterMap[k].color);
            }
        });

        if (this.pieChart) {
            this.pieChart.destroy();
        }

        const ctx = canvas.getContext('2d');
        this.pieChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: bgColors,
                    borderWidth: 2,
                    borderColor: '#ffffff',
                    hoverOffset: 6
                }]
            },
            plugins: [ChartDataLabels],
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '62%',
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            boxWidth: 12,
                            padding: 8,
                            font: { size: 10, weight: '600' }
                        }
                    },
                    datalabels: {
                        color: '#ffffff',
                        font: { weight: 'bold', size: 11 },
                        formatter: (val, ctx) => {
                            const total = ctx.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                            const pct = ((val / total) * 100).toFixed(0);
                            return pct >= 8 ? `${pct}%` : '';
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: (item) => ` ${item.label}: ${item.raw} văn bản`
                        }
                    }
                }
            }
        });
    },

    /**
     * Render Master Scientific ISO Matrix Table
     */
    renderMasterTable() {
        const tbody = document.getElementById('iso-master-tbody');
        const tfoot = document.getElementById('iso-master-tfoot');
        const rowCountEl = document.getElementById('iso-table-row-count');
        const titleEl = document.getElementById('iso-table-title');
        if (!tbody) return;

        const filtered = this.getFilteredDataset();
        const allInCurrent = this.getCurrentDataset();

        if (rowCountEl) {
            rowCountEl.textContent = `Hiển thị ${filtered.length}/${allInCurrent.length} phòng ban`;
        }

        if (titleEl) {
            const compName = this.currentCompany === 'ALL' ? 'Toàn Tập Đoàn VPS (10 Phòng Ban Cốt Lõi)' : this.currentCompany;
            titleEl.innerHTML = `<i data-lucide="table" style="width: 18px; height: 18px; color: #0f172a;"></i> Bảng Ma Trận Chuẩn Hóa Văn Bản ISO - ${compName}`;
        }

        // Find max total count for progress bar relative scaling
        let maxDeptTotal = 1;
        allInCurrent.forEach(d => {
            const sum = d.qt + d.qd;
            if (sum > maxDeptTotal) maxDeptTotal = sum;
        });

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align: center; padding: 36px; color: #64748b;">
                        <i data-lucide="search-x" style="width: 32px; height: 32px; margin-bottom: 8px; display: inline-block;"></i>
                        <div>Không tìm thấy văn bản hoặc phòng ban phù hợp với từ khóa "${this.escapeHtml(this.searchKeyword)}"</div>
                    </td>
                </tr>
            `;
            if (tfoot) tfoot.innerHTML = '';
            return;
        }

        let html = '';
        let sumQt = 0, sumQd = 0;

        filtered.forEach((item, idx) => {
            const rowTotal = item.qt + item.qd;
            sumQt += item.qt;
            sumQd += item.qd;

            const clusterInfo = this.clusterMap[item.cluster] || this.clusterMap['KD'];
            const progressPct = Math.min(100, Math.round((rowTotal / maxDeptTotal) * 100));

            // Format QT List
            let qtListHtml = '<div style="color: #94a3b8; font-style: italic; font-size: 0.75rem;">(Chưa ban hành quy trình)</div>';
            if (item.qtList && item.qtList.length > 0 && this.currentType !== 'QD') {
                qtListHtml = `
                    <div class="iso-docs-container ${this.isDetailsCollapsed ? 'hidden' : ''}">
                        ${item.qtList.map((doc, docIdx) => {
                            const highlighted = this.highlightText(doc);
                            const isCode = doc.startsWith('ON-QT') || doc.startsWith('QT-');
                            let codeBadge = '';
                            let docName = doc;
                            if (isCode) {
                                const parts = doc.split(' ');
                                codeBadge = `<span class="iso-doc-code">${parts[0]}</span>`;
                                docName = parts.slice(1).join(' ');
                            }
                            return `
                                <div class="iso-doc-row">
                                    <span class="iso-doc-idx">${docIdx + 1}.</span>
                                    ${codeBadge}
                                    <span class="iso-doc-name">${highlighted}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            } else if (this.currentType === 'QD') {
                qtListHtml = '<span style="color: #cbd5e1; font-size: 0.72rem;">[Đã ẩn theo bộ lọc]</span>';
            }

            // Format QD List
            let qdListHtml = '<div style="color: #94a3b8; font-style: italic; font-size: 0.75rem;">(Chưa ban hành quy định)</div>';
            if (item.qdList && item.qdList.length > 0 && this.currentType !== 'QT') {
                qdListHtml = `
                    <div class="iso-docs-container ${this.isDetailsCollapsed ? 'hidden' : ''}">
                        ${item.qdList.map((doc, docIdx) => {
                            const cleanDoc = doc.replace(/^-\s*/, '').replace(/^\d+\.\s*/, '');
                            const highlighted = this.highlightText(cleanDoc);
                            const isCode = doc.includes('ON-QĐ') || doc.includes('QĐ-');
                            let codeBadge = '';
                            let docName = cleanDoc;
                            if (isCode) {
                                const parts = cleanDoc.split(' ');
                                codeBadge = `<span class="iso-doc-code">${parts[0]}</span>`;
                                docName = parts.slice(1).join(' ');
                            }
                            return `
                                <div class="iso-doc-row">
                                    <span class="iso-doc-idx">${docIdx + 1}.</span>
                                    ${codeBadge}
                                    <span class="iso-doc-name">${highlighted}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                `;
            } else if (this.currentType === 'QT') {
                qdListHtml = '<span style="color: #cbd5e1; font-size: 0.72rem;">[Đã ẩn theo bộ lọc]</span>';
            }

            html += `
                <tr id="iso-dept-row-${idx}" data-dept="${this.escapeHtml(item.dept)}">
                    <td style="text-align: center; vertical-align: top;">
                        <span class="iso-stt-badge">${idx + 1}</span>
                    </td>
                    <td>
                        <div class="iso-dept-title">${this.highlightText(item.dept)}</div>
                        <span class="iso-dept-cluster-badge ${clusterInfo.class}">${clusterInfo.name.replace('Khối ', '')}</span>
                    </td>
                    <td style="text-align: center;">
                        <span class="iso-count-badge qt">${item.qt}</span>
                    </td>
                    <td>${qtListHtml}</td>
                    <td style="text-align: center;">
                        <span class="iso-count-badge qd">${item.qd}</span>
                    </td>
                    <td>${qdListHtml}</td>
                    <td style="text-align: center;">
                        <span class="iso-count-badge total">${rowTotal}</span>
                    </td>
                    <td>
                        <div class="iso-progress-cell">
                            <div class="iso-table-bar-bg">
                                <div class="iso-table-bar-fill" style="width: ${progressPct}%;"></div>
                            </div>
                            <div class="iso-progress-text">
                                <span>${progressPct}%</span>
                                <span>${rowTotal >= 15 ? 'Toàn diện' : rowTotal >= 8 ? 'Chuẩn hóa' : 'Cơ bản'}</span>
                            </div>
                        </div>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;

        // Footer Total Row
        if (tfoot) {
            tfoot.innerHTML = `
                <tr>
                    <td colspan="2" style="text-align: right; font-weight: 800; font-size: 0.85rem; letter-spacing: 0.5px;">
                        TỔNG CỘNG (${filtered.length} PHÒNG BAN):
                    </td>
                    <td style="text-align: center;">
                        <span class="iso-count-badge qt" style="font-size: 0.82rem; font-weight: 800;">${sumQt}</span>
                    </td>
                    <td style="font-size: 0.78rem; font-weight: 600; color: #2563eb;">
                        ${sumQt} Quy trình vận hành đã ban hành
                    </td>
                    <td style="text-align: center;">
                        <span class="iso-count-badge qd" style="font-size: 0.82rem; font-weight: 800;">${sumQd}</span>
                    </td>
                    <td style="font-size: 0.78rem; font-weight: 600; color: #059669;">
                        ${sumQd} Quy định & chính sách tuân thủ
                    </td>
                    <td style="text-align: center;">
                        <span class="iso-count-badge total" style="font-size: 0.88rem; background: #0f172a;">${sumQt + sumQd}</span>
                    </td>
                    <td style="font-size: 0.75rem; font-weight: 700; color: #0f172a;">
                        100% Hoàn tất
                    </td>
                </tr>
            `;
        }
    },

    /**
     * Set Company Filter
     */
    setCompanyFilter(company, syncGlobal = true) {
        this.currentCompany = company;

        // Update Pill UI
        document.querySelectorAll('#iso-company-pills .iso-pill-tab').forEach(btn => {
            if (btn.dataset.company === company) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        // Update Bar Chart title
        const barTitleEl = document.getElementById('iso-chart-bar-title');
        if (barTitleEl) {
            barTitleEl.textContent = company === 'ALL'
                ? 'Cơ Cấu Quy Trình & Quy Định (10 Phòng Ban Cốt Lõi)'
                : `Cơ Cấu Quy Trình & Quy Định - ${company}`;
        }

        this.renderAll();
    },

    /**
     * Handle Cluster Filter Change
     */
    handleClusterFilter(cluster) {
        this.currentCluster = cluster;
        this.renderMasterTable();
    },

    /**
     * Handle Document Type Filter Change
     */
    handleTypeFilter(type) {
        this.currentType = type;
        this.renderMasterTable();
    },

    /**
     * Live Search Handler with debounce
     */
    handleSearch(keyword) {
        this.searchKeyword = keyword;
        clearTimeout(this._searchTimer);
        this._searchTimer = setTimeout(() => {
            this.renderMasterTable();
            if (window.lucide) window.lucide.createIcons();
        }, 150);
    },

    /**
     * Toggle expand / collapse of document lists
     */
    toggleDocDetails() {
        this.isDetailsCollapsed = !this.isDetailsCollapsed;
        const btnText = document.getElementById('iso-btn-toggle-text');
        if (btnText) {
            btnText.textContent = this.isDetailsCollapsed ? 'Mở rộng danh sách' : 'Thu gọn danh sách';
        }
        document.querySelectorAll('.iso-docs-container').forEach(el => {
            if (this.isDetailsCollapsed) {
                el.classList.add('hidden');
            } else {
                el.classList.remove('hidden');
            }
        });
    },

    /**
     * Highlight table row when clicked from chart
     */
    highlightTableRow(deptName) {
        const rows = document.querySelectorAll('#iso-master-tbody tr');
        rows.forEach(tr => {
            if (tr.dataset.dept === deptName) {
                tr.scrollIntoView({ behavior: 'smooth', block: 'center' });
                tr.style.backgroundColor = '#fef3c7';
                tr.style.transition = 'background-color 0.4s';
                setTimeout(() => {
                    tr.style.backgroundColor = '';
                }, 2000);
            }
        });
    },

    /**
     * Export Table to CSV
     */
    exportCSV() {
        const dataset = this.getFilteredDataset();
        const compName = this.currentCompany === 'ALL' ? 'Tap_Doan_VPS' : this.currentCompany;
        let csv = '\uFEFF'; // UTF-8 BOM for Excel Vietnamese display
        csv += 'STT,PHONG BAN,KHOI CHUC NANG,SL QUY TRINH,DANH SACH QUY TRINH,SL QUY DINH,DANH SACH QUY DINH,TONG CONG\n';

        dataset.forEach((row, idx) => {
            const clusterName = this.clusterMap[row.cluster] ? this.clusterMap[row.cluster].name : '';
            const qtJoined = row.qtList.map(s => s.replace(/"/g, '""')).join('; ');
            const qdJoined = row.qdList.map(s => s.replace(/"/g, '""')).join('; ');

            csv += `${idx + 1},"${row.dept}","${clusterName}",${row.qt},"${qtJoined}",${row.qd},"${qdJoined}",${row.qt + row.qd}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `Danh_Muc_ISO_${compName}_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    /**
     * Text highlighting utility
     */
    highlightText(text) {
        if (!this.searchKeyword || this.searchKeyword.trim() === '') {
            return this.escapeHtml(text);
        }
        const kw = this.searchKeyword.trim();
        const regex = new RegExp(`(${this.escapeRegex(kw)})`, 'gi');
        return this.escapeHtml(text).replace(regex, '<mark class="iso-search-match">$1</mark>');
    },

    escapeHtml(str) {
        if (!str) return '';
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;');
    },

    escapeRegex(str) {
        return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }
};
