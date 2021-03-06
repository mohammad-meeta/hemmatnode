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
            b-field(label='دسته')
                b-autocomplete(
                    v-model="title"
                    placeholder="انتخاب دسته"
                    icon="magnify"
                    :keep-first="keepFirst"
                    :open-on-focus="openOnFocus"
                    :data="filteredDataObj"
                    field="title"
                    @select="option => (selected = option)"
                    :clearable="clearable"
                    )
                        template(slot='empty') دسته ای یافت نشد

        .field
            label.label عنوان
            .control
                input.input(
                    type="text",
                    placeholder="عنوان",
                    autofocus,
                    v-model="indicatorData.title",
                    required
                )
        .field
            label.label تعریف
            .control
                textarea.textarea(
                    v-model="indicatorData.description",
                    required
                )
        //- .field
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
                input(type="checkbox", v-model="indicatorData.is_active")
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
const IndicatorValidator = require("JS-VALIDATORS/indicator-register-validator");
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const Buefy = require("buefy").default;

export default {
    name: "RegisterIndicator",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
    },

    data: () => ({
        ENUMS,
        indicatorData: {
            title: null,
            description: null,
            // unit: null,
            is_active: true,
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,

        departments: [],
        title: "",
        keepFirst: false,
        openOnFocus: true,
        selected: null,
        clearable: false,
    }),

    props: {
        registerUrl: {
            type: String,
            default: "",
        },
        listUrlDepartment: {
            type: String,
            default: null,
        },
    },
    created() {
        this.clearFormData();
        this.loadDepartments();
    },

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
        filteredDataObj() {
            return this.departments.filter((option) => {
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
         * load all monitoring type for select monitoring type in form
         */
        async loadDepartments() {
            const url = this.listUrlDepartment;
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;
            Vue.set(this, "departments", datas);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerIndicator();
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
         * Register new indicator
         */
        async registerIndicator() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            Vue.set(this.indicatorData, "department_id", this.selected._id);
            let indicatorData = this.indicatorData;

            try {
                const url = this.registerUrl;
                let res = await AxiosHelper.send("post", url, indicatorData, {
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
         * Validate new indicator data
         */
        validate() {
            const result = IndicatorValidator.validate(this.indicatorData);

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
            const indicatorData = {
                title: null,
                description: null,
                unit: null,
                type_id: null,
                is_active: true,
            };

            Vue.set(this, "indicatorData", indicatorData);
            Vue.set(this, "selected", null);
        },
    },
};
</script>
