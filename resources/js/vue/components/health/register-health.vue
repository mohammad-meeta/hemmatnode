<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label نام گزارش
                .control
                    input.input(type='text', placeholder='نام گزارش', autofocus, v-model='healthData.title' required)
            .field
                label.label سال
                .control
                    date-picker(
                        v-model='healthData.year'
                        type="year"
                        display-format="jYYYY"
                        required
                    )
            .field
                label.label مجری
                .control
                    input.input(type='text', placeholder='مجری', autofocus, v-model='healthData.executor' required)
            .field
                .panel
                    .panel-heading
                        | فایل های ضمیمه
                    .panel-block
                        file-upload(ref="fileUpload", :old-files="oldFiles")
            .field
                label.checkbox
                    input(type='checkbox', v-model="healthData.is_active")
                    |   فعال
            .field.is-grouped
                .control(v-show="! isLoadingMode")
                    a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                        |   ایجاد

</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const HealthValidator = require("JS-VALIDATORS/health-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

module.exports = {
    name: "RegisterHealth",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        FileUpload,
    },

    data: () => ({
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        healthData: {
            title: null,
            year: null,
            executor: null,
            files: [],
            deletedOldFiles: [],
            is_active: true,
        },
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },
        year: {
            type: String,
            default: null,
        },
        registerUrl: {
            type: String,
            default: "",
        },
    },
    created() {
        this.clearFormData();
        this.healthData.departmentId = this.departmentId;
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Set attachments
         */
        setAttachment(sender) {
            const files = sender.target.files;

            Vue.set(this, "files", files);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerHealth();
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
         * Register new health
         */
        registerHealth() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            const deletedFiles = this.$refs.fileUpload.getDeletedFiles();
            const newFiles = this.$refs.fileUpload.getNewFiles();
            let newUploaded = newFiles.map((x) => x.file);
            Vue.set(this, "files", newUploaded);
            let deleteUploaded = deletedFiles.map((x) => x._id);
            Vue.set(this, "deletedOldFiles", deleteUploaded);
            Vue.set(this.healthData, "files", this.files);
            Vue.set(this.healthData, "deletedOldFiles", this.deletedOldFiles);

            let healthData = this.healthData;

            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, healthData, {
                sendAsFormData: true,
                filesArray: "files",
            })
                .then((res) => {
                    const data = res.data;
                    if (data.success) {
                        this.clearFormData();
                        this.$emit("on-register", {
                            sender: this,
                            data: {
                                data: data,
                                dep_title: 0,
                            },
                        });
                    }
                })
                .catch((err) => {
                    const data = err.response.data;
                    this.setNotification(data, "is-danger");
                })
                .then(() => this.hideLoading());
            this.clearFormData();
        },

        /**
         * Validate new health data
         */
        validate() {
            const result = HealthValidator.validate(this.healthData);

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
        /**
         * clear form data
         */
        clearFormData() {
            const healthData = {
                title: null,
                executor: null,
                year: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "healthData", healthData);
            Vue.set(this, "files", []);
            Vue.set(this, "deletedOldFiles", []);
            Vue.set(this, "oldFiles", []);
            this.files = [];
            this.deletedOldFiles = [];
            this.oldFiles = [];
        },
    },
};
</script>

<style scoped></style>
