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
const users = {
    'ceo': { name: 'Vũ Phạm', role: ROLES.CEO, company: 'all' },
    'cso': { name: 'Trần Bình', role: ROLES.CSO, company: 'all' },
    'director_thh': { name: 'Lê Cường', role: ROLES.DIRECTOR, company: 'Tân Hồng Hà' },
    'manager_itss': { name: 'Nguyễn Dũng', role: ROLES.MANAGER, company: 'ITSS' },
    'staff_vpsm': { name: 'Phạm E', role: ROLES.STAFF, company: 'VPS M' }
};

window.AuthService = {
    currentUser: null,

    login(username, password) {
        // Mock authentication
        if (users[username] && password === 'password') {
            this.currentUser = users[username];
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
