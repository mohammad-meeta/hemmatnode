'use strict';

/**
 * ResultIndexPage class
 */
const ResultIndexPage = function () {}
module.exports = ResultIndexPage;


/**
 * Boot method
 */
ResultIndexPage.boot = function () {
    ResultIndexPage.initVue();
}

/**
 * Init vue
 */
ResultIndexPage.initVue = function () {
    const Results = require('VUE-COMPONENTS/result/results.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Results
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadResults();
                },

                loadResults() {
                    //this.$refs.result.loadResults();
                }
            }
        });
}

 /* Boot */
ResultIndexPage.boot();

