<template lang="pug">
.container-child
    h1(v-if="! hasRequest") هیچ همکاری متقابل ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasRequest")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='request in requests', :key='request._id')
                td {{ request.title }}
                td(v-if="request.is_active")
                    | فعال
                td(v-if="!request.is_active")
                    | غیر فعال
                td {{ toPersianDate(request.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, request)")
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, request)")
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
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        requests: [],
        requestsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasRequest: (state) => (state.requests || []).length,
    },

    methods: {
        /**
         * Load requests
         */
        loadRequests(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "requests", resData.data.data);
                Vue.set(this, "requestsCount", resData.data.count);

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
            let pageCount = Math.ceil(this.requestsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadRequest(id);
        },
        /**
         * add new Request data to list data
         */
        addToRequestList(payload) {
            const newRequestData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.requests.unshift(newRequestData);
        },

        editInRequestList(payload) {
            const editedRequestData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            let foundIndex = this.requests.findIndex(
                (x) => x._id == editedRequestData._id
            );
            this.requests[foundIndex].title = editedRequestData.title;
            this.requests[foundIndex].is_active = editedRequestData.is_active;
        },
    },
};
</script>

<style scoped></style>
