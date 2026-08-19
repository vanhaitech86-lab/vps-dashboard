import codecs
import re

with codecs.open('js/google_sheets.js', 'r', 'utf-8') as f:
    content = f.read()

search = '''            // Merge parsed data into mockData as a global override
            window.mockData.revenue = newData.revenue;
            window.mockData.debt = newData.debt;
            window.mockData.customers = newData.customers;'''

replace = '''            // Fallback to mockData if sheet is empty (so UI doesn't look blank during testing)
            if (newData.revenue.total > 0) {
                window.mockData.revenue = newData.revenue;
            }
            if (newData.debt.total > 0) {
                window.mockData.debt = newData.debt;
            }
            if (newData.customers.total > 0) {
                window.mockData.customers = newData.customers;
            }'''

content = content.replace(search, replace)

with codecs.open('js/google_sheets.js', 'w', 'utf-8') as f:
    f.write(content)
