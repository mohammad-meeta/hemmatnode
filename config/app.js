'use strict';

const protocol = (process.env.HTTPS == "true") ? 'https' : 'http';
const port = process.env.PORT || 8000;
const host = `${protocol}://` + (process.env.HOST || 'localhost');

/* Export */
module.exports = {
    views_path: process.env.VIEWS_PATH || 'resources/views',
    debug: process.env.DEBUG || false,
    https: process.env.HTTPS || false,
    port: port,
    host: host,
    output_path: process.env.OUTPUT_PATH || 'public',
    ssl_key: process.env.SSL_KEY ? rPath(process.env.SSL_KEY) : rPath('config', 'ssl', 'key.pem'),
    ssl_cert: process.env.SSL_CERT ? rPath(process.env.SSL_CERT) : rPath('config', 'ssl', 'cert.pem'),
    session: {
        secret: process.env.APP_SESSION_SECRET || '_=my@@lovely$earth@@=-',
        resave: process.env.APP_SESSION_RESAVE || false,
        saveUninitialized: process.env.APP_SESSION_SAVE_UNINITIALIZED || true,
        cookie: {
            secure: process.env.APP_SESSION_COOKIE_SECURE || true
        }
    }
};
