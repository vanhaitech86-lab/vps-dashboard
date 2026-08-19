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

require('./js/data.js');
require('./js/overview.js');

(async () => {
    try {
        await window.OverviewModule.loadData('month', 'Tân Hồng Hà');
        console.log('Success THH test');
    } catch(e) {
        console.error(e);
    }
})();
