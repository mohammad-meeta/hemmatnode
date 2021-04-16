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
                        .info-card-label وزن:
                        .info-card-value {{ zoneIndexData.weight }}

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
            title: null,
            zone_index_id: null,
            weight: null,
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
        loadHealthData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                zone_index_id: data.zone_index_id,
                weight: data.weight,
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
