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
                td {{ memorandum.is_active }}
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

    paginate(:page-count='pageCount',
        :click-handler='paginatorClick',
        :prev-text="'Prev'",
        :next-text="'Next'",
        :container-class="'pagination-list'")
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
        memorandums: [],
        memorandumsCount: 0,
        pageCount: 0
    }),

    computed: {
        hasMemorandum: state => (state.memorandums || []).length
    },

    methods: {
        /**
         * Create titles
         */
        getTitles(extra) {
            let res = extra.map(x => x.title).join("<br/>");

            return res;
        },

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

                this.paginator();
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
         * Paginator
         */
        paginator() {
            let pageCount = Math.ceil(this.memorandumsCount / 50);
            Vue.set(this, "pageCount", pageCount);
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
            const newMemorandumsData = {
                _id: payload._id,
                agenda: payload.agrnda,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.memorandums.unshift(newMemorandumsData);
        },

        editInMemorandumsList(payload) {
            const editedMemorandumsData = {
                _id: payload._id,
                title: payload.agenda,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.memorandums.findIndex(
                x => x._id == editedMemorandumsData._id
            );
            this.memorandums[foundIndex].agenda =
                editedMemorandumsData.agenda;
            this.memorandums[foundIndex].is_active =
                editedMemorandumsData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
