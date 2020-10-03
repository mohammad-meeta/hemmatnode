'use strict';

/**
 * MonitoringTypeIndexPage class
 */
const MonitoringTypeIndexPage = function () { }
module.exports = MonitoringTypeIndexPage;


/**
 * Boot method
 */
MonitoringTypeIndexPage.boot = function () {
    MonitoringTypeIndexPage.initVue();
}

/**
 * Init vue
 */
MonitoringTypeIndexPage.initVue = function () {
    const MonitoringTypes = require('VUE-COMPONENTS/monitoring-type/monitoring-types.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                MonitoringTypes
            },
        });
}

/* Boot */
MonitoringTypeIndexPage.boot();

