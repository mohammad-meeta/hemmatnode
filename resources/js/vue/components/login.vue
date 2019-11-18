<template lang="pug">
    .column
        form.box.action
            .field
                label.label Email
                .control.has-icons-left
                    input.input(type="email", placeholder="e.g. bobsmith@gmail.com", required)
                    span.icon.is-small.is-left
                        i.material-icons account_circle
            .field
                label.label Password
                .control.has-icons-left
                    input.input(type="password", placeholder="*******", required)
                    span.icon.is-small.is-left
                        i.material-icons vpn_key
            .field
                button.button.is-success.is-medium(@click.prevent="login") Login
</template>

<script>
"use strict";

module.exports = {
    name: "Login",

    data: () => ({}),

    methods: {
        /**
         * Login
         */
        login() {}
    }
};
</script>

<style scoped>
</style>
