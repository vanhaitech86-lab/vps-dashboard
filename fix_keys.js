const fs = require('fs');

let dataJs = fs.readFileSync('js/data.js', 'utf8');

// The keys in my injected inventory data are perfect UTF8.
// I will just use index-based assignment.
// The companies in order are: Tân Hồng Hà, Việt, Xem Sơn, VPS M
// The actual keys in dataJs for customers.byCompany are:
// match yCompany:\s*\{\s*'([^']+)'

let match = dataJs.match(/customers:\s*\{[\s\S]*?byCompany:\s*\{\s*'([^']+)'[\s\S]*?'([^']+)'[\s\S]*?'([^']+)'[\s\S]*?'([^']+)'/);
if (match) {
    let keyTHH = match[1]; // Tân Hồng Hà
    let keyViet = match[2]; // Việt
    let keyXemSon = match[3]; // Xem Sơn
    let keyVPSM = match[4]; // VPS M
    
    // Now replace the utf8 keys in inventory with these exact keys
    // Because JS is reading them as some garbled utf8 strings, rewriting them will write the same garbled strings back.
    
    // First, let's find the inventory block
    // We can replace the exact literal 'Tân Hồng Hà' inside inventory.byCompany with keyTHH
    // But since the python script injected utf8, they appear as 'Tân Hồng Hà' in the utf8 decoded string!
    
    // Let's replace:
    dataJs = dataJs.replace(/'Tân Hồng Hà': \{(\s+brands:)/g, "'" + keyTHH + "': {");
    dataJs = dataJs.replace(/'Việt': \{(\s+brands:)/g, "'" + keyViet + "': {");
    dataJs = dataJs.replace(/'Xem Sơn': \{(\s+brands:)/g, "'" + keyXemSon + "': {");
    dataJs = dataJs.replace(/'VPS M': \{(\s+brands:)/g, "'" + keyVPSM + "': {");
    
    fs.writeFileSync('js/data.js', dataJs, 'utf8');
    console.log("Keys synced!");
} else {
    console.log("Could not find keys!");
}
