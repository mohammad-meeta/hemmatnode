'use strict';

const PugView = use('app', 'helpers', 'pug-view');

/**
 * Home controller
 */
function AuthController() { }
module.exports = AuthController;

/**
 * Login function
 */
AuthController.login = function login(req, res, next) {
    res.render(PugView.getView('auth/login'));
};
