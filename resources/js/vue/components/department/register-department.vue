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
                label.label معرفی
                .control
                    textarea.textarea(placeholder='معرفی', v-model='departmentData.description')

            .field
                label.label دسته بندی
                .control
                    .select.is-primary
                        select(v-model="departmentData.departmentCategories",
                            @change="onChange($event.target.value)")
                            option(v-for='(departmentCategory, departmentCategoryIndex) in departmentCategories',
                                :value="departmentCategory._id") {{ departmentCategory.title }}
                .control
                    .select.is-primary
                        select(v-model="departmentData.department")
                            option(v-for='(department, departmentIndex) in departments',
                                :value="department._id") {{ department.title }}

            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه

            .field
                label.checkbox
                    input(type='checkbox', v-model="departmentData.is_active")
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
        departmentCategories: [],
        departments: [],
        departmentData: {
            title: null,
            description: null,
            department_category_id: null,
            references: null,
            files: {},
            is_active: false
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        files: [],
        hasNewRegulation: false
    }),

    props: {
        registerUrl: {
            type: String,
            default: ""
        },

        departmentCategoriesUrl: {
            type: String,
            default: ""
        },

        departmentsUrl: {
            type: String,
            default: ""
        },

        departmentRegulationUrl: {
            type: String,
            default: ""
        }
    },

    created() {
        this.loadDepartmentCategories();
    },

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null,
        showNewRegulation: state => state.hasNewRegulation == true
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
         * onchange department category
         */
        onChange($event) {
            let url = this.departmentsUrl.replace("$department_category$", $event);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "departments", datas);
            });
            console.log(this.departments);
        },

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
         * load all departmentCategories for select departmentCategories in form
         */
        loadDepartmentCategories() {
            const url = this.departmentCategoriesUrl;

            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "departmentCategories", datas);
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
         * Register new department
         */
        registerDepartment() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let departmentData = {
                title: this.departmentData.title,
                description: this.departmentData.description,
                department_category_id: this.departmentData
                    .departmentCategories,
                references: this.departmentData.department,
                is_active: this.departmentData.is_active
            };

            departmentData.files = this.files[0];

            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, departmentData, {
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
         * after dave department must be saved regulation
         */
        hasNewRegulationFunc(payload) {
            Vue.set(this, "hasNewRegulation", true);
            this.$refs.departmentRegulation.setDepartmentId(payload.data.data._id);
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
