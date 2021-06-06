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
                        v-model="zoneIndexData.zone_cat.department_category_id",
                        @change="onChange($event.target.value)"
                    )
                        option(
                            v-for="(departmentCategory, departmentCategoryIndex) in departmentCategories",
                            :value="departmentCategory._id"
                        ) {{ departmentCategory.title }}
            .control
                .select.is-primary
                    select(v-model="zoneIndexData.zone_cat.references")
                        option(
                            v-for="(department, departmentIndex) in departments",
                            :value="department._id"
                        ) {{ department.title }}
        .field
            label.label حوزه فعالیت
            .control
                .select.is-primary
                    select(
                        v-model="zoneIndexData.zone_cat._id",
                    )
                        option(
                            v-for="(zoneCat, zoneCatIndex) in zoneCats",
                            :value="zoneCat._id"
                        ) {{ zoneCat.title }}

        .field
            label.label مستندات
            .control
                input.input(
                    type="text",
                    placeholder="مستندات",
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
                input(type="checkbox", v-model="zoneIndexData.isActive")
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
    name: "EditZoneIndex",
    components: {
        Notification,
    },

    data: () => ({
        ENUMS,
        oldReferences: null,
        departmentCategories: [],
        departments: [],
        zoneCats: [],
        zoneIndexData: {
            zone_cat: {},
            title: null,
            point: null,
            source: null,
            department_category_id: null,
            references: null,
            is_active: false,
        },

        sources: [
            {
                name: "سامانه",
                key: "سامانه",
            },
            {
                name: "کمیته",
                key: "کمیته",
            },
        ],

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

        zoneCatsUrl: {
            type: String,
            default: "",
        },
    },

    created() {
        this.loadDepartmentCategories();
        this.loadZoneCats();
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
        async loadZoneIndexData(data) {
            console.log("*********");
            console.log(data);
            let temp = {
                _id: data._id,
                title: data.title,
                point: data.point,
                source: data.source,
                department_category_id: data.zone_cat.department_category_id,
                references: data.zone_cat.references,
                zone_cat: {
                    title: data.zone_cat.title,
                    _id: data.zone_cat._id,
                    department_category_id: data.zone_cat.department_category_id,
                    references: data.zone_cat.references,
                },
                isActive: data.is_active,
            };
            Vue.set(this, "oldReferences", temp.references);
            Vue.set(this, "zoneIndexData", temp);
            console.log(this.zoneIndexData);
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
                    this.editZoneIndex();
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
         * Edit Zone Index
         */
        async editZoneIndex() {
            this.showLoading();
            console.log(this.zoneIndexData);
            let zoneIndexData = {
                _id: this.zoneIndexData._id,
                title: this.zoneIndexData.title,
                department_category_id: this.zoneIndexData
                    .department_category_id,
                references: this.zoneIndexData.references,
                zone_cat: this.zoneIndexData.zone_cat._id,
                source: this.zoneIndexData.source,
                point: this.zoneIndexData.point,
                is_active: this.zoneIndexData.isActive,
                oldReferences: this.oldReferences,
            };

            try {
                const url = this.editUrl.replace("$id$", zoneIndexData._id);
                let res = await AxiosHelper.send("patch", url, zoneIndexData, {
                    sendAsFormData: true,
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
