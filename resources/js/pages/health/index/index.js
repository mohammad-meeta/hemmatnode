'use strict';

/**
 * HealthIndexPage class
 */
const HealthIndexPage = function () { }
module.exports = HealthIndexPage;


/**
 * Boot method
 */
HealthIndexPage.boot = function () {
    HealthIndexPage.initVue();
}

/**
 * Init vue
 */
HealthIndexPage.initVue = function () {
    const Healths = require('VUE-COMPONENTS/health/healths.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Healths
            },
        });
}

/* Boot */
HealthIndexPage.boot();

