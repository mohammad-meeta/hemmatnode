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
                    v-model="cityActionData.city_id",
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
                    v-model="cityActionData.date",
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
                input(type="checkbox", v-model="cityActionData.is_active")
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
const CityActionValidator = require("JS-VALIDATORS/city-action-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterCityAction",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        FileUpload,
    },

    data: () => ({
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        cityActionData: {
            title: null,
            city_id: null,
            description: null,
            responsible: null,
            date: null,
            files: [],
            deletedOldFiles: [],
            is_active: true,
        },
        cities: [],
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },
        registerUrl: {
            type: String,
            default: "",
        },
        cityUrl: {
            type: String,
            default: "",
        },
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    /**
     * Created
     */
    created() {
        this.clearFormData();
        this.cityActionData.departmentId = this.departmentId;
        this.loadCities()
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
                    this.registerCityAction();
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
        setNotification(message, notificationType) {
            Vue.set(this, "notificationType", notificationType || "is-info");
            Vue.set(this, "notificationMessage", message);
        },

        /**
         * Close Notification
         */
        closeNotification() {
            this.setNotification(null);
        },

        loadCities() {
            let url = this.cityUrl
                .replace(/\$page\$/g, 1)
                .replace(/\$pageSize\$/g, 1000);
            console.log(url);
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                Vue.set(this, "cities", resData.data.data);
            });
        },

        /**
         * Register new cityAction
         */
        async registerCityAction() {
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

            Vue.set(this.cityActionData, "files", this.files);
            Vue.set(
                this.cityActionData,
                "deletedOldFiles",
                this.deletedOldFiles
            );

            const url = this.registerUrl;

            try {
                let res = await AxiosHelper.send(
                    "post",
                    url,
                    this.cityActionData,
                    {
                        sendAsFormData: true,
                        filesArray: "files",
                    }
                );
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
         * Validate new cityAction data
         */
        validate() {
            const result = CityActionValidator.validate(this.cityActionData);

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
            const cityActionData = {
                title: null,
                description: null,
                responsible: null,
                date: null,
                files: [],
                deletedOldFiles: [],
                is_active: true,
            };

            Vue.set(this, "cityActionData", cityActionData);
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
