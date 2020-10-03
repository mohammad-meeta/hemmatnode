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
                    autofocus,
                    v-model="monitoringTypeData.title",
                    required
                )
        .field
            label.checkbox
                input(type="checkbox", v-model="monitoringTypeData.is_active")
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
const MonitoringTypeValidator = require("JS-VALIDATORS/monitoring-type-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "RegisterMonitoringType",

    components: {
        Notification,
    },

    data: () => ({
        ENUMS,
        monitoringTypeData: {
            title: null,
            is_active: true,
        },
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        registerUrl: {
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
                    this.registerMonitoringType();
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

        /**
         * Register new monitoringType
         */
        async registerMonitoringType() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            const url = this.registerUrl;
            try {
                let res = await AxiosHelper.send(
                    "post",
                    url,
                    this.monitoringTypeData,
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
         * Validate new monitoringType data
         */
        validate() {
            const result = MonitoringTypeValidator.validate(
                this.monitoringTypeData
            );

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
            const monitoringTypeData = {
                title: null,
                is_active: true,
            };

            Vue.set(this, "monitoringTypeData", monitoringTypeData);
        },
    },
};
</script>
