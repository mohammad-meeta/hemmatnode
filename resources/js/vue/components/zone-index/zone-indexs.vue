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
                h1(v-show="modeList") آیتم های حوزه فعالیت
                h1(v-show="modeRegister") ایجاد آیتم حوزه فعالیت
                h1(v-show="modeEdit") ویرایش آیتم حوزه فعالیت

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
            list-zone-index(
                ref="zoneIndexList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-zone-index(
                ref="zoneIndexRegister",
                @on-command="onCommand",
                @on-register="onZoneIndexRegister",
                :register-url="registerUrl",
                :zone-indexs-url="zoneIndexsUrl",
                :department-categories-url="departmentCategoriesUrl",
                :zone-cats-url="zoneCatsUrl",
                :departments-url="departmentsUrl",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-zone-index(ref="zoneIndexEdit",
                @on-command="onCommand",
                @on-update="onZoneIndexUpdate"
                :edit-url="editUrl",
                :zone-indexs-url="zoneIndexsUrl",
                :department-categories-url="departmentCategoriesUrl",
                :zone-cats-url="zoneCatsUrl",
                :departments-url="departmentsUrl",
            )

        .column(v-show="!modeLoading && modeShow")
            show-zone-index(
                ref="zoneIndexShow",
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
const RegisterZoneIndex = require("VUE-COMPONENTS/zone-index/register-zone-index.vue")
    .default;
const ListZoneIndex = require("VUE-COMPONENTS/zone-index/list-zone-index.vue")
    .default;
const EditZoneIndex = require("VUE-COMPONENTS/zone-index/edit-zone-index.vue")
    .default;
const ShowZoneIndex = require("VUE-COMPONENTS/zone-index/show-zone-index.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "ZoneIndexs",

    components: {
        Loading,
        ListZoneIndex,
        RegisterZoneIndex,
        EditZoneIndex,
        ShowZoneIndex,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        zoneIndexs: [],
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

        zoneIndexsUrl: {
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
        this.$refs.zoneIndexList.loadZoneIndexs(1);
    },

    methods: {
        /**
         * On Register zone index
         */
        onZoneIndexRegister(payload) {
            //***update vue list****
            this.$refs.zoneIndexList.addToZoneIndexList(payload.data.data[0]);
            this.setNotification(".حوزه فعالیت با موفقیت ذخیره شد", "is-success");
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },

        /**
         * On Update zone index
         */
        onZoneIndexUpdate(payload) {
            this.$refs.zoneIndexList.editInZoneIndexList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".حوزه فعالیت با موفقیت ویرایش شد", "is-success");
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
                    /* TODO: REGISTER NEW zone index */
                    this.$refs.zoneIndexEdit.onChange(data.zone_cat.department_category_id);
                    this.$refs.zoneIndexEdit.loadZoneIndexData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.zoneIndexShow.loadUrl = this.loadUrl;
                    this.$refs.zoneIndexShow.loadZoneIndexData(data);
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
