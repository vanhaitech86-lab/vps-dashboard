import codecs

with codecs.open('js/google_sheets.js', 'r', 'utf-8') as f:
    content = f.read()

# Update parser logic for V5
old_rowData = '''                const rowData = {
                    ke_hoach: { may: parseNumber(row[3]), kh: parseNumber(row[4]) },
                    dau: { may: parseNumber(row[5]), kh: parseNumber(row[6]) },
                    tang: { may: parseNumber(row[7]), kh: parseNumber(row[8]) },
                    giam: { may: parseNumber(row[9]), kh: parseNumber(row[10]) },
                    cuoi: { may: parseNumber(row[11]), kh: parseNumber(row[12]) }
                };'''

new_rowData = '''                const rowData = {
                    dau: { may: parseNumber(row[3]), kh: parseNumber(row[4]) },
                    ke_hoach: { may: parseNumber(row[5]), kh: parseNumber(row[6]) },
                    tang: { may: parseNumber(row[7]), kh: parseNumber(row[8]) },
                    giam: { may: parseNumber(row[9]), kh: parseNumber(row[10]) },
                    cuoi: { may: parseNumber(row[11]), kh: parseNumber(row[12]) }
                };'''
content = content.replace(old_rowData, new_rowData)

# Also update the dropdown populator to say "THÁNG 8", "THÁNG 9"
old_dropdown = '''                    sortedMonths.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m;
                        opt.textContent = m;
                        if (m === defaultMonth) opt.selected = true;
                        selectEl.appendChild(opt);
                    });'''

new_dropdown = '''                    sortedMonths.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m;
                        opt.textContent = "THÁNG " + m.split('/')[0];
                        if (m === defaultMonth) opt.selected = true;
                        selectEl.appendChild(opt);
                    });'''
content = content.replace(old_dropdown, new_dropdown)

with codecs.open('js/google_sheets.js', 'w', 'utf-8') as f:
    f.write(content)
