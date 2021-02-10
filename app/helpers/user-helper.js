'use strict';

const mongoose = require('mongoose');

/**
 * Algorithm controller
 */
function UserHelper() { }
module.exports = UserHelper;

/**
 * find all users data result
 */
UserHelper.loadAllUserData = async function loadAllUserData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const User = mongoose.model('User');

    const pipeline = [
        {
            $lookup: {
                from: "files",
                localField: "profile.image",
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
                "file.user_id": 0
            }
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
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                imageFile: {
                    $push: "$file"
                },
                is_active: {
                    $last: "$is_active"
                },
                name: {
                    $last: "$name"
                },
                createdAt: {
                    $last: "$created_at"
                },
                email: {
                    $last: "$email"
                },
                profile: {
                    $last: "$profile"
                },
                cellphone: {
                    $last: "$cellphone"
                },
                role_group_group: {
                    $last: "$role_group_group"
                },
                role_group_role: {
                    $last: "$role_group_role"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        },
        {
            $skip: skip
        },
        {
            $limit: pageSize
        }
    ];

    let res = await User.aggregate(pipeline);

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
 * find all count users data result
 */
UserHelper.loadAllCountUserData = function loadAllCountUserData() {
    const User = mongoose.model('User');

    return new Promise((resolve, reject) => {
        User.countDocuments({})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};


/**
 * find user data result
 */
UserHelper.loadUserData = async function loadUserData(userName) {
    const User = mongoose.model('User');
    const pipeline = [
        {
            "$match": {
                name: userName
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "profile.image",
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
                "file.user_id": 0
            }
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
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                imageFile: {
                    $push: "$file"
                },
                is_active: {
                    $last: "$is_active"
                },
                name: {
                    $last: "$name"
                },
                createdAt: {
                    $last: "$created_at"
                },
                email: {
                    $last: "$email"
                },
                profile: {
                    $last: "$profile"
                },
                cellphone: {
                    $last: "$cellphone"
                },
                role_group_group: {
                    $last: "$role_group_group"
                },
                role_group_role: {
                    $last: "$role_group_role"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ];

    let res = await User.aggregate(pipeline);

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
 * find user data result with _id
 */
UserHelper.loadUserDataID = async function loadUserDataID(id) {
    const User = mongoose.model('User');
    const ObjectId = require('mongoose').Types.ObjectId;

    const pipeline = [
        {
            "$match": {
                _id: new ObjectId(id)
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "profile.image",
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
                "file.user_id": 0
            }
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
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                imageFile: {
                    $push: "$file"
                },
                is_active: {
                    $last: "$is_active"
                },
                name: {
                    $last: "$name"
                },
                createdAt: {
                    $last: "$created_at"
                },
                email: {
                    $last: "$email"
                },
                profile: {
                    $last: "$profile"
                },
                cellphone: {
                    $last: "$cellphone"
                },
                role_group_group: {
                    $last: "$role_group_group"
                },
                role_group_role: {
                    $last: "$role_group_role"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ];

    let res = await User.aggregate(pipeline);

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
 * insert user data
 */
UserHelper.insertNewUser = async function insertNewUser(data) {

    const User = mongoose.model('User');
    const user = new User(data)

    let res2 = await user.save();
    const pipeline = [
        {
            "$match": {
                _id: res2._id
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "profile.image",
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
                "file.user_id": 0
            }
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
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                imageFile: {
                    $push: "$file"
                },
                is_active: {
                    $last: "$is_active"
                },
                name: {
                    $last: "$name"
                },
                createdAt: {
                    $last: "$created_at"
                },
                email: {
                    $last: "$email"
                },
                profile: {
                    $last: "$profile"
                },
                cellphone: {
                    $last: "$cellphone"
                },
                role_group_group: {
                    $last: "$role_group_group"
                },
                role_group_role: {
                    $last: "$role_group_role"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ];

    let res = await User.aggregate(pipeline);

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
 * update user data
 */
UserHelper.updateUserData = async function updateUserData(data) {

    const User = mongoose.model('User');
    let res2 = await User.findByIdAndUpdate(data._id, data, {
        useFindAndModify: false, new: true
    });

    const pipeline = [
        {
            "$match": {
                _id: res2._id
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "profile.image",
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
                "file.user_id": 0
            }
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
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                imageFile: {
                    $push: "$file"
                },
                is_active: {
                    $last: "$is_active"
                },
                name: {
                    $last: "$name"
                },
                createdAt: {
                    $last: "$created_at"
                },
                email: {
                    $last: "$email"
                },
                profile: {
                    $last: "$profile"
                },
                cellphone: {
                    $last: "$cellphone"
                },
                role_group_group: {
                    $last: "$role_group_group"
                },
                role_group_role: {
                    $last: "$role_group_role"
                }
            }
        },
        {
            $sort: {
                createdAt: -1
            }
        }
    ];

    let res = await User.aggregate(pipeline);

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
 * delete user data
 */
UserHelper.deleteUserData = function deleteUserData(data) {
    return new Promise((resolve, reject) => {
        const User = mongoose.model('User');

        User.findOneAndUpdate(data._id, {
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
