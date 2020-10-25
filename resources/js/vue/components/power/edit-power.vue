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
                    v-model="powerData.title",
                    required
                )

        .field
            label.label شرح
            .control
                textarea.textarea(
                    placeholder="شرح",
                    v-model="powerData.description",
                    required
                )
        .field
            label.label رضایت از دوره
            .control
                input.input(
                    type="number",
                    placeholder="رضایت از دوره",
                    autofocus,
                    v-model="powerData.satisfaction",
                    required
                )
        .field
            .panel
                .panel-heading
                    | مخاطبین
                .panel-block
                    multi-text-member(v-model="powerData.contacts")
        .field
            label.label میزان افزایش اطلاعات و انگیزه
            .control
                input.input(
                    type="number",
                    placeholder="میزان افزایش اطلاعات و انگیزه",
                    autofocus,
                    v-model="powerData.information",
                    required
                )
        .field
            label.label مدت زمان برگزاری
            .control
                input.input(
                    type="number",
                    placeholder="مدت زمان برگزاری",
                    autofocus,
                    v-model="powerData.duration",
                    required
                )

        .field
            label.label تاریخ
            .control
                date-picker(
                    v-model="powerData.date",
                    format="YYYY-MM-DD"
                    display-format="jDD/jMM/jYYYY"
                    type="date"
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
                input(type="checkbox", v-model="powerData.isActive")
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
import MultiTextMember from "VUE-COMPONENTS/invite-session/multi-text-member.vue";
const Buefy = require("buefy").default;
const AxiosHelper = require("JS-HELPERS/axios-helper");
const PowerValidator = require("JS-VALIDATORS/power-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "EditPower",
    components: {
        FileUpload,
        DatePicker: VuePersianDatetimePicker,
        Notification,
        MultiTextMember,
    },

    data: () => ({
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        powerData: {
            department_id: null,
            title: null,
            date: null,
            duration: null,
            satisfaction: null,
            information: null,
            contacts: [],
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
        editUrl: {
            type: String,
            default: "",
        },
    },

    created() {},

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific user
         */
        loadPowerData(data) {
            let temp = {
                _id: data._id,
                title: data.title,
                duration: data.duration,
                satisfaction: data.satisfaction,
                information: data.information,
                contacts: data.contacts,
                date: data.date,
                description: data.description,
                department_id: this.powerData.department_id,
                files: data.files,
                isActive: data.is_active,
            };
            Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "powerData", temp);
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
                    this.editPower();
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
         * Edit power
         */
        async editPower() {
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

            let powerData = {
                _id: this.powerData._id,
                title: this.powerData.title,
                duration: this.powerData.duration,
                satisfaction: this.powerData.satisfaction,
                information: this.powerData.information,
                contacts: JSON.stringify(this.powerData.contacts),
                date: this.powerData.date,
                description: this.powerData.description,
                department_id: this.powerData.department_id,
                is_active: this.powerData.isActive,
                files: this.files,
                oldFiles: this.oldFiles,
                deletedOldFiles: this.deletedOldFiles,
            };

            try {
                const url = this.editUrl.replace("$id$", powerData._id);
                let res = await AxiosHelper.send("patch", url, powerData, {
                    sendAsFormData: true,
                    filesArray: "files",
                });

                const data = res.data;
                this.$emit("on-update", {
                    sender: this,
                    data,
                });
            } catch (err) {
                this.setNotification(
                    ".خطا در ویرایش اقدامات توانمندسازی",
                    "is-danger"
                );
            }

            this.hideLoading();
        },

        /**
         * Validate
         */
        validate() {
            const result = PowerValidator.validateEdit(this.powerData);

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
