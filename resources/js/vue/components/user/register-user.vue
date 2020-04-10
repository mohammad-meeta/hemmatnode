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
            .field
                label.label Password
                .control
                    input.input(type='password', v-model='userData.password')
                p.help User email
            .field
                h1(v-if="errors")
                    pre {{ errors }}

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
const RegisterValidator = require("JS-VALIDATORS/user-register-validator");
const ErrorHelper = require("JS-HELPERS/error-helper");

module.exports = {
    data: () => ({
        ENUMS,
        userData: {
            name: null,
            email: null,
            password: null
        },
        errors: null
    }),

    methods: {
        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            if (arg == ENUMS.COMMAND.SAVE) {
                const result = RegisterValidator.validate(this.userData);

                if (!result.passes) {
                    const errStr = ErrorHelper.getErrorText(
                        result.validator.errors.all()
                    );

                    Vue.set(this, "errors", errStr);
                } else {
                    Vue.set(this, "errors", null);
                }
            }

            this.$emit("on-command", arg);
        }
    }
};
</script>

<style scoped>
</style>
