<template lang="pug">
    .dashboard-container
        .dashbord-content-head
            h2
                span
                    | جلسات
        .dashboard-content-body
            b-table(
                :data='data'
                :paginated='isPaginated'
                :per-page='perPage'
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
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

</template>
<script>
"use strict";
export default {
    name: "DashboardSession",

    props: {
        inviteSessionListUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        data: [],
        isPaginated: true,
        isPaginationSimple: false,
        paginationPosition: 'bottom',
        defaultSortDirection: 'asc',
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
    }),

    created() {
        this.loadInviteSessions(1);
    },

    methods: {
        /**
         * Load inviteSessions
         */
        loadInviteSessions(pageId) {
            let url = this.inviteSessionListUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 5);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const inviteData = resData.data.data;
                Vue.set(this, "inviteSessions", inviteData);
                Vue.set(this, "inviteSessionsCount", resData.data.count);
                Vue.set(this, "data", inviteData);
                console.log(this.data);
            });
        },

        /**
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateLong(date);
        },
    },

};
</script>
