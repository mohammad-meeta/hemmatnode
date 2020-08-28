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
                td(v-if="inviteSession.is_active")
                    | فعال
                td(v-if="!inviteSession.is_active")
                    | غیر فعال
                td {{ toPersianDate(inviteSession.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, inviteSession)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش صورتجلسه
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, inviteSession)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SEMIEDIT, inviteSession)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش دعوتنامه
    b-pagination(
        :total="pagination.total"
        :current.sync="pagination.current"
        :range-before="pagination.rangeBefore"
        :range-after="pagination.rangeAfter"
        :order="pagination.order"
        :size="pagination.size"
        :simple="pagination.isSimple"
        :rounded="pagination.isRounded"
        :per-page="pagination.perPage"
        :icon-prev="pagination.prevIcon"
        :icon-next="pagination.nextIcon"
        aria-next-label="Next page"
        aria-previous-label="Previous page"
        aria-page-label="Page"
        aria-current-label="Current page"
    )

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
        }
    },

    data: () => ({
        departmentData: null,
        ENUMS,
        pagination: {
            total: 200,
            current: 10,
            perPage: 10,
            rangeBefore: 3,
            rangeAfter: 1,
            order: "",
            size: "",
            isSimple: false,
            isRounded: false,
            prevIcon: "chevron-left",
            nextIcon: "chevron-right"
        },
        inviteSessions: [
            {
                is_active: null,
                agenda: null,
                extra: null,
                dep: {
                    title: null
                }
            }
        ],
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
        getTitles(extraa) {
            const extra = extraa || [];
            if (extra.length > 0) {
                let res = extra.map(x => x.title).join("<br/>");
                return res;
            }
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
            const data = JSON.parse(payload.data.agenda);
            if (this.inviteSessions.length > 0) {
                const dep = this.inviteSessions[0].dep;
                const newInviteSessionsData = {
                    id: payload._id,
                    dep: dep,
                    extra: data,
                    agenda: data,
                    place: payload.data.place,
                    date: payload.data.date,
                    body: payload.data.body,
                    user_list: payload.data.user_list,
                    other_user: JSON.parse(payload.data.other_user),
                    files: payload.data.files,
                    is_active: payload.data.is_active,
                    created_at: payload.data.created_at
                };
                this.inviteSessions.unshift(newInviteSessionsData);
            }
        },

        editInviteSessionList(payload) {
            const data = JSON.parse(payload.data.data.agenda);
            const otherUsers = JSON.parse(payload.data.otherUsers);
            const editedInviteSessionsData = {
                _id: payload.data.data._id,
                title: payload.data.data.agenda,
                agenda: data,
                extra: data,
                place: payload.data.data.place,
                date: payload.data.date,
                body: payload.data.body,
                user_list: payload.data.user_list,
                oldFiles: payload.data.files,
                is_active: payload.data.data.is_active,
                created_at: payload.data.data.created_at
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

<style scoped></style>
