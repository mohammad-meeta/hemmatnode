<template lang="pug">
.container-child
    h1(v-if="!hasZoneCat") هیچ حوزه فعالیتی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasZoneCat")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="zoneCat in zoneCats", :key="zoneCat.id")
                td {{ zoneCat.title }}
                td(v-if="zoneCat.is_active")
                    | فعال
                td(v-if="!zoneCat.is_active")
                    | غیر فعال
                td {{ toPersianDate(zoneCat.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, zoneCat)"
                    )
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, zoneCat)"
                    )
                        span.icon.is-small
                            i.material-icons.icon visibility
                        span مشاهده

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
        @change="loadZoneCats(pagination.current)"
    )
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ListZoneCat",

    components: {},

    props: {
        listUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        zoneCats: [],
        zoneCatsCount: 0,
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
        hasZoneCat: (state) => (state.zoneCats || []).length,
    },

    methods: {
        /**
         * Load zoneCats
         */
        loadZoneCats(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "zoneCats", resData.data.data);
                Vue.set(this, "zoneCatsCount", resData.data.count);

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
            let pageCount = Math.ceil(this.zoneCatsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadZoneCats(id);
        },
        /**
         * add new ZoneCat data to list data
         */
        addToZoneCatList(payload) {
            const newZoneCatData = {
                _id: payload._id,
                title: payload.title,
                weight: payload.weight,
                department_category_id: payload.department_category_id,
                references: payload.references,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.zoneCats.unshift(newZoneCatData);
        },

        editInZoneCatList(payload) {
            const editedZoneCatData = {
                _id: payload.data[0]._id,
                title: payload.data[0].title,
                weight: payload.data[0].weight,
                references: payload.data[0].references,
                is_active: payload.data[0].is_active,
                created_at: payload.data[0].created_at,
            };

            let foundIndex = this.zoneCats.findIndex(
                (x) => x._id == editedZoneCatData._id
            );

            Vue.set(this.zoneCats, foundIndex, editedZoneCatData);
        },
    },
};
</script>
