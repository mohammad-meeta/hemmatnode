'use strict';

const Requests = require('VUE-COMPONENTS/request/requests.vue').default;


/**
 * RequestIndexPage class
 */
const RequestIndexPage = function () { }
module.exports = RequestIndexPage;


/**
 * Boot method
 */
RequestIndexPage.boot = function () {
    RequestIndexPage.initVue();
}

/**
 * Init vue
 */
RequestIndexPage.initVue = function () {

    window.v =
        new Vue({
            el: '#app',

            components: {
                Requests
            },
        });
}

/* Boot */
RequestIndexPage.boot();

