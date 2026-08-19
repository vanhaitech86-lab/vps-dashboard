import codecs
import re

with codecs.open('js/customers.js', 'r', 'utf-8') as f:
    content = f.read()

# Fix tbodyHTML for Thuê máy, MC
content = re.sub(
    r'(<td>\$\{tm_mc_dau_may \|\| 0\}</td>\s*<td>\$\{tm_mc_dau_kh \|\| 0\}</td>)',
    r'\1\n                <td style="color: #0369a1; font-weight: bold;"></td><td style="color: #0369a1; font-weight: bold;"></td>',
    content
)

# Fix tbodyHTML for each row
content = re.sub(
    r'(<td>\$\{mayDau\}</td>\s*<td>\$\{rowData\.dau\.kh \|\| 0\}</td>)',
    r'\1\n                    <td style="color: #0369a1; font-weight: bold;"></td><td style="color: #0369a1; font-weight: bold;"></td>',
    content
)

# Fix tbodyHTML for sums
content = re.sub(
    r'(<td>\$\{sums\.dau\.may\}</td>\s*<td>\$\{sums\.dau\.kh\}</td>)',
    r'\1\n                <td style="color: #0369a1; font-weight: bold;"></td><td style="color: #0369a1; font-weight: bold;"></td>',
    content
)

with codecs.open('js/customers.js', 'w', 'utf-8') as f:
    f.write(content)
