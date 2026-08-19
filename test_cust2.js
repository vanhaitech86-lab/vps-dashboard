global.document = {
    addEventListener: () => {},
    querySelector: () => { return { innerHTML: '' } },
    getElementById: () => { return { innerText: '', textContent: '' } }
};
global.window = {
    ChartManager: {
        createChart: () => {}
    },
    DataService: {
        getCustomersData: async () => {
            const dataJs = require('fs').readFileSync('js/data.js', 'utf8');
            let match = dataJs.match(/matrix:\s*(\{[\s\S]*?\})\s*,\s*hr:/);
            let matrixData = JSON.parse(match[1]);
            return {
                total: 12450,
                matrix: matrixData
            }
        }
    }
};

require('./js/customers.js');

(async () => {
    try {
        await window.CustomersModule.loadData('month', 'all');
        console.log('Success test');
    } catch(e) {
        console.error(e);
    }
})();
