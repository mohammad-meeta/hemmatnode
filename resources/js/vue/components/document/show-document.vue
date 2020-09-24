<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ documentData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label نام اسناد راهبردی:
                        .info-card-value {{ documentData.title }}
                    .info-card-item
                        .info-card-label اسناد راهبردی:
                        .info-card-value {{ documentData.document_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowDocument",

    data: () => ({
        ENUMS,
        documents: [],
        documentData: {
            _id: null,
            title: null,
            document_id: null,
            category: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        documentsUrl: {
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
         * Load specific document
         */
        loadDocumentData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                document_id: data.document_id,
                date: data.date,
                category: data.category,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "documentData", temp);
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
