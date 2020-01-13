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
    const validator = use('validators/user-register-validator');
    validator.validate(req, res, next);

    /* Get data */
    const data = req.body.user_data;

    let token = Auth.sign({
        firstName: 'Amir',
        lastName: 'Ojvar'
    });
    let tokenData = Auth.verify(token);

    /* Fire attempt-event */
    events.raise('login.attempt', data);

    res.end(200);
};