/**
 * Debt Module - Quản trị & Báo cáo Công Nợ VPS
 * Hỗ trợ:
 * 1. Báo cáo Tổng hợp (Mẫu Ảnh 1): Theo 4 phòng ban & 4 hàng công thức tổng hợp
 * 2. Danh sách Chi tiết (Mẫu Ảnh 2): Chi tiết theo từng khách hàng với công thức Nợ cuối kỳ = Trong hạn + Quá hạn + Khó đòi
 * 3. Tự động liên kết: Khách hàng nợ khó đòi tự động hiển thị vào cột Tên KH nợ khó đòi ở Báo cáo Tổng hợp
 * 4. Tự động tính toán công thức (Auto-formulas): % Đạt, Tổng nợ bình thường, Tổng nợ quá hạn, Tổng nợ khó đòi, TỔNG CỘNG
 * 5. Phân quyền RBAC: Đơn vị chỉ xem đơn vị mình, Admin/CEO xem toàn tập đoàn & từng đơn vị
 */

(function () {
    'use strict';

    // Định nghĩa cấu trúc phòng ban chuẩn
    const DEPARTMENTS = [
        {
            id: 'dept_kt',
            name: 'I. Phòng Kỹ thuật/ thuê máy',
            rows: [
                { key: 'no_binh_thuong', label: '1. Nợ bình thường', type: 'normal' },
                { key: 'no_qua_han', label: '2. Nợ quá hạn', type: 'overdue' },
                { key: 'no_kho_doi', label: '3. Nợ khó đòi', type: 'bad' },
                { key: 'chua_den_han', label: '4. Công nợ chưa đến hạn', type: 'pending' }
            ]
        },
        {
            id: 'dept_kd',
            name: 'II. Phòng KD bán máy',
            rows: [
                { key: 'no_binh_thuong', label: '1. Nợ bình thường', type: 'normal' },
                { key: 'no_qua_han', label: '2. Nợ quá hạn', type: 'overdue' },
                { key: 'no_kho_doi', label: '3. Nợ khó đòi', type: 'bad' }
            ]
        },
        {
            id: 'dept_da',
            name: 'III. Dự Án',
            rows: [
                { key: 'no_binh_thuong', label: '1. Nợ bình thường', type: 'normal' },
                { key: 'no_qua_han', label: '2. Nợ quá hạn', type: 'overdue' },
                { key: 'no_kho_doi', label: '3. Nợ khó đòi', type: 'bad' }
            ]
        },
        {
            id: 'dept_ttpp',
            name: 'IV. TTPP/ Bán buôn',
            rows: [
                { key: 'no_binh_thuong', label: '1. Nợ bình thường', type: 'normal' },
                { key: 'no_qua_han', label: '2. Nợ quá hạn', type: 'overdue' },
                { key: 'no_kho_doi', label: '3. Nợ khó đòi', type: 'bad' }
            ]
        }
    ];

    const COMPANY_MAP = {
        'all': 'Toàn Tập đoàn VPS',
        'THH': 'Tân Hồng Hà',
        'Viet': 'Việt',
        'XemSon': 'Xem Sơn',
        'VPSM': 'VPS M',
        'ITSS': 'ITSS',
        'VPVPS': 'Văn phòng VPS'
    };

    // Dữ liệu mặc định chuẩn cho các công ty
    function generateDefaultData() {
        return {
            'THH': {
                departments: {
                    'dept_kt': {
                        'no_binh_thuong': { duNoThangTruoc: 2850000000, duNoThangNay: 2950000000, khThang: 1200000000, khTuan: 300000000, thTuan: 280000000, luyKeThuTien: 1050000000 },
                        'no_qua_han':     { duNoThangTruoc: 620000000,  duNoThangNay: 580000000,  khThang: 300000000,  khTuan: 75000000,  thTuan: 60000000,  luyKeThuTien: 220000000 },
                        'no_kho_doi':     { duNoThangTruoc: 150000000,  duNoThangNay: 150000000,  khThang: 50000000,   khTuan: 12500000,  thTuan: 0,         luyKeThuTien: 10000000 },
                        'chua_den_han':   { duNoThangTruoc: 1200000000, duNoThangNay: 1350000000, khThang: 500000000,  khTuan: 125000000, thTuan: 110000000, luyKeThuTien: 420000000 }
                    },
                    'dept_kd': {
                        'no_binh_thuong': { duNoThangTruoc: 1950000000, duNoThangNay: 2100000000, khThang: 900000000,  khTuan: 225000000, thTuan: 240000000, luyKeThuTien: 880000000 },
                        'no_qua_han':     { duNoThangTruoc: 450000000,  duNoThangNay: 410000000,  khThang: 200000000,  khTuan: 50000000,  thTuan: 45000000,  luyKeThuTien: 160000000 },
                        'no_kho_doi':     { duNoThangTruoc: 100000000,  duNoThangNay: 100000000,  khThang: 30000000,   khTuan: 7500000,   thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_da': {
                        'no_binh_thuong': { duNoThangTruoc: 3100000000, duNoThangNay: 3400000000, khThang: 1500000000, khTuan: 375000000, thTuan: 360000000, luyKeThuTien: 1320000000 },
                        'no_qua_han':     { duNoThangTruoc: 850000000,  duNoThangNay: 790000000,  khThang: 350000000,  khTuan: 87500000,  thTuan: 90000000,  luyKeThuTien: 310000000 },
                        'no_kho_doi':     { duNoThangTruoc: 250000000,  duNoThangNay: 250000000,  khThang: 50000000,   khTuan: 12500000,  thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_ttpp': {
                        'no_binh_thuong': { duNoThangTruoc: 1600000000, duNoThangNay: 1750000000, khThang: 800000000,  khTuan: 200000000, thTuan: 195000000, luyKeThuTien: 710000000 },
                        'no_qua_han':     { duNoThangTruoc: 320000000,  duNoThangNay: 300000000,  khThang: 150000000,  khTuan: 37500000,  thTuan: 30000000,  luyKeThuTien: 120000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,          khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 }
                    }
                },
                customers: [
                    { id: 1, company: 'THH', deptId: 'dept_kt', maKhach: 'KH-THH01', tenKhach: 'Công ty Cổ phần Tập đoàn Hòa Bình', trongHan: 850000000, quaHan: 0, khoDoi: 0, note: 'Khách thuê máy dài hạn' },
                    { id: 2, company: 'THH', deptId: 'dept_kt', maKhach: 'KH-THH02', tenKhach: 'Bệnh viện Đa Khoa Hồng Ngọc', trongHan: 1200000000, quaHan: 180000000, khoDoi: 0, note: 'Đang làm thủ tục thanh toán quý 3' },
                    { id: 3, company: 'THH', deptId: 'dept_kt', maKhach: 'KH-THH03', tenKhach: 'Trường Quốc tế Wellspring', trongHan: 900000000, quaHan: 250000000, khoDoi: 0, note: 'Chờ quyết toán niên khoá' },
                    { id: 4, company: 'THH', deptId: 'dept_kt', maKhach: 'KH-THH04', tenKhach: 'Công ty TNHH Quảng cáo Sao Mai', trongHan: 0, quaHan: 150000000, khoDoi: 150000000, note: 'Tạm dừng dịch vụ, gửi công văn đòi nợ' },
                    { id: 5, company: 'THH', deptId: 'dept_kd', maKhach: 'KH-THH05', tenKhach: 'Văn phòng Công chứng Tràng An', trongHan: 1400000000, quaHan: 210000000, khoDoi: 0, note: 'Hợp đồng mua máy photo A3' },
                    { id: 6, company: 'THH', deptId: 'dept_kd', maKhach: 'KH-THH06', tenKhach: 'Công ty In ấn Bao bì Á Châu', trongHan: 700000000, quaHan: 200000000, khoDoi: 100000000, note: 'Đã khoá máy, chuyển pháp lý xử lý' },
                    { id: 7, company: 'THH', deptId: 'dept_da', maKhach: 'KH-THH07', tenKhach: 'Sở Giáo Dục & Đào Tạo Tỉnh Hải Dương', trongHan: 2200000000, quaHan: 450000000, khoDoi: 0, note: 'Dự án mua sắm tập trung' },
                    { id: 8, company: 'THH', deptId: 'dept_da', maKhach: 'KH-THH08', tenKhach: 'UBND Huyện Thuận Thành', trongHan: 1200000000, quaHan: 340000000, khoDoi: 0, note: 'Chờ kho bạc giải ngân đợt cuối' },
                    { id: 9, company: 'THH', deptId: 'dept_da', maKhach: 'KH-THH09', tenKhach: 'Ban Quản lý DA Xây dựng Alpha', trongHan: 0, quaHan: 0, khoDoi: 250000000, note: 'Nhà thầu giải thể, khởi kiện' },
                    { id: 10, company: 'THH', deptId: 'dept_ttpp', maKhach: 'KH-THH10', tenKhach: 'Đại lý Thiết bị VP Hải Phòng', trongHan: 1100000000, quaHan: 180000000, khoDoi: 0, note: 'Đại lý cấp 1 thanh toán đều' },
                    { id: 11, company: 'THH', deptId: 'dept_ttpp', maKhach: 'KH-THH11', tenKhach: 'Công ty CP Công nghệ Bắc Ninh', trongHan: 650000000, quaHan: 120000000, khoDoi: 0, note: 'Bán buôn vật tư linh kiện' }
                ]
            },
            'Viet': {
                departments: {
                    'dept_kt': {
                        'no_binh_thuong': { duNoThangTruoc: 1800000000, duNoThangNay: 1920000000, khThang: 800000000, khTuan: 200000000, thTuan: 190000000, luyKeThuTien: 720000000 },
                        'no_qua_han':     { duNoThangTruoc: 350000000,  duNoThangNay: 310000000,  khThang: 150000000, khTuan: 37500000,  thTuan: 40000000,  luyKeThuTien: 130000000 },
                        'no_kho_doi':     { duNoThangTruoc: 70000000,   duNoThangNay: 70000000,   khThang: 20000000,  khTuan: 5000000,   thTuan: 0,         luyKeThuTien: 0 },
                        'chua_den_han':   { duNoThangTruoc: 750000000,  duNoThangNay: 820000000,  khThang: 300000000, khTuan: 75000000,  thTuan: 70000000,  luyKeThuTien: 260000000 }
                    },
                    'dept_kd': {
                        'no_binh_thuong': { duNoThangTruoc: 1200000000, duNoThangNay: 1350000000, khThang: 600000000, khTuan: 150000000, thTuan: 145000000, luyKeThuTien: 530000000 },
                        'no_qua_han':     { duNoThangTruoc: 280000000,  duNoThangNay: 260000000,  khThang: 120000000, khTuan: 30000000,  thTuan: 28000000,  luyKeThuTien: 95000000 },
                        'no_kho_doi':     { duNoThangTruoc: 50000000,   duNoThangNay: 50000000,   khThang: 10000000,  khTuan: 2500000,   thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_da': {
                        'no_binh_thuong': { duNoThangTruoc: 1500000000, duNoThangNay: 1620000000, khThang: 700000000, khTuan: 175000000, thTuan: 180000000, luyKeThuTien: 640000000 },
                        'no_qua_han':     { duNoThangTruoc: 410000000,  duNoThangNay: 390000000,  khThang: 180000000, khTuan: 45000000,  thTuan: 42000000,  luyKeThuTien: 145000000 },
                        'no_kho_doi':     { duNoThangTruoc: 80000000,   duNoThangNay: 80000000,   khThang: 20000000,  khTuan: 5000000,   thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_ttpp': {
                        'no_binh_thuong': { duNoThangTruoc: 950000000,  duNoThangNay: 1050000000, khThang: 450000000, khTuan: 112500000, thTuan: 110000000, luyKeThuTien: 400000000 },
                        'no_qua_han':     { duNoThangTruoc: 180000000,  duNoThangNay: 160000000,  khThang: 80000000,  khTuan: 20000000,  thTuan: 18000000,  luyKeThuTien: 65000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,         khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 }
                    }
                },
                customers: [
                    { id: 12, company: 'Viet', deptId: 'dept_kt', maKhach: 'KH-V01', tenKhach: 'Tập đoàn Điện Lực EVN NPC', trongHan: 1400000000, quaHan: 180000000, khoDoi: 0, note: 'Thuê máy in ấn đa năng' },
                    { id: 13, company: 'Viet', deptId: 'dept_kt', maKhach: 'KH-V02', tenKhach: 'Công ty CP Viễn thông Đông Dương', trongHan: 520000000, quaHan: 130000000, khoDoi: 70000000, note: 'Nợ cũ khó thu hồi, đang đàm phán' },
                    { id: 14, company: 'Viet', deptId: 'dept_kd', maKhach: 'KH-V03', tenKhach: 'Đại học Quốc Gia Hà Nội', trongHan: 1100000000, quaHan: 160000000, khoDoi: 0, note: 'Mua máy photocopy Fuji' },
                    { id: 15, company: 'Viet', deptId: 'dept_kd', maKhach: 'KH-V04', tenKhach: 'Công ty CP Đầu tư Delta', trongHan: 250000000, quaHan: 100000000, khoDoi: 50000000, note: 'Khoá dịch vụ bảo trì' },
                    { id: 16, company: 'Viet', deptId: 'dept_da', maKhach: 'KH-V05', tenKhach: 'Cục Thuế TP Hà Nội', trongHan: 1350000000, quaHan: 240000000, khoDoi: 0, note: 'Dự án triển khai máy văn phòng' },
                    { id: 17, company: 'Viet', deptId: 'dept_da', maKhach: 'KH-V06', tenKhach: 'Công ty XD Thăng Long Mới', trongHan: 270000000, quaHan: 150000000, khoDoi: 80000000, note: 'Đã gửi đơn đòi nợ' },
                    { id: 18, company: 'Viet', deptId: 'dept_ttpp', maKhach: 'KH-V07', tenKhach: 'Đại lý Thiết bị Nam Định', trongHan: 750000000, quaHan: 90000000, khoDoi: 0, note: 'Phân phối mực in và máy in' },
                    { id: 19, company: 'Viet', deptId: 'dept_ttpp', maKhach: 'KH-V08', tenKhach: 'Đại lý Thái Bình Express', trongHan: 300000000, quaHan: 70000000, khoDoi: 0, note: 'Chờ thanh toán định kỳ' }
                ]
            },
            'XemSon': {
                departments: {
                    'dept_kt': {
                        'no_binh_thuong': { duNoThangTruoc: 2200000000, duNoThangNay: 2350000000, khThang: 1000000000, khTuan: 250000000, thTuan: 240000000, luyKeThuTien: 890000000 },
                        'no_qua_han':     { duNoThangTruoc: 550000000,  duNoThangNay: 510000000,  khThang: 250000000,  khTuan: 62500000,  thTuan: 55000000,  luyKeThuTien: 210000000 },
                        'no_kho_doi':     { duNoThangTruoc: 120000000,  duNoThangNay: 120000000,  khThang: 30000000,   khTuan: 7500000,   thTuan: 0,         luyKeThuTien: 0 },
                        'chua_den_han':   { duNoThangTruoc: 900000000,  duNoThangNay: 980000000,  khThang: 400000000,  khTuan: 100000000, thTuan: 95000000,  luyKeThuTien: 340000000 }
                    },
                    'dept_kd': {
                        'no_binh_thuong': { duNoThangTruoc: 2500000000, duNoThangNay: 2700000000, khThang: 1200000000, khTuan: 300000000, thTuan: 310000000, luyKeThuTien: 1100000000 },
                        'no_qua_han':     { duNoThangTruoc: 680000000,  duNoThangNay: 630000000,  khThang: 300000000,  khTuan: 75000000,  thTuan: 70000000,  luyKeThuTien: 250000000 },
                        'no_kho_doi':     { duNoThangTruoc: 180000000,  duNoThangNay: 180000000,  khThang: 40000000,   khTuan: 10000000,  thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_da': {
                        'no_binh_thuong': { duNoThangTruoc: 3500000000, duNoThangNay: 3800000000, khThang: 1700000000, khTuan: 425000000, thTuan: 400000000, luyKeThuTien: 1480000000 },
                        'no_qua_han':     { duNoThangTruoc: 950000000,  duNoThangNay: 890000000,  khThang: 400000000,  khTuan: 100000000, thTuan: 95000000,  luyKeThuTien: 340000000 },
                        'no_kho_doi':     { duNoThangTruoc: 300000000,  duNoThangNay: 300000000,  khThang: 60000000,   khTuan: 15000000,  thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_ttpp': {
                        'no_binh_thuong': { duNoThangTruoc: 1800000000, duNoThangNay: 1950000000, khThang: 850000000,  khTuan: 212500000, thTuan: 205000000, luyKeThuTien: 740000000 },
                        'no_qua_han':     { duNoThangTruoc: 360000000,  duNoThangNay: 330000000,  khThang: 160000000,  khTuan: 40000000,  thTuan: 38000000,  luyKeThuTien: 135000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,          khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 }
                    }
                },
                customers: [
                    { id: 20, company: 'XemSon', deptId: 'dept_kt', maKhach: 'KH-XS01', tenKhach: 'Công ty Cổ phần Thép Việt Ý', trongHan: 1650000000, quaHan: 280000000, khoDoi: 0, note: 'Khách hàng truyền thống thuê máy' },
                    { id: 21, company: 'XemSon', deptId: 'dept_kt', maKhach: 'KH-XS02', tenKhach: 'Công ty Cổ phần May Phú Thịnh', trongHan: 700000000, quaHan: 230000000, khoDoi: 120000000, note: 'Nợ quá hạn khó thu hồi' },
                    { id: 22, company: 'XemSon', deptId: 'dept_kd', maKhach: 'KH-XS03', tenKhach: 'Ngân hàng Nông nghiệp Agribank Đông Hà Nội', trongHan: 2000000000, quaHan: 310000000, khoDoi: 0, note: 'Bán hệ thống máy HP bảo hành 3 năm' },
                    { id: 23, company: 'XemSon', deptId: 'dept_kd', maKhach: 'KH-XS04', tenKhach: 'Công ty CP Địa ốc Sông Hồng', trongHan: 700000000, quaHan: 320000000, khoDoi: 180000000, note: 'Tranh chấp hợp đồng, đang pháp lý' },
                    { id: 24, company: 'XemSon', deptId: 'dept_da', maKhach: 'KH-XS05', tenKhach: 'Kho bạc Nhà nước Tỉnh Vĩnh Phúc', trongHan: 2600000000, quaHan: 490000000, khoDoi: 0, note: 'Đã hoàn tất nghiệm thu quý 2' },
                    { id: 25, company: 'XemSon', deptId: 'dept_da', maKhach: 'KH-XS06', tenKhach: 'Tổng Công ty Xây dựng Công trình 4', trongHan: 1200000000, quaHan: 400000000, khoDoi: 300000000, note: 'Đang theo dõi xử lý thi hành án' },
                    { id: 26, company: 'XemSon', deptId: 'dept_ttpp', maKhach: 'KH-XS07', tenKhach: 'Trung tâm Máy văn phòng Vĩnh Yên', trongHan: 1350000000, quaHan: 210000000, khoDoi: 0, note: 'Đại lý thanh toán theo đợt' },
                    { id: 27, company: 'XemSon', deptId: 'dept_ttpp', maKhach: 'KH-XS08', tenKhach: 'Công ty TNHH Thiết bị Sao Việt', trongHan: 600000000, quaHan: 120000000, khoDoi: 0, note: 'Phân phối máy in đơn sắc' }
                ]
            },
            'VPSM': {
                departments: {
                    'dept_kt': {
                        'no_binh_thuong': { duNoThangTruoc: 1900000000, duNoThangNay: 2050000000, khThang: 900000000, khTuan: 225000000, thTuan: 215000000, luyKeThuTien: 790000000 },
                        'no_qua_han':     { duNoThangTruoc: 420000000,  duNoThangNay: 380000000,  khThang: 180000000, khTuan: 45000000,  thTuan: 40000000,  luyKeThuTien: 145000000 },
                        'no_kho_doi':     { duNoThangTruoc: 85000000,   duNoThangNay: 85000000,   khThang: 20000000,  khTuan: 5000000,   thTuan: 0,         luyKeThuTien: 0 },
                        'chua_den_han':   { duNoThangTruoc: 800000000,  duNoThangNay: 880000000,  khThang: 350000000, khTuan: 87500000,  thTuan: 80000000,  luyKeThuTien: 295000000 }
                    },
                    'dept_kd': {
                        'no_binh_thuong': { duNoThangTruoc: 1450000000, duNoThangNay: 1580000000, khThang: 700000000, khTuan: 175000000, thTuan: 180000000, luyKeThuTien: 620000000 },
                        'no_qua_han':     { duNoThangTruoc: 310000000,  duNoThangNay: 280000000,  khThang: 140000000, khTuan: 35000000,  thTuan: 32000000,  luyKeThuTien: 110000000 },
                        'no_kho_doi':     { duNoThangTruoc: 60000000,   duNoThangNay: 60000000,   khThang: 15000000,  khTuan: 3750000,   thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_da': {
                        'no_binh_thuong': { duNoThangTruoc: 2100000000, duNoThangNay: 2300000000, khThang: 1100000000, khTuan: 275000000, thTuan: 260000000, luyKeThuTien: 980000000 },
                        'no_qua_han':     { duNoThangTruoc: 520000000,  duNoThangNay: 480000000,  khThang: 220000000, khTuan: 55000000,  thTuan: 50000000,  luyKeThuTien: 185000000 },
                        'no_kho_doi':     { duNoThangTruoc: 110000000,  duNoThangNay: 110000000,  khThang: 25000000,  khTuan: 6250000,   thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_ttpp': {
                        'no_binh_thuong': { duNoThangTruoc: 1100000000, duNoThangNay: 1220000000, khThang: 550000000, khTuan: 137500000, thTuan: 130000000, luyKeThuTien: 480000000 },
                        'no_qua_han':     { duNoThangTruoc: 210000000,  duNoThangNay: 190000000,  khThang: 90000000,  khTuan: 22500000,  thTuan: 20000000,  luyKeThuTien: 72000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,         khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 }
                    }
                },
                customers: [
                    { id: 28, company: 'VPSM', deptId: 'dept_kt', maKhach: 'KH-MN01', tenKhach: 'Tập đoàn Dệt May Vinatex Miền Nam', trongHan: 1450000000, quaHan: 220000000, khoDoi: 0, note: 'Thuê cụm máy văn phòng TP.HCM' },
                    { id: 29, company: 'VPSM', deptId: 'dept_kt', maKhach: 'KH-MN02', tenKhach: 'Công ty CP Vận tải Biển Đông', trongHan: 600000000, quaHan: 160000000, khoDoi: 85000000, note: 'Đang theo dõi công nợ' },
                    { id: 30, company: 'VPSM', deptId: 'dept_kd', maKhach: 'KH-MN03', tenKhach: 'Trường Đại học Sư Phạm Kỹ Thuật TP.HCM', trongHan: 1250000000, quaHan: 170000000, khoDoi: 0, note: 'Gói thiết bị máy in phòng lab' },
                    { id: 31, company: 'VPSM', deptId: 'dept_kd', maKhach: 'KH-MN04', tenKhach: 'Công ty Quảng cáo Sài Gòn Mới', trongHan: 330000000, quaHan: 110000000, khoDoi: 60000000, note: 'Khoá quyền sử dụng máy' },
                    { id: 32, company: 'VPSM', deptId: 'dept_da', maKhach: 'KH-MN05', tenKhach: 'Bệnh viện Chợ Rẫy TP.HCM', trongHan: 1800000000, quaHan: 310000000, khoDoi: 0, note: 'Gói thầu số 02 - Trang bị văn phòng' },
                    { id: 33, company: 'VPSM', deptId: 'dept_da', maKhach: 'KH-MN06', tenKhach: 'Công ty XNK Miền Đông', trongHan: 500000000, quaHan: 170000000, khoDoi: 110000000, note: 'Chờ giải quyết tranh chấp' },
                    { id: 34, company: 'VPSM', deptId: 'dept_ttpp', maKhach: 'KH-MN07', tenKhach: 'Đại lý Thiết bị VP Bình Dương', trongHan: 820000000, quaHan: 120000000, khoDoi: 0, note: 'Đại lý phân phối độc quyền' },
                    { id: 35, company: 'VPSM', deptId: 'dept_ttpp', maKhach: 'KH-MN08', tenKhach: 'Công ty Công nghệ Đồng Nai', trongHan: 400000000, quaHan: 70000000, khoDoi: 0, note: 'Thanh toán gối đầu' }
                ]
            },
            'ITSS': {
                departments: {
                    'dept_kt': {
                        'no_binh_thuong': { duNoThangTruoc: 850000000,  duNoThangNay: 920000000,  khThang: 400000000, khTuan: 100000000, thTuan: 95000000,  luyKeThuTien: 360000000 },
                        'no_qua_han':     { duNoThangTruoc: 160000000,  duNoThangNay: 145000000,  khThang: 70000000,  khTuan: 17500000,  thTuan: 18000000,  luyKeThuTien: 60000000 },
                        'no_kho_doi':     { duNoThangTruoc: 35000000,   duNoThangNay: 35000000,   khThang: 10000000,  khTuan: 2500000,   thTuan: 0,         luyKeThuTien: 0 },
                        'chua_den_han':   { duNoThangTruoc: 380000000,  duNoThangNay: 420000000,  khThang: 180000000, khTuan: 45000000,  thTuan: 42000000,  luyKeThuTien: 155000000 }
                    },
                    'dept_kd': {
                        'no_binh_thuong': { duNoThangTruoc: 750000000,  duNoThangNay: 820000000,  khThang: 380000000, khTuan: 95000000,  thTuan: 90000000,  luyKeThuTien: 330000000 },
                        'no_qua_han':     { duNoThangTruoc: 140000000,  duNoThangNay: 125000000,  khThang: 60000000,  khTuan: 15000000,  thTuan: 14000000,  luyKeThuTien: 52000000 },
                        'no_kho_doi':     { duNoThangTruoc: 25000000,   duNoThangNay: 25000000,   khThang: 5000000,   khTuan: 1250000,   thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_da': {
                        'no_binh_thuong': { duNoThangTruoc: 950000000,  duNoThangNay: 1050000000, khThang: 500000000, khTuan: 125000000, thTuan: 120000000, luyKeThuTien: 440000000 },
                        'no_qua_han':     { duNoThangTruoc: 220000000,  duNoThangNay: 195000000,  khThang: 95000000,  khTuan: 23750000,  thTuan: 22000000,  luyKeThuTien: 82000000 },
                        'no_kho_doi':     { duNoThangTruoc: 45000000,   duNoThangNay: 45000000,   khThang: 10000000,  khTuan: 2500000,   thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_ttpp': {
                        'no_binh_thuong': { duNoThangTruoc: 520000000,  duNoThangNay: 580000000,  khThang: 260000000, khTuan: 65000000,  thTuan: 60000000,  luyKeThuTien: 225000000 },
                        'no_qua_han':     { duNoThangTruoc: 95000000,   duNoThangNay: 85000000,   khThang: 40000000,  khTuan: 10000000,  thTuan: 9000000,   luyKeThuTien: 34000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,         khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 }
                    }
                },
                customers: [
                    { id: 36, company: 'ITSS', deptId: 'dept_kt', maKhach: 'KH-IT01', tenKhach: 'Công ty Phần mềm FPT Software', trongHan: 680000000, quaHan: 85000000, khoDoi: 0, note: 'Thuê thiết bị phòng server & máy in' },
                    { id: 37, company: 'ITSS', deptId: 'dept_kt', maKhach: 'KH-IT02', tenKhach: 'Công ty Khởi nghiệp SmartTech', trongHan: 240000000, quaHan: 60000000, khoDoi: 35000000, note: 'Khách chậm thanh toán 90 ngày' },
                    { id: 38, company: 'ITSS', deptId: 'dept_kd', maKhach: 'KH-IT03', tenKhach: 'Viện Công nghệ Thông tin - Viện Hàn Lâm', trongHan: 650000000, quaHan: 80000000, khoDoi: 0, note: 'Cung cấp thiết bị số hoá tài liệu' },
                    { id: 39, company: 'ITSS', deptId: 'dept_kd', maKhach: 'KH-IT04', tenKhach: 'Công ty Cổ phần Alpha Media', trongHan: 170000000, quaHan: 45000000, khoDoi: 25000000, note: 'Khoá truy cập hệ thống' },
                    { id: 40, company: 'ITSS', deptId: 'dept_da', maKhach: 'KH-IT05', tenKhach: 'Đài Truyền hình Kỹ thuật số VTC', trongHan: 820000000, quaHan: 125000000, khoDoi: 0, note: 'Dự án hạ tầng in ấn mạng' },
                    { id: 41, company: 'ITSS', deptId: 'dept_da', maKhach: 'KH-IT06', tenKhach: 'Công ty CP Giải pháp Toàn Cầu', trongHan: 230000000, quaHan: 70000000, khoDoi: 45000000, note: 'Thu hồi công nợ quá hạn' },
                    { id: 42, company: 'ITSS', deptId: 'dept_ttpp', maKhach: 'KH-IT07', tenKhach: 'Đại lý Công nghệ Thái Nguyên', trongHan: 380000000, quaHan: 55000000, khoDoi: 0, note: 'Cung ứng linh kiện máy tính' },
                    { id: 43, company: 'ITSS', deptId: 'dept_ttpp', maKhach: 'KH-IT08', tenKhach: 'Đại lý IT Bắc Giang', trongHan: 200000000, quaHan: 30000000, khoDoi: 0, note: 'Thanh toán định kỳ tuần' }
                ]
            },
            'VPVPS': {
                departments: {
                    'dept_kt': {
                        'no_binh_thuong': { duNoThangTruoc: 450000000,  duNoThangNay: 480000000,  khThang: 200000000, khTuan: 50000000,  thTuan: 48000000,  luyKeThuTien: 185000000 },
                        'no_qua_han':     { duNoThangTruoc: 80000000,   duNoThangNay: 72000000,   khThang: 35000000,  khTuan: 8750000,   thTuan: 8000000,   luyKeThuTien: 30000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,         khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 },
                        'chua_den_han':   { duNoThangTruoc: 180000000,  duNoThangNay: 200000000,  khThang: 90000000,  khTuan: 22500000,  thTuan: 20000000,  luyKeThuTien: 75000000 }
                    },
                    'dept_kd': {
                        'no_binh_thuong': { duNoThangTruoc: 320000000,  duNoThangNay: 350000000,  khThang: 150000000, khTuan: 37500000,  thTuan: 35000000,  luyKeThuTien: 135000000 },
                        'no_qua_han':     { duNoThangTruoc: 60000000,   duNoThangNay: 55000000,   khThang: 25000000,  khTuan: 6250000,   thTuan: 6000000,   luyKeThuTien: 22000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,         khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_da': {
                        'no_binh_thuong': { duNoThangTruoc: 500000000,  duNoThangNay: 550000000,  khThang: 250000000, khTuan: 62500000,  thTuan: 60000000,  luyKeThuTien: 220000000 },
                        'no_qua_han':     { duNoThangTruoc: 90000000,   duNoThangNay: 80000000,   khThang: 40000000,  khTuan: 10000000,  thTuan: 9000000,   luyKeThuTien: 35000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,         khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 }
                    },
                    'dept_ttpp': {
                        'no_binh_thuong': { duNoThangTruoc: 250000000,  duNoThangNay: 280000000,  khThang: 120000000, khTuan: 30000000,  thTuan: 28000000,  luyKeThuTien: 105000000 },
                        'no_qua_han':     { duNoThangTruoc: 45000000,   duNoThangNay: 40000000,   khThang: 20000000,  khTuan: 5000000,   thTuan: 4500000,   luyKeThuTien: 17000000 },
                        'no_kho_doi':     { duNoThangTruoc: 0,          duNoThangNay: 0,          khThang: 0,         khTuan: 0,         thTuan: 0,         luyKeThuTien: 0 }
                    }
                },
                customers: [
                    { id: 44, company: 'VPVPS', deptId: 'dept_kt', maKhach: 'KH-VP01', tenKhach: 'Tập đoàn Dầu Khí PVN', trongHan: 480000000, quaHan: 72000000, khoDoi: 0, note: 'Khách thuê máy văn phòng trụ sở' },
                    { id: 45, company: 'VPVPS', deptId: 'dept_kd', maKhach: 'KH-VP02', tenKhach: 'Tổng Công ty Thăng Long', trongHan: 350000000, quaHan: 55000000, khoDoi: 0, note: 'Hợp đồng máy in màu' },
                    { id: 46, company: 'VPVPS', deptId: 'dept_da', maKhach: 'KH-VP03', tenKhach: 'Ban Cơ yếu Chính phủ', trongHan: 550000000, quaHan: 80000000, khoDoi: 0, note: 'Dự án trang bị thiết bị văn phòng' },
                    { id: 47, company: 'VPVPS', deptId: 'dept_ttpp', maKhach: 'KH-VP04', tenKhach: 'Đại lý Nội bộ VPS', trongHan: 280000000, quaHan: 40000000, khoDoi: 0, note: 'Cung cấp văn phòng phẩm tập đoàn' }
                ]
            }
        };
    }

    // Helper format tiền tệ VNĐ
    function formatVND(val) {
        if (val === undefined || val === null || isNaN(val)) return '0';
        return Number(val).toLocaleString('vi-VN');
    }

    function formatPercent(val) {
        if (val === undefined || val === null || isNaN(val) || !isFinite(val)) return '0%';
        return Number(val).toFixed(1) + '%';
    }

    window.DebtModule = {
        // Main Tab Switch
        currentMainTab: 'current',
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

        initMainTabs() {
            const btnCurrent = document.getElementById('tab-debt-current');
            const btnReport = document.getElementById('tab-debt-report');
            if (btnCurrent) btnCurrent.addEventListener('click', () => this.switchMainTab('current'));
            if (btnReport) btnReport.addEventListener('click', () => this.switchMainTab('report'));
        },

        switchMainTab(tab) {
            this.currentMainTab = tab;
            const btnCurrent = document.getElementById('tab-debt-current');
            const btnReport = document.getElementById('tab-debt-report');
            const contentCurrent = document.getElementById('debt-main-content-current');
            const contentReport = document.getElementById('debt-main-content-report');

            if (tab === 'current') {
                if (btnCurrent) btnCurrent.classList.add('active');
                if (btnReport) btnReport.classList.remove('active');
                if (contentCurrent) contentCurrent.style.display = 'block';
                if (contentReport) contentReport.style.display = 'none';
                if (this.currentData) {
                    this.updateUI(this.currentData, this.currentFilter);
                }
            } else {
                if (btnReport) btnReport.classList.add('active');
                if (btnCurrent) btnCurrent.classList.remove('active');
                if (contentCurrent) contentCurrent.style.display = 'none';
                if (contentReport) contentReport.style.display = 'block';
                this.render();
            }
            if (window.lucide) window.lucide.createIcons();
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
        },

        store: null,
        activeTab: 'summary',
        currentCompany: 'all',
        currentMonth: 9,
        searchQuery: '',

        init() {
            this.initMainTabs();

            // Lắng nghe sự kiện filter toàn cục từ topbar
            document.addEventListener('vps_filter_changed', (e) => {
                const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
                const comp = canViewAll ? e.detail.company : (window.AuthService ? window.AuthService.getAllowedCompany() : e.detail.company);
                this.loadData(e.detail.period, comp);
                this.setCompany(comp, false);
            });

            // Khởi tạo bộ lọc dropdown tại bảng khách hàng khó đòi
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

            // Nút reset xem tất cả ở bảng khó đòi
            const resetBtn = document.getElementById('bad-debt-reset-filter');
            if (resetBtn) {
                resetBtn.addEventListener('click', () => {
                    this.selectCompany('all', false);
                });
            }

            // Khởi tạo Báo Cáo Tự Động
            this.loadStore();
            this.bindEvents();
            this.recalculateAll();
            this.render();
        },

        loadStore() {
            try {
                const raw = localStorage.getItem('vps_debt_data_v2');
                if (raw) {
                    this.store = JSON.parse(raw);
                }
            } catch (e) {
                console.warn('Cannot parse stored debt data:', e);
            }
            if (!this.store || !this.store.THH) {
                this.store = generateDefaultData();
                this.saveStore();
            }
        },

        saveStore() {
            try {
                localStorage.setItem('vps_debt_data_v2', JSON.stringify(this.store));
            } catch (e) {
                console.warn('Failed saving debt store:', e);
            }
        },

        bindEvents() {
            // vps_filter_changed is handled centrally in DebtModule.init()

            // Tab navigation
            const tabButtons = document.querySelectorAll('.debt-tab-btn');
            tabButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    const targetTab = btn.dataset.tab;
                    this.switchTab(targetTab);
                });
            });

            // Dropdown filter đơn vị nội bộ
            const unitFilter = document.getElementById('debt-unit-filter');
            if (unitFilter) {
                const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
                if (!canViewAll) {
                    const allowed = window.AuthService ? window.AuthService.getAllowedCompany() : 'THH';
                    let mappedKey = 'THH';
                    if (allowed.includes('Việt') || allowed === 'Viet') mappedKey = 'Viet';
                    else if (allowed.includes('Xem') || allowed === 'XemSon') mappedKey = 'XemSon';
                    else if (allowed.includes('VPS M') || allowed === 'VPSM') mappedKey = 'VPSM';
                    else if (allowed.includes('ITSS') || allowed === 'ITSS') mappedKey = 'ITSS';
                    else if (allowed.includes('Văn phòng') || allowed === 'VPVPS') mappedKey = 'VPVPS';
                    unitFilter.value = mappedKey;
                    unitFilter.disabled = true;
                    this.currentCompany = mappedKey;
                } else {
                    unitFilter.addEventListener('change', (e) => {
                        this.setCompany(e.target.value, true);
                    });
                }
            }

            // Dropdown filter kỳ tháng
            const periodFilter = document.getElementById('debt-period-filter');
            if (periodFilter) {
                periodFilter.addEventListener('change', (e) => {
                    this.currentMonth = parseInt(e.target.value, 10) || 9;
                    this.render();
                });
            }

            // Ô tìm kiếm khách hàng
            const searchInput = document.getElementById('debt-search-customer');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.searchQuery = e.target.value.toLowerCase().trim();
                    this.renderDetailTable();
                });
            }

            // Nút xuất CSV
            const btnExport = document.getElementById('btn-debt-export');
            if (btnExport) {
                btnExport.addEventListener('click', () => {
                    this.exportActiveView();
                });
            }

            // Nút thêm khách hàng
            const btnAdd = document.getElementById('btn-debt-add-cust');
            if (btnAdd) {
                btnAdd.addEventListener('click', () => {
                    this.openAddModal();
                });
            }
        },

        switchTab(tabId) {
            this.activeTab = tabId;
            document.querySelectorAll('.debt-tab-btn').forEach(btn => {
                if (btn.dataset.tab === tabId) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });

            // Hiện/ẩn container tương ứng
            const sumEl = document.getElementById('debt-view-summary');
            const detEl = document.getElementById('debt-view-detail');
            const chEl = document.getElementById('debt-view-chart');
            const searchBox = document.getElementById('debt-search-box');

            if (sumEl) sumEl.style.display = (tabId === 'summary') ? 'block' : 'none';
            if (detEl) detEl.style.display = (tabId === 'detail') ? 'block' : 'none';
            if (chEl) chEl.style.display = (tabId === 'chart') ? 'block' : 'none';
            if (searchBox) searchBox.style.display = (tabId === 'detail') ? 'flex' : 'none';

            if (tabId === 'chart') {
                setTimeout(() => this.renderCharts(), 50);
            }
        },

        setCompany(company, updateFilterEl = false) {
            let compKey = 'all';
            if (company === 'all' || company === 'Tất cả') compKey = 'all';
            else if (company === 'Tân Hồng Hà' || company === 'THH') compKey = 'THH';
            else if (company === 'Việt' || company === 'Viet') compKey = 'Viet';
            else if (company === 'Xem Sơn' || company === 'XemSon' || company === 'XESCO') compKey = 'XemSon';
            else if (company === 'VPS M' || company === 'VPSM') compKey = 'VPSM';
            else if (company === 'ITSS') compKey = 'ITSS';
            else if (company === 'Văn phòng VPS' || company === 'VPVPS') compKey = 'VPVPS';

            this.currentCompany = compKey;
            if (updateFilterEl) {
                const el = document.getElementById('debt-unit-filter');
                if (el && !el.disabled) el.value = compKey;
            }

            this.recalculateAll();
            this.render();
        },

        // Tính toán lại tất cả công thức toán học và cập nhật liên kết dữ liệu
        recalculateAll() {
            if (!this.store) return;

            const companyKeys = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];

            companyKeys.forEach(cKey => {
                const comp = this.store[cKey];
                if (!comp) return;

                // 1. Tính toán cho bảng chi tiết khách hàng:
                // Công thức: Nợ cuối kỳ = Trong hạn + Quá hạn + Khó đòi
                if (comp.customers && Array.isArray(comp.customers)) {
                    comp.customers.forEach(c => {
                        c.trongHan = Number(c.trongHan) || 0;
                        c.quaHan = Number(c.quaHan) || 0;
                        c.khoDoi = Number(c.khoDoi) || 0;
                        c.noCuoiKy = c.trongHan + c.quaHan + c.khoDoi;
                    });
                }

                // 2. Tự động liên kết: Gom tên khách hàng nợ khó đòi vào từng phòng ban
                DEPARTMENTS.forEach(dept => {
                    const badCustomers = comp.customers.filter(c => c.deptId === dept.id && c.khoDoi > 0);
                    const badNames = badCustomers.map(c => c.tenKhach).join(', ');
                    if (comp.departments && comp.departments[dept.id] && comp.departments[dept.id]['no_kho_doi']) {
                        comp.departments[dept.id]['no_kho_doi'].tenKhKhoDoi = badNames || '-';
                    }
                });

                // 3. Tính toán công thức cho các hàng phòng ban:
                // Tỷ lệ (%) = (Lũy kế thu tiền / Kế hoạch tháng) * 100
                if (comp.departments) {
                    Object.values(comp.departments).forEach(deptObj => {
                        Object.values(deptObj).forEach(row => {
                            const kh = Number(row.khThang) || 0;
                            const lk = Number(row.luyKeThuTien) || 0;
                            row.tyLe = kh > 0 ? (lk / kh) * 100 : 0;
                        });
                    });
                }
            });

            // 4. Tổng hợp số liệu Hợp nhất toàn tập đoàn (all)
            const allDepartments = {};
            DEPARTMENTS.forEach(dept => {
                allDepartments[dept.id] = {};
                dept.rows.forEach(r => {
                    allDepartments[dept.id][r.key] = {
                        duNoThangTruoc: 0,
                        duNoThangNay: 0,
                        khThang: 0,
                        khTuan: 0,
                        thTuan: 0,
                        luyKeThuTien: 0,
                        tyLe: 0,
                        tenKhKhoDoi: ''
                    };
                });
            });

            const allCustomers = [];
            const allBadNamesByDept = {};
            DEPARTMENTS.forEach(d => { allBadNamesByDept[d.id] = []; });

            companyKeys.forEach(cKey => {
                const comp = this.store[cKey];
                if (!comp) return;

                if (comp.departments) {
                    DEPARTMENTS.forEach(dept => {
                        const dObj = comp.departments[dept.id];
                        if (!dObj) return;
                        dept.rows.forEach(r => {
                            const srcRow = dObj[r.key];
                            if (!srcRow) return;
                            const target = allDepartments[dept.id][r.key];
                            target.duNoThangTruoc += Number(srcRow.duNoThangTruoc) || 0;
                            target.duNoThangNay += Number(srcRow.duNoThangNay) || 0;
                            target.khThang += Number(srcRow.khThang) || 0;
                            target.khTuan += Number(srcRow.khTuan) || 0;
                            target.thTuan += Number(srcRow.thTuan) || 0;
                            target.luyKeThuTien += Number(srcRow.luyKeThuTien) || 0;
                        });
                    });
                }

                if (comp.customers) {
                    comp.customers.forEach(c => {
                        allCustomers.push(c);
                        if (c.khoDoi > 0 && allBadNamesByDept[c.deptId]) {
                            allBadNamesByDept[c.deptId].push(`${c.tenKhach} (${cKey})`);
                        }
                    });
                }
            });

            // Tính tỷ lệ % cho all
            DEPARTMENTS.forEach(dept => {
                dept.rows.forEach(r => {
                    const row = allDepartments[dept.id][r.key];
                    row.tyLe = row.khThang > 0 ? (row.luyKeThuTien / row.khThang) * 100 : 0;
                    if (r.key === 'no_kho_doi') {
                        row.tenKhKhoDoi = allBadNamesByDept[dept.id].join(', ') || '-';
                    }
                });
            });

            this.store['all'] = {
                departments: allDepartments,
                customers: allCustomers
            };

            // 5. Đồng bộ cấu trúc dữ liệu cho window.mockData.debt để Overview sử dụng
            // this.syncMockDataDebt(); // Keep original Google Sheets mockData.debt for Dashboard Hien Tai
        },

        syncMockDataDebt() {
            if (!window.mockData) window.mockData = {};
            const compOrder = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
            const byCompany = {};
            let totalTy = 0;
            const badDebtsList = [];

            compOrder.forEach(cKey => {
                const comp = this.store[cKey];
                if (!comp) return;

                let cCurrent = 0, cOverdue = 0, cBad = 0;
                if (comp.departments) {
                    Object.values(comp.departments).forEach(d => {
                        if (d.no_binh_thuong) cCurrent += (Number(d.no_binh_thuong.duNoThangNay) || 0);
                        if (d.chua_den_han) cCurrent += (Number(d.chua_den_han.duNoThangNay) || 0);
                        if (d.no_qua_han) cOverdue += (Number(d.no_qua_han.duNoThangNay) || 0);
                        if (d.no_kho_doi) cBad += (Number(d.no_kho_doi.duNoThangNay) || 0);
                    });
                }

                const currentTy = parseFloat((cCurrent / 1e9).toFixed(2));
                const overdueTy = parseFloat((cOverdue / 1e9).toFixed(2));
                const badTy = parseFloat((cBad / 1e9).toFixed(2));
                totalTy += (currentTy + overdueTy + badTy);

                byCompany[cKey] = {
                    current: currentTy,
                    overdue: overdueTy,
                    bad: badTy
                };

                if (comp.customers) {
                    comp.customers.filter(c => c.khoDoi > 0).forEach(c => {
                        badDebtsList.push({
                            id: c.id,
                            customer: c.tenKhach,
                            company: cKey,
                            amount: c.khoDoi,
                            daysOverdue: '> 90 ngày',
                            status: c.note || 'Đang xử lý thu hồi'
                        });
                    });
                }
            });

            window.mockData.debt = {
                total: parseFloat(totalTy.toFixed(2)),
                byCompany: byCompany,
                badDebtsList: badDebtsList
            };
        },

        render() {
            this.renderKPIs();
            this.renderSummaryTable();
            this.renderDetailTable();
            if (this.activeTab === 'chart') {
                this.renderCharts();
            }
        },

        renderKPIs() {
            const currentData = this.store[this.currentCompany] || this.store['all'];
            if (!currentData || !currentData.departments) return;

            let totalNay = 0, totalTruoc = 0, normal = 0, overdue = 0, bad = 0;
            let badCustCount = 0;

            Object.values(currentData.departments).forEach(d => {
                if (d.no_binh_thuong) {
                    normal += Number(d.no_binh_thuong.duNoThangNay) || 0;
                    totalTruoc += Number(d.no_binh_thuong.duNoThangTruoc) || 0;
                }
                if (d.chua_den_han) {
                    normal += Number(d.chua_den_han.duNoThangNay) || 0;
                    totalTruoc += Number(d.chua_den_han.duNoThangTruoc) || 0;
                }
                if (d.no_qua_han) {
                    overdue += Number(d.no_qua_han.duNoThangNay) || 0;
                    totalTruoc += Number(d.no_qua_han.duNoThangTruoc) || 0;
                }
                if (d.no_kho_doi) {
                    bad += Number(d.no_kho_doi.duNoThangNay) || 0;
                    totalTruoc += Number(d.no_kho_doi.duNoThangTruoc) || 0;
                }
            });

            totalNay = normal + overdue + bad;

            if (currentData.customers) {
                badCustCount = currentData.customers.filter(c => c.khoDoi > 0).length;
            }

            const elTotal = document.getElementById('debt-kpi-total');
            const elTotalSub = document.getElementById('debt-kpi-total-sub');
            const elNormal = document.getElementById('debt-kpi-normal');
            const elNormalRate = document.getElementById('debt-kpi-normal-rate');
            const elOverdue = document.getElementById('debt-kpi-overdue');
            const elOverdueRate = document.getElementById('debt-kpi-overdue-rate');
            const elBad = document.getElementById('debt-kpi-bad');
            const elBadCount = document.getElementById('debt-kpi-bad-count');

            if (elTotal) elTotal.textContent = formatVND(totalNay) + ' ₫';
            if (elTotalSub) {
                const diff = totalNay - totalTruoc;
                const diffRate = totalTruoc > 0 ? ((diff / totalTruoc) * 100).toFixed(1) : 0;
                if (diff >= 0) {
                    elTotalSub.innerHTML = `<span style="color:#dc2626;">▲ Tăng ${formatVND(diff)} ₫ (+${diffRate}%)</span>`;
                } else {
                    elTotalSub.innerHTML = `<span style="color:#16a34a;">▼ Giảm ${formatVND(Math.abs(diff))} ₫ (${diffRate}%)</span>`;
                }
            }

            if (elNormal) elNormal.textContent = formatVND(normal) + ' ₫';
            if (elNormalRate) elNormalRate.textContent = totalNay > 0 ? ((normal / totalNay) * 100).toFixed(1) + '% tổng dư nợ' : '0%';

            if (elOverdue) elOverdue.textContent = formatVND(overdue) + ' ₫';
            if (elOverdueRate) elOverdueRate.textContent = totalNay > 0 ? ((overdue / totalNay) * 100).toFixed(1) + '% tổng dư nợ' : '0%';

            if (elBad) elBad.textContent = formatVND(bad) + ' ₫';
            if (elBadCount) elBadCount.textContent = `${badCustCount} khách hàng nợ khó đòi`;
        },

        // Render Báo Cáo Tổng Hợp (Mẫu Ảnh 1)
        renderSummaryTable() {
            const tbody = document.getElementById('debt-summary-tbody');
            if (!tbody) return;

            const companyName = COMPANY_MAP[this.currentCompany] || 'Toàn Tập đoàn VPS';
            const titleEl = document.getElementById('summary-report-title');
            const subEl = document.getElementById('summary-report-sub');
            if (titleEl) titleEl.textContent = `BÁO CÁO TỔNG HỢP CÔNG NỢ - ${companyName.toUpperCase()}`;
            if (subEl) subEl.textContent = `Tháng ${this.currentMonth} năm 2026 • Đơn vị tính: Đồng • Công thức tính tự động`;

            const currentData = this.store[this.currentCompany] || this.store['all'];
            if (!currentData || !currentData.departments) {
                tbody.innerHTML = '<tr><td colspan="10" class="cell-center">Không có dữ liệu công nợ</td></tr>';
                return;
            }

            let html = '';

            // 4 Hàng tổng hợp tích luỹ ở cuối
            const sumNormal = { duNoThangTruoc: 0, duNoThangNay: 0, khThang: 0, khTuan: 0, thTuan: 0, luyKeThuTien: 0 };
            const sumOverdue = { duNoThangTruoc: 0, duNoThangNay: 0, khThang: 0, khTuan: 0, thTuan: 0, luyKeThuTien: 0 };
            const sumBad = { duNoThangTruoc: 0, duNoThangNay: 0, khThang: 0, khTuan: 0, thTuan: 0, luyKeThuTien: 0 };
            let pendingRow = null;

            DEPARTMENTS.forEach(dept => {
                const deptObj = currentData.departments[dept.id] || {};

                // Tiêu đề phòng ban
                html += `
                    <tr class="dept-section-row">
                        <td colspan="10"><strong>${dept.name}</strong></td>
                    </tr>
                `;

                dept.rows.forEach(r => {
                    const rowData = deptObj[r.key] || { duNoThangTruoc: 0, duNoThangNay: 0, khThang: 0, khTuan: 0, thTuan: 0, luyKeThuTien: 0, tyLe: 0, tenKhKhoDoi: '-' };
                    const tyLeVal = rowData.khThang > 0 ? ((rowData.luyKeThuTien / rowData.khThang) * 100) : 0;
                    const isBad = (r.key === 'no_kho_doi');
                    const isOverdue = (r.key === 'no_qua_han');
                    const rowClass = isBad ? 'row-bad-debt' : (isOverdue ? 'row-overdue-debt' : '');

                    // Cộng dồn vào các hàng tổng hợp chân bảng
                    if (r.key === 'no_binh_thuong') {
                        sumNormal.duNoThangTruoc += Number(rowData.duNoThangTruoc) || 0;
                        sumNormal.duNoThangNay += Number(rowData.duNoThangNay) || 0;
                        sumNormal.khThang += Number(rowData.khThang) || 0;
                        sumNormal.khTuan += Number(rowData.khTuan) || 0;
                        sumNormal.thTuan += Number(rowData.thTuan) || 0;
                        sumNormal.luyKeThuTien += Number(rowData.luyKeThuTien) || 0;
                    } else if (r.key === 'no_qua_han') {
                        sumOverdue.duNoThangTruoc += Number(rowData.duNoThangTruoc) || 0;
                        sumOverdue.duNoThangNay += Number(rowData.duNoThangNay) || 0;
                        sumOverdue.khThang += Number(rowData.khThang) || 0;
                        sumOverdue.khTuan += Number(rowData.khTuan) || 0;
                        sumOverdue.thTuan += Number(rowData.thTuan) || 0;
                        sumOverdue.luyKeThuTien += Number(rowData.luyKeThuTien) || 0;
                    } else if (r.key === 'no_kho_doi') {
                        sumBad.duNoThangTruoc += Number(rowData.duNoThangTruoc) || 0;
                        sumBad.duNoThangNay += Number(rowData.duNoThangNay) || 0;
                        sumBad.khThang += Number(rowData.khThang) || 0;
                        sumBad.khTuan += Number(rowData.khTuan) || 0;
                        sumBad.thTuan += Number(rowData.thTuan) || 0;
                        sumBad.luyKeThuTien += Number(rowData.luyKeThuTien) || 0;
                    } else if (r.key === 'chua_den_han') {
                        pendingRow = rowData;
                    }

                    const badCustDisplay = isBad ? (rowData.tenKhKhoDoi || '-') : '-';

                    html += `
                        <tr class="${rowClass}">
                            <td class="cell-center">${r.label.split('.')[0] || ''}</td>
                            <td class="cell-text" style="padding-left: 20px;">${r.label}</td>
                            <td class="cell-num cell-editable" data-company="${this.currentCompany}" data-dept="${dept.id}" data-row="${r.key}" data-field="duNoThangTruoc" title="Bấm đúp để chỉnh sửa">${formatVND(rowData.duNoThangTruoc)}</td>
                            <td class="cell-num cell-editable" data-company="${this.currentCompany}" data-dept="${dept.id}" data-row="${r.key}" data-field="duNoThangNay" title="Bấm đúp để chỉnh sửa">${formatVND(rowData.duNoThangNay)}</td>
                            <td class="cell-num cell-editable" data-company="${this.currentCompany}" data-dept="${dept.id}" data-row="${r.key}" data-field="khThang" title="Bấm đúp để chỉnh sửa">${formatVND(rowData.khThang)}</td>
                            <td class="cell-num cell-editable" data-company="${this.currentCompany}" data-dept="${dept.id}" data-row="${r.key}" data-field="khTuan" title="Bấm đúp để chỉnh sửa">${formatVND(rowData.khTuan)}</td>
                            <td class="cell-num cell-editable" data-company="${this.currentCompany}" data-dept="${dept.id}" data-row="${r.key}" data-field="thTuan" title="Bấm đúp để chỉnh sửa">${formatVND(rowData.thTuan)}</td>
                            <td class="cell-num cell-editable" data-company="${this.currentCompany}" data-dept="${dept.id}" data-row="${r.key}" data-field="luyKeThuTien" title="Bấm đúp để chỉnh sửa">${formatVND(rowData.luyKeThuTien)}</td>
                            <td class="cell-num" style="font-weight: 600; color: ${tyLeVal >= 100 ? '#16a34a' : (tyLeVal >= 70 ? '#0284c7' : '#d97706')}">${formatPercent(tyLeVal)}</td>
                            <td class="cell-text" style="font-size: 0.8rem; color: ${isBad ? '#b91c1c' : '#64748b'};">${badCustDisplay}</td>
                        </tr>
                    `;
                });
            });

            // 4 HÀNG TỔNG HỢP Ở CUỐI BẢNG (Khớp 100% Ảnh 1)
            const sumNormalTyLe = sumNormal.khThang > 0 ? (sumNormal.luyKeThuTien / sumNormal.khThang) * 100 : 0;
            const sumOverdueTyLe = sumOverdue.khThang > 0 ? (sumOverdue.luyKeThuTien / sumOverdue.khThang) * 100 : 0;
            const sumBadTyLe = sumBad.khThang > 0 ? (sumBad.luyKeThuTien / sumBad.khThang) * 100 : 0;

            const grandTotal = {
                duNoThangTruoc: sumNormal.duNoThangTruoc + sumOverdue.duNoThangTruoc + sumBad.duNoThangTruoc + (pendingRow ? (Number(pendingRow.duNoThangTruoc) || 0) : 0),
                duNoThangNay: sumNormal.duNoThangNay + sumOverdue.duNoThangNay + sumBad.duNoThangNay + (pendingRow ? (Number(pendingRow.duNoThangNay) || 0) : 0),
                khThang: sumNormal.khThang + sumOverdue.khThang + sumBad.khThang + (pendingRow ? (Number(pendingRow.khThang) || 0) : 0),
                khTuan: sumNormal.khTuan + sumOverdue.khTuan + sumBad.khTuan + (pendingRow ? (Number(pendingRow.khTuan) || 0) : 0),
                thTuan: sumNormal.thTuan + sumOverdue.thTuan + sumBad.thTuan + (pendingRow ? (Number(pendingRow.thTuan) || 0) : 0),
                luyKeThuTien: sumNormal.luyKeThuTien + sumOverdue.luyKeThuTien + sumBad.luyKeThuTien + (pendingRow ? (Number(pendingRow.luyKeThuTien) || 0) : 0)
            };
            const grandTotalTyLe = grandTotal.khThang > 0 ? (grandTotal.luyKeThuTien / grandTotal.khThang) * 100 : 0;

            html += `
                <!-- 1. Tổng nợ bình thường -->
                <tr class="summary-footer-row">
                    <td class="cell-center"><strong>1</strong></td>
                    <td class="cell-text"><strong>Tổng nợ bình thường</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumNormal.duNoThangTruoc)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumNormal.duNoThangNay)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumNormal.khThang)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumNormal.khTuan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumNormal.thTuan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumNormal.luyKeThuTien)}</strong></td>
                    <td class="cell-num"><strong>${formatPercent(sumNormalTyLe)}</strong></td>
                    <td class="cell-center">-</td>
                </tr>
                <!-- 2. Tổng nợ quá hạn -->
                <tr class="summary-footer-row">
                    <td class="cell-center"><strong>2</strong></td>
                    <td class="cell-text"><strong>Tổng nợ quá hạn</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumOverdue.duNoThangTruoc)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumOverdue.duNoThangNay)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumOverdue.khThang)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumOverdue.khTuan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumOverdue.thTuan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumOverdue.luyKeThuTien)}</strong></td>
                    <td class="cell-num"><strong>${formatPercent(sumOverdueTyLe)}</strong></td>
                    <td class="cell-center">-</td>
                </tr>
                <!-- 3. Tổng nợ khó đòi -->
                <tr class="summary-footer-row">
                    <td class="cell-center"><strong>3</strong></td>
                    <td class="cell-text"><strong>Tổng nợ khó đòi</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumBad.duNoThangTruoc)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumBad.duNoThangNay)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumBad.khThang)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumBad.khTuan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumBad.thTuan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(sumBad.luyKeThuTien)}</strong></td>
                    <td class="cell-num"><strong>${formatPercent(sumBadTyLe)}</strong></td>
                    <td class="cell-center">-</td>
                </tr>
                <!-- 4. TỔNG CỘNG -->
                <tr class="summary-footer-total">
                    <td class="cell-center"><strong>4</strong></td>
                    <td class="cell-text"><strong>TỔNG CỘNG</strong></td>
                    <td class="cell-num"><strong>${formatVND(grandTotal.duNoThangTruoc)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(grandTotal.duNoThangNay)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(grandTotal.khThang)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(grandTotal.khTuan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(grandTotal.thTuan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(grandTotal.luyKeThuTien)}</strong></td>
                    <td class="cell-num"><strong>${formatPercent(grandTotalTyLe)}</strong></td>
                    <td class="cell-center">-</td>
                </tr>
            `;

            tbody.innerHTML = html;
            this.bindInlineEditEvents();
        },

        // Render Danh Sách Chi Tiết Công Nợ Khách Hàng (Mẫu Ảnh 2)
        renderDetailTable() {
            const tbody = document.getElementById('debt-detail-tbody');
            if (!tbody) return;

            const companyName = COMPANY_MAP[this.currentCompany] || 'Toàn Tập đoàn VPS';
            const titleEl = document.getElementById('detail-report-title');
            if (titleEl) titleEl.textContent = `DANH SÁCH CÔNG NỢ CHI TIẾT - ${companyName.toUpperCase()}`;

            const currentData = this.store[this.currentCompany] || this.store['all'];
            let list = (currentData && currentData.customers) ? [...currentData.customers] : [];

            if (this.searchQuery) {
                list = list.filter(c => 
                    (c.tenKhach && c.tenKhach.toLowerCase().includes(this.searchQuery)) ||
                    (c.maKhach && c.maKhach.toLowerCase().includes(this.searchQuery)) ||
                    (c.note && c.note.toLowerCase().includes(this.searchQuery))
                );
            }

            if (list.length === 0) {
                tbody.innerHTML = `<tr><td colspan="8" class="cell-center" style="padding: 24px; color: #64748b;">Không tìm thấy khách hàng công nợ phù hợp</td></tr>`;
                return;
            }

            let html = '';
            let totalCuoiKy = 0, totalTrongHan = 0, totalQuaHan = 0, totalKhoDoi = 0;

            list.forEach((cust, idx) => {
                const noCuoiKy = (Number(cust.trongHan) || 0) + (Number(cust.quaHan) || 0) + (Number(cust.khoDoi) || 0);
                totalCuoiKy += noCuoiKy;
                totalTrongHan += (Number(cust.trongHan) || 0);
                totalQuaHan += (Number(cust.quaHan) || 0);
                totalKhoDoi += (Number(cust.khoDoi) || 0);

                const isBad = (Number(cust.khoDoi) || 0) > 0;
                const isOverdue = (Number(cust.quaHan) || 0) > 0;

                html += `
                    <tr>
                        <td class="cell-center">${idx + 1}</td>
                        <td class="cell-center"><span style="font-family: monospace; font-weight: 600; color: #475569;">${cust.maKhach || 'KH-000'}</span></td>
                        <td class="cell-text">
                            <strong>${cust.tenKhach}</strong>
                            ${isBad ? '<span class="badge-debt-type badge-debt-bad" style="margin-left: 6px;">Nợ khó đòi</span>' : ''}
                            ${cust.note ? `<div style="font-size: 0.75rem; color: #64748b; margin-top: 2px;">${cust.note}</div>` : ''}
                        </td>
                        <td class="cell-num" style="font-weight: 700; color: #15803d; background: #f0fdf4;">${formatVND(noCuoiKy)}</td>
                        <td class="cell-num">${formatVND(cust.trongHan)}</td>
                        <td class="cell-num" style="color: ${isOverdue ? '#b45309' : '#1e293b'}; font-weight: ${isOverdue ? '600' : 'normal'}">${formatVND(cust.quaHan)}</td>
                        <td class="cell-num" style="color: ${isBad ? '#b91c1c' : '#1e293b'}; font-weight: ${isBad ? '700' : 'normal'}">${formatVND(cust.khoDoi)}</td>
                        <td class="cell-center">
                            <div style="display: flex; gap: 4px; justify-content: center;">
                                <button class="btn btn-icon" style="padding: 2px 6px; font-size: 0.75rem; border: 1px solid #cbd5e1; border-radius: 4px;" onclick="window.DebtModule.editCustomer(${cust.id})" title="Chỉnh sửa">
                                    <i data-lucide="edit-3" style="width: 12px; height: 12px;"></i>
                                </button>
                                <button class="btn btn-icon" style="padding: 2px 6px; font-size: 0.75rem; border: 1px solid #fca5a5; color: #dc2626; border-radius: 4px;" onclick="window.DebtModule.deleteCustomer(${cust.id})" title="Xoá">
                                    <i data-lucide="trash-2" style="width: 12px; height: 12px;"></i>
                                </button>
                            </div>
                        </td>
                    </tr>
                `;
            });

            // Hàng TỔNG CỘNG chi tiết
            html += `
                <tr class="summary-footer-total">
                    <td colspan="3" class="cell-center"><strong>TỔNG CỘNG:</strong></td>
                    <td class="cell-num"><strong>${formatVND(totalCuoiKy)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(totalTrongHan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(totalQuaHan)}</strong></td>
                    <td class="cell-num"><strong>${formatVND(totalKhoDoi)}</strong></td>
                    <td class="cell-center">-</td>
                </tr>
            `;

            tbody.innerHTML = html;
            if (window.lucide) window.lucide.createIcons();
        },

        // Render Biểu Đồ Cơ Cấu Công Nợ
        renderCharts() {
            if (!window.ChartManager) return;

            const compOrder = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];
            let labels = [], currentData = [], overdueData = [], badData = [];

            if (this.currentCompany === 'all') {
                compOrder.forEach(cKey => {
                    const comp = this.store[cKey];
                    if (!comp) return;
                    labels.push(COMPANY_MAP[cKey] || cKey);

                    let c = 0, o = 0, b = 0;
                    if (comp.departments) {
                        Object.values(comp.departments).forEach(d => {
                            if (d.no_binh_thuong) c += (Number(d.no_binh_thuong.duNoThangNay) || 0);
                            if (d.chua_den_han) c += (Number(d.chua_den_han.duNoThangNay) || 0);
                            if (d.no_qua_han) o += (Number(d.no_qua_han.duNoThangNay) || 0);
                            if (d.no_kho_doi) b += (Number(d.no_kho_doi.duNoThangNay) || 0);
                        });
                    }
                    currentData.push(parseFloat((c / 1e9).toFixed(2)));
                    overdueData.push(parseFloat((o / 1e9).toFixed(2)));
                    badData.push(parseFloat((b / 1e9).toFixed(2)));
                });
            } else {
                const comp = this.store[this.currentCompany];
                labels = [COMPANY_MAP[this.currentCompany] || this.currentCompany];
                let c = 0, o = 0, b = 0;
                if (comp && comp.departments) {
                    Object.values(comp.departments).forEach(d => {
                        if (d.no_binh_thuong) c += (Number(d.no_binh_thuong.duNoThangNay) || 0);
                        if (d.chua_den_han) c += (Number(d.chua_den_han.duNoThangNay) || 0);
                        if (d.no_qua_han) o += (Number(d.no_qua_han.duNoThangNay) || 0);
                        if (d.no_kho_doi) b += (Number(d.no_kho_doi.duNoThangNay) || 0);
                    });
                }
                currentData.push(parseFloat((c / 1e9).toFixed(2)));
                overdueData.push(parseFloat((o / 1e9).toFixed(2)));
                badData.push(parseFloat((b / 1e9).toFixed(2)));
            }

            const chartData = {
                labels: labels,
                datasets: [
                    { label: 'Trong hạn', data: currentData, backgroundColor: '#0284c7' },
                    { label: 'Quá hạn', data: overdueData, backgroundColor: '#f59e0b' },
                    { label: 'Khó đòi', data: badData, backgroundColor: '#ef4444' }
                ]
            };

            window.ChartManager.createChart('debtStructureChart', 'bar', chartData, {
                scales: {
                    x: { stacked: true },
                    y: { stacked: true, title: { display: true, text: 'Tỷ VNĐ' } }
                },
                plugins: {
                    datalabels: {
                        color: '#ffffff',
                        font: { weight: 'bold', size: 11 },
                        formatter: (val) => (val > 0 ? val + ' T' : '')
                    }
                }
            });

            // Biểu đồ theo phòng ban
            const currentCompData = this.store[this.currentCompany] || this.store['all'];
            const deptLabels = ['I. Kỹ thuật/ Thuê', 'II. KD bán máy', 'III. Dự Án', 'IV. TTPP/ Bán buôn'];
            const deptValues = [];

            if (currentCompData && currentCompData.departments) {
                ['dept_kt', 'dept_kd', 'dept_da', 'dept_ttpp'].forEach(dId => {
                    const d = currentCompData.departments[dId];
                    let sumD = 0;
                    if (d) {
                        Object.values(d).forEach(r => {
                            sumD += (Number(r.duNoThangNay) || 0);
                        });
                    }
                    deptValues.push(parseFloat((sumD / 1e9).toFixed(2)));
                });
            }

            window.ChartManager.createChart('debtDeptChart', 'doughnut', {
                labels: deptLabels,
                datasets: [{
                    data: deptValues,
                    backgroundColor: ['#0284c7', '#10b981', '#f59e0b', '#8b5cf6']
                }]
            }, {
                plugins: {
                    datalabels: {
                        color: '#ffffff',
                        font: { weight: 'bold', size: 12 },
                        formatter: (val) => (val > 0 ? val + ' T' : '')
                    }
                }
            });
        },

        // Cho phép chỉnh sửa số liệu nhanh trực tiếp trên bảng tổng hợp
        bindInlineEditEvents() {
            const cells = document.querySelectorAll('.cell-editable');
            cells.forEach(cell => {
                cell.addEventListener('dblclick', () => {
                    if (cell.querySelector('input')) return;
                    const compKey = cell.dataset.company;
                    const deptId = cell.dataset.dept;
                    const rowKey = cell.dataset.row;
                    const field = cell.dataset.field;

                    if (compKey === 'all') {
                        alert('Để chỉnh sửa dữ liệu, vui lòng chọn một đơn vị cụ thể (THH, Việt, Xem Sơn, VPS M, ITSS, VP VPS).');
                        return;
                    }

                    const comp = this.store[compKey];
                    if (!comp || !comp.departments || !comp.departments[deptId] || !comp.departments[deptId][rowKey]) return;

                    const curVal = comp.departments[deptId][rowKey][field] || 0;
                    const input = document.createElement('input');
                    input.type = 'number';
                    input.value = curVal;
                    input.step = '1000';
                    cell.innerHTML = '';
                    cell.appendChild(input);
                    input.focus();
                    input.select();

                    const finishEdit = () => {
                        const newVal = Number(input.value) || 0;
                        comp.departments[deptId][rowKey][field] = newVal;
                        this.recalculateAll();
                        this.saveStore();
                        this.render();
                        this.showToast('Đã lưu và tự động cập nhật công thức!');
                    };

                    input.addEventListener('blur', finishEdit, { once: true });
                    input.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            input.blur();
                        } else if (e.key === 'Escape') {
                            cell.innerHTML = formatVND(curVal);
                        }
                    });
                });
            });
        },

        // Mở Modal thêm khách hàng mới
        openAddModal(editingCust = null) {
            const modal = document.getElementById('debt-cust-modal');
            const form = document.getElementById('debt-customer-form');
            if (!modal || !form) return;

            form.reset();
            const title = document.getElementById('debt-modal-title');
            const formId = document.getElementById('debt-form-id');
            const formUnit = document.getElementById('debt-form-unit');

            // RBAC check
            const canViewAll = window.AuthService ? window.AuthService.canViewAll() : false;
            if (!canViewAll) {
                const allowed = window.AuthService ? window.AuthService.getAllowedCompany() : 'THH';
                let mappedKey = 'THH';
                if (allowed.includes('Việt') || allowed === 'Viet') mappedKey = 'Viet';
                else if (allowed.includes('Xem') || allowed === 'XemSon') mappedKey = 'XemSon';
                else if (allowed.includes('VPS M') || allowed === 'VPSM') mappedKey = 'VPSM';
                else if (allowed.includes('ITSS') || allowed === 'ITSS') mappedKey = 'ITSS';
                else if (allowed.includes('Văn phòng') || allowed === 'VPVPS') mappedKey = 'VPVPS';
                formUnit.value = mappedKey;
                formUnit.disabled = true;
            } else {
                formUnit.disabled = false;
                formUnit.value = (this.currentCompany !== 'all') ? this.currentCompany : 'THH';
            }

            if (editingCust) {
                if (title) title.textContent = 'Chỉnh Sửa Khách Hàng Công Nợ';
                if (formId) formId.value = editingCust.id;
                if (formUnit) formUnit.value = editingCust.company;
                document.getElementById('debt-form-dept').value = editingCust.deptId;
                document.getElementById('debt-form-code').value = editingCust.maKhach;
                document.getElementById('debt-form-name').value = editingCust.tenKhach;
                document.getElementById('debt-form-normal').value = editingCust.trongHan;
                document.getElementById('debt-form-overdue').value = editingCust.quaHan;
                document.getElementById('debt-form-bad').value = editingCust.khoDoi;
                document.getElementById('debt-form-note').value = editingCust.note || '';
            } else {
                if (title) title.textContent = 'Thêm Khách Hàng Nợ Mới';
                if (formId) formId.value = '';
                document.getElementById('debt-form-code').value = 'KH-' + Math.floor(100 + Math.random() * 900);
            }

            modal.classList.add('active');
        },

        closeModal() {
            const modal = document.getElementById('debt-cust-modal');
            if (modal) modal.classList.remove('active');
        },

        saveCustomer() {
            const idVal = document.getElementById('debt-form-id').value;
            const unit = document.getElementById('debt-form-unit').value;
            const dept = document.getElementById('debt-form-dept').value;
            const code = document.getElementById('debt-form-code').value.trim();
            const name = document.getElementById('debt-form-name').value.trim();
            const normal = Number(document.getElementById('debt-form-normal').value) || 0;
            const overdue = Number(document.getElementById('debt-form-overdue').value) || 0;
            const bad = Number(document.getElementById('debt-form-bad').value) || 0;
            const note = document.getElementById('debt-form-note').value.trim();

            if (!name) {
                alert('Vui lòng nhập tên khách hàng!');
                return;
            }

            const comp = this.store[unit];
            if (!comp) return;
            if (!comp.customers) comp.customers = [];

            if (idVal) {
                // Sửa khách hàng cũ
                const cId = parseInt(idVal, 10);
                const target = comp.customers.find(c => c.id === cId);
                if (target) {
                    target.deptId = dept;
                    target.maKhach = code;
                    target.tenKhach = name;
                    target.trongHan = normal;
                    target.quaHan = overdue;
                    target.khoDoi = bad;
                    target.note = note;
                }
            } else {
                // Thêm khách hàng mới
                const newId = Date.now();
                comp.customers.unshift({
                    id: newId,
                    company: unit,
                    deptId: dept,
                    maKhach: code,
                    tenKhach: name,
                    trongHan: normal,
                    quaHan: overdue,
                    khoDoi: bad,
                    note: note
                });
            }

            this.recalculateAll();
            this.saveStore();
            this.closeModal();
            this.render();
            this.showToast('Đã lưu dữ liệu khách hàng & tự động tính toán!');
        },

        editCustomer(id) {
            let found = null;
            for (const cKey of ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS']) {
                const comp = this.store[cKey];
                if (comp && comp.customers) {
                    const c = comp.customers.find(item => item.id === id);
                    if (c) {
                        found = c;
                        break;
                    }
                }
            }
            if (found) {
                this.openAddModal(found);
            }
        },

        deleteCustomer(id) {
            if (!confirm('Bạn có chắc chắn muốn xoá khách hàng này khỏi danh sách công nợ?')) return;
            for (const cKey of ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS']) {
                const comp = this.store[cKey];
                if (comp && comp.customers) {
                    const idx = comp.customers.findIndex(item => item.id === id);
                    if (idx !== -1) {
                        comp.customers.splice(idx, 1);
                        break;
                    }
                }
            }
            this.recalculateAll();
            this.saveStore();
            this.render();
            this.showToast('Đã xoá khách hàng và tính toán lại số liệu!');
        },

        // Xuất dữ liệu view đang xem ra file CSV/Excel UTF-8
        exportActiveView() {
            const compName = COMPANY_MAP[this.currentCompany] || 'Toan_Tap_Doan_VPS';
            let csvContent = '\uFEFF'; // BOM UTF-8

            if (this.activeTab === 'summary') {
                csvContent += `"BÁO CÁO TỔNG HỢP CÔNG NỢ - ${compName.toUpperCase()}"\n`;
                csvContent += `"Tháng ${this.currentMonth} năm 2026 - Đơn vị tính: Đồng"\n\n`;
                csvContent += `"TT","PHÒNG BAN","DƯ NỢ THÁNG TRƯỚC","DƯ NỢ THÁNG NÀY","KẾ HOẠCH THÁNG","KH TUẦN","THỰC HIỆN TUẦN","LŨY KẾ THU TIỀN","TỶ LỆ (%)","TÊN KH NỢ KHÓ ĐÒI"\n`;

                const currentData = this.store[this.currentCompany] || this.store['all'];
                if (currentData && currentData.departments) {
                    DEPARTMENTS.forEach(dept => {
                        const dObj = currentData.departments[dept.id] || {};
                        csvContent += `"${dept.id}","${dept.name}","","","","","","","",""\n`;
                        dept.rows.forEach(r => {
                            const row = dObj[r.key] || {};
                            const tyLe = row.khThang > 0 ? ((row.luyKeThuTien / row.khThang) * 100).toFixed(1) + '%' : '0%';
                            csvContent += `"${r.label.split('.')[0]}","${r.label}","${row.duNoThangTruoc || 0}","${row.duNoThangNay || 0}","${row.khThang || 0}","${row.khTuan || 0}","${row.thTuan || 0}","${row.luyKeThuTien || 0}","${tyLe}","${row.tenKhKhoDoi || ''}"\n`;
                        });
                    });
                }
            } else {
                csvContent += `"DANH SÁCH CÔNG NỢ CHI TIẾT - ${compName.toUpperCase()}"\n`;
                csvContent += `"Tháng ${this.currentMonth} năm 2026 - Đơn vị tính: Đồng"\n\n`;
                csvContent += `"STT","MÃ KHÁCH","TÊN KHÁCH HÀNG","NỢ CUỐI KỲ","TRONG HẠN","QUÁ HẠN","KHÓ ĐÒI","GHI CHÚ"\n`;

                const currentData = this.store[this.currentCompany] || this.store['all'];
                const list = (currentData && currentData.customers) ? currentData.customers : [];
                list.forEach((c, idx) => {
                    const noCuoiKy = (Number(c.trongHan) || 0) + (Number(c.quaHan) || 0) + (Number(c.khoDoi) || 0);
                    csvContent += `"${idx + 1}","${c.maKhach}","${c.tenKhach}","${noCuoiKy}","${c.trongHan}","${c.quaHan}","${c.khoDoi}","${c.note || ''}"\n`;
                });
            }

            const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.setAttribute('href', url);
            link.setAttribute('download', `Bao_Cao_Cong_No_${this.currentCompany}_T${this.currentMonth}.csv`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            this.showToast('Đã xuất file thành công!');
        },

        showToast(msg) {
            const toast = document.createElement('div');
            toast.className = 'debt-toast';
            toast.innerHTML = `<span style="color:#34d399;">✓</span> <span>${msg}</span>`;
            document.body.appendChild(toast);
            setTimeout(() => {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 3000);
        }
    };
})();
