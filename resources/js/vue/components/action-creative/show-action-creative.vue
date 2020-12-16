<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ actionCreativeData.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label توضیحات:
                        .info-card-value {{ actionCreativeData.description }}
                .info-card-item
                    .info-card-label دلیل خلاق بودن:
                        .info-card-value {{ actionCreativeData.reason }}
                .info-card-item
                    .info-card-label مسئول اقدام:
                        .info-card-value {{ actionCreativeData.responsible }}
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
    name: "ShowActionCreative",

    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        oldFiles: [],
        actionCreatives: [],
        actionCreativeData: {
            _id: null,
            title: null,
            actionCreative_id: null,
            description: null,
            reason: null,
            responsible: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),

    props: {
        actionCreativesUrl: {
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
         * Load specific actionCreative
         */
        loadActionCreativeData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                actionCreative_id: data.actionCreative_id,
                description: data.description,
                reason: data.reason,
                responsible: data.responsible,
                files: data.files,
                is_active: data.is_active,
            };

            Vue.set(this, "actionCreativeData", temp);
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
