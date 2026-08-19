import codecs

with codecs.open('index.html', 'r', 'utf-8') as f:
    lines = f.readlines()

out = []
in_thead = False
for line in lines:
    if '<table class="data-table" id="customersTable"' in line:
        out.append(line)
        out.append('                                <thead>\n')
        out.append('''                                    <tr>
                                        <th rowspan="2" style="text-align: left; vertical-align: middle;">NỘI DUNG</th>
                                        <th colspan="2" style="text-align: center; background: #eff6ff;">KẾ HOẠCH THÁNG</th>
                                        <th rowspan="2" style="text-align: center; vertical-align: middle; padding: 0 5px;">
                                            <select id="customers-month-filter" style="border: 1px solid #ccc; border-radius: 4px; padding: 2px; font-weight: bold; background: white; cursor: pointer; color: #333; outline: none;">
                                                <option value="08/2026" selected>08/2026</option>
                                            </select>
                                        </th>
                                        <th colspan="2" style="text-align: center; background: #f8fafc;">SỐ ĐẦU THÁNG</th>
                                        <th colspan="2" style="text-align: center; background: #f0fdf4;">SL TĂNG</th>
                                        <th colspan="2" style="text-align: center; background: #fef2f2;">SL GIẢM</th>
                                        <th colspan="2" style="text-align: center; background: #f8fafc; font-weight: bold;">SỐ CUỐI THÁNG</th>
                                    </tr>
                                    <tr>
                                        <th style="background: #eff6ff;">MÁY</th>
                                        <th style="background: #eff6ff;">KH</th>
                                        <th style="background: #f8fafc;">MÁY</th>
                                        <th style="background: #f8fafc;">KH</th>
                                        <th style="background: #f0fdf4;">MÁY</th>
                                        <th style="background: #f0fdf4;">KH</th>
                                        <th style="background: #fef2f2;">MÁY</th>
                                        <th style="background: #fef2f2;">KH</th>
                                        <th style="background: #f8fafc;">MÁY</th>
                                        <th style="background: #f8fafc;">KH</th>
                                    </tr>
                                </thead>
''')
        in_thead = True
        continue
        
    if in_thead:
        if '<tbody>' in line:
            in_thead = False
            out.append(line)
    else:
        out.append(line)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.writelines(out)
