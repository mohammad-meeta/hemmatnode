<template lang="pug">
.container-child
    h1(v-if="! hasInviteSession") هیچ دعوتنامه جلسه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasInviteSession")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='inviteSession in inviteSessions', :key='inviteSession.id')
                td {{ inviteSession.title }}
                td {{ inviteSession.is_active }}
                td {{ toPersianDate(inviteSession.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, department)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, department)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.REGULATION, department)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span آئین نامه ها

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
        inviteSessions: [],
        inviteSessionsCount: 0,
        pageCount: 0
    }),

    computed: {
        hasInviteSession: state => (state.inviteSessions || []).length
    },

    methods: {
        /**
         * Load inviteSessions
         */
        loadInviteSessions(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);

            console.log(url);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                Vue.set(this, "inviteSessions", resData.data.data);
                Vue.set(this, "inviteSessionsCount", resData.data.count);

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
            let pageCount = Math.ceil(this.inviteSessionsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadInviteSessions(id);
        },
        /**
         * add new inviteSessions data to list data
         */
        addToInviteSessionsList(payload) {
            const newInviteSessionsData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.inviteSessions.unshift(newInviteSessionsData);
        },

        editInInviteSessionsList(payload) {
            const editedInviteSessionsData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.inviteSessions.findIndex(
                x => x._id == editedInviteSessionsData._id
            );
            this.inviteSessions[foundIndex].title = editedInviteSessionsData.title;
            this.inviteSessions[foundIndex].is_active =
                editedInviteSessionsData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
