import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_view = '''<section id="view-customers" class="view hidden">
                    <div class="grid-layout cols-2">
                        <div class="card">
                            <div class="card-header">
                                <h3>Cơ Cấu Khách Hàng - Số Cuối Tháng</h3>
                            </div>
                            <div class="card-body">
                                <div class="chart-container" style="height: 350px;">
                                    <canvas id="customersChart"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3>Tổng Quan Biến Động</h3>
                            </div>
                            <div class="card-body">
                                <p style="margin-bottom: 10px;"><strong>Tổng Máy: </strong><span id="cust-total-may" style="color: #0369a1; font-size: 1.5rem; font-weight: bold;">0</span></p>
                                <p style="margin-bottom: 10px;"><strong>Tổng KH: </strong><span id="cust-total-kh" style="color: #b91c1c; font-size: 1.5rem; font-weight: bold;">0</span></p>
                                <p>Số lượng máy Dịch vụ Photo chiếm tỷ trọng lớn nhất. Nhóm khách thuê máy tăng trưởng ổn định trong tháng.</p>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-20">
                        <div class="card-header">
                            <h3>Báo Cáo Chi Tiết Cơ Cấu Khách Hàng</h3>
                        </div>
                        <div class="table-responsive">
                            <table class="data-table" id="customersTable" style="text-align: right;">
                                <thead>
                                    <tr>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>'''

html = re.sub(r'<section id="view-customers" class="view hidden">.*?</section>', new_view, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print("index.html rewritten")
