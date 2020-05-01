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
        const File = mongoose.model('File');
        const File = new File(data)

        File.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};
/**
 * Insert file function
 */
Model.newFile = function newFile(newFile) {
    let result = new this(newFile);

    return result.save();
};