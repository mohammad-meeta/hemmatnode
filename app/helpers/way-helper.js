'use strict';

const mongoose = require('mongoose');

/**
 * city controller
 */
function WayHelper() { }
module.exports = WayHelper;

/**
 * find all city data result 
 */
WayHelper.loadAllWayData = async function loadAllWayData(req, dataPaginate) {

    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const Way = mongoose.model('Way');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Way.find(filterQuery, {}, { skip: skip, limit: pageSize })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
}
/**
 * find all city count data result 
 */
WayHelper.loadAllCountWayData = function loadAllCountWayData(group, type) {
    const Way = mongoose.model('Way');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Way.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
