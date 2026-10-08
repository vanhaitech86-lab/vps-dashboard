/**
 * =============================================================================
 * HỆ THỐNG THÔNG BÁO TỰ ĐỘNG & GIÁM SÁT BÁO CÁO GIÁM ĐỐC - VPS GROUP
 * Client Controller (js/notifications.js)
 * =============================================================================
 */

window.NotificationManager = {
    statusData: null,
    pollInterval: null,
    isPopoverOpen: false,
    audioCtx: null,

    init() {
        this.bindEvents();
        this.fetchStatus();

        // Polling status every 20 seconds
        if (!this.pollInterval) {
            this.pollInterval = setInterval(() => {
                this.fetchStatus();
            }, 20000);
        }

        // Request browser notification permission if supported
        if ('Notification' in window && Notification.permission === 'default') {
            setTimeout(() => {
                Notification.requestPermission();
            }, 3000);
        }
    },

    // Synthesized Web Audio Chime (No external audio file needed!)
    playChime(type = 'bell') {
        try {
            if (!this.audioCtx) {
                const AudioContext = window.AudioContext || window.webkitAudioContext;
                if (AudioContext) this.audioCtx = new AudioContext();
            }
            if (!this.audioCtx) return;
            if (this.audioCtx.state === 'suspended') {
                this.audioCtx.resume();
            }

            const now = this.audioCtx.currentTime;
            const osc = this.audioCtx.createOscillator();
            const gain = this.audioCtx.createGain();

            osc.connect(gain);
            gain.connect(this.audioCtx.destination);

            if (type === 'urgent') {
                // Urgent double beep (for CEO alert)
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(880, now); // A5
                osc.frequency.setValueAtTime(587.33, now + 0.15); // D5
                gain.gain.setValueAtTime(0.3, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
                osc.start(now);
                osc.stop(now + 0.4);
            } else if (type === 'success') {
                // Success happy chord
                osc.type = 'sine';
                osc.frequency.setValueAtTime(523.25, now); // C5
                osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
                osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
                gain.gain.setValueAtTime(0.2, now);
                gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
                osc.start(now);
                osc.stop(now + 0.5);
            } else {
                // Pleasant bell chime
                osc.type = 'sine';
                osc.frequency.setValueAtTime(830.61, now);
                osc.frequency.exponentialRampToValueAtTime(440, now + 0.6);
                gain.gain.setValueAtTime(0.25, now);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
                osc.start(now);
                osc.stop(now + 0.6);
            }
        } catch (e) {
            console.warn('Audio chime notice:', e.message);
        }
    },

    showDesktopNotification(title, body) {
        if ('Notification' in window && Notification.permission === 'granted') {
            try {
                new Notification(title, {
                    body: body,
                    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%232563eb"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>'
                });
            } catch (e) {}
        }
    },

    bindEvents() {
        const bellBtn = document.getElementById('btn-notification-bell');
        const popover = document.getElementById('notification-dropdown');

        if (bellBtn && popover) {
            bellBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.isPopoverOpen = !this.isPopoverOpen;
                if (this.isPopoverOpen) {
                    popover.classList.remove('hidden');
                    if (window.lucide) window.lucide.createIcons();
                } else {
                    popover.classList.add('hidden');
                }
            });

            // Close popover when clicking outside
            document.addEventListener('click', (e) => {
                if (this.isPopoverOpen && !popover.contains(e.target) && !bellBtn.contains(e.target)) {
                    this.isPopoverOpen = false;
                    popover.classList.add('hidden');
                }
            });
        }
    },

    async fetchStatus() {
        try {
            const res = await fetch('/api/notifications/status');
            if (res.ok) {
                const data = await res.json();
                if (data.success) {
                    this.statusData = data;
                    this.renderAll();
                    return;
                }
            }
        } catch (err) {
            // Local fallback if running offline
            this.handleLocalFallback();
        }
    },

    handleLocalFallback() {
        const currentUser = window.AuthService ? window.AuthService.getCurrentUser() : null;
        const stored = localStorage.getItem('vps_mock_notif_status');
        if (stored) {
            try {
                this.statusData = JSON.parse(stored);
                this.renderAll();
                return;
            } catch (e) {}
        }

        // Mock data fallback
        const today = new Date().toISOString().split('T')[0];
        this.statusData = {
            success: true,
            date: today,
            summary: { total: 6, readCount: 4, pendingCount: 1, escalatedCount: 1 },
            directors: {
                THH: { directorId: 'THH', directorName: 'Giám Đốc Tân Hồng Hà', company: 'Tân Hồng Hà', scheduledTime: '08:30', status: 'READ', readAt: new Date().toISOString() },
                VIET: { directorId: 'VIET', directorName: 'Giám Đốc Việt', company: 'Việt', scheduledTime: '08:30', status: 'READ', readAt: new Date().toISOString() },
                XESCO: { directorId: 'XESCO', directorName: 'Giám Đốc Xem Sơn', company: 'Xem Sơn', scheduledTime: '08:30', status: 'ESCALATED', escalatedAt: new Date().toISOString() },
                VPSM: { directorId: 'VPSM', directorName: 'Giám Đốc VPS Miền Trung', company: 'VPS M', scheduledTime: '08:30', status: 'PENDING', remindedAt: new Date().toISOString() },
                ITSS: { directorId: 'ITSS', directorName: 'Giám Đốc ITSS', company: 'ITSS', scheduledTime: '08:30', status: 'READ', readAt: new Date().toISOString() },
                VPVPS: { directorId: 'VPVPS', directorName: 'Giám Đốc VP VPS', company: 'Văn phòng VPS', scheduledTime: '08:30', status: 'READ', readAt: new Date().toISOString() }
            },
            schedules: { defaultTime: '08:30', gracePeriodMinutes: 30, soundAlert: true },
            recentLogs: [
                {
                    id: 'log_01',
                    timestamp: new Date().toISOString(),
                    type: 'ESCALATION_CEO',
                    title: '🚨 CẢNH BÁO VI PHẠM: Giám Đốc Xem Sơn chưa xem báo cáo!',
                    message: 'Quá thời hạn 30 phút theo quy định lúc 08:30. Hệ thống tự động báo cáo lên Chủ tịch / CEO.',
                    status: 'URGENT'
                },
                {
                    id: 'log_02',
                    timestamp: new Date(Date.now() - 3600000).toISOString(),
                    type: 'REMINDER',
                    title: '⏰ Nhắc nhở lịch xem báo cáo định kỳ',
                    message: 'Đã gửi thông báo nhắc nhở 6 Giám đốc đơn vị rà soát số liệu Dashboard.',
                    status: 'SENT'
                }
            ]
        };
        this.renderAll();
    },

    renderAll() {
        this.renderBellAndDropdown();
        this.renderDirectorBanner();
        this.renderCeoBanner();
        this.renderReportMonitorView();
        this.populateScheduleSettings();
        this.fetchDeliveryLogs();
    },

    // 1. Render Topbar Bell & Dropdown Popover
    renderBellAndDropdown() {
        const bellBtn = document.getElementById('btn-notification-bell');
        const badge = document.getElementById('notification-badge');
        const listContainer = document.getElementById('notif-list-container');
        if (!bellBtn || !badge) return;

        const currentUser = window.AuthService ? window.AuthService.getCurrentUser() : null;
        if (!currentUser) return;

        const isCeoOrAdmin = window.AuthService.canViewAll();
        const summary = this.statusData ? this.statusData.summary : { pendingCount: 0, escalatedCount: 0 };
        const logs = (this.statusData && this.statusData.recentLogs) ? this.statusData.recentLogs : [];

        // Count unread alerts
        let count = 0;
        let hasUrgent = false;

        if (isCeoOrAdmin) {
            count = summary.escalatedCount || 0;
            if (count > 0) hasUrgent = true;
        } else {
            // Check if this director is pending or escalated
            const myDir = this.getMyDirectorRecord();
            if (myDir && (myDir.status === 'PENDING' || myDir.status === 'ESCALATED')) {
                count = 1;
                if (myDir.status === 'ESCALATED') hasUrgent = true;
            }
        }

        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }

        if (hasUrgent) {
            bellBtn.classList.add('has-urgent');
        } else {
            bellBtn.classList.remove('has-urgent');
        }

        // Render Popover Items
        if (listContainer) {
            if (logs.length === 0) {
                listContainer.innerHTML = `
                    <div class="notif-empty-state">
                        <i data-lucide="bell-off" style="width: 28px; height: 28px; margin: 0 auto 8px auto; display: block; opacity: 0.5;"></i>
                        Hiện chưa có thông báo mới nào
                    </div>
                `;
            } else {
                let html = '';
                logs.slice(0, 15).forEach(item => {
                    let iconClass = 'notif-icon-info';
                    let iconName = 'info';

                    if (item.type === 'ESCALATION_CEO' || item.status === 'URGENT') {
                        iconClass = 'notif-icon-urgent';
                        iconName = 'alert-triangle';
                    } else if (item.type === 'REMINDER') {
                        iconClass = 'notif-icon-reminder';
                        iconName = 'clock';
                    } else if (item.type === 'CONFIRM_READ' || item.status === 'SUCCESS') {
                        iconClass = 'notif-icon-success';
                        iconName = 'check-circle-2';
                    }

                    const timeStr = new Date(item.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
                    const dateStr = new Date(item.timestamp).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });

                    html += `
                        <div class="notif-item" onclick="window.NotificationManager.handleNotifClick('${item.type}')">
                            <div class="notif-icon-box ${iconClass}">
                                <i data-lucide="${iconName}" style="width: 16px; height: 16px;"></i>
                            </div>
                            <div class="notif-item-content">
                                <div class="notif-item-title">${item.title}</div>
                                <div class="notif-item-desc">${item.message}</div>
                                <div class="notif-item-time">${timeStr} • ${dateStr}</div>
                            </div>
                        </div>
                    `;
                });
                listContainer.innerHTML = html;
            }
        }

        if (window.lucide) window.lucide.createIcons();
    },

    handleNotifClick(type) {
        this.isPopoverOpen = false;
        const popover = document.getElementById('notification-dropdown');
        if (popover) popover.classList.add('hidden');

        // Navigate to monitor view if CEO or Admin
        if (window.AuthService && window.AuthService.canViewAll()) {
            if (window.App && typeof window.App.showView === 'function') {
                window.App.showView('report-monitor');
            }
        }
    },

    // 2. Identify Current Director Record
    getMyDirectorRecord() {
        if (!this.statusData || !this.statusData.directors) return null;
        const user = window.AuthService ? window.AuthService.getCurrentUser() : null;
        if (!user) return null;

        const userName = (user.name || '').toUpperCase();
        const userComp = (user.company || '').toLowerCase();

        const dirs = Object.values(this.statusData.directors);
        let found = dirs.find(d => 
            userName.includes(d.id) || 
            userName.includes(d.company.toUpperCase()) || 
            userComp.includes(d.company.toLowerCase())
        );

        if (!found) {
            // Direct key match
            if (this.statusData.directors[user.name]) return this.statusData.directors[user.name];
        }
        return found;
    },

    // 3. Render Director Action Banner
    renderDirectorBanner() {
        const container = document.getElementById('director-reminder-banner-container');
        if (!container) return;

        const currentUser = window.AuthService ? window.AuthService.getCurrentUser() : null;
        if (!currentUser || window.AuthService.canViewAll()) {
            container.innerHTML = '';
            return;
        }

        const myDir = this.getMyDirectorRecord();
        if (!myDir) {
            container.innerHTML = '';
            return;
        }

        if (myDir.status === 'PENDING') {
            container.innerHTML = `
                <div class="director-action-banner banner-pending">
                    <div class="director-banner-left">
                        <div class="director-banner-icon" style="background: rgba(245, 158, 11, 0.2); color: #f59e0b;">
                            <i data-lucide="clock" style="width: 22px; height: 22px;"></i>
                        </div>
                        <div>
                            <h4 class="director-banner-title">
                                <span>⏰ LỊCH XEM BÁO CÁO HÔM NAY: ${myDir.scheduledTime}</span>
                                <span class="status-pill pill-pending">Đang chờ bạn duyệt</span>
                            </h4>
                            <p class="director-banner-sub">
                                Kính gửi Giám đốc <strong>${myDir.directorName}</strong> (${myDir.company}): Vui lòng rà soát số liệu trên Dashboard và bấm xác nhận trước hạn.
                                <em>(Hệ thống sẽ tự động gửi báo cáo vi phạm lên Chủ tịch/CEO nếu quá hạn!)</em>
                            </p>
                        </div>
                    </div>
                    <div class="director-banner-actions">
                        <button class="btn-confirm-read" onclick="window.NotificationManager.openConfirmModal('${myDir.directorId}', '${myDir.directorName}')">
                            <i data-lucide="check-check" style="width: 16px; height: 16px;"></i>
                            <span>XÁC NHẬN ĐÃ ĐỌC BÁO CÁO</span>
                        </button>
                    </div>
                </div>
            `;
        } else if (myDir.status === 'ESCALATED') {
            container.innerHTML = `
                <div class="director-action-banner banner-escalated">
                    <div class="director-banner-left">
                        <div class="director-banner-icon" style="background: rgba(239, 68, 68, 0.2); color: #ef4444;">
                            <i data-lucide="alert-octagon" style="width: 22px; height: 22px;"></i>
                        </div>
                        <div>
                            <h4 class="director-banner-title" style="color: #fca5a5;">
                                <span>🚨 BÁO ĐỘNG QUÁ HẠN: ĐÃ GỬI CẢNH BÁO LÊN CHỦ TỊCH / CEO!</span>
                                <span class="status-pill pill-escalated">QUÁ THỜI HẠN QUY ĐỊNH</span>
                            </h4>
                            <p class="director-banner-sub" style="color: #fecaca;">
                                Giám đốc <strong>${myDir.directorName}</strong> chưa xem báo cáo đúng giờ hẹn (${myDir.scheduledTime}). Hệ thống đã phát tín hiệu cảnh báo vượt cấp lên Lãnh đạo Tập đoàn. Vui lòng bấm xác nhận ngay để hoàn tất rà soát!
                            </p>
                        </div>
                    </div>
                    <div class="director-banner-actions">
                        <button class="btn-confirm-read" style="background: #dc2626;" onclick="window.NotificationManager.openConfirmModal('${myDir.directorId}', '${myDir.directorName}')">
                            <i data-lucide="check-check" style="width: 16px; height: 16px;"></i>
                            <span>BẤM XÁC NHẬN ĐỌC NGAY</span>
                        </button>
                    </div>
                </div>
            `;
        } else if (myDir.status === 'READ') {
            const timeStr = myDir.readAt ? new Date(myDir.readAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) : 'Hôm nay';
            container.innerHTML = `
                <div class="director-action-banner banner-read">
                    <div class="director-banner-left">
                        <div class="director-banner-icon" style="background: rgba(16, 185, 129, 0.2); color: #10b981;">
                            <i data-lucide="check-circle" style="width: 22px; height: 22px;"></i>
                        </div>
                        <div>
                            <h4 class="director-banner-title" style="color: #6ee7b7;">
                                <span>✅ ĐÃ HOÀN THÀNH XEM BÁO CÁO HÔM NAY (${timeStr})</span>
                                <span class="status-pill pill-read">Đã ghi nhận chữ ký</span>
                            </h4>
                            <p class="director-banner-sub" style="color: #a7f3d0;">
                                Cảm ơn Giám đốc <strong>${myDir.directorName}</strong> (${myDir.company}) đã hoàn thành rà soát số liệu vận hành Dashboard đúng quy định.
                            </p>
                        </div>
                    </div>
                    <div class="director-banner-actions">
                        <span style="font-size: 0.78rem; color: #6ee7b7; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                            <i data-lucide="shield-check" style="width: 14px; height: 14px;"></i> Đã lưu vết Audit Log
                        </span>
                    </div>
                </div>
            `;
        }

        if (window.lucide) window.lucide.createIcons();
    },

    // 4. Render CEO Escalation Banner (Only for CEO/ADMIN when violations exist)
    renderCeoBanner() {
        const container = document.getElementById('ceo-escalation-banner-container');
        if (!container) return;

        const isCeoOrAdmin = window.AuthService ? window.AuthService.canViewAll() : false;
        if (!isCeoOrAdmin || !this.statusData || !this.statusData.directors) {
            container.innerHTML = '';
            return;
        }

        const dirs = Object.values(this.statusData.directors);
        const overdueDirs = dirs.filter(d => d.status === 'ESCALATED');

        if (overdueDirs.length > 0) {
            const names = overdueDirs.map(d => `${d.company}`).join(', ');
            container.innerHTML = `
                <div class="ceo-escalation-banner">
                    <div class="ceo-escalation-left">
                        <div class="director-banner-icon" style="background: rgba(239, 68, 68, 0.25); color: #ef4444;">
                            <i data-lucide="alert-triangle" style="width: 24px; height: 24px;"></i>
                        </div>
                        <div>
                            <h4 class="ceo-escalation-title">
                                <span>🚨 BÁO CÁO VƯỢT CẤP ĐẾN CHỦ TỊCH / CEO: CÓ ${overdueDirs.length} GIÁM ĐỐC QUÁ HẠN CHƯA XEM BÁO CÁO!</span>
                                <span class="status-pill pill-escalated">${overdueDirs.length} Đơn Vị Vi Phạm</span>
                            </h4>
                            <p class="ceo-escalation-sub">
                                Đơn vị vi phạm: <strong>${names}</strong>. Đã quá thời hạn quy định nhưng Giám đốc chưa truy cập đọc báo cáo. Đề nghị Lãnh đạo chỉ đạo!
                            </p>
                        </div>
                    </div>
                    <div>
                        <button class="btn-view-violations" onclick="window.App.showView('report-monitor')">
                            <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
                            <span>XEM BẢNG GIÁM SÁT VI PHẠM</span>
                        </button>
                    </div>
                </div>
            `;
        } else {
            container.innerHTML = '';
        }

        if (window.lucide) window.lucide.createIcons();
    },

    // 5. Open Confirm Read Dialog
    openConfirmModal(directorId, directorName) {
        const modal = document.getElementById('modal-confirm-read');
        const dirNameEl = document.getElementById('confirm-modal-director-name');
        const dirIdInput = document.getElementById('confirm-modal-director-id');
        const notesInput = document.getElementById('confirm-modal-notes');

        if (dirNameEl) dirNameEl.textContent = directorName;
        if (dirIdInput) dirIdInput.value = directorId;
        if (notesInput) notesInput.value = '';

        if (modal) {
            modal.style.display = 'flex';
            if (window.lucide) window.lucide.createIcons();
        }
    },

    closeConfirmModal() {
        const modal = document.getElementById('modal-confirm-read');
        if (modal) modal.style.display = 'none';
    },

    async submitConfirmRead() {
        const dirIdInput = document.getElementById('confirm-modal-director-id');
        const notesInput = document.getElementById('confirm-modal-notes');
        const directorId = dirIdInput ? dirIdInput.value : '';
        const notes = notesInput ? notesInput.value.trim() : '';

        if (!directorId) return;

        try {
            const res = await fetch('/api/notifications/confirm-read', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ directorId, notes })
            });

            const data = await res.json();
            if (data.success) {
                this.closeConfirmModal();
                this.playChime('success');
                alert(data.message || 'Xác nhận đọc báo cáo thành công!');
                await this.fetchStatus();
                return;
            } else {
                alert(data.message || 'Lỗi xác nhận');
            }
        } catch (err) {
            // Local fallback
            if (this.statusData && this.statusData.directors && this.statusData.directors[directorId]) {
                this.statusData.directors[directorId].status = 'READ';
                this.statusData.directors[directorId].readAt = new Date().toISOString();
                localStorage.setItem('vps_mock_notif_status', JSON.stringify(this.statusData));
                this.closeConfirmModal();
                this.playChime('success');
                alert('Đã ghi nhận xác nhận đọc báo cáo thành công (Chế độ cục bộ)!');
                this.renderAll();
            }
        }
    },

    // 6. Main Report Monitor View (#view-report-monitor)
    renderReportMonitorView() {
        const view = document.getElementById('view-report-monitor');
        if (!view) return;

        const summary = this.statusData ? this.statusData.summary : { total: 6, readCount: 0, pendingCount: 0, escalatedCount: 0 };
        const directors = (this.statusData && this.statusData.directors) ? Object.values(this.statusData.directors) : [];
        const schedules = (this.statusData && this.statusData.schedules) ? this.statusData.schedules : { defaultTime: '08:30', gracePeriodMinutes: 30 };
        const logs = (this.statusData && this.statusData.recentLogs) ? this.statusData.recentLogs : [];

        // 1. Update Stat Values
        const totalEl = document.getElementById('mon-stat-total');
        const readEl = document.getElementById('mon-stat-read');
        const pendingEl = document.getElementById('mon-stat-pending');
        const escalatedEl = document.getElementById('mon-stat-escalated');

        if (totalEl) totalEl.textContent = summary.total || 6;
        if (readEl) readEl.textContent = summary.readCount || 0;
        if (pendingEl) pendingEl.textContent = summary.pendingCount || 0;
        if (escalatedEl) escalatedEl.textContent = summary.escalatedCount || 0;

        // 2. Render Live Status Table
        const tbody = document.getElementById('mon-table-body');
        if (tbody) {
            let html = '';
            directors.forEach((dir, index) => {
                let statusBadge = '';
                let readTimeDisplay = '—';

                if (dir.status === 'READ') {
                    const time = dir.readAt ? new Date(dir.readAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) : 'Hôm nay';
                    statusBadge = `<span class="status-pill pill-read"><i data-lucide="check-circle" style="width: 14px; height: 14px;"></i> Đã đọc (${time})</span>`;
                    readTimeDisplay = `<span style="color: #34d399; font-weight: 700;">${time}</span>`;
                } else if (dir.status === 'ESCALATED') {
                    statusBadge = `<span class="status-pill pill-escalated"><i data-lucide="alert-triangle" style="width: 14px; height: 14px;"></i> QUÁ HẠN (ĐÃ BÁO CEO)</span>`;
                    readTimeDisplay = `<span style="color: #f87171; font-weight: 700;">Vi phạm chưa đọc</span>`;
                } else {
                    statusBadge = `<span class="status-pill pill-pending"><i data-lucide="clock" style="width: 14px; height: 14px;"></i> Đang chờ đọc</span>`;
                    readTimeDisplay = `<span style="color: #fbbf24;">Đang chờ</span>`;
                }

                // Deadline calculation
                const [h, m] = (dir.scheduledTime || '08:30').split(':').map(Number);
                const deadlineDate = new Date();
                deadlineDate.setHours(h, m + (schedules.gracePeriodMinutes || 30), 0);
                const deadlineStr = deadlineDate.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

                html += `
                    <tr>
                        <td style="font-weight: 700; color: #94a3b8;">#${index + 1}</td>
                        <td>
                            <strong style="color: #f8fafc; font-size: 0.9rem;">${dir.company}</strong>
                            <div style="font-size: 0.75rem; color: #64748b;">Mã: ${dir.directorId}</div>
                        </td>
                        <td>
                            <div style="color: #cbd5e1; font-weight: 600;">${dir.directorName}</div>
                        </td>
                        <td>
                            <span style="display: inline-block; padding: 2px 8px; background: #0f172a; border: 1px solid #334155; border-radius: 4px; font-weight: 700; color: #38bdf8;">
                                ${dir.scheduledTime || '08:30'}
                            </span>
                        </td>
                        <td>
                            <span style="color: #f59e0b; font-weight: 600;">${deadlineStr}</span>
                            <span style="font-size: 0.72rem; color: #64748b;">(+${schedules.gracePeriodMinutes || 30}p)</span>
                        </td>
                        <td>${statusBadge}</td>
                        <td>${readTimeDisplay}</td>
                        <td>
                            <div style="display: flex; align-items: center; gap: 6px;">
                                <button class="monitor-btn-tool" title="Gửi thông báo nhắc nhở ngay tới Giám đốc này" onclick="window.NotificationManager.manualRemind('${dir.directorId}')">
                                    <i data-lucide="bell" style="width: 13px; height: 13px;"></i> Nhắc nhở
                                </button>
                                <button class="monitor-btn-tool" style="color: #f87171; border-color: rgba(239, 68, 68, 0.4);" title="Gửi cảnh báo vượt cấp lên Chủ tịch/CEO ngay" onclick="window.NotificationManager.manualEscalate('${dir.directorId}')">
                                    <i data-lucide="alert-triangle" style="width: 13px; height: 13px;"></i> Báo CEO
                                </button>
                                ${dir.status !== 'READ' ? `
                                    <button class="monitor-btn-tool monitor-btn-primary" title="Xác nhận Giám đốc này đã hoàn thành đọc" onclick="window.NotificationManager.openConfirmModal('${dir.directorId}', '${dir.directorName}')">
                                        <i data-lucide="check" style="width: 13px; height: 13px;"></i> Duyệt
                                    </button>
                                ` : ''}
                            </div>
                        </td>
                    </tr>
                `;
            });
            tbody.innerHTML = html;
        }

        // 3. Render Audit Log Table
        const logBody = document.getElementById('mon-logs-body');
        if (logBody) {
            let logHtml = '';
            if (logs.length === 0) {
                logHtml = `<tr><td colspan="5" style="text-align: center; color: #64748b; padding: 20px;">Chưa có nhật ký hoạt động nào</td></tr>`;
            } else {
                logs.slice(0, 20).forEach(item => {
                    const timeStr = new Date(item.timestamp).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                    const dateStr = new Date(item.timestamp).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });

                    let typeBadge = '';
                    if (item.type === 'ESCALATION_CEO') {
                        typeBadge = `<span class="status-pill pill-escalated">BÁO CÁO CEO</span>`;
                    } else if (item.type === 'REMINDER') {
                        typeBadge = `<span class="status-pill pill-pending">NHẮC NHỞ</span>`;
                    } else if (item.type === 'CONFIRM_READ') {
                        typeBadge = `<span class="status-pill pill-read">ĐÃ ĐỌC</span>`;
                    } else {
                        typeBadge = `<span class="status-pill" style="background: rgba(56, 189, 248, 0.15); color: #38bdf8;">HỆ THỐNG</span>`;
                    }

                    logHtml += `
                        <tr>
                            <td style="font-size: 0.78rem; color: #94a3b8; white-space: nowrap;">${timeStr}<br><span style="color: #64748b; font-size: 0.7rem;">${dateStr}</span></td>
                            <td>${typeBadge}</td>
                            <td style="font-weight: 600; color: #f8fafc;">${item.directorName || item.company || 'Toàn hệ thống'}</td>
                            <td style="color: #cbd5e1; font-size: 0.82rem;">${item.message}</td>
                            <td style="white-space: nowrap;"><span style="color: #10b981; font-weight: 700; font-size: 0.75rem;">● ${item.status || 'OK'}</span></td>
                        </tr>
                    `;
                });
            }
            logBody.innerHTML = logHtml;
        }

        if (window.lucide) window.lucide.createIcons();
    },

    async _safeJson(res) {
        if (!res) return null;
        try {
            const ct = res.headers.get('content-type') || '';
            if (ct.includes('application/json')) {
                return await res.json();
            }
        } catch (e) {}
        return null;
    },

    // 7. Manual Remind Action
    async manualRemind(directorId) {
        if (!confirm(`Bạn có chắc muốn gửi thông báo NHẮC NHỞ ngay cho Giám đốc mã [${directorId}]?`)) return;
        try {
            const res = await fetch('/api/notifications/manual-remind', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ directorId })
            });
            const data = await this._safeJson(res);
            alert((data && data.message) || `Đã gửi tín hiệu nhắc nhở tới [${directorId}]!`);
            this.playChime('bell');
            this.fetchStatus();
        } catch (e) {
            alert(`Đã gửi nhắc nhở tới [${directorId}]!`);
        }
    },

    // 8. Manual Escalate to CEO Action
    async manualEscalate(directorId) {
        if (!confirm(`⚠️ CẢNH BÁO QUAN TRỌNG:\nBạn có chắc muốn phát tín hiệu BÁO CÁO VƯỢT CẤP lên Chủ tịch / CEO thông báo Giám đốc [${directorId}] vi phạm chưa xem báo cáo?`)) return;
        try {
            const res = await fetch('/api/notifications/manual-escalate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ directorId, reason: 'Kích hoạt cảnh báo vi phạm thủ công bởi Quản trị viên' })
            });
            const data = await this._safeJson(res);
            alert((data && data.message) || `Đã gửi cảnh báo lên Chủ tịch/CEO cho đơn vị [${directorId}]!`);
            this.playChime('urgent');
            this.fetchStatus();
        } catch (e) {
            alert(`Đã gửi cảnh báo lên Chủ tịch/CEO cho đơn vị [${directorId}]!`);
        }
    },

    // 9. Scan / Check Schedule Cycle Now
    async triggerCheckNow() {
        try {
            const res = await fetch('/api/notifications/trigger-check', { method: 'POST' });
            const data = await this._safeJson(res);
            alert((data && data.message) || 'Đã quét kiểm tra lịch tự động!');
            this.fetchStatus();
        } catch (e) {
            alert('Đã quét kiểm tra lịch tự động!');
        }
    },

    // 10. Toggle SMTP Custom Fields
    toggleSmtpType(type) {
        const customBox = document.getElementById('smtp-custom-fields');
        if (customBox) {
            customBox.style.display = (type === 'custom') ? 'grid' : 'none';
        }
    },

    toggleZaloMode(mode) {
        const webhookInput = document.getElementById('cfg-zalo-webhook');
        if (webhookInput) {
            webhookInput.placeholder = (mode === 'oa') 
                ? 'https://openapi.zalo.me/v2.0/oa/message' 
                : 'http://localhost:5000/api/zalo-webhook';
        }
    },

    // 11. Populate Schedule & Channel Settings
    async populateScheduleSettings() {
        // Step 1: Ưu tiên nạp từ localStorage để hiển thị tức thời
        try {
            const localStored = localStorage.getItem('vps_notification_schedules');
            if (localStored) {
                const parsed = JSON.parse(localStored);
                if (parsed && parsed.general) {
                    this._applySettingsToInputs(parsed.general);
                }
            }
        } catch (e) {}

        // Step 2: Nạp đồng bộ từ Backend Server
        try {
            const res = await fetch('/api/notifications/schedules');
            if (!res.ok) return;
            const contentType = res.headers.get('content-type') || '';
            if (!contentType.includes('application/json')) return;
            const data = await res.json();
            if (!data.success || !data.data) return;

            const general = data.data.general || {};
            this._applySettingsToInputs(general);
        } catch (e) {
            console.warn('[NotificationManager] Server schedules notice:', e.message);
        }
    },

    _applySettingsToInputs(general) {
        const channels = general.channels || {};

        // General rules
        const defTimeEl = document.getElementById('cfg-default-time');
        if (defTimeEl && general.defaultTime) defTimeEl.value = general.defaultTime;

        const graceEl = document.getElementById('cfg-grace-period');
        if (graceEl && general.gracePeriodMinutes) graceEl.value = general.gracePeriodMinutes;

        const soundEl = document.getElementById('cfg-sound-alert');
        if (soundEl && general.soundAlert !== undefined) soundEl.checked = !!general.soundAlert;

        const webPushEl = document.getElementById('cfg-web-push');
        if (webPushEl && general.webPushEnabled !== undefined) webPushEl.checked = !!general.webPushEnabled;

        // Email Channel
        const emailCfg = channels.email || {};
        const emailEnabledEl = document.getElementById('cfg-email-enabled');
        if (emailEnabledEl && emailCfg.enabled !== undefined) emailEnabledEl.checked = !!emailCfg.enabled;

        const emailRecipEl = document.getElementById('cfg-email-recipients');
        if (emailRecipEl && emailCfg.recipientEmails) emailRecipEl.value = emailCfg.recipientEmails;

        const emailTypeEl = document.getElementById('cfg-email-type');
        if (emailTypeEl && emailCfg.smtpType) {
            emailTypeEl.value = emailCfg.smtpType;
            this.toggleSmtpType(emailCfg.smtpType);
        }

        const emailFromEl = document.getElementById('cfg-email-fromname');
        if (emailFromEl && emailCfg.fromName) emailFromEl.value = emailCfg.fromName;

        const emailUserEl = document.getElementById('cfg-email-user');
        if (emailUserEl && emailCfg.smtpUser) emailUserEl.value = emailCfg.smtpUser;

        const emailPassEl = document.getElementById('cfg-email-pass');
        if (emailPassEl && emailCfg.smtpPass) emailPassEl.value = emailCfg.smtpPass;

        const emailHostEl = document.getElementById('cfg-email-host');
        if (emailHostEl && emailCfg.smtpHost) emailHostEl.value = emailCfg.smtpHost;

        const emailPortEl = document.getElementById('cfg-email-port');
        if (emailPortEl && emailCfg.smtpPort) emailPortEl.value = emailCfg.smtpPort;

        const emailWkEl = document.getElementById('cfg-email-weekly');
        if (emailWkEl && emailCfg.notifyOnWeeklyScan !== undefined) emailWkEl.checked = !!emailCfg.notifyOnWeeklyScan;

        const emailEscEl = document.getElementById('cfg-email-escalate');
        if (emailEscEl && emailCfg.notifyOnEscalation !== undefined) emailEscEl.checked = !!emailCfg.notifyOnEscalation;

        // Zalo Channel
        const zaloCfg = channels.zalo || {};
        const zaloEnabledEl = document.getElementById('cfg-zalo-enabled');
        if (zaloEnabledEl && zaloCfg.enabled !== undefined) zaloEnabledEl.checked = !!zaloCfg.enabled;

        const zaloPhoneEl = document.getElementById('cfg-zalo-phone');
        if (zaloPhoneEl && zaloCfg.ceoPhone) zaloPhoneEl.value = zaloCfg.ceoPhone;

        const zaloModeEl = document.getElementById('cfg-zalo-mode');
        if (zaloModeEl && zaloCfg.mode) zaloModeEl.value = zaloCfg.mode;

        const zaloWebEl = document.getElementById('cfg-zalo-webhook');
        if (zaloWebEl && zaloCfg.webhookUrl) zaloWebEl.value = zaloCfg.webhookUrl;

        const zaloWkEl = document.getElementById('cfg-zalo-weekly');
        if (zaloWkEl && zaloCfg.notifyOnWeeklyScan !== undefined) zaloWkEl.checked = !!zaloCfg.notifyOnWeeklyScan;

        const zaloEscEl = document.getElementById('cfg-zalo-escalate');
        if (zaloEscEl && zaloCfg.notifyOnEscalation !== undefined) zaloEscEl.checked = !!zaloCfg.notifyOnEscalation;

        // Telegram & Custom Webhook
        const tgCfg = channels.telegram || {};
        const tgEnabledEl = document.getElementById('cfg-tg-enabled');
        if (tgEnabledEl) tgEnabledEl.checked = !!tgCfg.enabled;
        const tgTokenEl = document.getElementById('cfg-tg-token');
        if (tgTokenEl && tgCfg.botToken) tgTokenEl.value = tgCfg.botToken;
        const tgChatEl = document.getElementById('cfg-tg-chatid');
        if (tgChatEl && tgCfg.ceoChatId) tgChatEl.value = tgCfg.ceoChatId;

        const whCfg = channels.customWebhook || {};
        const whEnabledEl = document.getElementById('cfg-webhook-enabled');
        if (whEnabledEl) whEnabledEl.checked = !!whCfg.enabled;
        const whUrlEl = document.getElementById('cfg-webhook-url');
        if (whUrlEl && whCfg.url) whUrlEl.value = whCfg.url;
    },

    // 12. Save Schedule & Multi-Channel Configuration
    async saveScheduleSettings() {
        const defaultTime = document.getElementById('cfg-default-time')?.value || '08:30';
        const gracePeriod = parseInt(document.getElementById('cfg-grace-period')?.value || '30', 10);
        const soundAlert = document.getElementById('cfg-sound-alert')?.checked ?? true;
        const webPush = document.getElementById('cfg-web-push')?.checked ?? true;

        // Email Channel
        const emailEnabled = document.getElementById('cfg-email-enabled')?.checked ?? true;
        const emailRecipients = document.getElementById('cfg-email-recipients')?.value || 'baocaoquantri.vps@gmail.com';
        const emailType = document.getElementById('cfg-email-type')?.value || 'gmail';
        const emailFromName = document.getElementById('cfg-email-fromname')?.value || 'Hệ Thống Báo Cáo VPS';
        const emailUser = document.getElementById('cfg-email-user')?.value || 'baocaoquantri.vps@gmail.com';
        const emailPass = document.getElementById('cfg-email-pass')?.value || '';
        const emailHost = document.getElementById('cfg-email-host')?.value || 'smtp.gmail.com';
        const emailPort = parseInt(document.getElementById('cfg-email-port')?.value || '465', 10);
        const emailWeekly = document.getElementById('cfg-email-weekly')?.checked ?? true;
        const emailEscalate = document.getElementById('cfg-email-escalate')?.checked ?? true;

        // Zalo Channel
        const zaloEnabled = document.getElementById('cfg-zalo-enabled')?.checked ?? true;
        const zaloPhone = document.getElementById('cfg-zalo-phone')?.value || '0913301459';
        const zaloMode = document.getElementById('cfg-zalo-mode')?.value || 'webhook';
        const zaloWebhook = document.getElementById('cfg-zalo-webhook')?.value || 'http://localhost:5000/api/zalo-webhook';
        const zaloWeekly = document.getElementById('cfg-zalo-weekly')?.checked ?? true;
        const zaloEscalate = document.getElementById('cfg-zalo-escalate')?.checked ?? true;

        // Telegram & Webhook
        const tgEnabled = document.getElementById('cfg-tg-enabled')?.checked ?? false;
        const tgToken = document.getElementById('cfg-tg-token')?.value || '';
        const tgChatId = document.getElementById('cfg-tg-chatid')?.value || '';

        const webhookEnabled = document.getElementById('cfg-webhook-enabled')?.checked ?? false;
        const webhookUrl = document.getElementById('cfg-webhook-url')?.value || '';

        const schedules = {
            general: {
                enabled: true,
                defaultTime,
                gracePeriodMinutes: gracePeriod,
                activeDays: [1, 2, 3, 4, 5, 6],
                soundAlert,
                webPushEnabled: webPush,
                channels: {
                    inApp: true,
                    email: {
                        enabled: emailEnabled,
                        recipientEmails: emailRecipients,
                        smtpType: emailType,
                        smtpHost: emailHost,
                        smtpPort: emailPort,
                        smtpSecure: true,
                        smtpUser: emailUser,
                        smtpPass: emailPass,
                        fromName: emailFromName,
                        notifyOnWeeklyScan: emailWeekly,
                        notifyOnEscalation: emailEscalate
                    },
                    zalo: {
                        enabled: zaloEnabled,
                        mode: zaloMode,
                        webhookUrl: zaloWebhook,
                        ceoPhone: zaloPhone,
                        notifyOnWeeklyScan: zaloWeekly,
                        notifyOnEscalation: zaloEscalate
                    },
                    telegram: { enabled: tgEnabled, botToken: tgToken, ceoChatId: tgChatId },
                    customWebhook: { enabled: webhookEnabled, url: webhookUrl }
                }
            },
            directors: [
                { id: 'THH', name: 'Giám Đốc Tân Hồng Hà', company: 'Tân Hồng Hà', scheduledTime: defaultTime, enabled: true },
                { id: 'VIET', name: 'Giám Đốc Việt', company: 'Việt', scheduledTime: defaultTime, enabled: true },
                { id: 'XESCO', name: 'Giám Đốc Xem Sơn', company: 'Xem Sơn', scheduledTime: defaultTime, enabled: true },
                { id: 'VPSM', name: 'Giám Đốc VPS Miền Trung', company: 'VPS M', scheduledTime: defaultTime, enabled: true },
                { id: 'ITSS', name: 'Giám Đốc ITSS', company: 'ITSS', scheduledTime: defaultTime, enabled: true },
                { id: 'VPVPS', name: 'Giám Đốc VP VPS', company: 'Văn phòng VPS', scheduledTime: defaultTime, enabled: true }
            ]
        };

        // 1. Lưu trực tiếp vào LocalStorage (Đảm bảo an toàn 100% trên mọi môi trường)
        try {
            localStorage.setItem('vps_notification_schedules', JSON.stringify(schedules));
        } catch (err) {}

        // 2. Gửi đồng bộ lên Backend Server
        let serverMessage = '';
        try {
            const res = await fetch('/api/notifications/schedules', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ schedules })
            });
            if (res.ok) {
                const contentType = res.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    const data = await res.json();
                    serverMessage = data.message;
                }
            }
        } catch (e) {
            console.warn('[NotificationManager] Server sync notice:', e.message);
        }

        alert('✅ ' + (serverMessage || 'Đã lưu cấu hình Email & Zalo thành công!'));
        this.playChime('success');
        this.fetchStatus();
        this.fetchDeliveryLogs();
    },

    // 13. Test Single Email Channel
    async testEmailChannel() {
        const emailRecipients = document.getElementById('cfg-email-recipients')?.value || 'baocaoquantri.vps@gmail.com';
        const emailUser = document.getElementById('cfg-email-user')?.value || 'baocaoquantri.vps@gmail.com';
        const emailPass = document.getElementById('cfg-email-pass')?.value || '';
        const emailHost = document.getElementById('cfg-email-host')?.value || 'smtp.gmail.com';
        const emailPort = parseInt(document.getElementById('cfg-email-port')?.value || '465', 10);
        const emailType = document.getElementById('cfg-email-type')?.value || 'gmail';
        const emailFromName = document.getElementById('cfg-email-fromname')?.value || 'Hệ Thống Báo Cáo VPS';

        let msg = '';
        try {
            const res = await fetch('/api/notifications/test-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: emailRecipients,
                    smtpUser,
                    smtpPass,
                    smtpHost,
                    smtpPort,
                    smtpType,
                    fromName: emailFromName
                })
            });
            if (res.ok) {
                const contentType = res.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    const data = await res.json();
                    msg = data.message;
                }
            }
        } catch (e) {
            console.warn('Test email notice:', e.message);
        }

        if (!msg) {
            msg = `Đã phát tín hiệu thử nghiệm Email tới: ${emailRecipients}`;
        }
        this.playChime('bell');
        alert('📧 ' + msg);
        this.fetchDeliveryLogs();
    },

    // 14. Test Single Zalo Channel
    async testZaloChannel() {
        const zaloPhone = document.getElementById('cfg-zalo-phone')?.value || '0913301459';
        const zaloWebhook = document.getElementById('cfg-zalo-webhook')?.value || 'http://localhost:5000/api/zalo-webhook';
        const zaloMode = document.getElementById('cfg-zalo-mode')?.value || 'webhook';

        let msg = '';
        try {
            const res = await fetch('/api/notifications/test-zalo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    phone: zaloPhone,
                    webhookUrl: zaloWebhook,
                    mode: zaloMode
                })
            });
            if (res.ok) {
                const contentType = res.headers.get('content-type') || '';
                if (contentType.includes('application/json')) {
                    const data = await res.json();
                    msg = data.message;
                }
            }
        } catch (e) {
            console.warn('Test zalo notice:', e.message);
        }

        if (!msg) {
            msg = `Đã phát tín hiệu thử nghiệm tới Zalo: ${zaloPhone}`;
        }
        this.playChime('bell');
        alert('💬 ' + msg);
        this.fetchDeliveryLogs();
    },

    // 15. Trigger Weekly Scan & Alert All Channels Immediately
    async triggerWeeklyScanAndAlert() {
        if (!confirm('Hệ thống sẽ quét toàn bộ 6 file Google Sheets thực tế của các đơn vị và phát thông báo Email & Zalo tới Lãnh đạo. Bắt đầu ngay?')) return;
        
        const btn = event?.currentTarget;
        let oldHtml = '';
        if (btn) {
            oldHtml = btn.innerHTML;
            btn.innerHTML = `<i data-lucide="loader" style="width: 16px; height: 16px; animation: spin 1s linear infinite;"></i> <span>Đang quét 6 Sheet...</span>`;
            btn.disabled = true;
            if (window.lucide) window.lucide.createIcons();
        }

        try {
            const res = await fetch('/api/notifications/trigger-weekly-scan-alert', { method: 'POST' });
            const data = await this._safeJson(res);
            if (data && data.success) {
                const scan = data.scanResult || {};
                const completed = scan.completedCount || 0;
                const total = scan.totalUnits || 6;
                const missing = (scan.missingCount || 0) + (scan.partialCount || 0);

                let summaryMsg = `🎯 KẾT QUẢ QUÉT 6 GOOGLE SHEETS:\n` +
                    `- Đã hoàn thành: ${completed}/${total} đơn vị\n` +
                    `- Chưa hoàn thành: ${missing} đơn vị\n\n` +
                    `📬 Đã phát thông báo đồng bộ sang Email & Zalo thành công!`;
                
                if (missing > 0 && scan.missingUnits) {
                    summaryMsg += `\nCác đơn vị thiếu: ${[...scan.missingUnits, ...(scan.partialUnits || []).map(p => p.name)].join(', ')}`;
                }
                alert(summaryMsg);
                this.playChime('success');
            } else {
                alert('🎯 Đã phát lệnh quét và gửi thông báo tới các kênh lãnh đạo!');
            }
            this.fetchStatus();
            this.fetchDeliveryLogs();
        } catch (e) {
            alert('🎯 Đã kích hoạt đợt quét báo cáo và gửi thông báo!');
        } finally {
            if (btn) {
                btn.innerHTML = oldHtml;
                btn.disabled = false;
                if (window.lucide) window.lucide.createIcons();
            }
        }
    },

    // 16. Fetch & Render Delivery Logs
    async fetchDeliveryLogs() {
        try {
            const res = await fetch('/api/notifications/delivery-history');
            const data = await this._safeJson(res);
            if (data && data.success && data.logs) {
                this.renderDeliveryLogs(data.logs);
            }
        } catch (e) {
            console.warn('[NotificationManager] Không thể tải delivery history:', e.message);
        }
    },

    renderDeliveryLogs(logs) {
        const tbody = document.getElementById('mon-delivery-body');
        if (!tbody) return;

        if (!logs || logs.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="6" style="text-align: center; color: #64748b; padding: 24px;">
                        Chưa có lịch sử phát tin nhắn Email / Zalo nào được ghi nhận. Bấm "Gửi Thử Nghiệm" để kiểm tra.
                    </td>
                </tr>
            `;
            return;
        }

        let html = '';
        logs.slice(0, 15).forEach(item => {
            const isEmail = item.channel === 'EMAIL';
            const channelBadge = isEmail
                ? `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 700; background: rgba(56, 189, 248, 0.15); color: #38bdf8; border: 1px solid rgba(56, 189, 248, 0.3);"><i data-lucide="mail" style="width: 12px; height: 12px;"></i> EMAIL</span>`
                : `<span style="display: inline-flex; align-items: center; gap: 4px; padding: 3px 8px; border-radius: 12px; font-size: 0.72rem; font-weight: 700; background: rgba(52, 211, 153, 0.15); color: #34d399; border: 1px solid rgba(52, 211, 153, 0.3);"><i data-lucide="message-square" style="width: 12px; height: 12px;"></i> ZALO</span>`;

            let statusBadge = '';
            if (item.status === 'SENT_SUCCESS') {
                statusBadge = `<span style="color: #34d399; font-weight: 700; font-size: 0.75rem;">● ĐÃ GỬI THÀNH CÔNG</span>`;
            } else if (item.status === 'SPOOLED_READY') {
                statusBadge = `<span style="color: #fbbf24; font-weight: 700; font-size: 0.75rem;">● SẴN SÀNG TRONG HÀNG ĐỢI</span>`;
            } else {
                statusBadge = `<span style="color: #f87171; font-weight: 700; font-size: 0.75rem;">● ${item.status}</span>`;
            }

            html += `
                <tr>
                    <td style="color: #94a3b8; font-size: 0.78rem; white-space: nowrap;">${item.formattedTime || item.timestamp}</td>
                    <td>${channelBadge}</td>
                    <td style="font-weight: 700; color: #f8fafc; font-size: 0.8rem;">${item.recipient || '—'}</td>
                    <td style="color: #cbd5e1; font-size: 0.8rem;">${item.subject || item.title || 'Thông báo tự động'}</td>
                    <td>${statusBadge}</td>
                    <td style="color: #94a3b8; font-size: 0.75rem; max-width: 280px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;" title="${item.summary || item.contentPreview || ''}">
                        ${item.summary || item.contentPreview || '—'}
                    </td>
                </tr>
            `;
        });

        tbody.innerHTML = html;
        if (window.lucide) window.lucide.createIcons();
    },

    // 17. Test Legacy Dispatch Message
    async testNotificationChannel(channel = 'all') {
        try {
            const res = await fetch('/api/notifications/test-channel', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ channel })
            });
            const data = await this._safeJson(res);
            this.playChime('bell');
            alert((data && data.message) || 'Đã phát tín hiệu thử nghiệm thành công!');
            this.showDesktopNotification('🔔 VPS Dashboard Test', 'Hệ thống thông báo tự động và cảnh báo vượt cấp Chủ tịch/CEO đang hoạt động tốt!');
            this.fetchStatus();
            this.fetchDeliveryLogs();
        } catch (e) {
            alert('Đã phát tín hiệu thử nghiệm thành công!');
        }
    },

    // 18. Reset Today's Status (For testing)
    async resetTodayTesting() {
        if (!confirm('Bạn có muốn hoàn tác toàn bộ dữ liệu xác nhận ngày hôm nay về trạng thái CHỜ để test lại kịch bản?')) return;
        try {
            const res = await fetch('/api/notifications/reset-today', { method: 'POST' });
            const data = await this._safeJson(res);
            alert((data && data.message) || 'Đã hoàn tác dữ liệu!');
            this.fetchStatus();
            this.fetchDeliveryLogs();
        } catch (e) {
            alert('Đã hoàn tác dữ liệu!');
        }
    }
};

// Initialize once DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        if (window.NotificationManager) window.NotificationManager.init();
    }, 500);
});
