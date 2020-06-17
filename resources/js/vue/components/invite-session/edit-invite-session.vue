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
                        select(v-model="inviteSessionData.departments")
                            option(v-for='(department, departmentIndex) in departments',
                                :value="department._id") {{ department.title }}
            .field
                multi-text(v-model='inviteSessionData.agenda')
            .field
                label.label مکان
                .control
                    input.input(type='text', placeholder='مکان', v-model='inviteSessionData.place' required)

            .field
                label.label تاریخ
                .control
                    date-picker(v-model='inviteSessionData.date' format="YYYY-MM-DD HH:mm:ss"
                    display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)

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

            .field
                label.label مقدمه
                .control
                    textarea.textarea(placeholder='مقدمه', v-model='inviteSessionData.intro')
            fieldset
                legend مصوبات
                .field
                    multi-text-approv(v-model='inviteSessionData.approv')

                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ویرایش
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const InviteSessionValidator = require("JS-VALIDATORS/invite-session-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;
const MultiText = require("VUE-COMPONENTS/general/multi-text.vue").default;
const MultiTextApprov = require("VUE-COMPONENTS/invite-session/multi-text-approv.vue")
    .default;

module.exports = {
    name: "EditInviteSession",
    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
        MultiText,
        MultiTextApprov
    },

    data: () => ({
        ENUMS,
        departments: [],
        users: [],
        inviteSessionData: {
            title: null,
            body: null,
            agenda: [],
            place: null,
            date: null,
            department_id: null,
            files: {},
            user_list: {},
            isActive: false,
            intro: null,
            approv: []
        },
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        editUrl: {
            type: String,
            default: ""
        },

        departmentId: {
            type: String,
            default: null
        },

        departmentsUrl: {
            type: String,
            default: ""
        },

        usersUrl: {
            type: String,
            default: ""
        },

        inviteSessionDatas: {}
    },

    created() {
        this.loadDepartments();
        this.loadUsers();
    },

    mounted() {

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
         * Load specific user
         */
        loadInviteSessionData(data) {
            const temp = {
                _id: data._id,
                dep: data.dep.title,
                body: data.body,
                agenda: data.agenda,
                place: data.place,
                date: data.date,
                department_id: data.department_id,
                files: data.files,
                roles: data.roles,
                user_list: data.user_list,
                isActive: data.is_active
            };

            try {
                temp.agenda = JSON.parse(data.agenda);
            } catch (ex) {
                temp.agenda = [];
            }

            Vue.set(this, "inviteSessionData", temp);
        },

        /**
         * To Persian Date
         */
        toPersianDate(date, format, value) {
            return DateHelper.toPersianDate(date, format, value);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.editUser();
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
         * Edit invite session
         */
        EditInviteSession() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let inviteSessionData = {
                _id: this.inviteSessionData._id,
                body: this.inviteSessionData.body,
                agenda: JSON.stringify(this.inviteSessionData.agenda),
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

            const url = this.editUrl.replace("$id$", inviteSessionData._id);
            AxiosHelper.send("patch", url, inviteSessionData)
                .then(res => {
                    const data = JSON.parse(res.config.data);
                    this.$emit("on-update", {
                        sender: this,
                        data
                    });
                })
                .catch(err => {
                    console.error(err);
                    this.setNotification(".خطا در ذخیره جلسه", "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate invite session data
         */
        validate() {
            const result = InviteSessionValidator.validateEdit(this.inviteSessionData);

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
