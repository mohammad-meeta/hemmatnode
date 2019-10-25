'use strict';

/**
 * Express module
 */
function ExpressModule() { }
module.exports = ExpressModule;

/**
 * Setup function
 */
ExpressModule.setup = function setup(server) {
    const express = require('express');
    const app = express();

    /* Setup app */
    ExpressModule.App = app;
    global.App = app;
    server.App = app;

    /* Setup middlewares */
    ExpressModule.setupMiddlewares(server);

    return server;
};

/**
 * Setup middlewares
 */
ExpressModule.setupMiddlewares = function setupMiddlewares(server) {
    const app = server.App;

    /* Setup helmet */
    const helmet = require('helmet')
    app.use(helmet());

    /* Setup body-parser */
    const bodyParser = require('body-parser');
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());

    /* Setup cookie-parser */
    const cookieParser = require('cookie-parser')
    app.use(cookieParser());

    /* Setup csrf */
    const csurf = require('csurf');
    global.csrf = csurf({ cookie: true });

    return server;
};
