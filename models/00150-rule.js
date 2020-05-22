'use strict';

const mongoose = require('mongoose');

/**
 * ArticleType model
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

    mongoose.model('Rule', schema, 'rules');
};

/**
 * Get model
 */
Model.model = function model() {

    return {
        'method': {
            type: String,
            required: true
        },
        'route_name': {
            type: String,
            required: true
        },
        'function': {
            type: String,
            required: true
        },
        'description': {
            type: String,
            required: true
        },
        'id': {
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