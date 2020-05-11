'use strict';

/**
 * InviteSessionIndexPage class
 */
const InviteSessionIndexPage = function () {}
module.exports = InviteSessionIndexPage;


/**
 * Boot method
 */
InviteSessionIndexPage.boot = function () {
    InviteSessionIndexPage.initVue();
}

/**
 * Init vue
 */
InviteSessionIndexPage.initVue = function () {
    const InviteSessions = require('VUE-COMPONENTS/invite-session/invite-sessions.vue').default;

    window.v =
        new Vue({
            el: '#app',

            components: {
                InviteSessions
            },

            data: {},

            mounted() {
                this.init();
            },

            methods: {
                init() {
                    this.loadInviteSessions();
                },

                loadInviteSessions() {
                    //this.$refs.InviteSessions.loadInviteSessions();
                }
            }
        });
}

 /* Boot */
InviteSessionIndexPage.boot();

