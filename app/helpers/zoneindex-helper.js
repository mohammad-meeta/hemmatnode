
'use strict';

const mongoose = require('mongoose');

/**
 * Zoneindex controller
 */
function ZoneindexHelper() { }
module.exports = ZoneindexHelper;

/**
 * find all dep cat data index
 */
ZoneindexHelper.loadAllZoneindexData = async function loadAllZoneindexData(req, dataPaginate, type) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Zoneindex = mongoose.model("Zoneindex");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                zone_cat: ObjectId(type)
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
                title: {
                    $last: "$title"
                },
                point: {
                    $last: "$point"
                },
                source: {
                    $last: "$source"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                zone_cat: {
                    $last: "$zonecat"
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
    let res = await Zoneindex.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat data index
 */
ZoneindexHelper.loadAllZoneindexDataAll = async function loadAllZoneindexDataAll(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Zoneindex = mongoose.model("Zoneindex");

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
                title: {
                    $last: "$title"
                },
                point: {
                    $last: "$point"
                },
                source: {
                    $last: "$source"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                zone_cat: {
                    $last: "$zonecat"
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
    let res = await Zoneindex.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat count data result
 */
ZoneindexHelper.loadAllZoneindexCountData = function loadAllZoneindexCountData(type) {
    const Zoneindex = mongoose.model('Zoneindex');
    const ObjectId = require("mongoose").Types.ObjectId;
    const filterQuery = {
        zone_cat: ObjectId(type)
    };

    return new Promise((resolve, reject) => {
        Zoneindex.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result
 */
ZoneindexHelper.loadAllZoneindexCountDataAll = function loadAllZoneindexCountDataAll() {
    const Zoneindex = mongoose.model('Zoneindex');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Zoneindex.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find Zoneindex data result
 */
ZoneindexHelper.loadZoneindexData = function loadZoneindexData(id) {
    const Zoneindex = mongoose.model('Zoneindex');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Zoneindex.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Zoneindex data
 */
ZoneindexHelper.insertNewZoneindex = async function insertNewZoneindex(data) {
    const Zoneindex = mongoose.model('Zoneindex');
    const index = new Zoneindex(data)

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
                title: {
                    $last: "$title"
                },
                point: {
                    $last: "$point"
                },
                source: {
                    $last: "$source"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                zone_cat: {
                    $last: "$zonecat"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Zoneindex.aggregate(pipeline);
    return res;
};

/**
 * update Zoneindex data
 */
ZoneindexHelper.updateZoneindexData = async function updateZoneindexData(data) {
    const Zoneindex = mongoose.model('Zoneindex');
    let res2 = await Zoneindex.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

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
                title: {
                    $last: "$title"
                },
                point: {
                    $last: "$point"
                },
                source: {
                    $last: "$source"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                zone_cat: {
                    $last: "$zonecat"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Zoneindex.aggregate(pipeline);
    return res;
};

/**
 * delete index data
 */
ZoneindexHelper.deleteZoneindex = function deleteZoneindex(data) {
    return new Promise((resolve, reject) => {
        const Zoneindex = mongoose.model('Zoneindex');
        Zoneindex.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

