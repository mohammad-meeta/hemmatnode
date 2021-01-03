'use strict';

const mongoose = require('mongoose');

/**
 * project cat controller
 */
function ProjecttHelper() { }
module.exports = ProjecttHelper;

/**
 * find all project cat data result 
 */
ProjecttHelper.loadAllProjectData = async function loadAllProjectData(req, dataPaginate, group, type) {

    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Project = mongoose.model("Project");
    let pipeline = [];
    if (type != "all") {
        pipeline = [
            {
                $match: {
                    department_id: new ObjectId(group),
                    type: type,
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
                "$unwind": {
                    "path": "$dep",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $lookup: {
                    from: "memorandum",
                    localField: "memorandum_id",
                    foreignField: "_id",
                    as: "mem"
                }
            },
            {
                "$unwind": {
                    "path": "$mem",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $lookup: {
                    from: "programs",
                    localField: "program_id",
                    foreignField: "_id",
                    as: "prg"
                }
            },
            {
                "$unwind": {
                    "path": "$prg",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $lookup: {
                    from: "results",
                    let: { "proje_id": "$_id" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr: {
                                    $eq: ['$$proje_id', "$project_id"]
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
                                "result": { "$last": "$result" },
                                "standard": { "$last": "$standard" },
                                "cast": { "$last": "$cast" },
                                "deadline": { "$last": "$deadline" },
                                "project_id": { "$last": "$project_id" },
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
                    oldFiles: {
                        $push: "$files"
                    },
                    files: {
                        $push: "$ffile"
                    },
                    results: {
                        $last: "$res"
                    },
                    mem: {
                        $last: "$mem"
                    },
                    dep: {
                        $last: "$dep"
                    },
                    prg: {
                        $last: "$prg"
                    },
                    title: {
                        $last: "$title"
                    },
                    budget: {
                        $last: "$budget"
                    },
                    memorandum_id: {
                        $last: "$memorandum_id"
                    },
                    program_id: {
                        $last: "$program_id"
                    },
                    department_id: {
                        $last: "$department_id"
                    },
                    target: {
                        $last: "$target"
                    },
                    same_effects_index: {
                        $last: "$same_effects_index"
                    },
                    organ_moderator: {
                        $last: "$organ_moderator"
                    },
                    project_moderator: {
                        $last: "$project_moderator"
                    },
                    consoultant: {
                        $last: "$consoultant"
                    },
                    supervisor: {
                        $last: "$supervisor"
                    },
                    committee_leadership: {
                        $last: "$committee_leadership"
                    },
                    coworker: {
                        $last: "$coworker"
                    },
                    description: {
                        $last: "$description"
                    },
                    intervention_review: {
                        $last: "$intervention_review"
                    },
                    pervious_action_relation: {
                        $last: "$pervious_action_relation"
                    },
                    target_corresponding: {
                        $last: "$target_corresponding"
                    },
                    help_ipmrove_index: {
                        $last: "$help_ipmrove_index"
                    },
                    other_benefit: {
                        $last: "$other_benefit"
                    },
                    final_product: {
                        $last: "$final_product"
                    },
                    standards: {
                        $last: "$standards"
                    },
                    result_apply: {
                        $last: "$result_apply"
                    },
                    refree: {
                        $last: "$refree"
                    },
                    monitoring_comment: {
                        $last: "$monitoring_comment"
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
    } else {
        pipeline = [
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
                "$unwind": {
                    "path": "$dep",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $lookup: {
                    from: "memorandum",
                    localField: "memorandum_id",
                    foreignField: "_id",
                    as: "mem"
                }
            },
            {
                "$unwind": {
                    "path": "$mem",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $lookup: {
                    from: "programs",
                    localField: "program_id",
                    foreignField: "_id",
                    as: "prg"
                }
            },
            {
                "$unwind": {
                    "path": "$prg",
                    "preserveNullAndEmptyArrays": true
                }
            },
            {
                $lookup: {
                    from: "results",
                    let: { "proje_id": "$_id" },
                    pipeline: [
                        {
                            $match:
                            {
                                $expr: {
                                    $eq: ['$$proje_id', "$project_id"]
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
                                "result": { "$last": "$result" },
                                "standard": { "$last": "$standard" },
                                "cast": { "$last": "$cast" },
                                "deadline": { "$last": "$deadline" },
                                "project_id": { "$last": "$project_id" },
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
                    oldFiles: {
                        $push: "$files"
                    },
                    files: {
                        $push: "$ffile"
                    },
                    results: {
                        $last: "$res"
                    },
                    mem: {
                        $last: "$mem"
                    },
                    dep: {
                        $last: "$dep"
                    },
                    prg: {
                        $last: "$prg"
                    },
                    title: {
                        $last: "$title"
                    },
                    budget: {
                        $last: "$budget"
                    },
                    memorandum_id: {
                        $last: "$memorandum_id"
                    },
                    program_id: {
                        $last: "$program_id"
                    },
                    department_id: {
                        $last: "$department_id"
                    },
                    target: {
                        $last: "$target"
                    },
                    same_effects_index: {
                        $last: "$same_effects_index"
                    },
                    organ_moderator: {
                        $last: "$organ_moderator"
                    },
                    project_moderator: {
                        $last: "$project_moderator"
                    },
                    consoultant: {
                        $last: "$consoultant"
                    },
                    supervisor: {
                        $last: "$supervisor"
                    },
                    committee_leadership: {
                        $last: "$committee_leadership"
                    },
                    coworker: {
                        $last: "$coworker"
                    },
                    description: {
                        $last: "$description"
                    },
                    intervention_review: {
                        $last: "$intervention_review"
                    },
                    pervious_action_relation: {
                        $last: "$pervious_action_relation"
                    },
                    target_corresponding: {
                        $last: "$target_corresponding"
                    },
                    help_ipmrove_index: {
                        $last: "$help_ipmrove_index"
                    },
                    other_benefit: {
                        $last: "$other_benefit"
                    },
                    final_product: {
                        $last: "$final_product"
                    },
                    standards: {
                        $last: "$standards"
                    },
                    result_apply: {
                        $last: "$result_apply"
                    },
                    refree: {
                        $last: "$refree"
                    },
                    monitoring_comment: {
                        $last: "$monitoring_comment"
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
    }
    let res = await Project.aggregate(pipeline);
    for (let resI = 0; resI < res.length; resI++) {



        /**************************************************** */
        let resulPrj = res[resI].results || [];
        for (let resultPrjIndex = 0; resultPrjIndex < resulPrj.length; resultPrjIndex++) {

            let resPrjoldFiles = resulPrj[resultPrjIndex].oldFiles || [];
            let resPrjFiles = resulPrj[resultPrjIndex].resfiles || [];
            let ResPrjdeletedFiles = [];
            for (let index = 0; index < resPrjFiles.length; index++) {
                const element = resPrjFiles[index];
                for (let index2resPrjFil = 0; index2resPrjFil < resPrjoldFiles.length; index2resPrjFil++) {
                    const element2 = resPrjoldFiles[index2resPrjFil];
                    if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                        ResPrjdeletedFiles.push(element["_id"])
                    }
                }
            }

            for (let index3resdeletdFile = 0; index3resdeletdFile < ResPrjdeletedFiles.length; index3resdeletdFile++) {
                const element = ResPrjdeletedFiles[index3resdeletdFile];
                const indexF = resPrjFiles.findIndex(x => String(x._id) == String(element));
                if (indexF >= -1) {
                    resPrjFiles.splice(indexF, 1)
                }
            }
        }

        for (let i = 0; i < resulPrj.length; i++) {
            for (let k = 0; k < resulPrj[i].resfiles.length; k++) {
                resulPrj[i].resfiles[k] = {
                    "_id": resulPrj[i].resfiles[k]._id,
                    "fieldname": resulPrj[i].resfiles[k].fieldname,
                    "name": resulPrj[i].resfiles[k].originalname,
                    "filename": resulPrj[i].resfiles[k].filename,
                    "size": resulPrj[i].resfiles[k].size,
                };
            }
        }
        /************************************************ */


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
    // console.log(JSON.stringify(res, null, 2))
    return res;

};
/**
 * find all project cat count data result 
 */
ProjecttHelper.loadAllCountProjectData = function loadAllCountProjectData(group, type) {
    const Project = mongoose.model('Project');

    const filterQuery = {
        department_id: group,
        type: type
    };

    return new Promise((resolve, reject) => {
        Project.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find project cat data result 
 */
ProjecttHelper.loadProjectData = function loadProjectData(id) {
    const Project = mongoose.model('Project');

    const filterQuery = {
        _id: id
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Project.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert project cat data  
 */
ProjecttHelper.insertNewProject = async function insertNewProject(data) {

    const Project = mongoose.model('Project');
    const Project1 = new Project(data)

    let res2 = Project1.save();

    // const pipeline = [
    //     {
    //         $match: {
    //             _id: res2._id
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "departments",
    //             localField: "department_id",
    //             foreignField: "_id",
    //             as: "dep"
    //         }
    //     },
    //     {
    //         "$unwind": {
    //             "path": "$dep",
    //             "preserveNullAndEmptyArrays": true
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "memorandum",
    //             localField: "memorandum_id",
    //             foreignField: "_id",
    //             as: "mem"
    //         }
    //     },
    //     {
    //         "$unwind": {
    //             "path": "$mem",
    //             "preserveNullAndEmptyArrays": true
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "programs",
    //             localField: "program_id",
    //             foreignField: "_id",
    //             as: "prg"
    //         }
    //     },
    //     {
    //         "$unwind": {
    //             "path": "$prg",
    //             "preserveNullAndEmptyArrays": true
    //         }
    //     },
    //     {
    //         $unwind: {
    //             path: "$files",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: "files",
    //             localField: "files.file_id",
    //             foreignField: "_id",
    //             as: "ffile"
    //         }
    //     },
    //     {
    //         $unwind: {
    //             path: "$ffile",
    //             preserveNullAndEmptyArrays: true
    //         }
    //     },
    //     {
    //         $project: {
    //             "ffile.encoding": 0,
    //             "ffile.mimetype": 0,
    //             "ffile.destination": 0,
    //             "ffile.user_id": 0,
    //             "ffile.path": 0,
    //         }
    //     },
    //     {
    //         $group: {
    //             _id: "$_id",
    //             oldFiles: {
    //                 $push: "$files"
    //             },
    //             files: {
    //                 $push: "$ffile"
    //             },
    //             mem: {
    //                 $last: "$mem"
    //             },
    //             dep: {
    //                 $last: "$dep"
    //             },
    //             prg: {
    //                 $last: "$prg"
    //             },
    //             title: {
    //                 $last: "$title"
    //             },
    //             budget: {
    //                 $last: "$budget"
    //             },
    //             memorandum_id: {
    //                 $last: "$memorandum_id"
    //             },
    //             program_id: {
    //                 $last: "$program_id"
    //             },
    //             department_id: {
    //                 $last: "$department_id"
    //             },
    //             target: {
    //                 $last: "$target"
    //             },
    //             same_effects_index: {
    //                 $last: "$same_effects_index"
    //             },
    //             organ_moderator: {
    //                 $last: "$organ_moderator"
    //             },
    //             project_moderator: {
    //                 $last: "$project_moderator"
    //             },
    //             consoultant: {
    //                 $last: "$consoultant"
    //             },
    //             supervisor: {
    //                 $last: "$supervisor"
    //             },
    //             committee_leadership: {
    //                 $last: "$committee_leadership"
    //             },
    //             coworker: {
    //                 $last: "$coworker"
    //             },
    //             description: {
    //                 $last: "$description"
    //             },
    //             intervention_review: {
    //                 $last: "$intervention_review"
    //             },
    //             pervious_action_relation: {
    //                 $last: "$pervious_action_relation"
    //             },
    //             target_corresponding: {
    //                 $last: "$target_corresponding"
    //             },
    //             help_ipmrove_index: {
    //                 $last: "$help_ipmrove_index"
    //             },
    //             other_benefit: {
    //                 $last: "$other_benefit"
    //             },
    //             final_product: {
    //                 $last: "$final_product"
    //             },
    //             standards: {
    //                 $last: "$standards"
    //             },
    //             result_apply: {
    //                 $last: "$result_apply"
    //             },
    //             refree: {
    //                 $last: "$refree"
    //             },
    //             monitoring_comment: {
    //                 $last: "$monitoring_comment"
    //             },
    //             is_active: {
    //                 $last: "$is_active"
    //             },
    //             created_at: {
    //                 $last: "$created_at"
    //             }
    //         }
    //     }
    // ];
    // let res = await Project.aggregate(pipeline);
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
    return res2;
};

/**
 * update project cat data  
 */
ProjecttHelper.updateProjectData = async function updateProjectData(data) {
    const Project = mongoose.model('Project');
    let res2 = await Project.findByIdAndUpdate(data._id, data, {
        useFindAndModify: false, new: true
    });
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
            "$unwind": {
                "path": "$dep",
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            $lookup: {
                from: "memorandum",
                localField: "memorandum_id",
                foreignField: "_id",
                as: "mem"
            }
        },
        {
            "$unwind": {
                "path": "$mem",
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            $lookup: {
                from: "programs",
                localField: "program_id",
                foreignField: "_id",
                as: "prg"
            }
        },
        {
            "$unwind": {
                "path": "$prg",
                "preserveNullAndEmptyArrays": true
            }
        },
        {
            $lookup: {
                from: "results",
                let: { "proje_id": "$_id" },
                pipeline: [
                    {
                        $match:
                        {
                            $expr: {
                                $eq: ['$$proje_id', "$project_id"]
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
                            "result": { "$last": "$result" },
                            "standard": { "$last": "$standard" },
                            "cast": { "$last": "$cast" },
                            "deadline": { "$last": "$deadline" },
                            "project_id": { "$last": "$project_id" },
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
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                results: {
                    $last: "$res"
                },
                mem: {
                    $last: "$mem"
                },
                dep: {
                    $last: "$dep"
                },
                prg: {
                    $last: "$prg"
                },
                title: {
                    $last: "$title"
                },
                budget: {
                    $last: "$budget"
                },
                memorandum_id: {
                    $last: "$memorandum_id"
                },
                program_id: {
                    $last: "$program_id"
                },
                department_id: {
                    $last: "$department_id"
                },
                target: {
                    $last: "$target"
                },
                same_effects_index: {
                    $last: "$same_effects_index"
                },
                organ_moderator: {
                    $last: "$organ_moderator"
                },
                project_moderator: {
                    $last: "$project_moderator"
                },
                consoultant: {
                    $last: "$consoultant"
                },
                supervisor: {
                    $last: "$supervisor"
                },
                committee_leadership: {
                    $last: "$committee_leadership"
                },
                coworker: {
                    $last: "$coworker"
                },
                description: {
                    $last: "$description"
                },
                intervention_review: {
                    $last: "$intervention_review"
                },
                pervious_action_relation: {
                    $last: "$pervious_action_relation"
                },
                target_corresponding: {
                    $last: "$target_corresponding"
                },
                help_ipmrove_index: {
                    $last: "$help_ipmrove_index"
                },
                other_benefit: {
                    $last: "$other_benefit"
                },
                final_product: {
                    $last: "$final_product"
                },
                standards: {
                    $last: "$standards"
                },
                result_apply: {
                    $last: "$result_apply"
                },
                refree: {
                    $last: "$refree"
                },
                monitoring_comment: {
                    $last: "$monitoring_comment"
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

    let res = await Project.aggregate(pipeline);
    for (let resI = 0; resI < res.length; resI++) {


        let resulPrj = res[resI].results || [];
        for (let resultPrjIndex = 0; resultPrjIndex < resulPrj.length; resultPrjIndex++) {

            let resPrjoldFiles = resulPrj[resultPrjIndex].oldFiles || [];
            let resPrjFiles = resulPrj[resultPrjIndex].resfiles || [];
            let ResPrjdeletedFiles = [];
            for (let index = 0; index < resPrjFiles.length; index++) {
                const element = resPrjFiles[index];
                for (let index2resPrjFil = 0; index2resPrjFil < resPrjoldFiles.length; index2resPrjFil++) {
                    const element2 = resPrjoldFiles[index2resPrjFil];
                    if (String(element["_id"]) == String(element2["file_id"]) && element2["deleted_at"] != null) {
                        ResPrjdeletedFiles.push(element["_id"])
                    }
                }
            }

            for (let index3resdeletdFile = 0; index3resdeletdFile < ResPrjdeletedFiles.length; index3resdeletdFile++) {
                const element = ResPrjdeletedFiles[index3resdeletdFile];
                const indexF = resPrjFiles.findIndex(x => String(x._id) == String(element));
                if (indexF >= -1) {
                    resPrjFiles.splice(indexF, 1)
                }
            }
        }

        for (let i = 0; i < resulPrj.length; i++) {
            for (let k = 0; k < resulPrj[i].resfiles.length; k++) {
                resulPrj[i].resfiles[k] = {
                    "_id": resulPrj[i].resfiles[k]._id,
                    "fieldname": resulPrj[i].resfiles[k].fieldname,
                    "name": resulPrj[i].resfiles[k].originalname,
                    "filename": resulPrj[i].resfiles[k].filename,
                    "size": resulPrj[i].resfiles[k].size,
                };
            }
        }



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
    // console.log(JSON.stringify(res[0], null, 2))
    return res[0];
};

/**
 * delete project cat data  
 */
ProjecttHelper.deleteProjectData = function deleteProjectData(data) {
    return new Promise((resolve, reject) => {
        const Project = mongoose.model('Project');

        Project.findOneAndUpdate(data._id, {
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