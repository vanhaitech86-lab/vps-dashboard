const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const PUBLIC_DIR = __dirname;

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

const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');

    let reqPath = decodeURI(req.url.split('?')[0]);
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
        const headers = { 'Content-Type': contentType, 'Content-Length': stats.size };

        if (ext === '.zip' || ext === '.xlsx' || ext === '.csv') {
            headers['Content-Disposition'] = `attachment; filename="${encodeURIComponent(path.basename(filePath))}"`;
        }

        res.writeHead(200, headers);
        fs.createReadStream(filePath).pipe(res);
    });
});

// Dual-stack listening on all interfaces (IPv4 and IPv6)
server.listen(PORT, () => {
    console.log(`VPS Group Server running at:`);
    console.log(`- http://localhost:${PORT}/`);
    console.log(`- http://127.0.0.1:${PORT}/`);
});
