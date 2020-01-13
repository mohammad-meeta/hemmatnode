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
</template>

<script>
"use strict";

module.exports = {
    name: "Login",

    data: () => ({
        userData: {
            name: null,
            password: null
        }
    }),

    props: {
        loginUrl: {
            type: String
        }
    },

    methods: {
        /**
         * Login
         */
        login() {
            axios.post(this.loginUrl, this.userData)
                .then(res => console.log(res))
                .catch(err => console.error(err));
        }
    }
};
</script>

<style scoped>
</style>
