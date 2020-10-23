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
    name: "ShowDocument",

    components: {
        FileDownload,
    },

    data: () => ({
        ENUMS,
        documents: [],
        oldFiles: [],
        documentData: {
            _id: null,
            title: null,
            document_id: null,
            category: null,
            files: {},
            is_active: false,
        },
        showLoadingFlag: false,
    }),
    props: {
        documentsUrl: {
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
         * Load specific document
         */
        loadDocumentData(data) {
            console.log(data);
            const temp = {
                _id: data._id,
                title: data.title,
                document_id: data.document_id,
                category: data.category,
                files: {},
                is_active: data.is_active,
            };

            Vue.set(this, "documentData", temp);
            Vue.set(this, "oldFiles", data.resfiles);
            this.$refs.fileDownload.updateOldFiles(data.resfiles);
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
