<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h3 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ blogData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-value(v-html="blogData.description")
                        pre {{ blogData.description }}
                .info-card-item
                    .info-card-label
                        | فایل های ضمیمه
                        .info-card-value
                            file-download(ref="fileDownload", :old-files="oldFiles")
                .info-card-item
                    time(datetime="blogData.date") {{ toPersianDate(blogData.date) }}
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const FileDownload = require("VUE-COMPONENTS/general/file-download.vue")
    .default;

export default {
    name: "ShowBlog",

    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        blogs: [],
        oldFiles: [],
        blogData: {
            _id: null,
            title: null,
            blog_id: null,
            description: null,
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
                description: data.description,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "blogData", temp);
            Vue.set(this, "oldFiles", data.files);
            this.$refs.fileDownload.updateOldFiles(data.files);
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
        /**
         * To Persian Date
         */
        toPersianDate(date) {
            return DateHelper.toPersianDateLong(date);
        },
    },
};
</script>
