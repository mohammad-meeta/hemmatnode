'use strict';

const Validator = require('validatorjs');

function ValidationRuleService() { }
module.exports = ValidationRuleService;

/**
 * Boot function
 */
ValidationRuleService.boot = function boot() {
    Validator.registerAsync('username_available', function (username, attribute, req, passes) {
        const Mongoose = require('mongoose');
        const Model = Mongoose.model("User");

        Model.findOne({ name: username }, { _id: 0, name: 1 }, {})
            .then(res => {
                if (res == null) {
                    passes();
                } else {
                    passes(false, 'Username has already been taken.');
                }
            })
            .catch(err => {
                passes(false, 'System Failed');
            });
    });

    Validator.registerAsync('email_available', function (email, attribute, req, passes) {
        const Mongoose = require('mongoose');
        const Model = Mongoose.model("User");

        Model.findOne({ email: email }, { _id: 0, name: 1 }, {})
            .then(res => {
                if (res == null) {
                    passes();
                } else {
                    passes(false, 'Email has already been taken.');
                }
            })
            .catch(err => {
                passes(false, 'System Failed');
            });
    });

};
