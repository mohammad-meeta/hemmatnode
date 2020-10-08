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
            label.label نام گزارش
            .control
                input.input(
                    type="text",
                    placeholder="نام",
                    v-model="blogData.title",
                    required
                )

        .field
            label.label نوع خبر
            .control
                .select.is-primary
                    select(v-model="blogData.blogtype")
                        option(
                            v-for="(blogtype, blogtypeIndex) in blogtypes",
                            :value="blogtype._id"
                        ) {{ blogtype.title }}

        .field
            label.label سال اجرا
            .control
                date-picker(
                    v-model="blogData.date",
                    display-format="jYYYY",
                    type="year",
                    required
                )

        .field
            label.label توضیح
            .control
                ckeditor(
                    v-model="blogData.description",
                    :upload-url-image="uploadUrlImage",
                    :upload-url-token="uploadUrlToken",
                )

        .field
            .panel
                .panel-heading
                    | فایل های ضمیمه
                .panel-block
                    file-upload(ref="fileUpload", :old-files="oldFiles")
        .field
            label.checkbox
                input(type="checkbox", v-model="blogData.isActive")
                |
                | فعال
            .field.is-grouped
                .control(v-show="! isLoadingMode")
                    a.button.is-link.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SAVE)"
                    )
                        |
                        | ویرایش
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const AxiosHelper = require("JS-HELPERS/axios-helper");
// const BlogValidator = require("JS-VALIDATORS/blog-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;
import CKEditor from "VUE-COMPONENTS/general/ckeditor.vue";

export default {
    name: "EditBlog",
    components: {
        FileUpload,
        DatePicker: VuePersianDatetimePicker,
        Notification,
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
            files: {},
            oldFiles: [],
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
        editUrl: {
            type: String,
            default: "",
        },
        blogTypeUrl: {
            type: String,
            default: null,
        },
    },

    created() {
        this.loadBlogtypes();

        Vue.set(this.blogData, "department_id", this.departmentId);
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
         * Load specific user
         */
        loadBlogData(data) {
            let temp = {
                _id: data._id,
                title: data.title,
                blogtype: data.blogtype,
                date: data.date,
                description: data.description,
                files: data.files,
                isActive: data.is_active,
            };
            Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "blogData", temp);
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
                    this.editBlog();
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
         * Edit blog
         */
        async editBlog() {
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

            let blogData = {
                _id: this.blogData._id,
                title: this.blogData.title,
                blogtype: this.blogData.blogtype,
                date: this.blogData.date,
                description: this.blogData.description,
                is_active: this.blogData.isActive,
                files: this.files,
                oldFiles: this.oldFiles,
                deletedOldFiles: this.deletedOldFiles,
            };

            try {
                const url = this.editUrl.replace("$id$", blogData._id);
                let res = await AxiosHelper.send("patch", url, blogData, {
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
         * Validate
         */
        validate() {
            const result = BlogValidator.validateEdit(this.blogData);

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
    },
};
</script>
