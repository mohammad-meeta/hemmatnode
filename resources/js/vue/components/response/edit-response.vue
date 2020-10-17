<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
                .field
                    label.label درخواست
                    .control
                        input.input(placeholder='درخواست' disabled, v-model='request')

                .field
                    label.label واحد مسئول
                    .control
                        input.input(placeholder='واحد مسئول' disabled, v-model='department')

                .field
                    label.label عنوان پاسخ به همکاری متقابل
                    .control
                        input.input(type='text', placeholder='عنوان پاسخ به همکاری متقابل', autofocus, v-model='responseData.title' required)

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
                        input(type='checkbox', v-model="responseData.is_active")
                        |   فعال

                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ویرایش
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const ResponseValidator = require("JS-VALIDATORS/response-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

export default {
    name: "EditResponse",
    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
    },

    data: () => ({
        ENUMS,
        users: [],
        responseData: {
            _id: null,
            requestId: null,
            departmentId: null,
            title: null,
            action: null,
            deadline: null,
            result: null,
            files: {},
            is_active: false,
        },
        department: null,
        request: null,
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
         * Load specific invite session
         */
        loadResponseData(data) {
            console.log(data);
            const temp = {
                _id: data._id,
                title: data.title,
                result: data.result,
                action: data.action,
                departmentId: data.dep._id,
                requestId: data.request_id,
                deadline: data.deadline,
                files: {},
                is_active: data.is_active,
            };
            Vue.set(this, "department", data.dep.title);
            Vue.set(this, "request", data.req.title);

            Vue.set(this, "responseData", temp);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date, format, value) {
            return DateHelper.toPersianDate(date, format, value);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.EditResponse();
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
         * Edit invite session
         */
        EditResponse() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let response = {
                _id: this.responseData._id,
                title: this.responseData.title,
                action: this.responseData.action,
                department_id: this.responseData.departmentId,
                request_id: this.responseData.requestId,
                deadline: this.responseData.deadline,
                result: this.responseData.result,
                is_active: this.responseData.is_active,
            };
            response.files = this.files;

            this.showLoading();

            const url = this.editUrl.replace("$id$", response._id);

            AxiosHelper.send("patch", url, response)
                .then((res) => {
                    const data = JSON.parse(res.config.data);
                    this.$emit("on-update", {
                        sender: this,
                        data,
                    });
                })
                .catch((err) => {
                    console.error(err);
                    this.setNotification(".خطا در ذخیره جلسه", "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate invite session data
         */
        validate() {
            const result = ResponseValidator.validateEdit(this.responseData);

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
