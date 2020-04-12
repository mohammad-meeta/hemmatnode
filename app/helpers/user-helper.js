
'use strict';

const mongoose = require('mongoose');

/**
 * Algorithm controller
 */
function UserHelper() { }
module.exports = UserHelper;

/**
 * find algorithm result 
 */
UserHelper.loadAllUserData = function loadAllUserData(algorithm_id) {
    const User = mongoose.model('User');

    const filterQuery = {};
    const projection = {
        _id: 0,
    };

    return new Promise((resolve, reject) => {
        User.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * insert user data  
 */
UserHelper.insertNewUser = function insertNewUser(data) {

    return new Promise((resolve, reject) => {
        const User = mongoose.model('User');
        const user = new User(data)

        user.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};