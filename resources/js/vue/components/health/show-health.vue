<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ healthData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label نام پیوست سلامت:
                        .info-card-value {{ healthData.title }}
                    .info-card-item
                        .info-card-label پیوست سلامت:
                        .info-card-value {{ healthData.health_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowHealth",

    data: () => ({
        ENUMS,
        healths: [],
        healthData: {
            _id: null,
            title: null,
            health_id: null,
            executor: null,
            year: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        healthsUrl: {
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
         * Load specific health
         */
        loadHealthData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                health_id: data.health_id,
                year: data.year,
                executor: data.executor,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "healthData", temp);
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
