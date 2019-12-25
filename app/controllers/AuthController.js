'use strict';

const PugView = use('app', 'helpers', 'pug-view');

/**
 * Home controller
 */
function AuthController() {}
module.exports = AuthController;

/**
 * Login function
 */
AuthController.login = function login(req, res, next) {
    const Auth = use('core/helpers/auth-helper');
    let token = Auth.sign({
        firstName: 'Amir',
        lastName: 'Ojvar'
    });
    let tokenData = Auth.verify(token);

    res.render(PugView.getView('auth/login'), {
        pageRoute: 'auth.login',
        token,
        tokenData
    });
};


/**
 * Attempt function 
 */
AuthController.attempt = function attempt(req, res, next) {
    const data = req.body.user_data;

    res.end(200);
}

/**
 * Test
 */
AuthController.test = function test(req, res, next) {
    /* Raise an event */
    const events = use('core/modules/events-module');

    const data = {
        id: 1
    };

    /* Fire login-event */
    events.raise('login', data);

    res.send(data)
        .end();
}