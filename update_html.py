import codecs

with codecs.open('index.html', 'r', 'utf-8') as f:
    content = f.read()

old_thead = '''                                      <tr>
                                          <th rowspan="2" style="text-align: left; vertical-align: middle;">NỘI DUNG</th>
                                          <th colspan="2" style="text-align: center; background: #f8fafc;">SỐ ĐẦU THÁNG</th>
                                          <th colspan="2" style="text-align: center; background: #f0fdf4;">SL TĂNG</th>
                                          <th colspan="2" style="text-align: center; background: #fef2f2;">SL GIẢM</th>
                                          <th colspan="2" style="text-align: center; background: #f8fafc; font-weight: bold;">SỐ CUỐI THÁNG</th>
                                      </tr>
                                      <tr>
                                          <th style="background: #f8fafc;">MÁY</th>
                                          <th style="background: #f8fafc;">KH</th>
                                          <th style="background: #f0fdf4;">MÁY</th>
                                          <th style="background: #f0fdf4;">KH</th>
                                          <th style="background: #fef2f2;">MÁY</th>
                                          <th style="background: #fef2f2;">KH</th>
                                          <th style="background: #f8fafc;">MÁY</th>
                                          <th style="background: #f8fafc;">KH</th>
                                      </tr>'''

new_thead = '''                                      <tr>
                                          <th rowspan="2" style="text-align: left; vertical-align: middle;">NỘI DUNG</th>
                                          <th colspan="2" style="text-align: center; background: #eff6ff;">KẾ HOẠCH THÁNG</th>
                                          <th rowspan="2" style="text-align: center; vertical-align: middle; padding: 0 5px;">
                                              <select id="customers-month-filter" style="border: 1px solid #ccc; border-radius: 4px; padding: 2px; font-weight: bold; background: white; cursor: pointer; color: #333; outline: none;">
                                                  <option value="08/2026" selected>08/2026</option>
                                                  <option value="09/2026">09/2026</option>
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
                                      </tr>'''

content = content.replace(old_thead, new_thead)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(content)
