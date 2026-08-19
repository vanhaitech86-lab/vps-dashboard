import re

map_code = '''
        const companyNameMap = {
            'all': 'Tất cả',
            'THH': 'Tân Hồng Hà',
            'Viet': 'Việt',
            'XemSon': 'Xem Sơn',
            'VPSM': 'VPS M',
            'ITSS': 'ITSS',
            'VPVPS': 'Văn phòng VPS'
        };
'''

files = ['js/overview.js', 'js/revenue.js', 'js/debt.js', 'js/hr.js', 'js/inventory.js']

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        js = f.read()

    js = js.replace("let dataKey = 'all';", map_code + "\n        let dataKey = 'all';")
    js = js.replace("revLabels.push(compName);", "revLabels.push(companyNameMap[compName] || compName);")
    js = js.replace("debtLabels.push(compName);", "debtLabels.push(companyNameMap[compName] || compName);")
    # For HR, replace compName if needed
    js = js.replace("<tr><td></td>", "<tr><td></td>")

    with open(file, 'w', encoding='utf-8') as f:
        f.write(js)
    print(f"Updated {file}")
