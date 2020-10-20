'use strict';
const PugView = use('app/helpers/pug-view');
const ResponseHelper = use('app/helpers/response-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Response() { }
module.exports = Response;

/**
 * Index route
 */
Response.index = async function index(req, res, next) {
    const pageRoute = 'response.index';

    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
Response.paginateResponse = function paginateResponse(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ResponseHelper.loadAllResponseCountData()
        .then(data => {
            let count = data.data;

            ResponseHelper.loadAllResponseData(req, dataPaginate)
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
 * paginate route
 */
Response.paginateResponseRequest = function paginateResponseRequest(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };
    const reqId = req.params.reqId;

    ResponseHelper.loadAllResponseRequestCountData(reqId)
        .then(data => {
            let count = data.data;

            ResponseHelper.loadAllResponseRequestData(reqId, dataPaginate)
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
 * paginate route
 */
Response.paginateResponseUser = function paginateResponseUser(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ResponseHelper.loadAllResponseCountDataUser()
        .then(data => {
            let count = data.data;

            ResponseHelper.loadAllResponseDataUser(req, dataPaginate)
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
 * paginate route request
 */
Response.paginateRequest = function paginateRequest(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ResponseHelper.loadAllRequestCountData()
        .then(data => {
            let count = data.data;

            ResponseHelper.loadAllRequestData(req, dataPaginate)
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
Response.show = async function show(req, res, next) {
    const ResponseTitle = req.params.responseData;
    const pageRoute = 'response.show';
    ResponseHelper.loadResponseData(ResponseTitle)
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
Response.edit = async function edit(req, res, next) {
    const pageRoute = 'response.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Response.editResponseData = async function editResponseData(req, res, next) {
    const title = req.params.responseData;

    ResponseHelper.loadResponseData(title)
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
Response.update = async function update(req, res, next) {
    let data = {};
    const files = req.body.files || [];

    let fileList = [];
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
        "request_id": req.body.request_id,
        "department_id": req.body.department_id,
        "action": req.body.action,
        "deadline": req.body.deadline,
        "result": req.body.result,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "files": fileList
    };

    ResponseHelper.updateResponseData(data)
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
Response.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ResponseHelper.deleteResponseData(data)
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
Response.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('response.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
Response.store = async function store(req, res, next) {
    const files = req.files || [];

    let fileList = [];

    for (let i = 0; i < files.length; ++i) {
        try {
            const el = files[i];
            el.user_id = req.session.auth.userId;

            const data = await FileHelper.insertFileData(el);

            const tempFileData = {
                file_id: data[0]._id,
                deleted_at: null
            };
            fileList.push(tempFileData);

        } catch (err) {
            Logger.error(err);
        }
    }

    const data = {
        "title": req.body.title,
        "request_id": req.body.requestId,
        "department_id": req.body.departmentId,
        "action": req.body.action,
        "deadline": req.body.deadline,
        "result": req.body.result,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "files": fileList
    };

    ResponseHelper.insertNewResponse(data)
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
