<template lang="pug">
.container-child
    h1(v-if="!hasZoneScore") هیچ کارنامه ای ایجاد نشده
    table.table.is-striped.is-hoverable.is-fullwidth(v-if="hasZoneScore")
        thead
            tr
                th سال
                th حوزه فعالیت
                th امتیاز
                th وضعیت
                th تاریخ ایجاد
                th عملیات
        tbody
            tr(v-for="zoneScore in zoneScores", :key="zoneScore.id")
                td {{ zoneScore.year }}
                td {{ zoneScore.zonecat.title }}
                td {{ zoneScore.score }}
                td(v-if="zoneScore.is_active")
                    | فعال
                td(v-if="!zoneScore.is_active")
                    | غیر فعال
                td {{ toPersianDate(zoneScore.created_at) }}
                td.function-links.buttons
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.EDIT, zoneScore)"
                    )
                        span.icon.is-small
                            i.material-icons.icon edit
                        span ویرایش
                    a.button.is-primary.is-rounded.is-small(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SHOW, zoneScore)"
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
        @change="loadZoneScores(pagination.current)"
    )
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ListZoneScore",

    components: {},

    props: {
        listUrl: {
            type: String,
            default: "",
        },
    },

    data: () => ({
        ENUMS,
        zoneScores: [],
        zoneScoresCount: 0,
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
        hasZoneScore: (state) => (state.zoneScores || []).length,
    },

    methods: {
        /**
         * Load zoneScores
         */
        loadZoneScores(pageId) {
            let url = this.listUrl.replace("$page$", pageId);
            url = url.replace("$pageSize$", 50);
            AxiosHelper.send("get", url, "").then((res) => {
                console.log(res.data);
                const resData = res.data;
                Vue.set(this, "zoneScores", resData.data.data);
                Vue.set(this, "zoneScoresCount", resData.data.count);
                console.log(this.zoneScores);
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
            let pageCount = Math.ceil(this.zoneScoresCount / 50);
            Vue.set(this, "pageCount", pageCount);
        },
        /**
         * paginator click link
         */
        paginatorClick(id) {
            this.loadZoneScore(id);
        },
        /**
         * add new ZoneScore data to list data
         */
        addToZoneScoreList(payload) {
            console.log(payload);
            const newZoneScoreData = {
                _id: payload._id,
                year: payload.title,
                weight: payload.weight,
                department_category_id: payload.department_category_id,
                references: payload.references,
                is_active: payload.is_active,
                created_at: payload.created_at,
            };

            this.zoneScores.unshift(newZoneScoreData);
        },

        editInZoneScoreList(payload) {
            const editedZoneScoreData = {
                _id: payload.data[0]._id,
                title: payload.data[0].title,
                weight: payload.data[0].weight,
                references: payload.data[0].references,
                is_active: payload.data[0].is_active,
                created_at: payload.data[0].created_at,
            };

            let foundScore = this.zoneScores.findIndex(
                (x) => x._id == editedZoneScoreData._id
            );

            Vue.set(this.zoneScores, foundScore, editedZoneScoreData);
        },
    },
};
</script>
