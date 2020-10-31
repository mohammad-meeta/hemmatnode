<template lang="pug">
.container-child
    h1(v-if="! hasResult") هیچ برآمدی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasResult")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='result in results', :key='result.id')
                td {{ result.title }}
                td {{ result.is_active }}
                td {{ toPersianDate(result.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, result)")
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, result)")
                        span.icon.is-small
                            i.material-icons.icon visibility
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
export default {
    props: {
        listUrl: {
            type: String,
            default: ""
        }
    },

    data: () => ({
        ENUMS,
        results: [],
        resultsCount: 0,
        pageCount: 0
    }),

    computed: {
        hasResult: state => (state.results || []).length
    },

    methods: {
        /**
         * Load results
         */
        loadResults(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);

            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                Vue.set(this, "results", resData.data.data);
                Vue.set(this, "resultsCount", resData.data.count);

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
            let pageCount = Math.ceil(this.resultsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadResult(id);
        },
        /**
         * add new Result data to list data
         */
        addToResultList(payload) {
            const newResultData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.results.unshift(newResultData);
        },

        editInResultList(payload) {
            const editedResultData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.results.findIndex(
                x => x._id == editedResultData._id
            );
            this.results[foundIndex].title = editedResultData.title;
            this.results[foundIndex].is_active =
                editedResultData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
