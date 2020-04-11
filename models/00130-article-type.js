'use strict';

const mongoose = require('mongoose');

/**
 * ArticleType model
 */
function Model() { }
module.exports = Model;

/**
 * Setup model
 */
Model.setup = function setup() {
    const model = Model.model();
    const schema = new mongoose.Schema(model);

    Model.plugins(schema);
    Model.extraFunctions(schema);

    mongoose.model('ArticleType', schema, 'article_types');
};

/**
 * Get model
 */
Model.model = function model() {
    return {
        'title': {
            type: String,
            required: true
        },
        'is_active': {
            type: Boolean,
            default: false
        }
    };
};

/**
 * Setup plugins
 */
Model.plugins = function plugins(schema) {
    const timestamps = require('mongoose-timestamp');

    schema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: 'deleted_at'
    });
};

/**
 * Extra functions, statics and methods
 *
 * @param      {Object}  schema  The schema
 */
Model.extraFunctions = function extraFunctions(schema) {
    schema.statics.newArticleType = Model.newArticleType;
    schema.statics.attempt = Model.attempt;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;

};

/**
 * Insert user function
 */
Model.newArticleType = async function newArticleType(newArticleType) {
    let result = new this(newArticleType);

    return result.save();
};

/**
 * Insert user function
 */
Model.attempt = function attempt(data) {
    return new Promise((resolve, reject) => {
        const user = data.user;

        const condition = {
            'name': user.name,
            'password': user.password
        };

        this.findOne(condition, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

/**
 * Enable an article type
 */
Model.enable = function enable() {
    this.is_active = true;

    return this.save();
};

/**
 * Disable an article type
 */
Model.disable = function disable() {
    this.is_active = false;

    return this.save();
};
