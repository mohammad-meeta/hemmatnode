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
                h1(v-show="modeList") دیدبانی سلامت
                h1(v-show="modeRegister") ایجاد دیدبانی سلامت

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
            list-monitoring(
                ref="monitoringList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-monitoring(
                ref="monitoringRegister",
                @on-command="onCommand",
                @on-register="onMonitoringRegister",
                :register-url="registerUrl",
                :index-id="indexId",
                :indexs-url="indexsUrl",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-monitoring(
                ref="monitoringEdit",
                @on-command="onCommand",
                @on-update="onMonitoringUpdate",
                :edit-url="editUrl",
                :index-id="indexId",
                :indexs-url="indexsUrl",
            )

        .column(v-show="!modeLoading && modeShow")
            show-monitoring(ref="monitoringShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterMonitoring = require("VUE-COMPONENTS/monitoring/register-monitoring.vue")
    .default;
const EditMonitoring = require("VUE-COMPONENTS/monitoring/edit-monitoring.vue").default;
const ListMonitoring = require("VUE-COMPONENTS/monitoring/list-monitoring.vue").default;
const ShowMonitoring = require("VUE-COMPONENTS/monitoring/show-monitoring.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "Monitorings",

    components: {
        Loading,
        ListMonitoring,
        RegisterMonitoring,
        EditMonitoring,
        ShowMonitoring,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        monitorings: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        indexId: {
            type: String,
            default: null,
        },

        indexsUrl: {
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
        showMonitoringYearUrl: {
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
         * On Register monitoring
         */
        onMonitoringRegister(payload) {
            //***update vue list****
            this.$refs.monitoringList.addToMonitoringList(payload.data.data.data[0]);
            this.setNotification(
                ".دیدبانی با موفقیت ذخیره شد",
                "is-success"
            );
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },
        /**
         * On Update
         */
        onMonitoringUpdate(payload) {
            this.$refs.monitoringList.editMonitoringList(payload);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".شاخص با موفقیت ویرایش شد", "is-success");
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
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: Edit InviteSession */
                    this.$refs.monitoringEdit.loadMonitoringData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.monitoringShow.loadMonitoringData(data);
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
            this.$refs.monitoringList.loadMonitorings(1);
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
