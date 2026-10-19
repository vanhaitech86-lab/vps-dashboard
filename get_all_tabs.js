const https = require('https');

const COMPANY_SHEETS = {
    'THH': '1TP2ISnfspKYLuN7U9eETeggBMWkQbaRl_G1X8juCePY',
    'Viet': '1Pp7HC4cgUVAM69DDOGTvRct0kRiJ8hqNRj5K339xH4o',
    'XemSon': '1yXyzTKccGWQSn0mCNFmxPkHyx5auTwQw2SZcngPNIFg',
    'VPSM': '13o7mqOd_30DbYqRhF18qn_yTqno3FzAWeqZDJ6nVTFA',
    'ITSS': '1JHGl2WSw8zezqWXSIJrKHWYpnW8nIatedn4UbzPilVM',
    'VPVPS': '1pHdTs3sM3RMF1ST6eWenuo947hG66V_kLU6FupNJZcE'
};

function fetchText(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchText(res.headers.location).then(resolve);
            }
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve(data));
        }).on('error', () => resolve(''));
    });
}

async function getTabs(id) {
    const html = await fetchText('https://docs.google.com/spreadsheets/d/' + id + '/htmlview');
    const tabs = [];
    const regex = /<li id="sheet-button-(\d+)"[^>]*><a[^>]*>([^<]+)<\/a>/g;
    let m;
    while ((m = regex.exec(html)) !== null) {
        tabs.push({ gid: m[1], name: m[2].trim() });
    }
    return tabs;
}

(async () => {
    for (const [k, id] of Object.entries(COMPANY_SHEETS)) {
        const tabs = await getTabs(id);
        console.log(`\n=== ${k} [${id}] ===`);
        tabs.forEach(t => console.log(`  gid: ${t.gid.padEnd(10)} | ${t.name}`));
    }
})();
