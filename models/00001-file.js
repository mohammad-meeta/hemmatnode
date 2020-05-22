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
        "fieldname": {
            required: true,
            type: String
        },
        "originalname": {
            required: true,
            type: String
        },
        "encoding": {
            required: true,
            type: String
        },
        "mimetype": {
            required: true,
            type: String
        },
        "destination": {
            required: true,
            type: String
        },
        "filename": {
            required: true,
            type: String
        },
        "path": {
            required: true,
            type: String
        },
        "size": {
            required: true,
            type: Number
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