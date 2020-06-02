'use strict';

/**
 * DocumentIndexPage class
 */
const DocumentIndexPage = function () {}
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
    const Documents = require('VUE-COMPONENTS/internal-section/internal-sections.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Documents
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadDocuments();
                },

                loadDocuments() {
                    //this.$refs.DocumentCategories.loadDocuments();
                }
            }
        });
}

/* Boot */
DocumentIndexPage.boot();
