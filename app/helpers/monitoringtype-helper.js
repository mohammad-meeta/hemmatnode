
'use strict';

const mongoose = require('mongoose');

/**
 * Monitoringtype controller
 */
function MonitoringtypeHelper() { }
module.exports = MonitoringtypeHelper;

/**
 * find all dep cat data result 
 */
MonitoringtypeHelper.loadAllMonitoringtypeData = async function loadAllMonitoringtypeData(req, dataPaginate) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Monitoringtype = mongoose.model("Monitoringtype");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
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
    let res = await Monitoringtype.aggregate(pipeline);

    return res;
};
/**
 * find all dep cat count data result 
 */
MonitoringtypeHelper.loadAllMonitoringtypeCountData = function loadAllMonitoringtypeCountData() {
    const Monitoringtype = mongoose.model('Monitoringtype');

    const filterQuery = {
    };

    return new Promise((resolve, reject) => {
        Monitoringtype.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Monitoringtype data result 
 */
MonitoringtypeHelper.loadMonitoringtypeData = function loadMonitoringtypeData(id) {
    const Monitoringtype = mongoose.model('Monitoringtype');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Monitoringtype.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Monitoringtype data  
 */
MonitoringtypeHelper.insertNewMonitoringtype = async function insertNewMonitoringtype(data) {

    const Monitoringtype = mongoose.model('Monitoringtype');
    const monitoringtype = new Monitoringtype(data)

    let res2 = await monitoringtype.save();
    return res2;
};

/**
 * update Monitoringtype data  
 */
MonitoringtypeHelper.updateMonitoringtypeData = async function updateMonitoringtypeData(data) {
    const Monitoringtype = mongoose.model('Monitoringtype');
    let res2 = await Monitoringtype.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });
    return res2;
};

/**
 * delete monitoringtype data  
 */
MonitoringtypeHelper.deleteMonitoringtype = function deleteMonitoringtype(data) {
    return new Promise((resolve, reject) => {
        const Monitoringtype = mongoose.model('Monitoringtype');
        Monitoringtype.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

