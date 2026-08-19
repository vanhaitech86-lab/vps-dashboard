/**
 * Mock Data Service for VPS Dashboard
 * Simulates data fetching from backend APIs
 */

const COMPANIES = ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS', 'Văn phòng VPS'];

const mockData = {
    customers: {
        total: 12450,
        trend: { new: 650, lost: -30, decreased: -15, totalIncreased: 650, percentage: 5.2 },
        plan2026: {
                'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'Tân Hồng Hà': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Việt': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'Xem Sơn': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPS M': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
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
        plan2026: {
                'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'Tân Hồng Hà': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Việt': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'Xem Sơn': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPS M': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
    byCompany: {
                    'Tân Hồng Hà': { actual: 68.204, plan: 300.0 },
            'Việt': { actual: 40.891, plan: 106.0 },
            'Xem Sơn': { actual: 69.426, plan: 168.0 },
            'VPS M': { actual: 11.251, plan: 45.0 },
            'ITSS': { actual: 2.914, plan: 13.64 },
            'Văn phòng VPS': { actual: 0, plan: 0 }
        },
        monthlyComparison: {
            // Mock data cho biểu đồ đường hoặc cột (12 tháng)
            currentYear: [30, 45, 42, 50, 48, 55, 60, 65, 0, 0, 0, 0], // Dữ liệu năm nay (Ví dụ đến tháng 8)
            previousYear: [25, 40, 38, 48, 45, 52, 58, 62, 55, 65, 70, 80] // Dữ liệu năm trước
        }
    },
    debt: {
        total: 45.2,
        plan2026: {
                'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'Tân Hồng Hà': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Việt': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'Xem Sơn': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPS M': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
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
        plan2026: {
                'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'Tân Hồng Hà': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Việt': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'Xem Sơn': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPS M': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
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
        plan2026: {
                'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'Tân Hồng Hà': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Việt': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'Xem Sơn': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPS M': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
    byCompany: {
            'Tân Hồng Hà': { quota: 54, official: 48, probation: 2, resigned: 3, kpi: {A: 2, B: 43, C: 3, D: 0}, analysis: { cause: 'Cần bổ sung nhân sự kinh doanh và hoàn thành định biên. Trong kỳ có 3 nhân sự nghỉ việc (Linh, Lan Anh, Nguyệt).', solution: 'Tuyển thêm nhân viên kinh doanh theo định mức để bù đắp quân số.' } },
            'Việt': { quota: 43, official: 38, probation: 1, resigned: 0, kpi: {A: 14, B: 19, C: 1, D: 4}, analysis: { cause: 'Chất lượng nhân sự có phân bổ rộng, một số yếu kém cần cải thiện.', solution: 'Tuyển bổ sung 3 nhân sự, đào tạo lại nhóm nhân sự loại D.' } },
            'Xem Sơn': { quota: 98, official: 95, probation: 1, resigned: 0, kpi: {A: 0, B: 85, C: 10, D: 0}, analysis: { cause: 'Nhân sự khá ổn định nhưng chưa có cá nhân xuất sắc.', solution: 'Tuyển thêm 2 nhân viên kinh doanh để hoàn thiện cơ cấu.' } },
            'VPS M': { quota: 15, official: 10, probation: 0, resigned: 0, kpi: {A: 0, B: 10, C: 0, D: 0}, analysis: { cause: 'Thiếu hụt đáng kể so với định biên (cần 5 nhân viên kinh doanh).', solution: 'Gấp rút đẩy mạnh hoạt động tuyển dụng nhân sự kinh doanh.' } },
            'ITSS': { quota: 8, official: 3, probation: 1, resigned: 0, kpi: {A: 3, B: 0, C: 0, D: 0}, analysis: { cause: 'Team ITSS quy mô nhỏ, chất lượng nhân sự xuất sắc nhưng thiếu số lượng.', solution: 'Tuyển dụng thêm 4 nhân sự lập trình/hỗ trợ CRM.' } },
            'Văn phòng VPS': { quota: 19, official: 18, probation: 0, resigned: 1, kpi: {A: 0, B: 18, C: 0, D: 0}, analysis: { cause: 'Nhân sự đã gần đủ định biên. Vừa có 1 nhân sự nghỉ việc (Quang).', solution: 'Tuyển thêm vị trí thay thế, duy trì chính sách giữ chân nhân sự.' } }
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


