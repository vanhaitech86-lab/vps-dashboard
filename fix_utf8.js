const fs = require('fs');

let js = fs.readFileSync('js/data.js', 'utf8');

let match = js.match(/customers:\s*\{[\s\S]*?byCompany:\s*\{\s*'([^']+)'[\s\S]*?'([^']+)'[\s\S]*?'([^']+)'[\s\S]*?'([^']+)'/);
let keyTHH = match ? match[1] : 'Tân Hồng Hà';
let keyViet = match ? match[2] : 'Việt';
let keyXemSon = match ? match[3] : 'Xem Sơn';
let keyVPSM = match ? match[4] : 'VPS M';

const inventoryData = `inventory: {
        total: 69183.27, // Ty VND
        byCompany: {
            'all': {
                brands: { 'HP': 38534031075, 'Fujifilm': 22849479085, 'Olivetti': 550312253, 'Bonsai': 2398346934, 'Khac': 4960116121 },
                categories: {
                    'May': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Option': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Consumable': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Part': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Khac': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 0 },
                    'Tong': { 'HP': 38534031075, 'Fujifilm': 22849479085, 'Olivetti': 550312253, 'Bonsai': 2398346934, 'Khac': 4960116121, 'Cong': 69183272352 }
                }
            },
            '` + keyTHH + `': {
                brands: { 'HP': 19088136754, 'Fujifilm': 8744769719, 'Olivetti': 147356859, 'Bonsai': 1197169790, 'Khac': 1160336475 },
                categories: {
                    'May': { 'HP': 16236861538, 'Fujifilm': 2691167947, 'Olivetti': 145461859, 'Bonsai': 1196919790, 'Khac': 351112106, 'Cong': 20621523240 },
                    'Option': { 'HP': 724129217, 'Fujifilm': 316631629, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 84155594, 'Cong': 1124916440 },
                    'Consumable': { 'HP': 1697362872, 'Fujifilm': 3893921782, 'Olivetti': 595000, 'Bonsai': 0, 'Khac': 477185636, 'Cong': 6069065290 },
                    'Part': { 'HP': 422875719, 'Fujifilm': 1842798361, 'Olivetti': 1300000, 'Bonsai': 250000, 'Khac': 232552257, 'Cong': 2499776337 },
                    'Khac': { 'HP': 6907408, 'Fujifilm': 250000, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 15330882, 'Cong': 22488290 },
                    'Tong': { 'HP': 19088136754, 'Fujifilm': 8744769719, 'Olivetti': 147356859, 'Bonsai': 1197169790, 'Khac': 1160336475, 'Cong': 30567325628 }
                }
            },
            '` + keyViet + `': {
                brands: { 'HP': 1464514898, 'Fujifilm': 565815358, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 2641297155 },
                categories: {
                    'May': { 'HP': 789169565, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 865846304, 'Cong': 1655015869 },
                    'Option': { 'HP': 0, 'Fujifilm': 3770311, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 3770311 },
                    'Consumable': { 'HP': 671194009, 'Fujifilm': 407253157, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 1163183311, 'Cong': 2241630477 },
                    'Part': { 'HP': 4151324, 'Fujifilm': 154791890, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 294985264, 'Cong': 453928478 },
                    'Khac': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 317282276, 'Cong': 317282276 },
                    'Tong': { 'HP': 1464514898, 'Fujifilm': 565815358, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 2641297155, 'Cong': 4671627411 }
                }
            },
            '` + keyXemSon + `': {
                brands: { 'HP': 16201444802, 'Fujifilm': 11217528088, 'Olivetti': 330260724, 'Bonsai': 1071775506, 'Khac': 819913344 },
                categories: {
                    'May': { 'HP': 8045068951, 'Fujifilm': 2429722467, 'Olivetti': 198937517, 'Bonsai': 1061511065, 'Khac': 162201573, 'Cong': 11897441573 },
                    'Option': { 'HP': 5929018372, 'Fujifilm': 146022831, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 44239635, 'Cong': 6119280838 },
                    'Consumable': { 'HP': 1887432428, 'Fujifilm': 6988196768, 'Olivetti': 131323207, 'Bonsai': 0, 'Khac': 481597314, 'Cong': 9488549717 },
                    'Part': { 'HP': 339925051, 'Fujifilm': 1653586022, 'Olivetti': 0, 'Bonsai': 10264441, 'Khac': 126635862, 'Cong': 2130411376 },
                    'Khac': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 5238960, 'Cong': 5238960 },
                    'Tong': { 'HP': 16201444802, 'Fujifilm': 11217528088, 'Olivetti': 330260724, 'Bonsai': 1071775506, 'Khac': 819913344, 'Cong': 29640922464 }
                }
            },
            '` + keyVPSM + `': {
                brands: { 'HP': 1779934621, 'Fujifilm': 2321365920, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khac': 338569147 },
                categories: {
                    'May': { 'HP': 691079773, 'Fujifilm': 712194005, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khac': 0, 'Cong': 1605370086 },
                    'Option': { 'HP': 7499646, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 7499646 },
                    'Consumable': { 'HP': 1081355202, 'Fujifilm': 1479770277, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 2561125479 },
                    'Part': { 'HP': 0, 'Fujifilm': 129401638, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0, 'Cong': 129401638 },
                    'Khac': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 338569147, 'Cong': 338569147 },
                    'Tong': { 'HP': 1779934621, 'Fujifilm': 2321365920, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khac': 338569147, 'Cong': 4303396849 }
                }
            }
        }
    },
    hr: {`;

js = js.replace(/inventory:\s*\{[\s\S]*?hr:\s*\{/, inventoryData);
fs.writeFileSync('js/data.js', js, 'utf8');

// Update inventory.js
let invJs = fs.readFileSync('js/inventory.js', 'utf8');
invJs = invJs.replace(/compData\.categories\['Tổng cộng'\]\['Cộng'\]/g, "compData.categories['Tong']['Cong']");
invJs = invJs.replace(/'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0/g, "'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khac': 0");
invJs = invJs.replace(/'Khác': \{ 'HP': 0/g, "'Khac': { 'HP': 0");
invJs = invJs.replace(/'Tổng cộng':/g, "'Tong':");
invJs = invJs.replace(/'Cộng': 0/g, "'Cong': 0");
invJs = invJs.replace(/\['Máy', 'Option\/phần mềm', 'Consumable', 'Part', 'Khác'\]/g, "['May', 'Option', 'Consumable', 'Part', 'Khac']");

const tableMapping = `
            const catNames = { 'May': 'Máy', 'Option': 'Option/phần mềm', 'Consumable': 'Consumable', 'Part': 'Part', 'Khac': 'Khác' };
            for(const cat of ['May', 'Option', 'Consumable', 'Part', 'Khac']) {
                const cData = compData.categories[cat];
                html += \`<tr>
                    <td>\${catNames[cat]}</td>
                    <td style="text-align: right;">\${cData['HP'] ? cData['HP'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">\${cData['Fujifilm'] ? cData['Fujifilm'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">\${cData['Olivetti'] ? cData['Olivetti'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">\${cData['Bonsai'] ? cData['Bonsai'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right;">\${cData['Khac'] ? cData['Khac'].toLocaleString('vi-VN') : '-'}</td>
                    <td style="text-align: right; background: rgba(0,0,0,0.02); font-weight: bold;">\${cData['Cong'] ? cData['Cong'].toLocaleString('vi-VN') : '-'}</td>
                </tr>\`;
            }
`;

invJs = invJs.replace(/for\(const cat of \['May'.*?\n[\s\S]*?<\/tr>\`;\n            \}/, tableMapping.trim());

const totalRow = `const tData = compData.categories['Tong'];
            html += \`<tr style="font-weight: bold; background: #e2e8f0; border-top: 2px solid #cbd5e1;">
                <td>TỔNG CỘNG</td>
                <td style="text-align: right;">\${tData['HP'] ? tData['HP'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right;">\${tData['Fujifilm'] ? tData['Fujifilm'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right;">\${tData['Olivetti'] ? tData['Olivetti'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right;">\${tData['Bonsai'] ? tData['Bonsai'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right;">\${tData['Khac'] ? tData['Khac'].toLocaleString('vi-VN') : '-'}</td>
                <td style="text-align: right; color: #b91c1c;">\${tData['Cong'] ? tData['Cong'].toLocaleString('vi-VN') : '-'}</td>
            </tr>\`;`;

invJs = invJs.replace(/const tData = compData\.categories\['Tong'\];[\s\S]*?<\/tr>\`;/, totalRow);
fs.writeFileSync('js/inventory.js', invJs, 'utf8');
console.log("Done");
