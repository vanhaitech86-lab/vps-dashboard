import re

with open('js/data.js', 'r', encoding='utf-8') as f:
    js = f.read()

inventoryData = """inventory: {
        total: 69183.27, // Ty VND
        byCompany: {
            'all': {
                brands: { 'HP': 38534031075, 'Fujifilm': 22849479085, 'Olivetti': 550312253, 'Bonsai': 2398346934, 'Khác': 4960116121 },
                categories: {
                    'Máy': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Option/phần mềm': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Consumable': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Part': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Khác': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 0 },
                    'Tổng cộng': { 'HP': 38534031075, 'Fujifilm': 22849479085, 'Olivetti': 550312253, 'Bonsai': 2398346934, 'Khác': 4960116121, 'Cộng': 69183272352 }
                }
            },
            'Tân Hồng Hà': {
                brands: { 'HP': 19088136754, 'Fujifilm': 8744769719, 'Olivetti': 147356859, 'Bonsai': 1197169790, 'Khác': 1160336475 },
                categories: {
                    'Máy': { 'HP': 16236861538, 'Fujifilm': 2691167947, 'Olivetti': 145461859, 'Bonsai': 1196919790, 'Khác': 351112106, 'Cộng': 20621523240 },
                    'Option/phần mềm': { 'HP': 724129217, 'Fujifilm': 316631629, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 84155594, 'Cộng': 1124916440 },
                    'Consumable': { 'HP': 1697362872, 'Fujifilm': 3893921782, 'Olivetti': 595000, 'Bonsai': 0, 'Khác': 477185636, 'Cộng': 6069065290 },
                    'Part': { 'HP': 422875719, 'Fujifilm': 1842798361, 'Olivetti': 1300000, 'Bonsai': 250000, 'Khác': 232552257, 'Cộng': 2499776337 },
                    'Khác': { 'HP': 6907408, 'Fujifilm': 250000, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 15330882, 'Cộng': 22488290 },
                    'Tổng cộng': { 'HP': 19088136754, 'Fujifilm': 8744769719, 'Olivetti': 147356859, 'Bonsai': 1197169790, 'Khác': 1160336475, 'Cộng': 30567325628 }
                }
            },
            'Việt': {
                brands: { 'HP': 1464514898, 'Fujifilm': 565815358, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 2641297155 },
                categories: {
                    'Máy': { 'HP': 789169565, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 865846304, 'Cộng': 1655015869 },
                    'Option/phần mềm': { 'HP': 0, 'Fujifilm': 3770311, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 3770311 },
                    'Consumable': { 'HP': 671194009, 'Fujifilm': 407253157, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 1163183311, 'Cộng': 2241630477 },
                    'Part': { 'HP': 4151324, 'Fujifilm': 154791890, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 294985264, 'Cộng': 453928478 },
                    'Khác': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 317282276, 'Cộng': 317282276 },
                    'Tổng cộng': { 'HP': 1464514898, 'Fujifilm': 565815358, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 2641297155, 'Cộng': 4671627411 }
                }
            },
            'Xem Sơn': {
                brands: { 'HP': 16201444802, 'Fujifilm': 11217528088, 'Olivetti': 330260724, 'Bonsai': 1071775506, 'Khác': 819913344 },
                categories: {
                    'Máy': { 'HP': 8045068951, 'Fujifilm': 2429722467, 'Olivetti': 198937517, 'Bonsai': 1061511065, 'Khác': 162201573, 'Cộng': 11897441573 },
                    'Option/phần mềm': { 'HP': 5929018372, 'Fujifilm': 146022831, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 44239635, 'Cộng': 6119280838 },
                    'Consumable': { 'HP': 1887432428, 'Fujifilm': 6988196768, 'Olivetti': 131323207, 'Bonsai': 0, 'Khác': 481597314, 'Cộng': 9488549717 },
                    'Part': { 'HP': 339925051, 'Fujifilm': 1653586022, 'Olivetti': 0, 'Bonsai': 10264441, 'Khác': 126635862, 'Cộng': 2130411376 },
                    'Khác': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 5238960, 'Cộng': 5238960 },
                    'Tổng cộng': { 'HP': 16201444802, 'Fujifilm': 11217528088, 'Olivetti': 330260724, 'Bonsai': 1071775506, 'Khác': 819913344, 'Cộng': 29640922464 }
                }
            },
            'VPS M': {
                brands: { 'HP': 1779934621, 'Fujifilm': 2321365920, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khác': 338569147 },
                categories: {
                    'Máy': { 'HP': 691079773, 'Fujifilm': 712194005, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khác': 0, 'Cộng': 1605370086 },
                    'Option/phần mềm': { 'HP': 7499646, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 7499646 },
                    'Consumable': { 'HP': 1081355202, 'Fujifilm': 1479770277, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 2561125479 },
                    'Part': { 'HP': 0, 'Fujifilm': 129401638, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 0, 'Cộng': 129401638 },
                    'Khác': { 'HP': 0, 'Fujifilm': 0, 'Olivetti': 0, 'Bonsai': 0, 'Khác': 338569147, 'Cộng': 338569147 },
                    'Tổng cộng': { 'HP': 1779934621, 'Fujifilm': 2321365920, 'Olivetti': 72694670, 'Bonsai': 129401638, 'Khác': 338569147, 'Cộng': 4303396849 }
                }
            }
        }
    },
    hr: {"""

js = re.sub(r'inventory:\s*\{[\s\S]*?hr:\s*\{', inventoryData, js)

with open('js/data.js', 'w', encoding='utf-8') as f:
    f.write(js)

print("Injected inventory properly!")
