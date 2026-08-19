global.document = {
    addEventListener: () => {},
    querySelector: () => { return { innerHTML: '', style: {} } },
    getElementById: (id) => { return { innerText: '', textContent: '', style: {} } },
    querySelectorAll: () => { return [] }
};
global.window = {
    ChartManager: {
        createChart: (id, type, data) => {
            console.log("Chart created:", id, type);
        }
    }
};

require('./js/data.js');
require('./js/customers.js');

(async () => {
    try {
        await window.CustomersModule.loadData('month', 'all');
        console.log('Success customers test');
    } catch(e) {
        console.error(e);
    }
})();
