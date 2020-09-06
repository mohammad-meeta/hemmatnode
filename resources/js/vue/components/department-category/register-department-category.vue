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
                    input.input(type='text', placeholder='عنوان', autofocus, v-model='departmentCategoryData.title' required)
            .field
                label.label بخش
                .control
                    .select.is-primary
                        select(v-model="departmentCategoryData.sections")
                            option(v-for='(section, sectionIndex) in sections',
                                :value="section._id") {{ section.title }}
            .field
                label.checkbox
                    input(type='checkbox', v-model="departmentCategoryData.is_active")
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
const DepartmentCategoryValidator = require("JS-VALIDATORS/department-category-register-validator");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "RegisterDepartmentCategory",

    components: {
        Notification
    },

    data: () => ({
        ENUMS,
        sections: [],
        departmentCategoryData: {
            title: null,
            is_active: false
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false
    }),

    props: {
        registerUrl: {
            type: String,
            default: ""
        },

        sectionsUrl: {
            type: String,
            default: ""
        },
    },

    created() {
        this.loadSections();
    },

    computed: {
        isLoadingMode: state => state.showLoadingFlag == true,
        showNotification: state => state.notificationMessage != null
    },

    methods: {
        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerDepartmentCategory();
                    break;
            }
        },

        /**
         * load all sections for select sections in form
         */
        loadSections() {
            const url = this.sectionsUrl;
            console.log(url)
            AxiosHelper.send("get", url, "").then(res => {
                const resData = res.data;
                const datas = resData.data.data;
                Vue.set(this, "sections", datas);
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
         * Register new department category
         */
        registerDepartmentCategory() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            let departmentCategoryData = {
                title: this.departmentCategoryData.title,
                section_id: this.departmentCategoryData
                    .sections,
                is_active: this.departmentCategoryData.is_active
            };

            this.showLoading();

            const url = this.registerUrl;
            AxiosHelper.send("post", url, departmentCategoryData)
                .then(res => {
                    const data = res.data;
                    this.$emit("on-register", {
                        sender: this,
                        data
                    });
                })
                .catch(err => {
                    const data = err.response.data;
                    this.setNotification(data, "is-danger");
                })
                .then(() => this.hideLoading());
        },

        /**
         * Validate new departmentCategory data
         */
        validate() {
            const result = DepartmentCategoryValidator.validate(this.departmentCategoryData);

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
