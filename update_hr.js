const fs = require('fs');
let data = fs.readFileSync('js/data.js', 'utf8');

const updates = {
    'Xem Sơn': { quota: 98, official: 95, probation: 1, resigned: 0, kpi: {A: 0, B: 85, C: 10, D: 0} },
    'VPS M': { quota: 15, official: 10, probation: 0, resigned: 0, kpi: {A: 0, B: 10, C: 0, D: 0} },
    'Tân Hồng Hà': { quota: 54, official: 48, probation: 2, resigned: 0, kpi: {A: 2, B: 43, C: 3, D: 0} },
    'Việt': { quota: 43, official: 39, probation: 1, resigned: 0, kpi: {A: 14, B: 19, C: 1, D: 4} },
    'Văn phòng VPS': { quota: 19, official: 18, probation: 0, resigned: 0, kpi: {A: 0, B: 18, C: 0, D: 0} },
    'ITSS': { quota: 8, official: 3, probation: 1, resigned: 0, kpi: {A: 3, B: 0, C: 0, D: 0} }
};

// We will use a regex to replace each line in the hr.byCompany block
for (const [comp, u] of Object.entries(updates)) {
    // Find the line for the company in hr block.
    // E.g. 'Tân Hồng Hà': { quota: 150, official: 120, probation: 15, resigned: 3, kpi: {A: 40, B: 50, C: 25, D: 5}, analysis: { cause: '...', solution: '...' } },
    
    // Create a regex that looks specifically within the hr block, but since company names are unique and we only care about the one with quota/official/kpi, we can just match it directly.
    const regex = new RegExp((''|""): \\{[^}]*quota:[^}]*analysis: \\{([^}]+)\\}\\s*\\});
    
    data = data.replace(regex, (match, p1, analysisContent) => {
        return \'\': { quota: \, official: \, probation: \, resigned: \, kpi: {A: \, B: \, C: \, D: \}, analysis: {\} }\;
    });
}

fs.writeFileSync('js/data.js', data, 'utf8');
