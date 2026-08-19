import codecs

with codecs.open('js/google_sheets.js', 'r', 'utf-8') as f:
    content = f.read()

old_cust_logic = '''            let currentCompany = '';
            Object.values(companyIdMap).forEach(cId => { newData.customers.matrix[cId] = {}; });
            newData.customers.matrix['all'] = {};

            for (let i = 3; i < custCsv.length; i++) {
                const row = custCsv[i];
                if (row[0]) currentCompany = companyIdMap[row[0]];
                if (!currentCompany) continue;
                
                const catName = row[1];
                const catId = customerCatMap[catName];
                if(!catId) continue;

                const rowData = {
                    ke_hoach: { may: parseNumber(row[3]), kh: parseNumber(row[4]) },
                    dau: { may: parseNumber(row[5]), kh: parseNumber(row[6]) },
                    tang: { may: parseNumber(row[7]), kh: parseNumber(row[8]) },
                    giam: { may: parseNumber(row[9]), kh: parseNumber(row[10]) },
                    cuoi: { may: parseNumber(row[11]), kh: parseNumber(row[12]) }
                };
                
                newData.customers.matrix[currentCompany][catId] = rowData;
                
                if (!newData.customers.matrix['all'][catId]) {
                    newData.customers.matrix['all'][catId] = {dau:{may:0,kh:0}, tang:{may:0,kh:0}, giam:{may:0,kh:0}, cuoi:{may:0,kh:0}};
                }
                const allCat = newData.customers.matrix['all'][catId];
                allCat.dau.may += rowData.dau.may; allCat.dau.kh += rowData.dau.kh;
                allCat.tang.may += rowData.tang.may; allCat.tang.kh += rowData.tang.kh;
                allCat.giam.may += rowData.giam.may; allCat.giam.kh += rowData.giam.kh;
                allCat.cuoi.may += rowData.cuoi.may; allCat.cuoi.kh += rowData.cuoi.kh;
            }

            Object.keys(newData.customers.matrix).forEach(cId => {
                if (cId === 'all') return;
                const m = newData.customers.matrix[cId];
                let service = 0, rental = 0, distribution = 0;
                if(m.thue_may) rental += m.thue_may.cuoi.kh;
                if(m.mc) rental += m.mc.cuoi.kh;
                if(m.dv_photo) service += m.dv_photo.cuoi.kh;
                if(m.dv_may_in) service += m.dv_may_in.cuoi.kh;
                if(m.dv_khac) service += m.dv_khac.cuoi.kh;
                if(m.phan_phoi) distribution += m.phan_phoi.cuoi.kh;

                newData.customers.byCompany[cId] = {
                    service, rental, distribution, new: 0, lost: 0, decreased: 0
                };
            });
            
            const mAll = newData.customers.matrix['all'];
            for(let cat in mAll) {
                newData.customers.total += mAll[cat].cuoi.kh;
            }'''

