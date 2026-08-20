const fs = require('fs');
let js = fs.readFileSync('js/filters.js', 'utf8');

const newMethod = 
    updateCompanyFilterVisibility(user) {
        const container = document.getElementById('company-filter-container');
        const select = document.getElementById('company-filter');
        if (!container || !select) return;

        // Force it to be visible ALWAYS for debugging
        container.classList.remove('hidden');
        container.style.display = 'block';

        if (!user || !user.role) return;

        // Ensure we check canViewAll correctly even if role is a string
        let canViewAll = false;
        if (typeof user.role === 'object') {
            canViewAll = user.role.canViewAll;
        } else if (typeof user.role === 'string') {
            canViewAll = (user.role.toLowerCase() === 'ceo' || user.role.toLowerCase() === 'cso');
        }

        if (canViewAll) {
            // Show all options
            Array.from(select.options).forEach(opt => opt.disabled = false);
            select.value = 'all';
            this.currentCompany = 'all';
        } else {
            // For lower roles, force select their company and hide filter or disable others
            Array.from(select.options).forEach(opt => {
                if (opt.value !== user.company && opt.value !== 'all') {
                    opt.disabled = true;
                }
            });
            select.value = user.company;
            this.currentCompany = user.company;
            
            // If they can't even see 'all' data for their company (like staff), you might hide it entirely
            let level = typeof user.role === 'object' ? user.role.level : 99;
            if (level > 3) {
                 container.classList.add('hidden');
                 container.style.display = 'none';
            }
        }
    },
;

js = js.replace(/updateCompanyFilterVisibility\(user\) \{[\s\S]*?\}\s*,\s*triggerFilterChange/, newMethod.trim() + ',\n\n    triggerFilterChange');
fs.writeFileSync('js/filters.js', js, 'utf8');
