import codecs

with codecs.open('js/google_sheets.js', 'r', 'utf-8') as f:
    content = f.read()

# Replace the parsing logic for Customers
old_cust_logic = '''                const rowData = {
                    dau: { may: parseNumber(row[2]), kh: parseNumber(row[3]) },
                    tang: { may: parseNumber(row[4]), kh: parseNumber(row[5]) },
                    giam: { may: parseNumber(row[6]), kh: parseNumber(row[7]) },
                    cuoi: { may: parseNumber(row[8]), kh: parseNumber(row[9]) }
                };'''

new_cust_logic = '''                const rowData = {
                    ke_hoach: { may: parseNumber(row[3]), kh: parseNumber(row[4]) },
                    dau: { may: parseNumber(row[5]), kh: parseNumber(row[6]) },
                    tang: { may: parseNumber(row[7]), kh: parseNumber(row[8]) },
                    giam: { may: parseNumber(row[9]), kh: parseNumber(row[10]) },
                    cuoi: { may: parseNumber(row[11]), kh: parseNumber(row[12]) }
                };'''

content = content.replace(old_cust_logic, new_cust_logic)

with codecs.open('js/google_sheets.js', 'w', 'utf-8') as f:
    f.write(content)
