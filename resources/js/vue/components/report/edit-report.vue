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
            label.label سال اجرا
            .control
                date-picker(
                    v-model="reportData.year",
                    display-format="jYYYY",
                    format="YYYY",
                    type="year",
                    required
                )

        .field
            section
                b-field(label='شاخص')
                    b-autocomplete(
                        v-model='title'
                        disabled=true
                        placeholder='انتخاب شاخص'
                        :data='filteredDataObjEd'
                        :open-on-focus="openOnFocus"
                        field='title'
                        @select='option => (selected = option)'
                        :clearable='clearable'
                    )
                            template(slot='empty') شاخصی یافت نشد

        .field
            label.label مقدار
            .control
                input.input(
                    type="text",
                    placeholder="مقدار",
                    autofocus,
                    v-model="reportData.value",
                    required
                )

        .field
            label.checkbox
                input(type="checkbox", v-model="reportData.isActive")
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
// const ReportValidator = require("JS-VALIDATORS/report-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "EditReport",
    components: {
        DatePicker: VuePersianDatetimePicker,
        Notification,
    },

    data: () => ({
        ENUMS,
        reportData: {
            year: null,
            department_id: null,
            index_id: null,
            value: null,
            isActive: false,
            deletedOldFiles: [],
        },
        indexs: [],

        selectedOption: null,
        title: "",
        keepFirst: false,
        openOnFocus: true,
        selected: null,
        clearable: false,

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        editUrl: {
            type: String,
            default: "",
        },
        indexsUrl: {
            type: String,
            default: "",
        },
        findReport: {
            type: String,
            default: "",
        },
        departmentId: {
            type: String,
            default: null,
        },
    },

    created() {
        Vue.set(this.reportData, "department_id", this.departmentId);
        Promise.all([this.loadIndexs()]);
    },

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
        filteredDataObjEd() {
            return this.indexs.filter((option) => {
                return (
                    option.title
                        .toString()
                        .toLowerCase()
                        .indexOf(this.title.toLowerCase()) >= 0
                );
            });
        },
    },

    methods: {
        /**
         * On Option selected
         */
        onIndexSelected(option) {
            Vue.set(this, "selected", option);
        },

        /**
         * load all monitoring type for select monitoring type in form
         */
        async loadIndexs() {
            const url = this.indexsUrl;

            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "indexs", datas);
        },

        /**
         * Load specific user
         */
        loadReportData(data) {
            let temp = {
                _id: data._id,
                year: data.year,
                index_id: data.kindex._id,
                value: data.value,
                department_id: this.reportData.department_id,
                isActive: data.is_active,
            };
            Vue.set(this, "reportData", temp);
            Vue.set(this, "title", data.kindex.title);
            Vue.set(this, "selected", data.kindex);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.editReport();
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
         * Edit report
         */
        async editReport() {
            // const isValid = this.validate();

            // if (!isValid) {
            //     return;
            // }

            this.showLoading();

            let reportData = {
                _id: this.reportData._id,
                year: this.reportData.year,
                index_id: this.selected._id,
                value: this.reportData.value,
                department_id: this.reportData.department_id,
                is_active: this.reportData.isActive,
            };

            try {
                const url = this.editUrl.replace("$id$", reportData._id);
                let res = await AxiosHelper.send("patch", url, reportData, {
                    sendAsFormData: true,
                    filesArray: "files",
                });

                const data = res.data;
                this.$emit("on-update", {
                    sender: this,
                    data,
                });
            } catch (err) {
                this.setNotification(".خطا در ویرایش گزارش", "is-danger");
            }

            this.hideLoading();
        },

        /**
         * Validate
         */
        validate() {
            const result = ReportValidator.validateEdit(this.reportData);

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
