'use strict';

const validator = use('core/helpers/data-validator');

/**
 * User Login Validator
 */
function InviteSessionValidator() {}
module.exports = InviteSessionValidator;

InviteSessionValidator.async = true;

/**
 * Validation funciton
 */
InviteSessionValidator.lang = function lang() {
    return 'fa';
};

/**
 * Validation funciton
 */
InviteSessionValidator.validate = function validate(req, res, next) {

    validator.validate(InviteSessionValidator, req, res, next);
};

/**
 * Data function
 */
InviteSessionValidator.data = function data(req) {
    return {
        user_id: req.session.auth.userId,
        title: req.body.title,
        body: req.body.body,
        place: req.body.place,
        agenda: req.body.agenda,
        user_list: req.body.user_list,
        date: req.body.date,
        department_id: req.body.department_id
    };
};

/**
 * Rules function
 */
InviteSessionValidator.rules = function rules(req) {
    return {
        'user_id': 'required',
        'title': 'required',
        'place': 'required',
        'agenda': 'required',
        'body': 'required',
        'user_list': 'required|array',
        'date': 'required',
        'department_id': 'required'
    };
};

/**
 * Messages function
 */
InviteSessionValidator.messages = function messages() {
    return {};
};

/**
 * Return captions
 */
InviteSessionValidator.attributes = function attributes() {
    return {
        user_id: 'userId',
        title: 'title',
        body: 'body',
        agenda: 'agenda',
        place: 'place',
        user_list: 'user_list',
        date: 'date',
        department_id: 'department_id'
    };
};