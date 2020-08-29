
'use strict';

const mongoose = require('mongoose');

/**
 * ArticleType controller
 */
function ArticleTypeHelper() { }
module.exports = ArticleTypeHelper;

/**
 * find all ArticleType data result 
 */
ArticleTypeHelper.loadAllArticleTypeData = function loadAllArticleTypeData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const ArticleType = mongoose.model('ArticleType');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        ArticleType.find(filterQuery, projection, { skip: skip, limit: pageSize })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find ArticleType data result 
 */
ArticleTypeHelper.loadArticleTypeData = function loadArticleTypeData(articleTypeTitle) {
    const ArticleType = mongoose.model('ArticleType');

    const filterQuery = {
        title: articleTypeTitle
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        ArticleType.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert ArticleType data  
 */
ArticleTypeHelper.insertNewArticleType = function insertNewArticleType(data) {

    return new Promise((resolve, reject) => {
        const ArticleType = mongoose.model('ArticleType');
        const articleType = new ArticleType(data)

        articleType.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update ArticleType data  
 */
ArticleTypeHelper.updateArticleTypeData = function updateArticleTypeData(data) {
    return new Promise((resolve, reject) => {
        const ArticleType = mongoose.model('ArticleType');

        ArticleType.findByIdAndUpdate(data._id, data, { useFindAndModify: false })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete user data  
 */
ArticleTypeHelper.deleteArticleType = function deleteArticleType(data) {
    return new Promise((resolve, reject) => {
        const ArticleType = mongoose.model('ArticleType');

        ArticleType.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false, new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};