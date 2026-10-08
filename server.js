const http = require('http');
const fs = require('fs');
const path = require('path');
const https = require('https');
const NotificationService = require('./notification_service');

const PORT = 3000;
const PUBLIC_DIR = __dirname;
const DATA_DIR = path.join(__dirname, 'data');
const SCHEDULES_FILE = path.join(DATA_DIR, 'notification_schedules.json');
const AUDIT_LOGS_FILE = path.join(DATA_DIR, 'notification_audit_logs.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}

const MIME_TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.css':  'text/css; charset=utf-8',
    '.js':   'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.png':  'image/png',
    '.jpg':  'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.gif':  'image/gif',
    '.svg':  'image/svg+xml',
    '.ico':  'image/x-icon',
    '.webp': 'image/webp',
    '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    '.csv':  'text/csv; charset=utf-8',
    '.zip':  'application/zip'
};

// =============================================================================
// NOTIFICATION & REPORT MONITORING ENGINE (HỆ THỐNG GIÁM SÁT BÁO CÁO VPS)
// =============================================================================

function loadJSON(filePath, fallback = {}) {
    try {
        if (fs.existsSync(filePath)) {
            const raw = fs.readFileSync(filePath, 'utf8');
            return JSON.parse(raw);
        }
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err.message);
    }
    return fallback;
}

