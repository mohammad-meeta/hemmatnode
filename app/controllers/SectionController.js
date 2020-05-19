'use strict';
const PugView = use('app/helpers/pug-view');
const SectionHelper = use('app/helpers/section-helper');
/**
 * Auth controller
 */
function SectionController() {}
module.exports = SectionController;

// /**
//  * Index route
//  */
// SectionController.index = async function index(req, res, next) {
//     const pageRoute = 'section.index';
//     res.render(PugView.getView(pageRoute), {
//         req,
//         pageRoute
//     });
// };
/**
 * paginate route
 */
SectionController.paginateSectionData = async function paginateSectionData(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    SectionHelper.loadAllSectionCountData()
        .then(data => {
            let count = data.data;

            SectionHelper.loadAllSectionData(dataPaginate)
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


// /**
//  * show route
//  */
// SectionController.show = async function show(req, res, next) {
//     const SectionName = req.params.articleData;
//     const pageRoute = 'section.show';
//     SectionHelper.loadSectionData(SectionName)
//         .then(data => {
//             const result = {
//                 success: true,
//                 data: data
//             };
//             res.render(PugView.getView(pageRoute), {
//                 req,
//                 pageRoute,
//                 result
//             });
//         })
//         .catch(err => console.error(err));
// };

// /**
//  * edit page route
//  */
// SectionController.edit = async function edit(req, res, next) {
//     const pageRoute = 'section.edit';
//     res.render(PugView.getView(pageRoute), {
//         req,
//         pageRoute
//     });
// };

// /**
//  * return edit data route
//  */
// SectionController.editSectionData = async function editSectionData(req, res, next) {
//     const SectionId = req.params.articleData;
//     SectionHelper.loadSectionData(SectionId)
//         .then(data => {
//             const result = {
//                 success: true,
//                 data: data
//             };
//             res.status(200)
//                 .send(result)
//                 .end();
//         })
//         .catch(err => console.error(err));
// };

// /**
//  * update data Section
//  */
// SectionController.update = async function update(req, res, next) {

//     const data = {
//         "_id": req.body._id,
//         "title": req.body.title,
//         "body": req.body.body,
//         "user": req.body.user,
//         "type": req.body.type,
//         "slug": req.body.slug,
//         "files": req.body.files || [],
//         "is_active": req.body.is_active || false
//     };

//     const SectionUpdate = SectionHelper.updateSectionData(data)
//         .then(data => {
//             const result = {
//                 success: true,
//                 data: data
//             };
//             res.status(200)
//                 .send(result)
//                 .end();
//         })
//         .catch(err => console.error(err));
// };

// /**
//  * delete data Section
//  */
// SectionController.destroy = async function destroy(req, res, next) {
//     const data = {
//         "_id": req.body._id
//     };

//     const SectionDelete = SectionHelper.deleteSection(data)
//         .then(data => {
//             const result = {
//                 success: true,
//                 data: data
//             };
//             res.status(200)
//                 .send(result)
//                 .end();
//         })
//         .catch(err => console.error(err));
// };

// /**
//  * Create route return page
//  */
// SectionController.create = async function create(req, res, next) {
//     const pageRoute = 'section.create';
//     res.render(PugView.getView(pageRoute), {
//         req,
//         pageRoute
//     });
// };

// /**
//  * store data Section
//  */
// SectionController.store = async function store(req, res, next) {

//     const data = {
//         "title": req.body.title,
//         "body": req.body.body,
//         "user": req.body.user,
//         "type": req.body.type,
//         "slug": req.body.slug,
//         "files": req.body.files || [],
//         "is_active": req.body.is_active || false
//     };

//     const SectionInsert = SectionHelper.insertNewSection(data)
//         .then(data => {
//             const result = {
//                 success: true,
//                 data: data
//             };
//             res.status(200)
//                 .send(result)
//                 .end();
//         })
//         .catch(err => console.error(err));
// };