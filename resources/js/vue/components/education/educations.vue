<template lang="pug">
.container-parent()
    section.hero
        notification(
            :notification-type="notificationType",
            @on-close="closeNotification",
            v-if="showNotification"
        )
            span(v-html="notificationMessage")
        .container.page-header
            .title
                h1(v-show="modeList") آموزش
                h1(v-show="modeRegister") ایجاد آموزش

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
            list-education(
                ref="educationList",
                @on-command="onCommand",
                :list-url="listUrl"
            )

        .column(v-show="!modeLoading && modeRegister")
            register-education(
                ref="educationRegister",
                @on-command="onCommand",
                @on-register="onEducationRegister",
                :register-url="registerUrl",
                :programs-url="programsUrl",
                :ways-url="waysUrl",
                :department-id="departmentId",
            )

        .column(v-show="!modeLoading && modeEdit")
            edit-education(
                ref="educationEdit",
                @on-command="onCommand",
                @on-update="onEducationUpdate",
                :edit-url="editUrl",
                :programs-url="programsUrl",
                :ways-url="waysUrl",
                :department-id="departmentId",
            )

        .column(v-show="!modeLoading && modeShow")
            show-education(ref="educationShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterEducation = require("VUE-COMPONENTS/education/register-education.vue")
    .default;
const EditEducation = require("VUE-COMPONENTS/education/edit-education.vue")
    .default;
const ListEducation = require("VUE-COMPONENTS/education/list-education.vue")
    .default;
const ShowEducation = require("VUE-COMPONENTS/education/show-education.vue")
    .default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

export default {
    name: "Educations",

    components: {
        Loading,
        ListEducation,
        RegisterEducation,
        EditEducation,
        ShowEducation,
        Notification,
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        educations: [],
        notificationMessage: null,
        notificationType: "is-info",
        flagEdit: false,
    }),

    props: {
        waysUrl: {
            type: String,
            default: null,
        },
        programsUrl: {
            type: String,
            default: null,
        },
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
         * On Register education
         */
        onEducationRegister(payload) {
            //***update vue list****
            this.$refs.educationList.addToEducationList(
                payload.data.data.data[0]
            );
            this.setNotification(".آموزش با موفقیت ذخیره شد", "is-success");
            this.changeFormMode(ENUMS.FORM_MODE.LIST);
        },
        /**
         * On Update
         */
        onEducationUpdate(payload) {
            this.$refs.educationList.editEducationList(payload);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".جلسه با موفقیت ویرایش شد", "is-success");
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
                    console.log("REGISTER NEW Education", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    Vue.set(this, "flagEdit", true);
                    /* TODO: Edit InviteSession */
                    this.$refs.educationEdit.loadEducationData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.educationShow.loadEducationData(data);
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
            this.$refs.educationList.loadEducations(1);
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
