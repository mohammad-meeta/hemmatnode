'use strict';
const PugView = use('app/helpers/pug-view');
const MonitoringtypeHelper = use('app/helpers/monitoringtype-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Monitoringtype() { }
module.exports = Monitoringtype;

/**
 * Index route
 */
Monitoringtype.index = async function index(req, res, next) {
    const pageRoute = 'monitoringtype.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Monitoringtype.paginateMonitoringtype = async function paginateMonitoringtype(req, res, next) {

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await MonitoringtypeHelper.loadAllMonitoringtypeCountData();
        let count = data.data;

        data = await MonitoringtypeHelper.loadAllMonitoringtypeData(req, dataPaginate);
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
 * show route
 */
/**
 * load data with id
 */
Monitoringtype.show = async function show(req, res, next) {
    const Id = req.params.monitoringtype;

    MonitoringtypeHelper.loadMonitoringtypeData(Id)

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
Monitoringtype.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    MonitoringtypeHelper.deleteMonitoringtypeData(data)
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
Monitoringtype.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('monitoringtype.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Monitoringtype.store = async function store(req, res, next) {

    const data = {
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
    };

    MonitoringtypeHelper.insertNewMonitoringtype(data)
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
Monitoringtype.update = async function update(req, res, next) {
    let data = {};

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
    };

    let result = await MonitoringtypeHelper.updateMonitoringtypeData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
