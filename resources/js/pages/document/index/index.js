'use strict';

/**
 * DocumentIndexPage class
 */
const DocumentIndexPage = function () { }
module.exports = DocumentIndexPage;


/**
 * Boot method
 */
DocumentIndexPage.boot = function () {
    DocumentIndexPage.initVue();
}

/**
 * Init vue
 */
DocumentIndexPage.initVue = function () {
    const Documents = require('VUE-COMPONENTS/document/documents.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Documents
            },
        });
}

/* Boot */
DocumentIndexPage.boot();

