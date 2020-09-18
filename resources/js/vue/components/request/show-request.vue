<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")

                .info-card
                    .info-card-title {{ requestData.title }}
                    .info-card-details
                        .info-card-item
                            .info-card-label نام طلب همکاری:
                            .info-card-value {{ requestData.title }}
                    .info-card-details
                        .info-card-item
                            .info-card-label شرح:
                            .info-card-value {{ requestData.description }}
                    .info-card-details
                        .info-card-item
                            .info-card-label تاریخ ثبت:
                            .info-card-value {{ requestData.requestDate }}
                    .info-card-details
                        .info-card-item
                            .info-card-label مهلت اجرا:
                            .info-card-value {{ requestData.deadline }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowRequest",

    data: () => ({
        ENUMS,
        requestData: {
            _id: null,
            title: null,
            description: null,
            departmentId: null,
            requestDate: null,
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
         * Load specific request
         */
        loadRequestData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                description: data.description,
                departmentId: data.department_id,
                requestDate: data.request_date,
                deadline: data.deadline,
                files: {},
                is_active: data.is_active,
            };
            Vue.set(this, "requestData", temp);
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
