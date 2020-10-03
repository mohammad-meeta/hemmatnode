<template lang="pug">
.container-child
    h1(v-if="!hasCityAction") هیچ اقدامات متناظر شهرستانی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasCityAction")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(
                v-for="cityAction in cityActions",
                :key="cityAction.id"
            )
                td {{ cityAction.title }}
                td {{ cityAction.is_active }}
                td {{ toPersianDate(cityAction.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, cityAction)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, cityAction)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش اقدامات متناظر شهرستان

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
        @change="loadCityAction(pagination.current)"
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
        cityActions: [],
        cityActionsCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasCityAction: (state) => (state.cityActions || []).length,
    },

    methods: {
        /**
         * Load cityActions
         */
        loadCityActions(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "cityActions", resData.data.data);
                Vue.set(this, "cityActionsCount", resData.data.count);
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
            this.loadCityAction(id);
        },

        /**
         * add new CityAction data to list data
         */
        addToCityActionList(payload) {
            const newCityActionData = {
                _id: payload._id,
                title: payload.title,
                city: payload.city,
                date: payload.date,
                description: payload.description,
                responsible: payload.responsible,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.cityActions.unshift(newCityActionData);
        },

        /**
         * EditCityActionList
         */
        editCityActionList(payload) {
            const editedCityActionData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                city: payload.data.data[0].city,
                description: payload.description,
                responsible: payload.responsible,
                date: payload.data.data[0].date,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.cityActions.findIndex(
                (x) => x._id == editedCityActionData._id
            );

            Vue.set(this.cityActions, foundIndex, editedCityActionData);
        },
    },
};
</script>
