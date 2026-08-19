const fs = require('fs');

let code = fs.readFileSync('js/data.js', 'utf8');

// Evaluate the mockData
let sandbox = {};
eval(code.replace(/window\./g, 'sandbox.').replace('const mockData', 'sandbox.mockData'));

let matrix = sandbox.mockData.customers.matrix;

const phan_phoi_data = {
    'all': {'dau': {'may': 0, 'kh': 1881}, 'tang': {'may': 0, 'kh': 64}, 'giam': {'may': 0, 'kh': 1}, 'cuoi': {'may': 0, 'kh': 1944}},
    'THH': {'dau': {'may': 0, 'kh': 358}, 'tang': {'may': 0, 'kh': 2}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 360}},
    'Viet': {'dau': {'may': 0, 'kh': 1041}, 'tang': {'may': 0, 'kh': 11}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 1052}},
    'XemSon': {'dau': {'may': 0, 'kh': 435}, 'tang': {'may': 0, 'kh': 29}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 464}},
    'VPSM': {'dau': {'may': 0, 'kh': 47}, 'tang': {'may': 0, 'kh': 22}, 'giam': {'may': 0, 'kh': 1}, 'cuoi': {'may': 0, 'kh': 68}},
    'ITSS': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
    'VPVPS': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}}
};

for (const comp in matrix) {
    if (!matrix[comp].phan_phoi) {
        matrix[comp].phan_phoi = phan_phoi_data[comp] || {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}};
    }
    if (!matrix[comp].dv_khac) {
        matrix[comp].dv_khac = {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}};
    }
}

const newMatrixStr = JSON.stringify(matrix, null, 12);

// Now we need to replace the old matrix with the new matrix in the string
// The easiest way is to find the bounds.
// The matrix is inside customers: { ... matrix: { ... }, plan2026: {
const startIdx = code.indexOf('matrix: {');
const endIdx = code.indexOf('plan2026:', startIdx);
if (startIdx > -1 && endIdx > -1) {
    // Find the last comma or brace before plan2026
    const beforePlan = code.substring(0, endIdx);
    const lastCommaIdx = beforePlan.lastIndexOf('},');
    if (lastCommaIdx > startIdx) {
        const replacement = 'matrix: ' + newMatrixStr + ',\n        ';
        const newCode = code.substring(0, startIdx) + replacement + code.substring(endIdx);
        fs.writeFileSync('js/data.js', newCode, 'utf8');
        console.log('Successfully injected phan_phoi and dv_khac into matrix.');
    } else {
        console.log('Failed to find end of matrix');
    }
} else {
    console.log('Failed to find matrix boundaries');
}

