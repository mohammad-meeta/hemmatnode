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
                h1(v-show="modeList") شاخص
                h1(v-show="modeRegister") ایجاد شاخص

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
            list-indicator(
                ref="indicatorList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-indicator(
                ref="indicatorRegister",
                @on-command="onCommand",
                @on-register="onIndicatorRegister",
                :register-url="registerUrl",
                :indicator-type-id="indicatorTypeId",
                :indicator-types-url="indicatorTypesUrl",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-indicator(
                ref="indicatorEdit",
                @on-command="onCommand",
                @on-update="onIndicatorUpdate",
                :edit-url="editUrl",
                :indicator-type-id="indicatorTypeId",
                :indicator-types-url="indicatorTypesUrl",
            )

        .column(v-show="!modeLoading && modeShow")
            show-indicator(ref="indicatorShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterIndicator = require("VUE-COMPONENTS/indicator/register-indicator.vue")
    .default;
const EditIndicator = require("VUE-COMPONENTS/indicator/edit-indicator.vue").default;
const ListIndicator = require("VUE-COMPONENTS/indicator/list-indicator.vue").default;
const ShowIndicator = require("VUE-COMPONENTS/indicator/show-indicator.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "Indicators",

    components: {
        Loading,
        ListIndicator,
        RegisterIndicator,
        EditIndicator,
        ShowIndicator,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        indicators: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        indicatorTypeId: {
            type: String,
            default: null,
        },

        indicatorTypesUrl: {
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
        showIndicatorYearUrl: {
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
         * On Register indicator
         */
        onIndicatorRegister(payload) {
            //***update vue list****
            this.$refs.indicatorList.addToIndicatorList(payload.data.data.data[0]);
            this.setNotification(
                ".شاخص با موفقیت ذخیره شد",
                "is-success"
            );
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },
        /**
         * On Update
         */
        onIndicatorUpdate(payload) {
            this.$refs.indicatorList.editIndicatorList(payload);
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
                    console.log("REGISTER NEW Indicator", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: Edit InviteSession */
                    this.$refs.indicatorEdit.loadIndicatorData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.indicatorShow.loadIndicatorData(data);
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
            this.$refs.indicatorList.loadIndicators(1);
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
