const fs = require('fs');

let invJs = fs.readFileSync('js/inventory.js', 'utf8');
invJs = invJs.replace(/const ctx = document\.getElementById\('inventoryChart'\);\s*if \(ctx\) \{\s*window\.ChartManager\.renderChart\(ctx,/g, "window.ChartManager.createChart('inventoryChart',");
invJs = invJs.replace(/window\.ChartManager\.renderChart/g, "window.ChartManager.createChart");
// For inventory.js we just need to change renderChart(ctx, ...) to createChart('inventoryChart', ...)
// Actually let's do an exact string replace.
invJs = invJs.replace("window.ChartManager.renderChart(ctx, 'doughnut', chartData, {", "window.ChartManager.createChart('inventoryChart', 'doughnut', chartData, {");
fs.writeFileSync('js/inventory.js', invJs, 'utf8');

let custJs = fs.readFileSync('js/customers.js', 'utf8');
custJs = custJs.replace("window.ChartManager.renderChart(ctx, 'pie', chartConfig, {", "window.ChartManager.createChart('customersChart', 'pie', chartConfig, {");
fs.writeFileSync('js/customers.js', custJs, 'utf8');

console.log("Fixed charts");
