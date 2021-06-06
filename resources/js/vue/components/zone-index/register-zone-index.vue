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
            label.label گروه
            .control
                .select.is-primary
                    select(
                        v-model="zoneIndexData.department_category_id",
                        @change="onChange($event.target.value)"
                    )
                        option(
                            v-for="(departmentCategory, departmentCategoryIndex) in departmentCategories",
                            :value="departmentCategory._id"
                        ) {{ departmentCategory.title }}
            .control
                .select.is-primary
                    select(v-model="zoneIndexData.references")
                        option(
                            v-for="(department, departmentIndex) in departments",
                            :value="department._id"
                        ) {{ department.title }}


        .field
            label.label حوزه فعالیت
            .control
                .select.is-primary
                    select(
                        v-model="zoneIndexData.zone_cat",
                    )
                        option(
                            v-for="(zoneCat, zoneCatIndex) in zoneCats",
                            :value="zoneCat._id"
                        ) {{ zoneCat.title }}
        .field
            label.label مستندات قابل قبول که باید در سامانه همت در طول سال بارگذاری شود
            .control
                input.input(
                    type="text",
                    placeholder="مستندات قابل قبول که باید در سامانه همت در طول سال بارگذاری شود",
                    autofocus,
                    v-model="zoneIndexData.title",
                    required
                )
        .field
            label.label حداکثر امتیاز
            .control
                input.input(
                    type="text",
                    placeholder="حداکثر امتیاز",
                    v-model="zoneIndexData.point",
                    required,
                    minlength="1",
                    maxlength="3",
                    pattern="[0-9\u06F0-\u06F9]*",
                    validation-message="حداکثر امتیاز را بین 0 تا 100 وارد کنید"
                )
        .field
            label.label منبع قضاوت
            b-select(
                placeholder="انتخاب منبع قضاوت",
                v-model="zoneIndexData.source",
            )
                option(
                    v-for="option in sources"
                    :value="option.name"
                    :key="option.name"
                )
                    | {{ option.name }}

        .field
            label.checkbox
                input(type="checkbox", v-model="zoneIndexData.is_active")
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
    name: "RegisterZoneIndex",

    components: {
        Notification,
    },

    data: () => ({
        ENUMS,
        zoneCats: [],
        departmentCategories: [],
        departments: [],
        zoneIndexData: {
            zone_cat: {},
            title: null,
            point: null,
            source: null,
            department_category_id: null,
            references: null,
            is_active: true,
        },

        sources: [
            { name: "سامانه"},
            { name: "کمیته"},
        ],

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

        zoneCatsUrl: {
            type: String,
            default: "",
        },


    },

    created() {
        this.loadDepartmentCategories();
        this.loadZoneCats();
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
                    this.registerZoneIndex();
                    break;
            }
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
         * load all departments for select departments in form
         */
        async loadDepartment() {
            const url = this.departmentUrl;
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "departments", datas);
        },

        /**
         * load all zone cats for select zoneCats in form
         */
        async loadZoneCats() {
            const url = this.zoneCatsUrl;
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;
            Vue.set(this, "zoneCats", datas);
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
         * Register new zone index
         */
        async registerZoneIndex() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let zoneIndexData = this.zoneIndexData;

            const url = this.registerUrl;

            try {
                let res = await AxiosHelper.send("post", url, zoneIndexData, {
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
            const result = DepartmentValidator.validate(this.zoneIndexData);

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
