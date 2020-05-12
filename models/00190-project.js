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

    mongoose.model('Project', schema, "projects");
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
        'title': {
            type: String,
            required: true
        },
        'description': {
            type: String
        },
        'files': {
            type: [File]
        },
        'is_active': {
            type: Boolean,
            default: true,
            required: true
        },
        'user_id': {
            type: String,
            required: true
        },
        'weight': {
            type: Number,
            required: true
        },
        'parent': {
            type: String
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
    schema.statics.newProject = Model.newProject;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newProject = function newProject(newProject) {
    let result = new this(newProject);

    return result.save();
};

/**
 * Enable the Project
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the Project
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};