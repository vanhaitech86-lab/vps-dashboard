import re

with open('js/inventory.js', 'r', encoding='utf-8') as f:
    js = f.read()

js = js.replace("const invData = await window.DataService.getData().then(d => d.inventory);", "const invData = await window.DataService.getInventoryData(period, company);")

with open('js/inventory.js', 'w', encoding='utf-8') as f:
    f.write(js)
