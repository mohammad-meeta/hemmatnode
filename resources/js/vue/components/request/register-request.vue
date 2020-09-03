<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .fieldset
                legend مشخصات طلب همکاری
                .field
                    label.label عنوان طلب همکاری
                    .control
                        input.input(type='text', placeholder='عنوان طلب همکاری', autofocus, v-model='requestData.title' required)

                .field
                    label.label شرح
                    .control
                        textarea.textarea(placeholder='شرح', v-model='requestData.description')

                .field
                    label.label تاریخ
                    .control
                        date-picker(v-model='requestData.requestDate' format="YYYY-MM-DD HH:mm:ss"
                        display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)

                .field
                    label.label تاریخ
                    .control
                        date-picker(v-model='requestData.deadline' format="YYYY-MM-DD HH:mm:ss"
                        display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)

                .field
                    label.checkbox
                        input(type='file', @change="setAttachment")
                        |   ضمیمه
                .field
                    label.checkbox
                        input(type='checkbox', v-model="requestData.is_active")
                        |   فعال

                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ایجاد

</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const RequestValidator = require("JS-VALIDATORS/request-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

module.exports = {
    name: "RegisterRequest",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
    },

    data: () => ({
        ENUMS,
        programs: [],
        requestData: {
            title: null,
            description: null,
            departmentId: null,
            requestDate: null,
            deadline: null,
            files: {},
            is_active: false,
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        files: [],
    }),

    props: {
        registerUrl: {
            type: String,
            default: "",
        },
        departmentId: {
            type: String,
            default: "",
        },
    },

    created() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
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
                    this.registerRequest();
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
         * Register new request
         */
        registerRequest() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let requestData = this.requestData;

            requestData.files = this.files[0];
            requestData.departmentId = this.departmentId;

            this.showLoading();

            const url = this.registerUrl;
            console.log(requestData);
            AxiosHelper.send("post", url, requestData, {
                sendAsFormData: true,
            })
                .then((res) => {
                    const data = res.data;
                    if (data.success) {
                        this.$emit("on-register", {
                            sender: this,
                            data,
                        });
                    }
                })
                .catch((err) => {
                    const data = err.response.data;
                    this.setNotification(data, "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new request data
         */
        validate() {
            const result = RequestValidator.validate(this.requestData);

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

<style scoped></style>
