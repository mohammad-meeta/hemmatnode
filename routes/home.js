'use strict';

Router.get('/', 'HomeController@index');

Router.get('/test', (req, res, next) => {
    res.send('test').end();
});
