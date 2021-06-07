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
            label.label سال
            .control
                date-picker(
                    v-model="reportData.year",
                    type="year",
                    display-format="jYYYY",
                    format="YYYY",
                    required
                )
        .field
            b-field(label='شاخص')
                b-autocomplete(
                    v-model="title"
                    placeholder="انتخاب شاخص"
                    icon="magnify"
                    :keep-first="keepFirst"
                    :open-on-focus="openOnFocus"
                    :data="filteredDataObj"
                    field="title"
                    @select="option => (selected = option)"
                    :clearable="clearable"
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
                input(type="checkbox", v-model="reportData.is_active")
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

const Buefy = require("buefy").default;
const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
// const ReportValidator = require("JS-VALIDATORS/report-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterReport",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
    },

    data: () => ({
        ENUMS,
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        reportData: {
            department_id: null,
            year: null,
            index_id: null,
            value: null,
            is_active: true,
        },
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        indexs: [],

        title: "",
        keepFirst: false,
        openOnFocus: true,
        selected: null,
        clearable: true,
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },
        year: {
            type: String,
            default: null,
        },
        registerUrl: {
            type: String,
            default: "",
        },
        findReport: {
            type: String,
            default: "",
        },
        indexsUrl: {
            type: String,
            default: "",
        },
    },
    created() {
        this.clearFormData();
        this.loadindexs();
        this.reportData.departmentId = this.departmentId;
    },

    mounted() {
        Vue.set(this.reportData, "department_id", this.departmentId);
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
        filteredDataObj() {
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
         * load all index
         */
        async loadindexs() {
            const url = this.indexsUrl;
            console.log(url);
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "indexs", datas);
        },
        /**
         * find report
         */
        async findReportData(payload) {
            let url = this.findReport
                .replace(/\$year\$/g, payload.year)
                .replace(/\$index\$/g, payload.index);
            let data = await AxiosHelper.send("get", url, "");
            return data;
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
                    this.registerReport();
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
         * Register new report
         */
        async registerReport() {
            // const isValid = this.validate();

            // if (!isValid) {
            //     return;
            // }

            this.showLoading();

            Vue.set(this.reportData, "index_id", this.selected._id);
            Vue.set(this.reportData, "departmentId", this.departmentId);
            let reportData = this.reportData;

            let payload = {
                year: reportData.year,
                index: reportData.index_id,
            };

            const resultFind = await this.findReportData(payload);

            if (!resultFind.data.data.data) {
                try {
                    console.log(reportData);
                    const url = this.registerUrl;
                    let res = await AxiosHelper.send("post", url, reportData, {
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
            } else {
                alert(
                    "این شاخص در این سال تعریف شده است لطفا در صورت نیاز آن را ویرایش کنید"
                );
            }
            this.hideLoading();

            this.clearFormData();
        },

        /**
         * Validate new report data
         */
        validate() {
            const result = ReportValidator.validate(this.reportData);

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
            const reportData = {
                year: null,
                index_id: null,
                value: null,
                is_active: true,
            };

            Vue.set(this, "reportData", reportData);
            Vue.set(this, "selected", null);
        },
    },
};
</script>
