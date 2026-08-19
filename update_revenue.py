import json

with open('js/data.js', 'r', encoding='utf-8') as f:
    data = f.read()

import re

new_byCompany = '''        'Tân Hồng Hà': { actual: 68.204, plan: 300.0 },
            'Việt': { actual: 40.891, plan: 106.0 },
            'Xem Sơn': { actual: 0, plan: 168.0 },
            'VPS M': { actual: 11.251, plan: 45.0 },
            'ITSS': { actual: 2.914, plan: 13.64 },
            'Văn phòng VPS': { actual: 0, plan: 0 }'''

data = re.sub(r"'Tân Hồng Hà': \{ actual: 120\.5.*?'Văn phòng VPS': \{ actual: 12\.0, plan: 15\.0 \}", new_byCompany, data, flags=re.DOTALL)

new_plan2026 = '''        'all': { ds: 632640, actual: 123260, ttlg: 120976, lg_pct: 19, cp_lg_pct: 64, cp: 77545, lntt: 44071 },
        'Tân Hồng Hà': { ds: 300000, actual: 68204, ttlg: 43080, lg_pct: 14, cp_lg_pct: 57, cp: 24705, lntt: 18385 },
        'Việt': { ds: 106000, actual: 40891, ttlg: 22940, lg_pct: 22, cp_lg_pct: 61, cp: 13932, lntt: 9000 },
        'Xem Sơn': { ds: 168000, actual: 0, ttlg: 43060, lg_pct: 26, cp_lg_pct: 71, cp: 30618, lntt: 13000 },
        'VPS M': { ds: 45000, actual: 11251, ttlg: 8469, lg_pct: 19, cp_lg_pct: 64, cp: 5390, lntt: 3160 },
        'ITSS': { ds: 13640, actual: 2914, ttlg: 3427, lg_pct: 25, cp_lg_pct: 84.6, cp: 2900, lntt: 526 },
        'Văn phòng VPS': { ds: 0, actual: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 }'''

data = re.sub(r"'all': \{ ds: 632640.*?'Văn phòng VPS': \{ ds: 0, ttlg: 0, lg_pct: 0, cp_lg_pct: 0, cp: 0, lntt: 0 \}", new_plan2026, data, flags=re.DOTALL)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(data)
print('Done!')
