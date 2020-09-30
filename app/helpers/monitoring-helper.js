
'use strict';

const mongoose = require('mongoose');

/**
 * Monitoring controller
 */
function MonitoringHelper() { }
module.exports = MonitoringHelper;

/**
 * find all index cat data index 
 */
MonitoringHelper.loadAllMonitoringData = async function loadAllMonitoringData(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Monitoring = mongoose.model("Monitoring");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $lookup: {
                from: "indexes",
                localField: "index_id",
                foreignField: "_id",
                as: "index"
            }
        },
        {
            $unwind: "$index"
        },
        {
            $group: {
                _id: "$_id",
                date: {
                    $last: "$date"
                },
                value: {
                    $last: "$value"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                index: {
                    $last: "$index"
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
    let res = await Monitoring.aggregate(pipeline);

    return res;
};
/**
 * find all index cat count data result 
 */
MonitoringHelper.loadAllMonitoringCountData = function loadAllMonitoringCountData() {
    const Monitoring = mongoose.model('Monitoring');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Monitoring.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find Monitoring data result 
 */
MonitoringHelper.loadMonitoringData = function loadMonitoringData(id) {
    const Monitoring = mongoose.model('Monitoring');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Monitoring.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Monitoring data  
 */
MonitoringHelper.insertNewMonitoring = async function insertNewMonitoring(data) {

    const Monitoring = mongoose.model('Monitoring');
    const index = new Monitoring(data)

    let res2 = await index.save();
    const pipeline = [
        {
            $match: {
                _id: res2._id
            }
        },
        {
            $lookup: {
                from: "indexes",
                localField: "index_id",
                foreignField: "_id",
                as: "index"
            }
        },
        {
            $unwind: "$index"
        },
        {
            $group: {
                _id: "$_id",
                date: {
                    $last: "$date"
                },
                value: {
                    $last: "$value"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                index: {
                    $last: "$index"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Monitoring.aggregate(pipeline);

    return res;
};

/**
 * update Monitoring data  
 */
MonitoringHelper.updateMonitoringData = async function updateMonitoringData(data) {
    const Monitoring = mongoose.model('Monitoring');
    let res2 = await Monitoring.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    const pipeline = [
        {
            $match: {
                _id: res2._id
            }
        },
        {
            $lookup: {
                from: "indexes",
                localField: "index_id",
                foreignField: "_id",
                as: "index"
            }
        },
        {
            $unwind: "$index"
        },
        {
            $group: {
                _id: "$_id",
                date: {
                    $last: "$date"
                },
                value: {
                    $last: "$value"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                index: {
                    $last: "$index"
                },
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];
    let res = await Monitoring.aggregate(pipeline);
    return res;
};

/**
 * delete index data  
 */
MonitoringHelper.deleteMonitoring = function deleteMonitoring(data) {
    return new Promise((resolve, reject) => {
        const Monitoring = mongoose.model('Monitoring');
        Monitoring.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