function saveJSON(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
        return true;
    } catch (err) {
        console.error(`Error writing ${filePath}:`, err.message);
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

const NotificationEngine = {
    getSchedules() {
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
                        telegram: { enabled: false, botToken: '', ceoChatId: '' },
                        zalo: { enabled: false, webhookUrl: 'http://localhost:5000/api/zalo-webhook', ceoPhone: '0913301459' },
                        customWebhook: { enabled: false, url: '' }
                    }
                },
                directors: DEFAULT_DIRECTORS
            };
            saveJSON(SCHEDULES_FILE, schedules);
        }
        return schedules;
    },

    saveSchedules(newSchedules) {
        return saveJSON(SCHEDULES_FILE, newSchedules);
    },

    _auditData: null,
    getAuditData() {
        if (!this._auditData) {
            this._auditData = loadJSON(AUDIT_LOGS_FILE, null);
        }
        if (!this._auditData || !this._auditData.dailyStatus) {
            this._auditData = { logs: [], dailyStatus: {} };
            saveJSON(AUDIT_LOGS_FILE, this._auditData);
        }
        return this._auditData;
    },

    saveAuditData(data) {
        if (data) this._auditData = data;
        return saveJSON(AUDIT_LOGS_FILE, this._auditData);
    },

    addLog(entry) {
        const audit = this.getAuditData();
        const logItem = {
            id: 'log_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
            timestamp: new Date().toISOString(),
            ...entry
        };
        audit.logs.unshift(logItem);
        // Keep up to 500 recent logs
        if (audit.logs.length > 500) audit.logs = audit.logs.slice(0, 500);
        this.saveAuditData();
        return logItem;
    },

    getDailyStatus(dateStr) {
        const targetDate = dateStr || getTodayString();
        const schedules = this.getSchedules();
        const audit = this.getAuditData();

        if (!audit.dailyStatus[targetDate]) {
            audit.dailyStatus[targetDate] = {};
        }

        const daily = audit.dailyStatus[targetDate];
        const directors = schedules.directors || DEFAULT_DIRECTORS;

        directors.forEach(dir => {
            if (!daily[dir.id]) {
                daily[dir.id] = {
                    directorId: dir.id,
                    directorName: dir.name,
                    company: dir.company,
                    scheduledTime: dir.scheduledTime || schedules.general.defaultTime || '08:30',
                    status: 'PENDING', // PENDING, READ, ESCALATED
                    remindedAt: null,
                    readAt: null,
                    escalatedAt: null,
                    notes: ''
                };
            } else {
                // Keep name and company fresh
                daily[dir.id].directorName = dir.name;
                daily[dir.id].company = dir.company;
            }
        });

        this.saveAuditData();
        return daily;
    },

    confirmDirectorRead(directorId, notes = '') {
        const today = getTodayString();
        const daily = this.getDailyStatus(today);

        const normalizedId = (directorId || '').toUpperCase().trim();
        let foundKey = Object.keys(daily).find(k => k === normalizedId);
        if (!foundKey && normalizedId === 'XEMSON') foundKey = 'XESCO';

        if (!foundKey || !daily[foundKey]) {
            return { success: false, message: `Không tìm thấy hồ sơ Giám đốc cho mã: ${directorId}` };
        }

        const dirRecord = daily[foundKey];
        const wasEscalated = dirRecord.status === 'ESCALATED';
        const now = new Date();
        const timeFormatted = now.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        dirRecord.status = 'READ';
        dirRecord.readAt = now.toISOString();
        if (notes) dirRecord.notes = notes;

        this.addLog({
            type: 'CONFIRM_READ',
            directorId: dirRecord.directorId,
            directorName: dirRecord.directorName,
            company: dirRecord.company,
            title: `Xác nhận đã đọc báo cáo: ${dirRecord.directorName}`,
            message: `${dirRecord.directorName} (${dirRecord.company}) đã xác nhận hoàn thành đọc & duyệt số liệu Dashboard lúc ${timeFormatted}.${wasEscalated ? ' (Lưu ý: Báo cáo đã từng bị cảnh báo quá hạn trước đó)' : ' (Đúng hạn quy định)'}`,
            status: 'SUCCESS'
        });

        this.saveAuditData();

        return {
            success: true,
            data: dirRecord,
            message: `Đã ghi nhận ${dirRecord.directorName} đọc báo cáo thành công lúc ${timeFormatted}!`
        };
    },

    triggerEscalationToCEO(directorId, reason = '') {
        const today = getTodayString();
        const daily = this.getDailyStatus(today);
        const schedules = this.getSchedules();

        const dirRecord = daily[directorId];
        if (!dirRecord) return { success: false, message: 'Không tìm thấy hồ sơ Giám đốc' };

        const now = new Date();
        dirRecord.status = 'ESCALATED';
        dirRecord.escalatedAt = now.toISOString();

        const escalationTitle = `🚨 CẢNH BÁO VI PHẠM: ${dirRecord.directorName} chưa xem báo cáo!`;
        const escalationMsg = `Kính báo Chủ tịch / Tổng Giám Đốc VPS: ${dirRecord.directorName} (${dirRecord.company}) CHƯA ĐỌC / DUYỆT BÁO CÁO theo lịch quy định ngày ${today} (Giờ quy định: ${dirRecord.scheduledTime}). Đã quá thời hạn cho phép! Hệ thống tự động gửi báo cáo vượt cấp đề nghị Lãnh đạo chỉ đạo kịp thời.`;

        this.addLog({
            type: 'ESCALATION_CEO',
            directorId: dirRecord.directorId,
            directorName: dirRecord.directorName,
            company: dirRecord.company,
            title: escalationTitle,
            message: escalationMsg,
            status: 'URGENT'
        });

        this.saveAuditData();

        // Dispatch to external channels (Telegram, Zalo, Webhook)
        this.dispatchExternalNotification(escalationTitle, escalationMsg, schedules);

        return { success: true, data: dirRecord, message: `Đã kích hoạt gửi cảnh báo vi phạm lên Chủ tịch/CEO thành công!` };
    },

    triggerReminder(directorId) {
        const today = getTodayString();
        const daily = this.getDailyStatus(today);
        const schedules = this.getSchedules();

        const dirRecord = daily[directorId];
        if (!dirRecord) return { success: false, message: 'Không tìm thấy hồ sơ Giám đốc' };

        const now = new Date();
        dirRecord.remindedAt = now.toISOString();

        const reminderTitle = `⏰ NHẮC NHỞ: Đến giờ xem báo cáo Dashboard (${dirRecord.company})`;
        const reminderMsg = `Kính gửi ${dirRecord.directorName}: Đã đến giờ rà soát số liệu điều hành Dashboard ngày hôm nay (${dirRecord.scheduledTime}). Vui lòng truy cập hệ thống và bấm 'Xác nhận đã đọc báo cáo'. Lưu ý: Quá thời gian quy định (${schedules.general.gracePeriodMinutes || 30} phút), hệ thống sẽ tự động gửi thông báo báo cáo vượt cấp đến Chủ tịch / CEO!`;

        this.addLog({
            type: 'REMINDER',
            directorId: dirRecord.directorId,
            directorName: dirRecord.directorName,
            company: dirRecord.company,
            title: reminderTitle,
            message: reminderMsg,
            status: 'SENT'
        });

        this.saveAuditData();

        this.dispatchExternalNotification(reminderTitle, reminderMsg, schedules);

        return { success: true, data: dirRecord, message: `Đã gửi nhắc nhở đến ${dirRecord.directorName} thành công!` };
    },

    // Dispatch messages to Email, Zalo, Telegram Bot, or Webhook
    dispatchExternalNotification(title, message, schedules) {
        const channels = schedules.general.channels || {};

        // 1. Email Integration
        if (channels.email && channels.email.enabled) {
            NotificationService.sendEmail({
                to: channels.email.recipientEmails,
                subject: `[VPS Group] ${title}`,
                text: `${title}\n\n${message}\n\nChi tiết xem tại Dashboard: http://localhost:3000`
            }).catch(e => console.warn('[Email Alert Error]:', e.message));
        }

        // 2. Zalo Integration
        if (channels.zalo && channels.zalo.enabled) {
            NotificationService.sendZalo({
                phone: channels.zalo.ceoPhone,
                title: title,
                message: message
            }).catch(e => console.warn('[Zalo Alert Error]:', e.message));
        }

        // 3. Telegram Bot Integration
        if (channels.telegram && channels.telegram.enabled && channels.telegram.botToken && channels.telegram.ceoChatId) {
            try {
                const token = channels.telegram.botToken.trim();
                const chatId = channels.telegram.ceoChatId.trim();
                const text = `*${title}*\n\n${message}\n\n🔗 Dashboard: http://localhost:3000`;
                const postData = JSON.stringify({ chat_id: chatId, text: text, parse_mode: 'Markdown' });

                const req = https.request({
                    hostname: 'api.telegram.org',
                    port: 443,
                    path: `/bot${token}/sendMessage`,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    },
                    timeout: 8000
                }, (res) => {
                    console.log(`[Telegram Alert] Status: ${res.statusCode}`);
                });
                req.on('error', (err) => console.warn('[Telegram Alert Error]:', err.message));
                req.write(postData);
                req.end();
            } catch (err) {
                console.warn('[Telegram Dispatch Exception]:', err.message);
            }
        }

        // 2. Custom Webhook or Zalo HAITECH Bot Integration
        const webhookUrl = (channels.zalo && channels.zalo.enabled && channels.zalo.webhookUrl) 
            ? channels.zalo.webhookUrl 
            : (channels.customWebhook && channels.customWebhook.enabled && channels.customWebhook.url ? channels.customWebhook.url : null);

        if (webhookUrl) {
            try {
                const urlObj = new URL(webhookUrl);
                const client = urlObj.protocol === 'https:' ? https : http;
                const postData = JSON.stringify({
                    source: 'VPS_GROUP_DASHBOARD_ALERT',
                    title: title,
                    message: message,
                    timestamp: new Date().toISOString(),
                    recipientRole: 'CEO'
                });

                const req = client.request({
                    hostname: urlObj.hostname,
                    port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
                    path: urlObj.pathname + urlObj.search,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': Buffer.byteLength(postData)
                    },
                    timeout: 8000
                }, (res) => {
                    console.log(`[Webhook Alert] Status: ${res.statusCode}`);
                });
                req.on('error', (err) => console.warn('[Webhook Alert Error]:', err.message));
                req.write(postData);
                req.end();
            } catch (err) {
                console.warn('[Webhook Dispatch Exception]:', err.message);
            }
        }
    },

    // Background Scheduler Check Routine
    checkAutomationCycle() {
        const schedules = this.getSchedules();
        if (!schedules.general.enabled) return;

        const now = new Date();
        const currentDayOfWeek = now.getDay(); // 0: Sun, 1: Mon, ..., 6: Sat
        const activeDays = schedules.general.activeDays || [1, 2, 3, 4, 5, 6];

        if (!activeDays.includes(currentDayOfWeek)) {
            return; // Not an active day
        }

        const today = getTodayString();
        const daily = this.getDailyStatus(today);
        const currentMinutes = now.getHours() * 60 + now.getMinutes();
        const gracePeriod = parseInt(schedules.general.gracePeriodMinutes, 10) || 30;

        const directors = schedules.directors || DEFAULT_DIRECTORS;

        directors.forEach(dir => {
            if (!dir.enabled) return;

            const timeStr = dir.scheduledTime || schedules.general.defaultTime || '08:30';
            const [h, m] = timeStr.split(':').map(Number);
            const scheduledMinutes = h * 60 + m;
            const deadlineMinutes = scheduledMinutes + gracePeriod;

            const record = daily[dir.id];
            if (!record) return;

            // Step 1: Trigger Reminder when current time >= scheduled time
            if (currentMinutes >= scheduledMinutes && record.status === 'PENDING' && !record.remindedAt) {
                console.log(`[Auto Reminder] Đến giờ báo cáo cho ${dir.name} (${timeStr})`);
                this.triggerReminder(dir.id);
            }

            // Step 2: Trigger ESCALATION TO CEO when current time >= deadline and still PENDING
            if (currentMinutes >= deadlineMinutes && record.status === 'PENDING') {
                console.log(`[Auto Escalation] ${dir.name} quá hạn xem báo cáo! Gửi thông báo tới CEO.`);
                this.triggerEscalationToCEO(dir.id, `Quá hạn ${gracePeriod} phút không đọc báo cáo.`);
            }
        });

        // Step 3: Quét tự động báo cáo Google Sheets định kỳ lúc 11h Thứ 2 hàng tuần
        if (currentDayOfWeek === 1 && now.getHours() === 11 && now.getMinutes() >= 0 && now.getMinutes() <= 5) {
            if (!this._lastWeeklyScanDate || this._lastWeeklyScanDate !== today) {
                this._lastWeeklyScanDate = today;
                console.log(`[Weekly Scan 11h Thứ 2] Bắt đầu quét kiểm tra nhập liệu Google Sheets của các đơn vị...`);
                try {
                    const { runWeeklyScan } = require('./scan_missing_units_reports');
                    runWeeklyScan().then(async scanResult => {
                        console.log(`[Weekly Scan 11h Thứ 2] Hoàn tất quét! Chưa nhập: ${scanResult.missingCount}, Thiếu: ${scanResult.partialCount}, Đủ: ${scanResult.completedCount}`);
                        
                        // Tự động phát thông báo Email & Zalo tới Ban Lãnh Đạo
                        try {
                            await NotificationService.dispatchWeeklyScanAlert(scanResult);
                        } catch (errAlert) {
                            console.error('Lỗi khi gửi cảnh báo Email/Zalo hàng tuần:', errAlert);
                        }

                        if (scanResult.missingCount > 0 || scanResult.partialCount > 0) {
                            const uncompletedNames = [...scanResult.missingUnits, ...scanResult.partialUnits.map(p => p.name)].join(', ');
                            this.addLog({
                                type: 'ESCALATION_CEO',
                                directorId: 'SYSTEM',
                                directorName: 'Hệ Thống Quét Tự Động',
                                company: 'Tập đoàn VPS',
                                title: `🚨 CẢNH BÁO 11H THỨ 2: Các đơn vị chưa hoàn thành nhập báo cáo Google Sheets!`,
                                message: `Đã đến hạn 11:00 Thứ 2 hàng tuần. Các đơn vị sau đây chưa hoàn thành nhập liệu: ${uncompletedNames}. Đề nghị lãnh đạo kiểm tra và chỉ đạo. (Đã tự động gửi thông báo Email & Zalo)`,
                                status: 'URGENT'
                            });
                            this.saveAuditData();
                        }
                    }).catch(err => {
                        console.error('Lỗi khi quét báo cáo hàng tuần:', err);
                    });
                } catch (e) {
                    console.error('Không thể nạp module scan_missing_units_reports:', e);
                }
            }
        }
    }
};

