import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace byCompany value for Xem Sơn
js = js.replace("'Xem Sơn': { actual: 0, plan: 168.0 }", "'Xem Sơn': { actual: 69.426, plan: 168.0 }")

# Replace plan2026 value for Xem Sơn
js = js.replace("'Xem Sơn': { ds: 168000, actual: 0,", "'Xem Sơn': { ds: 168000, actual: 69426,")

# Replace 'all' actual value
js = js.replace("'all': { ds: 632640, actual: 123260,", "'all': { ds: 632640, actual: 192686,")

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('Done!')
