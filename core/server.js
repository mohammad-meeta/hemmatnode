'use strict';

/**
 * Server class
 */
function Server() { }
module.exports = Server;

/**
 * Init server 
 */
Server.boot = function boot() {
    const path = require('path');

    /* DotEnv */
    const dotenv = require('dotenv');
    dotenv.config();

    /* Global Fucntions */
    const globalFunctions = require(path.resolve('core', 'modules', 'global-module'));
    globalFunctions.setup(Server);

    /* Logger */
    const logger = use('core', 'modules', 'logger-module');
    logger.setup(Server);

    /* Express */
    const express = use('core', 'modules', 'express-module');
    express.setup(Server);

    /* Router */
    const router = use('core', 'modules', 'router-module');
    router.setup(Server);

    /* Mongoose */
    const mongoose = use('core', 'modules', 'mongoose-module');
    mongoose.setup(Server);

    /* Add server to global variable */
    global.Server = Server;

    return Server;
};

/**
 * Run server
 */
Server.run = function run() {
    const appConfig = use('config', 'app');
    let engine;

    if (appConfig.https) {
        engine = Server.httpsEngine(appConfig);
    }
    else {
        engine = Server.httpEngine(appConfig);
    }

    /* Start listening */
    engine = engine.server.createServer(engine.options, App);
    engine.listen(appConfig.port, function () {
        const url = appConfig.host.replace(/\/$/g, '')
            + `:${appConfig.port}`;

        Logger.info(`Server started at port ${url}`);
    });

    return engine;
};


/**
 * Http Engine
 */
Server.httpEngine = function httpEngine(config) {
    const http = require('http');

    return {
        server: http,
        options: {}
    };
};

/**
 * Https Engine
 */
Server.httpsEngine = function httpsEngine(config) {
    const https = require('https');
    const fs = require('fs');

    const options = {
        key: fs.readFileSync(config.ssl_key, 'utf-8'),
        cert: fs.readFileSync(config.ssl_cert, 'utf-8')
    };

    return {
        server: https,
        options: options
    };
};
