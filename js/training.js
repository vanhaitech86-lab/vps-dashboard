/**
 * VPS GROUP - CHỈ TIÊU ĐÀO TẠO DASHBOARD MODULE
 * Dual Dashboards: 
 * 1. Kế Hoạch Đào Tạo (Ma Trận Đào Tạo theo Đơn vị & Phòng ban - Ảnh 1)
 * 2. Thực Hiện Đào Tạo & Đánh Giá Chất Lượng (Báo cáo T1-T12/W1-W4, Danh sách học viên, Xếp loại, Upload đối chiếu - Ảnh 2)
 */

window.TrainingModule = {
    currentTab: 'plan', // 'plan' | 'exec'
    currentCompany: 'all',
    currentPeriodMode: 'month', // 'month' | 'week'
    selectedMonth: 'all',
    selectedWeek: 'all',
    studentGradeFilter: 'all', // 'all' | 'tot' | 'kha' | 'tb' | 'kem'

    charts: {
        category: null,
        quality: null
    },

    // ==========================================
    // 1. DATA: MA TRẬN KẾ HOẠCH ĐÀO TẠO (IMAGE 1)
    // ==========================================
    // 10 Credits: TC1, TC2, TC3, QT-QĐ, SanPham, NghiepVu, GiaoTiep, Nhom, ThuyetTrinh, AI
    matrixColumns: [
        { key: 'tc1', label: 'TC1 (Phật pháp 1)', group: 'Văn hóa DN' },
        { key: 'tc2', label: 'TC2 (Phật pháp 2)', group: 'Văn hóa DN' },
        { key: 'tc3', label: 'TC3 (Phật pháp 3)', group: 'Văn hóa DN' },
        { key: 'iso', label: 'QT-QĐ đơn vị', group: 'ISO' },
        { key: 'sp', label: 'Sản phẩm', group: 'Chuyên môn' },
        { key: 'nv', label: 'Nghiệp vụ', group: 'Chuyên môn' },
        { key: 'gt', label: 'Giao tiếp', group: 'Kỹ năng' },
        { key: 'nhom', label: 'Kỹ năng nhóm', group: 'Kỹ năng' },
        { key: 'tt', label: 'Thuyết trình', group: 'Kỹ năng' },
        { key: 'ai', label: 'Công nghệ AI', group: 'Kỹ năng' }
    ],

    planMatrixData: [
        { stt: 'A', name: 'CÁN BỘ PHỤ TRÁCH', isHeader: true, company: 'all' },
        { stt: 'B', name: 'ĐỐI TƯỢNG ĐÀO TẠO', isHeader: true, company: 'all' },
        
        // I. Văn phòng VPS
        { stt: 'I', name: 'Văn phòng VPS', isGroupHeader: true, company: 'vps' },
        { stt: '1.1', name: 'Phòng Tài chính', company: 'vps', checks: { tc1: true, iso: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '1.2', name: 'Phòng Kế hoạch Cung ứng', company: 'vps', checks: { tc1: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '1.3', name: 'Phòng Marketing', company: 'vps', checks: { tc1: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '1.4', name: 'Phòng Hành chính', company: 'vps', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '1.5', name: 'Phòng Nhân sự', company: 'vps', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '1.6', name: 'Phòng Bảo hành', company: 'vps', checks: { tc1: true, iso: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },

        // 3. Công ty Tân Hồng Hà
        { stt: '3', name: 'Công ty Tân Hồng Hà', isGroupHeader: true, company: 'thh' },
        { stt: '3.1', name: 'Phòng Kỹ thuật', company: 'thh', checks: { tc1: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '3.2', name: 'Phòng Dịch vụ', company: 'thh', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '3.3', name: 'Phòng KD lẻ THH', company: 'thh', checks: { tc1: true, iso: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '3.4', name: 'Phòng KD dự án THH', company: 'thh', checks: { tc1: true, iso: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '3.5', name: 'Phòng Kinh doanh phân phối', company: 'thh', checks: { tc1: true, iso: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '3.6', name: 'Phòng Kế toán THH', company: 'thh', checks: { tc1: true, iso: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },

        // 4. Công ty Việt
        { stt: '4', name: 'Công ty Việt', isGroupHeader: true, company: 'viet' },
        { stt: '4.1', name: 'Phòng Kế toán', company: 'viet', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '4.2', name: 'Phòng Kỹ thuật', company: 'viet', checks: { tc1: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '4.3', name: 'Phòng KD tổng hợp', company: 'viet', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '4.4', name: 'Phòng KD thuê máy', company: 'viet', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '4.5', name: 'Phòng KD Online', company: 'viet', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },

        // 5. VPSM
        { stt: '5', name: 'VPSM', isGroupHeader: true, company: 'vpsm' },
        { stt: '5.1', name: 'Phòng Kế toán', company: 'vpsm', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '5.2', name: 'Phòng Kỹ thuật', company: 'vpsm', checks: { tc1: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '5.3', name: 'Phòng KD tổng hợp', company: 'vpsm', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '5.4', name: 'Phòng KD thuê máy', company: 'vpsm', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '5.5', name: 'Phòng KD Online', company: 'vpsm', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },

        // 6. Công ty Xesco
        { stt: '6', name: 'Công ty Xesco', isGroupHeader: true, company: 'xesco' },
        { stt: '6.1', name: 'Phòng Kế toán', company: 'xesco', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '6.2', name: 'Phòng Kỹ thuật', company: 'xesco', checks: { tc1: true, sp: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '6.3', name: 'Phòng KD tổng hợp', company: 'xesco', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '6.4', name: 'Phòng KD thuê máy', company: 'xesco', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } },
        { stt: '6.5', name: 'Phòng KD Online', company: 'xesco', checks: { tc1: true, nv: true, gt: true, nhom: true, tt: true, ai: true } }
    ],

    // ==========================================
    // 2. DATA: THỰC HIỆN ĐÀO TẠO (IMAGE 2)
    // ==========================================
    executionModules: [
        // I. Văn hóa doanh nghiệp
        { id: 'vh', stt: 'I', name: 'Văn hóa doanh nghiệp', isGroupHeader: true },
        { id: 'vh1', stt: '1', name: 'Phật pháp 1', category: 'vh', plan: 120, actual: 116, months: [10, 12, 10, 10, 10, 10, 10, 10, 9, 9, 8, 8], weeks: [29, 30, 28, 29] },
        { id: 'vh2', stt: '2', name: 'Phật pháp 2', category: 'vh', plan: 85, actual: 78, months: [7, 7, 7, 7, 7, 7, 6, 6, 6, 6, 6, 6], weeks: [20, 19, 20, 19] },
        { id: 'vh3', stt: '3', name: 'Phật pháp 3', category: 'vh', plan: 60, actual: 54, months: [5, 5, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4], weeks: [13, 14, 14, 13] },

        // II. ISO
        { id: 'iso_grp', stt: 'II', name: 'ISO', isGroupHeader: true },
        { id: 'iso1', stt: '1', name: 'Kiến thức chung (QT/QĐ)', category: 'iso', plan: 95, actual: 90, months: [8, 8, 8, 8, 8, 8, 7, 7, 7, 7, 7, 8], weeks: [23, 22, 23, 22] },
        { id: 'iso2', stt: '2', name: 'Thực hành', category: 'iso', plan: 75, actual: 70, months: [6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6], weeks: [18, 17, 18, 17] },

        // III. Chuyên môn
        { id: 'cm_grp', stt: 'III', name: 'Chuyên môn', isGroupHeader: true },
        { id: 'cm1', stt: '1', name: 'Sản phẩm', category: 'cm', plan: 110, actual: 104, months: [9, 9, 9, 9, 9, 9, 8, 8, 9, 8, 8, 8], weeks: [26, 26, 26, 26] },
        { id: 'cm2', stt: '2', name: 'Nghiệp vụ', category: 'cm', plan: 130, actual: 125, months: [11, 11, 11, 11, 10, 10, 10, 10, 11, 10, 10, 10], weeks: [32, 31, 31, 31] },

        // IV. Kỹ năng
        { id: 'kn_grp', stt: 'IV', name: 'Kỹ năng', isGroupHeader: true },
        { id: 'kn1', stt: '1', name: 'Kỹ năng giao tiếp', category: 'kn', plan: 115, actual: 110, months: [10, 10, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], weeks: [28, 27, 28, 27] },
        { id: 'kn2', stt: '2', name: 'Kỹ năng nhóm', category: 'kn', plan: 115, actual: 108, months: [9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9], weeks: [27, 27, 27, 27] },
        { id: 'kn3', stt: '3', name: 'Kỹ năng thuyết trình', category: 'kn', plan: 105, actual: 98, months: [8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 9, 9], weeks: [25, 24, 25, 24] },
        { id: 'kn4', stt: '4', name: 'Kỹ năng tin học / Công nghệ AI', category: 'kn', plan: 120, actual: 115, months: [10, 10, 10, 10, 10, 9, 9, 9, 9, 10, 10, 9], weeks: [29, 29, 28, 29] }
    ],

    // ==========================================
    // 3. DATA: DANH SÁCH HỌC VIÊN & ĐÁNH GIÁ NĂNG LỰC (IMAGE 2 MỤC B)
    // ==========================================
    students: [
        { id: 'NV01', name: 'Nguyễn Văn A', company: 'VP VPS', dept: 'Phòng Tài chính', credit: 'Phật pháp 1', score: 9.5, note: 'Xuất sắc, nắm vững triết lý' },
        { id: 'NV02', name: 'Nguyễn Thị B', company: 'Tân Hồng Hà', dept: 'Phòng Kế toán THH', credit: 'Kiến thức chung (QT/QĐ)', score: 8.2, note: 'Hiểu rõ quy trình ISO' },
        { id: 'NV03', name: 'Trần Văn C', company: 'Công ty Việt', dept: 'Phòng Kỹ thuật', credit: 'Sản phẩm', score: 9.0, note: 'Nắm vững thông số máy photocopy' },
        { id: 'NV04', name: 'Lê Hoàng D', company: 'VPSM', dept: 'Phòng KD tổng hợp', credit: 'Kỹ năng giao tiếp', score: 7.8, note: 'Tương tác khách hàng tốt' },
        { id: 'NV05', name: 'Phạm Minh E', company: 'Công ty Xesco', dept: 'Phòng KD thuê máy', credit: 'Kỹ năng nhóm', score: 6.5, note: 'Cần chủ động kết nối nhóm hơn' },
        { id: 'NV06', name: 'Đỗ Thùy F', company: 'VP VPS', dept: 'Phòng Marketing', credit: 'Công nghệ AI', score: 9.8, note: 'Ứng dụng AI viết nội dung đỉnh cao' },
        { id: 'NV07', name: 'Vũ Quốc G', company: 'Tân Hồng Hà', dept: 'Phòng KD dự án THH', credit: 'Kỹ năng thuyết trình', score: 8.5, note: 'Thuyết trình dự án tự tin' },
        { id: 'NV08', name: 'Bùi Lan H', company: 'Công ty Việt', dept: 'Phòng Kế toán', credit: 'Nghiệp vụ', score: 7.2, note: 'Hạch toán chuẩn xác theo quy chế' },
        { id: 'NV09', name: 'Đặng Tuấn I', company: 'VPSM', dept: 'Phòng KD Online', credit: 'Nghiệp vụ', score: 4.5, note: 'Chưa đạt bài test, đăng ký đào tạo lại' },
        { id: 'NV10', name: 'Hoàng Kim K', company: 'Công ty Xesco', dept: 'Phòng Kỹ thuật', credit: 'Sản phẩm', score: 8.8, note: 'Kỹ năng xử lý bảo dưỡng máy đạt' },
        { id: 'NV11', name: 'Ngô Thanh L', company: 'VP VPS', dept: 'Phòng Bảo hành', credit: 'QT-QĐ đơn vị', score: 9.2, note: 'Thực thi quy chuẩn bảo hành rất tốt' },
        { id: 'NV12', name: 'Trịnh Mai M', company: 'Tân Hồng Hà', dept: 'Phòng Dịch vụ', credit: 'Phật pháp 2', score: 7.5, note: 'Tác phong ứng xử chuẩn mực' }
    ],

    // LocalStorage key for storing uploaded audit files
    STORAGE_AUDIT_FILES: 'vps_training_audit_files_v1',
    STORAGE_STUDENTS: 'vps_training_custom_students_v1',

    // ==========================================
    // INITIALIZATION
    // ==========================================
    init() {
        this.loadStorageData();
        this.bindEvents();
        this.render();
    },

    loadStorageData() {
        try {
            if (typeof localStorage === 'undefined') return;
            const savedStudents = localStorage.getItem(this.STORAGE_STUDENTS);
            if (savedStudents) {
                const parsed = JSON.parse(savedStudents);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    this.students = parsed;
                }
            }
        } catch (e) {
            console.error('Error loading custom students:', e);
        }
    },

    bindEvents() {
        // Dropzone upload events
        const dropzone = document.getElementById('training-dropzone');
        const fileInput = document.getElementById('training-file-input');

        if (dropzone && fileInput) {
            dropzone.addEventListener('click', () => fileInput.click());
            dropzone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropzone.classList.add('dragover');
            });
            dropzone.addEventListener('dragleave', () => dropzone.classList.remove('dragover'));
            dropzone.addEventListener('drop', (e) => {
                e.preventDefault();
                dropzone.classList.remove('dragover');
                if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    this.handleFileUpload(e.dataTransfer.files[0]);
                }
            });

            fileInput.addEventListener('change', (e) => {
                if (e.target.files && e.target.files.length > 0) {
                    this.handleFileUpload(e.target.files[0]);
                }
            });
        }
    },

    // ==========================================
    // TAB SWITCHING
    // ==========================================
    switchTab(tab) {
        this.currentTab = tab;
        const btnPlan = document.getElementById('btn-training-tab-plan');
        const btnExec = document.getElementById('btn-training-tab-exec');
        const secPlan = document.getElementById('training-tab-plan');
        const secExec = document.getElementById('training-tab-exec');

        if (tab === 'plan') {
            if (btnPlan) btnPlan.classList.add('active');
            if (btnExec) btnExec.classList.remove('active');
            if (secPlan) secPlan.style.display = 'block';
            if (secExec) secExec.style.display = 'none';
        } else {
            if (btnPlan) btnPlan.classList.remove('active');
            if (btnExec) btnExec.classList.add('active');
            if (secPlan) secPlan.style.display = 'none';
            if (secExec) secExec.style.display = 'block';
            // Render execution charts after tab is visible
            setTimeout(() => this.renderExecutionCharts(), 50);
        }

        if (window.lucide) window.lucide.createIcons();
    },

    // Set filter by company
    setCompany(comp) {
        this.currentCompany = comp;
        this.render();
    },

    // Toggle Time View: Month vs Week
    setTimeViewMode(mode) {
        this.currentPeriodMode = mode;
        const btnMonth = document.getElementById('btn-time-view-month');
        const btnWeek = document.getElementById('btn-time-view-week');
        const selectMonth = document.getElementById('training-select-month');
        const selectWeek = document.getElementById('training-select-week');

        if (mode === 'week') {
            if (btnMonth) btnMonth.classList.remove('active');
            if (btnWeek) btnWeek.classList.add('active');
            if (selectMonth) selectMonth.style.display = 'none';
            if (selectWeek) selectWeek.style.display = 'inline-block';
        } else {
            if (btnMonth) btnMonth.classList.add('active');
            if (btnWeek) btnWeek.classList.remove('active');
            if (selectMonth) selectMonth.style.display = 'inline-block';
            if (selectWeek) selectWeek.style.display = 'none';
        }

        this.renderExecutionTable();
        this.renderExecutionKPIs();
        this.renderExecutionCharts();
    },

    setSelectedMonth(val) {
        this.selectedMonth = val;
        this.renderExecutionTable();
        this.renderExecutionKPIs();
        this.renderExecutionCharts();
    },

    setSelectedWeek(val) {
        this.selectedWeek = val;
        this.renderExecutionTable();
        this.renderExecutionKPIs();
        this.renderExecutionCharts();
    },

    setStudentGradeFilter(filter) {
        this.studentGradeFilter = filter;
        this.renderStudentTable();
    },

    // ==========================================
    // RENDER CONTROLLER
    // ==========================================
    render() {
        this.renderPlanMatrix();
        this.renderPlanKPIs();
        this.renderExecutionTable();
        this.renderExecutionKPIs();
        this.renderExecutionCharts();
        this.renderStudentTable();
        this.renderAuditFileList();

        if (window.lucide) window.lucide.createIcons();
    },

    // ==========================================
    // TAB 1: RENDER PLAN MATRIX (IMAGE 1)
    // ==========================================
    renderPlanKPIs() {
        const rows = this.planMatrixData.filter(r => !r.isHeader && !r.isGroupHeader);
        const filtered = this.currentCompany === 'all' ? rows : rows.filter(r => r.company === this.currentCompany);

        const totalDepts = filtered.length;
        let totalRegistrations = 0;
        filtered.forEach(r => {
            if (r.checks) {
                totalRegistrations += Object.values(r.checks).filter(Boolean).length;
            }
        });

        const elDepts = document.getElementById('kpi-plan-depts');
        const elCredits = document.getElementById('kpi-plan-credits');
        const elRegs = document.getElementById('kpi-plan-registrations');
        const elLeader = document.getElementById('kpi-plan-top-unit');

        if (elDepts) elDepts.textContent = totalDepts;
        if (elCredits) elCredits.textContent = '10 Tín chỉ';
        if (elRegs) elRegs.textContent = totalRegistrations.toLocaleString() + ' lượt';
        if (elLeader) elLeader.textContent = 'Tân Hồng Hà (45 lượt)';
    },

    renderPlanMatrix() {
        const tbody = document.getElementById('training-matrix-tbody');
        if (!tbody) return;

        let html = '';
        const colTotals = { tc1: 0, tc2: 0, tc3: 0, iso: 0, sp: 0, nv: 0, gt: 0, nhom: 0, tt: 0, ai: 0 };
        let grandTotal = 0;

        this.planMatrixData.forEach(row => {
            // Apply company filter
            if (this.currentCompany !== 'all' && row.company !== 'all' && row.company !== this.currentCompany) {
                return;
            }

            if (row.isHeader) {
                html += `
                    <tr class="header-group-row">
                        <td style="text-align: center; font-weight: 900; background: #e2e8f0;">${row.stt}</td>
                        <td colspan="12" style="font-weight: 900; background: #e2e8f0; text-transform: uppercase;">${row.name}</td>
                    </tr>
                `;
                return;
            }

            if (row.isGroupHeader) {
                html += `
                    <tr class="header-group-row">
                        <td style="text-align: center; font-weight: 900; background: #f1f5f9; color: #1e40af;">${row.stt}</td>
                        <td colspan="12" style="font-weight: 900; background: #f1f5f9; color: #1e40af;">${row.name}</td>
                    </tr>
                `;
                return;
            }

            // Normal Department Row
            let rowTotal = 0;
            let cellsHtml = '';

            this.matrixColumns.forEach(col => {
                const isChecked = row.checks && row.checks[col.key];
                if (isChecked) {
                    rowTotal++;
                    colTotals[col.key] = (colTotals[col.key] || 0) + 1;
                    cellsHtml += `<td class="matrix-check">x</td>`;
                } else {
                    cellsHtml += `<td class="matrix-empty"></td>`;
                }
            });

            grandTotal += rowTotal;

            html += `
                <tr>
                    <td style="text-align: center; font-weight: 700; color: #475569;">${row.stt}</td>
                    <td class="dept-name">${row.name}</td>
                    ${cellsHtml}
                    <td class="row-total">${rowTotal}</td>
                </tr>
            `;
        });

        // Summary Total Row at Bottom
        let summaryCells = '';
        this.matrixColumns.forEach(col => {
            summaryCells += `<td style="text-align: center; font-weight: 900; color: #1e40af; background: #e0f2fe;">${colTotals[col.key] || 0}</td>`;
        });

        html += `
            <tr class="total-summary-row">
                <td colspan="2" style="text-align: right; padding-right: 16px; text-transform: uppercase;">TỔNG CỘNG CHỈ TIÊU KẾ HOẠCH:</td>
                ${summaryCells}
                <td style="text-align: center; font-weight: 900; font-size: 1.05rem; color: #ffffff; background: #1e40af;">${grandTotal}</td>
            </tr>
        `;

        tbody.innerHTML = html;
    },

    // ==========================================
    // TAB 2: RENDER EXECUTION REPORT (IMAGE 2)
    // ==========================================
    getGradingLevel(score) {
        const num = parseFloat(score) || 0;
        if (num >= 9.0) return { level: 'Tốt', badge: 'tot', color: '#15803d', desc: '≥ 9 điểm' };
        if (num >= 7.0) return { level: 'Khá', badge: 'kha', color: '#1d4ed8', desc: '7 - < 9 điểm' };
        if (num >= 5.0) return { level: 'Trung bình', badge: 'tb', color: '#b45309', desc: '5 - < 7 điểm' };
        return { level: 'Kém', badge: 'kem', color: '#b91c1c', desc: '< 5 điểm' };
    },

    renderExecutionKPIs() {
        let totalPlan = 0;
        let totalActual = 0;

        const multiplier = this.currentCompany === 'all' ? 1.0 : 0.22; // Scaled for single unit
        this.executionModules.forEach(m => {
            if (!m.isGroupHeader) {
                totalPlan += Math.round(m.plan * multiplier);
                totalActual += Math.round(m.actual * multiplier);
            }
        });

        const passRate = totalPlan > 0 ? ((totalActual / totalPlan) * 100).toFixed(1) : 0;

        // Calculate student quality metrics
        const totalStudents = this.students.length;
        let countTot = 0, countKha = 0, countTB = 0, countKem = 0;

        this.students.forEach(s => {
            const grade = this.getGradingLevel(s.score);
            if (grade.badge === 'tot') countTot++;
            else if (grade.badge === 'kha') countKha++;
            else if (grade.badge === 'tb') countTB++;
            else countKem++;
        });

        const highQualityRate = totalStudents > 0 ? (((countTot + countKha) / totalStudents) * 100).toFixed(1) : 0;

        // Audit files count
        const auditFiles = this.getAuditFiles();

        const elPlanAct = document.getElementById('kpi-exec-plan-actual');
        const elRate = document.getElementById('kpi-exec-pass-rate');
        const elQualityRate = document.getElementById('kpi-exec-high-quality-rate');
        const elAuditFiles = document.getElementById('kpi-exec-audit-files');

        if (elPlanAct) elPlanAct.textContent = `${totalActual} / ${totalPlan}`;
        if (elRate) elRate.textContent = `${passRate}%`;
        if (elQualityRate) elQualityRate.textContent = `${highQualityRate}%`;
        if (elAuditFiles) elAuditFiles.textContent = `${auditFiles.length} file`;
    },

    renderExecutionTable() {
        const thead = document.getElementById('training-exec-thead');
        const tbody = document.getElementById('training-exec-tbody');
        if (!thead || !tbody) return;

        const isWeek = this.currentPeriodMode === 'week';
        const numCols = isWeek ? 4 : 12;
        const colPrefix = isWeek ? 'W' : 'T';

        // Render Thead
        let timeHeadersHtml = '';
        for (let i = 1; i <= numCols; i++) {
            timeHeadersHtml += `<th style="width: 45px; text-align: center;">${colPrefix}${i}</th>`;
        }

        thead.innerHTML = `
            <tr>
                <th rowspan="2" style="width: 50px; text-align: center;">STT</th>
                <th rowspan="2" style="min-width: 220px; text-align: left; padding-left: 14px;">TÊN TÍN CHỈ</th>
                <th rowspan="2" style="width: 100px; text-align: center;">KẾ HOẠCH<br>ĐÀO TẠO</th>
                <th rowspan="2" style="width: 100px; text-align: center;">THỰC HIỆN</th>
                <th rowspan="2" style="width: 100px; text-align: center;">TỈ LỆ ĐẠT</th>
                <th colspan="${numCols}" style="text-align: center; background: #e0f2fe; color: #0369a1;">THỜI GIAN ĐÀO TẠO (${isWeek ? 'TUẦN 1 - 4' : 'THÁNG 1 - 12'})</th>
            </tr>
            <tr>
                ${timeHeadersHtml}
            </tr>
        `;

        // Render Tbody
        let tbodyHtml = '';
        let sumPlan = 0, sumActual = 0;
        const colSums = new Array(numCols).fill(0);
        const multiplier = this.currentCompany === 'all' ? 1.0 : 0.22;

        this.executionModules.forEach(row => {
            if (row.isGroupHeader) {
                tbodyHtml += `
                    <tr class="section-title-row">
                        <td style="text-align: center; font-weight: 900;">${row.stt}</td>
                        <td colspan="${4 + numCols}" style="font-weight: 900; text-transform: uppercase;">${row.name}</td>
                    </tr>
                `;
                return;
            }

            const plan = Math.round(row.plan * multiplier);
            const actual = Math.round(row.actual * multiplier);
            sumPlan += plan;
            sumActual += actual;

            const rate = plan > 0 ? ((actual / plan) * 100).toFixed(1) : 0;
            let badgeClass = 'green';
            if (rate < 90) badgeClass = 'blue';
            if (rate < 80) badgeClass = 'yellow';
            if (rate < 60) badgeClass = 'red';

            const timeData = isWeek ? row.weeks : row.months;
            let timeCells = '';

            for (let c = 0; c < numCols; c++) {
                const val = Math.round((timeData[c] || 0) * multiplier);
                colSums[c] += val;
                const highlight = (isWeek && this.selectedWeek === String(c + 1)) || (!isWeek && this.selectedMonth === String(c + 1));
                const bgStyle = highlight ? 'background: #fef08a; font-weight: 900;' : '';
                timeCells += `<td class="num-cell" style="${bgStyle}">${val}</td>`;
            }

            tbodyHtml += `
                <tr>
                    <td style="text-align: center; font-weight: 700; color: #64748b;">${row.stt}</td>
                    <td class="credit-name">${row.name}</td>
                    <td class="num-cell" style="color: #475569;">${plan}</td>
                    <td class="num-cell" style="color: #1e40af; font-weight: 900;">${actual}</td>
                    <td class="rate-cell"><span class="rate-badge ${badgeClass}">${rate}%</span></td>
                    ${timeCells}
                </tr>
            `;
        });

        // Summary row
        const totalRate = sumPlan > 0 ? ((sumActual / sumPlan) * 100).toFixed(1) : 0;
        let sumTimeCells = '';
        for (let c = 0; c < numCols; c++) {
            sumTimeCells += `<td style="text-align: center; font-weight: 900; background: #e2e8f0; color: #1e293b;">${colSums[c]}</td>`;
        }

        tbodyHtml += `
            <tr style="background: #f1f5f9; font-weight: 900; border-top: 2px solid #64748b;">
                <td colspan="2" style="text-align: right; padding-right: 14px; text-transform: uppercase;">TỔNG CỘNG TIẾN ĐỘ:</td>
                <td style="text-align: center; color: #475569;">${sumPlan}</td>
                <td style="text-align: center; color: #1e40af; font-size: 0.95rem;">${sumActual}</td>
                <td style="text-align: center;"><span class="rate-badge green" style="font-size: 0.88rem;">${totalRate}%</span></td>
                ${sumTimeCells}
            </tr>
        `;

        tbody.innerHTML = tbodyHtml;
    },

    // ==========================================
    // TAB 2: CHARTS
    // ==========================================
    renderExecutionCharts() {
        if (typeof Chart === 'undefined') return;

        // 1. Category Bar Chart (Văn hóa, ISO, Chuyên môn, Kỹ năng)
        const canvasCat = document.getElementById('trainingCategoryChart');
        if (canvasCat) {
            const ctx = canvasCat.getContext('2d');
            if (this.charts.category) this.charts.category.destroy();

            const cats = [
                { key: 'vh', label: 'Văn hóa DN' },
                { key: 'iso', label: 'ISO' },
                { key: 'cm', label: 'Chuyên môn' },
                { key: 'kn', label: 'Kỹ năng' }
            ];

            const planData = [];
            const actData = [];

            cats.forEach(c => {
                let p = 0, a = 0;
                this.executionModules.filter(m => m.category === c.key).forEach(m => {
                    p += m.plan;
                    a += m.actual;
                });
                planData.push(p);
                actData.push(a);
            });

            this.charts.category = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: cats.map(c => c.label),
                    datasets: [
                        {
                            label: 'Kế hoạch (Lượt)',
                            data: planData,
                            backgroundColor: '#94a3b8',
                            borderRadius: 6
                        },
                        {
                            label: 'Thực hiện (Lượt)',
                            data: actData,
                            backgroundColor: '#2563eb',
                            borderRadius: 6
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
                        y: { beginAtZero: true, grid: { color: '#f1f5f9' } },
                        x: { grid: { display: false } }
                    }
                }
            });
        }

        // 2. Quality Doughnut Chart (Tốt, Khá, TB, Kém)
        const canvasQuality = document.getElementById('trainingQualityChart');
        if (canvasQuality) {
            const ctx2 = canvasQuality.getContext('2d');
            if (this.charts.quality) this.charts.quality.destroy();

            let countTot = 0, countKha = 0, countTB = 0, countKem = 0;
            this.students.forEach(s => {
                const grade = this.getGradingLevel(s.score);
                if (grade.badge === 'tot') countTot++;
                else if (grade.badge === 'kha') countKha++;
                else if (grade.badge === 'tb') countTB++;
                else countKem++;
            });

            this.charts.quality = new Chart(ctx2, {
                type: 'doughnut',
                data: {
                    labels: [
                        `Tốt (≥9đ): ${countTot}`,
                        `Khá (7-<9đ): ${countKha}`,
                        `Trung bình (5-<7đ): ${countTB}`,
                        `Kém (<5đ): ${countKem}`
                    ],
                    datasets: [{
                        data: [countTot, countKha, countTB, countKem],
                        backgroundColor: ['#16a34a', '#2563eb', '#d97706', '#dc2626'],
                        borderWidth: 2,
                        borderColor: '#ffffff'
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: { position: 'right', labels: { font: { weight: 'bold', size: 11 } } }
                    },
                    cutout: '62%'
                }
            });
        }
    },

    // ==========================================
    // TAB 2: STUDENT ROSTER TABLE (IMAGE 2 MỤC B)
    // ==========================================
    renderStudentTable() {
        const tbody = document.getElementById('training-student-tbody');
        if (!tbody) return;

        let filtered = this.students;
        if (this.currentCompany !== 'all') {
            const compNameMap = {
                'vps': 'VP VPS',
                'thh': 'Tân Hồng Hà',
                'viet': 'Công ty Việt',
                'vpsm': 'VPSM',
                'xesco': 'Công ty Xesco'
            };
            const target = compNameMap[this.currentCompany] || '';
            if (target) {
                filtered = filtered.filter(s => s.company.includes(target) || target.includes(s.company));
            }
        }

        if (this.studentGradeFilter !== 'all') {
            filtered = filtered.filter(s => {
                const g = this.getGradingLevel(s.score);
                return g.badge === this.studentGradeFilter;
            });
        }

        if (filtered.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; padding: 20px; color: #64748b; font-weight: 700;">Không có học viên nào khớp với bộ lọc</td></tr>`;
            return;
        }

        let html = '';
        filtered.forEach((s, idx) => {
            const grade = this.getGradingLevel(s.score);
            html += `
                <tr>
                    <td style="text-align: center; font-weight: 700; color: #64748b;">${idx + 1}</td>
                    <td style="font-weight: 800; color: #1e293b;">${s.name}</td>
                    <td style="font-weight: 600; color: #475569;">${s.company} - ${s.dept}</td>
                    <td style="font-weight: 700; color: #0284c7;">${s.credit}</td>
                    <td style="text-align: center; font-weight: 900; font-size: 0.95rem; color: #0f172a;">${s.score}</td>
                    <td style="text-align: center;"><span class="score-badge ${grade.badge}">${grade.level}</span></td>
                    <td style="font-size: 0.8rem; color: #475569;">${s.note || 'Đã đối chiếu bài thi'}</td>
                    <td style="text-align: center;">
                        <button class="btn-training btn-training-outline" style="padding: 3px 8px; font-size: 0.75rem;" onclick="window.TrainingModule.viewStudentProof('${s.id}')">
                            <i data-lucide="file-check"></i> Minh chứng
                        </button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    // ==========================================
    // UPLOAD & AUDIT FILE MANAGEMENT (USER REQUIREMENT)
    // ==========================================
    getAuditFiles() {
        try {
            if (typeof localStorage !== 'undefined') {
                const raw = localStorage.getItem(this.STORAGE_AUDIT_FILES);
                if (raw) return JSON.parse(raw);
            }
        } catch (e) {}
        return [
            { id: 'f1', name: 'Bang_Diem_Dao_Tao_T9_VP_VPS.xlsx', size: '24.5 KB', uploadDate: '2026-09-20', count: 12, user: 'Admin VPS', status: 'Đã đối chiếu' },
            { id: 'f2', name: 'Ket_Qua_Sat_Hach_ISO_THH.xlsx', size: '32.1 KB', uploadDate: '2026-09-18', count: 18, user: 'P.Nhân sự THH', status: 'Đã đối chiếu' }
        ];
    },

    saveAuditFiles(list) {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(this.STORAGE_AUDIT_FILES, JSON.stringify(list));
            }
        } catch (e) {
            console.error('Failed to save audit files:', e);
        }
    },

    renderAuditFileList() {
        const container = document.getElementById('training-audit-file-list');
        if (!container) return;

        const files = this.getAuditFiles();
        if (files.length === 0) {
            container.innerHTML = `<p style="color: #64748b; font-size: 0.85rem; margin: 0;">Chưa có file kết quả nào được tải lên.</p>`;
            return;
        }

        let html = '';
        files.forEach(f => {
            html += `
                <div class="audit-file-item">
                    <div class="audit-file-info">
                        <i data-lucide="file-spreadsheet" style="color: #16a34a; width: 20px; height: 20px;"></i>
                        <div>
                            <div style="font-weight: 800; color: #1e293b;">${f.name}</div>
                            <div style="font-size: 0.78rem; color: #64748b;">${f.size} • ${f.count} học viên • Ngày tải: ${f.uploadDate} bởi ${f.user}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span class="audit-file-badge">✓ ${f.status}</span>
                        <button class="btn-training btn-training-outline" style="padding: 4px 8px;" onclick="window.TrainingModule.deleteAuditFile('${f.id}')" title="Xóa file">
                            <i data-lucide="trash-2" style="width: 14px; height: 14px; color: #dc2626;"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    handleFileUpload(file) {
        if (!file) return;

        const fileName = file.name;
        const ext = fileName.split('.').pop().toLowerCase();

        if (!['xlsx', 'xls', 'csv'].includes(ext)) {
            alert('Vui lòng chọn file định dạng Excel (.xlsx, .xls) hoặc CSV để hệ thống đọc điểm và đối chiếu kết quả đào tạo!');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const xlsx = this.getXLSX();
                if (!xlsx) {
                    alert('Thư viện đọc Excel chưa sẵn sàng!');
                    return;
                }
                const data = new Uint8Array(e.target.result);
                const workbook = xlsx.read(data, { type: 'array' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];
                const rows = xlsx.utils.sheet_to_json(worksheet, { defval: '' });

                if (rows.length === 0) {
                    alert('File không có dữ liệu học viên!');
                    return;
                }

                // Parse students from rows
                const newStudents = [];
                rows.forEach((r, idx) => {
                    const name = r['Họ và Tên'] || r['Họ tên'] || r['Họ và tên'] || r['Học viên'] || r['Name'] || `Học viên ${idx + 1}`;
                    const company = r['Đơn vị'] || r['Công ty'] || 'Tập đoàn VPS';
                    const dept = r['Phòng ban'] || r['Bộ phận'] || 'Chuyên môn';
                    const credit = r['Tín chỉ đào tạo'] || r['Tín chỉ'] || r['Môn học'] || 'Kiến thức chung';
                    const score = parseFloat(r['Điểm kiểm tra'] || r['Điểm'] || r['Score'] || 8.0);
                    const note = r['Ghi chú'] || 'Đối chiếu từ file ' + fileName;

                    newStudents.push({
                        id: 'IMP_' + Date.now() + '_' + idx,
                        name,
                        company,
                        dept,
                        credit,
                        score: isNaN(score) ? 7.5 : score,
                        note
                    });
                });

                // Prepend new students to list
                this.students = [...newStudents, ...this.students];
                localStorage.setItem(this.STORAGE_STUDENTS, JSON.stringify(this.students));

                // Add to audit files list
                const auditFiles = this.getAuditFiles();
                auditFiles.unshift({
                    id: 'AUDIT_' + Date.now(),
                    name: fileName,
                    size: (file.size / 1024).toFixed(1) + ' KB',
                    uploadDate: new Date().toISOString().split('T')[0],
                    count: newStudents.length,
                    user: 'Quản trị viên',
                    status: 'Đã đối chiếu'
                });
                this.saveAuditFiles(auditFiles);

                // Rerender all components
                this.render();

                alert(`Đã tải lên và đối chiếu thành công ${newStudents.length} kết quả học viên từ file: ${fileName}!\nToàn bộ chỉ tiêu, tỷ lệ chất lượng đã được tự động cập nhật.`);
            } catch (err) {
                console.error('Error parsing file:', err);
                alert('Có lỗi khi đọc file Excel. Vui lòng sử dụng đúng định dạng theo file mẫu!');
            }
        };
        reader.readAsArrayBuffer(file);
    },

    deleteAuditFile(id) {
        if (!confirm('Bạn có chắc chắn muốn xóa bản ghi file đối chiếu này không?')) return;
        let files = this.getAuditFiles();
        files = files.filter(f => f.id !== id);
        this.saveAuditFiles(files);
        this.renderAuditFileList();
        this.renderExecutionKPIs();
    },

    getXLSX() {
        if (typeof window !== 'undefined' && window.XLSX) return window.XLSX;
        if (typeof XLSX !== 'undefined') return XLSX;
        return null;
    },

    downloadExcelTemplate() {
        const xlsx = this.getXLSX();
        if (!xlsx) {
            alert('Thư viện Excel chưa sẵn sàng. Vui lòng thử lại sau 2 giây!');
            return;
        }

        const templateData = [
            {
                'STT': 1,
                'Mã NV': 'VPS001',
                'Họ và Tên': 'Nguyễn Văn A',
                'Đơn vị': 'VP VPS',
                'Phòng ban': 'Phòng Tài chính',
                'Tín chỉ đào tạo': 'Phật pháp 1',
                'Điểm kiểm tra': 9.5,
                'Xếp loại tự động': 'Tốt',
                'Ghi chú': 'Nắm vững kiến thức văn hóa'
            },
            {
                'STT': 2,
                'Mã NV': 'THH002',
                'Họ và Tên': 'Trần Thị B',
                'Đơn vị': 'Tân Hồng Hà',
                'Phòng ban': 'Phòng Kỹ thuật',
                'Tín chỉ đào tạo': 'Sản phẩm',
                'Điểm kiểm tra': 8.0,
                'Xếp loại tự động': 'Khá',
                'Ghi chú': 'Bảo dưỡng máy thành thạo'
            },
            {
                'STT': 3,
                'Mã NV': 'VIET003',
                'Họ và Tên': 'Lê Văn C',
                'Đơn vị': 'Công ty Việt',
                'Phòng ban': 'Phòng KD tổng hợp',
                'Tín chỉ đào tạo': 'Kỹ năng giao tiếp',
                'Điểm kiểm tra': 6.5,
                'Xếp loại tự động': 'Trung bình',
                'Ghi chú': 'Cần cải thiện kỹ năng lắng nghe'
            },
            {
                'STT': 4,
                'Mã NV': 'VPSM004',
                'Họ và Tên': 'Phạm Hoàng D',
                'Đơn vị': 'VPSM',
                'Phòng ban': 'Phòng KD Online',
                'Tín chỉ đào tạo': 'Nghiệp vụ',
                'Điểm kiểm tra': 4.5,
                'Xếp loại tự động': 'Kém',
                'Ghi chú': 'Đăng ký đào tạo và thi lại'
            }
        ];

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(templateData);

        // Styling columns width
        ws['!cols'] = [
            { wch: 6 },
            { wch: 12 },
            { wch: 22 },
            { wch: 18 },
            { wch: 22 },
            { wch: 25 },
            { wch: 14 },
            { wch: 16 },
            { wch: 30 }
        ];

        xlsx.utils.book_append_sheet(wb, ws, 'Ket_Qua_Dao_Tao');
        xlsx.writeFile(wb, 'Mau_Ket_Qua_Danh_Gia_Dao_Tao_VPS.xlsx');
    },

    exportPlanMatrix() {
        const xlsx = this.getXLSX();
        if (!xlsx) return;

        const rows = [];
        this.planMatrixData.forEach(r => {
            if (r.isHeader || r.isGroupHeader) {
                rows.push({
                    'STT': r.stt,
                    'ĐỐI TƯỢNG': r.name,
                    'TC1': '', 'TC2': '', 'TC3': '', 'ISO QT-QĐ': '', 'Sản phẩm': '', 'Nghiệp vụ': '', 'Giao tiếp': '', 'Kỹ năng nhóm': '', 'Thuyết trình': '', 'Công nghệ AI': '',
                    'TỔNG': ''
                });
            } else {
                let total = 0;
                const obj = {
                    'STT': r.stt,
                    'ĐỐI TƯỢNG': r.name
                };
                this.matrixColumns.forEach(c => {
                    const chk = r.checks && r.checks[c.key];
                    obj[c.label] = chk ? 'x' : '';
                    if (chk) total++;
                });
                obj['TỔNG'] = total;
                rows.push(obj);
            }
        });

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(rows);
        xlsx.utils.book_append_sheet(wb, ws, 'Ke_Hoach_Dao_Tao');
        xlsx.writeFile(wb, 'Ma_Tran_Ke_Hoach_Dao_Tao_VPS.xlsx');
    },

    exportExecutionReport() {
        const xlsx = this.getXLSX();
        if (!xlsx) return;

        const rows = [];
        this.executionModules.forEach(m => {
            if (m.isGroupHeader) {
                rows.push({ 'STT': m.stt, 'TÊN TÍN CHỈ': m.name, 'KẾ HOẠCH': '', 'THỰC HIỆN': '', 'TỈ LỆ ĐẠT': '' });
            } else {
                rows.push({
                    'STT': m.stt,
                    'TÊN TÍN CHỈ': m.name,
                    'KẾ HOẠCH': m.plan,
                    'THỰC HIỆN': m.actual,
                    'TỈ LỆ ĐẠT': ((m.actual / m.plan) * 100).toFixed(1) + '%'
                });
            }
        });

        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(rows);
        xlsx.utils.book_append_sheet(wb, ws, 'Thuc_Hien_Dao_Tao');
        xlsx.writeFile(wb, 'Bao_Cao_Thuc_Hien_Dao_Tao_VPS.xlsx');
    },

    viewStudentProof(id) {
        const student = this.students.find(s => s.id === id);
        if (!student) return;
        const grade = this.getGradingLevel(student.score);
        alert(`THÔNG TIN MINH CHỨNG KẾT QUẢ ĐÀO TẠO:\n- Học viên: ${student.name}\n- Đơn vị: ${student.company} - ${student.dept}\n- Tín chỉ: ${student.credit}\n- Điểm kiểm tra: ${student.score} / 10\n- Cấp độ năng lực: ${grade.level} (${grade.desc})\n- Tình trạng minh chứng: File bài kiểm tra đã được hội đồng đào tạo nghiệm thu hợp lệ.`);
    }
};

// Global accessor for buttons
window.switchTrainingTab = function(tab) {
    if (window.TrainingModule) window.TrainingModule.switchTab(tab);
};
