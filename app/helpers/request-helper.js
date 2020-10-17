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
RequestHelper.loadAllRequestData = async function loadAllRequestData(req, dataPaginate, group) {
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
    let res = await Request.aggregate(pipeline);

    for (let resI = 0; resI < res.length; resI++) {

        let oldFiles = res[resI].oldFiles;
        let files = res[resI].files;
        let deleted = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            for (let index2 = 0; index2 < oldFiles.length; index2++) {
                const element2 = oldFiles[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deleted.push(element["_id"])
                }
            }
        }

        for (let index3 = 0; index3 < deleted.length; index3++) {
            const element = deleted[index3];
            const indexF = files.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                files.splice(indexF, 1)
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].files.length; k++) {
            res[i].files[k] = {
                "_id": res[i].files[k]._id,
                "fieldname": res[i].files[k].fieldname,
                "name": res[i].files[k].originalname,
                "filename": res[i].files[k].filename,
                "size": res[i].files[k].size,
            };
        }
    }
    return res;

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
RequestHelper.insertNewRequest = async function insertNewRequest(data) {

    const Request = mongoose.model('Request');
    const request = new Request(data)

    let res2 = await request.save();
    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },
        {
            $lookup: {
                from: "departments",
                localField: "department_id",
                foreignField: "_id",
                as: "dep"
            }
        },
        {
            $unwind: "$dep"
        },
        {
            $unwind: {
                path: "$files",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "files.file_id",
                foreignField: "_id",
                as: "ffile"
            }
        },
        {
            $unwind: {
                path: "$ffile",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "ffile.encoding": 0,
                "ffile.mimetype": 0,
                "ffile.destination": 0,
                "ffile.user_id": 0,
                "ffile.path": 0,
            }
        },
        {
            $group: {
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
            $sort: {
                created_at: -1
            }
        }
    ];

    let res = await Request.aggregate(pipeline);
    for (let resI = 0; resI < res.length; resI++) {

        let oldFiles = res[resI].oldFiles;
        let files = res[resI].files;
        let deleted = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            for (let index2 = 0; index2 < oldFiles.length; index2++) {
                const element2 = oldFiles[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deleted.push(element["_id"])
                }
            }
        }

        for (let index3 = 0; index3 < deleted.length; index3++) {
            const element = deleted[index3];
            const indexF = files.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                files.splice(indexF, 1)
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].files.length; k++) {
            res[i].files[k] = {
                "_id": res[i].files[k]._id,
                "fieldname": res[i].files[k].fieldname,
                "name": res[i].files[k].originalname,
                "filename": res[i].files[k].filename,
                "size": res[i].files[k].size,
            };
        }
    }
    return res;
};

/**
 * update dep cat data  
 */
RequestHelper.updateRequestData = async function updateRequestData(data) {
    const Request = mongoose.model('Request');
    let res2 = await Request.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },
        {
            $lookup: {
                from: "departments",
                localField: "department_id",
                foreignField: "_id",
                as: "dep"
            }
        },
        {
            $unwind: "$dep"
        },
        {
            $unwind: {
                path: "$files",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "files.file_id",
                foreignField: "_id",
                as: "ffile"
            }
        },
        {
            $unwind: {
                path: "$ffile",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "ffile.encoding": 0,
                "ffile.mimetype": 0,
                "ffile.destination": 0,
                "ffile.user_id": 0,
                "ffile.path": 0,
            }
        },
        {
            $group: {
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
            $sort: {
                created_at: -1
            }
        }
    ];

    let res = await Request.aggregate(pipeline);
    for (let resI = 0; resI < res.length; resI++) {

        let oldFiles = res[resI].oldFiles;
        let files = res[resI].files;
        let deleted = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            for (let index2 = 0; index2 < oldFiles.length; index2++) {
                const element2 = oldFiles[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deleted.push(element["_id"])
                }
            }
        }

        for (let index3 = 0; index3 < deleted.length; index3++) {
            const element = deleted[index3];
            const indexF = files.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                files.splice(indexF, 1)
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].files.length; k++) {
            res[i].files[k] = {
                "_id": res[i].files[k]._id,
                "fieldname": res[i].files[k].fieldname,
                "name": res[i].files[k].originalname,
                "filename": res[i].files[k].filename,
                "size": res[i].files[k].size,
            };
        }
    }
    return res;
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