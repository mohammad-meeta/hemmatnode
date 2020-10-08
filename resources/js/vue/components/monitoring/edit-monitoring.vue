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
                label="شاخص",
            )
                b-select(
                    placeholder="انتخاب شاخص",
                    v-model="monitoringData.index_id",
                )
                    option(
                        v-for="(index, indexIndex) in indexs",
                        :value="index._id"
                    ) {{ index.title }}

        .field
            label.label مقدار
            .control
                input.input(
                    type="number",
                    placeholder="مقدار",
                    autofocus,
                    v-model="monitoringData.value",
                    required
                )
        .field
            label.label تاریخ
            .control
                date-picker(
                    v-model='monitoringData.date'
                    type="year-month"
                    required
                )
        .field
            label.checkbox
                input(type="checkbox", v-model="monitoringData.isActive")
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
const MonitoringValidator = require("JS-VALIDATORS/monitoring-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "EditMonitoring",
    components: {
        DatePicker: VuePersianDatetimePicker,
        Notification,
    },

    data: () => ({
        ENUMS,
        monitoringData: {
            date: null,
            index_id: null,
            value: null,
            index: {
                _id: null,
                title: null,
                unit: null
            },
            unit: null,
        },

        indexs: [],
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
        }
    },

    created() {
        this.loadindexs();
    },

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {

        /**
         * load all monitoring type for select monitoring type in form
         */
        async loadindexs() {
            const url = this.indexsUrl;

            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "indexs", datas);
        },
        /**
         * Load specific user
         */
        loadMonitoringData(data) {
            let temp = {
                _id: data._id,
                index_id: data.index_id,
                value: data.value,
                date: data.date,
                index: {
                    _id: data.index._id,
                    title: data.index.title,
                    unit: data.index.unit
                },
                isActive: data.is_active,
            };
            Vue.set(this, "monitoringData", temp);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.editMonitoring();
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
         * Edit monitoring
         */
        async editMonitoring() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let monitoringData = {
                _id: this.monitoringData._id,
                index_id: this.monitoringData.index_id,
                value: this.monitoringData.value,
                date: this.monitoringData.date,
                index: {
                    _id: this.monitoringData.index._id,
                    title: this.monitoringData.index.title,
                    unit: this.monitoringData.index.unit,
                },
                is_active: this.monitoringData.isActive,
            };

            try {
                const url = this.editUrl.replace("$id$", monitoringData._id);
                let res = await AxiosHelper.send("patch", url, monitoringData, {
                    sendAsFormData: true,
                });

                const data = res.data;
                this.$emit("on-update", {
                    sender: this,
                    data,
                });
            } catch (err) {
                this.setNotification(".خطا در ویرایش دیدبانی سلامت", "is-danger");
            }

            this.hideLoading();
        },

        /**
         * Validate
         */
        validate() {
            const result = MonitoringValidator.validateEdit(this.monitoringData);

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
