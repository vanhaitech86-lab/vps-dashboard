const fs = require('fs');

let js = fs.readFileSync('js/customers.js', 'utf8');

// We need to add 'Phân phối (Đại lý)' row to the table.
// And also to the pie chart?
// The user says "dashboard cơ cấu khách hàng". Let's add it to the table first.
// The pie chart is for 'MÁY', but Phân phối has MÁY = 0. So it won't show in the pie chart anyway, which is fine!
// Or we can add it to the pie chart for 'KH'? The pie chart is currently MÁY. Let's switch pie chart to KH because that makes more sense for "Cơ cấu khách hàng"!
// No wait, the previous image had "MÁY" and "KH", the current pie chart uses MÁY. Let's just leave it MÁY, or change to KH.
// Actually, let's just add Phân phối to the rows array.

let newRows = 
        const rows = [
            { id: 'thue_may', name: 'Thuê máy' },
            { id: 'mc', name: 'MC' },
            { id: 'dv_photo', name: 'Dịch vụ - Photo' },
            { id: 'dv_may_in', name: 'Dịch vụ - Máy in' },
            { id: 'dv_khac', name: 'Dịch vụ khác' },
            { id: 'phan_phoi', name: 'Phân phối (Đại lý)' }
        ];;

js = js.replace(/const rows = \[\s*\{ id: 'thue_may'[\s\S]*?\{ id: 'dv_khac', name: 'Dịch vụ khác' \}\s*\];/, newRows.trim());

// For the Chart, let's include Phân phối (Đại lý) but use KH (Khách hàng) values instead of MÁY, because Phân phối doesn't have MÁY.
// Actually, let's make the chart show Khách Hàng (KH) instead of MÁY, since it's "Cơ cấu Khách Hàng".

let oldChartPrep =         // Prepare chart data (Pie chart for Cuối Tháng - MÁY)
        const chartLabels = ['Thuê máy', 'MC', 'Dịch vụ - Photo', 'Dịch vụ - Máy in'];
        const chartValues = [
            cData['thue_may'].cuoi.may,
            cData['mc'].cuoi.may,
            cData['dv_photo'].cuoi.may,
            cData['dv_may_in'].cuoi.may
        ];;

let newChartPrep =         // Prepare chart data (Pie chart for Cuối Tháng - KH)
        const chartLabels = ['Thuê máy', 'MC', 'Dịch vụ - Photo', 'Dịch vụ - Máy in', 'Phân phối (Đại lý)'];
        const chartValues = [
            cData['thue_may'].cuoi.kh,
            cData['mc'].cuoi.kh,
            cData['dv_photo'].cuoi.kh,
            cData['dv_may_in'].cuoi.kh,
            cData['phan_phoi'].cuoi.kh
        ];;

js = js.replace(oldChartPrep, newChartPrep);

// Change Chart tooltips from 'Máy' to 'Khách hàng'
js = js.replace(/label \+= new Intl\.NumberFormat\('vi-VN'\)\.format\(context\.raw\) \+ ' Máy';/g, "label += new Intl.NumberFormat('vi-VN').format(context.raw) + ' KH';");

// Update chart colors array to have 5 colors
js = js.replace(/backgroundColor: \['#2E86AB', '#A23B72', '#F18F01', '#C73E1D'\]/, "backgroundColor: ['#2E86AB', '#A23B72', '#F18F01', '#C73E1D', '#16A34A']");

fs.writeFileSync('js/customers.js', js, 'utf8');
console.log("Updated customers.js");
