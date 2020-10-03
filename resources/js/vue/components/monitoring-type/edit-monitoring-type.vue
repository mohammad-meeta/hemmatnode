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
                input(type="checkbox", v-model="monitoringTypeData.isActive")
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
const MonitoringTypeValidator = require("JS-VALIDATORS/monitoring-type-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "EditMonitoringType",
    components: {
        DatePicker: VuePersianDatetimePicker,
        Notification,
    },

    data: () => ({
        ENUMS,
        monitoringTypeData: {
            title: null,
            department_id: null,
            isActive: false,
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

    /**
     * Created
     */
    created() {
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load specific user
         */
        loadMonitoringTypeData(data) {
            let temp = {
                _id: data._id,
                title: data.title,
                isActive: data.is_active,
            };
            Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "monitoringTypeData", temp);
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
                    this.EditMonitoringType();
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
         * Edit monitoring type
         */
        async EditMonitoringType() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let monitoringTypeData = {
                _id: this.monitoringTypeData._id,
                title: this.monitoringTypeData.title,
                is_active: this.monitoringTypeData.isActive,
            };

            const url = this.editUrl.replace("$id$", monitoringTypeData._id);

            try {
                let res = await AxiosHelper.send(
                    "patch",
                    url,
                    monitoringTypeData,
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
                    ".خطا در ویرایش اقدامات خلاق",
                    "is-danger"
                );
            }

            this.hideLoading();
        },

        /**
         * Validate
         */
        validate() {
            const result = MonitoringTypeValidator.validateEdit(
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

            console.log(error);
            this.setNotification(error, "is-danger");

            return false;
        },
    },
};
</script>
