<template lang="pug">
.container-child
    h1(v-if="!hasActionCreative") هیچ اقدامات خلاقی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasActionCreative")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(
                v-for="actionCreative in actionCreatives",
                :key="actionCreative.id"
            )
                td {{ actionCreative.title }}
                td(v-if="actionCreative.is_active")
                    | فعال
                td(v-if="!actionCreative.is_active")
                    | غیر فعال
                td {{ toPersianDate(actionCreative.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, actionCreative)"
                    )
                        span.icon.is-small
                            i.material-icons.icon visibility
                        span مشاهده

                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, actionCreative)"
                    )
                        span.icon.is-small
                            i.material-icons.icon edit
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
        @change="loadActionCreatives(pagination.current)"
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
        actionCreatives: [],
        actionCreativesCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasActionCreative: (state) => (state.actionCreatives || []).length,
    },

    methods: {
        /**
         * Load actionCreatives
         */
        loadActionCreatives(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "actionCreatives", resData.data.data);
                Vue.set(this, "actionCreativesCount", resData.data.count);
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
            this.loadActionCreatives(id);
        },

        /**
         * add new ActionCreative data to list data
         */
        addToActionCreativeList(payload) {
            const newActionCreativeData = {
                _id: payload._id,
                title: payload.title,
                date: payload.date,
                reason: payload.reason,
                description: payload.description,
                responsible: payload.responsible,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.actionCreatives.unshift(newActionCreativeData);
        },

        /**
         * EditActionCreativeList
         */
        editActionCreativeList(payload) {
            const editedActionCreativeData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                date: payload.data.data[0].date,
                executor: payload.data.data[0].executor,
                date: payload.data.data[0].date,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.actionCreatives.findIndex(
                (x) => x._id == editedActionCreativeData._id
            );

            Vue.set(this.actionCreatives, foundIndex, editedActionCreativeData);
        },
    },
};
</script>
