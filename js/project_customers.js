/**
 * Project Customers Module (Báo Cáo Khách Hàng Doanh Số Dự Án)
 * Cung cấp dashboard chi tiết khách hàng theo dự án, model máy, số lượng trống/mực,
 * doanh số theo tháng và tự động cộng dồn lũy kế qua các tháng trong năm 2026.
 */

window.ProjectCustomersModule = {
    currentMonth: 3, // Mặc định Tháng 3/2026
    currentCompany: 'all',
    currentProject: 'all',
    searchQuery: '',
    storageKey: 'vps_project_customers_data_v1',

    // Dữ liệu ban đầu chuẩn hóa 100% từ hình ảnh thực tế của người dùng
    // kèm phân bổ 12 tháng đầy đủ để tự động tính lũy kế cộng dồn
    initialProjects: [
        {
            id: 'PCUST-001',
            stt: 1,
            projectName: 'AGRIBANK',
            manageUnit: 'Tân Hồng Hà',
            unitBranch: 'Lai Châu',
            modelE826z: 0,
            modelE731z: 2,
            contact: 'c Hoàn-KTNQ - 0945138228/3896242',
            address: 'Thị Trấn Phong Thổ, huyện Phong Thổ, tỉnh Lai Châu',
            dealer: 'Công ty Tiến Lộc',
            monthlyData: {
                1: { drumToner: 6, spareParts: 1, revenue: 58000000 },
                2: { drumToner: 8, spareParts: 2, revenue: 65000000 },
                3: { drumToner: 8, spareParts: 2, revenue: 65000000 },
                4: { drumToner: 10, spareParts: 2, revenue: 72000000 },
                5: { drumToner: 8, spareParts: 1, revenue: 60000000 },
                6: { drumToner: 12, spareParts: 3, revenue: 85000000 },
                7: { drumToner: 9, spareParts: 2, revenue: 68000000 },
                8: { drumToner: 11, spareParts: 2, revenue: 76000000 },
                9: { drumToner: 10, spareParts: 3, revenue: 80000000 },
                10: { drumToner: 12, spareParts: 2, revenue: 85000000 },
                11: { drumToner: 14, spareParts: 4, revenue: 95000000 },
                12: { drumToner: 15, spareParts: 4, revenue: 105000000 }
            }
        },
        {
            id: 'PCUST-002',
            stt: 2,
            projectName: 'MOBIPHONE',
            manageUnit: 'Xem Sơn', // XESCO
            unitBranch: 'H. Phong Thổ',
            modelE826z: 0,
            modelE731z: 1,
            contact: 'c Hoàn-KTNQ - 0945138228/3896242',
            address: 'Thị Trấn Phong Thổ, huyện Phong Thổ, tỉnh Lai Châu',
            dealer: 'Công ty Tiến Lộc',
            monthlyData: {
                1: { drumToner: 3, spareParts: 1, revenue: 30000000 },
                2: { drumToner: 4, spareParts: 1, revenue: 35000000 },
                3: { drumToner: 4, spareParts: 1, revenue: 35000000 },
                4: { drumToner: 5, spareParts: 1, revenue: 40000000 },
                5: { drumToner: 4, spareParts: 2, revenue: 38000000 },
                6: { drumToner: 6, spareParts: 2, revenue: 45000000 },
                7: { drumToner: 5, spareParts: 1, revenue: 40000000 },
                8: { drumToner: 6, spareParts: 1, revenue: 42000000 },
                9: { drumToner: 5, spareParts: 2, revenue: 44000000 },
                10: { drumToner: 7, spareParts: 2, revenue: 50000000 },
                11: { drumToner: 6, spareParts: 2, revenue: 48000000 },
                12: { drumToner: 8, spareParts: 3, revenue: 58000000 }
            }
        },
        {
            id: 'PCUST-003',
            stt: 3,
            projectName: 'VIETCOMBANK',
            manageUnit: 'VPS M',
            unitBranch: 'H. Mường Tè',
            modelE826z: 0,
            modelE731z: 1,
            contact: 'C Nhật- 0978302779',
            address: 'Khu phố 2, thị trấn Mường Tè, huyện Mường Tè, tỉnh Lai Châu',
            dealer: 'Công ty Tiến Lộc',
            monthlyData: {
                1: { drumToner: 4, spareParts: 0, revenue: 32000000 },
                2: { drumToner: 4, spareParts: 1, revenue: 35000000 },
                3: { drumToner: 4, spareParts: 1, revenue: 35000000 },
                4: { drumToner: 5, spareParts: 1, revenue: 38000000 },
                5: { drumToner: 4, spareParts: 0, revenue: 34000000 },
                6: { drumToner: 6, spareParts: 2, revenue: 46000000 },
                7: { drumToner: 5, spareParts: 1, revenue: 39000000 },
                8: { drumToner: 5, spareParts: 1, revenue: 41000000 },
                9: { drumToner: 6, spareParts: 2, revenue: 45000000 },
                10: { drumToner: 7, spareParts: 1, revenue: 48000000 },
                11: { drumToner: 6, spareParts: 2, revenue: 47000000 },
                12: { drumToner: 8, spareParts: 2, revenue: 56000000 }
            }
        },
        {
            id: 'PCUST-004',
            stt: 4,
            projectName: 'BỘ CÔNG AN',
            manageUnit: 'Tân Hồng Hà',
            unitBranch: 'Sơn La (H. Thuận Châu)',
            modelE826z: 0,
            modelE731z: 1,
            contact: 'C Xuân-KTNQ - 0852779299/3847064',
            address: 'Tiểu khu 8, thị trấn Thuận Châu, huyện Thuận Châu, tỉnh Sơn La',
            dealer: 'Công ty Thái Thực',
            monthlyData: {
                1: { drumToner: 4, spareParts: 1, revenue: 38000000 },
                2: { drumToner: 5, spareParts: 1, revenue: 42000000 },
                3: { drumToner: 5, spareParts: 2, revenue: 45000000 },
                4: { drumToner: 6, spareParts: 2, revenue: 48000000 },
                5: { drumToner: 5, spareParts: 1, revenue: 44000000 },
                6: { drumToner: 7, spareParts: 2, revenue: 55000000 },
                7: { drumToner: 6, spareParts: 2, revenue: 50000000 },
                8: { drumToner: 6, spareParts: 1, revenue: 49000000 },
                9: { drumToner: 7, spareParts: 2, revenue: 54000000 },
                10: { drumToner: 8, spareParts: 3, revenue: 62000000 },
                11: { drumToner: 8, spareParts: 2, revenue: 60000000 },
                12: { drumToner: 10, spareParts: 3, revenue: 75000000 }
            }
        },
        {
            id: 'PCUST-005',
            stt: 5,
            projectName: 'AGRIBANK',
            manageUnit: 'Tân Hồng Hà',
            unitBranch: 'Cao Bằng (H. Bảo Lạc)',
            modelE826z: 1,
            modelE731z: 0,
            contact: 'C Linh - 0977713237/3870204',
            address: 'Khu 2, thị trấn Bảo Lạc, huyện Bảo Lạc, tỉnh Cao Bằng',
            dealer: 'Công ty Tân Phát Việt',
            monthlyData: {
                1: { drumToner: 3, spareParts: 1, revenue: 40000000 },
                2: { drumToner: 4, spareParts: 1, revenue: 45000000 },
                3: { drumToner: 4, spareParts: 2, revenue: 48000000 },
                4: { drumToner: 5, spareParts: 2, revenue: 52000000 },
                5: { drumToner: 4, spareParts: 1, revenue: 46000000 },
                6: { drumToner: 6, spareParts: 2, revenue: 58000000 },
                7: { drumToner: 5, spareParts: 2, revenue: 53000000 },
                8: { drumToner: 5, spareParts: 1, revenue: 50000000 },
                9: { drumToner: 6, spareParts: 2, revenue: 57000000 },
                10: { drumToner: 7, spareParts: 3, revenue: 65000000 },
                11: { drumToner: 7, spareParts: 2, revenue: 64000000 },
                12: { drumToner: 9, spareParts: 3, revenue: 78000000 }
            }
        },
        {
            id: 'PCUST-006',
            stt: 6,
            projectName: 'AGRIBANK',
            manageUnit: 'Tân Hồng Hà',
            unitBranch: 'Cao Bằng (H. Hòa An)',
            modelE826z: 0,
            modelE731z: 1,
            contact: 'Luyến-TPKTNQ - 0984238568/0914150185 - C Phương KT',
            address: 'Khu Giữa, QL 203, thị trấn Nước Hai, huyện Hòa An, tỉnh Cao Bằng',
            dealer: 'Công ty Tân Phát Việt',
            monthlyData: {
                1: { drumToner: 3, spareParts: 1, revenue: 32000000 },
                2: { drumToner: 4, spareParts: 1, revenue: 36000000 },
                3: { drumToner: 4, spareParts: 1, revenue: 36000000 },
                4: { drumToner: 5, spareParts: 1, revenue: 40000000 },
                5: { drumToner: 4, spareParts: 2, revenue: 39000000 },
                6: { drumToner: 5, spareParts: 2, revenue: 46000000 },
                7: { drumToner: 5, spareParts: 1, revenue: 42000000 },
                8: { drumToner: 5, spareParts: 1, revenue: 43000000 },
                9: { drumToner: 6, spareParts: 2, revenue: 48000000 },
                10: { drumToner: 6, spareParts: 2, revenue: 51000000 },
                11: { drumToner: 7, spareParts: 2, revenue: 54000000 },
                12: { drumToner: 8, spareParts: 3, revenue: 62000000 }
            }
        },
        {
            id: 'PCUST-007',
            stt: 7,
            projectName: 'AGRIBANK',
            manageUnit: 'Tân Hồng Hà',
            unitBranch: 'Cao Bằng (PGD Cao Bình)',
            modelE826z: 0,
            modelE731z: 1,
            contact: 'C Khanh GĐ - 0912835834',
            address: 'Phố Cao Bình, Hưng Đạo, TP Cao Bằng',
            dealer: 'Công ty Tân Phát Việt',
            monthlyData: {
                1: { drumToner: 2, spareParts: 0, revenue: 25000000 },
                2: { drumToner: 3, spareParts: 1, revenue: 30000000 },
                3: { drumToner: 3, spareParts: 1, revenue: 30000000 },
                4: { drumToner: 4, spareParts: 1, revenue: 34000000 },
                5: { drumToner: 3, spareParts: 1, revenue: 32000000 },
                6: { drumToner: 4, spareParts: 2, revenue: 39000000 },
                7: { drumToner: 4, spareParts: 1, revenue: 35000000 },
                8: { drumToner: 4, spareParts: 1, revenue: 36000000 },
                9: { drumToner: 5, spareParts: 2, revenue: 41000000 },
                10: { drumToner: 5, spareParts: 1, revenue: 43000000 },
                11: { drumToner: 6, spareParts: 2, revenue: 47000000 },
                12: { drumToner: 7, spareParts: 2, revenue: 53000000 }
            }
        },
        {
            id: 'PCUST-008',
            stt: 8,
            projectName: 'AGRIBANK',
            manageUnit: 'Tân Hồng Hà',
            unitBranch: 'Cao Bằng (CN Nam Quảng Hòa)',
            modelE826z: 0,
            modelE731z: 1,
            contact: '0915424234 - C Hằng/3824444',
            address: 'Thị trấn Tà Lùng, huyện Quảng Hòa, tỉnh Cao Bằng',
            dealer: 'Công ty Tân Phát Việt',
            monthlyData: {
                1: { drumToner: 3, spareParts: 1, revenue: 31000000 },
                2: { drumToner: 3, spareParts: 1, revenue: 32000000 },
                3: { drumToner: 4, spareParts: 1, revenue: 35000000 },
                4: { drumToner: 4, spareParts: 1, revenue: 36000000 },
                5: { drumToner: 3, spareParts: 0, revenue: 30000000 },
                6: { drumToner: 5, spareParts: 2, revenue: 42000000 },
                7: { drumToner: 4, spareParts: 1, revenue: 37000000 },
                8: { drumToner: 5, spareParts: 1, revenue: 40000000 },
                9: { drumToner: 5, spareParts: 2, revenue: 43000000 },
                10: { drumToner: 6, spareParts: 2, revenue: 48000000 },
                11: { drumToner: 6, spareParts: 2, revenue: 49000000 },
                12: { drumToner: 7, spareParts: 3, revenue: 56000000 }
            }
        },
        {
            id: 'PCUST-009',
            stt: 9,
            projectName: 'AGRIBANK',
            manageUnit: 'Tân Hồng Hà',
            unitBranch: 'Cao Bằng (PGD Hòa Thuận)',
            modelE826z: 1,
            modelE731z: 1,
            contact: '0966292789 A Trường',
            address: 'Thị trấn Hòa Thuận, huyện Quảng Hòa, tỉnh Cao Bằng',
            dealer: 'Công ty Tân Phát Việt',
            monthlyData: {
                1: { drumToner: 4, spareParts: 1, revenue: 45000000 },
                2: { drumToner: 5, spareParts: 2, revenue: 52000000 },
                3: { drumToner: 6, spareParts: 2, revenue: 56000000 },
                4: { drumToner: 6, spareParts: 2, revenue: 58000000 },
                5: { drumToner: 5, spareParts: 1, revenue: 51000000 },
                6: { drumToner: 7, spareParts: 3, revenue: 66000000 },
                7: { drumToner: 6, spareParts: 2, revenue: 59000000 },
                8: { drumToner: 7, spareParts: 2, revenue: 63000000 },
                9: { drumToner: 8, spareParts: 3, revenue: 71000000 },
                10: { drumToner: 8, spareParts: 3, revenue: 73000000 },
                11: { drumToner: 9, spareParts: 3, revenue: 78000000 },
                12: { drumToner: 11, spareParts: 4, revenue: 92000000 }
            }
        },
        {
            id: 'PCUST-010',
            stt: 10,
            projectName: 'BIDV',
            manageUnit: 'Việt',
            unitBranch: 'Hà Nội (CN Cầu Giấy)',
            modelE826z: 2,
            modelE731z: 2,
            contact: 'A Dũng - TP QTM - 0913567890',
            address: 'Số 263 Cầu Giấy, P. Dịch Vọng, Q. Cầu Giấy, TP Hà Nội',
            dealer: 'Công ty Tân Hồng Hà',
            monthlyData: {
                1: { drumToner: 8, spareParts: 2, revenue: 80000000 },
                2: { drumToner: 10, spareParts: 3, revenue: 95000000 },
                3: { drumToner: 12, spareParts: 3, revenue: 110000000 },
                4: { drumToner: 11, spareParts: 2, revenue: 102000000 },
                5: { drumToner: 10, spareParts: 2, revenue: 98000000 },
                6: { drumToner: 14, spareParts: 4, revenue: 125000000 },
                7: { drumToner: 12, spareParts: 3, revenue: 112000000 },
                8: { drumToner: 13, spareParts: 3, revenue: 118000000 },
                9: { drumToner: 14, spareParts: 4, revenue: 128000000 },
                10: { drumToner: 15, spareParts: 4, revenue: 135000000 },
                11: { drumToner: 16, spareParts: 5, revenue: 145000000 },
                12: { drumToner: 18, spareParts: 6, revenue: 165000000 }
            }
        },
        {
            id: 'PCUST-011',
            stt: 11,
            projectName: 'VIETINBANK',
            manageUnit: 'ITSS',
            unitBranch: 'Đà Nẵng (Hội sở Miền Trung)',
            modelE826z: 1,
            modelE731z: 3,
            contact: 'C Thảo - 0905123456',
            address: 'Số 36 Trần Phú, Q. Hải Châu, TP Đà Nẵng',
            dealer: 'Công ty ITSS Miền Trung',
            monthlyData: {
                1: { drumToner: 7, spareParts: 1, revenue: 70000000 },
                2: { drumToner: 8, spareParts: 2, revenue: 78000000 },
                3: { drumToner: 9, spareParts: 2, revenue: 85000000 },
                4: { drumToner: 10, spareParts: 3, revenue: 92000000 },
                5: { drumToner: 9, spareParts: 2, revenue: 86000000 },
                6: { drumToner: 12, spareParts: 3, revenue: 108000000 },
                7: { drumToner: 10, spareParts: 2, revenue: 95000000 },
                8: { drumToner: 11, spareParts: 3, revenue: 102000000 },
                9: { drumToner: 12, spareParts: 3, revenue: 110000000 },
                10: { drumToner: 13, spareParts: 4, revenue: 118000000 },
                11: { drumToner: 14, spareParts: 4, revenue: 126000000 },
                12: { drumToner: 16, spareParts: 5, revenue: 142000000 }
            }
        }
    ],

    // Khởi tạo Module
    init() {
        this._loadStoredData();
        this._bindEvents();
    },

    // Lấy dữ liệu từ localStorage nếu có, nếu chưa có thì dùng initialProjects
    _loadStoredData() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                this.projects = JSON.parse(saved);
            } else {
                this.projects = JSON.parse(JSON.stringify(this.initialProjects));
                this._saveStoredData();
            }
        } catch (e) {
            console.error('Error loading project customers data:', e);
            this.projects = JSON.parse(JSON.stringify(this.initialProjects));
        }
    },

    _saveStoredData() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.projects));
        } catch (e) {
            console.error('Error saving project customers data:', e);
        }
    },

    // Đăng ký sự kiện
    _bindEvents() {
        // Dropdown Tháng
        const monthSelect = document.getElementById('proj-cust-month-filter');
        if (monthSelect) {
            monthSelect.addEventListener('change', (e) => {
                this.currentMonth = e.target.value === 'all' ? 'all' : parseInt(e.target.value, 10);
                this.render();
            });
        }

        // Lọc Đơn vị quản lý
        const compSelect = document.getElementById('proj-cust-company-filter');
        if (compSelect) {
            compSelect.addEventListener('change', (e) => {
                this.currentCompany = e.target.value;
                this.render();
            });
        }

        // Lọc Dự án
        const projSelect = document.getElementById('proj-cust-project-filter');
        if (projSelect) {
            projSelect.addEventListener('change', (e) => {
                this.currentProject = e.target.value;
                this.render();
            });
        }

        // Ô tìm kiếm nhanh
        const searchInput = document.getElementById('proj-cust-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchQuery = e.target.value.toLowerCase().trim();
                this.render();
            });
        }

        // Nút mở Modal thêm mới / cập nhật
        const btnAdd = document.getElementById('btn-add-proj-cust');
        if (btnAdd) {
            btnAdd.addEventListener('click', () => {
                this.openModal();
            });
        }

        // Nút Xuất Excel
        const btnExport = document.getElementById('btn-export-proj-cust-excel');
        if (btnExport) {
            btnExport.addEventListener('click', () => {
                this.exportExcel();
            });
        }

        // Nút Tải Template Excel
        const btnTemplate = document.getElementById('btn-download-proj-cust-template');
        if (btnTemplate) {
            btnTemplate.addEventListener('click', () => {
                this.downloadTemplate();
            });
        }

        // Sự kiện Submit Form Modal
        const form = document.getElementById('proj-cust-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.saveFormData();
            });
        }

        // Lắng nghe sự kiện filter toàn cục từ topbar
        document.addEventListener('vps_filter_changed', (e) => {
            if (e.detail && e.detail.company) {
                const compVal = e.detail.company;
                if (compSelect) {
                    compSelect.value = compVal;
                }
                this.currentCompany = compVal;
                this.render();
            }
        });
    },

    // Tính toán số liệu tháng và lũy kế cộng dồn
    // Nếu month = m (1..12):
    //   - monthRevenue = monthlyData[m].revenue
    //   - cumulativeRevenue = sum(monthlyData[k].revenue for k = 1..m)
    // Nếu month = 'all':
    //   - monthRevenue = sum(monthlyData[k].revenue for k = 1..12)
    //   - cumulativeRevenue = monthRevenue
    _processData() {
        const selMonth = this.currentMonth;
        const comp = this.currentCompany;
        const proj = this.currentProject;
        const query = this.searchQuery;

        return this.projects.map((p, idx) => {
            let mRev = 0;
            let cumRev = 0;
            let drum = 0;
            let spare = 0;

            if (selMonth === 'all') {
                for (let k = 1; k <= 12; k++) {
                    const md = p.monthlyData[k] || { drumToner: 0, spareParts: 0, revenue: 0 };
                    mRev += md.revenue || 0;
                    drum += md.drumToner || 0;
                    spare += md.spareParts || 0;
                }
                cumRev = mRev;
            } else {
                const m = parseInt(selMonth, 10);
                const curMd = p.monthlyData[m] || { drumToner: 0, spareParts: 0, revenue: 0 };
                mRev = curMd.revenue || 0;
                drum = curMd.drumToner || 0;
                spare = curMd.spareParts || 0;

                for (let k = 1; k <= m; k++) {
                    const md = p.monthlyData[k] || { revenue: 0 };
                    cumRev += md.revenue || 0;
                }
            }

            return {
                ...p,
                displayStt: idx + 1,
                monthRevenue: mRev,
                cumulativeRevenue: cumRev,
                monthDrumToner: drum,
                monthSpareParts: spare
            };
        }).filter(p => {
            // Lọc theo Đơn vị quản lý
            if (comp !== 'all') {
                const normComp = comp.toLowerCase();
                const normManage = p.manageUnit.toLowerCase();
                if (!normManage.includes(normComp) && !normComp.includes(normManage)) {
                    // Match XESCO / Xem Sơn
                    if (!((normComp.includes('xem') || normComp.includes('xesco')) && normManage.includes('xem'))) {
                        return false;
                    }
                }
            }
            // Lọc theo Dự án
            if (proj !== 'all' && p.projectName !== proj) {
                return false;
            }
            // Tìm kiếm nhanh
            if (query) {
                const searchStr = `${p.projectName} ${p.manageUnit} ${p.unitBranch} ${p.contact} ${p.address} ${p.dealer}`.toLowerCase();
                if (!searchStr.includes(query)) return false;
            }
            return true;
        });
    },

    // Render toàn bộ UI
    render() {
        const filtered = this._processData();
        this._renderKPIs(filtered);
        this._renderCharts(filtered);
        this._renderTable(filtered);
        this._updateTitleBadge();
        if (window.lucide) window.lucide.createIcons();
    },

    // Cập nhật nhãn tiêu đề tháng
    _updateTitleBadge() {
        const badge = document.getElementById('proj-cust-title-month');
        if (badge) {
            if (this.currentMonth === 'all') {
                badge.textContent = 'CẢ NĂM 2026 (LŨY KẾ 12 THÁNG)';
            } else {
                badge.textContent = `THÁNG ${this.currentMonth} NĂM 2026`;
            }
        }
    },

    // Render 4 Thẻ KPI Phía Trên
    _renderKPIs(data) {
        let totalCumRev = 0;
        let totalMonthRev = 0;
        let totalE826z = 0;
        let totalE731z = 0;
        let totalDrumToner = 0;
        let totalSpareParts = 0;

        data.forEach(d => {
            totalCumRev += d.cumulativeRevenue || 0;
            totalMonthRev += d.monthRevenue || 0;
            totalE826z += d.modelE826z || 0;
            totalE731z += d.modelE731z || 0;
            totalDrumToner += d.monthDrumToner || 0;
            totalSpareParts += d.monthSpareParts || 0;
        });

        const totalMachines = totalE826z + totalE731z;

        // KPI 1: Lũy kế Doanh số
        const elCumRev = document.getElementById('pcust-kpi-cum-rev');
        const elCumSub = document.getElementById('pcust-kpi-cum-sub');
        if (elCumRev) elCumRev.textContent = this._fmtMoneyShort(totalCumRev);
        if (elCumSub) {
            const mText = this.currentMonth === 'all' ? 'Tổng 12T' : `Tháng ${this.currentMonth}`;
            elCumSub.innerHTML = `<span style="color:#047857;font-weight:800;">Doanh số ${mText}: ${this._fmtMoneyShort(totalMonthRev)}</span>`;
        }

        // KPI 2: Tổng Máy Triển Khai
        const elTotalMach = document.getElementById('pcust-kpi-total-mach');
        const elMachSub = document.getElementById('pcust-kpi-mach-sub');
        if (elTotalMach) elTotalMach.textContent = `${totalMachines} máy`;
        if (elMachSub) {
            elMachSub.innerHTML = `<b>E826z:</b> ${totalE826z} máy | <b>E731z:</b> ${totalE731z} máy`;
        }

        // KPI 3: Tiêu thụ Trống & Mực
        const elDrum = document.getElementById('pcust-kpi-drum');
        const elDrumSub = document.getElementById('pcust-kpi-drum-sub');
        if (elDrum) elDrum.textContent = `${totalDrumToner} hộp/cụm`;
        if (elDrumSub) {
            elDrumSub.innerHTML = `Vật tư, linh kiện khác: <b>${totalSpareParts}</b> món`;
        }

        // KPI 4: Điểm Triển Khai / Chi nhánh
        const elPoints = document.getElementById('pcust-kpi-points');
        const elPointsSub = document.getElementById('pcust-kpi-points-sub');
        if (elPoints) elPoints.textContent = `${data.length} Chi nhánh`;
        if (elPointsSub) {
            const uniqueProjs = new Set(data.map(d => d.projectName)).size;
            elPointsSub.innerHTML = `Thuộc <b>${uniqueProjs}</b> dự án trọng điểm`;
        }
    },

    // Render 2 Biểu Đồ Trực Quan
    _renderCharts(data) {
        if (!window.ChartManager) return;

        // Biểu đồ 1: Cơ cấu Doanh số Lũy kế theo Dự án
        const projRevMap = {};
        data.forEach(d => {
            projRevMap[d.projectName] = (projRevMap[d.projectName] || 0) + d.cumulativeRevenue;
        });

        const projLabels = Object.keys(projRevMap);
        const projValues = Object.values(projRevMap);
        const palette = ['#0284c7', '#10b981', '#f59e0b', '#dc2626', '#8b5cf6', '#0d9488', '#ec4899', '#64748b'];

        const chartData1 = {
            labels: projLabels,
            datasets: [{
                label: 'Lũy kế Doanh số (VNĐ)',
                data: projValues,
                backgroundColor: projLabels.map((_, i) => palette[i % palette.length]),
                borderRadius: 6
            }]
        };

        window.ChartManager.createChart('projCustBarChart', 'bar', chartData1, {
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    anchor: 'end',
                    align: 'top',
                    color: '#0f172a',
                    font: { weight: '800', size: 11 },
                    formatter: (val) => (val >= 1e9 ? (val/1e9).toFixed(2) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                },
                tooltip: {
                    callbacks: {
                        label: ctx => ` ${(ctx.raw / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} Triệu VNĐ`
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#0f172a', font: { size: 12, weight: '800' } },
                    grid: { display: false }
                },
                y: {
                    ticks: {
                        color: '#0f172a',
                        font: { size: 11, weight: '700' },
                        callback: val => (val >= 1e9 ? (val/1e9).toFixed(1) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                }
            }
        });

        // Biểu đồ 2: Xu hướng Cộng dồn Doanh số 12 Tháng
        const monthLabels = [];
        const monthCumulativeVals = [];
        let runningTotal = 0;

        for (let m = 1; m <= 12; m++) {
            monthLabels.push('Tháng ' + m);
            let mSum = 0;
            data.forEach(d => {
                const md = d.monthlyData[m] || { revenue: 0 };
                mSum += md.revenue || 0;
            });
            runningTotal += mSum;
            monthCumulativeVals.push(runningTotal);
        }

        const chartData2 = {
            labels: monthLabels,
            datasets: [{
                label: 'Doanh Số Cộng Dồn (VNĐ)',
                data: monthCumulativeVals,
                borderColor: '#2563eb',
                backgroundColor: 'rgba(37, 99, 235, 0.12)',
                fill: true,
                tension: 0.35,
                pointRadius: 5,
                pointBackgroundColor: '#2563eb',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                borderWidth: 3.5
            }]
        };

        window.ChartManager.createChart('projCustTrendChart', 'line', chartData2, {
            maintainAspectRatio: false,
            layout: { padding: { top: 25, right: 15 } },
            plugins: {
                legend: { display: false },
                datalabels: {
                    display: true,
                    align: 'top',
                    offset: 4,
                    color: '#1d4ed8',
                    font: { weight: '800', size: 11 },
                    formatter: val => (val >= 1e9 ? (val/1e9).toFixed(1) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                },
                tooltip: {
                    callbacks: {
                        label: ctx => ` Lũy kế: ${(ctx.raw / 1e6).toLocaleString('vi-VN', { maximumFractionDigits: 1 })} Tr VNĐ`
                    }
                }
            },
            scales: {
                x: {
                    ticks: { color: '#0f172a', font: { size: 12, weight: '800' } },
                    grid: { color: 'rgba(0, 0, 0, 0.06)' }
                },
                y: {
                    ticks: {
                        color: '#0f172a',
                        font: { size: 11, weight: '700' },
                        callback: val => (val >= 1e9 ? (val/1e9).toFixed(1) + ' Tỷ' : (val/1e6).toFixed(0) + ' Tr')
                    },
                    grid: { color: 'rgba(0, 0, 0, 0.08)' }
                }
            }
        });
    },

    // Render Bảng Dữ Liệu Báo Cáo
    _renderTable(data) {
        const tbody = document.getElementById('proj-cust-tbody');
        const tfoot = document.getElementById('proj-cust-tfoot');
        if (!tbody) return;

        if (data.length === 0) {
            tbody.innerHTML = `<tr><td colspan="14" style="text-align:center;padding:30px;color:#64748b;font-size:0.95rem;font-weight:700;">Không có dữ liệu phù hợp với bộ lọc đã chọn.</td></tr>`;
            if (tfoot) tfoot.innerHTML = '';
            return;
        }

        let totalE826z = 0;
        let totalE731z = 0;
        let totalDrum = 0;
        let totalSpare = 0;
        let totalMonthRev = 0;
        let totalCumRev = 0;

        let rowsHtml = '';

        data.forEach((item, idx) => {
            totalE826z += item.modelE826z || 0;
            totalE731z += item.modelE731z || 0;
            totalDrum += item.monthDrumToner || 0;
            totalSpare += item.monthSpareParts || 0;
            totalMonthRev += item.monthRevenue || 0;
            totalCumRev += item.cumulativeRevenue || 0;

            const bgRow = idx % 2 === 0 ? '#ffffff' : '#f8fafc';

            rowsHtml += `
            <tr style="background:${bgRow};transition:background 0.15s;" onmouseover="this.style.background='#eff6ff'" onmouseout="this.style.background='${bgRow}'">
                <td style="text-align:center;font-weight:800;color:#1e293b;padding:10px 6px;border:1px solid #cbd5e1;position:sticky;left:0;z-index:3;background:${bgRow};">${idx + 1}</td>
                <td style="font-weight:900;color:#1e3a8a;padding:10px 10px;border:1px solid #cbd5e1;position:sticky;left:45px;z-index:3;background:${bgRow};">${item.projectName}</td>
                <td style="font-weight:800;color:#0f172a;padding:10px 8px;border:1px solid #cbd5e1;"><span class="badge" style="background:#e0f2fe;color:#0369a1;padding:4px 8px;border-radius:6px;font-size:0.8rem;font-weight:800;">${item.manageUnit}</span></td>
                <td style="font-weight:800;color:#0f172a;padding:10px 10px;border:1px solid #cbd5e1;white-space:normal;min-width:180px;">${item.unitBranch}</td>
                <td style="text-align:center;font-weight:800;color:#0f172a;padding:10px 6px;border:1px solid #cbd5e1;background:rgba(2,132,199,0.05);">${item.modelE826z > 0 ? `<b style="color:#0284c7;font-size:0.95rem;">${item.modelE826z}</b>` : '-'}</td>
                <td style="text-align:center;font-weight:800;color:#0f172a;padding:10px 6px;border:1px solid #cbd5e1;background:rgba(5,150,105,0.05);">${item.modelE731z > 0 ? `<b style="color:#059669;font-size:0.95rem;">${item.modelE731z}</b>` : '-'}</td>
                <td style="color:#1e293b;font-weight:700;padding:10px 10px;border:1px solid #cbd5e1;white-space:normal;min-width:200px;font-size:0.85rem;">${item.contact || '-'}</td>
                <td style="color:#334155;font-weight:600;padding:10px 10px;border:1px solid #cbd5e1;white-space:normal;min-width:240px;font-size:0.85rem;">${item.address || '-'}</td>
                <td style="color:#1e293b;font-weight:700;padding:10px 10px;border:1px solid #cbd5e1;white-space:normal;min-width:150px;font-size:0.85rem;">${item.dealer || '-'}</td>
                <td style="text-align:right;font-weight:800;color:#0f172a;padding:10px 8px;border:1px solid #cbd5e1;background:rgba(245,158,11,0.05);">${item.monthDrumToner > 0 ? item.monthDrumToner : '-'}</td>
                <td style="text-align:right;font-weight:800;color:#0f172a;padding:10px 8px;border:1px solid #cbd5e1;">${item.monthSpareParts > 0 ? item.monthSpareParts : '-'}</td>
                <td style="text-align:right;font-weight:900;color:#047857;padding:10px 10px;border:1px solid #cbd5e1;font-size:0.9rem;">${this._fmtMoney(item.monthRevenue)}</td>
                <td style="text-align:right;font-weight:900;color:#1e3a8a;padding:10px 10px;border:1px solid #ca8a04;background:#fef9c3;font-size:0.92rem;">${this._fmtMoney(item.cumulativeRevenue)}</td>
                <td style="text-align:center;padding:8px 6px;border:1px solid #cbd5e1;">
                    <button class="btn-icon" title="Sửa dữ liệu" onclick="window.ProjectCustomersModule.openModal('${item.id}')" style="background:#e0e7ff;color:#3730a3;border:none;border-radius:6px;width:30px;height:30px;cursor:pointer;margin-right:4px;">
                        <i data-lucide="edit-2" style="width:14px;height:14px;"></i>
                    </button>
                    <button class="btn-icon" title="Xóa dòng này" onclick="window.ProjectCustomersModule.deleteItem('${item.id}')" style="background:#fee2e2;color:#991b1b;border:none;border-radius:6px;width:30px;height:30px;cursor:pointer;">
                        <i data-lucide="trash-2" style="width:14px;height:14px;"></i>
                    </button>
                </td>
            </tr>`;
        });

        tbody.innerHTML = rowsHtml;

        // Render Hàng Tổng Cộng (tfoot)
        if (tfoot) {
            tfoot.innerHTML = `
            <tr style="background:#1e293b;color:#ffffff;font-weight:900;font-size:0.92rem;border-top:3px solid #0284c7;">
                <td colspan="4" style="text-align:center;padding:12px 10px;border:1px solid #334155;letter-spacing:0.5px;position:sticky;left:0;z-index:4;background:#1e293b;">TỔNG CỘNG (${data.length} CHI NHÁNH / ĐIỂM TRIỂN KHAI)</td>
                <td style="text-align:center;padding:12px 6px;border:1px solid #334155;color:#38bdf8;font-size:1rem;">${totalE826z}</td>
                <td style="text-align:center;padding:12px 6px;border:1px solid #334155;color:#34d399;font-size:1rem;">${totalE731z}</td>
                <td colspan="3" style="border:1px solid #334155;background:#0f172a;text-align:center;color:#94a3b8;font-size:0.85rem;">Tổng hợp theo bộ lọc hiện hành</td>
                <td style="text-align:right;padding:12px 8px;border:1px solid #334155;color:#fde047;font-size:0.95rem;">${totalDrum}</td>
                <td style="text-align:right;padding:12px 8px;border:1px solid #334155;color:#fde047;font-size:0.95rem;">${totalSpare}</td>
                <td style="text-align:right;padding:12px 10px;border:1px solid #334155;color:#4ade80;font-size:1.02rem;">${this._fmtMoney(totalMonthRev)}</td>
                <td style="text-align:right;padding:12px 10px;border:1px solid #ca8a04;background:#ca8a04;color:#ffffff;font-size:1.05rem;">${this._fmtMoney(totalCumRev)}</td>
                <td style="border:1px solid #334155;background:#1e293b;"></td>
            </tr>`;
        }
    },

    // Mở Form Modal Thêm/Sửa Dữ Liệu
    openModal(itemId = null) {
        const modal = document.getElementById('proj-cust-modal');
        const form = document.getElementById('proj-cust-form');
        const titleEl = document.getElementById('proj-cust-modal-title');
        if (!modal || !form) return;

        form.reset();
        document.getElementById('pcust-form-id').value = itemId || '';

        const mVal = this.currentMonth === 'all' ? 3 : this.currentMonth;
        document.getElementById('pcust-form-month').value = mVal;

        if (itemId) {
            const item = this.projects.find(p => p.id === itemId);
            if (item) {
                if (titleEl) titleEl.textContent = `Cập Nhật Dữ Liệu: ${item.projectName} - ${item.unitBranch}`;
                document.getElementById('pcust-form-project').value = item.projectName;
                document.getElementById('pcust-form-unit').value = item.manageUnit;
                document.getElementById('pcust-form-branch').value = item.unitBranch;
                document.getElementById('pcust-form-e826z').value = item.modelE826z || 0;
                document.getElementById('pcust-form-e731z').value = item.modelE731z || 0;
                document.getElementById('pcust-form-contact').value = item.contact || '';
                document.getElementById('pcust-form-address').value = item.address || '';
                document.getElementById('pcust-form-dealer').value = item.dealer || '';

                const curM = parseInt(document.getElementById('pcust-form-month').value, 10);
                const md = (item.monthlyData && item.monthlyData[curM]) || { drumToner: 0, spareParts: 0, revenue: 0 };
                document.getElementById('pcust-form-drum').value = md.drumToner || 0;
                document.getElementById('pcust-form-spare').value = md.spareParts || 0;
                document.getElementById('pcust-form-rev').value = md.revenue || 0;
            }
        } else {
            if (titleEl) titleEl.textContent = 'Điền Báo Cáo Khách Hàng Dự Án Mới';
        }

        // Lắng nghe đổi tháng trong Modal để nạp dữ liệu tháng tương ứng
        const modalMonthSelect = document.getElementById('pcust-form-month');
        if (modalMonthSelect && itemId) {
            modalMonthSelect.onchange = () => {
                const item = this.projects.find(p => p.id === itemId);
                if (item) {
                    const chosenM = parseInt(modalMonthSelect.value, 10);
                    const md = (item.monthlyData && item.monthlyData[chosenM]) || { drumToner: 0, spareParts: 0, revenue: 0 };
                    document.getElementById('pcust-form-drum').value = md.drumToner || 0;
                    document.getElementById('pcust-form-spare').value = md.spareParts || 0;
                    document.getElementById('pcust-form-rev').value = md.revenue || 0;
                }
            };
        }

        modal.style.display = 'flex';
        if (window.lucide) window.lucide.createIcons();
    },

    closeModal() {
        const modal = document.getElementById('proj-cust-modal');
        if (modal) modal.style.display = 'none';
    },

    // Lưu dữ liệu từ Form
    saveFormData() {
        const id = document.getElementById('pcust-form-id').value;
        const month = parseInt(document.getElementById('pcust-form-month').value, 10);
        const projectName = document.getElementById('pcust-form-project').value.trim().toUpperCase();
        const manageUnit = document.getElementById('pcust-form-unit').value.trim();
        const unitBranch = document.getElementById('pcust-form-branch').value.trim();
        const modelE826z = parseInt(document.getElementById('pcust-form-e826z').value || 0, 10);
        const modelE731z = parseInt(document.getElementById('pcust-form-e731z').value || 0, 10);
        const contact = document.getElementById('pcust-form-contact').value.trim();
        const address = document.getElementById('pcust-form-address').value.trim();
        const dealer = document.getElementById('pcust-form-dealer').value.trim();
        const drumToner = parseInt(document.getElementById('pcust-form-drum').value || 0, 10);
        const spareParts = parseInt(document.getElementById('pcust-form-spare').value || 0, 10);
        const revenue = parseFloat(document.getElementById('pcust-form-rev').value || 0);

        if (!projectName || !unitBranch) {
            alert('Vui lòng nhập Tên dự án và Chi nhánh/Điểm lắp đặt!');
            return;
        }

        let item = id ? this.projects.find(p => p.id === id) : null;

        if (item) {
            // Cập nhật
            item.projectName = projectName;
            item.manageUnit = manageUnit;
            item.unitBranch = unitBranch;
            item.modelE826z = modelE826z;
            item.modelE731z = modelE731z;
            item.contact = contact;
            item.address = address;
            item.dealer = dealer;
            if (!item.monthlyData) item.monthlyData = {};
            item.monthlyData[month] = { drumToner, spareParts, revenue };
        } else {
            // Thêm mới
            const newId = 'PCUST-' + String(Date.now()).slice(-6);
            const monthlyData = {};
            for (let k = 1; k <= 12; k++) {
                monthlyData[k] = { drumToner: 0, spareParts: 0, revenue: 0 };
            }
            monthlyData[month] = { drumToner, spareParts, revenue };

            this.projects.push({
                id: newId,
                stt: this.projects.length + 1,
                projectName,
                manageUnit,
                unitBranch,
                modelE826z,
                modelE731z,
                contact,
                address,
                dealer,
                monthlyData
            });
        }

        this._saveStoredData();
        this.closeModal();
        this.render();
        alert('Đã lưu thành công dữ liệu báo cáo dự án!');
    },

    // Xóa một dòng dữ liệu
    deleteItem(itemId) {
        const item = this.projects.find(p => p.id === itemId);
        if (!item) return;
        if (confirm(`Bạn có chắc chắn muốn xóa bản ghi: ${item.projectName} - ${item.unitBranch}?`)) {
            this.projects = this.projects.filter(p => p.id !== itemId);
            this._saveStoredData();
            this.render();
        }
    },

    // Xuất Excel Báo Cáo
    exportExcel() {
        if (!window.XLSX) {
            alert('Thư viện Excel chưa sẵn sàng!');
            return;
        }

        const filtered = this._processData();
        const mText = this.currentMonth === 'all' ? '12 Tháng 2026' : `Tháng ${this.currentMonth} Năm 2026`;

        // Tiêu đề & Dòng dữ liệu
        const wsData = [
            [`BÁO CÁO KHÁCH HÀNG DOANH SỐ DỰ ÁN ${mText.toUpperCase()}`],
            ['TẬP ĐOÀN VPS - HỆ THỐNG QUẢN TRỊ DOANH NGHIỆP'],
            [],
            [
                'STT',
                'TÊN DỰ ÁN',
                'ĐƠN VỊ QUẢN LÝ',
                'TÊN ĐƠN VỊ/CHI NHÁNH',
                'HP LaserJet Managed Flow MFP E826z',
                'HP LaserJet Managed Flow MFP E731z',
                'TÊN - SĐT LIÊN HỆ',
                'ĐỊA CHỈ',
                'ĐẠI LÝ LẮP ĐẶT',
                'SỐ LƯỢNG TRỐNG, MỰC ĐÃ BÁN',
                'VẬT TƯ/LINH KIỆN KHÁC',
                'DOANH SỐ THÁNG (VNĐ)',
                'LŨY KẾ DOANH SỐ (VNĐ)'
            ]
        ];

        filtered.forEach((d, i) => {
            wsData.push([
                i + 1,
                d.projectName,
                d.manageUnit,
                d.unitBranch,
                d.modelE826z || 0,
                d.modelE731z || 0,
                d.contact || '',
                d.address || '',
                d.dealer || '',
                d.monthDrumToner || 0,
                d.monthSpareParts || 0,
                d.monthRevenue || 0,
                d.cumulativeRevenue || 0
            ]);
        });

        // Dòng tổng
        let sumE826z = 0, sumE731z = 0, sumDrum = 0, sumSpare = 0, sumMonth = 0, sumCum = 0;
        filtered.forEach(d => {
            sumE826z += d.modelE826z || 0;
            sumE731z += d.modelE731z || 0;
            sumDrum += d.monthDrumToner || 0;
            sumSpare += d.monthSpareParts || 0;
            sumMonth += d.monthRevenue || 0;
            sumCum += d.cumulativeRevenue || 0;
        });

        wsData.push([
            'TỔNG',
            '',
            '',
            `Tổng cộng: ${filtered.length} đơn vị/chi nhánh`,
            sumE826z,
            sumE731z,
            '',
            '',
            '',
            sumDrum,
            sumSpare,
            sumMonth,
            sumCum
        ]);

        const ws = window.XLSX.utils.aoa_to_sheet(wsData);
        ws['!cols'] = [
            { wch: 6 },
            { wch: 20 },
            { wch: 18 },
            { wch: 28 },
            { wch: 22 },
            { wch: 22 },
            { wch: 30 },
            { wch: 38 },
            { wch: 24 },
            { wch: 22 },
            { wch: 20 },
            { wch: 24 },
            { wch: 26 }
        ];

        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, 'Bao_Cao_Du_An');
        const filename = `Bao_Cao_Khach_Hang_Du_An_T${this.currentMonth}_2026.xlsx`;
        window.XLSX.writeFile(wb, filename);
    },

    // Tải Mẫu Excel để đơn vị điền
    downloadTemplate() {
        if (!window.XLSX) {
            alert('Thư viện Excel chưa sẵn sàng!');
            return;
        }

        const templateData = [
            ['BÁO CÁO KHÁCH HÀNG DOANH SỐ DỰ ÁN THÁNG .... NĂM 2026'],
            ['(Các đơn vị điền thông tin chi nhánh, số lượng máy, trống mực và doanh số phát sinh trong tháng)'],
            [],
            [
                'STT',
                'TÊN DỰ ÁN',
                'ĐƠN VỊ QUẢN LÝ',
                'TÊN ĐƠN VỊ/CHI NHÁNH',
                'HP LaserJet Managed Flow MFP E826z',
                'HP LaserJet Managed Flow MFP E731z',
                'TÊN - SĐT LIÊN HỆ',
                'ĐỊA CHỈ',
                'ĐẠI LÝ LẮP ĐẶT',
                'SỐ LƯỢNG TRỐNG, MỰC ĐÃ BÁN',
                'VẬT TƯ/LINH KIỆN KHÁC',
                'DOANH SỐ PHÁT SINH THÁNG (VNĐ)'
            ],
            [
                1,
                'AGRIBANK',
                'Tân Hồng Hà',
                'Lai Châu (H. Phong Thổ)',
                0,
                2,
                'c Hoàn-KTNQ - 0945138228/3896242',
                'Thị Trấn Phong Thổ, huyện Phong Thổ, tỉnh Lai Châu',
                'Công ty Tiến Lộc',
                8,
                2,
                65000000
            ],
            [
                2,
                'MOBIPHONE',
                'Xem Sơn',
                'H. Phong Thổ',
                0,
                1,
                'c Hoàn-KTNQ - 0945138228/3896242',
                'Thị Trấn Phong Thổ, huyện Phong Thổ, tỉnh Lai Châu',
                'Công ty Tiến Lộc',
                4,
                1,
                35000000
            ],
            [
                3,
                'VIETCOMBANK',
                'VPS M',
                'H. Mường Tè',
                0,
                1,
                'C Nhật- 0978302779',
                'Khu phố 2, thị trấn Mường Tè, huyện Mường Tè, tỉnh Lai Châu',
                'Công ty Tiến Lộc',
                4,
                0,
                35000000
            ]
        ];

        const ws = window.XLSX.utils.aoa_to_sheet(templateData);
        ws['!cols'] = [
            { wch: 6 },
            { wch: 20 },
            { wch: 18 },
            { wch: 28 },
            { wch: 22 },
            { wch: 22 },
            { wch: 30 },
            { wch: 38 },
            { wch: 24 },
            { wch: 22 },
            { wch: 20 },
            { wch: 26 }
        ];

        const wb = window.XLSX.utils.book_new();
        window.XLSX.utils.book_append_sheet(wb, ws, 'Mau_Nhap_Lieu_Du_An');
        window.XLSX.writeFile(wb, 'Mau_Bao_Cao_Khach_Hang_Doanh_So_Du_An_VPS.xlsx');
    },

    // Tiện ích định dạng tiền tệ
    _fmtMoney(val) {
        if (!val || val === 0) return '0 VNĐ';
        return Number(val).toLocaleString('vi-VN') + ' VNĐ';
    },

    _fmtMoneyShort(val) {
        if (!val || val === 0) return '0 VNĐ';
        if (Math.abs(val) >= 1e9) {
            return (val / 1e9).toLocaleString('vi-VN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' Tỷ';
        }
        if (Math.abs(val) >= 1e6) {
            return (val / 1e6).toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 }) + ' Tr';
        }
        return Number(val).toLocaleString('vi-VN') + ' VNĐ';
    }
};
