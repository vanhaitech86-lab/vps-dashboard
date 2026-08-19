// Simple DOM mock
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
            return {
                total: 12450,
                matrix: {
                    'all': {
                        'thue_may': {'dau': {'may': 1938, 'kh': 601}, 'tang': {'may': 45, 'kh': 12}, 'giam': {'may': 21, 'kh': 4}, 'cuoi': {'may': 1962, 'kh': 609}},
                        'mc': {'dau': {'may': 396, 'kh': 207}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 10, 'kh': 2}, 'cuoi': {'may': 386, 'kh': 205}},
                        'dv_photo': {'dau': {'may': 3317, 'kh': 1096}, 'tang': {'may': 4, 'kh': 4}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 3330, 'kh': 1099}},
                        'dv_may_in': {'dau': {'may': 1939, 'kh': 285}, 'tang': {'may': 2, 'kh': 2}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 1948, 'kh': 289}},
                        'dv_khac': {'dau': {'may': 0, 'kh': 0}, 'tang': {'may': 0, 'kh': 0}, 'giam': {'may': 0, 'kh': 0}, 'cuoi': {'may': 0, 'kh': 0}},
                    }
                }
            }
        }
    }
};

require('./js/customers.js');

(async () => {
    try {
        await window.CustomersModule.loadData('month', 'all');
        console.log('Success');
    } catch(e) {
        console.error(e);
    }
})();
