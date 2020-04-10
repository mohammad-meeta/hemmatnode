'use strict';

const redis = require("redis");

/**
 * Redis Service
 */
function RedisService() {}
module.exports = RedisService;

/**
 * Boot function
 */
RedisService.boot = function boot(server) {
    return new Promise((resolve, reject) => {
        const client = redis.createClient();

        client.on("error", function (error) {
            /* Logger.error(error); */
        });

        /* Store as a global object */
        global.redisClient = client;

        resolve(client);
    })
};
