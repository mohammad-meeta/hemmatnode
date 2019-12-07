'use strict';

/**
 * Logger module
 */
function LoggerModule() {}
module.exports = LoggerModule;

/* Defaults */
LoggerModule.Logger = console;

/**
 * Setup function
 */
LoggerModule.setup = function setup(server) {
    LoggerModule.init(server);

    return server;
};

/**
 * Init function
 */
LoggerModule.init = function init(server) {
    const winston = require('winston');
    require('winston-daily-rotate-file');

    const logConfig = use('config', 'log');
    const appConfig = use('config', 'app');
    const logLevel = logConfig.level || '';

    var dailyTransport = new(winston.transports.DailyRotateFile)({
        level: logLevel,
        filename: 'logs/log-%DATE%.log',
        datePattern: 'YYYY-MM-DD-HH',
        zippedArchive: true,
        maxSize: '10m',
        maxFiles: '7d'
    });

    // transport.on('rotate', function (oldFilename, newFilename) {
    // });

    const logger = winston.createLogger({
        level: logLevel,
        format: winston.format.json(),
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
    LoggerModule.Logger = logger;

    /* Set server logger */
    server.Logger = LoggerModule.Logger;
    global.Logger = server.Logger;

    return server;
};

/**
 * Log message
 */
LoggerModule.log = function log(type, msg) {
    const appConfig = use('config', 'app');

    if ((appConfig.debug == 'true') && (type == 'error')) {
        console.error(msg);
        console.trace('TRACE ERROR');
    }

    LoggerModule.logger[type](msg);
};

/* Setup other log types */
const types = [
    'info', 'debug', 'warn', 'error'
];
types.forEach(function (type) {
    LoggerModule[type] = function (payload) {
        LoggerModule.log(type, payload);
    };
});