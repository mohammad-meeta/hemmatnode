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
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowIndicator",

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
