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
    'ADMIN': { password: 'Admin123@', role: ROLES.CEO, name: 'ADMIN', company: 'all' },
    'CEO': { password: '123a@', role: ROLES.CEO, name: 'CEO/TỔNG GIÁM ĐỐC VPS', company: 'all' },
    'THH': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC TÂN HỒNG HÀ', company: 'Tân Hồng Hà' },
    'VCOPY': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VIỆT', company: 'Việt' },
    'XESCO': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC XEM SƠN', company: 'Xem Sơn' },
    'vpsm': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VPS M', company: 'VPS M' },
    'ITSS': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC ITSS', company: 'ITSS' },
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
            // Master override: NEVER allow missing ADMIN
            usersDB['ADMIN'] = { password: 'Admin123@', role: ROLES.CEO, name: 'ADMIN', company: 'all' };
            localStorage.setItem('vps_users_db', JSON.stringify(usersDB));
        } catch(err) {
            console.error('Fatal loadUsers error', err);
            usersDB = JSON.parse(JSON.stringify(DEFAULT_USERS));
            usersDB['ADMIN'] = { password: 'Admin123@', role: ROLES.CEO, name: 'ADMIN', company: 'all' };
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
        if (usersDB[id]) {
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
            if (u === 'admin' && (p === 'Admin123@' || p === 'admin123' || p === 'admin123@' || p === 'Admin123')) {
                this.currentUser = usersDB['ADMIN'] || { password: 'Admin123@', role: ROLES.CEO, name: 'ADMIN', company: 'all' };
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
                if(usersDB[this.currentUser.id || Object.keys(usersDB).find(k => usersDB[k].name === this.currentUser.name)]) {
                    const userId = Object.keys(usersDB).find(k => usersDB[k].name === this.currentUser.name);
                    if (userId) this.currentUser = usersDB[userId];
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

    canViewCompany(companyName) {
        if (!this.currentUser) return false;
        if (this.currentUser.role.canViewAll) return true;
        return this.currentUser.company === companyName;
    },

    getRolesMap() {
        return ROLES;
    }
};
