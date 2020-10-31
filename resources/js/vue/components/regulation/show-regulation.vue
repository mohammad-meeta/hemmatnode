<template lang="pug">
.container
    .columns.is-vcentered
        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-full(v-show="! isLoadingMode")
            .info-card
                .info-card-item
                    file-download(ref="fileDownload", :old-files="oldFiles")
</template>
<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const FileDownload = require("VUE-COMPONENTS/general/file-download.vue")
    .default;

export default {
    name: "ShowRegulation",

    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        regulations: [],
        oldFiles: [],
        regulationData: {
            _id: null,
            title: null,
            regulation_id: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        regulationsUrl: {
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
         * Load specific regulation
         */
        loadRegulationData(data) {
            const temp = {
                _id: data._id,
                title: data.title,
                regulation_id: data.regulation_id,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "regulationData", temp);

            Vue.set(this, "oldFiles", data.files);
            this.$refs.fileDownload.updateOldFiles(this.oldFiles);
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
