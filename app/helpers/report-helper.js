
'use strict';

const mongoose = require('mongoose');

/**
 * Report controller
 */
function ReportHelper() { }
module.exports = ReportHelper;

/**
 * find all dep cat data result 
 */
ReportHelper.loadAllReportData = async function loadAllReportData(req, dataPaginate, group) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Report = mongoose.model("Report");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                department_id: new ObjectId(group),
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
            $lookup: {
                from: "karnameindexes",
                localField: "index_id",
                foreignField: "_id",
                as: "kindex"
            }
        },
        {
            $unwind: "$kindex"
        },
        // {
        //     $unwind: {
        //         path: "$files",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "files",
        //         localField: "files.file_id",
        //         foreignField: "_id",
        //         as: "ffile"
        //     }
        // },
        // {
        //     $unwind: {
        //         path: "$ffile",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $project: {
        //         "ffile.encoding": 0,
        //         "ffile.mimetype": 0,
        //         "ffile.destination": 0,
        //         "ffile.user_id": 0,
        //         "ffile.path": 0,
        //     }
        // },
        {
            $group: {
                _id: "$_id",
                year: {
                    $last: "$year"
                },
                index_id: {
                    $last: "$index_id"
                },
                value: {
                    $last: "$value"
                },
                // oldFiles: {
                //     $push: "$files"
                // },
                // files: {
                //     $push: "$ffile"
                // },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                },
                kindex: {
                    $last: "$kindex"
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
    let res = await Report.aggregate(pipeline);

    // for (let resI = 0; resI < res.length; resI++) {

    //     let oldFiles = res[resI].oldFiles;
    //     let files = res[resI].files;
    //     let deleted = [];
    //     for (let index = 0; index < files.length; index++) {
    //         const element = files[index];
    //         for (let index2 = 0; index2 < oldFiles.length; index2++) {
    //             const element2 = oldFiles[index2];
    //             if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
    //                 deleted.push(element["_id"])
    //             }
    //         }
    //     }

    //     for (let index3 = 0; index3 < deleted.length; index3++) {
    //         const element = deleted[index3];
    //         const indexF = files.findIndex(x => String(x._id) == String(element));
    //         if (indexF >= -1) {
    //             files.splice(indexF, 1)
    //         }
    //     }
    // }

    // for (let i = 0; i < res.length; i++) {
    //     for (let k = 0; k < res[i].files.length; k++) {
    //         res[i].files[k] = {
    //             "_id": res[i].files[k]._id,
    //             "fieldname": res[i].files[k].fieldname,
    //             "name": res[i].files[k].originalname,
    //             "filename": res[i].files[k].filename,
    //             "size": res[i].files[k].size,
    //         };
    //     }
    // }
    return res;
};
/**
 * find all dep cat data result 
 */
ReportHelper.loadAllReportYearData = async function loadAllReportYearData(req, dataPaginate, group, year) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Report = mongoose.model("Report");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                department_id: new ObjectId(group),
                value: year
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
            $lookup: {
                from: "karnameindexes",
                localField: "index_id",
                foreignField: "_id",
                as: "kindex"
            }
        },
        {
            $unwind: "$kindex"
        },
        // {
        //     $unwind: {
        //         path: "$files",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "files",
        //         localField: "files.file_id",
        //         foreignField: "_id",
        //         as: "ffile"
        //     }
        // },
        // {
        //     $unwind: {
        //         path: "$ffile",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $project: {
        //         "ffile.encoding": 0,
        //         "ffile.mimetype": 0,
        //         "ffile.destination": 0,
        //         "ffile.user_id": 0,
        //         "ffile.path": 0,
        //     }
        // },
        {
            $group: {
                _id: "$_id",
                year: {
                    $last: "$year"
                },
                index_id: {
                    $last: "$index_id"
                },
                value: {
                    $last: "$value"
                },
                // oldFiles: {
                //     $push: "$files"
                // },
                // files: {
                //     $push: "$ffile"
                // },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                },
                kindex: {
                    $last: "$kindex"
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
    let res = await Report.aggregate(pipeline);

    // for (let resI = 0; resI < res.length; resI++) {

    //     let oldFiles = res[resI].oldFiles;
    //     let files = res[resI].files;
    //     let deleted = [];
    //     for (let index = 0; index < files.length; index++) {
    //         const element = files[index];
    //         for (let index2 = 0; index2 < oldFiles.length; index2++) {
    //             const element2 = oldFiles[index2];
    //             if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
    //                 deleted.push(element["_id"])
    //             }
    //         }
    //     }

    //     for (let index3 = 0; index3 < deleted.length; index3++) {
    //         const element = deleted[index3];
    //         const indexF = files.findIndex(x => String(x._id) == String(element));
    //         if (indexF >= -1) {
    //             files.splice(indexF, 1)
    //         }
    //     }
    // }

    // for (let i = 0; i < res.length; i++) {
    //     for (let k = 0; k < res[i].files.length; k++) {
    //         res[i].files[k] = {
    //             "_id": res[i].files[k]._id,
    //             "fieldname": res[i].files[k].fieldname,
    //             "name": res[i].files[k].originalname,
    //             "filename": res[i].files[k].filename,
    //             "size": res[i].files[k].size,
    //         };
    //     }
    // }
    return res;
};
/**
 * group date report 
 */
ReportHelper.loadGroupDate = async function loadGroupDate(req, group) {
    const ObjectId = require("mongoose").Types.ObjectId;
    const Report = mongoose.model("Report");

    const pipeline = [
        {
            $match: {
                department_id: new ObjectId(group),
            }
        },
        {
            $group: {
                _id: "$value"
            }
        },
        {
            $sort: { _id: 1 }
        }
    ];
    let res = await Report.aggregate(pipeline);
    return res;
};
/**
 * find all dep cat count data result 
 */
ReportHelper.loadAllReportCountData = function loadAllReportCountData(group) {
    const Report = mongoose.model('Report');

    const filterQuery = {
        department_id: group
    };

    return new Promise((resolve, reject) => {
        Report.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find data 
 */
ReportHelper.findReportData = function findReportData(year, index, group) {
    const Report = mongoose.model('Report');
    const ObjectId = require("mongoose").Types.ObjectId;

    const filterQuery = {
        year: year,
        index_id: ObjectId(index),
        department_id: ObjectId(group),
    };

    return new Promise((resolve, reject) => {
        Report.findOne(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find all dep cat count data result 
 */
ReportHelper.loadAllReportCountYearData = function loadAllReportCountYearData(group, year) {
    const Report = mongoose.model('Report');

    const filterQuery = {
        department_id: group,
        value: year
    };

    return new Promise((resolve, reject) => {
        Report.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Report data result 
 */
ReportHelper.loadReportData = function loadReportData(id) {
    const Report = mongoose.model('Report');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Report.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Report data  
 */
ReportHelper.insertNewReport = async function insertNewReport(data) {

    const Report = mongoose.model('Report');
    const report = new Report(data)

    let res2 = await report.save();
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
            $lookup: {
                from: "karnameindexes",
                localField: "index_id",
                foreignField: "_id",
                as: "kindex"
            }
        },
        {
            $unwind: "$kindex"
        },

        // {
        //     $unwind: {
        //         path: "$files",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "files",
        //         localField: "files.file_id",
        //         foreignField: "_id",
        //         as: "ffile"
        //     }
        // },
        // {
        //     $unwind: {
        //         path: "$ffile",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $project: {
        //         "ffile.encoding": 0,
        //         "ffile.mimetype": 0,
        //         "ffile.destination": 0,
        //         "ffile.user_id": 0,
        //         "ffile.path": 0,
        //     }
        // },
        {
            $group: {
                _id: "$_id",
                year: {
                    $last: "$year"
                },
                index_id: {
                    $last: "$index_id"
                },
                value: {
                    $last: "$value"
                },
                // oldFiles: {
                //     $push: "$files"
                // },
                // files: {
                //     $push: "$ffile"
                // },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                },
                kindex: {
                    $last: "$kindex"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];

    let res = await Report.aggregate(pipeline);
    // for (let resI = 0; resI < res.length; resI++) {

    //     let oldFiles = res[resI].oldFiles;
    //     let files = res[resI].files;
    //     let deleted = [];
    //     for (let index = 0; index < files.length; index++) {
    //         const element = files[index];
    //         for (let index2 = 0; index2 < oldFiles.length; index2++) {
    //             const element2 = oldFiles[index2];
    //             if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
    //                 deleted.push(element["_id"])
    //             }
    //         }
    //     }

    //     for (let index3 = 0; index3 < deleted.length; index3++) {
    //         const element = deleted[index3];
    //         const indexF = files.findIndex(x => String(x._id) == String(element));
    //         if (indexF >= -1) {
    //             files.splice(indexF, 1)
    //         }
    //     }
    // }

    // for (let i = 0; i < res.length; i++) {
    //     for (let k = 0; k < res[i].files.length; k++) {
    //         res[i].files[k] = {
    //             "_id": res[i].files[k]._id,
    //             "fieldname": res[i].files[k].fieldname,
    //             "name": res[i].files[k].originalname,
    //             "filename": res[i].files[k].filename,
    //             "size": res[i].files[k].size,
    //         };
    //     }
    // }
    return res;
};

/**
 * update Report data  
 */
ReportHelper.updateReportData = async function updateReportData(data) {
    const Report = mongoose.model('Report');
    let res2 = await Report.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

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
            $lookup: {
                from: "karnameindexes",
                localField: "index_id",
                foreignField: "_id",
                as: "kindex"
            }
        },
        {
            $unwind: "$kindex"
        },

        // {
        //     $unwind: {
        //         path: "$files",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $lookup: {
        //         from: "files",
        //         localField: "files.file_id",
        //         foreignField: "_id",
        //         as: "ffile"
        //     }
        // },
        // {
        //     $unwind: {
        //         path: "$ffile",
        //         preserveNullAndEmptyArrays: true
        //     }
        // },
        // {
        //     $project: {
        //         "ffile.encoding": 0,
        //         "ffile.mimetype": 0,
        //         "ffile.destination": 0,
        //         "ffile.user_id": 0,
        //         "ffile.path": 0,
        //     }
        // },
        {
            $group: {
                _id: "$_id",
                year: {
                    $last: "$year"
                },
                index_id: {
                    $last: "$index_id"
                },
                value: {
                    $last: "$value"
                },
                // oldFiles: {
                //     $push: "$files"
                // },
                // files: {
                //     $push: "$ffile"
                // },
                is_active: {
                    $last: "$is_active"
                },
                created_at: {
                    $last: "$created_at"
                },
                dep: {
                    $last: "$dep"
                },
                kindex: {
                    $last: "$kindex"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];

    let res = await Report.aggregate(pipeline);
    // for (let resI = 0; resI < res.length; resI++) {

    //     let oldFiles = res[resI].oldFiles;
    //     let files = res[resI].files;
    //     let deleted = [];
    //     for (let index = 0; index < files.length; index++) {
    //         const element = files[index];
    //         for (let index2 = 0; index2 < oldFiles.length; index2++) {
    //             const element2 = oldFiles[index2];
    //             if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
    //                 deleted.push(element["_id"])
    //             }
    //         }
    //     }

    //     for (let index3 = 0; index3 < deleted.length; index3++) {
    //         const element = deleted[index3];
    //         const indexF = files.findIndex(x => String(x._id) == String(element));
    //         if (indexF >= -1) {
    //             files.splice(indexF, 1)
    //         }
    //     }
    // }

    // for (let i = 0; i < res.length; i++) {
    //     for (let k = 0; k < res[i].files.length; k++) {
    //         res[i].files[k] = {
    //             "_id": res[i].files[k]._id,
    //             "fieldname": res[i].files[k].fieldname,
    //             "name": res[i].files[k].originalname,
    //             "filename": res[i].files[k].filename,
    //             "size": res[i].files[k].size,
    //         };
    //     }
    // }
    return res;
};

/**
 * delete report data  
 */
ReportHelper.deleteReport = function deleteReport(data) {
    return new Promise((resolve, reject) => {
        const Report = mongoose.model('Report');
        Report.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

