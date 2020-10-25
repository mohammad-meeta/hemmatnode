
'use strict';

const mongoose = require('mongoose');

/**
 * Actioncreative controller
 */
function ActioncreativeHelper() { }
module.exports = ActioncreativeHelper;

/**
 * find all dep cat data result 
 */
ActioncreativeHelper.loadAllActioncreativeData = async function loadAllActioncreativeData(req, dataPaginate, group) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Actioncreative = mongoose.model("Actioncreative");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                department_id: new ObjectId(group),
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
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                date: {
                    $last: "$date"
                },
                responsible: {
                    $last: "$responsible"
                },
                description: {
                    $last: "$description"
                },
                reason: {
                    $last: "$responsible"
                },
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: pageSize
        }
    ];
    let res = await Actioncreative.aggregate(pipeline);

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
 * find all dep cat data result 
 */
ActioncreativeHelper.loadAllActioncreativeYearData = async function loadAllActioncreativeYearData(req, dataPaginate, group, year) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Actioncreative = mongoose.model("Actioncreative");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                department_id: new ObjectId(group),
                date: year
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
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                date: {
                    $last: "$date"
                },
                responsible: {
                    $last: "$responsible"
                },
                description: {
                    $last: "$description"
                },
                reason: {
                    $last: "$responsible"
                },
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: pageSize
        }
    ];
    let res = await Actioncreative.aggregate(pipeline);

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
 * group date actioncreative 
 */
ActioncreativeHelper.loadGroupDate = async function loadGroupDate(req, group) {
    const ObjectId = require("mongoose").Types.ObjectId;
    const Actioncreative = mongoose.model("Actioncreative");

    const pipeline = [
        {
            $match: {
                department_id: new ObjectId(group),
            }
        },
        {
            $group: {
                _id: "$date"
            }
        },
        {
            $sort: { _id: 1 }
        }
    ];
    let res = await Actioncreative.aggregate(pipeline);
    return res;
};
/**
 * find all dep cat count data result 
 */
ActioncreativeHelper.loadAllActioncreativeCountData = function loadAllActioncreativeCountData(group) {
    const Actioncreative = mongoose.model('Actioncreative');

    const filterQuery = {
        department_id: group
    };

    return new Promise((resolve, reject) => {
        Actioncreative.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result 
 */
ActioncreativeHelper.loadAllActioncreativeCountYearData = function loadAllActioncreativeCountYearData(group, year) {
    const Actioncreative = mongoose.model('Actioncreative');

    const filterQuery = {
        department_id: group,
        date: year
    };

    return new Promise((resolve, reject) => {
        Actioncreative.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Actioncreative data result 
 */
ActioncreativeHelper.loadActioncreativeData = function loadActioncreativeData(id) {
    const Actioncreative = mongoose.model('Actioncreative');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Actioncreative.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Actioncreative data  
 */
ActioncreativeHelper.insertNewActioncreative = async function insertNewActioncreative(data) {

    const Actioncreative = mongoose.model('Actioncreative');
    const actioncreative = new Actioncreative(data)

    let res2 = await actioncreative.save();
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
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                date: {
                    $last: "$date"
                },
                responsible: {
                    $last: "$responsible"
                },
                description: {
                    $last: "$description"
                },
                reason: {
                    $last: "$responsible"
                },
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];

    let res = await Actioncreative.aggregate(pipeline);
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
 * update Actioncreative data  
 */
ActioncreativeHelper.updateActioncreativeData = async function updateActioncreativeData(data) {
    const Actioncreative = mongoose.model('Actioncreative');
    let res2 = await Actioncreative.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

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
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                date: {
                    $last: "$date"
                },
                responsible: {
                    $last: "$responsible"
                },
                description: {
                    $last: "$description"
                },
                reason: {
                    $last: "$responsible"
                },
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];

    let res = await Actioncreative.aggregate(pipeline);
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
 * delete actioncreative data  
 */
ActioncreativeHelper.deleteActioncreative = function deleteActioncreative(data) {
    return new Promise((resolve, reject) => {
        const Actioncreative = mongoose.model('Actioncreative');
        Actioncreative.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

