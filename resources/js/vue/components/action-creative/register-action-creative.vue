<template lang="pug">
.container-child
    notification(
        :notification-type="notificationType",
        @on-close="closeNotification",
        v-if="showNotification"
    )
        span(v-html="notificationMessage")

    .column.is-full(v-show="isLoadingMode")
        h1 در حال بارگذاری

    .form-small(v-show="! isLoadingMode")
        .field
            label.label عنوان
            .control
                input.input(
                    type="text",
                    placeholder="نام گزارش",
                    autofocus,
                    v-model="actionCreativeData.title",
                    required
                )

        .field
            label.label تاریخ
            .control
                date-picker(
                    v-model="actionCreativeData.date"
                    type="datetime"
                    display-format="jDD/jMM/jYYYY HH:mm"
                    format="YYYY-MM-DD HH:mm:ss"
                    required
                )
        .field
            label.label شرح
            .control
                textarea.textarea(
                    placeholder="شرح",
                    v-model="actionCreativeData.description",
                    required
                )
        .field
            label.label دلیل خلاق بودن
            .control
                textarea.textarea(
                    placeholder="دلیل خلاق بودن",
                    v-model="actionCreativeData.reason",
                    required
                )
        .field
            label.label مسئول اقدام
            .control
                input.input(
                    type="text",
                    placeholder="مسئول اقدام",
                    autofocus,
                    v-model="actionCreativeData.responsible",
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
                input(type="checkbox", v-model="actionCreativeData.is_active")
                |
                | فعال
        .field.is-grouped
            .control(v-show="! isLoadingMode")
                a.button.is-link.is-rounded(
                    href="#",
                    @click.prevent="commandClick(ENUMS.COMMAND.SAVE)"
                )
                    |
                    | ایجاد
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const ActionCreativeValidator = require("JS-VALIDATORS/action-creative-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterActionCreative",

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
        actionCreativeData: {
            title: null,
            date: null,
            description: null,
            reason: null,
            responsible: null,
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

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    /**
     * Created
     */
    created() {
        this.clearFormData();
        this.actionCreativeData.departmentId = this.departmentId;
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
                    this.registerActionCreative();
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
        setNotification(message, notificationType) {
            Vue.set(this, "notificationType", notificationType || "is-info");
            Vue.set(this, "notificationMessage", message);
        },

        /**
         * Close Notification
         */
        closeNotification() {
            this.setNotification(null);
        },

        /**
         * Register new actionCreative
         */
        async registerActionCreative() {
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

            Vue.set(this.actionCreativeData, "files", this.files);
            Vue.set(
                this.actionCreativeData,
                "deletedOldFiles",
                this.deletedOldFiles
            );

            const url = this.registerUrl;

            try {
                let res = await AxiosHelper.send(
                    "post",
                    url,
                    this.actionCreativeData,
                    {
                        sendAsFormData: true,
                        filesArray: "files",
                    }
                );
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
            } catch (err) {
                const data = err.response.data;
                this.setNotification(data, "is-danger");
            }

            this.hideLoading();
            this.clearFormData();
        },

        /**
         * Validate new actionCreative data
         */
        validate() {
            const result = ActionCreativeValidator.validate(
                this.actionCreativeData
            );

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map((key) => errors[key].join("\n"))
                .join("</br>");

            this.setNotification(error, "is-danger");
            return false;
        },
        /**
         * clear form data
         */
        clearFormData() {
            const actionCreativeData = {
                title: null,
                date: null,
                description: null,
                reason: null,
                responsible: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "actionCreativeData", actionCreativeData);
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
