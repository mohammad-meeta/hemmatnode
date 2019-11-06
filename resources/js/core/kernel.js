'use strict';

/**
 * JSCore class
 */
function JSCore() { }
module.exports = JSCore;

/**
 * Setup Function
 */
JSCore.setup = function () {
    JSCore.setupVue();
    JSCore.setupAxios();
};

/**
 * Setup Vue
 */
JSCore.setupVue = function () {
    const Vue = require('vue').default;
    const Vuex = require('vuex').default;

    Vue.use(Vuex);
};

/**
 * Setup Axios
 */
JSCore.setupAxios = function () {
    const Axios = require('axios').default;

    window.axios = Axios;
};
