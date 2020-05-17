<template lang="pug">
    .container-child
        notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
            span(v-html="notificationMessage")

        .column.is-full(v-show="isLoadingMode")
            h1 در حال بارگذاری
        .form-small(v-show="! isLoadingMode")
            .field
                label.label نام پروژه
                .control
                    input.input(type='text', placeholder='نام پروژه', autofocus, v-model='projectData.title' required)
            .field
                label.label برنامه متناظر
                .control
                    .select.is-primary
                        select(v-model="projectData.programs")
                            option(v-for='(program, programIndex) in programs',
                                :value="program._id") {{ program.title }}
            .field
                label.label هدف برنامه
                .control
                    textarea.textarea(placeholder='هدف برنامه', v-model='projectData.target')
            .field
                label.label شاخص های اثر متناظر
                .control
                    textarea.textarea(placeholder='شاخص های اثر متناظر', v-model='projectData.same_effects_index')
            .field
                label.label مجری سازمانی
                .control
                    input.input(type='text', placeholder='مجری سازمانی', autofocus, v-model='projectData.organ_moderator' required)
            .field
                label.label
                    | مجری پروژه - پیمانکار
                    .control
                        input.input(type='text', placeholder='مجری پروژه - پیمانکار', autofocus, v-model='projectData.project_moderator' required)
            .field
                label.label مشاورین
                    .control
                        input.input(type='text', placeholder='مشاورین', autofocus, v-model='projectData.consoultant' required)
            .field
                label.label ناظر پروژه
                    .control
                        input.input(type='text', placeholder='ناظر پروژه', autofocus, v-model='projectData.supervisor' required)
            .field
                label.label کمیته راهبردی طرح
                .control
                    textarea.textarea(placeholder='کمیته راهبردی طرح', v-model='projectData.committee_leadership')
            .field
                label.label همکاران اصلی پروژه
                    .control
                        input.input(type='text', placeholder='همکاران اصلی پروژه', autofocus, v-model='projectData.coworker' required)
            .field
                label.label
                    | تعریف مسئله -نیاز اصلی
                .control
                    textarea.textarea(placeholder='تعریف مسئله -نیاز اصلی', v-model='projectData.description')
            .field
                label.label مروری برمداخلات و خدمات بهبوددهنده وضعیت درتجربیات جهانی و ملی
                .control
                    textarea.textarea(placeholder='مروری برمداخلات و خدمات بهبوددهنده وضعیت در تجربیات جهانی و ملی', v-model='projectData.intervention_review')
            .field
                label.label
                    | ارتباط پروژه با اقدامات قبلی سازمان یا سازمان های دیگر در پرداختن به این مسئله-تکمیل کننده،نقض کننده،جدید بودن
                .control
                    textarea.textarea(placeholder='ارتباط پروژه با اقدامات قبلی سازمان یا سازمان های دیگر در پرداختن به این مسئله-تکمیل کننده،نقض کننده،جدیدبودن', v-model='projectData.intervention_review')
            .field
                label.label وزن
                .control
                    input.input(type='text', placeholder='وزن', autofocus, v-model='projectData.weight' required)
            .field
                label.label پروژه مرتبط
                .control
                    .select.is-primary
                        select(v-model="projectData.parents")
                            option(v-for='(parent, parentIndex) in parents',
                                :value="parent._id") {{ parent.title }}
            .field
                label.checkbox
                    input(type='file', @change="setAttachment")
                    |   ضمیمه

            .field
                label.checkbox
                    input(type='checkbox', v-model="projectData.isActive")
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
const ProjectValidator = require("JS-VALIDATORS/project-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "RegisterProject",

    components: {
        Notification
    },

    data: () => ({
        ENUMS,
        parents: [],
        projectData: {
            title: null,
            description: null,
            weight: null,
            parent: null,
            files: {},
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

        parentsUrl: {
            type: String,
            default: ""
        }
    },

    created() {
        this.loadParents();
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
                    this.registerProject();
                    break;
            }
        },

        /**
         * load all parents for select parents in form
         */
        loadParents() {
            const url = this.parentsUrl;
            console.log(url);
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "parents", datas);
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
         * Register new project
         */
        registerProject() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }
            let projectData = {
                title: this.projectData.title,
                description: this.projectData.description,
                weight: this.projectData.weight,
                parent: this.projectData.parents,
                is_active: this.projectData.isActive
            };
            console.log(projectData);
            projectData.files = this.files[0];

            this.showLoading();

            const url = this.registerUrl;

            AxiosHelper.send("post", url, projectData, {
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
         * Validate new project data
         */
        validate() {
            const result = ProjectValidator.validate(this.projectData);

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
