'use strict';

/**
 * Express module
 */
function ExpressModule() {}
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

    /* Setup user-middlewares */
    ExpressModule.setupUserMiddlewares(server);

    /* Setup pug */
    ExpressModule.setupPug(server);

    return server;
};

/**
 * Setup user-middlewares
 */
ExpressModule.setupUserMiddlewares = function setupUserMiddlewares(server) {
    const fs = require('fs');
    const path = rPath('app/middlewares');
    const files = fs.readdirSync(path) || [];

    const app = server.App;

    files.forEach(file => {
        const Middleware = use(path, file);

        app.use(Middleware);
    });
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
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(bodyParser.json());

    /* Setup cookie-parser */
    const authConfig = use('config/auth');
    const cookieParser = require('cookie-parser');
    app.use(cookieParser(authConfig.cookie.secret));

    /* Setup csrf */
    const csurf = require('csurf');
    global.csrf = csurf({
        cookie: true
    });

    return server;
};

/**
 * Setup pug
 */
ExpressModule.setupPug = function setupPug(server) {
    const express = require('express');
    const app = server.App;
    const appConfig = use('config', 'app');
    const viewsPath = rPath(appConfig.views_path);
    const outputPath = rPath(appConfig.output_path);

    /* Static folder */
    app.use(express.static(outputPath));

    /* Setup Template-engine */
    app.set('view engine', 'pug');
    app.set('views', viewsPath);
};