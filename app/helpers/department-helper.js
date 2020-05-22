'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function DepartmentHelper() {}
module.exports = DepartmentHelper;

/**
 * find all dep cat data result 
 */
DepartmentHelper.loadAllDepartmentData = function loadAllDepartmentData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Department = mongoose.model('Department');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Department.find(filterQuery, projection, {
                sort: {
                    'created_at': -1
                },
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
 * find all dep cat count data result 
 */
DepartmentHelper.loadAllCountDepartmentData = function loadAllCountDepartmentData() {
    const Department = mongoose.model('Department');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Department.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
DepartmentHelper.loadDepartmentData = function loadDepartmentData(title) {
    const Department = mongoose.model('Department');

    const filterQuery = {
        title: title
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Department.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep data  
 */
DepartmentHelper.insertNewDepartment = function insertNewDepartment(data) {

    return new Promise((resolve, reject) => {
        const Department = mongoose.model('Department');
        const Department1 = new Department(data)

        Department1.save()
            .then(res => {
                if (null != res._id) {
                    const data = {
                        title: res.title,
                        group_id: res._id,
                        user_id: res.user_id
                    };
                    const Group = mongoose.model('Group');
                    const Group1 = new Group(data)

                    Group1.save()
                        .then(res => {
                            resolve(res);
                        })
                        .catch(err => reject(err))
                }

            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
DepartmentHelper.updateDepartmentData = function updateDepartmentData(data) {
    return new Promise((resolve, reject) => {
        const Department = mongoose.model('Department');
        Department.findByIdAndUpdate(data._id, data, {
                useFindAndModify: false
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete dep cat data  
 */
DepartmentHelper.deleteDepartmentData = function deleteDepartmentData(data) {
    return new Promise((resolve, reject) => {
        const Department = mongoose.model('Department');

        Department.findOneAndUpdate(data._id, {
                is_active: false
            }, {
                useFindAndModify: false
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};