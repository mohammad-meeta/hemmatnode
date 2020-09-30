'use strict';

/**
 * RegulationIndexPage class
 */
const RegulationIndexPage = function () { }
module.exports = RegulationIndexPage;


/**
 * Boot method
 */
RegulationIndexPage.boot = function () {
    RegulationIndexPage.initVue();
}

/**
 * Init vue
 */
RegulationIndexPage.initVue = function () {
    const Regulations = require('VUE-COMPONENTS/regulation/regulations.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Regulations
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadRegulations();
                },

                loadRegulations() {
                    // this.$refs.Regulations.loadRegulations();
                }
            }
        });
}

/* Boot */
RegulationIndexPage.boot();

