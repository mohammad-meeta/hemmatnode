'use strict';

Router.get('/', 'HomeController@index')
    .as('home.index');

Router.get('/about', 'HomeController@about')
    .as('home.about');

Router.get('/chart', function(req, res, next) {
    const pageRoute = 'home.about';

    res.render('pages/home/chart.pug', {
        req,
        pageRoute
    });
});
