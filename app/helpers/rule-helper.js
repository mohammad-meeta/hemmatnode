'use strict';

const mongoose = require('mongoose');

/**
 * Algorithm controller
 */
function RuleHelper() { }
module.exports = RuleHelper;

/**
 * find all roles data 
 */
RuleHelper.loadAllRuleData = function loadAllRuleData(dataPaginate) {
    const Rule = mongoose.model('Rule');
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0

    const filterQuery = {
        level: { $gt: 0 }
    };
    const projection = {
        _id: 0,
        id: 1,
        level: 1,
        type: 1,
        description: 1
    };

    return new Promise((resolve, reject) => {
        Rule.find(filterQuery, projection, { skip: skip, limit: pageSize, sort: { level: 1 } })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};