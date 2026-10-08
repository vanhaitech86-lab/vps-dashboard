const { handleNotificationRequest } = require('../_notifications_core');

export default async function handler(req, res) {
    return handleNotificationRequest(req, res, 'schedules');
}
