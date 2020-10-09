'use strict';

const PugView = use('app/helpers/pug-view');

/**
 * Dashboard controller
 */
function DashboardController() { }
module.exports = DashboardController;

/**
 * Index route
 */
DashboardController.index = async function index(req, res, next) {
    const pageRoute = PugView.getView('dashboard.index');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};
