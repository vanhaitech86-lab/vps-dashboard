import re

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

if '<script src="js/inventory.js"></script>' not in html:
    html = html.replace('<script src="js/revenue.js"></script>', '<script src="js/revenue.js"></script>\n    <script src="js/inventory.js"></script>')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html)

with open('js/app.js', 'r', encoding='utf-8') as f:
    app_js = f.read()

if 'window.InventoryModule.init();' not in app_js:
    app_js = app_js.replace('if(window.RevenueModule) window.RevenueModule.init();', 'if(window.RevenueModule) window.RevenueModule.init();\n            if(window.InventoryModule) window.InventoryModule.init();')

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(app_js)

print('Linked and Initialized!')
