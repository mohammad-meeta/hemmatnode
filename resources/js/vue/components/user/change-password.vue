<template lang="pug">
    .columns.is-vcentered
        .column.is-9.has-text-left(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .column.is-9(v-show="! isLoadingMode")
            .field
                label.label گذرواژه قدیمی
                .control
                    input.input(type='password', placeholder='گذرواژه قدیمی', autofocus, v-model='userData.oldPassword' required)
            .field
                label.label گذرواژه جدید
                .control
                    input.input(type='password', placeholder='گذرواژه جدید', v-model='userData.password' required)
            .field
                label.label تایید گذرواژه جدید
                .control
                    input.input(type='password', placeholder='نام', v-model='userData.confirmPassword' required)

            .column.is-2(v-show="! isLoadingMode")
                a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                    |   تغییر گذرواژه
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");

export default {
    data: () => ({
        ENUMS,
        userData: {
            name: null,
            password: null
        },
        showLoadingFlag: false
    }),

    props: {
        registerUrl: {
            type: String,
            default: ''
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
            Vue.set(this, 'showLoadingFlag', true);
        },

        /**
         * HideLoading
         */
        hideLoading() {
            Vue.set(this, 'showLoadingFlag', false);
        },

        /**
         * Register new user
         */
        registerUser(){
            const isValid = this.validate();

            if (! isValid){
                return;
            }

            this.showLoading();

            const url = this.registerUrl;
            axios.post(url, this.userData)
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
        validate(){
            /* Validate user data */
            return true;
        }
    }
};
</script>

<style scoped>
</style>
