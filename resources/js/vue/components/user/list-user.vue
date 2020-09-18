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

    b-pagination(
        :total="pagination.total",
        :current.sync="pagination.current",
        :range-before="pagination.rangeBefore",
        :range-after="pagination.rangeAfter",
        :order="pagination.order",
        :size="pagination.size",
        :simple="pagination.isSimple",
        :rounded="pagination.isRounded",
        :per-page="pagination.perPage",
        :icon-prev="pagination.prevIcon",
        :icon-next="pagination.nextIcon",
        aria-next-label="Next page",
        aria-previous-label="Previous page",
        aria-page-label="Page",
        aria-current-label="Current page"
        @change="loadUsers(pagination.current)"
    )
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    props: {
        listUrl: {
            type: String,
            default: ""
        }
    },

    data: () => ({
        ENUMS,
        pagination: {
            total: 0,
            current: 1,
            perPage: 2,
            rangeBefore: 3,
            rangeAfter: 1,
            order: "",
            size: "",
            isSimple: false,
            isRounded: false,
            prevIcon: "chevron-left",
            nextIcon: "chevron-right",
        },
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
        loadUsers(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 2);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                Vue.set(this, "users", resData.data.data);
                Vue.set(this, "usersCount", resData.data.count);
                Vue.set(this.pagination, "total", resData.data.count);
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
         * add new user data to list data
         */
        addToUserList(payload) {
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
            const data = payload.data;
            const editedUserData = {
                _id: data._id,
                name: data.name,
                email: data.email,
                cellphone: data.cellphone,
                is_active: data.is_active,
                createdAt: data.createdAt,
                first_name: data.profile.first_name,
                last_name: data.profile.last_name,
                nation_code: data.profile.nation_code
            };
            console.log(editedUserData);

            let foundIndex = this.users.findIndex(
                x => x._id == editedUserData._id
            );
            this.users[foundIndex].name = editedUserData.name;
            this.users[foundIndex].email = editedUserData.email;
            this.users[foundIndex].profile.first_name =
                editedUserData.first_name;
            this.users[foundIndex].profile.last_name = editedUserData.last_name;
            this.users[foundIndex].profile.nation_code =
                editedUserData.nation_code;
            this.users[foundIndex].cellphone = editedUserData.cellphone;
            this.users[foundIndex].is_active = editedUserData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
