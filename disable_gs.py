import codecs

with codecs.open('js/app.js', 'r', 'utf-8') as f:
    content = f.read()

# Remove the GoogleSheetsService call completely from showApp
search = '''            // Fetch from Google Sheets
            if (window.GoogleSheetsService) {
                await window.GoogleSheetsService.loadAllData();
            }'''

replace = '''            // TẠM DỪNG GOOGLE SHEETS THEO YÊU CẦU ĐỂ BÁO CÁO SẾP
            // if (window.GoogleSheetsService) {
            //     await window.GoogleSheetsService.loadAllData();
            // }'''

content = content.replace(search, replace)

# Also force cache bust to v=3 just in case
with codecs.open('index.html', 'r', 'utf-8') as f:
    index_html = f.read()
index_html = index_html.replace('?v=2', '?v=3')

with codecs.open('js/app.js', 'w', 'utf-8') as f:
    f.write(content)

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(index_html)
