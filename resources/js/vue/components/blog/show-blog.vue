<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ blogData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label نام پیوست سلامت:
                        .info-card-value {{ blogData.title }}
                    .info-card-item
                        .info-card-label پیوست سلامت:
                        .info-card-value {{ blogData.blog_id }}
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    name: "ShowBlog",

    data: () => ({
        ENUMS,
        blogs: [],
        blogData: {
            _id: null,
            title: null,
            blog_id: null,
            executor: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        blogsUrl: {
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
         * Load specific blog
         */
        loadBlogData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                blog_id: data.blog_id,
                date: data.date,
                executor: data.executor,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "blogData", temp);
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
