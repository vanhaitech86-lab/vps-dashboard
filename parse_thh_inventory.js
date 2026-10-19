const fs = require('fs');

const data = JSON.parse(fs.readFileSync('inventory_scanned_raw.json', 'utf8'));
const rows = data['THH'].rows;

// Function to classify an item from THH
function classify(code, name) {
    const s = ((name || '') + ' ' + (code || '')).toLowerCase();

    // 1. Máy (Photocopy, Máy in, Máy scan, Máy fax...)
    if (s.includes('máy photocopy') || s.includes('máy in') || s.includes('máy scan') || s.includes('máy hủy') || s.includes('máy đếm tiền') || s.includes('màn hình')) {
        return 'Máy';
    }
    // 2. Option / phần mềm
    if (s.includes('bản quyền') || s.includes('tray module') || s.includes('khay giấy') || s.includes('bộ đảo mặt') || s.includes('finisher') || s.includes('dập ghim') || s.includes('option') || s.includes('phần mềm') || s.includes('card mạng')) {
        return 'Option/phần mềm';
    }
    // 3. Consumable (Mực, trống, bột từ, băng mực, chip mực, cartridge...)
    if (s.includes('mực') || s.includes('toner') || s.includes('trống') || s.includes('drum') || s.includes('bột từ') || s.includes('developer') || s.includes('băng mực') || s.includes('hộp mực') || s.includes('nhãn in')) {
        return 'Consumable';
    }
    // 4. Part (Linh kiện thay thế, bo mạch, bánh xe, bạc ép, trục, sấy, nguồn, motor, sensor, cụm...)
    if (s.includes('trục') || s.includes('bạc ép') || s.includes('bánh xe') || s.includes('bo mạch') || s.includes('sấy') || s.includes('fuser') || s.includes('nguồn') || s.includes('cụm') || s.includes('motor') || s.includes('cáp') || s.includes('cao su') || s.includes('ổ cứng') || s.includes('ram') || s.includes('băng tải') || s.includes('thanh gạt') || s.includes('gạt') || s.includes('sensor') || s.includes('attomat') || s.includes('pslv') || s.includes('nắp') || s.includes('chute') || s.includes('nam châm')) {
        return 'Part';
    }
    // 5. Dự án
    if (s.includes('dự án') || s.includes('gói thầu') || s.includes('hợp đồng')) {
        return 'Dự án';
    }
    // 6. Khác
    return 'Khác';
}

function classifyBrand(code, name) {
    const s = ((name || '') + ' ' + (code || '')).toLowerCase();
    if (s.includes('hp') || s.includes('laserjet') || s.includes('pagewide')) return 'HP';
    if (s.includes('fuji') || s.includes('xerox') || s.includes('apeos') || s.includes('docucentre')) return 'Fujifilm';
    if (s.includes('olivetti') || s.includes('vcopy') || s.includes('fullmax')) return 'Olivetti';
    if (s.includes('bonsai') || s.includes('bonsen') || s.includes('ain') || s.includes('aicon')) return 'Bonsai';
    return 'Khác';
}

const summary = {
    'Máy': { HP: { sl: 0, val: 0 }, Fujifilm: { sl: 0, val: 0 }, Olivetti: { sl: 0, val: 0 }, Bonsai: { sl: 0, val: 0 }, Khác: { sl: 0, val: 0 }, totalSL: 0, totalVal: 0 },
    'Option/phần mềm': { HP: { sl: 0, val: 0 }, Fujifilm: { sl: 0, val: 0 }, Olivetti: { sl: 0, val: 0 }, Bonsai: { sl: 0, val: 0 }, Khác: { sl: 0, val: 0 }, totalSL: 0, totalVal: 0 },
    'Consumable': { HP: { sl: 0, val: 0 }, Fujifilm: { sl: 0, val: 0 }, Olivetti: { sl: 0, val: 0 }, Bonsai: { sl: 0, val: 0 }, Khác: { sl: 0, val: 0 }, totalSL: 0, totalVal: 0 },
    'Part': { HP: { sl: 0, val: 0 }, Fujifilm: { sl: 0, val: 0 }, Olivetti: { sl: 0, val: 0 }, Bonsai: { sl: 0, val: 0 }, Khác: { sl: 0, val: 0 }, totalSL: 0, totalVal: 0 },
    'Dự án': { HP: { sl: 0, val: 0 }, Fujifilm: { sl: 0, val: 0 }, Olivetti: { sl: 0, val: 0 }, Bonsai: { sl: 0, val: 0 }, Khác: { sl: 0, val: 0 }, totalSL: 0, totalVal: 0 },
    'Khác': { HP: { sl: 0, val: 0 }, Fujifilm: { sl: 0, val: 0 }, Olivetti: { sl: 0, val: 0 }, Bonsai: { sl: 0, val: 0 }, Khác: { sl: 0, val: 0 }, totalSL: 0, totalVal: 0 },
};

let unvaluedCount = 0;
let totalRows = 0;

rows.slice(1).forEach(r => {
    totalRows++;
    const code = r[2] || '';
    const name = r[3] || '';
    const cat = classify(code, name);
    const brand = classifyBrand(code, name);
    const sl = parseFloat((r[5] || '').toString().trim().replace(/[.,]/g, '')) || 0;
    const rawVal = (r[6] || '').toString().trim().replace(/[.,]/g, '');
    const val = parseFloat(rawVal) || 0;

    if (val === 0 && sl > 0) unvaluedCount++;

    summary[cat][brand].sl += sl;
    summary[cat][brand].val += val;
    summary[cat].totalSL += sl;
    summary[cat].totalVal += val;
});

console.log('Total THH items processed:', totalRows);
console.log('Items with SL > 0 but Val = 0 (blank):', unvaluedCount);
console.log('\n--- THH SUMMARY BY CATEGORY ---');
for (const [cat, data] of Object.entries(summary)) {
    console.log(`\n[${cat}] -> Total SL: ${data.totalSL}, Total Val: ${data.totalVal.toLocaleString('vi-VN')} VNĐ`);
    console.log(`  HP:       SL ${data.HP.sl}, Val: ${data.HP.val.toLocaleString('vi-VN')}`);
    console.log(`  Fujifilm: SL ${data.Fujifilm.sl}, Val: ${data.Fujifilm.val.toLocaleString('vi-VN')}`);
    console.log(`  Olivetti: SL ${data.Olivetti.sl}, Val: ${data.Olivetti.val.toLocaleString('vi-VN')}`);
    console.log(`  Bonsai:   SL ${data.Bonsai.sl}, Val: ${data.Bonsai.val.toLocaleString('vi-VN')}`);
    console.log(`  Khác:     SL ${data.Khác.sl}, Val: ${data.Khác.val.toLocaleString('vi-VN')}`);
}
