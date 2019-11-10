'use strict';

const PugView = use('app', 'helpers', 'pug-view');

/**
 * Home controller
 */
function UserController() {}
module.exports = UserController;


/**
 * Index route
 */
UserController.index = async function index(req, res, next) {
    res.render(PugView.getView('user/index'));
};
