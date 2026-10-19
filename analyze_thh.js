const fs = require('fs');

const data = JSON.parse(fs.readFileSync('inventory_scanned_raw.json', 'utf8'));
const rows = data['THH'].rows;

console.log('Total THH rows:', rows.length);
console.log('Header:', rows[0]);

// Let's sample some rows across the 1375 items
console.log('\n--- Rows 1 to 20 ---');
rows.slice(1, 21).forEach((r, i) => console.log(i + 1, r[2], '|', r[3], '| SL:', r[5], '| Val:', r[6]));

console.log('\n--- Rows 500 to 520 ---');
rows.slice(500, 520).forEach((r, i) => console.log(i + 500, r[2], '|', r[3], '| SL:', r[5], '| Val:', r[6]));

console.log('\n--- Rows 1000 to 1020 ---');
rows.slice(1000, 1020).forEach((r, i) => console.log(i + 1000, r[2], '|', r[3], '| SL:', r[5], '| Val:', r[6]));

// Look for rows with large values (> 100M or similar)
console.log('\n--- Rows with largest values ---');
const withVals = rows.slice(1).map((r, i) => {
    const rawVal = (r[6] || '').toString().trim().replace(/[.,]/g, '');
    const val = parseFloat(rawVal) || 0;
    const sl = parseFloat((r[5] || '').toString().trim().replace(/[.,]/g, '')) || 0;
    return { idx: i + 1, code: r[2], name: r[3], unit: r[4], sl, val, rawVal: r[6] };
}).filter(x => x.val > 0).sort((a, b) => b.val - a.val);

console.log('Total rows with val > 0:', withVals.length);
console.log('Top 20 highest value items:');
withVals.slice(0, 20).forEach(x => console.log(`  Row ${x.idx}: ${x.name} (${x.code}) | SL: ${x.sl} | RawVal: "${x.rawVal}" -> ${x.val}`));
