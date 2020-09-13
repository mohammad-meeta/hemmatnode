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

    mongoose.model('DepartmentAccessLink', schema, "department_access_links");
};

/**
 * Get model
 */
Model.model = function model() {
    const ObjectId = mongoose.Schema.ObjectId;

    return {
        'department_id': {
            type: ObjectId,
            required: true
        },
        'text_link': {
            type: Array
        },
        'access_content_link': {
            type: Array
        },
        'child': {
            type: Array
        }
    };
};