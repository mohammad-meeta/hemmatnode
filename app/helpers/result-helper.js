'use strict';

const mongoose = require('mongoose');

/**
 * result cat controller
 */
function ResultHelper() {}
module.exports = ResultHelper;

/**
 * find all result cat data result 
 */
ResultHelper.loadAllResultData = function loadAllResultData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Result = mongoose.model('Result');

    const filterQuery = {};
    const resultion = {};

    return new Promise((resolve, reject) => {
        Result.find(filterQuery, resultion, {
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
 * find all result cat count data result 
 */
ResultHelper.loadAllCountResultData = function loadAllCountResultData() {
    const Result = mongoose.model('Result');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Result.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find result cat data result 
 */
ResultHelper.loadResultData = function loadResultData(title) {
    const Result = mongoose.model('Result');

    const filterQuery = {
        title: title
    };

    const resultion = {};

    return new Promise((resolve, reject) => {
        Result.findOne(filterQuery, resultion)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert result cat data  
 */
ResultHelper.insertNewResult = function insertNewResult(data) {

    return new Promise((resolve, reject) => {
        const Result = mongoose.model('Result');
        const Result1 = new Result(data)

        Result1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update result cat data  
 */
ResultHelper.updateResultData = function updateResultData(data) {
    return new Promise((resolve, reject) => {
        const Result = mongoose.model('Result');
        Result.findByIdAndUpdate(data._id, data, {
                useFindAndModify: false, new: true
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete result cat data  
 */
ResultHelper.deleteResultData = function deleteResultData(data) {
    return new Promise((resolve, reject) => {
        const Result = mongoose.model('Result');

        Result.findOneAndUpdate(data._id, {
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