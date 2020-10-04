'use strict';

const _ = require('lodash');

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
    global.isAjax = GlobalFunctions.isAjax;
    global.config = GlobalFunctions.config;

    return server;
};


/**
 * Get config value
 */
GlobalFunctions.config = function config(configFile, path, defaultValue = null) {
    let configData = GlobalFunctions.use("config", configFile);

    if (null != path) {
        return _.get(configData, path, defaultValue);
    } else {
        return configData || defaultValue;
    }
};

/**
 * Check the request is an ajax request
 *
 * @param      {Object}   req     The request
 * @return     {boolean}  True if the specified request is ajax, False otherwise.
 */
GlobalFunctions.isAjax = function isAjax(req) {
    return (req.xhr || req.headers.accept.indexOf('json') > -1);
};

/**
 * mix function
 */
GlobalFunctions.mix = function mix(resource) {
    const appConfig = GlobalFunctions.use('config/app');
    const webMix = GlobalFunctions.use(appConfig.output_path, 'mix-manifest.json');

    if (resource && resource[0] != '/') {
        resource = '/' + resource;
    }
    let path = webMix[resource] || '';

    path = global.server.url + path;

    return path;
};

/**
 * asset function
 */
GlobalFunctions.asset = function asset(resource) {
    if (resource && resource[0] != '/') {
        resource = '/' + resource;
    }

    resource = global.server.url + resource;

    return resource;
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
