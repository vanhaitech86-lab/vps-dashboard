const fs = require('fs');
const companyIdMap = {
    'Tân Hồng Hà': 'THH',
    'Việt': 'Viet',
    'Xem Sơn': 'XemSon',
    'VPS M': 'VPSM',
    'ITSS': 'ITSS',
    'Văn phòng VPS': 'VPVPS'
};
function parseNumber(val) {
    if (!val || val === '-') return 0;
    if (typeof val === 'number') return val;
    return parseFloat(val.toString().replace(/,/g, '')) || 0;
}
const hrCsv = [
  [ 'BÁO CÁO NHÂN SỰ Tháng/Năm', 'Công ty', 'Phòng ban', 'Tổng NV Đầu kỳ', 'Tuyển mới', 'Nghỉ việc', 'NV Thử việc', 'Tổng NV Cuối kỳ', '', '', '', '', '' ],
  [ '08/2026', 'Tân Hồng Hà', 'Kinh doanh', '48', '6', '3', '2', '54', '', '', '', '', '' ],
  [ '', '', 'Kỹ thuật', '', '', '', '', '', '', '', '', '', '' ],
  [ '', '', 'Kế toán', '', '', '', '', '', '', '', '', '', '' ],
  [ '', '', 'Hành chính', '', '', '', '', '', '', '', '', '', '' ],
  [ '', '', 'Kho/Giao vận', '', '', '', '', '', '', '', '', '', '' ],
  [ '08/2026', 'Việt', 'Kinh doanh', '39', '3', '0', '1', '', '', '', '', '', '' ]
];

let hrByCompany = {
    'THH': { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} },
    'Viet': { quota: 0, official: 0, probation: 0, resigned: 0, kpi: {A:0,B:0,C:0,D:0}, analysis: {cause:'', solution:''} }
};

let currentHrCompany = '';
for (let i = 1; i < hrCsv.length; i++) {
    const row = hrCsv[i];
    if (!row) continue;
    if (row[1]) {
        currentHrCompany = companyIdMap[row[1]] || currentHrCompany;
    } else if (row[0] && companyIdMap[row[0]]) {
        currentHrCompany = companyIdMap[row[0]];
    }
    
    if (!currentHrCompany) continue;
    
    const cId = currentHrCompany;
    const nghiviec = parseNumber(row[5]);
    const thuviec = parseNumber(row[6]);
    const cuoiky = parseNumber(row[7]);
    
    if (hrByCompany[cId]) {
        hrByCompany[cId].probation += thuviec;
        hrByCompany[cId].resigned += nghiviec;
        hrByCompany[cId].official += (cuoiky - thuviec);
        hrByCompany[cId].quota += cuoiky; // mock quota as cuoiky for now
    }
}
console.log(JSON.stringify(hrByCompany, null, 2));
