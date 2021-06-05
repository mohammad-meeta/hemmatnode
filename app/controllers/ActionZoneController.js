'use strict';
const PugView = use('app/helpers/pug-view');
const ActionZoneHelper = use('app/helpers/actionzone-helper');
/**
 * Dep cat controller
 */
function ActionZone() { }
module.exports = ActionZone;

/**
 * Index route
 */
ActionZone.index = async function index(req, res, next) {
    const pageRoute = 'actionzone.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * paginate route
 */
ActionZone.paginateActionZone = async function paginateActionZone(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    ActionZoneHelper.loadAllCountActionZoneData()
        .then(data => {
            count = data;

            ActionZoneHelper.loadAllActionZoneData(dataPaginate)
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
ActionZone.paginateActionZoneReferencessNull = async function paginateActionZoneReferencessNull(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    ActionZoneHelper.loadAllCountActionZoneDataRN()
        .then(data => {
            count = data;

            ActionZoneHelper.loadAllActionZoneDataRN(dataPaginate)
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
ActionZone.show = async function show(req, res, next) {
    const actionzoneId = req.params.actionzone;
    const pageRoute = 'actionzone.show';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute,
        actionzoneId
    });

};

/**
 * load data with id
 */
ActionZone.loadData = async function loadData(req, res, next) {
    const actionzoneId = req.params.actionzone;

    ActionZoneHelper.loadActionZoneData(actionzoneId)

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
ActionZone.edit = async function edit(req, res, next) {
    const pageRoute = 'actionzone.edit';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
ActionZone.editActionZoneData = async function editActionZoneData(req, res, next) {
    const title = req.params.actionzoneData;

    ActionZoneHelper.loadActionZoneData(title)
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
ActionZone.References = async function References(req, res, next) {
    const references = req.params.references;

    ActionZoneHelper.loadReferencesData(references)
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
ActionZone.update = async function update(req, res, next) {
    let data = {};

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_category_id": req.body.department_category_id,
        "year": req.body.year,
        "result": req.body.result,
        "value": req.body.value,
    };

    ActionZoneHelper.updateActionZoneData(data)
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
ActionZone.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ActionZoneHelper.deleteActionZoneData(data)
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
ActionZone.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('actionzone.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
ActionZone.store = async function store(req, res, next) {

    const data = {
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_category_id": req.body.department_category_id,
        "year": req.body.year,
        "result": req.body.result,
        "value": req.body.value,
    };

    ActionZoneHelper.insertNewActionZone(data)
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