'use strict';

const mongoose = require('mongoose');

/**
 * document cat controller
 */
function DocumentHelper() {}
module.exports = DocumentHelper;

/**
 * find all document cat data result 
 */
DocumentHelper.loadAllDocumentData = function loadAllDocumentData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Document = mongoose.model('Document');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Document.find(filterQuery, projection, {
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
 * find all document cat count data result 
 */
DocumentHelper.loadAllDocumentCountData = function loadAllDocumentCountData() {
    const Document = mongoose.model('Document');

    const filterQuery = {};

    return new Promise((resolve, reject) => {
        Document.countDocuments(filterQuery)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find document cat data result 
 */
DocumentHelper.loadDocumentData = function loadDocumentData(title) {
    const Document = mongoose.model('Document');

    const filterQuery = {
        title: title
    };

    const projection = {};

    return new Promise((resolve, reject) => {
        Document.findOne(filterQuery, projection)
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert document cat data  
 */
DocumentHelper.insertNewDocument = function insertNewDocument(data) {

    return new Promise((resolve, reject) => {
        const Document = mongoose.model('Document');
        const Document1 = new Document(data)

        Document1.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update document cat data  
 */
DocumentHelper.updateDocumentData = function updateDocumentData(data) {
    return new Promise((resolve, reject) => {
        const Document = mongoose.model('Document');
        Document.findByIdAndUpdate(data._id, data, {
                useFindAndModify: false
            })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete document cat data  
 */
DocumentHelper.deleteDocumentData = function deleteDocumentData(data) {
    return new Promise((resolve, reject) => {
        const Document = mongoose.model('Document');

        Document.findOneAndUpdate(data._id, {
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