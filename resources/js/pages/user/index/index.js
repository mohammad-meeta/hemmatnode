'use strict';

/**
 * UserIndexPage class
 */
const UserIndexPage = function () {}
module.exports = UserIndexPage;

/**
 * Boot method
 */
UserIndexPage.boot = function () {
    UserIndexPage.initVue();
}

/**
 * Init vue
 */
UserIndexPage.initVue = function () {
    const UserList = require('VUE-COMPONENTS/user/users.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                UserList
            }
        });
}

/* Boot */
UserIndexPage.boot();
