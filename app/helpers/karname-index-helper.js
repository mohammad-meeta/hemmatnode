
'use strict';

const mongoose = require('mongoose');

/**
 * Index controller
 */
function KarnameIndexHelper() { }
module.exports = KarnameIndexHelper;

/**
 * find all dep cat data index
 */
KarnameIndexHelper.loadAllIndexData = async function loadAllIndexData(req, dataPaginate, type) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Index = mongoose.model("Karnameindex");

    const userId = req.session.auth.userId;
    const pipeline = [
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
                dep: {
                    $last: "$dep"
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
KarnameIndexHelper.loadAllKarnameindexDataAll = async function loadAllKarnameindexDataAll(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Index = mongoose.model("Karnameindex");

    const userId = req.session.auth.userId;
    const pipeline = [
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
                dep: {
                    $last: "$dep"
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
KarnameIndexHelper.loadDepKarnameindexData = async function loadDepKarnameindexData(req, dataPaginate, group) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Index = mongoose.model("Karnameindex");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            "$lookup": {
                "from": "departments",
                "let": {
                    "code": "$department_id"
                },
                "pipeline": [{
                    "$match": {
                        "$expr": {
                            "$eq": ["$references", "$$code"]
                        },
                    }
                }
                ],
                as: "pdep",
            }
        },
        {
            $unwind: "$pdep"
        },
        {
            "$match": {
                $or: [
                    {
                        department_id: ObjectId(group)
                    },
                    {
                        "pdep._id": ObjectId(group)
                    }
                ]
            }
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
                dep: {
                    $last: "$dep"
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
KarnameIndexHelper.loadAllKarnameindexCountDataAll = function loadAllKarnameindexCountDataAll() {
    const Index = mongoose.model('Karnameindex');
    const ObjectId = require("mongoose").Types.ObjectId;
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
 * find all dep cat count data result
 */
KarnameIndexHelper.loadDepKarnameindexCountData = function loadDepKarnameindexCountData(group) {
    const Index = mongoose.model('Karnameindex');
    const ObjectId = require("mongoose").Types.ObjectId;
    const filterQuery = {
        department_id: ObjectId(group)
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
KarnameIndexHelper.loadAllIndexCountDataAll = function loadAllIndexCountDataAll() {
    const Index = mongoose.model('Karnameindex');

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
KarnameIndexHelper.loadIndexData = function loadIndexData(id) {
    const Index = mongoose.model('Karnameindex');

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
KarnameIndexHelper.insertNewKarnameindex = async function insertNewKarnameindex(data) {
    const Index = mongoose.model('Karnameindex');
    const index = new Index(data)

    let res2 = await index.save();
    const pipeline = [
        {
            $match: {
                _id: res2._id
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
                dep: {
                    $last: "$dep"
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
KarnameIndexHelper.updateKarnameindexData = async function updateKarnameindexData(data) {
    const Index = mongoose.model('Karnameindex');
    let res2 = await Index.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    const pipeline = [
        {
            $match: {
                _id: res2._id,
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
                dep: {
                    $last: "$dep"
                },
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
KarnameIndexHelper.deleteKarnameindexData = function deleteKarnameindexData(data) {
    return new Promise((resolve, reject) => {
        const Index = mongoose.model('Karnameindex');
        Index.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

