'use strict';

/**
 * ExternalSectionIndexPage class
 */
const ExternalSectionIndexPage = function () {}
module.exports = ExternalSectionIndexPage;


/**
 * Boot method
 */
ExternalSectionIndexPage.boot = function () {
    ExternalSectionIndexPage.initVue();
}

/**
 * Init vue
 */
ExternalSectionIndexPage.initVue = function () {
    const ExternalSections = require('VUE-COMPONENTS/external-section/external-sections.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                ExternalSections
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadExternalSections();
                },

                loadExternalSections() {
                    //this.$refs.ExternalSectionCategories.loadExternalSections();
                }
            }
        });
}

/* Boot */
ExternalSectionIndexPage.boot();
