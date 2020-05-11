<template lang="pug">
    .container-parent
        section.hero
            notification(:notification-type="notificationType", @on-close="closeNotification", v-if="showNotification")
                span(v-html="notificationMessage")
            .container.page-header
                .title
                    h1(v-show="modeList") دعوتنامه جلسه
                    h1(v-show="modeRegister") ایجاد دعوتنامه جلسه
                    h1(v-show="modeEdit") ویرایش دعوتنامه جلسه

        .columns.exposed-form(v-show="!modeLoading")
            .column.is-one-fifth(v-show="modeList")
                a.button.is-primary.is-rounded(href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.NEW)")
                    span.icon.is-small
                        i.material-icons.icon check_circle
                    span ایجاد

            .column.is-one-fifth(v-show="!modeList")
                a.button.is-warning.is-rounded(href="#",
                @click.prevent="commandClick(ENUMS.COMMAND.CANCEL)")
                    span.icon.is-small
                        i.material-icons.icon check_circle
                    span بازگشت

        .columns.is-vcentered
            .column(v-if="modeLoading")
                loading

            .column(v-show="!modeLoading && modeList")
                list-invite-session(ref="inviteSessionList", @on-command="onCommand", :list-url="listUrl")

            .column(v-show="!modeLoading && modeRegister")
                register-invite-session(ref="inviteSessionRegister", @on-command="onCommand",
                  @on-register="onInviteSessionRegister"
                  :register-url="registerUrl",
                  :departments-url="departmentsUrl",
                  :users-url="usersUrl")

            //.column(v-show="!modeLoading && modeEdit")
                edit-department(ref="departmentEdit", @on-command="onCommand",
                @on-update="onInviteSessionUpdate"
                :edit-url="editUrl",
                :departmentCategories-url="departmentCategoriesUrl")

            //.column(v-show="!modeLoading && modeShow")
                show-department(ref="departmentShow", @on-command="onCommand")
</template>

<script>
"use strict";

const Routes = require("JS-CORE/routes");
const ENUMS = require("JS-HELPERS/enums");
const Loading = require("VUE-COMPONENTS/general/loading.vue").default;
const RegisterInviteSession = require("VUE-COMPONENTS/invite-session/register-invite-session.vue")
    .default;
const ListInviteSession = require("VUE-COMPONENTS/invite-session/list-invite-session.vue")
    .default;
//const EditInviteSession = require("VUE-COMPONENTS/invite-session/edit-invite-session.vue").default;
//const ShowInviteSession = require("VUE-COMPONENTS/invite-session/show-invite-session.vue").default;
const Notification = require("VUE-COMPONENTS/general/notification.vue").default;

module.exports = {
    name: "InviteSessions",

    components: {
        Loading,
        ListInviteSession,
        RegisterInviteSession,
        //EditInviteSession,
        //ShowInviteSession,
        Notification
    },

    data: () => ({
        ENUMS,
        formModeStack: [],
        inviteSessions: [],
        notificationMessage: null,
        notificationType: "is-info",
        hasNewRegulation: false
    }),

    props: {
        title: {
            type: String,
            default: null
        },

        listUrl: {
            type: String,
            default: null
        },

        registerUrl: {
            type: String,
            default: null
        },

        departmentsUrl: {
            type: String,
            default: null
        },

        editUrl: {
            type: String,
            default: null
        },

        usersUrl: {
            type: String,
            default: null
        }
    },

    computed: {
        formMode: state => state.formModeStack[state.formModeStack.length - 1],

        modeLoading: state => state.formMode == ENUMS.FORM_MODE.LOADING,
        modeList: state => state.formMode == ENUMS.FORM_MODE.LIST,
        modeRegister: state => state.formMode == ENUMS.FORM_MODE.REGISTER,
        modeEdit: state => state.formMode == ENUMS.FORM_MODE.EDIT,
        modeShow: state => state.formMode == ENUMS.FORM_MODE.SHOW,
        showNotification: state => state.notificationMessage != null
    },

    created() {
        this.init();
    },

    mounted() {
        this.changeFormMode(ENUMS.FORM_MODE.LIST);
        //this.$refs.inviteSessionList.loadInviteSessions(1);
    },

    methods: {
        /**
         * On Register invite session
         */
        onInviteSessionRegister(payload) {
            //***update vue list****
            this.$refs.inviteSessionList.addToInviteSessionList(payload.data.data);
            this.newRegulation(payload);
            this.setNotification(".دعوتنامه جلسه با موفقیت ذخیره شد", "is-success");
        },

        /**
         * On Update invite session
         */
        onInviteSessionUpdate(payload) {
            this.$refs.inviteSessionList.editInInviteSessionList(payload.data);
            this.changeFormMode(ENUMS.FORM_MODE.LIST);

            this.setNotification(".دعوتنامه جلسه با موفقیت ویرایش شد", "is-success");
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
                    console.log("REGISTER NEW InviteSession", arg);
                    break;

                case ENUMS.COMMAND.EDIT:
                    /* TODO: REGISTER NEW InviteSession */
                    this.$refs.inviteSessionEdit.loadInviteSessionData(data);
                    this.changeFormMode(ENUMS.FORM_MODE.EDIT);
                    break;

                case ENUMS.COMMAND.CANCEL:
                    this.changeFormMode(null, { pop: true });
                    break;

                case ENUMS.COMMAND.SHOW:
                    this.$refs.inviteSessionShow.loadInviteSessionData(data);
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
                    pop: false
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
        }
    }
};
</script>
