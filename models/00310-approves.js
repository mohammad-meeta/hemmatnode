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

    mongoose.model('Approves', schema, "approves");
};

/**
 * Get model
 */
Model.model = function model() {

    const ObjectId = mongoose.Schema.ObjectId;

    return {
        'title': {
            type: String,
            required: true
        },
        'method': {
            type: String,
            required: true
        },
        'user_follower': {
            type: ObjectId,
            required: true
        },
        'date': {
            type: Date,
            required: true
        },
        'user_id': {
            type: ObjectId,
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
    schema.statics.newApproves = Model.newApproves;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newApproves = function newApproves(newApproves) {
    let result = new this(newApproves);

    return result.save();
};

/**
 * Enable the Approves
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the Approves
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};