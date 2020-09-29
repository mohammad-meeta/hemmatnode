'use strict';

/**
 * PowerIndexPage class
 */
const PowerIndexPage = function () { }
module.exports = PowerIndexPage;


/**
 * Boot method
 */
PowerIndexPage.boot = function () {
    PowerIndexPage.initVue();
}

/**
 * Init vue
 */
PowerIndexPage.initVue = function () {
    const Powers = require('VUE-COMPONENTS/power/powers.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Powers
            },
        });
}

/* Boot */
PowerIndexPage.boot();

