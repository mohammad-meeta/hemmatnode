'use strict';
const PugView = use('app/helpers/pug-view');
const RequestHelper = use('app/helpers/request-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * request cat controller
 */
function Request() { }
module.exports = Request;

/**
 * Index route
 */
Request.index = async function index(req, res, next) {
    const pageRoute = 'request.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * paginate route
 */
Request.paginateRequest = async function paginateRequest(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };
    const group = req.params.group;
    RequestHelper.loadAllCountRequestData(group)
        .then(data => {
            let count = data.data;

            RequestHelper.loadAllRequestData(dataPaginate, group)
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
                .catch(err => {
                    Logger.error(err);

                    res.status(500)
                        .send(err)
                        .end();
                });
        })
        .catch(err => {
            Logger.error(err);

            res.status(500)
                .send(err)
                .end();
        });
};

/**
 * show route
 */
Request.show = async function show(req, res, next) {
    const RequestTitle = req.params.requestData;
    const pageRoute = 'request.show';
    RequestHelper.loadRequestData(RequestTitle)
        .then(data => {
            const result = {
                success: true,
                data: data
            };
            res.render(PugView.getView(pageRoute), {
                req,
                pageRoute,
                result
            });
        })
        .catch(err => console.error(err));
};

/**
 * edit page route
 */
Request.edit = async function edit(req, res, next) {
    const pageRoute = 'request.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Request.editRequestData = async function editRequestData(req, res, next) {
    const title = req.params.requestData;

    RequestHelper.loadRequestData(title)
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
 * update data request cat
 */
Request.update = async function update(req, res, next) {
    let data = {};
    const files = req.body.files || [];

    fileList = [];
    files.forEach(element => {
        const fileData = element;
        FileHelper.insertFileData(fileData)
            .then(data => {
                console.log(data);
            })
            .catch(err => console.error(err));
    });

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "description": req.body.description,
        "department_id": req.body.department_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "request_date": req.body.request_date,

        "files": fileList
    };

    RequestHelper.updateRequestData(data)
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
 * delete data request cat
 */
Request.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    RequestHelper.deleteRequestData(data)
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
Request.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('request.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data request cat
 */
Request.store = async function store(req, res, next) {

    const files = req.files || [];

    let fileList = [];

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);
            fileList.push(data[0]._id);
        } catch (err) {
            Logger.error(err);
        }
    }

    const data = {
        "_id": req.body._id,
        "title": req.body.title,
        "program_id": req.body.program_id || null,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "target": req.body.target || '',
        "same_effects_index": req.body.same_effects_index || '',
        "organ_moderator": req.body.organ_moderator,
        "request_moderator": req.body.request_moderator || '',
        "consoultant": req.body.consoultant || '',
        "supervisor": req.body.supervisor || '',
        "committee_leadership": req.body.committee_leadership || '',
        "coworker": req.body.coworker || '',
        "description": req.body.description || '',
        "intervention_review": req.body.intervention_review || '',
        "pervious_action_relation": req.body.pervious_action_relation || '',
        "target_corresponding": req.body.target_corresponding || '',
        "help_ipmrove_index": req.body.help_ipmrove_index || '',
        "final_product": req.body.final_product || '',
        "standards": req.body.standards || '',
        "other_benefit": req.body.other_benefit || '',
        "result_apply": req.body.result_apply || '',
        "refree": req.body.refree || '',
        "monitoring_comment": req.body.monitoring_comment || '',
        "files": fileList
    };

    RequestHelper.insertNewRequest(data)
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