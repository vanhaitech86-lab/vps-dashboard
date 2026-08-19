import codecs

with codecs.open('index.html', 'r', 'utf-8') as f:
    lines = f.readlines()

out = []
skip = 0
for i, line in enumerate(lines):
    if skip > 0:
        skip -= 1
        continue
    if '<section id="view-revenue"' in line:
        out.append(line)
        out.append('''                      <div class="grid-layout cols-2">
                          <div class="card">
                              <div class="card-header" style="display: flex; justify-content: space-between; align-items: center;">
                                  <h3 style="font-size: 1rem;">So Sánh Doanh Số Cùng Kỳ</h3>
                                  <select id="revenue-year-filter" style="border: 1px solid #ccc; border-radius: 4px; padding: 2px 5px; font-size: 0.8rem; background: white;">
                                      <option value="2026">Năm 2026 vs 2025</option>
                                  </select>
                              </div>
                              <div class="card-body">
                                  <div class="chart-container" style="height: 280px;">
                                      <canvas id="revenueChart"></canvas>
                                  </div>
                              </div>
                          </div>
                          
                          <div class="card" style="border: 2px dashed #cbd5e1; background: #f8fafc;">
                              <div class="card-header" style="background: transparent; border-bottom: none;">
                                  <h3 style="color: #64748b; font-size: 1rem;">Khu vực Báo Cáo Mới</h3>
                              </div>
                              <div class="card-body" style="height: 280px; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #94a3b8; text-align: center;">
                                  <i data-lucide="plus-circle" style="width: 40px; height: 40px; margin-bottom: 10px; color: #cbd5e1;"></i>
                                  <p>Đã thu nhỏ biểu đồ bên trái.<br>Không gian này để chờ bạn thêm biểu đồ/báo cáo khác.</p>
                              </div>
                          </div>
                      </div>\n''')
        skip = 10
    else:
        out.append(line)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.writelines(out)
