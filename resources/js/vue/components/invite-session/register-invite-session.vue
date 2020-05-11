<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label گروه
                .control
                    .select.is-primary
                        select(v-model="inviteSessionData.departments")
                            option(v-for='(department, departmentIndex) in departments',
                                :value="department._id") {{ department.title }}

            .field
                label.label دستور جلسه
                .control
                    textarea.textarea(placeholder='دستور جلسه', v-model='inviteSessionData.agenda')
            .field
                label.label مکان
                .control
                    input.input(type='text', placeholder='مکان', v-model='inviteSessionData.place' required)

            .field
                label.label تاریخ
                .control
                    date-picker(v-model='inviteSessionData.date' required)

            .field
                label.label حاضرین جلسه
                .multi-checkboxes
                    label.checkbox.column.is-12(v-for='(user, userIndex) in users')
                        input(type='checkbox', v-model="inviteSessionData.user_list[user._id]", :value="user._id")
                        |   {{ user.name }} - {{ user.profile.first_name }} {{ user.profile.last_name }}

            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه
            .field
                label.label توضیحات
                .control
                    textarea.textarea(placeholder='توضیحات', v-model='inviteSessionData.body')
            .field
                label.checkbox
                    input(type='checkbox', v-model="inviteSessionData.isActive")
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
const InviteSessionValidator = require("JS-VALIDATORS/invite-session-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

module.exports = {
    name: "RegisterInviteSession",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker
    },

    data: () => ({
        ENUMS,
        departments: [],
        users: [],
        inviteSessionData: {
            title: null,
            body: null,
            agenda: null,
            place: null,
            date: null,
            department_id: null,
            files: {},
            user_list: {},
            isActive: false
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
                    this.registerInviteSession();
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
         * Register new invite session
         */
        registerInviteSession() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let inviteSessionData = {
                body: this.inviteSessionData.body,
                agenda: this.inviteSessionData.agenda,
                place: this.inviteSessionData.place,
                date: this.inviteSessionData.date,
                department_id: this.inviteSessionData
                    .departments,
                user_list: this.inviteSessionData.user_list,
                is_active: this.inviteSessionData.isActive
            };

            inviteSessionData.files = this.files[0];
            let t = Object.keys(inviteSessionData.user_list)
            .filter(key => true == inviteSessionData.user_list[key])
            .map(key => key);

            inviteSessionData.user_list = t;
            console.log(inviteSessionData);
            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, inviteSessionData, {
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
         * Validate new invite session data
         */
        validate() {
            const result = InviteSessionValidator.validate(this.inviteSessionData);

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
