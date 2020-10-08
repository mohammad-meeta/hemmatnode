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
            label.label نام آموزش
            .control
                input.input(
                    type="text",
                    placeholder="نام آموزش",
                    autofocus,
                    v-model="educationData.title",
                    required
                )
        .field
            label.label برنامه مرتبط
            .control
                .select.is-primary
                    select(v-model="educationData.program_id")
                        option(v-for='(program, programIndex) in programs',
                            :value="program._id") {{ program.title }}
        .field
            label.label روش
            .control
                .select.is-primary
                    select(v-model="educationData.way_id")
                        option(v-for='(way, wayIndex) in ways',
                            :value="way._id") {{ way.name }}

        .field
            label.label سال
            .control
                date-picker(
                    v-model="educationData.date",
                    type="year",
                    display-format="jYYYY",
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
                input(type="checkbox", v-model="educationData.is_active")
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
// const EducationValidator = require("JS-VALIDATORS/education-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterEducation",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        FileUpload,
    },

    data: () => ({
        ENUMS,
        files: [],
        programs: [],
        ways: [],
        deletedOldFiles: [],
        oldFiles: [],
        educationData: {
            title: null,
            program_id: null,
            way_id: null,
            department_id: null,
            date: null,
            files: [],
            deletedOldFiles: [],
            is_active: true,
        },
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
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
        programsUrl: {
            type: String,
            default: null,
        },
        waysUrl: {
            type: String,
            default: null,
        },
        departmentId: {
            type: String,
            default: null,
        },
    },
    created() {
        this.loadPrograms();
        this.loadWays();
        Vue.set(this.educationData, "department_id", this.departmentId);
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
        loadPrograms() {
            const url = this.programsUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "programs", datas);
            });
        },
        /**
         * load all way for select ways in form
         */
        loadWays() {
            const url = this.waysUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "ways", datas);
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
                    this.registerEducation();
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
         * Register new education
         */
        async registerEducation() {
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

            Vue.set(this.educationData, "files", this.files);
            Vue.set(
                this.educationData,
                "deletedOldFiles",
                this.deletedOldFiles
            );
            let educationData = this.educationData;
            educationData.department_id = this.departmentId;
            try {
                const url = this.registerUrl;
                let res = await AxiosHelper.send("post", url, educationData, {
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
         * Validate new education data
         */
        validate() {
            const result = EducationValidator.validate(this.educationData);

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
            const educationData = {
                title: null,
                date: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "educationData", educationData);
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
