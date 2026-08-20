const fs = require('fs');
let code = fs.readFileSync('js/google_sheets.js', 'utf8');
code = code.replace(
    /let currentHrCompany = '';\s*for \(let i = 2; i < hrCsv.length; i\+\+\) {/,
    "let currentHrCompany = '';\n            for (let i = 1; i < hrCsv.length; i++) {"
);
fs.writeFileSync('js/google_sheets.js', code);
