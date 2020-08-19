'use strict';
const PugView = use('app/helpers/pug-view');
const SessionHelper = use('app/helpers/session-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Session() {}
module.exports = Session;

/**
 * Index route
 */
Session.index = async function index(req, res, next) {
    const pageRoute = 'session.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
Session.paginateSession = function paginateSession(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    SessionHelper.loadAllSessionCountData()
        .then(data => {
            let count = data.data;

            SessionHelper.loadAllSessionData(dataPaginate)
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
Session.show = async function show(req, res, next) {
    const SessionTitle = req.params.sessionData;
    const pageRoute = 'session.show';
    SessionHelper.loadSessionData(SessionTitle)
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
Session.edit = async function edit(req, res, next) {
    const pageRoute = 'session.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Session.editSessionData = async function editSessionData(req, res, next) {
    const title = req.params.sessionData;

    SessionHelper.loadSessionData(title)
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
Session.update = async function update(req, res, next) {
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
        "body": req.body.body,
        "agenda": req.body.agenda,
        "place": req.body.place,
        "date": req.body.date,
        "user_list": req.body.user_list,
        "other_user": req.body.other_user,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.department_id,
        "files": fileList
    };

    SessionHelper.updateSessionData(data)
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
Session.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    SessionHelper.deleteSessionData(data)
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
Session.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('session.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
Session.store = async function store(req, res, next) {

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
        "body": req.body.body,
        "agenda": req.body.agenda,
        "place": req.body.place,
        "date": req.body.date,
        "user_list": req.body.user_list,
        "other_user": req.body.other_user,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.department_id,
        "files": fileList
    };

    SessionHelper.insertNewSession(data)
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