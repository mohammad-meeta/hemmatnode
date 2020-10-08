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
                input(type="checkbox", v-model="monitoringData.is_active")
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
const MonitoringValidator = require("JS-VALIDATORS/monitoring-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "RegisterMonitoring",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
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
        registerUrl: {
            type: String,
            default: "",
        },

        indexsUrl: {
            type: String,
            default: "",
        }
    },
    created() {
        this.clearFormData();
        this.loadindexs();
    },

    mounted() {

    },

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
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerMonitoring();
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
         * Register new monitoring
         */
        async registerMonitoring() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let monitoringData = this.monitoringData;
            try {
                const url = this.registerUrl;
                let res = await AxiosHelper.send("post", url, monitoringData, {
                    sendAsFormData: true,
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
         * Validate new monitoring data
         */
        validate() {
            const result = MonitoringValidator.validate(this.monitoringData);

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
            const monitoringData = {
                index_id: null,
                date: null,
                value: null,
                index: {
                    _id: null,
                    title: null,
                    unit: null
                },
                is_active: true,
            };

            Vue.set(this, "monitoringData", monitoringData);

        },
    },
};
</script>
