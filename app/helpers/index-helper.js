
'use strict';

const mongoose = require('mongoose');

/**
 * Index controller
 */
function IndexHelper() { }
module.exports = IndexHelper;

/**
 * find all dep cat data index
 */
IndexHelper.loadAllIndexData = async function loadAllIndexData(req, dataPaginate, type) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Index = mongoose.model("Index");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                type_id: ObjectId(type)
            }
        },
        {
            $lookup: {
                from: "monitoring_types",
                localField: "type_id",
                foreignField: "_id",
                as: "montype"
            }
        },
        {
            $unwind: "$montype"
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                description: {
                    $last: "$description"
                },
                unit: {
                    $last: "$unit"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                montype: {
                    $last: "$montype"
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
    let res = await Index.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat data index
 */
IndexHelper.loadAllIndexDataAll = async function loadAllIndexDataAll(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Index = mongoose.model("Index");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $lookup: {
                from: "monitoring_types",
                localField: "type_id",
                foreignField: "_id",
                as: "montype"
            }
        },
        {
            $unwind: "$montype"
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                description: {
                    $last: "$description"
                },
                unit: {
                    $last: "$unit"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                montype: {
                    $last: "$montype"
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
    let res = await Index.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat count data result
 */
IndexHelper.loadAllIndexCountData = function loadAllIndexCountData(type) {
    const Index = mongoose.model('Index');
    const ObjectId = require("mongoose").Types.ObjectId;
    const filterQuery = {
        type_id: ObjectId(type)
    };

    return new Promise((resolve, reject) => {
        Index.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result
 */
IndexHelper.loadAllIndexCountDataAll = function loadAllIndexCountDataAll() {
    const Index = mongoose.model('Index');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Index.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find Index data result
 */
IndexHelper.loadIndexData = function loadIndexData(id) {
    const Index = mongoose.model('Index');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Index.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Index data
 */
IndexHelper.insertNewIndex = async function insertNewIndex(data) {
    const Index = mongoose.model('Index');
    const index = new Index(data)

    let res2 = await index.save();
    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },
        {
            $lookup: {
                from: "monitoring_types",
                localField: "type_id",
                foreignField: "_id",
                as: "montype"
            }
        },
        {
            $unwind: "$montype"
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                description: {
                    $last: "$description"
                },
                unit: {
                    $last: "$unit"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                montype: {
                    $last: "$montype"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Index.aggregate(pipeline);
    return res;
};

/**
 * update Index data
 */
IndexHelper.updateIndexData = async function updateIndexData(data) {
    const Index = mongoose.model('Index');
    let res2 = await Index.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    const pipeline = [
        {
            $match: {
                _id: res2._id,
            }
        },

        {
            $lookup: {
                from: "monitoring_types",
                localField: "type_id",
                foreignField: "_id",
                as: "montype"
            }
        },
        {
            $unwind: "$montype"
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                description: {
                    $last: "$description"
                },
                unit: {
                    $last: "$unit"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                montype: {
                    $last: "$montype"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Index.aggregate(pipeline);
    return res;
};

/**
 * delete index data
 */
IndexHelper.deleteIndex = function deleteIndex(data) {
    return new Promise((resolve, reject) => {
        const Index = mongoose.model('Index');
        Index.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

