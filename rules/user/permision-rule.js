'use strict';
const mongoose = require('mongoose');
/**
 * Rule
 */
function Rule() { }
module.exports = Rule;

/**
 * Check data
 */
Rule.check = function check(user, data) {
    return new Promise((resolve, reject) => {
        const User = mongoose.model('User');

        const pipeline = [{
            "$match": {
                "name": user.userName
            }
        },
        {
            "$project": {
                "role": "$role_group.role",
                "group": "$role_group.group"
            }
        },
        {
            "$lookup": {
                "from": "roles",
                "localField": "role",
                "foreignField": "_id",
                "as": "res"
            }
        },
        {
            "$project": {
                "role": 1,
                "group": 1,
                "permision": "$res.permision"
            }
        },
        {
            "$unwind": "$permision"
        },
        {
            "$unwind": "$permision"
        },
        {
            "$lookup": {
                "from": "rules",
                "localField": "permision",
                "foreignField": "id",
                "as": "res2"
            }
        },
        {
            "$unwind": "$res2"
        },
        {
            "$project": {
                "role": 1,
                "group": 1,
                "source": "$res2.short_cut"
            }
        },
        {
            "$match": {
                "source": data
            }
        }
        ];
        // const pipeline = [{
        //         "$match": {
        //             "name": user.userName
        //         }
        //     },
        //     {
        //         "$project": {
        //             "name": 1,
        //             "roles": 1
        //         }
        //     },
        //     {
        //         "$unwind": "$roles"
        //     },
        //     {
        //         "$lookup": {
        //             "from": "roles",
        //             "localField": "roles",
        //             "foreignField": "name",
        //             "as": "res"
        //         }
        //     },
        //     {
        //         "$unwind": "$res"
        //     },
        //     {
        //         "$unwind": "$res.permision"
        //     },
        //     {
        //         "$group": {
        //             "_id": "$res.permision",
        //             "name": {
        //                 "$last": "$name"
        //             }
        //         }
        //     },
        //     {
        //         "$lookup": {
        //             "from": "rules",
        //             "localField": "_id",
        //             "foreignField": "id",
        //             "as": "res2"
        //         }
        //     },
        //     {
        //         "$unwind": "$res2"
        //     },
        //     {
        //         "$group": {
        //             "_id": "$_id",
        //             "permission": {
        //                 "$last": "$res2.short_cut"
        //             }
        //         }
        //     },
        //     {
        //         "$match": {
        //             "permission": data
        //         }
        //     }
        // ];

        User.aggregate(pipeline)
            .then(res => {
                res = res || [];
                resolve(null != res[0]);
            })
            .catch(err => {
                reject(err);
                return false
            });
    });
};