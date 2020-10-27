'use strict';

/**
 * HeadIndexPage class
 */
const HeadIndexPage = function () { }
module.exports = HeadIndexPage;


/**
 * Boot method
 */
HeadIndexPage.boot = function () {
    HeadIndexPage.initVue();
}

/**
 * Init vue
 */
HeadIndexPage.initVue = function () {
    const loadAvatar = require('VUE-COMPONENTS/head/avatar.vue').default;
    const Vue = require('vue');
    const Vuex = require('vuex');

    Vue.use(Vuex);

    /* Captalize filter */
    Vue.filter('capitalize', function (value) {
        if (!value) {
            return '';
        }

        value = value.toString();

        return value.charAt(0).toUpperCase() + value.slice(1);
    });

    window.Vue = Vue;
    const _ = require('lodash');
    // const jQuery = require('jquery');

    window._ = _;
    // window.$ = window.jquery = jQuery;

    const Axios = require('axios').default;
    const AxiosHelper = require('JS-HELPERS/axios-helper');

    window.axios = Axios;
    window.AxiosHelper = AxiosHelper;


    window.v =
        new Vue({
            el: '#avatar',

            components: {
                loadAvatar
            },
        });
}

/* Boot */
HeadIndexPage.boot();

