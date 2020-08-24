<template lang="pug">
    .container
        pre {{ userData }}
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")
        .columns.is-vcentered
            .column.is-full(v-show="isLoadingMode")
                h1 در حال بارگذاری
            .column.is-full.form-small(v-show="! isLoadingMode")
                .field
                    label.label نام کاربری
                    .control
                        input.input(type='text', placeholder='نام کاربری', autofocus, v-model='userData.name' required)
                .field
                    label.label پست الکترونیک
                    .control
                        input.input(type='email', placeholder='پست الکترونیک', v-model='userData.email' required)
                .field
                    label.label گذر واژه
                    .control
                        input.input(type='password', placeholder='گذر واژه', v-model='userData.password' required)
                .field
                    label.label تایید گذر واژه
                    .control
                        input.input(type='password', placeholder='تایید گذر واژه', v-model='userData.password_confirmation' required)
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
                fieldset
                    legend فایل های ضمیمه
                    .field
                        file-upload(ref="fileUpload", :old-files="oldFiles")
                .field
                    label.label
                    .control
                        .select.is-primary
                            select(v-model="userData.role_group_group")
                                option(v-for='(department, departmentIndex) in departments',
                                    :value="department._id") {{ department.title }}
                .field
                    label.checkbox(v-for='(role, roleIndex) in roles')
                        input(type='checkbox', v-model="userData.role_group_role", :value="role._id")
                        |   {{ role.name }}

                .field
                    label.checkbox
                        input(type='checkbox', v-model="userData.isActive")
                        |   فعال
                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ویرایش
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const UserValidator = require("JS-VALIDATORS/user-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

module.exports = {
    name: "EditUser",
    components: {
        Notification,
        FileUpload
    },

    data: () => ({
        ENUMS,
        roles: [],
        files: [],
        deletedOldFiles: [],
        oldFiles: [],
        departments: [],
        userData: {
            name: null,
            password: null,
            email: null,
            firstName: null,
            lastName: null,
            nationCode: null,
            cellphone: null,
            files: [],
            deletedOldFiles: [],
            isActive: false,
            role_group_role: [],
            role_group_group: null
        },
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false
    }),

    props: {
        editUrl: {
            type: String,
            default: ""
        },

        rolesUrl: {
            type: String,
            default: ""
        },

        departmentsUrl: {
            type: String,
            default: ""
        },

        userDatas: {
            role_group_role: [],
            role_group_group: null
            }
    },

    created() {
        this.loadRoles();
    },

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * Load specific user
         */
        loadUserData(data) {
            const temp = {
                _id: data._id,
                name: data.name,
                password: data.password,
                email: data.email,
                firstName: data.profile.first_name,
                lastName: data.profile.last_name,
                nationCode: data.profile.nation_code,
                cellphone: data.cellphone,
                role_group_role: data.role_group_role,
                role_group_group: data.role_group_group,
                files: data.files,
                isActive: data.is_active
            };

Vue.set(this, "oldFiles", data.files);
            Vue.set(this, "userData", temp);

            this.$refs.fileUpload.updateOldFiles(data.files);
        },

        /**
         * load all roles for select roles in form
         */
        loadRoles() {
            //let roles = ["superadmin", "admin", "karmand1"];

            const url = this.rolesUrl;
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "roles", datas);
            });

            //            Vue.set(this.userData, "roles", roles);
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
         * Edit user
         */
        editUser() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let userData = {
                _id: this.userData._id,
                name: this.userData.name,
                password: this.userData.password,
                email: this.userData.email,
                first_name: this.userData.firstName,
                last_name: this.userData.lastName,
                nation_code: this.userData.nationCode,
                cellphone: this.userData.cellphone,
                role_group_role: this.userData.role_group_role,
                role_group_group: this.userData.role_group_group,
                is_active: this.userData.isActive,
                files: this.files,
                deletedOldFiles: this.deletedOldFiles
            };

            let t = Object.keys(userData.roles)
                .filter(key => true == userData.roles[key])
                .map(key => key);

            userData.roles = t;

            const url = this.editUrl.replace("$id$", userData._id);
            AxiosHelper.send("patch", url, userData, {
                sendAsFormData: true,
                filesArray: "files"
            })
                .then(res => {
                    //const data = JSON.parse(res.config.data);
                    const data = res.data;
                    this.$emit("on-update", {
                        sender: this,
                        data
                    });
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
            const result = UserValidator.validateEdit(this.userData);

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
