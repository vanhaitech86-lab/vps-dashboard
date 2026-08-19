const fs = require('fs');

let code = fs.readFileSync('js/data.js', 'utf8');

// Evaluate the mockData
let sandbox = {};
eval(code.replace(/window\./g, 'sandbox.').replace('const mockData', 'sandbox.mockData'));

let matrix = sandbox.mockData.customers.matrix;

const empty_data = {
    'thue_may': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    'mc': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    'dv_photo': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    'dv_may_in': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    'dv_khac': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    'phan_phoi': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}}
};

if (!matrix.ITSS) {
    matrix.ITSS = JSON.parse(JSON.stringify(empty_data));
}
if (!matrix.VPVPS) {
    matrix.VPVPS = JSON.parse(JSON.stringify(empty_data));
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
        console.log('Successfully injected ITSS and VPVPS.');
    }
}
