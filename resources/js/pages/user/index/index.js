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
    const Users = require('VUE-COMPONENTS/user/users.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                Users
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadUsers();
                },

                loadUsers() {
                    this.$refs.users.loadUsers();
                }
            }
        });
}

/* Boot */
UserIndexPage.boot();
