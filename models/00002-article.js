'use strict';

/**
 * Article model
 */
function ArticleModel() {}
module.exports = ArticleModel;

/**
 * Setup model
 */
ArticleModel.setup = function setup() {
    const mongoose = require('mongoose');
    const model = ArticleModel.model();
    const schema = new mongoose.Schema(model);

    ArticleModel.plugins(schema);
    ArticleModel.extraFunctions(schema);

    mongoose.model('Article', schema);
};

/**
 * Get model
 */
ArticleModel.model = function model() {
    return {
        'title': {
            type: String,
            required: true
        },
        'article_type': {
            type: String,
            required: true
        },
        'body': {
            type: String
        },
        'is_active': {
            type: Boolean,
            default: false
        },
        'user': {
            type: String
        },
        'slug': {
            type: String,
            required: true
        }
    };
};

/**
 * Setup plugins
 */
ArticleModel.plugins = function plugins(schema) {
    const timestamps = require('mongoose-timestamp');

    schema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};

/**
 * Extra functions, statics and methods
 *
 * @param      {Object}  schema  The schema
 */
ArticleModel.extraFunctions = function extraFunctions(schema) {
    schema.statics.newArticle = ArticleModel.newArticle;
    schema.statics.attempt = ArticleModel.attempt;
}

/**
 * Insert user function
 */
ArticleModel.newArticle = async function newArticle(newArticle) {
    let result = new this(newArticle);

    return result.save();
};

/**
 * Insert user function
 */
ArticleModel.attempt = function attempt(data) {
    return new Promise((resolve, reject) => {
        const user = data.user;

        const condition = {
            'name': user.name,
            'password': user.password
        };

        this.findOne(condition, (err, data) => {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
};

/**
 * Active the user
 */
ArticleModel.active = function active(callback) {
    this.is_active = true;
    this.save();

    callback();
};

/**
 * Deactive the user
 */
ArticleModel.deactive = function deactive(callback) {
    this.is_active = false;
    this.save();

    callback();
};
