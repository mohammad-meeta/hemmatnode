<template lang="pug">
.container-child
    h1(v-if="! hasProject") هیچ پروژه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasProject")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='project in projects', :key='project.id')
                td {{ project.title }}
                td {{ project.is_active }}
                td {{ toPersianDate(project.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, project)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, project)")
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
        projects: [],
        projectsCount: 0,
        pageCount: 0
    }),

    computed: {
        hasProject: state => (state.projects || []).length
    },

    methods: {
        /**
         * Load projects
         */
        loadProjects(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);

            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                Vue.set(this, "projects", resData.data.data);
                Vue.set(this, "projectsCount", resData.data.count);

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
            let pageCount = Math.ceil(this.projectsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadProject(id);
        },
        /**
         * add new Project data to list data
         */
        addToProjectList(payload) {
            const newProjectData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.projects.unshift(newProjectData);
        },

        editInProjectList(payload) {
            const editedProjectData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.projects.findIndex(
                x => x._id == editedProjectData._id
            );
            this.projects[foundIndex].title = editedProjectData.title;
            this.projects[foundIndex].is_active =
                editedProjectData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
