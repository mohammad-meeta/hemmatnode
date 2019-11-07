'use strict';

/**
 * Login class
 */
const Login = function() {}
module.exports = Login;

/**
 * Boot method
 */
Login.boot = function() {
    Login.initVue();
}

/**
 * Init vue
 */
Login.initVue = function() {
    const Vue = require('vue');
    const Login = require('VUE-COMPONENTS/login.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Login
            }
        });
}

/* Boot */
Login.boot();
