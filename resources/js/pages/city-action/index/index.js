'use strict';

/**
 * CityActionIndexPage class
 */
const CityActionIndexPage = function () { }
module.exports = CityActionIndexPage;


/**
 * Boot method
 */
CityActionIndexPage.boot = function () {
    CityActionIndexPage.initVue();
}

/**
 * Init vue
 */
CityActionIndexPage.initVue = function () {
    const CityActions = require('VUE-COMPONENTS/city-action/city-actions.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                CityActions
            },
        });
}

/* Boot */
CityActionIndexPage.boot();

