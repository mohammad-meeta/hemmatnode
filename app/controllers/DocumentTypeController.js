'use strict';
const PugView = use('app/helpers/pug-view');
const DocumentTypeHelper = use('app/helpers/document-type-helper');
/**
 * Dep cat controller
 */
function DocumentType() {}
module.exports = DocumentType;

/**
 * Index route
 */
DocumentType.index = async function index(req, res, next) {
    const pageRoute = 'documenttype.index';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};
/**
 * paginate route
 */
DocumentType.paginateDocumentType = async function paginateDocumentType(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    let count = 0;
    DocumentTypeHelper.loadAllCountDocumentTypeData()
        .then(data => {
            count = data;

            DocumentTypeHelper.loadAllDocumentTypeData(dataPaginate)
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
DocumentType.show = async function show(req, res, next) {
    const DocumentTitle = req.params.daocument;
    const pageRoute = 'documenttype.show';
    DocumentTypeHelper.loadDepartmentData(DocumentTitle)
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
DocumentType.edit = async function edit(req, res, next) {
    const pageRoute = 'documenttype.edit';
    res.render(PugView.getView(pageRoute), {
        req,
        pageRoute
    });
};

/**
 * return edit data route
 */
DocumentType.editDocumentTypeData = async function editDocumentTypeData(req, res, next) {
    const title = req.params.document;

    DocumentTypeHelper.loadDocumentTypeData(title)
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
DocumentType.update = async function update(req, res, next) {
    let data = {};

    data = {
        "_id": req.body._id,
        "title": req.body.title,
        "score": req.body.score,
        "date": req.body.date,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active
    };
};

/**
 * delete data dep cat
 */
DocumentType.destroy = async function destroy(req, res, next) {
    const data = {
        "_id": req.body._id
    };

    DocumentTypeHelper.deleteDocumentTypeData(data)
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
DocumentType.create = async function create(req, res, next) {
    const pageRoute = PugView.getView('documenttype.create');

    res.render(pageRoute, {
        req,
        pageRoute
    });
};

/**
 * store data dep cat
 */
DocumentType.store = async function store(req, res, next) {

    const data = {
        "title": req.body.title,
        "score": req.body.score,
        "date": req.body.date,
        "user_id": req.session.auth.userId,
        "is_active": req.body.is_active || false,
    };

    DocumentTypeHelper.insertNewDocumentType(data)
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