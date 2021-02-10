<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .fieldset
                legend مشخصات همکاری متقابل
                .field
                    label.label عنوان همکاری متقابل
                    .control
                        input.input(type='text', placeholder='عنوان همکاری متقابل', autofocus, v-model='requestData.title' required)

                .field
                    label.label شرح
                    .control
                        textarea.textarea(placeholder='شرح', v-model='requestData.description')

                .field
                    label.label تاریخ
                    .control
                        date-picker(v-model='requestData.requestDate' format="YYYY-MM-DD HH:mm:ss"
                        display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)

                .field
                    label.label مهلت اجرا
                    .control
                        date-picker(v-model='requestData.deadline' format="YYYY-MM-DD HH:mm:ss"
                        display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)

                .field
                    .panel
                        .panel-heading
                            | فایل های ضمیمه
                        .panel-block
                            file-upload(ref="fileUpload", :old-files="oldFiles")
                .field
                    label.checkbox
                        input(type='checkbox', v-model="requestData.is_active")
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
const RequestValidator = require("JS-VALIDATORS/request-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterRequest",

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
        programs: [],
        requestData: {
            title: null,
            description: null,
            departmentId: null,
            requestDate: null,
            deadline: null,
            files: [],
            deletedOldFiles: [],
            is_active: false,
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        registerUrl: {
            type: String,
            default: "",
        },
        departmentId: {
            type: String,
            default: "",
        },
    },

    created() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerRequest();
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
         * Register new request
         */
        async registerRequest() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let requestData = this.requestData;

            requestData.departmentId = this.departmentId;

            this.showLoading();
            const deletedFiles = this.$refs.fileUpload.getDeletedFiles();
            const newFiles = this.$refs.fileUpload.getNewFiles();

            let newUploaded = newFiles.map((x) => x.file);
            Vue.set(this, "files", newUploaded);

            let deleteUploaded = deletedFiles.map((x) => x._id);
            Vue.set(this, "deletedOldFiles", deleteUploaded);

            Vue.set(this.requestData, "files", this.files);
            Vue.set(this.requestData, "deletedOldFiles", this.deletedOldFiles);

            try {
                const url = this.registerUrl;

                let res = await AxiosHelper.send("post", url, requestData, {
                    sendAsFormData: true,
                    filesArray: "files",
                });

                const data = res.data[0];
                if (data) {
                    this.clearFormData();
                    this.$emit("on-register", {
                        sender: this,
                        data: {
                            data: data,
                            dep_title: 0,
                        },
                    });
                }
            } catch (err) {
                const data = err.response.data;
                this.setNotification(data, "is-danger");
            }
            this.hideLoading();
            this.clearFormData();
        },

        /**
         * Validate new request data
         */
        validate() {
            const result = RequestValidator.validate(this.requestData);

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
            const requestData = {
                title: null,
                description: null,
                departmentId: null,
                requestDate: null,
                deadline: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "requestData", requestData);
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
