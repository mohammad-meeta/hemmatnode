<template lang="pug">
.container-parent
    section.hero
        notification(
            :notification-type="notificationType",
            @on-close="closeNotification",
            v-if="showNotification"
        )
            span(v-html="notificationMessage")
        .container.page-header
            .title
                h1(v-show="modeList") دسته بندی شاخص
                h1(v-show="modeRegister") ایجاد دسته بندی شاخص

    .columns.exposed-form(v-show="!modeLoading")
        .column.is-one-fifth(v-show="modeList")
            a.button.is-primary.is-rounded(
                href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)"
            )
                span.icon.is-small
                    i.material-icons.icon check_circle
                span ایجاد

        .column.is-one-fifth(v-show="!modeList")
            a.button.is-warning.is-rounded(
                href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)"
            )
                span.icon.is-small
                    i.material-icons.icon check_circle
                span بازگشت

    .columns.is-vcentered
        .column(v-if="modeLoading")
            loading

        .column(v-show="!modeLoading && modeList")
            list-monitoring-type(
                ref="monitoringTypeList",
                @on-command="onCommand",
                :department-id="departmentId",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-monitoring-type(
                ref="monitoringTypeRegister",
                @on-command="onCommand",
                @on-register="onMonitoringTypeRegister",
                :register-url="registerUrl",
                :department-id="departmentId"
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-monitoring-type(
                ref="monitoringTypeEdit",
                @on-command="onCommand",
                @on-update="onMonitoringTypeUpdate",
                :edit-url="editUrl",
                :department-id="departmentId"
            )

        .column(v-show="!modeLoading && modeShow")
            show-monitoring-type(
                ref="monitoringTypeShow",
                @on-command="onCommand"
            )
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterMonitoringType = require("VUE-COMPONENTS/monitoring-type/register-monitoring-type.vue")
    .default;
const EditMonitoringType = require("VUE-COMPONENTS/monitoring-type/edit-monitoring-type.vue")
    .default;
const ListMonitoringType = require("VUE-COMPONENTS/monitoring-type/list-monitoring-type.vue")
    .default;
const ShowMonitoringType = require("VUE-COMPONENTS/monitoring-type/show-monitoring-type.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "MonitoringTypes",

    components: {
        Loading,
        ListMonitoringType,
        RegisterMonitoringType,
        EditMonitoringType,
        ShowMonitoringType,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        monitoringTypes: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },

        title: {
            type: String,
            default: null,
        },

        listUrl: {
            type: String,
            default: null,
        },

        registerUrl: {
            type: String,
            default: null,
        },

        editUrl: {
            type: String,
            default: null,
        },
    },

    computed: {
        formMode: (state) =>
            state.formModeStack[state.formModeStack.length - 1],

        modeLoading: (state) => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: (state) => state.formMode == ENUMS.FORM_MODE.LIST,
        modeRegister: (state) => state.formMode == ENUMS.FORM_MODE.REGISTER,
        modeEdit: (state) => state.formMode == ENUMS.FORM_MODE.EDIT,
        modeShow: (state) => state.formMode == ENUMS.FORM_MODE.SHOW,
        showNotification: (state) => state.notificationMessage != null,
    },

    /**
     * Mounted
     */
    mounted() {
        this.init();
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
    },

    methods: {
        /**
         * On Register monitoringType
         */
        onMonitoringTypeRegister(payload) {
            //***update vue list****
            this.$refs.monitoringTypeList.addToMonitoringTypeList(
                payload.data.data.data[0]
            );
            this.setNotification(
                ".دسته بندی شاخص با موفقیت ذخیره شد",
                "is-success"
            );
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },

        /**
         * On Update
         */
        onMonitoringTypeUpdate(payload) {
            this.$refs.monitoringTypeList.editMonitoringTypeList(payload);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(
                ".دسته بندی شاخص با موفقیت ویرایش شد",
                "is-success"
            );
        },

        /**
         * On commands clicked
         */
        onCommand(payload) {
            const data = payload.data || {};
            let arg = payload.arg || null;
            arg = arg || payload;

            switch (arg) {
                case ENUMS.COMMAND.NEW:
                    this.changeFormMode(ENUMS.FORM_MODE.REGISTER);
                    break;

                case ENUMS.COMMAND.REGISTER:
                    /* TODO: REGISTER NEW  */
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: Edit InviteSession */
                    this.$refs.monitoringTypeEdit.loadMonitoringTypeData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.monitoringTypeShow.loadMonitoringTypeData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.SHOW);
                    break;
            }
        },

        /**
         * On Command
         *
         * @param      {Object}  arg     The argument
         */
        commandClick(arg) {
            this.onCommand(arg);
        },

        /**
         * Init method
         */
        init() {
            this.changeFormMode(ENUMS.FORM_MODE.LOADING);
            this.$refs.monitoringTypeList.loadMonitoringTypes(1);
        },

        /**
         * Change form mode
         */
        changeFormMode(mode, options) {
            const opts = Object.assign(
                {
                    pop: false,
                },
                options
            );

            if (opts.pop) {
                if (this.formModeStack.length > 0) {
                    Vue.delete(
                        this.formModeStack,
                        this.formModeStack.length - 1
                    );
                }
            } else {
                Vue.set(this.formModeStack, this.formModeStack.length, mode);
            }
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
    },
};
</script>
