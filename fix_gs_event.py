import codecs

with codecs.open('js/google_sheets.js', 'r', 'utf-8') as f:
    content = f.read()

content = content.replace('''                    // Bind event listener
                    selectEl.addEventListener('change', (e) => {
                        const newMonth = e.target.value;
                        window.mockData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(newMonth);
                        // Re-render customers table
                        if (window.CustomersModule && typeof window.CustomersModule.renderDetailTable === 'function') {
                            const activeCompany = document.getElementById('company-filter').value;
                            const internalComp = (activeCompany && activeCompany !== 'all') ? companyNameMap[activeCompany] || 'all' : 'all';
                            window.CustomersModule.renderDetailTable(internalComp);
                        }
                    });''', '''                    // Bind event listener
                    selectEl.addEventListener('change', (e) => {
                        const newMonth = e.target.value;
                        window.mockData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(newMonth);
                        // Re-trigger global filter to re-render UI
                        if(window.FilterManager) window.FilterManager.triggerFilterChange();
                    });''')

with codecs.open('js/google_sheets.js', 'w', 'utf-8') as f:
    f.write(content)
