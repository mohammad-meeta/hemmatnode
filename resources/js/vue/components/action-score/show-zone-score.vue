<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ zoneScoreData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label حداکثر امتیاز:
                        .info-card-value {{ zoneScoreData.point }}
                    .info-card-item
                        .info-card-label منبع قضاوت:
                        .info-card-value {{ zoneScoreData.source }}

</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowHealth",

    data: () => ({
        ENUMS,
        zoneScores: [],
        zoneScoreData: {
            _id: null,
            zone_score_id: null,
            title: null,
            point: null,
            source: null,
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
         * Load specific zone scores
         */
        loadZoneScoreData(data) {
            const temp = {
                _id: data._id,
                zone_score_id: data.zone_score_id,
                title: data.title,
                point: data.point,
                source: data.source,
                is_active: data.is_active,
            };

            Vue.set(this, "zoneScoreData", temp);
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
