<template lang="pug">
    .columns.is-vcentered
        .column.is-9.has-text-left
            table.table.is-striped.is-hoverable.is-fullwidth
                thead
                    tr
                        th Username
                        th Email
                tbody
                    tr(v-for='user in users', :key='user.id')
                        td {{ user.name }}
                        td {{ user.email | capitalize }}
        .column.is-2.is-offset-1
            ul
                li
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.NEW)")
                        span.icon.is-small
                            i.material-icons.icon add_circle
                        span New user
                li
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span Edit user
                li
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.DELETE)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span Active/Deactive
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    props: {
        users: {
            type: Array,
            default: []
        }
    },

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
