"use strict";
const PugView = use("app/helpers/pug-view");
const ZoneindexHelper = use("app/helpers/zoneindex-helper");
/**
 * Dep cat controller
 */
function Zoneindex() { }
module.exports = Zoneindex;

/**
 * Zoneindex route
 */
Zoneindex.index = async function index(req, res, next) {
    const pageRoute = "zoneindex.index";

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
    });
};
/**
 * paginate route
 */
Zoneindex.paginateZoneindex = async function paginateZoneindex(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };
    const type = req.params.type;

    try {
        let result = {};

        let data = await ZoneindexHelper.loadAllZoneindexCountData(type);
        let count = data.data;

        data = await ZoneindexHelper.loadAllZoneindexData(req, dataPaginate, type);
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
Zoneindex.paginateZoneindexAll = async function paginateZoneindexAll(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10,
    };

    try {
        let result = {};

        let data = await ZoneindexHelper.loadAllZoneindexCountDataAll();
        let count = data.data;

        data = await ZoneindexHelper.loadAllZoneindexDataAll(req, dataPaginate);
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
Zoneindex.show = async function show(req, res, next) {
    const Id = req.params.index;

    ZoneindexHelper.loadZoneindexData(Id)

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
Zoneindex.destroy = async function destroy(req, res, next) {
    const data = {
        _id: req.body._id,
    };

    ZoneindexHelper.deleteZoneindexData(data)
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
Zoneindex.create = async function create(req, res, next) {
    const pageRoute = PugView.getView("zoneindex.create");

    res.render(pageRoute, {
        req,
        pageRoute,
    });
};

/**
 * store data
 */
Zoneindex.store = async function store(req, res, next) {
    const data = {
        title: req.body.title,
        point: req.body.point,
        source: req.body.source,
        "references": req.body.references,
        "department_category_id": req.body.department_category_id,
        zone_cat: req.body.zone_cat,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };

    ZoneindexHelper.insertNewZoneindex(data)
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
Zoneindex.update = async function update(req, res, next) {
    let data = {};

    data = {
        _id: req.body._id,
        title: req.body.title,
        point: req.body.point,
        source: req.body.source,
        "references": req.body.references,
        "department_category_id": req.body.department_category_id,
        zone_cat: req.body.zone_cat,
        user_id: req.session.auth.userId,
        is_active: req.body.is_active,
    };
    let result = await ZoneindexHelper.updateZoneindexData(data);
    const result2 = {
        success: true,
        data: result,
    };

    res.status(200)
        .send(result2)
        .end();
};
