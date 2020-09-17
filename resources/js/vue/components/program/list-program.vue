<template lang="pug">
.container-child
    h1(v-if="! hasProgram") هیچ برنامه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasProgram")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='program in programs', :key='program.id')
                td {{ program.title }}
                td {{ program.is_active }}
                td {{ toPersianDate(program.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, program)")
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, program)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش برنامه

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
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        programs: [],
        programsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasProgram: (state) => (state.programs || []).length,
    },

    methods: {
        /**
         * Load programs
         */
        loadPrograms(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);

            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "programs", resData.data.data);
                Vue.set(this, "programsCount", resData.data.count);

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
            let pageCount = Math.ceil(this.programsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadProgram(id);
        },
        /**
         * add new Program data to list data
         */
        addToProgramList(payload) {
            const newProgramData = {
                _id: payload._id,
                title: payload.title,
                date: payload.date,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.programs.unshift(newProgramData);
        },
        editProgramList(payload) {
            const editedProgramData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                date: payload.data.data[0].date,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.programs.findIndex(
                (x) => x._id == editedProgramData._id
            );
            Vue.set(this.programs, foundIndex, editedProgramData);
        },
    },
};
</script>

<style scoped></style>
