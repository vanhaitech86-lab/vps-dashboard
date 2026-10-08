const { handleNotificationRequest } = require('../_notifications_core');

export default async function handler(req, res) {
    const slug = req.query.slug;
    const action = Array.isArray(slug) ? slug.join('/') : (slug || '');
    return handleNotificationRequest(req, res, action);
}
