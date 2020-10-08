'use strict';

/**
 * BlogtypeIndexPage class
 */
const BlogtypeIndexPage = function () { }
module.exports = BlogtypeIndexPage;


/**
 * Boot method
 */
BlogtypeIndexPage.boot = function () {
    BlogtypeIndexPage.initVue();
}

/**
 * Init vue
 */
BlogtypeIndexPage.initVue = function () {
    const Blogtypes = require('VUE-COMPONENTS/blogtype/blogtypes.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Blogtypes
            },
        });
}

/* Boot */
BlogtypeIndexPage.boot();

