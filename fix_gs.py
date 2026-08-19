import codecs

with codecs.open('js/google_sheets.js', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('newData.revenue = { total: 0, plan2026: {}, byCompany: {} };', 'newData.revenue = { total: 0, plan2026: window.mockData.revenue.plan2026, byCompany: {} };')
content = content.replace('newData.customers = { total: 0, trend: {new:0, lost:0, decreased:0, totalIncreased:0, percentage:0}, matrix: {}, plan2026: {}, byCompany: {} };', 'newData.customers = { total: 0, trend: window.mockData.customers.trend, matrix: {}, plan2026: window.mockData.customers.plan2026, byCompany: {} };')

# Let's just do it securely using python string replace
code2 = '''            const newData = {
                revenue: { total: 0, plan2026: window.mockData.revenue.plan2026, byCompany: {} },
                debt: { total: 0, byCompany: {} },
                customers: { total: 0, trend: window.mockData.customers.trend, matrix: {}, plan2026: window.mockData.customers.plan2026, byCompany: {} },
                inventory: { totalItems: 0, totalValue: 0, categories: [], byCompany: {} },
                hr: { totalEmployees: 0, newHires: 0, resignations: 0, probation: 0, byDepartment: {}, byCompany: {} }
            };'''
content = content.replace('''            const newData = {
                revenue: { total: 0, plan2026: {}, byCompany: {} },
                debt: { total: 0, byCompany: {} },
                customers: { total: 0, trend: {new:0, lost:0, decreased:0, totalIncreased:0, percentage:0}, matrix: {}, plan2026: {}, byCompany: {} },
                inventory: { totalItems: 0, totalValue: 0, categories: [], byCompany: {} },
                hr: { totalEmployees: 0, newHires: 0, resignations: 0, probation: 0, byDepartment: {}, byCompany: {} }
            };''', code2)

with codecs.open('js/google_sheets.js', 'w', 'utf-8') as f:
    f.write(content)
