'use strict';

Router.get('/redis/test', function (req, res, next) {
    global.redisClient.get('time', (err, value) => {
        console.log(err, value)

        if (null != err) {
            res.send(value)
                .end(500);
        } else {
            if (value == null){
                global.redisClient.set('time', new Date());
            }

            res.send(value)
                .end(200);
        }
    });
})
.as('redis.test');
