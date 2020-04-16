'use strict';

const EditUser = require('VUE-COMPONENTS/user/edit-user.vue').default;

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
                EditUser
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

