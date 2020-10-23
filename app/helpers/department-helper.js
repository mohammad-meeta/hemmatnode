'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function DepartmentHelper() { }
module.exports = DepartmentHelper;

/**
 * find all dep cat data result 
 */
DepartmentHelper.loadAllDepartmentData = function loadAllDepartmentData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Department = mongoose.model('Department');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Department.find(filterQuery, projection, {
            sort: {
                'created_at': -1
            },
            skip: skip,
            limit: pageSize
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat data result 
 */
DepartmentHelper.loadAllDepartmentDataRN = function loadAllDepartmentDataRN(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Department = mongoose.model('Department');

    const filterQuery = { references: null };
    const projection = { _id: 1, title: 1, references: 1 };

    return new Promise((resolve, reject) => {
        Department.find(filterQuery, projection, {
            sort: {
                'created_at': -1
            },
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result 
 */
DepartmentHelper.loadAllCountDepartmentDataRN = function loadAllCountDepartmentDataRN() {
    const Department = mongoose.model('Department');

    const filterQuery = { references: null };

    return new Promise((resolve, reject) => {
        Department.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find all dep cat data result 
 */
DepartmentHelper.loadAllDepartmentDocumentData = async function loadAllDepartmentDocumentData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Department = mongoose.model('Department');

    const pipeline = [
        {
            $lookup: {
                from: "documents",
                let: { "dep_id": "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr: {
                                $eq: ['$$dep_id', "$department_id"]
                            }
                        }
                    },
                    {
                        $lookup: {
                            from: "files",
                            localField: "files.file_id",
                            foreignField: "_id",
                            as: "resfile"
                        }
                    },
                    {
                        $unwind: {
                            path: "$resfile",
                            preserveNullAndEmptyArrays: true
                        }
                    },
                    {
                        $project: {
                            "resfile.encoding": 0,
                            "resfile.mimetype": 0,
                            "resfile.destination": 0,
                            "resfile.user_id": 0,
                            "resfile.path": 0,
                        }
                    },
                    {
                        "$group":
                        {
                            "_id": "$_id",
                            "resfiles": { "$push": "$resfile" },
                            "oldFiles": { "$last": "$files" },
                            "is_active": { "$last": "$is_active" },
                            "title": { "$last": "$title" },
                            "user_id": { "$last": "$user_id" },
                            "updated_at": { "$last": "$updated_at" },
                            "created_at": { "$last": "$created_at" },
                        }
                    },
                    {
                        $sort: {
                            _id: 1
                        }
                    },
                ],
                "as": "res"
            }
        },
        {
            $group: {
                _id: "$_id",
                docs: {
                    $last: "$res"
                },
                title: {
                    $last: "$title"
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

    let res = await Department.aggregate(pipeline);


    for (let resI = 0; resI < res.length; resI++) {
        /**************************************************** */
        let resulDocs = res[resI].docs || [];
        for (let resultDocsIndex = 0; resultDocsIndex < resulDocs.length; resultDocsIndex++) {

            let resDocsoldFiles = resulDocs[resultDocsIndex].oldFiles || [];
            let resDocsFiles = resulDocs[resultDocsIndex].resfiles || [];
            let ResDocsdeletedFiles = [];
            for (let index = 0; index < resDocsFiles.length; index++) {
                const element = resDocsFiles[index];
                for (let index2resDocsFil = 0; index2resDocsFil < resDocsoldFiles.length; index2resDocsFil++) {
                    const element2 = resDocsoldFiles[index2resDocsFil];
                    if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                        ResDocsdeletedFiles.push(element["_id"])
                    }
                }
            }

            for (let index3resdeletdFile = 0; index3resdeletdFile < ResDocsdeletedFiles.length; index3resdeletdFile++) {
                const element = ResDocsdeletedFiles[index3resdeletdFile];
                const indexF = resDocsFiles.findIndex(x => String(x._id) == String(element));
                if (indexF >= -1) {
                    resDocsFiles.splice(indexF, 1)
                }
            }
        }

        for (let i = 0; i < resulDocs.length; i++) {
            for (let k = 0; k < resulDocs[i].resfiles.length; k++) {
                resulDocs[i].resfiles[k] = {
                    "_id": resulDocs[i].resfiles[k]._id,
                    "fieldname": resulDocs[i].resfiles[k].fieldname,
                    "name": resulDocs[i].resfiles[k].originalname,
                    "filename": resulDocs[i].resfiles[k].filename,
                    "size": resulDocs[i].resfiles[k].size,
                };
            }
        }
        /************************************************ */
    }
    // console.log(JSON.stringify(res, null, 2))
    return res;
};
/**
 * find all references data result 
 */
DepartmentHelper.loadReferencesData = function loadReferencesData(references) {

    const Department = mongoose.model('Department');

    const filterQuery = {
        references: references
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Department.find(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result 
 */
DepartmentHelper.loadAllCountDepartmentData = function loadAllCountDepartmentData() {
    const Department = mongoose.model('Department');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Department.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
DepartmentHelper.loadDepartmentData = function loadDepartmentData(id) {
    const Department = mongoose.model('Department');

    const filterQuery = {
        _id: id
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Department.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep data  
 */
DepartmentHelper.insertNewDepartment = async function insertNewDepartment(data) {

    return new Promise((resolve, reject) => {
        const Department = mongoose.model('Department');
        const Department1 = new Department(data)

        Department1.save()
            .then(res => {
                if (null != res._id) {
                    const data = {
                        title: res.title,
                        group_id: res._id,
                        user_id: res.user_id
                    };

                    const DepartmentAccessLink = mongoose.model('DepartmentAccessLink');
                    const ObjectId = require("mongoose").Types.ObjectId;

                    DepartmentAccessLink.findOneAndUpdate(
                        { department_id: ObjectId(res.references) },
                        { $push: { "child": res._id } },
                        { useFindAndModify: false, new: true }
                    ).then((ddd) => {
                        console.log("OK");
                    });
                    const Group = mongoose.model('Group');
                    const Group1 = new Group(data)

                    Group1.save()
                        .then(res => {
                            resolve(res);
                        })
                        .catch(err => reject(err))
                }
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
DepartmentHelper.updateDepartmentData = function updateDepartmentData(data) {
    return new Promise((resolve, reject) => {
        const Department = mongoose.model('Department');
        Department.findByIdAndUpdate(data._id, data, {
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
DepartmentHelper.deleteDepartmentData = function deleteDepartmentData(data) {
    return new Promise((resolve, reject) => {
        const Department = mongoose.model('Department');

        Department.findOneAndUpdate(data._id, {
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