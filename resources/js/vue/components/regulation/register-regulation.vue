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
                        select(v-model="regulationData.departments")
                            option(v-for='(department, departmentIndex) in departments',
                                :value="department._id") {{ department.title }}
            .field
                label.label عنوان
                .control
                    input.input(type='text', placeholder='عنوان', v-model='regulationData.title' required)
            .field
                label.label توضیحات
                .control
                    textarea.textarea(placeholder='توضیحات', v-model='regulationData.body')
            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه
            .field
                label.checkbox
                    input(type='checkbox', v-model="regulationData.isActive")
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
const RegulationValidator = require("JS-VALIDATORS/regulation-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "RegisterRegulation",

    components: {
        Notification
    },

    data: () => ({
        ENUMS,
        departments: [],
        regulationData: {
            title: null,
            body: null,
            department_id: null,
            files: {},
            isActive: false
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        files: [],
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
        Vue.set(this.regulationData, 'departments', this.departmentId);
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
                    this.registerRegulation();
                    break;
            }
        },

        /**
         * load all departments for select departments in form
         */
        loadDepartments() {
            const url = this.departmentsUrl;
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
         * Register new regulation
         */
        registerRegulation() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let regulationData = {
                body: this.regulationData.body,
                agenda: JSON.stringify(this.regulationData.agenda),
                place: this.regulationData.place,
                date: this.regulationData.date,
                department_id: this.regulationData
                    .departments,
                user_list: this.regulationData.user_list,
                is_active: this.regulationData.isActive
            };

            regulationData.files = this.files[0];
            let t = Object.keys(regulationData.user_list)
            .filter(key => true == regulationData.user_list[key])
            .map(key => key);

            regulationData.user_list = t;
            console.log(regulationData);
            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, regulationData, {
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
         * Validate new regulation data
         */
        validate() {
            const result = RegulationValidator.validate(this.regulationData);

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
