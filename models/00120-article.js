'use strict';

const mongoose = require('mongoose');

/**
 * Article model
 */
function Model() {}
module.exports = Model;

/**
 * Setup model
 */
Model.setup = function setup() {
    const model = Model.model();
    const schema = new mongoose.Schema(model);

    Model.plugins(schema);
    Model.extraFunctions(schema);

    mongoose.model('Article', schema);
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
        'type': {
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
        'files': {
            type: [mongoose.Schema.ObjectId]
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
Model.plugins = function plugins(schema) {
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
Model.extraFunctions = function extraFunctions(schema) {
    schema.statics.newArticle = Model.newArticle;
    schema.statics.attempt = Model.attempt;
}

/**
 * Insert user function
 */
Model.newArticle = async function newArticle(newArticle) {
    let result = new this(newArticle);

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
 * Active the user
 */
Model.active = function active(callback) {
    this.is_active = true;
    this.save();

    callback();
};

/**
 * Deactive the user
 */
Model.deactive = function deactive(callback) {
    this.is_active = false;
    this.save();

    callback();
};