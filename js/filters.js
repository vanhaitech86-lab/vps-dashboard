/**
 * Time and Context Filters Management
 */

window.FilterManager = {
    currentPeriod: 'month',
    currentCompany: 'all',

    init() {
        // Setup Period Filter Listeners
        const periodBtns = document.querySelectorAll('.filter-btn');
        periodBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                periodBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentPeriod = e.target.dataset.period;
                this.triggerFilterChange();
            });
        });

        // Setup Company Filter Listeners
        const companySelect = document.getElementById('company-filter');
        if (companySelect) {
            companySelect.addEventListener('change', (e) => {
                if (!window.AuthService.canViewAll()) {
                    // Force strictly back to user's assigned company
                    this.currentCompany = window.AuthService.getAllowedCompany();
                    companySelect.value = this.currentCompany;
                } else {
                    this.currentCompany = e.target.value;
                }
                this.triggerFilterChange();
            });
        }
    },

    updateCompanyFilterVisibility(user) {
        const container = document.getElementById('company-filter-container');
        const select = document.getElementById('company-filter');
        if (!container || !select) return;

        container.classList.remove('hidden');
        container.style.display = 'block';

        if (!user) return;

        const canViewAll = window.AuthService.canViewAll();

        // Remove old locked badge if exists
        const oldBadge = document.getElementById('company-locked-badge');
        if (oldBadge) oldBadge.remove();

        if (canViewAll) {
            // Admin & CEO: full interactive dropdown with all companies
            select.innerHTML = `
                <option value="all">Tất cả công ty</option>
                <option value="Tân Hồng Hà">Tân Hồng Hà</option>
                <option value="Việt">Việt</option>
                <option value="Xem Sơn">Xem Sơn</option>
                <option value="VPS M">VPS M</option>
                <option value="ITSS">ITSS</option>
                <option value="Văn phòng VPS">Văn phòng VPS</option>
            `;
            select.disabled = false;
            select.style.background = '#ffffff';
            select.style.cursor = 'pointer';
            select.value = 'all';
            this.currentCompany = 'all';
        } else {
            // Member unit user: LOCK STRICTLY to user.company
            const comp = user.company || 'Tân Hồng Hà';
            select.innerHTML = `<option value="${comp}">${comp}</option>`;
            select.value = comp;
            select.disabled = true;
            select.style.background = '#f1f5f9';
            select.style.cursor = 'not-allowed';
            select.style.color = '#1e3a8a';
            select.style.fontWeight = '700';
            this.currentCompany = comp;

            // Visual security lock badge
            const badge = document.createElement('div');
            badge.id = 'company-locked-badge';
            badge.style.display = 'inline-flex';
            badge.style.alignItems = 'center';
            badge.style.gap = '6px';
            badge.style.marginLeft = '10px';
            badge.style.padding = '4px 12px';
            badge.style.borderRadius = '6px';
            badge.style.background = '#e0f2fe';
            badge.style.color = '#0369a1';
            badge.style.fontSize = '0.8rem';
            badge.style.fontWeight = '700';
            badge.style.border = '1px solid #bae6fd';
            badge.innerHTML = `🔒 Đơn vị: ${comp}`;
            container.parentNode.insertBefore(badge, container.nextSibling);
        }

        // Broadcast current filter state to all modules
        this.triggerFilterChange();
    },

    setCompany(comp) {
        if (!window.AuthService.canViewAll()) {
            this.currentCompany = window.AuthService.getAllowedCompany();
        } else {
            this.currentCompany = comp;
        }
        const select = document.getElementById('company-filter');
        if (select) select.value = this.currentCompany;
        this.triggerFilterChange();
    },

    triggerFilterChange() {
        const event = new CustomEvent('vps_filter_changed', { 
            detail: { period: this.currentPeriod, company: this.currentCompany }
        });
        document.dispatchEvent(event);
    }
};
