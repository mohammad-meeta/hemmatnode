'use strict';

const mongoose = require('mongoose');

/**
 * project cat controller
 */
function ProjecttHelper() {}
module.exports = ProjecttHelper;

/**
 * find all project cat data result 
 */
ProjecttHelper.loadAllProjectData = function loadAllProjectData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Project = mongoose.model('Project');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Project.find(filterQuery, projection, {
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
 * find all project cat count data result 
 */
ProjecttHelper.loadAllCountProjectData = function loadAllCountProjectData() {
    const Project = mongoose.model('Project');

    const filterQuery = {};

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
                useFindAndModify: false
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
                useFindAndModify: false
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};