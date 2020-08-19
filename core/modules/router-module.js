'use strict';

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

        for (let i = 0; i < files.length; ++i) {
            use('routes', files[i]);
        }
    }

    /* Register router handler */
    RouterModule.handleErrors();

    return server;
};


/**
 * Handle Error function
 */
RouterModule.handleErrors = function handleErrors() {
    // catch 404 and forward to error handler
    App.use((req, res, next) => {
        next(createError(404));
    });

    // error handler
    App.use((error, req, res, next) => {
        const isAjax = (req.headers["x-requested-with"] == 'XMLHttpRequest') ||
            req.xhr;

        const devMode = (req.app.get('env') === 'development') ||
            (process.env.debug || true);

        // set locals, only providing error in development
        res.locals.message = error.message;
        res.locals.error = devMode ? error : {};

        // render the error page
        const errCode = error.status || 500;
        res.status(errCode);

        const errorObject = {
            success: false,
            data: {
                code: errCode,
                message: res.locals.message,
                error: res.locals.error,
            }
        };

        if (isAjax) {
            res.send(errorObject)
                .end();
        } else {
            res.render(`errors/${errCode}.pug`, error);
        }
    });
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

            let controllerName = tokens[0];
            const actionName = tokens[1];

            if (!controllerName.endsWith('Controller')) {
                controllerName += "Controller";
            }
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
