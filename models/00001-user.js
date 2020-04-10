'use strict';

const mongoose = require('mongoose');

/**
 * User model
 */
function UserModel() {}
module.exports = UserModel;

/**
 * Setup model
 */
UserModel.setup = function setup() {
    const model = UserModel.model();
    const schema = new mongoose.Schema(model);

    UserModel.plugins(schema);
    UserModel.extraFunctions(schema);

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
        },
        'is_active': {
            type: Boolean,
            default: false
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
UserModel.plugins = function plugins(schema) {
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
UserModel.extraFunctions = function extraFunctions(schema) {
    schema.statics.newUser = UserModel.newUser;
    schema.statics.attempt = UserModel.attempt;
}

/**
 * Insert user function
 */
UserModel.newUser = async function newUser(newUser) {
    let result = new this(newUser);

    return result.save();
};

/**
 * Insert user function
 */
UserModel.attempt = function attempt(data) {
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
 * Active the user
 */
UserModel.active = function active(callback) {
    this.is_active = true;
    this.save();

    callback();
};

/**
 * Deactive the user
 */
UserModel.deactive = function deactive(callback) {
    this.is_active = false;
    this.save();

    callback();
};
