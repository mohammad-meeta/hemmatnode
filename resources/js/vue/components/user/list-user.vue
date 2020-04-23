<template lang="pug">
.container-child
    h1(v-if="! hasUsers") کاربری ثبت نام نکرده!
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
                th عملیات
        tbody
            tr(v-for='user in users', :key='user.id')
                td {{ user.name }}
                td {{ user.email }}
                td {{ user.profile.first_name }} {{ user.profile.last_name }}
                td {{ user.profile.nation_code }}
                td {{ user.cellphone }}
                td {{ user.is_active }}
                td {{ toPersianDate(user.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.DELETE)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span فعال/مسدود

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

            AxiosHelper.send("get", url, "").then(res => {
                const data = res.data;

                Vue.set(this, "users", data.data);
            });
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            this.$emit("on-command", arg);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateLong(date);
        }
    }
};
</script>

<style scoped>
</style>
