
'use strict';

const mongoose = require('mongoose');

/**
 * Article controller
 */
function ArticleHelper() { }
module.exports = ArticleHelper;

/**
 * find all Article data result 
 */
ArticleHelper.loadAllArticleData = function loadAllArticleData(dataPaginate) {
    const page = parseInt(dataPaginate.page)
    const pageSize = parseInt(dataPaginate.pageSize)
    const skip = page > 0 ? ((page - 1) * pageSize) : 0
    const Article = mongoose.model('Article');

    const filterQuery = {};
    const projection = {};

    return new Promise((resolve, reject) => {
        Article.find(filterQuery, projection, { skip: skip, limit: pageSize })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * find Article data result 
 */
ArticleHelper.loadArticleData = function loadArticleData(articleTitle) {
    const Article = mongoose.model('Article');

    const filterQuery = {
        _id: articleTitle
    };
    const projection = {};

    return new Promise((resolve, reject) => {
        Article.findOne(filterQuery, projection, {})
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * insert Article data  
 */
ArticleHelper.insertNewArticle = function insertNewArticle(data) {

    return new Promise((resolve, reject) => {
        const Article = mongoose.model('Article');
        const article = new Article(data)

        article.save()
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * update Article data  
 */
ArticleHelper.updateArticleData = function updateArticleData(data) {
    return new Promise((resolve, reject) => {
        const Article = mongoose.model('Article');
        Article.findByIdAndUpdate(data._id, data, { useFindAndModify: false })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};

/**
 * delete article data  
 */
ArticleHelper.deleteArticle = function deleteArticle(data) {
    return new Promise((resolve, reject) => {
        const Article = mongoose.model('Article');
        Article.findByIdAndUpdate(data._id, { is_active: false }, { useFindAndModify: false , new: true })
            .then(res => {
                resolve(res);
            })
            .catch(err => reject(err));
    });
};