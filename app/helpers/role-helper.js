'use strict';

const mongoose = require('mongoose');

/**
 * Algorithm controller
 */
function RoleHelper() {}
module.exports = RoleHelper;

/**
 * find all roles data 
 */
RoleHelper.loadAllRoleData = function loadAllRoleData() {
    const Role = mongoose.model('Role');

    const filterQuery = {};
    const projection = {
        name: 1
    };

    return new Promise((resolve, reject) => {
        Role.find(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};