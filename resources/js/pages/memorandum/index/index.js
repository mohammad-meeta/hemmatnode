'use strict';

/**
 * MemorandumIndexPage class
 */
const MemorandumIndexPage = function () {}
module.exports = MemorandumIndexPage;


/**
 * Boot method
 */
MemorandumIndexPage.boot = function () {
    MemorandumIndexPage.initVue();
}

/**
 * Init vue
 */
MemorandumIndexPage.initVue = function () {
    const Memorandums = require('VUE-COMPONENTS/memorandum/memorandums.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Memorandums
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadMemorandums();
                },

                loadMemorandums() {
                    //this.$refs.Memorandums.loadMemorandums();
                }
            }
        });
}

 /* Boot */
MemorandumIndexPage.boot();

