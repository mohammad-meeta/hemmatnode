'use strict';

/**
 * Pug view helper class
 */
function PugView() {}
module.exports = PugView;

/**
 * Get view path by view-name
 */
PugView.getView = function (viewName) {
    return PugView.viewPath[viewName];
};

/** Set view path */
PugView.viewPath = {
    /* Home */
    'home.index': 'pages/home/index.pug',
    'home.about': 'pages/home/about.pug',

    /* Auth */
    'auth.login': 'pages/auth/login.pug',

    /* User */
    'user.index': 'pages/user/index.pug',
    'user.create': 'pages/user/register.pug',
    'user.show': 'pages/user/show.pug',
    'user.edit': 'pages/user/edit.pug',

    /* Department Category */
    'departmentcategory.index': 'pages/department-category/index.pug',
    'departmentcategory.create': 'pages/department-category/register.pug',
    'departmentcategory.show': 'pages/department-category/show.pug',
    'departmentcategory.edit': 'pages/department-category/edit.pug',

    /* Department */
    'department.index': 'pages/department/index.pug',
    'department.create': 'pages/department/register.pug',
    'department.show': 'pages/department/show.pug',
    'department.edit': 'pages/department/edit.pug',

    /* project */
    'project.index': 'pages/project/index.pug',
    'project.create': 'pages/project/register.pug',
    'project.show': 'pages/project/show.pug',
    'project.edit': 'pages/project/edit.pug',

    /* Session */
    'session.index': 'pages/session/index.pug',
    'session.create': 'pages/session/register.pug',
    'session.show': 'pages/session/show.pug',
    'session.edit': 'pages/session/edit.pug',

    /* DepartmentRegulation */
    'department.regulation.index': 'pages/department-regulation/index.pug',
    'department.regulation.create': 'pages/department-regulation/register.pug',
    'department.regulation.show': 'pages/department-regulation/show.pug',
    'department.regulation.edit': 'pages/department-regulation/edit.pug',

    /* articletype */
    'articletype.index': 'pages/articletype/index.pug',
    'articletype.create': 'pages/articletype/register.pug',
    'articletype.show': 'pages/articletype/show.pug',
    'articletype.edit': 'pages/articletype/edit.pug',

    /* documenttype */
    'documenttype.index': 'pages/documenttype/index.pug',
    'documenttype.create': 'pages/documenttype/register.pug',
    'documenttype.show': 'pages/documenttype/show.pug',
    'documenttype.edit': 'pages/documenttype/edit.pug',

    /* document */
    'document.index': 'pages/document/index.pug',
    'document.create': 'pages/document/register.pug',
    'document.show': 'pages/document/show.pug',
    'document.edit': 'pages/document/edit.pug',

    /* article*/
    'article.index': 'pages/article/index.pug',
    'article.create': 'pages/article/register.pug',
    'article.show': 'pages/article/show.pug',
    'article.edit': 'pages/article/edit.pug',

    /* Role */
    'role.index': 'pages/role/index.pug',
    'role.create': 'pages/role/register.pug',
    'role.show': 'pages/role/show.pug',
    'role.edit': 'pages/role/edit.pug',

    /* Invite */
    'invitesession.index': 'pages/invite-session/index.pug',
};