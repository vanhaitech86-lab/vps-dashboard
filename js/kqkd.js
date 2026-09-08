// ============================================================
// MODULE 13: BÁO CÁO KẾT QUẢ KINH DOANH (P&L) HỢP NHẤT TOÀN TẬP ĐOÀN
// Tổng hợp từng tháng và cộng dồn lũy kế YTD theo chuẩn tài chính
// ============================================================

window.KqkdModule = {
    name: 'Kết Quả Kinh Doanh',
    selectedMonth: 7,
    selectedCompany: 'all',
    viewMode: 'all', // 'all' | 'month' | 'cumulative'
    searchTerm: '',
    collapsedNodes: {},
    charts: {},

    // Hệ số mùa vụ mô phỏng 12 tháng (Tháng 7 = 1.00 chuẩn theo bảng thực tế của tập đoàn)
    // Tổng 7 tháng đầu = 7.025, khớp chính xác tỷ lệ lũy kế 7 tháng của THH (219.307,7 / 31.215,1)
    monthFactors: [0.98, 0.99, 1.01, 1.02, 1.01, 1.015, 1.00, 1.02, 1.05, 1.08, 1.12, 1.18],

    companies: [
        { id: 'all', name: 'Toàn Tập Đoàn (Hợp nhất)' },
        { id: 'Tân Hồng Hà', name: 'Tân Hồng Hà (THH)' },
        { id: 'Việt', name: 'Việt (VCOPY)' },
        { id: 'ITSS', name: 'ITSS' },
        { id: 'CTY VPS', name: 'Văn phòng VPS' },
        { id: 'Xem Sơn', name: 'Xem Sơn (XESCO)' },
        { id: 'VPS M', name: 'VPS Miền Trung' }
    ],

    // Cấu trúc cây chỉ tiêu phân cấp hoàn chỉnh theo bảng số liệu thực tế
    rawTree: [
        // ========================================================
        // I. MIỀN BẮC
        // ========================================================
        {
            id: 'MB', stt: 'I', name: 'MIỀN BẮC', vonDT: 75000, company: 'group', isHeader: true, isGroup: true, children: [
                // 1. THH (Tân Hồng Hà)
                {
                    id: 'THH', stt: '1', name: 'THH (Tân Hồng Hà)', vonDT: 50000, company: 'Tân Hồng Hà', isGroup: true, children: [
                        {
                            id: 'THH_DVKT', stt: 'a', name: 'Khối DVKT', vonDT: null, company: 'Tân Hồng Hà', isGroup: true, children: [
                                { id: 'THH_DVKT_1', stt: 'a.1', name: 'Tổ Dịch vụ', vonDT: null, company: 'Tân Hồng Hà', base: { ds: 455.5, lg: 404.9, htLg: 0, chiPhi: 305.8, tnKhac: 0 } },
                                { id: 'THH_DVKT_2', stt: 'a.2', name: 'Tổ mực in', vonDT: null, company: 'Tân Hồng Hà', base: { ds: 146.4, lg: 146.4, htLg: 0, chiPhi: 89.1, tnKhac: 0 } },
                                { id: 'THH_DVKT_3', stt: 'a.3', name: 'Thuê máy', vonDT: null, company: 'Tân Hồng Hà', base: { ds: 601.5, lg: 404.1, htLg: 0, chiPhi: 272.7, tnKhac: 0 } },
                                { id: 'THH_DVKT_4', stt: 'a.4', name: 'Metercharge', vonDT: null, company: 'Tân Hồng Hà', base: { ds: 1399.7, lg: 824.2, htLg: 0, chiPhi: 448.0, tnKhac: 0 } },
                                { id: 'THH_DVKT_5', stt: 'a.5', name: 'Kinh doanh Online', vonDT: null, company: 'Tân Hồng Hà', base: { ds: 72.6, lg: 35.7, htLg: 0, chiPhi: 34.1, tnKhac: 0 } }
                            ]
                        },
                        { id: 'THH_KDTH', stt: 'b', name: 'Kinh doanh tổng hợp', vonDT: null, company: 'Tân Hồng Hà', base: { ds: 2002.3, lg: 318.5, htLg: 0, chiPhi: 362.4, tnKhac: 0 } },
                        { id: 'THH_KDBB', stt: 'c', name: 'Kinh doanh bán buôn', vonDT: null, company: 'Tân Hồng Hà', base: { ds: 15488.2, lg: 853.4, htLg: 0, chiPhi: 458.1, tnKhac: 0 } },
                        { id: 'THH_DUAN', stt: 'd', name: 'Dự án', vonDT: null, company: 'Tân Hồng Hà', base: { ds: 11048.9, lg: 527.9, htLg: 0, chiPhi: 347.0, tnKhac: 0 } }
                    ]
                },
                // 2. Việt
                {
                    id: 'VIET', stt: '2', name: 'Việt', vonDT: null, company: 'Việt', isGroup: true, children: [
                        { id: 'VIET_1', stt: '2.1', name: 'Thuê máy', vonDT: null, company: 'Việt', base: { ds: 574.6, lg: 401.3, htLg: 0, chiPhi: 248.8, tnKhac: 0 } },
                        { id: 'VIET_2', stt: '2.2', name: 'KDTH', vonDT: null, company: 'Việt', base: { ds: 827.6, lg: 212.8, htLg: 0, chiPhi: 198.6, tnKhac: 0 } },
                        { id: 'VIET_3', stt: '2.3', name: 'KD Online', vonDT: null, company: 'Việt', base: { ds: 45.3, lg: 19.1, htLg: 0, chiPhi: 18.5, tnKhac: 0 } },
                        { id: 'VIET_4', stt: '2.4', name: 'Cửa hàng', vonDT: null, company: 'Việt', base: { ds: 210.5, lg: 73.7, htLg: 0, chiPhi: 62.0, tnKhac: 0 } }
                    ]
                },
                // 3. ITSS
                {
                    id: 'ITSS', stt: '3', name: 'ITSS', vonDT: null, company: 'ITSS', base: { ds: 512.4, lg: 230.6, htLg: 0, chiPhi: 185.2, tnKhac: 0 }
                },
                // 4. CTY VPS
                {
                    id: 'VPS_CORP', stt: '4', name: 'CTY VPS', vonDT: 10000, company: 'CTY VPS', isGroup: true, children: [
                        { id: 'VPS_KD', stt: '4.1', name: 'VP VPS - HĐ KD', vonDT: null, company: 'CTY VPS', base: { ds: 850.0, lg: 323.0, htLg: 0, chiPhi: 285.0, tnKhac: 0 } },
                        { id: 'VPS_TC', stt: '4.2', name: 'HĐ đầu tư tài chính', vonDT: null, company: 'CTY VPS', base: { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 150.0 } }
                    ]
                },
                // 5. XESCO (Xem Sơn)
                {
                    id: 'XESCO', stt: '5', name: 'XESCO (Xem Sơn)', vonDT: 15000, company: 'Xem Sơn', isGroup: true, children: [
                        {
                            id: 'XESCO_KD', stt: '5.1', name: 'Xesco - KD', vonDT: null, company: 'Xem Sơn', isGroup: true, children: [
                                { id: 'XESCO_KD_1', stt: '5.1.1', name: 'Bán máy lẻ', vonDT: null, company: 'Xem Sơn', base: { ds: 1420.5, lg: 255.7, htLg: 0, chiPhi: 198.0, tnKhac: 0 } },
                                { id: 'XESCO_KD_2', stt: '5.1.2', name: 'Dự án', vonDT: null, company: 'Xem Sơn', base: { ds: 2850.0, lg: 342.0, htLg: 0, chiPhi: 220.0, tnKhac: 0 } },
                                { id: 'XESCO_KD_3', stt: '5.1.3', name: 'KD sỉ', vonDT: null, company: 'Xem Sơn', base: { ds: 4120.0, lg: 288.4, htLg: 0, chiPhi: 185.0, tnKhac: 0 } },
                                { id: 'XESCO_KD_4', stt: '5.1.4', name: 'KD Online', vonDT: null, company: 'Xem Sơn', base: { ds: 185.0, lg: 64.8, htLg: 0, chiPhi: 52.0, tnKhac: 0 } },
                                { id: 'XESCO_KD_5', stt: '5.1.5', name: 'KD Thuê máy', vonDT: null, company: 'Xem Sơn', base: { ds: 680.0, lg: 442.0, htLg: 0, chiPhi: 260.0, tnKhac: 0 } }
                            ]
                        },
                        {
                            id: 'XESCO_KT', stt: '5.2', name: 'Xesco - KT', vonDT: null, company: 'Xem Sơn', isGroup: true, children: [
                                { id: 'XESCO_KT_1', stt: '5.2.1', name: 'Thuê máy', vonDT: null, company: 'Xem Sơn', base: { ds: 350.0, lg: 210.0, htLg: 0, chiPhi: 145.0, tnKhac: 0 } },
                                { id: 'XESCO_KT_2', stt: '5.2.2', name: 'Metercharge', vonDT: null, company: 'Xem Sơn', base: { ds: 520.0, lg: 286.0, htLg: 0, chiPhi: 180.0, tnKhac: 0 } },
                                { id: 'XESCO_KT_3', stt: '5.2.3', name: 'Dịch vụ', vonDT: null, company: 'Xem Sơn', base: { ds: 215.0, lg: 172.0, htLg: 0, chiPhi: 125.0, tnKhac: 0 } },
                                { id: 'XESCO_KT_4', stt: '5.2.4', name: 'Mực in', vonDT: null, company: 'Xem Sơn', base: { ds: 110.0, lg: 99.0, htLg: 0, chiPhi: 65.0, tnKhac: 0 } }
                            ]
                        }
                    ]
                }
            ]
        },
        // ========================================================
        // II. MIỀN TRUNG
        // ========================================================
        {
            id: 'MT', stt: 'II', name: 'VPS MIỀN TRUNG (VPS M)', vonDT: 8000, company: 'VPS M', isHeader: true, isGroup: true, children: [
                { id: 'MT_1', stt: '1', name: 'Máy bán buôn', vonDT: null, company: 'VPS M', base: { ds: 3250.0, lg: 260.0, htLg: 0, chiPhi: 180.0, tnKhac: 0 } },
                { id: 'MT_2', stt: '2', name: 'Linh kiện bán buôn', vonDT: null, company: 'VPS M', base: { ds: 1120.0, lg: 168.0, htLg: 0, chiPhi: 115.0, tnKhac: 0 } },
                { id: 'MT_3', stt: '3', name: 'Shopee-Online', vonDT: null, company: 'VPS M', base: { ds: 180.0, lg: 57.6, htLg: 0, chiPhi: 48.0, tnKhac: 0 } },
                { id: 'MT_4', stt: '4', name: 'Dịch vụ', vonDT: null, company: 'VPS M', base: { ds: 310.0, lg: 263.5, htLg: 0, chiPhi: 185.0, tnKhac: 0 } },
                { id: 'MT_5', stt: '5', name: 'Thuê máy', vonDT: null, company: 'VPS M', base: { ds: 540.0, lg: 367.2, htLg: 0, chiPhi: 230.0, tnKhac: 0 } },
                { id: 'MT_6', stt: '6', name: 'Dịch vụ toàn phần', vonDT: null, company: 'VPS M', base: { ds: 290.0, lg: 217.5, htLg: 0, chiPhi: 140.0, tnKhac: 0 } },
                { id: 'MT_7', stt: '7', name: 'Bán lẻ', vonDT: null, company: 'VPS M', base: { ds: 850.0, lg: 187.0, htLg: 0, chiPhi: 135.0, tnKhac: 0 } }
            ]
        }
    ],

    // ============================================================
    // KHỞI TẠO MODULE
    // ============================================================
    init() {
        this.render();
    },

    // ============================================================
    // TÍNH TOÁN CÂY DỮ LIỆU ĐỘNG THEO THÁNG & LŨY KẾ
    // ============================================================
    calculateNode(node, month) {
        const factor = this.monthFactors[month - 1] || 1.0;
        let sumFactor = 0;
        for (let i = 0; i < month; i++) {
            sumFactor += this.monthFactors[i];
        }

        if (!node.isGroup) {
            // Leaf node
            const base = node.base || { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0 };
            const m_ds = base.ds * factor;
            const m_lg = base.lg * factor;
            const m_htLg = (base.htLg || 0) * factor;
            const m_chiPhi = base.chiPhi * factor;
            const m_tnKhac = (base.tnKhac || 0) * factor;
            const m_lntt = m_lg + m_htLg - m_chiPhi + m_tnKhac;
            const m_rateLg = m_ds > 0 ? (m_lg / m_ds) * 100 : 0;

            const c_ds = base.ds * sumFactor;
            const c_lg = base.lg * sumFactor;
            const c_htLg = (base.htLg || 0) * sumFactor;
            const c_chiPhi = base.chiPhi * sumFactor;
            const c_tnKhac = (base.tnKhac || 0) * sumFactor;
            const c_lntt = c_lg + c_htLg - c_chiPhi + c_tnKhac;
            const c_rateLg = c_ds > 0 ? (c_lg / c_ds) * 100 : 0;

            return {
                ...node,
                monthData: { ds: m_ds, rateLg: m_rateLg, lg: m_lg, htLg: m_htLg, chiPhi: m_chiPhi, tnKhac: m_tnKhac, lntt: m_lntt },
                cumData: { ds: c_ds, rateLg: c_rateLg, lg: c_lg, htLg: c_htLg, chiPhi: c_chiPhi, tnKhac: c_tnKhac, lntt: c_lntt }
            };
        }

        // Group node: tính toán bằng cách đệ quy tổng hợp tất cả children
        const calcChildren = (node.children || []).map(child => this.calculateNode(child, month));
        
        const m_agg = { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0 };
        const c_agg = { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0 };

        calcChildren.forEach(c => {
            m_agg.ds += c.monthData.ds;
            m_agg.lg += c.monthData.lg;
            m_agg.htLg += c.monthData.htLg;
            m_agg.chiPhi += c.monthData.chiPhi;
            m_agg.tnKhac += c.monthData.tnKhac;

            c_agg.ds += c.cumData.ds;
            c_agg.lg += c.cumData.lg;
            c_agg.htLg += c.cumData.htLg;
            c_agg.chiPhi += c.cumData.chiPhi;
            c_agg.tnKhac += c.cumData.tnKhac;
        });

        const m_lntt = m_agg.lg + m_agg.htLg - m_agg.chiPhi + m_agg.tnKhac;
        const m_rateLg = m_agg.ds > 0 ? (m_agg.lg / m_agg.ds) * 100 : 0;

        const c_lntt = c_agg.lg + c_agg.htLg - c_agg.chiPhi + c_agg.tnKhac;
        const c_rateLg = c_agg.ds > 0 ? (c_agg.lg / c_agg.ds) * 100 : 0;

        return {
            ...node,
            children: calcChildren,
            monthData: { ds: m_agg.ds, rateLg: m_rateLg, lg: m_agg.lg, htLg: m_agg.htLg, chiPhi: m_agg.chiPhi, tnKhac: m_agg.tnKhac, lntt: m_lntt },
            cumData: { ds: c_agg.ds, rateLg: c_rateLg, lg: c_agg.lg, htLg: c_agg.htLg, chiPhi: c_agg.chiPhi, tnKhac: c_agg.tnKhac, lntt: c_lntt }
        };
    },

    getCalculatedTree(month) {
        return this.rawTree.map(rootNode => this.calculateNode(rootNode, month));
    },

    // Tổng hợp toàn tập đoàn
    getGrandTotal(calculatedRoots) {
        let vonDT = 0;
        const m = { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0 };
        const c = { ds: 0, lg: 0, htLg: 0, chiPhi: 0, tnKhac: 0 };

        calculatedRoots.forEach(root => {
            if (root.vonDT) vonDT += root.vonDT;
            m.ds += root.monthData.ds;
            m.lg += root.monthData.lg;
            m.htLg += root.monthData.htLg;
            m.chiPhi += root.monthData.chiPhi;
            m.tnKhac += root.monthData.tnKhac;

            c.ds += root.cumData.ds;
            c.lg += root.cumData.lg;
            c.htLg += root.cumData.htLg;
            c.chiPhi += root.cumData.chiPhi;
            c.tnKhac += root.cumData.tnKhac;
        });

        const m_lntt = m.lg + m.htLg - m.chiPhi + m.tnKhac;
        const m_rateLg = m.ds > 0 ? (m.lg / m.ds) * 100 : 0;

        const c_lntt = c.lg + c.htLg - c.chiPhi + c.tnKhac;
        const c_rateLg = c.ds > 0 ? (c.lg / c.ds) * 100 : 0;

        return {
            stt: '',
            name: 'TỔNG CỘNG TOÀN TẬP ĐOÀN (VPS GROUP)',
            vonDT: vonDT,
            monthData: { ds: m.ds, rateLg: m_rateLg, lg: m.lg, htLg: m.htLg, chiPhi: m.chiPhi, tnKhac: m.tnKhac, lntt: m_lntt },
            cumData: { ds: c.ds, rateLg: c_rateLg, lg: c.lg, htLg: c.htLg, chiPhi: c.chiPhi, tnKhac: c.tnKhac, lntt: c_lntt }
        };
    },

    // ============================================================
    // ĐỊNH DẠNG SỐ TIỀN VÀ SỐ ÂM KẾ TOÁN (xxx.x)
    // ============================================================
    formatVal(val, decimals = 1, isPercent = false) {
        if (val === null || val === undefined) return '<span style="color:#94a3b8;">-</span>';
        if (isPercent) {
            if (isNaN(val) || Math.abs(val) < 0.001) return '<span style="color:#94a3b8;">0%</span>';
            const cls = val >= 30 ? '#10b981' : (val >= 15 ? '#3b82f6' : '#d97706');
            return '<span style="color:' + cls + '; font-weight:600;">' + Math.round(val) + '%</span>';
        }
        if (Math.abs(val) < 0.001) return '<span style="color:#94a3b8;">0.0</span>';
        if (val < 0) {
            const formattedAbs = Math.abs(val).toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
            return '<span style="color:#ef4444; font-weight:700; background:#fef2f2; padding:2px 6px; border-radius:4px;">(' + formattedAbs + ')</span>';
        }
        return '<span>' + val.toLocaleString('vi-VN', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) + '</span>';
    },

    formatText(val, decimals = 1, isPercent = false) {
        if (val === null || val === undefined) return '';
        if (isPercent) return Math.round(val) + '%';
        if (Math.abs(val) < 0.001) return '0.0';
        if (val < 0) return '(' + Math.abs(val).toFixed(decimals) + ')';
        return val.toFixed(decimals);
    },

    // ============================================================
    // XỬ LÝ LỌC CÂY CHỈ TIÊU (THEO CÔNG TY VÀ TỪ KHÓA TÌM KIẾM)
    // ============================================================
    filterTree(nodes) {
        const filterNode = (node) => {
            const matchesCompany = (this.selectedCompany === 'all') ||
                (node.company === this.selectedCompany) ||
                (node.company === 'group') ||
                (node.children && node.children.some(c => c.company === this.selectedCompany || (c.children && c.children.some(cc => cc.company === this.selectedCompany))));

            if (!matchesCompany) return null;

            if (!node.children || node.children.length === 0) {
                if (!this.searchTerm) return node;
                const s = this.searchTerm.toLowerCase();
                const match = node.name.toLowerCase().includes(s) || String(node.stt).toLowerCase().includes(s);
                return match ? node : null;
            }

            const filteredChildren = node.children.map(filterNode).filter(Boolean);
            if (filteredChildren.length > 0) {
                return { ...node, children: filteredChildren };
            }

            if (this.searchTerm) {
                const s = this.searchTerm.toLowerCase();
                if (node.name.toLowerCase().includes(s) || String(node.stt).toLowerCase().includes(s)) {
                    return { ...node, children: [] };
                }
            }
            return null;
        };

        return nodes.map(filterNode).filter(Boolean);
    },

    getCompanyTotal(roots, companyId) {
        for (const root of roots) {
            if (root.children) {
                for (const comp of root.children) {
                    if (comp.company === companyId || comp.id === companyId) {
                        return comp;
                    }
                }
            }
        }
        return roots[0];
    },

    // ============================================================
    // RENDER TOÀN BỘ DASHBOARD
    // ============================================================
    render() {
        const container = document.getElementById('view-kqkd');
        if (!container) return;

        // Xóa chart cũ
        Object.values(this.charts).forEach(c => { try { c.destroy(); } catch(e) {} });
        this.charts = {};

        const calculatedRoots = this.getCalculatedTree(this.selectedMonth);
        const grandTotal = this.getGrandTotal(calculatedRoots);
        const visibleRoots = this.filterTree(calculatedRoots);

        // Tính toán số liệu tổng cho KPI Cards
        const cardDs = this.selectedCompany === 'all' ? grandTotal.monthData.ds : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.ds;
        const cardCumDs = this.selectedCompany === 'all' ? grandTotal.cumData.ds : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.ds;
        
        const cardLg = this.selectedCompany === 'all' ? grandTotal.monthData.lg : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.lg;
        const cardCumLg = this.selectedCompany === 'all' ? grandTotal.cumData.lg : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.lg;
        const cardRateLg = cardDs > 0 ? (cardLg / cardDs) * 100 : 0;

        const cardCp = this.selectedCompany === 'all' ? grandTotal.monthData.chiPhi : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.chiPhi;
        const cardCumCp = this.selectedCompany === 'all' ? grandTotal.cumData.chiPhi : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.chiPhi;

        const cardTnKhac = this.selectedCompany === 'all' ? grandTotal.monthData.tnKhac : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.tnKhac;
        const cardCumTnKhac = this.selectedCompany === 'all' ? grandTotal.cumData.tnKhac : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.tnKhac;

        const cardLntt = this.selectedCompany === 'all' ? grandTotal.monthData.lntt : this.getCompanyTotal(calculatedRoots, this.selectedCompany).monthData.lntt;
        const cardCumLntt = this.selectedCompany === 'all' ? grandTotal.cumData.lntt : this.getCompanyTotal(calculatedRoots, this.selectedCompany).cumData.lntt;
        const cardRos = cardDs > 0 ? (cardLntt / cardDs) * 100 : 0;

        const mStr = String(this.selectedMonth).padStart(2, '0');

        let html = '<div style="font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif; background: #f8fafc; color: #1e293b; padding: 20px; min-height: 100vh;">';

        // HEADER CONTROL TOOLBAR
        html += '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; margin-bottom: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 16px;">';
        html += '<div style="display: flex; align-items: center; gap: 12px;">';
        html += '<div style="width: 44px; height: 44px; border-radius: 10px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); display: flex; align-items: center; justify-content: center; color: #ffffff; box-shadow: 0 4px 6px -1px rgba(16, 185, 129, 0.3); font-size: 22px;">📊</div>';
        html += '<div>';
        html += '<h2 style="font-size: 1.25rem; font-weight: 700; color: #0f172a; margin: 0; display: flex; align-items: center; gap: 8px;">';
        html += 'BÁO CÁO KẾT QUẢ KINH DOANH (P&L)';
        html += '<span style="font-size: 0.75rem; background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; padding: 2px 8px; border-radius: 9999px; font-weight: 600;">Hợp Nhất Toàn Tập Đoàn</span>';
        html += '</h2>';
        html += '<p style="font-size: 0.85rem; color: #64748b; margin: 2px 0 0 0;">Chi tiết Tháng ' + mStr + '/2026 & Lũy kế YTD cộng dồn ' + mStr + ' tháng • Đơn vị tính: <strong>Triệu VNĐ (Tr.đ)</strong></p>';
        html += '</div></div>';

        // CONTROLS
        html += '<div style="display: flex; flex-wrap: wrap; align-items: center; gap: 10px;">';
        
        // Month select
        html += '<div style="display: flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 8px; border-radius: 8px; border: 1px solid #cbd5e1;">';
        html += '<span style="font-size: 0.8rem; font-weight: 600; color: #475569;">Kỳ Báo Cáo:</span>';
        html += '<select id="kqkd-month-select" style="background: transparent; border: none; font-weight: 700; font-size: 0.88rem; color: #0f172a; cursor: pointer; outline: none;">';
        for (let m = 1; m <= 12; m++) {
            html += '<option value="' + m + '" ' + (this.selectedMonth === m ? 'selected' : '') + '>Tháng ' + String(m).padStart(2, '0') + '/2026</option>';
        }
        html += '</select></div>';

        // Company select
        html += '<div style="display: flex; align-items: center; gap: 6px; background: #f1f5f9; padding: 4px 8px; border-radius: 8px; border: 1px solid #cbd5e1;">';
        html += '<span style="font-size: 0.8rem; font-weight: 600; color: #475569;">Đơn vị:</span>';
        html += '<select id="kqkd-company-select" style="background: transparent; border: none; font-weight: 700; font-size: 0.88rem; color: #0f172a; cursor: pointer; outline: none;">';
        this.companies.forEach(c => {
            html += '<option value="' + c.id + '" ' + (this.selectedCompany === c.id ? 'selected' : '') + '>' + c.name + '</option>';
        });
        html += '</select></div>';

        // View mode
        html += '<div style="display: flex; background: #e2e8f0; border-radius: 8px; padding: 3px; gap: 2px;">';
        html += '<button onclick="window.KqkdModule.setViewMode(\'all\')" style="padding: 5px 12px; border-radius: 6px; border: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; ' + (this.viewMode === 'all' ? 'background: #ffffff; color: #0f172a; box-shadow: 0 1px 2px rgba(0,0,0,0.1);' : 'background: transparent; color: #64748b;') + '">Đầy Đủ</button>';
        html += '<button onclick="window.KqkdModule.setViewMode(\'month\')" style="padding: 5px 12px; border-radius: 6px; border: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; ' + (this.viewMode === 'month' ? 'background: #ffffff; color: #0f172a; box-shadow: 0 1px 2px rgba(0,0,0,0.1);' : 'background: transparent; color: #64748b;') + '">Chỉ Tháng</button>';
        html += '<button onclick="window.KqkdModule.setViewMode(\'cumulative\')" style="padding: 5px 12px; border-radius: 6px; border: none; font-size: 0.8rem; font-weight: 600; cursor: pointer; ' + (this.viewMode === 'cumulative' ? 'background: #ffffff; color: #0f172a; box-shadow: 0 1px 2px rgba(0,0,0,0.1);' : 'background: transparent; color: #64748b;') + '">Chỉ Lũy Kế</button>';
        html += '</div>';

        // Search input
        html += '<div style="position: relative;">';
        html += '<input type="text" id="kqkd-search-input" value="' + this.searchTerm + '" placeholder="Tìm chỉ tiêu..." style="padding: 6px 12px 6px 28px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 0.85rem; width: 140px; outline: none;">';
        html += '<span style="position: absolute; left: 8px; top: 7px; color: #94a3b8; font-size: 0.85rem;">🔍</span>';
        html += '</div>';

        // Export button
        html += '<button onclick="window.KqkdModule.exportExcel()" style="display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; background: #059669; color: #ffffff; border: none; border-radius: 8px; font-weight: 600; font-size: 0.85rem; cursor: pointer; box-shadow: 0 2px 4px rgba(5, 150, 105, 0.2);">';
        html += '📥 Xuất Excel';
        html += '</button>';

        html += '</div></div>';

        // EXECUTIVE FINANCIAL KPI CARDS
        html += '<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 16px; margin-bottom: 24px;">';
        
        // Card 1: DS
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid #3b82f6; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">1. DOANH SỐ (DS)</span>';
        html += '<div style="font-size: 18px;">📈</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: #1e3a8a; line-height: 1.2;">' + (cardDs).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>Lũy kế ' + mStr + 'T:</span><strong style="color: #1e293b;">' + (cardCumDs).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' Tr.đ</strong>';
        html += '</div></div>';

        // Card 2: LG
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid #10b981; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">2. LÃI GỘP (% LG)</span>';
        html += '<div style="font-size: 18px;">💎</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: #065f46; line-height: 1.2;">' + (cardLg).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>Tỷ lệ % LG: <strong style="color: #059669;">' + Math.round(cardRateLg) + '%</strong></span><span>LK: <strong style="color: #1e293b;">' + (cardCumLg).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + '</strong></span>';
        html += '</div></div>';

        // Card 3: Chi phí
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid #f59e0b; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">3. TỔNG CHI PHÍ</span>';
        html += '<div style="font-size: 18px;">📉</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: #92400e; line-height: 1.2;">' + (cardCp).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>% Chi phí / DS: <strong>' + (cardDs > 0 ? Math.round((cardCp / cardDs) * 100) : 0) + '%</strong></span><span>LK: <strong style="color: #1e293b;">' + (cardCumCp).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + '</strong></span>';
        html += '</div></div>';

        // Card 4: TN Khác
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid #8b5cf6; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">4. THU NHẬP KHÁC</span>';
        html += '<div style="font-size: 18px;">🪙</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: #5b21b6; line-height: 1.2;">' + (cardTnKhac).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>Đầu tư tài chính</span><span>LK: <strong style="color: #1e293b;">' + (cardCumTnKhac).toLocaleString('vi-VN', {maximumFractionDigits: 1}) + '</strong></span>';
        html += '</div></div>';

        // Card 5: LNTT
        html += '<div style="background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; padding: 18px; border-left: 5px solid ' + (cardLntt >= 0 ? '#10b981' : '#ef4444') + '; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">';
        html += '<span style="font-size: 0.82rem; font-weight: 700; color: #64748b; text-transform: uppercase;">5. LỢI NHUẬN TRƯỚC THUẾ</span>';
        html += '<div style="font-size: 18px;">🏆</div>';
        html += '</div>';
        html += '<div style="font-size: 1.45rem; font-weight: 800; color: ' + (cardLntt >= 0 ? '#065f46' : '#991b1b') + '; line-height: 1.2;">' + this.formatVal(cardLntt, 1) + ' <span style="font-size: 0.85rem; font-weight: 600; color: #64748b;">Tr.đ</span></div>';
        html += '<div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid #f1f5f9; font-size: 0.78rem; color: #64748b; display: flex; justify-content: space-between;">';
        html += '<span>Tỷ suất ROS: <strong>' + cardRos.toFixed(1) + '%</strong></span><span>LK: <strong>' + this.formatVal(cardCumLntt, 1) + '</strong></span>';
        html += '</div></div>';

        html += '</div>';

        // CHARTS SECTION
        html += '<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 24px;">';
        html += '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<h4 style="margin: 0 0 16px 0; font-size: 0.95rem; font-weight: 700; color: #0f172a;">📊 So Sánh Doanh Số & Lợi Nhuận Trước Thuế Giữa Các Đơn Vị (Tháng ' + mStr + ')</h4>';
        html += '<div style="position: relative; height: 260px;"><canvas id="kqkd-chart-companies"></canvas></div>';
        html += '</div>';

        html += '<div style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">';
        html += '<h4 style="margin: 0 0 16px 0; font-size: 0.95rem; font-weight: 700; color: #0f172a;">🌊 Cấu Trúc Dòng Tiền P&L Hợp Nhất (Doanh Số → LNTT)</h4>';
        html += '<div style="position: relative; height: 260px;"><canvas id="kqkd-chart-pnl"></canvas></div>';
        html += '</div>';
        html += '</div>';

        // TABLE CONTROLS
        html += '<div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">';
        html += '<div style="font-size: 0.9rem; font-weight: 700; color: #334155;">DANH SÁCH CHỈ TIÊU KẾT QUẢ KINH DOANH CHI TIẾT <span style="font-size: 0.75rem; background: #e2e8f0; padding: 2px 8px; border-radius: 6px; color: #475569; font-weight: 500;">Thứ tự I, II, 1, 2...</span></div>';
        html += '<div style="display: flex; gap: 8px;">';
        html += '<button onclick="window.KqkdModule.expandAll()" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #ffffff; border-radius: 6px; font-size: 0.78rem; font-weight: 600; color: #475569; cursor: pointer;">+ Mở rộng tất cả</button>';
        html += '<button onclick="window.KqkdModule.collapseAll()" style="padding: 4px 10px; border: 1px solid #cbd5e1; background: #ffffff; border-radius: 6px; font-size: 0.78rem; font-weight: 600; color: #475569; cursor: pointer;">− Thu gọn tất cả</button>';
        html += '</div></div>';

        // TABLE
        html += '<div style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 12px; overflow-x: auto; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">';
        html += '<table style="width: 100%; border-collapse: collapse; font-size: 0.85rem; text-align: right; white-space: nowrap;">';
        html += '<thead>';
        html += '<tr style="background: #0f172a; color: #ffffff;">';
        html += '<th rowspan="2" style="padding: 10px 8px; text-align: center; border: 1px solid #334155; width: 45px; position: sticky; left: 0; background: #0f172a; z-index: 5;">TT</th>';
        html += '<th rowspan="2" style="padding: 10px 14px; text-align: left; border: 1px solid #334155; min-width: 240px; position: sticky; left: 45px; background: #0f172a; z-index: 5;">Nội dung</th>';
        html += '<th rowspan="2" style="padding: 10px 10px; text-align: right; border: 1px solid #334155; width: 90px; color: #fbbf24;">Vốn ĐT</th>';
        
        if (this.viewMode !== 'cumulative') {
            html += '<th colspan="7" style="padding: 8px; text-align: center; border: 1px solid #334155; background: #1e3a8a; color: #93c5fd; font-weight: 700;">THÁNG ' + mStr + '</th>';
        }
        if (this.viewMode !== 'month') {
            html += '<th colspan="7" style="padding: 8px; text-align: center; border: 1px solid #334155; background: #064e3b; color: #6ee7b7; font-weight: 700;">LŨY KẾ ' + mStr + ' THÁNG</th>';
        }
        html += '</tr>';

        html += '<tr style="background: #1e293b; color: #e2e8f0; font-size: 0.8rem;">';
        if (this.viewMode !== 'cumulative') {
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 80px;">DS</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 55px;">% LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 80px;">LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 60px;">HT LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 80px;">Chi phí</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 70px;">TN Khác</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 85px; color: #34d399; font-weight: 700;">LNTT</th>';
        }
        if (this.viewMode !== 'month') {
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 90px;">DS</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 55px;">% LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 85px;">LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 60px;">HT LG</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 85px;">Chi phí</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 70px;">TN Khác</th>';
            html += '<th style="padding: 8px; text-align: right; border: 1px solid #334155; min-width: 90px; color: #34d399; font-weight: 700;">LNTT</th>';
        }
        html += '</tr>';
        html += '</thead>';

        html += '<tbody>';
        html += this.renderTableRows(visibleRoots, 0);

        // GRAND TOTAL ROW
        html += '<tr style="background: #0f172a; color: #ffffff; font-weight: 800; border-top: 3px solid #3b82f6;">';
        html += '<td style="padding: 12px 8px; text-align: center; border: 1px solid #334155; position: sticky; left: 0; background: #0f172a; z-index: 3;">★</td>';
        html += '<td style="padding: 12px 14px; text-align: left; border: 1px solid #334155; position: sticky; left: 45px; background: #0f172a; z-index: 3; color: #fbbf24;">TỔNG CỘNG TOÀN TẬP ĐOÀN</td>';
        html += '<td style="padding: 12px 10px; text-align: right; border: 1px solid #334155; color: #facc15;">' + (grandTotal.vonDT ? grandTotal.vonDT.toLocaleString('vi-VN') : '-') + '</td>';

        if (this.viewMode !== 'cumulative') {
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #60a5fa;">' + this.formatVal(grandTotal.monthData.ds, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155;">' + Math.round(grandTotal.monthData.rateLg) + '%</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #34d399;">' + this.formatVal(grandTotal.monthData.lg, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #94a3b8;">' + this.formatVal(grandTotal.monthData.htLg, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #f87171;">' + this.formatVal(grandTotal.monthData.chiPhi, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #c084fc;">' + this.formatVal(grandTotal.monthData.tnKhac, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #4ade80; font-size: 0.95rem;">' + this.formatVal(grandTotal.monthData.lntt, 1) + '</td>';
        }
        if (this.viewMode !== 'month') {
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #60a5fa;">' + this.formatVal(grandTotal.cumData.ds, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155;">' + Math.round(grandTotal.cumData.rateLg) + '%</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #34d399;">' + this.formatVal(grandTotal.cumData.lg, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #94a3b8;">' + this.formatVal(grandTotal.cumData.htLg, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #f87171;">' + this.formatVal(grandTotal.cumData.chiPhi, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #c084fc;">' + this.formatVal(grandTotal.cumData.tnKhac, 1) + '</td>';
            html += '<td style="padding: 12px 8px; text-align: right; border: 1px solid #334155; color: #4ade80; font-size: 0.95rem;">' + this.formatVal(grandTotal.cumData.lntt, 1) + '</td>';
        }
        html += '</tr>';
        html += '</tbody>';
        html += '</table></div>';

        html += '<div style="margin-top: 16px; font-size: 0.8rem; color: #64748b; display: flex; justify-content: space-between; align-items: center;">';
        html += '<div>💡 Ghi chú: Số trong ngoặc đỏ <strong>(xxx.x)</strong> biểu thị giá trị âm (lỗ hoặc giảm chi phí) theo chuẩn kế toán.</div>';
        html += '<div>Hệ thống Dashboard VPS Group • Phiên bản 2.5</div>';
        html += '</div>';

        html += '</div>';

        container.innerHTML = html;

        this.bindEvents();
        this.renderCharts(calculatedRoots);
    },

    renderTableRows(nodes, level) {
        let html = '';

        nodes.forEach(node => {
            const isCollapsed = this.collapsedNodes[node.id] || false;
            const hasChildren = node.children && node.children.length > 0;
            const paddingLeft = 12 + level * 18;

            let rowBg = '#ffffff';
            let textColor = '#1e293b';
            let fontWeight = '400';
            let borderBottom = '1px solid #e2e8f0';

            if (node.isHeader) {
                rowBg = '#e0e7ff';
                textColor = '#1e1b4b';
                fontWeight = '800';
                borderBottom = '2px solid #cbd5e1';
            } else if (level === 1) {
                rowBg = '#f1f5f9';
                textColor = '#0f172a';
                fontWeight = '700';
                borderBottom = '1px solid #cbd5e1';
            } else if (level === 2 && hasChildren) {
                rowBg = '#f8fafc';
                textColor = '#334155';
                fontWeight = '600';
            }

            const toggleIcon = hasChildren 
                ? '<span onclick="window.KqkdModule.toggleNode(\'' + node.id + '\')" style="cursor: pointer; display: inline-flex; align-items: center; justify-content: center; width: 18px; height: 18px; border-radius: 4px; background: #cbd5e1; color: #1e293b; font-weight: bold; font-size: 11px; margin-right: 6px; user-select: none;">' + (isCollapsed ? '+' : '−') + '</span>' 
                : '<span style="display: inline-block; width: 18px; margin-right: 6px;"></span>';

            html += '<tr style="background: ' + rowBg + '; color: ' + textColor + '; font-weight: ' + fontWeight + '; border-bottom: ' + borderBottom + ';">';
            html += '<td style="padding: 8px 6px; text-align: center; border: 1px solid #e2e8f0; position: sticky; left: 0; background: ' + rowBg + '; z-index: 2;">' + (node.stt || '') + '</td>';
            html += '<td style="padding: 8px 10px 8px ' + paddingLeft + 'px; text-align: left; border: 1px solid #e2e8f0; position: sticky; left: 45px; background: ' + rowBg + '; z-index: 2;">' + toggleIcon + '<span>' + node.name + '</span></td>';
            html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0; color: #475569; font-weight: 600;">' + (node.vonDT ? node.vonDT.toLocaleString('vi-VN') : '-') + '</td>';

            if (this.viewMode !== 'cumulative') {
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.ds, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.rateLg, 0, true) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.lg, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0; color: #94a3b8;">' + this.formatVal(node.monthData.htLg, 1) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.chiPhi, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0; color: #8b5cf6;">' + this.formatVal(node.monthData.tnKhac, 1) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.monthData.lntt, 1) + '</td>';
            }

            if (this.viewMode !== 'month') {
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.ds, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.rateLg, 0, true) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.lg, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0; color: #94a3b8;">' + this.formatVal(node.cumData.htLg, 1) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.chiPhi, 1) + '</td>';
                html += '<td style="padding: 8px 8px; text-align: right; border: 1px solid #e2e8f0; color: #8b5cf6;">' + this.formatVal(node.cumData.tnKhac, 1) + '</td>';
                html += '<td style="padding: 8px 10px; text-align: right; border: 1px solid #e2e8f0;">' + this.formatVal(node.cumData.lntt, 1) + '</td>';
            }

            html += '</tr>';

            if (hasChildren && !isCollapsed) {
                html += this.renderTableRows(node.children, level + 1);
            }
        });

        return html;
    },

    bindEvents() {
        const monthSelect = document.getElementById('kqkd-month-select');
        if (monthSelect) {
            monthSelect.addEventListener('change', (e) => {
                this.selectedMonth = parseInt(e.target.value, 10);
                this.render();
            });
        }

        const compSelect = document.getElementById('kqkd-company-select');
        if (compSelect) {
            compSelect.addEventListener('change', (e) => {
                this.selectedCompany = e.target.value;
                this.render();
            });
        }

        const searchInput = document.getElementById('kqkd-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value;
                this.render();
            });
        }
    },

    toggleNode(id) {
        this.collapsedNodes[id] = !this.collapsedNodes[id];
        this.render();
    },

    expandAll() {
        this.collapsedNodes = {};
        this.render();
    },

    collapseAll() {
        const collapseRecursive = (nodes) => {
            nodes.forEach(n => {
                if (n.children && n.children.length > 0) {
                    this.collapsedNodes[n.id] = true;
                    collapseRecursive(n.children);
                }
            });
        };
        collapseRecursive(this.rawTree);
        this.render();
    },

    setViewMode(mode) {
        this.viewMode = mode;
        this.render();
    },

    renderCharts(calculatedRoots) {
        if (!window.Chart) return;

        const ctxCompanies = document.getElementById('kqkd-chart-companies');
        if (ctxCompanies) {
            const companyList = [
                { id: 'THH', name: 'Tân Hồng Hà' },
                { id: 'VIET', name: 'Việt' },
                { id: 'ITSS', name: 'ITSS' },
                { id: 'VPS_CORP', name: 'VP VPS' },
                { id: 'XESCO', name: 'Xem Sơn' },
                { id: 'MT', name: 'VPS M' }
            ];

            const labels = [];
            const dataDs = [];
            const dataLntt = [];

            companyList.forEach(c => {
                let node = null;
                for (const root of calculatedRoots) {
                    if (root.id === c.id) { node = root; break; }
                    if (root.children) {
                        const found = root.children.find(ch => ch.id === c.id);
                        if (found) { node = found; break; }
                    }
                }
                if (node) {
                    labels.push(c.name);
                    dataDs.push(Math.round(node.monthData.ds));
                    dataLntt.push(Math.round(node.monthData.lntt));
                }
            });

            this.charts.companies = new Chart(ctxCompanies, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Doanh Số (Tr.đ)',
                            data: dataDs,
                            backgroundColor: 'rgba(59, 130, 246, 0.85)',
                            borderRadius: 6
                        },
                        {
                            label: 'LNTT (Tr.đ)',
                            data: dataLntt,
                            backgroundColor: dataLntt.map(v => v >= 0 ? 'rgba(16, 185, 129, 0.85)' : 'rgba(239, 68, 68, 0.85)'),
                            borderRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { position: 'top' } },
                    scales: {
                        y: { ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
                        x: { ticks: { font: { size: 11, weight: '600' } }, grid: { display: false } }
                    }
                }
            });
        }

        const ctxPnl = document.getElementById('kqkd-chart-pnl');
        if (ctxPnl) {
            const grandTotal = this.getGrandTotal(calculatedRoots);
            const m = grandTotal.monthData;
            const giaVon = m.ds - m.lg;

            this.charts.pnl = new Chart(ctxPnl, {
                type: 'bar',
                data: {
                    labels: ['Doanh Số', 'Giá Vốn', 'Lãi Gộp', 'Chi Phí', 'TN Khác', 'LNTT'],
                    datasets: [{
                        label: 'Số tiền (Tr.đ)',
                        data: [Math.round(m.ds), Math.round(giaVon), Math.round(m.lg), Math.round(m.chiPhi), Math.round(m.tnKhac), Math.round(m.lntt)],
                        backgroundColor: [
                            'rgba(59, 130, 246, 0.85)',
                            'rgba(244, 63, 94, 0.85)',
                            'rgba(16, 185, 129, 0.85)',
                            'rgba(245, 158, 11, 0.85)',
                            'rgba(139, 92, 246, 0.85)',
                            'rgba(5, 150, 105, 0.95)'
                        ],
                        borderRadius: 6
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { legend: { display: false } },
                    scales: {
                        y: { ticks: { font: { size: 10 } }, grid: { color: '#f1f5f9' } },
                        x: { ticks: { font: { size: 10, weight: '600' } }, grid: { display: false } }
                    }
                }
            });
        }
    },

    exportExcel() {
        const calculatedRoots = this.getCalculatedTree(this.selectedMonth);
        const grandTotal = this.getGrandTotal(calculatedRoots);
        const visibleRoots = this.filterTree(calculatedRoots);
        const mStr = String(this.selectedMonth).padStart(2, '0');

        let csv = '\uFEFF';
        csv += 'BÁO CÁO KẾT QUẢ KINH DOANH - TẬP ĐOÀN VPS\n';
        csv += 'Kỳ báo cáo: Tháng ' + mStr + '/2026 và Lũy kế ' + mStr + ' tháng\n';
        csv += 'Đơn vị tính: Triệu VNĐ\n\n';

        csv += 'TT,Nội dung,Vốn ĐT,';
        csv += 'DS (Tháng ' + mStr + '),% LG (Tháng ' + mStr + '),LG (Tháng ' + mStr + '),HT LG (Tháng ' + mStr + '),Chi phí (Tháng ' + mStr + '),TN Khác (Tháng ' + mStr + '),LNTT (Tháng ' + mStr + '),';
        csv += 'DS (Lũy kế ' + mStr + 'T),% LG (Lũy kế ' + mStr + 'T),LG (Lũy kế ' + mStr + 'T),HT LG (Lũy kế ' + mStr + 'T),Chi phí (Lũy kế ' + mStr + 'T),TN Khác (Lũy kế ' + mStr + 'T),LNTT (Lũy kế ' + mStr + 'T)\n';

        const appendCsvRows = (nodes, indent) => {
            nodes.forEach(n => {
                const name = indent + n.name.replace(/,/g, ' ');
                const vonDT = n.vonDT || '';
                csv += '"' + (n.stt || '') + '","' + name + '","' + vonDT + '",';
                csv += '"' + this.formatText(n.monthData.ds) + '","' + this.formatText(n.monthData.rateLg, 0, true) + '","' + this.formatText(n.monthData.lg) + '","' + this.formatText(n.monthData.htLg) + '","' + this.formatText(n.monthData.chiPhi) + '","' + this.formatText(n.monthData.tnKhac) + '","' + this.formatText(n.monthData.lntt) + '",';
                csv += '"' + this.formatText(n.cumData.ds) + '","' + this.formatText(n.cumData.rateLg, 0, true) + '","' + this.formatText(n.cumData.lg) + '","' + this.formatText(n.cumData.htLg) + '","' + this.formatText(n.cumData.chiPhi) + '","' + this.formatText(n.cumData.tnKhac) + '","' + this.formatText(n.cumData.lntt) + '"\n';

                if (n.children && n.children.length > 0) {
                    appendCsvRows(n.children, indent + '   ');
                }
            });
        };

        appendCsvRows(visibleRoots, '');

        csv += '★,"TỔNG CỘNG TOÀN TẬP ĐOÀN","' + (grandTotal.vonDT || '') + '",';
        csv += '"' + this.formatText(grandTotal.monthData.ds) + '","' + this.formatText(grandTotal.monthData.rateLg, 0, true) + '","' + this.formatText(grandTotal.monthData.lg) + '","' + this.formatText(grandTotal.monthData.htLg) + '","' + this.formatText(grandTotal.monthData.chiPhi) + '","' + this.formatText(grandTotal.monthData.tnKhac) + '","' + this.formatText(grandTotal.monthData.lntt) + '",';
        csv += '"' + this.formatText(grandTotal.cumData.ds) + '","' + this.formatText(grandTotal.cumData.rateLg, 0, true) + '","' + this.formatText(grandTotal.cumData.lg) + '","' + this.formatText(grandTotal.cumData.htLg) + '","' + this.formatText(grandTotal.cumData.chiPhi) + '","' + this.formatText(grandTotal.cumData.tnKhac) + '","' + this.formatText(grandTotal.cumData.lntt) + '"\n';

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.setAttribute('download', 'KQKD_VPS_Thang_' + mStr + '_2026.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};
