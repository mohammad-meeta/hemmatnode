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
                    input.input(type='text', placeholder='عنوان', autofocus, v-model='taskData.title' required)
            .field
                label.label توضیحات
                .control
                    textarea.textarea(placeholder='توضیحات', v-model='taskData.description')
            .field
                label.label وزن
                .control
                    input.input(type='text', placeholder='وزن', autofocus, v-model='taskData.weight' required)
            .field
                label.label پروژه مرتبط
                .control
                    .select.is-primary
                        select(v-model="taskData.parents")
                            option(v-for='(parent, parentIndex) in parents',
                                :value="parent._id") {{ parent.title }}
            .field
                label.label تاریخ آغاز
                .control
                    date-picker(v-model='taskData.started_at' format="YYYY-MM-DD HH:mm:ss"
                    display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)
            .field
                label.label تاریخ پایان
                .control
                    date-picker(v-model='taskData.finished_at' format="YYYY-MM-DD HH:mm:ss"
                    display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)
            .field
                label.label تاریخ خاتمه یافته
                .control
                    date-picker(v-model='taskData.done_at' format="YYYY-MM-DD HH:mm:ss"
                    display-format=" jDD/jMM/jYYYY HH:mm" type="datetime" required)

            .field
                label.label مجری
                .multi-checkboxes
                    label.checkbox.column.is-12(v-for='(user, userIndex) in users')
                        input(type='checkbox', v-model="taskData.executed_by[user._id]", :value="user._id")
                        |   {{ user.name }} - {{ user.profile.first_name }} {{ user.profile.last_name }}
            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه
            .field
                label.checkbox
                    input(type='checkbox', v-model="taskData.status.in_progress")
                    |   در حال انجام
                label.checkbox
                    input(type='checkbox', v-model="taskData.status.done")
                    |   انجام شده
                label.checkbox
                    input(type='checkbox', v-model="taskData.status.nodone")
                    |   انجام نشده

            .field
                label.label امتیاز اجرا
                .control
                    input.input(type='text', placeholder='امتیاز', autofocus, v-model='taskData.execution_rank' required)
            .field
                label.checkbox
                    input(type='checkbox', v-model="taskData.isActive")
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
const TaskValidator = require("JS-VALIDATORS/task-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

module.exports = {
    name: "RegisterTask",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker
    },

    data: () => ({
        ENUMS,
        parents: [],
        users: [],
        taskData: {
            title: null,
            description: null,
            weight: null,
            parent: null,
            files: {},
            isActive: false,
            status: {},
            user_list: {}
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        files: []
    }),

    props: {
        registerUrl: {
            type: String,
            default: ""
        },

        parentsUrl: {
            type: String,
            default: ""
        },

        usersUrl: {
            type: String,
            default: ""
        }
    },

    created() {
        this.loadParents();
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
                    this.registerTask();
                    break;
            }
        },

        /**
         * load all parents for select parents in form
         */
        loadParents() {
            const url = this.parentsUrl;
            console.log(url);
            AxiosHelper.send("get", url, {}).then(res => {
                console.log(res)
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "parents", datas);
            });
        },

        /**
         * load all users for select user in form
         */
        loadUsers() {
            const url = this.usersUrl;
            console.log(url)
            AxiosHelper.send("get", url, {}).then(res => {
                console.log(res)
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
         * Register new task
         */
        registerTask() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let taskData = {
                title: this.taskData.title,
                description: this.taskData.description,
                weight: this.taskData.weight,
                parent: this.taskData.parents,
                is_active: this.taskData.isActive
            };
            console.log(taskData);
            taskData.files = this.files[0];

            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, taskData, {
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
         * Validate new task data
         */
        validate() {
            const result = TaskValidator.validate(this.taskData);

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
