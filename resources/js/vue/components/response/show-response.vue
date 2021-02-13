<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")

                .info-card
                    .info-card-title {{ responseData.title }}
                    .info-card-details
                        .info-card-item
                            .info-card-label اقدام:
                            .info-card-value {{ responseData.action }}
                    .info-card-details
                        .info-card-item
                            .info-card-label نتیجه:
                            .info-card-value {{ responseData.result }}
                    .info-card-details
                        .info-card-item
                            .info-card-label مهلت:
                            .info-card-value {{ responseData.deadline }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowResponse",

    data: () => ({
        ENUMS,
        responseData: {
            _id: null,
            title: null,
            action: null,
            result: null,
            departmentId: null,
            requestId: null,
            deadline: null,
            files: {},
            is_active: false,
        },

        showLoadingFlag: false,
    }),

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific response
         */
        loadResponseData(data) {
            console.log(data);
            const temp = {
                _id: data._id,
                title: data.title,
                result: data.result,
                action: data.action,
                departmentId: data.department_id,
                requestId: data.request_id,
                deadline: data.deadline,
                files: {},
                is_active: data.is_active,
            };
            Vue.set(this, "responseData", temp);
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
