<template lang="pug">
.container-child
    h1(v-if="!hasProjectTafahom") هیچ پروژه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasProjectTafahom")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="projecttafahom in projecttafahoms", :key="projecttafahom.id")
                td {{ projecttafahom.title }}
                td(v-if="projecttafahom.is_active")
                    | فعال
                td(v-if="!projecttafahom.is_active")
                    | غیر فعال
                td {{ toPersianDate(projecttafahom.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, projecttafahom)"
                    )
                        span.icon.is-small
                            i.material-icons.icon visibility
                        span مشاهده

                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, projecttafahom)"
                    )
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش

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
        @change="loadProjectTafahoms(pagination.current)"
    )
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
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
        projecttafahoms: [],
        projecttafahomsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasProjectTafahom: (state) => (state.projecttafahoms || []).length,
    },

    methods: {
        /**
         * Load projecttafahoms
         */
        loadProjectTafahoms(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "projecttafahoms", resData.data.data);
                Vue.set(this, "projecttafahomsCount", resData.data.count);
                Vue.set(this.pagination, "total", resData.data.count);
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
            this.loadProjectTafahoms(id);
        },

        /**
         * add new ProjectTafahom data to list data
         */
        addToProjectTafahomList(payload) {
            const newProjectTafahomData = {
                _id: payload._id,
                title: payload.title,
                date: payload.date,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.projecttafahoms.unshift(newProjectTafahomData);
        },
        editProjectTafahomList(payload) {
            const editedProjectTafahomData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                date: payload.data.data[0].date,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.projecttafahoms.findIndex(
                (x) => x._id == editedProjectTafahomData._id
            );

            Vue.set(this.projecttafahoms, foundIndex, editedProjectTafahomData);
        },
    },
};
</script>
