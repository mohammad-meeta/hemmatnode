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

    mongoose.model('Result', schema, "results");
};

/**
 * Get model
 */
Model.model = function model() {
    const File = new mongoose.Schema({
        'file_id': {
            type: String,
        },
        'deleted_at': {
            type: Date,
            default: null
        }
    });

    return {
        'result': {
            type: String,
            required: true
        },
        'project_id': {
            type: String,
            required: true
        },
        'standard': {
            type: String,
        },
        'cast': {
            type: Number,
            required: true
        },
        'deadline': {
            type: Date,
            required: true
        },
        'files': {
            type: [File]
        },
        'is_active': {
            type: Boolean,
            default: true,
        },
        'user_id': {
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
    schema.statics.newResult = Model.newResult;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newResult = function newResult(newResult) {
    let result = new this(newResult);

    return result.save();
};

/**
 * Enable the Result
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the Result
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};