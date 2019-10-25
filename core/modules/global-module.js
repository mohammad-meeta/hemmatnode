'use strict';

/**
 * GlobalFunctions class
 */
function GlobalFunctions() { }
module.exports = GlobalFunctions;

/**
 * Setup function
 */
GlobalFunctions.setup = function setup(server) {
    global.rPath = GlobalFunctions.rPath;
    global.use = GlobalFunctions.use;

    return server;
};

/**
 * rPath function
 */
GlobalFunctions.rPath = function rPath() {
    const path = require('path');

    return path.resolve(...arguments);
};

/**
 * use function
 */
GlobalFunctions.use = function use() {
    return require(rPath(...arguments));
};
