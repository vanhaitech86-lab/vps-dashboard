/**
 * Mock Data Service for VPS Dashboard
 * Simulates data fetching from backend APIs
 */

const COMPANIES = ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS', 'Văn phòng VPS'];

const mockData = {
    customers: {
        total: 12450,
        trend: { new: 650, lost: -30, decreased: -15, totalIncreased: 650, percentage: 5.2 },
        matrix: {
    "all": {
        "thue_may": {
            "dau": {
                "may": 1938,
                "kh": 601
            },
            "tang": {
                "may": 45,
                "kh": 12
            },
            "giam": {
                "may": 21,
                "kh": 4
            },
            "cuoi": {
                "may": 1962,
                "kh": 609
            }
        },
        "mc": {
            "dau": {
                "may": 396,
                "kh": 207
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 10,
                "kh": 2
            },
            "cuoi": {
                "may": 386,
                "kh": 205
            }
        },
        "dv_photo": {
            "dau": {
                "may": 3317,
                "kh": 1096
            },
            "tang": {
                "may": 4,
                "kh": 4
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 3330,
                "kh": 1099
            }
        },
        "dv_may_in": {
            "dau": {
                "may": 1939,
                "kh": 285
            },
            "tang": {
                "may": 2,
                "kh": 2
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 1948,
                "kh": 289
            }
        },
        "dv_khac": {
            "dau": {
                "may": 0,
                "kh": 0
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 0
            }
        },
        "phan_phoi": {
            "dau": {
                "may": 0,
                "kh": 1881
            },
            "tang": {
                "may": 0,
                "kh": 64
            },
            "giam": {
                "may": 0,
                "kh": 1
            },
            "cuoi": {
                "may": 0,
                "kh": 1944
            }
        }
    },
    "THH": {
        "thue_may": {
            "dau": {
                "may": 314,
                "kh": 98
            },
            "tang": {
                "may": 23,
                "kh": 3
            },
            "giam": {
                "may": 1,
                "kh": 0
            },
            "cuoi": {
                "may": 336,
                "kh": 101
            }
        },
        "mc": {
            "dau": {
                "may": 248,
                "kh": 166
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 10,
                "kh": 2
            },
            "cuoi": {
                "may": 238,
                "kh": 164
            }
        },
        "dv_photo": {
            "dau": {
                "may": 1760,
                "kh": 613
            },
            "tang": {
                "may": 4,
                "kh": 4
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 1764,
                "kh": 617
            }
        },
        "dv_may_in": {
            "dau": {
                "may": 1148,
                "kh": 50
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 1148,
                "kh": 50
            }
        },
        "dv_khac": {
            "dau": {
                "may": 0,
                "kh": 0
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 0
            }
        },
        "phan_phoi": {
            "dau": {
                "may": 0,
                "kh": 358
            },
            "tang": {
                "may": 0,
                "kh": 2
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 360
            }
        }
    },
    "Viet": {
        "thue_may": {
            "dau": {
                "may": 804,
                "kh": 244
            },
            "tang": {
                "may": 11,
                "kh": 3
            },
            "giam": {
                "may": 17,
                "kh": 3
            },
            "cuoi": {
                "may": 798,
                "kh": 244
            }
        },
        "mc": {
            "dau": {
                "may": 1,
                "kh": 1
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 1,
                "kh": 1
            }
        },
        "dv_photo": {
            "dau": {
                "may": 0,
                "kh": 0
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 0
            }
        },
        "dv_may_in": {
            "dau": {
                "may": 0,
                "kh": 0
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 0
            }
        },
        "dv_khac": {
            "dau": {
                "may": 0,
                "kh": 0
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 0
            }
        },
        "phan_phoi": {
            "dau": {
                "may": 0,
                "kh": 1041
            },
            "tang": {
                "may": 0,
                "kh": 11
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 1052
            }
        }
    },
    "XemSon": {
        "thue_may": {
            "dau": {
                "may": 766,
                "kh": 235
            },
            "tang": {
                "may": 11,
                "kh": 6
            },
            "giam": {
                "may": 2,
                "kh": 1
            },
            "cuoi": {
                "may": 775,
                "kh": 240
            }
        },
        "mc": {
            "dau": {
                "may": 100,
                "kh": 38
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 100,
                "kh": 38
            }
        },
        "dv_photo": {
            "dau": {
                "may": 1340,
                "kh": 385
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 1349,
                "kh": 384
            }
        },
        "dv_may_in": {
            "dau": {
                "may": 430,
                "kh": 94
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 437,
                "kh": 96
            }
        },
        "dv_khac": {
            "dau": {
                "may": 0,
                "kh": 0
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 0
            }
        },
        "phan_phoi": {
            "dau": {
                "may": 0,
                "kh": 435
            },
            "tang": {
                "may": 0,
                "kh": 29
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 464
            }
        }
    },
    "VPSM": {
        "thue_may": {
            "dau": {
                "may": 54,
                "kh": 24
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 1,
                "kh": 0
            },
            "cuoi": {
                "may": 53,
                "kh": 24
            }
        },
        "mc": {
            "dau": {
                "may": 47,
                "kh": 2
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 47,
                "kh": 2
            }
        },
        "dv_photo": {
            "dau": {
                "may": 217,
                "kh": 98
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 217,
                "kh": 98
            }
        },
        "dv_may_in": {
            "dau": {
                "may": 361,
                "kh": 141
            },
            "tang": {
                "may": 2,
                "kh": 2
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 363,
                "kh": 143
            }
        },
        "dv_khac": {
            "dau": {
                "may": 0,
                "kh": 0
            },
            "tang": {
                "may": 0,
                "kh": 0
            },
            "giam": {
                "may": 0,
                "kh": 0
            },
            "cuoi": {
                "may": 0,
                "kh": 0
            }
        },
        "phan_phoi": {
            "dau": {
                "may": 0,
                "kh": 47
            },
            "tang": {
                "may": 0,
                "kh": 22
            },
            "giam": {
                "may": 0,
                "kh": 1
            },
            "cuoi": {
                "may": 0,
                "kh": 68
            }
        }
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


