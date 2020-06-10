<template lang="pug">
.container-child
    h1(v-if="! hasInviteSession") هیچ دعوتنامه جلسه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasInviteSession")
        thead
            tr
                th موضوع جلسه
                th دستور جلسه
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='inviteSession in inviteSessions', :key='inviteSession.id')
                td {{ inviteSession.dep.title }}
                td(v-html="getTitles(inviteSession.extra)")
                td {{ inviteSession.is_active }}
                td {{ toPersianDate(inviteSession.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, inviteSession)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, inviteSession)")
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
        },

        departmentId: {
            type: String,
            default: ""
        },
    },

    data: () => ({
        departmentData: null,
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
         * Create titles
         */
        getTitles(extra) {
            let res = extra.map(x => x.title).join("<br/>");

            return res;
        },

        /**
         * Load inviteSessions
         */
        loadInviteSessions(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);

            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const inviteData = resData.data.data;

                inviteData.forEach(x => {
                    try {
                        x.extra = JSON.parse(x.agenda);
                    } catch (ex) {
                        x.extra = [];
                    }
                });

                Vue.set(this, "inviteSessions", inviteData);
                Vue.set(this, "inviteSessionsCount", inviteData.count);

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
        addToInviteSessionList(payload) {
            const newInviteSessionsData = {
                _id: payload._id,
                agenda: payload.agrnda,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.inviteSessions.unshift(newInviteSessionsData);
        },

        editInInviteSessionsList(payload) {
            const editedInviteSessionsData = {
                _id: payload._id,
                title: payload.agenda,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.inviteSessions.findIndex(
                x => x._id == editedInviteSessionsData._id
            );
            this.inviteSessions[foundIndex].agenda =
                editedInviteSessionsData.agenda;
            this.inviteSessions[foundIndex].is_active =
                editedInviteSessionsData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
