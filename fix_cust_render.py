import codecs

with codecs.open('js/customers.js', 'r', 'utf-8') as f:
    content = f.read()

old_tbody = '''        tbodyHTML += 
            <tr style="font-weight: bold; background: #f8fafc;">
                <td style="text-align: left;">Thuê máy, MC - Photo</td>
                <td style="color: #475569;"></td><td style="color: #475569;"></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
            </tr>
        ;'''

new_tbody = '''        tbodyHTML += 
            <tr style="font-weight: bold; background: #f8fafc;">
                <td style="text-align: left;">Thuê máy, MC - Photo</td>
                <td></td><td></td>
                <td style="color: #0369a1;"></td><td style="color: #0369a1;"></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
            </tr>
        ;'''

old_tbody2 = '''            tbodyHTML += 
                <tr>
                    <td style="text-align: left;"></td>
                    <td style="color: #64748b;"></td><td style="color: #64748b;"></td>
                    <td></td><td></td>
                    <td></td><td></td>
                    <td></td><td></td>
                    <td></td><td></td>
                </tr>
            ;'''

new_tbody2 = '''            tbodyHTML += 
                <tr>
                    <td style="text-align: left;"></td>
                    <td></td><td></td>
                    <td style="color: #0369a1;"></td><td style="color: #0369a1;"></td>
                    <td></td><td></td>
                    <td></td><td></td>
                    <td></td><td></td>
                </tr>
            ;'''

old_tbody3 = '''        tbodyHTML += 
            <tr style="font-weight: bold; font-size: 1.1em; background: #f1f5f9; color: #b91c1c;">
                <td style="text-align: left;">Tổng cộng</td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
            </tr>
        ;'''

new_tbody3 = '''        tbodyHTML += 
            <tr style="font-weight: bold; font-size: 1.1em; background: #f1f5f9; color: #b91c1c;">
                <td style="text-align: left;">Tổng cộng</td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
                <td></td><td></td>
            </tr>
        ;'''

content = content.replace(old_tbody, new_tbody)
content = content.replace(old_tbody2, new_tbody2)
content = content.replace(old_tbody3, new_tbody3)

with codecs.open('js/customers.js', 'w', 'utf-8') as f:
    f.write(content)
