const Validator = require('validatorjs');

/**********user=> username_available**************** */
Validator.registerAsync('user_name_available', function (username, attribute, req, passes) {

    const Mongoose = require('mongoose');
    const Model = Mongoose.model("User");

    let query = {};

    if (attribute == 'XXX') {
        query = {
            name: username
        };
    } else {
        query = {
            name: username,
            _id: {
                "$ne": attribute
            }
        };
    }

    Model.findOne(query, {
            name: 1
        }, {})
        .then(res => {
            if (res == null) {
                passes();
            } else {
                passes(false, 'Username has already been taken.');
            }
        })
        .catch(err => {
            console.log(err)
            passes(false, 'System Failed');
        });
});

/**********user=> email_available**************** */
Validator.registerAsync('email_available', function (email, attribute, req, passes) {

    const Mongoose = require('mongoose');
    const Model = Mongoose.model("User");

    let query = {};

    if (attribute == "XXX") {
        query = {
            email: email
        };
    } else {
        query = {
            email: email,
            _id: {
                "$ne": attribute
            }
        };
    }

    Model.findOne(query, {
            _id: 0,
            name: 1
        }, {})
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

/**********password available**************** */
Validator.registerAsync('password_available', function (password, attribute, req, passes) {

    if (attribute == "XXX") {
        if (password.length >= 6) {
            passes();
        } else {
            passes(false, 'minimum password lenght bigger than 6');
        }
    } else {
        if (password.length == 0 || password.length >= 6) {
            passes();
        } else {
            passes(false, 'minimum password lenght bigger than 6');
        }
    }
});