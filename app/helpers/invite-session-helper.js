"use strict";

const mongoose = require("mongoose");
const { index } = require("../controllers/InviteSessionController");

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
                as: "file"
            }
        },
        {
            $unwind: {
                path: "$file",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "file.encoding": 0,
                "file.mimetype": 0,
                "file.destination": 0,
                "file.user_id": 0,
                "file.path": 0,
            }
        },
        // {
        //     $unwind: {
        //         path: "$files",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $match: {
        //         "files.deleted_at": { $eq: null }
        //     }
        // },
        {
            $group: {
                _id: "$_id",
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$file"
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
        let files = res[0].files;
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

    let res = await inviteSession.save();

    return res;
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
InviteSessiontHelper.updateInviteSessionData = async function updateInviteSessionData(
    data
) {
    const InviteSession = mongoose.model("InviteSession");

    let res = await InviteSession.findByIdAndUpdate(data._id, data, {
        useFindAndModify: false, new: true
    });

    return res;
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
