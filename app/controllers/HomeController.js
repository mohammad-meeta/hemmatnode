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

/**
 * internal section route
 */
HomeController.InternalSection = async function InternalSection(req, res, next) {
    const pageRoute = PugView.getView('home.internalsection');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * exgternal section route
 */
HomeController.ExternalSection = async function ExternalSection(req, res, next) {
    const pageRoute = PugView.getView('home.externalsection');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * People Participation route
 */
HomeController.PeopleParticipation = async function PeopleParticipation(req, res, next) {
    const pageRoute = PugView.getView('home.peopleparticipation');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * People document route
 */
HomeController.DocumentList = async function DocumentList(req, res, next) {
    const pageRoute = PugView.getView('home.documentlist');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};
/**
 * People event route
 */
HomeController.EventList = async function EventList(req, res, next) {
    const pageRoute = PugView.getView('home.eventlist');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};
/**
 * People MonitoringPage route
 */
HomeController.MonitoringPage = async function MonitoringPage(req, res, next) {
    const pageRoute = PugView.getView('home.monitoringpage');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};