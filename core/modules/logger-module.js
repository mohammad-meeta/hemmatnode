'use strict';

/**
 * Logger module
 */
function LoggerModule() {}
module.exports = LoggerModule;

/* Defaults */
LoggerModule.logger = console;

/**
 * Setup function
 */
LoggerModule.setup = function setup(server) {
    LoggerModule.init(server);
    LoggerModule.setupTypes();

    /* Set server logger */
    server.Logger =
        global.Logger = LoggerModule;

    return server;
};

/**
 * Init function
 */
LoggerModule.init = function init(server) {
    const winston = require('winston');
    require('winston-daily-rotate-file');

    const logConfig = use('config/log');
    const appConfig = use('config/app');
    const logLevel = logConfig.level || '';

    var dailyTransport = new(winston.transports.DailyRotateFile)({
        level: logLevel,
        filename: 'logs/log-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '7d'
    });

    const errorStackTracerFormat = winston.format(function (info) {
        if (info.stack) {
            info.message = `${info.message} ${info.stack}`;
        }

        return info;
    });

    const logger = winston.createLogger({
        level: logLevel,
        format: winston.format.combine(
            /* Necessary to produce the 'meta' property */
            winston.format.splat(),
            errorStackTracerFormat(),
            winston.format.simple()
        ),
        defaultMeta: null,
        transports: [
            dailyTransport
        ]
    });

    if (appConfig.debug == 'true') {
        logger.add(new winston.transports.Console({
            format: winston.format.simple(),
            level: logLevel
        }));
    }

    /* Set logger */
    LoggerModule.logger = logger;

    return server;
};

/**
 * Setup other log types
 * @param {Object} logger Logger Object
 */
LoggerModule.setupTypes = function setupTypes() {
    const appConfig = use('config/app');
    const types = [
        'info', 'debug', 'warn', 'error'
    ];

    types.forEach(function (type) {
        LoggerModule[type] = function log(msg) {
            if ((appConfig.debug == 'true') && (type == 'error')) {
                console.error(msg);
                console.trace('TRACE ERROR');
            }

            if ((type == 'error') &&
                !(msg instanceof Error)) {
                msg = new Error(msg);
            }

            LoggerModule.logger[type](msg);
        };
    });
}