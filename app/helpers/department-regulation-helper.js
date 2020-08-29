'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function DepartmentRegulationHelper() {}
module.exports = DepartmentRegulationHelper;

/**
 * find all dep cat data result 
 */
DepartmentRegulationHelper.loadAllDepartmentRegulationData = function loadAllDepartmentRegulationData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Department = mongoose.model('DepartmentRegulation');

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
DepartmentRegulationHelper.loadAllDepartmentRegulationCountData = function loadAllDepartmentRegulationCountData() {
    const Department = mongoose.model('DepartmentRegulation');

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
DepartmentRegulationHelper.loadDepartmentRegulationData = function loadDepartmentRegulationData(_id) {
    const Departement = mongoose.model('DepartementRegulation');

    const filterQuery = {
        _id: _id
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
DepartmentRegulationHelper.insertNewDepartmentRegulation = function insertNewDepartmentRegulation(data) {

    return new Promise((resolve, reject) => {
        const Department = mongoose.model('DepartmentRegulation');
        // const Department1 = new Department(data)

        Department.insertMany(data)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
DepartmentRegulationHelper.updateDepartmentRegulationData = function updateDepartmentRegulationData(data) {
    return new Promise((resolve, reject) => {
        const Department = mongoose.model('DepartmentRegulation');
        Department.findByIdAndUpdate(data._id, data, {
                useFindAndModify: false, new: true
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
DepartmentRegulationHelper.deleteDepartmentRegulationData = function deleteDepartmentRegulationData(data) {
    return new Promise((resolve, reject) => {
        const Department = mongoose.model('DepartmentRegulation');

        Department.findOneAndUpdate(data._id, {
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