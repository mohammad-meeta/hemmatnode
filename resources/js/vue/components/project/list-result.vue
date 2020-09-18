<template lang="pug">
    .div
        .field
            label.label
                | عنوان
            .control
                input.input(placeholder='عنوان', v-model='result.result')

        .field
            label.label
                | استاندارد
            .control
                input.input(placeholder='استاندارد', v-model='result.standard')

        .field
            label.label
                | هزینه
            .control
                input.input(type='text' ,placeholder='هزینه', v-model='result.cast')

        .field
            label.label
                | تاریخ
            .control
                date-picker(v-model='result.deadline' format="YYYY-MM-DD HH:mm:ss"
                    display-format="jDD/jMM/jYYYY HH:mm" type="datetime" required)

        .field
            label.label
                | فایل
            .control
                file-upload(ref="FileUpload", :old-files="OldFiles")

</template>

<script>
"use strict";
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

export default {
    data: () => ({
        files: [],
        deletedOldFiles: [],
        OldFiles: [],
    }),
    props: {
        result: {
            type: Object,
            default: {},
        },
    },
    components: {
        FileUpload,
        DatePicker: VuePersianDatetimePicker,
    },
};
</script>

<style scoped></style>
