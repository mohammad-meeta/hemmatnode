<template lang="pug">
    .columns.is-vcentered
        .column.is-9.has-text-left
            h1(v-if="! hasUsers") | No Any User has been registered
            table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasUsers")
                thead
                    tr
                        th نام کاربری
                        th پست الکترونیک
                        th نام و نام خانوادگی
                        th کد ملی
                        th شماره موبایل
                        th وضعیت
                        th تاریخ ثبت نام

                tbody
                    tr(v-for='user in users', :key='user.id')
                        td {{ user.name }}
                        td {{ user.email }}
                        td {{ user.firstName }} {{ user.lastname }}
                        td {{ user.nationCode }}
                        td {{ user.cellphone }}
                        td {{ user.isActive }}
                        td {{ user.createdAt }}
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
        listUrl: {
            type: String,
            default: ""
        }
    },

    data: () => ({
        ENUMS,
        users: []
    }),

    computed: {
        hasUsers: state => (state.users || []).length
    },

    methods: {
        /**
         * Load users
         */
        loadUsers() {
            const url = this.listUrl;
            AxiosHelper.send("get", url, '').then(res => {
                const data = res.data;
                Vue.set(this, "users", data.data);
                console.log(this.users);
            });
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            this.$emit("on-command", arg);
        }
    }
};
</script>

<style scoped>
</style>
