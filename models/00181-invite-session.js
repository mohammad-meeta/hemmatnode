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

    mongoose.model('InviteSession', schema, "invite_sessions");
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
        'user_list': {
            type: Array,
            required: true
        },
        'date': {
            type: Date,
            required: true
        },
        'body': {
            type: String
        },
        'agenda': {
            type: String,
            required: true
        },
        'place': {
            type: String,
            required: true
        },
        'files': {
            type: [File]
        },
        'signatured': {
            type: [File]
        },
        'is_active': {
            type: Boolean,
            default: true,
            required: true
        },
        'department_id': {
            type: ObjectId,
            required: true
        },
        'user_id': {
            type: ObjectId,
            required: true
        },
        'other_user': {
            type: Array
        },
        'introduction': {
            type: String,
            required: false
        },
        'approves': {
            type: [ObjectId],
            required: false
        },
        'present_user': {
            type: [ObjectId],
            required: false
        },
        'status': {
            type: Number,
            default: 0
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
    schema.statics.newSession = Model.newSession;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newSession = function newSession(newSession) {
    let result = new this(newSession);

    return result.save();
};

/**
 * Enable the department
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the department
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};