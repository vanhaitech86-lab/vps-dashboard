
import codecs

with codecs.open("js/customers.js", "r", "utf-8") as f:
    content = f.read()

content = content.replace('<td style="color: #0369a1; font-weight: bold;"></td><td style="color: #0369a1; font-weight: bold;"></td>', '<td style="color: #0369a1; font-weight: bold;">${tm_mc_ke_hoach_may || 0}</td><td style="color: #0369a1; font-weight: bold;">${tm_mc_ke_hoach_kh || 0}</td>', 1)

content = content.replace('<td style="color: #0369a1; font-weight: bold;"></td><td style="color: #0369a1; font-weight: bold;"></td>', '<td style="color: #0369a1; font-weight: bold;">${mayKeHoach}</td><td style="color: #0369a1; font-weight: bold;">${rowData.ke_hoach?.kh || 0}</td>', 1)

content = content.replace('<td style="color: #0369a1; font-weight: bold;"></td><td style="color: #0369a1; font-weight: bold;"></td>', '<td style="color: #0369a1; font-weight: bold;">${sums.ke_hoach.may}</td><td style="color: #0369a1; font-weight: bold;">${sums.ke_hoach.kh}</td>', 1)

with codecs.open("js/customers.js", "w", "utf-8") as f:
    f.write(content)

