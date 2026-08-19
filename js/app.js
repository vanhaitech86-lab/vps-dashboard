/**
 * Main Application Controller
 */

document.addEventListener('DOMContentLoaded', () => {
    const App = {
        init() {
            this.bindEvents();
            
            // Check session
            if (window.AuthService.checkSession()) {
                this.showApp();
            } else {
                this.showLogin();
            }
        },

        bindEvents() {
            // Login Form
            document.getElementById('login-form').addEventListener('submit', (e) => {
                e.preventDefault();
                const user = document.getElementById('username').value;
                const pass = document.getElementById('password').value;
                
                if (window.AuthService.login(user, pass)) {
                    this.showApp();
                } else {
                    alert('Đăng nhập thất bại. Kiểm tra lại thông tin.');
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
                    document.querySelector('.sidebar').classList.remove('active');
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
                    }
                });
            });

            // Mobile Menu Toggle
            document.querySelector('.menu-toggle').addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('open');
            });
        },

        showLogin() {
            document.getElementById('login-screen').classList.remove('hidden');
            document.getElementById('app-screen').classList.add('hidden');
        },

        showApp() {
            document.getElementById('login-screen').classList.add('hidden');
            document.getElementById('app-screen').classList.remove('hidden');
            
            const user = window.AuthService.getCurrentUser();
            
            // Update UI with user info
            document.getElementById('current-user-name').textContent = user.name;
            document.getElementById('current-user-role').textContent = user.role.name;
            
            // Init filters based on user role
            window.FilterManager.init();
            window.FilterManager.updateCompanyFilterVisibility(user);
            
            // Show Admin link only for ADMIN user
            const adminNav = document.getElementById('nav-admin');
            if (adminNav) {
                // Determine if user is ADMIN. The ID isn't directly on user obj, but we can check name
                if (user.name === 'ADMIN') {
                    adminNav.classList.remove('hidden');
                } else {
                    adminNav.classList.add('hidden');
                }
            }
            
            // Initialize Dashboard Modules
            if(window.ChartManager) window.ChartManager.init();
            if(window.OverviewModule) window.OverviewModule.init();
            if(window.CustomersModule) window.CustomersModule.init();
            if(window.RevenueModule) window.RevenueModule.init();
            if(window.InventoryModule) window.InventoryModule.init();
            if(window.DebtModule) window.DebtModule.init();
            if(window.HrModule) window.HrModule.init();
            if(window.AdminModule) window.AdminModule.init();
            
            // Trigger CRM API Backend Test
            if(window.CrmConnector) window.CrmConnector.fetchDashboardData(new Date().getMonth() + 1, user.company);

            // Trigger initial data load
            window.FilterManager.triggerFilterChange();
            
            // Show overview by default
            this.showView('overview');
        },

        showView(viewId) {
            // Update title
            const titles = {
                'overview': 'DASHBOARD',
                'hr': '1. CCTC Nhân Sự',
                'revenue': '2. Doanh Số Lãi Gộp',
                'product': '3. Sản Phẩm',
                'inventory': '4. Tồn Kho',
                'expense': '5. Chi Phí',
                'debt': '6. Công Nợ',
                'customers': '7. Khách Hàng',
                'service': '8. Dịch Vụ Tận Tâm',
                'iso': '9. ISO',
                'training': '10. Đào Tạo',
                'culture': '11. Văn Hóa Doanh Nghiệp',
                'brand': '12. Thương Hiệu',
                'admin': 'Quản trị Hệ thống'
            };
            document.getElementById('page-title').textContent = titles[viewId] || 'Dashboard';
            
            // Hide all views
            document.querySelectorAll('.view').forEach(view => {
                view.classList.add('hidden');
            });
            
            // Show target
            document.getElementById(`view-${viewId}`).classList.remove('hidden');
        }
    };

    App.init();
});
