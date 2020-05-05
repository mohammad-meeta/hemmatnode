'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function DepartmentCategoryHelper() {}
module.exports = DepartmentCategoryHelper;

/**
 * find all dep cat data result 
 */
DepartmentCategoryHelper.loadAllDepCatData = function loadAllDepCatData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const DepartmentCategory = mongoose.model('DepartmentCategory');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        DepartmentCategory.find(filterQuery, projection, {
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
DepartmentCategoryHelper.loadAllCountDepCatData = function loadAllCountDepCatData() {
    const DepartmentCategory = mongoose.model('DepartmentCategory');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        DepartmentCategory.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
DepartmentCategoryHelper.loadDepCatData = function loadDepCatData(title) {
    const DepartmentCategory = mongoose.model('DepartmentCategory');

    const filterQuery = {
        title: title
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        DepartmentCategory.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep cat data  
 */
DepartmentCategoryHelper.insertNewDepCat = function insertNewDepCat(data) {

    return new Promise((resolve, reject) => {
        const DepartmentCategory = mongoose.model('DepartmentCategory');
        const depcat = new DepartmentCategory(data)

        depcat.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
DepartmentCategoryHelper.updateDepCatData = function updateDepCatData(data) {
    return new Promise((resolve, reject) => {
        const DepartmentCategory = mongoose.model('DepartmentCategory');
        DepartmentCategory.findByIdAndUpdate(data._id, data, {
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
DepartmentCategoryHelper.deleteDepCatData = function deleteDepCatData(data) {
    return new Promise((resolve, reject) => {
        const DepartmentCategory = mongoose.model('DepartmentCategory');

        DepartmentCategory.findOneAndUpdate(data._id, {
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