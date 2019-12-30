'use strict';

Router.get('/', 'HomeController@index')
    .as('home.index');

Router.get('/about', 'HomeController@about')
    .as('home.about');