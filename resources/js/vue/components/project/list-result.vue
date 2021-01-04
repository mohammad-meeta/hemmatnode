<template lang="pug">
.div
    .field
        label.label
            | عنوان
        .control
            input.input(placeholder="عنوان", v-model="result.result")

    .field
        label.label
            | استاندارد
        .control
            input.input(placeholder="استاندارد", v-model="result.standard")

    .field
        label.label
            | هزینه
        .control
            input.input(
                type="text",
                placeholder="هزینه",
                v-model="result.cast"
            )

    .field
        label.label
            | تاریخ
        .control
            date-picker(
                v-model="result.deadline",
                format="YYYY-MM-DD",
                display-format="jDD/jMM/jYYYY",
                type="date",
                required
            )

    .field
        label.label
            | فایل
        .control
            file-manager(ref="fileManager", v-model="result.resfiles")
            //- file-upload(ref="FileUpload", :old-files="OldFiles")
</template>

<script>
"use strict";

const FileManager = require("VUE-COMPONENTS/general/file-manager.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

export default {
    props: {
        result: {
            type: Object,
            default: {},
        },
    },

    components: {
        FileManager,
        DatePicker: VuePersianDatetimePicker,
    },

    methods: {
        /**
         * Save
         */
        getFilesData() {
            const deletedFiles = this.$refs.fileManager.getDeletedFiles();
            const newFiles = this.$refs.fileManager.getNewFiles();
        },
    },
};
</script>
