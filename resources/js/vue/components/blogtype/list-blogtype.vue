<template lang="pug">
.container-child
    h1(v-if="!hasBlogtype") هیچ دسته بندی اخباری ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasBlogtype")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="blogtype in blogtypes", :key="blogtype._id")
                td {{ blogtype.title }}
                td {{ blogtype.is_active }}
                td {{ toPersianDate(blogtype.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, blogtype)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, blogtype)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش دسته بندی اخبار

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
        @change="loadBlogtypes(pagination.current)"
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
        blogtypes: [],
        blogtypesCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasBlogtype: (state) => (state.blogtypes || []).length,
    },

    methods: {
        /**
         * Load blogtypes
         */
        loadBlogtypes(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "blogtypes", resData.data.data);
                Vue.set(this, "blogtypesCount", resData.data.count);
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
            this.loadBlogtypes(id);
        },

        /**
         * add new Blogtype data to list data
         */
        addToBlogtypeList(payload) {
            const newBlogtypeData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.blogtypes.unshift(newBlogtypeData);
        },
        editBlogtypeList(payload) {
            const editedBlogtypeData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                is_active: payload.data.data[0].is_active,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.blogtypes.findIndex(
                (x) => x._id == editedBlogtypeData._id
            );

            Vue.set(this.blogtypes, foundIndex, editedBlogtypeData);
        },
    },
};
</script>
