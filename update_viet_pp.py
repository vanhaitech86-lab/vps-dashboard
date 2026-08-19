import json
import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    code = f.read()

# We only need to replace the 'Viet' and 'all' phan_phoi blocks in the matrix

# For Viet, old is:
# 'phan_phoi': {'dau': {'may': 0, 'kh': 1041}, 'tang': {'may': 0, 'kh': 11}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 1052}}
# New is:
# 'phan_phoi': {'dau': {'may': 0, 'kh': 1950}, 'tang': {'may': 0, 'kh': 11}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 1961}}

# For all, old is:
# 'phan_phoi': {'dau': {'may': 0, 'kh': 1881}, 'tang': {'may': 0, 'kh': 64}, 'giam': {'may': 0, 'kh': 1}, 'cuoi': {'may': 0, 'kh': 1944}}
# New is:
# 'phan_phoi': {'dau': {'may': 0, 'kh': 2790}, 'tang': {'may': 0, 'kh': 64}, 'giam': {'may': 0, 'kh': 1}, 'cuoi': {'may': 0, 'kh': 2853}}

# Let's do a safe targeted replacement

code = code.replace(
    '"kh": 1041',
    '"kh": 1950',
    1 # We only want to replace in Viet phan_phoi, but let's be careful
)

# Actually, writing a precise regex or AST replacement is safer.
