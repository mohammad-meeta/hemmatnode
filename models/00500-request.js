'use strict';

const mongoose = require('mongoose');

/**
 * Article model
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

    mongoose.model('Request', schema, "requests");
};

/**
 * Get model
 */
Model.model = function model() {
    const ObjectId = mongoose.Schema.ObjectId;

    const File = new mongoose.Schema({
        'file_id': {
            type: ObjectId,
        },
        'deleted_at': {
            type: Date,
            default: null
        }
    });

    return {
        'title': {
            type: String,
        },
        'description': {
            type: String,
        },
        'department_id': {
            type: ObjectId,
        },
        'files': {
            type: [File]
        },
        'is_active': {
            type: Boolean,
            default: true,
        },
        'request_date': {
            type: Date,
        },
        'deadline': {
            type: Date,
        },
        'user_id': {
            type: ObjectId
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
    schema.statics.newRequest = Model.newRequest;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newRequest = function newRequest(newRequest) {
    let result = new this(newRequest);

    return result.save();
};

/**
 * Enable the Request
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the Request
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};