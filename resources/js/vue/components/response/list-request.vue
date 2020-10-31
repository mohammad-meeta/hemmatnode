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
                td {{ request.is_active }}
                td {{ toPersianDate(request.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.NEW, request)")
                        span.icon.is-small
                            i.material-icons.icon edit
                        span پاسخ
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick('SHOW-RESPONSE', request)")
                        span.icon.is-small
                            i.material-icons.icon edit
                        span مشاهده پاسخ ها
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
        requestListUrl: {
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
            let url = this.requestListUrl.replace("$page$", pageId);
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
    },
};
</script>

<style scoped></style>
