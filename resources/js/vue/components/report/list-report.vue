<template lang="pug">
.container-child
    h1(v-if="!hasReport") هیچ کارنامه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasReport")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="report in reports", :key="report.id")
                td {{ report.kindex.title }}
                td {{ report.is_active }}
                td {{ toPersianDate(report.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, report)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, report)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش کارنامه

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
        aria-current-label="Current page",
        @change="loadReports(pagination.current)"
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
    },

    data: () => ({
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
        reports: [],
        reportsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasReport: (state) => (state.reports || []).length,
    },

    methods: {
        /**
         * Load reports
         */
        loadReports(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "reports", resData.data.data);
                Vue.set(this, "reportsCount", resData.data.count);
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
            this.loadReports(id);
        },

        /**
         * add new Report data to list data
         */
        addToReportList(payload) {
            const newReportData = {
                _id: payload._id,
                year: payload.year,
                kindex: payload.kindex,
                value: payload.value,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.reports.unshift(newReportData);
        },
        editReportList(payload) {
            const editedReportData = {
                _id: payload.data.data[0]._id,
                year: payload.data.data[0].year,
                kindex: payload.data.data[0].kindex,
                value: payload.data.data[0].value,
                is_active: payload.data.data[0].is_active,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.reports.findIndex(
                (x) => x._id == editedReportData._id
            );

            Vue.set(this.reports, foundIndex, editedReportData);
        },
    },
};
</script>
