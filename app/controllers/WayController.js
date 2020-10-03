'use strict';
const WayHelper = use('app/helpers/way-helper');
/**
 * way cat controller
 */
function Way() { }
module.exports = Way;

/**
 * paginate route
 */
Way.paginateWay = async function paginateWay(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };
    WayHelper.loadAllCountWayData()
        .then(data => {
            let count = data;
            WayHelper.loadAllWayData(req, dataPaginate)
                .then(data => {
                    const result = {
                        success: true,
                        data: {
                            data: data,
                            count: count
                        }
                    };

                    res.status(200)
                        .send(result)
                        .end();
                })
                .catch(err => {
                    Logger.error(err);

                    res.status(500)
                        .send(err)
                        .end();
                });
        })
        .catch(err => {
            Logger.error(err);

            res.status(500)
                .send(err)
                .end();
        });
};
