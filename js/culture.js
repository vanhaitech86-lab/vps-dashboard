/**
 * VPS GROUP - CULTURE DASHBOARD MODULE (CHỈ TIÊU VĂN HÓA DOANH NGHIỆP)
 * Báo cáo các đơn vị số lượng nhân sự:
 * - Chưa có tín chỉ, Đạt tín chỉ 1, 2, 3
 * - Nhân sự quy y, Chưa quy y
 */

window.CultureModule = {
    currentCompany: 'all',
    currentPeriod: 'all',
    rosterFilter: 'all',
    searchKeyword: '',

    charts: {
        credits: null,
        quyy: null
    },

    // 1. DATA BÁO CÁO CÁC ĐƠN VỊ THÀNH VIÊN
    unitsData: [
        {
            id: 'thh',
            name: 'Công ty Tân Hồng Hà',
            code: 'THH',
            totalStaff: 96,
            noCredit: 6,
            tc1: 18,
            tc2: 24,
            tc3: 48,
            quyY: 82,
            chuaQuyY: 14,
            targetRate: 92.5
        },
        {
            id: 'viet',
            name: 'Công ty Việt',
            code: 'VIỆT',
            totalStaff: 72,
            noCredit: 8,
            tc1: 16,
            tc2: 18,
            tc3: 30,
            quyY: 58,
            chuaQuyY: 14,
            targetRate: 88.0
        },
        {
            id: 'xemson',
            name: 'Công ty Xem Sơn (Xesco)',
            code: 'XEM SƠN',
            totalStaff: 58,
            noCredit: 9,
            tc1: 15,
            tc2: 14,
            tc3: 20,
            quyY: 45,
            chuaQuyY: 13,
            targetRate: 85.2
        },
        {
            id: 'vpsm',
            name: 'Công ty VPS M',
            code: 'VPS M',
            totalStaff: 60,
            noCredit: 7,
            tc1: 14,
            tc2: 15,
            tc3: 24,
            quyY: 48,
            chuaQuyY: 12,
            targetRate: 89.0
        },
        {
            id: 'itss',
            name: 'Công ty ITSS',
            code: 'ITSS',
            totalStaff: 28,
            noCredit: 4,
            tc1: 6,
            tc2: 7,
            tc3: 11,
            quyY: 22,
            chuaQuyY: 6,
            targetRate: 86.8
        },
        {
            id: 'vpvps',
            name: 'Văn phòng VPS',
            code: 'VP VPS',
            totalStaff: 44,
            noCredit: 3,
            tc1: 8,
            tc2: 10,
            tc3: 23,
            quyY: 38,
            chuaQuyY: 6,
            targetRate: 95.0
        }
    ],

    // 2. DANH SÁCH NHÂN SỰ MẪU CHI TIẾT (TRA CỨU & MINH CHỨNG)
    personnelRoster: [
        { id: 'NV001', name: 'Nguyễn Văn An', company: 'VP VPS', dept: 'Phòng Tài chính', isQuyY: true, quyYPlace: 'Chùa Quán Sứ', creditLevel: 3, note: 'Hoàn thành trọn vẹn 3 Tín chỉ Phật pháp' },
        { id: 'NV002', name: 'Trần Thị Bích', company: 'Tân Hồng Hà', dept: 'Phòng Kế toán THH', isQuyY: true, quyYPlace: 'Chùa Trấn Quốc', creditLevel: 3, note: 'Đã quy y Tam Bảo, đạt TC3' },
        { id: 'NV003', name: 'Lê Hoàng Cường', company: 'Công ty Việt', dept: 'Phòng Kỹ thuật', isQuyY: true, quyYPlace: 'Chùa Kim Liên', creditLevel: 2, note: 'Đã hoàn thành TC1 & TC2' },
        { id: 'NV004', name: 'Phạm Minh Đức', company: 'VPS M', dept: 'Phòng KD tổng hợp', isQuyY: false, quyYPlace: '-', creditLevel: 1, note: 'Đang theo học lớp Tín chỉ 2' },
        { id: 'NV005', name: 'Hoàng Thị Dung', company: 'Xem Sơn', dept: 'Phòng KD thuê máy', isQuyY: true, quyYPlace: 'Thiền viện Trúc Lâm', creditLevel: 3, note: 'Tác phong giao tiếp ái ngữ rất tốt' },
        { id: 'NV006', name: 'Vũ Quốc Hùng', company: 'VP VPS', dept: 'Phòng Marketing', isQuyY: true, quyYPlace: 'Chùa Pháp Vân', creditLevel: 3, note: 'Tích cực tham gia hoạt động thiện nguyện' },
        { id: 'NV007', name: 'Đặng Tuấn Kiên', company: 'Tân Hồng Hà', dept: 'Phòng KD dự án', isQuyY: false, quyYPlace: '-', creditLevel: 0, note: 'Nhân sự mới, chuẩn bị học TC1' },
        { id: 'NV008', name: 'Bùi Mai Lan', company: 'Công ty Việt', dept: 'Phòng Kế toán', isQuyY: true, quyYPlace: 'Chùa Hương', creditLevel: 2, note: 'Đang ôn thi Tín chỉ 3' },
        { id: 'NV009', name: 'Ngô Thanh Long', company: 'ITSS', dept: 'Phòng Kỹ thuật', isQuyY: true, quyYPlace: 'Chùa Thầy', creditLevel: 3, note: 'Đã đạt 3 Tín chỉ Phật pháp' },
        { id: 'NV010', name: 'Đỗ Thùy Linh', company: 'VPS M', dept: 'Phòng KD Online', isQuyY: false, quyYPlace: '-', creditLevel: 1, note: 'Đã hoàn thành bài kiểm tra TC1' },
        { id: 'NV011', name: 'Trịnh Văn Nam', company: 'Xem Sơn', dept: 'Phòng Kỹ thuật', isQuyY: true, quyYPlace: 'Chùa Bái Đính', creditLevel: 2, note: 'Đạt chuẩn văn hóa ứng xử' },
        { id: 'NV012', name: 'Lý Quốc Oanh', company: 'VP VPS', dept: 'Phòng Bảo hành', isQuyY: true, quyYPlace: 'Chùa Quán Sứ', creditLevel: 3, note: 'Xuất sắc, thực hành Từ Bi Hỷ Xả' }
    ],

    init() {
        this.render();
        // Sync with dashboard global filters if present
        document.addEventListener('vps_filter_changed', () => {
            if (window.FilterManager && window.FilterManager.currentCompany) {
                const comp = window.FilterManager.currentCompany;
                const select = document.getElementById('culture-select-company');
                if (select) {
                    select.value = comp;
                    this.currentCompany = comp;
                }
            }
            this.render();
        });
    },

    setCompany(comp) {
        this.currentCompany = comp;
        this.render();
    },

    setPeriod(period) {
        this.currentPeriod = period;
        this.render();
    },

    setRosterFilter(filter) {
        this.rosterFilter = filter;
        this.renderPersonnelTable();
    },

    setSearchKeyword(keyword) {
        this.searchKeyword = (keyword || '').toLowerCase().trim();
        this.renderPersonnelTable();
    },

    getXLSX() {
        if (typeof window !== 'undefined' && window.XLSX) return window.XLSX;
        if (typeof XLSX !== 'undefined') return XLSX;
        return null;
    },

    // RENDER CONTROLLER
    render() {
        this.renderKPIs();
        this.renderSummaryTable();
        this.renderCharts();
        this.renderPersonnelTable();

        if (window.lucide) window.lucide.createIcons();
    },

    // 1. RENDER 6 THẺ KPI TỔNG HỢP
    renderKPIs() {
        let list = this.unitsData;
        if (this.currentCompany !== 'all') {
            list = list.filter(u => u.id === this.currentCompany);
        }

        let totalStaff = 0;
        let totalNoCredit = 0;
        let totalTC1 = 0;
        let totalTC2 = 0;
        let totalTC3 = 0;
        let totalQuyY = 0;
        let totalChuaQuyY = 0;

        list.forEach(u => {
            totalStaff += u.totalStaff;
            totalNoCredit += u.noCredit;
            totalTC1 += u.tc1;
            totalTC2 += u.tc2;
            totalTC3 += u.tc3;
            totalQuyY += u.quyY;
            totalChuaQuyY += u.chuaQuyY;
        });

        const pctQuyY = totalStaff > 0 ? ((totalQuyY / totalStaff) * 100).toFixed(1) : 0;
        const pctChuaQuyY = totalStaff > 0 ? ((totalChuaQuyY / totalStaff) * 100).toFixed(1) : 0;
        const pctTC3 = totalStaff > 0 ? ((totalTC3 / totalStaff) * 100).toFixed(1) : 0;
        const pctTC1_2 = totalStaff > 0 ? (((totalTC1 + totalTC2) / totalStaff) * 100).toFixed(1) : 0;
        const pctNoCredit = totalStaff > 0 ? ((totalNoCredit / totalStaff) * 100).toFixed(1) : 0;

        const elTotal = document.getElementById('kpi-culture-total');
        const elQuyY = document.getElementById('kpi-culture-quyy');
        const elChuaQuyY = document.getElementById('kpi-culture-chua-quyy');
        const elTC3 = document.getElementById('kpi-culture-tc3');
        const elTC1_2 = document.getElementById('kpi-culture-tc1-2');
        const elNoCredit = document.getElementById('kpi-culture-no-credit');

        if (elTotal) elTotal.textContent = totalStaff.toLocaleString();
        if (elQuyY) elQuyY.innerHTML = `${totalQuyY} <span style="font-size:0.95rem; font-weight:700; color:#16a34a;">(${pctQuyY}%)</span>`;
        if (elChuaQuyY) elChuaQuyY.innerHTML = `${totalChuaQuyY} <span style="font-size:0.95rem; font-weight:700; color:#d97706;">(${pctChuaQuyY}%)</span>`;
        if (elTC3) elTC3.innerHTML = `${totalTC3} <span style="font-size:0.95rem; font-weight:700; color:#4f46e5;">(${pctTC3}%)</span>`;
        if (elTC1_2) elTC1_2.innerHTML = `${totalTC1 + totalTC2} <span style="font-size:0.95rem; font-weight:700; color:#0284c7;">(${pctTC1_2}%)</span>`;
        if (elNoCredit) elNoCredit.innerHTML = `${totalNoCredit} <span style="font-size:0.95rem; font-weight:700; color:#e11d48;">(${pctNoCredit}%)</span>`;
    },

    // 2. RENDER BẢNG TỔNG HỢP CÁC ĐƠN VỊ
    renderSummaryTable() {
        const tbody = document.getElementById('culture-summary-tbody');
        if (!tbody) return;

        let list = this.unitsData;
        if (this.currentCompany !== 'all') {
            list = list.filter(u => u.id === this.currentCompany);
        }

        let html = '';
        let sumStaff = 0, sumNoCredit = 0, sumTC1 = 0, sumTC2 = 0, sumTC3 = 0, sumQuyY = 0, sumChuaQuyY = 0;

        list.forEach((u, idx) => {
            sumStaff += u.totalStaff;
            sumNoCredit += u.noCredit;
            sumTC1 += u.tc1;
            sumTC2 += u.tc2;
            sumTC3 += u.tc3;
            sumQuyY += u.quyY;
            sumChuaQuyY += u.chuaQuyY;

            const pctQuyY = ((u.quyY / u.totalStaff) * 100).toFixed(1);
            const pctChuaQuyY = ((u.chuaQuyY / u.totalStaff) * 100).toFixed(1);
            const pctTC3 = ((u.tc3 / u.totalStaff) * 100).toFixed(1);
            const pctNo = ((u.noCredit / u.totalStaff) * 100).toFixed(1);

            let evalBadge = '<span class="badge-eval excellent">Xuất sắc</span>';
            if (u.targetRate < 90) evalBadge = '<span class="badge-eval good">Đạt chuẩn</span>';
            if (u.targetRate < 86) evalBadge = '<span class="badge-eval warning">Cần đẩy mạnh</span>';

            html += `
                <tr>
                    <td style="text-align: center; font-weight: 700; color: #64748b;">${idx + 1}</td>
                    <td class="company-name">${u.name} (${u.code})</td>
                    <td class="total-staff">${u.totalStaff}</td>
                    <td class="cell-num" style="color: #dc2626; font-weight: 800;">${u.noCredit} <small style="color:#64748b;">(${pctNo}%)</small></td>
                    <td class="cell-num" style="color: #0369a1;">${u.tc1}</td>
                    <td class="cell-num" style="color: #0284c7;">${u.tc2}</td>
                    <td class="cell-num" style="color: #4f46e5; font-weight: 900; background: #eef2ff;">${u.tc3} <small style="color:#4f46e5;">(${pctTC3}%)</small></td>
                    <td class="cell-num" style="color: #15803d; font-weight: 900; background: #f0fdf4;">${u.quyY} <small style="color:#15803d;">(${pctQuyY}%)</small></td>
                    <td class="cell-num" style="color: #b45309;">${u.chuaQuyY} <small style="color:#b45309;">(${pctChuaQuyY}%)</small></td>
                    <td style="text-align: center;">${evalBadge}</td>
                </tr>
            `;
        });

        // Total row
        const totalPctQuyY = sumStaff > 0 ? ((sumQuyY / sumStaff) * 100).toFixed(1) : 0;
        const totalPctChuaQuyY = sumStaff > 0 ? ((sumChuaQuyY / sumStaff) * 100).toFixed(1) : 0;
        const totalPctTC3 = sumStaff > 0 ? ((sumTC3 / sumStaff) * 100).toFixed(1) : 0;
        const totalPctNo = sumStaff > 0 ? ((sumNoCredit / sumStaff) * 100).toFixed(1) : 0;

        html += `
            <tr class="total-row">
                <td colspan="2" style="text-align: right; padding-right: 14px; text-transform: uppercase;">TỔNG CỘNG TOÀN TẬP ĐOÀN:</td>
                <td style="text-align: center; font-size: 1rem; color: #1e40af;">${sumStaff}</td>
                <td style="text-align: center; color: #dc2626;">${sumNoCredit} <small>(${totalPctNo}%)</small></td>
                <td style="text-align: center; color: #0369a1;">${sumTC1}</td>
                <td style="text-align: center; color: #0284c7;">${sumTC2}</td>
                <td style="text-align: center; color: #4f46e5; font-size: 0.95rem; background: #e0e7ff;">${sumTC3} <small>(${totalPctTC3}%)</small></td>
                <td style="text-align: center; color: #15803d; font-size: 0.95rem; background: #dcfce7;">${sumQuyY} <small>(${totalPctQuyY}%)</small></td>
                <td style="text-align: center; color: #b45309;">${sumChuaQuyY} <small>(${totalPctChuaQuyY}%)</small></td>
                <td style="text-align: center;"><span class="badge-eval excellent" style="font-size: 0.85rem;">89.7% Chung</span></td>
            </tr>
        `;

        tbody.innerHTML = html;
    },

    // 3. RENDER 2 BIỂU ĐỒ TRỰC QUAN (CHART.JS)
    renderCharts() {
        if (typeof Chart === 'undefined') return;

        // Chart 1: Tiến độ tín chỉ theo đơn vị (Stacked Bar)
        const canvasCredits = document.getElementById('cultureCreditsChart');
        if (canvasCredits) {
            const ctx = canvasCredits.getContext('2d');
            if (this.charts.credits) this.charts.credits.destroy();

            const labels = this.unitsData.map(u => u.code);
            const noCreditData = this.unitsData.map(u => u.noCredit);
            const tc1Data = this.unitsData.map(u => u.tc1);
            const tc2Data = this.unitsData.map(u => u.tc2);
            const tc3Data = this.unitsData.map(u => u.tc3);

            this.charts.credits = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [
                        {
                            label: 'Chưa có tín chỉ',
                            data: noCreditData,
                            backgroundColor: '#f43f5e',
                            borderRadius: 4
                        },
                        {
                            label: 'Đạt Tín chỉ 1',
                            data: tc1Data,
                            backgroundColor: '#0ea5e9',
                            borderRadius: 4
                        },
                        {
                            label: 'Đạt Tín chỉ 2',
                            data: tc2Data,
                            backgroundColor: '#3b82f6',
                            borderRadius: 4
                        },
                        {
                            label: 'Đạt Tín chỉ 3',
                            data: tc3Data,
                            backgroundColor: '#6366f1',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'top', labels: { font: { weight: 'bold' } } }
                    },
                    scales: {
                        x: { stacked: true, grid: { display: false } },
                        y: { stacked: true, beginAtZero: true, grid: { color: '#f1f5f9' } }
                    }
                }
            });
        }

        // Chart 2: Tỷ lệ Quy Y vs Chưa Quy Y (Doughnut)
        const canvasQuyY = document.getElementById('cultureQuyYChart');
        if (canvasQuyY) {
            const ctx2 = canvasQuyY.getContext('2d');
            if (this.charts.quyy) this.charts.quyy.destroy();

            let sumQuyY = 0, sumChua = 0;
            this.unitsData.forEach(u => {
                sumQuyY += u.quyY;
                sumChua += u.chuaQuyY;
            });

            this.charts.quyy = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: [
                        `Đã Quy Y Tam Bảo: ${sumQuyY}`,
                        `Chưa Quy Y: ${sumChua}`
                    ],
                    datasets: [{
                        data: [sumQuyY, sumChua],
                        backgroundColor: ['#16a34a', '#f59e0b'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'bottom', labels: { font: { weight: 'bold', size: 11 } } }
                    },
                    cutout: '62%'
                }
            });
        }
    },

    // 4. RENDER DANH SÁCH NHÂN SỰ CHI TIẾT
    renderPersonnelTable() {
        const tbody = document.getElementById('culture-roster-tbody');
        if (!tbody) return;

        let filtered = this.personnelRoster;

        // Filter by company
        if (this.currentCompany !== 'all') {
            const mapName = {
                'thh': 'Tân Hồng Hà',
                'viet': 'Công ty Việt',
                'xemson': 'Xem Sơn',
                'vpsm': 'VPS M',
                'itss': 'ITSS',
                'vpvps': 'VP VPS'
            };
            const target = mapName[this.currentCompany] || '';
            if (target) filtered = filtered.filter(p => p.company.includes(target));
        }

        // Filter by roster status
        if (this.rosterFilter === 'quyy_yes') filtered = filtered.filter(p => p.isQuyY);
        else if (this.rosterFilter === 'quyy_no') filtered = filtered.filter(p => !p.isQuyY);
        else if (this.rosterFilter === 'tc_3') filtered = filtered.filter(p => p.creditLevel === 3);
        else if (this.rosterFilter === 'tc_2') filtered = filtered.filter(p => p.creditLevel === 2);
        else if (this.rosterFilter === 'tc_1') filtered = filtered.filter(p => p.creditLevel === 1);
        else if (this.rosterFilter === 'tc_0') filtered = filtered.filter(p => p.creditLevel === 0);

        // Filter by search keyword
        if (this.searchKeyword) {
            filtered = filtered.filter(p => 
                p.name.toLowerCase().includes(this.searchKeyword) ||
                p.dept.toLowerCase().includes(this.searchKeyword) ||
                p.company.toLowerCase().includes(this.searchKeyword)
            );
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="7" style="text-align: center; padding: 20px; color: #64748b; font-weight: 700;">Không tìm thấy nhân sự phù hợp với bộ lọc</td></tr>`;
            return;
        }

        let html = '';
        filtered.forEach((p, idx) => {
            const quyYBadge = p.isQuyY 
                ? `<span class="badge-quyy yes"><i data-lucide="check" style="width:13px;height:13px;"></i> Đã Quy Y</span>`
                : `<span class="badge-quyy no"><i data-lucide="clock" style="width:13px;height:13px;"></i> Chưa Quy Y</span>`;

            let creditBadge = '<span class="badge-credit tc0">Chưa có TC</span>';
            if (p.creditLevel === 1) creditBadge = '<span class="badge-credit tc1">Đạt TC1</span>';
            else if (p.creditLevel === 2) creditBadge = '<span class="badge-credit tc2">Đạt TC2</span>';
            else if (p.creditLevel === 3) creditBadge = '<span class="badge-credit tc3">Đạt TC3 (Xuất sắc)</span>';

            html += `
                <tr>
                    <td style="text-align: center; font-weight: 700; color: #64748b;">${idx + 1}</td>
                    <td style="font-weight: 800; color: #1e293b;">${p.name}</td>
                    <td style="font-weight: 600; color: #475569;">${p.company} - ${p.dept}</td>
                    <td style="text-align: center;">${quyYBadge}</td>
                    <td style="text-align: center; font-size: 0.85rem; color: #475569;">${p.quyYPlace}</td>
                    <td style="text-align: center;">${creditBadge}</td>
                    <td style="font-size: 0.82rem; color: #475569;">${p.note}</td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    // 5. XUẤT BÁO CÁO EXCEL VĂN HÓA DOANH NGHIỆP
    exportExcel() {
        const xlsx = this.getXLSX();
        if (!xlsx) {
            alert('Thư viện Excel chưa sẵn sàng!');
            return;
        }

        const rows = [];
        this.unitsData.forEach(u => {
            rows.push({
                'STT': rows.length + 1,
                'ĐƠN VỊ THÀNH VIÊN': u.name,
                'TỔNG SỐ NHÂN SỰ': u.totalStaff,
                'CHƯA CÓ TÍN CHỈ': u.noCredit,
                'ĐẠT TÍN CHỈ 1': u.tc1,
                'ĐẠT TÍN CHỈ 2': u.tc2,
                'ĐẠT TÍN CHỈ 3': u.tc3,
                'NHÂN SỰ ĐÃ QUY Y': u.quyY,
                'NHÂN SỰ CHƯA QUY Y': u.chuaQuyY,
                'TỈ LỆ QUY Y (%)': ((u.quyY / u.totalStaff) * 100).toFixed(1) + '%',
                'TỈ LỆ ĐẠT 3 TÍN CHỈ (%)': ((u.tc3 / u.totalStaff) * 100).toFixed(1) + '%'
            });
        });

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(rows);

        ws['!cols'] = [
            { wch: 6 },
            { wch: 26 },
            { wch: 18 },
            { wch: 16 },
            { wch: 16 },
            { wch: 16 },
            { wch: 16 },
            { wch: 18 },
            { wch: 18 },
            { wch: 18 },
            { wch: 22 }
        ];

        xlsx.utils.book_append_sheet(wb, ws, 'Bao_Cao_Van_Hoa_DN');
        xlsx.writeFile(wb, 'Bao_Cao_Van_Hoa_Doanh_Nghiep_VPS.xlsx');
    },

    // 6. TẢI FILE MẪU EXCEL BÁO CÁO VĂN HÓA DOANH NGHIỆP
    downloadTemplate() {
        const xlsx = this.getXLSX();
        if (!xlsx) {
            alert('Thư viện Excel chưa sẵn sàng!');
            return;
        }

        const template = [
            {
                'STT': 1,
                'Mã NV': 'VPS001',
                'Họ và Tên': 'Nguyễn Văn A',
                'Đơn vị': 'Tân Hồng Hà',
                'Phòng ban': 'Phòng Kỹ thuật',
                'Đã Quy Y (Có/Chưa)': 'Có',
                'Nơi / Ngày Quy Y': 'Chùa Quán Sứ - 2025',
                'Tín chỉ Phật pháp đạt được (0/1/2/3)': 3,
                'Ghi chú': 'Đạt chuẩn văn hóa ái ngữ'
            },
            {
                'STT': 2,
                'Mã NV': 'VPS002',
                'Họ và Tên': 'Trần Thị B',
                'Đơn vị': 'Công ty Việt',
                'Phòng ban': 'Phòng Kế toán',
                'Đã Quy Y (Có/Chưa)': 'Chưa',
                'Nơi / Ngày Quy Y': '-',
                'Tín chỉ Phật pháp đạt được (0/1/2/3)': 1,
                'Ghi chú': 'Đang chuẩn bị học TC2'
            }
        ];

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(template);
        ws['!cols'] = [
            { wch: 6 },
            { wch: 12 },
            { wch: 22 },
            { wch: 18 },
            { wch: 20 },
            { wch: 18 },
            { wch: 25 },
            { wch: 32 },
            { wch: 30 }
        ];

        xlsx.utils.book_append_sheet(wb, ws, 'Mau_Bao_Cao_Van_Hoa');
        xlsx.writeFile(wb, 'Mau_Bao_Cao_Van_Hoa_Doanh_Nghiep_VPS.xlsx');
    }
};
