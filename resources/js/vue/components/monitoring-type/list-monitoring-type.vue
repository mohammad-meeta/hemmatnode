<template lang="pug">
.container-child
    h1(v-if="!hasMonitoringType") هیچ  دسته بندی شاخص ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasMonitoringType")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(
                v-for="monitoringType in monitoringTypes",
                :key="monitoringType.id"
            )
                td {{ monitoringType.title }}
                td {{ monitoringType.is_active }}
                td {{ toPersianDate(monitoringType.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, monitoringType)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, monitoringType)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش اقدامات خلاق

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
        @change="loadMonitoringTypes(pagination.current)"
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
        monitoringTypes: [],
        monitoringTypesCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasMonitoringType: (state) => (state.monitoringTypes || []).length,
    },

    methods: {
        /**
         * Load monitoringTypes
         */
        loadMonitoringTypes(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "monitoringTypes", resData.data.data);
                Vue.set(this, "monitoringTypesCount", resData.data.count);
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
            this.loadMonitoringTypes(id);
        },

        /**
         * add new MonitoringType data to list data
         */
        addToMonitoringTypeList(payload) {
            const newMonitoringTypeData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.monitoringTypes.unshift(newMonitoringTypeData);
        },

        /**
         * EditMonitoringTypeList
         */
        editMonitoringTypeList(payload) {
            const editedMonitoringTypeData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                is_active: payload.data.data[0].is_active,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.monitoringTypes.findIndex(
                (x) => x._id == editedMonitoringTypeData._id
            );

            Vue.set(this.monitoringTypes, foundIndex, editedMonitoringTypeData);
        },
    },
};
</script>
