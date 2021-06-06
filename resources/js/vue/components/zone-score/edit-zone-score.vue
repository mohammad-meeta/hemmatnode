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
            b-field(label='گروه')
                b-autocomplete(
                    v-model="title"
                    placeholder="انتخاب گروه"
                    icon="magnify"
                    :keep-first="keepFirst"
                    :open-on-focus="openOnFocus"
                    :data="filteredDataObj"
                    field="title"
                    @select="option => (selected = option)"
                    :clearable="clearable"
                    )
                        template(slot='empty') گروه یافت نشد


        .field
            label.label حوزه فعالیت
            .control
                .select.is-primary
                    select(
                        v-model="zoneScoreData.zone_cat._id",
                        @change="onChange($event.target.value)"
                    )
                        option(
                            v-for="(zoneCat, zoneCatScore) in zoneCats",
                            :value="zoneCat._id"
                        ) {{ zoneCat.title }}
        .field
            label.label مستندات
            .control
                .select.is-primary
                    select(
                        v-model="zoneScoreData.zone_index._id",
                    )
                        option(
                            v-for="(zoneIndex, zoneIndexScore) in zoneIndexs",
                            :value="zoneIndex._id"
                        ) {{ zoneIndex.title }}
        .field
            label.label سال
            .control
                date-picker(
                    v-model="zoneScoreData.year",
                    display-format="jYYYY",
                    type="year",
                    required
                )
        .field
            label.label امتیاز
            .control
                input.input(
                    type="text",
                    placeholder="امتیاز",
                    v-model="zoneScoreData.score",
                    required,
                    minlength="1",
                    maxlength="3",
                    pattern="[0-9\u06F0-\u06F9]*",
                    validation-message="امتیاز را بین 0 تا 100 وارد کنید"
                )

        .field
            label.checkbox
                input(type="checkbox", v-model="zoneScoreData.is_active")
                |
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
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

export default {
    name: "EditZoneIndex",
    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
    },

    data: () => ({
        ENUMS,
        oldReferences: null,
        departmentCategories: [],
        departments: [],
        zoneCats: [],
        zoneIndexs: [],
        zoneScoreData: {
            zone_cat: null,
            zone_index: null,
            year: null,
            score: null,
            department: null,
            is_active: true,
        },

        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,

        selectedOption: null,
        title: "",
        keepFirst: false,
        openOnFocus: true,
        selected: null,
        clearable: false,
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

        zoneCatsUrl: {
            type: String,
            default: "",
        },

        zoneIndexsUrl: {
            type: String,
            default: "",
        },

        departmentsUrl: {
            type: String,
            default: "",
        },
    },

    created() {
        this.loadDepartments();
        this.loadZoneCats();
    },

    mounted() {},

    computed: {
        isLoadingMode: (state) => state.showLoadingFlag == true,
        showNotification: (state) => state.notificationMessage != null,

        filteredDataObj() {
            return this.departments.filter((option) => {
                return (
                    option.title
                        .toString()
                        .toLowerCase()
                        .indexOf(this.title.toLowerCase()) >= 0
                );
            });
        },
    },

    methods: {
        /**
         * Load
         */
        async loadZoneScoreData(data) {
            await this.onChange(data.zonecat._id);

            let temp = {
                _id: data._id,
                year: data.year,
                score: data.score,
                department: data.department,
                zone_index: data.zoneindex,
                zone_cat: data.zonecat,
                is_active: data.is_active,
                created_at: data.created_at,
            };

            Vue.set(this, "zoneScoreData", temp);
            Vue.set(this, "selected", temp.department);
            Vue.set(this, "title", temp.department.title);
        },

        /**
         * load all departments for select departments in form
         */
        async loadDepartments() {
            const url = this.departmentsUrl;
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
         * onchange department category
         */
        async onChange($event) {
            let url = this.zoneIndexsUrl.replace("$zoneCat$", $event);

            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;
            Vue.set(this, "zoneIndexs", datas);
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

            let zoneScoreData = {
                _id: this.zoneScoreData._id,
                year: zoneScoreData.year,
                score: zoneScoreData.score,
                department: this.selected._id,
                zone_index: zoneScoreData.zone_index._id,
                zone_cat: zoneScoreData.zone_cat._id,
                is_active: zoneScoreData.is_active,
            };

            try {
                const url = this.editUrl.replace("$id$", zoneScoreData._id);
                let res = await AxiosHelper.send("patch", url, zoneScoreData, {
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
