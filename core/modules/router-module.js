'use strict';

const Server = use('core/server');

/**
 * Router rclass
 */
function RouterModule() {}
module.exports = RouterModule;

/* Constants and ... */
RouterModule.C_ACTION_SEPARATOR = '@';

/* Defaults */
RouterModule.routes = {};

/**
 * Setup function
 */
RouterModule.setup = function setup(server) {
    server.Router = RouterModule;
    global.Router = RouterModule;
    global.route = RouterModule.route;

    /* Register routes */
    const fs = require('fs');
    const path = rPath('routes');

    if (fs.existsSync(path)) {
        const files = fs.readdirSync(path);

        files.forEach(file => use('routes', file));
    }

    return server;
};

/**
 * Route function
 */
RouterModule.defineRoute = function defineRoute(type, url, actions) {
    /* Add route */
    actions = RouterModule.getActions(actions);
    App[type](url, actions);

    /* Get last route -- current registered route */
    const routes = App._router.stack;
    const route = routes[routes.length - 1];

    return {
        as: (alias) => RouterModule.routes[alias] = route
    };
};

/**
 * Get actions
 */
RouterModule.getActions = function getActions(actions) {
    let result = [];

    if (!Array.isArray(actions)) {
        actions = [actions];
    }

    actions.forEach(action => {
        if ('string' == typeof action) {
            const tokens = action.split(RouterModule.C_ACTION_SEPARATOR);

            if (tokens.length != 2) {
                throw new Error('Invalid action!', actions);
            }

            const controllerName = tokens[0];
            const actionName = tokens[1];
            const controller = use('app/controllers', controllerName);

            result.push(controller[actionName]);
        } else {
            result.push(action);
        }
    })

    if (result.length == 1) {
        return result[0];
    } else {
        return result;
    }
};

/* Add route method */
RouterModule.route = function route(alias, params, query) {
    const pathHelper = use('core', 'helpers', 'path-helper');
    const route = RouterModule.routes[alias];

    if (!route) {
        return '';
    }

    let routePath = route.route.path;
    routePath = pathHelper.applyParams(routePath, params);
    routePath = global.server.url + routePath;

    if (null != query) {
        routePaht += `?${query}`;
    }

    return routePath;
};

/* Add other route types */
const types = [
    'get', 'head', 'post', 'put', 'patch', 'delete', 'options', 'link', 'use'
];
types.forEach(function (type) {
    RouterModule[type] = (url, actions) => {
        return RouterModule.defineRoute(type, url, actions);
    };
});
