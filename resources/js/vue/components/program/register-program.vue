<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .fieldset
                legend مشخصات برنامه
                .field
                    label.label نام برنامه
                    .control
                        input.input(type='text', placeholder='نام برنامه', autofocus, v-model='programData.title' required)
            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه
            .field
                label.checkbox
                    input(type='checkbox', v-model="programData.is_active")
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
const ProgramValidator = require("JS-VALIDATORS/program-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "RegisterProgram",

    components: {
        Notification,
    },

    data: () => ({
        ENUMS,
        programData: {
            title: null,
            files: {},
            is_active: true,
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        files: [],
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },
        registerUrl: {
            type: String,
            default: "",
        },
    },
    created() {
        this.programData.departmentId = this.departmentId;
    },

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
                    this.registerProgram();
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
         * Register new program
         */
        registerProgram() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let programData = this.programData;

            programData.files = this.files[0];

            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, programData, {
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
         * Validate new program data
         */
        validate() {
            const result = ProgramValidator.validate(this.programData);

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
