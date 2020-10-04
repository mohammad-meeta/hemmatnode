'use strict';

/* Boot */
(async () => {
    const path = require('path');
    const server = require(path.resolve('core', 'server'));

    await server.boot();
    server.run();
})()