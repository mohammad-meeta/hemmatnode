
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
        pwd: pwd
    };

    const projection = {
        name: 1,
        pwd: 1
    };
    return new Promise((resolve, reject) => {
        User.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
