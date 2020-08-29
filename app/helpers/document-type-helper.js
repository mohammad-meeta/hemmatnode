'use strict';

const mongoose = require('mongoose');

/**
 * dep cat controller
 */
function DocumentType() {}
module.exports = DocumentType;

/**
 * find all dep cat data result 
 */
DocumentType.loadAllDocumentTypeData = function loadAllDocumentTypeData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const DocumentType = mongoose.model('DocumentType');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        DocumentType.find(filterQuery, projection, {
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
 * find all dep cat count data result 
 */
DocumentType.loadAllDocumentTypeCountData = function loadAllDocumentTypeCountData() {
    const DocumentType = mongoose.model('DocumentType');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        DocumentType.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find dep cat data result 
 */
DocumentType.loadDocumentTypeData = function loadDocumentTypeData(title) {
    const DocumentType = mongoose.model('DocumentType');

    const filterQuery = {
        title: title
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        DocumentType.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert dep cat data  
 */
DocumentType.insertNewDocumentType = function insertNewDocumentType(data) {

    return new Promise((resolve, reject) => {
        const DocumentType = mongoose.model('DocumentType');
        const DocumentType1 = new DocumentType(data)

        DocumentType1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update dep cat data  
 */
DocumentType.updateDocumentTypeData = function updateDocumentTypeData(data) {
    return new Promise((resolve, reject) => {
        const DocumentType = mongoose.model('DocumentType');
        DocumentType.findByIdAndUpdate(data._id, data, {
                useFindAndModify: false, new: true
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete dep cat data  
 */
DocumentType.deleteDocumentTypeData = function deleteDocumentTypeData(data) {
    return new Promise((resolve, reject) => {
        const DocumentType = mongoose.model('DocumentType');

        DocumentType.findOneAndUpdate(data._id, {
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