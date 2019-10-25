'use strict';

/* Boot */
const path = require('path');
const server = require(path.resolve('core', 'server'));

server.boot();
server.run();
