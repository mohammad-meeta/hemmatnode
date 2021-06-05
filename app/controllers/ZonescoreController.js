"use strict";
const PugView = use("app/helpers/pug-view");
const ZonescoreHelper = use("app/helpers/zonescore-helper");
/**
 * Dep cat controller
 */
function Zonescore() { }
module.exports = Zonescore;

/**
 * Zonescore route
 */
Zonescore.index = async function index(req, res, next) {
    const pageRoute = "index.index";

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Zonescore.paginateZonescore = async function paginateZonescore(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };
    const type = req.params.type;

    try {
        let result = {};

        let data = await ZonescoreHelper.loadAllZonescoreCountData(type);
        let count = data.data;

        data = await ZonescoreHelper.loadAllZonescoreData(req, dataPaginate, type);
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
Zonescore.paginateZonescoreAll = async function paginateZonescoreAll(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };

    try {
        let result = {};

        let data = await ZonescoreHelper.loadAllZonescoreCountDataAll();
        let count = data.data;

        data = await ZonescoreHelper.loadAllZonescoreDataAll(req, dataPaginate);
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
Zonescore.show = async function show(req, res, next) {
    const Id = req.params.index;

    ZonescoreHelper.loadZonescoreData(Id)

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
Zonescore.destroy = async function destroy(req, res, next) {
    const data = {
        _id: req.body._id,
    };

    ZonescoreHelper.deleteZonescoreData(data)
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
Zonescore.create = async function create(req, res, next) {
    const pageRoute = PugView.getView("index.create");

    res.render(pageRoute, {
        req,
        pageRoute,
    });
};

/**
 * store data
 */
Zonescore.store = async function store(req, res, next) {
    const data = {
        score: req.body.score,
        zone_index: req.body.zone_index,
        zone_cat: req.body.zone_cat,
        department: req.body.department,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };

    ZonescoreHelper.insertNewZonescore(data)
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
Zonescore.update = async function update(req, res, next) {
    let data = {};

    data = {
        _id: req.body._id,
        score: req.body.score,
        zone_index: req.body.zone_index,
        zone_cat: req.body.zone_cat,
        department: req.body.department,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };
    let result = await ZonescoreHelper.updateZonescoreData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
