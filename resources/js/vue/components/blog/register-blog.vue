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
            label.label نام خبر
            .control
                input.input(
                    type="text",
                    placeholder="نام خبر",
                    autofocus,
                    v-model="blogData.title",
                    required
                )
        .field
            label.label سال
            .control
                date-picker(
                    v-model="blogData.date",
                    type="year",
                    display-format="jYYYY",
                    required
                )
        .field
            label.label توضیح
            .control
                ckeditor(
                    :value="value.title",
                    :upload-url-image="uploadUrlImage",
                    :upload-url-token="uploadUrlToken",
                    @input="setTitle"
                )
        .field
            .panel
                .panel-heading
                    | فایل های ضمیمه
                .panel-block
                    file-upload(ref="fileUpload", :old-files="oldFiles")
        .field
            label.checkbox
                input(type="checkbox", v-model="blogData.is_active")
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
import CKEditor from "VUE-COMPONENTS/general/ckeditor.vue";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
// const BlogValidator = require("JS-VALIDATORS/blog-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterBlog",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        FileUpload,
        ckeditor: CKEditor,
    },

    data: () => ({
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        blogData: {
            department_id: null,
            title: null,
            date: null,
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
        uploadUrlImage: {
            type: String,
        },
        uploadUrlToken: {
            type: String,
        },
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
        value: {
            type: Object,
            default: () => ({}),
        },
    },
    created() {
        this.clearFormData();
        this.blogData.departmentId = this.departmentId;
    },

    mounted() {
        Vue.set(this.blogData, "department_id", this.departmentId);
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Set question title
         */
        setTitle(payload) {
            Vue.set(this.value, "title", payload);
        },

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
                    this.registerBlog();
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
         * Register new blog
         */
        async registerBlog() {
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

            Vue.set(this.blogData, "files", this.files);
            Vue.set(this.blogData, "deletedOldFiles", this.deletedOldFiles);

            let blogData = this.blogData;

            try {
                const url = this.registerUrl;
                let res = await AxiosHelper.send("post", url, blogData, {
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
         * Validate new blog data
         */
        validate() {
            const result = BlogValidator.validate(this.blogData);

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
            const blogData = {
                title: null,
                executor: null,
                date: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "blogData", blogData);
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
