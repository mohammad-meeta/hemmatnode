'use strict';

/**
 * InternalSectionIndexPage class
 */
const InternalSectionIndexPage = function () {}
module.exports = InternalSectionIndexPage;


/**
 * Boot method
 */
InternalSectionIndexPage.boot = function () {
    InternalSectionIndexPage.initVue();
}

/**
 * Init vue
 */
InternalSectionIndexPage.initVue = function () {
    const InternalSections = require('VUE-COMPONENTS/internal-section/internal-sections.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                InternalSections
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadInternalSections();
                },

                loadInternalSections() {
                    //this.$refs.InternalSectionCategories.loadInternalSections();
                }
            }
        });
}

/* Boot */
InternalSectionIndexPage.boot();
