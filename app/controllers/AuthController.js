'use strict';

const AuthHelper = use('app/helpers/auth-helper');
const PugView = use('app/helpers/pug-view');
const Auth = use('core/helpers/auth-helper');
const authConfig = use('config/auth');
const Events = use('core/modules/events-module');
const UserHelper = use('app/helpers/user-helper');

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
        pageRoute
    });
};

/**
 * load profile function
 */
AuthController.profile = function profile(req, res, next) {
    const userName = req.session.auth.userName;

    UserHelper.loadUserData(userName)
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
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

    AuthHelper.loadUserData(user)
        .then(data => {
            const loginResult = {
                success: false,
                data: null
            };

            /* If username & password are correct */
            if (null != data) {
                if (user != null) {

                    req.session.auth = {
                        userName: data.name,
                        profile: data.profile,
                        userId: data._id
                    };

                    loginResult.success = true;
                    loginResult.data = Auth.sign(req.session.auth);
                } else {
                    loginResult.success = false;
                    loginResult.data = "Invalid Username and Password";
                }

                loginResult.data = Auth.sign({
                    id: data._id,
                    username: data.name,
                    password: data.pwd,
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
        })
        .catch(err => console.error(err));
};
