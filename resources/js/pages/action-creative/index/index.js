'use strict';

/**
 * ActionCreativeIndexPage class
 */
const ActionCreativeIndexPage = function () { }
module.exports = ActionCreativeIndexPage;


/**
 * Boot method
 */
ActionCreativeIndexPage.boot = function () {
    ActionCreativeIndexPage.initVue();
}

/**
 * Init vue
 */
ActionCreativeIndexPage.initVue = function () {
    const ActionCreatives = require('VUE-COMPONENTS/action-creative/action-creatives.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                ActionCreatives
            },
        });
}

/* Boot */
ActionCreativeIndexPage.boot();

