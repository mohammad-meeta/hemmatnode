<template lang="pug">
    .container
        .notification.is-danger
            button.delete
            | dfdd
        .columns.is-vcentered
            .column.is-9.has-text-left(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-9(v-show="! isLoadingMode")
                .field
                    label.label نام کاربری
                    .control
                        input.input(type='text', placeholder='نام کاربری', autofocus, v-model='userData.name' required)
                .field
                    label.label پست الکترونیک
                    .control
                        input.input(type='email', placeholder='پست اکترونیک', v-model='userData.email' required)
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
                        input.input(type='number', placeholder='کد ملی', v-model='userData.nationCode' required)
                .field
                    label.label شماره موبایل
                    .control
                        input.input(type='number', placeholder='شماره موبایل', v-model='userData.cellphone' required)
                .column.is-2(v-show="! isLoadingMode")
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                        |   ثبت نام
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const Validator = require("validatorjs");
const UserValidator = require("JS-VALIDATORS/user-register-validator");

module.exports = {
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
        showLoadingFlag: false
    }),

    props: {
        registerUrl: {
            type: String,
            default: ""
        }
    },

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true
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
         * Register new user
         */
        registerUser() {
            const isValid = this.validate();
            if (!isValid) {
                return;
            }

            this.showLoading();

            const url = this.registerUrl;
            axios
                .post(url, this.userData)
                .then(res => {
                    const data = res.data;

                    console.log(data);
                })
                .catch(err => {
                    console.error(err);
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new user data
         */
        validate() {
            const result = UserValidator.validate(this.userData);

            if (result.passes) {
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map(key => errors[key].join("\n"))
                .join("\n");

            console.log(error);

            return false;
        }
    }
};
</script>

<style scoped>
</style>
