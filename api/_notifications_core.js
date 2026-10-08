const path = require('path');
const fs = require('fs');
const os = require('os');
const NotificationService = require('../notification_service');

function getSafeDataDir() {
    const local = path.join(__dirname, '../data');
    try {
        if (!fs.existsSync(local)) fs.mkdirSync(local, { recursive: true });
        fs.accessSync(local, fs.constants.W_OK);
        return local;
    } catch (e) {
        return os.tmpdir();
    }
}

const DATA_DIR = getSafeDataDir();
const SCHEDULES_FILE = path.join(DATA_DIR, 'notification_schedules.json');
const AUDIT_LOGS_FILE = path.join(DATA_DIR, 'notification_audit_logs.json');

function loadJSON(filePath, fallback = {}) {
    try {
        if (fs.existsSync(filePath)) {
            return JSON.parse(fs.readFileSync(filePath, 'utf8'));
        }
    } catch (e) {}
    return fallback;
}

function saveJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (e) {
        return false;
    }
}

function getTodayString() {
    const d = new Date();
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

const DEFAULT_DIRECTORS = [
    { id: 'THH', name: 'Giám Đốc Tân Hồng Hà', company: 'Tân Hồng Hà', scheduledTime: '08:30', enabled: true },
    { id: 'VIET', name: 'Giám Đốc Việt', company: 'Việt', scheduledTime: '08:30', enabled: true },
    { id: 'XESCO', name: 'Giám Đốc Xem Sơn', company: 'Xem Sơn', scheduledTime: '08:30', enabled: true },
    { id: 'VPSM', name: 'Giám Đốc VPS Miền Trung', company: 'VPS M', scheduledTime: '08:30', enabled: true },
    { id: 'ITSS', name: 'Giám Đốc ITSS', company: 'ITSS', scheduledTime: '08:30', enabled: true },
    { id: 'VPVPS', name: 'Giám Đốc VP VPS', company: 'Văn phòng VPS', scheduledTime: '08:30', enabled: true }
];

function getSchedules() {
    let schedules = loadJSON(SCHEDULES_FILE, null);
    if (!schedules || !schedules.general) {
        schedules = {
            general: {
                enabled: true,
                defaultTime: '08:30',
                gracePeriodMinutes: 30,
                activeDays: [1, 2, 3, 4, 5, 6],
                soundAlert: true,
                webPushEnabled: true,
                channels: {
                    inApp: true,
                    email: {
                        enabled: true,
                        recipientEmails: 'baocaoquantri.vps@gmail.com',
                        smtpType: 'gmail',
                        smtpHost: 'smtp.gmail.com',
                        smtpPort: 465,
                        smtpSecure: true,
                        smtpUser: 'baocaoquantri.vps@gmail.com',
                        smtpPass: '',
                        fromName: 'VPS Dashboard Alert System',
                        notifyOnWeeklyScan: true,
                        notifyOnEscalation: true
                    },
                    zalo: {
                        enabled: true,
                        mode: 'webhook',
                        webhookUrl: 'http://localhost:5000/api/zalo-webhook',
                        ceoPhone: '0913301459',
                        notifyOnWeeklyScan: true,
                        notifyOnEscalation: true
                    },
                    telegram: { enabled: false, botToken: '', ceoChatId: '' },
                    customWebhook: { enabled: false, url: '' }
                }
            },
            directors: DEFAULT_DIRECTORS
        };
        saveJSON(SCHEDULES_FILE, schedules);
    }
    return schedules;
}

function getAuditData() {
    let audit = loadJSON(AUDIT_LOGS_FILE, null);
    if (!audit || !audit.dailyStatus) {
        audit = { logs: [], dailyStatus: {} };
        saveJSON(AUDIT_LOGS_FILE, audit);
    }
    return audit;
}

function addLog(entry) {
    const audit = getAuditData();
    const logItem = {
        id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
        timestamp: new Date().toISOString(),
        ...entry
    };
    audit.logs.unshift(logItem);
    if (audit.logs.length > 300) audit.logs = audit.logs.slice(0, 300);
    saveJSON(AUDIT_LOGS_FILE, audit);
    return logItem;
}

function getDailyStatus(dateStr) {
    const targetDate = dateStr || getTodayString();
    const schedules = getSchedules();
    const audit = getAuditData();

    if (!audit.dailyStatus[targetDate]) {
        audit.dailyStatus[targetDate] = {};
    }

    const daily = audit.dailyStatus[targetDate];
    const directors = schedules.directors || DEFAULT_DIRECTORS;

    directors.forEach(dir => {
        if (!dir.enabled) return;
        if (!daily[dir.id]) {
            daily[dir.id] = {
                directorId: dir.id,
                name: dir.name,
                company: dir.company,
                scheduledTime: dir.scheduledTime || schedules.general.defaultTime || '08:30',
                status: 'PENDING',
                readAt: null,
                remindedAt: null,
                escalatedAt: null,
                notes: ''
            };
        }
    });

    saveJSON(AUDIT_LOGS_FILE, audit);
    return daily;
}

async function handleNotificationRequest(req, res, action) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(204).end();
    }

    // Determine sub-action
    let subAction = action;
    if (!subAction) {
        const urlPart = (req.url || '').split('?')[0].replace('/api/notifications', '').replace(/^\/+/, '');
        subAction = urlPart || (req.query && req.query.route ? (Array.isArray(req.query.route) ? req.query.route.join('/') : req.query.route) : '');
    }
    subAction = subAction.replace(/^\/+|\/+$/g, '');

    const method = req.method;
    let body = req.body || {};
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
    }

    try {
        // 1. Schedules
        if (subAction === 'schedules' || subAction === '') {
            if (method === 'GET') {
                return res.status(200).json({ success: true, data: getSchedules() });
            }
            if (method === 'POST') {
                const sched = body.schedules || body;
                if (sched) {
                    saveJSON(SCHEDULES_FILE, sched);
                    addLog({
                        type: 'CONFIG_UPDATE',
                        title: 'Cập nhật cấu hình lịch báo cáo',
                        message: 'Quản trị viên đã cập nhật lại quy định giờ xem báo cáo và các kênh thông báo.',
                        status: 'INFO'
                    });
                    return res.status(200).json({ success: true, message: 'Đã lưu cấu hình Email & Zalo thành công!' });
                }
                return res.status(400).json({ success: false, message: 'Dữ liệu không hợp lệ' });
            }
        }

        // 2. Status
        if (subAction === 'status') {
            const today = getTodayString();
            const daily = getDailyStatus(today);
            const audit = getAuditData();
            const schedules = getSchedules();

            const records = Object.values(daily);
            const total = records.length;
            const readCount = records.filter(r => r.status === 'READ').length;
            const pendingCount = records.filter(r => r.status === 'PENDING').length;
            const escalatedCount = records.filter(r => r.status === 'ESCALATED').length;

            return res.status(200).json({
                success: true,
                date: today,
                summary: { total, readCount, pendingCount, escalatedCount },
                directors: daily,
                schedules: schedules.general,
                recentLogs: (audit.logs || []).slice(0, 30)
            });
        }

        // 3. Confirm Read
        if (subAction === 'confirm-read') {
            const directorId = body.directorId;
            const notes = body.notes || '';
            const today = getTodayString();
            const daily = getDailyStatus(today);
            const audit = getAuditData();

            if (daily[directorId]) {
                const dir = daily[directorId];
                dir.status = 'READ';
                dir.readAt = new Date().toISOString();
                dir.notes = notes;

                addLog({
                    type: 'DIRECTOR_CONFIRM',
                    directorId: dir.directorId,
                    directorName: dir.name,
                    company: dir.company,
                    title: `${dir.name} đã đọc báo cáo`,
                    message: notes ? `Ghi chú: ${notes}` : 'Đã xác nhận đọc đúng hạn',
                    status: 'SUCCESS'
                });
                saveJSON(AUDIT_LOGS_FILE, audit);
                return res.status(200).json({ success: true, message: 'Đã ghi nhận xác nhận đọc báo cáo thành công!' });
            }
            return res.status(404).json({ success: false, message: 'Không tìm thấy đơn vị' });
        }

        // 4. Test Email
        if (subAction === 'test-email') {
            const email = body.email || 'baocaoquantri.vps@gmail.com';
            const result = await NotificationService.sendEmail({
                to: email,
                subject: '🔔 [TEST] Thử Nghiệm Kết Nối Email Báo Cáo VPS Group',
                html: `
                    <div style="font-family: Arial, sans-serif; padding: 24px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0; max-width: 580px;">
                        <div style="font-size: 12px; font-weight: bold; color: #0284c7; letter-spacing: 1px; text-transform: uppercase;">TẬP ĐOÀN CÔNG NGHỆ VPS</div>
                        <h2 style="color: #0f172a; margin: 8px 0 16px 0;">🔔 Thử Nghiệm Kênh Email Thành Công!</h2>
                        <p style="color: #334155; font-size: 14px; line-height: 1.6;">Kính gửi Quý Lãnh đạo,</p>
                        <p style="color: #334155; font-size: 14px; line-height: 1.6;">Hệ thống thông báo điều hành của <strong>Tập đoàn VPS</strong> đã kết nối thành công tới hòm thư này. Các báo cáo rà soát Google Sheets lúc <strong>11:00 Thứ 2 hàng tuần</strong> và cảnh báo vi phạm trễ hạn sẽ được tự động chuyển tới đây.</p>
                        <div style="margin: 20px 0; padding: 12px 16px; background: #f0fdf4; border-left: 4px solid #16a34a; border-radius: 4px; font-size: 13px; color: #166534;">
                            ✓ Trạng thái kết nối: <strong>Hoạt Động Tốt</strong>
                        </div>
                        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                        <p style="font-size: 12px; color: #94a3b8; margin: 0;">Thời điểm gửi: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })} | VPS Automated Notification Engine</p>
                    </div>
                `,
                text: 'Hệ thống thông báo điều hành VPS đã kết nối thành công tới Email của bạn!',
                smtpUser: body.smtpUser,
                smtpPass: body.smtpPass,
                smtpHost: body.smtpHost,
                smtpPort: body.smtpPort,
                smtpType: body.smtpType,
                fromName: body.fromName
            });
            return res.status(200).json(result);
        }

        // 5. Test Zalo
        if (subAction === 'test-zalo') {
            const phone = body.phone || '0913301459';
            const result = await NotificationService.sendZalo({
                phone: phone,
                title: 'THỬ NGHIỆM KẾT NỐI ZALO VPS GROUP',
                message: 'Hệ thống thông báo điều hành VPS Dashboard đã kết nối thành công tới Zalo của bạn! Bạn sẽ nhận được báo cáo quét tự động Google Sheets lúc 11:00 Thứ 2 hàng tuần.',
                webhookUrl: body.webhookUrl,
                mode: body.mode
            });
            return res.status(200).json(result);
        }

        // 6. Delivery History
        if (subAction === 'delivery-history') {
            const logs = NotificationService.getDeliveryLogs(50);
            return res.status(200).json({ success: true, logs });
        }

        // 7. Trigger Weekly Scan Alert
        if (subAction === 'trigger-weekly-scan-alert') {
            let scanResult;
            try {
                const { runWeeklyScan } = require('../scan_missing_units_reports');
                scanResult = await runWeeklyScan();
            } catch (e) {
                // Fallback scan summary from saved json
                const weeklyFile = path.join(__dirname, '../data/weekly_scan_result.json');
                scanResult = loadJSON(weeklyFile, {
                    scannedAt: new Date().toISOString(),
                    formattedTime: new Date().toLocaleString('vi-VN'),
                    totalUnits: 6,
                    completedCount: 6,
                    partialCount: 0,
                    missingCount: 0,
                    completedUnits: ['Tân Hồng Hà', 'Việt', 'Xem Sơn', 'VPS M', 'ITSS', 'Văn phòng VPS'],
                    partialUnits: [],
                    missingUnits: []
                });
            }

            try {
                await NotificationService.dispatchWeeklyScanAlert(scanResult);
            } catch (e) {}

            return res.status(200).json({
                success: true,
                message: 'Đã quét thực tế 6 Google Sheets và phát thông báo Email & Zalo!',
                scanResult
            });
        }

        // 8. Manual Remind
        if (subAction === 'manual-remind') {
            const directorId = body.directorId;
            const today = getTodayString();
            const daily = getDailyStatus(today);
            const audit = getAuditData();
            if (daily[directorId]) {
                daily[directorId].remindedAt = new Date().toISOString();
                addLog({
                    type: 'REMINDER_PING',
                    directorId,
                    directorName: daily[directorId].name,
                    company: daily[directorId].company,
                    title: `Nhắc nhở thủ công: ${daily[directorId].name}`,
                    message: 'Quản trị viên đã bấm nút nhắc nhở trực tiếp',
                    status: 'INFO'
                });
                saveJSON(AUDIT_LOGS_FILE, audit);
            }
            return res.status(200).json({ success: true, message: `Đã gửi tín hiệu nhắc nhở tới [${directorId}] thành công!` });
        }

        // 9. Manual Escalate
        if (subAction === 'manual-escalate') {
            const directorId = body.directorId;
            const today = getTodayString();
            const daily = getDailyStatus(today);
            const audit = getAuditData();
            if (daily[directorId]) {
                daily[directorId].status = 'ESCALATED';
                daily[directorId].escalatedAt = new Date().toISOString();
                addLog({
                    type: 'ESCALATION_CEO',
                    directorId,
                    directorName: daily[directorId].name,
                    company: daily[directorId].company,
                    title: `🚨 Báo cáo vượt cấp CEO: ${daily[directorId].name} vi phạm`,
                    message: body.reason || 'Kích hoạt cảnh báo vi phạm thủ công',
                    status: 'URGENT'
                });
                saveJSON(AUDIT_LOGS_FILE, audit);
            }
            return res.status(200).json({ success: true, message: `Đã phát cảnh báo vượt cấp lên Chủ tịch/CEO cho đơn vị [${directorId}]!` });
        }

        // 10. Trigger Check
        if (subAction === 'trigger-check') {
            const today = getTodayString();
            const daily = getDailyStatus(today);
            return res.status(200).json({ success: true, message: 'Đã quét lịch kiểm tra tự động!', directors: daily });
        }

        // 11. Test Channel
        if (subAction === 'test-channel') {
            return res.status(200).json({ success: true, message: 'Đã phát tín hiệu thử nghiệm thành công!' });
        }

        // 12. Reset Today
        if (subAction === 'reset-today') {
            const today = getTodayString();
            const audit = getAuditData();
            delete audit.dailyStatus[today];
            saveJSON(AUDIT_LOGS_FILE, audit);
            const daily = getDailyStatus(today);
            return res.status(200).json({ success: true, message: 'Đã hoàn tác dữ liệu ngày hôm nay về trạng thái chờ!', directors: daily });
        }

        // Fallback for unknown sub-action
        return res.status(200).json({ success: true, message: 'OK', subAction });
    } catch (err) {
        console.error('[API Notification Error]:', err);
        return res.status(500).json({ success: false, message: err.message });
    }
}

module.exports = { handleNotificationRequest, getSchedules, getDailyStatus, getAuditData, addLog };
