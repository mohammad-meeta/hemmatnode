'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function FileHelper() {}
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