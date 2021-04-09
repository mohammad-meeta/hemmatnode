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
                input(type="checkbox", v-model="zoneCatData.isActive")
                | فعال
            .field.is-grouped
                .control(v-show="! isLoadingMode")
                    a.button.is-link.is-rounded(
                        href="#",
                        @click.prevent="commandClick(ENUMS.COMMAND.SAVE)"
                    )
                        | ویرایش
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "EditZoneCat",
    components: {
        Notification,
    },

    data: () => ({
        ENUMS,
        oldReferences: null,
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
        editUrl: {
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

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,
    },

    methods: {
        /**
         * Load
         */
        loadDepartmentData(data) {
            let temp = {
                _id: data._id,
                title: data.title,
                description: data.description,
                department_category_id: data.department_category_id,
                references: data.references,
                isActive: data.is_active,
            };
            Vue.set(this, "oldReferences", temp.references);
            Vue.set(this, "zoneCatData", temp);
            this.onChange(data.department_category_id);
        },

        /**
         * load all departmentCategories for select departmentCategories in form
         */
        async loadDepartmentCategories() {
            const url = this.departmentCategoriesUrl;
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "departmentCategories", datas);
        },
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
                    this.editDepartment();
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
         * Edit department
         */
        async editDepartment() {
            this.showLoading();

            let zoneCatData = {
                _id: this.zoneCatData._id,
                title: this.zoneCatData.title,
                weight: this.zoneCatData.weight,
                department_category_id: this.zoneCatData
                    .department_category_id,
                references: this.zoneCatData.references,
                is_active: this.zoneCatData.isActive,
                oldReferences: this.oldReferences,
            };

            try {
                const url = this.editUrl.replace("$id$", zoneCatData._id);
                let res = await AxiosHelper.send("patch", url, zoneCatData, {
                    sendAsFormData: true,
                    filesArray: "files",
                });

                const data = res.data;
                this.$emit("on-update", {
                    sender: this,
                    data,
                });
            } catch (err) {
                this.setNotification(".خطا در ویرایش", "is-danger");
            }

            this.hideLoading();
        },

    },
};
</script>
