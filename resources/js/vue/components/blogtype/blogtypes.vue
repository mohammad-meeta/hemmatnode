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
                h1(v-show="modeList") دسته بندی اخبار
                h1(v-show="modeRegister") ایجاد دسته بندی اخبار

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
            list-blogtype(
                ref="blogtypeList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-blogtype(
                ref="blogtypeRegister",
                @on-command="onCommand",
                @on-register="onBlogtypeRegister",
                :register-url="registerUrl",
                :blogtype-type-id="blogtypeTypeId",
                :blogtype-types-url="blogtypeTypesUrl",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-blogtype(
                ref="blogtypeEdit",
                @on-command="onCommand",
                @on-update="onBlogtypeUpdate",
                :edit-url="editUrl",
                :blogtype-type-id="blogtypeTypeId",
                :blogtype-types-url="blogtypeTypesUrl",
            )

        .column(v-show="!modeLoading && modeShow")
            show-blogtype(ref="blogtypeShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterBlogtype = require("VUE-COMPONENTS/blogtype/register-blogtype.vue")
    .default;
const EditBlogtype = require("VUE-COMPONENTS/blogtype/edit-blogtype.vue")
    .default;
const ListBlogtype = require("VUE-COMPONENTS/blogtype/list-blogtype.vue")
    .default;
const ShowBlogtype = require("VUE-COMPONENTS/blogtype/show-blogtype.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "Blogtypes",

    components: {
        Loading,
        ListBlogtype,
        RegisterBlogtype,
        EditBlogtype,
        ShowBlogtype,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        blogtypes: [],
        notificationMessage: null,
        notificationType: "is-info",
    }),

    props: {
        blogtypeTypeId: {
            type: String,
            default: null,
        },

        blogtypeTypesUrl: {
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
        showBlogtypeYearUrl: {
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
         * On Register blogtype
         */
        onBlogtypeRegister(payload) {
            //***update vue list****
            this.$refs.blogtypeList.addToBlogtypeList(
                payload.data.data.data[0]
            );
            this.setNotification(
                ".دسته بندی اخبار با موفقیت ذخیره شد",
                "is-success"
            );
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },
        /**
         * On Update
         */
        onBlogtypeUpdate(payload) {
            this.$refs.blogtypeList.editBlogtypeList(payload);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(
                ".دسته بندی اخبار با موفقیت ویرایش شد",
                "is-success"
            );
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
                    this.$refs.blogtypeEdit.loadBlogtypeData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.blogtypeShow.loadBlogtypeData(data);
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
            this.$refs.blogtypeList.loadBlogtypes(1);
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
