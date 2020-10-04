'use strict';


const FS = require("fs");
const Multer = require("multer");
const MkDirP = require("mkdirp");
const uuidV4 = require("uuid").v4;
const MimeTypes = require("mime-types");

/**
 * Express module
 */
function ExpressModule() { }
module.exports = ExpressModule;

/**
 * Setup function
 */
ExpressModule.setup = async function setup(server) {
    const express = require('express');
    const app = express();

    /* Setup app */
    ExpressModule.App = app;
    global.App = app;
    server.App = app;

    /* trust first proxy */
    app.set('trust proxy', 1);

    /* Setup middlewares */
    await ExpressModule.setupMiddlewares(server);

    /* Setup user-middlewares */
    await ExpressModule.setupUserMiddlewares(server);

    /* Setup pug */
    await ExpressModule.setupPug(server);

    return server;
};

/**
 * Setup user-middlewares
 */
ExpressModule.setupUserMiddlewares = function setupUserMiddlewares(server) {
    const path = rPath('app/middlewares');
    const app = server.App;

    if (FS.existsSync(path)) {
        const files = FS.readdirSync(path) || [];

        files.forEach(file => {
            const Middleware = use(path, file);

            app.use(Middleware);
        });
    }
};

/**
 * Setup middlewares
 */
ExpressModule.setupMiddlewares = async function setupMiddlewares(server) {
    const app = server.App;

    /* Setup cors */
    const cors = require('cors');
    app.use(cors());

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
    app.use(cookieParser(authConfig.cookie.secret, authConfig.cookie.options));

    /* Setup csrf */
    const csurf = require('csurf');
    global.csrf = csurf({
        cookie: true
    });

    /* Setup session */
    const session = require('express-session');
    const expressSessionHelper = use('core/helpers/express-session-helper');
    const sessionConfig = expressSessionHelper.setupConfig(session);
    app.use(session(sessionConfig));

    /* Multer */
    /* Setup multer */
    const multerConfig = config("multer");

    /* Create Diretory */
    if (!FS.existsSync(multerConfig.storage)) {
        await MkDirP(multerConfig.storage);
    }

    const storage = Multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, multerConfig.storage);
        },
        filename: function (req, file, cb) {
            let ext = MimeTypes.extension(file.mimetype);

            if (ext) {
                ext = `.${ext}`;
            } else {
                ext = "";
            }

            let filename = `${uuidV4()}${ext}`;
            cb(null, filename);
        },
    });

    global.upload = Multer({
        limits: { fieldSize: multerConfig.maxSize },
        storage,
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
