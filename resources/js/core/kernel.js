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
    JSCore.setupBulma();
};

/**
 * Setup Vue
 */
JSCore.setupVue = function () {
    const Vue = require('vue');
    const Vuex = require('vuex');

    Vue.use(Vuex);

    /* Captalize filter */
    Vue.filter('capitalize', function (value) {
        if (!value) {
            return ''
        }
        
        value = value.toString();
        
        return value.charAt(0).toUpperCase() + value.slice(1);
    });

    window.Vue = Vue;
};

/**
 * Setup Axios
 */
JSCore.setupAxios = function () {
    const Axios = require('axios').default;

    window.axios = Axios;
};

/**
 * Setup Bulma
 */
JSCore.setupBulma = function () {
    const burger = document.querySelector('.burger');
    const menu = document.querySelector(`#${burger.dataset.target}`);

    if (burger && menu) {
        burger.addEventListener('click', function () {
            burger.classList.toggle('is-active');
            menu.classList.toggle('is-active');
        });
    }
};


/*  Run Setup */
JSCore.setup();
