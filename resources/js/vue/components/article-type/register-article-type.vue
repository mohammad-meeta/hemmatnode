<template lang="pug">
    .container
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")
        .columns.is-vcentered
            .column.is-9.has-text-left(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-9(v-show="! isLoadingMode")
                .field
                    label.label عنوان
                    .control
                        input.input(type='text', placeholder='عنوان', autofocus, v-model='articleType.name' required)
                .column.is-2(v-show="! isLoadingMode")
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                        |   ثبت نام
                .column.is-2(v-show="! isLoadingMode")
                    a.button.is-fullwidth.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                        |   انصراف
</template>

<script>
"use strict";

const ENUMS = require("JS-HELPERS/enums");
const Validator = require("validatorjs");
const ArticleTypeValidator = require("JS-VALIDATORS/article-type-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "RegisterArticleType",
    components: {
        Notification
    },

    data: () => ({
        ENUMS,
        articleTypeData: {
            title: null,
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
                    this.registerArticleType();
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
         * Register new article type
         */
        registerArticleType() {
            const isValid = this.validate();
            if (!isValid) {
                return;
            }

            this.showLoading();

            const url = this.registerUrl;
            axios
                .post(url, this.articleTypeData)
                .then(res => {
                    const data = res.data;
                    this.setNotification(".نوع مطلب با موفقیت ذخیره شد", "is-success");
                    console.log(data);
                })
                .catch(err => {
                    console.error(err);
                    this.setNotification(".خطا در ذخیره نوع مطلب", "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new article type data
         */
        validate() {
            const result = ArticleTypeValidator.validate(this.articleTypeData);

            if (result.passes) {
                this.closeNotification()
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
