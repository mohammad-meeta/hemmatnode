'use strict';

/**
 * User model
 */
function UserModel() { }
module.exports = UserModel;

/**
 * Setup model
 */
UserModel.setup = function setup() {
    const mongoose = require('mongoose');
    const model = UserModel.model();
    const schema = new mongoose.Schema(model);

    UserModel.plugins(schema);

    mongoose.model('User', schema);
};

/**
 * Get model
 */
UserModel.model = function model() {
    return {
        'name': {
            type: String,
            required: true,
            trim: true
        },
        'pwd': {
            type: String,
            required: true
        },
        'email': {
            type: String,
            trim: true
        }
    };
};

/**
 * Setup plugins
 */
UserModel.plugins = function plugins(schema) {
    const timestamps = require('mongoose-timestamp');

    schema.plugin(timestamps, {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    });
};
