'use strict';

/**
 * Mongoose module
 */
function MongooseModule() {}
module.exports = MongooseModule;

/**
 * Setup function
 */
MongooseModule.setup = function setup(server) {
    const mongoose = require('mongoose');
    const databaseConfig = use('config', 'database');
    const config = databaseConfig.connections[databaseConfig.default];

    /* Connect to mongoose */
    const connectionString = MongooseModule.getConnectionString(config);

    /* Setup hooks */
    mongoose.connection.on('connected', () => {
        Logger.info('Connecting to mongodb successfully');

        MongooseModule.loadModels();
    });

    mongoose.connection.on('disconnected', () => {
        Logger.info('Connection to mongodb was disconnected');
    });

    mongoose.connection.on('error', err => {
        Logger.error('Connection to mongodb failed!');
        Logger.error(err);
        console.log(err)
        process.exit(1);
    });

    /* Try to connect */
    mongoose.connect(connectionString, config.options || {});

    return server;
};

/**
 * Generate connection string
 */
MongooseModule.getConnectionString = function getConnectionString(config) {
    let connectionString = `${config.host}:${config.port}/${config.name}`;

    if ((config.user || '')) {
        if ((config.password || '')) {
            connectionString = `${config.user}:${config.password}@${connectionString}`;
        } else {
            connectionString = `${config.user}@${connectionString}`;
        }
    }

    connectionString = `mongodb://${connectionString}`;

    return connectionString;
};

/**
 * Load models
 */
MongooseModule.loadModels = function loadModels() {
    const fs = require('fs');
    const path = rPath('models');

    if (fs.existsSync(path)) {
        const modelsList = fs.readdirSync(path);

        modelsList.forEach(file => {
            const model = use('models', file);
            model.setup();
        });
    }
};
