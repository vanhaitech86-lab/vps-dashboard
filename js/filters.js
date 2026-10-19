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
                const targetBtn = e.target.closest('.filter-btn');
                if (!targetBtn) return;
                const p = targetBtn.dataset.period || 'month';
                if (this.currentPeriod !== p) {
                    this.setPeriod(p);
                }
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

    setPeriod(period) {
        this.currentPeriod = period;
        const periodBtns = document.querySelectorAll('.filter-btn');
        periodBtns.forEach(b => {
            b.classList.toggle('active', b.dataset.period === period);
        });
        this.triggerFilterChange();
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

        // Hiển thị thông báo phản hồi nhanh trực quan
        const labelMap = {
            'day': 'Ngày (Bình quân 1 ngày làm việc)',
            'week': 'Tuần (Mặt cắt tiến độ theo tuần)',
            'month': 'Tháng (Kỳ báo cáo cả tháng)',
            'year': 'Năm (Lũy kế cả năm YTD)'
        };
        const periodText = labelMap[this.currentPeriod] || this.currentPeriod;
        this.showToast(`⏱️ Đang xem dữ liệu theo: ${periodText}`);
    },

    showToast(msg) {
        let toast = document.getElementById('vps-filter-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'vps-filter-toast';
            toast.style.cssText = 'position: fixed; bottom: 24px; right: 24px; z-index: 99999; background: #0f172a; color: #ffffff; padding: 10px 18px; border-radius: 8px; font-size: 0.84rem; font-weight: 600; box-shadow: 0 4px 14px rgba(0,0,0,0.25); border: 1px solid #334155; transition: opacity 0.3s ease; opacity: 0; pointer-events: none; display: flex; align-items: center; gap: 8px;';
            document.body.appendChild(toast);
        }
        toast.textContent = msg;
        toast.style.opacity = '1';
        clearTimeout(this._toastTimer);
        this._toastTimer = setTimeout(() => {
            if (toast) toast.style.opacity = '0';
        }, 2200);
    }
};
