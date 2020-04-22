'use strict';

const _ = require('lodash');
const Redis = require('redis');
const ConnectRedis = require('connect-redis');
const sessionConfig = use('config/session');

/**
 * Express Session Helper
 */
function ExpressSessionHelper() {}
module.exports = ExpressSessionHelper;

/**
 * Setup the config data
 */
ExpressSessionHelper.setupConfig = function setupConfig(session) {
    const result = {
        secret: sessionConfig.secret,
        resave: sessionConfig.resave,
        saveUninitialized: sessionConfig.saveUninitialized,
        cookie: {
            secure: sessionConfig.secure
        }
    };

    if ('redis' == sessionConfig.session_store) {
        result.store = ExpressSessionHelper.setupRedisStore(session);
    }

    return result;
};

/**
 * Setup redis-store
 */
ExpressSessionHelper.setupRedisStore = function setupRedisStore(session) {
    const redisStore = ConnectRedis(session);
    const store = new redisStore({
        client: Redis.createClient()
    });

    return store;
};
