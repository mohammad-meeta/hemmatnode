'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function TaskValidator() {}
module.exports = TaskValidator;

TaskValidator.async = true;

/**
 * Validation funciton
 */
TaskValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
TaskValidator.validate = function validate(req, res, next) {

    validator.validate(TaskValidator, req, res, next);
};

/**
 * Data function
 */
TaskValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title,
        started_at: req.body.started_at,
        finished_at: req.body.finished_at,
        executed_by: req.body.executed_by,
        weight: req.body.weight,
        status: req.body.status,
        parent_id: req.body.parent_id,
        parent_type: req.body.parent_type,
    };
};

/**
 * Rules function
 */
TaskValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
        'started_at': 'required',
        'finished_at': 'required',
        'executed_by': 'required',
        'weight': 'required',
        'status': 'required',
        'parent_id': 'required',
        'parent_type': 'required',
    };
};

/**
 * Messages function
 */
TaskValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
TaskValidator.attributes = function attributes() {
    return {
        user_id: 'user_id',
        title: 'title',
        started_at: 'started_at',
        finished_at: 'finished_at',
        executed_by: 'executed_by',
        weight: 'weight',
        status: 'status',
        parent_id: 'parent_id',
        parent_type: 'parent_type',
    };
};