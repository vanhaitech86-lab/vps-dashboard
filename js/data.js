/**
 * Mock Data Service for VPS Dashboard
 * Simulates data fetching from backend APIs
 */

const COMPANIES = ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS', 'Văn phòng VPS'];

const mockData = {
    customers: {
        total: 12450,
        trend: { new: 650, lost: -30, decreased: -15, totalIncreased: 650, percentage: 5.2 },
        byCompany: {
            'Tân Hồng Hà': { service: 1200, rental: 800, distribution: 2500, new: 150, lost: -5, decreased: -2 },
            'Việt': { service: 900, rental: 600, distribution: 1500, new: 100, lost: -10, decreased: -3 },
            'Xem Sơn': { service: 1500, rental: 1100, distribution: 300, new: 250, lost: -8, decreased: -5 },
            'VPS M': { service: 600, rental: 400, distribution: 800, new: 50, lost: -2, decreased: -1 },
            'ITSS': { service: 300, rental: 150, distribution: 200, new: 100, lost: -5, decreased: -4 },
            'Văn phòng VPS': { service: 50, rental: 10, distribution: 20, new: 5, lost: 0, decreased: -1 }
        }
    },
    revenue: {
        total: 450.5,
        byCompany: {
            'Tân Hồng Hà': { actual: 120.5, plan: 110.0 },
            'Việt': { actual: 85.0, plan: 90.0 },
            'Xem Sơn': { actual: 95.2, plan: 95.0 },
            'VPS M': { actual: 105.8, plan: 100.0 },
            'ITSS': { actual: 44.0, plan: 50.0 },
            'Văn phòng VPS': { actual: 12.0, plan: 15.0 }
        },
        monthlyComparison: {
            // Mock data cho biểu đồ đường hoặc cột (12 tháng)
            currentYear: [30, 45, 42, 50, 48, 55, 60, 65, 0, 0, 0, 0], // Dữ liệu năm nay (Ví dụ đến tháng 8)
            previousYear: [25, 40, 38, 48, 45, 52, 58, 62, 55, 65, 70, 80] // Dữ liệu năm trước
        }
    },
    debt: {
        total: 45.2,
        byCompany: {
            'Tân Hồng Hà': { current: 8.5, overdue: 2.1, bad: 0.5 },
            'Việt': { current: 5.2, overdue: 1.5, bad: 0.2 },
            'Xem Sơn': { current: 9.0, overdue: 3.0, bad: 1.1 },
            'VPS M': { current: 7.5, overdue: 1.0, bad: 0.1 },
            'ITSS': { current: 4.0, overdue: 1.2, bad: 0.3 },
            'Văn phòng VPS': { current: 1.5, overdue: 0.2, bad: 0.0 }
        },
        badDebtsList: [
            { id: 1, customer: 'Công ty Cổ phần Alpha', company: 'Tân Hồng Hà', amount: 250000000, daysOverdue: 120, status: 'Khoá tài khoản' },
            { id: 2, customer: 'Tập đoàn Beta', company: 'Xem Sơn', amount: 500000000, daysOverdue: 95, status: 'Đang pháp lý' },
            { id: 3, customer: 'Đại lý Gamma', company: 'Việt', amount: 120000000, daysOverdue: 150, status: 'Khoá tài khoản' },
            { id: 4, customer: 'Cửa hàng Delta', company: 'ITSS', amount: 85000000, daysOverdue: 110, status: 'Chờ thanh toán' },
            { id: 5, customer: 'Đại lý Epsilon', company: 'VPS M', amount: 150000000, daysOverdue: 60, status: 'Đang theo dõi' }
        ]
    },
    inventory: {
        total: 85.3,
        byCompany: {
            'Tân Hồng Hà': { value: 25.5 },
            'Việt': { value: 18.2 },
            'Xem Sơn': { value: 15.0 },
            'VPS M': { value: 20.1 },
            'ITSS': { value: 6.5 },
            'Văn phòng VPS': { value: 2.1 }
        }
    },
    hr: {
        byCompany: {
            'Tân Hồng Hà': { quota: 150, official: 120, probation: 15, resigned: 3 },
            'Việt': { quota: 100, official: 85, probation: 10, resigned: 2 },
            'Xem Sơn': { quota: 80, official: 70, probation: 5, resigned: 1 },
            'VPS M': { quota: 120, official: 100, probation: 12, resigned: 4 },
            'ITSS': { quota: 50, official: 40, probation: 5, resigned: 0 },
            'Văn phòng VPS': { quota: 40, official: 30, probation: 5, resigned: 2 }
        }
    }
};

// Helper to simulate data changing over time periods
function applyPeriodMultiplier(data, period) {
    let multiplier = 1;
    if(period === 'day') multiplier = 0.03;
    if(period === 'week') multiplier = 0.25;
    if(period === 'month') multiplier = 1;
    if(period === 'year') multiplier = 12;

    // Deep clone to not mutate original mock data
    const cloned = JSON.parse(JSON.stringify(data));
    
    // Naive recursive multiplication for numbers (except ids and daysOverdue)
    function multiplyNumbers(obj) {
        for (let key in obj) {
            if (typeof obj[key] === 'number' && key !== 'id' && key !== 'daysOverdue' && key !== 'percentage') {
                obj[key] = obj[key] * multiplier;
            } else if (typeof obj[key] === 'object' && obj[key] !== null) {
                multiplyNumbers(obj[key]);
            }
        }
    }
    multiplyNumbers(cloned);
    return cloned;
}

// Cấu trúc Data Giả lập (Mock Data)
// Hiện tại Dashboard vẫn đang hiển thị số liệu từ đây. 
// Khi đấu nối xong CRM thật, chúng ta sẽ xóa hoặc vô hiệu hóa file này.

/**
 * CRM API Connector (Kết nối Frontend với Backend Vercel)
 */
window.CrmConnector = {
    async fetchDashboardData(month, company) {
        try {
            console.log(`[CrmConnector] Đang gọi API Backend Vercel để lấy dữ liệu ${company || 'Tất cả'} - Tháng ${month || 'Hiện tại'}...`);
            
            // Gọi lên Serverless Function vừa được tạo ở thư mục /api
            const response = await fetch(`/api/crm_sync?month=${month || 8}&company=${encodeURIComponent(company || 'all')}`);
            const data = await response.json();
            
            console.log("[CrmConnector] Dữ liệu từ Backend trả về:", data);
            return data;
        } catch (error) {
            console.error("[CrmConnector] Lỗi kết nối API:", error);
            return null;
        }
    }
};

window.DataService = {
    async getCustomersData(period = 'month', company = 'all') {
        return new Promise(resolve => setTimeout(() => resolve(applyPeriodMultiplier(mockData.customers, period)), 200));
    },
    
    async getRevenueData(period = 'month', company = 'all') {
        return new Promise(resolve => setTimeout(() => resolve(applyPeriodMultiplier(mockData.revenue, period)), 200));
    },
    
    async getDebtData(period = 'month', company = 'all') {
        return new Promise(resolve => setTimeout(() => resolve(applyPeriodMultiplier(mockData.debt, period)), 200));
    },

    async getInventoryData(period = 'month', company = 'all') {
        return new Promise(resolve => setTimeout(() => resolve(applyPeriodMultiplier(mockData.inventory, period)), 200));
    },

    async getHrData(period = 'month', company = 'all') {
        // HR data should generally not be multiplied by period for headcount, except maybe resigned.
        // For simplicity we will return it as is or lightly processed.
        return new Promise(resolve => setTimeout(() => resolve(mockData.hr), 200));
    }
};
