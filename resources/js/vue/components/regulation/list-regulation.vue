<template lang="pug">
.container-child
    h1(v-if="! hasRegulation") هیچ آیین نامه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasRegulation")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='regulation in regulations', :key='regulation.id')
                td(v-html="getTitles(regulation.extra)")
                td {{ regulation.is_active }}
                td {{ toPersianDate(regulation.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, regulation)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, regulation)")
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
        regulations: [],
        regulationsCount: 0,
        pageCount: 0
    }),

    computed: {
        hasRegulation: state => (state.regulations || []).length
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
         * Load regulations
         */
        loadRegulations(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);

            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const regulationData = resData.data.data;

                Vue.set(this, "regulations", regulationData);
                Vue.set(this, "regulationsCount", regulationData.count);

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
            let pageCount = Math.ceil(this.regulationsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadRegulations(id);
        },
        /**
         * add new regulations data to list data
         */
        addToRegulationList(payload) {
            const newRegulationsData = {
                _id: payload._id,
                agenda: payload.agrnda,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.regulations.unshift(newRegulationsData);
        },

        editInRegulationsList(payload) {
            const editedRegulationsData = {
                _id: payload._id,
                title: payload.agenda,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.regulations.findIndex(
                x => x._id == editedRegulationsData._id
            );
            this.regulations[foundIndex].agenda =
                editedRegulationsData.agenda;
            this.regulations[foundIndex].is_active =
                editedRegulationsData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
