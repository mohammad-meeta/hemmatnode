<template lang="pug">
.container-child
    h1(v-if="!hasMonitoring") هیچ دیدبانی شاخصی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasMonitoring")
        thead
            tr
                th شاخص
                th تاریخ
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="monitoring in monitorings", :key="monitoring.id")
                td {{ monitoring.index.title }}
                td {{ toPersianDate(monitoring.date) }}
                td {{ monitoring.is_active }}
                td {{ toPersianDate(monitoring.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, monitoring)"
                    )
                        span.icon.is-small
                            i.material-icons.icon visibility
                        span مشاهده

                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, monitoring)"
                    )
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش شاخص

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
        @change="loadMonitorings(pagination.current)"
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
        monitorings: [],
        monitoringsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasMonitoring: (state) => (state.monitorings || []).length,
    },

    methods: {
        /**
         * Load monitorings
         */
        loadMonitorings(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "monitorings", resData.data.data);
                Vue.set(this, "monitoringsCount", resData.data.count);
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
            this.loadMonitorings(id);
        },

        /**
         * add new Monitoring data to list data
         */
        addToMonitoringList(payload) {
            console.log(payload);
            const newMonitoringData = {
                _id: payload._id,
                date: payload.date,
                value: payload.value,
                index_id: payload.index._id,
                index: {
                    _id: payload.index._id,
                    title: payload.index.title,
                    unit: payload.index.unit
                },
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.monitorings.unshift(newMonitoringData);
        },
        editMonitoringList(payload) {
            const editedMonitoringData = {
                _id: payload.data.data[0]._id,
                date: payload.data.data[0].date,
                value: payload.data.data[0].value,
                unit: payload.data.data[0].unit,
                index_id: payload.data.data[0].index._id,
                index: {
                    _id: payload.data.data[0].index._id,
                    title: payload.data.data[0].index.title,
                    unit: payload.data.data[0].index.unit
                },
                is_active: payload.data.data[0].is_active,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.monitorings.findIndex(
                (x) => x._id == editedMonitoringData._id
            );

            Vue.set(this.monitorings, foundIndex, editedMonitoringData);
        },
    },
};
</script>
