'use strict';

/**
 * BlogIndexPage class
 */
const BlogIndexPage = function () { }
module.exports = BlogIndexPage;


/**
 * Boot method
 */
BlogIndexPage.boot = function () {
    BlogIndexPage.initVue();
}

/**
 * Init vue
 */
BlogIndexPage.initVue = function () {
    const Blogs = require('VUE-COMPONENTS/blog/blogs.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Blogs
            },
        });
}

/* Boot */
BlogIndexPage.boot();

