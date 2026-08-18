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

// Mock Users Database
const USERS = {
    'ADMIN': { password: 'Admin123@', role: ROLES.CEO, name: 'ADMIN', company: 'all' },
    'CEO': { password: '123a@', role: ROLES.CEO, name: 'CEO/TỔNG GIÁM ĐỐC VPS', company: 'all' },
    'THH': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC TÂN HỒNG HÀ', company: 'Tân Hồng Hà' },
    'VCOPY': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VIỆT', company: 'Việt' },
    'XESCO': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC XEM SƠN', company: 'Xem Sơn' },
    'vpsm': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC VPS M', company: 'VPS M' },
    'ITSS': { password: '123a@', role: ROLES.DIRECTOR, name: 'GIÁM ĐỐC ITSS', company: 'ITSS' }
};

window.AuthService = {
    currentUser: null,

    login(username, password) {
        // Mock authentication
        const user = USERS[username];
        if (user && user.password === password) {
            this.currentUser = user;
            localStorage.setItem('vps_user', JSON.stringify(this.currentUser));
            return true;
        }
        return false;
    },

    logout() {
        this.currentUser = null;
        localStorage.removeItem('vps_user');
    },

    checkSession() {
        const stored = localStorage.getItem('vps_user');
        if (stored) {
            this.currentUser = JSON.parse(stored);
            return true;
        }
        return false;
    },

    getCurrentUser() {
        return this.currentUser;
    },

    canViewCompany(companyName) {
        if (!this.currentUser) return false;
        if (this.currentUser.role.canViewAll) return true;
        return this.currentUser.company === companyName;
    }
};
