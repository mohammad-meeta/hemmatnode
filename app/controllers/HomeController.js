'use strict';

/**
 * Home controller
 */
function HomeController(){}
module.exports = HomeController;


/**
 * Index route
 */
HomeController.index = function index(req, res, next) {
    res.send('ok index')
        .end();
};
