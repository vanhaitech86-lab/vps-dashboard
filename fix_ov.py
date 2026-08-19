import re

with open('js/overview.js', 'r', encoding='utf-8') as f:
    js = f.read()

map_code = '''
        let dataKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) dataKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) dataKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem')) dataKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M')) dataKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) dataKey = 'ITSS'; 
        else if (company !== 'all') dataKey = 'VPVPS';
'''

js = js.replace('updateUI(customers, revenue, debt, company) {', 'updateUI(customers, revenue, debt, company) {' + map_code)
js = js.replace('customers.byCompany[company]', 'customers.byCompany[dataKey]')
js = js.replace('revenue.byCompany[company]', 'revenue.byCompany[dataKey]')
js = js.replace('debt.byCompany[company]', 'debt.byCompany[dataKey]')

with open('js/overview.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated overview.js")
