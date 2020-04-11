'use strict';

const PugView = use('app/helpers/pug-view');
const Auth = use('core/helpers/auth-helper');
const authConfig = use('config/auth');
const events = use('core/modules/events-module');

/**
 * Auth controller
 */
function AuthController() {}
module.exports = AuthController;

/**
 * Login function
 */
AuthController.login = function login(req, res, next) {
    const pageRoute = PugView.getView('auth.login');

    res.render(pageRoute, {
        req,
        pageRoute,
    });
};

/**
 * Attempt function
 */
AuthController.attempt = function attempt(req, res, next) {
    /* Get data */
    const data = {
        username: req.body.name,
        password: req.body.password,
    };

    /* Validate */
    /* TODO: CHECK USERNAME & PASSWORD */
    const user = {
        name: data.username,
        password: data.password,
    };

    /* If username & password are correct */
    const loginResult = {};

    if (user != null) {
        loginResult.success = true;
        loginResult.data = Auth.sign({
            id: 100,
            username: data.username,
            password: data.password,
        });
    } else {
        loginResult.success = false;
        loginResult.data = "Invalid Username and Password";
    }

    /* Fire attempt-event */
    events.raise('login-attempt', loginResult);

    /* Send result */
    if (loginResult.success) {
        res.status(200)
            .cookie('token', loginResult.data, authConfig.cookie.options)
            // .cookie('token', loginResult.data)
            .send(loginResult)
            .end();
    } else {
        res.status(403)
            // .cookie('token', '', authConfig.cookie.options)
            .cookie('token', '')
            .send(loginResult)
            .end();
    }
};
