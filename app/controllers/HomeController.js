'use strict';

const PugView = use('app/helpers/pug-view');

/**
 * Home controller
 */
function HomeController() {}
module.exports = HomeController;

/**
 * Index route
 */
HomeController.index = async function index(req, res, next) {
    const pageRoute = PugView.getView('home.index');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * About route
 */
HomeController.about = async function about(req, res, next) {
    const pageRoute = PugView.getView('home.about');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};
