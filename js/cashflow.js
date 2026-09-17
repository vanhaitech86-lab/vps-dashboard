/**
 * ============================================================
 * MODULE 14: BÁO CÁO KẾ HOẠCH VÀ DÒNG TIỀN TUẦN - THÁNG (CASH FLOW)
 * TẬP ĐOÀN VPS - BAN TÀI CHÍNH KẾ TOÁN
 * Chuẩn hóa 100% theo biểu mẫu chỉ tiêu tài chính dòng tiền VPS
 * ============================================================
 */

(function() {
    'use strict';

    // Danh sách 7 đơn vị thành viên theo phân quyền hệ thống VPS
    const COMPANIES = [
        { id: 'all', name: 'TOÀN TẬP ĐOÀN VPS (HỢP NHẤT)' },
        { id: 'Tân Hồng Hà', name: 'CÔNG TY TÂN HỒNG HÀ' },
        { id: 'Việt', name: 'CÔNG TY CP THƯƠNG MẠI VIỆT' },
        { id: 'Xem Sơn', name: 'CÔNG TY CP XEM SƠN (XESCO)' },
        { id: 'VPS M', name: 'CÔNG TY TNHH VPS MIỀN TRUNG' },
        { id: 'ITSS', name: 'CÔNG TY CP CÔNG NGHỆ ITSS' },
        { id: 'Văn phòng VPS', name: 'VĂN PHÒNG TỔNG CÔNG TY VPS' }
    ];

    // Cấu trúc danh mục chỉ tiêu dòng tiền chuẩn hóa theo đúng biểu mẫu ảnh
    const CASHFLOW_ITEMS = [
        // A. SỐ DƯ TIỀN ĐẦU KỲ
        { id: 'A', stt: 'A', name: 'SỐ DƯ TIỀN ĐẦU KỲ (1 + 2)', isHeader: true, group: 'A', calc: 'sum_sub', subIds: ['A1', 'A2'] },
        { id: 'A1', stt: '1', name: '- Tiền mặt tại quỹ', isChild: true, group: 'A' },
        { id: 'A2', stt: '2', name: '- Tiền gửi ngân hàng', isChild: true, group: 'A' },

        // B. KHOẢN THU TIỀN TRONG KỲ (DÒNG TIỀN VÀO)
        { id: 'B', stt: 'B', name: 'KHOẢN THU TIỀN TRONG KỲ (DÒNG TIỀN VÀO)', isHeader: true, group: 'B', isTitleOnly: true },
        
        // B.I
        { id: 'B_I', stt: 'I', name: 'Dòng tiền từ hoạt động SXKD', isSubHeader: true, group: 'B' },
        { id: 'B_I_1', stt: '1', name: 'Thu từ bán hàng & cung cấp dịch vụ (bên ngoài)', isChild: true, group: 'B' },
        { id: 'B_I_2', stt: '2', name: 'Thu bán hàng/cung cấp dịch vụ nội bộ Tập đoàn VPS (*)', isChild: true, group: 'B' },
        { id: 'B_I_3', stt: '3', name: 'Thu hoàn thuế GTGT / Thu hồi tạm ứng / Thu khác', isChild: true, group: 'B' },
        { id: 'B_I_SUM', stt: '', name: 'Cộng dòng tiền thu SXKD (I)', isSumRow: true, group: 'B', calc: 'sum_sub', subIds: ['B_I_1', 'B_I_2', 'B_I_3'] },

        // B.II
        { id: 'B_II', stt: 'II', name: 'Dòng tiền từ hoạt động Đầu tư & Tài chính', isSubHeader: true, group: 'B' },
        { id: 'B_II_1', stt: '1', name: 'Thu hồi vốn góp / Thanh lý tài sản cố định', isChild: true, group: 'B' },
        { id: 'B_II_2', stt: '2', name: 'Vay vốn giải ngân từ Ngân hàng', isChild: true, group: 'B' },
        { id: 'B_II_3', stt: '3', name: 'Vay hỗ trợ / Nhận góp vốn từ Tập đoàn mẹ VPS (*)', isChild: true, group: 'B' },
        { id: 'B_II_SUM', stt: '', name: 'Cộng dòng tiền thu Đầu tư & Tài chính (II)', isSumRow: true, group: 'B', calc: 'sum_sub', subIds: ['B_II_1', 'B_II_2', 'B_II_3'] },

        // TỔNG B
        { id: 'B_TOTAL', stt: 'TỔNG B', name: 'TỔNG CÁC KHOẢN THU TIỀN (I + II)', isTotalRow: true, group: 'B', calc: 'sum_sub', subIds: ['B_I_SUM', 'B_II_SUM'] },

        // C. KHOẢN CHI TIỀN TRONG KỲ (DÒNG TIỀN RA)
        { id: 'C', stt: 'C', name: 'KHOẢN CHI TIỀN TRONG KỲ (DÒNG TIỀN RA)', isHeader: true, group: 'C', isTitleOnly: true },

        // C.I
        { id: 'C_I', stt: 'I', name: 'Dòng tiền từ hoạt động SXKD', isSubHeader: true, group: 'C' },
        { id: 'C_I_1', stt: '1', name: 'Chi trả Nhà cung cấp bên ngoài (vật tư, thiết bị)', isChild: true, group: 'C' },
        { id: 'C_I_2', stt: '2', name: 'Chi trả Nhà cung cấp nội bộ trong Tập đoàn VPS (*)', isChild: true, group: 'C' },
        { id: 'C_I_3', stt: '3', name: 'Chi trả lương, thưởng & các khoản theo lương (BHXH)', isChild: true, group: 'C' },
        { id: 'C_I_4', stt: '4', name: 'Chi nộp Ngân sách Nhà nước (Thuế GTGT, TNDN, TNCN)', isChild: true, group: 'C' },
        { id: 'C_I_5', stt: '5', name: 'Chi phí vận hành quản lý (Điện nước, thuê VP, tiếp khách)', isChild: true, group: 'C' },
        { id: 'C_I_6', stt: '6', name: 'Chi tạm ứng, ký quỹ, chi phí SXKD khác', isChild: true, group: 'C' },
        { id: 'C_I_SUM', stt: '', name: 'Cộng dòng tiền chi SXKD (I)', isSumRow: true, group: 'C', calc: 'sum_sub', subIds: ['C_I_1', 'C_I_2', 'C_I_3', 'C_I_4', 'C_I_5', 'C_I_6'] },

        // C.II
        { id: 'C_II', stt: 'II', name: 'Dòng tiền từ hoạt động Đầu tư', isSubHeader: true, group: 'C' },
        { id: 'C_II_1', stt: '1', name: 'Chi mua sắm máy móc, TSCĐ, công cụ dụng cụ lớn', isChild: true, group: 'C' },
        { id: 'C_II_2', stt: '2', name: 'Chi đầu tư dự án / góp vốn thành lập đơn vị khác', isChild: true, group: 'C' },
        { id: 'C_II_SUM', stt: '', name: 'Cộng dòng tiền chi Đầu tư (II)', isSumRow: true, group: 'C', calc: 'sum_sub', subIds: ['C_II_1', 'C_II_2'] },

        // C.III
        { id: 'C_III', stt: 'III', name: 'Dòng tiền từ hoạt động Tài chính', isSubHeader: true, group: 'C' },
        { id: 'C_III_1', stt: '1', name: 'Chi trả nợ gốc vay Ngân hàng', isChild: true, group: 'C' },
        { id: 'C_III_2', stt: '2', name: 'Chi trả lãi vay ngân hàng & phí tài chính', isChild: true, group: 'C' },
        { id: 'C_III_3', stt: '3', name: 'Chi trả nợ vay / Chia cổ tức chuyển về Tập đoàn VPS (*)', isChild: true, group: 'C' },
        { id: 'C_III_SUM', stt: '', name: 'Cộng dòng tiền chi Tài chính (III)', isSumRow: true, group: 'C', calc: 'sum_sub', subIds: ['C_III_1', 'C_III_2', 'C_III_3'] },

        // TỔNG C
        { id: 'C_TOTAL', stt: 'TỔNG C', name: 'TỔNG CÁC KHOẢN CHI TIỀN (I + II + III)', isTotalRow: true, group: 'C', calc: 'sum_sub', subIds: ['C_I_SUM', 'C_II_SUM', 'C_III_SUM'] },

        // D. LƯU CHUYỂN TIỀN THUẦN TRONG KỲ
        { id: 'D', stt: 'D', name: 'LƯU CHUYỂN TIỀN THUẦN TRONG KỲ (D = B - C)', isTotalRow: true, group: 'D', calc: 'diff', op1: 'B_TOTAL', op2: 'C_TOTAL' },

        // E. SỐ DƯ TIỀN CUỐI KỲ
        { id: 'E', stt: 'E', name: 'SỐ DƯ TIỀN CUỐI KỲ (E = A + D)', isTotalRow: true, group: 'E', calc: 'sum_op', op1: 'A', op2: 'D' },

        // F. HẠN MỨC SỐ DƯ TIỀN TỐI THIỂU
        { id: 'F', stt: 'F', name: 'HẠN MỨC SỐ DƯ TIỀN TỐI THIỂU (Safety Cash Buffer)', isHeader: true, group: 'F' },

        // G. THẶNG DƯ / (THIẾU HỤT) CẦN ĐIỀU TIẾT
        { id: 'G', stt: 'G', name: 'THẶNG DƯ / (THIẾU HỤT) CẦN ĐIỀU TIẾT (G = E - F)', isAlertRow: true, group: 'G', calc: 'diff', op1: 'E', op2: 'F' }
    ];

    // Dữ liệu mẫu thực tế & logic tạo dữ liệu dòng tiền theo từng đơn vị và từng tháng
    function generateMockData(companyId, month) {
        // Multipliers theo quy mô các đơn vị trong tập đoàn VPS
        const compScale = {
            'all': 1.0,
            'Tân Hồng Hà': 0.45,
            'Việt': 0.18,
            'Xem Sơn': 0.25,
            'VPS M': 0.06,
            'ITSS': 0.03,
            'Văn phòng VPS': 0.03
        }[companyId] || 0.15;

        // Cơ số tiền (Triệu VNĐ)
        const baseFactor = 1000 * compScale; // Đơn vị: Triệu VNĐ

        // Hàm ngẫu nhiên ổn định theo seed
        const seededRand = (seed, min, max) => {
            const x = Math.sin(seed * 9999 + month * 77 + 33) * 10000;
            const r = x - Math.floor(x);
            return Math.round((min + r * (max - min)) * 10) / 10;
        };

        const rows = {};

        // SỐ DƯ ĐẦU KỲ
        const a1 = Math.round(seededRand(1, 150, 400) * compScale);
        const a2 = Math.round(seededRand(2, 4500, 12000) * compScale);
        rows['A1'] = { dauKy: a1, w1: { kh: 0, th: 0 }, w2: { kh: 0, th: 0 }, w3: { kh: 0, th: 0 }, w4: { kh: 0, th: 0 }, w5: { kh: 0, th: 0 } };
        rows['A2'] = { dauKy: a2, w1: { kh: 0, th: 0 }, w2: { kh: 0, th: 0 }, w3: { kh: 0, th: 0 }, w4: { kh: 0, th: 0 }, w5: { kh: 0, th: 0 } };

        // Dòng tiền vào
        rows['B_I_1'] = {
            dauKy: 0,
            w1: { kh: seededRand(11, 1800, 2600) * compScale, th: seededRand(12, 1750, 2700) * compScale },
            w2: { kh: seededRand(13, 2200, 3100) * compScale, th: seededRand(14, 2100, 3300) * compScale },
            w3: { kh: seededRand(15, 2000, 2900) * compScale, th: seededRand(16, 2050, 2950) * compScale },
            w4: { kh: seededRand(17, 2500, 3800) * compScale, th: seededRand(18, 2400, 4000) * compScale },
            w5: { kh: seededRand(19, 1200, 1900) * compScale, th: seededRand(20, 1100, 2000) * compScale }
        };

        rows['B_I_2'] = {
            dauKy: 0,
            w1: { kh: seededRand(21, 300, 600) * compScale, th: seededRand(22, 280, 580) * compScale },
            w2: { kh: seededRand(23, 400, 750) * compScale, th: seededRand(24, 420, 790) * compScale },
            w3: { kh: seededRand(25, 350, 650) * compScale, th: seededRand(26, 360, 640) * compScale },
            w4: { kh: seededRand(27, 450, 900) * compScale, th: seededRand(28, 430, 920) * compScale },
            w5: { kh: seededRand(29, 200, 450) * compScale, th: seededRand(30, 210, 460) * compScale }
        };

        rows['B_I_3'] = {
            dauKy: 0,
            w1: { kh: seededRand(31, 50, 120) * compScale, th: seededRand(32, 60, 150) * compScale },
            w2: { kh: seededRand(33, 40, 100) * compScale, th: seededRand(34, 30, 110) * compScale },
            w3: { kh: seededRand(35, 60, 140) * compScale, th: seededRand(36, 70, 160) * compScale },
            w4: { kh: seededRand(37, 80, 200) * compScale, th: seededRand(38, 90, 220) * compScale },
            w5: { kh: seededRand(39, 30, 80) * compScale, th: seededRand(40, 40, 90) * compScale }
        };

        rows['B_II_1'] = {
            dauKy: 0,
            w1: { kh: 0, th: 0 },
            w2: { kh: seededRand(41, 0, 100) * compScale, th: seededRand(42, 0, 120) * compScale },
            w3: { kh: 0, th: 0 },
            w4: { kh: seededRand(43, 0, 150) * compScale, th: seededRand(44, 0, 180) * compScale },
            w5: { kh: 0, th: 0 }
        };

        rows['B_II_2'] = {
            dauKy: 0,
            w1: { kh: seededRand(45, 500, 1200) * compScale, th: seededRand(46, 500, 1200) * compScale },
            w2: { kh: 0, th: 0 },
            w3: { kh: seededRand(47, 600, 1500) * compScale, th: seededRand(48, 600, 1500) * compScale },
            w4: { kh: 0, th: 0 },
            w5: { kh: 0, th: 0 }
        };

        rows['B_II_3'] = {
            dauKy: 0,
            w1: { kh: seededRand(49, 200, 500) * compScale, th: seededRand(50, 200, 500) * compScale },
            w2: { kh: 0, th: 0 },
            w3: { kh: 0, th: 0 },
            w4: { kh: seededRand(51, 300, 600) * compScale, th: seededRand(52, 300, 600) * compScale },
            w5: { kh: 0, th: 0 }
        };

        // Dòng tiền ra
        rows['C_I_1'] = {
            dauKy: 0,
            w1: { kh: seededRand(61, 1100, 1900) * compScale, th: seededRand(62, 1050, 1950) * compScale },
            w2: { kh: seededRand(63, 1400, 2200) * compScale, th: seededRand(64, 1380, 2300) * compScale },
            w3: { kh: seededRand(65, 1200, 1800) * compScale, th: seededRand(66, 1220, 1850) * compScale },
            w4: { kh: seededRand(67, 1600, 2600) * compScale, th: seededRand(68, 1550, 2700) * compScale },
            w5: { kh: seededRand(69, 800, 1300) * compScale, th: seededRand(70, 750, 1350) * compScale }
        };

        rows['C_I_2'] = {
            dauKy: 0,
            w1: { kh: seededRand(71, 200, 450) * compScale, th: seededRand(72, 190, 440) * compScale },
            w2: { kh: seededRand(73, 250, 500) * compScale, th: seededRand(74, 260, 520) * compScale },
            w3: { kh: seededRand(75, 220, 480) * compScale, th: seededRand(76, 210, 470) * compScale },
            w4: { kh: seededRand(77, 300, 600) * compScale, th: seededRand(78, 290, 610) * compScale },
            w5: { kh: seededRand(79, 150, 300) * compScale, th: seededRand(80, 140, 310) * compScale }
        };

        // Lương chi vào tuần 1 và tuần 3
        rows['C_I_3'] = {
            dauKy: 0,
            w1: { kh: seededRand(81, 700, 1200) * compScale, th: seededRand(82, 710, 1220) * compScale },
            w2: { kh: 0, th: 0 },
            w3: { kh: seededRand(83, 600, 1000) * compScale, th: seededRand(84, 590, 1010) * compScale },
            w4: { kh: 0, th: 0 },
            w5: { kh: 0, th: 0 }
        };

        // Thuế nộp vào tuần 3 hoặc 4
        rows['C_I_4'] = {
            dauKy: 0,
            w1: { kh: 0, th: 0 },
            w2: { kh: 0, th: 0 },
            w3: { kh: seededRand(85, 200, 500) * compScale, th: seededRand(86, 220, 520) * compScale },
            w4: { kh: seededRand(87, 300, 700) * compScale, th: seededRand(88, 310, 690) * compScale },
            w5: { kh: 0, th: 0 }
        };

        rows['C_I_5'] = {
            dauKy: 0,
            w1: { kh: seededRand(91, 150, 300) * compScale, th: seededRand(92, 140, 320) * compScale },
            w2: { kh: seededRand(93, 160, 320) * compScale, th: seededRand(94, 170, 330) * compScale },
            w3: { kh: seededRand(95, 140, 290) * compScale, th: seededRand(96, 150, 300) * compScale },
            w4: { kh: seededRand(97, 180, 360) * compScale, th: seededRand(98, 190, 370) * compScale },
            w5: { kh: seededRand(99, 100, 200) * compScale, th: seededRand(100, 95, 210) * compScale }
        };

        rows['C_I_6'] = {
            dauKy: 0,
            w1: { kh: seededRand(101, 80, 160) * compScale, th: seededRand(102, 70, 180) * compScale },
            w2: { kh: seededRand(103, 90, 180) * compScale, th: seededRand(104, 85, 175) * compScale },
            w3: { kh: seededRand(105, 80, 150) * compScale, th: seededRand(106, 95, 160) * compScale },
            w4: { kh: seededRand(107, 100, 210) * compScale, th: seededRand(108, 110, 220) * compScale },
            w5: { kh: seededRand(109, 50, 110) * compScale, th: seededRand(110, 45, 120) * compScale }
        };

        rows['C_II_1'] = {
            dauKy: 0,
            w1: { kh: 0, th: 0 },
            w2: { kh: seededRand(111, 100, 400) * compScale, th: seededRand(112, 120, 380) * compScale },
            w3: { kh: 0, th: 0 },
            w4: { kh: seededRand(113, 200, 600) * compScale, th: seededRand(114, 180, 590) * compScale },
            w5: { kh: 0, th: 0 }
        };

        rows['C_II_2'] = {
            dauKy: 0,
            w1: { kh: 0, th: 0 },
            w2: { kh: 0, th: 0 },
            w3: { kh: seededRand(115, 0, 200) * compScale, th: seededRand(116, 0, 200) * compScale },
            w4: { kh: 0, th: 0 },
            w5: { kh: 0, th: 0 }
        };

        rows['C_III_1'] = {
            dauKy: 0,
            w1: { kh: 0, th: 0 },
            w2: { kh: seededRand(121, 300, 800) * compScale, th: seededRand(122, 300, 800) * compScale },
            w3: { kh: 0, th: 0 },
            w4: { kh: seededRand(123, 400, 900) * compScale, th: seededRand(124, 400, 900) * compScale },
            w5: { kh: 0, th: 0 }
        };

        rows['C_III_2'] = {
            dauKy: 0,
            w1: { kh: 0, th: 0 },
            w2: { kh: 0, th: 0 },
            w3: { kh: 0, th: 0 },
            w4: { kh: seededRand(125, 80, 220) * compScale, th: seededRand(126, 85, 225) * compScale },
            w5: { kh: 0, th: 0 }
        };

        rows['C_III_3'] = {
            dauKy: 0,
            w1: { kh: 0, th: 0 },
            w2: { kh: 0, th: 0 },
            w3: { kh: seededRand(127, 100, 350) * compScale, th: seededRand(128, 100, 350) * compScale },
            w4: { kh: 0, th: 0 },
            w5: { kh: 0, th: 0 }
        };

        // Hạn mức dự trữ an toàn (Safety Cash Buffer F)
        const safetyBuffer = Math.round(seededRand(131, 2500, 4500) * compScale);
        rows['F'] = {
            dauKy: safetyBuffer,
            w1: { kh: safetyBuffer, th: safetyBuffer },
            w2: { kh: safetyBuffer, th: safetyBuffer },
            w3: { kh: safetyBuffer, th: safetyBuffer },
            w4: { kh: safetyBuffer, th: safetyBuffer },
            w5: { kh: safetyBuffer, th: safetyBuffer }
        };

        return rows;
    }

    window.CashflowModule = {
        selectedCompany: 'all',
        selectedMonth: 7, // Mặc định Tháng 7/2026
        viewMode: 'full', // 'full' (Đầy đủ 5 tuần + Tổng), 'summary' (Chỉ tổng tháng), 'core' (Chỉ tiêu trọng yếu A, B, C, D, E, F, G)
        filterSearch: '',
        charts: {},
        dataCache: {},

        init() {
            this.renderStructure();
            this.bindEvents();
            this.render();
        },

        renderStructure() {
            const container = document.getElementById('view-cashflow');
            if (!container) return;

            container.innerHTML = `
                <div class="cashflow-dashboard-wrapper" style="padding: 20px; max-width: 100%; box-sizing: border-box; background: #f8fafc;">
                    
                    <!-- 1. Header Banner & Filter Controls -->
                    <div class="cashflow-header card" style="border-radius: 12px; margin-bottom: 20px; border-left: 5px solid #0284c7; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                        <div class="card-body" style="padding: 16px 20px;">
                            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 15px;">
                                <div>
                                    <div style="display: flex; align-items: center; gap: 10px;">
                                        <span style="background: #e0f2fe; color: #0284c7; padding: 6px 12px; border-radius: 8px; font-weight: 700; font-size: 0.85rem; display: inline-flex; align-items: center; gap: 5px;">
                                            <i data-lucide="wallet" style="width:16px; height:16px;"></i> DASHBOARD 14
                                        </span>
                                        <h2 style="margin: 0; font-size: 1.45rem; color: #0f172a; font-weight: 700;">BÁO CÁO KẾ HOẠCH DÒNG TIỀN</h2>
                                    </div>
                                    <p style="margin: 4px 0 0 0; color: #64748b; font-size: 0.85rem;">
                                        Kế hoạch và báo cáo lưu chuyển dòng tiền Tuần - Tháng / 2026 • Ban Tài chính Kế toán Tập đoàn VPS
                                    </p>
                                </div>

                                <!-- Actions Toolbar -->
                                <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
                                    <button id="cf-btn-export" class="btn btn-sm" style="background: #10b981; color: white; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                                        <i data-lucide="download" style="width: 15px; height: 15px;"></i> Xuất Excel / CSV
                                    </button>
                                    <button id="cf-btn-template" class="btn btn-sm" style="background: #6366f1; color: white; border: none; padding: 8px 14px; border-radius: 6px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                                        <i data-lucide="file-spreadsheet" style="width: 15px; height: 15px;"></i> Mẫu Nhập Liệu Tuần
                                    </button>
                                    <button id="cf-btn-print" class="btn btn-sm btn-secondary" style="padding: 8px 14px; border-radius: 6px; font-weight: 600; display: inline-flex; align-items: center; gap: 6px; cursor: pointer;">
                                        <i data-lucide="printer" style="width: 15px; height: 15px;"></i> In Báo Cáo
                                    </button>
                                </div>
                            </div>

                            <!-- Filter Toolbar -->
                            <div style="display: flex; gap: 15px; margin-top: 15px; padding-top: 15px; border-top: 1px solid #e2e8f0; flex-wrap: wrap; align-items: center;">
                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label style="font-size: 0.82rem; font-weight: 600; color: #475569;">Đơn vị thành viên:</label>
                                    <select id="cf-company-select" class="form-control" style="width: 260px; padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 600; color: #1e293b;" ${!window.AuthService.canViewAll() ? 'disabled' : ''}>
                                        ${(window.AuthService.canViewAll() ? COMPANIES : COMPANIES.filter(c => c.id === this.selectedCompany || c.name.includes(this.selectedCompany) || c.id === window.AuthService.getAllowedCompany())).map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                                    </select>
                                </div>

                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label style="font-size: 0.82rem; font-weight: 600; color: #475569;">Kỳ báo cáo:</label>
                                    <select id="cf-month-select" class="form-control" style="width: 150px; padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 600; color: #1e293b;">
                                        ${Array.from({length: 12}, (_, i) => `<option value="${i+1}" ${i+1 === 7 ? 'selected' : ''}>Tháng ${i+1}/2026</option>`).join('')}
                                    </select>
                                </div>

                                <div style="display: flex; align-items: center; gap: 8px;">
                                    <label style="font-size: 0.82rem; font-weight: 600; color: #475569;">Chế độ hiển thị:</label>
                                    <select id="cf-viewmode-select" class="form-control" style="width: 190px; padding: 6px 12px; font-size: 0.85rem; border-radius: 6px; border: 1px solid #cbd5e1; font-weight: 500;">
                                        <option value="full">Đầy đủ 5 tuần & Tổng tháng</option>
                                        <option value="summary">Rút gọn (Tổng KH vs TH)</option>
                                        <option value="core">Chỉ tiêu trọng yếu (A,B,C,D,E,F,G)</option>
                                    </select>
                                </div>

                                <div style="margin-left: auto; position: relative;">
                                    <input type="text" id="cf-search-input" placeholder="Tìm kiếm khoản thu/chi..." style="padding: 6px 12px 6px 32px; border-radius: 6px; border: 1px solid #cbd5e1; font-size: 0.82rem; width: 220px;">
                                    <i data-lucide="search" style="position: absolute; left: 10px; top: 8px; width: 14px; height: 14px; color: #94a3b8;"></i>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- 2. Executive Summary KPI Cards (Glassmorphism design) -->
                    <div id="cf-kpi-container" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-bottom: 20px;">
                        <!-- KPI Cards injected here -->
                    </div>

                    <!-- 3. Dynamic Charts (Chart.js) -->
                    <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 15px; margin-bottom: 20px;">
                        <!-- Biểu đồ 1: Dòng tiền Vào vs Ra theo tuần (Kế hoạch vs Thực hiện) -->
                        <div class="card" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-bottom: 1px solid #f1f5f9;">
                                <h3 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                                    <i data-lucide="bar-chart-3" style="width: 16px; height: 16px; color: #0284c7;"></i>
                                    Tiến Độ Dòng Tiền Vào (Thu) vs Ra (Chi) Qua 5 Tuần
                                </h3>
                                <span style="font-size: 0.75rem; color: #64748b; font-weight: 500;">Đơn vị: Triệu VNĐ</span>
                            </div>
                            <div class="card-body" style="padding: 15px;">
                                <div style="height: 240px; position: relative;">
                                    <canvas id="cf-chart-in-out"></canvas>
                                </div>
                            </div>
                        </div>

                        <!-- Biểu đồ 2: Cơ cấu dòng tiền ra -->
                        <div class="card" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.04);">
                            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-bottom: 1px solid #f1f5f9;">
                                <h3 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                                    <i data-lucide="pie-chart" style="width: 16px; height: 16px; color: #f59e0b;"></i>
                                    Cơ Cấu Dòng Tiền Chi
                                </h3>
                                <span style="font-size: 0.75rem; color: #64748b;">Tổng tháng</span>
                            </div>
                            <div class="card-body" style="padding: 15px;">
                                <div style="height: 240px; position: relative;">
                                    <canvas id="cf-chart-structure"></canvas>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Biểu đồ 3: Xu hướng Số dư tiền mặt & Ngưỡng an toàn Buffer -->
                    <div class="card" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.04); margin-bottom: 20px;">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 12px 18px; border-bottom: 1px solid #f1f5f9;">
                            <h3 style="margin: 0; font-size: 0.95rem; font-weight: 700; color: #1e293b; display: flex; align-items: center; gap: 8px;">
                                <i data-lucide="trending-up" style="width: 16px; height: 16px; color: #10b981;"></i>
                                Giám Sát Số Dư Tiền Cuối Tuần vs Hạn Mức An Toàn (Safety Buffer)
                            </h3>
                            <span id="cf-buffer-badge" style="font-size: 0.78rem; padding: 3px 10px; border-radius: 20px; font-weight: 600; background: #dcfce7; color: #15803d;">
                                Trạng thái: An toàn dòng tiền
                            </span>
                        </div>
                        <div class="card-body" style="padding: 15px;">
                            <div style="height: 180px; position: relative;">
                                <canvas id="cf-chart-balance"></canvas>
                            </div>
                        </div>
                    </div>

                    <!-- 4. Detailed Cash Flow Matrix Table (Bám sát 100% biểu mẫu ảnh) -->
                    <div class="card" style="border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.04); overflow: hidden;">
                        <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; background: #ffffff; border-bottom: 2px solid #e2e8f0;">
                            <div>
                                <h3 id="cf-table-title" style="margin: 0; font-size: 1.05rem; font-weight: 700; color: #0f172a;">
                                    BẢNG KẾ HOẠCH VÀ BÁO CÁO DÒNG TIỀN CHI TIẾT
                                </h3>
                                <p id="cf-table-subtitle" style="margin: 3px 0 0 0; font-size: 0.8rem; color: #64748b;">
                                    Đơn vị: TOÀN TẬP ĐOÀN VPS • Kỳ báo cáo: Tháng 07/2026 • Đơn vị tính: Triệu đồng (VNĐ)
                                </p>
                            </div>
                            <div style="display: flex; gap: 8px;">
                                <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; color: #475569;">
                                    <span style="width: 10px; height: 10px; background: #dbeafe; border-radius: 2px; display: inline-block;"></span> Dòng tiền vào (Thu)
                                </span>
                                <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; color: #475569;">
                                    <span style="width: 10px; height: 10px; background: #fee2e2; border-radius: 2px; display: inline-block;"></span> Dòng tiền ra (Chi)
                                </span>
                                <span style="display: inline-flex; align-items: center; gap: 5px; font-size: 0.75rem; background: #f1f5f9; padding: 4px 8px; border-radius: 4px; color: #475569;">
                                    <span style="width: 10px; height: 10px; background: #fef08a; border-radius: 2px; display: inline-block;"></span> Điều tiết cần chú ý
                                </span>
                            </div>
                        </div>

                        <!-- Table Scroll Wrapper -->
                        <div class="table-responsive" style="max-height: 650px; overflow-y: auto; -webkit-overflow-scrolling: touch;">
                            <table id="cf-matrix-table" class="data-table" style="width: 100%; border-collapse: separate; border-spacing: 0; font-size: 0.82rem;">
                                <!-- Table Head & Body rendered by JS -->
                            </table>
                        </div>

                        <!-- Table Footer Notes -->
                        <div style="padding: 10px 20px; background: #f8fafc; border-top: 1px solid #e2e8f0; font-size: 0.75rem; color: #64748b; display: flex; justify-content: space-between;">
                            <span>(*) Dòng tiền nội bộ phát sinh giữa các đơn vị thành viên và Tổng công ty VPS.</span>
                            <span>Số liệu được tự động tính toán tổng hợp theo nguyên tắc kế toán quản trị dòng tiền.</span>
                        </div>
                    </div>

                    <!-- Quick Input & Template Modal -->
                    <div id="cf-modal-template" class="hidden" style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(15, 23, 42, 0.6); z-index: 9999; display: flex; align-items: center; justify-content: center; backdrop-filter: blur(4px);">
                        <div class="card" style="width: 650px; max-width: 92%; max-height: 90vh; overflow-y: auto; border-radius: 12px; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.2);">
                            <div class="card-header" style="display: flex; justify-content: space-between; align-items: center; padding: 16px 20px; border-bottom: 1px solid #e2e8f0;">
                                <h3 style="margin: 0; font-size: 1.1rem; color: #0f172a; font-weight: 700; display: flex; align-items: center; gap: 8px;">
                                    <i data-lucide="file-spreadsheet" style="color: #6366f1;"></i> Hướng Dẫn & Mẫu Nhập Liệu Dòng Tiền Tuần
                                </h3>
                                <button id="cf-modal-close" style="background: none; border: none; font-size: 1.5rem; color: #94a3b8; cursor: pointer; line-height: 1;">&times;</button>
                            </div>
                            <div class="card-body" style="padding: 20px; font-size: 0.88rem; line-height: 1.6; color: #334155;">
                                <div style="background: #eef2ff; border-left: 4px solid #6366f1; padding: 12px 15px; border-radius: 6px; margin-bottom: 15px;">
                                    <strong style="color: #3730a3;">Quy trình báo cáo dòng tiền tuần định kỳ:</strong><br>
                                    Hàng tuần, trước 17h00 ngày Thứ Sáu, Trưởng phòng/Kế toán trưởng các đơn vị thành viên (Tân Hồng Hà, Việt, XESCO, VPS M, ITSS, VP VPS) nhập số liệu Thực hiện tuần qua và Kế hoạch tuần tiếp theo vào biểu mẫu chuẩn để Ban Tài chính Kế toán tổng hợp điều tiết vốn.
                                </div>
                                
                                <h4 style="margin: 15px 0 8px 0; color: #0f172a; font-size: 0.95rem;">1. Cấu trúc file nhập liệu gồm 10 cột:</h4>
                                <ul style="padding-left: 20px; margin: 0 0 15px 0;">
                                    <li><b>Cột 1-2:</b> STT và Nội dung chỉ tiêu dòng tiền theo đúng mẫu chuẩn.</li>
                                    <li><b>Cột 3:</b> Số dư tiền đầu kỳ (Tiền mặt + Tiền gửi ngân hàng).</li>
                                    <li><b>Cột 4 - 8:</b> Dữ liệu Tuần 1, Tuần 2, Tuần 3, Tuần 4, Tuần 5 (Kế hoạch / Thực hiện).</li>
                                    <li><b>Cột 9 - 10:</b> Tổng cộng tháng và Chênh lệch (TH - KH) tự động cộng tính.</li>
                                </ul>

                                <h4 style="margin: 15px 0 8px 0; color: #0f172a; font-size: 0.95rem;">2. Quy ước công thức trọng yếu:</h4>
                                <ul style="padding-left: 20px; margin: 0 0 15px 0;">
                                    <li><b>Lưu chuyển tiền thuần (D)</b> = Tổng Thu (B) - Tổng Chi (C)</li>
                                    <li><b>Số dư tiền cuối kỳ (E)</b> = Số dư đầu kỳ (A) + Lưu chuyển tiền thuần (D)</li>
                                    <li><b>Thặng dư / Thiếu hụt (G)</b> = Số dư cuối kỳ (E) - Hạn mức tối thiểu (F)</li>
                                </ul>

                                <div style="display: flex; gap: 10px; margin-top: 20px; justify-content: flex-end;">
                                    <button id="cf-btn-download-sample" class="btn btn-primary" style="display: flex; align-items: center; gap: 6px;">
                                        <i data-lucide="download"></i> Tải File Mẫu Excel (.CSV)
                                    </button>
                                    <button id="cf-modal-btn-ok" class="btn btn-secondary">Đóng</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            `;

            if (window.lucide) window.lucide.createIcons();
        },

        bindEvents() {
            const compSelect = document.getElementById('cf-company-select');
            if (compSelect) {
                compSelect.addEventListener('change', (e) => {
                    if (!window.AuthService.canViewAll()) {
                        this.selectedCompany = window.AuthService.getAllowedCompany();
                        compSelect.value = this.selectedCompany;
                    } else {
                        this.selectedCompany = e.target.value;
                    }
                    this.render();
                });
            }

            // Sync with global company filter
            document.addEventListener('vps_filter_changed', (e) => {
                if (e.detail && e.detail.company) {
                    if (!window.AuthService.canViewAll()) {
                        this.selectedCompany = window.AuthService.getAllowedCompany();
                    } else {
                        this.selectedCompany = e.detail.company;
                    }
                    const sel = document.getElementById('cf-company-select');
                    if (sel) sel.value = this.selectedCompany;
                    const viewEl = document.getElementById('view-cashflow');
                    if (viewEl && !viewEl.classList.contains('hidden')) {
                        this.render();
                    }
                }
            });

            const monthSelect = document.getElementById('cf-month-select');
            if (monthSelect) {
                monthSelect.addEventListener('change', (e) => {
                    this.selectedMonth = parseInt(e.target.value, 10);
                    this.render();
                });
            }

            const modeSelect = document.getElementById('cf-viewmode-select');
            if (modeSelect) {
                modeSelect.addEventListener('change', (e) => {
                    this.viewMode = e.target.value;
                    this.render();
                });
            }

            const searchInput = document.getElementById('cf-search-input');
            if (searchInput) {
                searchInput.addEventListener('input', (e) => {
                    this.filterSearch = e.target.value.trim().toLowerCase();
                    this.renderTableOnly();
                });
            }

            const btnExport = document.getElementById('cf-btn-export');
            if (btnExport) {
                btnExport.addEventListener('click', () => this.exportExcel());
            }

            const btnTemplate = document.getElementById('cf-btn-template');
            const modal = document.getElementById('cf-modal-template');
            const modalClose = document.getElementById('cf-modal-close');
            const modalOk = document.getElementById('cf-modal-btn-ok');
            const btnDownloadSample = document.getElementById('cf-btn-download-sample');

            if (btnTemplate && modal) {
                btnTemplate.addEventListener('click', () => modal.classList.remove('hidden'));
            }
            if (modalClose && modal) {
                modalClose.addEventListener('click', () => modal.classList.add('hidden'));
            }
            if (modalOk && modal) {
                modalOk.addEventListener('click', () => modal.classList.add('hidden'));
            }
            if (btnDownloadSample) {
                btnDownloadSample.addEventListener('click', () => this.exportExcel(true));
            }

            const btnPrint = document.getElementById('cf-btn-print');
            if (btnPrint) {
                btnPrint.addEventListener('click', () => window.print());
            }
        },

        // Tính toán toàn bộ bảng dòng tiền cho công ty và tháng đã chọn
        calculateData() {
            const cacheKey = `${this.selectedCompany}_${this.selectedMonth}`;
            if (!this.dataCache[cacheKey]) {
                this.dataCache[cacheKey] = generateMockData(this.selectedCompany, this.selectedMonth);
            }
            const raw = this.dataCache[cacheKey];
            const data = JSON.parse(JSON.stringify(raw));

            // Hàm tính tổng các subIds
            const sumIds = (subIds, field, subField) => {
                let s = 0;
                subIds.forEach(id => {
                    if (data[id]) {
                        if (subField) s += (data[id][field]?.[subField] || 0);
                        else s += (data[id][field] || 0);
                    }
                });
                return Math.round(s * 10) / 10;
            };

            // 1. Tính A (Số dư đầu kỳ)
            data['A'] = {
                dauKy: (data['A1']?.dauKy || 0) + (data['A2']?.dauKy || 0),
                w1: { kh: 0, th: 0 },
                w2: { kh: 0, th: 0 },
                w3: { kh: 0, th: 0 },
                w4: { kh: 0, th: 0 },
                w5: { kh: 0, th: 0 }
            };

            const weeks = ['w1', 'w2', 'w3', 'w4', 'w5'];

            // 2. Tính B_I_SUM, B_II_SUM, B_TOTAL
            const b_i_subs = ['B_I_1', 'B_I_2', 'B_I_3'];
            data['B_I_SUM'] = { dauKy: 0 };
            weeks.forEach(w => {
                data['B_I_SUM'][w] = {
                    kh: sumIds(b_i_subs, w, 'kh'),
                    th: sumIds(b_i_subs, w, 'th')
                };
            });

            const b_ii_subs = ['B_II_1', 'B_II_2', 'B_II_3'];
            data['B_II_SUM'] = { dauKy: 0 };
            weeks.forEach(w => {
                data['B_II_SUM'][w] = {
                    kh: sumIds(b_ii_subs, w, 'kh'),
                    th: sumIds(b_ii_subs, w, 'th')
                };
            });

            data['B_TOTAL'] = { dauKy: 0 };
            weeks.forEach(w => {
                data['B_TOTAL'][w] = {
                    kh: Math.round((data['B_I_SUM'][w].kh + data['B_II_SUM'][w].kh) * 10) / 10,
                    th: Math.round((data['B_I_SUM'][w].th + data['B_II_SUM'][w].th) * 10) / 10
                };
            });

            // 3. Tính C_I_SUM, C_II_SUM, C_III_SUM, C_TOTAL
            const c_i_subs = ['C_I_1', 'C_I_2', 'C_I_3', 'C_I_4', 'C_I_5', 'C_I_6'];
            data['C_I_SUM'] = { dauKy: 0 };
            weeks.forEach(w => {
                data['C_I_SUM'][w] = {
                    kh: sumIds(c_i_subs, w, 'kh'),
                    th: sumIds(c_i_subs, w, 'th')
                };
            });

            const c_ii_subs = ['C_II_1', 'C_II_2'];
            data['C_II_SUM'] = { dauKy: 0 };
            weeks.forEach(w => {
                data['C_II_SUM'][w] = {
                    kh: sumIds(c_ii_subs, w, 'kh'),
                    th: sumIds(c_ii_subs, w, 'th')
                };
            });

            const c_iii_subs = ['C_III_1', 'C_III_2', 'C_III_3'];
            data['C_III_SUM'] = { dauKy: 0 };
            weeks.forEach(w => {
                data['C_III_SUM'][w] = {
                    kh: sumIds(c_iii_subs, w, 'kh'),
                    th: sumIds(c_iii_subs, w, 'th')
                };
            });

            data['C_TOTAL'] = { dauKy: 0 };
            weeks.forEach(w => {
                data['C_TOTAL'][w] = {
                    kh: Math.round((data['C_I_SUM'][w].kh + data['C_II_SUM'][w].kh + data['C_III_SUM'][w].kh) * 10) / 10,
                    th: Math.round((data['C_I_SUM'][w].th + data['C_II_SUM'][w].th + data['C_III_SUM'][w].th) * 10) / 10
                };
            });

            // 4. Tính D (Lưu chuyển thuần = B - C)
            data['D'] = { dauKy: 0 };
            weeks.forEach(w => {
                data['D'][w] = {
                    kh: Math.round((data['B_TOTAL'][w].kh - data['C_TOTAL'][w].kh) * 10) / 10,
                    th: Math.round((data['B_TOTAL'][w].th - data['C_TOTAL'][w].th) * 10) / 10
                };
            });

            // 5. Tính E (Số dư cuối kỳ = Số dư đầu kỳ + Lũy kế D)
            data['E'] = { dauKy: data['A'].dauKy };
            let rollingKh = data['A'].dauKy;
            let rollingTh = data['A'].dauKy;
            weeks.forEach(w => {
                rollingKh = Math.round((rollingKh + data['D'][w].kh) * 10) / 10;
                rollingTh = Math.round((rollingTh + data['D'][w].th) * 10) / 10;
                data['E'][w] = { kh: rollingKh, th: rollingTh };
            });

            // 6. Tính G (Thặng dư/Thiếu hụt = E - F)
            data['G'] = { dauKy: Math.round((data['E'].dauKy - (data['F']?.dauKy || 0)) * 10) / 10 };
            weeks.forEach(w => {
                const f_kh = data['F']?.[w]?.kh || 0;
                const f_th = data['F']?.[w]?.th || 0;
                data['G'][w] = {
                    kh: Math.round((data['E'][w].kh - f_kh) * 10) / 10,
                    th: Math.round((data['E'][w].th - f_th) * 10) / 10
                };
            });

            // 7. Tính TỔNG CỘNG THÁNG & CHÊNH LỆCH (TH - KH) cho tất cả các dòng
            CASHFLOW_ITEMS.forEach(item => {
                if (item.isTitleOnly) return;
                const row = data[item.id] || { dauKy: 0, w1: {kh:0,th:0}, w2: {kh:0,th:0}, w3: {kh:0,th:0}, w4: {kh:0,th:0}, w5: {kh:0,th:0} };
                
                let tot_kh = 0;
                let tot_th = 0;

                if (item.id === 'A' || item.id === 'A1' || item.id === 'A2') {
                    // Số dư đầu kỳ: tổng tháng chính là số dư đầu kỳ
                    tot_kh = row.dauKy;
                    tot_th = row.dauKy;
                } else if (item.id === 'E' || item.id === 'F' || item.id === 'G') {
                    // Số dư cuối kỳ / Buffer / Điều tiết: tổng tháng lấy giá trị chốt cuối kỳ (tuần 5)
                    tot_kh = row.w5?.kh || 0;
                    tot_th = row.w5?.th || 0;
                } else {
                    // Các khoản thu, chi, lưu chuyển thuần: cộng dồn 5 tuần
                    weeks.forEach(w => {
                        tot_kh += (row[w]?.kh || 0);
                        tot_th += (row[w]?.th || 0);
                    });
                }

                tot_kh = Math.round(tot_kh * 10) / 10;
                tot_th = Math.round(tot_th * 10) / 10;
                const chenhLech = Math.round((tot_th - tot_kh) * 10) / 10;

                row.monthTot = { kh: tot_kh, th: tot_th, diff: chenhLech };
                data[item.id] = row;
            });

            return data;
        },

        formatNumber(val, allowZero = false) {
            if (val === null || val === undefined || isNaN(val)) return '-';
            if (val === 0 && !allowZero) return '-';
            return new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 1 }).format(val);
        },

        render() {
            const data = this.calculateData();
            this.renderKpis(data);
            this.renderCharts(data);
            this.renderTableOnly(data);
        },

        renderKpis(data) {
            const container = document.getElementById('cf-kpi-container');
            if (!container) return;

            const openingCash = data['A']?.dauKy || 0;
            const totalIn = data['B_TOTAL']?.monthTot?.th || 0;
            const totalInKh = data['B_TOTAL']?.monthTot?.kh || 0;
            const inRate = totalInKh > 0 ? Math.round((totalIn / totalInKh) * 100) : 100;

            const totalOut = data['C_TOTAL']?.monthTot?.th || 0;
            const totalOutKh = data['C_TOTAL']?.monthTot?.kh || 0;
            const outRate = totalOutKh > 0 ? Math.round((totalOut / totalOutKh) * 100) : 100;

            const netCash = data['D']?.monthTot?.th || 0;
            const closingCash = data['E']?.monthTot?.th || 0;
            const safetyBuffer = data['F']?.dauKy || 0;
            const bufferDiff = data['G']?.monthTot?.th || 0;

            const isHealthy = bufferDiff >= 0;

            container.innerHTML = `
                <!-- KPI 1: Số dư đầu kỳ -->
                <div class="card" style="border-radius: 10px; padding: 15px; border-left: 4px solid #3b82f6; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Số Dư Đầu Kỳ</span>
                            <h3 style="margin: 6px 0 2px 0; font-size: 1.35rem; color: #1e293b; font-weight: 700;">
                                ${this.formatNumber(openingCash, true)} <span style="font-size: 0.8rem; font-weight: normal; color: #64748b;">Tr.đ</span>
                            </h3>
                        </div>
                        <div style="background: #eff6ff; color: #3b82f6; padding: 8px; border-radius: 8px;">
                            <i data-lucide="landmark" style="width: 20px; height: 20px;"></i>
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 6px;">
                        Quỹ: <b>${this.formatNumber(data['A1']?.dauKy || 0)}</b> • NH: <b>${this.formatNumber(data['A2']?.dauKy || 0)}</b>
                    </div>
                </div>

                <!-- KPI 2: Tổng Dòng tiền vào (Thu) -->
                <div class="card" style="border-radius: 10px; padding: 15px; border-left: 4px solid #10b981; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Tổng Dòng Tiền Vào</span>
                            <h3 style="margin: 6px 0 2px 0; font-size: 1.35rem; color: #059669; font-weight: 700;">
                                ${this.formatNumber(totalIn, true)} <span style="font-size: 0.8rem; font-weight: normal; color: #64748b;">Tr.đ</span>
                            </h3>
                        </div>
                        <div style="background: #ecfdf5; color: #10b981; padding: 8px; border-radius: 8px;">
                            <i data-lucide="arrow-down-left" style="width: 20px; height: 20px;"></i>
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; color: #059669; margin-top: 6px;">
                        Đạt <b>${inRate}%</b> so với Kế hoạch (${this.formatNumber(totalInKh)})
                    </div>
                </div>

                <!-- KPI 3: Tổng Dòng tiền ra (Chi) -->
                <div class="card" style="border-radius: 10px; padding: 15px; border-left: 4px solid #f43f5e; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Tổng Dòng Tiền Ra</span>
                            <h3 style="margin: 6px 0 2px 0; font-size: 1.35rem; color: #e11d48; font-weight: 700;">
                                ${this.formatNumber(totalOut, true)} <span style="font-size: 0.8rem; font-weight: normal; color: #64748b;">Tr.đ</span>
                            </h3>
                        </div>
                        <div style="background: #fff1f2; color: #f43f5e; padding: 8px; border-radius: 8px;">
                            <i data-lucide="arrow-up-right" style="width: 20px; height: 20px;"></i>
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; color: ${totalOut <= totalOutKh ? '#059669' : '#e11d48'}; margin-top: 6px;">
                        Chi <b>${outRate}%</b> ngân sách Kế hoạch (${this.formatNumber(totalOutKh)})
                    </div>
                </div>

                <!-- KPI 4: Lưu chuyển tiền thuần (D = B - C) -->
                <div class="card" style="border-radius: 10px; padding: 15px; border-left: 4px solid ${netCash >= 0 ? '#0284c7' : '#ea580c'}; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Lưu Chuyển Thuần (D)</span>
                            <h3 style="margin: 6px 0 2px 0; font-size: 1.35rem; color: ${netCash >= 0 ? '#0284c7' : '#ea580c'}; font-weight: 700;">
                                ${netCash >= 0 ? '+' : ''}${this.formatNumber(netCash, true)} <span style="font-size: 0.8rem; font-weight: normal; color: #64748b;">Tr.đ</span>
                            </h3>
                        </div>
                        <div style="background: ${netCash >= 0 ? '#f0f9ff' : '#fff7ed'}; color: ${netCash >= 0 ? '#0284c7' : '#ea580c'}; padding: 8px; border-radius: 8px;">
                            <i data-lucide="${netCash >= 0 ? 'trending-up' : 'trending-down'}" style="width: 20px; height: 20px;"></i>
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 6px;">
                        ${netCash >= 0 ? 'Thặng dư dòng tiền trong kỳ' : 'Dòng tiền thuần âm trong kỳ'}
                    </div>
                </div>

                <!-- KPI 5: Số dư tiền cuối kỳ (E = A + D) -->
                <div class="card" style="border-radius: 10px; padding: 15px; border-left: 4px solid #8b5cf6; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Số Dư Tiền Cuối Kỳ</span>
                            <h3 style="margin: 6px 0 2px 0; font-size: 1.35rem; color: #6d28d9; font-weight: 700;">
                                ${this.formatNumber(closingCash, true)} <span style="font-size: 0.8rem; font-weight: normal; color: #64748b;">Tr.đ</span>
                            </h3>
                        </div>
                        <div style="background: #f5f3ff; color: #8b5cf6; padding: 8px; border-radius: 8px;">
                            <i data-lucide="piggy-bank" style="width: 20px; height: 20px;"></i>
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; color: #64748b; margin-top: 6px;">
                        Hạn mức an toàn: <b>${this.formatNumber(safetyBuffer)} Tr.đ</b>
                    </div>
                </div>

                <!-- KPI 6: Thặng dư / (Thiếu hụt) điều tiết (G = E - F) -->
                <div class="card" style="border-radius: 10px; padding: 15px; border-left: 4px solid ${isHealthy ? '#10b981' : '#dc2626'}; background: #ffffff; box-shadow: 0 2px 6px rgba(0,0,0,0.03);">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                        <div>
                            <span style="font-size: 0.75rem; color: #64748b; font-weight: 600; text-transform: uppercase;">Điều Tiết Dòng Tiền (G)</span>
                            <h3 style="margin: 6px 0 2px 0; font-size: 1.35rem; color: ${isHealthy ? '#15803d' : '#b91c1c'}; font-weight: 700;">
                                ${bufferDiff >= 0 ? '+' : ''}${this.formatNumber(bufferDiff, true)} <span style="font-size: 0.8rem; font-weight: normal; color: #64748b;">Tr.đ</span>
                            </h3>
                        </div>
                        <div style="background: ${isHealthy ? '#ecfdf5' : '#fef2f2'}; color: ${isHealthy ? '#10b981' : '#ef4444'}; padding: 8px; border-radius: 8px;">
                            <i data-lucide="${isHealthy ? 'shield-check' : 'alert-triangle'}" style="width: 20px; height: 20px;"></i>
                        </div>
                    </div>
                    <div style="font-size: 0.75rem; color: ${isHealthy ? '#15803d' : '#b91c1c'}; font-weight: 600; margin-top: 6px;">
                        ${isHealthy ? '✓ Thặng dư đảm bảo thanh khoản' : '⚠ Thiếu hụt cần Tập đoàn hỗ trợ'}
                    </div>
                </div>
            `;

            const badge = document.getElementById('cf-buffer-badge');
            if (badge) {
                if (isHealthy) {
                    badge.style.background = '#dcfce7';
                    badge.style.color = '#15803d';
                    badge.textContent = 'Trạng thái: An toàn dòng tiền';
                } else {
                    badge.style.background = '#fee2e2';
                    badge.style.color = '#b91c1c';
                    badge.textContent = 'Cảnh báo: Thiếu hụt cần điều tiết vốn';
                }
            }

            if (window.lucide) window.lucide.createIcons();
        },

        renderCharts(data) {
            const weeks = ['Tuần 1', 'Tuần 2', 'Tuần 3', 'Tuần 4', 'Tuần 5'];
            const wKeys = ['w1', 'w2', 'w3', 'w4', 'w5'];

            // 1. Biểu đồ Thu vs Chi qua 5 tuần
            const ctxInOut = document.getElementById('cf-chart-in-out');
            if (ctxInOut) {
                if (this.charts.inOut) this.charts.inOut.destroy();

                const inKh = wKeys.map(w => data['B_TOTAL']?.[w]?.kh || 0);
                const inTh = wKeys.map(w => data['B_TOTAL']?.[w]?.th || 0);
                const outKh = wKeys.map(w => data['C_TOTAL']?.[w]?.kh || 0);
                const outTh = wKeys.map(w => data['C_TOTAL']?.[w]?.th || 0);

                this.charts.inOut = new Chart(ctxInOut, {
                    type: 'bar',
                    data: {
                        labels: weeks,
                        datasets: [
                            {
                                label: 'Thu (Kế hoạch)',
                                data: inKh,
                                backgroundColor: 'rgba(16, 185, 129, 0.4)',
                                borderColor: '#10b981',
                                borderWidth: 1,
                                borderRadius: 4
                            },
                            {
                                label: 'Thu (Thực hiện)',
                                data: inTh,
                                backgroundColor: '#10b981',
                                borderRadius: 4
                            },
                            {
                                label: 'Chi (Kế hoạch)',
                                data: outKh,
                                backgroundColor: 'rgba(244, 63, 94, 0.4)',
                                borderColor: '#f43f5e',
                                borderWidth: 1,
                                borderRadius: 4
                            },
                            {
                                label: 'Chi (Thực hiện)',
                                data: outTh,
                                backgroundColor: '#f43f5e',
                                borderRadius: 4
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
                            tooltip: {
                                callbacks: {
                                    label: (ctx) => `${ctx.dataset.label}: ${new Intl.NumberFormat('vi-VN').format(ctx.raw)} Tr.đ`
                                }
                            }
                        },
                        scales: {
                            x: { grid: { display: false } },
                            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }
                        }
                    }
                });
            }

            // 2. Biểu đồ cơ cấu chi (SXKD, Đầu tư, Tài chính)
            const ctxStructure = document.getElementById('cf-chart-structure');
            if (ctxStructure) {
                if (this.charts.structure) this.charts.structure.destroy();

                const chiSXKD = data['C_I_SUM']?.monthTot?.th || 0;
                const chiDauTu = data['C_II_SUM']?.monthTot?.th || 0;
                const chiTaiChinh = data['C_III_SUM']?.monthTot?.th || 0;

                this.charts.structure = new Chart(ctxStructure, {
                    type: 'doughnut',
                    data: {
                        labels: ['Chi SXKD (I)', 'Chi Đầu Tư (II)', 'Chi Tài Chính (III)'],
                        datasets: [{
                            data: [chiSXKD, chiDauTu, chiTaiChinh],
                            backgroundColor: ['#3b82f6', '#f59e0b', '#8b5cf6'],
                            borderWidth: 2,
                            borderColor: '#ffffff'
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } },
                            tooltip: {
                                callbacks: {
                                    label: (ctx) => `${ctx.label}: ${new Intl.NumberFormat('vi-VN').format(ctx.raw)} Tr.đ`
                                }
                            }
                        },
                        cutout: '62%'
                    }
                });
            }

            // 3. Biểu đồ Số dư cuối kỳ vs Safety Buffer qua 5 tuần
            const ctxBalance = document.getElementById('cf-chart-balance');
            if (ctxBalance) {
                if (this.charts.balance) this.charts.balance.destroy();

                const labels = ['Đầu kỳ', ...weeks];
                const balances = [
                    data['E'].dauKy,
                    ...wKeys.map(w => data['E']?.[w]?.th || 0)
                ];
                const buffers = [
                    data['F'].dauKy,
                    ...wKeys.map(w => data['F']?.[w]?.th || 0)
                ];

                this.charts.balance = new Chart(ctxBalance, {
                    type: 'line',
                    data: {
                        labels: labels,
                        datasets: [
                            {
                                label: 'Số dư tiền thực tế (E)',
                                data: balances,
                                borderColor: '#0284c7',
                                backgroundColor: 'rgba(2, 132, 199, 0.12)',
                                fill: true,
                                tension: 0.3,
                                pointBackgroundColor: '#0284c7',
                                pointRadius: 4,
                                borderWidth: 2.5
                            },
                            {
                                label: 'Hạn mức tối thiểu an toàn (F)',
                                data: buffers,
                                borderColor: '#e11d48',
                                borderDash: [5, 5],
                                pointRadius: 0,
                                fill: false,
                                borderWidth: 2
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: { position: 'top', labels: { boxWidth: 12, font: { size: 11 } } },
                            tooltip: {
                                callbacks: {
                                    label: (ctx) => `${ctx.dataset.label}: ${new Intl.NumberFormat('vi-VN').format(ctx.raw)} Tr.đ`
                                }
                            }
                        },
                        scales: {
                            x: { grid: { display: false } },
                            y: { grid: { color: '#f1f5f9' }, ticks: { font: { size: 10 } } }
                        }
                    }
                });
            }
        },

        renderTableOnly(data) {
            if (!data) data = this.calculateData();
            const table = document.getElementById('cf-matrix-table');
            if (!table) return;

            const mStr = String(this.selectedMonth).padStart(2, '0');
            const compObj = COMPANIES.find(c => c.id === this.selectedCompany);
            const compName = compObj ? compObj.name : 'TOÀN TẬP ĐOÀN';

            const subtitle = document.getElementById('cf-table-subtitle');
            if (subtitle) {
                subtitle.textContent = `Đơn vị: ${compName} • Kỳ báo cáo: Tháng ${mStr}/2026 • Đơn vị tính: Triệu đồng (VNĐ)`;
            }

            const showFull = this.viewMode === 'full';
            const showSummary = this.viewMode === 'summary';
            const showCore = this.viewMode === 'core';

            // Sinh tiêu đề các cột theo mẫu
            let theadHtml = `
                <thead>
                    <tr style="background: #1e293b; color: #ffffff; text-align: center;">
                        <th rowspan="2" style="width: 45px; padding: 10px 4px; border: 1px solid #334155; position: sticky; top: 0; z-index: 20;">STT</th>
                        <th rowspan="2" style="min-width: 280px; padding: 10px 12px; border: 1px solid #334155; text-align: left; position: sticky; top: 0; z-index: 20;">NỘI DUNG DÒNG TIỀN</th>
                        <th rowspan="2" style="width: 95px; padding: 10px 6px; border: 1px solid #334155; position: sticky; top: 0; z-index: 20;">SỐ DƯ ĐẦU KỲ</th>
            `;

            if (showFull) {
                for (let i = 1; i <= 5; i++) {
                    theadHtml += `
                        <th colspan="2" style="border: 1px solid #334155; padding: 6px; font-size: 0.8rem; position: sticky; top: 0; z-index: 20;">Tuần ${i}</th>
                    `;
                }
            }

            theadHtml += `
                        <th colspan="2" style="border: 1px solid #334155; padding: 6px; font-size: 0.8rem; background: #0f172a; position: sticky; top: 0; z-index: 20;">TỔNG CỘNG THÁNG</th>
                        <th rowspan="2" style="width: 95px; padding: 10px 6px; border: 1px solid #334155; background: #0f172a; position: sticky; top: 0; z-index: 20;">CHÊNH LỆCH<br><span style="font-size:0.7rem;font-weight:normal;">(TH - KH)</span></th>
                    </tr>
                    <tr style="background: #334155; color: #f8fafc; font-size: 0.72rem; text-align: center;">
            `;

            if (showFull) {
                for (let i = 1; i <= 5; i++) {
                    theadHtml += `
                        <th style="width: 75px; padding: 6px 2px; border: 1px solid #475569; position: sticky; top: 38px; z-index: 20;">Kế hoạch</th>
                        <th style="width: 75px; padding: 6px 2px; border: 1px solid #475569; position: sticky; top: 38px; z-index: 20;">Thực hiện</th>
                    `;
                }
            }

            theadHtml += `
                        <th style="width: 85px; padding: 6px 2px; border: 1px solid #475569; background: #1e293b; position: sticky; top: 38px; z-index: 20;">Kế hoạch</th>
                        <th style="width: 85px; padding: 6px 2px; border: 1px solid #475569; background: #1e293b; position: sticky; top: 38px; z-index: 20;">Thực hiện</th>
                    </tr>
                </thead>
            `;

            // Sinh nội dung bảng theo danh sách CASHFLOW_ITEMS
            let tbodyHtml = '<tbody>';

            CASHFLOW_ITEMS.forEach((item, idx) => {
                // Filter search
                if (this.filterSearch && !item.name.toLowerCase().includes(this.filterSearch) && !item.stt.toLowerCase().includes(this.filterSearch)) {
                    return;
                }

                // Chế độ core: chỉ hiển thị các dòng trọng yếu A, B_TOTAL, C_TOTAL, D, E, F, G
                if (showCore && !['A', 'B_TOTAL', 'C_TOTAL', 'D', 'E', 'F', 'G'].includes(item.id)) {
                    return;
                }

                const row = data[item.id] || { dauKy: 0, w1: {kh:0,th:0}, w2: {kh:0,th:0}, w3: {kh:0,th:0}, w4: {kh:0,th:0}, w5: {kh:0,th:0}, monthTot: {kh:0,th:0,diff:0} };

                // Định dạng màu sắc hàng
                let rowBg = '#ffffff';
                let fontWeight = 'normal';
                let textColor = '#1e293b';

                if (item.isHeader) {
                    rowBg = '#f1f5f9';
                    fontWeight = '700';
                    textColor = '#0f172a';
                }
                if (item.isSubHeader) {
                    rowBg = '#f8fafc';
                    fontWeight = '600';
                    textColor = '#334155';
                }
                if (item.isSumRow) {
                    rowBg = '#f8fafc';
                    fontWeight = '600';
                    textColor = '#1e293b';
                }
                if (item.id === 'B_TOTAL') {
                    rowBg = '#e0f2fe'; // Xanh biển nhạt
                    fontWeight = '700';
                    textColor = '#0369a1';
                }
                if (item.id === 'C_TOTAL') {
                    rowBg = '#ffe4e6'; // Hồng đỏ nhạt
                    fontWeight = '700';
                    textColor = '#be123c';
                }
                if (item.id === 'D') {
                    rowBg = '#ecfdf5'; // Xanh lá nhạt
                    fontWeight = '700';
                    textColor = '#047857';
                }
                if (item.id === 'E') {
                    rowBg = '#f3e8ff'; // Tím nhạt
                    fontWeight = '700';
                    textColor = '#6d28d9';
                }
                if (item.id === 'G') {
                    rowBg = (row.monthTot?.th || 0) >= 0 ? '#dcfce7' : '#fee2e2'; // Xanh nếu thặng dư, đỏ nếu thiếu hụt
                    fontWeight = '700';
                    textColor = (row.monthTot?.th || 0) >= 0 ? '#15803d' : '#b91c1c';
                }

                tbodyHtml += `<tr style="background: ${rowBg}; font-weight: ${fontWeight}; color: ${textColor};">`;

                // Cột STT
                tbodyHtml += `<td style="text-align: center; border: 1px solid #e2e8f0; padding: 7px 4px;">${item.stt}</td>`;

                // Cột Nội dung dòng tiền
                const paddingLeft = item.isChild ? '28px' : (item.isSubHeader ? '14px' : '8px');
                tbodyHtml += `<td style="border: 1px solid #e2e8f0; padding: 7px 8px 7px ${paddingLeft};">${item.name}</td>`;

                // Nếu là dòng Title only (ví dụ B, C) thì các ô còn lại để trống hoặc gộp
                if (item.isTitleOnly) {
                    const colSpan = (showFull ? 13 : 3) + 1;
                    tbodyHtml += `<td colspan="${colSpan}" style="border: 1px solid #e2e8f0;"></td></tr>`;
                    return;
                }

                // Cột Số dư đầu kỳ
                const dauKyText = (item.id === 'A' || item.id === 'A1' || item.id === 'A2' || item.id === 'E' || item.id === 'F' || item.id === 'G') 
                    ? this.formatNumber(row.dauKy, true) : '-';
                tbodyHtml += `<td style="text-align: right; border: 1px solid #e2e8f0; padding: 7px 6px;">${dauKyText}</td>`;

                // 5 Tuần
                if (showFull) {
                    for (let i = 1; i <= 5; i++) {
                        const wKey = `w${i}`;
                        const khVal = row[wKey]?.kh;
                        const thVal = row[wKey]?.th;

                        tbodyHtml += `<td style="text-align: right; border: 1px solid #e2e8f0; padding: 7px 4px; color: #64748b;">${this.formatNumber(khVal)}</td>`;
                        tbodyHtml += `<td style="text-align: right; border: 1px solid #e2e8f0; padding: 7px 4px; font-weight: ${fontWeight !== 'normal' ? '700' : '600'};">${this.formatNumber(thVal)}</td>`;
                    }
                }

                // Cột Tổng cộng tháng (KH | TH)
                tbodyHtml += `<td style="text-align: right; border: 1px solid #cbd5e1; padding: 7px 6px; background: rgba(0,0,0,0.02); color: #475569;">${this.formatNumber(row.monthTot?.kh, true)}</td>`;
                tbodyHtml += `<td style="text-align: right; border: 1px solid #cbd5e1; padding: 7px 6px; background: rgba(0,0,0,0.02); font-weight: 700;">${this.formatNumber(row.monthTot?.th, true)}</td>`;

                // Cột Chênh lệch (TH - KH)
                const diff = row.monthTot?.diff || 0;
                let diffColor = '#64748b';
                if (item.group === 'B') {
                    diffColor = diff >= 0 ? '#15803d' : '#b91c1c'; // Thu vượt kế hoạch là tốt (xanh)
                } else if (item.group === 'C') {
                    diffColor = diff <= 0 ? '#15803d' : '#b91c1c'; // Chi ít hơn kế hoạch là tốt (xanh)
                } else if (item.id === 'D' || item.id === 'E' || item.id === 'G') {
                    diffColor = diff >= 0 ? '#15803d' : '#b91c1c';
                }

                tbodyHtml += `<td style="text-align: right; border: 1px solid #cbd5e1; padding: 7px 6px; font-weight: 700; color: ${diffColor};">${diff !== 0 ? (diff > 0 ? '+' : '') + this.formatNumber(diff, true) : '-'}</td>`;

                tbodyHtml += '</tr>';
            });

            tbodyHtml += '</tbody>';

            table.innerHTML = theadHtml + tbodyHtml;
        },

        exportExcel(isTemplateOnly = false) {
            const data = this.calculateData();
            const mStr = String(this.selectedMonth).padStart(2, '0');
            const compObj = COMPANIES.find(c => c.id === this.selectedCompany);
            const compName = compObj ? compObj.name : 'TOÀN TẬP ĐOÀN';

            let csv = '\uFEFF'; // UTF-8 BOM
            csv += `TẬP ĐOÀN VPS - BAN TÀI CHÍNH KẾ TOÁN\n`;
            csv += `KẾ HOẠCH VÀ BÁO CÁO DÒNG TIỀN TUẦN - THÁNG ${mStr}/2026\n`;
            csv += `Đơn vị thành viên: "${compName}"\n`;
            csv += `Đơn vị tính: Triệu đồng (VNĐ)\n\n`;

            // Headers
            csv += `"STT","NỘI DUNG DÒNG TIỀN","SỐ DƯ ĐẦU KỲ",`;
            for (let i = 1; i <= 5; i++) {
                csv += `"Tuần ${i} (KH)","Tuần ${i} (TH)",`;
            }
            csv += `"TỔNG CỘNG THÁNG (KH)","TỔNG CỘNG THÁNG (TH)","CHÊNH LỆCH (TH - KH)"\n`;

            CASHFLOW_ITEMS.forEach(item => {
                if (item.isTitleOnly) {
                    csv += `"${item.stt}","${item.name}","","","","","","","","","","","",""\n`;
                    return;
                }

                const row = data[item.id] || {};
                const dauKy = (item.id === 'A' || item.id === 'A1' || item.id === 'A2' || item.id === 'E' || item.id === 'F' || item.id === 'G') 
                    ? (isTemplateOnly ? '' : (row.dauKy || '')) : '';

                csv += `"${item.stt}","${item.name}","${dauKy}",`;

                for (let i = 1; i <= 5; i++) {
                    const wKey = `w${i}`;
                    const kh = isTemplateOnly ? '' : (row[wKey]?.kh || '');
                    const th = isTemplateOnly ? '' : (row[wKey]?.th || '');
                    csv += `"${kh}","${th}",`;
                }

                const totKh = isTemplateOnly ? '' : (row.monthTot?.kh || '');
                const totTh = isTemplateOnly ? '' : (row.monthTot?.th || '');
                const diff = isTemplateOnly ? '' : (row.monthTot?.diff || '');

                csv += `"${totKh}","${totTh}","${diff}"\n`;
            });

            const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
            const link = document.createElement('a');
            const fileName = isTemplateOnly 
                ? `Mau_Nhap_Lieu_Dong_Tien_Tuan_VPS_Thang_${mStr}.csv`
                : `Bao_Cao_Dong_Tien_${this.selectedCompany}_Thang_${mStr}_2026.csv`;

            link.href = URL.createObjectURL(blob);
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };

    // Tự động khởi tạo khi tài liệu tải xong
    if (typeof document !== 'undefined') {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                if (window.CashflowModule) window.CashflowModule.init();
            });
        } else {
            if (window.CashflowModule) window.CashflowModule.init();
        }
    }
})();
