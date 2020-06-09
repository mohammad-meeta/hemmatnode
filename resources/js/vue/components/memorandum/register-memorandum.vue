<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label
                .control
                    .select.is-primary
                        select(v-model="memorandumData.departments")
                            option(v-for='(department, departmentIndex) in departments',
                                :value="department._id") {{ department.title }}
            .field
                label.label عنوان
                .control
                    input.input(type='text', placeholder='عنوان', v-model='memorandumData.title' required)

            .field
                label.label سال
                .control
                    date-picker(v-model='memorandumData.date' format="YYYY"
                    display-format="jYYYY" type="datetime" required)

            .field
                label.label مقدمه و اهداف تفاهم نامه
                .control
                    textarea.textarea(placeholder='مقدمه', v-model='memorandumData.body')
            fieldset
                legend پروژه ها
                .field
                    multi-text-project(v-model='memorandumData.project')

            .field
                label.label شرایط اجرای تفاهم نامه
                .control
                    textarea.textarea(placeholder='شرایط اجرای تفاهم نامه', v-model='memorandumData.conditions')

            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه

            .field
                label.checkbox
                    input(type='checkbox', v-model="memorandumData.isActive")
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
const MemorandumValidator = require("JS-VALIDATORS/memorandum-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const MultiTextProject = require("VUE-COMPONENTS/memorandum/multi-text-project.vue")
    .default;

module.exports = {
    name: "RegisterMemorandum",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        MultiTextProject
    },

    data: () => ({
        ENUMS,
        departments: [],
        users: [],
        memorandumData: {
            title: null,
            body: null,
            project: [],
            conditions: null,
            date: null,
            department_id: null,
            files: {},
            user_list: {},
            isActive: false
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        files: []
    }),

    props: {
        departmentId: {
            type: String,
            default: null
        },

        registerUrl: {
            type: String,
            default: ""
        },

        departmentsUrl: {
            type: String,
            default: ""
        },

        usersUrl: {
            type: String,
            default: ""
        }
    },

    created() {
        this.loadDepartments();
        this.loadUsers();
    },

    mounted() {
        Vue.set(this.memorandumData, "departments", this.departmentId);
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
                    this.registerMemorandum();
                    break;
            }
        },

        /**
         * load all departments for select departments in form
         */
        loadDepartments() {
            const url = this.departmentsUrl;
            console.log(url);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "departments", datas);
            });
        },

        /**
         * load all users for select user in form
         */
        loadUsers() {
            const url = this.usersUrl;
            console.log(url);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "users", datas);
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
         * Register new memorandum
         */
        registerMemorandum() {
            const isValid = this.validate();
            if (!isValid) {
                return;
            }
            let memorandumData = {
                title: this.memorandumData.title,
                project: JSON.stringify(this.memorandumData.project),
                body: this.memorandumData.body,
                conditions: this.memorandumData.conditions,
                date: this.memorandumData.date,
                department_id: this.memorandumData.departments,
                is_active: this.memorandumData.isActive
            };
            console.log(memorandumData);
            memorandumData.files = this.files[0];

            this.showLoading();

            const url = this.registerUrl;
            console.log(url);
            AxiosHelper.send("post", url, memorandumData, {
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
         * Validate new memorandum data
         */
        validate() {
            const result = MemorandumValidator.validate(this.memorandumData);

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
