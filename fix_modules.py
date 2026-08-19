import re
import os

files = ['js/revenue.js', 'js/debt.js', 'js/hr.js']

map_code = '''
        let dataKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) dataKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) dataKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem')) dataKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M')) dataKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) dataKey = 'ITSS'; 
        else if (company !== 'all') dataKey = 'VPVPS';
'''

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        js = f.read()

    js = js.replace('updateUI(data, company) {', 'updateUI(data, company) {' + map_code)
    js = js.replace('data.byCompany[company]', 'data.byCompany[dataKey]')
    js = js.replace('data.plan2026[company]', 'data.plan2026[dataKey]')

    with open(file, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f"Updated {file}")
