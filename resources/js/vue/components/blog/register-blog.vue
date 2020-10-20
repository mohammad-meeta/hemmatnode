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
                    v-model="blogData.title",
                    required
                )
        .field
            label.label نوع خبر
            .control
                .select.is-primary
                    select(v-model="blogData.blogtype")
                        option(v-for='(blogtype, blogtypeIndex) in blogtypes',
                            :value="blogtype._id") {{ blogtype.title }}

        .field
            label.label تاریخ
            .control
                date-picker(
                    v-model="blogData.date"
                    type="datetime"
                    display-format="jDD/jMM/jYYYY HH:mm"
                    format="YYYY-MM-DD HH:mm:ss"
                    required
                )
        .field
            label.label توضیح
            .control
                ckeditor(
                    v-model="blogData.description",
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
        blogtypes: [],
        deletedOldFiles: [],
        oldFiles: [],
        blogData: {
            title: null,
            blogtype: null,
            date: null,
            description: null,
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
        blogTypeUrl: {
            type: String,
            default: null,
        },
    },
    created() {
        this.loadBlogtypes();

        this.clearFormData();
    },

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * load all programs for select programs in form
         */
        loadBlogtypes() {
            const url = this.blogTypeUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "blogtypes", datas);
            });
        },

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
                description: "",
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
