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
                h1(v-show="modeList") کارنامه
                h1(v-show="modeRegister") ایجاد کارنامه

    .columns.exposed-form(v-show="!modeLoading")
        .column.is-one-fifth(v-show="modeList")
            a.button.is-primary.is-rounded.is-small(
                href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)"
            )
                span.icon.is-small
                    i.material-icons.icon add
                span ایجاد

        .column.is-one-fifth(v-show="!modeList")
            b-button.is-flex-direction-row-reverse(
                type="is-warning is-light"
                size="is-small"
                icon-right="chevron-right"
                @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)"
                )
                    span بازگشت

    .columns.is-vcentered
        .column(v-if="modeLoading")
            loading

        .column(v-show="!modeLoading && modeList")
            list-report(
                ref="reportList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-report(
                ref="reportRegister",
                @on-command="onCommand",
                @on-register="onReportRegister",
                :register-url="registerUrl",
                :find-report="findReport",
                :indexs-url="indexsUrl",
                :department-id="departmentId",
                :year="year"
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-report(
                ref="reportEdit",
                @on-command="onCommand",
                @on-update="onReportUpdate",
                :edit-url="editUrl",
                :find-report="findReport",
                :indexs-url="indexsUrl",
                :department-id="departmentId"
            )

        .column(v-show="!modeLoading && modeShow")
            show-report(ref="reportShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterReport = require("VUE-COMPONENTS/report/register-report.vue")
    .default;
const EditReport = require("VUE-COMPONENTS/report/edit-report.vue").default;
const ListReport = require("VUE-COMPONENTS/report/list-report.vue").default;
const ShowReport = require("VUE-COMPONENTS/report/show-report.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "Reports",

    components: {
        Loading,
        ListReport,
        RegisterReport,
        EditReport,
        ShowReport,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        reports: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        departmentId: {
            type: String,
            default: null,
        },
        year: {
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
        findReport: {
            type: String,
            default: null,
        },
        showReportYearUrl: {
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
        indexsUrl: {
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
         * On Register report
         */
        onReportRegister(payload) {
            //***update vue list****
            this.$refs.reportList.addToReportList(payload.data.data.data[0]);
            this.setNotification(".کارنامه با موفقیت ذخیره شد", "is-success");
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },
        /**
         * On Update
         */
        onReportUpdate(payload) {
            this.$refs.reportList.editReportList(payload);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".کارنامه با موفقیت ویرایش شد", "is-success");
        },

        /**
         * On commands clicked
         */
        onCommand(payload) {
            let arg = payload.arg || null;
            const data = payload.data || {};
            if (null == arg) {
                arg = payload;
            }
            switch (arg) {
                case ENUMS.COMMAND.NEW:
                    this.changeFormMode(ENUMS.FORM_MODE.REGISTER);
                    break;

                case ENUMS.COMMAND.REGISTER:
                    /* TODO: REGISTER NEW  */
                    console.log("REGISTER NEW Report", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: Edit InviteSession */
                    this.$refs.reportEdit.loadReportData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.reportShow.loadReportData(data);
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
            this.$refs.reportList.loadReports(1);
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
