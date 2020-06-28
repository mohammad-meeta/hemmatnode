'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function InviteSessiontHelper() {}
module.exports = InviteSessiontHelper;

/**
 * find all dep cat data result 
 */
InviteSessiontHelper.loadAllInviteSessionData = function loadAllInviteSessionData(dataPaginate, group) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? ((page - 1) * pageSize) : 0;
    const ObjectId = require('mongoose').Types.ObjectId;
    const InviteSession = mongoose.model('InviteSession');

    const pipeline = [{
            "$match": {
                "department_id": new ObjectId(group)
            }
        },
        {
            "$lookup": {
                "from": "departments",
                "localField": "department_id",
                "foreignField": "_id",
                "as": "dep"
            }
        },
        {
            "$unwind": "$dep"
        },
        {
            "$sort": {
                "created_at": -1
            }
        },
        {
            "$skip": skip
        },
        {
            "$limit": pageSize
        }
    ];

    return new Promise((resolve, reject) => {
        InviteSession.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result 
 */
InviteSessiontHelper.loadAllInviteSessionCountData = function loadAllInviteSessionCountData(group) {
    const InviteSession = mongoose.model('InviteSession');

    const filterQuery = {
        department_id: group
    };

    return new Promise((resolve, reject) => {
        InviteSession.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
InviteSessiontHelper.loadInviteSessionData = function loadInviteSessionData(title) {
    const InviteSession = mongoose.model('InviteSession');

    const filterQuery = {
        title: title
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        InviteSession.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep cat data  
 */
InviteSessiontHelper.insertNewInviteSession = function insertNewInviteSession(data) {

    return new Promise((resolve, reject) => {
        const InviteSession = mongoose.model('InviteSession');
        const InviteSession1 = new InviteSession(data)

        InviteSession1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * insert approves  
 */
InviteSessiontHelper.insertApproves = function insertApproves(data) {

    return new Promise((resolve, reject) => {
        const Approves = mongoose.model('Approves');

        Approves.insertMany(data, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
InviteSessiontHelper.updateInviteSessionData = function updateInviteSessionData(data) {
    return new Promise((resolve, reject) => {
        const InviteSession = mongoose.model('InviteSession');
        InviteSession.findByIdAndUpdate(data._id, data, {
                useFindAndModify: false
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update invite session data  
 */
InviteSessiontHelper.updateInviteSessionApproves = function updateInviteSessionApproves(data) {
    return new Promise((resolve, reject) => {
        const InviteSession = mongoose.model('InviteSession');
        InviteSession.findByIdAndUpdate(data._id, data, {
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
InviteSessiontHelper.deleteInviteSessionData = function deleteInviteSessionData(data) {
    return new Promise((resolve, reject) => {
        const InviteSession = mongoose.model('InviteSession');

        InviteSession.findOneAndUpdate(data._id, {
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