const https = require('https');

function fetchUrl(url) {
    return new Promise((resolve) => {
        https.get(url, (res) => {
            if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
                return fetchUrl(res.headers.location).then(resolve);
            }
            let data = '';
            res.on('data', c => data += c);
            res.on('end', () => resolve(data));
        }).on('error', () => resolve(''));
    });
}

async function inspect(id, name) {
    const html = await fetchUrl('https://docs.google.com/spreadsheets/d/' + id + '/edit');
    const matches = [...html.matchAll(/"name":"([^"]+)"/g)].map(m => m[1]);
    const cleanMatches = matches.filter(m => !m.includes('\\') && m.length < 50 && !m.startsWith('docs-'));
    console.log(`=== ${name} (${id}) ===`);
    console.log([...new Set(cleanMatches)]);
}

(async () => {
    await inspect('1TP2ISnfspKYLuN7U9eETeggBMWkQbaRl_G1X8juCePY', 'THH');
    await inspect('1Pp7HC4cgUVAM69DDOGTvRct0kRiJ8hqNRj5K339xH4o', 'Viet');
    await inspect('1yXyzTKccGWQSn0mCNFmxPkHyx5auTwQw2SZcngPNIFg', 'XemSon');
    await inspect('13o7mqOd_30DbYqRhF18qn_yTqno3FzAWeqZDJ6nVTFA', 'VPSM');
    await inspect('1JHGl2WSw8zezqWXSIJrKHWYpnW8nIatedn4UbzPilVM', 'ITSS');
    await inspect('1pHdTs3sM3RMF1ST6eWenuo947hG66V_kLU6FupNJZcE', 'VPVPS');
})();
