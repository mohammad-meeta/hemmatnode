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

    mongoose.model('Task', schema, "tasks");
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
        'mandatory_attachment': {
            type: [File]
        },
        'started_at': {
            type: Date,
            required: true
        },

        'finished_at': {
            type: Date,
            required: true
        },
        'done_at': {
            type: Date,
            required: true
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
        'executed_by': {
            type: String,
            required: true
        },
        'confirmed_by': {
            type: String,
            required: true
        },
        'confirmed_at': {
            type: Date,
            required: true
        },
        'weight': {
            type: Number,
            required: true
        },
        'status': {
            type: Number,
            required: true
        },
        'parent_id': {
            type: String,
            required: true
        },
        'parent_type': {
            type: String,
            required: true
        },
        'parent': {
            type: String,
            required: true
        },
        'execution_rank': {
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
    schema.statics.newTask = Model.newTask;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newTask = function newTask(newTask) {
    let result = new this(newTask);

    return result.save();
};

/**
 * Enable the Task
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the Task
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};