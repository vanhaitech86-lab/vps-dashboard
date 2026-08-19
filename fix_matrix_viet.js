const fs = require('fs');

let code = fs.readFileSync('js/data.js', 'utf8');

// Evaluate the mockData
let sandbox = {};
eval(code.replace(/window\./g, 'sandbox.').replace('const mockData', 'sandbox.mockData'));

let matrix = sandbox.mockData.customers.matrix;

// Update 'Viet'
if (matrix['Viet'] && matrix['Viet']['phan_phoi']) {
    matrix['Viet']['phan_phoi']['dau']['kh'] = 1950;
    matrix['Viet']['phan_phoi']['cuoi']['kh'] = 1961;
}

// Update 'all'
if (matrix['all'] && matrix['all']['phan_phoi']) {
    matrix['all']['phan_phoi']['dau']['kh'] = 2790;
    matrix['all']['phan_phoi']['cuoi']['kh'] = 2853;
}

const newMatrixStr = JSON.stringify(matrix, null, 12);

const startIdx = code.indexOf('matrix: {');
const endIdx = code.indexOf('plan2026:', startIdx);
if (startIdx > -1 && endIdx > -1) {
    const beforePlan = code.substring(0, endIdx);
    const lastCommaIdx = beforePlan.lastIndexOf('},');
    if (lastCommaIdx > startIdx) {
        const replacement = 'matrix: ' + newMatrixStr + ',\n        ';
        const newCode = code.substring(0, startIdx) + replacement + code.substring(endIdx);
        fs.writeFileSync('js/data.js', newCode, 'utf8');
        console.log('Successfully updated Viet and all for phan_phoi.');
    }
}
