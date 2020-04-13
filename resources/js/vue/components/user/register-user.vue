<template lang="pug">
    .container
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full(v-show="! isLoadingMode")
                .field
                    label.label نام کاربری
                    .control
                        input.input(type='text', placeholder='نام کاربری', autofocus, v-model='userData.name' required)
                .field
                    label.label پست الکترونیک
                    .control
                        input.input(type='email', placeholder='پست الکترونیک', v-model='userData.email' required)
                .field
                    label.label نام
                    .control
                        input.input(type='text', placeholder='نام', v-model='userData.firstName' required)
                .field
                    label.label نام خانوادگی
                    .control
                        input.input(type='text', placeholder='نام خانوادگی', v-model='userData.lastName' required)
                .field
                    label.label کد ملی
                    .control
                        input.input(type='text', placeholder='کد ملی', v-model='userData.nationCode' required)
                .field
                    label.label شماره موبایل
                    .control
                        input.input(type='text', placeholder='شماره موبایل', v-model='userData.cellphone' required)
                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ثبت نام
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-light.is-rounded(href="/")
                            |   انصراف
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const UserValidator = require("JS-VALIDATORS/user-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "RegisterUser",
    components: {
        Notification
    },

    data: () => ({
        ENUMS,
        userData: {
            name: null,
            password: null,
            email: null,
            firstName: null,
            lastName: null,
            nationCode: null,
            cellphone: null
        },
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false
    }),

    props: {
        registerUrl: {
            type: String,
            default: ""
        }
    },

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
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
                    this.registerUser();
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
         * Register new user
         */
        registerUser() {
            const isValid = this.validate();
            if (!isValid) {
                return;
            }

            this.showLoading();

            const url = this.registerUrl;
            AxiosHelper.send("post", url, this.userData)
                .then(res => {
                    const data = res.data;
                    this.setNotification(
                        ".کاربر با موفقیت ذخیره شد",
                        "is-success"
                    );
                    console.log(data);
                })
                .catch(err => {
                    console.error(err);
                    this.setNotification(".خطا در ذخیره کاربر", "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new user data
         */
        validate() {
            const result = UserValidator.validate(this.userData);

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map(key => errors[key].join("\n"))
                .join("</br>");

            console.log(error);
            this.setNotification(error, "is-danger");
            return false;
        }
    }
};
</script>

<style scoped>
</style>
