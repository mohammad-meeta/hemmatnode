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
            label.label نام انتقال مطالبه
            .control
                input.input(
                    type="text",
                    placeholder="نام انتقال مطالبه",
                    autofocus,
                    v-model="transportData.title",
                    required
                )
        .field
            label.label سال
            .control
                date-picker(
                    v-model="transportData.date",
                    type="year",
                    display-format="jYYYY",
                    required
                )
        .field
            b-field(label="وضعیت")
                b-select(placeholder="انتخاب وضعیت",value="1", v-model="transportData.status")
                    option(value="1") به طور كامل مطالبه عملياتي شده
                    option(value="2") موضوع در حال رسيدگي است
                    option(value="3") موضوع توسط مسئول دستگاه رسيدگي نشده است
        .field
            label.checkbox
                input(type="checkbox", v-model="transportData.confirm")
                | تایید
        .field
            .panel
                .panel-heading
                    | فایل های ضمیمه
                .panel-block
                    file-upload(ref="fileUpload", :old-files="oldFiles")
        .field
            label.checkbox
                input(type="checkbox", v-model="transportData.is_active")
                | فعال
        .field.is-grouped
            .control(v-show="! isLoadingMode")
                a.button.is-link.is-rounded(
                    href="#",
                    @click.prevent="commandClick(ENUMS.COMMAND.SAVE)"
                )
                    | ایجاد
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
// const TransportValidator = require("JS-VALIDATORS/transport-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterTransport",

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
        transportData: {
            department_id: null,
            title: null,
            date: null,
            status: null,
            confirm: false,
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
        date: {
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
        this.transportData.departmentId = this.departmentId;
    },

    mounted() {
        Vue.set(this.transportData, "department_id", this.departmentId);
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
                    this.registerTransport();
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
         * Register new transport
         */
        async registerTransport() {
            // const isValid = this.validate();

            // if (!isValid) {
            //     return;
            // }

            this.showLoading();

            const deletedFiles = this.$refs.fileUpload.getDeletedFiles();
            const newFiles = this.$refs.fileUpload.getNewFiles();

            let newUploaded = newFiles.map((x) => x.file);
            Vue.set(this, "files", newUploaded);

            let deleteUploaded = deletedFiles.map((x) => x._id);
            Vue.set(this, "deletedOldFiles", deleteUploaded);

            Vue.set(this.transportData, "files", this.files);
            Vue.set(
                this.transportData,
                "deletedOldFiles",
                this.deletedOldFiles
            );

            let transportData = this.transportData;

            try {
                const url = this.registerUrl;
                let res = await AxiosHelper.send("post", url, transportData, {
                    sendAsFormData: true,
                    filesArray: "files",
                });

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
         * Validate new transport data
         */
        validate() {
            const result = TransportValidator.validate(this.transportData);

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
            const transportData = {
                title: null,
                status: null,
                date: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "transportData", transportData);
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
