<template lang="pug">
    .container
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")

                .info-card
                    .info-card-title {{ requestData.title }}

                    .info-card-details
                        .info-card-item
                            .info-card-label شرح:
                            .info-card-value {{ requestData.description }}
                    .info-card-details
                        .info-card-item
                            .info-card-label تاریخ ثبت:
                            .info-card-value {{ toPersianDate(requestData.requestDate) }}
                    .info-card-details
                        .info-card-item
                            .info-card-label مهلت اجرا:
                            .info-card-value {{ toPersianDate(requestData.deadline) }}
                    .info-card-item(v-show="oldFiles.length")
                        .info-card-label
                            | فایل های ضمیمه
                            .info-card-value
                                file-download(ref="fileDownload", :old-files="oldFiles")
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const FileDownload = require("VUE-COMPONENTS/general/file-download.vue").default

export default {
    name: "ShowRequest",

    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        oldFiles: [],
        requestData: {
            _id: null,
            title: null,
            description: null,
            departmentId: null,
            requestDate: null,
            deadline: null,
            files: {},
            is_active: false,
        },

        showLoadingFlag: false,
    }),

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific request
         */
        loadRequestData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                description: data.description,
                departmentId: data.department_id,
                requestDate: data.request_date,
                deadline: data.deadline,
                files: data.files,
                is_active: data.is_active,
            };
            Vue.set(this, "requestData", temp);
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
