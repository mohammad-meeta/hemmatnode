'use strict';
const Rule = use('core/helpers/rule-helper');
// const validator = use('validators/blog-register-validator');

const {
    checkSession
} = use('app/helpers/auth-helper');

const {
    checkAuth,
    clearAuth
} = use('core/helpers/auth-helper');

Router.get('/blog', [
    checkSession,
    Rule.canAsync('user.permision', 'blog.index'),
    'Blog@index'
])
    .as('blog.index');

Router.get("/api/blogs/:page/:size?", [
    checkSession,
    Rule.canAsync("user.permision", "api.blog"),
    "Blog@paginateBlog"
]).as("api.blog");

Router.get('/blog/create', [
    checkSession,
    Rule.canAsync('user.permision', 'blog.create'),
    'Blog@create'
])
    .as('blog.create');

Router.post('/blog', [
    upload.array('files'),
    checkSession,
    Rule.canAsync('user.permision', 'blog.store'),
    // validator.validate,
    'Blog@store'
])
    .as('blog.store');

Router.patch("/blog/:id/edit", [
    upload.array("files"),
    checkSession,
    Rule.canAsync("user.permision", "blog.update"),
    // validator.validate,
    "Blog@update"
]).as("blog.update");

Router.get('/blog/:blog', [
    checkSession,
    Rule.canAsync('user.permision', 'blog.show'),
    'Blog@show'
])
    .as('blog.show');

Router.delete('/blog/:blog', [
    checkSession,
    Rule.canAsync('user.permision', 'blog.destroy'),
    'Blog@destroy'
])
    .as('blog.destroy');
