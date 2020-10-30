<template lang="pug">
.container-child
    h1(v-if="!hasDepartment") هیچ گروهی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasDepartment")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="department in departments", :key="department.id")
                td {{ department.title }}
                td {{ department.is_active }}
                td {{ toPersianDate(department.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, department)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, department)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.REGULATION, department)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span آئین نامه ها

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
        aria-current-label="Current page",
        @change="loadDepartments(pagination.current)"
    )
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ListDepartment",

    components: {},

    props: {
        listUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        departments: [],
        departmentsCount: 0,
        pageCount: 0,

        pagination: {
            total: 0,
            current: 1,
            perPage: 10,
            rangeBefore: 3,
            rangeAfter: 1,
            order: "",
            size: "",
            isSimple: false,
            isRounded: false,
            prevIcon: "chevron-left",
            nextIcon: "chevron-right",
        },
    }),

    computed: {
        hasDepartment: (state) => (state.departments || []).length,
    },

    methods: {
        /**
         * Load departments
         */
        loadDepartments(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
            AxiosHelper.send("get", url, "").then((res) => {
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
                description: payload.description,
                department_category_id: payload.department_category_id,
                references: payload.references,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.departments.unshift(newDepartmentData);
        },

        editInDepartmentList(payload) {
            const editedDepartmentData = {
                _id: payload.data[0]._id,
                title: payload.data[0].title,
                description: payload.data[0].description,
                department_category_id: payload.data[0].department_category_id,
                references: payload.data[0].references,
                is_active: payload.data[0].is_active,
                files: payload.data[0].files,
                created_at: payload.data[0].created_at,
            };

            let foundIndex = this.departments.findIndex(
                (x) => x._id == editedDepartmentData._id
            );

            Vue.set(this.departments, foundIndex, editedDepartmentData);
        },
    },
};
</script>
