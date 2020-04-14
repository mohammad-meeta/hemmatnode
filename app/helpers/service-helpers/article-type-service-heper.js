const Validator = require('validatorjs');
/**********user=> articletype_title_available**************** */
Validator.registerAsync('articletype_title_available', function (title, attribute, req, passes) {
    const Mongoose = require('mongoose');
    const Model = Mongoose.model("ArticleType");

    Model.findOne({ name: title }, { _id: 0, name: 1 }, {})
        .then(res => {
            if (res == null) {
                passes();
            } else {
                passes(false, 'title has already been taken.');
            }
        })
        .catch(err => {
            passes(false, 'System Failed');
        });
});

/**********user=> email_available**************** */
Validator.registerAsync('user_id_available', function (user_id, attribute, req, passes) {
    const Mongoose = require('mongoose');
    const Model = Mongoose.model("User");

    Model.findOne({ _id: user_id }, { }, {})
        .then(res => {
            if (res == null) {
                passes(false, 'user_id has already been taken.');
            } else {
                passes();
            }
        })
        .catch(err => {
            passes(false, 'System Failed');
        });
});
