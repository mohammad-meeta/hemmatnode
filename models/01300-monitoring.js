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

    mongoose.model('Monitoring', schema, "monitorings");
};

/**
 * Get model
 */
Model.model = function model() {
    const ObjectId = mongoose.Schema.ObjectId;

    return {
        'date': {
            type: Date,
            required: true
        },
        'value': {
            type: Number,
            required: true
        },
        'is_active': {
            type: Boolean,
            default: true,
            required: true
        },
        'index_id': {
            type: ObjectId,
            required: false
        },
        'user_id': {
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
        updatedAt: 'updated_at'
    });
};

/**
 * Extra functions, statics and methods
 *
 * @param      {Object}  schema  The schema
 */
Model.extraFunctions = function extraFunctions(schema) {
    schema.statics.newMonitoring = Model.newMonitoring;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newMonitoring = function newMonitoring(newMonitoring) {
    let result = new this(newMonitoring);

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