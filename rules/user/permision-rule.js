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
    Logger.debug(`${user} try connect to ${data}`);

    const User = mongoose.model('User');

    const pipeline = [
        {
            "$match": {
                "name": user.username
            }
        },
        {
            "$project": { "name": 1, "roles": 1 }
        },
        {
            "$unwind": "$roles"
        },
        {
            "$lookup": {
                "from": "roles",
                "localField": "roles",
                "foreignField": "name",
                "as": "res"
            }
        },
        {
            "$unwind": "$res"
        },
        {
            "$unwind": "$res.permision"
        },
        {
            "$group": {
                "_id": "$res.permision",
                "name": { "$last": "$name" }
            }
        },
        {
            "$lookup": {
                "from": "rules",
                "localField": "_id",
                "foreignField": "id",
                "as": "res2"
            }
        },
        {
            "$unwind": "$res2"
        },
        {
            "$group": {
                "_id": "$_id",
                "permission": { "$last": "$res2.short_cut" }
            }
        },
        {
            "$match": {
                "permission": data
            }
        }
    ];

    return new Promise((resolve, reject) => {
        User.aggregate(pipeline)
            .then(res => {
                res = res || [];

                resolve(null != res[0]);
            })
            .catch(err => { reject(err); return false });

    });
};
