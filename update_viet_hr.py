import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I will replace:
# 'Việt': { quota: 43, official: 39, probation: 1, resigned: 0, kpi: {A: 14, B: 19, C: 1, D: 4}
# with
# 'Việt': { quota: 43, official: 38, probation: 1, resigned: 0, kpi: {A: 14, B: 19, C: 1, D: 4}

js = js.replace("'Việt': { quota: 43, official: 39,", "'Việt': { quota: 43, official: 38,")

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('Done data.js!')
