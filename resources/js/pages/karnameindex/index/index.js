'use strict';

/**
 * KarnameIndexPage class
 */
const KarnameIndexPage = function () { }
module.exports = KarnameIndexPage;


/**
 * Boot method
 */
KarnameIndexPage.boot = function () {
    KarnameIndexPage.initVue();
}

/**
 * Init vue
 */
KarnameIndexPage.initVue = function () {
    const karnameindexs = require('VUE-COMPONENTS/karnameindex/indicators.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                karnameindexs
            },
        });
}

/* Boot */
KarnameIndexPage.boot();

