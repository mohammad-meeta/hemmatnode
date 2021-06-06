
'use strict';

const mongoose = require('mongoose');

/**
 * Actionscore controller
 */
function ActionscoreHelper() { }
module.exports = ActionscoreHelper;

/**
 * find all dep cat data index
 */
ActionscoreHelper.loadAllActionscoreData = async function loadAllActionscoreData(req, dataPaginate, type) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Actionscore = mongoose.model("Actionscore");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                action_cat: ObjectId(type)
            }
        },
        {
            $lookup: {
                from: "zonecats",
                localField: "zone_cat",
                foreignField: "_id",
                as: "zonecat"
            }
        },
        {
            $unwind: "$zonecat"
        },
        {
            $group: {
                _id: "$_id",
                score: {
                    $last: "$score"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                zonecat: {
                    $last: "$zonecat"
                },
                title: {
                    $last: "$title"
                },
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
    let res = await Actionscore.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat data index
 */
ActionscoreHelper.loadAllActionscoreDataAll = async function loadAllActionscoreDataAll(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Actionscore = mongoose.model("Actionscore");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $lookup: {
                from: "zonecats",
                localField: "zone_cat",
                foreignField: "_id",
                as: "zonecat"
            }
        },
        {
            $unwind: "$zonecat"
        },
        {
            $group: {
                _id: "$_id",
                score: {
                    $last: "$score"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                zonecat: {
                    $last: "$zonecat"
                },
                title: {
                    $last: "$title"
                },
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
    let res = await Actionscore.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat count data result
 */
ActionscoreHelper.loadAllActionscoreCountData = function loadAllActionscoreCountData(type) {
    const Actionscore = mongoose.model('Actionscore');
    const ObjectId = require("mongoose").Types.ObjectId;
    const filterQuery = {
        action_cat: ObjectId(type)
    };

    return new Promise((resolve, reject) => {
        Actionscore.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result
 */
ActionscoreHelper.loadAllActionscoreCountDataAll = function loadAllActionscoreCountDataAll() {
    const Actionscore = mongoose.model('Actionscore');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Actionscore.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Actionscore data result
 */
ActionscoreHelper.loadActionscoreData = function loadActionscoreData(id) {
    const Actionscore = mongoose.model('Actionscore');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Actionscore.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Actionscore data
 */
ActionscoreHelper.insertNewActionscore = async function insertNewActionscore(data) {
    const Actionscore = mongoose.model('Actionscore');
    const index = new Actionscore(data)

    let res2 = await index.save();
    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },
        {
            $lookup: {
                from: "zonecats",
                localField: "zone_cat",
                foreignField: "_id",
                as: "zonecat"
            }
        },
        {
            $unwind: "$zonecat"
        },
        {
            $group: {
                _id: "$_id",
                score: {
                    $last: "$score"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                zonecat: {
                    $last: "$zonecat"
                },
                title: {
                    $last: "$title"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Actionscore.aggregate(pipeline);
    return res;
};

/**
 * update Actionscore data
 */
ActionscoreHelper.updateActionscoreData = async function updateActionscoreData(data) {
    const Actionscore = mongoose.model('Actionscore');
    let res2 = await Actionscore.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },
        {
            $lookup: {
                from: "zonecats",
                localField: "zone_cat",
                foreignField: "_id",
                as: "zonecat"
            }
        },
        {
            $unwind: "$zonecat"
        },
        {
            $group: {
                _id: "$_id",
                score: {
                    $last: "$score"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                zonecat: {
                    $last: "$zonecat"
                },
                title: {
                    $last: "$title"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Actionscore.aggregate(pipeline);
    return res;
};

/**
 * delete index data
 */
ActionscoreHelper.deleteActionscore = function deleteActionscore(data) {
    return new Promise((resolve, reject) => {
        const Actionscore = mongoose.model('Actionscore');
        Actionscore.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

