<template lang="pug">
    .dashboard-container
        .dashbord-content-head
            h2
                span
                    | همه جلسات
        .dashboard-content-body
            b-table(
                :data='data'
                :paginated='isPaginated'
                backend-pagination
                :total="inviteSessionsCount"
                :per-page='perPage'
                @page-change="onPageChange"
                :current-page='currentPage'
                :pagination-simple='isPaginationSimple'
                :pagination-position='paginationPosition'
                aria-next-label='Next page'
                aria-previous-label='Previous page'
                aria-page-label='Page'
                aria-current-label='Current page')
                b-table-column(field='subject' label='موضوع' v-slot='props')
                    | {{ props.row.dep.title }}
                b-table-column(field='date' label='تاریخ' v-slot='props')
                    | {{ toPersianDate(props.row.date) }}
                b-table-column(label='عملیات' v-slot='props')
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick({ type: FORM_MODE.SHOW, row: props.row})"
                    )
                        span.icon.is-small
                            i.material-icons.icon visibility
                        span مشاهده


</template>
<script>
"use strict";
export default {
    name: "DashboardAllSession",

    props: {
        inviteSessionAllListUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        data: [],
        isPaginated: true,
        isPaginationSimple: false,
        paginationPosition: "bottom",
        defaultSortDirection: "asc",
        currentPage: 1,
        perPage: 5,

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

        FORM_MODE: {
            CONTENT: 1,
            USER: 2,
            SESSION: 3,
            LOADING: 4,
            SHOW: 5,
            ALLSESSION: 6,
        },
    }),

    created() {
        this.loadInviteSessions(1);
    },

    methods: {
        /**
         * Load inviteSessions
         */
        loadInviteSessions(pageId) {
            let url = this.inviteSessionAllListUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 5);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const inviteData = resData.data.data;
                Vue.set(this, "inviteSessions", inviteData);
                Vue.set(this, "inviteSessionsCount", resData.data.count);
                Vue.set(this, "data", inviteData);
            });
        },

        /**
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateLong(date);
        },

        /*
         * Handle page-change event
         */
        onPageChange(page) {
            this.page = page;
            this.loadInviteSessions(page);
        },

        /**
         * On Command
         *
         */
        commandClick(data) {
            this.$emit("on-command", { data });
        },
    },
};
</script>
