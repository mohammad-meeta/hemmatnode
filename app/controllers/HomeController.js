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
    const pageRoute = 'home.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * About route
 */
HomeController.about = async function about(req, res, next) {
    const pageRoute = 'home.about';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};