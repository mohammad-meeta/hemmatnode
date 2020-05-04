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

    mongoose.model('DepartmentRegulation', schema, "department_regulations");
};

/**
 * Get model
 */
Model.model = function model() {
    const FileD = {
        'file_id': {
            type: String
        },
        'deleted_at': {
            type: Date,
            default: null
        }
    };
    return {
        'title': {
            type: String,
            required: true
        },
        'description': {
            type: String
        },
        'files': {
            type: [FileD]
        },
        'department_id': {
            type: String,
            required: true
        },
        'user_id': {
            type: String,
            required: true
        },
        'is_active': {
            type: Boolean,
            default: true,
            required: true
        },
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
    schema.statics.newDepartmentRegulation = Model.newDepartmentRegulation;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newDepartmentRegulation = function newDepartmentRegulation(newDepartmentRegulation) {
    let result = new this(newDepartmentRegulation);

    return result.save();
};

/**
 * Enable the DepartmentRegulation
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the DepartmentRegulation
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};