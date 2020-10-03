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

    mongoose.model('Way', schema, "ways");
};

/**
 * Get model
 */
Model.model = function model() {
    return {
        'name': {
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
    schema.statics.newWay = Model.newWay;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newWay = function newWay(newWay) {
    let result = new this(newWay);

    return result.save();
};

/**
 * Enable the Way
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the Way
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};