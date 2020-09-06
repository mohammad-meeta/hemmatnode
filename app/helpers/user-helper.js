'use strict';

const mongoose = require('mongoose');
const { json } = require('body-parser');

/**
 * Algorithm controller
 */
function UserHelper() { }
module.exports = UserHelper;

/**
 * find all users data result
 */
UserHelper.loadAllUserData = function loadAllUserData(dataPaginate) {
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
            $group: {
                _id: "$_id",
                files: {
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

    return new Promise((resolve, reject) => {
        User.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });

    // const filterQuery = {};
    // const projection = {
    //     pwd: 0
    // };

    // return new Promise((resolve, reject) => {
    //     User.find(filterQuery, projection, {
    //             sort: {
    //                 'created_at': -1
    //             },
    //             skip: skip,
    //             limit: pageSize
    //         })
    //         .then(res => {
    //             resolve(res);
    //         })
    //         .catch(err => reject(err));
    // });
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
UserHelper.loadUserData = function loadUserData(userName) {
    const User = mongoose.model('User');
    const pipeline = [{
        "$match": {
            name: userName
        }
    },
    {
        "$lookup": {
            "from": "files",
            "localField": "profile.image",
            "foreignField": "_id",
            "as": "file"
        }
    }, {
        "$unwind": {
            "path": "$file",
            "preserveNullAndEmptyArrays": true
        }
    }, {
        "$project": {
            "file.encoding": 0,
            "file.mimetype": 0,
            "file.user_id": 0,
        }
    }, {
        "$group": {
            "_id": "$_id",
            "files": {
                "$push": "$file"
            },
            "is_active": {
                "$last": "$is_active"
            },
            "name": {
                "$last": "$name"
            },
            "email": {
                "$last": "$email"
            },
            "profile": {
                "$last": "$profile"
            },
            "cellphone": {
                "$last": "$cellphone"
            },
            "role_group": {
                "$last": "$role_group"
            }
        }
    }
    ];

    return new Promise((resolve, reject) => {
        User.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
    // const filterQuery = {
    //     name: userName
    // };

    // const projection = {
    //     pwd: 0
    // };

    // return new Promise((resolve, reject) => {
    //     User.findOne(filterQuery, projection)
    //         .then(res => {
    //             resolve(res);
    //         })
    //         .catch(err => reject(err));
    // });
};
/**
 * find user data result with _id
 */
UserHelper.loadUserDataID = function loadUserDataID(id) {
    const User = mongoose.model('User');
    const ObjectId = require('mongoose').Types.ObjectId;

    const pipeline = [{
        "$match": {
            _id: new ObjectId(id)
        }
    },
    {
        "$lookup": {
            "from": "files",
            "localField": "profile.image",
            "foreignField": "_id",
            "as": "file"
        }
    }, {
        "$unwind": {
            "path": "$file",
            "preserveNullAndEmptyArrays": true
        }
    }, {
        "$project": {
            "file.encoding": 0,
            "file.mimetype": 0,
            "file.user_id": 0,
        }
    }, {
        "$group": {
            "_id": "$_id",
            "files": {
                "$push": "$file"
            },
            "is_active": {
                "$last": "$is_active"
            },
            "name": {
                "$last": "$name"
            },
            "email": {
                "$last": "$email"
            },
            "profile": {
                "$last": "$profile"
            },
            "cellphone": {
                "$last": "$cellphone"
            },
            "role_group": {
                "$last": "$role_group"
            }
        }
    }
    ];

    return new Promise((resolve, reject) => {
        User.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
    // const filterQuery = {
    //     _id: id
    // };

    // const projection = {
    //     pwd: 0
    // };

    // return new Promise((resolve, reject) => {
    //     User.findOne(filterQuery, projection)
    //         .then(res => {
    //             resolve(res);
    //         })
    //         .catch(err => reject(err));
    // });
};

/**
 * insert user data
 */
UserHelper.insertNewUser = function insertNewUser(data) {

    return new Promise((resolve, reject) => {
        const User = mongoose.model('User');
        const user = new User(data)

        user.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update user data
 */
UserHelper.updateUserData = function updateUserData(data) {
    return new Promise((resolve, reject) => {
        const User = mongoose.model('User');
        User.findByIdAndUpdate(data._id, data, {
            useFindAndModify: false, new: true
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
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
