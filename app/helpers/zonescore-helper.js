
'use strict';

const mongoose = require('mongoose');

/**
 * Zonescore controller
 */
function ZonescoreHelper() { }
module.exports = ZonescoreHelper;

/**
 * find all dep cat data index
 */
ZonescoreHelper.loadAllZonescoreData = async function loadAllZonescoreData(req, dataPaginate, type) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Zonescore = mongoose.model("Zonescore");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                zone_index: ObjectId(type)
            }
        },
        {
            $lookup: {
                from: "zoneindexs",
                localField: "zone_index",
                foreignField: "_id",
                as: "zoneindex"
            }
        },
        {
            $unwind: "$zoneindex"
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
                year: {
                    $last: "$year"
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
                zoneindex: {
                    $last: "$zoneindex"
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
    let res = await Zonescore.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat data index
 */
ZonescoreHelper.loadAllZonescoreDataAll = async function loadAllZonescoreDataAll(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Zonescore = mongoose.model("Zonescore");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $lookup: {
                from: "zoneindexs",
                localField: "zone_index",
                foreignField: "_id",
                as: "zoneindex"
            }
        },
        {
            $unwind: "$zoneindex"
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
                year: {
                    $last: "$year"
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
                zoneindex: {
                    $last: "$zoneindex"
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
    let res = await Zonescore.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat count data result
 */
ZonescoreHelper.loadAllZonescoreCountData = function loadAllZonescoreCountData(type) {
    const Zonescore = mongoose.model('Zonescore');
    const ObjectId = require("mongoose").Types.ObjectId;
    const filterQuery = {
        zone_index: ObjectId(type)
    };

    return new Promise((resolve, reject) => {
        Zonescore.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result
 */
ZonescoreHelper.loadAllZonescoreCountDataAll = function loadAllZonescoreCountDataAll() {
    const Zonescore = mongoose.model('Zonescore');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Zonescore.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Zonescore data result
 */
ZonescoreHelper.loadZonescoreData = function loadZonescoreData(id) {
    const Zonescore = mongoose.model('Zonescore');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Zonescore.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Zonescore data
 */
ZonescoreHelper.insertNewZonescore = async function insertNewZonescore(data) {
    const Zonescore = mongoose.model('Zonescore');
    const index = new Zonescore(data)

    let res2 = await index.save();
    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },
        {
            $lookup: {
                from: "zoneindexs",
                localField: "zone_index",
                foreignField: "_id",
                as: "zoneindex"
            }
        },
        {
            $unwind: "$zoneindex"
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
                year: {
                    $last: "$year"
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
                zoneindex: {
                    $last: "$zoneindex"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Zonescore.aggregate(pipeline);
    return res;
};

/**
 * update Zonescore data
 */
ZonescoreHelper.updateZonescoreData = async function updateZonescoreData(data) {
    const Zonescore = mongoose.model('Zonescore');
    let res2 = await Zonescore.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },

        {
            $lookup: {
                from: "zoneindexs",
                localField: "zone_index",
                foreignField: "_id",
                as: "zoneindex"
            }
        },
        {
            $unwind: "$zoneindex"
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
                year: {
                    $last: "$year"
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
                zoneindex: {
                    $last: "$zoneindex"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Zonescore.aggregate(pipeline);
    return res;
};

/**
 * delete index data
 */
ZonescoreHelper.deleteZonescore = function deleteZonescore(data) {
    return new Promise((resolve, reject) => {
        const Zonescore = mongoose.model('Zonescore');
        Zonescore.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

