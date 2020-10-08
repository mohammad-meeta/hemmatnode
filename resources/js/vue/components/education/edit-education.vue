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
                    placeholder="نام",
                    v-model="educationData.title",
                    required
                )

        .field
            label.label برنامه
            .control
                .select.is-primary
                    select(v-model="educationData.program_id")
                        option(
                            v-for="(program, programIndex) in programs",
                            :value="program._id"
                        ) {{ program.title }}
        .field
            label.label روش
            .control
                .select.is-primary
                    select(v-model="educationData.way_id")
                        option(
                            v-for="(way, wayIndex) in ways",
                            :value="way._id"
                        ) {{ way.name }}

        .field
            label.label سال اجرا
            .control
                date-picker(
                    v-model="educationData.date",
                    display-format="jYYYY",
                    type="year",
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
                input(type="checkbox", v-model="educationData.isActive")
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
// const EducationValidator = require("JS-VALIDATORS/education-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;
import CKEditor from "VUE-COMPONENTS/general/ckeditor.vue";

export default {
    name: "EditEducation",
    components: {
        FileUpload,
        DatePicker: VuePersianDatetimePicker,
        Notification,
    },

    data: () => ({
        ENUMS,
        files: [],
        programs: [],
        ways: [],
        educationtypes: [],
        deletedOldFiles: [],
        oldFiles: [],
        educationData: {
            title: null,
            program_id: null,
            department_id: null,
            way_id: null,
            date: null,
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
        editUrl: {
            type: String,
            default: "",
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
         * load all way
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
         * Load specific user
         */
        loadEducationData(data) {
            const progid = data.program_id;
            let temp = {
                _id: data._id,
                title: data.title,
                program_id: progid,
                way_id: data.way_id,
                date: data.date,
                files: data.files,
                isActive: data.is_active,
            };
            Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "educationData", temp);
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
                    this.editEducation();
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
         * Edit education
         */
        async editEducation() {
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

            let educationData = {
                _id: this.educationData._id,
                title: this.educationData.title,
                program_id: this.educationData.program_id,
                department_id: this.departmentId,
                way_id: this.educationData.way_id,
                date: this.educationData.date,
                is_active: this.educationData.isActive,
                files: this.files,
                oldFiles: this.oldFiles,
                deletedOldFiles: this.deletedOldFiles,
            };

            try {
                const url = this.editUrl.replace("$id$", educationData._id);
                let res = await AxiosHelper.send("patch", url, educationData, {
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
            const result = EducationValidator.validateEdit(this.educationData);

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
