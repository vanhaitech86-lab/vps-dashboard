const fs = require('fs');
let code = fs.readFileSync('js/overview.js', 'utf8');

// Map UI company to data key
const mapCode = 
        let dataKey = 'all';
        if (company === 'Tân Hồng Hà' || company.includes('T') && company.includes('H')) dataKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) dataKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem')) dataKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M')) dataKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) dataKey = 'ITSS'; 
        else if (company !== 'all') dataKey = 'all';
;

code = code.replace(/updateUI\(customers, revenue, debt, company\) \{/, "updateUI(customers, revenue, debt, company) {" + mapCode);

// Replace company with dataKey in byCompany lookups
code = code.replace(/customers\.byCompany\[company\]/g, "customers.byCompany[dataKey]");
code = code.replace(/revenue\.byCompany\[company\]/g, "revenue.byCompany[dataKey]");
code = code.replace(/debt\.byCompany\[company\]/g, "debt.byCompany[dataKey]");

fs.writeFileSync('js/overview.js', code, 'utf8');
console.log('Fixed overview.js lookups');
