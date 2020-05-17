'use strict';
const PugView = use('app/helpers/pug-view');
const ProgramHelper = use('app/helpers/program-helper');
/**
 * Auth controller
 */
function ProgramController() {}
module.exports = ProgramController;

// /**
//  * Index route
//  */
// ProgramController.index = async function index(req, res, next) {
//     const pageRoute = 'program.index';
//     res.render(PugView.getView(pageRoute), {
//         req,
//         pageRoute
//     });
// };
/**
 * paginate route
 */
ProgramController.paginateProgramData = async function paginateProgramData(req, res, next) {
    const dataPaginate = {
        page: req.params.page,
        pageSize: req.params.size || 10
    };

    ProgramHelper.loadAllProgramCountData()
        .then(data => {
            let count = data.data;

            ProgramHelper.loadAllProgramData(dataPaginate)
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
// ProgramController.show = async function show(req, res, next) {
//     const ProgramName = req.params.articleData;
//     const pageRoute = 'program.show';
//     ProgramHelper.loadProgramData(ProgramName)
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
// ProgramController.edit = async function edit(req, res, next) {
//     const pageRoute = 'program.edit';
//     res.render(PugView.getView(pageRoute), {
//         req,
//         pageRoute
//     });
// };

// /**
//  * return edit data route
//  */
// ProgramController.editProgramData = async function editProgramData(req, res, next) {
//     const ProgramId = req.params.articleData;
//     ProgramHelper.loadProgramData(ProgramId)
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
//  * update data Program
//  */
// ProgramController.update = async function update(req, res, next) {

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

//     const ProgramUpdate = ProgramHelper.updateProgramData(data)
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
//  * delete data Program
//  */
// ProgramController.destroy = async function destroy(req, res, next) {
//     const data = {
//         "_id": req.body._id
//     };

//     const ProgramDelete = ProgramHelper.deleteProgram(data)
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
// ProgramController.create = async function create(req, res, next) {
//     const pageRoute = 'program.create';
//     res.render(PugView.getView(pageRoute), {
//         req,
//         pageRoute
//     });
// };

// /**
//  * store data Program
//  */
// ProgramController.store = async function store(req, res, next) {

//     const data = {
//         "title": req.body.title,
//         "body": req.body.body,
//         "user": req.body.user,
//         "type": req.body.type,
//         "slug": req.body.slug,
//         "files": req.body.files || [],
//         "is_active": req.body.is_active || false
//     };

//     const ProgramInsert = ProgramHelper.insertNewProgram(data)
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