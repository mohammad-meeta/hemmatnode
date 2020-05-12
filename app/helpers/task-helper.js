'use strict';

const mongoose = require('mongoose');

/**
 * task cat controller
 */
function TaskHelper() {}
module.exports = TaskHelper;

/**
 * find all task cat data result 
 */
TaskHelper.loadAllTaskData = function loadAllTaskData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Task = mongoose.model('Task');

    const filterQuery = {};
    const taskion = {};

    return new Promise((resolve, reject) => {
        Task.find(filterQuery, taskion, {
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
 * find all task cat count data result 
 */
TaskHelper.loadAllCountTaskData = function loadAllCountTaskData() {
    const Task = mongoose.model('Task');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Task.countDocuments(filterQuery)
            .then(res => {

                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find task cat data result 
 */
TaskHelper.loadTaskData = function loadTaskData(title) {
    const Task = mongoose.model('Task');

    const filterQuery = {
        title: title
    };

    const taskion = {};

    return new Promise((resolve, reject) => {
        Task.findOne(filterQuery, taskion)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert task cat data  
 */
TaskHelper.insertNewTask = function insertNewTask(data) {

    return new Promise((resolve, reject) => {
        const Task = mongoose.model('Task');
        const Task1 = new Task(data)

        Task1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update task cat data  
 */
TaskHelper.updateTaskData = function updateTaskData(data) {
    return new Promise((resolve, reject) => {
        const Task = mongoose.model('Task');
        Task.findByIdAndUpdate(data._id, data, {
                useFindAndModify: false
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete task cat data  
 */
TaskHelper.deleteTaskData = function deleteTaskData(data) {
    return new Promise((resolve, reject) => {
        const Task = mongoose.model('Task');

        Task.findOneAndUpdate(data._id, {
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