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