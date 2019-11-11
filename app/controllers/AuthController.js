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
    res.render(PugView.getView('auth/login'), {
        pageRoute: 'auth.login'
    });
};


/**
 * Attempt function 
 */
AuthController.attempt = function attempt(req, res, next) {
    const data = req.body.user_data;

    console.log(data);

    res.end(200);
}