// Start background automation loop (runs every 45 seconds)
setInterval(() => {
    try {
        NotificationEngine.checkAutomationCycle();
    } catch (e) {
        console.error('Error in checkAutomationCycle:', e);
    }
}, 45000);

// =============================================================================
// HTTP REQUEST HANDLER & REST API ROUTER
// =============================================================================

function parseRequestBody(req) {
    return new Promise((resolve) => {
        let body = '';
        req.on('data', chunk => { body += chunk; });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (err) {
                resolve({});
            }
        });
    });
}

function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
    // Enable CORS preflight
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }

    let reqUrl = decodeURI(req.url.split('?')[0]);

    // -------------------------------------------------------------------------
    // REST API ENDPOINTS: /api/notifications/...
    // -------------------------------------------------------------------------
    if (reqUrl.startsWith('/api/notifications')) {
        const subPath = reqUrl.replace('/api/notifications', '');

        // 1. GET /api/notifications/schedules
        if (req.method === 'GET' && (subPath === '/schedules' || subPath === '/schedules/')) {
            const schedules = NotificationEngine.getSchedules();
            return sendJSON(res, 200, { success: true, data: schedules });
        }

        // 2. POST /api/notifications/schedules
        if (req.method === 'POST' && (subPath === '/schedules' || subPath === '/schedules/')) {
            const body = await parseRequestBody(req);
            if (body && body.schedules) {
                NotificationEngine.saveSchedules(body.schedules);
                NotificationEngine.addLog({
                    type: 'CONFIG_UPDATE',
                    title: 'Cập nhật cấu hình lịch báo cáo',
                    message: 'Quản trị viên đã cập nhật lại quy định giờ xem báo cáo và thời gian gia hạn.',
                    status: 'INFO'
                });
                return sendJSON(res, 200, { success: true, message: 'Đã lưu cấu hình thành công!' });
            }
            return sendJSON(res, 400, { success: false, message: 'Dữ liệu không hợp lệ' });
        }

        // 3. GET /api/notifications/status (Get live status for today)
        if (req.method === 'GET' && (subPath === '/status' || subPath === '/status/')) {
            const today = getTodayString();
            const daily = NotificationEngine.getDailyStatus(today);
            const audit = NotificationEngine.getAuditData();
            const schedules = NotificationEngine.getSchedules();

            // Calculate summary counters
            const records = Object.values(daily);
            const total = records.length;
            const readCount = records.filter(r => r.status === 'READ').length;
            const pendingCount = records.filter(r => r.status === 'PENDING').length;
            const escalatedCount = records.filter(r => r.status === 'ESCALATED').length;

            return sendJSON(res, 200, {
                success: true,
                date: today,
                summary: { total, readCount, pendingCount, escalatedCount },
                directors: daily,
                schedules: schedules.general,
                recentLogs: (audit.logs || []).slice(0, 30)
            });
        }

        // 4. POST /api/notifications/confirm-read (Director confirms reading report)
        if (req.method === 'POST' && (subPath === '/confirm-read' || subPath === '/confirm-read/')) {
            const body = await parseRequestBody(req);
            const directorId = body.directorId;
            const notes = body.notes || '';
            const result = NotificationEngine.confirmDirectorRead(directorId, notes);
            return sendJSON(res, result.success ? 200 : 400, result);
        }

        // 5. POST /api/notifications/manual-remind (Manual reminder ping)
        if (req.method === 'POST' && (subPath === '/manual-remind' || subPath === '/manual-remind/')) {
            const body = await parseRequestBody(req);
            const result = NotificationEngine.triggerReminder(body.directorId);
            return sendJSON(res, result.success ? 200 : 400, result);
        }

        // 6. POST /api/notifications/manual-escalate (Manual escalate alert to CEO)
        if (req.method === 'POST' && (subPath === '/manual-escalate' || subPath === '/manual-escalate/')) {
            const body = await parseRequestBody(req);
            const result = NotificationEngine.triggerEscalationToCEO(body.directorId, body.reason || 'Kích hoạt cảnh báo vi phạm thủ công bởi Quản trị viên');
            return sendJSON(res, result.success ? 200 : 400, result);
        }

        // 7. GET /api/notifications/audit-logs
        if (req.method === 'GET' && (subPath === '/audit-logs' || subPath === '/audit-logs/')) {
            const audit = NotificationEngine.getAuditData();
            return sendJSON(res, 200, { success: true, logs: audit.logs || [] });
        }

        // 8. POST /api/notifications/trigger-check (Trigger schedule scan now)
        if (req.method === 'POST' && (subPath === '/trigger-check' || subPath === '/trigger-check/')) {
            NotificationEngine.checkAutomationCycle();
            const today = getTodayString();
            const daily = NotificationEngine.getDailyStatus(today);
            return sendJSON(res, 200, { success: true, message: 'Đã quét lịch kiểm tra tự động thành công!', directors: daily });
        }

        // 9. POST /api/notifications/test-channel (Test message dispatch)
        if (req.method === 'POST' && (subPath === '/test-channel' || subPath === '/test-channel/')) {
            const body = await parseRequestBody(req);
            const schedules = NotificationEngine.getSchedules();
            const testTitle = '🔔 THỬ NGHIỆM HỆ THỐNG THÔNG BÁO BÁO CÁO VPS';
            const testMsg = `Đây là tin nhắn thử nghiệm gửi tới kênh [${body.channel || 'Tất cả'}]. Hệ thống thông báo tự động và cảnh báo vượt cấp Chủ tịch/CEO đang hoạt động bình thường!`;
            NotificationEngine.dispatchExternalNotification(testTitle, testMsg, schedules);
            return sendJSON(res, 200, { success: true, message: 'Đã phát tín hiệu thử nghiệm thành công!' });
        }

        // 10. POST /api/notifications/reset-today (Reset status for testing)
        if (req.method === 'POST' && (subPath === '/reset-today' || subPath === '/reset-today/')) {
            const today = getTodayString();
            const audit = NotificationEngine.getAuditData();
            delete audit.dailyStatus[today];
            NotificationEngine.saveAuditData(audit);
            const daily = NotificationEngine.getDailyStatus(today);
            return sendJSON(res, 200, { success: true, message: 'Đã hoàn tác dữ liệu ngày hôm nay về trạng thái chờ!', directors: daily });
        }

        // 11. POST /api/notifications/test-email (Test send email)
        if (req.method === 'POST' && (subPath === '/test-email' || subPath === '/test-email/')) {
            const body = await parseRequestBody(req);
            const testEmail = body.email;
            const result = await NotificationService.sendEmail({
                to: testEmail,
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
                text: 'Hệ thống thông báo điều hành VPS đã kết nối thành công tới Email của bạn!'
            });
            return sendJSON(res, 200, result);
        }

        // 12. POST /api/notifications/test-zalo (Test send Zalo message)
        if (req.method === 'POST' && (subPath === '/test-zalo' || subPath === '/test-zalo/')) {
            const body = await parseRequestBody(req);
            const testPhone = body.phone;
            const result = await NotificationService.sendZalo({
                phone: testPhone,
                title: 'THỬ NGHIỆM KẾT NỐI ZALO VPS GROUP',
                message: 'Hệ thống thông báo điều hành VPS Dashboard đã kết nối thành công tới Zalo của bạn! Bạn sẽ nhận được báo cáo quét tự động Google Sheets lúc 11:00 Thứ 2 hàng tuần.'
            });
            return sendJSON(res, 200, result);
        }

        // 13. GET /api/notifications/delivery-history
        if (req.method === 'GET' && (subPath === '/delivery-history' || subPath === '/delivery-history/')) {
            const logs = NotificationService.getDeliveryLogs(50);
            return sendJSON(res, 200, { success: true, logs });
        }

        // 14. POST /api/notifications/trigger-weekly-scan-alert (Trigger scan & dispatch immediately)
        if (req.method === 'POST' && (subPath === '/trigger-weekly-scan-alert' || subPath === '/trigger-weekly-scan-alert/')) {
            try {
                const { runWeeklyScan } = require('./scan_missing_units_reports');
                const scanResult = await runWeeklyScan();
                const alertResult = await NotificationService.dispatchWeeklyScanAlert(scanResult);
                return sendJSON(res, 200, { 
                    success: true, 
                    message: 'Đã quét toàn bộ 6 Google Sheets và phát thông báo Email & Zalo thành công!',
                    scanResult, 
                    alertResult 
                });
            } catch (errScan) {
                return sendJSON(res, 500, { success: false, message: 'Lỗi quét báo cáo: ' + errScan.message });
            }
        }

        return sendJSON(res, 404, { success: false, message: 'API route not found' });
    }

    // -------------------------------------------------------------------------
    // STATIC FILE SERVING
    // -------------------------------------------------------------------------
    let reqPath = reqUrl;
    if (reqPath === '/' || reqPath === '') {
        reqPath = '/index.html';
    }

    const filePath = path.join(PUBLIC_DIR, reqPath);

    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403);
        res.end('Forbidden');
        return;
    }

    fs.stat(filePath, (err, stats) => {
        if (err || !stats.isFile()) {
            res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
            res.end('404 Not Found');
            return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const contentType = MIME_TYPES[ext] || 'application/octet-stream';
        const headers = { 
            'Content-Type': contentType, 
            'Content-Length': stats.size,
            'Cache-Control': 'no-cache, no-store, must-revalidate'
        };

        if (ext === '.zip' || ext === '.xlsx' || ext === '.csv') {
            headers['Content-Disposition'] = `attachment; filename="${encodeURIComponent(path.basename(filePath))}"`;
        }

        res.writeHead(200, headers);
        fs.createReadStream(filePath).pipe(res);
    });
});

// Dual-stack listening on all interfaces (IPv4 and IPv6)
server.listen(PORT, () => {
    console.log(`================================================================`);
    console.log(`🚀 VPS Group Dashboard & Notification Server running at:`);
    console.log(`   👉 http://localhost:${PORT}/`);
    console.log(`   👉 http://127.0.0.1:${PORT}/`);
    console.log(`   👉 API: http://localhost:${PORT}/api/notifications/status`);
    console.log(`   ⏰ Tự động kiểm tra lịch xem báo cáo định kỳ: ĐANG BẬT`);
    console.log(`================================================================`);
});
