<template lang="pug">
.container-child
    h1(v-if="!hasIndicator") هیچ شاخصی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasIndicator")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="indicator in indicators", :key="indicator.id")
                td {{ indicator.title }}
                td {{ indicator.is_active }}
                td {{ toPersianDate(indicator.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, indicator)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, indicator)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
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
        @change="loadIndicators(pagination.current)"
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
        indicators: [],
        indicatorsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasIndicator: (state) => (state.indicators || []).length,
    },

    methods: {
        /**
         * Load indicators
         */
        loadIndicators(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "indicators", resData.data.data);
                Vue.set(this, "indicatorsCount", resData.data.count);
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
            this.loadIndicators(id);
        },

        /**
         * add new Indicator data to list data
         */
        addToIndicatorList(payload) {
            const newIndicatorData = {
                _id: payload._id,
                title: payload.title,
                description: payload.description,
                unit: payload.unit,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.indicators.unshift(newIndicatorData);
        },
        editIndicatorList(payload) {
            const editedIndicatorData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                description: payload.data.data[0].description,
                unit: payload.data.data[0].unit,
                is_active: payload.data.data[0].is_active,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.indicators.findIndex(
                (x) => x._id == editedIndicatorData._id
            );

            Vue.set(this.indicators, foundIndex, editedIndicatorData);
        },
    },
};
</script>
