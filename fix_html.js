const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const search = '<canvas id="revenueChart"></canvas>\n                            </div>\n                        </div>\n                    </div>';
const replace = search + 
                    <div class="card mt-20">
                        <div class="card-header">
                            <h3>KẾ HOẠCH TÀI CHÍNH NĂM 2026 (ĐVT: Triệu VNĐ)</h3>
                        </div>
                        <div class="table-responsive">
                            <table class="data-table" id="revenuePlanTable">
                                <thead>
                                    <tr>
                                        <th>CÔNG TY</th>
                                        <th style="text-align: right;">Doanh Số</th>
                                        <th style="text-align: right;">TT Lãi Gộp</th>
                                        <th style="text-align: right;">% Lãi Gộp</th>
                                        <th style="text-align: right;">% Chi Phí / Lãi Gộp</th>
                                        <th style="text-align: right;">Chi Phí</th>
                                        <th style="text-align: right;">LNTT</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Populated by JS -->
                                </tbody>
                            </table>
                        </div>
                    </div>;
html = html.replace(search, replace);
fs.writeFileSync('index.html', html, 'utf8');
console.log(html.includes('revenuePlanTable'));
