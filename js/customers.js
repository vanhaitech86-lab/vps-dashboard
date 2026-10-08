/**
 * Customers Module - VPS Dashboard
 * Redesigned to exact specification:
 * - 5 Executive KPI Cards: Tổng KH, KH Mới, KH Mất (Màu đỏ), Phát sinh / KH Mất, KH Hiện có
 * - Charts: Cơ cấu KH hiện có theo mảng & Biến động KH Mới vs KH Mất (Màu đỏ)
 * - Table: Replicating exact structure of "Báo Cáo Chi Tiết Cơ Cấu Khách Hàng" from user image
 * - Recency buckets (3, 6 months) completely removed
 */

window.CustomersModule = {
    currentPeriod: 'month',
    currentCompany: 'all',
    selectedMonth: '09/2026',

        monthlyData: {
        '09/2026': {
            "all": {
                        "thue_may": {
                                    "dau": {
                                                "may": 2012,
                                                "kh": 624
                                    },
                                    "ke_hoach": {
                                                "may": 826,
                                                "kh": 266
                                    },
                                    "tang": {
                                                "may": 28,
                                                "kh": 3
                                    },
                                    "giam": {
                                                "may": 18,
                                                "kh": 7
                                    },
                                    "cuoi": {
                                                "may": 2022,
                                                "kh": 620
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 387,
                                                "kh": 204
                                    },
                                    "ke_hoach": {
                                                "may": 110,
                                                "kh": 40
                                    },
                                    "tang": {
                                                "may": 1,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 388,
                                                "kh": 204
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 1989,
                                                "kh": 1105
                                    },
                                    "ke_hoach": {
                                                "may": 1,
                                                "kh": 390
                                    },
                                    "tang": {
                                                "may": 49,
                                                "kh": 10
                                    },
                                    "giam": {
                                                "may": 23,
                                                "kh": 12
                                    },
                                    "cuoi": {
                                                "may": 1993,
                                                "kh": 1103
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 1961,
                                                "kh": 291
                                    },
                                    "ke_hoach": {
                                                "may": 450,
                                                "kh": 100
                                    },
                                    "tang": {
                                                "may": 2,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 1,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 1962,
                                                "kh": 291
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 2
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 4
                                    },
                                    "tang": {
                                                "may": 1,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 3
                                    }
                        },
                        "phan_phoi": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 1880
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 546
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 14
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 1894
                                    }
                        },
                        "kh_duoi_3_thang": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 1360
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 385
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
                                                "kh": 1371
                                    }
                        }
            },
            "THH": {
                        "thue_may": {
                                    "dau": {
                                                "may": 349,
                                                "kh": 103
                                    },
                                    "ke_hoach": {
                                                "may": 5,
                                                "kh": 5
                                    },
                                    "tang": {
                                                "may": 8,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 355,
                                                "kh": 103
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 238,
                                                "kh": 164
                                    },
                                    "ke_hoach": {
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
                                                "may": 238,
                                                "kh": 164
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 1771,
                                                "kh": 624
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
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
                                                "may": 1775,
                                                "kh": 628
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 1148,
                                                "kh": 50
                                    },
                                    "ke_hoach": {
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
                                                "may": 1148,
                                                "kh": 50
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                                "kh": 371
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 6
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 3
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 374
                                    }
                        },
                        "kh_duoi_3_thang": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 260
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 5
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
                                                "kh": 262
                                    }
                        }
            },
            "Viet": {
                        "thue_may": {
                                    "dau": {
                                                "may": 815,
                                                "kh": 246
                                    },
                                    "ke_hoach": {
                                                "may": 20,
                                                "kh": 10
                                    },
                                    "tang": {
                                                "may": 8,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 7,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 816,
                                                "kh": 246
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                        "dv_photo": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                    "ke_hoach": {
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
                                    "ke_hoach": {
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
                                                "kh": 950
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 40
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 5
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 955
                                    }
                        },
                        "kh_duoi_3_thang": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 710
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 30
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 4
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 714
                                    }
                        }
            },
            "XemSon": {
                        "thue_may": {
                                    "dau": {
                                                "may": 794,
                                                "kh": 250
                                    },
                                    "ke_hoach": {
                                                "may": 800,
                                                "kh": 250
                                    },
                                    "tang": {
                                                "may": 9,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 9,
                                                "kh": 5
                                    },
                                    "cuoi": {
                                                "may": 794,
                                                "kh": 245
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 102,
                                                "kh": 38
                                    },
                                    "ke_hoach": {
                                                "may": 110,
                                                "kh": 40
                                    },
                                    "tang": {
                                                "may": 1,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 103,
                                                "kh": 38
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 1,
                                                "kh": 383
                                    },
                                    "ke_hoach": {
                                                "may": 1,
                                                "kh": 390
                                    },
                                    "tang": {
                                                "may": 45,
                                                "kh": 6
                                    },
                                    "giam": {
                                                "may": 23,
                                                "kh": 12
                                    },
                                    "cuoi": {
                                                "may": 1,
                                                "kh": 377
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 450,
                                                "kh": 98
                                    },
                                    "ke_hoach": {
                                                "may": 450,
                                                "kh": 100
                                    },
                                    "tang": {
                                                "may": 2,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 1,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 451,
                                                "kh": 98
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 1,
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
                                                "kh": 489
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 500
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 6
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 495
                                    }
                        },
                        "kh_duoi_3_thang": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 340
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 350
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 5
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 345
                                    }
                        }
            },
            "VPSM": {
                        "thue_may": {
                                    "dau": {
                                                "may": 53,
                                                "kh": 24
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 3,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 56,
                                                "kh": 25
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 47,
                                                "kh": 2
                                    },
                                    "ke_hoach": {
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
                                                "may": 47,
                                                "kh": 2
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 217,
                                                "kh": 98
                                    },
                                    "ke_hoach": {
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
                                                "may": 217,
                                                "kh": 98
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 363,
                                                "kh": 143
                                    },
                                    "ke_hoach": {
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
                                                "may": 363,
                                                "kh": 143
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                                "kh": 70
                                    },
                                    "ke_hoach": {
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
                                                "kh": 70
                                    }
                        },
                        "kh_duoi_3_thang": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 50
                                    },
                                    "ke_hoach": {
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
                                                "kh": 50
                                    }
                        }
            },
            "ITSS": {
                        "thue_may": {
                                    "dau": {
                                                "may": 1,
                                                "kh": 1
                                    },
                                    "ke_hoach": {
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
                        "mc": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                        "dv_photo": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                    "ke_hoach": {
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
                                                "kh": 2
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 4
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 3
                                    }
                        },
                        "phan_phoi": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                        "kh_duoi_3_thang": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
            "VPVPS": {
                        "thue_may": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                        "mc": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                        "dv_photo": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                    "ke_hoach": {
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
                                    "ke_hoach": {
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
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                        "kh_duoi_3_thang": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
        '08/2026': {
            "THH": {
                        "thue_may": {
                                    "dau": {
                                                "may": 349,
                                                "kh": 103
                                    },
                                    "ke_hoach": {
                                                "may": 5,
                                                "kh": 5
                                    },
                                    "tang": {
                                                "may": 8,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 355,
                                                "kh": 103
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 238,
                                                "kh": 164
                                    },
                                    "ke_hoach": {
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
                                                "may": 238,
                                                "kh": 164
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 1771,
                                                "kh": 624
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
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
                                                "may": 1775,
                                                "kh": 628
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 1148,
                                                "kh": 50
                                    },
                                    "ke_hoach": {
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
                                                "may": 1148,
                                                "kh": 50
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                                "kh": 371
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 6
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 3
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 374
                                    }
                        }
            },
            "Viet": {
                        "thue_may": {
                                    "dau": {
                                                "may": 815,
                                                "kh": 246
                                    },
                                    "ke_hoach": {
                                                "may": 20,
                                                "kh": 10
                                    },
                                    "tang": {
                                                "may": 8,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 7,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 816,
                                                "kh": 246
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                        "dv_photo": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                    "ke_hoach": {
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
                                    "ke_hoach": {
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
                                                "kh": 950
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 40
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 5
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 955
                                    }
                        }
            },
            "XemSon": {
                        "thue_may": {
                                    "dau": {
                                                "may": 794,
                                                "kh": 250
                                    },
                                    "ke_hoach": {
                                                "may": 800,
                                                "kh": 250
                                    },
                                    "tang": {
                                                "may": 9,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 9,
                                                "kh": 5
                                    },
                                    "cuoi": {
                                                "may": 794,
                                                "kh": 245
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 102,
                                                "kh": 38
                                    },
                                    "ke_hoach": {
                                                "may": 110,
                                                "kh": 40
                                    },
                                    "tang": {
                                                "may": 1,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 103,
                                                "kh": 38
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 1340,
                                                "kh": 383
                                    },
                                    "ke_hoach": {
                                                "may": 1,
                                                "kh": 390
                                    },
                                    "tang": {
                                                "may": 45,
                                                "kh": 6
                                    },
                                    "giam": {
                                                "may": 23,
                                                "kh": 12
                                    },
                                    "cuoi": {
                                                "may": 1349,
                                                "kh": 377
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 450,
                                                "kh": 98
                                    },
                                    "ke_hoach": {
                                                "may": 450,
                                                "kh": 100
                                    },
                                    "tang": {
                                                "may": 2,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 1,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 451,
                                                "kh": 98
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 1,
                                                "kh": 0
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 1,
                                                "kh": 0
                                    }
                        },
                        "phan_phoi": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 489
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 500
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 6
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 495
                                    }
                        }
            },
            "VPSM": {
                        "thue_may": {
                                    "dau": {
                                                "may": 53,
                                                "kh": 24
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 3,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 56,
                                                "kh": 25
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 47,
                                                "kh": 2
                                    },
                                    "ke_hoach": {
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
                                                "may": 47,
                                                "kh": 2
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 217,
                                                "kh": 98
                                    },
                                    "ke_hoach": {
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
                                                "may": 217,
                                                "kh": 98
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 363,
                                                "kh": 143
                                    },
                                    "ke_hoach": {
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
                                                "may": 363,
                                                "kh": 143
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                                "kh": 70
                                    },
                                    "ke_hoach": {
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
                                                "kh": 70
                                    }
                        }
            },
            "ITSS": {
                        "thue_may": {
                                    "dau": {
                                                "may": 1,
                                                "kh": 1
                                    },
                                    "ke_hoach": {
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
                        "mc": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                        "dv_photo": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
                                    "ke_hoach": {
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
                                                "kh": 2
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 4
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 1
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 3
                                    }
                        },
                        "phan_phoi": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "ke_hoach": {
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
            "VPVPS": {
                        "thue_may": {
                                    "dau": {
                                                "may": 120,
                                                "kh": 95
                                    },
                                    "ke_hoach": {
                                                "may": 15,
                                                "kh": 12
                                    },
                                    "tang": {
                                                "may": 10,
                                                "kh": 8
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 128,
                                                "kh": 102
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 120,
                                                "kh": 95
                                    },
                                    "ke_hoach": {
                                                "may": 15,
                                                "kh": 12
                                    },
                                    "tang": {
                                                "may": 10,
                                                "kh": 8
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 128,
                                                "kh": 102
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 120,
                                                "kh": 95
                                    },
                                    "ke_hoach": {
                                                "may": 15,
                                                "kh": 12
                                    },
                                    "tang": {
                                                "may": 10,
                                                "kh": 8
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 128,
                                                "kh": 102
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 120,
                                                "kh": 95
                                    },
                                    "ke_hoach": {
                                                "may": 15,
                                                "kh": 12
                                    },
                                    "tang": {
                                                "may": 10,
                                                "kh": 8
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 128,
                                                "kh": 102
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 120,
                                                "kh": 95
                                    },
                                    "ke_hoach": {
                                                "may": 15,
                                                "kh": 12
                                    },
                                    "tang": {
                                                "may": 10,
                                                "kh": 8
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 128,
                                                "kh": 102
                                    }
                        },
                        "phan_phoi": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 95
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 12
                                    },
                                    "tang": {
                                                "may": 0,
                                                "kh": 8
                                    },
                                    "giam": {
                                                "may": 0,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 0,
                                                "kh": 102
                                    }
                        }
            },
            "_CONSOLIDATED": {},
            "all": {
                        "thue_may": {
                                    "dau": {
                                                "may": 2132,
                                                "kh": 719
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 38,
                                                "kh": 11
                                    },
                                    "giam": {
                                                "may": 20,
                                                "kh": 8
                                    },
                                    "cuoi": {
                                                "may": 2150,
                                                "kh": 722
                                    }
                        },
                        "mc": {
                                    "dau": {
                                                "may": 507,
                                                "kh": 299
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 11,
                                                "kh": 8
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 516,
                                                "kh": 306
                                    }
                        },
                        "dv_photo": {
                                    "dau": {
                                                "may": 3448,
                                                "kh": 1200
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 59,
                                                "kh": 18
                                    },
                                    "giam": {
                                                "may": 25,
                                                "kh": 13
                                    },
                                    "cuoi": {
                                                "may": 3469,
                                                "kh": 1205
                                    }
                        },
                        "dv_may_in": {
                                    "dau": {
                                                "may": 2081,
                                                "kh": 386
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 12,
                                                "kh": 8
                                    },
                                    "giam": {
                                                "may": 3,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 2090,
                                                "kh": 393
                                    }
                        },
                        "dv_khac": {
                                    "dau": {
                                                "may": 120,
                                                "kh": 97
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
                                    },
                                    "tang": {
                                                "may": 11,
                                                "kh": 9
                                    },
                                    "giam": {
                                                "may": 2,
                                                "kh": 1
                                    },
                                    "cuoi": {
                                                "may": 129,
                                                "kh": 105
                                    }
                        },
                        "phan_phoi": {
                                    "dau": {
                                                "may": 0,
                                                "kh": 1975
                                    },
                                    "ke_hoach": {
                                                "may": 0,
                                                "kh": 0
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
                                                "kh": 1996
                                    }
                        }
            }
},
        '07/2026': {
            thue_may: { dau: { may: 1960, kh: 602 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 18, kh: 7 }, giam: { may: 5, kh: 3 }, cuoi: { may: 1973, kh: 606 } },
            mc: { dau: { may: 386, kh: 205 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 386, kh: 205 } },
            dv_photo: { dau: { may: 3328, kh: 1107 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 3328, kh: 1107 } },
            dv_may_in: { dau: { may: 1936, kh: 283 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 3, kh: 2 }, giam: { may: 0, kh: 0 }, cuoi: { may: 1939, kh: 285 } },
            dv_khac: { dau: { may: 0, kh: 0 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 0, kh: 0 } },
            phan_phoi: { dau: { may: 0, kh: 2760 }, ke_hoach: { may: 0, kh: 70 }, tang: { may: 0, kh: 45 }, giam: { may: 0, kh: 2 }, cuoi: { may: 0, kh: 2803 } },
            kh_duoi_3_thang: { dau: { may: 0, kh: 1980 }, ke_hoach: { may: 0, kh: 50 }, tang: { may: 0, kh: 35 }, giam: { may: 0, kh: 1 }, cuoi: { may: 0, kh: 2014 } }
        },
        '06/2026': {
            thue_may: { dau: { may: 1945, kh: 598 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 20, kh: 8 }, giam: { may: 5, kh: 4 }, cuoi: { may: 1960, kh: 602 } },
            mc: { dau: { may: 386, kh: 205 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 386, kh: 205 } },
            dv_photo: { dau: { may: 3328, kh: 1107 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 3328, kh: 1107 } },
            dv_may_in: { dau: { may: 1930, kh: 280 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 6, kh: 3 }, giam: { may: 0, kh: 0 }, cuoi: { may: 1936, kh: 283 } },
            dv_khac: { dau: { may: 0, kh: 0 }, ke_hoach: { may: 0, kh: 0 }, tang: { may: 0, kh: 0 }, giam: { may: 0, kh: 0 }, cuoi: { may: 0, kh: 0 } },
            phan_phoi: { dau: { may: 0, kh: 2720 }, ke_hoach: { may: 0, kh: 70 }, tang: { may: 0, kh: 42 }, giam: { may: 0, kh: 2 }, cuoi: { may: 0, kh: 2760 } },
            kh_duoi_3_thang: { dau: { may: 0, kh: 1950 }, ke_hoach: { may: 0, kh: 50 }, tang: { may: 0, kh: 32 }, giam: { may: 0, kh: 1 }, cuoi: { may: 0, kh: 1981 } }
        }
    },

    init() {
        // Handle global filter changes
        document.addEventListener('vps_filter_changed', (e) => {
            this.currentPeriod = e.detail.period;
            this.currentCompany = e.detail.company;
            this.loadData(this.currentPeriod, this.currentCompany);
        });

        // Initialize Month Dropdown in table header
        const monthFilter = document.getElementById('customers-month-filter');
        if (monthFilter) {
            const months = ['09/2026', '08/2026', '07/2026', '06/2026'];
            monthFilter.innerHTML = '';
            months.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m;
                opt.textContent = 'THÁNG ' + m.split('/')[0] + ' / ' + m.split('/')[1];
                if (m === this.selectedMonth) opt.selected = true;
                monthFilter.appendChild(opt);
            });

            monthFilter.addEventListener('change', (e) => {
                this.selectedMonth = e.target.value;
                this.loadData(this.currentPeriod, this.currentCompany);
            });
        }

        // Initialize Dealer Recency Modal listeners
        this.initDealerModalListeners();

        // Initial load
        this.loadData(this.currentPeriod, this.currentCompany);
    },

    async loadData(period, company) {
        const data = await window.DataService.getCustomersData(period, company);
        this.updateUI(data, company);
    },

    updateUI(data, company) {
        if (!data || !data.matrix) return;

        // Map UI company dropdown string to matrix keys
        let matrixKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) matrixKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) matrixKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem') || company.includes('XESCO')) matrixKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M') || company.includes('Trung')) matrixKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) matrixKey = 'ITSS';
        else if (company === 'Văn phòng VPS' || company.includes('VPVPS') || company.includes('Văn phòng')) matrixKey = 'VPVPS';
        else if (company !== 'all') matrixKey = 'all';

        let cData = null;
        if (this.monthlyData && this.monthlyData[this.selectedMonth]) {
            const mData = this.monthlyData[this.selectedMonth];
            if (mData[matrixKey]) {
                cData = mData[matrixKey];
            } else if (matrixKey === 'all') {
                cData = mData.all || mData;
            } else {
                cData = mData[matrixKey] || (data.matrix && data.matrix[matrixKey]) || mData.all || mData;
            }
        }
        if (!cData && data && data.matrix) {
            cData = data.matrix[matrixKey] || data.matrix['all'];
        }

        // Helper to safely get a category's values
        const getCat = (catId) => {
            let r = (cData && cData[catId]) ? cData[catId] : null;
            if (!r && catId === 'kh_duoi_3_thang') {
                const pp = (cData && cData['phan_phoi']) ? cData['phan_phoi'] : {};
                const ppDau = pp.dau?.kh || 2060;
                const ppKeHoach = pp.ke_hoach?.kh || 70;
                const ppTang = pp.tang?.kh || 31;
                const ppGiam = pp.giam?.kh || 2;
                
                const dKh = Math.round(ppDau * 0.72087);
                const khKh = Math.round(ppKeHoach * 0.714);
                const tKh = Math.max(0, Math.round(ppTang * 0.903));
                const gKh = Math.min(ppGiam, 1);
                const cKh = dKh + tKh - gKh;
                r = {
                    dau: { may: 0, kh: dKh },
                    ke_hoach: { may: 0, kh: khKh },
                    tang: { may: 0, kh: tKh },
                    giam: { may: 0, kh: gKh },
                    cuoi: { may: 0, kh: cKh }
                };
            }
            r = r || {};
            return {
                dau: { may: r.dau?.may || 0, kh: r.dau?.kh || 0 },
                ke_hoach: { may: r.ke_hoach?.may || 0, kh: r.ke_hoach?.kh || (catId === 'phan_phoi' ? 70 : 0) },
                tang: { may: r.tang?.may || 0, kh: r.tang?.kh || 0 },
                giam: { may: r.giam?.may || 0, kh: r.giam?.kh || 0 },
                cuoi: { may: r.cuoi?.may || 0, kh: r.cuoi?.kh || 0 }
            };
        };

        // Service & Business rows
        const serviceRowDefs = [
            { id: 'thue_may', name: 'Thuê máy', isChild: true },
            { id: 'mc', name: 'MC', isChild: true },
            { id: 'dv_photo', name: 'Dịch vụ - Photo' },
            { id: 'dv_may_in', name: 'Dịch vụ - Máy in' },
            { id: 'dv_khac', name: 'Dịch vụ khác' },
            { id: 'phan_phoi', name: 'Phân phối (Đại lý)', isPhanPhoi: true }
        ];

        // 1. Calculate Summary for Thuê máy + MC
        const tm = getCat('thue_may');
        const mc = getCat('mc');
        const tm_mc = {
            dau: { may: tm.dau.may + mc.dau.may, kh: tm.dau.kh + mc.dau.kh },
            ke_hoach: { may: tm.ke_hoach.may + mc.ke_hoach.may, kh: tm.ke_hoach.kh + mc.ke_hoach.kh },
            tang: { may: tm.tang.may + mc.tang.may, kh: tm.tang.kh + mc.tang.kh },
            giam: { may: tm.giam.may + mc.giam.may, kh: tm.giam.kh + mc.giam.kh },
            cuoi: { may: tm.cuoi.may + mc.cuoi.may, kh: tm.cuoi.kh + mc.cuoi.kh }
        };

        // 2. Sums for Service group (Total summary)
        let serviceSums = {
            dau: { may: 0, kh: 0 },
            ke_hoach: { may: 0, kh: 0 },
            tang: { may: 0, kh: 0 },
            giam: { may: 0, kh: 0 },
            cuoi: { may: 0, kh: 0 }
        };

        serviceRowDefs.forEach(r => {
            const dataRow = getCat(r.id);
            if (!r.isPhanPhoi) {
                serviceSums.dau.may += dataRow.dau.may;
                serviceSums.ke_hoach.may += dataRow.ke_hoach.may;
                serviceSums.tang.may += dataRow.tang.may;
                serviceSums.giam.may += dataRow.giam.may;
                serviceSums.cuoi.may += dataRow.cuoi.may;
            }
            serviceSums.dau.kh += dataRow.dau.kh;
            serviceSums.ke_hoach.kh += dataRow.ke_hoach.kh;
            serviceSums.tang.kh += dataRow.tang.kh;
            serviceSums.giam.kh += dataRow.giam.kh;
            serviceSums.cuoi.kh += dataRow.cuoi.kh;
        });

        // UPDATE 5 EXECUTIVE KPI CARDS
        const totalKhEl = document.getElementById('cust-kpi-total-kh');
        if (totalKhEl) totalKhEl.textContent = serviceSums.dau.kh.toLocaleString();
        const totalMayEl = document.getElementById('cust-kpi-total-may');
        if (totalMayEl) totalMayEl.textContent = serviceSums.dau.may.toLocaleString();

        const newKhEl = document.getElementById('cust-kpi-new-kh');
        if (newKhEl) newKhEl.textContent = serviceSums.tang.kh.toLocaleString();
        const newMayEl = document.getElementById('cust-kpi-new-may');
        if (newMayEl) newMayEl.textContent = '+' + serviceSums.tang.may.toLocaleString();

        // LOST CUSTOMERS - DISPLAYED PROMINENTLY IN RED
        const lostKhEl = document.getElementById('cust-kpi-lost-kh');
        if (lostKhEl) lostKhEl.textContent = serviceSums.giam.kh.toLocaleString();
        const lostMayEl = document.getElementById('cust-kpi-lost-may');
        if (lostMayEl) lostMayEl.textContent = serviceSums.giam.may.toLocaleString();

        // RATIO PHÁT SINH / KHÁCH MẤT
        const ratioEl = document.getElementById('cust-kpi-ratio');
        if (ratioEl) {
            if (serviceSums.giam.kh > 0) {
                ratioEl.textContent = (serviceSums.tang.kh / serviceSums.giam.kh).toFixed(1);
            } else {
                ratioEl.textContent = serviceSums.tang.kh.toString();
            }
        }
        const netGrowthEl = document.getElementById('cust-kpi-net-growth');
        if (netGrowthEl) {
            const netKh = serviceSums.tang.kh - serviceSums.giam.kh;
            netGrowthEl.textContent = (netKh >= 0 ? '+' : '') + netKh.toLocaleString();
        }

        // ACTIVE CUSTOMERS (CURRENT / END OF PERIOD)
        const activeKhEl = document.getElementById('cust-kpi-active-kh');
        if (activeKhEl) activeKhEl.textContent = serviceSums.cuoi.kh.toLocaleString();
        const activeMayEl = document.getElementById('cust-kpi-active-may');
        if (activeMayEl) activeMayEl.textContent = serviceSums.cuoi.may.toLocaleString();

        // Overview / Subtext updates
        const ovVal = document.getElementById('ov-cust-total');
        if (ovVal) ovVal.textContent = serviceSums.cuoi.kh.toLocaleString();

        const newSub = document.getElementById('cust-total-new-sub');
        if (newSub) newSub.textContent = '+' + serviceSums.tang.kh.toLocaleString();
        const lostSub = document.getElementById('cust-total-lost-sub');
        if (lostSub) lostSub.textContent = '-' + serviceSums.giam.kh.toLocaleString();

        // BUILD DETAILED TABLE HTML
        let tbodyHTML = '';

        // Section I Header
        tbodyHTML += `
            <tr class="section-title-row">
                <td colspan="11" style="text-align: left;">
                    <i data-lucide="layers" style="width: 16px; height: 16px; display: inline-block; vertical-align: -2px; margin-right: 6px; color: #0284c7;"></i>
                    I. CƠ CẤU THEO MẢNG DỊCH VỤ &amp; KINH DOANH
                </td>
            </tr>
        `;

        // Row: Thuê máy, MC - Photo summary
        const tmMcGiamMayHtml = tm_mc.giam.may > 0 ? `<span class="cust-lost-highlight">${tm_mc.giam.may}</span>` : '0';
        const tmMcGiamKhHtml = tm_mc.giam.kh > 0 ? `<span class="cust-lost-badge">${tm_mc.giam.kh}</span>` : '0';

        tbodyHTML += `
            <tr class="parent-row" style="font-weight: 800; background: #ffffff;">
                <td style="text-align: left; padding-left: 14px; font-weight: 800;">Thuê máy, MC - Photo</td>
                <td style="font-weight: 800;">${tm_mc.dau.may.toLocaleString()}</td>
                <td style="font-weight: 800;">${tm_mc.dau.kh.toLocaleString()}</td>
                <td style="color: #0284c7; font-weight: 800;">${tm_mc.ke_hoach.may}</td>
                <td style="color: #0284c7; font-weight: 800;">${tm_mc.ke_hoach.kh}</td>
                <td style="font-weight: 800;">${tm_mc.tang.may}</td>
                <td style="font-weight: 800;">${tm_mc.tang.kh}</td>
                <td>${tmMcGiamMayHtml}</td>
                <td>${tmMcGiamKhHtml}</td>
                <td style="font-weight: 800;">${tm_mc.cuoi.may.toLocaleString()}</td>
                <td style="font-weight: 800;">${tm_mc.cuoi.kh.toLocaleString()}</td>
            </tr>
        `;

        // Sub-rows: Thuê máy & MC
        const tmData = getCat('thue_may');
        const tmGiamMayHtml = tmData.giam.may > 0 ? `<span class="cust-lost-highlight">${tmData.giam.may}</span>` : '0';
        const tmGiamKhHtml = tmData.giam.kh > 0 ? `<span class="cust-lost-badge">${tmData.giam.kh}</span>` : '0';
        tbodyHTML += `
            <tr class="child-row">
                <td style="text-align: left; padding-left: 32px;"><i>Thuê máy</i></td>
                <td>${tmData.dau.may.toLocaleString()}</td>
                <td>${tmData.dau.kh.toLocaleString()}</td>
                <td style="color: #0284c7; font-weight: 700;">${tmData.ke_hoach.may}</td>
                <td style="color: #0284c7; font-weight: 700;">${tmData.ke_hoach.kh}</td>
                <td>${tmData.tang.may}</td>
                <td>${tmData.tang.kh}</td>
                <td>${tmGiamMayHtml}</td>
                <td>${tmGiamKhHtml}</td>
                <td>${tmData.cuoi.may.toLocaleString()}</td>
                <td>${tmData.cuoi.kh.toLocaleString()}</td>
            </tr>
        `;

        const mcData = getCat('mc');
        const mcGiamMayHtml = mcData.giam.may > 0 ? `<span class="cust-lost-highlight">${mcData.giam.may}</span>` : '0';
        const mcGiamKhHtml = mcData.giam.kh > 0 ? `<span class="cust-lost-badge">${mcData.giam.kh}</span>` : '0';
        tbodyHTML += `
            <tr class="child-row">
                <td style="text-align: left; padding-left: 32px;"><i>MC</i></td>
                <td>${mcData.dau.may.toLocaleString()}</td>
                <td>${mcData.dau.kh.toLocaleString()}</td>
                <td style="color: #0284c7; font-weight: 700;">${mcData.ke_hoach.may}</td>
                <td style="color: #0284c7; font-weight: 700;">${mcData.ke_hoach.kh}</td>
                <td>${mcData.tang.may}</td>
                <td>${mcData.tang.kh}</td>
                <td>${mcGiamMayHtml}</td>
                <td>${mcGiamKhHtml}</td>
                <td>${mcData.cuoi.may.toLocaleString()}</td>
                <td>${mcData.cuoi.kh.toLocaleString()}</td>
            </tr>
        `;

        // Other service rows: Dịch vụ - Photo, Dịch vụ - Máy in, Dịch vụ khác, Phân phối (Đại lý)
        const otherRows = [
            { id: 'dv_photo', name: 'Dịch vụ - Photo' },
            { id: 'dv_may_in', name: 'Dịch vụ - Máy in' },
            { id: 'dv_khac', name: 'Dịch vụ khác' },
            { id: 'phan_phoi', name: 'Phân phối (Đại lý)', isPhanPhoi: true }
        ];

        otherRows.forEach(r => {
            const rowData = getCat(r.id);
            const mayDau = r.isPhanPhoi ? '-' : rowData.dau.may.toLocaleString();
            const mayKeHoach = r.isPhanPhoi ? '-' : rowData.ke_hoach.may;
            const mayTang = r.isPhanPhoi ? '-' : rowData.tang.may;
            const mayGiam = r.isPhanPhoi ? '-' : (rowData.giam.may > 0 ? `<span class="cust-lost-highlight">${rowData.giam.may}</span>` : '0');
            const mayCuoi = r.isPhanPhoi ? '-' : rowData.cuoi.may.toLocaleString();

            const khGiam = rowData.giam.kh > 0 ? `<span class="cust-lost-badge">${rowData.giam.kh}</span>` : '0';

            tbodyHTML += `
                <tr>
                    <td style="text-align: left; padding-left: 14px;">${r.name}</td>
                    <td>${mayDau}</td>
                    <td>${rowData.dau.kh.toLocaleString()}</td>
                    <td style="color: #0284c7; font-weight: 700;">${mayKeHoach}</td>
                    <td style="color: #0284c7; font-weight: 700;">${rowData.ke_hoach.kh}</td>
                    <td>${mayTang}</td>
                    <td>${rowData.tang.kh}</td>
                    <td>${mayGiam}</td>
                    <td>${khGiam}</td>
                    <td>${mayCuoi}</td>
                    <td>${rowData.cuoi.kh.toLocaleString()}</td>
                </tr>
            `;

            // If this is Phân phối (Đại lý), insert sub-row: "KH đại lý PSDS <3 tháng"
            if (r.id === 'phan_phoi') {
                const recData = getCat('kh_duoi_3_thang');
                const recGiamKhHtml = recData.giam.kh > 0 ? `<span class="cust-lost-badge">${recData.giam.kh}</span>` : '0';

                tbodyHTML += `
                    <tr class="child-row cust-dealer-recency-row" onclick="window.CustomersModule.openDealerModal()" style="cursor: pointer; background: #fafbfc;" title="Bấm để lọc danh sách khách hàng đại lý phát sinh doanh số trong 3 tháng">
                        <td style="text-align: left; padding-left: 32px;">
                            <div style="display: flex; align-items: center; justify-content: space-between; gap: 8px;">
                                <span style="display: inline-flex; align-items: center; gap: 6px;">
                                    <i style="color: #0369a1; font-weight: 700; font-style: italic;">KH đại lý PSDS &lt;3 tháng</i>
                                    <span class="badge" style="background: #e0f2fe; color: #0284c7; font-size: 0.72rem; padding: 1px 6px; border-radius: 4px; font-weight: 700;">Hoạt động</span>
                                </span>
                                <button type="button" class="btn-filter-dealers" onclick="event.stopPropagation(); window.CustomersModule.openDealerModal()" style="background: #0284c7; color: #ffffff; border: none; border-radius: 6px; padding: 3px 9px; font-size: 0.75rem; font-weight: 700; cursor: pointer; display: inline-flex; align-items: center; gap: 4px;">
                                    <i data-lucide="filter" style="width: 12px; height: 12px;"></i> Lọc DS
                                </button>
                            </div>
                        </td>
                        <td>-</td>
                        <td style="color: #0369a1; font-weight: 700;">${recData.dau.kh.toLocaleString()}</td>
                        <td style="color: #0284c7; font-weight: 700;">-</td>
                        <td style="color: #0284c7; font-weight: 700;">${recData.ke_hoach.kh}</td>
                        <td>-</td>
                        <td style="font-weight: 700;">${recData.tang.kh}</td>
                        <td>-</td>
                        <td>${recGiamKhHtml}</td>
                        <td>-</td>
                        <td style="color: #0369a1; font-weight: 800;">${recData.cuoi.kh.toLocaleString()}</td>
                    </tr>
                `;
            }
        });

        // Summary Total Row: Cộng mảng dịch vụ & phân phối
        const totalGiamMayHtml = serviceSums.giam.may > 0 ? `<span class="cust-lost-highlight" style="font-size: 0.95rem;">${serviceSums.giam.may}</span>` : '0';
        const totalGiamKhHtml = serviceSums.giam.kh > 0 ? `<span class="cust-lost-total-badge">${serviceSums.giam.kh}</span>` : '0';

        tbodyHTML += `
            <tr class="total-row">
                <td style="text-align: left; padding-left: 14px;">Cộng mảng dịch vụ &amp; phân phối</td>
                <td>${serviceSums.dau.may.toLocaleString()}</td>
                <td>${serviceSums.dau.kh.toLocaleString()}</td>
                <td style="color: #0284c7;">${serviceSums.ke_hoach.may}</td>
                <td style="color: #0284c7;">${serviceSums.ke_hoach.kh}</td>
                <td>${serviceSums.tang.may}</td>
                <td>${serviceSums.tang.kh}</td>
                <td>${totalGiamMayHtml}</td>
                <td>${totalGiamKhHtml}</td>
                <td>${serviceSums.cuoi.may.toLocaleString()}</td>
                <td>${serviceSums.cuoi.kh.toLocaleString()}</td>
            </tr>
        `;

        const tbody = document.querySelector('#customersTable tbody');
        if (tbody) tbody.innerHTML = tbodyHTML;

        // Re-initialize Lucide Icons
        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }

        // RENDER CHARTS
        // 1. Chart: Cơ Cấu Khách Hàng Hiện Có Theo Mảng Dịch Vụ (Doughnut)
        const chartLabels = ['Thuê máy', 'MC', 'Dịch vụ - Photo', 'Dịch vụ - Máy in', 'Phân phối (Đại lý)'];
        const chartValues = [
            getCat('thue_may').cuoi.kh,
            getCat('mc').cuoi.kh,
            getCat('dv_photo').cuoi.kh,
            getCat('dv_may_in').cuoi.kh,
            getCat('phan_phoi').cuoi.kh
        ];

        const ctx = document.getElementById('customersChart');
        if (ctx && window.ChartManager) {
            window.ChartManager.createChart('customersChart', 'doughnut', {
                labels: chartLabels,
                datasets: [{
                    data: chartValues,
                    backgroundColor: ['#0284c7', '#6366f1', '#f59e0b', '#ec4899', '#10b981'],
                    borderWidth: 2,
                    borderColor: '#ffffff'
                }]
            }, {
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            font: { size: 12, weight: '700' }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) { label += ': '; }
                                if (context.raw !== null) {
                                    const total = chartValues.reduce((a, b) => a + b, 0) || 1;
                                    const pct = ((context.raw / total) * 100).toFixed(1);
                                    label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' KH (' + pct + '%)';
                                }
                                return label;
                            }
                        }
                    }
                },
                cutout: '62%'
            });
        }

        // 2. Chart: Biến Động Khách Hàng: Tăng Mới vs Khách Mất Theo Từng Mảng (Bar chart)
        const growthLabels = ['Thuê máy', 'MC', 'DV Photo', 'DV Máy in', 'Phân phối'];
        const growthNew = [
            getCat('thue_may').tang.kh,
            getCat('mc').tang.kh,
            getCat('dv_photo').tang.kh,
            getCat('dv_may_in').tang.kh,
            getCat('phan_phoi').tang.kh
        ];
        const growthLost = [
            getCat('thue_may').giam.kh,
            getCat('mc').giam.kh,
            getCat('dv_photo').giam.kh,
            getCat('dv_may_in').giam.kh,
            getCat('phan_phoi').giam.kh
        ];

        const growthCtx = document.getElementById('customersGrowthChart');
        if (growthCtx && window.ChartManager) {
            window.ChartManager.createChart('customersGrowthChart', 'bar', {
                labels: growthLabels,
                datasets: [
                    {
                        label: 'Khách hàng mới (+)',
                        data: growthNew,
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                        borderSkipped: false
                    },
                    {
                        label: 'Khách hàng mất (-)',
                        data: growthLost,
                        backgroundColor: '#ef4444',
                        borderRadius: 6,
                        borderSkipped: false
                    }
                ]
            }, {
                maintainAspectRatio: false,
                scales: {
                    x: {
                        grid: { display: false },
                        ticks: { font: { weight: '700' } }
                    },
                    y: {
                        beginAtZero: true,
                        ticks: { precision: 0 }
                    }
                },
                plugins: {
                    legend: {
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            font: { size: 12, weight: '700' }
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return context.dataset.label + ': ' + context.raw + ' KH';
                            }
                        }
                    }
                }
            });
        }
    },

    // =========================================================================
    // DEALER CUSTOMERS DATASET (< 3 THÁNG PHÁT SINH DOANH SỐ)
    // =========================================================================
    filteredDealers: [],
    dealerCustomers: [
        // THH - Miền Bắc (Hà Nội, Hải Phòng, Quảng Ninh, Bắc Ninh, Thái Nguyên, Nam Định...)
        { id: 1, code: 'DL-THH01', name: 'Công ty TNHH TBVP Toàn Cầu', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Hà Nội', contact: 'Anh Dũng - 0912.345.678', itemCategory: 'Máy Photocopy', lastOrderDate: '28/08/2026', daysAgo: 3, revenue3M: 420000000, ordersCount: 8, status: 'Tích cực' },
        { id: 2, code: 'DL-THH02', name: 'Công ty CP Công Nghệ Siêu Việt', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Hà Nội', contact: 'Chị Mai - 0904.567.890', itemCategory: 'Máy in & Mực in', lastOrderDate: '25/08/2026', daysAgo: 6, revenue3M: 185000000, ordersCount: 12, status: 'Tích cực' },
        { id: 3, code: 'DL-THH03', name: 'Đại Lý Thiết Bị Hồng Phúc', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Hải Phòng', contact: 'Anh Tuấn - 0936.123.456', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '22/08/2026', daysAgo: 9, revenue3M: 95000000, ordersCount: 5, status: 'Tích cực' },
        { id: 4, code: 'DL-THH04', name: 'Công ty CP TM & DV Quảng Ninh Số', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Quảng Ninh', contact: 'Anh Hải - 0989.234.567', itemCategory: 'Máy Photocopy', lastOrderDate: '15/08/2026', daysAgo: 16, revenue3M: 310000000, ordersCount: 4, status: 'Tích cực' },
        { id: 5, code: 'DL-THH05', name: 'Trung Tâm Máy VP Bắc Ninh Pro', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Bắc Ninh', contact: 'Chị Lan - 0978.889.900', itemCategory: 'Máy in & Mực in', lastOrderDate: '10/08/2026', daysAgo: 21, revenue3M: 145000000, ordersCount: 7, status: 'Tích cực' },
        { id: 6, code: 'DL-THH06', name: 'Đại Lý TB Tin Học Thái Nguyên', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Thái Nguyên', contact: 'Anh Cường - 0913.456.789', itemCategory: 'Option & Phụ tùng', lastOrderDate: '02/08/2026', daysAgo: 29, revenue3M: 68000000, ordersCount: 3, status: 'Tích cực' },
        { id: 7, code: 'DL-THH07', name: 'Công ty TNHH Công Nghệ Nam Định', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Nam Định', contact: 'Anh Huy - 0945.678.901', itemCategory: 'Máy Photocopy', lastOrderDate: '24/07/2026', daysAgo: 38, revenue3M: 260000000, ordersCount: 3, status: 'Bình thường' },
        { id: 8, code: 'DL-THH08', name: 'Đại Lý TBVP Thành Đông', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Hải Dương', contact: 'Anh Nam - 0903.222.111', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '18/07/2026', daysAgo: 44, revenue3M: 82000000, ordersCount: 4, status: 'Bình thường' },
        { id: 9, code: 'DL-THH09', name: 'Công ty CP TM Phú Thọ Tech', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Phú Thọ', contact: 'Anh Hoàng - 0966.555.444', itemCategory: 'Máy in & Mực in', lastOrderDate: '06/07/2026', daysAgo: 56, revenue3M: 110000000, ordersCount: 2, status: 'Bình thường' },
        { id: 10, code: 'DL-THH10', name: 'Đại Lý Máy In Hưng Yên New', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Hưng Yên', contact: 'Chị Thảo - 0972.111.333', itemCategory: 'Máy Photocopy', lastOrderDate: '26/06/2026', daysAgo: 66, revenue3M: 195000000, ordersCount: 2, status: 'Cận hạn' },
        { id: 11, code: 'DL-THH11', name: 'Công ty TNHH TBVP Vĩnh Phúc', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Vĩnh Phúc', contact: 'Anh Sơn - 0983.444.777', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '15/06/2026', daysAgo: 77, revenue3M: 54000000, ordersCount: 2, status: 'Cận hạn' },
        { id: 12, code: 'DL-THH12', name: 'Đại Lý Mực In & TB Bắc Giang', company: 'THH', companyName: 'Tân Hồng Hà', province: 'Bắc Giang', contact: 'Anh Kiên - 0915.888.222', itemCategory: 'Option & Phụ tùng', lastOrderDate: '05/06/2026', daysAgo: 87, revenue3M: 46000000, ordersCount: 1, status: 'Cận hạn' },

        // VIET - Miền Nam (TP.HCM, Bình Dương, Đồng Nai, Bà Rịa - Vũng Tàu, Long An, Cần Thơ...)
        { id: 13, code: 'DL-VT01', name: 'Công ty TNHH TM&DV Tin Học Nam Á', company: 'Viet', companyName: 'Việt', province: 'TP. Hồ Chí Minh', contact: 'Anh Đức - 0909.123.456', itemCategory: 'Máy Photocopy', lastOrderDate: '29/08/2026', daysAgo: 2, revenue3M: 680000000, ordersCount: 15, status: 'Tích cực' },
        { id: 14, code: 'DL-VT02', name: 'Đại Lý Máy Văn Phòng An Phát Sài Gòn', company: 'Viet', companyName: 'Việt', province: 'TP. Hồ Chí Minh', contact: 'Chị Hương - 0908.234.567', itemCategory: 'Máy in & Mực in', lastOrderDate: '26/08/2026', daysAgo: 5, revenue3M: 340000000, ordersCount: 14, status: 'Tích cực' },
        { id: 15, code: 'DL-VT03', name: 'Công ty CP Đầu Tư Công Nghệ Bình Dương', company: 'Viet', companyName: 'Việt', province: 'Bình Dương', contact: 'Anh Bình - 0918.345.678', itemCategory: 'Máy Photocopy', lastOrderDate: '21/08/2026', daysAgo: 10, revenue3M: 520000000, ordersCount: 9, status: 'Tích cực' },
        { id: 16, code: 'DL-VT04', name: 'Đại Lý Thiết Bị Đồng Nai Tech', company: 'Viet', companyName: 'Việt', province: 'Đồng Nai', contact: 'Anh Tài - 0903.456.789', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '16/08/2026', daysAgo: 15, revenue3M: 175000000, ordersCount: 8, status: 'Tích cực' },
        { id: 17, code: 'DL-VT05', name: 'Công ty TNHH TBVP Vũng Tàu Số', company: 'Viet', companyName: 'Việt', province: 'Bà Rịa - Vũng Tàu', contact: 'Chị Nga - 0937.567.890', itemCategory: 'Máy in & Mực in', lastOrderDate: '12/08/2026', daysAgo: 19, revenue3M: 215000000, ordersCount: 6, status: 'Tích cực' },
        { id: 18, code: 'DL-VT06', name: 'Đại Lý Tin Học Long An Star', company: 'Viet', companyName: 'Việt', province: 'Long An', contact: 'Anh Nghĩa - 0949.678.901', itemCategory: 'Option & Phụ tùng', lastOrderDate: '04/08/2026', daysAgo: 27, revenue3M: 92000000, ordersCount: 4, status: 'Tích cực' },
        { id: 19, code: 'DL-VT07', name: 'Công ty CP TM Cần Thơ Office', company: 'Viet', companyName: 'Việt', province: 'Cần Thơ', contact: 'Anh Long - 0919.789.012', itemCategory: 'Máy Photocopy', lastOrderDate: '27/07/2026', daysAgo: 35, revenue3M: 380000000, ordersCount: 5, status: 'Bình thường' },
        { id: 20, code: 'DL-VT08', name: 'Đại Lý Máy In Tiền Giang Khang', company: 'Viet', companyName: 'Việt', province: 'Tiền Giang', contact: 'Chị Cúc - 0907.890.123', itemCategory: 'Máy in & Mực in', lastOrderDate: '19/07/2026', daysAgo: 43, revenue3M: 130000000, ordersCount: 4, status: 'Bình thường' },
        { id: 21, code: 'DL-VT09', name: 'Trung Tâm TBVP Tây Đô Tech', company: 'Viet', companyName: 'Việt', province: 'Cần Thơ', contact: 'Anh Phong - 0938.901.234', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '09/07/2026', daysAgo: 53, revenue3M: 88000000, ordersCount: 3, status: 'Bình thường' },
        { id: 22, code: 'DL-VT10', name: 'Đại Lý Tin Học An Giang Plus', company: 'Viet', companyName: 'Việt', province: 'An Giang', contact: 'Anh Kha - 0917.012.345', itemCategory: 'Máy Photocopy', lastOrderDate: '28/06/2026', daysAgo: 64, revenue3M: 225000000, ordersCount: 2, status: 'Cận hạn' },
        { id: 23, code: 'DL-VT11', name: 'Công ty TNHH TBVP Kiên Giang Pro', company: 'Viet', companyName: 'Việt', province: 'Kiên Giang', contact: 'Chị My - 0984.123.789', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '14/06/2026', daysAgo: 78, revenue3M: 64000000, ordersCount: 2, status: 'Cận hạn' },
        { id: 24, code: 'DL-VT12', name: 'Đại Lý TBVP Bến Tre Tech', company: 'Viet', companyName: 'Việt', province: 'Bến Tre', contact: 'Anh Khôi - 0902.333.444', itemCategory: 'Option & Phụ tùng', lastOrderDate: '07/06/2026', daysAgo: 85, revenue3M: 48000000, ordersCount: 1, status: 'Cận hạn' },

        // XEM SƠN (XESCO) - Miền Nam & Tây Nguyên
        { id: 25, code: 'DL-XS01', name: 'Công ty CP Tân Nam Xesco', company: 'XemSon', companyName: 'Xem Sơn', province: 'TP. Hồ Chí Minh', contact: 'Anh Trọng - 0903.777.888', itemCategory: 'Máy Photocopy', lastOrderDate: '27/08/2026', daysAgo: 4, revenue3M: 580000000, ordersCount: 11, status: 'Tích cực' },
        { id: 26, code: 'DL-XS02', name: 'Đại Lý Máy Văn Phòng Nam Bộ', company: 'XemSon', companyName: 'Xem Sơn', province: 'TP. Hồ Chí Minh', contact: 'Chị Loan - 0914.888.999', itemCategory: 'Máy in & Mực in', lastOrderDate: '23/08/2026', daysAgo: 8, revenue3M: 290000000, ordersCount: 9, status: 'Tích cực' },
        { id: 27, code: 'DL-XS03', name: 'Công ty TNHH TB VP Đồng Nai Star', company: 'XemSon', companyName: 'Xem Sơn', province: 'Đồng Nai', contact: 'Anh Thành - 0933.999.000', itemCategory: 'Máy Photocopy', lastOrderDate: '18/08/2026', daysAgo: 13, revenue3M: 410000000, ordersCount: 6, status: 'Tích cực' },
        { id: 28, code: 'DL-XS04', name: 'Đại Lý Tin Học Bình Dương Xesco', company: 'XemSon', companyName: 'Xem Sơn', province: 'Bình Dương', contact: 'Anh Vũ - 0979.111.222', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '11/08/2026', daysAgo: 20, revenue3M: 135000000, ordersCount: 7, status: 'Tích cực' },
        { id: 29, code: 'DL-XS05', name: 'Công ty CP TM Dịch Vụ Tây Ninh', company: 'XemSon', companyName: 'Xem Sơn', province: 'Tây Ninh', contact: 'Chị Yến - 0988.333.555', itemCategory: 'Máy in & Mực in', lastOrderDate: '03/08/2026', daysAgo: 28, revenue3M: 160000000, ordersCount: 4, status: 'Tích cực' },
        { id: 30, code: 'DL-XS06', name: 'Đại Lý Máy In Lâm Đồng Highlands', company: 'XemSon', companyName: 'Xem Sơn', province: 'Lâm Đồng', contact: 'Anh Trung - 0916.444.666', itemCategory: 'Option & Phụ tùng', lastOrderDate: '25/07/2026', daysAgo: 37, revenue3M: 75000000, ordersCount: 3, status: 'Bình thường' },
        { id: 31, code: 'DL-XS07', name: 'Trung Tâm TBVP Bình Phước Số', company: 'XemSon', companyName: 'Xem Sơn', province: 'Bình Phước', contact: 'Anh Mạnh - 0947.555.777', itemCategory: 'Máy Photocopy', lastOrderDate: '17/07/2026', daysAgo: 45, revenue3M: 285000000, ordersCount: 3, status: 'Bình thường' },
        { id: 32, code: 'DL-XS08', name: 'Công ty TNHH TB Khang Thịnh', company: 'XemSon', companyName: 'Xem Sơn', province: 'Bình Thuận', contact: 'Chị Trâm - 0935.666.888', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '08/07/2026', daysAgo: 54, revenue3M: 92000000, ordersCount: 3, status: 'Bình thường' },
        { id: 33, code: 'DL-XS09', name: 'Đại Lý TBVP Nha Trang Bay', company: 'XemSon', companyName: 'Xem Sơn', province: 'Khánh Hòa', contact: 'Anh Đạt - 0905.777.999', itemCategory: 'Máy Photocopy', lastOrderDate: '23/06/2026', daysAgo: 69, revenue3M: 190000000, ordersCount: 2, status: 'Cận hạn' },
        { id: 34, code: 'DL-XS10', name: 'Công ty CP Công Nghệ Đắk Lắk', company: 'XemSon', companyName: 'Xem Sơn', province: 'Đắk Lắk', contact: 'Anh Sơn - 0982.888.000', itemCategory: 'Option & Phụ tùng', lastOrderDate: '10/06/2026', daysAgo: 82, revenue3M: 52000000, ordersCount: 1, status: 'Cận hạn' },

        // VPS MIỀN TRUNG - Đà Nẵng, Huế, Quảng Nam, Quảng Ngãi, Bình Định...
        { id: 35, code: 'DL-MT01', name: 'Đại Lý Thiết Bị VP Sông Hàn', company: 'VPSM', companyName: 'VPS Miền Trung', province: 'Đà Nẵng', contact: 'Anh Hùng - 0905.123.987', itemCategory: 'Máy Photocopy', lastOrderDate: '28/08/2026', daysAgo: 3, revenue3M: 390000000, ordersCount: 7, status: 'Tích cực' },
        { id: 36, code: 'DL-MT02', name: 'Công ty TNHH TM&DV Tin Học Cố Đô', company: 'VPSM', companyName: 'VPS Miền Trung', province: 'Thừa Thiên Huế', contact: 'Chị Diệu - 0914.234.876', itemCategory: 'Máy in & Mực in', lastOrderDate: '22/08/2026', daysAgo: 9, revenue3M: 165000000, ordersCount: 6, status: 'Tích cực' },
        { id: 37, code: 'DL-MT03', name: 'Đại Lý Máy Văn Phòng Quảng Nam', company: 'VPSM', companyName: 'VPS Miền Trung', province: 'Quảng Nam', contact: 'Anh Lâm - 0935.345.765', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '15/08/2026', daysAgo: 16, revenue3M: 78000000, ordersCount: 5, status: 'Tích cực' },
        { id: 38, code: 'DL-MT04', name: 'Công ty CP Công Nghệ Quảng Ngãi', company: 'VPSM', companyName: 'VPS Miền Trung', province: 'Quảng Ngãi', contact: 'Anh Thắng - 0989.456.654', itemCategory: 'Máy Photocopy', lastOrderDate: '05/08/2026', daysAgo: 26, revenue3M: 240000000, ordersCount: 4, status: 'Tích cực' },
        { id: 39, code: 'DL-MT05', name: 'Đại Lý TBVP Quy Nhơn Tech', company: 'VPSM', companyName: 'VPS Miền Trung', province: 'Bình Định', contact: 'Anh Quang - 0978.567.543', itemCategory: 'Máy in & Mực in', lastOrderDate: '26/07/2026', daysAgo: 36, revenue3M: 125000000, ordersCount: 3, status: 'Bình thường' },
        { id: 40, code: 'DL-MT06', name: 'Công ty TNHH TM DV Quảng Trị Số', company: 'VPSM', companyName: 'VPS Miền Trung', province: 'Quảng Trị', contact: 'Chị Châu - 0913.678.432', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '12/07/2026', daysAgo: 50, revenue3M: 62000000, ordersCount: 3, status: 'Bình thường' },
        { id: 41, code: 'DL-MT07', name: 'Đại Lý Tin Học Quảng Bình Star', company: 'VPSM', companyName: 'VPS Miền Trung', province: 'Quảng Bình', contact: 'Anh Lộc - 0945.789.321', itemCategory: 'Option & Phụ tùng', lastOrderDate: '20/06/2026', daysAgo: 72, revenue3M: 42000000, ordersCount: 2, status: 'Cận hạn' },

        // ITSS
        { id: 42, code: 'DL-IT01', name: 'Công ty TNHH Giải Pháp ITSS Hà Nội', company: 'ITSS', companyName: 'ITSS', province: 'Hà Nội', contact: 'Anh Hoàng - 0904.333.666', itemCategory: 'Máy in & Mực in', lastOrderDate: '27/08/2026', daysAgo: 4, revenue3M: 280000000, ordersCount: 8, status: 'Tích cực' },
        { id: 43, code: 'DL-IT02', name: 'Đại Lý Giải Pháp Mạng & TB Sài Gòn', company: 'ITSS', companyName: 'ITSS', province: 'TP. Hồ Chí Minh', contact: 'Chị Vy - 0918.444.777', itemCategory: 'Máy Photocopy', lastOrderDate: '20/08/2026', daysAgo: 11, revenue3M: 350000000, ordersCount: 5, status: 'Tích cực' },
        { id: 44, code: 'DL-IT03', name: 'Công ty CP Dịch Vụ Số ITSS Đà Nẵng', company: 'ITSS', companyName: 'ITSS', province: 'Đà Nẵng', contact: 'Anh Trí - 0932.555.888', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '14/08/2026', daysAgo: 17, revenue3M: 95000000, ordersCount: 4, status: 'Tích cực' },
        { id: 45, code: 'DL-IT04', name: 'Đại Lý TBVP Công Nghệ Cao Cần Thơ', company: 'ITSS', companyName: 'ITSS', province: 'Cần Thơ', contact: 'Anh Bảo - 0971.666.999', itemCategory: 'Option & Phụ tùng', lastOrderDate: '28/07/2026', daysAgo: 34, revenue3M: 58000000, ordersCount: 3, status: 'Bình thường' },
        { id: 46, code: 'DL-IT05', name: 'Công ty TNHH TB Hệ Thống Hải Phòng', company: 'ITSS', companyName: 'ITSS', province: 'Hải Phòng', contact: 'Chị Dung - 0986.777.000', itemCategory: 'Máy in & Mực in', lastOrderDate: '16/06/2026', daysAgo: 76, revenue3M: 84000000, ordersCount: 2, status: 'Cận hạn' },

        // VĂN PHÒNG VPS
        { id: 47, code: 'DL-VP01', name: 'Công ty CP Đầu Tư & Phát Triển VP Hà Nội', company: 'VPVPS', companyName: 'Văn phòng VPS', province: 'Hà Nội', contact: 'Anh Tuấn Anh - 0902.999.111', itemCategory: 'Máy Photocopy', lastOrderDate: '29/08/2026', daysAgo: 2, revenue3M: 450000000, ordersCount: 9, status: 'Tích cực' },
        { id: 48, code: 'DL-VP02', name: 'Đại Lý Phân Phối Trực Tiếp VPS Sài Gòn', company: 'VPVPS', companyName: 'Văn phòng VPS', province: 'TP. Hồ Chí Minh', contact: 'Chị Kim Oanh - 0915.111.333', itemCategory: 'Máy in & Mực in', lastOrderDate: '24/08/2026', daysAgo: 7, revenue3M: 320000000, ordersCount: 11, status: 'Tích cực' },
        { id: 49, code: 'DL-VP03', name: 'Công ty TNHH Cung Ứng TBVP Toàn Quốc', company: 'VPVPS', companyName: 'Văn phòng VPS', province: 'Đà Nẵng', contact: 'Anh Minh - 0938.222.444', itemCategory: 'Linh kiện / Vật tư', lastOrderDate: '17/08/2026', daysAgo: 14, revenue3M: 110000000, ordersCount: 6, status: 'Tích cực' },
        { id: 50, code: 'DL-VP04', name: 'Đại Lý Thiết Bị Trực Thuộc VPVPS', company: 'VPVPS', companyName: 'Văn phòng VPS', province: 'Bình Dương', contact: 'Chị Hạnh - 0977.333.555', itemCategory: 'Option & Phụ tùng', lastOrderDate: '30/07/2026', daysAgo: 32, revenue3M: 72000000, ordersCount: 3, status: 'Bình thường' },
        { id: 51, code: 'DL-VP05', name: 'Trung Tâm Phân Phối Đối Tác Chiến Lược', company: 'VPVPS', companyName: 'Văn phòng VPS', province: 'Hải Phòng', contact: 'Anh Vũ - 0981.444.666', itemCategory: 'Máy Photocopy', lastOrderDate: '18/06/2026', daysAgo: 74, revenue3M: 210000000, ordersCount: 2, status: 'Cận hạn' }
    ],

    openDealerModal(company) {
        const modal = document.getElementById('modal-dealer-recency');
        if (!modal) return;

        // Sync company filter with currently selected company in dashboard or passed parameter
        const compFilter = document.getElementById('dealer-company-filter');
        if (compFilter) {
            let targetComp = company || this.currentCompany || 'all';
            if (targetComp === 'Tân Hồng Hà') targetComp = 'THH';
            else if (targetComp === 'Việt') targetComp = 'Viet';
            else if (targetComp === 'Xem Sơn') targetComp = 'XemSon';
            else if (targetComp === 'VPS M') targetComp = 'VPSM';
            else if (targetComp === 'ITSS') targetComp = 'ITSS';
            else if (targetComp === 'Văn phòng VPS') targetComp = 'VPVPS';
            
            compFilter.value = targetComp;
        }

        this.renderDealerList();
        modal.style.display = 'flex';

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    },

    closeDealerModal() {
        const modal = document.getElementById('modal-dealer-recency');
        if (modal) modal.style.display = 'none';
    },

    resetFilters() {
        const searchInput = document.getElementById('dealer-search-input');
        const compFilter = document.getElementById('dealer-company-filter');
        const catFilter = document.getElementById('dealer-cat-filter');
        const recFilter = document.getElementById('dealer-recency-filter');

        if (searchInput) searchInput.value = '';
        if (compFilter) compFilter.value = 'all';
        if (catFilter) catFilter.value = 'all';
        if (recFilter) recFilter.value = 'all';

        this.renderDealerList();
    },

    renderDealerList() {
        const compVal = document.getElementById('dealer-company-filter')?.value || 'all';
        const catVal = document.getElementById('dealer-cat-filter')?.value || 'all';
        const recVal = document.getElementById('dealer-recency-filter')?.value || 'all';
        const searchVal = (document.getElementById('dealer-search-input')?.value || '').trim().toLowerCase();

        let filtered = (this.dealerCustomers || []).filter(item => {
            // Filter by Company
            if (compVal !== 'all' && item.company !== compVal) return false;

            // Filter by Category
            if (catVal !== 'all' && item.itemCategory !== catVal) return false;

            // Filter by Recency
            if (recVal === 'recent_30' && item.daysAgo > 30) return false;
            if (recVal === 'mid_60' && (item.daysAgo <= 30 || item.daysAgo > 60)) return false;
            if (recVal === 'late_90' && (item.daysAgo <= 60 || item.daysAgo > 90)) return false;

            // Filter by Search Query
            if (searchVal) {
                const matchName = item.name.toLowerCase().includes(searchVal);
                const matchCode = item.code.toLowerCase().includes(searchVal);
                const matchProv = item.province.toLowerCase().includes(searchVal);
                const matchContact = (item.contact || '').toLowerCase().includes(searchVal);
                const matchComp = item.companyName.toLowerCase().includes(searchVal);
                if (!matchName && !matchCode && !matchProv && !matchContact && !matchComp) return false;
            }

            return true;
        });

        this.filteredDealers = filtered;

        // Calculate filtered stats
        const totalCount = filtered.length;
        const totalRevenue = filtered.reduce((sum, d) => sum + (d.revenue3M || 0), 0);
        const newDealers = filtered.filter(d => d.daysAgo <= 30).length;
        const avgRev = totalCount > 0 ? (totalRevenue / totalCount) : 0;

        // Update modal KPI cards
        const kpiCountEl = document.getElementById('dealer-kpi-count');
        if (kpiCountEl) kpiCountEl.textContent = totalCount.toLocaleString();

        const kpiCountSubEl = document.getElementById('dealer-kpi-count-sub');
        if (kpiCountSubEl) {
            const compLabel = compVal === 'all' ? 'Toàn quốc' : (filtered[0]?.companyName || compVal);
            kpiCountSubEl.textContent = `Đại lý phát sinh đơn hàng (${compLabel})`;
        }

        const kpiNewEl = document.getElementById('dealer-kpi-new');
        if (kpiNewEl) kpiNewEl.textContent = '+' + newDealers;

        const kpiRevEl = document.getElementById('dealer-kpi-revenue');
        if (kpiRevEl) {
            if (totalRevenue >= 1e9) {
                kpiRevEl.textContent = (totalRevenue / 1e9).toFixed(2) + ' Tỷ';
            } else {
                kpiRevEl.textContent = (totalRevenue / 1e6).toFixed(1) + ' Tr';
            }
        }

        const kpiAvgEl = document.getElementById('dealer-kpi-avg-rev');
        if (kpiAvgEl) {
            kpiAvgEl.textContent = 'TB: ' + (avgRev / 1e6).toFixed(1) + ' Tr/ĐL';
        }

        const kpiRatioEl = document.getElementById('dealer-kpi-ratio');
        if (kpiRatioEl) {
            // Ratio relative to total dealers in that scope
            const baseTotal = compVal === 'all' ? 2089 : Math.max(totalCount, Math.round(totalCount / 0.72));
            const ratioPct = ((totalCount / baseTotal) * 100).toFixed(1);
            kpiRatioEl.textContent = ratioPct + '%';
        }

        // Render Table Rows
        const tbody = document.getElementById('dealer-table-tbody');
        if (tbody) {
            if (filtered.length === 0) {
                tbody.innerHTML = `
                    <tr>
                        <td colspan="11" style="text-align: center; padding: 36px 20px; color: #64748b;">
                            <i data-lucide="inbox" style="width: 36px; height: 36px; color: #94a3b8; display: block; margin: 0 auto 10px;"></i>
                            <div style="font-weight: 800; font-size: 1rem; color: #334155;">Không tìm thấy khách hàng đại lý nào</div>
                            <div style="font-size: 0.85rem; margin-top: 4px;">Thử đổi từ khóa tìm kiếm hoặc chọn lại bộ lọc đơn vị / mặt hàng</div>
                        </td>
                    </tr>
                `;
            } else {
                let html = '';
                filtered.forEach((d, idx) => {
                    // Badge for company
                    let compBadgeColor = '#2563eb';
                    let compBadgeBg = '#dbeafe';
                    if (d.company === 'Viet') { compBadgeColor = '#059669'; compBadgeBg = '#d1fae5'; }
                    else if (d.company === 'XemSon') { compBadgeColor = '#d97706'; compBadgeBg = '#fef3c7'; }
                    else if (d.company === 'VPSM') { compBadgeColor = '#7c3aed'; compBadgeBg = '#ede9fe'; }
                    else if (d.company === 'ITSS') { compBadgeColor = '#0284c7'; compBadgeBg = '#e0f2fe'; }

                    // Badge for status
                    let statusHtml = '';
                    if (d.daysAgo <= 30) {
                        statusHtml = `<span style="background: #dcfce7; color: #15803d; border: 1px solid #86efac; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 0.75rem; white-space: nowrap;">Tích cực (${d.daysAgo} ngày)</span>`;
                    } else if (d.daysAgo <= 60) {
                        statusHtml = `<span style="background: #e0f2fe; color: #0369a1; border: 1px solid #7dd3fc; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 0.75rem; white-space: nowrap;">Bình thường (${d.daysAgo} ngày)</span>`;
                    } else {
                        statusHtml = `<span style="background: #fef3c7; color: #b45309; border: 1px solid #fde68a; padding: 2px 8px; border-radius: 6px; font-weight: 700; font-size: 0.75rem; white-space: nowrap;">Cận hạn (${d.daysAgo} ngày)</span>`;
                    }

                    // Badge for category
                    let catBadge = `<span style="background: #f1f5f9; color: #334155; padding: 2px 8px; border-radius: 6px; font-weight: 600; font-size: 0.76rem; border: 1px solid #cbd5e1;">${d.itemCategory}</span>`;

                    html += `
                        <tr>
                            <td style="text-align: center; font-weight: 700; color: #64748b;">${idx + 1}</td>
                            <td style="text-align: center; font-weight: 800; color: #0284c7; font-family: monospace;">${d.code}</td>
                            <td style="text-align: left; font-weight: 800; color: #0f172a;">${d.name}</td>
                            <td style="text-align: center;">
                                <span style="background: ${compBadgeBg}; color: ${compBadgeColor}; padding: 2px 8px; border-radius: 6px; font-weight: 800; font-size: 0.76rem;">${d.companyName}</span>
                            </td>
                            <td style="text-align: left; font-weight: 600; color: #334155;">${d.province}</td>
                            <td style="text-align: left; font-size: 0.82rem; color: #475569;">${d.contact}</td>
                            <td style="text-align: left;">${catBadge}</td>
                            <td style="text-align: center; font-weight: 700; color: #0284c7;">${d.lastOrderDate}</td>
                            <td style="text-align: right; font-weight: 900; color: #059669;">${d.revenue3M.toLocaleString()} đ</td>
                            <td style="text-align: center; font-weight: 800; color: #1e293b;">${d.ordersCount}</td>
                            <td style="text-align: center;">${statusHtml}</td>
                        </tr>
                    `;
                });
                tbody.innerHTML = html;
            }
        }

        // Update footer text
        const summaryText = document.getElementById('dealer-summary-text');
        if (summaryText) {
            summaryText.innerHTML = `Hiển thị <strong>${totalCount}</strong> đại lý phát sinh doanh số &lt; 3 tháng | Tổng doanh số lọc: <strong style="color: #059669;">${totalRevenue.toLocaleString()} VNĐ</strong>`;
        }

        if (window.lucide && typeof window.lucide.createIcons === 'function') {
            window.lucide.createIcons();
        }
    },

    exportDealerListCSV() {
        const list = this.filteredDealers || this.dealerCustomers || [];
        if (list.length === 0) {
            alert('Không có dữ liệu đại lý để xuất!');
            return;
        }

        let csv = '\uFEFF'; // UTF-8 BOM for Excel
        csv += 'STT,Mã Đại Lý,Tên Đại Lý,Đơn Vị Quản Lý,Khu Vực Tỉnh Thành,Liên Hệ SĐT,Mặt Hàng Chủ Lực,Ngày Đơn Gần Nhất,Số Ngày Trước,Doanh Số 3 Tháng (VNĐ),Số Đơn Hàng,Trạng Thái\r\n';

        list.forEach((d, idx) => {
            const row = [
                idx + 1,
                `"${d.code}"`,
                `"${d.name.replace(/"/g, '""')}"`,
                `"${d.companyName}"`,
                `"${d.province}"`,
                `"${(d.contact || '').replace(/"/g, '""')}"`,
                `"${d.itemCategory}"`,
                `"${d.lastOrderDate}"`,
                d.daysAgo,
                d.revenue3M,
                d.ordersCount,
                `"${d.status}"`
            ];
            csv += row.join(',') + '\r\n';
        });

        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `Danh_Sach_KH_Dai_Ly_PSDS_Duoi_3_Thang_VPS_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    },

    initDealerModalListeners() {
        const searchInput = document.getElementById('dealer-search-input');
        const compFilter = document.getElementById('dealer-company-filter');
        const catFilter = document.getElementById('dealer-cat-filter');
        const recFilter = document.getElementById('dealer-recency-filter');

        if (searchInput) {
            searchInput.addEventListener('input', () => this.renderDealerList());
        }
        if (compFilter) {
            compFilter.addEventListener('change', () => this.renderDealerList());
        }
        if (catFilter) {
            catFilter.addEventListener('change', () => this.renderDealerList());
        }
        if (recFilter) {
            recFilter.addEventListener('change', () => this.renderDealerList());
        }

        // Close on backdrop click
        const modal = document.getElementById('modal-dealer-recency');
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) this.closeDealerModal();
            });
        }

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeDealerModal();
        });
    }
};
