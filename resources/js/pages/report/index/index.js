'use strict';

/**
 * ReportIndexPage class
 */
const ReportIndexPage = function () { }
module.exports = ReportIndexPage;


/**
 * Boot method
 */
ReportIndexPage.boot = function () {
    ReportIndexPage.initVue();
}

/**
 * Init vue
 */
ReportIndexPage.initVue = function () {
    const Reports = require('VUE-COMPONENTS/report/reports.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Reports
            },
        });
}

/* Boot */
ReportIndexPage.boot();

