'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function ActionzonetHelper() { }
module.exports = ActionzonetHelper;

/**
 * find all dep cat data result 
 */
ActionzonetHelper.loadAllActionzonetData = async function loadAllActionzonetData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Actionzonet = mongoose.model('Actionzonet');

    let pipeline = [
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                year: {
                    $last: "$year"
                },
                result: {
                    $last: "$result"
                },
                value: {
                    $last: "$value"
                },
                department_category_id: {
                    $last: "$department_category_id"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
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

    let res = await Actionzonet.aggregate(pipeline);
    return res;
};

/**
 * find all dep cat count data result 
 */
ActionzonetHelper.loadAllCountActionzonetData = function loadAllCountActionzonetData() {
    const Actionzonet = mongoose.model('Actionzonet');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Actionzonet.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
ActionzonetHelper.loadActionzonetData = function loadActionzonetData(id) {
    const Actionzonet = mongoose.model('Actionzonet');

    const filterQuery = {
        _id: id
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Actionzonet.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep data  
 */
ActionzonetHelper.insertNewActionzonet = async function insertNewActionzonet(data) {

    const Actionzonet = mongoose.model('Actionzonet');
    const Actionzonet1 = new Actionzonet(data)

    let res2 = await Actionzonet1.save();

    let pipeline = [
        {
            $match: {
                _id: res2._id
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                year: {
                    $last: "$year"
                },
                result: {
                    $last: "$result"
                },
                value: {
                    $last: "$value"
                },
                department_category_id: {
                    $last: "$department_category_id"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                }
            }
        }
    ];
    let res = await Actionzonet.aggregate(pipeline);

    return res;

};

/**
 * update dep cat data  
 */
ActionzonetHelper.updateActionzonetData = async function updateActionzonetData(data) {

    const Actionzonet = mongoose.model('Actionzonet');
    let res2 = await Actionzonet.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    let pipeline = [
        {
            $match: {
                _id: res2._id
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                year: {
                    $last: "$year"
                },
                result: {
                    $last: "$result"
                },
                value: {
                    $last: "$value"
                },
                department_category_id: {
                    $last: "$department_category_id"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                }
            }
        }
    ];
    let res = await Actionzonet.aggregate(pipeline);

    return res;
};

/**
 * delete dep cat data  
 */
ActionzonetHelper.deleteActionzonetData = function deleteActionzonetData(data) {
    return new Promise((resolve, reject) => {
        const Actionzonet = mongoose.model('Actionzonet');

        Actionzonet.findOneAndUpdate(data._id, {
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