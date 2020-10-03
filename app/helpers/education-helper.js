
'use strict';

const mongoose = require('mongoose');

/**
 * Education controller
 */
function Education() { }
module.exports = Education;

/**
 * find all dep cat data result 
 */
Education.loadAllEducationData = async function loadAllEducationData(req, dataPaginate, group) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Education = mongoose.model("Education");

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
                from: "programs",
                localField: "program_id",
                foreignField: "_id",
                as: "prog"
            }
        },
        {
            $unwind: "$prog"
        },
        {
            $unwind: {
                path: "$files",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "files.file_id",
                foreignField: "_id",
                as: "ffile"
            }
        },
        {
            $unwind: {
                path: "$ffile",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "ffile.encoding": 0,
                "ffile.mimetype": 0,
                "ffile.destination": 0,
                "ffile.user_id": 0,
                "ffile.path": 0,
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                date: {
                    $last: "$date"
                },
                way_id: {
                    $last: "$way_id"
                },
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
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
                prog: {
                    $last: "$prog"
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
    let res = await Education.aggregate(pipeline);

    for (let resI = 0; resI < res.length; resI++) {

        let oldFiles = res[resI].oldFiles;
        let files = res[resI].files;
        let deleted = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            for (let index2 = 0; index2 < oldFiles.length; index2++) {
                const element2 = oldFiles[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deleted.push(element["_id"])
                }
            }
        }

        for (let index3 = 0; index3 < deleted.length; index3++) {
            const element = deleted[index3];
            const indexF = files.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                files.splice(indexF, 1)
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].files.length; k++) {
            res[i].files[k] = {
                "_id": res[i].files[k]._id,
                "fieldname": res[i].files[k].fieldname,
                "name": res[i].files[k].originalname,
                "filename": res[i].files[k].filename,
                "size": res[i].files[k].size,
            };
        }
    }
    return res;
};
/**
 * find all dep cat data result 
 */
Education.loadAllEducationYearData = async function loadAllEducationYearData(req, dataPaginate, group, year) {
    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Education = mongoose.model("Education");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                department_id: new ObjectId(group),
                date: year
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
                from: "programs",
                localField: "program_id",
                foreignField: "_id",
                as: "prog"
            }
        },
        {
            $unwind: "$prog"
        },
        {
            $unwind: {
                path: "$files",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "files.file_id",
                foreignField: "_id",
                as: "ffile"
            }
        },
        {
            $unwind: {
                path: "$ffile",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "ffile.encoding": 0,
                "ffile.mimetype": 0,
                "ffile.destination": 0,
                "ffile.user_id": 0,
                "ffile.path": 0,
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                date: {
                    $last: "$date"
                },
                way_id: {
                    $last: "$way_id"
                },
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
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
                prog: {
                    $last: "$prog"
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
    let res = await Education.aggregate(pipeline);

    for (let resI = 0; resI < res.length; resI++) {

        let oldFiles = res[resI].oldFiles;
        let files = res[resI].files;
        let deleted = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            for (let index2 = 0; index2 < oldFiles.length; index2++) {
                const element2 = oldFiles[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deleted.push(element["_id"])
                }
            }
        }

        for (let index3 = 0; index3 < deleted.length; index3++) {
            const element = deleted[index3];
            const indexF = files.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                files.splice(indexF, 1)
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].files.length; k++) {
            res[i].files[k] = {
                "_id": res[i].files[k]._id,
                "fieldname": res[i].files[k].fieldname,
                "name": res[i].files[k].originalname,
                "filename": res[i].files[k].filename,
                "size": res[i].files[k].size,
            };
        }
    }
    return res;
};
/**
 * find all dep cat count data result 
 */
