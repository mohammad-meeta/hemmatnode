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

    mongoose.model('File', schema, 'files');
};

/**
 * Get model
 */
Model.model = function model() {
    return {
        'user_id': {
            type: mongoose.Schema.ObjectId,
            required: true
        },
        'file_name': {
            type: String,
            required: true
        },
        'extention': {
            type: String,
            required: true
        },
        'original_file_name': {
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