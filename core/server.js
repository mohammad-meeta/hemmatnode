'use strict';

/**
 * Server class
 */
function Server() { }
module.exports = Server;

/**
 * Init server
 */
Server.boot = async function boot() {
    const path = require('path');

    /* DotEnv */
    const dotenv = require('dotenv');
    dotenv.config();

    /* Global Fucntions */
    const globalFunctions = require(path.resolve('core/modules/global-module'));
    await globalFunctions.setup(Server);

    /* Logger */
    const logger = use('core/modules/logger-module');
    await logger.setup(Server);

    /* Events */
    const events = use('core/modules/events-module');
    await events.setup(Server);

    /* Express */
    const express = use('core/modules/express-module');
    await express.setup(Server);

    /* Router */
    const router = use('core/modules/router-module');
    await router.setup(Server);

    /* Mongoose */
    const mongoose = use('core/modules/mongoose-module');
    await mongoose.setup(Server);

    /* Services */
    const services = use('core/modules/services-module');
    await services.setup(Server);

    /* Add server to global variable */
    global.Server = Server;

    return Server;
};

/**
 * Run server
 */
Server.run = async function run() {
    const appConfig = use('config/app');
    let engine;
    let server;

    if (appConfig.https == "true") {
        engine = Server.httpsEngine(appConfig);
    } else {
        engine = Server.httpEngine(appConfig);
    }

    /* Create server */
    server = await engine.server.createServer(engine.options, App);

    // server.listen(appConfig.port, appConfig.host, function () {
    server.listen(appConfig.port, function () {
        let url = appConfig.host.replace(/\/$/g, '');

        if (appConfig.port) {
            url += `:${appConfig.port}`;
        }

        Logger.info(`Server started at ${url}`);

        /* Set global variable */
        global.server = {
            engine,
            url,
            server
        };
    });

    return engine;
};


/**
 * Http Engine
 */
Server.httpEngine = function httpEngine(config) {
    const http = require('http');

    return {
        protocol: 'http',
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
        protocol: 'https',
        server: https,
        options: options
    };
};
