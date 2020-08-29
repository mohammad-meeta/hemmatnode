'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function MemorandumHelper() {}
module.exports = MemorandumHelper;

/**
 * find all dep cat data result 
 */
MemorandumHelper.loadAllMemorandumData = function loadAllMemorandumData(dataPaginate, group) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? ((page - 1) * pageSize) : 0;
    const ObjectId = require('mongoose').Types.ObjectId;
    const Memorandum = mongoose.model('Memorandum');

    const pipeline = [{
            "$match": {
                "department_id": new ObjectId(group)
            }
        },
        {
            "$lookup": {
                "from": "departments",
                "localField": "department_id",
                "foreignField": "_id",
                "as": "dep"
            }
        },
        {
            "$unwind": "$dep"
        },
        {
            "$sort": {
                "created_at": -1
            }
        },
        {
            "$skip": skip
        },
        {
            "$limit": pageSize
        }
    ];

    return new Promise((resolve, reject) => {
        Memorandum.aggregate(pipeline)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result 
 */
MemorandumHelper.loadAllMemorandumCountData = function loadAllMemorandumCountData(group) {
    const Memorandum = mongoose.model('Memorandum');

    const filterQuery = {
        department_id: group
    };

    return new Promise((resolve, reject) => {
        Memorandum.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
MemorandumHelper.loadMemorandumData = function loadMemorandumData(title) {
    const Memorandum = mongoose.model('Memorandum');

    const filterQuery = {
        body: title
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Memorandum.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep cat data  
 */
MemorandumHelper.insertNewMemorandum = function insertNewMemorandum(data) {

    return new Promise((resolve, reject) => {
        const Memorandum = mongoose.model('Memorandum');
        const Memorandum1 = new Memorandum(data)

        Memorandum1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
MemorandumHelper.updateMemorandumData = function updateMemorandumData(data) {
    return new Promise((resolve, reject) => {
        const Memorandum = mongoose.model('Memorandum');
        Memorandum.findByIdAndUpdate(data._id, data, {
                useFindAndModify: false, new: true
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete dep cat data  
 */
MemorandumHelper.deleteMemorandumData = function deleteMemorandumData(data) {
    return new Promise((resolve, reject) => {
        const Memorandum = mongoose.model('Memorandum');

        Memorandum.findOneAndUpdate(data._id, {
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