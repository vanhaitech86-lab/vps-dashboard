const fs = require('fs');
let content = fs.readFileSync('js/google_sheets.js', 'utf8');
content = content.replace(/const SHEET_ID = '[^']+';/, "const SHEET_ID = '18tWiuyHmvP_axcL_-yGmJj_rqo6Skqivf17WTuAJdwM';");
fs.writeFileSync('js/google_sheets.js', content);
