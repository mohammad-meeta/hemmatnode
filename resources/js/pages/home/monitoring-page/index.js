'use strict';

/**
 * MonitoringPageIndexPage class
 */
const MonitoringPageIndexPage = function () {}
module.exports = MonitoringPageIndexPage;


/**
 * Boot method
 */
MonitoringPageIndexPage.boot = function () {
    MonitoringPageIndexPage.initVue();
}

/**
 * Init vue
 */
MonitoringPageIndexPage.initVue = function () {
    const MonitoringPages = require('VUE-COMPONENTS/monitoring-page/monitoring-pages.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                MonitoringPages
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadMonitoringPages();
                },

                loadMonitoringPages() {
                    //this.$refs.MonitoringPageCategories.loadMonitoringPages();
                }
            }
        });
}

/* Boot */
MonitoringPageIndexPage.boot();
