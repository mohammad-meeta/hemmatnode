'use strict';
const PugView = use('app/helpers/pug-view');
const ZonecatHelper = use('app/helpers/zonecat-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Zonecat() { }
module.exports = Zonecat;

/**
 * Index route
 */
Zonecat.index = async function index(req, res, next) {
    const pageRoute = 'zonecat.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * paginate route
 */
Zonecat.paginateZonecat = async function paginateZonecat(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    ZonecatHelper.loadAllCountZonecatData()
        .then(data => {
            count = data;

            ZonecatHelper.loadAllZonecatData(dataPaginate)
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
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

/**
 * paginate route
 */
Zonecat.paginateZonecatReferencessNull = async function paginateZonecatReferencessNull(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    ZonecatHelper.loadAllCountZonecatDataRN()
        .then(data => {
            count = data;

            ZonecatHelper.loadAllZonecatDataRN(dataPaginate)
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
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

/**
 * paginate route
 */
Zonecat.paginateAllZonecatDocument = async function paginateAllZonecatDocument(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    ZonecatHelper.loadAllCountZonecatData()
        .then(data => {
            count = data;

            ZonecatHelper.loadAllZonecatDocumentData(dataPaginate)
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
                .catch(err => console.error(err));
        })
        .catch(err => console.error(err));
};

/**
 * show route
 */
Zonecat.show = async function show(req, res, next) {
    const zonecatId = req.params.zonecat;
    const pageRoute = 'zonecat.show';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        zonecatId
    });

    // ZonecatHelper.loadZonecatData(zonecatId)
    //     .then(data => {
    //         const result = {
    //             success: true,
    //             data: data
    //         };

    //         res.render(PugView.getView(pageRoute), {
    //             req,
    //             pageRoute,
    //             result
    //         });
    //     })
    //     .catch(err => console.error(err));
};

/**
 * load user
 */
Zonecat.userData = async function userData(req, res, next) {
    const zonecatId = req.params.group;

    ZonecatHelper.loadZonecatUserData(zonecatId)
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
 * load data with id
 */
Zonecat.loadData = async function loadData(req, res, next) {
    const zonecatId = req.params.zonecat;

    ZonecatHelper.loadZonecatData(zonecatId)

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
 * edit page route
 */
Zonecat.edit = async function edit(req, res, next) {
    const pageRoute = 'zonecat.edit';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Zonecat.editZonecatData = async function editZonecatData(req, res, next) {
    const title = req.params.zonecatData;

    ZonecatHelper.loadZonecatData(title)
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
 * return references data
 */
Zonecat.References = async function References(req, res, next) {
    const references = req.params.references;

    ZonecatHelper.loadReferencesData(references)
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
 * update data dep cat
 */
Zonecat.update = async function update(req, res, next) {
    let data = {};

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "references": req.body.references,
        "weight": req.body.weight,
    };

    ZonecatHelper.updateZonecatData(data)
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
 * delete data dep cat
 */
Zonecat.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ZonecatHelper.deleteZonecatData(data)
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
Zonecat.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('zonecat.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
Zonecat.store = async function store(req, res, next) {

    const data = {
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "references": req.body.references,
        "weight": req.body.weight,
    };

    ZonecatHelper.insertNewZonecat(data)
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