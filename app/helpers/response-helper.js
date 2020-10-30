'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function ResponseHelper() { }
module.exports = ResponseHelper;


/**
 * find all request 
 */
ResponseHelper.loadAllRequestData = function loadAllRequestData(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? ((page - 1) * pageSize) : 0;
    const ObjectId = require('mongoose').Types.ObjectId;
    const Request = mongoose.model('Request');

    const pipeline = [
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
 * find all request 
 */
ResponseHelper.loadAllResponseRequestData = function loadAllResponseRequestData(reqId, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? ((page - 1) * pageSize) : 0;

    const ObjectId = require('mongoose').Types.ObjectId;
    const Response = mongoose.model('Response');

    const pipeline = [
        {
            "$match": {
                request_id: ObjectId(reqId)
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
            "$lookup": {
                "from": "requests",
                "localField": "request_id",
                "foreignField": "_id",
                "as": "req"
            }
        },
        {
            "$unwind": "$req"
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
                "action": {
                    "$last": "$action"
                },
                "deadline": {
                    "$last": "$deadline"
                },
                "result": {
                    "$last": "$result"
                },
                "request_id": {
                    "$last": "$request_id"
                },
                "created_at": {
                    "$last": "$created_at"
                },
                "dep": {
                    "$last": "$dep"
                },
                "req": {
                    "$last": "$req"
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
        Response.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all  count data result 
 */
ResponseHelper.loadAllRequestCountData = function loadAllRequestCountData(group) {
    const Request = mongoose.model('Request');

    const filterQuery = {
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
 * find all  count data result 
 */
ResponseHelper.loadAllResponseRequestCountData = function loadAllResponseRequestCountData(reqId) {
    const Request = mongoose.model('Response');

    const filterQuery = {
        request_id: reqId
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
 * find all data result 
 */
ResponseHelper.loadAllResponseData = function loadAllResponseData(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? ((page - 1) * pageSize) : 0;
    const ObjectId = require('mongoose').Types.ObjectId;
    const Response = mongoose.model('Response');

    const userId = req.session.auth.userId;

    const pipeline = [{
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
        "$lookup": {
            "from": "requests",
            "localField": "request_id",
            "foreignField": "_id",
            "as": "req"
        }
    },
    {
        "$unwind": "$req"
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
            "action": {
                "$last": "$action"
            },
            "result": {
                "$last": "$result"
            },
            "deadline": {
                "$last": "$deadline"
            },
            "created_at": {
                "$last": "$created_at"
            },
            "dep": {
                "$last": "$dep"
            },
            "req": {
                "$last": "$req"
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
        Response.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find all dep cat count data result 
 */
ResponseHelper.loadAllResponseCountData = function loadAllResponseCountData() {
    const Response = mongoose.model('Response');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Response.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};


//*********************************************** */
//*********************************************** */
//*********************************************** */
/**
 * find all data result 
 */
ResponseHelper.loadAllResponseDataUser = async function loadAllResponseDataUser(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? ((page - 1) * pageSize) : 0;
    const ObjectId = require('mongoose').Types.ObjectId;
    const Response = mongoose.model('Response');

    const userId = req.session.auth.userId;

    const user = mongoose.model('User');
    const filterQuery = {
        user_id: userId
    };
    let department = await user.findOne(filterQuery, {})

    const pipeline = [
        {
            $match: {
                department_id: department._id
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
            "$lookup": {
                "from": "requests",
                "localField": "request_id",
                "foreignField": "_id",
                "as": "req"
            }
        },
        {
            "$unwind": "$req"
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
                "action": {
                    "$last": "$action"
                },
                "result": {
                    "$last": "$result"
                },
                "deadline": {
                    "$last": "$deadline"
                },
                "created_at": {
                    "$last": "$created_at"
                },
                "dep": {
                    "$last": "$dep"
                },
                "req": {
                    "$last": "$req"
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
        Response.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find all dep cat count data result 
 */
ResponseHelper.loadAllResponseCountDataUser = async function loadAllResponseCountDataUser() {
    const Response = mongoose.model('Response');

    const userId = req.session.auth.userId;

    const user = mongoose.model('User');
    let filterQuery = {
        user_id: userId
    };
    let department = await user.findOne(filterQuery, {});

    filterQuery = {
        department_id: department._id
    };

    return new Promise((resolve, reject) => {
        Response.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

//*********************************************** */
//*********************************************** */
//*********************************************** */

/**
 * find dep cat data result 
 */
ResponseHelper.loadResponseData = function loadResponseData(id) {
    const Response = mongoose.model('Response');

    const filterQuery = {
        _id: id
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Response.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep cat data  
 */
ResponseHelper.insertNewResponse = function insertNewResponse(data) {

    return new Promise((resolve, reject) => {
        const Response = mongoose.model('Response');
        const Response1 = new Response(data)

        Response1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
ResponseHelper.updateResponseData = function updateResponseData(data) {
    return new Promise((resolve, reject) => {
        const Response = mongoose.model('Response');

        Response.findByIdAndUpdate(data._id, data, {
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
ResponseHelper.deleteResponseData = function deleteResponseData(data) {
    return new Promise((resolve, reject) => {
        const Response = mongoose.model('Response');

        Response.findOneAndUpdate(data._id, {
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