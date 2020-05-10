<template lang="pug">
.container-child
    h1(v-if="! hasDepartment") هیچ گروهی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasDepartment")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='department in departments', :key='department.id')
                td {{ department.title }}
                td {{ department.is_active }}
                td {{ toPersianDate(department.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, department)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, department)")
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
        }
    },

    data: () => ({
        ENUMS,
        departments: [],
        departmentsCount: 0,
        pageCount: 0
    }),

    computed: {
        hasDepartment: state => (state.departments || []).length
    },

    methods: {
        /**
         * Load departments
         */
        loadDepartments(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);

            console.log(url);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                Vue.set(this, "departments", resData.data.data);
                Vue.set(this, "departmentsCount", resData.data.count);

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
            let pageCount = Math.ceil(this.departmentsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadDepartment(id);
        },
        /**
         * add new Department data to list data
         */
        addToDepartmentList(payload) {
            const newDepartmentData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.departments.unshift(newDepartmentData);
        },

        editInDepartmentList(payload) {
            const editedDepartmentData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.departments.findIndex(
                x => x._id == editedDepartmentData._id
            );
            this.departments[foundIndex].title = editedDepartmentData.title;
            this.departments[foundIndex].is_active =
                editedDepartmentData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
