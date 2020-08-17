
'use strict';

const mongoose = require('mongoose');

/**
 * Program controller
 */
function RequestHelper() { }
module.exports = RequestHelper;

/**
 * find all dep cat data result 
 */
RequestHelper.loadAllProgramData = function loadAllProgramData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Program = mongoose.model('Program');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Program.find(filterQuery, projection, {
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
RequestHelper.loadAllProgramCountData = function loadAllProgramCountData() {
    const Program = mongoose.model('Program');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Program.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Program data result 
 */
RequestHelper.loadProgramData = function loadProgramData(requestTitle) {
    const Program = mongoose.model('Program');

    const filterQuery = {
        _id: requestTitle
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Program.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Program data  
 */
RequestHelper.insertNewProgram = function insertNewProgram(data) {

    return new Promise((resolve, reject) => {
        const Program = mongoose.model('Program');
        const request = new Program(data)

        request.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update Program data  
 */
RequestHelper.updateProgramData = function updateProgramData(data) {
    return new Promise((resolve, reject) => {
        const Program = mongoose.model('Program');
        Program.findByIdAndUpdate(data._id, data, { useFindAndModify: false })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete request data  
 */
RequestHelper.deleteProgram = function deleteProgram(data) {
    return new Promise((resolve, reject) => {
        const Program = mongoose.model('Program');
        Program.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};