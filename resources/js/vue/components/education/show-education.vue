<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ educationData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label نام آموزش:
                        .info-card-value {{ educationData.title }}
                    .info-card-item
                        .info-card-label آموزش:
                        .info-card-value {{ educationData.education_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowBlog",

    data: () => ({
        ENUMS,
        educations: [],
        educationData: {
            _id: null,
            title: null,
            program_id: null,
            way_id: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        educationsUrl: {
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
         * Load specific education
         */
        loadBlogData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                program_id: data.program_id,
                way_id: data.way_id,
                date: data.date,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "educationData", temp);
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
