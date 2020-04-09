'use strict';

const RegisterUser = require('VUE-COMPONENTS/user/register-user.vue').default;

/**
 * Register class
 */
const Register = function () {}
module.exports = Register;

/**
 * Boot method
 */
Register.boot = function () {
    Register.initVue();
}

/**
 * Init vue
 */
Register.initVue = function () {
    window.v =
        new Vue({
            el: '#app',

            components: {
                RegisterUser
            }
        });
}

/* Boot */
Register.boot();
