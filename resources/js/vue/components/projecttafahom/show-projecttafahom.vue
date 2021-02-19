<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h3 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-title {{ projecttafahomData.title }}
                .info-card-item
                    .info-card-label
                        | تاریخ
                        .info-card-value
                            | {{ toPersianDate(projecttafahomData.date) }}
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
    name: "ShowProjectTafahom",

    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        projecttafahoms: [],
        oldFiles: [],
        projecttafahomData: {
            _id: null,
            title: null,
            date: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        projecttafahomsUrl: {
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
         * Load specific projecttafahom
         */
        loadProjectTafahomData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                date: data.date,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "projecttafahomData", temp);
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
            return DateHelper.toPersianDateShort(date);
        },
    },
};
</script>
