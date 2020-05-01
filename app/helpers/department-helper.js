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
    const Departement = mongoose.model('Departement');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Departement.find(filterQuery, projection, {
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
DepartmentHelper.loadAllDepartmentCountData = function loadAllDepartmentCountData() {
    const Departement = mongoose.model('Departement');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Departement.countDocuments(filterQuery)
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
    const Departement = mongoose.model('Departement');

    const filterQuery = {
        title: title
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Departement.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep cat data  
 */
DepartmentHelper.insertNewDepartment = function insertNewDepartment(data) {

    return new Promise((resolve, reject) => {
        const Departement = mongoose.model('Departement');
        const Department = new Departement(data)

        Department.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
DepartmentHelper.updateDepartmentData = function updateDepartmentData(data) {
    return new Promise((resolve, reject) => {
        const Departement = mongoose.model('Departement');
        Departement.findByIdAndUpdate(data._id, data, {
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
        const Departement = mongoose.model('Departement');

        Departement.findOneAndUpdate(data._id, {
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