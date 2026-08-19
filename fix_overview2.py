import codecs

with codecs.open('js/overview.js', 'r', 'utf-8') as f:
    content = f.read()

search = '''        if (company === 'all') {
            tCust = customers.total;
            tNew = customers.trend.new;
            tDec = customers.trend.decreased;
            tLost = customers.trend.lost;
            for (const [compName, compData] of Object.entries(customers.byCompany)) {
                tService += compData.service;
                tRental += compData.rental;
                tDistribution += compData.distribution;
            }'''

replace = '''        if (company === 'all') {
            tNew = customers.trend.new;
            tDec = customers.trend.decreased;
            tLost = customers.trend.lost;
            for (const [compName, compData] of Object.entries(customers.byCompany)) {
                tService += compData.service;
                tRental += compData.rental;
                tDistribution += compData.distribution;
            }
            tCust = tService + tRental + tDistribution;'''

content = content.replace(search, replace)

search_rev = '''        let totalActualRev = 0;
        let totalPlanRev = 0;
        if (company === 'all') {
            totalActualRev = revenue.total;
            for (let p of revPlanData) totalPlanRev += p;'''

replace_rev = '''        let totalActualRev = 0;
        let totalPlanRev = 0;
        if (company === 'all') {
            for (let a of revActualData) totalActualRev += a;
            for (let p of revPlanData) totalPlanRev += p;'''

content = content.replace(search_rev, replace_rev)

with codecs.open('js/overview.js', 'w', 'utf-8') as f:
    f.write(content)
