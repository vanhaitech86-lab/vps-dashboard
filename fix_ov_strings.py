import re

with open('js/overview.js', 'r', encoding='utf-8') as f:
    js = f.read()

replacements = {
    r"'D\?ch v\?'": "'Dịch vụ'",
    r"'Thu\S* m\S*y'": "'Thuê máy'",
    r"'Ph\S*n ph\?i'": "'Phân phối'",
    r"'K\? ho\?ch'": "'Kế hoạch'",
    r"'Th\?c t\?'": "'Thực tế'",
    r"T\? \?": "Tỷ VNĐ",
    r"T\? VND": "Tỷ VNĐ",
    r"T\?": "Tỷ",
    r"'Nam Nay \(2026\)'": "'Năm Nay (2026)'",
    r"'Nam Ngo\S*i \(2025\)'": "'Năm Ngoái (2025)'",
    r"'Trong h\?n'": "'Trong hạn'",
    r"'Qu\S* h\?n'": "'Quá hạn'",
    r"'Kh\S* d\S*i'": "'Khó đòi'"
}

for old, new in replacements.items():
    js = re.sub(old, new, js)

with open('js/overview.js', 'w', encoding='utf-8') as f:
    f.write(js)
print("Updated overview.js strings")
