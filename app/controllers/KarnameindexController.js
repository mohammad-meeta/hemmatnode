"use strict";
const PugView = use("app/helpers/pug-view");
const KarnameindexHelper = use("app/helpers/karname-index-helper");
/**
 * Dep cat controller
 */
function Karnameindex() { }
module.exports = Karnameindex;

/**
 * Karnameindex route
 */
Karnameindex.index = async function index(req, res, next) {
    const pageRoute = "karnameindex.index";

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Karnameindex.paginateKarnameindex = async function paginateKarnameindex(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };
    const type = req.params.type;

    try {
        let result = {};

        let data = await KarnameindexHelper.loadAllKarnameindexCountData(type);
        let count = data.data;

        data = await KarnameindexHelper.loadAllKarnameindexData(req, dataPaginate, type);
        result = {
            success: true,
            data: {
                data: data,
                count: count,
            },
        };

        res.status(200)
            .send(result)
            .end();
    } catch (err) {
        Logger.error(err);

        res.status(500)
            .send(err)
            .end();
    }
};
/**
 * paginate all route
 */
Karnameindex.paginateKarnameindexAll = async function paginateKarnameindexAll(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };

    try {
        let result = {};

        let data = await KarnameindexHelper.loadAllKarnameindexCountDataAll();
        let count = data.data;

        data = await KarnameindexHelper.loadAllKarnameindexDataAll(req, dataPaginate);
        result = {
            success: true,
            data: {
                data: data,
                count: count,
            },
        };

        res.status(200)
            .send(result)
            .end();
    } catch (err) {
        Logger.error(err);

        res.status(500)
            .send(err)
            .end();
    }
};

/**
 * load data with id
 */
Karnameindex.show = async function show(req, res, next) {
    const Id = req.params.index;

    KarnameindexHelper.loadKarnameindexData(Id)

        .then((data) => {
            const result = {
                success: true,
                data: {
                    data: data,
                },
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch((err) => console.error(err));
};

/**
 * delete data dep cat
 */
Karnameindex.destroy = async function destroy(req, res, next) {
    const data = {
        _id: req.body._id,
    };

    KarnameindexHelper.deleteKarnameindexData(data)
        .then((data) => {
            const result = {
                success: true,
                data: data,
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch((err) => console.error(err));
};

/**
 * Create route return page
 */
Karnameindex.create = async function create(req, res, next) {
    const pageRoute = PugView.getView("karnameindex.create");

    res.render(pageRoute, {
        req,
        pageRoute,
    });
};

/**
 * store data
 */
Karnameindex.store = async function store(req, res, next) {
    const data = {
        title: req.body.title,
        description: req.body.description,
        unit: req.body.unit,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };

    KarnameindexHelper.insertNewKarnameindex(data)
        .then((dataRes) => {
            const result = {
                success: true,
                data: dataRes,
            };
            res.status(200)
                .send(result)
                .end();
        })
        .catch((err) => console.error(err));
};

/**
 * update data
 */
Karnameindex.update = async function update(req, res, next) {
    let data = {};

    data = {
        _id: req.body._id,
        title: req.body.title,
        description: req.body.description,
        unit: req.body.unit,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };
    let result = await KarnameindexHelper.updateKarnameindexData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
