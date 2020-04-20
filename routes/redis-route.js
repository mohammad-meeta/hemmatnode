'use strict';

const Rule = use('core/helpers/rule-helper');

Router.get('/redis/test', [
        Rule.can('redis.rule1'),
        function (req, res, next) {
            global.redisClient.get('time', (err, value) => {
                if (null != err) {
                    res.send(value)
                        .end(500);
                } else {
                    if (value == null) {
                        global.redisClient.set('time', new Date());
                    }

                    res.send(value)
                        .end(200);
                }
            });
        }
    ])
    .as('redis.test');
