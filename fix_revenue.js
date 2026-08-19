const fs = require('fs');
let code = fs.readFileSync('js/revenue.js', 'utf8');
code = code.replace(/\/\/ Update Plan Table[\s\S]+/, ''); // remove bad logic
code += 
        // Update Plan Table
        const tbody = document.querySelector('#revenuePlanTable tbody');
        if (tbody && data.plan2026) {
            let html = '';
            const renderRow = (name, p) => \
                <tr \>
                    <td>\</td>
                    <td style="text-align: right;">\</td>
                    <td style="text-align: right;">\</td>
                    <td style="text-align: right;">\</td>
                    <td style="text-align: right;">\</td>
                    <td style="text-align: right;">\</td>
                    <td style="text-align: right;">\</td>
                </tr>
            \;

            if (company === 'all') {
                html += renderRow('TẬP ĐOÀN VPS', data.plan2026['all']);
                for (const [compName, p] of Object.entries(data.plan2026)) {
                    if (compName !== 'all' && compName !== 'Văn phòng VPS') {
                        html += renderRow(compName, p);
                    }
                }
            } else {
                const p = data.plan2026[company];
                if (p) {
                    html += renderRow(company, p);
                }
            }
            tbody.innerHTML = html;
        }
    }
};
;
fs.writeFileSync('js/revenue.js', code, 'utf8');
