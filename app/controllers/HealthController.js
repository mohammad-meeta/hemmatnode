'use strict';
const PugView = use('app/helpers/pug-view');
const HealthHelper = use('app/helpers/health-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Health() { }
module.exports = Health;

/**
 * Index route
 */
Health.index = async function index(req, res, next) {
    const pageRoute = 'health.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        departmentId: req.params.department,
        year: req.params.year,
    });
};
/**
 * paginate route
 */
Health.paginateHealth = async function paginateHealth(req, res, next) {
    const group = req.params.group;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await HealthHelper.loadAllHealthCountData(group);
        let count = data.data;

        data = await HealthHelper.loadAllHealthData(req, dataPaginate, group);
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
 * paginate by year route
 */
Health.paginateHealthYear = async function paginateHealthYear(req, res, next) {
    const group = req.params.group;
    const year = req.params.year;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await HealthHelper.loadAllHealthCountYearData(group, year);
        let count = data.data;

        data = await HealthHelper.loadAllHealthYearData(req, dataPaginate, group, year);
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
 * group date health
 */
Health.groupDate = async function groupDate(req, res, next) {
    const group = req.params.group;

    const data = await HealthHelper.loadGroupDate(req, group);
    const result = {
        success: true,
        data: data
    };

    res.status(200)
        .send(result)
        .end();
};

/**
 * show route
 */
/**
 * load data with id
 */
Health.show = async function show(req, res, next) {
    const Id = req.params.health;

    HealthHelper.loadHealthData(Id)

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
Health.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    HealthHelper.deleteHealthData(data)
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
Health.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('health.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Health.store = async function store(req, res, next) {
    const files = req.files || [];
    let fileList = [];

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);

            const tempFileData = {
                file_id: data[0]._id,
                deleted_at: null,
            };
            fileList.push(tempFileData);
        } catch (err) {
            Logger.error(err);
        }
    }

    const data = {
        "title": req.body.title,
        "date": req.body.date,
        "executor": req.body.executor,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    HealthHelper.insertNewHealth(data)
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
Health.update = async function update(req, res, next) {
    let data = {};
    const files = req.files || [];
    let fileList = [];

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);

            const tempFileData = {
                file_id: data[0]._id,
                deleted_at: null,
            };
            fileList.push(tempFileData);
        } catch (err) {
            Logger.error(err);
        }
    }

    const deletedOldFiles = JSON.parse(req.body.deletedOldFiles || null) || [];

    let healthRes = await HealthHelper.loadHealthData(req.body._id);
    const healthLFiles = (healthRes || {}).files || [];

    for (let index = 0; index < healthLFiles.length; index++) {
        const element = healthLFiles[index];
        fileList.push(element)
    }

    for (let index = 0; index < deletedOldFiles.length; index++) {
        const element = deletedOldFiles[index];
        for (let oil = 0; oil < fileList.length; oil++) {
            const Fele = fileList[oil];
            if (Fele.file_id == element) {
                Fele.deleted_at = Date()
            }
        }
    }

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "date": req.body.date,
        "executor": req.body.executor,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
        "files": fileList
    };

    let result = await HealthHelper.updateHealthData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
