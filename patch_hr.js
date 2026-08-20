const fs = require('fs');
let code = fs.readFileSync('js/google_sheets.js', 'utf8');

// 1. Fetch 'Nhn s?'
code = code.replace(
    /const \[revCsv, debtCsv, custCsv\] = await Promise.all\(\[\s*fetchCsv\('Doanh thu'\),\s*fetchCsv\('Cng n\?'\),\s*fetchCsv\('Khch hng'\)\s*\]\);/,
    "const [revCsv, debtCsv, custCsv, hrCsv] = await Promise.all([\n                fetchCsv('Doanh thu'),\n                fetchCsv('Cng n?'),\n                fetchCsv('Khch hng'),\n                fetchCsv('Nhn s?')\n            ]);"
);

// 2. Add hr parsing
const hrParseLogic = 

            // Parse HR
            let hrByCompany = {
                'THH': { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} },
                'Viet': { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} },
                'XemSon': { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} },
                'VPSM': { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} },
                'ITSS': { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} },
                'VPVPS': { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} }
            };

            let currentHrCompany = '';
            for (let i = 2; i < hrCsv.length; i++) {
                const row = hrCsv[i];
                if (row[1]) {
                    currentHrCompany = companyIdMap[row[1]] || currentHrCompany;
                } else if (row[0] && companyIdMap[row[0]]) {
                    currentHrCompany = companyIdMap[row[0]];
                }
                
                if (!currentHrCompany) continue;
                
                const cId = currentHrCompany;
                const nghiviec = parseNumber(row[5]);
                const thuviec = parseNumber(row[6]);
                const cuoiky = parseNumber(row[7]);
                
                if (hrByCompany[cId]) {
                    hrByCompany[cId].probation += thuviec;
                    hrByCompany[cId].resigned += nghiviec;
                    hrByCompany[cId].official += (cuoiky - thuviec);
                    hrByCompany[cId].quota += cuoiky; // Default quota to current total to avoid NaN
                }
            }
            newData.hr = { byCompany: hrByCompany };

            let currentCompany = '';
;

code = code.replace(/let currentCompany = '';/, hrParseLogic);

// 3. Update appData hr assignment
code = code.replace(/hr: window.mockData.hr \/\/ Keep mock for now/, 'hr: newData.hr');

fs.writeFileSync('js/google_sheets.js', code);
