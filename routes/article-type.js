'use strict';

Router.get('/', 'Home@index')
    .as('home.index');

Router.get('/about', 'Home@about')
    .as('home.about');
