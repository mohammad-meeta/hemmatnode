<template lang="pug">
.container-child
    h1(v-if="!hasPower") هیچ پیوست سلامتی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasPower")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="power in powers", :key="power.id")
                td {{ power.title }}
                td {{ power.is_active }}
                td {{ toPersianDate(power.created_at) }}
                td.function-links
                    a.button.is-warning.is-rounded.mt-2(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, power)"
                    )
                        span.icon.is-small
                            i.material-icons.icon swap_horizontal_circle
                        span مشاهده

                    a.button.is-primary.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, power)"
                    )
                        span.icon.is-small
                            i.material-icons.icon check_circle
                        span ویرایش پیوست سلامت

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
        @change="loadPowers(pagination.current)"
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
        powers: [],
        powersCount: 0,
        pageCount: 0,
    }),

    computed: {
        hasPower: (state) => (state.powers || []).length,
    },

    methods: {
        /**
         * Load powers
         */
        loadPowers(pageId) {
            let url = this.listUrl
                .replace(/\$page\$/g, pageId)
                .replace(/\$pageSize\$/g, 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "powers", resData.data.data);
                Vue.set(this, "powersCount", resData.data.count);
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
            this.loadPowers(id);
        },

        /**
         * add new Power data to list data
         */
        addToPowerList(payload) {
            const newPowerData = {
                _id: payload._id,
                title: payload.title,
                date: payload.date,
                description: payload.description,
                files: payload.files,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.powers.unshift(newPowerData);
        },
        editPowerList(payload) {
            const editedPowerData = {
                _id: payload.data.data[0]._id,
                title: payload.data.data[0].title,
                description: payload.data.data[0].description,
                date: payload.data.data[0].date,
                is_active: payload.data.data[0].is_active,
                files: payload.data.data[0].files,
                created_at: payload.data.data[0].created_at,
            };

            let foundIndex = this.powers.findIndex(
                (x) => x._id == editedPowerData._id
            );

            Vue.set(this.powers, foundIndex, editedPowerData);
        },
    },
};
</script>
