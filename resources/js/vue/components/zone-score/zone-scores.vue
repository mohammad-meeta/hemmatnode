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
                h1(v-show="modeEdit") ویرایش کارنامه

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
            list-zone-score(
                ref="zoneScoreList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-zone-score(
                ref="zoneScoreRegister",
                @on-command="onCommand",
                @on-register="onZoneScoreRegister",
                :register-url="registerUrl",
                :zone-scores-url="zoneScoresUrl",
                :department-categories-url="departmentCategoriesUrl",
                :zone-cats-url="zoneCatsUrl",
                :departments-url="departmentsUrl",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-zone-score(ref="zoneScoreEdit",
                @on-command="onCommand",
                @on-update="onZoneScoreUpdate"
                :edit-url="editUrl",
                :zone-scores-url="zoneScoresUrl",
                :department-categories-url="departmentCategoriesUrl",
                :zone-cats-url="zoneCatsUrl",
                :departments-url="departmentsUrl",
            )

        .column(v-show="!modeLoading && modeShow")
            show-zone-score(
                ref="zoneScoreShow",
                @on-command="onCommand",
                :zone-list-url="listUrl"
                :load-user-url="loadUserUrl"
            )
</template>

<script>
"use strict";

const Buefy = require("buefy").default;
const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterZoneScore = require("VUE-COMPONENTS/zone-score/register-zone-score.vue")
    .default;
const ListZoneScore = require("VUE-COMPONENTS/zone-score/list-zone-score.vue")
    .default;
const EditZoneScore = require("VUE-COMPONENTS/zone-score/edit-zone-score.vue")
    .default;
const ShowZoneScore = require("VUE-COMPONENTS/zone-score/show-zone-score.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "ZoneScores",

    components: {
        Loading,
        ListZoneScore,
        RegisterZoneScore,
        EditZoneScore,
        ShowZoneScore,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        zoneScores: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        title: {
            type: String,
            default: null,
        },

        listUrl: {
            type: String,
            default: null,
        },

        loadUserUrl: {
            type: String,
            default: null,
        },

        registerUrl: {
            type: String,
            default: null,
        },

        zoneScoresUrl: {
            type: String,
            default: null,
        },

        editUrl: {
            type: String,
            default: null,
        },

        departmentCategoriesUrl: {
            type: String,
            default: null,
        },

        zoneCatsUrl: {
            type: String,
            default: null,
        },

        departmentsUrl: {
            type: String,
            default: null,
        },

        loadUrl: {
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

    created() {
        this.init();
    },

    mounted() {
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
        this.$refs.zoneScoreList.loadZoneScores(1);
    },

    methods: {
        /**
         * On Register zone score
         */
        onZoneScoreRegister(payload) {
            //***update vue list****
            this.$refs.zoneScoreList.addToZoneScoreList(payload.data.data[0]);
            this.setNotification(".حوزه فعالیت با موفقیت ذخیره شد", "is-success");
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },

        /**
         * On Update zone score
         */
        onZoneScoreUpdate(payload) {
            this.$refs.zoneScoreList.editInZoneScoreList(payload.data);
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
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW zone score */
                    this.$refs.zoneScoreEdit.loadZoneScoreData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.zoneScoreShow.loadUrl = this.loadUrl;
                    this.$refs.zoneScoreShow.loadZoneScoreData(data);
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
