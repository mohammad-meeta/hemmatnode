'use strict';

const Responses = require('VUE-COMPONENTS/response/responses.vue').default;


/**
 * ResponseIndexPage class
 */
const ResponseIndexPage = function () { }
module.exports = ResponseIndexPage;


/**
 * Boot method
 */
ResponseIndexPage.boot = function () {
    ResponseIndexPage.initVue();
}

/**
 * Init vue
 */
ResponseIndexPage.initVue = function () {

    window.v =
        new Vue({
            el: '#app',

            components: {
                Responses
            },
        });
}

/* Boot */
ResponseIndexPage.boot();

