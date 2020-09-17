"use strict";

const mongoose = require("mongoose");

/**
 * dep cat controller
 */
function InviteSessiontHelper() { }
module.exports = InviteSessiontHelper;

/**
 * find all dep cat data result
 */
InviteSessiontHelper.loadAllInviteSessionData = async function loadAllInviteSessionData(
    req,
    dataPaginate,
    group
) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const InviteSession = mongoose.model("InviteSession");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                department_id: new ObjectId(group),

                $or: [
                    {
                        user_id: ObjectId(userId)
                    },
                    {
                        user_list: userId
                    }
                ]
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
                intro: {
                    $last: "$intro"
                },
                oldFiles: {
                    $push: "$files"
                },
                ffiles: {
                    $push: "$ffile"
                },
                signatured: {
                    $last: "$signatured"
                },
                user_list: {
                    $last: "$user_list"
                },
                is_active: {
                    $last: "$is_active"
                },
                other_user: {
                    $last: "$other_user"
                },
                approves: {
                    $last: "$approves"
                },
                present_user: {
                    $last: "$present_user"
                },
                status: {
                    $last: "$status"
                },
                body: {
                    $last: "$body"
                },
                agenda: {
                    $last: "$agenda"
                },
                place: {
                    $last: "$place"
                },
                date: {
                    $last: "$date"
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
            $unwind: {
                path: "$signatured",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "signatured.file_id",
                foreignField: "_id",
                as: "fsignatured"
            }
        },
        {
            $unwind: {
                path: "$fsignatured",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "fsignatured.encoding": 0,
                "fsignatured.mimetype": 0,
                "fsignatured.destination": 0,
                "fsignatured.user_id": 0,
                "fsignatured.path": 0,
            }
        },
        {
            $group: {
                _id: "$_id",
                intro: {
                    $last: "$intro"
                },
                oldFiles: {
                    $last: "$oldFiles"
                },
                oldSignatured: {
                    $last: "$signatured"
                },
                files: {
                    $last: "$ffiles"
                },
                signatured: {
                    $push: "$fsignatured"
                },
                user_list: {
                    $last: "$user_list"
                },
                is_active: {
                    $last: "$is_active"
                },
                other_user: {
                    $last: "$other_user"
                },
                approves: {
                    $last: "$approves"
                },
                present_user: {
                    $last: "$present_user"
                },
                status: {
                    $last: "$status"
                },
                body: {
                    $last: "$body"
                },
                agenda: {
                    $last: "$agenda"
                },
                place: {
                    $last: "$place"
                },
                date: {
                    $last: "$date"
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

    let res = await InviteSession.aggregate(pipeline);
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

        let oldSignatured = res[resI].oldSignatured;
        let signaturedF = res[resI].signatured;
        let deletedSig = [];
        for (let index = 0; index < signaturedF.length; index++) {
            const element = signaturedF[index];
            for (let index2 = 0; index2 < oldSignatured.length; index2++) {
                const element2 = oldSignatured[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deletedSig.push(element["_id"])
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

        for (let index3 = 0; index3 < deletedSig.length; index3++) {
            const element = deletedSig[index3];
            const indexF = signaturedF.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                signaturedF.splice(indexF, 1)
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
    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].signatured.length; k++) {
            res[i].signatured[k] = {
                "_id": res[i].signatured[k]._id,
                "fieldname": res[i].signatured[k].fieldname,
                "name": res[i].signatured[k].originalname,
                "filename": res[i].signatured[k].filename,
                "size": res[i].signatured[k].size,
            };
        }
    }
    return res;
};

/**
 * find all dep cat count data result
 */
InviteSessiontHelper.loadAllInviteSessionCountData = function loadAllInviteSessionCountData(
    req,
    group
) {
    const InviteSession = mongoose.model("InviteSession");
    const ObjectId = require("mongoose").Types.ObjectId;
    const userId = req.session.auth.userId;

    const filterQuery = {
        department_id: new ObjectId(group),
        $or: [
            {
                user_id: new ObjectId(userId)
            },
            {
                user_list: userId
            }
        ]
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
InviteSessiontHelper.loadInviteSessionData = function loadInviteSessionData(
    _id
) {
    const InviteSession = mongoose.model("InviteSession");

    const filterQuery = {
        _id: _id
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
InviteSessiontHelper.insertNewInviteSession = async function insertNewInviteSession(
    data
) {
    const InviteSession = mongoose.model("InviteSession");
    const inviteSession = new InviteSession(data);

    let res2 = await inviteSession.save();

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
                intro: {
                    $last: "$intro"
                },
                oldFiles: {
                    $push: "$files"
                },
                ffiles: {
                    $push: "$ffile"
                },
                signatured: {
                    $last: "$signatured"
                },
                user_list: {
                    $last: "$user_list"
                },
                is_active: {
                    $last: "$is_active"
                },
                other_user: {
                    $last: "$other_user"
                },
                approves: {
                    $last: "$approves"
                },
                present_user: {
                    $last: "$present_user"
                },
                status: {
                    $last: "$status"
                },
                body: {
                    $last: "$body"
                },
                agenda: {
                    $last: "$agenda"
                },
                place: {
                    $last: "$place"
                },
                date: {
                    $last: "$date"
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
            $unwind: {
                path: "$signatured",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "signatured.file_id",
                foreignField: "_id",
                as: "fsignatured"
            }
        },
        {
            $unwind: {
                path: "$fsignatured",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "fsignatured.encoding": 0,
                "fsignatured.mimetype": 0,
                "fsignatured.destination": 0,
                "fsignatured.user_id": 0,
                "fsignatured.path": 0,
            }
        },
        {
            $group: {
                _id: "$_id",
                intro: {
                    $last: "$intro"
                },
                oldFiles: {
                    $last: "$oldFiles"
                },
                oldSignatured: {
                    $last: "$signatured"
                },
                files: {
                    $last: "$ffiles"
                },
                signatured: {
                    $push: "$fsignatured"
                },
                user_list: {
                    $last: "$user_list"
                },
                is_active: {
                    $last: "$is_active"
                },
                other_user: {
                    $last: "$other_user"
                },
                approves: {
                    $last: "$approves"
                },
                present_user: {
                    $last: "$present_user"
                },
                status: {
                    $last: "$status"
                },
                body: {
                    $last: "$body"
                },
                agenda: {
                    $last: "$agenda"
                },
                place: {
                    $last: "$place"
                },
                date: {
                    $last: "$date"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                }
            }
        }
    ];

    let res = await InviteSession.aggregate(pipeline);
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

        let oldSignatured = res[resI].oldSignatured;
        let signaturedF = res[resI].signatured;
        let deletedSig = [];
        for (let index = 0; index < signaturedF.length; index++) {
            const element = signaturedF[index];
            for (let index2 = 0; index2 < oldSignatured.length; index2++) {
                const element2 = oldSignatured[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deletedSig.push(element["_id"])
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

        for (let index3 = 0; index3 < deletedSig.length; index3++) {
            const element = deletedSig[index3];
            const indexF = signaturedF.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                signaturedF.splice(indexF, 1)
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
    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].signatured.length; k++) {
            res[i].signatured[k] = {
                "_id": res[i].signatured[k]._id,
                "fieldname": res[i].signatured[k].fieldname,
                "name": res[i].signatured[k].originalname,
                "filename": res[i].signatured[k].filename,
                "size": res[i].signatured[k].size,
            };
        }
    }
    return res[0];
};
/**
 * insert approves
 */
InviteSessiontHelper.insertApproves = function insertApproves(data) {
    return new Promise((resolve, reject) => {
        const Approves = mongoose.model("Approves");

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
InviteSessiontHelper.updateInviteSessionData = async function updateInviteSessionData(data) {
    const InviteSession = mongoose.model("InviteSession");

    let res2 = await InviteSession.findByIdAndUpdate(data._id, data, {
        useFindAndModify: false, new: true
    });

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
                intro: {
                    $last: "$intro"
                },
                oldFiles: {
                    $push: "$files"
                },
                ffiles: {
                    $push: "$ffile"
                },
                signatured: {
                    $last: "$signatured"
                },
                user_list: {
                    $last: "$user_list"
                },
                is_active: {
                    $last: "$is_active"
                },
                other_user: {
                    $last: "$other_user"
                },
                approves: {
                    $last: "$approves"
                },
                present_user: {
                    $last: "$present_user"
                },
                status: {
                    $last: "$status"
                },
                body: {
                    $last: "$body"
                },
                agenda: {
                    $last: "$agenda"
                },
                place: {
                    $last: "$place"
                },
                date: {
                    $last: "$date"
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
            $unwind: {
                path: "$signatured",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "signatured.file_id",
                foreignField: "_id",
                as: "fsignatured"
            }
        },
        {
            $unwind: {
                path: "$fsignatured",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "fsignatured.encoding": 0,
                "fsignatured.mimetype": 0,
                "fsignatured.destination": 0,
                "fsignatured.user_id": 0,
                "fsignatured.path": 0,
            }
        },
        {
            $group: {
                _id: "$_id",
                intro: {
                    $last: "$intro"
                },
                oldFiles: {
                    $last: "$oldFiles"
                },
                oldSignatured: {
                    $last: "$signatured"
                },
                files: {
                    $last: "$ffiles"
                },
                signatured: {
                    $push: "$fsignatured"
                },
                user_list: {
                    $last: "$user_list"
                },
                is_active: {
                    $last: "$is_active"
                },
                other_user: {
                    $last: "$other_user"
                },
                approves: {
                    $last: "$approves"
                },
                present_user: {
                    $last: "$present_user"
                },
                status: {
                    $last: "$status"
                },
                body: {
                    $last: "$body"
                },
                agenda: {
                    $last: "$agenda"
                },
                place: {
                    $last: "$place"
                },
                date: {
                    $last: "$date"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                }
            }
        }
    ];

    let res = await InviteSession.aggregate(pipeline);
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

        let oldSignatured = res[resI].oldSignatured;
        let signaturedF = res[resI].signatured;
        let deletedSig = [];
        for (let index = 0; index < signaturedF.length; index++) {
            const element = signaturedF[index];
            for (let index2 = 0; index2 < oldSignatured.length; index2++) {
                const element2 = oldSignatured[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deletedSig.push(element["_id"])
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

        for (let index3 = 0; index3 < deletedSig.length; index3++) {
            const element = deletedSig[index3];
            const indexF = signaturedF.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                signaturedF.splice(indexF, 1)
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
    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].signatured.length; k++) {
            res[i].signatured[k] = {
                "_id": res[i].signatured[k]._id,
                "fieldname": res[i].signatured[k].fieldname,
                "name": res[i].signatured[k].originalname,
                "filename": res[i].signatured[k].filename,
                "size": res[i].signatured[k].size,
            };
        }
    }
    return res[0];
};

/**
 * update invite session data
 */
InviteSessiontHelper.updateInviteSessionApproves = function updateInviteSessionApproves(
    data
) {
    return new Promise((resolve, reject) => {
        const InviteSession = mongoose.model("InviteSession");
        InviteSession.findByIdAndUpdate(data._id, data, {
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
InviteSessiontHelper.deleteInviteSessionData = function deleteInviteSessionData(
    data
) {
    return new Promise((resolve, reject) => {
        const InviteSession = mongoose.model("InviteSession");

        InviteSession.findOneAndUpdate(
            data._id,
            {
                is_active: false
            },
            {
                useFindAndModify: false, new: true
            }
        )
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
