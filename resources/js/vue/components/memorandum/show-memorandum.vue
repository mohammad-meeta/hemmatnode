<template lang="pug">
    .container
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .page-data-container(v-show="! isLoadingMode")
            .columns.is-multiline
                .column.is-full
                    h1 {{ memorandumData.title }}
                .column.is-full
                    label مقدمه و اهداف تفاهمنامه
                    p {{ memorandumData.body }}
                .column.is-full
                    label دوره زمانی
                    p {{ toPersianDate(memorandumData.date, 'YYYY', 'fa') }}
        .columns.is-multiline(v-show="! isLoadingMode")
            .info-card.column.is-4(v-for="project in memorandumData.projects")
                .info-card-title
                    a(href="#") {{ project.title }}
                .info-card-details
                    .info-card-item
                        .info-card-label بودجه:
                        .info-card-value {{ project.budget }}
                    .info-card-item
                        .info-card-label محل تامین:
                        .info-card-value {{ project.supply }}
                .info-card-box(v-for="result in project.results")
                    a(href="#") {{ result.title }}
            .column.is-full
                label شرایط
                h2 {{ memorandumData.conditions }}

            .info-card.column.is-12
                .info-card-item
                    file-download(ref="fileDownload", :old-files="oldFiles")
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const FileDownload = require("VUE-COMPONENTS/general/file-download.vue")
    .default;

export default {
    name: "ShowMemorandum",
    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        oldFiles: [],
        memorandumData: {
            _id: null,
            title: null,
            body: null,
            conditions: null,
            date: null,
            department_id: null,
            files: {},
            is_active: false
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
                title: data.title,
                body: data.body,
                conditions: data.conditions,
                date: data.date,
                department_id: data.department_id,
                files: data.files,
                projects: data.projects,
                is_active: data.is_active
            };
            Vue.set(this, "memorandumData", temp);
            Vue.set(this, "oldFiles", data.files);
            this.$refs.fileDownload.updateOldFiles(this.oldFiles);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date, format, value) {
            return DateHelper.toPersianDate(date, format, value);
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
