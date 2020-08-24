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
                td(v-if="user.is_active")
                    | فعال
                td(v-if="!user.is_active")
                    | غیر فعال
                td {{ toPersianDate(user.createdAt) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, user)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, user)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

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
            console.log(payload);
            const newUserData = {
                _id: payload.data._id,
                name: payload.data.name,
                email: payload.data.email,
                profile: {
                    first_name: payload.data.profile.first_name,
                    last_name: payload.data.profile.last_name,
                    nation_code: payload.data.profile.nation_code
                },
                cellphone: payload.data.cellphone,
                is_active: payload.data.is_active,
                createdAt: payload.data.createdAt
            };

            this.users.unshift(newUserData);
        },

        editInUserList(payload) {
            const editedUserData = {
                _id: payload._id,
                name: payload.name,
                email: payload.email,
                first_name: payload.first_name,
                last_name: payload.last_name,
                nation_code: payload.nation_code,
                cellphone: payload.cellphone,
                is_active: payload.is_active,
                createdAt: payload.createdAt
            };

            let foundIndex = this.users.findIndex(
                x => x._id == editedUserData._id
            );
            this.users[foundIndex].name= editedUserData.name;
            this.users[foundIndex].email= editedUserData.email;
            this.users[foundIndex].profile.first_name= editedUserData.first_name;
            this.users[foundIndex].profile.last_name= editedUserData.last_name;
            this.users[foundIndex].profile.nation_code= editedUserData.nation_code;
            this.users[foundIndex].cellphone= editedUserData.cellphone;
            this.users[foundIndex].is_active= editedUserData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
