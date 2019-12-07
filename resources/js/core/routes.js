'use strict';

const {
    base_url,
    routes
} = require('CONFIGS/routes.json');

/**
 * Routes module
 */
function RoutesModule() {}
module.exports = RoutesModule;

/**
 * Routes json data
 */
RoutesModule.baseUrl = base_url;
RoutesModule.routes = routes;

/**
 * Get routes
 */
RoutesModule.route = function route(name, params = {}) {
    const route = RoutesModule.routes[name];
    let url = `${RoutesModule.baseUrl}${route.url || ''}`;

    /* Apply parameters */
    // Object.keys(params)
    //     .forEach(key => {
    //         let keyName = `:${key}:
    //     });

    return {
        url,
        method: route.method
    };
};