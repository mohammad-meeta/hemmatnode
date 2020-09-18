<template lang="pug">
.container-child
    h1(v-if="! hasTask") هیچ فعالیتی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasTask")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for='task in tasks', :key='task.id')
                td {{ task.title }}
                td {{ task.is_active }}
                td {{ toPersianDate(task.created_at) }}
                td.function-links
                    a.button.is-primary.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.EDIT, task)")
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش
                    a.button.is-warning.is-rounded.mt-2(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SHOW, task)")
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
export default {
    props: {
        listUrl: {
            type: String,
            default: ""
        }
    },

    data: () => ({
        ENUMS,
        tasks: [],
        tasksCount: 0,
        pageCount: 0
    }),

    computed: {
        hasTask: state => (state.tasks || []).length
    },

    methods: {
        /**
         * Load tasks
         */
        loadTasks(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);

            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                Vue.set(this, "tasks", resData.data.data);
                Vue.set(this, "tasksCount", resData.data.count);

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
            let pageCount = Math.ceil(this.tasksCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadTask(id);
        },
        /**
         * add new Task data to list data
         */
        addToTaskList(payload) {
            const newTaskData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            this.tasks.unshift(newTaskData);
        },

        editInTaskList(payload) {
            const editedTaskData = {
                _id: payload._id,
                title: payload.title,
                is_active: payload.is_active,
                created_at: payload.created_at
            };

            let foundIndex = this.tasks.findIndex(
                x => x._id == editedTaskData._id
            );
            this.tasks[foundIndex].title = editedTaskData.title;
            this.tasks[foundIndex].is_active =
                editedTaskData.is_active;
        }
    }
};
</script>

<style scoped>
</style>
