/**
 * HR Module - Quản Trị Cơ Cấu & Định Biên Nhân Sự
 * Đáp ứng yêu cầu:
 * 1. Ghi nhận đầy đủ: Nhân sự chính thức, thử việc, nghỉ việc, cần tuyển
 * 2. Thể hiện rõ: Nhân sự chính thức / Định biên nhân sự
 * 3. Bỏ xếp loại KPI xuất sắc, khá, trung bình, yếu (loại bỏ A, B, C, D)
 */

window.HrModule = {
    init() {
        document.addEventListener('vps_filter_changed', (e) => {
            const hrView = document.getElementById('view-hr');
            if (hrView && !hrView.classList.contains('hidden')) {
                this.loadData(e.detail.period, e.detail.company);
            }
        });

        // Add listener for when view becomes active
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                if (item.dataset.target === 'hr') {
                    const currentCompany = window.FilterManager ? window.FilterManager.currentCompany : 'all';
                    const currentPeriod = window.FilterManager ? window.FilterManager.currentPeriod : 'month';
                    this.loadData(currentPeriod, currentCompany);
                }
            });
        });
    },

    async loadData(period, company) {
        const data = await window.DataService.getHrData(period, company);
        this.updateUI(data, company);
    },

    updateUI(data, company) {
        if (!data || !data.byCompany) return;

        const companyNameMap = {
            'all': 'Tất cả công ty',
            'THH': 'Tân Hồng Hà',
            'Viet': 'Việt',
            'XemSon': 'Xem Sơn',
            'VPSM': 'VPS M',
            'ITSS': 'ITSS',
            'VPVPS': 'Văn phòng VPS',
            'Văn phòng VPS': 'Văn phòng VPS'
        };

        const COMPANY_ORDER = ['THH', 'Viet', 'XemSon', 'VPSM', 'ITSS', 'VPVPS'];

        let dataKey = 'all';
        if (company === 'Tân Hồng Hà' || (company.includes('T') && company.includes('H'))) dataKey = 'THH';
        else if (company === 'Việt' || company.includes('Vi')) dataKey = 'Viet';
        else if (company === 'Xem Sơn' || company.includes('Xem')) dataKey = 'XemSon';
        else if (company === 'VPS M' || company.includes('VPS M')) dataKey = 'VPSM';
        else if (company === 'ITSS' || company.includes('ITSS')) dataKey = 'ITSS'; 
        else if (company !== 'all') dataKey = 'VPVPS';

        let tQuota = 0, tOfficial = 0, tProbation = 0, tResigned = 0, tVacancy = 0;
        let chartLabels = [], officialData = [], probationData = [], vacancyData = [], resignedData = [];
        let tableRows = [];
        let currentAnalysis = { cause: '', solution: '' };

        if (company === 'all') {
            // Xem toàn tập đoàn: hiển thị 6 đơn vị
            const processedKeys = new Set();
            COMPANY_ORDER.forEach(cId => {
                const compData = data.byCompany[cId] || data.byCompany[companyNameMap[cId]] || { quota: 0, official: 0, probation: 0, resigned: 0 };
                processedKeys.add(cId);
                const displayName = companyNameMap[cId] || cId;
                const quota = compData.quota || 0;
                const official = compData.official || 0;
                const probation = compData.probation || 0;
                const resigned = compData.resigned || 0;
                const vacancy = Math.max(0, quota - official);
                const fulfillment = quota > 0 ? Math.round((official / quota) * 100) : 0;

                tQuota += quota;
                tOfficial += official;
                tProbation += probation;
                tResigned += resigned;
                tVacancy += vacancy;

                chartLabels.push(displayName);
                officialData.push(official);
                probationData.push(probation);
                resignedData.push(resigned);
                vacancyData.push(vacancy);

                tableRows.push({
                    name: displayName,
                    quota,
                    official,
                    probation,
                    resigned,
                    vacancy,
                    fulfillment
                });
            });

            // Nếu có đơn vị nào khác trong byCompany chưa nằm trong COMPANY_ORDER
            for (const [cId, compData] of Object.entries(data.byCompany)) {
                if (processedKeys.has(cId) || cId === 'all' || cId === 'Văn phòng VPS' || cId === 'VPVPS') continue;
                processedKeys.add(cId);
                const displayName = companyNameMap[cId] || cId;
                const quota = compData.quota || 0;
                const official = compData.official || 0;
                const probation = compData.probation || 0;
                const resigned = compData.resigned || 0;
                const vacancy = Math.max(0, quota - official);
                const fulfillment = quota > 0 ? Math.round((official / quota) * 100) : 0;

                tQuota += quota;
                tOfficial += official;
                tProbation += probation;
                tResigned += resigned;
                tVacancy += vacancy;

                chartLabels.push(displayName);
                officialData.push(official);
                probationData.push(probation);
                resignedData.push(resigned);
                vacancyData.push(vacancy);

                tableRows.push({
                    name: displayName,
                    quota,
                    official,
                    probation,
                    resigned,
                    vacancy,
                    fulfillment
                });
            }

            const overallFulfillment = tQuota > 0 ? Math.round((tOfficial / tQuota) * 100) : 0;
            currentAnalysis.cause = `Toàn Tập đoàn có ${tOfficial} nhân sự chính thức trên định biên ${tQuota} người (${overallFulfillment}% định biên). Hiện có ${tProbation} nhân sự thử việc, ${tResigned} nhân sự nghỉ việc và cần tuyển bổ sung ${tVacancy} chỉ tiêu chính thức.`;
            currentAnalysis.solution = `Đẩy mạnh kế hoạch tuyển dụng ${tVacancy} nhân sự tại các đơn vị còn thiếu so với định biên (đặc biệt là khối Kinh doanh & Kỹ thuật); sát sao đánh giá nhân sự thử việc chuyển chính thức đúng tiến độ.`;

            const chartTitleEl = document.getElementById('hr-chart-title');
            if (chartTitleEl) chartTitleEl.textContent = 'Cơ Cấu Nhân Sự Theo Công Ty';
            const tableTitleEl = document.getElementById('hr-table-title');
            if (tableTitleEl) tableTitleEl.innerHTML = '<i data-lucide="users" style="width: 20px; height: 20px; color: var(--clr-primary);"></i> <span>Bảng Tổng Hợp Cơ Cấu & Định Biên Nhân Sự Toàn Tập Đoàn</span>';
            const tableSubEl = document.getElementById('hr-table-subtitle');
            if (tableSubEl) tableSubEl.textContent = 'Theo dõi định biên và tỷ lệ nhân sự chính thức của các đơn vị thành viên';

        } else {
            // Xem đơn vị cụ thể: hiển thị chi tiết các Phòng ban của đơn vị
            const compData = data.byCompany[dataKey] || data.byCompany[company] || data.byCompany['VPVPS'] || data.byCompany['Văn phòng VPS'];
            const compDisplayName = companyNameMap[company] || company;

            if (compData) {
                tQuota = compData.quota || 0;
                tOfficial = compData.official || 0;
                tProbation = compData.probation || 0;
                tResigned = compData.resigned || 0;
                tVacancy = Math.max(0, tQuota - tOfficial);

                currentAnalysis = compData.analysis ? { ...compData.analysis } : { 
                    cause: `Nhân sự chính thức đạt ${tOfficial}/${tQuota} định biên (${tQuota > 0 ? Math.round((tOfficial / tQuota) * 100) : 0}%).`, 
                    solution: 'Duy trì định biên và tiếp tục đào tạo nâng cao năng lực nhân sự.' 
                };

                const depts = (compData.departments && compData.departments.length > 0) ? compData.departments : [];

                if (depts.length > 0) {
                    depts.forEach(dept => {
                        const dQuota = dept.quota || 0;
                        const dOfficial = dept.official || 0;
                        const dProbation = dept.probation || 0;
                        const dResigned = dept.resigned || 0;
                        const dVacancy = dept.vacancy !== undefined ? dept.vacancy : Math.max(0, dQuota - dOfficial);
                        const dFulfillment = dQuota > 0 ? Math.round((dOfficial / dQuota) * 100) : 0;

                        chartLabels.push(dept.name);
                        officialData.push(dOfficial);
                        probationData.push(dProbation);
                        resignedData.push(dResigned);
                        vacancyData.push(dVacancy);

                        tableRows.push({
                            name: dept.name,
                            quota: dQuota,
                            official: dOfficial,
                            probation: dProbation,
                            resigned: dResigned,
                            vacancy: dVacancy,
                            fulfillment: dFulfillment
                        });
                    });
                } else {
                    // Fallback nếu công ty chưa có danh sách phòng ban chi tiết
                    chartLabels.push(compDisplayName);
                    officialData.push(tOfficial);
                    probationData.push(tProbation);
                    resignedData.push(tResigned);
                    vacancyData.push(tVacancy);

                    tableRows.push({
                        name: compDisplayName,
                        quota: tQuota,
                        official: tOfficial,
                        probation: tProbation,
                        resigned: tResigned,
                        vacancy: tVacancy,
                        fulfillment: tQuota > 0 ? Math.round((tOfficial / tQuota) * 100) : 0
                    });
                }
            }

            const chartTitleEl = document.getElementById('hr-chart-title');
            if (chartTitleEl) chartTitleEl.textContent = `Cơ Cấu Nhân Sự: ${compDisplayName}`;
            const tableTitleEl = document.getElementById('hr-table-title');
            if (tableTitleEl) tableTitleEl.innerHTML = `<i data-lucide="users" style="width: 20px; height: 20px; color: var(--clr-primary);"></i> <span>Bảng Chi Tiết Cơ Cấu & Định Biên: ${compDisplayName}</span>`;
            const tableSubEl = document.getElementById('hr-table-subtitle');
            if (tableSubEl) tableSubEl.textContent = `Theo dõi chi tiết số lượng nhân sự theo từng bộ phận chuyên môn`;
        }

        // 1. Cập nhật 5 thẻ KPI đầu trang
        const fulfillment = tQuota > 0 ? Math.round((tOfficial / tQuota) * 100) : 0;

        const hrOfficialEl = document.getElementById('hr-official');
        if (hrOfficialEl) hrOfficialEl.textContent = tOfficial.toLocaleString();

        const hrQuotaEl = document.getElementById('hr-quota');
        if (hrQuotaEl) hrQuotaEl.textContent = tQuota.toLocaleString();

        const hrFulfillmentEl = document.getElementById('hr-fulfillment');
        if (hrFulfillmentEl) hrFulfillmentEl.textContent = `Đạt ${fulfillment}% định biên`;

        const barEl = document.getElementById('hr-fulfillment-bar');
        if (barEl) {
            barEl.style.width = Math.min(fulfillment, 100) + '%';
            barEl.style.backgroundColor = fulfillment >= 90 ? '#10B981' : (fulfillment >= 75 ? '#F59E0B' : '#EF4444');
        }

        const hrOfficialCardEl = document.getElementById('hr-official-card');
        if (hrOfficialCardEl) hrOfficialCardEl.textContent = tOfficial.toLocaleString();

        const hrProbationEl = document.getElementById('hr-probation');
        if (hrProbationEl) hrProbationEl.textContent = tProbation.toLocaleString();

        const hrResignedEl = document.getElementById('hr-resigned');
        if (hrResignedEl) hrResignedEl.textContent = tResigned.toLocaleString();

        const hrVacancyEl = document.getElementById('hr-vacancy');
        if (hrVacancyEl) hrVacancyEl.textContent = tVacancy.toLocaleString();

        // 2. Cập nhật Biểu đồ cột ngang Cơ Cấu Nhân Sự (hrStructureChart)
        const chartData = {
            labels: chartLabels,
            datasets: [
                {
                    label: 'Chính thức',
                    data: officialData,
                    backgroundColor: '#1B2A4A',
                },
                {
                    label: 'Thử việc',
                    data: probationData,
                    backgroundColor: '#F59E0B',
                },
                {
                    label: 'Cần tuyển',
                    data: vacancyData,
                    backgroundColor: '#3B82F6',
                },
                {
                    label: 'Đã nghỉ việc',
                    data: resignedData,
                    backgroundColor: '#EF4444',
                }
            ]
        };

        window.ChartManager.createChart('hrStructureChart', 'bar', chartData, {
            animation: false,
            responsive: true,
            maintainAspectRatio: false,
            indexAxis: 'y', // Biểu đồ cột ngang
            scales: {
                x: { 
                    stacked: true,
                    grid: { color: '#F1F5F9' },
                    ticks: { font: { size: 11 } }
                },
                y: { 
                    stacked: true,
                    grid: { display: false },
                    ticks: { font: { size: 12, weight: '600' } }
                }
            },
            plugins: {
                legend: { 
                    position: 'top',
                    labels: { boxWidth: 14, font: { size: 12 } }
                },
                tooltip: { mode: 'index', intersect: false },
                datalabels: {
                    color: function(context) {
                        return '#ffffff';
                    },
                    font: { weight: 'bold', size: 11 },
                    formatter: function(value) {
                        return value > 0 ? value : '';
                    }
                }
            }
        });

        // 3. Render Bảng chi tiết cơ cấu & định biên
        const tbody = document.getElementById('hr-breakdown-tbody');
        const tfoot = document.getElementById('hr-breakdown-tfoot');

        if (tbody) {
            tbody.innerHTML = tableRows.map(row => {
                let badgeBg = '#DCFCE7', badgeColor = '#15803D', barColor = '#10B981';
                if (row.fulfillment < 75) {
                    badgeBg = '#FEE2E2'; badgeColor = '#B91C1C'; barColor = '#EF4444';
                } else if (row.fulfillment < 90) {
                    badgeBg = '#FEF3C7'; badgeColor = '#B45309'; barColor = '#F59E0B';
                }

                return `
                    <tr style="border-bottom: 1px solid #F1F5F9;">
                        <td style="padding: 12px 16px; font-weight: 600; color: #1E293B;">
                            <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #2563EB; margin-right: 8px;"></span>
                            ${row.name}
                        </td>
                        <td style="padding: 12px 16px; text-align: right; color: #475569; font-weight: 500;">${row.quota.toLocaleString()}</td>
                        <td style="padding: 12px 16px; text-align: right; font-weight: 600; color: #1B2A4A;">${row.official.toLocaleString()}</td>
                        <td style="padding: 12px 16px; text-align: right; color: #D97706; font-weight: 600;">${row.probation.toLocaleString()}</td>
                        <td style="padding: 12px 16px; text-align: right; color: #DC2626; font-weight: 600;">${row.resigned.toLocaleString()}</td>
                        <td style="padding: 12px 16px; text-align: right; color: #2563EB; font-weight: 600;">${row.vacancy.toLocaleString()}</td>
                        <td style="padding: 12px 16px; text-align: center;">
                            <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                                <div style="flex: 1; max-width: 85px; background: #E2E8F0; height: 8px; border-radius: 4px; overflow: hidden;">
                                    <div style="width: ${Math.min(row.fulfillment, 100)}%; background: ${barColor}; height: 100%; border-radius: 4px;"></div>
                                </div>
                                <span class="badge" style="background: ${badgeBg}; color: ${badgeColor}; font-size: 0.78rem; padding: 2px 8px; border-radius: 12px; font-weight: 600; min-width: 48px;">${row.fulfillment}%</span>
                            </div>
                        </td>
                    </tr>
                `;
            }).join('');
        }

        if (tfoot) {
            let overallBadgeBg = '#DCFCE7', overallBadgeColor = '#15803D', overallBarColor = '#10B981';
            if (fulfillment < 75) {
                overallBadgeBg = '#FEE2E2'; overallBadgeColor = '#B91C1C'; overallBarColor = '#EF4444';
            } else if (fulfillment < 90) {
                overallBadgeBg = '#FEF3C7'; overallBadgeColor = '#B45309'; overallBarColor = '#F59E0B';
            }

            tfoot.innerHTML = `
                <tr>
                    <td style="padding: 14px 16px; font-weight: bold; color: #0F172A; text-transform: uppercase;">
                        <span style="display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #0F172A; margin-right: 8px;"></span>
                        TỔNG CỘNG
                    </td>
                    <td style="padding: 14px 16px; text-align: right; font-weight: bold; color: #0F172A;">${tQuota.toLocaleString()}</td>
                    <td style="padding: 14px 16px; text-align: right; font-weight: bold; color: #1B2A4A;">${tOfficial.toLocaleString()}</td>
                    <td style="padding: 14px 16px; text-align: right; font-weight: bold; color: #D97706;">${tProbation.toLocaleString()}</td>
                    <td style="padding: 14px 16px; text-align: right; font-weight: bold; color: #DC2626;">${tResigned.toLocaleString()}</td>
                    <td style="padding: 14px 16px; text-align: right; font-weight: bold; color: #2563EB;">${tVacancy.toLocaleString()}</td>
                    <td style="padding: 14px 16px; text-align: center;">
                        <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                            <div style="flex: 1; max-width: 85px; background: #CBD5E1; height: 8px; border-radius: 4px; overflow: hidden;">
                                <div style="width: ${Math.min(fulfillment, 100)}%; background: ${overallBarColor}; height: 100%; border-radius: 4px;"></div>
                            </div>
                            <span class="badge" style="background: ${overallBadgeBg}; color: ${overallBadgeColor}; font-size: 0.8rem; padding: 2px 8px; border-radius: 12px; font-weight: bold; min-width: 48px;">${fulfillment}%</span>
                        </div>
                    </td>
                </tr>
            `;
        }

        // 4. Cập nhật Tình trạng & Đề xuất giải pháp
        const causeEl = document.getElementById('hr-analysis-cause');
        if (causeEl) causeEl.textContent = currentAnalysis.cause;
        const solutionEl = document.getElementById('hr-analysis-solution');
        if (solutionEl) solutionEl.textContent = currentAnalysis.solution;

        // 5. Re-render Lucide icons
        if (window.lucide) window.lucide.createIcons();
    }
};


