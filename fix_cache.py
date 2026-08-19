import codecs

with codecs.open('index.html', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('src="js/overview.js"', 'src="js/overview.js?v=2"')
content = content.replace('src="js/google_sheets.js"', 'src="js/google_sheets.js?v=2"')
content = content.replace('src="js/app.js"', 'src="js/app.js?v=2"')

with codecs.open('index.html', 'w', 'utf-8') as f:
    f.write(content)
