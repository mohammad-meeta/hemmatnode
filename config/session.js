'use strict';

const protocol = (process.env.HTTPS == "true") ? 'https' : 'http';
const port = process.env.PORT || 8000;
const host = `${protocol}://` + (process.env.HOST || 'localhost');

/* Export */
module.exports = {
    session_store: process.env.APP_SESSION_STORE,
    secret: process.env.APP_SESSION_SECRET || '_=my@@lovely$earth@@=-',
    resave: process.env.APP_SESSION_RESAVE || false,
    saveUninitialized: process.env.APP_SESSION_SAVE_UNINITIALIZED || true,
    cookie: {
        secure: process.env.APP_SESSION_COOKIE_SECURE || true
    }
};
