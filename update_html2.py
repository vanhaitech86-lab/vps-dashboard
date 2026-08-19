import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

old_thead = '''                                    <tr>
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

new_thead = '''                                    <tr>
                                        <th rowspan="2" style="vertical-align: middle;">CÔNG TY</th>
                                        <th colspan="3" style="text-align: center; border-bottom: 1px solid #ccc; background: rgba(0,0,0,0.02);">DOANH SỐ</th>
                                        <th colspan="3" style="text-align: center; border-bottom: 1px solid #ccc;">TT LÃI GỘP</th>
                                        <th colspan="3" style="text-align: center; border-bottom: 1px solid #ccc; background: rgba(0,0,0,0.02);">% LÃI GỘP</th>
                                        <th colspan="3" style="text-align: center; border-bottom: 1px solid #ccc;">% CP / LÃI GỘP</th>
                                        <th colspan="3" style="text-align: center; border-bottom: 1px solid #ccc; background: rgba(0,0,0,0.02);">CHI PHÍ</th>
                                        <th colspan="3" style="text-align: center; border-bottom: 1px solid #ccc;">LNTT</th>
                                    </tr>
                                    <tr>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">KH</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">TH</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">% Đạt</th>
                                        <th style="text-align: right;">KH</th>
                                        <th style="text-align: right;">TH</th>
                                        <th style="text-align: right;">% Đạt</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">KH</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">TH</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">% Đạt</th>
                                        <th style="text-align: right;">KH</th>
                                        <th style="text-align: right;">TH</th>
                                        <th style="text-align: right;">% Đạt</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">KH</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">TH</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02);">% Đạt</th>
                                        <th style="text-align: right;">KH</th>
                                        <th style="text-align: right;">TH</th>
                                        <th style="text-align: right;">% Đạt</th>
                                    </tr>'''

html = html.replace(old_thead, new_thead)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
