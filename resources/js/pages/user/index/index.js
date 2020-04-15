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
    const UserList = require('VUE-COMPONENTS/user/list-user.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                UserList
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
                    this.$refs.userList.loadUsers();
                }
            }
        });
}

/* Boot */
UserIndexPage.boot();
