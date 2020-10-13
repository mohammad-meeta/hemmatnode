'use strict';

const mongoose = require('mongoose');

/**
 * Role controller
 */
function RoleHelper() { }
module.exports = RoleHelper;

/**
 * find all users data result 
 */
RoleHelper.loadAllRoleData = function loadAllRoleData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Role = mongoose.model('Role');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Role.find(filterQuery, projection, {
            skip: skip,
            limit: pageSize
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all role count data result 
 */
RoleHelper.loadAllCountRoleData = function loadAllCountRoleData() {
    const Role = mongoose.model('Role');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Role.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Role data result 
 */
RoleHelper.loadRoleData = function loadRoleData(roleName) {
    const Role = mongoose.model('Role');

    const filterQuery = {
        name: roleName
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Role.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Role data  
 */
RoleHelper.insertNewRole = function insertNewRole(data) {

    return new Promise((resolve, reject) => {
        const Role = mongoose.model('Role');
        const role = new Role(data)

        role.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update role data  
 */
RoleHelper.updateRoleData = function updateRoleData(data) {

    return new Promise((resolve, reject) => {
        const Role = mongoose.model('Role');
        Role.findByIdAndUpdate(data._id, data, {
            useFindAndModify: false, new: true
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete Role data  
 */
RoleHelper.deleteRoleData = function deleteRoleData(data) {
    return new Promise((resolve, reject) => {
        const Role = mongoose.model('Role');

        Role.findOneAndUpdate(data._id, {
            is_active: false
        }, {
            useFindAndModify: false, new: true
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};