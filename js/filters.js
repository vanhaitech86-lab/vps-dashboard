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
                this.currentCompany = e.target.value;
                this.triggerFilterChange();
            });
        }
    },

    updateCompanyFilterVisibility(user) {
        const container = document.getElementById('company-filter-container');
        const select = document.getElementById('company-filter');
        
        if (user.role.canViewAll) {
            container.classList.remove('hidden');
            // Show all options
            Array.from(select.options).forEach(opt => opt.disabled = false);
            select.value = 'all';
            this.currentCompany = 'all';
        } else {
            // For lower roles, force select their company and hide filter or disable others
            container.classList.remove('hidden');
            Array.from(select.options).forEach(opt => {
                if (opt.value !== user.company && opt.value !== 'all') {
                    opt.disabled = true;
                }
            });
            select.value = user.company;
            this.currentCompany = user.company;
            
            // If they can't even see 'all' data for their company (like staff), you might hide it entirely
            if(user.role.level > 3) {
                 container.classList.add('hidden');
            }
        }
    },

    triggerFilterChange() {
        // Dispatch custom event that dashboard modules will listen to
        const event = new CustomEvent('vps_filter_changed', { 
            detail: { period: this.currentPeriod, company: this.currentCompany }
        });
        document.dispatchEvent(event);
    }
};
