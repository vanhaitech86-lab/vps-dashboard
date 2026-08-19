import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

new_inventory_html = '''<section id="view-inventory" class="view hidden">
                    <div class="grid-layout cols-2">
                        <div class="card">
                            <div class="card-header">
                                <h3>Cơ Cấu Tồn Kho Theo Hãng</h3>
                            </div>
                            <div class="card-body">
                                <div class="chart-container" style="height: 350px;">
                                    <canvas id="inventoryChart"></canvas>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <div class="card-header">
                                <h3>Phân Tích Tồn Kho</h3>
                            </div>
                            <div class="card-body">
                                <p style="margin-bottom: 10px;"><strong>Tổng Tồn Kho: </strong><span id="inventory-total-val" style="color: #d97706; font-size: 1.5rem; font-weight: bold;">0</span></p>
                                <p>Hãng HP và Fujifilm chiếm tỷ trọng lớn nhất trong kho. Các mặt hàng linh kiện (Part) và mực in (Consumable) có vòng quay ổn định nhưng cần theo dõi sát sao nhóm Máy nguyên chiếc để tối ưu dòng tiền.</p>
                            </div>
                        </div>
                    </div>

                    <div class="card mt-20">
                        <div class="card-header">
                            <h3>Chi Tiết Tồn Kho (VNĐ)</h3>
                        </div>
                        <div class="table-responsive">
                            <table class="data-table" id="inventoryTable">
                                <thead>
                                    <tr>
                                        <th>NHÓM VẬT TƯ</th>
                                        <th style="text-align: right;">HP</th>
                                        <th style="text-align: right;">Fujifilm</th>
                                        <th style="text-align: right;">Olivetti</th>
                                        <th style="text-align: right;">Bonsai</th>
                                        <th style="text-align: right;">Khác</th>
                                        <th style="text-align: right; background: rgba(0,0,0,0.02); font-weight: bold;">Cộng</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>'''

# Replace old view-inventory section
html = re.sub(r'<section id="view-inventory" class="view hidden">.*?</section>', new_inventory_html, html, flags=re.DOTALL)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)
print('Done!')
