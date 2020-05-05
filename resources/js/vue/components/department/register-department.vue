<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label عنوان
                .control
                    input.input(type='text', placeholder='عنوان', autofocus, v-model='departmentData.title' required)
            .field
                label.checkbox
                    input(type='checkbox', v-model="departmentData.isActive")
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
const DepartmentValidator = require("JS-VALIDATORS/department-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "RegisterDepartment",

    components: {
        Notification
    },

    data: () => ({
        ENUMS,
        departmentData: {
            title: null,
            isActive: false
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

    created() {

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
                    this.registerDepartment();
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
         * Register new department
         */
        registerDepartment() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            let departmentData = {
                title: this.departmentData.title,
                is_active: this.departmentData.isActive
            };

            this.showLoading();

            const url = this.registerUrl;
            console.log(url);
            AxiosHelper.send("post", url, departmentData)
                .then(res => {
                    const data = res.data;
                    this.$emit("on-register", {
                        sender: this,
                        data
                    });
                })
                .catch(err => {
                    const data = err.response.data;
                    this.setNotification(data, "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new department data
         */
        validate() {
            const result = DepartmentValidator.validate(this.departmentData);

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
