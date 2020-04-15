'use strict';

const UserList = require('VUE-COMPONENTS/user/list-user.vue').default;

function Page(){}
module.exports = Page;

/**
 * Init
 */
Page.init = function init() {
    window.v =
        new Vue({
            el: "#app",

            components: {
                UserList
            },

            data: {},

            mounted(){
                this.init()
            },

            methods: {
                init(){
                    this.loadUsers();
                },

                loadUsers() {
                    this.$refs.userList.loadUsers();
                }
            }
        })
};

Page.init();

