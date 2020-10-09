<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ transportData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label نام انتقال مطالبه:
                        .info-card-value {{ transportData.title }}
                    .info-card-item
                        .info-card-label انتقال مطالبه:
                        .info-card-value {{ transportData.transport_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowTransport",

    data: () => ({
        ENUMS,
        transports: [],
        transportData: {
            _id: null,
            title: null,
            transport_id: null,
            status: null,
            confirm: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        transportsUrl: {
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
         * Load specific transport
         */
        loadTransportData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                transport_id: data.transport_id,
                date: data.date,
                status: data.status,
                confirm: data.confirm,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "transportData", temp);
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
