'use strict';

const mongoose = require('mongoose');

/**
 * SectionType model
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

    mongoose.model('Section', schema, 'sections');
};

/**
 * Get model
 */
Model.model = function model() {
    return {
        'title': {
            type: String,
            required: true
        },
        'is_active': {
            type: Boolean,
            // default: false
        },
        'user_id': {
            type: String,
            // required: true
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
    schema.statics.newSection = Model.newSection;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;

};

/**
 * Insert user function
 */
Model.newSection = async function newSection(newSection) {
    let result = new this(newSection);

    return result.save();
};

/**
 * Enable an section
 */
Model.enable = function enable() {
    this.is_active = true;

    return this.save();
};

/**
 * Disable an section
 */
Model.disable = function disable() {
    this.is_active = false;

    return this.save();
};