<template lang="pug">
.container-child
    h1(v-if="! hasHealt") هیچ برنامه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasHealt")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='healt in healts', :key='healt.id')
                td {{ healt.title }}
                td {{ healt.is_active }}
                td {{ toPersianDate(healt.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, healt)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, healt)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش برنامه

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
        healts: [],
        healtsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasHealt: (state) => (state.healts || []).length,
    },

    methods: {
        /**
         * Load healts
         */
        loadHealts(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);

            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "healts", resData.data.data);
                Vue.set(this, "healtsCount", resData.data.count);

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
         * paginator click link
         */
        paginatorClick(id) {
            this.loadMemorandums(id);
        },

        /**
         * add new Healt data to list data
         */
        addToHealtList(payload) {
            const newHealtData = {
                _id: payload._id,
                title: payload.title,
                date: payload.date,
                executor: payload.executor,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.healts.unshift(newHealtData);
        },
        editHealtList(payload) {
            const editedHealtData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                executor: payload.data.data[0].executor,
                date: payload.data.data[0].date,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.healts.findIndex(
                (x) => x._id == editedHealtData._id
            );
            Vue.set(this.healts, foundIndex, editedHealtData);
        },
    },
};
</script>

<style scoped></style>
