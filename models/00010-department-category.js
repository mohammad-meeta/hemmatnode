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

    mongoose.model('DepartmentCategory', schema);
};

/**
 * Get model
 */
Model.model = function model() {
    return {
        'title': {
            type: String,
            required: true,
            trim: true
        },
        'user_id': {
            type: mongoose.Types.ObjectId,
            required: true
        },
        'is_active': {
            type: Boolean,
            default: true
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
    schema.statics.newDepartmentCategory = Model.newDepartmentCategory;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert a new DepartmentCategory
 */
Model.newDepartmentCategory = function newDepartmentCategory(data) {
    let result = new this(data);

    return result.save();
};

/**
 * Edit an existing DepartmentCategory
 */
Model.editDepartmentCategory = function editDepartmentCategory(data) {
    return new Promise((resolve, reject) => {
        this.findById(data._id, (err, doc) => {
            if (err) {
                reject(err);
            } else {
                doc.name = data.name;

                doc.save(err => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(doc);
                    }
                });
            }
        })
    });
};

/**
 * Enable a depeartmentCategory
 */
Model.enable = function enable() {
    this.is_active = true;

    return this.save();
};

/**
 * Disable a depeartmentCategory
 */
Model.disable = function disable() {
    this.is_active = false;

    return this.save();
};