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
    global.mix = GlobalFunctions.mix;
    global.asset = GlobalFunctions.asset;

    return server;
};

/**
 * mix function
 */
GlobalFunctions.mix = function mix(resource) {
    if (resource && resource[0] != '/') {
        resource = '/' + resource;
    }

    const appConfig = GlobalFunctions.use('config', 'app');
    const webMix = use(appConfig.output_path, 'mix-manifest.json');
    let path = webMix[resource] || '';

    return path;
};

/**
 * asset function
 */
GlobalFunctions.asset = function asset(resource) {
    if (resource && resource[0] != '/') {
        resource = '/' + resource;
    }

    const appConfig = GlobalFunctions.use('config', 'app');
    const webMix = use(appConfig.output_path, 'mix-manifest.json');
    let path = webMix[resource] || '';

    return path;
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
