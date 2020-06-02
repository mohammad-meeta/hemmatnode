<template lang="pug">
    .container
        .columns
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                h2 {{ memorandumData.title }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

module.exports = {
    name: "ShowMemorandum",

    data: () => ({
        ENUMS,
        memorandumData: {
            _id: null,
            body: null,
            conditions: null,
            date: null,
            department_id: null,
            files: {},
            isActive: false
        },
        showLoadingFlag: false
    }),

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * Load specific memorandum
         */
        loadMemorandumData(data) {
            const temp = {
                _id: data._id,
                body: data.body,
                conditions: data.conditions,
                date: data.date,
                department_id: data.department_id,
                files: data.files,
                isActive: data.is_active
            };
            Vue.set(this, "memorandumData", temp);
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
