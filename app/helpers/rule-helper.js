'use strict';

const mongoose = require('mongoose');

/**
 * Algorithm controller
 */
function RuleHelper() {}
module.exports = RuleHelper;

/**
 * find all roles data 
 */
RuleHelper.loadAllRuleData = function loadAllRuleData() {
    const Rule = mongoose.model('Rule');

    const filterQuery = {};
    const projection = {
        _id: 0,
        id: 1,
        description: 1
    };

    return new Promise((resolve, reject) => {
        Rule.find(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};