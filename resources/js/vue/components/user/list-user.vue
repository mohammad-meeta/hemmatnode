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
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, user)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.DELETE, user)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span فعال/مسدود
    nav.pagination(role='navigation', aria-label='pagination')
    a.pagination-previous(title='This is the first page', disabled='') صفحه قبل
    a.pagination-next صفحه بعد
    ul.pagination-list
        li
            a.pagination-link.is-current(aria-label='Page 1', aria-current='page') 1
        li
            a.pagination-link(aria-label='Goto page 2') 2
        li
            a.pagination-link(aria-label='Goto page 3') 3


</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const Paginator = require("paginator").default;
module.exports = {
    props: {
        listUrl: {
            type: String,
            default: ""
        }
    },

    data: () => ({
        ENUMS,
        users: [],
        usersCount: 0
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
                const resData = res.data;

                Vue.set(this, "users", resData.data.data);
                Vue.set(this, "usersCount", resData.data.count);

                this.paginator();
            });
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg, data) {
            this.$emit("on-command", { arg, data });
        },

        /**
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateLong(date);
        },

        /**
         * Paginator
         */
        paginator() {
            var paginator = new Paginator(10, 6);
            var pagination_info = paginator.build(this.usersCount, 50);
        }
    }
};
</script>

<style scoped>
</style>
