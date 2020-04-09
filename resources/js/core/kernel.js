'use strict';

/**
 * JSCore class
 */
function JSCore() {}
module.exports = JSCore;

/**
 * Setup Function
 */
JSCore.setup = function () {
    JSCore.setupVue();
    JSCore.setupAxios();
    JSCore.setupETC();
    JSCore.setupRoutes();
};

/**
 * Setup Vue
 */
JSCore.setupVue = function setupVue() {
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
};

/**
 * Setup Axios
 */
JSCore.setupAxios = function setupAxios() {
    const Axios = require('axios').default;
    const AxiosHelper = require('JS-HELPERS/axios-helper');

    window.axios = Axios;
    window.AxiosHelper = AxiosHelper;
};

/**
 * Setup ETC
 */
JSCore.setupETC = function setupETC() {
    const _ = require('lodash');

    window._ = _;
};

/**
 * Setup Routes
 */
JSCore.setupRoutes = function setupRoutes() {
    const routes = require('JS-CORE/routes');

    JSCore.routes = routes;
    window.routes = routes;
};

/*  Run Setup */
JSCore.setup();
