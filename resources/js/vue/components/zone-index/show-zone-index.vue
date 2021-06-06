<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ zoneIndexData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label حداکثر امتیاز:
                        .info-card-value {{ zoneIndexData.point }}
                    .info-card-item
                        .info-card-label منبع قضاوت:
                        .info-card-value {{ zoneIndexData.source }}

</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowHealth",

    data: () => ({
        ENUMS,
        zoneIndexs: [],
        zoneIndexData: {
            _id: null,
            zone_index_id: null,
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
         * Load specific zone indexs
         */
        loadZoneIndexData(data) {
            const temp = {
                _id: data._id,
                zone_index_id: data.zone_index_id,
                title: data.title,
                point: data.point,
                source: data.source,
                is_active: data.is_active,
            };

            Vue.set(this, "zoneIndexData", temp);
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
