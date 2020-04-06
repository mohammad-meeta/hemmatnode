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
    const pageRoute = 'user.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
