<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ cityActionData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label نام پیوست سلامت:
                        .info-card-value {{ cityActionData.title }}
                    .info-card-item
                        .info-card-label پیوست سلامت:
                        .info-card-value {{ cityActionData.cityAction_id }}
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowCityAction",

    data: () => ({
        ENUMS,
        cityActions: [],
        cityActionData: {
            _id: null,
            title: null,
            cityAction_id: null,
            responsible: null,
            description: null,
            city: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),

    props: {
        cityActionsUrl: {
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
         * Load specific cityAction
         */
        loadCityActionData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                cityAction_id: data.cityAction_id,
                city: data.city,
                date: data.date,
                description: data.description,
                responsible: data.responsible,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "cityActionData", temp);
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
