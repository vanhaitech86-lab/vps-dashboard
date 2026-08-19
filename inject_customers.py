import json

data = {
    'Tân Hồng Hà': {
        'thue_may': {'dau': {'may': 314, 'kh': 98}, 'tang': {'may': 23, 'kh': 3}, 'giam': {'may': 1, 'kh': 0}, 'cuoi': {'may': 336, 'kh': 101}},
        'mc': {'dau': {'may': 248, 'kh': 166}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 10, 'kh': 2}, 'cuoi': {'may': 238, 'kh': 164}},
        'dv_photo': {'dau': {'may': 1760, 'kh': 613}, 'tang': {'may': 4, 'kh': 4}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 1764, 'kh': 617}},
        'dv_may_in': {'dau': {'may': 1148, 'kh': 50}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 1148, 'kh': 50}},
        'dv_khac': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    },
    'Việt': {
        'thue_may': {'dau': {'may': 804, 'kh': 244}, 'tang': {'may': 11, 'kh': 3}, 'giam': {'may': 17, 'kh': 3}, 'cuoi': {'may': 798, 'kh': 244}},
        'mc': {'dau': {'may': 1, 'kh': 1}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 1, 'kh': 1}},
        'dv_photo': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
        'dv_may_in': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
        'dv_khac': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    },
    'Xem Sơn': {
        'thue_may': {'dau': {'may': 766, 'kh': 235}, 'tang': {'may': 11, 'kh': 6}, 'giam': {'may': 2, 'kh': 1}, 'cuoi': {'may': 775, 'kh': 240}},
        'mc': {'dau': {'may': 100, 'kh': 38}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 100, 'kh': 38}},
        'dv_photo': {'dau': {'may': 1340, 'kh': 385}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 1349, 'kh': 384}},
        'dv_may_in': {'dau': {'may': 430, 'kh': 94}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 437, 'kh': 96}},
        'dv_khac': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    },
    'VPS M': {
        'thue_may': {'dau': {'may': 54, 'kh': 24}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 1, 'kh': 0}, 'cuoi': {'may': 53, 'kh': 24}},
        'mc': {'dau': {'may': 47, 'kh': 2}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 47, 'kh': 2}},
        'dv_photo': {'dau': {'may': 217, 'kh': 98}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 217, 'kh': 98}},
        'dv_may_in': {'dau': {'may': 361, 'kh': 141}, 'tang': {'may': 2, 'kh': 2}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 363, 'kh': 143}},
        'dv_khac': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    },
    'all': {
        'thue_may': {'dau': {'may': 1938, 'kh': 601}, 'tang': {'may': 45, 'kh': 12}, 'giam': {'may': 21, 'kh': 4}, 'cuoi': {'may': 1962, 'kh': 609}},
        'mc': {'dau': {'may': 396, 'kh': 207}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 10, 'kh': 2}, 'cuoi': {'may': 386, 'kh': 205}},
        'dv_photo': {'dau': {'may': 3317, 'kh': 1096}, 'tang': {'may': 4, 'kh': 4}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 3330, 'kh': 1099}},
        'dv_may_in': {'dau': {'may': 1939, 'kh': 285}, 'tang': {'may': 2, 'kh': 2}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 1948, 'kh': 289}},
        'dv_khac': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    }
}

import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will replace the "customers: { ... byCompany: { ... } }" block with a new structure
# But to be safe, I'll just replace the byCompany inside customers.
# Wait, I also need to provide the new structure. Let's use pure ASCII keys for companies to avoid encoding issues!
# I already wrote a script earlier. But mockData.customers.byCompany is still using the old structure!
# Let's inject customersMatrix into mockData.customers directly so it doesn't break old references if any exist.

new_matrix_js = "matrix: " + json.dumps(data, ensure_ascii=True, indent=4)

# Replace trend: { ... } with trend: { ... }, matrix: { ... }
js = re.sub(r'(trend:\s*\{[^}]+\},)', r'\1\n        ' + new_matrix_js + ',', js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Injected matrix into data.js")
