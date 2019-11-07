'use strict';

const PugView = use('app', 'helpers', 'pug-view');

/**
 * Home controller
 */
function HomeController() {}
module.exports = HomeController;


/**
 * Index route
 */
HomeController.index = async function index(req, res, next) {
    res.render(PugView.getView('home/index'));
};


/**
 * About route
 */
HomeController.about = async function about(req, res, next) {
    res.render(PugView.getView('home/about'));
};
