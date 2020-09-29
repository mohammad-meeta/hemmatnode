'use strict';
const PugView = use('app/helpers/pug-view');
const IndexHelper = use('app/helpers/index-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Index() { }
module.exports = Index;

/**
 * Index route
 */
Index.index = async function index(req, res, next) {
    const pageRoute = 'index.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Index.paginateIndex = async function paginateIndex(req, res, next) {

    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await IndexHelper.loadAllIndexCountData();
        let count = data.data;

        data = await IndexHelper.loadAllIndexData(req, dataPaginate);
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
Index.paginateIndexAll = async function paginateIndexAll(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    try {
        let result = {};

        let data = await IndexHelper.loadAllIndexCountDataAll();
        let count = data.data;

        data = await IndexHelper.loadAllIndexDataAll(req, dataPaginate);
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
Index.show = async function show(req, res, next) {
    const Id = req.params.index;

    IndexHelper.loadIndexData(Id)

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
Index.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    IndexHelper.deleteIndexData(data)
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
Index.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('index.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data
 */
Index.store = async function store(req, res, next) {
    const data = {
        "title": req.body.title,
        "description": req.body.description,
        "unit": req.body.unit,
        "department_id": req.body.department_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
    };

    IndexHelper.insertNewIndex(data)
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
Index.update = async function update(req, res, next) {
    let data = {};

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "description": req.body.description,
        "unit": req.body.unit,
        "department_id": req.body.department_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
    };

    let result = await IndexHelper.updateIndexData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
