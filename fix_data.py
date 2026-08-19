import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Replace unicode keys in byCompany and plan2026 across data.js
replacements = {
    r"'T\S*n H\S*ng H\S*'": "'THH'",
    r"'Vi\S*t'": "'Viet'",
    r"'Xem S\S*n'": "'XemSon'",
    r"'VPS M'": "'VPSM'",
    r"'ITSS'": "'ITSS'",
    r"'Van ph\S*ng VPS'": "'VPVPS'"
}

for old, new in replacements.items():
    js = re.sub(old, new, js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated data.js keys")
