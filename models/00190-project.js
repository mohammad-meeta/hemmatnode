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
    Model.extraFunctions(schema);

    mongoose.model('Project', schema, "projects");
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
        'program_id': {
            type: ObjectId,
            required: true
        },
        'target': {
            type: String,
        },
        'same_effects_index': {
            type: String,
        },
        'organ_moderator': {
            type: String,
        },
        'project_moderator': {
            type: String,
        },
        'consoultant': {
            type: String,
        },
        'supervisor': {
            type: String,
        },
        'committee_leadership': {
            type: String,
        },
        'coworker': {
            type: String,
        },
        'description': {
            type: String,
        },
        'intervention_review': {
            type: String,
        },
        'pervious_action_relation': {
            type: String,
        },
        'target_corresponding': {
            type: String,
        },
        'help_ipmrove_index': {
            type: String,
        },
        'final_product': {
            type: String,
        },
        'standards': {
            type: String,
        },
        'other_benefit': {
            type: String,
        },
        'result_apply': {
            type: String,
        },
        'refree': {
            type: String,
        },
        'monitoring_comment': {
            type: String,
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
    schema.statics.newProject = Model.newProject;

    schema.methods.enable = Model.enable;
    schema.methods.disable = Model.disable;
}

/**
 * Insert user function
 */
Model.newProject = function newProject(newProject) {
    let result = new this(newProject);

    return result.save();
};

/**
 * Enable the Project
 */
Model.enable = function enable(callback) {
    this.is_active = true;

    return this.save();
};

/**
 * Disable the Project
 */
Model.disable = function disable(callback) {
    this.is_active = false;

    return this.save();
};