new_cust_logic = '''            
            let currentCompany = '';
            let currentMonth = '';
            
            // We will parse all months into a temporary dictionary: monthsData[month][company][category]
            const monthsData = {};
            const availableMonths = new Set();

            for (let i = 3; i < custCsv.length; i++) {
                const row = custCsv[i];
                if (row[0]) {
                    // Try to extract month if it's there
                    // Because merged cells might leave month blank on subsequent rows, we keep track of it
                    const m = row[0].toString().trim();
                    // Basic regex to check if it's a month like 08/2026
                    if (m.includes('/')) {
                        currentMonth = m;
                        availableMonths.add(m);
                        currentCompany = companyIdMap[row[1]] || currentCompany;
                    } else if (companyIdMap[m]) {
                        // Sometimes column 0 is company if Month is omitted
                        currentCompany = companyIdMap[m];
                    }
                }
                
                // If the CSV structure is Month | Company | Category, 
                // and due to merges Month and Company might be in row[0] and row[1] only on the first row of a block
                let catName = row[2];
                // Handle case where Month is missing and everything shifted (if user unmerged)
                if(!catName && customerCatMap[row[1]]) {
                    catName = row[1];
                } else if(!catName && customerCatMap[row[0]]) {
                    catName = row[0];
                }

                if (!currentMonth) currentMonth = "08/2026"; // Fallback
                if (!currentCompany) continue;
                
                const catId = customerCatMap[catName];
                if(!catId) continue;

                const rowData = {
                    ke_hoach: { may: parseNumber(row[3]), kh: parseNumber(row[4]) },
                    dau: { may: parseNumber(row[5]), kh: parseNumber(row[6]) },
                    tang: { may: parseNumber(row[7]), kh: parseNumber(row[8]) },
                    giam: { may: parseNumber(row[9]), kh: parseNumber(row[10]) },
                    cuoi: { may: parseNumber(row[11]), kh: parseNumber(row[12]) }
                };
                
                if (!monthsData[currentMonth]) monthsData[currentMonth] = {};
                if (!monthsData[currentMonth][currentCompany]) monthsData[currentMonth][currentCompany] = {};
                monthsData[currentMonth][currentCompany][catId] = rowData;
            }

            // Expose the raw monthsData so the UI can filter it
            window.GoogleSheetsService.customersByMonth = monthsData;
            
            // Get the last month as default
            const sortedMonths = Array.from(availableMonths).sort();
            const defaultMonth = sortedMonths.length > 0 ? sortedMonths[sortedMonths.length - 1] : "08/2026";
            
            // Function to build standard mockData format from a specific month
            window.GoogleSheetsService.buildCustomerDataForMonth = function(month) {
                const targetData = monthsData[month] || {};
                const res = { total: 0, trend: window.mockData.customers.trend, matrix: {}, plan2026: window.mockData.customers.plan2026, byCompany: {} };
                
                Object.values(companyIdMap).forEach(cId => { res.matrix[cId] = targetData[cId] || {}; });
                res.matrix['all'] = {};

                // Aggregate 'all'
                Object.keys(res.matrix).forEach(cId => {
                    if (cId === 'all') return;
                    Object.keys(res.matrix[cId]).forEach(catId => {
                        if (!res.matrix['all'][catId]) {
                            res.matrix['all'][catId] = {
                                ke_hoach:{may:0,kh:0}, dau:{may:0,kh:0}, tang:{may:0,kh:0}, giam:{may:0,kh:0}, cuoi:{may:0,kh:0}
                            };
                        }
                        const r = res.matrix[cId][catId];
                        const a = res.matrix['all'][catId];
                        a.ke_hoach.may += r.ke_hoach?.may||0; a.ke_hoach.kh += r.ke_hoach?.kh||0;
                        a.dau.may += r.dau.may; a.dau.kh += r.dau.kh;
                        a.tang.may += r.tang.may; a.tang.kh += r.tang.kh;
                        a.giam.may += r.giam.may; a.giam.kh += r.giam.kh;
                        a.cuoi.may += r.cuoi.may; a.cuoi.kh += r.cuoi.kh;
                    });
                });

                Object.keys(res.matrix).forEach(cId => {
                    if (cId === 'all') return;
                    const m = res.matrix[cId];
                    let service = 0, rental = 0, distribution = 0;
                    if(m.thue_may) rental += m.thue_may.cuoi.kh;
                    if(m.mc) rental += m.mc.cuoi.kh;
                    if(m.dv_photo) service += m.dv_photo.cuoi.kh;
                    if(m.dv_may_in) service += m.dv_may_in.cuoi.kh;
                    if(m.dv_khac) service += m.dv_khac.cuoi.kh;
                    if(m.phan_phoi) distribution += m.phan_phoi.cuoi.kh;

                    res.byCompany[cId] = {
                        service, rental, distribution, new: 0, lost: 0, decreased: 0
                    };
                });
                
                const mAll = res.matrix['all'];
                for(let cat in mAll) {
                    res.total += mAll[cat].cuoi?.kh || 0;
                }
                return res;
            };

            // Set default month data into newData
            newData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(defaultMonth);
            
            // Populate Dropdown Options
            setTimeout(() => {
                const selectEl = document.getElementById('customers-month-filter');
                if (selectEl && sortedMonths.length > 0) {
                    selectEl.innerHTML = '';
                    sortedMonths.forEach(m => {
                        const opt = document.createElement('option');
                        opt.value = m;
                        opt.textContent = m;
                        if (m === defaultMonth) opt.selected = true;
                        selectEl.appendChild(opt);
                    });
                    
                    // Bind event listener
                    selectEl.addEventListener('change', (e) => {
                        const newMonth = e.target.value;
                        window.mockData.customers = window.GoogleSheetsService.buildCustomerDataForMonth(newMonth);
                        // Re-render customers table
                        if (window.CustomersModule && typeof window.CustomersModule.renderDetailTable === 'function') {
                            const activeCompany = document.getElementById('company-filter').value;
                            const internalComp = (activeCompany && activeCompany !== 'all') ? companyNameMap[activeCompany] || 'all' : 'all';
                            window.CustomersModule.renderDetailTable(internalComp);
                        }
                    });
                }
            }, 1000);
'''

content = content.replace(old_cust_logic, new_cust_logic)

with codecs.open('js/google_sheets.js', 'w', 'utf-8') as f:
    f.write(content)
