<template lang="pug">
.container-child
    h1(v-if="! hasResponse") هیچ پاسخ به همکاری متقابل ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasResponse")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='response in responses', :key='response._id')
                td {{ response.title }}
                td(v-if="response.is_active")
                    | فعال
                td(v-if="!response.is_active")
                    | غیر فعال
                td {{ toPersianDate(response.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, response)")
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, response)")
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
        responseListUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        responses: [],
        responsesCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasResponse: (state) => (state.responses || []).length,
    },

    methods: {
        /**
         * Load responses
         */
        loadResponseData(data) {
            let url = this.responseListUrl.replace("$reqId$", data._id);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "responses", resData.data.data);
                Vue.set(this, "responsesCount", resData.data.count);
            });
        },
        /**
         * Load responses
         */
        loadResponses(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "responses", resData.data.data);
                Vue.set(this, "responsesCount", resData.data.count);

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
            let pageCount = Math.ceil(this.responsesCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadResponse(id);
        },
        /**
         * add new Response data to list data
         */
        addToResponseList(payload) {
            const newResponseData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.responses.unshift(newResponseData);
        },

        editInResponseList(payload) {
            const editedResponseData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            let foundIndex = this.responses.findIndex(
                (x) => x._id == editedResponseData._id
            );
            this.responses[foundIndex].title = editedResponseData.title;
            this.responses[foundIndex].is_active = editedResponseData.is_active;
        },
    },
};
</script>

<style scoped></style>
