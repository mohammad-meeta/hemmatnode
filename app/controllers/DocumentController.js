'use strict';
const PugView = use('app/helpers/pug-view');
const DocumentHelper = use('app/helpers/document-helper');
const FileHelper = use('app/helpers/file-helper');
/**
 * Dep cat controller
 */
function Document() {}
module.exports = Document;

/**
 * Index route
 */
Document.index = async function index(req, res, next) {
    const pageRoute = 'document.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
Document.paginateDocument = async function paginateDocument(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    DocumentHelper.loadAllCountDocumentData()
        .then(data => {
            count = data;

            DocumentHelper.loadAllDocumentData(dataPaginate)
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
Document.show = async function show(req, res, next) {
    const DocumentTitle = req.params.documentData;
    const pageRoute = 'document.show';
    DocumentHelper.loadDocumentData(DocumentTitle)
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
Document.edit = async function edit(req, res, next) {
    const pageRoute = 'document.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
Document.editDocumentData = async function editDocumentData(req, res, next) {
    const title = req.params.documentData;

    DocumentHelper.loadDocumentData(title)
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
Document.update = async function update(req, res, next) {
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
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active,
        "document_type_id": req.body.document_type_id,
        "body": req.body.body || '',
        "files": fileList
    };
};

/**
 * delete data dep cat
 */
Document.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    DocumentHelper.deleteDocumentData(data)
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
Document.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('document.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
Document.store = async function store(req, res, next) {

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
        "title": req.body.title,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active || false,
        "document_type_id": req.body.document_type_id,
        "body": req.body.body || '',
        "files": fileList || []
    };

    DocumentHelper.insertNewDocument(data)
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