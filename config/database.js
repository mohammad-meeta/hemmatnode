'use strict';

/* Export */
module.exports = {
    default: 'mongodb',

    connections: {
        mongodb: {
            driver: 'mongodb',
            host: process.env.DB_HOST || 'localhost',
            port: process.env.DB_PORT || 27017,
            name: process.env.DB_NAME || 'ojvar_db',
            user: process.env.DB_USER || '',
            password: process.env.DB_PASSWORD || '',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        }
    }
};
