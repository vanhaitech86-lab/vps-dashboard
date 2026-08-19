import re

with open('js/revenue.js', 'r', encoding='utf-8') as f:
    js = f.read()

old_row_regex = r'<tr \$\{name === \'TẬP ĐOÀN VPS\' \|\| name === \'all\' \? \'style="font-weight: bold; background: #e2e8f0;"\' : \'\'\}>.*?</tr>'

new_row = """                <tr ${name === 'TẬP ĐOÀN VPS' || name === 'all' ? 'style="font-weight: bold; background: #e2e8f0;"' : ''}>
                    <td>${name === 'all' ? 'TẬP ĐOÀN VPS' : name}</td>
                    
                    <!-- DOANH SO -->
                    <td style="text-align: right; background: rgba(0,0,0,0.02);">${p.ds ? p.ds.toLocaleString() : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">${p.actual ? p.actual.toLocaleString() : '-'}</td>
                    <td style="text-align: right; font-weight: bold; background: rgba(0,0,0,0.02); color: ${p.actual && p.ds && (p.actual/p.ds) >= 1 ? '#16a34a' : (p.actual && p.ds && (p.actual/p.ds) >= 0.5 ? '#ca8a04' : '#dc2626')};">${p.actual && p.ds ? ((p.actual/p.ds)*100).toFixed(1) + '%' : '0%'}</td>
                    
                    <!-- TT LAI GOP -->
                    <td style="text-align: right;">${p.ttlg ? p.ttlg.toLocaleString() : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500;">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626;">0%</td>
                    
                    <!-- % LAI GOP -->
                    <td style="text-align: right; background: rgba(0,0,0,0.02);">${p.lg_pct ? p.lg_pct + '%' : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626; background: rgba(0,0,0,0.02);">0%</td>
                    
                    <!-- % CP/LG -->
                    <td style="text-align: right;">${p.cp_lg_pct ? p.cp_lg_pct + '%' : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500;">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626;">0%</td>
                    
                    <!-- CHI PHI -->
                    <td style="text-align: right; background: rgba(0,0,0,0.02);">${p.cp ? p.cp.toLocaleString() : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500; background: rgba(0,0,0,0.02);">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626; background: rgba(0,0,0,0.02);">0%</td>
                    
                    <!-- LNTT -->
                    <td style="text-align: right;">${p.lntt ? p.lntt.toLocaleString() : '-'}</td>
                    <td style="text-align: right; color: #2563eb; font-weight: 500;">-</td>
                    <td style="text-align: right; font-weight: bold; color: #dc2626;">0%</td>
                </tr>"""

if re.search(old_row_regex, js, flags=re.DOTALL):
    js = re.sub(old_row_regex, new_row, js, flags=re.DOTALL)
    print("Replaced!")
else:
    print("Not found regex!")

with open('js/revenue.js', 'w', encoding='utf-8') as f:
    f.write(js)
