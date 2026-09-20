/**
 * Project Revenue Module (2.1. Doanh Số Dự Án)
 * Manages project sales KPIs, charts, data filtering, and CRUD operations.
 */

window.ProjectRevenueModule = {
    // Initial Seed Data (14 Real-world VPS Group Projects)
    initialProjects: [
        {
            id: 'DA-2026-THH01',
            name: 'Cung cấp hệ thống máy in đa chức năng & dịch vụ bảo trì Sở GD&ĐT',
            company: 'Tân Hồng Hà',
            companyKey: 'THH',
            customer: 'Sở Giáo Dục & Đào Tạo Tỉnh Hải Dương',
            type: 'Gói thầu Thiết bị',
            contractValue: 3500000000,
            planRevenue: 3200000000,
            actualRevenue: 2800000000,
            grossProfit: 840000000,
            grossProfitRate: 30.0,
            progress: 80,
            status: 'in-progress',
            statusLabel: 'Đang triển khai',
            startDate: '02/2026',
            endDate: '11/2026'
        },
        {
            id: 'DA-2026-THH02',
            name: 'Dự án trang bị giải pháp in ấn bảo mật Ngân hàng Agribank',
            company: 'Tân Hồng Hà',
            companyKey: 'THH',
            customer: 'Agribank Chi nhánh Đông Hải',
            type: 'Giải pháp & Phần mềm',
            contractValue: 1800000000,
            planRevenue: 1800000000,
            actualRevenue: 1800000000,
            grossProfit: 450000000,
            grossProfitRate: 25.0,
            progress: 100,
            status: 'completed',
            statusLabel: 'Hoàn thành',
            startDate: '01/2026',
            endDate: '06/2026'
        },
        {
            id: 'DA-2026-THH03',
            name: 'Dự án thuê máy in tốc độ cao & quản lý tài liệu Tổng công ty Điện lực',
            company: 'Tân Hồng Hà',
            companyKey: 'THH',
            customer: 'Tổng Công ty Điện lực Miền Bắc',
            type: 'Dịch vụ Thuê máy lớn',
            contractValue: 2400000000,
            planRevenue: 2200000000,
            actualRevenue: 1600000000,
            grossProfit: 560000000,
            grossProfitRate: 35.0,
            progress: 72,
            status: 'in-progress',
            statusLabel: 'Đang triển khai',
            startDate: '03/2026',
            endDate: '12/2026'
        },
        {
            id: 'DA-2026-V01',
            name: 'Triển khai hạ tầng in ấn mạng đồng bộ Cục Thuế TP Hà Nội',
            company: 'Việt',
            companyKey: 'Viet',
            customer: 'Cục Thuế TP Hà Nội',
            type: 'Gói thầu Thiết bị',
            contractValue: 2100000000,
            planRevenue: 1900000000,
            actualRevenue: 1350000000,
            grossProfit: 472500000,
            grossProfitRate: 35.0,
            progress: 71,
            status: 'in-progress',
            statusLabel: 'Đang triển khai',
            startDate: '02/2026',
            endDate: '10/2026'
        },
        {
            id: 'DA-2026-V02',
            name: 'Cung cấp máy quét công nghiệp & số hóa bệnh án Bệnh viện Bạch Mai',
            company: 'Việt',
            companyKey: 'Viet',
            customer: 'Bệnh viện Bạch Mai',
            type: 'Số hóa & CNTT',
            contractValue: 1500000000,
            planRevenue: 1500000000,
            actualRevenue: 1500000000,
            grossProfit: 390000000,
            grossProfitRate: 26.0,
            progress: 100,
            status: 'completed',
            statusLabel: 'Hoàn thành',
            startDate: '01/2026',
            endDate: '05/2026'
        },
        {
            id: 'DA-2026-V03',
            name: 'Chào thầu dự án cung cấp thiết bị tin học Trường ĐH Bách Khoa',
            company: 'Việt',
            companyKey: 'Viet',
            customer: 'Trường Đại học Bách Khoa Hà Nội',
            type: 'Gói thầu Thiết bị',
            contractValue: 1200000000,
            planRevenue: 1100000000,
            actualRevenue: 0,
            grossProfit: 275000000,
            grossProfitRate: 25.0,
            progress: 20,
            status: 'bidding',
            statusLabel: 'Đang đấu thầu',
            startDate: '08/2026',
            endDate: '12/2026'
        },
        {
            id: 'DA-2026-XS01',
            name: 'Hiện đại hóa trung tâm in ấn xuất bản Tập đoàn Giáo dục',
            company: 'Xem Sơn',
            companyKey: 'XemSon',
            customer: 'Công ty CP Đầu tư & Xuất bản Giáo dục',
            type: 'Thiết bị Công nghiệp',
            contractValue: 4200000000,
            planRevenue: 3800000000,
            actualRevenue: 3100000000,
            grossProfit: 820000000,
            grossProfitRate: 26.5,
            progress: 81,
            status: 'in-progress',
            statusLabel: 'Đang triển khai',
            startDate: '02/2026',
            endDate: '11/2026'
        },
        {
            id: 'DA-2026-XS02',
            name: 'Cung cấp máy in kỹ thuật số công nghiệp Fujifilm Revoria',
            company: 'Xem Sơn',
            companyKey: 'XemSon',
            customer: 'Công ty TNHH In ấn Bao bì Á Châu',
            type: 'Thiết bị Công nghiệp',
            contractValue: 2800000000,
            planRevenue: 2800000000,
            actualRevenue: 2800000000,
            grossProfit: 680000000,
            grossProfitRate: 24.3,
            progress: 100,
            status: 'completed',
            statusLabel: 'Hoàn thành',
            startDate: '03/2026',
            endDate: '07/2026'
        },
        {
            id: 'DA-2026-XS03',
            name: 'Hồ sơ thầu hệ thống máy in đa chức năng Sở Tài nguyên Môi trường',
            company: 'Xem Sơn',
            companyKey: 'XemSon',
            customer: 'Sở Tài nguyên và Môi trường',
            type: 'Gói thầu Thiết bị',
            contractValue: 1600000000,
            planRevenue: 1500000000,
            actualRevenue: 0,
            grossProfit: 375000000,
            grossProfitRate: 25.0,
            progress: 15,
            status: 'bidding',
            statusLabel: 'Đang đấu thầu',
            startDate: '09/2026',
            endDate: '12/2026'
        },
        {
            id: 'DA-2026-VM01',
            name: 'Gói thuê máy in đa chức năng khối văn phòng Tập đoàn Bất động sản',
            company: 'VPS M',
            companyKey: 'VPSM',
            customer: 'Tập đoàn Bất động sản Novaland',
            type: 'Dịch vụ Thuê máy lớn',
            contractValue: 1800000000,
            planRevenue: 1600000000,
            actualRevenue: 1100000000,
            grossProfit: 385000000,
            grossProfitRate: 35.0,
            progress: 68,
            status: 'in-progress',
            statusLabel: 'Đang triển khai',
            startDate: '01/2026',
            endDate: '12/2026'
        },
        {
            id: 'DA-2026-VM02',
            name: 'Cung cấp máy văn phòng cho chuỗi phòng giao dịch ngân hàng MB',
            company: 'VPS M',
            companyKey: 'VPSM',
            customer: 'Ngân hàng Quân Đội (MB)',
            type: 'Gói thầu Thiết bị',
            contractValue: 1400000000,
            planRevenue: 1400000000,
            actualRevenue: 1400000000,
            grossProfit: 320000000,
            grossProfitRate: 22.8,
            progress: 100,
            status: 'completed',
            statusLabel: 'Hoàn thành',
            startDate: '02/2026',
            endDate: '06/2026'
        },
        {
            id: 'DA-2026-IT01',
            name: 'Hạ tầng mạng in ấn và số hóa tập trung Đài Truyền hình KTS VTC',
            company: 'ITSS',
            companyKey: 'ITSS',
            customer: 'Đài Truyền hình Kỹ thuật số VTC',
            type: 'Số hóa & CNTT',
            contractValue: 1650000000,
            planRevenue: 1500000000,
            actualRevenue: 1120000000,
            grossProfit: 380000000,
            grossProfitRate: 34.0,
            progress: 75,
            status: 'in-progress',
            statusLabel: 'Đang triển khai',
            startDate: '03/2026',
            endDate: '10/2026'
        },
        {
            id: 'DA-2026-IT02',
            name: 'Giải pháp phần mềm kiểm soát chi phí in ấn văn phòng thông minh',
            company: 'ITSS',
            companyKey: 'ITSS',
            customer: 'Tổng Công ty Bảo hiểm PVI',
            type: 'Giải pháp & Phần mềm',
            contractValue: 850000000,
            planRevenue: 850000000,
            actualRevenue: 850000000,
            grossProfit: 290000000,
            grossProfitRate: 34.1,
            progress: 100,
            status: 'completed',
            statusLabel: 'Hoàn thành',
            startDate: '01/2026',
            endDate: '04/2026'
        },
        {
            id: 'DA-2026-VP01',
            name: 'Dự án trang bị thiết bị văn phòng Ban Cơ yếu Chính phủ',
            company: 'Văn phòng VPS',
            companyKey: 'VPVPS',
            customer: 'Ban Cơ yếu Chính phủ',
            type: 'Gói thầu Thiết bị',
            contractValue: 1100000000,
            planRevenue: 1000000000,
            actualRevenue: 750000000,
            grossProfit: 260000000,
            grossProfitRate: 34.7,
            progress: 75,
            status: 'pending-accept',
            statusLabel: 'Chờ nghiệm thu',
            startDate: '04/2026',
            endDate: '10/2026'
        }
    ],

    // State
    projects: [],
    currentFilterCompany: 'all',
    currentFilterStatus: 'all',
    currentFilterType: 'all',
    currentSearchText: '',
    editingProjectId: null,

    init() {
        this.loadProjects();
        this.bindEvents();
    },

    loadProjects() {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                const saved = window.localStorage.getItem('vps_project_revenue_data');
                if (saved) {
                    this.projects = JSON.parse(saved);
                    return;
                }
            }
            this.projects = JSON.parse(JSON.stringify(this.initialProjects));
            this.saveProjects();
        } catch (e) {
            console.warn('Error loading projects data, using default:', e);
            this.projects = JSON.parse(JSON.stringify(this.initialProjects));
        }
    },

    saveProjects() {
        try {
            if (typeof window !== 'undefined' && window.localStorage) {
                window.localStorage.setItem('vps_project_revenue_data', JSON.stringify(this.projects));
            }
        } catch (e) {
            console.warn('Error saving projects to localStorage:', e);
        }
    },

    bindEvents() {
        // Global filter sync
        document.addEventListener('vps_filter_changed', (e) => {
            if (e.detail && e.detail.company) {
                const compSelect = document.getElementById('proj-filter-company');
                if (compSelect) {
                    compSelect.value = e.detail.company;
                    this.currentFilterCompany = e.detail.company;
                    this.render();
                }
            }
        });

        // Local filters
        const compFilter = document.getElementById('proj-filter-company');
        if (compFilter) {
            compFilter.addEventListener('change', (e) => {
                this.currentFilterCompany = e.target.value;
                this.render();
            });
        }

        const statusFilter = document.getElementById('proj-filter-status');
        if (statusFilter) {
            statusFilter.addEventListener('change', (e) => {
                this.currentFilterStatus = e.target.value;
                this.render();
            });
        }

        const typeFilter = document.getElementById('proj-filter-type');
        if (typeFilter) {
            typeFilter.addEventListener('change', (e) => {
                this.currentFilterType = e.target.value;
                this.render();
            });
        }

        const searchInput = document.getElementById('proj-search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.currentSearchText = e.target.value.toLowerCase().trim();
                this.render();
            });
        }

        // Action Buttons
        const btnAdd = document.getElementById('btn-proj-add');
        if (btnAdd) {
            btnAdd.addEventListener('click', () => this.openModal());
        }

        const btnExport = document.getElementById('btn-proj-export');
        if (btnExport) {
            btnExport.addEventListener('click', () => this.exportToCSV());
        }

        const btnTemplate = document.getElementById('btn-proj-template');
        if (btnTemplate) {
            btnTemplate.addEventListener('click', () => this.downloadTemplate());
        }

        // Modal Events
        const modal = document.getElementById('project-modal');
        const btnClose = document.getElementById('btn-modal-close');
        const btnCancel = document.getElementById('btn-modal-cancel');
        const modalForm = document.getElementById('project-modal-form');

        if (btnClose) btnClose.addEventListener('click', () => this.closeModal());
        if (btnCancel) btnCancel.addEventListener('click', () => this.closeModal());
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeModal();
            });
        }

        if (modalForm) {
            modalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveModalData();
            });
        }
    },

    getFilteredProjects() {
        return this.projects.filter(p => {
            // Filter company
            if (this.currentFilterCompany !== 'all') {
                const c = this.currentFilterCompany.toLowerCase();
                const pComp = p.company.toLowerCase();
                if (!pComp.includes(c) && !c.includes(pComp)) {
                    // check abbreviation
                    const matchMap = {
                        'thh': 'tân hồng hà',
                        'viet': 'việt',
                        'xemson': 'xem sơn',
                        'vpsm': 'vps m',
                        'itss': 'itss',
                        'vpvps': 'văn phòng vps'
                    };
                    if (matchMap[c] && !pComp.includes(matchMap[c])) return false;
                    else if (!matchMap[c]) return false;
                }
            }

            // Filter status
            if (this.currentFilterStatus !== 'all') {
                if (p.status !== this.currentFilterStatus) return false;
            }

            // Filter type
            if (this.currentFilterType !== 'all') {
                if (p.type !== this.currentFilterType) return false;
            }

            // Filter search text
            if (this.currentSearchText) {
                const search = this.currentSearchText;
                const matchId = p.id.toLowerCase().includes(search);
                const matchName = p.name.toLowerCase().includes(search);
                const matchCust = p.customer.toLowerCase().includes(search);
                const matchComp = p.company.toLowerCase().includes(search);
                if (!matchId && !matchName && !matchCust && !matchComp) return false;
            }

            return true;
        });
    },

    render() {
        const filtered = this.getFilteredProjects();
        this.renderKPIs(filtered);
        this.renderCharts(filtered);
        this.renderTable(filtered);
        if (window.lucide) window.lucide.createIcons();
    },

    renderKPIs(filtered) {
        let totalActual = 0;
        let totalPlan = 0;
        let totalContract = 0;
        let totalGrossProfit = 0;
        let countCompleted = 0;
        let countInProgress = 0;
        let countBidding = 0;

        filtered.forEach(p => {
            totalActual += (Number(p.actualRevenue) || 0);
            totalPlan += (Number(p.planRevenue) || 0);
            totalContract += (Number(p.contractValue) || 0);
            totalGrossProfit += (Number(p.grossProfit) || 0);

            if (p.status === 'completed') countCompleted++;
            else if (p.status === 'in-progress') countInProgress++;
            else if (p.status === 'bidding') countBidding++;
        });

        const pctAchieved = totalPlan > 0 ? ((totalActual / totalPlan) * 100).toFixed(1) : 0;
        const profitRate = totalActual > 0 ? ((totalGrossProfit / totalActual) * 100).toFixed(1) : 0;

        // KPI 1: Doanh số thực hiện
        const elActual = document.getElementById('proj-kpi-actual');
        const elActualSub = document.getElementById('proj-kpi-actual-sub');
        if (elActual) {
            elActual.textContent = (totalActual / 1e9).toFixed(2) + ' Tỷ ₫';
        }
        if (elActualSub) {
            elActualSub.innerHTML = `<span class="badge-pill badge-pill-green">Đạt ${pctAchieved}%</span> kế hoạch (${(totalPlan / 1e9).toFixed(2)} Tỷ)`;
        }

        // KPI 2: Tổng giá trị hợp đồng
        const elContract = document.getElementById('proj-kpi-contract');
        const elContractSub = document.getElementById('proj-kpi-contract-sub');
        if (elContract) {
            elContract.textContent = (totalContract / 1e9).toFixed(2) + ' Tỷ ₫';
        }
        if (elContractSub) {
            elContractSub.innerHTML = `Đã thu: <strong style="color: #2563eb;">${((totalActual / (totalContract || 1)) * 100).toFixed(1)}%</strong> giá trị gói`;
        }

        // KPI 3: Số lượng dự án
        const elCount = document.getElementById('proj-kpi-count');
        const elCountSub = document.getElementById('proj-kpi-count-sub');
        if (elCount) {
            elCount.textContent = filtered.length + ' Dự án';
        }
        if (elCountSub) {
            elCountSub.innerHTML = `<span style="color:#15803d; font-weight:600;">${countCompleted} hoàn thành</span> • <span style="color:#1d4ed8; font-weight:600;">${countInProgress} đang chạy</span>`;
        }

        // KPI 4: Lãi gộp dự án
        const elProfit = document.getElementById('proj-kpi-profit');
        const elProfitSub = document.getElementById('proj-kpi-profit-sub');
        if (elProfit) {
            elProfit.textContent = (totalGrossProfit / 1e9).toFixed(2) + ' Tỷ ₫';
        }
        if (elProfitSub) {
            elProfitSub.innerHTML = `Biên lãi gộp TB: <span class="badge-pill badge-pill-blue">${profitRate}%</span>`;
        }
    },

    renderCharts(filtered) {
        // Chart 1: Doanh số dự án theo Công ty (Kế hoạch vs Thực hiện)
        const companies = ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS', 'Văn phòng VPS'];
        const compActual = {};
        const compPlan = {};

        companies.forEach(c => {
            compActual[c] = 0;
            compPlan[c] = 0;
        });

        filtered.forEach(p => {
            companies.forEach(c => {
                if (p.company.includes(c) || c.includes(p.company)) {
                    compActual[c] += (Number(p.actualRevenue) || 0) / 1e9;
                    compPlan[c] += (Number(p.planRevenue) || 0) / 1e9;
                }
            });
        });

        const barData = {
            labels: companies,
            datasets: [
                {
                    label: 'Thực Hiện (Tỷ ₫)',
                    data: companies.map(c => Number(compActual[c].toFixed(2))),
                    backgroundColor: '#10b981',
                    borderRadius: 4
                },
                {
                    label: 'Kế Hoạch (Tỷ ₫)',
                    data: companies.map(c => Number(compPlan[c].toFixed(2))),
                    backgroundColor: '#3b82f6',
                    borderRadius: 4
                }
            ]
        };

        if (window.ChartManager) {
            window.ChartManager.createChart('projectRevenueBarChart', 'bar', barData, {
                plugins: {
                    legend: { position: 'top' },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.dataset.label}: ${ctx.raw} Tỷ ₫`
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Tỷ VNĐ' }
                    }
                }
            });
        }

        // Chart 2: Cơ cấu Doanh số theo Loại hình dự án (Donut)
        const typeMap = {};
        filtered.forEach(p => {
            const t = p.type || 'Khác';
            typeMap[t] = (typeMap[t] || 0) + ((Number(p.actualRevenue) || 0) / 1e9);
        });

        const typeLabels = Object.keys(typeMap);
        const typeValues = typeLabels.map(k => Number(typeMap[k].toFixed(2)));
        const donutColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ec4899', '#06b6d4'];

        const pieData = {
            labels: typeLabels,
            datasets: [{
                data: typeValues,
                backgroundColor: donutColors.slice(0, typeLabels.length),
                borderWidth: 2,
                borderColor: '#ffffff'
            }]
        };

        if (window.ChartManager) {
            window.ChartManager.createChart('projectTypePieChart', 'doughnut', pieData, {
                plugins: {
                    legend: { position: 'right' },
                    tooltip: {
                        callbacks: {
                            label: (ctx) => `${ctx.label}: ${ctx.raw} Tỷ ₫`
                        }
                    }
                },
                cutout: '60%'
            });
        }

        // Chart 3: Tiến độ Doanh số dự án theo Quý (Line / Bar kết hợp)
        const quarterPlan = [4.5, 6.2, 7.8, 8.5];
        const quarterActual = [4.2, 5.8, 4.4, 0]; // Q3 đang chạy, Q4 sắp tới

        const trendData = {
            labels: ['Quý 1/2026', 'Quý 2/2026', 'Quý 3/2026', 'Quý 4/2026 (Dự kiến)'],
            datasets: [
                {
                    type: 'bar',
                    label: 'Doanh Số Thực Hiện (Tỷ ₫)',
                    data: quarterActual,
                    backgroundColor: '#10b981',
                    borderRadius: 5
                },
                {
                    type: 'line',
                    label: 'Mục Tiêu Kế Hoạch (Tỷ ₫)',
                    data: quarterPlan,
                    borderColor: '#2563eb',
                    borderWidth: 3,
                    pointBackgroundColor: '#2563eb',
                    tension: 0.2
                }
            ]
        };

        if (window.ChartManager) {
            window.ChartManager.createChart('projectTrendChart', 'bar', trendData, {
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: { display: true, text: 'Tỷ VNĐ' }
                    }
                }
            });
        }
    },

    renderTable(filtered) {
        const tbody = document.getElementById('project-table-tbody');
        const countSpan = document.getElementById('project-table-count');
        if (!tbody) return;

        if (countSpan) countSpan.textContent = `(${filtered.length} dự án)`;

        if (filtered.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="10" style="text-align: center; padding: 40px; color: #94a3b8;">
                        <i data-lucide="folder-search" style="width: 36px; height: 36px; stroke-width: 1.5; margin-bottom: 8px; display: inline-block;"></i>
                        <p style="margin: 0; font-size: 0.9rem;">Không tìm thấy dự án nào phù hợp với bộ lọc hiện tại.</p>
                    </td>
                </tr>
            `;
            return;
        }

        const formatCurrency = (val) => {
            if (!val || isNaN(val)) return '0 ₫';
            return Number(val).toLocaleString('vi-VN') + ' ₫';
        };

        let html = '';
        filtered.forEach((p, index) => {
            // Status badge
            let statusClass = 'in-progress';
            if (p.status === 'completed') statusClass = 'completed';
            else if (p.status === 'bidding') statusClass = 'bidding';
            else if (p.status === 'pending-accept') statusClass = 'pending-accept';

            // Progress fill color
            let fillClass = 'fill-blue';
            if (p.progress >= 100) fillClass = 'fill-green';
            else if (p.progress < 30) fillClass = 'fill-purple';
            else if (p.progress < 70) fillClass = 'fill-amber';

            // Calculate rate
            const achieveRate = p.planRevenue > 0 ? ((p.actualRevenue / p.planRevenue) * 100).toFixed(1) : 0;

            html += `
                <tr>
                    <td style="text-align: center; font-weight: 600; color: #64748b;">${index + 1}</td>
                    <td style="font-family: monospace; font-weight: 700; color: #0284c7; white-space: nowrap;">${p.id}</td>
                    <td>
                        <div style="font-weight: 600; color: #0f172a; margin-bottom: 2px;">${p.name}</div>
                        <div style="font-size: 0.75rem; color: #64748b;">
                            <i data-lucide="building" style="width: 12px; height: 12px; display: inline-block; vertical-align: middle;"></i> 
                            ${p.customer} • <span style="color: #0284c7;">${p.type}</span>
                        </div>
                    </td>
                    <td><span class="badge-unit">${p.company}</span></td>
                    <td style="text-align: right; font-weight: 600; color: #334155; white-space: nowrap;">${formatCurrency(p.contractValue)}</td>
                    <td style="text-align: right; font-weight: 700; color: #16a34a; white-space: nowrap;">${formatCurrency(p.actualRevenue)}</td>
                    <td>
                        <div class="project-progress-wrap">
                            <div class="project-progress-bar">
                                <div class="project-progress-fill ${fillClass}" style="width: ${Math.min(100, p.progress)}%;"></div>
                            </div>
                            <span class="project-progress-pct">${p.progress}%</span>
                        </div>
                    </td>
                    <td style="text-align: right; white-space: nowrap;">
                        <span style="font-weight: 600; color: #0369a1;">${formatCurrency(p.grossProfit)}</span>
                        <div style="font-size: 0.72rem; color: #64748b;">(${p.grossProfitRate || 0}%)</div>
                    </td>
                    <td><span class="badge-status ${statusClass}">${p.statusLabel || p.status}</span></td>
                    <td style="text-align: center; white-space: nowrap;">
                        <button class="btn-row-action" title="Chỉnh sửa dự án" onclick="window.ProjectRevenueModule.openModal('${p.id}')">
                            <i data-lucide="edit-2" style="width: 14px; height: 14px;"></i>
                        </button>
                        <button class="btn-row-action delete" title="Xóa dự án" onclick="window.ProjectRevenueModule.deleteProject('${p.id}')">
                            <i data-lucide="trash-2" style="width: 14px; height: 14px;"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
    },

    openModal(projectId = null) {
        this.editingProjectId = projectId;
        const modal = document.getElementById('project-modal');
        const modalTitle = document.getElementById('modal-project-title');
        const form = document.getElementById('project-modal-form');

        if (!modal || !form) return;

        if (projectId) {
            const p = this.projects.find(x => x.id === projectId);
            if (p) {
                if (modalTitle) modalTitle.textContent = 'Chỉnh Sửa Dự Án';
                document.getElementById('modal-proj-id').value = p.id;
                document.getElementById('modal-proj-id').disabled = true;
                document.getElementById('modal-proj-name').value = p.name;
                document.getElementById('modal-proj-company').value = p.company;
                document.getElementById('modal-proj-customer').value = p.customer;
                document.getElementById('modal-proj-type').value = p.type;
                document.getElementById('modal-proj-contract').value = p.contractValue;
                document.getElementById('modal-proj-plan').value = p.planRevenue;
                document.getElementById('modal-proj-actual').value = p.actualRevenue;
                document.getElementById('modal-proj-profit').value = p.grossProfit;
                document.getElementById('modal-proj-rate').value = p.grossProfitRate;
                document.getElementById('modal-proj-progress').value = p.progress;
                document.getElementById('modal-proj-status').value = p.status;
            }
        } else {
            if (modalTitle) modalTitle.textContent = 'Thêm Mới Dự Án';
            form.reset();
            const newId = 'DA-2026-' + String(Math.floor(100 + Math.random() * 900));
            const idInput = document.getElementById('modal-proj-id');
            if (idInput) {
                idInput.value = newId;
                idInput.disabled = false;
            }
            document.getElementById('modal-proj-progress').value = '10';
        }

        modal.style.display = 'flex';
        if (window.lucide) window.lucide.createIcons();
    },

    closeModal() {
        const modal = document.getElementById('project-modal');
        if (modal) modal.style.display = 'none';
        this.editingProjectId = null;
    },

    saveModalData() {
        const id = document.getElementById('modal-proj-id').value.trim();
        const name = document.getElementById('modal-proj-name').value.trim();
        const company = document.getElementById('modal-proj-company').value;
        const customer = document.getElementById('modal-proj-customer').value.trim();
        const type = document.getElementById('modal-proj-type').value;
        const contractValue = Number(document.getElementById('modal-proj-contract').value) || 0;
        const planRevenue = Number(document.getElementById('modal-proj-plan').value) || 0;
        const actualRevenue = Number(document.getElementById('modal-proj-actual').value) || 0;
        const grossProfit = Number(document.getElementById('modal-proj-profit').value) || 0;
        const grossProfitRate = Number(document.getElementById('modal-proj-rate').value) || 0;
        const progress = Number(document.getElementById('modal-proj-progress').value) || 0;
        const status = document.getElementById('modal-proj-status').value;

        const statusLabelMap = {
            'in-progress': 'Đang triển khai',
            'completed': 'Hoàn thành',
            'pending-accept': 'Chờ nghiệm thu',
            'bidding': 'Đang đấu thầu'
        };

        const projectData = {
            id,
            name,
            company,
            companyKey: company,
            customer,
            type,
            contractValue,
            planRevenue,
            actualRevenue,
            grossProfit,
            grossProfitRate,
            progress,
            status,
            statusLabel: statusLabelMap[status] || status,
            startDate: '01/2026',
            endDate: '12/2026'
        };

        if (this.editingProjectId) {
            const index = this.projects.findIndex(p => p.id === this.editingProjectId);
            if (index !== -1) {
                this.projects[index] = { ...this.projects[index], ...projectData };
            }
        } else {
            // Check if duplicate id
            if (this.projects.some(p => p.id === id)) {
                alert('Mã dự án đã tồn tại. Vui lòng nhập mã khác.');
                return;
            }
            this.projects.unshift(projectData);
        }

        this.saveProjects();
        this.closeModal();
        this.render();
    },

    deleteProject(projectId) {
        if (confirm(`Bạn có chắc chắn muốn xóa dự án "${projectId}" khỏi danh sách?`)) {
            this.projects = this.projects.filter(p => p.id !== projectId);
            this.saveProjects();
            this.render();
        }
    },

    exportToCSV() {
        const filtered = this.getFilteredProjects();
        if (filtered.length === 0) {
            alert('Không có dữ liệu dự án để xuất.');
            return;
        }

        const headers = ['STT', 'Mã Dự Án', 'Tên Dự Án', 'Đơn Vị', 'Khách Hàng/Chủ Đầu Tư', 'Loại Hình', 'Giá Trị Hợp Đồng (VNĐ)', 'Doanh Số Thực Hiện (VNĐ)', 'Tiến Độ (%)', 'Lãi Gộp Dự Kiến (VNĐ)', 'Tỷ Lệ Lãi Gộp (%)', 'Trạng Thái'];
        const rows = filtered.map((p, i) => [
            i + 1,
            `"${p.id}"`,
            `"${p.name.replace(/"/g, '""')}"`,
            `"${p.company}"`,
            `"${p.customer.replace(/"/g, '""')}"`,
            `"${p.type}"`,
            p.contractValue,
            p.actualRevenue,
            p.progress,
            p.grossProfit,
            p.grossProfitRate,
            `"${p.statusLabel}"`
        ]);

        const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `Bao_Cao_Doanh_So_Du_An_VPS_${new Date().toISOString().slice(0,10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },

    downloadTemplate() {
        const headers = ['STT', 'Mã Dự Án', 'Tên Dự Án', 'Đơn Vị', 'Khách Hàng', 'Loại Hình', 'Giá Trị HĐ', 'Kế Hoạch', 'Thực Hiện', 'Lãi Gộp', 'Tiến Độ %', 'Trạng Thái'];
        const sampleRow = [
            1,
            'DA-2026-THH01',
            'Cung cấp máy in & bảo trì',
            'Tân Hồng Hà',
            'Sở GD&ĐT Tỉnh Hải Dương',
            'Gói thầu Thiết bị',
            3500000000,
            3200000000,
            2800000000,
            840000000,
            80,
            'Đang triển khai'
        ];

        const csvContent = '\uFEFF' + [headers.join(','), sampleRow.join(',')].join('\r\n');
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'Mau_Nhap_Lieu_Doanh_So_Du_An_VPS.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
};

// Auto init when script loaded or DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => window.ProjectRevenueModule.init());
} else {
    window.ProjectRevenueModule.init();
}
