<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .fieldset
                legend مشخصات پاسخ به همکاری متقابل
                .field
                    label.label درخواست
                    .control
                        input.input(placeholder='درخواست', disabled ,v-model='value.title')

                .field
                    label.label
                    .control
                        .select.is-primary
                            select(v-model="responseData.departmentId")
                                option(v-for='(department, departmentIndex) in departments',
                                    :value="department._id") {{ department.title }}

                //- .field
                //-     label.label واحد مسئول
                //-     .control
                //-         input.input(placeholder='واحد مسئول', v-model='responseData.departmentId')

                .field
                    label.label عنوان پاسخ به همکاری متقابل
                    .control
                        input.input(type='text', placeholder='عنوان پاسخ به همکاری متقابل', autofocus, v-model='responseData.title' required)

                .field
                    label.label اقدام
                    .control
                        textarea.textarea(placeholder='اقدام', v-model='responseData.action')

                .field
                    label.label مهلت
                    .control
                        date-picker(v-model='responseData.deadline' format="YYYY-MM-DD HH:mm:ss"
                        display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)

                .field
                    label.label نتیجه
                    .control
                        textarea.textarea(placeholder='نتیجه', v-model='responseData.result')

                .field
                    .panel
                        .panel-heading
                            | فایل های ضمیمه
                        .panel-block
                            file-upload(ref="fileUpload", :old-files="oldFiles")
                .field
                    label.checkbox
                        input(type='checkbox', v-model="responseData.is_active")
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
const ResponseValidator = require("JS-VALIDATORS/response-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterResponse",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        FileUpload,
    },

    data: () => ({
        departments: [],
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        responseData: {
            requestId: null,
            departmentId: null,
            title: null,
            action: null,
            deadline: null,
            result: null,
            files: [],
            deletedOldFiles: [],
            is_active: false,
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        departmentsUrl: {
            type: String,
            default: "",
        },

        registerUrl: {
            type: String,
            default: "",
        },
        value: {
            type: Object,
            default: () => {},
        },
    },

    created() {
        this.loadDepartments();
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * load all departments for select departments in form
         */
        loadDepartments() {
            const url = this.departmentsUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "departments", datas);
            });
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerResponse();
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
         * Register new response
         */
        async registerResponse() {
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

            Vue.set(this.responseData, "files", this.files);
            Vue.set(this.responseData, "deletedOldFiles", this.deletedOldFiles);
            let responseData = this.responseData;

            try {
                const url = this.registerUrl;
                let res = await AxiosHelper.send("post", url, responseData, {
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
         * Validate new response data
         */
        validate() {
            const result = ResponseValidator.validate(this.responseData);

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
            const responseData = {
                requestId: null,
                departmentId: null,
                title: null,
                action: null,
                deadline: null,
                result: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "responseData", responseData);
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
