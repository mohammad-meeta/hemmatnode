'use strict';

const PugView = use('app/helpers/pug-view');

/**
 * Auth controller
 */
function UserController() {}
module.exports = UserController;

/**
 * Index route
 */
UserController.index = async function index(req, res, next) {
    const pageRoute = PugView.getView('user.index');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};
