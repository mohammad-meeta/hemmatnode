'use strict';
const PugView = use('app/helpers/pug-view');
const DepartmentLinkAccessHelper = use('app/helpers/department-link-access-helper');
/**
 * Auth controller
 */
function DepartmentLinkAccess() {}
module.exports = DepartmentLinkAccess;

/**
 * load route
 */
DepartmentLinkAccess.loadDepartmentLinkAccess = async function loadDepartmentLinkAccess(req, res, next) {
    const departmentId = req.params.departmentId;


    DepartmentLinkAccessHelper.loadAllLinkAccessData(departmentId)
        .then(data => {
            const result = {
                success: true,
                data: data,
            }

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
};


// /**
//  * show route
//  */
// DepartmentLinkAccess.show = async function show(req, res, next) {
//     const ProgramName = req.params.articleData;
//     const pageRoute = 'program.show';
//     DepartmentLinkAccessHelper.loadProgramData(ProgramName)
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
// DepartmentLinkAccess.edit = async function edit(req, res, next) {
//     const pageRoute = 'program.edit';
//     res.render(PugView.getView(pageRoute), {
//         req,
//         pageRoute
//     });
// };

// /**
//  * return edit data route
//  */
// DepartmentLinkAccess.editProgramData = async function editProgramData(req, res, next) {
//     const ProgramId = req.params.articleData;
//     DepartmentLinkAccessHelper.loadProgramData(ProgramId)
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
// DepartmentLinkAccess.update = async function update(req, res, next) {

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

//     const ProgramUpdate = DepartmentLinkAccessHelper.updateProgramData(data)
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
// DepartmentLinkAccess.destroy = async function destroy(req, res, next) {
//     const data = {
//         "_id": req.body._id
//     };

//     const ProgramDelete = DepartmentLinkAccessHelper.deleteProgram(data)
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
// DepartmentLinkAccess.create = async function create(req, res, next) {
//     const pageRoute = 'program.create';
//     res.render(PugView.getView(pageRoute), {
//         req,
//         pageRoute
//     });
// };

// /**
//  * store data Program
//  */
// DepartmentLinkAccess.store = async function store(req, res, next) {

//     const data = {
//         "title": req.body.title,
//         "body": req.body.body,
//         "user": req.body.user,
//         "type": req.body.type,
//         "slug": req.body.slug,
//         "files": req.body.files || [],
//         "is_active": req.body.is_active || false
//     };

//     const ProgramInsert = DepartmentLinkAccessHelper.insertNewProgram(data)
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