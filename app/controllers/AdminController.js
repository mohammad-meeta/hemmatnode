'use strict';

const PugView = use('app/helpers/pug-view');

/**
 * Admin controller
 */
function AdminController() { }
module.exports = AdminController;

/**
 * Index route
 */
AdminController.createPermission = async function createPermission(req, res, next) {
    const pageRoute = PugView.getView('admin.create.permission');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};
