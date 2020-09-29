<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ regulationData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label نام آئین نامه:
                        .info-card-value {{ regulationData.title }}
                    .info-card-item
                        .info-card-label آئین نامه:
                        .info-card-value {{ regulationData.regulation_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowRegulation",

    data: () => ({
        ENUMS,
        regulations: [],
        regulationData: {
            _id: null,
            title: null,
            regulation_id: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        regulationsUrl: {
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
         * Load specific regulation
         */
        loadRegulationData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                regulation_id: data.regulation_id,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "regulationData", temp);
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
