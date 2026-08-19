// We will test overview.js using actual data.js
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

require('./js/data.js'); // This will define window.DataService
require('./js/overview.js');

(async () => {
    try {
        await window.OverviewModule.loadData('month', 'all');
        console.log('Success real test');
    } catch(e) {
        console.error(e);
    }
})();
