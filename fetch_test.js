const sheetId = '18tWiuyHmvP_axcL_-yGmJj_rqo6Skqivf17WTuAJdwM';
const sheetName = 'Nhân sự';
const url = \https://docs.google.com/spreadsheets/d/\/gviz/tq?tqx=out:csv&sheet=\\;
fetch(url).then(r => r.text()).then(text => console.log(text.substring(0, 500))).catch(e => console.error(e));
