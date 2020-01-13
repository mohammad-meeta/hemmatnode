'use strict';

const PugView = use('app/helpers/pug-view');
const Auth = use('core/helpers/auth-helper');
const events = use('core/modules/events-module');

/**
 * Home controller
 */
function AuthController() {}
module.exports = AuthController;

/**
 * Login function
 */
AuthController.login = function login(req, res, next) {
    const pageRoute = 'auth.login';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};

/**
 * Attempt function 
 */
AuthController.attempt = function attempt(req, res, next) {
    /* Validate */
    const validator = use('validators/user-login-validator');
    validator.validate(req, res, next);

    /* Get data */
    const data = {
        username: req.body.name,
        password: req.body.password,
        email: req.body.password
    };

    /* Validate */
    /* TODO: CHECK USERNAME & PASSWORD */
    const user = {
        name: data.username,
        password: data.password,
        email: data.email
    };

    /* If username & password are correct */
    if (user != null) {
        let token = Auth.sign({
            id: 100,
            username: data.username,
            password: data.password,
        });
        let tokenData = Auth.verify(token);

        /* Fire attempt-event */
        events.raise('login.attempt', {
            success: true,
            data
        });

        res.status(200)
            .send(token)
            .end();
    } else {
        /* Fire attempt-event */
        events.raise('login.attempt', {
            success: false,
            data
        });

        res.end(403);
    }
};