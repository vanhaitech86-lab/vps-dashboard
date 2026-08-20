const companyIdMap = {
    'Tân Hồng Hà': 'THH',
    'Việt': 'Viet',
    'Xem Sơn': 'XemSon',
    'VPS M': 'VPSM',
    'ITSS': 'ITSS',
    'Văn phòng VPS': 'VPVPS'
};
function parseNumber(val) {
    if (!val || val === '-') return 0;
    if (typeof val === 'number') return val;
    return parseFloat(val.toString().replace(/,/g, '')) || 0;
}

const sheetId = '18tWiuyHmvP_axcL_-yGmJj_rqo6Skqivf17WTuAJdwM';
const url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:csv&sheet=' + encodeURIComponent('Nhân sự');

fetch(url).then(r => r.text()).then(text => {
    const rows = text.split('\n').filter(l => l.trim()).map(line => {
        const result = [];
        let inQuote = false;
        let current = '';
        for (let c of line) {
            if (c === '"') { inQuote = !inQuote; continue; }
            if (c === ',' && !inQuote) { result.push(current); current = ''; continue; }
            current += c;
        }
        result.push(current);
        return result;
    });

    console.log('Total rows:', rows.length);
    console.log('Row 0:', JSON.stringify(rows[0]));
    console.log('Row 1:', JSON.stringify(rows[1]));
    
    let hrByCompany = {
        'THH': { quota: 0, official: 0, probation: 0, resigned: 0 },
        'Viet': { quota: 0, official: 0, probation: 0, resigned: 0 },
        'XemSon': { quota: 0, official: 0, probation: 0, resigned: 0 },
        'VPSM': { quota: 0, official: 0, probation: 0, resigned: 0 },
        'ITSS': { quota: 0, official: 0, probation: 0, resigned: 0 },
        'VPVPS': { quota: 0, official: 0, probation: 0, resigned: 0 }
    };

    let currentHrCompany = '';
    for (let i = 1; i < rows.length; i++) {
        const row = rows[i];
        if (!row) continue;
        if (row[1]) {
            const mapped = companyIdMap[row[1]];
            if (mapped) currentHrCompany = mapped;
        }
        if (!currentHrCompany && row[0] && companyIdMap[row[0]]) {
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
            hrByCompany[cId].quota += cuoiky;
        }
    }
    
    console.log('Result:');
    for (const [k, v] of Object.entries(hrByCompany)) {
        if (v.quota > 0 || v.official > 0 || v.resigned > 0) {
            console.log(k + ': official=' + v.official + ' probation=' + v.probation + ' resigned=' + v.resigned + ' quota=' + v.quota);
        }
    }
});
