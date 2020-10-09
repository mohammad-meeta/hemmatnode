<template lang="pug">
.container-child
    h1(v-if="!hasTransport") هیچ انتقال مطالبه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasTransport")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="transport in transports", :key="transport.id")
                td {{ transport.title }}
                td {{ transport.is_active }}
                td {{ toPersianDate(transport.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, transport)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, transport)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش انتقال مطالبه

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
        @change="loadTransports(pagination.current)"
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
        transports: [],
        transportsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasTransport: (state) => (state.transports || []).length,
    },

    methods: {
        /**
         * Load transports
         */
        loadTransports(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "transports", resData.data.data);
                Vue.set(this, "transportsCount", resData.data.count);
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
            this.loadTransports(id);
        },

        /**
         * add new Transport data to list data
         */
        addToTransportList(payload) {
            const newTransportData = {
                _id: payload._id,
                title: payload.title,
                date: payload.date,
                status: payload.status,
                confirm: payload.confirm,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.transports.unshift(newTransportData);
        },
        editTransportList(payload) {
            const editedTransportData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                status: payload.data.data[0].status,
                confirm: payload.data.data[0].confirm,
                date: payload.data.data[0].date,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.transports.findIndex(
                (x) => x._id == editedTransportData._id
            );

            Vue.set(this.transports, foundIndex, editedTransportData);
        },
    },
};
</script>
