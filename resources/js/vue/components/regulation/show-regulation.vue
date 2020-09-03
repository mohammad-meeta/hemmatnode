<template lang="pug">
    .container
        .columns
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                .print-form
                    .print-form-head.columns
                        .column.is-3.print-form-logo
                            img(src='/images/logo.png')
                        .column.is-6.print-form-title
                            h2 فرم صورتجلسه
                        .column.is-3.print-form-number
                            span شماره مدرک
                    .print-form-body
                        .print-form-agenda.columns
                            .column.is-6.print-form-title
                                h3 {{ regulationData.agenda }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    name: "ShowRegulation",

    data: () => ({
        ENUMS,
        regulationData: {
            _id: null,
            title: null,
            body: null,
            department_id: null,
            files: {},
            is_active: false
        },
        showLoadingFlag: false
    }),

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * Load specific regulation
         */
        loadRegulationData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                body: data.body,
                department_id: data.department_id,
                files: data.files,
                is_active: data.is_active
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

    }
};
</script>
