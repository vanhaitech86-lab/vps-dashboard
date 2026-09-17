/**
 * Authentication and Role-Based Access Control (RBAC)
 */

const ROLES = {
    CEO: { level: 1, name: 'Chủ tịch / CEO', canViewAll: true },
    CSO: { level: 2, name: 'Phó Chủ tịch / CSO', canViewAll: true },
    DIRECTOR: { level: 3, name: 'Giám đốc', canViewAll: false },
    MANAGER: { level: 4, name: 'Trưởng phòng', canViewAll: false },
    LEADER: { level: 5, name: 'Tổ trưởng', canViewAll: false },
    STAFF: { level: 6, name: 'Nhân viên', canViewAll: false }
};

// Default Mock Users Database
const DEFAULT_USERS = {
    'ADMIN': { password: 'Admin123a@', role: ROLES.CEO, name: 'ADMIN', company: 'all' },
    'CEO': { password: '123a@', role: ROLES.CEO, name: 'CEO/TỔNG GIÁM ĐỐC VPS', company: 'all' },
    'THH': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC TÂN HỒNG HÀ', company: 'Tân Hồng Hà' },
    'VIET': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VIỆT', company: 'Việt' },
    'VCOPY': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VIỆT', company: 'Việt' },
    'XESCO': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC XEM SƠN', company: 'Xem Sơn' },
    'VPSM': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VPS M', company: 'VPS M' },
    'vpsm': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VPS M', company: 'VPS M' },
    'ITSS': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC ITSS', company: 'ITSS' },
    'VPVPS': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VP VPS', company: 'Văn phòng VPS' },
    'vpvps': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VP VPS', company: 'Văn phòng VPS' }
};

let usersDB = null;

window.AuthService = {
    currentUser: null,

    loadUsers() {
        try {
            if (!usersDB) {
                const stored = localStorage.getItem('vps_users_db');
                if (stored) {
                    try { usersDB = JSON.parse(stored); } catch(e) {}
                }
            }
            if (!usersDB || typeof usersDB !== 'object') {
                usersDB = JSON.parse(JSON.stringify(DEFAULT_USERS));
            }
            // Master overrides: ensure core accounts exist with right roles
            usersDB['ADMIN'] = { password: 'Admin123a@', role: ROLES.CEO, name: 'ADMIN', company: 'all' };
            if (!usersDB['CEO']) usersDB['CEO'] = { password: '123a@', role: ROLES.CEO, name: 'CEO/TỔNG GIÁM ĐỐC VPS', company: 'all' };
            if (!usersDB['VIET']) usersDB['VIET'] = { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VIỆT', company: 'Việt' };
            if (!usersDB['THH']) usersDB['THH'] = { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC TÂN HỒNG HÀ', company: 'Tân Hồng Hà' };
            if (!usersDB['XESCO']) usersDB['XESCO'] = { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC XEM SƠN', company: 'Xem Sơn' };
            if (!usersDB['VPSM']) usersDB['VPSM'] = { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VPS M', company: 'VPS M' };
            if (!usersDB['ITSS']) usersDB['ITSS'] = { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC ITSS', company: 'ITSS' };
            if (!usersDB['VPVPS']) usersDB['VPVPS'] = { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VP VPS', company: 'Văn phòng VPS' };
            
            localStorage.setItem('vps_users_db', JSON.stringify(usersDB));
        } catch(err) {
            console.error('Fatal loadUsers error', err);
            usersDB = JSON.parse(JSON.stringify(DEFAULT_USERS));
            usersDB['ADMIN'] = { password: 'Admin123a@', role: ROLES.CEO, name: 'ADMIN', company: 'all' };
        }
    },

    getUsers() {
        this.loadUsers();
        return usersDB;
    },

    saveUser(id, userData) {
        this.loadUsers();
        usersDB[id] = userData;
        localStorage.setItem('vps_users_db', JSON.stringify(usersDB));
    },

    deleteUser(id) {
        this.loadUsers();
        if (usersDB[id] && id !== 'ADMIN') {
            delete usersDB[id];
            localStorage.setItem('vps_users_db', JSON.stringify(usersDB));
        }
    },

    login(username, password) {
        try {
            this.loadUsers();
            if(!username) return false;
            
            const u = username.trim().toLowerCase();
            const p = password.trim();
            
            // Master override for admin
            if (u === 'admin' && (p === 'Admin123a@' || p === 'admin123a@' || p === 'Admin123@' || p === 'admin123@' || p === 'Admin123' || p === 'admin123')) {
                this.currentUser = usersDB['ADMIN'] || { password: 'Admin123a@', role: ROLES.CEO, name: 'ADMIN', company: 'all' };
                localStorage.setItem('vps_user', JSON.stringify(this.currentUser));
                return true;
            }

            let userKey = Object.keys(usersDB).find(k => k.toLowerCase() === u);
            const user = userKey ? usersDB[userKey] : null;
            
            if (user && user.password === p) {
                this.currentUser = user;
                localStorage.setItem('vps_user', JSON.stringify(this.currentUser));
                return true;
            }
            return false;
        } catch (e) {
            alert('Lỗi đăng nhập hệ thống: ' + e.message);
            return false;
        }
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('vps_user');
    },

    checkSession() {
        try {
            this.loadUsers();
            const stored = localStorage.getItem('vps_user');
            if (stored) {
                this.currentUser = JSON.parse(stored);
                if (!this.currentUser) return false;
                
                // Refresh with latest data from DB just in case it was updated
                const userKey = Object.keys(usersDB).find(k => k.toLowerCase() === (this.currentUser.id || this.currentUser.name || '').toLowerCase());
                if (userKey && usersDB[userKey]) {
                    this.currentUser = usersDB[userKey];
                }
                return true;
            }
            return false;
        } catch(e) {
            console.error('Session check failed', e);
            localStorage.removeItem('vps_user');
            return false;
        }
    },

    getCurrentUser() {
        return this.currentUser;
    },

    // RBAC: ONLY ADMIN and CEO with company === 'all' can view all companies
    canViewAll() {
        if (!this.currentUser) return false;
        if (this.currentUser.name === 'ADMIN' || (this.currentUser.id && this.currentUser.id.toUpperCase() === 'ADMIN')) return true;
        if (this.currentUser.company === 'all') {
            const role = this.currentUser.role;
            if (role && (role.canViewAll === true || role.level === 1 || (typeof role === 'string' && (role.toLowerCase() === 'ceo' || role.toLowerCase() === 'admin')))) {
                return true;
            }
        }
        return false;
    },

    getAllowedCompany() {
        if (this.canViewAll()) return 'all';
        return (this.currentUser && this.currentUser.company) ? this.currentUser.company : 'all';
    },

    canViewCompany(companyName) {
        if (!this.currentUser) return false;
        if (this.canViewAll()) return true;
        if (companyName === 'all') return false;
        return this.currentUser.company === companyName;
    },

    getRolesMap() {
        return ROLES;
    }
};
