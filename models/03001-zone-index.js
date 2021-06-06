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

    mongoose.model('Zoneindex', schema, "zoneindexs");
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
        'point': {
            type: String,
            required: true
        },
        'source': {
            type: String
        },
        'is_active': {
            type: Boolean,
            default: true,
            required: true
        },
        'references': {
            type: ObjectId,
            required: false
        },
        'department_category_id': {
            type: ObjectId,
            required: false
        },
        'zone_cat': {
            type: ObjectId,
            required: true
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
    schema.statics.newZoneindex = Model.newZoneindex;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newZoneindex = function newZoneindex(newZoneindex) {
    let result = new this(newZoneindex);

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