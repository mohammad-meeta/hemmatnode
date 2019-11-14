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
    const UserList = require('VUE-COMPONENTS/user/user-list.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                UserList
            },

            methods: {
                /**
                 * On Command button click
                 * @param {String} cmd The command
                 */
                commandClick(cmd) {
                    // this.$refs.userList.
                }
            }
        });
}

/* Boot */
UserIndexPage.boot();
