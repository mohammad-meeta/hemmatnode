'use strict';
const PugView = use('app/helpers/pug-view');
const MonitoringHelper = use('app/helpers/monitoring-helper');
/**
 * Dep cat controller
 */
function Monitoring() { }
module.exports = Monitoring;

/**
 * Monitoring route
 */
Monitoring.index = async function index(req, res, next) {
    const pageRoute = 'monitoring.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Monitoring.paginateMonitoring = async function paginateMonitoring(req, res, next) {

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };
    const type = req.params.index;

    try {
        let result = {};

        let data = await MonitoringHelper.loadAllMonitoringCountData(type);
        let count = data.data;

        data = await MonitoringHelper.loadAllMonitoringData(req, dataPaginate, type);
        result = {
            success: true,
            data: {
                data: data,
                count: count
            }
        };

        res.status(200)
            .send(result)
            .end();

    }
    catch (err) {

        Logger.error(err);

        res.status(500)
            .send(err)
            .end();
    }
};
/**
 * paginate all route
 */
Monitoring.paginateMonitoringAll = async function paginateMonitoringAll(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await MonitoringHelper.loadAllMonitoringCountDataAll();
        let count = data.data;

        data = await MonitoringHelper.loadAllMonitoringDataAll(req, dataPaginate);
        result = {
            success: true,
            data: {
                data: data,
                count: count
            }
        };

        res.status(200)
            .send(result)
            .end();

    }
    catch (err) {

        Logger.error(err);

        res.status(500)
            .send(err)
            .end();
    }
};

/**
 * load data with id
 */
Monitoring.show = async function show(req, res, next) {
    const Id = req.params.index;

    MonitoringHelper.loadMonitoringData(Id)

        .then(data => {
            const result = {
                success: true,
                data: {
                    data: data,
                }
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};

/**
 * delete data dep cat
 */
Monitoring.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    MonitoringHelper.deleteMonitoringData(data)
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};

/**
 * Create route return page
 */
Monitoring.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('monitoring.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Monitoring.store = async function store(req, res, next) {
    const data = {
        "date": req.body.date,
        "value": req.body.value,
        "index_id": req.body.index_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
    };

    MonitoringHelper.insertNewMonitoring(data)
        .then(dataRes => {
            const result = {
                success: true,
                data: dataRes
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch(err => console.error(err));
};

/**
 * update data
 */
Monitoring.update = async function update(req, res, next) {
    let data = {};

    data = {
        "_id": req.body._id,
        "date": req.body.date,
        "value": req.body.value,
        "index_id": req.body.index_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
    };

    let result = await MonitoringHelper.updateMonitoringData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
