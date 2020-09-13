<template lang="pug">
.container-child
    h1(v-if="! hasMemorandum") هیچ تفاهمنامه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasMemorandum")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='memorandum in memorandums', :key='memorandum.id')
                td {{ memorandum.title }}
                td(v-if="memorandum.is_active")
                    | فعال
                td(v-if="!memorandum.is_active")
                    | غیر فعال
                td {{ toPersianDate(memorandum.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, memorandum)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, memorandum)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

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
        aria-current-label="Current page"
        @change="loadMemorandums(pagination.current)"
    )
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

const Paginate = require("vuejs-paginate");
Vue.component("paginate", Paginate);
module.exports = {
    props: {
        listUrl: {
            type: String,
            default: ""
        },

        departmentId: {
            type: String,
            default: ""
        },
    },

    data: () => ({
        departmentData: null,
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
        memorandums: [
            {
                is_active: null,
                title: null,
                dep: {
                    title: null,
                },
            },
        ],
        memorandumsCount: 0
    }),

    computed: {
        hasMemorandum: state => (state.memorandums || []).length
    },

    methods: {

        /**
         * Load memorandums
         */
        loadMemorandums(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);

            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;

                Vue.set(this, "memorandums", resData.data.data);
                Vue.set(this, "memorandumsCount", resData.data.count);
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
         * add new memorandums data to list data
         */
        addToMemorandumList(payload) {
            if (this.memorandums.length > 0) {
                const dep = this.memorandums[0].dep;
                const newMemorandumsData = {
                    _id: payload.data._id,
                    dep: payload.data.dep,
                    project: payload.data.project,
                    title: payload.data.title,
                    is_active: payload.data.is_active,
                    created_at: payload.data.created_at,
                    date: payload.data.date,
                    body: payload.data.body,
                    conditions: payload.data.conditions,
                    files: payload.data.files,
                };
                this.memorandums.unshift(newMemorandumsData);
            }
        },

        editInMemorandumList(payload) {
            const editedMemorandumsData = {
                _id: payload.data._id,
                title: payload.data.title,
                is_active: payload.data.is_active,
                date: payload.data.date,
                body: payload.data.body,
                conditions: payload.data.conditions,
                oldFiles: payload.data.files,
                created_at: payload.data.created_at,
            };

            let foundIndex = this.memorandums.findIndex(
                x => x._id == editedMemorandumsData._id
            );
            this.memorandums[foundIndex].title =
                editedMemorandumsData.title;
            this.memorandums[foundIndex].project =
                editedMemorandumsData.project;
            this.memorandums[foundIndex].date =
                editedMemorandumsData.date;
            this.memorandums[foundIndex].body =
                editedMemorandumsData.body;
            this.memorandums[foundIndex].conditions =
                editedMemorandumsData.conditions;
            this.memorandums[foundIndex].is_active =
                editedMemorandumsData.is_active;
            this.memorandums[foundIndex].files =
                editedMemorandumsData.oldFiles;
        }
    }
};
</script>

<style scoped>
</style>
