'use strict';

const glob = require('glob');

/**
 * Directory Helper
 */
function DirectoryHelper() {}
module.exports = DirectoryHelper;

/**
 * Get Directories
 */
DirectoryHelper.getDirectories = function getDirectories(basePath, filter, itemCallback) {
    return new Promise((resolve, reject) => {
        glob(basePath + filter, function (err, files) {
            if (err) {
                reject(err);
            } else {
                if (null != itemCallback) {
                    files.forEach(itemCallback);
                }

                resolve(files);
            }
        });
    });
};
