'use strict';

/**
 * Home controller
 */
function HomeController() { }
module.exports = HomeController;


/**
 * Index route
 */
HomeController.index = async function index(req, res, next) {
    const mongoose = require('mongoose');
    const User = mongoose.model('User');
    const users = await User.find({});

    res.status(200)
        .send(users)
        .end();
};

/**
 * Insert a new user
 */
HomeController.insert = async function insert(req, res, next) {
    const mongoose = require('mongoose');
    const User = mongoose.model('User');

    let user = new User({
        'name': 'test-user',
        'pwd': '12345',
        'email': 'test-user@server.dev'
    });

    user = await user.save();
    res.status(200)
        .send(user)
        .end();
};
