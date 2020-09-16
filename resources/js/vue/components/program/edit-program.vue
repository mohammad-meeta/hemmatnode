<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label نام
                .control
                    input.input(type='text', placeholder='نام', v-model='programData.title' required)

            .field
                label.label سال
                .control
                    date-picker(
                        v-model='programData.date'
                        display-format="jYYYY"
                        type="year"
                        required
                    )

            .field
                .panel
                    .panel-heading
                        | فایل های ضمیمه
                    .panel-block
                        file-upload(ref="fileUpload", :old-files="oldFiles")
            .field
                label.checkbox
                    input(type='checkbox', v-model="programData.isActive")
                    |   فعال
                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ویرایش
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const AxiosHelper = require("JS-HELPERS/axios-helper");
const ProgramValidator = require("JS-VALIDATORS/program-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

module.exports = {
    name: "EditProgram",
    components: {
        FileUpload,
        DatePicker: VuePersianDatetimePicker,
        Notification,
    },

    data: () => ({
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        programData: {
            title: null,
            department_id: null,
            date: null,
            files: {},
            oldFiles: [],
            isActive: false,
            deletedOldFiles: [],
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        editUrl: {
            type: String,
            default: "",
        },

        departmentId: {
            type: String,
            default: null,
        },
    },

    created() {
        Vue.set(this.programData, "department_id", this.departmentId);
    },

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific user
         */
        loadProgramData(data) {
            let temp = {
                _id: data._id,
                title: data.title,
                date: data.date,
                department_id: this.programData.department_id,
                files: data.files,
                isActive: data.is_active,
            };
            Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "programData", temp);
            this.$refs.fileUpload.updateOldFiles(data.files);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.EditProgram();
                    break;
            }
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
         * Set notification
         */
        setNotification(message, notificationType = "is-info") {
            Vue.set(this, "notificationType", notificationType);
            Vue.set(this, "notificationMessage", message);
        },

        /**
         * Close Notification
         */
        closeNotification() {
            this.setNotification(null);
        },

        /**
         * Edit program
         */
        EditProgram() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            const deletedFiles = this.$refs.fileUpload.getDeletedFiles();
            const newFiles = this.$refs.fileUpload.getNewFiles();
            let newUploaded = newFiles.map((x) => x.file);
            Vue.set(this, "files", newUploaded);
            let deleteUploaded = deletedFiles.map((x) => x._id);
            Vue.set(this, "deletedOldFiles", deleteUploaded);
            let programData = {
                _id: this.programData._id,
                title: this.programData.title,
                date: this.programData.date,
                department_id: this.programData.department_id,
                is_active: this.programData.isActive,
                files: this.files,
                oldFiles: this.oldFiles,
                deletedOldFiles: this.deletedOldFiles,
            };
            this.showLoading();
            const url = this.editUrl.replace("$id$", programData._id);
            AxiosHelper.send("patch", url, programData, {
                sendAsFormData: true,
                filesArray: "files",
            })
                .then((res) => {
                    //const data = JSON.parse(res.config.data);
                    const data = res.data;
                    this.$emit("on-update", {
                        sender: this,
                        data,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    this.setNotification(".خطا در ویرایش برنامه", "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate
         */
        validate() {
            const result = ProgramValidator.validateEdit(this.programData);

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map((key) => errors[key].join("\n"))
                .join("</br>");

            console.log(error);
            this.setNotification(error, "is-danger");
            return false;
        },
    },
};
</script>

<style scoped></style>
