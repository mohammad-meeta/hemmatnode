'use strict';

const Server = use('core/server');

/**
 * Services module
 */
function ServicesModule() { }
module.exports = ServicesModule;

/**
 * Setup function
 */
ServicesModule.setup = function setup(server) {
    const fs = require('fs');

    /* Auto load and boot user's services */
    const path = rPath('app/services');
    const files = fs.readdirSync(path);
    files.forEach(service => {
        const Service = use(path, service);

        Service.boot(server);
    });

    return server;
};
