<template lang="pug">
    .container
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .page-data-container(v-show="! isLoadingMode")
            .print-form
                .print-form-head
                    table.table.is-fullwidth.is-bordered
                        tbody
                            tr
                                td(colspan="2")
                                    | {{ memorandumData.title }}
                            tr
                                td
                                    label
                                        | نام دستگاه:
                                    | {{ memorandumData.dep.title }}
                                td
                                    label
                                        | دوره زمانی:
                                    | {{ toPersianDate(memorandumData.date, 'YYYY', 'fa') }}
                            tr
                                td(colspan="2")
                                    label
                                        | مقدمه و اهداف تفاهمنامه
                                    | {{ memorandumData.body }}

                    table.table.is-fullwidth.is-bordered
                        thead
                            tr
                                th
                                    | نام پروژه
                                th
                                    | برآمدها
                                th
                                    | بودجه (میلیون ریال)
                                th
                                    | محل تامین
                        tbody
                            tr(v-for="memoData in memorandumData.memoData")
                                td
                                    | {{ memoData.title }}
                                td
                                    table.table.is-fullwidth.is-bordered
                                        tbody
                                            tr(v-for="result in memoData.results")
                                                td
                                                    | {{ result.result }}
                                td
                                    | {{ memoData.budget }}
                                td
                                    | محل تامین

                .column.is-full
                    label شرایط:
                    p {{ memorandumData.conditions }}

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
            dep: {},
            files: {},
            is_active: false,
            memoData: []
        },

        projectData: {},
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
                dep: data.dep,
                files: data.files,
                projects: data.projects,
                is_active: data.is_active,
                memoData: data.memoData,
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
