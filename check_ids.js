const fs = require('fs');
const js = fs.readFileSync('js/overview.js', 'utf8');
const html = fs.readFileSync('index.html', 'utf8');

const matches = js.match(/getElementById\('([^']+)'\)/g);
if (matches) {
    for (const match of matches) {
        const id = match.match(/getElementById\('([^']+)'\)/)[1];
        if (!html.includes('id="' + id + '"') && !html.includes("id='" + id + "'")) {
            console.log("MISSING ID:", id);
        }
    }
}
