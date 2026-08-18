/**
 * Mock Data Service for VPS Dashboard
 * Simulates data fetching from backend APIs
 */

const COMPANIES = ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS'];

const mockData = {
    customers: {
        total: 12450,
        byCompany: {
            'Tân Hồng Hà': { service: 1200, rental: 800, distribution: 1500, new: 120, lost: 10 },
            'Việt': { service: 900, rental: 600, distribution: 1100, new: 80, lost: 5 },
            'Xem Sơn': { service: 1500, rental: 400, distribution: 800, new: 90, lost: 12 },
            'VPS M': { service: 800, rental: 900, distribution: 400, new: 150, lost: 8 },
            'ITSS': { service: 830, rental: 400, distribution: 320, new: 60, lost: 4 }
        }
    },
    revenue: {
        total: 450.5,
        byCompany: {
            'Tân Hồng Hà': { actual: 120.5, plan: 110.0 },
            'Việt': { actual: 85.0, plan: 90.0 },
            'Xem Sơn': { actual: 95.2, plan: 95.0 },
            'VPS M': { actual: 105.8, plan: 100.0 },
            'ITSS': { actual: 44.0, plan: 50.0 }
        }
    },
    debt: {
        total: 45.2,
        byCompany: {
            'Tân Hồng Hà': { current: 8.5, overdue: 2.1, bad: 0.5 },
            'Việt': { current: 5.2, overdue: 1.5, bad: 0.2 },
            'Xem Sơn': { current: 9.0, overdue: 3.0, bad: 1.1 },
            'VPS M': { current: 7.5, overdue: 1.0, bad: 0.1 },
            'ITSS': { current: 4.0, overdue: 1.2, bad: 0.3 }
        },
        badDebtsList: [
            { id: 1, customer: 'Công ty Cổ phần Alpha', company: 'Tân Hồng Hà', amount: 250000000, daysOverdue: 120, status: 'Khoá tài khoản' },
            { id: 2, customer: 'Tập đoàn Beta', company: 'Xem Sơn', amount: 500000000, daysOverdue: 95, status: 'Đang pháp lý' },
            { id: 3, customer: 'Đại lý Gamma', company: 'Việt', amount: 120000000, daysOverdue: 150, status: 'Khoá tài khoản' },
            { id: 4, customer: 'Cửa hàng Delta', company: 'ITSS', amount: 85000000, daysOverdue: 110, status: 'Chờ thanh toán' }
        ]
    },
    inventory: {
        total: 85.3,
        byCompany: {
            'Tân Hồng Hà': { value: 25.5 },
            'Việt': { value: 18.2 },
            'Xem Sơn': { value: 15.0 },
            'VPS M': { value: 20.1 },
            'ITSS': { value: 6.5 }
        }
    }
};

window.DataService = {
    async getCustomersData(period = 'month', company = 'all') {
        // Simulate network delay
        return new Promise(resolve => setTimeout(() => resolve(mockData.customers), 300));
    },
    
    async getRevenueData(period = 'month', company = 'all') {
        return new Promise(resolve => setTimeout(() => resolve(mockData.revenue), 300));
    },
    
    async getDebtData(period = 'month', company = 'all') {
        return new Promise(resolve => setTimeout(() => resolve(mockData.debt), 300));
    },

    async getInventoryData(period = 'month', company = 'all') {
        return new Promise(resolve => setTimeout(() => resolve(mockData.inventory), 300));
    }
};
