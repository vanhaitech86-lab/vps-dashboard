const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /(<canvas id="revenueChart"><\/canvas>\s*<\/div>\s*<\/div>\s*<\/div>)/;

const replaceWith = $1
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

if (regex.test(html)) {
    html = html.replace(regex, replaceWith);
    fs.writeFileSync('index.html', html, 'utf8');
    console.log("SUCCESS!");
} else {
    console.log("FAILED TO MATCH REGEX!");
}
