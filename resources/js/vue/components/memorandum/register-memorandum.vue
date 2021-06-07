<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label
                .control
                    .select.is-primary
                        select(v-model="memorandumData.departments" disabled)
                            option(v-for='(department, departmentIndex) in departments',
                                :value="department._id") {{ department.title }}
            .field
                label.label عنوان
                .control
                    input.input(type='text', placeholder='عنوان', v-model='memorandumData.title' required)

            .field
                label.label سال
                .control
                    date-picker(
                        v-model='memorandumData.date'
                        type="year",
                        display-format="jYYYY",
                        format="YYYY",
                        required
                    )

            .field
                label.label مقدمه و اهداف تفاهم نامه
                .control
                    textarea.textarea(placeholder='مقدمه', v-model='memorandumData.body')

            .field
                .panel
                    .panel-heading
                        | پروژه ها
                    .panel-block
                        multi-text-project(v-model='memorandumData.project')

            .field
                label.label شرایط اجرای تفاهم نامه
                .control
                    textarea.textarea(placeholder='شرایط اجرای تفاهم نامه', v-model='memorandumData.conditions')

            .field
                .panel
                    .panel-heading
                        | فایل های ضمیمه
                    .panel-block
                        file-upload(ref="fileUpload", :old-files="oldFiles")

            .field
                label.checkbox
                    input(type='checkbox', v-model="memorandumData.is_active")
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
const MemorandumValidator = require("JS-VALIDATORS/memorandum-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const MultiTextProject = require("VUE-COMPONENTS/memorandum/multi-text-project.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterMemorandum",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        MultiTextProject,
        FileUpload
    },

    data: () => ({
        ENUMS,
        departments: [],
        users: [],
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        memorandumData: {
            title: null,
            body: null,
            project: [],
            conditions: null,
            date: null,
            department_id: null,
            files: {},
            deletedOldFiles: [],
            is_active: false
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false
    }),

    props: {
        departmentId: {
            type: String,
            default: null
        },

        registerUrl: {
            type: String,
            default: ""
        },

        departmentsUrl: {
            type: String,
            default: ""
        },

        usersUrl: {
            type: String,
            default: ""
        }

    },

    created() {
        this.loadDepartments();
        this.loadUsers();
    },

    mounted() {
        Vue.set(this.memorandumData, "departments", this.departmentId);
    },

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
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
                    this.registerMemorandum();
                    break;
            }
        },

        /**
         * load all departments for select departments in form
         */
        loadDepartments() {
            const url = this.departmentsUrl;
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "departments", datas);
            });
        },

        /**
         * load all users for select user in form
         */
        loadUsers() {
            const url = this.usersUrl;
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "users", datas);
            });
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
         * Register new memorandum
         */
        registerMemorandum() {
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
            let memorandumData = {
                title: this.memorandumData.title,
                project: JSON.stringify(this.memorandumData.project),
                body: this.memorandumData.body,
                conditions: this.memorandumData.conditions,
                date: this.memorandumData.date,
                department_id: this.memorandumData.departments,
                is_active: this.memorandumData.is_active,
                files: this.files,
                deletedOldFiles: this.deletedOldFiles,
            };

            this.showLoading();
            const url = this.registerUrl;
           AxiosHelper.send("post", url, memorandumData, {
               sendAsFormData: true,
                filesArray: "files",
            })
                .then((res) => {
                    const data = res.data;

                    if (data.success) {
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
         * Validate new memorandum data
         */
        validate() {
            const result = MemorandumValidator.validate(this.memorandumData);

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map(key => errors[key].join("\n"))
                .join("</br>");

            console.log(error);
            this.setNotification(error, "is-danger");
            return false;
        },

        /**
         * clear form data
         */
        clearFormData() {
            this.memorandumData = {
                title: null,
                body: null,
                project: [],
                conditions: null,
                date: null,
                files: [],
                deletedOldFiles: [],
                is_active: false
            };
            this.files = [];
            this.deletedOldFiles = [];
            this.oldFiles = [];
        }
    }
};
</script>

<style scoped>
</style>
