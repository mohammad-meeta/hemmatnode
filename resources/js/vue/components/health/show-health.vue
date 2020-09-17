<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")

                .info-card
                    .info-card-title {{ programData.title }}
                    .info-card-details
                        .info-card-item
                            .info-card-label نام پیوست سلامت:
                            .info-card-value {{ programData.title }}
                        .info-card-item
                            .info-card-label پیوست سلامت:
                            .info-card-value {{ programData.program_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    name: "ShowProgram",

    data: () => ({
        ENUMS,
        programs: [],
        programData: {
            _id: null,
            title: null,
            program_id: null,
            executor: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        programsUrl: {
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
         * Load specific program
         */
        loadProgramData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                program_id: data.program_id,
                date: data.date,
                executor: data.executor,
                files: {},
                is_active: data.is_active,
            };
            console.log(temp);
            Vue.set(this, "programData", temp);
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
