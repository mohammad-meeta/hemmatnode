<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ zoneCatData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label وزن:
                        .info-card-value {{ zoneCatData.weight }}

</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowHealth",
    components: {
        FileDownload,
    },
    data: () => ({
        ENUMS,
        zoneCats: [],
        zoneCatData: {
            _id: null,
            title: null,
            zone_cat_id: null,
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
         * Load specific zone cats
         */
        loadHealthData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                zone_cat_id: data.zone_cat_id,
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
