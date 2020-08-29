'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function RequestHelper() { }
module.exports = RequestHelper;

/**
 * find all dep cat data result 
 */
RequestHelper.loadAllRequestData = function loadAllRequestData(req, dataPaginate, group) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? ((page - 1) * pageSize) : 0;
    const ObjectId = require('mongoose').Types.ObjectId;
    const Request = mongoose.model('Request');

    const userId = req.session.auth.userId;

    const pipeline = [{
        "$match": {
            "department_id": new ObjectId(group),

            $or: [{
                user_id: ObjectId(userId)
            },
            {
                user_list: userId
            }
            ]
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
        "$unwind": {
            "path": "$files",
            "preserveNullAndEmptyArrays": true
        }
    },
    {
        "$lookup": {
            "from": "files",
            "localField": "files.file_id",
            "foreignField": "_id",
            "as": "file"
        }
    },
    {
        "$unwind": {
            "path": "$file",
            "preserveNullAndEmptyArrays": true
        }
    },
    {
        "$project": {
            "file.encoding": 0,
            "file.fieldname": 0,
            "file.mimetype": 0,
            "file.destination": 0,
            "file.user_id": 0,
            "file.path": 0,
            "file.filename": 0,
        }
    },
    {
        "$group": {
            "_id": "$_id",
            "files": {
                "$push": "$file"
            },
            "is_active": {
                "$last": "$is_active"
            },
            "title": {
                "$last": "$title"
            },
            "description": {
                "$last": "$description"
            },
            "request_date": {
                "$last": "$request_date"
            },
            "deadline": {
                "$last": "$deadline"
            },
            "request_date": {
                "$last": "$request_date"
            },
            "created_at": {
                "$last": "$created_at"
            },
            "dep": {
                "$last": "$dep"
            }
        }
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
        Request.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result 
 */
RequestHelper.loadAllRequestCountData = function loadAllRequestCountData(group) {
    const Request = mongoose.model('Request');

    const filterQuery = {
        department_id: group
    };

    return new Promise((resolve, reject) => {
        Request.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
RequestHelper.loadRequestData = function loadRequestData(id) {
    const Request = mongoose.model('Request');

    const filterQuery = {
        _id: id
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Request.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep cat data  
 */
RequestHelper.insertNewRequest = function insertNewRequest(data) {

    return new Promise((resolve, reject) => {
        const Request = mongoose.model('Request');
        const Request1 = new Request(data)

        Request1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
RequestHelper.updateRequestData = function updateRequestData(data) {
    return new Promise((resolve, reject) => {
        const Request = mongoose.model('Request');
        Request.findByIdAndUpdate(data._id, data, {
            useFindAndModify: false, new: true
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
RequestHelper.deleteRequestData = function deleteRequestData(data) {
    return new Promise((resolve, reject) => {
        const Request = mongoose.model('Request');

        Request.findOneAndUpdate(data._id, {
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