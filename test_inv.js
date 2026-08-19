const fs = require('fs');

// Mock browser environment
global.window = {};
global.document = {
    addEventListener: () => {},
    getElementById: (id) => ({ innerText: '' }),
    querySelector: () => ({ innerHTML: '' })
};

eval(fs.readFileSync('js/data.js', 'utf8'));
// Now window.DataService is defined

eval(fs.readFileSync('js/inventory.js', 'utf8'));

// Test
window.DataService.getData = async function() {
    return window.DataService.mockData;
};
window.ChartManager = {
    renderChart: () => {}
}

window.InventoryModule.loadData('thang', 'all').then(() => {
    console.log("Success");
}).catch(err => {
    console.error(err);
});
