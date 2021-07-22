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
                        v-model="zoneScoreData.zone_cat",
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
                        v-model="zoneScoreData.zone_index",
                    )
                        option(
                            v-for="(zoneIndex, zoneIndexScore) in zoneIndexs",
                            :value="zoneIndex._id"
                        ) {{ zoneIndex.title }}
        b-field(
                label="سال",
            )
                b-select(
                    placeholder="انتخاب سال",
                    v-model="zoneScoreData.year",
                )
                    option(
                        v-for="year in years"
                        :value="year"
                        :key="year"
                    )
                        | {{ year }}
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
                    |
                    | ایجاد
</template>

<script>
"use strict";

const AxiosHelper = require("JS-HELPERS/axios-helper");
const ENUMS = require("JS-HELPERS/enums");
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;
const VuePersianDatetimePicker = require("vue-persian-datetime-picker").default;

export default {
    name: "RegisterZoneScore",

    components: {
        Notification,
        DatePicker: VuePersianDatetimePicker,
    },

    data: () => ({
        ENUMS,
        zoneCats: [],
        zoneIndexs: [],
        departments: [],
        zoneScoreData: {
            zone_cat: null,
            zone_index: null,
            year: null,
            score: null,
            department: null,
            is_active: true,
        },

        selectedOption: null,
        title: "",
        keepFirst: false,
        openOnFocus: true,
        selected: null,
        clearable: false,
        notificationMessage: null,
        notificationType: "is-info",
        showLoadingFlag: false,
        years:[],
    }),

    props: {
        registerUrl: {
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

        zoneIndexsUrl: {
            type: String,
            default: "",
        },
    },

    created() {
        this.loadDepartments();
        this.loadZoneCats();
        this.loadYears();
        // this.loadZoneIndexs();
    },

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
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            switch (arg) {
                case ENUMS.COMMAND.SAVE:
                    this.registerZoneScore();
                    break;
            }
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
        async onChange(id) {
            const url = this.zoneIndexsUrl.replace("$zoneCat$", id);
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "zoneIndexs", datas);
        },

        /**
         * load all zone indexs for select zoneIndexs in form
         */
        async loadZoneIndexs(id) {
            const url = this.zoneIndexsUrl.replace("$zoneCat$", id);
            let res = await AxiosHelper.send("get", url, "");
            const resData = res.data;
            const datas = resData.data.data;

            Vue.set(this, "zoneIndexs", datas);
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
         * Register new zone score
         */
        async registerZoneScore() {
            const isValid = this.validate();

            if (!isValid) {
                return;
            }

            this.showLoading();

            let zoneScoreData = this.zoneScoreData;

            const url = this.registerUrl;
            zoneScoreData.department = this.selected._id;

            try {
                let res = await AxiosHelper.send("post", url, zoneScoreData, {
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
         * Load years
         */
        loadYears() {
            const years= [1395,1396,1397,1398,1399,1400];
            Vue.set(this, "years", years);
        },

        /**
         * Validate new department data
         */
        validate() {
            return true;
            const result = DepartmentValidator.validate(this.zoneScoreData);

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
