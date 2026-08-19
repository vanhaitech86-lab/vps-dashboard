global.document = {
    addEventListener: () => {},
    querySelector: () => { return { innerHTML: '', style: {} } },
    getElementById: (id) => { return { innerText: '', textContent: '', style: {} } },
    querySelectorAll: () => { return [] }
};

const dataJs = require('fs').readFileSync('js/data.js', 'utf8');

global.window = {
    ChartManager: {
        createChart: () => {}
    },
    DataService: {
        getCustomersData: async () => {
            return {
                total: 12450,
                byCompany: { 'all': { service: 10, rental: 10, distribution: 10, new: 5, lost: -2, decreased: -1 } }
            }
        },
        getRevenueData: async () => {
            return {
                byCompany: { 'all': { plan: 100, actual: 80 } }, comparison: { currentYear: [], lastYear: [] }
            }
        },
        getDebtData: async () => {
            return {
                byCompany: { 'all': { inTerm: 50, overdue: 20, badDebt: 5 } }
            }
        },
        getInventoryData: async () => {
            return {
                total: 80,
                byCompany: { 'all': { brands: { 'HP': 10 } } }
            }
        }
    }
};

require('./js/overview.js');

(async () => {
    try {
        await window.OverviewModule.loadData('month', 'all');
        console.log('Success test');
    } catch(e) {
        console.error(e);
    }
})();
