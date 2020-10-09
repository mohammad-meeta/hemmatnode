'use strict';

/**
 * TransportIndexPage class
 */
const TransportIndexPage = function () { }
module.exports = TransportIndexPage;


/**
 * Boot method
 */
TransportIndexPage.boot = function () {
    TransportIndexPage.initVue();
}

/**
 * Init vue
 */
TransportIndexPage.initVue = function () {
    const Transports = require('VUE-COMPONENTS/transport/transports.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Transports
            },
        });
}

/* Boot */
TransportIndexPage.boot();

