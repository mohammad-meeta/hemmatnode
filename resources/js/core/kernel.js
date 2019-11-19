'use strict';

/**
 * JSCore class
 */
function JSCore() {}
module.exports = JSCore;

/**
 * Setup Function
 */
JSCore.setup = function() {
    JSCore.setupVue();
    JSCore.setupAxios();
    JSCore.setupBulma();
    JSCore.setupETC();
};

/**
 * Setup Vue
 */
JSCore.setupVue = function setupVue() {
    const Vue = require('vue');
    const Vuex = require('vuex');

    Vue.use(Vuex);

    /* Captalize filter */
    Vue.filter('capitalize', function(value) {
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
 * Setup Bulma
 */
JSCore.setupBulma = function setupBulma() {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector(`#${burger.dataset.target}`);

    if (burger && menu) {
        burger.addEventListener('click', function() {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    }
};

/**
 * Setup ETC
 */
JSCore.setupETC = function setupETC() {
    const _ = require('lodash');
    window._ = _;
};

/*  Run Setup */
JSCore.setup();
