'use strict';

const mongoose = require('mongoose');

/**
 * User model
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

    mongoose.model('User', schema, 'users');
};

/**
 * Get model
 */
Model.model = function model() {
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
        },
        'cellphone': {
            type: String,
            required: true
        },
        'is_active': {
            type: Boolean,
            default: false
        },
        'roles': {
            type: Array,
            default: []
        },
        'profile': new mongoose.Schema({
            'first_name': {
                type: String,
                default: null
            },
            'last_name': {
                type: String,
                default: null
            },
            'nation_code': {
                type: String,
                default: null
            }
        })
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
    schema.statics.newUser = Model.newUser;
    schema.statics.attempt = Model.attempt;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newUser = function newUser(newUser) {
    let result = new this(newUser);

    return result.save();
};

/**
 * Insert user function
 */
Model.attempt = function attempt(data) {
    return new Promise((resolve, reject) => {
        const user = data.user;

        const condition = {
            'name': user.name,
            'password': user.password
        };

        this.findOne(condition, (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
};

/**
 * Enable an user
 */
Model.enable = function enable() {
    this.is_active = true;

    return this.save();
};

/**
 * Disable an user
 */
Model.disable = function disable() {
    this.is_active = false;

    return this.save();
};