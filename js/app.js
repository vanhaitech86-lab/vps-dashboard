/**
 * Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    const App = {
        init() {
            this.bindEvents();
            window.addEventListener('orientationchange', () => {
                setTimeout(() => {
                    window.dispatchEvent(new Event('resize'));
                }, 300);
            });
            
            // Check session
            if (window.AuthService.checkSession()) {
                this.showApp();
            } else {
                this.showLogin();
            }
        },

        bindEvents() {
            // Login Form (Đăng nhập tức thì 0ms, không chờ mạng)
            document.getElementById('login-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const user = document.getElementById('username').value;
                const pass = document.getElementById('password').value;
                
                try {
                    if (window.AuthService.login(user, pass)) {
                        this.showApp();
                    } else {
                        alert('Đăng nhập thất bại. Kiểm tra lại thông tin.');
                    }
                } catch(error) {
                    alert('Lỗi khởi tạo: ' + error.message);
                }
            });

            // Logout
            document.getElementById('btn-logout').addEventListener('click', () => {
                window.AuthService.logout();
                this.showLogin();
            });

            // Navigation
            document.querySelectorAll('.sidebar-nav .nav-item').forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    document.querySelectorAll('.sidebar-nav .nav-item').forEach(nav => nav.classList.remove('active'));
                    item.classList.add('active');
                    this.showView(item.dataset.target);
                    // On mobile, close sidebar
                    const sidebar = document.querySelector('.sidebar');
                    if(sidebar) sidebar.classList.remove('open');
                });
            });

            // Handle clickable cards on overview
            document.querySelectorAll('.clickable-card').forEach(card => {
                card.addEventListener('click', (e) => {
                    const target = card.dataset.target;
                    if(target) {
                        document.querySelectorAll('.sidebar-nav .nav-item').forEach(nav => {
                            if(nav.dataset.target === target) nav.classList.add('active');
                            else nav.classList.remove('active');
                        });
                        this.showView(target);
                        window.scrollTo(0,0);
                        const sidebar = document.querySelector('.sidebar');
                        if(sidebar) sidebar.classList.remove('open');
                    }
                });
            });

            // Mobile Menu Toggle
            document.querySelector('.menu-toggle').addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('open');
            });

            // Nút đồng bộ thủ công Google Sheets
            const btnSync = document.getElementById('btn-sync-sheets');
            if (btnSync) {
                btnSync.addEventListener('click', async () => {
                    await this.syncData(true);
                });
            }
        },

        showLogin() {
            document.getElementById('login-screen').classList.remove('hidden');
            document.getElementById('app-screen').classList.add('hidden');
        },

        showApp() {
            // Chuyển màn hình tức thì (0ms) để người dùng không phải chờ đợi
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('app-screen').classList.remove('hidden');

            // Nạp dữ liệu tức thì từ Cache cục bộ nếu có
            if (window.GoogleSheetsService && typeof window.GoogleSheetsService.hydrateFromCache === 'function') {
                window.GoogleSheetsService.hydrateFromCache();
            }

            const user = window.AuthService.getCurrentUser();
            if (!user) {
                this.showLogin();
                return;
            }
            
            // Update UI with user info
            document.getElementById('current-user-name').textContent = user.name;
            document.getElementById('current-user-role').textContent = typeof user.role === 'object' ? user.role.name : String(user.role);
            
            // Update Welcome Banner
            const welcomeText = document.getElementById('welcome-text');
            if (welcomeText) {
                if (user.name === 'ADMIN') {
                    welcomeText.textContent = 'ADMIN';
                } else if (window.AuthService.canViewAll()) {
                    welcomeText.textContent = 'CEO';
                } else {
                    welcomeText.textContent = (user.company || user.name).toUpperCase();
                }
            }

            // Init filters based on user role
            window.FilterManager.init();
            window.FilterManager.updateCompanyFilterVisibility(user);
            
            // Show Admin link only for ADMIN user
            const adminNav = document.getElementById('nav-admin');
            if (adminNav) {
                if (user.name === 'ADMIN' || (user.id && user.id.toUpperCase() === 'ADMIN')) {
                    adminNav.classList.remove('hidden');
                } else {
                    adminNav.classList.add('hidden');
                }
            }
            
            // Initialize Dashboard Modules
            if(window.ChartManager) window.ChartManager.init();
            if(window.OverviewModule) window.OverviewModule.init();
            if(window.CustomersModule) window.CustomersModule.init();
            if(window.ProjectCustomersModule) window.ProjectCustomersModule.init();
            if(window.ProductsModule) window.ProductsModule.init();
            if(window.FujifilmModule) window.FujifilmModule.init();
            if(window.ProductsOtherModule) window.ProductsOtherModule.init();
            if(window.RevenueModule) window.RevenueModule.init();
            if(window.InventoryModule) window.InventoryModule.init();
            if(window.ExpenseModule) window.ExpenseModule.init();
            if(window.DebtModule) window.DebtModule.init();
            if(window.HrModule) window.HrModule.init();
            if(window.AdminModule) window.AdminModule.init();
            if(window.CultureModule) window.CultureModule.init();
            if(window.IsoModule) window.IsoModule.init();
            if(window.TrainingModule) window.TrainingModule.init();
            if(window.ServiceModule) window.ServiceModule.init();
            if(window.BrandModule) window.BrandModule.init();
            if(window.KqkdModule) window.KqkdModule.init();
            if(window.CashflowModule) window.CashflowModule.init();
            
            // Trigger CRM API Backend Test
            if(window.CrmConnector) window.CrmConnector.fetchDashboardData(new Date().getMonth() + 1, user.company);

            // QUAN TRỌNG: Hiển thị overview TRƯỚC, rồi mới trigger filter
            this.showView('overview');
            window.FilterManager.triggerFilterChange();
            
            // Đảm bảo data load ngay lập tức
            setTimeout(() => {
                if(window.OverviewModule) {
                    window.OverviewModule.loadData(
                        window.FilterManager.currentPeriod || 'month',
                        window.FilterManager.currentCompany || 'all'
                    );
                }
            }, 50);

            // KÍCH HOẠT ĐỒNG BỘ NGẦM REALTIME (NON-BLOCKING)
            this.triggerBackgroundRealtimeSync();

            // Thiết lập chu kỳ tự động đồng bộ mỗi 60 giây trong nền (Realtime liên tục)
            if (!this._syncInterval) {
                this._syncInterval = setInterval(() => {
                    this.syncData(false);
                }, 60000);
            }
        },

        // Đồng bộ ngầm không gián đoạn giao diện
        triggerBackgroundRealtimeSync() {
            const lastSync = window.GoogleSheetsService ? (window.GoogleSheetsService._lastSyncTime || 0) : 0;
            const now = Date.now();
            const isFresh = (now - lastSync) < 180000; // Dữ liệu dưới 3 phút được coi là tươi mới

            this.updateRealtimeBadge(isFresh ? 'synced' : 'syncing');

            if (!isFresh) {
                setTimeout(() => {
                    this.syncData(false);
                }, 300);
            }
        },

        // Cập nhật huy hiệu trạng thái Realtime trên thanh tiêu đề
        updateRealtimeBadge(status, customTime) {
            const badge = document.getElementById('realtime-badge');
            const dot = document.getElementById('realtime-dot');
            const text = document.getElementById('realtime-text');
            if (!badge || !dot || !text) return;

            const now = new Date();
            const timeStr = customTime || `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

            if (status === 'syncing') {
                dot.style.background = '#38bdf8';
                dot.style.boxShadow = '0 0 6px #38bdf8';
                text.textContent = 'Đang đồng bộ ngầm...';
                text.style.color = '#38bdf8';
            } else if (status === 'synced') {
                dot.style.background = '#10b981';
                dot.style.boxShadow = '0 0 6px #10b981';
                text.textContent = `Realtime • Cập nhật ${timeStr}`;
                text.style.color = '#10b981';
            } else if (status === 'error') {
                dot.style.background = '#f59e0b';
                dot.style.boxShadow = '0 0 6px #f59e0b';
                text.textContent = `Offline • ${timeStr}`;
                text.style.color = '#f59e0b';
            }
        },

        async syncData(isManual = false) {
            const btnSync = document.getElementById('btn-sync-sheets');
            const syncIcon = document.getElementById('sync-icon');
            const syncText = document.getElementById('sync-text');
            if (syncIcon) syncIcon.style.animation = 'spin 0.8s linear infinite';
            if (syncText) syncText.textContent = isManual ? 'Đang tải...' : 'Đồng bộ';
            this.updateRealtimeBadge('syncing');

            if (window.GoogleSheetsService) {
                try {
                    await window.GoogleSheetsService.loadAllData(isManual);
                    if (window.FilterManager) {
                        window.FilterManager.triggerFilterChange();
                    }
                    const now = new Date();
                    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
                    if (syncText) syncText.textContent = 'Đã cập nhật';
                    if (btnSync) btnSync.title = `Lần đồng bộ gần nhất: ${timeStr} (Nhấn để đồng bộ lại)`;
                    this.updateRealtimeBadge('synced', `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`);
                } catch(e) {
                    console.warn('Sync failed:', e);
                    if (syncText) syncText.textContent = 'Lỗi tải';
                    this.updateRealtimeBadge('error');
                }
            }

            setTimeout(() => {
                if (syncIcon) syncIcon.style.animation = '';
                if (syncText) syncText.textContent = 'Đồng bộ';
            }, 1200);
        },

        showView(viewId) {
            // Update title
            const titles = {
                'overview': 'DASHBOARD',
                'hr': '1. CCTC Nhân Sự',
                'revenue': '2. Doanh Số Lãi Gộp',
                'project-revenue': '2.1. Doanh Số Dự Án',
                'product': '3. Sản Phẩm',
                'inventory': '4. Tồn Kho',
                'expense': '5. Chi Phí',
                'debt': '6. Công Nợ',
                'customers': '7. Khách Hàng',
                'project-customers': '7.1. Báo Cáo Khách Hàng Dự Án',
                'service': '8. Dịch Vụ Tận Tâm',
                'iso': '9. ISO',
                'training': '10. Đào Tạo',
                'culture': '11. Văn Hóa Doanh Nghiệp',
                'brand': '12. Marketing',
                'kqkd': '13. Báo Cáo Kết Quả Kinh Doanh',
                'cashflow': '14. Báo Cáo Kế Hoạch Dòng Tiền',
                'admin': 'Quản trị Hệ thống'
            };
            document.getElementById('page-title').textContent = titles[viewId] || 'Dashboard';
            
            // Hide all views
            document.querySelectorAll('.view').forEach(view => {
                view.classList.add('hidden');
            });
            
            // Show target
            if (viewId === 'project-customers') {
                const targetCust = document.getElementById('view-customers');
                if (targetCust) targetCust.classList.remove('hidden');
                if (typeof window.switchCustomerTab === 'function') {
                    window.switchCustomerTab('projects');
                }
                if (window.FilterManager) {
                    window.FilterManager.triggerFilterChange();
                }
                return;
            }
            if (viewId === 'customers') {
                if (typeof window.switchCustomerTab === 'function') {
                    window.switchCustomerTab('structure');
                }
            }
            const targetEl = document.getElementById(`view-${viewId}`);
            if (targetEl) targetEl.classList.remove('hidden');
            if (viewId === 'project-revenue' && window.ProjectRevenueModule) {
                window.ProjectRevenueModule.render();
            }
            if (viewId === 'service' && window.ServiceModule) {
                window.ServiceModule.render();
            }
            if (viewId === 'kqkd' && window.KqkdModule) {
                window.KqkdModule.render();
            }
            if (viewId === 'inventory' && window.InventoryModule) {
                const comp = window.FilterManager ? window.FilterManager.currentCompany : 'all';
                window.InventoryModule.renderUI(comp, window.InventoryModule.currentWeek);
            }
            if (viewId === 'cashflow' && window.CashflowModule) {
                window.CashflowModule.render();
            }
            if (viewId === 'iso' && window.IsoModule) {
                window.IsoModule.renderAll();
            }
            if (window.FilterManager) {
                window.FilterManager.triggerFilterChange();
            }
        }
    };

    App.init();
});
