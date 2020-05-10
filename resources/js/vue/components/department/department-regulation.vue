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
                    input.input(type='text', placeholder='عنوان', autofocus, v-model='departmentRegulationData.title' required)
            .field
                label.label توضیحات
                .control
                    textarea.textarea(placeholder='معرفی', v-model='departmentRegulationData.description')

            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه

            .field
                label.checkbox
                    input(type='checkbox', v-model="departmentRegulationData.isActive")
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
const DepartmentRegulationValidator = require("JS-VALIDATORS/department-regulation-register-validator");

module.exports = {
    name: "DepartmentRegulation",

    components: {
        Notification
    },
    data: () => ({
        ENUMS,
        departmentRegulationData: {
            title: null,
            description: null,
            department_id: null,
            files: {},
            isActive: false
        },

        hasNewRegulation: false,
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        files: [],
        departmentId: ""
    }),

    props: {
        departmentRegulationUrl: {
            type: String,
            default: ""
        }
    },

    created() {},

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
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
                    this.DepartmentRegulation();
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
         * Register new department regulation
         */
        DepartmentRegulation() {
            const isValid = this.validate();
            console.log("before isvalid")
            if (!isValid) {
                return;
            }
            console.log("isvalid");
            let departmentRegulationData = {
                title: this.departmentRegulationData.title,
                description: this.departmentRegulationData.description,
                department_id: this.departmentId,
                is_active: this.departmentRegulationData.isActive
            };

            departmentRegulationData.files = this.files[0];

            this.showLoading();
            console.log(departmentRegulationData)
            const url = this.departmentRegulationUrl;
            console.log(url);
            console.log(this.departmentId);
            if (this.departmentId != "") {
                AxiosHelper.send("post", url, departmentRegulationData, {
                    sendAsFormData: true
                })
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
            }
        },

        /**
         * for save regulation set _id from register department
         */
        setDepartmentId(data) {
            console.log("setdepartmentid");
            console.log(data);
            Vue.set(this, "departmentId", data);
        },
        /**
         * Validate new department data
         */
        validate() {
            const result = DepartmentRegulationValidator.validate(this.departmentRegulationData);

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
