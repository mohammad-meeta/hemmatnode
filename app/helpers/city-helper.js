'use strict';

const mongoose = require('mongoose');

/**
 * city controller
 */
function CityHelper() { }
module.exports = CityHelper;

/**
 * find all city data result 
 */
CityHelper.loadAllCityData = async function loadAllCityData(req, dataPaginate) {

    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const City = mongoose.model('City');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        City.find(filterQuery, {}, { skip: skip, limit: pageSize })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
}
/**
 * find all city count data result 
 */
CityHelper.loadAllCountCityData = function loadAllCountCityData(group, type) {
    const City = mongoose.model('City');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        City.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
