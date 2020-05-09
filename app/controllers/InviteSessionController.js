'use strict';
const PugView = use('app/helpers/pug-view');
const InviteSessionHelper = use('app/helpers/invite-session-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function InviteSession() {}
module.exports = InviteSession;

/**
 * Index route
 */
InviteSession.index = async function index(req, res, next) {
    const pageRoute = 'invitesession.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
InviteSession.paginateInviteSession = async function paginateInviteSession(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    InviteSessionHelper.loadAllCountInviteSessionData()
        .then(data => {
            count = data;

            InviteSessionHelper.loadAllInviteSessionData(dataPaginate)
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
InviteSession.show = async function show(req, res, next) {
    const SessionTitle = req.params.sessionData;
    const pageRoute = 'invitesession.show';
    InviteSessionHelper.loadInviteSessionData(SessionTitle)
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
InviteSession.edit = async function edit(req, res, next) {
    const pageRoute = 'invitesession.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
InviteSession.editInviteSessionData = async function editInviteSessionData(req, res, next) {
    const title = req.params.sessionData;

    InviteSessionHelper.loadInviteSessionData(title)
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
InviteSession.update = async function update(req, res, next) {
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
        "body": req.body.body,
        "agenda": req.body.agenda,
        "place": req.body.place,
        "date": req.body.date,
        "user_list": req.body.user_list,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.department_id,
        "files": fileList
    };

    InviteSessionHelper.updateInviteSessionData(data)
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
InviteSession.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    InviteSessionHelper.deleteInviteSessionData(data)
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
InviteSession.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('invitesession.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
InviteSession.store = async function store(req, res, next) {

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
        "title": req.body.title,
        "body": req.body.body,
        "agenda": req.body.agenda,
        "place": req.body.place,
        "date": req.body.date,
        "user_list": req.body.user_list,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "department_id": req.body.department_id,
        "files": fileList
    };

    InviteSessionHelper.insertNewInviteSession(data)
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