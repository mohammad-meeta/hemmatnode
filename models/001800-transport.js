'use strict';

const mongoose = require('mongoose');

/**
 * TransportType model
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

    mongoose.model('Transport', schema, 'transports');
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
            required: true
        },
        'date': {
            type: String,
            required: true
        },
        'status': {
            type: Number,
            required: true
        },
        'confirm': {
            type: Boolean,
            required: false,
            default: false
        },
        'is_active': {
            type: Boolean,
            default: true
        },
        'files': {
            type: [File]
        },
        'user_id': {
            type: ObjectId,
            required: true
        },
        'department_id': {
            type: ObjectId,
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
    schema.statics.newTransport = Model.newTransport;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;

};

/**
 * Insert user function
 */
Model.newTransport = async function newTransport(newTransport) {
    let result = new this(newTransport);

    return result.save();
};

/**
 * Enable an health
 */
Model.enable = function enable() {
    this.is_active = true;

    return this.save();
};

/**
 * Disable an health
 */
Model.disable = function disable() {
    this.is_active = false;

    return this.save();
};