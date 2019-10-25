'use strict';

const protocol = process.env.HTTPS ? 'https' : 'http';
const port = process.env.PORT || 8000;
const host = process.env.HOST || `${protocol}://localhost`;

/* Export */
module.exports = {
    debug: process.env.DEBUG || false,
    https: process.env.HTTPS || false,
    port: port,
    host: host,
    ssl_key: process.env.SSL_KEY ? rPath(process.env.SSL_KEY) : rPath('config', 'ssl', 'key.pem'),
    ssl_cert: process.env.SSL_CERT ? rPath(process.env.SSL_CERT) : rPath('config', 'ssl', 'cert.pem')
};
