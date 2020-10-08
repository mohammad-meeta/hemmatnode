'use strict';

/**
 * MonitoringIndexPage class
 */
const MonitoringIndexPage = function () { }
module.exports = MonitoringIndexPage;


/**
 * Boot method
 */
MonitoringIndexPage.boot = function () {
    MonitoringIndexPage.initVue();
}

/**
 * Init vue
 */
MonitoringIndexPage.initVue = function () {
    const Monitorings = require('VUE-COMPONENTS/monitoring/monitorings.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Monitorings
            },
        });
}

/* Boot */
MonitoringIndexPage.boot();

