'use strict';
const PugView = use('app/helpers/pug-view');
const ReportHelper = use('app/helpers/report-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Report() { }
module.exports = Report;

/**
 * Index route
 */
Report.index = async function index(req, res, next) {
    const pageRoute = 'report.index';

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
Report.paginateReport = async function paginateReport(req, res, next) {
    const group = req.params.group;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await ReportHelper.loadAllReportCountData(group);
        let count = data.data;

        data = await ReportHelper.loadAllReportData(req, dataPaginate, group);
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
 * paginate route
 */
Report.findReport = async function findReport(req, res, next) {
    const year = req.params.year;
    const index = req.params.index;
    const group = req.params.group;

    try {
        let result = {};

        let data = await ReportHelper.findReportData(year, index, group);

        result = {
            success: true,
            data: {
                data: data,
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
Report.paginateReportYear = async function paginateReportYear(req, res, next) {
    const group = req.params.group;
    const year = req.params.year;

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await ReportHelper.loadAllReportCountYearData(group, year);
        let count = data.data;

        data = await ReportHelper.loadAllReportYearData(req, dataPaginate, group, year);
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
 * group date report
 */
Report.groupDate = async function groupDate(req, res, next) {
    const group = req.params.group;

    const data = await ReportHelper.loadGroupDate(req, group);
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
Report.show = async function show(req, res, next) {
    const Id = req.params.report;

    ReportHelper.loadReportData(Id)

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
Report.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ReportHelper.deleteReportData(data)
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
Report.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('report.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Report.store = async function store(req, res, next) {

    const data = {
        "year": req.body.year,
        "index_id": req.body.index_id,
        "value": req.body.value,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.departmentId,
    };

    ReportHelper.insertNewReport(data)
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
Report.update = async function update(req, res, next) {
    let data = {};

    data = {
        "_id": req.body._id,
        "year": req.body.year,
        "index_id": req.body.index_id,
        "value": req.body.value,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.department_id,
    };

    let result = await ReportHelper.updateReportData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
