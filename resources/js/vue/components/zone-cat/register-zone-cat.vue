<template lang="pug">
.container-child
    notification(
        :notification-type="notificationType",
        @on-close="closeNotification",
        v-if="showNotification"
    )
        span(v-html="notificationMessage")

    .column.is-full(v-show="isLoadingMode")
        h1 در حال بارگذاری
    .form-small(v-show="! isLoadingMode")
        .field
            label.label عنوان
            .control
                input.input(
                    type="text",
                    placeholder="عنوان",
                    autofocus,
                    v-model="zoneCatData.title",
                    required
                )
        .field
            label.label وزن
            .control
                input.input(
                    type="text",
                    placeholder="وزن",
                    autofocus,
                    v-model="zoneCatData.weight",
                    required
                )

        .field
            label.label گروه
            .control
                .select.is-primary
                    select(
                        v-model="zoneCatData.department_category_id",
                        @change="onChange($event.target.value)"
                    )
                        option(
                            v-for="(departmentCategory, departmentCategoryIndex) in departmentCategories",
                            :value="departmentCategory._id"
                        ) {{ departmentCategory.title }}
            .control
                .select.is-primary
                    select(v-model="zoneCatData.references")
                        option(
                            v-for="(department, departmentIndex) in departments",
                            :value="department._id"
                        ) {{ department.title }}

        .field
            label.checkbox
                input(type="checkbox", v-model="zoneCatData.is_active")
                |
                | فعال

        .field.is-grouped
            .control(v-show="! isLoadingMode")
                a.button.is-link.is-rounded(
                    href="#",
                    @click.prevent="commandClick(ENUMS.COMMAND.SAVE)"
                )
                    |
                    | ایجاد
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "RegisterZoneCat",

    components: {
        Notification,
    },

    data: () => ({
        ENUMS,
        departmentCategories: [],
        departments: [],
        zoneCatData: {
            title: null,
            weight: null,
            department_category_id: null,
            references: null,
            is_active: false,
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

        departmentCategoriesUrl: {
            type: String,
            default: "",
        },

        departmentsUrl: {
            type: String,
            default: "",
        },

    },

    created() {
        this.loadDepartmentCategories();
    },

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * onchange department category
         */
        async onChange($event) {
            let url = this.departmentsUrl.replace(
                "$department_category$",
                $event
            );

            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;
            Vue.set(this, "departments", datas);
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerZoneCat();
                    break;
            }
        },

        /**
         * load all departmentCategories for select departmentCategories in form
         */
        async loadDepartmentCategories() {
            const url = this.departmentCategoriesUrl;
            console.log(url);
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            console.log(resData);
            const datas = resData.data.data;

            Vue.set(this, "departmentCategories", datas);
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
         * Register new zone cat
         */
        async registerZoneCat() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let zoneCatData = this.zoneCatData;

            const url = this.registerUrl;

            try {
                let res = await AxiosHelper.send("post", url, zoneCatData, {
                    sendAsFormData: true,
                });

                const data = res.data;
                if (data.success) {
                    this.$emit("on-register", {
                        sender: this,
                        data,
                    });
                }
            } catch (err) {
                const data = err.response.data;
                this.setNotification(data, "is-danger");
            }

            this.hideLoading();
        },

        /**
         * Validate new department data
         */
        validate() {
            return true;
            const result = DepartmentValidator.validate(this.zoneCatData);

            if (result.passes) {
                this.closeNotification();
                return true;
            }

            const errors = result.validator.errors.all();
            const error = Object.keys(errors)
                .map((key) => errors[key].join("\n"))
                .join("</br>");

            this.setNotification(error, "is-danger");
            return false;
        },
    },
};
</script>
