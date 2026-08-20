const fs = require('fs');
let code = fs.readFileSync('js/google_sheets.js', 'utf8');

code = code.replace(
    /newData\.inventory = window\.mockData\.inventory;\s*newData\.hr = window\.mockData\.hr;/,
    "newData.inventory = window.mockData.inventory;\n            // newData.hr is now parsed from CSV, don't overwrite it!"
);

code = code.replace(
    /if \(newData\.customers\.total > 0\) \{\s*window\.mockData\.customers = newData\.customers;\s*\}/,
    "if (newData.customers.total > 0) {\n                window.mockData.customers = newData.customers;\n            }\n            if (Object.keys(newData.hr.byCompany).length > 0) {\n                window.mockData.hr = newData.hr;\n            }"
);

fs.writeFileSync('js/google_sheets.js', code);
