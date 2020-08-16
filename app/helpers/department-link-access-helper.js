'use strict';

const mongoose = require('mongoose');

/**
 * Program controller
 */
function DepartmentLinkAccessHelper() { }
module.exports = DepartmentLinkAccessHelper;

/**
 * find all dep cat data result 
 */
DepartmentLinkAccessHelper.loadAllLinkAccessData = function loadAllLinkAccessData(departmentId) {
    const Program = mongoose.model('DepartmentAccessLink');

    const filterQuery = {
        "$or": [
            { department_id: departmentId },
            { child: departmentId }
        ]
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Program.find(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};