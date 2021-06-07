<template lang="pug">
.container-child
    h1(v-if="!hasEducation") هیچ آموزش ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasEducation")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="education in educations", :key="education.id")
                td {{ education.title }}
                td(v-if="education.is_active")
                    | فعال
                td(v-if="!education.is_active")
                    | غیر فعال
                td {{ toPersianDate(education.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, education)"
                    )
                        span.icon.is-small
                            i.material-icons.icon visibility
                        span مشاهده

                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, education)"
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
        @change="loadEducations(pagination.current)"
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
        educations: [],
        educationsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasEducation: (state) => (state.educations || []).length,
    },

    methods: {
        /**
         * Load educations
         */
        loadEducations(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "educations", resData.data.data);
                Vue.set(this, "educationsCount", resData.data.count);
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
            this.loadEducations(id);
        },

        /**
         * add new Education data to list data
         */
        addToEducationList(payload) {
            const newEducationData = {
                _id: payload._id,
                title: payload.title,
                program_id: payload.program_id,
                way_id: payload.way_id,
                date: payload.date,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.educations.unshift(newEducationData);
        },
        editEducationList(payload) {
            const progid = payload.data.data[0].program_id;

            const editedEducationData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                program_id: progid,
                way_id: payload.data.data[0].way_id,
                date: payload.data.data[0].date,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.educations.findIndex(
                (x) => x._id == editedEducationData._id
            );

            Vue.set(this.educations, foundIndex, editedEducationData);
        },
    },
};
</script>
