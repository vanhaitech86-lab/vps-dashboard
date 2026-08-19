import re

with open('js/customers.js', 'r', encoding='utf-8') as f:
    js = f.read()

new_rows = '''const rows = [
            { id: 'thue_may', name: 'Thuê máy' },
            { id: 'mc', name: 'MC' },
            { id: 'dv_photo', name: 'Dịch vụ - Photo' },
            { id: 'dv_may_in', name: 'Dịch vụ - Máy in' },
            { id: 'dv_khac', name: 'Dịch vụ khác' },
            { id: 'phan_phoi', name: 'Phân phối (Đại lý)' }
        ];'''

js = re.sub(r'const rows = \[\s*\{\s*id:\s*\'thue_may\'[\s\S]*?\{\s*id:\s*\'dv_khac\', name:\s*\'Dịch vụ khác\'\s*\}\s*\];', new_rows, js)

new_chart = '''        // Prepare chart data (Pie chart for Cuối Tháng - KH)
        const chartLabels = ['Thuê máy', 'MC', 'Dịch vụ - Photo', 'Dịch vụ - Máy in', 'Phân phối (Đại lý)'];
        const chartValues = [
            cData['thue_may'].cuoi.kh,
            cData['mc'].cuoi.kh,
            cData['dv_photo'].cuoi.kh,
            cData['dv_may_in'].cuoi.kh,
            cData['phan_phoi'].cuoi.kh
        ];'''

js = re.sub(r'        // Prepare chart data \(Pie chart for Cuối Tháng - MÁY\)[\s\S]*?];', new_chart, js)

js = js.replace("label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' Máy';", "label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' KH';")

js = js.replace("backgroundColor: ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D']", "backgroundColor: ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D', '#16A34A']")

with open('js/customers.js', 'w', encoding='utf-8') as f:
    f.write(js)
print('Done')
