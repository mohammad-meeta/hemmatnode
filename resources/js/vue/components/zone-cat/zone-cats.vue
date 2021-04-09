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
                h1(v-show="modeList") حوزه فعالیت
                h1(v-show="modeRegister") ایجاد حوزه فعالیت
                h1(v-show="modeEdit") ویرایش حوزه فعالیت

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
            list-zone-cat(
                ref="zoneCatList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-zone-cat(
                ref="zoneCatRegister",
                @on-command="onCommand",
                @on-register="onZoneCatRegister",
                :register-url="registerUrl",
                :zone-cats-url="zoneCatsUrl",
                :department-categories-url="departmentCategoriesUrl",
                :departments-url="departmentsUrl",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-zone-cat(ref="zoneCatEdit",
                @on-command="onCommand",
                @on-update="onZoneCatUpdate"
                :edit-url="editUrl",
                :zone-cat-url="zoneCatsUrl",
                :department-categories-url="departmentCategoriesUrl",
                :departments-url="departmentsUrl",
            )

        .column(v-show="!modeLoading && modeShow")
            show-zone-cat(
                ref="zoneCatShow",
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
const RegisterZoneCat = require("VUE-COMPONENTS/zone-cat/register-zone-cat.vue")
    .default;
const ListZoneCat = require("VUE-COMPONENTS/zone-cat/list-zone-cat.vue")
    .default;
const EditZoneCat = require("VUE-COMPONENTS/zone-cat/edit-zone-cat.vue")
    .default;
const ShowZoneCat = require("VUE-COMPONENTS/zone-cat/show-zone-cat.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "ZoneCats",

    components: {
        Loading,
        ListZoneCat,
        RegisterZoneCat,
        EditZoneCat,
        ShowZoneCat,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        zoneCats: [],
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

        zoneCatsUrl: {
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
        this.$refs.zoneCatList.loadZoneCats(1);
    },

    methods: {
        /**
         * On Register zone cat
         */
        onZoneCatRegister(payload) {
            //***update vue list****
            this.$refs.zoneCatList.addToZoneCatList(payload.data.data[0]);
            this.setNotification(".حوزه فعالیت با موفقیت ذخیره شد", "is-success");
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },

        /**
         * On Update zone cat
         */
        onZoneCatUpdate(payload) {
            this.$refs.zoneCatList.editInZoneCatList(payload.data);
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
                    /* TODO: REGISTER NEW Zone Cat */
                    this.$refs.zoneCatEdit.loadZoneCatData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.zoneCatShow.loadUrl = this.loadUrl;
                    this.$refs.zoneCatShow.loadZoneCatData(data._id);
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
