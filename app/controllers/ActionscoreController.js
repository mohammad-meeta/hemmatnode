"use strict";
const PugView = use("app/helpers/pug-view");
const ActionscoreHelper = use("app/helpers/actionscore-helper");
/**
 * Dep cat controller
 */
function Actionscore() { }
module.exports = Actionscore;

/**
 * Actionscore route
 */
Actionscore.index = async function index(req, res, next) {
    const pageRoute = "index.index";

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Actionscore.paginateActionscore = async function paginateActionscore(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };
    const type = req.params.type;

    try {
        let result = {};

        let data = await ActionscoreHelper.loadAllActionscoreCountData(type);
        let count = data.data;

        data = await ActionscoreHelper.loadAllActionscoreData(req, dataPaginate, type);
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
Actionscore.paginateActionscoreAll = async function paginateActionscoreAll(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };

    try {
        let result = {};

        let data = await ActionscoreHelper.loadAllActionscoreCountDataAll();
        let count = data.data;

        data = await ActionscoreHelper.loadAllActionscoreDataAll(req, dataPaginate);
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
Actionscore.show = async function show(req, res, next) {
    const Id = req.params.index;

    ActionscoreHelper.loadActionscoreData(Id)

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
Actionscore.destroy = async function destroy(req, res, next) {
    const data = {
        _id: req.body._id,
    };

    ActionscoreHelper.deleteActionscoreData(data)
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
Actionscore.create = async function create(req, res, next) {
    const pageRoute = PugView.getView("index.create");

    res.render(pageRoute, {
        req,
        pageRoute,
    });
};

/**
 * store data
 */
Actionscore.store = async function store(req, res, next) {
    const data = {
        title: req.body.title,
        score: req.body.score,
        action_cat: req.body.action_cat,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };

    ActionscoreHelper.insertNewActionscore(data)
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
Actionscore.update = async function update(req, res, next) {
    let data = {};

    data = {
        _id: req.body._id,
        title: req.body.title,
        score: req.body.score,
        action_cat: req.body.action_cat,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };
    let result = await ActionscoreHelper.updateActionscoreData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
