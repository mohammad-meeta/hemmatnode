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
            b-field(
                label="شهرستان",
            )
                b-select(
                    placeholder="انتخاب شهرستان",
                )
                    option(
                        v-for="city in cities"
                        :value="city._id"
                        :key="city._id"
                    )
                        | {{ city.name }}
        .field
            label.label عنوان
            .control
                input.input(
                    type="text",
                    placeholder="عنوان",
                    autofocus,
                    v-model="cityActionData.title",
                    required
                )

        .field
            label.label شرح
            .control
                textarea.textarea(
                    placeholder="شرح",
                    v-model="cityActionData.description",
                    required
                )

        .field
            label.label مسئول اقدام
            .control
                input.input(
                    type="text",
                    placeholder="مسئول اقدام",
                    autofocus,
                    v-model="cityActionData.responsible",
                    required
                )

        .field
            label.label تاریخ
            .control
                date-picker(
                    v-model="documentData.date",
                    format="YYYY-MM-DD HH:mm:ss"
                    display-format="jDD/jMM/jYYYY HH:mm"
                    type="datetime"
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
                input(type="checkbox", v-model="cityActionData.isActive")
                | فعال

            .field.is-grouped
                .control(v-show="! isLoadingMode")
                    a.button.is-link.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SAVE)"
                    )
                        | ویرایش
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const AxiosHelper = require("JS-HELPERS/axios-helper");
const CityActionValidator = require("JS-VALIDATORS/city-action-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "EditCityAction",
    components: {
        FileUpload,
        DatePicker: VuePersianDatetimePicker,
        Notification,
    },

    data: () => ({
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        cityActionData: {
            title: null,
            city: null,
            department_id: null,
            description: null,
            date: null,
            responsible: null,
            files: {},
            oldFiles: [],
            isActive: false,
            deletedOldFiles: [],
        },
        cities: [],
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        editUrl: {
            type: String,
            default: "",
        },

        departmentId: {
            type: String,
            default: null,
        },

        cityUrl: {
            type: String,
            default: "",
        },
    },

    /**
     * Created
     */
    created() {
        Vue.set(this.cityActionData, "department_id", this.departmentId);
        this.loadCities();
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific user
         */
        loadCityActionData(data) {
            let temp = {
                _id: data._id,
                title: data.title,
                city:  data.city,
                description: data.description,
                date: data.reason,
                responsible: data.responsible,
                department_id: data.department_id,
                files: data.files,
                isActive: data.is_active,
            };
            Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "cityActionData", temp);
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
                    this.EditCityAction();
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

        loadCities() {
            let url = this.listUrl
                .replace(/\$page\$/g, 1)
                .replace(/\$pageSize\$/g, 1000);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "cities", resData.data.data);
            });
        },

        /**
         * Edit city action
         */
        async EditCityAction() {
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

            let cityActionData = {
                _id: this.cityActionData._id,
                title: this.cityActionData.title,
                description: this.cityActionData.description,
                date: this.cityActionData.date,
                responsible: this.cityActionData.responsible,
                is_active: this.cityActionData.isActive,
                files: this.files,
                oldFiles: this.oldFiles,
                deletedOldFiles: this.deletedOldFiles,
            };

            const url = this.editUrl.replace("$id$", cityActionData._id);

            try {
                let res = await AxiosHelper.send(
                    "patch",
                    url,
                    cityActionData,
                    {
                        sendAsFormData: true,
                        filesArray: "files",
                    }
                );

                const data = res.data;

                this.$emit("on-update", {
                    sender: this,
                    data,
                });
            } catch (err) {
                console.error(err);
                this.setNotification(
                    ".خطا در ویرایش اقدامات متناظر شهرستان",
                    "is-danger"
                );
            }

            this.hideLoading();
        },

        /**
         * Validate
         */
        validate() {
            const result = CityActionValidator.validateEdit(
                this.cityActionData
            );

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
    },
};
</script>
