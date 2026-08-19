import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Replace the <thead> row in revenuePlanTable
old_thead = '''                                    <tr>
                                        <th>CÔNG TY</th>
                                        <th style="text-align: right;">Doanh Số</th>
                                        <th style="text-align: right;">TT Lãi Gộp</th>
                                        <th style="text-align: right;">% Lãi Gộp</th>
                                        <th style="text-align: right;">% Chi Phí / Lãi Gộp</th>
                                        <th style="text-align: right;">Chi Phí</th>
                                        <th style="text-align: right;">LNTT</th>
                                    </tr>'''

new_thead = '''                                    <tr>
                                        <th>CÔNG TY</th>
                                        <th style="text-align: right;">Doanh Số KH</th>
                                        <th style="text-align: right;">Doanh Số TH</th>
                                        <th style="text-align: right;">% Đạt</th>
                                        <th style="text-align: right;">TT Lãi Gộp</th>
                                        <th style="text-align: right;">% Lãi Gộp</th>
                                        <th style="text-align: right;">% CP/LG</th>
                                        <th style="text-align: right;">Chi Phí</th>
                                        <th style="text-align: right;">LNTT</th>
                                    </tr>'''

html = html.replace(old_thead, new_thead)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done index.html!')
