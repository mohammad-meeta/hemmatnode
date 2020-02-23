'use strict';

const protocol = (process.env.HTTPS == "true") ? 'https' : 'http';
const port = process.env.PORT || 8000;
const host = `${protocol}://` + (process.env.HOST || 'localhost');

console.log(host)

/* Export */
module.exports = {
    views_path: process.env.VIEWS_PATH || 'resources/views',
    debug: process.env.DEBUG || false,
    https: process.env.HTTPS || false,
    port: port,
    host: host,
    output_path: process.env.OUTPUT_PATH || 'public',
    ssl_key: process.env.SSL_KEY ? rPath(process.env.SSL_KEY) : rPath('config', 'ssl', 'key.pem'),
    ssl_cert: process.env.SSL_CERT ? rPath(process.env.SSL_CERT) : rPath('config', 'ssl', 'cert.pem')
};
