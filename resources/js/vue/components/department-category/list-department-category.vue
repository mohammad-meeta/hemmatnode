<template lang="pug">
.container-child
    h1(v-if="! hasDepartmentCategories") هیچ دسته بندی گروهی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasDepartmentCategories")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='departmentCategory in departmentCategories', :key='departmentCategory.id')
                td {{ departmentCategory.title }}
                td {{ departmentCategory.is_active }}
                td {{ toPersianDate(departmentCategory.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, departmentCategory)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, departmentCategory)")
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
        departmentCategories: [],
        departmentCategoriesCount: 0,
        pageCount: 0
    }),

    computed: {
        hasDepartmentCategories: state => (state.departmentCategories || []).length
    },

    methods: {
        /**
         * Load departmentCategories
         */
        loadDepartmentCategories(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                Vue.set(this, "departmentCategories", resData.data.data);
                Vue.set(this, "departmentCategoriesCount", resData.data.count);

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
            let pageCount = Math.ceil(this.departmentCategoriesCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadDepartmentCategories(id);
        },
        /**
         * add new DepartmentCategory data to list data
         */
        addToDepartmentCategoryList(payload) {
            console.log(payload);
            const newDepartmentCategoryData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.departmentCategories.unshift(newDepartmentCategoryData);
        },

        editInDepartmentCategoryList(payload) {
            const editedDepartmentCategoryData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.departmentCategories.findIndex(
                x => x._id == editedDepartmentCategoryData._id
            );
            this.departmentCategories[foundIndex].title= editedDepartmentCategoryData.title;
            this.departmentCategories[foundIndex].is_active= editedDepartmentCategoryData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
