<template lang="pug">
.container-child
    h1(v-if="!hasZoneIndex") هیچ حوزه فعالیتی ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasZoneIndex")
        thead
            tr
                th عنوان
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="zoneIndex in zoneIndexs", :key="zoneIndex.id")
                td {{ zoneIndex.title }}
                td(v-if="zoneIndex.is_active")
                    | فعال
                td(v-if="!zoneIndex.is_active")
                    | غیر فعال
                td {{ toPersianDate(zoneIndex.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, zoneIndex)"
                    )
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, zoneIndex)"
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
        @change="loadZoneIndexs(pagination.current)"
    )
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ListZoneIndex",

    components: {},

    props: {
        listUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        zoneIndexs: [],
        zoneIndexsCount: 0,
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
        hasZoneIndex: (state) => (state.zoneIndexs || []).length,
    },

    methods: {
        /**
         * Load zoneIndexs
         */
        loadZoneIndexs(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "zoneIndexs", resData.data.data);
                Vue.set(this, "zoneIndexsCount", resData.data.count);

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
            let pageCount = Math.ceil(this.zoneIndexsCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadZoneIndex(id);
        },
        /**
         * add new ZoneIndex data to list data
         */
        addToZoneIndexList(payload) {
            const newZoneIndexData = {
                _id: payload._id,
                title: payload.title,
                point: payload.point,
                source: payload.source,
                department_category_id: payload.zone_cat.department_category_id,
                references: payload.zone_cat.references,
                zone_cat: {
                    title: payload.zone_cat.title,
                    _id: payload.zone_cat._id,
                    department_category_id:
                        payload.zone_cat.department_category_id,
                    references: payload.zone_cat.references,
                },
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.zoneIndexs.unshift(newZoneIndexData);
        },

        editInZoneIndexList(payload) {
            const editedZoneIndexData = {
                _id: payload.data[0]._id,
                title: payload.data[0].title,
                point: payload.data[0].point,
                source: payload.data[0].source,
                references: payload.data[0].references,
                zone_cat: {
                    department_category_id:
                        payload.data[0].zone_cat.department_category_id,
                    references: payload.data[0].zone_cat.references,
                    _id: payload.data[0].zone_cat._id,
                    title: payload.data[0].zone_cat.title,
                },
                is_active: payload.data[0].is_active,
                created_at: payload.data[0].created_at,
            };

            let foundIndex = this.zoneIndexs.findIndex(
                (x) => x._id == editedZoneIndexData._id
            );

            Vue.set(this.zoneIndexs, foundIndex, editedZoneIndexData);
        },
    },
};
</script>
