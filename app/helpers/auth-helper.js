'use strict';

const mongoose = require('mongoose');

/**
 * Algorithm controller
 */
function AuthHelper() { }
module.exports = AuthHelper;

/**
 * find user data for login
 */
AuthHelper.loadUserData = function loadUserData(userData) {
    const name = userData.name;
    const pwd = userData.password;

    const User = mongoose.model('User');

    const filterQuery = {
        name: name,
        pwd: pwd,
        is_active: true
    };

    const projection = {
        name: 1,
        profile: 1
    };

    return new Promise((resolve, reject) => {
        User.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * Check session
 */
AuthHelper.checkSession = function checkSession(req, res, next) {
    if (req.session.auth) {
        next();
    } else {
        res.redirect(route('auth.login'));
    }
};
