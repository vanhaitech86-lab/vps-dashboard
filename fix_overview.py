import codecs

with codecs.open('js/overview.js', 'r', 'utf-8') as f:
    content = f.read()

# Replace hardcoded updates for overview-revenue-val and overview-customers-val
# Add them into the updateUI function

fix1 = '''        document.getElementById('ov-cust-total').textContent = tCust.toLocaleString();
        document.getElementById('overview-customers-val').textContent = tCust.toLocaleString();
        document.getElementById('ov-cust-new').textContent = "+" + tNew.toLocaleString();'''

# Make sure we don't accidentally do something weird if it's already there
if "document.getElementById('overview-customers-val').textContent" not in content:
    content = content.replace("document.getElementById('ov-cust-total').textContent = tCust.toLocaleString();", fix1)

fix2_search = '''        window.ChartManager.createChart('overviewRevenueChart', 'bar', {'''
fix2_replace = '''        let totalActualRev = 0;
        let totalPlanRev = 0;
        if (company === 'all') {
            totalActualRev = revenue.total;
            for (let p of revPlanData) totalPlanRev += p;
        } else {
            totalActualRev = revActualData[0] || 0;
            totalPlanRev = revPlanData[0] || 0;
        }
        
        let valEl = document.getElementById('overview-revenue-val');
        if(valEl) valEl.textContent = (totalActualRev / 1000).toFixed(1) + ' Tỷ đ';
        
        window.ChartManager.createChart('overviewRevenueChart', 'bar', {'''

if "document.getElementById('overview-revenue-val')" not in content:
    content = content.replace(fix2_search, fix2_replace)

with codecs.open('js/overview.js', 'w', 'utf-8') as f:
    f.write(content)
