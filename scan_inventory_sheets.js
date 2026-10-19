const https = require('https');
const fs = require('fs');

const COMPANY_SHEETS = {
    'THH':    { name: 'Tân Hồng Hà',   id: '1TP2ISnfspKYLuN7U9eETeggBMWkQbaRl_G1X8juCePY' },
    'Viet':   { name: 'Việt',         id: '1Pp7HC4cgUVAM69DDOGTvRct0kRiJ8hqNRj5K339xH4o' },
    'XemSon': { name: 'Xem Sơn',       id: '1yXyzTKccGWQSn0mCNFmxPkHyx5auTwQw2SZcngPNIFg' },
    'VPSM':   { name: 'VPS M',         id: '13o7mqOd_30DbYqRhF18qn_yTqno3FzAWeqZDJ6nVTFA' },
    'ITSS':   { name: 'ITSS',          id: '1JHGl2WSw8zezqWXSIJrKHWYpnW8nIatedn4UbzPilVM' },
    'VPVPS':  { name: 'Văn phòng VPS', id: '1pHdTs3sM3RMF1ST6eWenuo947hG66V_kLU6FupNJZcE' },
};

function fetchUrl(url) {
    return new Promise((resolve, reject) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location).then(resolve).catch(reject);
            }
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => resolve({ status: res.statusCode, body: data }));
        }).on('error', reject);
    });
}

function parseCSV(text) {
    const lines = [];
    let row = [];
    let cell = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
        const c = text[i];
        const next = text[i + 1];
        if (c === '"') {
            if (inQuotes && next === '"') { cell += '"'; i++; }
            else { inQuotes = !inQuotes; }
        } else if (c === ',' && !inQuotes) {
            row.push(cell.trim()); cell = '';
        } else if ((c === '\r' || c === '\n') && !inQuotes) {
            if (c === '\r' && next === '\n') i++;
            row.push(cell.trim());
            if (row.some(x => x !== '')) lines.push(row);
            row = []; cell = '';
        } else {
            cell += c;
        }
    }
    if (cell || row.length > 0) {
        row.push(cell.trim());
        if (row.some(x => x !== '')) lines.push(row);
    }
    return lines;
}

async function main() {
    const results = {};
    const candidateTabNames = [
        'Tồn kho', 'Tồn Kho', '4. Tồn kho', '4. Tồn Kho', 'Báo cáo tồn kho', 'BÁO CÁO TỒN KHO',
        'TỒN KHO', 'Ton kho', 'Ton Kho', '4.Ton kho', '4.Ton Kho'
    ];

    for (const [code, info] of Object.entries(COMPANY_SHEETS)) {
        console.log(`\n================== Checking ${code} (${info.name}) [${info.id}] ==================`);
        results[code] = { found: false, tab: null, rows: [] };

        for (const tabName of candidateTabNames) {
            const url = `https://docs.google.com/spreadsheets/d/${info.id}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(tabName)}&_t=${Date.now()}`;
            try {
                const res = await fetchUrl(url);
                if (res.status === 200 && res.body && !res.body.includes('<!DOCTYPE html>') && !res.body.includes('google-signin')) {
                    const csvRows = parseCSV(res.body);
                    if (csvRows.length > 0 && !csvRows[0].join(' ').includes('html')) {
                        console.log(`  -> FOUND TAB "${tabName}" with ${csvRows.length} rows`);
                        results[code] = {
                            found: true,
                            tab: tabName,
                            rows: csvRows
                        };
                        break;
                    }
                }
            } catch (e) {
                // ignore
            }
        }

        if (!results[code].found) {
            console.log(`  -> Tab not found with standard names. Checking gid=0 or inspecting sheet metadata...`);
            // Check gid=0 or default
            const url = `https://docs.google.com/spreadsheets/d/${info.id}/gviz/tq?tqx=out:csv&_t=${Date.now()}`;
            try {
                const res = await fetchUrl(url);
                if (res.status === 200 && res.body && !res.body.includes('<!DOCTYPE html>')) {
                    const csvRows = parseCSV(res.body);
                    console.log(`  -> Default sheet has ${csvRows.length} rows. First row:`, csvRows[0] ? csvRows[0].slice(0, 5) : 'empty');
                }
            } catch (e) {}
        }
    }

    fs.writeFileSync('inventory_scanned_raw.json', JSON.stringify(results, null, 2), 'utf8');
    console.log('\nWrote inventory_scanned_raw.json');
}

main().catch(console.error);
