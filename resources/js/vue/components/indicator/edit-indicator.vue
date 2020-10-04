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
                    placeholder="نام",
                    v-model="indicatorData.title",
                    required
                )

        .field
            b-field(
                label="دسته بندی شاخص",
            )
                b-select(
                    placeholder="انتخاب دسته بندی شاخص",
                    v-model="indicatorData.type_id",
                )
                    option(
                        v-for="(indicatorType, indicatorTypeIndex) in indicatorTypes",
                        :value="indicatorType._id"
                    ) {{ indicatorType.title }}
        .field
            label.label تعریف
            .control
                textarea.textarea(
                    v-model="indicatorData.description",
                    required
                )
        .field
            label.label واحد
            .control
                input.input(
                    type="text",
                    placeholder="واحد",
                    autofocus,
                    v-model="indicatorData.unit",
                    required
                )
        .field
            label.checkbox
                input(type="checkbox", v-model="indicatorData.isActive")
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
const IndicatorValidator = require("JS-VALIDATORS/indicator-register-validator");
const ENUMS = require("JS-HELPERS/enums");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "EditIndicator",
    components: {
        DatePicker: VuePersianDatetimePicker,
        Notification,
    },

    data: () => ({
        ENUMS,

        indicatorData: {
            title: null,
            type_id: null,
            description: null,
            unit: null,
            isActive: false,
        },

        indicatorTypes: [],
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        editUrl: {
            type: String,
            default: "",
        },
        departmentTypeId: {
            type: String,
            default: "",
        },
    },

    created() {
        this.loadIndicatorTypes;
    },

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {

        /**
         * load all indicator type for select indicator type in form
         */
        async loadIndicatorTypes() {
            const url = this.indicatorTypesUrl;

            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "indicatorTypes", datas);
        },
        /**
         * Load specific user
         */
        loadIndicatorData(data) {
            let temp = {
                _id: data._id,
                title: data.title,
                description: data.description,
                unit: data.unit,
                type_id: this.indicatorData.type_id,
                isActive: data.is_active,
            };
            Vue.set(this, "indicatorData", temp);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.editIndicator();
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
         * Edit indicator
         */
        async editIndicator() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let indicatorData = {
                _id: this.indicatorData._id,
                title: this.indicatorData.title,
                description: this.indicatorData.description,
                unit: this.indicatorData.unit,
                type_id: this.indicatorData.type_id,
                is_active: this.indicatorData.isActive,
            };

            try {
                const url = this.editUrl.replace("$id$", indicatorData._id);
                let res = await AxiosHelper.send("patch", url, indicatorData, {
                    sendAsFormData: true,
                });

                const data = res.data;
                this.$emit("on-update", {
                    sender: this,
                    data,
                });
            } catch (err) {
                this.setNotification(".خطا در ویرایش شاخص", "is-danger");
            }

            this.hideLoading();
        },

        /**
         * Validate
         */
        validate() {
            const result = IndicatorValidator.validateEdit(this.indicatorData);

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
