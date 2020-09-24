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
                    placeholder="عنوان",
                    autofocus,
                    v-model="documentData.title",
                    required
                )
        .field
            label.label تاریخ
            .control
                date-picker(
                    v-model="documentData.year",
                    format="YYYY-MM-DD HH:mm:ss"
                    display-format="jDD/jMM/jYYYY HH:mm"
                    type="datetime"
                    required
                )
        .field
            b-field(label='دسته بندی')
                b-autocomplete(
                    rounded='',
                    v-model='documentData.category',
                    :data='categories',
                    placeholder='e.g. jQuery',
                    icon='magnify', clearable='',
                    @select='option => selected = option'
                )
                template(slot='empty') دسته بندی مورد نظر وجود ندارد

        .field
            .panel
                .panel-heading
                    | فایل های ضمیمه
                .panel-block
                    file-manager(ref="fileManager", v-model="oldFiles")
        .field
            label.checkbox
                input(type="checkbox", v-model="documentData.is_active")
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
const DocumentValidator = require("JS-VALIDATORS/document-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileManager = require("VUE-COMPONENTS/general/file-manager.vue").default;

export default {
    name: "RegisterDocument",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        FileManager,
    },

    data: () => ({
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        documentData: {
            title: null,
            date: null,
            category: null,
            files: [],
            deletedOldFiles: [],
            is_active: true,
        },
        categories: [
            'اسناد مربوط به کارگروه سلامت و امنیت غذایی',
            'شیوه نامه های کارگروه سلامت و امنیت غذایی'
        ],
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
        this.documentData.departmentId = this.departmentId;
    },

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
                    this.registerDocument();
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
         * Register new document
         */
        async registerDocument() {
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

            Vue.set(this.documentData, "files", this.files);
            Vue.set(this.documentData, "deletedOldFiles", this.deletedOldFiles);

            let documentData = this.documentData;

            try {
                const url = this.registerUrl;
                let res = await AxiosHelper.send("post", url, documentData, {
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
         * Validate new document data
         */
        validate() {
            const result = DocumentValidator.validate(this.documentData);

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
            const documentData = {
                title: null,
                category: null,
                date: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "documentData", documentData);
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
