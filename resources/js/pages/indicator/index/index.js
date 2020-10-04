'use strict';

/**
 * IndicatorIndexPage class
 */
const IndicatorIndexPage = function () { }
module.exports = IndicatorIndexPage;


/**
 * Boot method
 */
IndicatorIndexPage.boot = function () {
    IndicatorIndexPage.initVue();
}

/**
 * Init vue
 */
IndicatorIndexPage.initVue = function () {
    const Indicators = require('VUE-COMPONENTS/indicator/indicators.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Indicators
            },
        });
}

/* Boot */
IndicatorIndexPage.boot();

