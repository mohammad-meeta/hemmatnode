'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function SessiontHelper() {}
module.exports = SessiontHelper;

/**
 * find all dep cat data result 
 */
SessiontHelper.loadAllSessionData = function loadAllSessionData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Session = mongoose.model('Session');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Session.find(filterQuery, projection, {
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
SessiontHelper.loadAllSessionCountData = function loadAllSessionCountData() {
    const Session = mongoose.model('Session');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Session.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
SessiontHelper.loadSessionData = function loadSessionData(title) {
    const Session = mongoose.model('Session');

    const filterQuery = {
        title: title
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Session.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep cat data  
 */
SessiontHelper.insertNewSession = function insertNewSession(data) {

    return new Promise((resolve, reject) => {
        const Session = mongoose.model('Session');
        const Session1 = new Session(data)

        Session1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
SessiontHelper.updateSessionData = function updateSessionData(data) {
    return new Promise((resolve, reject) => {
        const Session = mongoose.model('Session');
        Session.findByIdAndUpdate(data._id, data, {
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
SessiontHelper.deleteSessionData = function deleteSessionData(data) {
    return new Promise((resolve, reject) => {
        const Session = mongoose.model('Session');

        Session.findOneAndUpdate(data._id, {
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