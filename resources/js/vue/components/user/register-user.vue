<template lang="pug">
    .columns.is-vcentered
        .column.is-9.has-text-left
            .field
                label.label Username
                .control
                    input.input(type='text', placeholder='e.g. john doe', autofocus, v-model='userData.name')
                p.help New user name
            .field
                label.label Email
                .control
                    input.input(type='email', placeholder='e.g. john@doe.dev', v-model='userData.email')
                p.help User email
        .column.is-2.is-offset-1
            ul
                li
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                        span.icon.is-small
                            i.material-icons.icon add_circle
                        span Save
                li
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)")
                        span.icon.is-small
                            i.material-icons.icon close
                        span Cancel
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    props: {
        "on-command": {
            type: Function,
            default: () => false
        }
    },

    data: () => ({
        ENUMS,
        userData: {
            name: null,
            email: null
        }
    }),

    methods: {
        /**
         * Validate user data
         */
        validate(userData, errorMessages) {
            
        },

        /**
         * Register user
         */
        registerUser() {
            this.validate(this.userData).then(function(matched) {
                if (!matched) {
                    console.log(this.errors);
                    alert("not ok");
                } else {
                    alert("ok");
                }
            });
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerUser();
                    break;

                case ENUMS.COMMAND.CANCEL:
                    let payload = {
                        type: arg
                    };

                    this.$emit("register-user", payload);

                    break;
            }
        },

        /**
         * Validate form
         */
        validate() {
            const errors = [];

            return errors.length == 0;
        }
    }
};
</script>

<style scoped>
</style>
