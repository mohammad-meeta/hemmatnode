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

    paginate(:page-count='pageCount',
        :click-handler='paginatorClick',
        :prev-text="'Prev'",
        :next-text="'Next'",
        :container-class="'pagination-list'")
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

const Paginate = require("vuejs-paginate");
Vue.component("paginate", Paginate);
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
        usersCount: 0,
        pageCount: 0
    }),

    computed: {
        hasUsers: state => (state.users || []).length
    },

    methods: {
        /**
         * Load users
         */
        loadUsers(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
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
            let pageCount = Math.ceil(this.usersCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadUsers(id);
        },
        /**
         * add new user data to list data
         */
        addToUserList(payload) {
            const newUserData = {
                _id: payload._id,
                name: payload.name,
                email: payload.email,
                profile: {
                    first_name: payload.profile.first_name,
                    last_name: payload.profile.last_name,
                    nation_code: payload.profile.nation_code
                },
                cellphone: payload.cellphone,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.users.unshift(newUserData);
        },

        editInUserList(payload) {
            const editedUserData = {
                _id: payload._id,
                name: payload.name,
                email: payload.email,
                profile: {
                    first_name: payload.profile.first_name,
                    last_name: payload.profile.last_name,
                    nation_code: payload.profile.nation_code
                },
                cellphone: payload.cellphone,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            console.log(editedUserData);
        }

    }
};
</script>

<style scoped>
</style>
