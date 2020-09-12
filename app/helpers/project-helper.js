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
ProjecttHelper.loadAllProjectData = async function loadAllProjectData(dataPaginate, group) {

    const page = parseInt(dataPaginate.page);
    const pageSize = parseInt(dataPaginate.pageSize);
    const skip = page > 0 ? (page - 1) * pageSize : 0;
    const ObjectId = require("mongoose").Types.ObjectId;
    const Project = mongoose.model("Project");

    const userId = req.session.auth.userId;
    const pipeline = [
        {
            $match: {
                organ_modelator: new ObjectId(group),
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
                oldFiles: {
                    $push: "$files"
                },
                files: {
                    $push: "$ffile"
                },
                supply: {
                    $last: "$supply"
                },
                is_active: {
                    $last: "$is_active"
                },
                budget: {
                    $last: "$budget"
                },
                memorandum_id: {
                    $last: "$memorandum_id"
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
                final_product: {
                    $last: "$final_product"
                },
                standards: {
                    $last: "$standards"
                },
                other_benefit: {
                    $last: "$other_benefit"
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
        },
        {
            $skip: skip
        },
        {
            $limit: pageSize
        }
    ];

    let res = await Project.aggregate(pipeline);
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
 * find all project cat count data result 
 */
ProjecttHelper.loadAllCountProjectData = function loadAllCountProjectData(group) {
    const Project = mongoose.model('Project');

    const filterQuery = {
        organ_modelator: group
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
ProjecttHelper.loadProjectData = function loadProjectData(title) {
    const Project = mongoose.model('Project');

    const filterQuery = {
        title: title
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
ProjecttHelper.insertNewProject = function insertNewProject(data) {

    return new Promise((resolve, reject) => {
        const Project = mongoose.model('Project');
        const Project1 = new Project(data)

        Project1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update project cat data  
 */
ProjecttHelper.updateProjectData = function updateProjectData(data) {
    return new Promise((resolve, reject) => {
        const Project = mongoose.model('Project');
        Project.findByIdAndUpdate(data._id, data, {
            useFindAndModify: false, new: true
        })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
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