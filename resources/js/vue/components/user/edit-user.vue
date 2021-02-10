<template lang="pug">
    .container
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

                    div(v-if='!imageAddress')
                        label.label عکس
                        .control
                            input.input(type='file' accept='image/png, image/jpeg' @change="onFileChange")
                    div(v-else='')
                        img(:src='imageAddress')
                        //- img(:src="imageAddress")
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
                .field
                    label.label
                    .control
                        .select.is-primary
                            select(v-model="userData.role_group_group")
                                option(v-for='(department, departmentIndex) in departments',
                                    :value="department._id") {{ department.title }}
                .field
                    label.checkbox(v-for='(role, roleIndex) in roles')
                        input(type='checkbox', :name="role._id" v-model="userData.role_group_role", :value="role._id")
                        |   {{ role.name }}

                .field
                    label.checkbox
                        input(type='checkbox', v-model="userData.is_active")
                        |   فعال
                .field.is-grouped
                    .control(v-show="! isLoadingMode")
                        a.button.is-link.is-rounded(href="#", @click.prevent="commandClick(ENUMS.COMMAND.SAVE)")
                            |   ویرایش
</template>

<script>
"use strict";
const _ = require("lodash");
const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const UserValidator = require("JS-VALIDATORS/user-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const FileUpload = require("VUE-COMPONENTS/general/file-upload.vue").default;

export default {
    name: "EditUser",
    components: {
        Notification,
        FileUpload,
    },

    data: () => ({
        ENUMS,
        roles: [],
        files: [],
        imageAddress: null,
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
            image: [{}],
            files: [],
            deletedOldFiles: [],
            is_active: false,
            role_group_role: [],
            role_group_group: null,
        },
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
    }),

    props: {
        editUrl: {
            type: String,
            default: "",
        },

        getImageUrl: {
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

        userDatas: {
            role_group_role: [],
            role_group_group: null,
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

    watch: {
        imageAddress(newValue) {
            return newValue;
        },
    },

    methods: {
        /**
         * onFileChange
         */
        onFileChange(e) {
            let files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files[0]);
        },
        /**
         * createImage
         */
        createImage(file) {
            if (!this.userData.image) {
                Vue.set(this.userData, "image", []);
            }
            Vue.set(this.userData.image, 0, file);

            let image = new Image();
            let reader = new FileReader();
            let vm = this;

            reader.onload = (e) => {
                vm.imageAddress = e.target.result;
            };
            reader.readAsDataURL(file);
        },
        /**
         * removeImage
         */
        removeImage: function(e) {
            this.imageAddress = "";
        },

        /**
         * Load specific user
         */
        loadUserData(data) {
            let temp = {
                _id: data._id,
                name: data.name,
                email: data.email,
                firstName: data.profile.first_name,
                lastName: data.profile.last_name,
                nationCode: data.profile.nation_code,
                // image: data.profile.image,
                cellphone: data.cellphone,
                role_group_role: data.role_group_role,
                role_group_group: data.role_group_group,
                files: _.cloneDeep(data.files),
                is_active: data.is_active,
            };
            if (data.profile.image) {
                let url2 = this.getImageUrl.replace(
                    /\$IMAGE\$/g,
                    data.profile.image
                );
                Vue.set(this, "imageAddress", url2);
            }
            // console.log(url);
            // AxiosHelper.send("get", url, "").then((res) => {
            //     const resData = res.data;
            //     Vue.set(this, "image", resData);
            // });

            Vue.set(this, "oldFiles", temp.files);
            Vue.set(this, "userData", temp);

            this.$refs.fileUpload.updateOldFiles(data.files);
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
         * load all departments for select departments in form
         */
        loadDepartments() {
            const url = this.departmentsUrl;
            AxiosHelper.send("get", url, "").then((res) => {
                const resData = res.data;
                const datas = resData.data;
                Vue.set(this, "departments", datas.data);
            });
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
            if (!this.validate()) {
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
                image: this.userData.image,
                nation_code: this.userData.nationCode,
                cellphone: this.userData.cellphone,
                role_group_role: JSON.stringify(this.userData.role_group_role),
                role_group_group: this.userData.role_group_group,
                is_active: this.userData.is_active,
                files: this.files,
                deletedOldFiles: this.deletedOldFiles,
            };

            const url = this.editUrl.replace("$id$", userData._id);
            AxiosHelper.send("patch", url, userData, {
                sendAsFormData: true,
                filesArray: ["image", "files"],
            })
                .then((res) => {
                    const data = res.data;
                    this.$emit("on-update", {
                        sender: this,
                        data,
                    });
                })
                .catch((err) => {
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
                .map((key) => errors[key].join("\n"))
                .join("</br>");

            console.log(error);
            this.setNotification(error, "is-danger");
            return false;
        },
    },
};
</script>

<style scoped></style>
