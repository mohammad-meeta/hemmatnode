'use strict';

const mongoose = require('mongoose');
const { profile } = require('winston');

/**
 * dep cat controller
 */
function DepartmentHelper() { }
module.exports = DepartmentHelper;

/**
 * find all dep cat data result 
 */
DepartmentHelper.loadAllDepartmentData = async function loadAllDepartmentData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Department = mongoose.model('Department');

    let pipeline = [
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
                description: {
                    $last: "$description"
                },
                department_category_id: {
                    $last: "$department_category_id"
                },
                references: {
                    $last: "$references"
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
                            "date": { "$last": "$date" },
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
            $match: {
                docs: { $exists: true, $ne: [] }
            }
        },
        {
            $project: {
                _id: 1,
                docs: 1,
                title: 1,
                is_active: 1,
                created_at: 1
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
 * find all dep cat data result 
 */
DepartmentHelper.loadDepartmentUserData = async function loadDepartmentUserData(department_id) {
    const User = mongoose.model('User');
    const ObjectId = require('mongoose').Types.ObjectId;

    const pipeline = [
        {
            "$match": {
                role_group_group: new ObjectId(department_id)
            }
        },
        {
            "$lookup": {
                "from": "files",
                "localField": "profile.image",
                "foreignField": "_id",
                "as": "file"
            }
        }, {
            "$unwind": {
                "path": "$file",
                "preserveNullAndEmptyArrays": true
            }
        }, {
            "$project": {
                "file.encoding": 0,
                "file.mimetype": 0,
                "file.user_id": 0,
            }
        }, {
            "$group": {
                "_id": "$_id",
                "oldFiles": {
                    "$last": "$files"
                },
                "files": {
                    "$push": "$ffile"
                },
                "is_active": {
                    "$last": "$is_active"
                },
                "name": {
                    "$last": "$name"
                },
                "email": {
                    "$last": "$email"
                },
                "profile": {
                    "$last": "$profile"
                },
                "cellphone": {
                    "$last": "$cellphone"
                }
            }
        }
    ];
    let res = await User.aggregate(pipeline);

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

    const Department = mongoose.model('Department');
    const Department1 = new Department(data)

    let res2 = await Department1.save();

    if (null != res2._id) {
        const data2 = {
            title: res2.title,
            group_id: res2._id,
            user_id: res2.user_id
        };

        const DepartmentAccessLink = mongoose.model('DepartmentAccessLink');
        const ObjectId = require("mongoose").Types.ObjectId;

        DepartmentAccessLink.findOneAndUpdate(
            { department_id: ObjectId(res2.references) },
            { $push: { "child": res2._id } },
            { useFindAndModify: false, new: true }
        ).then((ddd) => {
            console.log("OK");
        });
        const Group = mongoose.model('Group');
        const Group1 = new Group(data2)

        let grs = await Group1.save();
    }


    let pipeline = [
        {
            $match: {
                _id: res2._id
            }
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
                description: {
                    $last: "$description"
                },
                department_category_id: {
                    $last: "$department_category_id"
                },
                references: {
                    $last: "$references"
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
                }
            }
        }
    ];
    let res = await Department.aggregate(pipeline);

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
 * update dep cat data  
 */
DepartmentHelper.updateDepartmentData = async function updateDepartmentData(data) {

    const Department = mongoose.model('Department');
    let res2 = await Department.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    const DepartmentAccessLink = mongoose.model('DepartmentAccessLink');
    const ObjectId = require("mongoose").Types.ObjectId;

    DepartmentAccessLink.findOneAndUpdate(
        { department_id: ObjectId(data.oldReferences) },
        { $pull: { 'child': res2._id } },
        { useFindAndModify: false, new: true }
    ).then((ddd) => {
        console.log("OK");
    });

    DepartmentAccessLink.findOneAndUpdate(
        { department_id: ObjectId(data.references) },
        { $push: { 'child': res2._id } },
        { useFindAndModify: false, new: true }
    ).then((ddd) => {
        console.log("OK");
    });

    let pipeline = [
        {
            $match: {
                _id: res2._id
            }
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
                description: {
                    $last: "$description"
                },
                department_category_id: {
                    $last: "$department_category_id"
                },
                references: {
                    $last: "$references"
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
                }
            }
        }
    ];
    let res = await Department.aggregate(pipeline);

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