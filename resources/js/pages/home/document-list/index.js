'use strict';

/**
 * DocumentListIndexPage class
 */
const DocumentListIndexPage = function () {}
module.exports = DocumentListIndexPage;


/**
 * Boot method
 */
DocumentListIndexPage.boot = function () {
    DocumentListIndexPage.initVue();
}

/**
 * Init vue
 */
DocumentListIndexPage.initVue = function () {
    const DocumentLists = require('VUE-COMPONENTS/internal-section/internal-sections.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                DocumentLists
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadDocumentLists();
                },

                loadDocumentLists() {
                    //this.$refs.DocumentListCategories.loadDocumentLists();
                }
            }
        });
}

/* Boot */
DocumentListIndexPage.boot();
