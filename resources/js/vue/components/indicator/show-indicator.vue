<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                .info-card
                    .info-card-details
                        .info-card-item
                            .info-card-value {{ indicatorData.description }}
                        .info-card-item
                            .info-card-label واحد:
                            .info-card-value {{ indicatorData.unit }}

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
const SimpleLineChart = require("VUE-COMPONENTS/charts/line-chart-simple.vue")
    .default;
const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowIndicator",

    components: {
        SimpleLineChart,
    },

    data: () => ({
        ENUMS,
        indicators: [],
        indicatorData: {
            _id: null,
            title: null,
            indicator_id: null,
            description: null,
            unit: null,
            is_active: false,
        },
        showLoadingFlag: false,

        monitoringValue: [],
        montoringLabel: [],
    }),
    props: {
        indicatorsUrl: {
            type: String,
            default: "",
        },
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific indicator
         */
        loadIndicatorData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                indicator_id: data.indicator_id,
                description: data.description,
                unit: data.unit,
                is_active: data.is_active,
            };
            const monitoringValues = data.monitoring.map(x => x.value);
            const monitoringDate = data.monitoring.map(x => x.date);
            Vue.set(this, "monitoringValue", monitoringValues);
            Vue.set(this, "montoringLabel", monitoringDate);
            Vue.set(this, "indicatorData", temp);
        },

        /**
         * Show Loading
         */
        showLoading() {
            Vue.set(this, "showLoadingFlag", true);
        },

        /**
         * HideLoading
         */
        hideLoading() {
            Vue.set(this, "showLoadingFlag", false);
        },
    },
};
</script>
