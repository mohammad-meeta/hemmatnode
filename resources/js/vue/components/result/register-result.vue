<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label برآمد
                .control
                    input.input(type='text', placeholder='برآمد', autofocus, v-model='resultData.result' required)
            .field
                label.label  پروژه
                .control
                    .select.is-primary
                        select(v-model="resultData.project_id")
                            option(v-for='(project, projectIndex) in projects',
                                :value="project._id") {{ project.title }}
            .field
                label.label استاندارد
                .control
                    textarea.textarea(placeholder='استاندارد', v-model='resultData.standard')

            .field
                label.label
                    | هزینه
                    .control
                        input.input(type='text', placeholder='هزینه', autofocus, v-model='resultData.cast' required)
            .field
                label.label مهلت
                .control
                    date-picker(v-model='resultData.deadline' format="YYYY-MM-DD HH:mm:ss"
                    display-format=" jDD/jMM/jYYYY" type="datetime" required)
            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه
            .field
                label.checkbox
                    input(type='checkbox', v-model="resultData.is_active")
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
const ResultValidator = require("JS-VALIDATORS/result-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

module.exports = {
    name: "RegisterResult",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker
    },

    data: () => ({
        ENUMS,
        projects: [],
        resultData: {
            result: null,
            project_id: null,
            standard: null,
            cast: null,
            deadline: null,
            files: [],
            is_active: false
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        files: [],
    }),

    props: {
        registerUrl: {
            type: String,
            default: ""
        },

        projectsUrl: {
            type: String,
            default: ""
        }
    },

    created() {
        this.loadProjects();
    },

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
                    this.registerResult();
                    break;
            }
        },

        /**
         * load all projects for select project in form
         */
        loadProjects() {
            const url = this.projectsUrl;
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "projects", datas);
            });
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
         * Register new result
         */
        registerResult() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            console.log("this.resultData");
            let resultData = this.resultData;

            console.log(resultData);
            resultData.files = this.files[0];

            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, resultData, {
                sendAsFormData: true
            })
                .then(res => {
                    const data = res.data;
                    if (data.success) {
                        this.$emit("on-register", {
                            sender: this,
                            data
                        });
                    }
                })
                .catch(err => {
                    const data = err.response.data;
                    this.setNotification(data, "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new result data
         */
        validate() {
            const result = ResultValidator.validate(this.resultData);

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
