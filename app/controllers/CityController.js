'use strict';
const CityHelper = use('app/helpers/city-helper');
/**
 * city cat controller
 */
function City() { }
module.exports = City;

/**
 * paginate route
 */
City.paginateCity = async function paginateCity(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };
    CityHelper.loadAllCountCityData()
        .then(data => {
            let count = data;
            CityHelper.loadAllCityData(req, dataPaginate)
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
