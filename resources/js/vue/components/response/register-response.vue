<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .fieldset
                legend مشخصات پاسخ به طلب همکاری

                .field
                    label.label درخواست
                    .control
                        input.input(placeholder='درخواست', v-model='responseData.requestId')

                .field
                    label.label واحد مسئول
                    .control
                        input.input(placeholder='واحد مسئول', v-model='responseData.departmentId')

                .field
                    label.label عنوان پاسخ به طلب همکاری
                    .control
                        input.input(type='text', placeholder='عنوان پاسخ به طلب همکاری', autofocus, v-model='responseData.title' required)

                .field
                    label.label اقدام
                    .control
                        textarea.textarea(placeholder='اقدام', v-model='responseData.action')

                .field
                    label.label مهلت
                    .control
                        date-picker(v-model='responseData.deadline' format="YYYY-MM-DD HH:mm:ss"
                        display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)

                .field
                    label.label نتیجه
                    .control
                        textarea.textarea(placeholder='نتیجه', v-model='responseData.result')

                .field
                    label.checkbox
                        input(type='file', @change="setAttachment")
                        |   ضمیمه
                .field
                    label.checkbox
                        input(type='checkbox', v-model="responseData.isActive")
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
const ResponseValidator = require("JS-VALIDATORS/response-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

module.exports = {
    name: "RegisterResponse",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
    },

    data: () => ({
        ENUMS,
        responseData: {
            requestId: null,
            departmentId: null,
            title: null,
            action: null,
            deadline: null,
            result: null,
            files: {},
            isActive: false,
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
                    this.registerResponse();
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
         * Register new response
         */
        registerResponse() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let responseData = this.responseData;

            responseData.files = this.files[0];

            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, responseData, {
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
         * Validate new response data
         */
        validate() {
            const result = ResponseValidator.validate(this.responseData);

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
