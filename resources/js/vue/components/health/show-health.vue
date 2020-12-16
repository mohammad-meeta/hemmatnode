<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ healthData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label سال:
                        .info-card-value {{ healthData.date }}
                    .info-card-item
                        .info-card-label مجری:
                        .info-card-value {{ healthData.executor }}
                .info-card-item
                    .info-card-label
                        | فایل های ضمیمه
                        .info-card-value
                            file-download(ref="fileDownload", :old-files="oldFiles")
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const FileDownload = require("VUE-COMPONENTS/general/file-download.vue")
    .default;

export default {
    name: "ShowHealth",
    components: {
        FileDownload,
    },
    data: () => ({
        ENUMS,
        oldFiles: [],
        healths: [],
        healthData: {
            _id: null,
            title: null,
            health_id: null,
            executor: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        healthsUrl: {
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
         * Load specific health
         */
        loadHealthData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                health_id: data.health_id,
                date: data.date,
                executor: data.executor,
                files: data.files,
                is_active: data.is_active,
            };

            Vue.set(this, "healthData", temp);
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
    },
};
</script>
