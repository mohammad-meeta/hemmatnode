'use strict';

const {
    checkSession
} = use('app/helpers/auth-helper');

Router.get('/', [
        checkSession,
        'Home@index'
    ])
    .as('home.index');

Router.get('/about', [
        checkSession,
        'Home@about'
    ])
    .as('home.about');

Router.get('/internal-section', [
        checkSession,
        'Home@InternalSection'
    ])
    .as('home.internalsection');

Router.get('/people-participation', [
        checkSession,
        'Home@PeopleParticipation'
    ])
    .as('home.peopleparticipation');

Router.get('/external-section', [
        checkSession,
        'Home@ExternalSection'
    ])
    .as('home.externalsection');

Router.get('/document-list', [
        checkSession,
        'Home@DocumentList'
    ])
    .as('home.documentlist');

Router.get('/event-list', [
        checkSession,
        'Home@EventList'
    ])
    .as('home.eventlist');

Router.get('/monitoring-page', [
        checkSession,
        'Home@MonitoringPage'
    ])
    .as('home.monitoringpage');
