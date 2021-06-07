<template lang="pug">
.container-parent
    section.hero
        notification(
            :notification-type="notificationType",
            @on-close="closeNotification",
            v-if="showNotification"
        )
            span(v-html="notificationMessage")
        .container.page-header
            .title
                h1 کارنامه
    .columns
        .column.is-12
            b-table(:data="results[0].result", expanded)
                b-table-column(
                    label="نام",
                    v-slot="props",
                )
                    | {{ props.row.name }}
                b-table-column(
                    label="محصول و خدمت سالم",
                    v-slot="props",
                )
                    | {{ props.row.mahsool }}
                b-table-column(
                    label="سلامت کارکنان",
                    v-slot="props",
                )
                    | {{ props.row.salamat }}
                b-table-column(
                    label="اثرات محیط زیست",
                    v-slot="props",
                )
                    | {{ props.row.mohitzist }}
                b-table-column(
                    label="فعالیت های بسترسازی",
                    v-slot="props",
                )
                    | {{ props.row.faaliat }}
                b-table-column(
                    label="نمره سال",
                    v-slot="props",
                )
                    | {{ props.row.nomreh }}
        .column.is-12
            .chart.container
                SimpleLineChart(
                    :Chartdata="monitoringValue"
                    :Chartlabel="montoringLabel"
                    :Label="indicatorData.title"
                    YScaleLabel="سال"
                    height=400
                    :XScaleLabel="indicatorData.unit"
                )

</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const SimpleLineChart = require("VUE-COMPONENTS/charts/line-chart-simple.vue")
    .default;

const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "ZoneScores",

    components: {
        Loading,
        Notification,
        SimpleLineChart,
    },

    data: () => ({
        ENUMS,
        notificationMessage: null,
        notificationType: "is-info",
        selectedYear: "1399",
        results: [
            {
                year: "",
                result: {
                    year: "",
                    name: "",
                    mahsool: null,
                    salamat: null,
                    mohitzist: null,
                    faaliat: null,
                    nomreh: null,
                }
            }
        ]
    }),

    computed: {
        showNotification: (state) => state.notificationMessage != null,
    },

    created() {
        this.init();
    },

    mounted() {

    },

    methods: {

        /**
         * Init method
         */
        init() {
            this.loadData();
        },

        /**
         * Load data
         */
        loadData() {
            let karnamehData= [
                {
                    year: "1398",
                    result: [
                        {
                            year: "1398",
                            name: "محیط زیست",
                            mahsool: 19,
                            salamat: 21.3,
                            mohitzist: 17.5,
                            faaliat: 14.4,
                            nomreh: 72.2,
                        },
                        {
                            year: "1398",
                            name: "آبفای شهری و روستایی",
                            mahsool: 12.3,
                            salamat: 11.5,
                            mohitzist: 13,
                            faaliat: 13,
                            nomreh: 49.8,
                        },
                        {
                            year: "1398",
                            name: "آموزش و پرورش",
                            mahsool: 23,
                            salamat: 20,
                            mohitzist: 12,
                            faaliat: 11,
                            nomreh: 66,
                        },
                        {
                            year: "1398",
                            name: "منابع طبیعی",
                            mahsool: 17,
                            salamat: 23,
                            mohitzist: 11,
                            faaliat: 14,
                            nomreh: 65,
                        },
                    ]
                },
                {
                    year: "1399",
                    result: [
                        {
                            year: "1399",
                            name: "محیط زیست",
                            mahsool: 30,
                            salamat: 30,
                            mohitzist: 20,
                            faaliat: 20,
                            nomreh: 100,
                        },
                        {
                            year: "1399",
                            name: "آبفای شهری و روستایی",
                            mahsool: 15,
                            salamat: 13.5,
                            mohitzist: 14,
                            faaliat: 13,
                            nomreh: 55.5,
                        },
                        {
                            year: "1399",
                            name: "آموزش و پرورش",
                            mahsool: 24.4,
                            salamat: 22,
                            mohitzist: 17,
                            faaliat: 15.3,
                            nomreh: 78.7,
                        },
                        {
                            year: "1399",
                            name: "منابع طبیعی",
                            mahsool: 18,
                            salamat: 24,
                            mohitzist: 12,
                            faaliat: 19,
                            nomreh: 73,
                        },
                    ]
                },
            ];
            let selectedData = karnamehData.filter((x) => x.year == this.selectedYear);
            Vue.set(this, "results" ,selectedData);
        },

        /**
         * Set notification
         */
        setNotification(message, notificationType = "is-info") {
            Vue.set(this, "notificationType", notificationType);
            Vue.set(this, "notificationMessage", message);
        },

        /**
         * Close Notification
         */
        closeNotification() {
            this.setNotification(null);
        },
    },
};
</script>
