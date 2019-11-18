<template lang="pug">
    .columns.is-vcentered
        .column.is-9.has-text-left
            .field
                label.label Username
                .control
                    input.input(type='text', placeholder='e.g. john doe', autofocus)
                p.help New user name
            .field
                label.label Email
                .control
                    input.input(type='email', placeholder='e.g. john@doe.dev')
                p.help User email
        .column.is-2.is-offset-1
            ul
                li
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.NEW)")
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
    props: {},

    data: () => ({
        ENUMS
    }),

    methods: {
        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            this.$emit('on-command', arg);
        }
    }
};
</script>

<style scoped>
</style>
