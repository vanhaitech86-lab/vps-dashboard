/**
 * Mock Data Service for VPS Dashboard
 * Simulates data fetching from backend APIs
 */

const COMPANIES = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'Văn phòng VPS'];

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
        }
    }
},
        plan2026: {
                'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'THH': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Viet': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'XemSon': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPSM': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
    byCompany: {
            'THH': { service: 1200, rental: 800, distribution: 2500, new: 150, lost: -5, decreased: -2 },
            'Viet': { service: 900, rental: 600, distribution: 1500, new: 100, lost: -10, decreased: -3 },
            'XemSon': { service: 1500, rental: 1100, distribution: 300, new: 250, lost: -8, decreased: -5 },
            'VPSM': { service: 600, rental: 400, distribution: 800, new: 50, lost: -2, decreased: -1 },
            'ITSS': { service: 300, rental: 150, distribution: 200, new: 100, lost: -5, decreased: -4 },
            'Văn phòng VPS': { service: 50, rental: 10, distribution: 20, new: 5, lost: 0, decreased: -1 }
        }
    },
    revenue: {
        total: 450.5,
        plan2026: {
                'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'THH': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Viet': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'XemSon': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPSM': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
    byCompany: {
                    'THH': { actual: 68.204, plan: 300.0 },
            'Viet': { actual: 40.891, plan: 106.0 },
            'XemSon': { actual: 69.426, plan: 168.0 },
            'VPSM': { actual: 11.251, plan: 45.0 },
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
        'THH': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Viet': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'XemSon': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPSM': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
    byCompany: {
            'THH': { current: 8.5, overdue: 2.1, bad: 0.5 },
            'Viet': { current: 5.2, overdue: 1.5, bad: 0.2 },
            'XemSon': { current: 9.0, overdue: 3.0, bad: 1.1 },
            'VPSM': { current: 7.5, overdue: 1.0, bad: 0.1 },
            'ITSS': { current: 4.0, overdue: 1.2, bad: 0.3 },
            'Văn phòng VPS': { current: 1.5, overdue: 0.2, bad: 0.0 }
        },
        badDebtsList: [
            { id: 1, customer: 'Công ty Cổ phần Alpha', company: 'THH', amount: 250000000, daysOverdue: 120, status: 'Khoá tài khoản' },
            { id: 2, customer: 'Tập đoàn Beta', company: 'XemSon', amount: 500000000, daysOverdue: 95, status: 'Đang pháp lý' },
            { id: 3, customer: 'Đại lý Gamma', company: 'Viet', amount: 120000000, daysOverdue: 150, status: 'Khoá tài khoản' },
            { id: 4, customer: 'Cửa hàng Delta', company: 'ITSS', amount: 85000000, daysOverdue: 110, status: 'Chờ thanh toán' },
            { id: 5, customer: 'Đại lý Epsilon', company: 'VPSM', amount: 150000000, daysOverdue: 60, status: 'Đang theo dõi' }
        ]
    },
    inventory: {
        total: 69183.27, // Ty VND
        byCompany: {
            'all': {
                brands: { 'HP': 38534031075, 'Fujifilm': 22849479085, 'Olivetti': 550312253, 'Bonsai': 2398346934, 'Khac': 4960116121 },
                categories: {
                    'May': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Option': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Consumable': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Part': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Khac': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Tong': { 'HP': 38534031075, 'Fujifilm': 22849479085, 'Olivetti': 550312253, 'Bonsai': 2398346934, 'Khac': 4960116121, 'Cong': 69183272352 }
                }
            },
            'THH': {
                brands: { 'HP': 19088136754, 'Fujifilm': 8744769719, 'Olivetti': 147356859, 'Bonsai': 1197169790, 'Khac': 1160336475 },
                categories: {
                    'May': { 'HP': 16236861538, 'Fujifilm': 2691167947, 'Olivetti': 145461859, 'Bonsai': 1196919790, 'Khac': 351112106, 'Cong': 20621523240 },
                    'Option': { 'HP': 724129217, 'Fujifilm': 316631629, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 84155594, 'Cong': 1124916440 },
                    'Consumable': { 'HP': 1697362872, 'Fujifilm': 3893921782, 'Olivetti': 595000, 'Bonsai': 0, 'Khac': 477185636, 'Cong': 6069065290 },
                    'Part': { 'HP': 422875719, 'Fujifilm': 1842798361, 'Olivetti': 1300000, 'Bonsai': 250000, 'Khac': 232552257, 'Cong': 2499776337 },
                    'Khac': { 'HP': 6907408, 'Fujifilm': 250000, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 15330882, 'Cong': 22488290 },
                    'Tong': { 'HP': 19088136754, 'Fujifilm': 8744769719, 'Olivetti': 147356859, 'Bonsai': 1197169790, 'Khac': 1160336475, 'Cong': 30567325628 }
                }
            },
            'Viet': {
                brands: { 'HP': 1464514898, 'Fujifilm': 565815358, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 2641297155 },
                categories: {
                    'May': { 'HP': 789169565, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 865846304, 'Cong': 1655015869 },
                    'Option': { 'HP': 0, 'Fujifilm': 3770311, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 3770311 },
                    'Consumable': { 'HP': 671194009, 'Fujifilm': 407253157, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 1163183311, 'Cong': 2241630477 },
                    'Part': { 'HP': 4151324, 'Fujifilm': 154791890, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 294985264, 'Cong': 453928478 },
                    'Khac': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 317282276, 'Cong': 317282276 },
                    'Tong': { 'HP': 1464514898, 'Fujifilm': 565815358, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 2641297155, 'Cong': 4671627411 }
                }
            },
            'XemSon': {
                brands: { 'HP': 16201444802, 'Fujifilm': 11217528088, 'Olivetti': 330260724, 'Bonsai': 1071775506, 'Khac': 819913344 },
                categories: {
                    'May': { 'HP': 8045068951, 'Fujifilm': 2429722467, 'Olivetti': 198937517, 'Bonsai': 1061511065, 'Khac': 162201573, 'Cong': 11897441573 },
                    'Option': { 'HP': 5929018372, 'Fujifilm': 146022831, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 44239635, 'Cong': 6119280838 },
                    'Consumable': { 'HP': 1887432428, 'Fujifilm': 6988196768, 'Olivetti': 131323207, 'Bonsai': 0, 'Khac': 481597314, 'Cong': 9488549717 },
                    'Part': { 'HP': 339925051, 'Fujifilm': 1653586022, 'Olivetti': 0, 'Bonsai': 10264441, 'Khac': 126635862, 'Cong': 2130411376 },
                    'Khac': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 5238960, 'Cong': 5238960 },
                    'Tong': { 'HP': 16201444802, 'Fujifilm': 11217528088, 'Olivetti': 330260724, 'Bonsai': 1071775506, 'Khac': 819913344, 'Cong': 29640922464 }
                }
            },
            'VPSM': {
                brands: { 'HP': 1779934621, 'Fujifilm': 2321365920, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khac': 338569147 },
                categories: {
                    'May': { 'HP': 691079773, 'Fujifilm': 712194005, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khac': 0, 'Cong': 1605370086 },
                    'Option': { 'HP': 7499646, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 7499646 },
                    'Consumable': { 'HP': 1081355202, 'Fujifilm': 1479770277, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 2561125479 },
                    'Part': { 'HP': 0, 'Fujifilm': 129401638, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 129401638 },
                    'Khac': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 338569147, 'Cong': 338569147 },
                    'Tong': { 'HP': 1779934621, 'Fujifilm': 2321365920, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khac': 338569147, 'Cong': 4303396849 }
                }
            }
        }
    },
    hr: {
        plan2026: {
                'all': { ds: 632640, actual: 192686, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'THH': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Viet': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'XemSon': { ds: 168000, actual: 69426, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPSM': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }
    },
    byCompany: {
            'THH': { quota: 54, official: 48, probation: 2, resigned: 3, kpi: {A: 2, B: 43, C: 3, D: 0}, analysis: { cause: 'Cần bổ sung nhân sự kinh doanh và hoàn thành định biên. Trong kỳ có 3 nhân sự nghỉ việc (Linh, Lan Anh, Nguyệt).', solution: 'Tuyển thêm nhân viên kinh doanh theo định mức để bù đắp quân số.' } },
            'Viet': { quota: 43, official: 38, probation: 1, resigned: 0, kpi: {A: 14, B: 19, C: 1, D: 4}, analysis: { cause: 'Chất lượng nhân sự có phân bổ rộng, một số yếu kém cần cải thiện.', solution: 'Tuyển bổ sung 3 nhân sự, đào tạo lại nhóm nhân sự loại D.' } },
            'XemSon': { quota: 98, official: 95, probation: 1, resigned: 0, kpi: {A: 0, B: 85, C: 10, D: 0}, analysis: { cause: 'Nhân sự khá ổn định nhưng chưa có cá nhân xuất sắc.', solution: 'Tuyển thêm 2 nhân viên kinh doanh để hoàn thiện cơ cấu.' } },
            'VPSM': { quota: 15, official: 10, probation: 0, resigned: 0, kpi: {A: 0, B: 10, C: 0, D: 0}, analysis: { cause: 'Thiếu hụt đáng kể so với định biên (cần 5 nhân viên kinh doanh).', solution: 'Gấp rút đẩy mạnh hoạt động tuyển dụng nhân sự kinh doanh.' } },
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