Education.loadAllEducationCountData = function loadAllEducationCountData(group) {
    const Education = mongoose.model('Education');

    const filterQuery = {
        department_id: group
    };

    return new Promise((resolve, reject) => {
        Education.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Education data result 
 */
Education.loadEducationData = function loadEducationData(id) {
    const Education = mongoose.model('Education');

    const filterQuery = {
        _id: id
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Education.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Education data  
 */
Education.insertNewEducation = async function insertNewEducation(data) {

    const Education = mongoose.model('Education');
    const actioncreative = new Education(data)

    let res2 = await actioncreative.save();
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
                from: "programs",
                localField: "program_id",
                foreignField: "_id",
                as: "prog"
            }
        },
        {
            $unwind: "$prog"
        },
        {
            $unwind: {
                path: "$files",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "files.file_id",
                foreignField: "_id",
                as: "ffile"
            }
        },
        {
            $unwind: {
                path: "$ffile",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "ffile.encoding": 0,
                "ffile.mimetype": 0,
                "ffile.destination": 0,
                "ffile.user_id": 0,
                "ffile.path": 0,
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                date: {
                    $last: "$date"
                },
                way_id: {
                    $last: "$way_id"
                },
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
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
                prog: {
                    $last: "$prog"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];

    let res = await Education.aggregate(pipeline);
    for (let resI = 0; resI < res.length; resI++) {

        let oldFiles = res[resI].oldFiles;
        let files = res[resI].files;
        let deleted = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            for (let index2 = 0; index2 < oldFiles.length; index2++) {
                const element2 = oldFiles[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deleted.push(element["_id"])
                }
            }
        }

        for (let index3 = 0; index3 < deleted.length; index3++) {
            const element = deleted[index3];
            const indexF = files.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                files.splice(indexF, 1)
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].files.length; k++) {
            res[i].files[k] = {
                "_id": res[i].files[k]._id,
                "fieldname": res[i].files[k].fieldname,
                "name": res[i].files[k].originalname,
                "filename": res[i].files[k].filename,
                "size": res[i].files[k].size,
            };
        }
    }
    return res;
};

/**
 * update Education data  
 */
Education.updateEducationData = async function updateEducationData(data) {
    const Education = mongoose.model('Education');
    let res2 = await Education.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

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
                from: "programs",
                localField: "program_id",
                foreignField: "_id",
                as: "prog"
            }
        },
        {
            $unwind: "$prog"
        },
        {
            $unwind: {
                path: "$files",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $lookup: {
                from: "files",
                localField: "files.file_id",
                foreignField: "_id",
                as: "ffile"
            }
        },
        {
            $unwind: {
                path: "$ffile",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $project: {
                "ffile.encoding": 0,
                "ffile.mimetype": 0,
                "ffile.destination": 0,
                "ffile.user_id": 0,
                "ffile.path": 0,
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                date: {
                    $last: "$date"
                },
                way_id: {
                    $last: "$way_id"
                },
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
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
                prog: {
                    $last: "$prog"
                }
            }
        },
        {
            $sort: {
                created_at: -1
            }
        }
    ];

    let res = await Education.aggregate(pipeline);
    for (let resI = 0; resI < res.length; resI++) {

        let oldFiles = res[resI].oldFiles;
        let files = res[resI].files;
        let deleted = [];
        for (let index = 0; index < files.length; index++) {
            const element = files[index];
            for (let index2 = 0; index2 < oldFiles.length; index2++) {
                const element2 = oldFiles[index2];
                if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                    deleted.push(element["_id"])
                }
            }
        }

        for (let index3 = 0; index3 < deleted.length; index3++) {
            const element = deleted[index3];
            const indexF = files.findIndex(x => String(x._id) == String(element));
            if (indexF >= -1) {
                files.splice(indexF, 1)
            }
        }
    }

    for (let i = 0; i < res.length; i++) {
        for (let k = 0; k < res[i].files.length; k++) {
            res[i].files[k] = {
                "_id": res[i].files[k]._id,
                "fieldname": res[i].files[k].fieldname,
                "name": res[i].files[k].originalname,
                "filename": res[i].files[k].filename,
                "size": res[i].files[k].size,
            };
        }
    }
    return res;
};

/**
 * delete actioncreative data  
 */
Education.deleteEducation = function deleteEducation(data) {
    return new Promise((resolve, reject) => {
        const Education = mongoose.model('Education');
        Education.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

