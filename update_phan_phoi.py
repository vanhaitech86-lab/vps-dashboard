import json
import re

# Read data.js
with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

# Extract the matrix JSON string
matrix_match = re.search(r'matrix:\s*(\{.*\})\s*,?\s*hr:', js, re.DOTALL)
if not matrix_match:
    print("Matrix not found")
    exit(1)

matrix_str = matrix_match.group(1)
matrix = json.loads(matrix_str)

# New data to inject
phan_phoi_data = {
    'THH': {'dau': {'may': 0, 'kh': 358}, 'tang': {'may': 0, 'kh': 2}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 360}},
    'XemSon': {'dau': {'may': 0, 'kh': 435}, 'tang': {'may': 0, 'kh': 29}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 464}},
    'VPSM': {'dau': {'may': 0, 'kh': 47}, 'tang': {'may': 0, 'kh': 22}, 'giam': {'may': 0, 'kh': 1}, 'cuoi': {'may': 0, 'kh': 68}},
    'Viet': {'dau': {'may': 0, 'kh': 1041}, 'tang': {'may': 0, 'kh': 11}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 1052}},
    'all': {'dau': {'may': 0, 'kh': 1881}, 'tang': {'may': 0, 'kh': 64}, 'giam': {'may': 0, 'kh': 1}, 'cuoi': {'may': 0, 'kh': 1944}},
}

# Update the matrix
for company, data in phan_phoi_data.items():
    if company in matrix:
        matrix[company]['phan_phoi'] = data

# Serialize back
new_matrix_str = json.dumps(matrix, indent=4)

# Replace in js
js = js.replace(matrix_str, new_matrix_str)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Updated data.js with phan_phoi data")
