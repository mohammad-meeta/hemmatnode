"use strict";

/* Prepare options */
let auth = null;
if (process.env.DB_USER || process.env.DB_PASSWORD) {
    auth = {};

    if (process.env.DB_USER) {
        auth.user = process.env.DB_USER;
    }

    if (process.env.DB_PASSWORD) {
        auth.password = process.env.DB_PASSWORD;
    }
}

/* Export */
module.exports = {
    default: "mongodb",

    connections: {
        mongodb: {
            driver: "mongodb",
            host: process.env.DB_HOST || "localhost",
            port: process.env.DB_PORT || 27017,
            name: process.env.DB_NAME || "sunset_db",
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            options: {
                auth,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
        },
    },
};
