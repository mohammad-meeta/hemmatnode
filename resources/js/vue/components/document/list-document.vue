<template lang="pug">
.container-child
    h1(v-if="!hasDocument") هیچ اسناد راهبردی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasDocument")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="document in documents", :key="document.id")
                td {{ document.title }}
                td {{ document.is_active }}
                td {{ toPersianDate(document.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, document)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, document)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش اسناد راهبردی

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
        documents: [],
        documentsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasDocument: (state) => (state.documents || []).length,
    },

    methods: {
        /**
         * Load documents
         */
        loadDocuments(pageId) {
            let url = this.listUrl
                            .replace(/\$page\$/g, pageId)
                            .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "documents", resData.data.data);
                Vue.set(this, "documentsCount", resData.data.count);
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
         * add new Document data to list data
         */
        addToDocumentList(payload) {
            const newDocumentData = {
                _id: payload._id,
                title: payload.title,
                year: payload.year,
                executor: payload.executor,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.documents.unshift(newDocumentData);
        },
        editDocumentList(payload) {
            const editedDocumentData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                executor: payload.data.data[0].executor,
                year: payload.data.data[0].year,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.documents.findIndex(
                (x) => x._id == editedDocumentData._id
            );

            Vue.set(this.documents, foundIndex, editedDocumentData);
        },
    },
};
</script>
