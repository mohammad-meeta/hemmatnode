'use strict';

const AuthHelper = use('app/helpers/auth-helper');
const PugView = use('app/helpers/pug-view');
const Auth = use('core/helpers/auth-helper');
const authConfig = use('config/auth');
const Events = use('core/modules/events-module');

/**
 * Auth controller
 */
function AuthController() { }
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
                req.session.auth = {
                    userName: data.name,
                    userId: data._id
                };

<<<<<<< HEAD
                loginResult.success = true;
=======
    if (user != null) {
        req.session.auth = {
            id: 100,
            username: data.username,
            password: data.password,
        };

        loginResult.success = true;
        loginResult.data = Auth.sign(req.session.auth);
    } else {
        loginResult.success = false;
        loginResult.data = "Invalid Username and Password";
    }
>>>>>>> da705d6bc8de3c2e6485e8f3e5f2323e1a9f81a1

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
