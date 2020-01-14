<template lang="pug">
    .column
        form.box.action
            .field
                label.label Email
                .control.has-icons-left
                    input.input(type="email", placeholder="e.g. bobsmith@gmail.com", required, v-model="userData.name")
                    span.icon.is-small.is-left
                        i.material-icons account_circle
            .field
                label.label Password
                .control.has-icons-left
                    input.input(type="password", placeholder="*******", required, v-model="userData.password")
                    span.icon.is-small.is-left
                        i.material-icons vpn_key
            .field
                button.button.is-success.is-medium(@click.prevent="login") Login
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "Login",

    components: {
        Notification
    },

    data: () => ({
        userData: {
            name: null,
            password: null
        },
        notificationMessage: null,
        notificationType: "is-info"
    }),

    props: {
        loginUrl: {
            type: String
        }
    },

    computed: {
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * Close Notification
         */
        closeNotification() {
            this.setNotification(null);
        },

        /**
         * Set notification
         */
        setNotification(message, notificationType = "is-info") {
            Vue.set(this, "notificationType", notificationType);
            Vue.set(this, "notificationMessage", message);
        },

        /**
         * Check login result
         */
        checkLoginResult(data) {
            if (data.success == true) {
                this.setNotification("Login was successfully");
            } else {
                this.setNotification(data.data);
            }
        },

        /**
         * Show login error message
         */
        showLoginError(err) {
            const message =
                (err.response || {}).data || "Server connection failed!";

            this.setNotification(message, "is-danger");
        },

        /**
         * Login
         */
        login() {
            AxiosHelper.send("post", this.loginUrl, this.userData)
                .then(res => this.checkLoginResult(res.data))
                .catch(err => this.showLoginError(err));
        }
    }
};
</script>

<style scoped>
</style>
