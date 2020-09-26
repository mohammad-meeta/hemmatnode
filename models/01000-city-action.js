'use strict';

const mongoose = require('mongoose');

/**
 * CityactionType model
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

    mongoose.model('Cityaction', schema, 'cityactions');
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
        'description': {
            type: String,
            required: true
        },
        'reason': {
            type: String,
            required: true
        },
        'responsible': {
            type: String,
            required: true
        },
        'is_active': {
            type: Boolean,
            default: true
        },
        'files': {
            type: [File]
        },
        'is_active': {
            type: Boolean,
            default: true,
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
    schema.statics.newCityaction = Model.newCityaction;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;

};

/**
 * Insert user function
 */
Model.newCityaction = async function newCityaction(newCityaction) {
    let result = new this(newCityaction);

    return result.save();
};

/**
 * Enable an actioncreative
 */
Model.enable = function enable() {
    this.is_active = true;

    return this.save();
};

/**
 * Disable an actioncreative
 */
Model.disable = function disable() {
    this.is_active = false;

    return this.save();
};