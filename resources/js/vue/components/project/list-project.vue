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
                td(v-if="project.is_active")
                    | فعال
                td(v-if="!project.is_active")
                    | غیر فعال
                td {{ toPersianDate(project.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, project)")
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش
                    a.button.is-primary.is-rounded.is-small(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, project)")
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
        projects: [],
        projectsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasProject: (state) => (state.projects || []).length,
    },

    methods: {
        /**
         * Load projects
         */
        loadProjects(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            url = url.replace("$pageSize$", 50);

            AxiosHelper.send("get", url, "").then((res) => {
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
                created_at: payload.created_at,
            };

            this.projects.unshift(newProjectData);
        },

        editInProjectList(payload) {
            const editedProjectData = {
                _id: payload.data.data._id,
                title: payload.data.data.title,
                is_active: payload.data.data.is_active,
                created_at: payload.data.data.created_at,
            };

            let foundIndex = this.projects.findIndex(
                (x) => x._id == editedProjectData._id
            );
            console.log(foundIndex);
            console.log(payload.data.data);

            Vue.set(this.projects, foundIndex, payload.data.data);

            if (editedProjectData.is_active == "false") {
                this.projects[foundIndex].is_active = false;
            } else {
                this.projects[foundIndex].is_active = true;
            }
        },
    },
};
</script>

<style scoped></style>
