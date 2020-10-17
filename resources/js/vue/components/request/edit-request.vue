<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label عنوان
                .control
                    input.input(type='text', placeholder='عنوان', v-model='request.title' required)

            .field
                label.label توضیحات
                .control
                    textarea.textarea(placeholder='توضیحات', v-model='request.description')

            .field
                label.label تاریخ
                .control
                    date-picker(v-model='request.request_date' format="YYYY-MM-DD HH:mm:ss"
                    display-format="jDD/jMM/jYYYY HH:mm" type="datetime" required)

            .field
                label.label مهلت اجرا
                .control
                    date-picker(v-model='request.deadline' format="YYYY-MM-DD HH:mm:ss"
                    display-format="jDD/jMM/jYYYY HH:mm" type="datetime" required)

            .field
                .panel
                    .panel-heading
                        | فایل های ضمیمه
                    .panel-block
                        file-upload(ref="fileUpload", :old-files="oldFiles")
            .field
                label.checkbox
                    input(type='checkbox', v-model="request.is_active")
                    |   فعال

                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ویرایش
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
    name: "EditRequest",
    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        FileUpload
    },

    data: () => ({
        ENUMS,
        users: [],
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        request: {
            id: null,
            title: null,
            dep: null,
            description: null,
            request_date: null,
            deadline: null,
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

    created() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {

        /**
         * Load specific invite session
         */
        loadRequestData(data) {
            const temp = {
                id: data._id,
                dep: data.dep.title,
                title: data.title,
                description: data.description,
                request_date: data.request_date,
                deadline: data.deadline,
                files: data.files,
                is_active: data.is_active,
            };
            Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "request", temp);
            this.$refs.fileUpload.updateOldFiles(data.files);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date, format, value) {
            return DateHelper.toPersianDate(date, format, value);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.EditRequest();
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
         * Edit invite session
         */
        async EditRequest() {
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

            let request = {
                _id: this.request.id,
                title: this.request.title,
                department_id: this.departmentId,
                description: this.request.description,
                request_date: this.request.request_date,
                deadline: this.request.deadline,
                is_active: this.request.is_active,
                files: this.files,
                oldFiles: this.oldFiles,
                deletedOldFiles: this.deletedOldFiles,
            };

            this.showLoading();

            try {
                const url = this.editUrl.replace("$id$", request._id);
                let res = await AxiosHelper.send("patch", url, request, {
                    sendAsFormData: true,
                    filesArray: "files",
                });

                const data = res.data;
                this.$emit("on-update", {
                    sender: this,
                    data,
                });
            } catch (err) {
                this.setNotification(".خطا در ویرایش پیوست سلامت", "is-danger");
            }

            this.hideLoading();
        },

        /**
         * Validate invite session data
         */
        validate() {
            const result = RequestValidator.validateEdit(this.request);

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
