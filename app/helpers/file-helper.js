'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function FileHelper() { }
module.exports = FileHelper;

/**
 * insert file data  
 */
FileHelper.insertFileData = function insertFileData(data) {
    return new Promise((resolve, reject) => {
        const FileD = mongoose.model('File');

        FileD.insertMany(data)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * find file data  
 */
FileHelper.findFile = function findFile(data) {
    const FileD = mongoose.model('File');
    const ObjectId = require("mongoose").Types.ObjectId;

    const filterQuery = {
        _id: ObjectId(data)
    };

    return new Promise((resolve, reject) => {
        FileD.findOne(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });

};