<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ powerData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label عنوان اقدامات توانمندسازی:
                        .info-card-value {{ powerData.title }}
                    .info-card-item
                        .info-card-label اقدامات توانمندسازی:
                        .info-card-value {{ powerData.power_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowPower",

    data: () => ({
        ENUMS,
        powers: [],
        powerData: {
            _id: null,
            title: null,
            power_id: null,
            description: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        powersUrl: {
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
         * Load specific power
         */
        loadPowerData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                power_id: data.power_id,
                date: data.date,
                description: data.description,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "powerData", temp);
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
