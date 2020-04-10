'use strict';

const Mongoose = require('mongoose');
const PugView = use('app/helpers/pug-view');
const Auth = use('core/helpers/auth-helper');
const authConfig = use('config/auth');
const Events = use('core/modules/events-module');

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
 * Show Register page
 */
AuthController.register = function register(req, res, next) {
    const pageRoute = PugView.getView('auth.register');

    res.render(pageRoute, {
        req,
        pageRoute,
    });
};

/**
 * Register a user
 */
AuthController.registerUser = function registerUser(req, res, next) {
    const name = req.body.name;
    const password = req.body.password;

    const User = Mongoose.model('User');
    let newUser = {
        'name': name,
        'pwd': password,
        'email': name + '@test.dev',
        'is_active': false
    };

    newUser = User.newUser(newUser);

    res.send({
            success: true,
            data: newUser
        })
        .end(200);
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
    Events.raise('login-attempt', loginResult);

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
