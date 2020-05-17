'use strict';
const PugView = use('app/helpers/pug-view');
const ResultHelper = use('app/helpers/result-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * result cat controller
 */
function Result() {}
module.exports = Result;

/**
 * Index route
 */
Result.index = async function index(req, res, next) {
    const pageRoute = 'result.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * paginate route
 */
Result.paginateResult = async function paginateResult(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ResultHelper.loadAllCountResultData()
        .then(data => {
            let count = data.data;

            ResultHelper.loadAllResultData(dataPaginate)
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
Result.show = async function show(req, res, next) {
    const ResultTitle = req.params.resultData;
    const pageRoute = 'result.show';
    ResultHelper.loadResultData(ResultTitle)
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
Result.edit = async function edit(req, res, next) {
    const pageRoute = 'result.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Result.editResultData = async function editResultData(req, res, next) {
    const title = req.params.resultData;

    ResultHelper.loadResultData(title)
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
 * update data result cat
 */
Result.update = async function update(req, res, next) {
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
        "result": req.body.result,
        "project_id": req.body.project_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "standard": req.body.standard || '',
        "cast": req.body.cast,
        "deadline": req.body.deadline || '',
        "files": fileList
    };

    ResultHelper.updateResultData(data)
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
 * delete data result cat
 */
Result.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    ResultHelper.deleteResultData(data)
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
Result.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('result.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data result cat
 */
Result.store = async function store(req, res, next) {

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

    data = {
        "result": req.body.result,
        "project_id": req.body.project_id,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "standard": req.body.standard || '',
        "cast": req.body.cast,
        "deadline": req.body.deadline || '',
        "files": fileList
    };

    ResultHelper.insertNewResult(data)
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