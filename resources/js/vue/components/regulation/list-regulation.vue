<template lang="pug">
.container-child
    h1(v-if="!hasRegulation") هیچ آئین نامه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasRegulation")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="regulation in regulations", :key="regulation.id")
                td {{ regulation.title }}
                td {{ regulation.is_active }}
                td {{ toPersianDate(regulation.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, regulation)"
                    )
                        span.icon.is-small
                            i.material-icons.icon visibility
                        span مشاهده

                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, regulation)"
                    )
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش

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
        @change="loadMemorandums(pagination.current)"
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
        regulations: [],
        regulationsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasRegulation: (state) => (state.regulations || []).length,
    },

    methods: {
        /**
         * Load regulations
         */
        loadRegulations(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            console.log(this.listUrl);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                console.log(resData);
                Vue.set(this, "regulations", resData.data.data);
                Vue.set(this, "regulationsCount", resData.data.count);
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
            this.loadMemorandums(id);
        },

        /**
         * add new Regulation data to list data
         */
        addToRegulationList(payload) {
            const newRegulationData = {
                _id: payload._id,
                title: payload.title,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.regulations.unshift(newRegulationData);
        },
        editRegulationList(payload) {
            const editedRegulationData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.regulations.findIndex(
                (x) => x._id == editedRegulationData._id
            );

            Vue.set(this.regulations, foundIndex, editedRegulationData);
        },
    },
};
</script>
