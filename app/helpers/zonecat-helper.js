'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function ZonecatHelper() { }
module.exports = ZonecatHelper;

/**
 * find all dep cat data result 
 */
ZonecatHelper.loadAllZonecatData = async function loadAllZonecatData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Zonecat = mongoose.model('Zonecat');

    let pipeline = [
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                depcat: {
                    $last: "$depcat"
                },
                weight: {
                    $last: "$weight"
                },
                references: {
                    $last: "$references"
                },
                department_category_id: {
                    $last: "$department_category_id"
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

    let res = await Zonecat.aggregate(pipeline);
    return res;
};
/**
 * find all dep cat data result 
 */
ZonecatHelper.loadAllZonecatDataRN = function loadAllZonecatDataRN(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Zonecat = mongoose.model('Zonecat');

    const filterQuery = { references: null };
    const projection = { _id: 1, title: 1, references: 1 };

    return new Promise((resolve, reject) => {
        Zonecat.find(filterQuery, projection, {
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
ZonecatHelper.loadAllCountZonecatDataRN = function loadAllCountZonecatDataRN() {
    const Zonecat = mongoose.model('Zonecat');

    const filterQuery = { references: null };

    return new Promise((resolve, reject) => {
        Zonecat.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

// /**
//  * find all dep cat data result 
//  */
// ZonecatHelper.loadAllZonecatDocumentData = async function loadAllZonecatDocumentData(dataPaginate) {
//     const page = parseInt(dataPaginate.page)
//     const pageSize = parseInt(dataPaginate.pageSize)
//     const skip = page > 0 ? ((page - 1) * pageSize) : 0
//     const Zonecat = mongoose.model('Zonecat');

//     const pipeline = [
//         {
//             $lookup: {
//                 from: "documents",
//                 let: { "dep_id": "$_id" },
//                 pipeline: [
//                     {
//                         $match:
//                         {
//                             $expr: {
//                                 $eq: ['$$dep_id', "$department_id"]
//                             }
//                         }
//                     },
//                     {
//                         "$group":
//                         {
//                             "_id": "$_id",
//                             "date": { "$last": "$date" },
//                             "resfiles": { "$push": "$resfile" },
//                             "oldFiles": { "$last": "$files" },
//                             "is_active": { "$last": "$is_active" },
//                             "title": { "$last": "$title" },
//                             "user_id": { "$last": "$user_id" },
//                             "updated_at": { "$last": "$updated_at" },
//                             "created_at": { "$last": "$created_at" },
//                         }
//                     },
//                     {
//                         $sort: {
//                             _id: 1
//                         }
//                     },
//                 ],
//                 "as": "res"
//             }
//         },
//         {
//             $group: {
//                 _id: "$_id",
//                 docs: {
//                     $last: "$res"
//                 },
//                 title: {
//                     $last: "$title"
//                 },
//                 is_active: {
//                     $last: "$is_active"
//                 },
//                 created_at: {
//                     $last: "$created_at"
//                 }
//             }
//         },
//         {
//             $match: {
//                 docs: { $exists: true, $ne: [] }
//             }
//         },
//         {
//             $project: {
//                 _id: 1,
//                 docs: 1,
//                 title: 1,
//                 is_active: 1,
//                 created_at: 1
//             }
//         },
//         {
//             $sort: {
//                 created_at: -1
//             }
//         },
//         {
//             $skip: skip
//         },
//         {
//             $limit: pageSize
//         }

//     ];

//     let res = await Zonecat.aggregate(pipeline);


//     for (let resI = 0; resI < res.length; resI++) {
//         /**************************************************** */
//         let resulDocs = res[resI].docs || [];
//         for (let resultDocsIndex = 0; resultDocsIndex < resulDocs.length; resultDocsIndex++) {

//             let resDocsoldFiles = resulDocs[resultDocsIndex].oldFiles || [];
//             let resDocsFiles = resulDocs[resultDocsIndex].resfiles || [];
//             let ResDocsdeletedFiles = [];
//             for (let index = 0; index < resDocsFiles.length; index++) {
//                 const element = resDocsFiles[index];
//                 for (let index2resDocsFil = 0; index2resDocsFil < resDocsoldFiles.length; index2resDocsFil++) {
//                     const element2 = resDocsoldFiles[index2resDocsFil];
//                     if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
//                         ResDocsdeletedFiles.push(element["_id"])
//                     }
//                 }
//             }

//             for (let index3resdeletdFile = 0; index3resdeletdFile < ResDocsdeletedFiles.length; index3resdeletdFile++) {
//                 const element = ResDocsdeletedFiles[index3resdeletdFile];
//                 const indexF = resDocsFiles.findIndex(x => String(x._id) == String(element));
//                 if (indexF >= -1) {
//                     resDocsFiles.splice(indexF, 1)
//                 }
//             }
//         }

//         for (let i = 0; i < resulDocs.length; i++) {
//             for (let k = 0; k < resulDocs[i].resfiles.length; k++) {
//                 resulDocs[i].resfiles[k] = {
//                     "_id": resulDocs[i].resfiles[k]._id,
//                     "fieldname": resulDocs[i].resfiles[k].fieldname,
//                     "name": resulDocs[i].resfiles[k].originalname,
//                     "filename": resulDocs[i].resfiles[k].filename,
//                     "size": resulDocs[i].resfiles[k].size,
//                 };
//             }
//         }
//         /************************************************ */
//     }
//     // console.log(JSON.stringify(res, null, 2))
//     return res;
// };

// /**
//  * find all dep cat data result 
//  */
// ZonecatHelper.loadZonecatUserData = async function loadZonecatUserData(zonecat_id) {
//     const User = mongoose.model('User');
//     const ObjectId = require('mongoose').Types.ObjectId;

//     const pipeline = [
//         {
//             "$match": {
//                 role_group_group: new ObjectId(zonecat_id)
//             }
//         },
//         {
//             "$lookup": {
//                 "from": "files",
//                 "localField": "profile.image",
//                 "foreignField": "_id",
//                 "as": "file"
//             }
//         }, {
//             "$unwind": {
//                 "path": "$file",
//                 "preserveNullAndEmptyArrays": true
//             }
//         }, {
//             "$project": {
//                 "file.encoding": 0,
//                 "file.mimetype": 0,
//                 "file.user_id": 0,
//             }
//         }, {
//             "$group": {
//                 "_id": "$_id",
//                 "oldFiles": {
//                     "$last": "$files"
//                 },
//                 "files": {
//                     "$push": "$ffile"
//                 },
//                 "is_active": {
//                     "$last": "$is_active"
//                 },
//                 "name": {
//                     "$last": "$name"
//                 },
//                 "email": {
//                     "$last": "$email"
//                 },
//                 "profile": {
//                     "$last": "$profile"
//                 },
//                 "cellphone": {
//                     "$last": "$cellphone"
//                 }
//             }
//         }
//     ];
//     let res = await User.aggregate(pipeline);

//     for (let resI = 0; resI < res.length; resI++) {

//         let oldFiles = res[resI].oldFiles;
//         let files = res[resI].files;
//         let deleted = [];
//         for (let index = 0; index < files.length; index++) {
//             const element = files[index];
//             for (let index2 = 0; index2 < oldFiles.length; index2++) {
//                 const element2 = oldFiles[index2];
//                 if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
//                     deleted.push(element["_id"])
//                 }
//             }
//         }

//         for (let index3 = 0; index3 < deleted.length; index3++) {
//             const element = deleted[index3];
//             const indexF = files.findIndex(x => String(x._id) == String(element));
//             if (indexF >= -1) {
//                 files.splice(indexF, 1)
//             }
//         }
//     }

//     for (let i = 0; i < res.length; i++) {
//         for (let k = 0; k < res[i].files.length; k++) {
//             res[i].files[k] = {
//                 "_id": res[i].files[k]._id,
//                 "fieldname": res[i].files[k].fieldname,
//                 "name": res[i].files[k].originalname,
//                 "filename": res[i].files[k].filename,
//                 "size": res[i].files[k].size,
//             };
//         }
//     }
//     return res;
// };

/**
 * find all references data result 
 */
ZonecatHelper.loadReferencesData = function loadReferencesData(references) {

    const Zonecat = mongoose.model('Zonecat');
    const ObjectId = require('mongoose').Types.ObjectId;

    const filterQuery = {
        references: ObjectId(references)
    };
    console.log(filterQuery)

    const projection = {};

    return new Promise((resolve, reject) => {
        Zonecat.find(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find all dep cat count data result 
 */
ZonecatHelper.loadAllCountZonecatData = function loadAllCountZonecatData() {
    const Zonecat = mongoose.model('Zonecat');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Zonecat.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
ZonecatHelper.loadZonecatData = function loadZonecatData(id) {
    const Zonecat = mongoose.model('Zonecat');

    const filterQuery = {
        _id: id
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Zonecat.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep data  
 */
ZonecatHelper.insertNewZonecat = async function insertNewZonecat(data) {

    const Zonecat = mongoose.model('Zonecat');
    const Zonecat1 = new Zonecat(data)

    let res2 = await Zonecat1.save();

    let pipeline = [
        {
            $match: {
                _id: res2._id
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                depcat: {
                    $last: "$depcat"
                },
                weight: {
                    $last: "$weight"
                },
                references: {
                    $last: "$references"
                },
                department_category_id: {
                    $last: "$department_category_id"
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
    let res = await Zonecat.aggregate(pipeline);

    return res;

};

/**
 * update dep cat data  
 */
ZonecatHelper.updateZonecatData = async function updateZonecatData(data) {

    const Zonecat = mongoose.model('Zonecat');
    let res2 = await Zonecat.findByIdAndUpdate(data._id, data, { useFindAndModify: false, new: true });

    let pipeline = [
        {
            $match: {
                _id: res2._id
            }
        },
        {
            $group: {
                _id: "$_id",
                title: {
                    $last: "$title"
                },
                depcat: {
                    $last: "$depcat"
                },
                weight: {
                    $last: "$weight"
                },
                references: {
                    $last: "$references"
                },
                department_category_id: {
                    $last: "$department_category_id"
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
    let res = await Zonecat.aggregate(pipeline);

    return res;
};

/**
 * delete dep cat data  
 */
ZonecatHelper.deleteZonecatData = function deleteZonecatData(data) {
    return new Promise((resolve, reject) => {
        const Zonecat = mongoose.model('Zonecat');

        Zonecat.findOneAndUpdate(data._id, {
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