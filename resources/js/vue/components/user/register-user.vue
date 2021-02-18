<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
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
                div(v-if='!image')
                    label.label عکس
                    .control
                        input.input(type='file' accept='image/png, image/jpeg' @change="onFileChange")
                div(v-else='')
                    img(:src='image' )
                    br
                    button(@click='removeImage') حذف عکس

            .field
                label.label شماره موبایل
                .control
                    input.input(type='text', placeholder='شماره موبایل', v-model='userData.cellphone' required)
            fieldset
                legend فایل های ضمیمه
                .field
                    file-upload(ref="fileUpload", :old-files="oldFiles")
            b-field
                b-select(
                    multiple,
                    v-model="userData.role_group_group"
                    )
                    option(v-for='(department, departmentIndex) in departments',
                        :value="department._id") {{ department.title }}
            .field
                label.checkbox(v-for='(role, roleIndex) in roles')
                    input(type='checkbox',:name="role._id" v-model="userData.role_group_role", :value="role._id")
                    |   {{ role.name }}
            .field
                label.checkbox
                    input(type='checkbox', v-model="userData.is_active")
                    |   فعال
            .field.is-grouped
                .control(v-show="! isLoadingMode")
                    a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                        |   ثبت نام
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const UserValidator = require("JS-VALIDATORS/user-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "RegisterUser",

    components: {
        Notification,
        FileUpload,
    },

    data: () => ({
        ENUMS,
        roles: [],
        files: [],
        image: null,
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
            image: [],
            cellphone: null,
            files: [],
            deletedOldFiles: [],
            is_active: false,
            role_group_role: [],
            role_group_group: [],
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        registerUrl: {
            type: String,
            default: "",
        },

        rolesUrl: {
            type: String,
            default: "",
        },

        departmentsUrl: {
            type: String,
            default: "",
        },
    },

    created() {
        this.loadRoles();
        this.loadDepartments();
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * onFileChange
         */
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
        },
        /**
         * createImage
         */
        createImage(file) {
            Vue.set(this.userData.image, 0, file);
            var image = new Image();
            var reader = new FileReader();
            var vm = this;

            reader.onload = (e) => {
                vm.image = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        /**
         * removeImage
         */
        removeImage: function(e) {
            this.image = "";
        },

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
         * load all departments for select departments in form
         */
        loadDepartments() {
            const url = this.departmentsUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "departments", datas);
            });
        },

        /**
         * load all roles for select roles in form
         */
        loadRoles() {
            const url = this.rolesUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "roles", datas);
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
         * Register new user
         */
        registerUser() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            const deletedFiles = this.$refs.fileUpload.getDeletedFiles();
            const newFiles = this.$refs.fileUpload.getNewFiles();
            let newUploaded = newFiles.map((x) => x.file);
            Vue.set(this, "files", newUploaded);
            let deleteUploaded = deletedFiles.map((x) => x._id);
            Vue.set(this, "deletedOldFiles", deleteUploaded);
            let userData = {
                name: this.userData.name,
                password: this.userData.password,
                email: this.userData.email,
                first_name: this.userData.firstName,
                last_name: this.userData.lastName,
                nation_code: this.userData.nationCode,
                image: this.userData.image,
                cellphone: this.userData.cellphone,
                role_group_role: JSON.stringify(this.userData.role_group_role),
                role_group_group: JSON.stringify(this.userData.role_group_group),
                is_active: this.userData.is_active,
                files: this.files,
                deletedOldFiles: this.deletedOldFiles,
            };
            this.showLoading();

            const url = this.registerUrl;
            console.log(userData);
            AxiosHelper.send("post", url, userData, {
                sendAsFormData: true,
                filesArray: ["image", "files"],
            })
                .then((res) => {
                    const data = res.data;

                    if (data.success) {
                        this.$emit("on-register", {
                            sender: this,
                            data: {
                                data: data,
                            },
                        });
                    }
                })
                .catch((err) => {
                    const data = err.response.data;
                    this.setNotification(data, "is-danger");
                })
                .then(() => this.hideLoading());
            //this.changeFormMode(ENUMS.FORM_MODE.LIST);
            //this.$refs.userList.loadUsers(1);
        },

        /**
         * Validate new user data
         */
        validate() {
            const result = UserValidator.validate(this.userData);

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map((key) => errors[key].join("\n"))
                .join("</br>");

            console.log(error);
            this.setNotification(error, "is-danger");
            return false;
        },
    },
};
</script>

<style scoped>
img {
    width: 20%;
    margin: auto;
    display: block;
    margin-bottom: 10px;
}
</style>
