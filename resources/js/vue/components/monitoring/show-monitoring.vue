<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                .info-card
                    .info-card-title {{ monitoringData.monitoring_id }}
                    .info-card-details
                        .info-card-item
                            .info-card-label مقدار:
                            .info-card-value {{ monitoringData.value }}
                        .info-card-item
                            .info-card-label شاخص:
                            .info-card-value {{ monitoringData.monitoring_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowMonitoring",

    data: () => ({
        ENUMS,
        monitorings: [],
        monitoringData: {
            _id: null,
            index_id: null,
            monitoring_id: null,
            value: null,
            date: null,
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        monitoringsUrl: {
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
         * Load specific monitoring
         */
        loadMonitoringData(data) {
            const temp = {
                _id: data._id,
                index_id: data.index_id,
                value: data.value_id,
                date: data.date,
                is_active: data.is_active,
            };

            Vue.set(this, "monitoringData", temp);
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
