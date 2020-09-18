<template lang="pug">
.container-child
    h1(v-if="!hasInviteSession") هیچ دعوتنامه جلسه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasInviteSession")
        thead
            tr
                th موضوع جلسه
                th دستور جلسه
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(
                v-for="inviteSession in inviteSessions",
                :key="inviteSession.id"
            )
                td {{ inviteSession.dep.title }}
                td(v-html="getTitles(inviteSession.agenda)")
                td(v-if="inviteSession.is_active")
                    | فعال
                td(v-if="!inviteSession.is_active")
                    | غیر فعال
                td {{ toPersianDate(inviteSession.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, inviteSession)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش صورتجلسه
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, inviteSession)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده
                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SEMIEDIT, inviteSession)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش دعوتنامه
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
        @change="loadInviteSessions(pagination.current)"
    )

</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    props: {
        listUrl: {
            type: String,
            default: "",
        },

        departmentId: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        departmentData: null,
        ENUMS,
        pagination: {
            total: 0,
            current: 1,
            perPage: 50,
            rangeBefore: 3,
            rangeAfter: 1,
            order: "",
            size: "",
            isSimple: false,
            isRounded: false,
            prevIcon: "chevron-left",
            nextIcon: "chevron-right",
        },
        inviteSessions: [
            {
                is_active: null,
                agenda: null,
                dep: {
                    title: null,
                },
            },
        ],
        inviteSessionsCount: 0,
    }),

    computed: {
        hasInviteSession: (state) => (state.inviteSessions || []).length,
    },

    methods: {
        /**
         * Create titles
         */
        getTitles(agenda) {
            if (agenda && agenda.length > 0) {
                let res = agenda.map((x) => x.title).join("<br/>");

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

            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const inviteData = resData.data.data;
                Vue.set(this, "inviteSessions", inviteData);
                Vue.set(this, "inviteSessionsCount", resData.data.count);
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
         * paginator click link
         */
        paginatorClick(id) {
            this.loadInviteSessions(id);
        },
        /**
         * add new inviteSessions data to list data
         */
        addToInviteSessionList(payload) {
            const data = payload.data.agenda;
            if (this.inviteSessions.length > 0) {
                const dep = this.inviteSessions[0].dep;
                const newInviteSessionsData = {
                    _id: payload.data._id,
                    dep: dep,
                    agenda: data,
                    place: payload.data.place,
                    date: payload.data.date,
                    body: payload.data.body,
                    user_list: payload.data.user_list,
                    other_user: payload.data.other_user,
                    files: payload.data.files,
                    is_active: payload.data.is_active,
                    created_at: payload.data.created_at,
                };
                this.inviteSessions.unshift(newInviteSessionsData);
            }
        },

        editInviteSessionList(payload) {
            const data = payload.data.data.agenda;
            const editedInviteSessionsData = {
                _id: payload.data.data._id,
                title: payload.data.data.agenda,
                agenda: data,
                place: payload.data.data.place,
                date: payload.data.data.date,
                body: payload.data.data.body,
                user_list: payload.data.data.user_list,
                oldFiles: payload.data.data.files,
                is_active: payload.data.data.is_active,
                created_at: payload.data.data.created_at,
            };
            let foundIndex = this.inviteSessions.findIndex(
                (x) => x._id == editedInviteSessionsData._id
            );
            this.inviteSessions[foundIndex].agenda =
                editedInviteSessionsData.agenda;
            this.inviteSessions[foundIndex].place =
                editedInviteSessionsData.place;
            this.inviteSessions[foundIndex].date =
                editedInviteSessionsData.date;
            this.inviteSessions[foundIndex].body =
                editedInviteSessionsData.body;
            this.inviteSessions[foundIndex].user_list =
                editedInviteSessionsData.user_list;
            this.inviteSessions[foundIndex].files =
                editedInviteSessionsData.oldFiles;
            if(editedInviteSessionsData.is_active == "false") {
                this.inviteSessions[foundIndex].is_active = false;
            }
            else {
                this.inviteSessions[foundIndex].is_active = true;
            }
        },
    },
};
</script>

<style scoped></style>
